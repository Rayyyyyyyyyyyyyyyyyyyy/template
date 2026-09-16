import {
  chmodSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { delimiter, join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const projectRoot = resolve(import.meta.dirname, '..')
const packageJson = JSON.parse(readFileSync(join(projectRoot, 'package.json'), 'utf8'))
const ci = readFileSync(join(projectRoot, '.github/workflows/ci.yml'), 'utf8')
const publish = readFileSync(join(projectRoot, '.github/workflows/publish.yml'), 'utf8')
const release = readFileSync(join(projectRoot, 'scripts/release.sh'), 'utf8')
const packageGate = readFileSync(join(projectRoot, 'scripts/check-package.mjs'), 'utf8')

if (packageJson.scripts.prepublishOnly !== 'npm run verify') {
  throw new Error('prepublishOnly must invoke the shared verify gate')
}
if (!ci.includes('pull_request:') || !ci.includes('npm run verify')) {
  throw new Error('CI must verify pull requests with the shared gate')
}
if (!publish.includes('npm run verify') || !publish.includes('npm publish --ignore-scripts')) {
  throw new Error('Publish workflow must verify once before its lifecycle-free publish step')
}
if (!packageGate.includes("'--ignore-scripts'")) {
  throw new Error('Consumer packing must disable lifecycle scripts')
}

if (publish.indexOf('run: npm run verify') > publish.indexOf('run: npm publish')) {
  throw new Error('Publish workflow must verify before publishing')
}
if (/npm publish|release\.sh|run verify/.test(packageJson.scripts.verify)) {
  throw new Error('The shared gate must not publish, release, or recursively invoke itself')
}
const verifyOffset = release.indexOf('npm run verify')
for (const mutation of ['npm version', 'git tag', 'git push']) {
  if (verifyOffset < 0 || release.indexOf(mutation) < verifyOffset) {
    throw new Error(`release.sh must run verify before ${mutation}`)
  }
}

const tempRoot = mkdtempSync(join(tmpdir(), 'release-boundary-'))
const npmCache = join(tempRoot, 'npm-cache')

try {
  const publishFixture = join(tempRoot, 'publish-fixture')
  mkdirSync(publishFixture)
  writeFileSync(
    join(publishFixture, 'package.json'),
    `${JSON.stringify(
      {
        name: 'publish-boundary-fixture',
        version: '0.0.0',
        scripts: {
          prepublishOnly: packageJson.scripts.prepublishOnly,
          verify: 'node -e "process.exit(19)"',
          publish: 'node -e "require(\'node:fs\').writeFileSync(\'published.marker\', \'bad\')"',
        },
      },
      null,
      2,
    )}\n`,
  )
  const publishResult = spawnSync('npm', ['publish', '--dry-run', '--registry', 'http://127.0.0.1:9'], {
    cwd: publishFixture,
    env: { ...process.env, npm_config_cache: npmCache },
    encoding: 'utf8',
  })
  const publishOutput = `${publishResult.stdout}\n${publishResult.stderr}`
  if (
    publishResult.status === 0 ||
    !publishOutput.includes('prepublishOnly') ||
    existsSync(join(publishFixture, 'published.marker'))
  ) {
    throw new Error('A failing prepublishOnly hook did not stop the isolated publish flow')
  }

  // Pack uses the same --ignore-scripts flag as the consumer gate: no lifecycle
  // (including prepare/prepack/postpack) may run on the already-built artifacts.
  const packFixture = join(tempRoot, 'pack-fixture')
  mkdirSync(packFixture)
  writeFileSync(join(packFixture, 'package.json'), JSON.stringify({
    name: 'pack-boundary-fixture', version: '0.0.0',
    scripts: Object.fromEntries(['prepare', 'prepack', 'postpack'].map((name) =>
      [name, 'node -e "process.exit(19)"'])),
  }))
  const packResult = spawnSync('npm', ['pack', '--ignore-scripts'], {
    cwd: packFixture, env: { ...process.env, npm_config_cache: npmCache }, encoding: 'utf8',
  })
  if (packResult.status !== 0) throw new Error('Internal pack reentered lifecycle scripts')

  const binDir = join(tempRoot, 'bin')
  mkdirSync(binDir)
  const commandLog = join(tempRoot, 'commands.log')
  const npmStub = join(binDir, 'npm')
  const gitStub = join(binDir, 'git')
  writeFileSync(
    npmStub,
    `#!/bin/sh\nprintf '%s\\n' "npm $*" >> "${commandLog}"\nif [ "$1 $2" = "run verify" ]; then exit 19; fi\nexit 0\n`,
  )
  writeFileSync(gitStub, `#!/bin/sh\nprintf '%s\\n' "git $*" >> "${commandLog}"\nexit 0\n`)
  chmodSync(npmStub, 0o755)
  chmodSync(gitStub, 0o755)

  const releaseResult = spawnSync('bash', ['scripts/release.sh', 'patch'], {
    cwd: projectRoot,
    env: { ...process.env, PATH: `${binDir}${delimiter}${process.env.PATH}` },
    encoding: 'utf8',
  })
  const commands = readFileSync(commandLog, 'utf8')
  if (
    releaseResult.status === 0 ||
    !commands.includes('npm run verify') ||
    commands.includes('npm version') ||
    commands.includes('git tag') ||
    commands.includes('git push')
  ) {
    throw new Error('release.sh did not stop before version, tag, and push mutations')
  }
  // Execute the publish job's npm steps with stubs. No real publish command can run.
  writeFileSync(commandLog, '')
  const steps = [...publish.matchAll(/run: (npm[^\n]+)/g)].map((match) => match[1])
  const workflowResult = spawnSync('bash', ['-e', '-c', steps.join('\n')], {
    cwd: tempRoot, env: { ...process.env, PATH: `${binDir}${delimiter}${process.env.PATH}` }, encoding: 'utf8',
  })
  const workflowCommands = readFileSync(commandLog, 'utf8')
  if (workflowResult.status === 0 || !workflowCommands.includes('npm run verify') || workflowCommands.includes('npm publish')) {
    throw new Error('Publish job did not stop at the failed gate')
  }
  console.log('Verified local publish lifecycle, release mutations, workflow ordering, and lifecycle-free pack with isolated fixtures')
} finally {
  rmSync(tempRoot, { recursive: true, force: true })
}

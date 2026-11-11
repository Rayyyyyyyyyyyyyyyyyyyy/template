import assert from 'node:assert/strict'
import { cpSync, mkdtempSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'

// Raise deliberately in the same commit that grows the bundle.
const budget = { esm: 100000, cjs: 85000, css: 42000 }

const root = resolve(import.meta.dirname, '..')
const temp = mkdtempSync(join(tmpdir(), 'template-consumer-'))
const env = { ...process.env, npm_config_cache: process.env.npm_config_cache || join(tmpdir(), 'template-npm-cache') }
const run = (file, args, cwd = root) => execFileSync(file, args, { cwd, env, stdio: 'inherit' })
const targets = (value) => typeof value === 'string' ? [value] : Object.values(value).flatMap(targets)

try {
  const packDir = join(temp, 'pack')
  mkdirSync(packDir)
  // The gate has already built both outputs. Never reenter prepare/prepack/verify.
  const [pack] = JSON.parse(execFileSync('npm', ['pack', '--ignore-scripts', '--json', '--pack-destination', packDir], { cwd: root, env, encoding: 'utf8' }))
  const files = new Set(pack.files.map(({ path }) => path))
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
  const errors = []
  for (const [entry, value] of Object.entries(pkg.exports)) {
    for (const target of targets(value)) {
      if (!files.has(target.replace(/^\.\//, ''))) errors.push(`${entry}: missing ${target}`)
    }
  }
  for (const path of files) {
    if (/__tests__|\.(test|spec)\.[cm]?[jt]s|^dist\/demo\//.test(path)) errors.push(`Unpublishable file: ${path}`)
  }
  const lib = join(root, 'dist/lib')
  const names = readdirSync(lib, { withFileTypes: true }).filter((e) => e.isFile()).map((e) => e.name)
  const sum = (match) => names.filter(match).reduce((n, name) => n + statSync(join(lib, name)).size, 0)
  const sizes = {
    esm: sum((name) => name.endsWith('.js')),
    cjs: sum((name) => name.endsWith('.cjs')),
    css: statSync(join(lib, 'rayyy-vue-table-components.css')).size,
  }
  for (const [kind, size] of Object.entries(sizes)) {
    if (size > budget[kind]) errors.push(`Bundle size over budget: ${kind}=${size} > ${budget[kind]}`)
  }
  assert.equal(errors.length, 0, errors.join('\n'))
  console.log(`Bundle size within budget: esm=${sizes.esm} cjs=${sizes.cjs} css=${sizes.css}`)

  const consumer = join(temp, 'consumer')
  cpSync(join(root, 'tests/consumer'), consumer, { recursive: true })
  const fixturePath = join(consumer, 'package.json')
  const fixture = JSON.parse(readFileSync(fixturePath, 'utf8'))
  fixture.dependencies[pkg.name] = `file:${join(packDir, pack.filename)}`
  writeFileSync(fixturePath, JSON.stringify(fixture, null, 2) + '\n')
  // Real dependency resolution in a new directory: no repo aliases, symlinks,
  // NODE_PATH, legacy-peer-deps, or borrowing the repository's node_modules.
  delete env.NODE_PATH
  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', '--fetch-retries=0'], consumer)
  run('npm', ['run', 'type-check'], consumer)
  run('npm', ['run', 'build'], consumer)
  run('node', ['runtime-check.mjs'], consumer)
  console.log(`Verified ${Object.keys(pkg.exports).length} public entries from installed ${pack.filename}`)
} finally {
  rmSync(temp, { recursive: true, force: true })
}

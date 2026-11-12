import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const external = (id) => /^(vue|vue-i18n|element-plus|@element-plus\/icons-vue)(\/|$)/.test(id)
const output = await build({
  configFile: false,
  logLevel: 'silent',
  build: {
    write: false,
    minify: false,
    lib: { entry: fileURLToPath(new URL('./treeshake-entry.js', import.meta.url)), formats: ['es'], fileName: 'probe' },
    rollupOptions: { external },
  },
})
const chunks = (Array.isArray(output) ? output : [output]).flatMap(({ output }) => output).filter((o) => o.type === 'chunk')
const code = chunks.map((c) => c.code).join('\n')
assert.ok(/["']BaseBtn["']/.test(code), 'BaseBtn missing from bundle')
const leaked = code.match(/["'](TransferDialog|SearchableListPanel|SortTable)["']/g)
assert.ok(!leaked, `BaseBtn-only bundle (${Buffer.byteLength(code)} bytes) contains other components: ${leaked}`)
console.log(`Tree-shaking verified: BaseBtn-only bundle is ${Buffer.byteLength(code)} bytes`)

import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { createApp } from 'vue'

const [format, ...entries] = process.argv.slice(2)
assert.ok(format === 'esm' || format === 'cjs')
const require = createRequire(import.meta.url)
const names = [
  'BaseTable', 'SortTable', 'TitleTable', 'BaseBtn', 'BaseInput', 'BaseSelector',
  'BaseDialog', 'BaseWarningDialog', 'SearchBar', 'TransferDialog', 'TransferItem',
  'FunctionHeader', 'MainPanel', 'SearchableListPanel', 'DetailLayout', 'FilterLayout',
]
let previous
for (const entry of entries) {
  const exported = format === 'esm' ? await import(entry) : require(entry)
  const app = createApp({ render: () => null })
  for (const name of names) {
    assert.equal(typeof exported[name]?.install, 'function', `${format} ${entry}: ${name}.install`)
    app.use(exported[name])
    assert.equal(app.component(name), exported[name])
    if (previous) assert.equal(previous[name], exported[name], `${name} must retain identity across entries`)
  }
  if (exported.default?.install) {
    const pluginApp = createApp({ render: () => null })
    pluginApp.use(exported.default)
    for (const name of names) assert.equal(pluginApp.component(name), exported[name])
    assert.equal(exported.default[0], exported.BaseTable)
    assert.equal(exported.default[1], exported.BaseBtn)
    assert.equal(exported.default[15], exported.FilterLayout)
  }
  previous = exported
}
console.log(`Single installation passed: ${format} ${entries.join(' → ')}`)

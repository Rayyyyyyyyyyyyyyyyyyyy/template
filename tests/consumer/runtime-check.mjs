import assert from 'node:assert/strict'
import { createApp } from 'vue'
import { createRequire } from 'node:module'
import { compileEmitsConsumer, emitContracts } from './emits-contract.mjs'

const require = createRequire(import.meta.url)
for (const [typeName, events] of emitContracts) {
  assert.deepEqual(compileEmitsConsumer(typeName).emits, events, `${typeName} must declare runtime events`)
}
console.log('All public emits types compile into the expected consumer SFC runtime events')
const esmRoot = await import('rayyy-vue-table-components')
const esmComponents = await import('rayyy-vue-table-components/components')
const esmUtils = await import('rayyy-vue-table-components/utils')
const esmLocales = await import('rayyy-vue-table-components/locales')
const esmStyles = await import('rayyy-vue-table-components/utils/styles')
const esmPreset = await import('rayyy-vue-table-components/tailwind-preset')

const cjsRoot = require('rayyy-vue-table-components')
const cjsComponents = require('rayyy-vue-table-components/components')
const cjsUtils = require('rayyy-vue-table-components/utils')
const cjsLocales = require('rayyy-vue-table-components/locales')
const cjsStyles = require('rayyy-vue-table-components/utils/styles')
const cjsPreset = require('rayyy-vue-table-components/tailwind-preset')

for (const value of [
  esmRoot.BaseTable,
  esmComponents.BaseDialog,
  esmUtils.setActiveColumn,
  esmLocales.messages,
  esmStyles.STYLE_CLASSES,
  esmPreset.default,
  cjsRoot.BaseTable,
  cjsComponents.BaseDialog,
  cjsUtils.setActiveColumn,
  cjsLocales.messages,
  cjsStyles.STYLE_CLASSES,
  cjsPreset,
]) {
  if (!value) throw new Error('A declared ESM/CJS public entry did not load')
}

require.resolve('rayyy-vue-table-components/styles')
require.resolve('rayyy-vue-table-components/styles/element')

// Type-only /types/components has no runtime contract; /types still supports both formats.
await import('rayyy-vue-table-components/types')
require('rayyy-vue-table-components/types')
assert.equal(esmComponents.BaseTable, esmRoot.BaseTable)
assert.equal(cjsComponents.BaseTable, cjsRoot.BaseTable)
assert.equal(esmStyles.createTableCellClass({ isHeader: true }), 'p-0 h-10 bg-primary-15 font-bold text-text text-sm leading-4')
assert.equal(cjsStyles.createTextClass('blue'), 'text-blue-10')
const app = createApp({ render: () => null })
app.use(esmRoot.default, { locale: 'en-US' })
assert.equal(app.component('BaseDialog'), esmRoot.BaseDialog)
assert.equal(app.component('BaseTable'), esmRoot.BaseTable)
assert.equal(esmRoot.default.BaseDialog, esmRoot.BaseDialog)
assert.equal(esmRoot.useI18n().locale.value, 'en-US')
esmRoot.setLocale('zh-TW')
assert.equal(esmRoot.useI18n().locale.value, 'zh-TW')
assert.equal(esmRoot.useComponentElementLocale().value.name, 'zh-tw')
console.log('ESM/CJS entries, plugin registration, assets, historical style helpers, and legacy locale APIs passed')

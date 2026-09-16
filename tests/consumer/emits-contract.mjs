import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { compileScript, parse, registerTS } from 'vue/compiler-sfc'
import ts from 'typescript'

const require = createRequire(import.meta.url)
registerTS(() => ts)

// Expected events are the existing public contract, independent of its type representation.
export const emitContracts = [
  ['BaseTableEmits', ['selection-change', 'current-change', 'cell-click', 'column-sort-change', 'click:checkRow', 'click:editRow']],
  ['SortTableEmits', ['open:transfer', 'click:downloadExcelFile', 'update:selectRow', 'click:cell', 'click:columnSort', 'click:checkRow', 'click:editRow']],
  ['TitleTableEmits', ['click:add', 'click:delete', 'update:selectRow', 'click:cell', 'click:checkRow', 'click:editRow']],
  ['BaseBtnEmits', ['click']],
  ['BaseDialogEmits', ['update:modelValue', 'click:submit']],
  ['BaseWaringDialogEmits', ['update:modelValue', 'update:submit']],
  ['TransferDialogEmits', ['update:modelValue', 'update:submit', 'update:checkChange']],
  ['BaseInputEmits', ['update:modelValue', 'update:clearValue']],
  ['BaseSelectorEmits', ['update:modelValue']],
  ['SearchBarEmits', ['keydown:enter', 'update:clear', 'update:resetFilter']],
  ['SearchableListPanelEmits', ['search', 'updatePage', 'updatePageSize', 'click:back']],
  ['FunctionHeaderEmits', ['back']],
  ['MainPanelEmits', ['click:back']],
  ['DetailLayoutEmits', ['update:saveEdit', 'update:cancelEdit', 'click:back']],
  ['FilterLayoutEmits', ['submitEmit', 'resetEmit', 'click:back']],
  ['TransferItemEmits', ['update:toUnLock', 'update:toLock', 'update:toTop', 'update:toPre', 'update:toNext', 'update:toBottom']],
]

export function compileEmitsConsumer(typeName, moduleSpecifier = 'rayyy-vue-table-components/types/components', template = '') {
  const filename = join(import.meta.dirname, 'src', `${typeName}Consumer.vue`)
  const source = `<script setup lang="ts">
import type { ${typeName} } from ${JSON.stringify(moduleSpecifier)}
const emit = defineEmits<${typeName}>()
</script>${template}`
  const { descriptor } = parse(source, { filename })
  const { content } = compileScript(descriptor, {
    id: typeName,
    inlineTemplate: true,
    fs: { fileExists: existsSync, readFile: (path) => readFileSync(path, 'utf8') },
  })
  const { outputText } = ts.transpileModule(content, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  })
  const exports = {}
  new Function('require', 'exports', outputText)(require, exports)
  return exports.default
}

import type { VNode, App } from 'vue'
import type {
  BaseDialogEmits, BaseDialogProps, BaseDialogSlots, BaseTableInstance,
  BaseTableEmits, BaseTableSlots, BaseInputProps, BaseSelectorEmits,
  SearchableListPanelEmits, TransferDialogSlots, PluginOptions,
  SortTableEmits, TitleTableEmits, BaseWaringDialogEmits,
} from 'rayyy-vue-table-components/types/components'
import type { BaseTableProps } from 'rayyy-vue-table-components/components'
import type { Pager, TableColumn } from 'rayyy-vue-table-components/types'
import type { BaseBtnProps } from 'rayyy-vue-table-components'
import type { BaseDialog as TypedDialog } from 'rayyy-vue-table-components/types/components'
import type { LocaleType } from 'rayyy-vue-table-components/locales'
import type { TableCellStyleOptions, StyleClassesType, TextStyleType } from 'rayyy-vue-table-components/utils/styles'

type Row = { id: number; name: string }
declare const row: Row
declare const table: BaseTableInstance<Row>
declare const dialog: BaseDialogEmits
declare const panel: SearchableListPanelEmits
declare const sort: SortTableEmits<Row>
declare const title: TitleTableEmits<Row>
declare const warning: BaseWaringDialogEmits
declare const columnSlots: TransferDialogSlots<Row>
declare const app: App
declare const typedDialog: typeof TypedDialog

// This module is compile-only. Assertions never run in the consumer app.
export function checkLegacyContracts() {
  const props: BaseTableProps<Row> = { data: [row], columns: [{ label: 'Name', formatter: (r) => r.name }] }
  const selection: BaseTableEmits<Row>['selection-change'] = (rows: Row[]) => { void rows[0]?.name }
  table.$emit['selection-change']([row])
  selection([row])
  dialog('update:modelValue', true)
  dialog('click:submit')
  const changed: boolean = panel('updatePage', 2)
  const resized: boolean = panel('updatePageSize', 25)
  panel('search', null)
  sort('click:columnSort', { prop: 'name', order: 'ascending', column: [] })
  title('click:add')
  warning('update:submit')
  // Existing handlers need not accept null added by the implementation's Selection type.
  const selector: BaseSelectorEmits = { 'update:modelValue': (value?: string | string[]) => { void value } }
  const autocomplete: BaseInputProps = { autocomplete: 'email' }
  const dialogProps: BaseDialogProps = { modelValue: false, customWidth: '720px' }
  const slots: BaseTableSlots<Row> = { expand: ({ row, $index }) => { const name: string = row.name; void name; void $index; return [] as VNode[] } }
  const dialogSlots: BaseDialogSlots = { customFooter: () => [] }
  const pager: Pager = { totalCount: 1, page: 1, limit: 10 }
  const button: BaseBtnProps = { size: 'small' }
  const plugin: PluginOptions = { locale: 'zh-TW', prefix: 'Legacy', autoImportStyles: false }
  const locale: LocaleType = 'en-US'
  const styles: TableCellStyleOptions = { isHeader: true }
  const text: TextStyleType = 'normal'
  const className: keyof StyleClassesType = 'tableCell'
  const columns: TableColumn<Row>[] = props.columns
  typedDialog.install(app)

  // @ts-expect-error wrong row payload
  selection(['wrong'])
  // @ts-expect-error wrong callable payload
  dialog('update:modelValue', 'yes')
  // @ts-expect-error unknown legacy event
  dialog('confirm')
  // @ts-expect-error numeric customWidth is invalid
  const invalidDialog: BaseDialogProps = { modelValue: true, customWidth: 720 }
  // @ts-expect-error wrong generic slot row
  slots.expand?.({ row: { id: 1, name: 2 }, $index: 0 })
  // @ts-expect-error wrong page payload
  panel('updatePage', '2')
  // @ts-expect-error wrong generic table data
  const invalidTable: BaseTableProps<Row> = { data: [{ id: 'bad', name: 'Ada' }], columns: [] }
  // @ts-expect-error handler map is not callable
  table.$emit('selection-change', [row])
  void [changed, resized, selector, autocomplete, dialogProps, dialogSlots, pager, button, plugin, locale, styles, text, className, columns, columnSlots, invalidDialog, invalidTable]
}

// Check declarations emitted from the SFC macros as well as the public aliases.
import type { BaseDialog as DialogComponent, BaseTable as TableComponent } from 'rayyy-vue-table-components/components'
type DialogComponentProps = InstanceType<typeof DialogComponent>['$props']
type TableComponentProps = Parameters<typeof TableComponent<Row>>[0]
export function checkGeneratedDeclarations() {
  const dialog: DialogComponentProps = { modelValue: true, customWidth: '720px' }
  const table: TableComponentProps = { data: [{ id: 1, name: 'Ada' }], columns: [] }
  // @ts-expect-error generated dialog declarations reject numeric width
  const badDialog: DialogComponentProps = { modelValue: true, customWidth: 720 }
  // @ts-expect-error generated generic component rejects the wrong row shape
  const badTable: TableComponentProps = { data: [{ id: 'wrong', name: 'Ada' }], columns: [] }
  void [dialog, table, badDialog, badTable]
}

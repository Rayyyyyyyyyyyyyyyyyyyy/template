import type { App } from 'vue'
import { BaseTable, BaseDialog, SortTable, TitleTable } from 'rayyy-vue-table-components/components'
import { BaseTable as RootTable, BaseDialog as RootDialog } from 'rayyy-vue-table-components'

export function checkInstallContracts(app: App) {
  app.use(BaseTable).use(BaseDialog).use(SortTable).use(TitleTable)
  BaseTable.install(app)
  RootTable.install(app)
  RootDialog.install(app)
}

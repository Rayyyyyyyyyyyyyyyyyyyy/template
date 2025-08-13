import type { App } from 'vue'
import BaseTable from './components/BaseTable.vue'
import type * as Types from './types'

// 導出類型
export * from './types'
export type { Types }

// 導出組件
export { BaseTable }

// 組件列表（參考 ElementUI 的做法）
const components = [BaseTable]

// Vue 插件安裝函數
export function install(app: App) {
  // 批量註冊組件
  components.forEach(component => {
    app.component(component.name || 'BaseTable', component)
  })
}

// 默認導出（支持 app.use() 語法）
export default {
  install,
  ...components
}

// 支援單個組件安裝（使用類型斷言）
;(BaseTable as any).install = (app: App) => {
  app.component(BaseTable.name || 'BaseTable', BaseTable)
}

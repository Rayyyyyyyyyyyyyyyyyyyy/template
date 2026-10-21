import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import ElementPlus from 'element-plus'
import { BaseTable } from 'rayyy-vue-table-components/components'
import { BaseDialog, messages } from 'rayyy-vue-table-components'
import 'element-plus/dist/index.css'
import 'rayyy-vue-table-components/styles'
import App from './BaseTableExample.vue'

const app = createApp(App)
app.use(createI18n({ legacy: false, locale: 'zh-TW', messages }))
app.use(ElementPlus)
// 兩個入口都支援單項註冊，不需要先安裝整個套件。
app.use(BaseTable)
app.use(BaseDialog)
app.mount('#app')

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createI18n } from 'vue-i18n'
import ComponentLibrary, {
  messages,
  setLocale,
  useI18n as useLegacyI18n,
} from 'rayyy-vue-table-components'
import { setActiveColumn } from 'rayyy-vue-table-components/utils'
import { STYLE_CLASSES } from 'rayyy-vue-table-components/utils/styles'
import preset from 'rayyy-vue-table-components/tailwind-preset'
import 'rayyy-vue-table-components/styles'
import 'rayyy-vue-table-components/styles/element'
import App from './App.vue'

const i18n = createI18n({ legacy: false, locale: 'en-US', messages })
const columns = setActiveColumn([{ prop: 'name', label: 'Name' }])

if (!columns[0].checkActive || !STYLE_CLASSES.tableCell || !preset.theme) {
  throw new Error('Public helper or asset entry did not load')
}

void setLocale
void useLegacyI18n

createApp(App)
  .use(i18n)
  .use(ElementPlus)
  .use(ComponentLibrary, { locale: 'zh-TW' })
  .mount('#app')

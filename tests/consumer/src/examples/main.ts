import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import ElementPlus from 'element-plus'
import ComponentLibrary from 'rayyy-vue-table-components'
import { messages } from 'rayyy-vue-table-components/locales'
import 'element-plus/dist/index.css'
import 'rayyy-vue-table-components/styles'
import App from './HostLocale.vue'

// 在各語系內合併宿主 messages；若覆寫 common 等 namespace，請再合併該層。
const i18n = createI18n({
  legacy: false,
  locale: 'zh-TW',
  fallbackLocale: 'en-US',
  messages: {
    'zh-TW': { ...messages['zh-TW'], app: { title: '宿主應用' } },
    'en-US': { ...messages['en-US'], app: { title: 'Host app' } },
  },
})
createApp(App).use(i18n).use(ElementPlus).use(ComponentLibrary).mount('#app')

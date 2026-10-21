import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import { messages as componentMessages } from './locales'
import '@/assets/base.css'
import '@/assets/styles/tailwind.scss'
import '@/assets/styles/element/index.scss'

const app = createApp(App)

// 建立 i18n 實例，包含組件庫的翻譯
// 外部專案也需要這樣做：import 組件庫的 messages 並 merge
const i18n = createI18n({
  legacy: false,
  locale: 'zh-TW',
  fallbackLocale: 'zh-TW',
  messages: componentMessages, // 使用組件庫的翻譯
})

app.use(i18n)

app.use(router)

app.mount('#app')

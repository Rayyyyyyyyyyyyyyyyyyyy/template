import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { computed } from 'vue'

import ElementPlus from 'element-plus'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import enUs from 'element-plus/es/locale/lang/en'

import App from './App.vue'
import router from './router'
import { messages as componentMessages } from './locales'
import '@/assets/base.css'
import '@/assets/styles/tailwind.scss'
import '@/assets/styles/element/index.scss'
import 'element-plus/dist/index.css'

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

// Element Plus 也要跟著語系切換（響應式）
const elementLocale = computed(() => {
  return i18n.global.locale.value === 'zh-TW' ? zhTw : enUs
})

app.use(ElementPlus, {
  locale: elementLocale.value,
})

app.use(createPinia())
app.use(router)

app.mount('#app')

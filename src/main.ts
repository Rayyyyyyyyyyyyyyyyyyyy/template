import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import zhTw from 'element-plus/es/locale/lang/zh-tw'

import App from './App.vue'
import router from './router'
import '@/assets/base.css'
import '@/assets/styles/tailwind.scss'
import '@/assets/styles/element/index.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhTw,
})
app.use(createPinia())
app.use(router)

app.mount('#app')

import { createI18n, type I18n, type Composer } from 'vue-i18n'
import { getCurrentInstance, computed } from 'vue'
import { messages } from '../locales'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import enUs from 'element-plus/es/locale/lang/en'

// 內部 i18n 實例
let internalI18n: I18n | null = null

// 預設語系
const DEFAULT_LOCALE = 'zh-TW'

/**
 * 取得或建立內部 i18n 實例
 */
function getInternalI18n(): I18n {
  if (!internalI18n) {
    internalI18n = createI18n({
      legacy: false,
      locale: DEFAULT_LOCALE,
      fallbackLocale: DEFAULT_LOCALE,
      messages,
      silentTranslationWarn: true,
      missingWarn: false,
      fallbackWarn: false,
    })
  }
  return internalI18n
}

/**
 * 設定內部 i18n 的語系
 */
export function setLocale(locale: string): void {
  const i18n = getInternalI18n()
  const global = i18n.global as Composer
  global.locale.value = locale
}

/**
 * 組件內使用的 i18n composable
 * 會優先使用外部專案的 i18n，如果不存在則使用內部 i18n
 */
export function useComponentI18n() {
  const instance = getCurrentInstance()

  // 嘗試取得外部專案的 i18n（支援 Composition API 模式）
  let externalI18n: Composer | undefined
  try {
    const globalProperties = instance?.appContext.config.globalProperties
    const externalI18nInstance = globalProperties?.$i18n as I18n | undefined

    // 如果是 I18n 實例，取得其 global 屬性
    if (externalI18nInstance && 'global' in externalI18nInstance) {
      externalI18n = externalI18nInstance.global as Composer
    }
  } catch (e) {
    // 如果取得失敗，繼續使用內部 i18n
    externalI18n = undefined
  }

  // 取得內部 i18n
  const internalI18nInstance = getInternalI18n()
  const internalGlobal = internalI18nInstance.global as Composer

  // 如果存在外部 i18n，優先使用外部的（因為外部可能有覆蓋的翻譯）
  // 但要支援回退到內部 i18n
  const currentI18n = externalI18n || internalGlobal

  // 直接使用 i18n 的 t 函數（它本身就是響應式的）
  // 如果需要回退邏輯，我們需要檢查 key 是否存在
  const t = currentI18n.t

  return {
    t,
    locale: currentI18n.locale,
    i18n: currentI18n,
  }
}

/**
 * 全域 i18n 實例（用於非組件環境）
 */
export function useI18n() {
  const i18n = getInternalI18n()
  return i18n.global as Composer
}

/**
 * Element Plus locale composable
 * 返回響應式的 Element Plus locale 對象
 */
export function useElementLocale() {
  const instance = getCurrentInstance()

  // 嘗試取得外部專案的 i18n（支援 Composition API 模式）
  let externalI18n: Composer | undefined
  try {
    const globalProperties = instance?.appContext.config.globalProperties
    const externalI18nInstance = globalProperties?.$i18n as I18n | undefined

    // 如果是 I18n 實例，取得其 global 屬性
    if (externalI18nInstance && 'global' in externalI18nInstance) {
      externalI18n = externalI18nInstance.global as Composer
    }
  } catch (e) {
    // 如果取得失敗，繼續使用內部 i18n
    externalI18n = undefined
  }

  // 取得內部 i18n
  const internalI18nInstance = getInternalI18n()
  const internalGlobal = internalI18nInstance.global as Composer

  // 如果存在外部 i18n，優先使用外部的，否則使用內部的
  const currentI18n = externalI18n || internalGlobal

  // 返回響應式的 Element Plus locale
  return computed(() => {
    const locale = currentI18n.locale.value
    return locale === 'zh-TW' ? zhTw : enUs
  })
}

/**
 * 組件庫內部使用的 Element Plus locale composable
 * 專門用於組件庫內部的 Element Plus 組件
 */
export function useComponentElementLocale() {
  const instance = getCurrentInstance()

  // 嘗試取得外部專案的 i18n（支援 Composition API 模式）
  let externalI18n: Composer | undefined
  try {
    const globalProperties = instance?.appContext.config.globalProperties
    const externalI18nInstance = globalProperties?.$i18n as I18n | undefined

    // 如果是 I18n 實例，取得其 global 屬性
    if (externalI18nInstance && 'global' in externalI18nInstance) {
      externalI18n = externalI18nInstance.global as Composer
    }
  } catch (e) {
    // 如果取得失敗，繼續使用內部 i18n
    externalI18n = undefined
  }

  // 取得內部 i18n
  const internalI18nInstance = getInternalI18n()
  const internalGlobal = internalI18nInstance.global as Composer

  // 如果存在外部 i18n，優先使用外部的，否則使用內部的
  const currentI18n = externalI18n || internalGlobal

  // 返回響應式的 Element Plus locale
  return computed(() => {
    const locale = currentI18n.locale.value
    return locale === 'zh-TW' ? zhTw : enUs
  })
}

// 導出類型
export type { I18n, Composer }


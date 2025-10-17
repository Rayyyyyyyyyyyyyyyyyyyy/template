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
  console.log('🔍 [useComponentI18n] 開始執行')

  const instance = getCurrentInstance()
  console.log('🔍 [useComponentI18n] 獲取 instance:', !!instance)

  // 嘗試取得外部專案的 i18n（支援 Composition API 模式）
  let externalI18n: Composer | undefined
  try {
    console.log('🔍 [useComponentI18n] 嘗試獲取外部 i18n')
    const globalProperties = instance?.appContext.config.globalProperties
    console.log('🔍 [useComponentI18n] globalProperties:', !!globalProperties)

    const externalI18nInstance = globalProperties?.$i18n as I18n | undefined
    console.log('🔍 [useComponentI18n] externalI18nInstance:', !!externalI18nInstance)

    // 如果是 I18n 實例，取得其 global 屬性
    if (externalI18nInstance && 'global' in externalI18nInstance) {
      externalI18n = externalI18nInstance.global as Composer
      console.log('🔍 [useComponentI18n] 成功獲取外部 i18n，locale:', externalI18n.locale.value)
    } else {
      console.log('🔍 [useComponentI18n] 外部 i18n 實例不存在或格式不正確')
    }
  } catch (e) {
    console.log('❌ [useComponentI18n] 獲取外部 i18n 失敗:', e)
    // 如果取得失敗，繼續使用內部 i18n
    externalI18n = undefined
  }

  // 取得內部 i18n
  console.log('🔍 [useComponentI18n] 獲取內部 i18n')
  const internalI18nInstance = getInternalI18n()
  const internalGlobal = internalI18nInstance.global as Composer
  console.log('🔍 [useComponentI18n] 內部 i18n locale:', internalGlobal.locale.value)

  // 如果存在外部 i18n，優先使用外部的（因為外部可能有覆蓋的翻譯）
  // 但要支援回退到內部 i18n
  const currentI18n = externalI18n || internalGlobal
  console.log('🔍 [useComponentI18n] 最終使用 i18n:', externalI18n ? '外部' : '內部', 'locale:', currentI18n.locale.value)

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
  console.log('🔍 [useI18n] 開始執行')
  const i18n = getInternalI18n()
  const global = i18n.global as Composer
  console.log('🔍 [useI18n] 返回內部 i18n，locale:', global.locale.value)
  return global
}

/**
 * 組件庫內部使用的 Element Plus locale composable
 * 專門用於組件庫內部的 Element Plus 組件
 */
export function useComponentElementLocale() {
  console.log('🔍 [useComponentElementLocale] 開始執行')

  try {
    console.log('🔍 [useComponentElementLocale] 嘗試獲取 useI18n()')
    const { locale } = useI18n()
    console.log('🔍 [useComponentElementLocale] 成功獲取 locale:', locale.value)

    return computed(() => {
      console.log('🔍 [useComponentElementLocale] computed 重新計算，locale.value:', locale.value)
      const result = locale.value === 'zh-TW' ? zhTw : enUs
      console.log('🔍 [useComponentElementLocale] 返回結果:', result.name)
      return result
    })
  } catch (e) {
    console.log('❌ [useComponentElementLocale] 獲取 useI18n() 失敗:', e)
    // 防呆：預設中文
    return computed(() => {
      console.log('🔍 [useComponentElementLocale] 使用預設中文')
      return zhTw
    })
  }
}

// 導出類型
export type { I18n, Composer }

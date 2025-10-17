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

  // 嘗試獲取外部 i18n（優先）
  const instance = getCurrentInstance()
  let externalLocale: any = undefined

  try {
    console.log('🔍 [useComponentElementLocale] 嘗試獲取外部 i18n')
    const globalProperties = instance?.appContext.config.globalProperties
    const externalI18nInstance = globalProperties?.$i18n as I18n | undefined

    if (externalI18nInstance && 'global' in externalI18nInstance) {
      externalLocale = externalI18nInstance.global.locale
      console.log('🔍 [useComponentElementLocale] 成功獲取外部 locale:', externalLocale.value)
    } else {
      console.log('🔍 [useComponentElementLocale] 外部 i18n 不存在，使用內部 i18n')
    }
  } catch (e) {
    console.log('❌ [useComponentElementLocale] 獲取外部 i18n 失敗:', e)
  }

  // 獲取內部 i18n（回退）
  const { locale: internalLocale } = useI18n()
  console.log('🔍 [useComponentElementLocale] 內部 locale:', internalLocale.value)

  // 決定使用哪個 locale
  const currentLocale = externalLocale || internalLocale
  console.log('🔍 [useComponentElementLocale] 最終使用 locale:', currentLocale.value)

  return computed(() => {
    console.log('🔍 [useComponentElementLocale] computed 重新計算，locale.value:', currentLocale.value)
    const result = currentLocale.value === 'zh-TW' ? zhTw : enUs
    console.log('🔍 [useComponentElementLocale] 返回結果:', result.name)
    return result
  })
}

// 導出類型
export type { I18n, Composer }

import { createI18n, type I18n, type Composer } from 'vue-i18n'
import { computed } from 'vue'
import { messages } from '../locales'
import zhTw from 'element-plus/es/locale/lang/zh-tw'

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
 *
 * @deprecated This only controls the legacy standalone composer. Component text
 * follows the host application's vue-i18n instance.
 */
export function setLocale(locale: string): void {
  const i18n = getInternalI18n()
  const global = i18n.global as Composer
  global.locale.value = locale
}

/**
 * 全域 i18n 實例（用於非組件環境）
 *
 * @deprecated Use the host application's composer. This legacy composer does
 * not control text rendered by library components.
 */
export function useI18n() {
  const i18n = getInternalI18n()
  return i18n.global as Composer
}

/**
 * 組件庫內部使用的 Element Plus locale composable
 * 專門用於組件庫內部的 Element Plus 組件
 *
 * @deprecated Let pagination inherit the host ElConfigProvider or pass the
 * component's locale prop for a local override.
 */
export function useComponentElementLocale() {
  // 直接返回預設中文
  return computed(() => zhTw)
}

// 導出類型
export type { I18n, Composer }

import { onScopeDispose, ref, watch } from 'vue'

export type DemoTheme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'rvtc-demo-theme'

function readStored(): DemoTheme {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'dark' || value === 'system' ? value : 'light'
  } catch {
    return 'light'
  }
}

export function useDemoTheme() {
  const theme = ref<DemoTheme>(readStored())
  const query = window.matchMedia('(prefers-color-scheme: dark)')
  const apply = () =>
    document.documentElement.classList.toggle('dark', theme.value === 'dark' || (theme.value === 'system' && query.matches))

  watch(
    theme,
    (value) => {
      try {
        localStorage.setItem(STORAGE_KEY, value)
      } catch {
        // 儲存失敗時仍套用本次選擇
      }
      apply()
    },
    { immediate: true, flush: 'sync' },
  )
  query.addEventListener('change', apply)
  onScopeDispose(() => query.removeEventListener('change', apply))

  return { theme }
}

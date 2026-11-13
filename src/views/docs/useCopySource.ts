import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'

export function useCopySource(getSource: () => string) {
  const { copy, isSupported } = useClipboard()
  const copying = ref(false)
  const status = ref('')

  async function copySource() {
    if (copying.value) return
    if (!isSupported.value) {
      status.value = '此環境無法複製，請手動選取下方程式碼。'
      return
    }
    copying.value = true
    status.value = '複製中…'
    try {
      await copy(getSource())
      status.value = '已複製程式碼。'
    } catch {
      status.value = '複製失敗，請重試或手動選取下方程式碼。'
    } finally {
      copying.value = false
    }
  }

  return { copying, status, copySource }
}

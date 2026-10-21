<script setup lang="ts">
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import BaseBtn from '../../components/items/BaseBtn.vue'

const props = defineProps<{ source: string }>()
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
    await copy(props.source)
    status.value = '已複製程式碼。'
  } catch {
    status.value = '複製失敗，請重試或手動選取下方程式碼。'
  } finally {
    copying.value = false
  }
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex flex-wrap items-center gap-3">
      <BaseBtn text="複製程式碼" :loading="copying" :aria-busy="copying" @click="copySource" />
      <span role="status">{{ status }}</span>
    </div>
    <pre class="example-code"><code v-text="source" /></pre>
  </div>
</template>

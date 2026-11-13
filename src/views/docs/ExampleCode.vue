<script setup lang="ts">
import BaseBtn from '../../components/items/BaseBtn.vue'
import { useCopySource } from './useCopySource'

const props = defineProps<{ source: string }>()
const { copying, status, copySource } = useCopySource(() => props.source)
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

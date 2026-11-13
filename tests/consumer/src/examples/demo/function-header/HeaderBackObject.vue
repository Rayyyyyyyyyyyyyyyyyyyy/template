<script setup lang="ts">
import { ref } from 'vue'
import { FunctionHeader } from 'rayyy-vue-table-components/components'

const payload = ref('尚未返回')
</script>

<template>
  <div class="stack">
    <FunctionHeader title="訂單管理" :show-back="{ path: '/orders', query: { status: 'pending' } }" @back="payload = JSON.stringify($event)" />
    <p class="result">back payload: <output aria-live="polite">{{ payload }}</output></p>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 16px;
}
.result {
  margin: 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
</style>

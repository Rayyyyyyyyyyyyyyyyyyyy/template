<script setup lang="ts">
import { ref } from 'vue'
import { SearchBar } from 'rayyy-vue-table-components/components'

const result = ref('')
</script>

<template>
  <div class="stack">
    <SearchBar show-search @keydown:enter="result = `搜尋關鍵字: ${$event}`" @update:clear="result = ''" />
    <p v-if="result" class="result">搜尋結果: {{ result }}</p>
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

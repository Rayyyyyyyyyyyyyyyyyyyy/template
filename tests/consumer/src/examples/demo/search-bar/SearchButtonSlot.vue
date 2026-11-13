<script setup lang="ts">
import { ref } from 'vue'
import { SearchBar, BaseBtn } from 'rayyy-vue-table-components/components'

const result = ref('')
</script>

<template>
  <div class="stack">
    <SearchBar show-search @keydown:enter="result = `搜尋關鍵字: ${$event}`" @update:clear="result = ''">
      <template #button>
        <div class="actions">
          <BaseBtn type="primary" @click="result = '進階搜尋'">進階搜尋</BaseBtn>
          <BaseBtn type="success" @click="result = '儲存搜尋'">儲存搜尋</BaseBtn>
        </div>
      </template>
    </SearchBar>
    <p v-if="result" class="result">操作: {{ result }}</p>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 16px;
}
.actions {
  display: flex;
  gap: 8px;
}
.result {
  margin: 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
</style>

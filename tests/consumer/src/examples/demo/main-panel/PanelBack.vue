<script setup lang="ts">
import { ref } from 'vue'
import { MainPanel, BaseBtn } from 'rayyy-vue-table-components/components'

const rows = ['數據項目 1', '數據項目 2', '數據項目 3']
const payload = ref('尚未返回')
</script>

<template>
  <MainPanel title="數據列表" show-back @click:back="payload = JSON.stringify($event)">
    <template #main>
      <ul class="rows">
        <li v-for="row in rows" :key="row" class="row">
          <span>{{ row }}</span>
          <div class="actions">
            <BaseBtn type="default" size="small">編輯</BaseBtn>
            <BaseBtn type="default" size="small">刪除</BaseBtn>
          </div>
        </li>
      </ul>
    </template>
    <template #footer>
      <p class="result">click:back payload: <output aria-live="polite">{{ payload }}</output>（實際導頁由宿主決定）</p>
    </template>
  </MainPanel>
</template>

<style scoped>
.rows {
  display: grid;
  gap: 16px;
  margin: 0;
  padding: 24px;
  list-style: none;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 4px;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-primary);
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

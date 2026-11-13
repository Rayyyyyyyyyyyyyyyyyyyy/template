<script setup lang="ts">
import { MainPanel } from 'rayyy-vue-table-components/components'
</script>

<template>
  <MainPanel title="統計信息">
    <template #main>
      <div class="cards">
        <div class="card">
          <h4>總用戶數</h4>
          <p>1,234</p>
        </div>
        <div class="card">
          <h4>活躍用戶</h4>
          <p>856</p>
        </div>
        <div class="card">
          <h4>新增用戶</h4>
          <p>42</p>
        </div>
      </div>
    </template>
  </MainPanel>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  padding: 24px;
}
.card {
  padding: 16px;
  border-radius: 8px;
  background: var(--el-fill-color-light);
}
.card h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--el-color-primary);
}
.card p {
  margin: 4px 0 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--el-text-color-primary);
}
</style>

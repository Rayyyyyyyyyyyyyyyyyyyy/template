<script setup lang="ts">
import { MainPanel } from 'rayyy-vue-table-components/components'
</script>

<template>
  <MainPanel title="自定義面板">
    <template #main>
      <div class="custom">
        <h3>淺色背景</h3>
        <p>這是一個帶有淺色背景的自定義面板內容。</p>
      </div>
    </template>
  </MainPanel>
</template>

<style scoped>
.custom {
  margin: 24px;
  padding: 24px;
  border-radius: 8px;
  background: var(--el-color-primary-light-9);
  color: var(--el-text-color-primary);
}
.custom h3 {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}
.custom p {
  margin: 0;
}
</style>

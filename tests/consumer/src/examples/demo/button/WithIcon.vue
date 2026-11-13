<script setup lang="ts">
import { BaseBtn } from 'rayyy-vue-table-components/components'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
</script>

<template>
  <div class="row">
    <BaseBtn type="primary" :icon="Plus" text="添加" />
    <BaseBtn type="default" :icon="Edit" text="編輯" />
    <BaseBtn type="danger" :icon="Delete" text="刪除" />
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>

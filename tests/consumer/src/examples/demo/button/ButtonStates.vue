<script setup lang="ts">
import { BaseBtn } from 'rayyy-vue-table-components/components'
</script>

<template>
  <div class="row">
    <BaseBtn type="primary" text="正常按鈕" />
    <BaseBtn type="primary" :loading="true" text="載入中" />
    <BaseBtn type="primary" disabled text="禁用按鈕" />
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>

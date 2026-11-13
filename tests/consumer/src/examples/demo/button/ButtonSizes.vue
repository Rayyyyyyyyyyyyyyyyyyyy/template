<script setup lang="ts">
import { BaseBtn } from 'rayyy-vue-table-components/components'
</script>

<template>
  <div class="row">
    <BaseBtn type="primary" size="small" text="小按鈕" />
    <BaseBtn type="primary" size="default" text="中等按鈕" />
    <BaseBtn type="primary" size="large" text="大按鈕" />
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
</style>

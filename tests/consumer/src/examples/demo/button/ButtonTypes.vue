<script setup lang="ts">
import { BaseBtn } from 'rayyy-vue-table-components/components'
</script>

<template>
  <div class="row">
    <BaseBtn type="primary" text="主要按鈕" />
    <BaseBtn type="default" text="默認按鈕" />
    <BaseBtn type="danger" text="危險按鈕" />
    <BaseBtn type="success" text="成功按鈕" />
    <BaseBtn type="warning" text="警告按鈕" />
    <BaseBtn type="info" text="信息按鈕" />
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>

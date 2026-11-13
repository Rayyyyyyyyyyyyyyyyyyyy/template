<script setup lang="ts">
import { BaseBtn } from 'rayyy-vue-table-components/components'
</script>

<template>
  <div class="groups">
    <div>
      <h3>不同類型的禁用按鈕</h3>
      <div class="row">
        <BaseBtn type="primary" disabled text="主要按鈕" />
        <BaseBtn type="success" disabled text="成功按鈕" />
        <BaseBtn type="warning" disabled text="警告按鈕" />
        <BaseBtn type="danger" disabled text="危險按鈕" />
        <BaseBtn type="info" disabled text="信息按鈕" />
        <BaseBtn type="default" disabled text="默認按鈕" />
      </div>
    </div>
    <div>
      <h3>填充樣式的禁用按鈕</h3>
      <div class="row">
        <BaseBtn type="primary" disabled is-fill text="主要按鈕" />
        <BaseBtn type="success" disabled is-fill text="成功按鈕" />
        <BaseBtn type="warning" disabled is-fill text="警告按鈕" />
        <BaseBtn type="danger" disabled is-fill text="危險按鈕" />
        <BaseBtn type="info" disabled is-fill text="信息按鈕" />
      </div>
    </div>
    <div>
      <h3>樸素樣式的禁用按鈕</h3>
      <div class="row">
        <BaseBtn type="primary" disabled plain text="主要按鈕" />
        <BaseBtn type="success" disabled plain text="成功按鈕" />
        <BaseBtn type="warning" disabled plain text="警告按鈕" />
        <BaseBtn type="danger" disabled plain text="危險按鈕" />
        <BaseBtn type="info" disabled plain text="信息按鈕" />
      </div>
    </div>
    <div>
      <h3>文字按鈕的禁用狀態</h3>
      <div class="row">
        <BaseBtn type="primary" disabled link text="主要按鈕" />
        <BaseBtn type="success" disabled link text="成功按鈕" />
        <BaseBtn type="warning" disabled link text="警告按鈕" />
        <BaseBtn type="danger" disabled link text="危險按鈕" />
        <BaseBtn type="info" disabled link text="信息按鈕" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.groups {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
h3 {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 500;
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>

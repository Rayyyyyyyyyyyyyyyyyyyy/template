<script setup lang="ts">
import { ref } from 'vue'
import { BaseBtn, BaseDialog } from 'rayyy-vue-table-components/components'

const visible = ref(false)
</script>

<template>
  <BaseBtn type="default" @click="visible = true">打開大尺寸對話框</BaseBtn>
  <BaseDialog v-model="visible" title="大尺寸對話框" width="800px">
    <h3 class="heading">對話框內容</h3>
    <p>這是一個較大尺寸的對話框，適合顯示更多內容。</p>
    <div class="box">
      <p>您可以在這裡放置表單、列表或其他複雜內容。</p>
    </div>
  </BaseDialog>
</template>

<style scoped>
.heading {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}
.box {
  padding: 16px;
  border-radius: 4px;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-regular);
}
.box p {
  margin: 0;
}
</style>

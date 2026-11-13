<script setup lang="ts">
import { ref } from 'vue'
import { BaseBtn, BaseWarningDialog } from 'rayyy-vue-table-components/components'

const visible = ref(false)

const handleSubmit = () => {
  console.log('確認重置設定')
  visible.value = false
}
</script>

<template>
  <BaseBtn type="warning" @click="visible = true">重置設定</BaseBtn>
  <BaseWarningDialog
    v-model="visible"
    title-text="重置設定"
    warning-text="請問是否確認重置所有設定"
    sub-warning-text="此操作將重置所有設定為預設值，且無法恢復"
    @update:submit="handleSubmit"
  >
    <div class="content">
      <p class="hint">此操作將重置所有設定為預設值，且無法恢復</p>
      <p class="question">請問是否確認重置所有設定 ?</p>
    </div>
  </BaseWarningDialog>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 64px;
}
.hint {
  margin: 0 0 8px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
.question {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}
</style>

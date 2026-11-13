<script setup lang="ts">
import { ref } from 'vue'
import { Warning } from '@element-plus/icons-vue'
import { BaseBtn, BaseWarningDialog } from 'rayyy-vue-table-components/components'

const visible = ref(false)

const handleSubmit = () => {
  console.log('確認退出系統')
  visible.value = false
}
</script>

<template>
  <BaseBtn type="danger" @click="visible = true">退出系統</BaseBtn>
  <BaseWarningDialog
    v-model="visible"
    title-text="退出系統"
    warning-text="請問是否確認退出系統"
    sub-warning-text="您將失去所有未儲存的變更"
    @update:submit="handleSubmit"
  >
    <div class="content">
      <div class="hint">
        <el-icon :size="20"><Warning /></el-icon>
        <p>您將失去所有未儲存的變更</p>
      </div>
      <p class="question">請問是否確認退出系統 ?</p>
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
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: var(--el-color-warning);
}
.hint p {
  margin: 0;
  font-size: 14px;
}
.question {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}
</style>

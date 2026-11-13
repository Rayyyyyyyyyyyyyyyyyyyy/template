<script setup lang="ts">
import { ref } from 'vue'
import { Warning } from '@element-plus/icons-vue'
import { BaseBtn, BaseDialog } from 'rayyy-vue-table-components/components'

const visible = ref(false)

const handleConfirm = () => {
  console.log('確認危險操作')
  visible.value = false
}
const handleCancel = () => {
  console.log('取消危險操作')
  visible.value = false
}
</script>

<template>
  <BaseBtn type="danger" @click="visible = true">打開警告對話框</BaseBtn>
  <BaseDialog
    v-model="visible"
    title="危險操作"
    sub-title="此操作不可逆轉，將永久刪除所有數據！"
    :is-warning="true"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <div class="alert">
      <el-icon class="alert__icon" :size="24"><Warning /></el-icon>
      <div>
        <h4 class="alert__title">警告</h4>
        <p class="alert__text">此操作將刪除所有相關數據，且無法恢復。</p>
      </div>
    </div>
    <p>請確保您已經備份了重要數據。</p>
  </BaseDialog>
</template>

<style scoped>
.alert {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 8px;
  background: var(--el-color-danger-light-9);
}
.alert__icon {
  color: var(--el-color-danger);
}
.alert__title {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--el-color-danger);
}
.alert__text {
  margin: 0;
  font-size: 14px;
  color: var(--el-color-danger);
}
</style>

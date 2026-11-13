<script setup lang="ts">
import { ref } from 'vue'
import { BaseBtn, BaseDialog } from 'rayyy-vue-table-components/components'

const visible = ref(false)

const handleConfirm = () => {
  console.log('確認操作')
  visible.value = false
}
const handleCancel = () => {
  console.log('取消操作')
  visible.value = false
}
</script>

<template>
  <BaseBtn type="warning" @click="visible = true">打開確認對話框</BaseBtn>
  <BaseDialog
    v-model="visible"
    title="確認操作"
    sub-title="此操作將永久刪除該文件，是否繼續？"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <p>這是一個確認對話框，用於確認重要操作。</p>
    <p>請仔細考慮後再決定是否繼續。</p>
  </BaseDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseBtn, BaseWarningDialog } from 'rayyy-vue-table-components/components'

const visible = ref(false)

const handleSubmit = () => {
  console.log('確認刪除檔案')
  visible.value = false
}
</script>

<template>
  <BaseBtn type="danger" @click="visible = true">刪除檔案</BaseBtn>
  <BaseWarningDialog
    v-model="visible"
    title-text="刪除檔案"
    warning-text="請問是否確認刪除該檔案"
    sub-warning-text="此操作將永久刪除該檔案，且無法恢復"
    @update:submit="handleSubmit"
  />
</template>

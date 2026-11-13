<script setup lang="ts">
import { ref } from 'vue'
import { BaseBtn, BaseWarningDialog } from 'rayyy-vue-table-components/components'

const visible = ref(false)

const handleSubmit = () => {
  console.log('確認移除使用者')
  visible.value = false
}
</script>

<template>
  <BaseBtn type="danger" @click="visible = true">移除使用者</BaseBtn>
  <BaseWarningDialog
    v-model="visible"
    title-text="移除使用者"
    warning-text="請問是否確認移除該使用者"
    sub-warning-text="此操作將永久移除該使用者，且無法恢復"
    @update:submit="handleSubmit"
  />
</template>

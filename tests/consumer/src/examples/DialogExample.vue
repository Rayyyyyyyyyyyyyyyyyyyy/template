<script setup lang="ts">
import { ref } from 'vue'
import { BaseDialog, BaseBtn } from 'rayyy-vue-table-components/components'
const open = ref(false)
function confirm() { open.value = false }
</script>

<template>
  <BaseBtn text="開啟" @click="open = true" />
  <!-- customWidth 優先；未傳時 <500px 視窗為 100%，其餘 50%。 -->
  <BaseDialog v-model="open" title="確認操作" custom-width="720px" is-waring @click:submit="confirm">
    <p>取消會發出 update:modelValue(false)，確認使用既有 click:submit。</p>
  </BaseDialog>
</template>

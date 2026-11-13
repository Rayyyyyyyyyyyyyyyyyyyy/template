<script setup lang="ts">
import { ref } from 'vue'
import { BaseBtn, BaseDialog } from 'rayyy-vue-table-components/components'

const visible = ref(false)
</script>

<template>
  <BaseBtn type="primary" @click="visible = true">打開基礎對話框</BaseBtn>
  <BaseDialog v-model="visible" title="基礎對話框" width="500px" sub-title="副標題說明">
    <p>這是一個基礎的對話框內容。</p>
    <p>您可以在此處放置任何內容。</p>
  </BaseDialog>
</template>

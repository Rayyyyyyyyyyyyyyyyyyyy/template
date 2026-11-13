<script setup lang="ts">
import { ref } from 'vue'
import { BaseBtn, BaseDialog } from 'rayyy-vue-table-components/components'

const visible = ref(false)
</script>

<template>
  <BaseBtn type="danger" @click="visible = true">危險確認（dangerSubmit）</BaseBtn>
  <BaseDialog
    v-model="visible"
    title="危險確認"
    danger-submit
    @confirm="visible = false"
    @cancel="visible = false"
  >
    <p>確認鈕為 danger 色；打開後焦點在取消。</p>
  </BaseDialog>
</template>

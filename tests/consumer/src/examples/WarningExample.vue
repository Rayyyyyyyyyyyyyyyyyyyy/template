<script setup lang="ts">
import { ref } from 'vue'
import { BaseBtn, BaseWarningDialog } from 'rayyy-vue-table-components/components'
const open = ref(false)
const confirmed = ref(false)
function confirm() { confirmed.value = true; open.value = false }
</script>

<template>
  <BaseBtn text="開啟警告" @click="open = true" />
  <!-- BaseWarningDialog 與 update:submit 事件。 -->
  <BaseWarningDialog v-model="open" title-text="確認操作" warning-text="是否確認"
    @update:submit="confirm" />
  <output aria-live="polite">{{ confirmed ? '已確認' : '尚未確認' }}</output>
</template>

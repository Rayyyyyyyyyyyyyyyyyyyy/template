<script setup lang="ts">
import { ref } from 'vue'
import { BaseBtn, FunctionHeader } from 'rayyy-vue-table-components/components'
const destination = ref('')
</script>

<template>
  <!-- 返回只發出 payload，實際導頁由宿主決定。操作放在 default slot。 -->
  <FunctionHeader title="用戶管理" show-back="/demo" @back="destination = $event.path || ''">
    <BaseBtn text="新增" @click="destination = '新增操作'" />
  </FunctionHeader>
  <output aria-live="polite">{{ destination }}</output>
</template>

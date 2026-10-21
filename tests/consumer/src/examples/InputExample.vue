<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput, BaseSelector } from 'rayyy-vue-table-components/components'

const name = ref('')
const status = ref<string | null>(null)
const options = [{ value: 'active', label: '啟用' }, { value: 'inactive', label: '停用' }]
</script>

<template>
  <!-- 驗證規則由宿主 ElForm / ElFormItem 管理，BaseInput 不提供 rules prop。 -->
  <BaseInput v-model="name" aria-label="姓名" placeholder="請輸入姓名" />
  <BaseSelector v-model="status" :options="options" aria-label="狀態" placeholder="請選擇狀態" />
  <output>{{ name }} / {{ status }}</output>
</template>

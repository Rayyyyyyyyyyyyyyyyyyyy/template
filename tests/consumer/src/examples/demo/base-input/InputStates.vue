<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from 'rayyy-vue-table-components/components'

const normal = ref('')
const disabled = ref('禁用內容')
const readonly = ref('只讀內容')
const error = ref('')
</script>

<template>
  <div class="grid">
    <label class="field">
      <span class="label">正常狀態</span>
      <BaseInput v-model="normal" placeholder="正常輸入框" />
    </label>
    <label class="field">
      <span class="label">禁用狀態</span>
      <BaseInput v-model="disabled" disabled placeholder="禁用輸入框" />
    </label>
    <label class="field">
      <span class="label">只讀狀態</span>
      <BaseInput v-model="readonly" readonly placeholder="只讀輸入框" />
    </label>
    <label class="field">
      <span class="label">錯誤狀態</span>
      <BaseInput v-model="error" error placeholder="錯誤輸入框" />
    </label>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.field {
  display: block;
}
.label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--el-text-color-regular);
}
</style>

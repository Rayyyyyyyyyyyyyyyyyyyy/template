<script setup lang="ts">
import { ref } from 'vue'
import { BaseSelector } from 'rayyy-vue-table-components/components'

const options = [
  { value: 'option1', label: '選項一' },
  { value: 'option2', label: '選項二' },
  { value: 'option3', label: '選項三' },
  { value: 'option4', label: '選項四' },
  { value: 'option5', label: '選項五' },
]

const disabledValue = ref('option2')
const normalValue = ref('')
</script>

<template>
  <div class="row">
    <div class="field">
      <label>禁用選擇器</label>
      <BaseSelector v-model="disabledValue" :options="options" placeholder="請選擇選項" disabled />
      <p class="value">當前值: {{ disabledValue || '未選擇' }}</p>
    </div>
    <div class="field">
      <label>正常選擇器</label>
      <BaseSelector v-model="normalValue" :options="options" placeholder="請選擇選項" :disabled="false" />
      <p class="value">當前值: {{ normalValue || '未選擇' }}</p>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.field label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--el-text-color-regular);
}
.value {
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
</style>

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

const narrowValue = ref('')
const fullValue = ref('')
</script>

<template>
  <div class="stack">
    <div class="field">
      <label>自定義寬度</label>
      <BaseSelector v-model="narrowValue" :options="options" placeholder="請選擇選項" class="narrow" />
    </div>
    <div class="field">
      <label>全寬度</label>
      <BaseSelector v-model="fullValue" :options="options" placeholder="請選擇選項" class="full" />
    </div>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 16px;
}
.field label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--el-text-color-regular);
}
.narrow {
  width: 256px;
}
.full {
  width: 100%;
}
</style>

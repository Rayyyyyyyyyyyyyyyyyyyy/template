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
const fruits = [
  { value: 'apple', label: '蘋果' },
  { value: 'banana', label: '香蕉' },
  { value: 'orange', label: '橘子' },
  { value: 'grape', label: '葡萄' },
  { value: 'strawberry', label: '草莓' },
]

const single = ref('option2')
const multiple = ref<string[]>(['apple', 'banana'])
</script>

<template>
  <div class="row">
    <div class="field">
      <label>基本選擇器（可清空）</label>
      <BaseSelector v-model="single" :options="options" placeholder="請選擇選項" />
      <p class="value">當前值: {{ single || '未選擇' }}</p>
    </div>
    <div class="field">
      <label>多選選擇器（可清空）</label>
      <BaseSelector v-model="multiple" :options="fruits" placeholder="請選擇水果" multiple />
      <p class="value">當前值: {{ multiple.length ? multiple.join(', ') : '未選擇' }}</p>
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

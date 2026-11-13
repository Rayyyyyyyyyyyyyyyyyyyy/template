<script setup lang="ts">
import { ref } from 'vue'
import { BaseSelector } from 'rayyy-vue-table-components/components'

const fruits = [
  { value: 'apple', label: '蘋果' },
  { value: 'banana', label: '香蕉' },
  { value: 'orange', label: '橘子' },
  { value: 'grape', label: '葡萄' },
  { value: 'strawberry', label: '草莓' },
]

const collapsed = ref<string[]>(['apple', 'banana', 'orange'])
const expanded = ref<string[]>(['apple', 'banana', 'orange'])
</script>

<template>
  <div class="row">
    <div class="field">
      <label>折疊標籤（顯示提示）</label>
      <BaseSelector v-model="collapsed" :options="fruits" placeholder="請選擇水果" multiple collapse-tags collapse-tags-tooltip />
      <p class="value">當前值: {{ collapsed.length ? collapsed.join(', ') : '未選擇' }}</p>
    </div>
    <div class="field">
      <label>不折疊標籤</label>
      <BaseSelector v-model="expanded" :options="fruits" placeholder="請選擇水果" multiple :collapse-tags="false" />
      <p class="value">當前值: {{ expanded.length ? expanded.join(', ') : '未選擇' }}</p>
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

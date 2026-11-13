<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from 'rayyy-vue-table-components/components'

const clearable = ref('可清除的內容')
const withEvents = ref('')
const log = ref('尚無事件')

const handleInput = (value: string) => {
  log.value = `輸入值變更：${value}`
}
const handleFocus = () => {
  log.value = '輸入框獲得焦點'
}
const handleBlur = () => {
  log.value = '輸入框失去焦點'
}
</script>

<template>
  <div class="grid">
    <label class="field">
      <span class="label">可清除輸入框</span>
      <BaseInput v-model="clearable" placeholder="輸入內容後可清除" clearable />
    </label>
    <label class="field">
      <span class="label">帶事件處理</span>
      <BaseInput
        v-model="withEvents"
        placeholder="帶事件處理的輸入框"
        clearable
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span class="log" role="status">{{ log }}</span>
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
.log {
  display: block;
  margin-top: 8px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}
</style>

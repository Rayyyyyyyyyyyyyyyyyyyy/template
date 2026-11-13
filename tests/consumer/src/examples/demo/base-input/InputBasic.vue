<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from 'rayyy-vue-table-components/components'

const text = ref('')
const password = ref('')
const email = ref('')
const number = ref('')
</script>

<template>
  <div class="grid">
    <label class="field">
      <span class="label">普通輸入框</span>
      <BaseInput v-model="text" placeholder="請輸入內容" />
    </label>
    <label class="field">
      <span class="label">密碼輸入框</span>
      <BaseInput v-model="password" type="password" placeholder="請輸入密碼" />
    </label>
    <label class="field">
      <span class="label">郵箱輸入框</span>
      <BaseInput v-model="email" type="email" placeholder="請輸入郵箱" />
    </label>
    <label class="field">
      <span class="label">數字輸入框</span>
      <BaseInput v-model="number" type="number" placeholder="請輸入數字" />
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

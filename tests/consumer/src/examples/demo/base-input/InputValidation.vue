<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from 'rayyy-vue-table-components/components'

const username = ref('')
const email = ref('')
const password = ref('')

const usernameRules = [
  { required: true, message: '請輸入用戶名', trigger: 'blur' },
  { min: 3, max: 20, message: '長度在 3 到 20 個字符', trigger: 'blur' },
]
const emailRules = [{ type: 'email', message: '請輸入正確的郵箱地址', trigger: 'blur' }]
const passwordRules = [
  { required: true, message: '請輸入密碼', trigger: 'blur' },
  { min: 6, message: '密碼長度不能少於 6 位', trigger: 'blur' },
]
</script>

<template>
  <div class="grid">
    <label class="field">
      <span class="label">用戶名驗證</span>
      <BaseInput v-model="username" placeholder="請輸入用戶名" :rules="usernameRules" clearable />
    </label>
    <label class="field">
      <span class="label">郵箱驗證</span>
      <BaseInput v-model="email" type="email" placeholder="請輸入郵箱" :rules="emailRules" clearable />
    </label>
    <label class="field">
      <span class="label">密碼驗證</span>
      <BaseInput v-model="password" type="password" placeholder="請輸入密碼" :rules="passwordRules" show-password />
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

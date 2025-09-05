<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">BaseForm 組件示範</h1>

      <!-- 基礎表單 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">基礎表單</h2>
        </template>
        <BaseForm
          :model="formData"
          :rules="formRules"
          @submit="handleSubmit"
          @reset="handleReset"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formData.name" placeholder="請輸入姓名" />
          </el-form-item>

          <el-form-item label="郵箱" prop="email">
            <el-input v-model="formData.email" type="email" placeholder="請輸入郵箱" />
          </el-form-item>

          <el-form-item label="年齡" prop="age">
            <el-input-number v-model="formData.age" :min="1" :max="120" />
          </el-form-item>

          <el-form-item label="性別" prop="gender">
            <el-select v-model="formData.gender" placeholder="請選擇性別">
              <el-option label="男" value="male" />
              <el-option label="女" value="female" />
            </el-select>
          </el-form-item>

          <el-form-item label="愛好" prop="hobbies">
            <el-checkbox-group v-model="formData.hobbies">
              <el-checkbox label="reading">閱讀</el-checkbox>
              <el-checkbox label="music">音樂</el-checkbox>
              <el-checkbox label="sports">運動</el-checkbox>
              <el-checkbox label="travel">旅行</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="備註" prop="remark">
            <el-input
              v-model="formData.remark"
              type="textarea"
              :rows="3"
              placeholder="請輸入備註"
            />
          </el-form-item>
        </BaseForm>
      </el-card>

      <!-- 表單驗證結果 -->
      <el-card class="mb-8" shadow="always" v-if="submitResult">
        <template #header>
          <h2 class="text-xl font-semibold">表單提交結果</h2>
        </template>
        <pre class="bg-gray-100 p-4 rounded text-sm">{{ JSON.stringify(submitResult, null, 2) }}</pre>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseForm } from '@/components'

const formData = ref({
  name: '',
  email: '',
  age: null,
  gender: '',
  hobbies: [],
  remark: ''
})

const submitResult = ref(null)

const formRules = {
  name: [
    { required: true, message: '請輸入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '姓名長度應為 2 到 10 個字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '請輸入郵箱', trigger: 'blur' },
    { type: 'email', message: '請輸入正確的郵箱格式', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '請輸入年齡', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '請選擇性別', trigger: 'change' }
  ]
}

const handleSubmit = (data: any) => {
  console.log('表單提交:', data)
  submitResult.value = data
}

const handleReset = () => {
  console.log('表單重置')
  submitResult.value = null
}
</script>

<style scoped></style>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from '@/components'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const input4 = ref('')
const input5 = ref('')
const input6 = ref('禁用內容')
const input7 = ref('只讀內容')
const input8 = ref('')
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">BaseInput 組件示範</h1>

      <!-- 基礎輸入框 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">基礎輸入框</h2>
        </template>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">普通輸入框</label>
              <BaseInput v-model="input1" placeholder="請輸入內容" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">密碼輸入框</label>
              <BaseInput v-model="input2" type="password" placeholder="請輸入密碼" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">郵箱輸入框</label>
              <BaseInput v-model="input3" type="email" placeholder="請輸入郵箱" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">數字輸入框</label>
              <BaseInput v-model="input4" type="number" placeholder="請輸入數字" />
            </div>
          </div>
        </div>
      </el-card>

      <!-- 輸入框狀態 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">輸入框狀態</h2>
        </template>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">正常狀態</label>
              <BaseInput v-model="input5" placeholder="正常輸入框" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">禁用狀態</label>
              <BaseInput v-model="input6" disabled placeholder="禁用輸入框" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">只讀狀態</label>
              <BaseInput v-model="input7" readonly placeholder="只讀輸入框" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">錯誤狀態</label>
              <BaseInput v-model="input8" error placeholder="錯誤輸入框" />
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped></style>

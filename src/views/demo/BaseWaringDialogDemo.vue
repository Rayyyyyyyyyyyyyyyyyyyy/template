<script setup lang="ts">
import { ref } from 'vue'
import { BaseWaringDialog, BaseBtn } from '@/components'

const showDialog1 = ref(false)
const showDialog2 = ref(false)
const showDialog3 = ref(false)
const showDialog4 = ref(false)

const handleSubmit1 = () => {
  console.log('確認移除使用者')
  showDialog1.value = false
}

const handleSubmit2 = () => {
  console.log('確認刪除檔案')
  showDialog2.value = false
}

const handleSubmit3 = () => {
  console.log('確認重置設定')
  showDialog3.value = false
}

const handleSubmit4 = () => {
  console.log('確認退出系統')
  showDialog4.value = false
}
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">BaseWaringDialog 組件示範</h1>

      <!-- 基礎警告對話框 -->
      <el-card class="mb-8" shadow="never">
        <template #header>
          <h2 class="text-xl font-semibold">基礎警告對話框</h2>
        </template>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4">
            <BaseBtn type="danger" @click="showDialog1 = true">移除使用者</BaseBtn>
            <BaseBtn type="danger" @click="showDialog2 = true">刪除檔案</BaseBtn>
            <BaseBtn type="warning" @click="showDialog3 = true">重置設定</BaseBtn>
            <BaseBtn type="danger" @click="showDialog4 = true">退出系統</BaseBtn>
          </div>
        </div>
      </el-card>

      <!-- 移除使用者警告對話框 -->
      <BaseWaringDialog
        v-model="showDialog1"
        title-text="移除使用者"
        waring-text="請問是否確認移除該使用者"
        sub-waring-text="此操作將永久移除該使用者，且無法恢復"
        @update:submit="handleSubmit1"
      />

      <!-- 刪除檔案警告對話框 -->
      <BaseWaringDialog
        v-model="showDialog2"
        title-text="刪除檔案"
        waring-text="請問是否確認刪除該檔案"
        sub-waring-text="此操作將永久刪除該檔案，且無法恢復"
        @update:submit="handleSubmit2"
      />

      <!-- 重置設定警告對話框 -->
      <BaseWaringDialog
        v-model="showDialog3"
        title-text="重置設定"
        waring-text="請問是否確認重置所有設定"
        sub-waring-text="此操作將重置所有設定為預設值，且無法恢復"
        @update:submit="handleSubmit3"
      >
        <div class="w-full h-16 flex items-center justify-center flex-col">
          <p class="text-sm text-gray-600 mb-2">此操作將重置所有設定為預設值，且無法恢復</p>
          <p class="text-base font-medium">請問是否確認重置所有設定 ?</p>
        </div>
      </BaseWaringDialog>

      <!-- 退出系統警告對話框 -->
      <BaseWaringDialog
        v-model="showDialog4"
        title-text="退出系統"
        waring-text="請問是否確認退出系統"
        sub-waring-text="您將失去所有未儲存的變更"
        @update:submit="handleSubmit4"
      >
        <div class="w-full h-16 flex items-center justify-center flex-col">
          <div class="flex items-center mb-2">
            <svg
              class="w-5 h-5 text-orange-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <p class="text-sm text-orange-600">您將失去所有未儲存的變更</p>
          </div>
          <p class="text-base font-medium">請問是否確認退出系統 ?</p>
        </div>
      </BaseWaringDialog>
    </div>
  </div>
</template>

<style scoped></style>

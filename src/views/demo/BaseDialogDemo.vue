<script setup lang="ts">
import { ref } from 'vue'
import { BaseDialog, BaseBtn } from '@/components'

const showDialog1 = ref(false)
const showDialog2 = ref(false)
const showDialog3 = ref(false)
const showDialog4 = ref(false)
const showDialog5 = ref(false)

const form = ref({
  name: '',
  email: '',
})

const handleSubmit = () => {
  console.log('提交表單:', form.value)
  showDialog3.value = false
}

const handleConfirm = () => {
  console.log('確認操作')
  showDialog4.value = false
}

const handleCancel = () => {
  console.log('取消操作')
  showDialog4.value = false
}

const handleWarningConfirm = () => {
  console.log('確認危險操作')
  showDialog5.value = false
}

const handleWarningCancel = () => {
  console.log('取消危險操作')
  showDialog5.value = false
}
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">BaseDialog 組件示範</h1>

      <!-- 基礎對話框 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">基礎對話框</h2>
        </template>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4">
            <BaseBtn type="primary" @click="showDialog1 = true">打開基礎對話框</BaseBtn>
            <BaseBtn type="default" @click="showDialog2 = true">打開大尺寸對話框</BaseBtn>
            <BaseBtn type="success" @click="showDialog3 = true">打開自定義對話框</BaseBtn>
            <BaseBtn type="warning" @click="showDialog4 = true">打開確認對話框</BaseBtn>
            <BaseBtn type="danger" @click="showDialog5 = true">打開警告對話框</BaseBtn>
          </div>
        </div>
      </el-card>

      <!-- 基礎對話框 -->
      <BaseDialog v-model="showDialog1" title="基礎對話框" width="500px" sub-title="testt">
        <p>這是一個基礎的對話框內容。</p>
        <p>您可以在此處放置任何內容。</p>
      </BaseDialog>

      <!-- 大尺寸對話框 -->
      <BaseDialog v-model="showDialog2" title="大尺寸對話框" width="800px">
        <div class="space-y-4">
          <h3 class="text-lg font-medium">對話框內容</h3>
          <p>這是一個較大尺寸的對話框，適合顯示更多內容。</p>
          <div class="bg-gray-100 p-4 rounded">
            <p>您可以在這裡放置表單、列表或其他複雜內容。</p>
          </div>
        </div>
      </BaseDialog>

      <!-- 自定義對話框 -->
      <BaseDialog v-model="showDialog3" title="自定義對話框" width="600px">
        <template #header>
          <div class="flex items-center">
            <svg
              class="w-6 h-6 text-blue-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="text-lg font-semibold">自定義標題</span>
          </div>
        </template>

        <div class="space-y-4">
          <p>這是一個自定義標題的對話框。</p>
          <el-form :model="form" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="form.name" placeholder="請輸入姓名" />
            </el-form-item>
            <el-form-item label="郵箱">
              <el-input v-model="form.email" placeholder="請輸入郵箱" />
            </el-form-item>
          </el-form>
        </div>

        <template #footer>
          <div class="flex justify-end space-x-2">
            <BaseBtn type="default" @click="showDialog3 = false">取消</BaseBtn>
            <BaseBtn type="primary" @click="handleSubmit">確定</BaseBtn>
          </div>
        </template>
      </BaseDialog>

      <!-- 確認對話框 -->
      <BaseDialog
        v-model="showDialog4"
        title="確認操作"
        sub-title="此操作將永久刪除該文件，是否繼續？"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        <p>這是一個確認對話框，用於確認重要操作。</p>
        <p>請仔細考慮後再決定是否繼續。</p>
      </BaseDialog>

      <!-- 警告對話框 -->
      <BaseDialog
        v-model="showDialog5"
        title="危險操作"
        sub-title="此操作不可逆轉，將永久刪除所有數據！"
        :is-warning="true"
        @confirm="handleWarningConfirm"
        @cancel="handleWarningCancel"
      >
        <div class="space-y-4">
          <div class="flex items-center p-4 bg-red-50 rounded-lg">
            <svg
              class="w-6 h-6 text-red-600 mr-3"
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
            <div>
              <h4 class="text-sm font-medium text-red-800">警告</h4>
              <p class="text-sm text-red-700">此操作將刪除所有相關數據，且無法恢復。</p>
            </div>
          </div>
          <p>請確保您已經備份了重要數據。</p>
        </div>
      </BaseDialog>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { reactive } from 'vue'
import { DetailLayout, BaseInput, BaseBtn } from '@/components'

// ==================== 響應式數據 ====================
const state = reactive({
  // 編輯狀態
  isEditable: false,
  pageLoading: false,

  // 表單數據
  formData: {
    name: '張三',
    email: 'zhangsan@example.com',
    phone: '0912-345-678',
    department: '技術部',
    position: '前端工程師',
    joinDate: '2023-01-15',
    salary: '80000',
    status: '在職'
  }
})

// ==================== 事件處理函數 ====================
const handleSaveEdit = (value: boolean) => {
  console.log('保存編輯:', state.formData)
  state.isEditable = value
  // 這裡可以添加保存到後端的邏輯
}

const handleCancelEdit = () => {
  console.log('取消編輯')
  state.isEditable = false
  // 這裡可以添加重置表單的邏輯
}

const startEdit = () => {
  state.isEditable = true
}

const simulateLoading = () => {
  state.pageLoading = true
  setTimeout(() => {
    state.pageLoading = false
  }, 2000)
}
</script>

<template>
  <!-- DetailLayout 示範 -->
  <section class="mb-12">
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div class="px-8 py-6 border-b border-gray-100">
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">DetailLayout 示範</h2>
        <p class="text-gray-600 text-base leading-relaxed">
          展示 DetailLayout 組件的詳細頁面佈局功能
        </p>
      </div>
      <div class="p-8">
        <div class="flex items-center gap-3 mb-8">
          <BaseBtn type="primary" @click="startEdit" class="px-6 py-2.5" :disabled="state.isEditable">
            開始編輯
          </BaseBtn>
          <BaseBtn type="success" @click="simulateLoading" class="px-6 py-2.5">
            模擬加載
          </BaseBtn>
        </div>

        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          <DetailLayout
            title="員工詳細資料"
            :show-back="true"
            :is-editable="state.isEditable"
            :page-loading="state.pageLoading"
            @update:save-edit="handleSaveEdit"
            @update:cancel-edit="handleCancelEdit"
          >
            <template #detailHeader>
              <div class="bg-blue-50 border-b border-blue-200 px-6 py-4">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold text-blue-900">員工資訊</h3>
                    <p class="text-sm text-blue-700 mt-1">查看和編輯員工詳細資料</p>
                  </div>
                  <div class="text-right">
                    <div class="text-sm text-blue-600">員工編號: EMP001</div>
                    <div class="text-xs text-blue-500 mt-1">最後更新: 2024-01-15</div>
                  </div>
                </div>
              </div>
            </template>

            <template #main>
              <div class="p-6 space-y-6">
                <!-- 基本資訊 -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-4">
                    <h4 class="text-md font-medium text-gray-900 border-b border-gray-200 pb-2">基本資訊</h4>

                    <div class="space-y-3">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                        <BaseInput
                          v-model="state.formData.name"
                          :disabled="!state.isEditable"
                          placeholder="請輸入姓名"
                        />
                      </div>

                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">電子郵件</label>
                        <BaseInput
                          v-model="state.formData.email"
                          :disabled="!state.isEditable"
                          placeholder="請輸入電子郵件"
                        />
                      </div>

                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">電話</label>
                        <BaseInput
                          v-model="state.formData.phone"
                          :disabled="!state.isEditable"
                          placeholder="請輸入電話號碼"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <h4 class="text-md font-medium text-gray-900 border-b border-gray-200 pb-2">工作資訊</h4>

                    <div class="space-y-3">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">部門</label>
                        <BaseInput
                          v-model="state.formData.department"
                          :disabled="!state.isEditable"
                          placeholder="請輸入部門"
                        />
                      </div>

                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">職位</label>
                        <BaseInput
                          v-model="state.formData.position"
                          :disabled="!state.isEditable"
                          placeholder="請輸入職位"
                        />
                      </div>

                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">入職日期</label>
                        <BaseInput
                          v-model="state.formData.joinDate"
                          :disabled="!state.isEditable"
                          placeholder="請輸入入職日期"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 其他資訊 -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">薪資</label>
                    <BaseInput
                      v-model="state.formData.salary"
                      :disabled="!state.isEditable"
                      placeholder="請輸入薪資"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">狀態</label>
                    <BaseInput
                      v-model="state.formData.status"
                      :disabled="!state.isEditable"
                      placeholder="請輸入狀態"
                    />
                  </div>
                </div>
              </div>
            </template>
          </DetailLayout>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h4 class="text-lg font-medium text-blue-900 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            DetailLayout 功能特色
          </h4>
          <ul class="space-y-2 text-blue-800">
            <li class="flex items-start">
              <span class="text-blue-600 mr-2 mt-0.5">•</span>
              <span><strong>響應式佈局：</strong>自適應不同螢幕尺寸</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2 mt-0.5">•</span>
              <span><strong>編輯模式：</strong>支持可編輯和只讀模式切換</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2 mt-0.5">•</span>
              <span><strong>加載狀態：</strong>內建頁面加載狀態顯示</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2 mt-0.5">•</span>
              <span><strong>Slot 設計：</strong>支持自定義標題區域和主要內容</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2 mt-0.5">•</span>
              <span><strong>操作按鈕：</strong>內建保存和取消按鈕</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2 mt-0.5">•</span>
              <span><strong>返回功能：</strong>支持返回按鈕配置</span>
            </li>
          </ul>
        </div>

        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <h4 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            使用說明
          </h4>
          <ol class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span
                class="bg-gray-200 text-gray-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5"
                >1</span
              >
              <span>點擊「開始編輯」按鈕進入編輯模式</span>
            </li>
            <li class="flex items-start">
              <span
                class="bg-gray-200 text-gray-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5"
                >2</span
              >
              <span>在編輯模式下修改表單內容</span>
            </li>
            <li class="flex items-start">
              <span
                class="bg-gray-200 text-gray-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5"
                >3</span
              >
              <span>點擊「儲存」按鈕保存變更，或點擊「捨棄」取消編輯</span>
            </li>
            <li class="flex items-start">
              <span
                class="bg-gray-200 text-gray-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5"
                >4</span
              >
              <span>點擊「模擬加載」查看加載狀態效果</span>
            </li>
          </ol>
        </div>

        <div class="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h5 class="text-base font-medium text-amber-900 mb-2 flex items-center">
            <svg class="w-4 h-4 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            技術說明
          </h5>
          <p class="text-amber-800 text-sm leading-relaxed">
            DetailLayout 組件基於 MainPanel 構建，提供完整的詳細頁面佈局解決方案。
            支持編輯模式切換、加載狀態顯示、自定義標題區域等功能。
            適用於用戶資料、產品詳情、訂單詳情等需要展示和編輯的頁面場景。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>

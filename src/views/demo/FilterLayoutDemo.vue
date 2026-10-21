<script setup lang="ts">
import { reactive } from 'vue'
import { FilterLayout, BaseInput, BaseBtn } from '@/components'

// ==================== 響應式數據 ====================
const state = reactive({
  // 篩選表單數據
  filterForm: {
    keyword: '',
    category: '',
    status: '',
    dateRange: '',
    minPrice: '',
    maxPrice: ''
  },

  // 篩選結果
  filterResults: [
    { id: 1, name: '產品A', category: '電子產品', status: '在售', price: 2999 },
    { id: 2, name: '產品B', category: '服飾', status: '缺貨', price: 599 },
    { id: 3, name: '產品C', category: '電子產品', status: '在售', price: 1299 },
    { id: 4, name: '產品D', category: '家居用品', status: '在售', price: 399 },
    { id: 5, name: '產品E', category: '服飾', status: '停售', price: 799 }
  ],

  // 顯示結果
  showResults: false
})

// ==================== 事件處理函數 ====================
const handleSubmitFilter = () => {
  console.log('執行篩選:', state.filterForm)
  state.showResults = true

  // 這裡可以添加實際的篩選邏輯
  // 例如：調用 API 獲取篩選結果
}

const handleResetFilter = () => {
  console.log('重置篩選')
  state.filterForm = {
    keyword: '',
    category: '',
    status: '',
    dateRange: '',
    minPrice: '',
    maxPrice: ''
  }
  state.showResults = false
}

const clearResults = () => {
  state.showResults = false
}
</script>

<template>
  <!-- FilterLayout 示範 -->
  <section class="demo-page demo-container">
    <div class="demo-section overflow-hidden">
      <div class="example-heading">
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">FilterLayout 示範</h2>
        <p class="text-gray-600 text-base leading-relaxed">
          展示 FilterLayout 組件的篩選頁面佈局功能
        </p>
      </div>
      <div class="example-body">
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          <FilterLayout
            main-title="產品篩選"
            filter-title="篩選條件"
            @submit-emit="handleSubmitFilter"
            @reset-emit="handleResetFilter"
          >
            <div class="p-6 space-y-6">
              <!-- 關鍵字搜尋 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">關鍵字搜尋</label>
                <BaseInput
                  v-model="state.filterForm.keyword"
                  placeholder="請輸入產品名稱或描述"
                />
              </div>

              <!-- 分類和狀態 -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">產品分類</label>
                  <BaseInput
                    v-model="state.filterForm.category"
                    placeholder="請選擇分類"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">產品狀態</label>
                  <BaseInput
                    v-model="state.filterForm.status"
                    placeholder="請選擇狀態"
                  />
                </div>
              </div>

              <!-- 日期範圍 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">上架日期範圍</label>
                <BaseInput
                  v-model="state.filterForm.dateRange"
                  placeholder="請選擇日期範圍"
                />
              </div>

              <!-- 價格範圍 -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">最低價格</label>
                  <BaseInput
                    v-model="state.filterForm.minPrice"
                    placeholder="請輸入最低價格"
                    type="number"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">最高價格</label>
                  <BaseInput
                    v-model="state.filterForm.maxPrice"
                    placeholder="請輸入最高價格"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </FilterLayout>
        </div>

        <!-- 篩選結果 -->
        <div v-if="state.showResults" class="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">篩選結果</h3>
              <BaseBtn type="default" @click="clearResults" class="px-4 py-2">
                清除結果
              </BaseBtn>
            </div>
          </div>

          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="item in state.filterResults"
                :key="item.id"
                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900">{{ item.name }}</h4>
                  <span class="text-sm text-gray-500">#{{ item.id }}</span>
                </div>
                <div class="space-y-1 text-sm text-gray-600">
                  <div>分類: {{ item.category }}</div>
                  <div>狀態:
                    <span :class="{
                      'text-green-600': item.status === '在售',
                      'text-red-600': item.status === '缺貨',
                      'text-gray-600': item.status === '停售'
                    }">
                      {{ item.status }}
                    </span>
                  </div>
                  <div class="font-medium text-blue-600">NT$ {{ item.price.toLocaleString() }}</div>
                </div>
              </div>
            </div>
          </div>
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
            FilterLayout 功能特色
          </h4>
          <ul class="space-y-2 text-blue-800">
            <li class="flex items-start">
              <span class="text-blue-600 mr-2 mt-0.5">•</span>
              <span><strong>響應式佈局：</strong>自適應不同螢幕尺寸的篩選表單</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2 mt-0.5">•</span>
              <span><strong>靈活配置：</strong>支持自定義主要標題和篩選標題</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2 mt-0.5">•</span>
              <span><strong>操作按鈕：</strong>內建執行和重設按鈕</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2 mt-0.5">•</span>
              <span><strong>Slot 設計：</strong>支持完全自定義篩選表單內容</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2 mt-0.5">•</span>
              <span><strong>事件處理：</strong>提供篩選提交和重置事件</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2 mt-0.5">•</span>
              <span><strong>統一樣式：</strong>與其他佈局組件保持一致的設計風格</span>
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
              <span>填寫篩選條件表單</span>
            </li>
            <li class="flex items-start">
              <span
                class="bg-gray-200 text-gray-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5"
                >2</span
              >
              <span>點擊「執行」按鈕提交篩選條件</span>
            </li>
            <li class="flex items-start">
              <span
                class="bg-gray-200 text-gray-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5"
                >3</span
              >
              <span>查看篩選結果（本示範顯示模擬數據）</span>
            </li>
            <li class="flex items-start">
              <span
                class="bg-gray-200 text-gray-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5"
                >4</span
              >
              <span>點擊「重設」按鈕清空所有篩選條件</span>
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
            FilterLayout 組件基於 MainPanel 構建，提供完整的篩選頁面佈局解決方案。
            支持自定義篩選表單、統一的提交和重置操作、響應式佈局等功能。
            適用於產品篩選、數據查詢、報表篩選等需要複雜篩選條件的頁面場景。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>

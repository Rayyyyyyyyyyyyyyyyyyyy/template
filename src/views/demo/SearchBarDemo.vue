<script setup lang="ts">
import { ref } from 'vue'
import { SearchBar } from '@/components'

const searchKeyword = ref('')
const searchResult = ref('')

// 事件處理
const handleSearch = (keyword: string) => {
  console.log('搜尋:', keyword)
  searchResult.value = `搜尋關鍵字: ${keyword}`
}

const handleClear = () => {
  console.log('清除搜尋')
  searchResult.value = ''
}

const handleResetFilter = () => {
  console.log('重置篩選')
  searchKeyword.value = ''
  searchResult.value = ''
}
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">SearchBar 組件示範</h1>

      <!-- 基礎搜尋欄 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">基礎搜尋欄</h2>
        </template>
        <div class="space-y-4">
          <SearchBar
            :show-search="true"
            @keydown:enter="handleSearch"
            @update:clear="handleClear"
            @update:reset-filter="handleResetFilter"
          />
          <div v-if="searchResult" class="mt-4">
            <p class="text-sm text-gray-600">搜尋結果: {{ searchResult }}</p>
          </div>
        </div>
      </el-card>

      <!-- 搜尋欄功能展示 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">搜尋欄功能展示</h2>
        </template>
        <div class="space-y-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-medium mb-2">功能說明</h3>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start">
                <span class="text-gray-600 mr-2 mt-0.5">•</span>
                <span><strong>搜尋功能：</strong>支持 Enter 鍵觸發搜尋事件</span>
              </li>
              <li class="flex items-start">
                <span class="text-gray-600 mr-2 mt-0.5">•</span>
                <span><strong>清除功能：</strong>支持清除搜尋內容</span>
              </li>
              <li class="flex items-start">
                <span class="text-gray-600 mr-2 mt-0.5">•</span>
                <span><strong>重置篩選：</strong>支持重置所有篩選條件</span>
              </li>
              <li class="flex items-start">
                <span class="text-gray-600 mr-2 mt-0.5">•</span>
                <span><strong>按鈕插槽：</strong>支持自定義按鈕內容</span>
              </li>
              <li class="flex items-start">
                <span class="text-gray-600 mr-2 mt-0.5">•</span>
                <span><strong>篩選插槽：</strong>支持自定義篩選內容</span>
              </li>
            </ul>
          </div>
        </div>
      </el-card>

      <!-- 帶自定義按鈕的搜尋欄 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">帶自定義按鈕的搜尋欄</h2>
        </template>
        <div class="space-y-4">
          <SearchBar
            :show-search="true"
            @keydown:enter="handleSearch"
            @update:clear="handleClear"
            @update:reset-filter="handleResetFilter"
          >
            <template #button>
              <div class="flex space-x-2">
                <button class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                  進階搜尋
                </button>
                <button class="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">
                  儲存搜尋
                </button>
              </div>
            </template>
          </SearchBar>
        </div>
      </el-card>

      <!-- 帶自定義篩選的搜尋欄 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">帶自定義篩選的搜尋欄</h2>
        </template>
        <div class="space-y-4">
          <SearchBar
            :show-search="true"
            @keydown:enter="handleSearch"
            @update:clear="handleClear"
            @update:reset-filter="handleResetFilter"
          >
            <template #customerFilter>
              <div class="flex space-x-2">
                <select class="px-3 py-1 border border-gray-300 rounded text-sm">
                  <option value="">選擇類別</option>
                  <option value="user">用戶</option>
                  <option value="product">產品</option>
                  <option value="order">訂單</option>
                </select>
                <select class="px-3 py-1 border border-gray-300 rounded text-sm">
                  <option value="">選擇狀態</option>
                  <option value="active">啟用</option>
                  <option value="inactive">停用</option>
                </select>
              </div>
            </template>
          </SearchBar>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped></style>

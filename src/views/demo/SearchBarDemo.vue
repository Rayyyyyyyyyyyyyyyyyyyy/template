<script setup lang="ts">
import { ref } from 'vue'
import { SearchBar } from '@/components'

const searchKeyword = ref('')
const searchWithSuggestions = ref('')
const searchWithHistory = ref('')
const searchResult = ref('')
const selectedSuggestion = ref('')

// 搜尋建議
const suggestions = ref([
  'Vue.js',
  'React',
  'Angular',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Python',
  'Java'
])

// 搜尋歷史
const searchHistory = ref([
  'Vue 3',
  'TypeScript',
  'Element Plus',
  'Tailwind CSS'
])

// 事件處理
const handleSearch = (keyword: string) => {
  console.log('搜尋:', keyword)
  searchResult.value = `搜尋關鍵字: ${keyword}`
}

const handleClear = () => {
  console.log('清除搜尋')
  searchResult.value = ''
}

const handleSearchWithSuggestions = (keyword: string) => {
  console.log('帶建議搜尋:', keyword)
}

const handleSuggestionSelect = (suggestion: string) => {
  console.log('選中建議:', suggestion)
  selectedSuggestion.value = suggestion
}

const handleSearchWithHistory = (keyword: string) => {
  console.log('搜尋並記錄歷史:', keyword)
  if (keyword && !searchHistory.value.includes(keyword)) {
    searchHistory.value.unshift(keyword)
    if (searchHistory.value.length > 10) {
      searchHistory.value.pop()
    }
  }
}

const handleHistoryClear = () => {
  console.log('清除搜尋歷史')
  searchHistory.value = []
}

const removeHistoryItem = (index: number) => {
  searchHistory.value.splice(index, 1)
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
            v-model="searchKeyword"
            placeholder="請輸入搜尋關鍵字"
            @search="handleSearch"
            @clear="handleClear"
          />
          <div v-if="searchResult" class="mt-4">
            <p class="text-sm text-gray-600">搜尋結果: {{ searchResult }}</p>
          </div>
        </div>
      </el-card>

      <!-- 帶建議的搜尋欄 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">帶建議的搜尋欄</h2>
        </template>
        <div class="space-y-4">
          <SearchBar
            v-model="searchWithSuggestions"
            placeholder="輸入關鍵字獲取建議"
            :suggestions="suggestions"
            @search="handleSearchWithSuggestions"
            @suggestion-select="handleSuggestionSelect"
          />
          <div v-if="selectedSuggestion" class="mt-4">
            <p class="text-sm text-gray-600">選中的建議: {{ selectedSuggestion }}</p>
          </div>
        </div>
      </el-card>

      <!-- 搜尋歷史 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">搜尋歷史</h2>
        </template>
        <div class="space-y-4">
          <SearchBar
            v-model="searchWithHistory"
            placeholder="搜尋並記錄歷史"
            :search-history="searchHistory"
            @search="handleSearchWithHistory"
            @history-clear="handleHistoryClear"
          />
          <div v-if="searchHistory.length > 0" class="mt-4">
            <h3 class="text-sm font-medium text-gray-700 mb-2">搜尋歷史:</h3>
            <div class="flex flex-wrap gap-2">
              <el-tag
                v-for="(item, index) in searchHistory"
                :key="index"
                size="small"
                closable
                @close="removeHistoryItem(index)"
              >
                {{ item }}
              </el-tag>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped></style>

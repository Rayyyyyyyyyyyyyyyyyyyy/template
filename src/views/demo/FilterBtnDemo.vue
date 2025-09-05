<script setup lang="ts">
import { ref, computed } from 'vue'
import { FilterBtn } from '@/components'

const filters = ref({
  status: '',
  type: '',
})

const searchKeyword = ref('')

const filterCount = computed(() => {
  let count = 0
  if (filters.value.status) count++
  if (filters.value.type) count++
  return count
})

const handleReset = () => {
  filters.value = { status: '', type: '' }
  searchKeyword.value = ''
  console.log('重置篩選條件')
}

const handleSubmit = () => {
  console.log('提交篩選條件:', { filters: filters.value, search: searchKeyword.value })
}
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">FilterBtn 組件示範</h1>

      <!-- 基礎篩選按鈕 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">基礎篩選按鈕</h2>
        </template>
        <div class="space-y-4">
          <FilterBtn
            :badge-value="filterCount"
            @update:reset="handleReset"
            @update:submit="handleSubmit"
          >
            <template #default>
              <div class="p-4">
                <h3 class="text-lg font-medium mb-4 text-black/70">篩選條件</h3>
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">狀態</label>
                    <el-select v-model="filters.status" placeholder="請選擇狀態" class="w-full">
                      <el-option label="全部" value="" />
                      <el-option label="啟用" value="active" />
                      <el-option label="禁用" value="inactive" />
                    </el-select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">類型</label>
                    <el-select v-model="filters.type" placeholder="請選擇類型" class="w-full">
                      <el-option label="全部" value="" />
                      <el-option label="類型A" value="typeA" />
                      <el-option label="類型B" value="typeB" />
                    </el-select>
                  </div>
                </div>
              </div>
            </template>
          </FilterBtn>
        </div>
      </el-card>

      <!-- 自定義圖標 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">自定義圖標</h2>
        </template>
        <div class="space-y-4">
          <FilterBtn :badge-value="2" @update:reset="handleReset" @update:submit="handleSubmit">
            <template #filter-icon>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </template>
            <template #default>
              <div class="p-4">
                <h3 class="text-lg font-medium mb-4 text-black/70">搜尋篩選</h3>
                <el-input v-model="searchKeyword" placeholder="請輸入搜尋關鍵字" />
              </div>
            </template>
          </FilterBtn>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped></style>

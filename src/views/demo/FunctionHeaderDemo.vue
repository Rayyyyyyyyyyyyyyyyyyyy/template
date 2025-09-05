<script setup lang="ts">
import { ref } from 'vue'
import { FunctionHeader, BaseBtn } from '@/components'

// 麵包屑數據
const breadcrumbs = ref([
  { label: '首頁', path: '/' },
  { label: '用戶管理', path: '/users' },
  { label: '編輯用戶', path: '/users/edit' }
])
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">FunctionHeader 組件示範</h1>

      <!-- 基礎功能標題 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">基礎功能標題</h2>
        </template>
        <FunctionHeader
          title="用戶管理"
          subtitle="管理系統用戶信息"
        />
      </el-card>

      <!-- 帶麵包屑的標題 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">帶麵包屑的標題</h2>
        </template>
        <FunctionHeader
          title="編輯用戶"
          subtitle="修改用戶詳細信息"
          :breadcrumbs="breadcrumbs"
        />
      </el-card>

      <!-- 帶操作按鈕的標題 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">帶操作按鈕的標題</h2>
        </template>
        <FunctionHeader
          title="產品列表"
          subtitle="查看和管理產品信息"
        >
          <template #actions>
            <div class="flex space-x-2">
              <BaseBtn type="primary" size="small">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                新增產品
              </BaseBtn>
              <BaseBtn type="default" size="small">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                導出
              </BaseBtn>
            </div>
          </template>
        </FunctionHeader>
      </el-card>

      <!-- 自定義內容的標題 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">自定義內容的標題</h2>
        </template>
        <FunctionHeader>
          <template #title>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-2xl font-bold text-blue-600">自定義標題</span>
            </div>
          </template>
          <template #subtitle>
            <div class="flex items-center text-gray-600">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              這是一個自定義的副標題
            </div>
          </template>
        </FunctionHeader>
      </el-card>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { FunctionHeader } from '@/components'

const router = useRouter()


// 處理返回按鈕點擊事件
const handleBack = (payload: { path?: string; [key: string]: unknown }) => {
  if (payload.path) {
    router.push(payload.path)
  } else {
    // 預設返回上一頁
    router.go(-1)
  }
}
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
        />
      </el-card>

      <!-- 帶返回按鈕的標題 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">帶返回按鈕的標題</h2>
        </template>
        <FunctionHeader
          title="編輯用戶"
          :show-back="true"
          @back="handleBack"
        />
      </el-card>

      <!-- 帶自定義返回路徑的標題 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">帶自定義返回路徑的標題</h2>
        </template>
        <FunctionHeader
          title="產品詳情"
          :show-back="'/products'"
          @back="handleBack"
        />
      </el-card>

      <!-- 帶自定義返回對象的標題 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">帶自定義返回對象的標題</h2>
        </template>
        <FunctionHeader
          title="訂單管理"
          :show-back="{ path: '/orders', query: { status: 'pending' } }"
          @back="handleBack"
        />
      </el-card>

      <!-- 帶深度的返回按鈕 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">帶深度的返回按鈕</h2>
        </template>
        <FunctionHeader
          title="多層級頁面"
          :show-back="true"
          :depth="2"
          @back="handleBack"
        />
      </el-card>

      <!-- 功能展示說明 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">功能展示說明</h2>
        </template>
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium mb-2">FunctionHeader 功能特色</h3>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>標題顯示：</strong>支持自定義標題文字</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>返回按鈕：</strong>支持布林值、字符串路徑或對象配置</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>返回深度：</strong>支持指定返回的層級數量</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>事件處理：</strong>支持返回按鈕點擊事件</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>響應式設計：</strong>適配不同螢幕尺寸</span>
            </li>
          </ul>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref } from 'vue'
import { FunctionHeader } from '@/components'
import HeaderExample from '../../../tests/consumer/src/examples/HeaderExample.vue'
import headerSource from '../../../tests/consumer/src/examples/HeaderExample.vue?raw'
import ExampleCode from '../docs/ExampleCode.vue'

const lastBack = ref('尚未返回')
const handleBack = (payload: { path?: string; [key: string]: unknown }) => {
  lastBack.value = JSON.stringify(payload)
}
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">FunctionHeader 組件示範</h1>

      <!-- 基礎功能標題 -->
      <el-card class="mb-8" shadow="never">
        <template #header>
          <h2 class="text-xl font-semibold">基礎功能標題</h2>
        </template>
        <FunctionHeader
          title="用戶管理"
        />
      </el-card>

      <!-- 帶返回按鈕的標題 -->
      <el-card class="mb-8" shadow="never">
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
      <el-card class="mb-8" shadow="never">
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
      <el-card class="mb-8" shadow="never">
        <template #header>
          <h2 class="text-xl font-semibold">帶自定義返回對象的標題</h2>
        </template>
        <FunctionHeader
          title="訂單管理"
          :show-back="{ path: '/orders', query: { status: 'pending' } }"
          @back="handleBack"
        />
      </el-card>

      <el-card class="mb-8" shadow="never">
        <template #header><h2 class="text-xl font-semibold">完整使用範例與操作插槽</h2></template>
        <HeaderExample />
        <ExampleCode :source="headerSource" />
      </el-card>
      <p>上方返回操作只記錄 payload；實際導頁由宿主決定。</p>
      <output aria-live="polite">{{ lastBack }}</output>

      <!-- 功能展示說明 -->
      <el-card class="mb-8" shadow="never">
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
              <span><strong>操作插槽：</strong>使用 default slot 放置自訂操作</span>
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

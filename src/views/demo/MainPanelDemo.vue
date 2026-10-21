<script setup lang="ts">
import { MainPanel, BaseBtn } from '@/components'
import MainPanelExample from '../../../tests/consumer/src/examples/MainPanelExample.vue'
import mainPanelSource from '../../../tests/consumer/src/examples/MainPanelExample.vue?raw'
import ExampleCode from '../docs/ExampleCode.vue'
import { ROUTES } from '@/router/constants'
import { useRouter } from 'vue-router'

const router = useRouter()
// 處理返回按鈕點擊事件
const handleBackClick = () => {
  router.push(ROUTES.DEMO)
}
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">MainPanel 組件示範</h1>

      <!-- 基礎主面板 -->
      <el-card class="mb-8" shadow="never">
        <template #header>
          <h2 class="text-xl font-semibold">基礎主面板</h2>
        </template>
        <MainPanelExample />
        <ExampleCode :source="mainPanelSource" />
      </el-card>

      <!-- 帶標題的主面板 -->
      <el-card class="mb-8" shadow="never">
        <template #header>
          <h2 class="text-xl font-semibold">帶標題的主面板</h2>
        </template>
        <MainPanel title="統計信息">
          <template #main>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-blue-600">總用戶數</h4>
                  <p class="text-2xl font-bold text-blue-800">1,234</p>
                </div>
                <div class="bg-green-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-green-600">活躍用戶</h4>
                  <p class="text-2xl font-bold text-green-800">856</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-lg font-semibold text-gray-600">新增用戶</h4>
                  <p class="text-2xl font-bold text-gray-900">42</p>
                </div>
              </div>
            </div>
          </template>
        </MainPanel>
      </el-card>

      <!-- 帶返回按鈕的主面板 -->
      <el-card class="mb-8" shadow="never">
        <template #header>
          <h2 class="text-xl font-semibold">帶返回按鈕的主面板</h2>
        </template>
        <MainPanel title="數據列表" :show-back="true" @click:back="handleBackClick">
          <template #main>
            <div class="p-6">
              <div class="space-y-4">
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span>數據項目 1</span>
                  <div class="flex space-x-2">
                    <BaseBtn type="default" size="small">編輯</BaseBtn>
                    <BaseBtn type="default" size="small">刪除</BaseBtn>
                  </div>
                </div>
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span>數據項目 2</span>
                  <div class="flex space-x-2">
                    <BaseBtn type="default" size="small">編輯</BaseBtn>
                    <BaseBtn type="default" size="small">刪除</BaseBtn>
                  </div>
                </div>
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span>數據項目 3</span>
                  <div class="flex space-x-2">
                    <BaseBtn type="default" size="small">編輯</BaseBtn>
                    <BaseBtn type="default" size="small">刪除</BaseBtn>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </MainPanel>
      </el-card>

      <!-- 自定義樣式的主面板 -->
      <el-card class="mb-8" shadow="never">
        <template #header>
          <h2 class="text-xl font-semibold">自定義樣式的主面板</h2>
        </template>
        <MainPanel title="自定義面板">
          <template #main>
            <div class="p-6">
              <div class="bg-blue-50 text-gray-900 p-6 rounded-lg">
                <h3 class="text-xl font-bold mb-2">淺色背景</h3>
                <p>這是一個帶有淺色背景的自定義面板內容。</p>
              </div>
            </div>
          </template>
        </MainPanel>
      </el-card>

      <!-- 功能展示說明 -->
      <el-card class="mb-8" shadow="never">
        <template #header>
          <h2 class="text-xl font-semibold">功能展示說明</h2>
        </template>
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium mb-2">MainPanel 功能特色</h3>
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
              <span><strong>返回處理：</strong>click:back 不帶 payload，導頁由宿主決定</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>事件處理：</strong>支持返回按鈕點擊事件</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>內容插槽：</strong>使用 main、searchBar 與 footer 具名插槽</span>
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

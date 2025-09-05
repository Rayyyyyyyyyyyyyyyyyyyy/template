<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">MainPanel 組件示範</h1>

      <!-- 基礎主面板 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">基礎主面板</h2>
        </template>
        <MainPanel>
          <div class="p-6">
            <h3 class="text-lg font-medium mb-4">面板內容</h3>
            <p class="text-gray-600">這是一個基礎的主面板內容區域。</p>
          </div>
        </MainPanel>
      </el-card>

      <!-- 帶標題的主面板 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">帶標題的主面板</h2>
        </template>
        <MainPanel title="統計信息" subtitle="系統運行狀態概覽">
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
              <div class="bg-purple-50 p-4 rounded-lg">
                <h4 class="text-lg font-semibold text-purple-600">新增用戶</h4>
                <p class="text-2xl font-bold text-purple-800">42</p>
              </div>
            </div>
          </div>
        </MainPanel>
      </el-card>

      <!-- 帶操作的主面板 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">帶操作的主面板</h2>
        </template>
        <MainPanel title="數據列表" subtitle="管理系統數據">
          <template #actions>
            <div class="flex space-x-2">
              <BaseBtn type="primary" size="small">新增</BaseBtn>
              <BaseBtn type="default" size="small">刷新</BaseBtn>
              <BaseBtn type="default" size="small">導出</BaseBtn>
            </div>
          </template>

          <div class="p-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span>數據項目 1</span>
                <div class="flex space-x-2">
                  <BaseBtn type="text" size="small">編輯</BaseBtn>
                  <BaseBtn type="text" size="small">刪除</BaseBtn>
                </div>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span>數據項目 2</span>
                <div class="flex space-x-2">
                  <BaseBtn type="text" size="small">編輯</BaseBtn>
                  <BaseBtn type="text" size="small">刪除</BaseBtn>
                </div>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span>數據項目 3</span>
                <div class="flex space-x-2">
                  <BaseBtn type="text" size="small">編輯</BaseBtn>
                  <BaseBtn type="text" size="small">刪除</BaseBtn>
                </div>
              </div>
            </div>
          </div>
        </MainPanel>
      </el-card>

      <!-- 自定義樣式的主面板 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">自定義樣式的主面板</h2>
        </template>
        <MainPanel
          title="自定義面板"
          subtitle="帶有自定義樣式的主面板"
          class="custom-panel"
        >
          <div class="p-6">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
              <h3 class="text-xl font-bold mb-2">漸變背景</h3>
              <p>這是一個帶有漸變背景的自定義面板內容。</p>
            </div>
          </div>
        </MainPanel>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MainPanel, BaseBtn } from '@/components'
</script>

<style scoped>
.custom-panel {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>

<script setup lang="ts">
import { BaseBtn } from '@/components'
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">BaseBtn 組件示範</h1>

      <!-- 按鈕樣式 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">按鈕樣式</h2>
        </template>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4">
            <BaseBtn type="primary">主要按鈕</BaseBtn>
            <BaseBtn type="default">默認按鈕</BaseBtn>
            <BaseBtn type="danger">危險按鈕</BaseBtn>
            <BaseBtn type="success">成功按鈕</BaseBtn>
            <BaseBtn type="warning">警告按鈕</BaseBtn>
            <BaseBtn type="info">信息按鈕</BaseBtn>
          </div>
        </div>
      </el-card>

      <!-- 按鈕尺寸 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">按鈕尺寸</h2>
        </template>
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-4">
            <BaseBtn type="primary" size="small">小按鈕</BaseBtn>
            <BaseBtn type="primary" size="default">中等按鈕</BaseBtn>
            <BaseBtn type="primary" size="large">大按鈕</BaseBtn>
          </div>
        </div>
      </el-card>

      <!-- 按鈕狀態 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">按鈕狀態</h2>
        </template>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4">
            <BaseBtn type="primary">正常按鈕</BaseBtn>
            <BaseBtn type="primary" :loading="true">載入中</BaseBtn>
            <BaseBtn type="primary" disabled>禁用按鈕</BaseBtn>
          </div>
        </div>
      </el-card>

      <!-- 帶圖標的按鈕 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">帶圖標的按鈕</h2>
        </template>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4">
            <BaseBtn type="primary">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              添加
            </BaseBtn>
            <BaseBtn type="default">
              編輯
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </BaseBtn>
            <BaseBtn type="danger">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              刪除
            </BaseBtn>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { BaseBtn } from '@/components'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">BaseBtn 組件示範</h1>

      <!-- 按鈕樣式 -->
      <el-card class="mb-8" shadow="never">
        <template #header>
          <h2 class="text-xl font-semibold">按鈕樣式</h2>
        </template>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4">
            <BaseBtn type="primary" text="主要按鈕" />
            <BaseBtn type="default" text="默認按鈕" />
            <BaseBtn type="danger" text="危險按鈕" />
            <BaseBtn type="success" text="成功按鈕" />
            <BaseBtn type="warning" text="警告按鈕" />
            <BaseBtn type="info" text="信息按鈕" />
          </div>
        </div>
      </el-card>

      <!-- 按鈕尺寸 -->
      <el-card class="mb-8" shadow="never">
        <template #header>
          <h2 class="text-xl font-semibold">按鈕尺寸</h2>
        </template>
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-4">
            <BaseBtn type="primary" size="small" text="小按鈕" />
            <BaseBtn type="primary" size="default" text="中等按鈕" />
            <BaseBtn type="primary" size="large" text="大按鈕" />
          </div>
        </div>
      </el-card>

      <!-- 按鈕狀態 -->
      <el-card class="mb-8" shadow="never">
        <template #header>
          <h2 class="text-xl font-semibold">按鈕狀態</h2>
        </template>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4">
            <BaseBtn type="primary" text="正常按鈕" />
            <BaseBtn type="primary" :loading="true" text="載入中" />
            <BaseBtn type="primary" disabled text="禁用按鈕" />
          </div>
        </div>
      </el-card>

      <!-- 禁用狀態樣式展示 -->
      <el-card class="mb-8" shadow="never">
        <template #header>
          <h2 class="text-xl font-semibold">禁用狀態樣式</h2>
        </template>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-3">不同類型的禁用按鈕</h3>
            <div class="flex flex-wrap gap-4">
              <BaseBtn type="primary" disabled text="主要按鈕" />
              <BaseBtn type="success" disabled text="成功按鈕" />
              <BaseBtn type="warning" disabled text="警告按鈕" />
              <BaseBtn type="danger" disabled text="危險按鈕" />
              <BaseBtn type="info" disabled text="信息按鈕" />
              <BaseBtn type="default" disabled text="默認按鈕" />
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-3">填充樣式的禁用按鈕</h3>
            <div class="flex flex-wrap gap-4">
              <BaseBtn type="primary" disabled is-fill text="主要按鈕" />
              <BaseBtn type="success" disabled is-fill text="成功按鈕" />
              <BaseBtn type="warning" disabled is-fill text="警告按鈕" />
              <BaseBtn type="danger" disabled is-fill text="危險按鈕" />
              <BaseBtn type="info" disabled is-fill text="信息按鈕" />
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-3">樸素樣式的禁用按鈕</h3>
            <div class="flex flex-wrap gap-4">
              <BaseBtn type="primary" disabled plain text="主要按鈕" />
              <BaseBtn type="success" disabled plain text="成功按鈕" />
              <BaseBtn type="warning" disabled plain text="警告按鈕" />
              <BaseBtn type="danger" disabled plain text="危險按鈕" />
              <BaseBtn type="info" disabled plain text="信息按鈕" />
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-3">文字按鈕的禁用狀態</h3>
            <div class="flex flex-wrap gap-4">
              <BaseBtn type="primary" disabled link text="主要按鈕" />
              <BaseBtn type="success" disabled link text="成功按鈕" />
              <BaseBtn type="warning" disabled link text="警告按鈕" />
              <BaseBtn type="danger" disabled link text="危險按鈕" />
              <BaseBtn type="info" disabled link text="信息按鈕" />
            </div>
          </div>
        </div>
      </el-card>

      <!-- 帶圖標的按鈕 -->
      <el-card class="mb-8" shadow="never">
        <template #header>
          <h2 class="text-xl font-semibold">帶圖標的按鈕</h2>
        </template>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4">
            <BaseBtn type="primary" :icon="Plus" text="添加" />
            <BaseBtn type="default" :icon="Edit" text="編輯" />
            <BaseBtn type="danger" :icon="Delete" text="刪除" />
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped></style>

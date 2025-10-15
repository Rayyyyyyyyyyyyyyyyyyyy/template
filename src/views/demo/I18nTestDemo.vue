<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { BaseTable, BaseBtn, BaseDialog, SearchBar } from '@/components'
import type { TableColumn } from '@/types'

const { locale, t } = useI18n()
const currentLocale = ref(locale.value)

// 切換語系
const switchLocale = () => {
  currentLocale.value = currentLocale.value === 'zh-TW' ? 'en-US' : 'zh-TW'
  locale.value = currentLocale.value
}

// 測試資料
interface TestData {
  id: number
  name: string
}

const testData = ref<TestData[]>([
  { id: 1, name: '測試 1' },
  { id: 2, name: '測試 2' },
  { id: 3, name: '測試 3' },
])

const testColumns = ref<TableColumn<TestData>[]>([
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'name', label: '名稱', align: 'center' },
])

const loading = ref(false)
const dialogVisible = ref(false)

const toggleLoading = () => {
  loading.value = !loading.value
}

const openDialog = () => {
  dialogVisible.value = true
}
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">i18n 測試頁面</h1>

      <!-- 語系切換 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">語系切換</h2>
        </template>
        <div class="flex items-center gap-4">
          <base-btn :text="`切換語系 (當前: ${currentLocale})`" type="primary" @click="switchLocale" />
          <span class="text-gray-600">點擊按鈕切換語系，觀察下方組件文字變化</span>
        </div>
      </el-card>

      <!-- BaseTable 測試 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">BaseTable 組件測試</h2>
        </template>
        <div class="mb-4">
          <base-btn :text="loading ? '停止載入' : '開始載入'" type="primary" @click="toggleLoading" />
          <p class="text-sm text-gray-600 mt-2">
            測試項目：
            <br />
            1. loading 文字：{{ t('common.loading') }}
            <br />
            2. 查看按鈕：{{ t('common.view') }}
            <br />
            3. 編輯按鈕：{{ t('common.edit') }}
          </p>
        </div>
        <base-table
          :data="testData"
          :columns="testColumns"
          :loading="loading"
          :show-check-btn="true"
          :show-edit-btn="true"
          @click:checkRow="(row) => console.log('查看', row)"
          @click:editRow="(row) => console.log('編輯', row)"
        />
      </el-card>

      <!-- BaseDialog 測試 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">BaseDialog 組件測試</h2>
        </template>
        <div>
          <base-btn text="打開對話框" type="primary" @click="openDialog" />
          <p class="text-sm text-gray-600 mt-2">
            測試項目：
            <br />
            確定按鈕：{{ t('common.confirm') }}
            <br />
            取消按鈕：{{ t('common.cancel') }}
          </p>
        </div>
        <base-dialog v-model="dialogVisible" title="測試對話框">
          <p>這是測試內容</p>
        </base-dialog>
      </el-card>

      <!-- SearchBar 測試 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">SearchBar 組件測試</h2>
        </template>
        <div>
          <p class="text-sm text-gray-600 mb-4">
            測試項目：
            <br />
            placeholder：{{ t('search.placeholder') }}
          </p>
          <search-bar :show-search="true" />
        </div>
      </el-card>

      <!-- 當前語系資訊 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">當前語系資訊</h2>
        </template>
        <div class="space-y-2">
          <p><strong>語系代碼：</strong>{{ currentLocale }}</p>
          <p><strong>語系名稱：</strong>{{ currentLocale === 'zh-TW' ? '繁體中文' : 'English' }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped></style>


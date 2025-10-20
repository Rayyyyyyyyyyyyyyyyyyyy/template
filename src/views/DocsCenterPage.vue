<script setup lang="ts">
import { BaseBtn } from '@/components'
import { useRouter } from 'vue-router'
import { useClipboard } from '@vueuse/core'
import { ROUTES } from '@/router/constants'

const router = useRouter()
const { copy } = useClipboard()

const goBack = () => {
  router.push(ROUTES.DEMO)
}

const copyToClipboard = (text: string) => {
  copy(text).then(() => {
    console.log('已複製到剪貼板')
  })
}

const openGitHubRepo = () => {
  window.open('https://github.com/Rayyyyyyyyyyyyyyyyyyyy/template', '_blank')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">


      <!-- 頁面標題 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Vue Table Components</h1>
        <div class="flex justify-center items-center space-x-4 mb-4">
          <img src="https://img.shields.io/npm/v/rayyy-vue-table-components.svg" alt="npm version" class="h-6">
          <img src="https://img.shields.io/npm/dm/rayyy-vue-table-components.svg" alt="npm downloads" class="h-6">
          <img src="https://img.shields.io/github/license/rayshao/vue-table-components.svg" alt="license" class="h-6">
          <img src="https://img.shields.io/badge/vue-3.x-brightgreen.svg" alt="vue" class="h-6">
        </div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          基於 Vue 3 + Element Plus 的現代化表格組件庫，提供豐富的表格功能和靈活的自定義選項。
        </p>
      </div>


      <!-- 組件示例 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-2xl font-bold text-gray-900">📚 組件示例</h2>
        </template>

        <div class="space-y-8">
          <!-- SearchableListPanel -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">SearchableListPanel - 整合式搜尋面板</h3>
            <p class="text-gray-600 mb-4">整合式搜尋、篩選、分頁組件，提供完整的數據管理功能。</p>

            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative overflow-x-auto">
              <pre><code>&lt;template&gt;
  &lt;SearchableListPanel
    :data="listData"
    :loading="loading"
    :total="total"
    :page-size="pageSize"
    :current-page="currentPage"
    @search="handleSearch"
    @filter="handleFilter"
    @page-change="handlePageChange"
  &gt;
    &lt;template #firstButton&gt;
      &lt;BaseBtn type="primary"&gt;新增&lt;/BaseBtn&gt;
    &lt;/template&gt;

    &lt;template #customButton&gt;
      &lt;BaseBtn type="success"&gt;導出&lt;/BaseBtn&gt;
    &lt;/template&gt;

    &lt;template #lastButton&gt;
      &lt;BaseBtn type="warning"&gt;批量操作&lt;/BaseBtn&gt;
    &lt;/template&gt;
  &lt;/SearchableListPanel&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { SearchableListPanel, BaseBtn } from 'rayyy-vue-table-components'

const loading = ref(false)
const listData = ref([])
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)

const handleSearch = (keyword: string) => {
  console.log('搜尋:', keyword)
}

const handleFilter = (filters: Record&lt;string, any&gt;) => {
  console.log('篩選:', filters)
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}
&lt;/script&gt;</code></pre>
              <button
                @click="copyToClipboard('&lt;template&gt;\n  &lt;SearchableListPanel\n    :data=&quot;listData&quot;\n    :loading=&quot;loading&quot;\n    :total=&quot;total&quot;\n    :page-size=&quot;pageSize&quot;\n    :current-page=&quot;currentPage&quot;\n    @search=&quot;handleSearch&quot;\n    @filter=&quot;handleFilter&quot;\n    @page-change=&quot;handlePageChange&quot;\n  &gt;\n    &lt;template #firstButton&gt;\n      &lt;BaseBtn type=&quot;primary&quot;&gt;新增&lt;/BaseBtn&gt;\n    &lt;/template&gt;\n    \n    &lt;template #customButton&gt;\n      &lt;BaseBtn type=&quot;success&quot;&gt;導出&lt;/BaseBtn&gt;\n    &lt;/template&gt;\n    \n    &lt;template #lastButton&gt;\n      &lt;BaseBtn type=&quot;warning&quot;&gt;批量操作&lt;/BaseBtn&gt;\n    &lt;/template&gt;\n  &lt;/SearchableListPanel&gt;\n&lt;/template&gt;\n\n&lt;script setup lang=&quot;ts&quot;&gt;\nimport { ref } from \'vue\'\nimport { SearchableListPanel, BaseBtn } from \'rayyy-vue-table-components\'\n\nconst loading = ref(false)\nconst listData = ref([])\nconst total = ref(0)\nconst pageSize = ref(10)\nconst currentPage = ref(1)\n\nconst handleSearch = (keyword: string) => {\n  console.log(\'搜尋:\', keyword)\n}\n\nconst handleFilter = (filters: Record&lt;string, any&gt;) => {\n  console.log(\'篩選:\', filters)\n}\n\nconst handlePageChange = (page: number) => {\n  currentPage.value = page\n}\n&lt;/script&gt;')"
                class="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>


          <!-- TransferDialog -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">TransferDialog - 表格列配置對話框</h3>
            <p class="text-gray-600 mb-4">支持拖拽排序和批量選擇的表格列配置對話框。</p>

            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative overflow-x-auto">
              <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;BaseBtn type="primary" @click="showTransferDialog = true"&gt;
      配置表格列
    &lt;/BaseBtn&gt;

    &lt;TransferDialog
      v-model="showTransferDialog"
      :columns="tableColumns"
      :visible-columns="visibleColumns"
      @confirm="handleColumnConfirm"
      @cancel="handleColumnCancel"
    /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { TransferDialog, BaseBtn } from 'rayyy-vue-table-components'
import type { TableColumn } from 'rayyy-vue-table-components'

const showTransferDialog = ref(false)
const tableColumns = ref&lt;TableColumn[]&gt;([
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '郵箱' },
  { prop: 'age', label: '年齡' }
])
const visibleColumns = ref&lt;string[]&gt;(['id', 'name', 'email'])

const handleColumnConfirm = (columns: TableColumn[]) => {
  console.log('確認配置:', columns)
  showTransferDialog.value = false
}

const handleColumnCancel = () => {
  showTransferDialog.value = false
}
&lt;/script&gt;</code></pre>
              <button
                @click="copyToClipboard('&lt;template&gt;\n  &lt;div&gt;\n    &lt;BaseBtn type=&quot;primary&quot; @click=&quot;showTransferDialog = true&quot;&gt;\n      配置表格列\n    &lt;/BaseBtn&gt;\n\n    &lt;TransferDialog\n      v-model=&quot;showTransferDialog&quot;\n      :columns=&quot;tableColumns&quot;\n      :visible-columns=&quot;visibleColumns&quot;\n      @confirm=&quot;handleColumnConfirm&quot;\n      @cancel=&quot;handleColumnCancel&quot;\n    /&gt;\n  &lt;/div&gt;\n&lt;/template&gt;\n\n&lt;script setup lang=&quot;ts&quot;&gt;\nimport { ref } from \'vue\'\nimport { TransferDialog, BaseBtn } from \'rayyy-vue-table-components\'\nimport type { TableColumn } from \'rayyy-vue-table-components\'\n\nconst showTransferDialog = ref(false)\nconst tableColumns = ref&lt;TableColumn[]&gt;([\n  { prop: \'id\', label: \'ID\' },\n  { prop: \'name\', label: \'姓名\' },\n  { prop: \'email\', label: \'郵箱\' },\n  { prop: \'age\', label: \'年齡\' }\n])\nconst visibleColumns = ref&lt;string[]&gt;([\'id\', \'name\', \'email\'])\n\nconst handleColumnConfirm = (columns: TableColumn[]) => {\n  console.log(\'確認配置:\', columns)\n  showTransferDialog.value = false\n}\n\nconst handleColumnCancel = () => {\n  showTransferDialog.value = false\n}\n&lt;/script&gt;')"
                class="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- BaseTable -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">BaseTable - 數據表格</h3>
            <p class="text-gray-600 mb-4">基礎的數據表格組件，支援排序、選擇、自定義列等功能。</p>

            <div class="space-y-4">
              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">基本用法</h4>
                <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative overflow-x-auto">
                  <pre><code>&lt;template&gt;
  &lt;BaseTable
    :data="tableData"
    :columns="columns"
    :loading="loading"
    @column-sort-change="handleSortChange"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { BaseTable } from 'rayyy-vue-table-components'
import type { TableColumn, SortChangValue } from 'rayyy-vue-table-components'

interface User {
  id: number
  name: string
  email: string
  age: number
}

const loading = ref(false)
const tableData = ref&lt;User[]&gt;([
  { id: 1, name: '張三', email: 'zhangsan@example.com', age: 30 },
  { id: 2, name: '李四', email: 'lisi@example.com', age: 25 }
])

const columns: TableColumn&lt;User&gt;[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', sortable: true },
  { prop: 'email', label: '郵箱' },
  { prop: 'age', label: '年齡', sortable: true }
]

const handleSortChange = (sortInfo: SortChangValue&lt;User&gt;) => {
  console.log('排序變更:', sortInfo)
}
&lt;/script&gt;</code></pre>
                  <button
                    @click="copyToClipboard('&lt;template&gt;\n  &lt;BaseTable\n    :data=&quot;tableData&quot;\n    :columns=&quot;columns&quot;\n    :loading=&quot;loading&quot;\n    @column-sort-change=&quot;handleSortChange&quot;\n  /&gt;\n&lt;/template&gt;\n\n&lt;script setup lang=&quot;ts&quot;&gt;\nimport { ref } from \'vue\'\nimport { BaseTable } from \'rayyy-vue-table-components\'\nimport type { TableColumn, SortChangValue } from \'rayyy-vue-table-components\'\n\ninterface User {\n  id: number\n  name: string\n  email: string\n  age: number\n}\n\nconst loading = ref(false)\nconst tableData = ref&lt;User[]&gt;([\n  { id: 1, name: \'張三\', email: \'zhangsan@example.com\', age: 30 },\n  { id: 2, name: \'李四\', email: \'lisi@example.com\', age: 25 }\n])\n\nconst columns: TableColumn&lt;User&gt;[] = [\n  { prop: \'id\', label: \'ID\', width: 80 },\n  { prop: \'name\', label: \'姓名\', sortable: true },\n  { prop: \'email\', label: \'郵箱\' },\n  { prop: \'age\', label: \'年齡\', sortable: true }\n]\n\nconst handleSortChange = (sortInfo: SortChangValue&lt;User&gt;) => {\n  console.log(\'排序變更:\', sortInfo)\n}\n&lt;/script&gt;')"
                    class="absolute top-2 right-2 text-gray-400 hover:text-white"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- BaseInput -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">BaseInput - 基礎輸入框組件</h3>
            <p class="text-gray-600 mb-4">增強的輸入框組件，支援多種類型和驗證功能。</p>

            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative overflow-x-auto">
              <pre><code>&lt;template&gt;
  &lt;div class="space-y-4"&gt;
    &lt;BaseInput
      v-model="username"
      placeholder="請輸入用戶名"
      :rules="usernameRules"
      clearable
    /&gt;

    &lt;BaseInput
      v-model="password"
      type="password"
      placeholder="請輸入密碼"
      show-password
    /&gt;

    &lt;BaseInput
      v-model="email"
      type="email"
      placeholder="請輸入郵箱"
      :rules="emailRules"
    /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { BaseInput } from 'rayyy-vue-table-components'

const username = ref('')
const password = ref('')
const email = ref('')

const usernameRules = [
  { required: true, message: '請輸入用戶名', trigger: 'blur' },
  { min: 3, max: 20, message: '長度在 3 到 20 個字符', trigger: 'blur' }
]

const emailRules = [
  { type: 'email', message: '請輸入正確的郵箱地址', trigger: 'blur' }
]
&lt;/script&gt;</code></pre>
              <button
                @click="copyToClipboard('&lt;template&gt;\n  &lt;div class=&quot;space-y-4&quot;&gt;\n    &lt;BaseInput\n      v-model=&quot;username&quot;\n      placeholder=&quot;請輸入用戶名&quot;\n      :rules=&quot;usernameRules&quot;\n      clearable\n    /&gt;\n    \n    &lt;BaseInput\n      v-model=&quot;password&quot;\n      type=&quot;password&quot;\n      placeholder=&quot;請輸入密碼&quot;\n      show-password\n    /&gt;\n    \n    &lt;BaseInput\n      v-model=&quot;email&quot;\n      type=&quot;email&quot;\n      placeholder=&quot;請輸入郵箱&quot;\n      :rules=&quot;emailRules&quot;\n    /&gt;\n  &lt;/div&gt;\n&lt;/template&gt;\n\n&lt;script setup lang=&quot;ts&quot;&gt;\nimport { ref } from \'vue\'\nimport { BaseInput } from \'rayyy-vue-table-components\'\n\nconst username = ref(\'\')\nconst password = ref(\'\')\nconst email = ref(\'\')\n\nconst usernameRules = [\n  { required: true, message: \'請輸入用戶名\', trigger: \'blur\' },\n  { min: 3, max: 20, message: \'長度在 3 到 20 個字符\', trigger: \'blur\' }\n]\n\nconst emailRules = [\n  { type: \'email\', message: \'請輸入正確的郵箱地址\', trigger: \'blur\' }\n]\n&lt;/script&gt;')"
                class="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- BaseBtn -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">BaseBtn - 按鈕組件</h3>
            <p class="text-gray-600 mb-4">增強的按鈕組件，支援多種樣式和狀態。</p>

            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative overflow-x-auto">
              <pre><code>&lt;template&gt;
  &lt;div class="button-group"&gt;
    &lt;BaseBtn type="primary" @click="handleClick"&gt;主要按鈕&lt;/BaseBtn&gt;
    &lt;BaseBtn type="success" :loading="loading"&gt;成功按鈕&lt;/BaseBtn&gt;
    &lt;BaseBtn type="warning" plain&gt;樸素按鈕&lt;/BaseBtn&gt;
    &lt;BaseBtn type="danger" disabled&gt;禁用按鈕&lt;/BaseBtn&gt;
    &lt;BaseBtn type="info" link&gt;文字按鈕&lt;/BaseBtn&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { BaseBtn } from 'rayyy-vue-table-components'

const loading = ref(false)

const handleClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
&lt;/script&gt;</code></pre>
              <button
                @click="copyToClipboard('&lt;template&gt;\n  &lt;div class=&quot;button-group&quot;&gt;\n    &lt;BaseBtn type=&quot;primary&quot; @click=&quot;handleClick&quot;&gt;主要按鈕&lt;/BaseBtn&gt;\n    &lt;BaseBtn type=&quot;success&quot; :loading=&quot;loading&quot;&gt;成功按鈕&lt;/BaseBtn&gt;\n    &lt;BaseBtn type=&quot;warning&quot; plain&gt;樸素按鈕&lt;/BaseBtn&gt;\n    &lt;BaseBtn type=&quot;danger&quot; disabled&gt;禁用按鈕&lt;/BaseBtn&gt;\n    &lt;BaseBtn type=&quot;info&quot; link&gt;文字按鈕&lt;/BaseBtn&gt;\n  &lt;/div&gt;\n&lt;/template&gt;\n\n&lt;script setup lang=&quot;ts&quot;&gt;\nimport { ref } from \'vue\'\nimport { BaseBtn } from \'rayyy-vue-table-components\'\n\nconst loading = ref(false)\n\nconst handleClick = () => {\n  loading.value = true\n  setTimeout(() => {\n    loading.value = false\n  }, 2000)\n}\n&lt;/script&gt;')"
                class="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- SortTable -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">SortTable - 排序表格組件</h3>
            <p class="text-gray-600 mb-4">支持多列排序的高級表格組件。</p>

            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative overflow-x-auto">
              <pre><code>&lt;template&gt;
  &lt;SortTable
    :data="tableData"
    :columns="columns"
    :loading="loading"
    @sort-change="handleSortChange"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { SortTable } from 'rayyy-vue-table-components'
import type { TableColumn, SortInfo } from 'rayyy-vue-table-components'

interface User {
  id: number
  name: string
  email: string
  age: number
  score: number
}

const loading = ref(false)
const tableData = ref&lt;User[]&gt;([
  { id: 1, name: '張三', email: 'zhangsan@example.com', age: 30, score: 85 },
  { id: 2, name: '李四', email: 'lisi@example.com', age: 25, score: 92 }
])

const columns: TableColumn&lt;User&gt;[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', sortable: true },
  { prop: 'email', label: '郵箱' },
  { prop: 'age', label: '年齡', sortable: true },
  { prop: 'score', label: '分數', sortable: true }
]

const handleSortChange = (sortInfo: SortInfo&lt;User&gt;) => {
  console.log('排序變更:', sortInfo)
}
&lt;/script&gt;</code></pre>
              <button
                @click="copyToClipboard('&lt;template&gt;\n  &lt;SortTable\n    :data=&quot;tableData&quot;\n    :columns=&quot;columns&quot;\n    :loading=&quot;loading&quot;\n    @sort-change=&quot;handleSortChange&quot;\n  /&gt;\n&lt;/template&gt;\n\n&lt;script setup lang=&quot;ts&quot;&gt;\nimport { ref } from \'vue\'\nimport { SortTable } from \'rayyy-vue-table-components\'\nimport type { TableColumn, SortInfo } from \'rayyy-vue-table-components\'\n\ninterface User {\n  id: number\n  name: string\n  email: string\n  age: number\n  score: number\n}\n\nconst loading = ref(false)\nconst tableData = ref&lt;User[]&gt;([\n  { id: 1, name: \'張三\', email: \'zhangsan@example.com\', age: 30, score: 85 },\n  { id: 2, name: \'李四\', email: \'lisi@example.com\', age: 25, score: 92 }\n])\n\nconst columns: TableColumn&lt;User&gt;[] = [\n  { prop: \'id\', label: \'ID\', width: 80 },\n  { prop: \'name\', label: \'姓名\', sortable: true },\n  { prop: \'email\', label: \'郵箱\' },\n  { prop: \'age\', label: \'年齡\', sortable: true },\n  { prop: \'score\', label: \'分數\', sortable: true }\n]\n\nconst handleSortChange = (sortInfo: SortInfo&lt;User&gt;) => {\n  console.log(\'排序變更:\', sortInfo)\n}\n&lt;/script&gt;')"
                class="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- SearchBar -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">SearchBar - 搜尋欄組件</h3>
            <p class="text-gray-600 mb-4">功能豐富的搜尋欄組件，支援即時搜尋和搜尋建議。</p>

            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative overflow-x-auto">
              <pre><code>&lt;template&gt;
  &lt;SearchBar
    v-model="searchKeyword"
    placeholder="請輸入搜尋關鍵字"
    :suggestions="suggestions"
    :loading="searchLoading"
    @search="handleSearch"
    @suggestion-click="handleSuggestionClick"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { SearchBar } from 'rayyy-vue-table-components'

const searchKeyword = ref('')
const searchLoading = ref(false)
const suggestions = ref&lt;string[]&gt;(['Vue', 'TypeScript', 'Element Plus'])

const handleSearch = (keyword: string) => {
  console.log('搜尋:', keyword)
  searchLoading.value = true
  // 模擬搜尋延遲
  setTimeout(() => {
    searchLoading.value = false
  }, 1000)
}

const handleSuggestionClick = (suggestion: string) => {
  searchKeyword.value = suggestion
  handleSearch(suggestion)
}
&lt;/script&gt;</code></pre>
              <button
                @click="copyToClipboard('&lt;template&gt;\n  &lt;SearchBar\n    v-model=&quot;searchKeyword&quot;\n    placeholder=&quot;請輸入搜尋關鍵字&quot;\n    :suggestions=&quot;suggestions&quot;\n    :loading=&quot;searchLoading&quot;\n    @search=&quot;handleSearch&quot;\n    @suggestion-click=&quot;handleSuggestionClick&quot;\n  /&gt;\n&lt;/template&gt;\n\n&lt;script setup lang=&quot;ts&quot;&gt;\nimport { ref } from \'vue\'\nimport { SearchBar } from \'rayyy-vue-table-components\'\n\nconst searchKeyword = ref(\'\')\nconst searchLoading = ref(false)\nconst suggestions = ref&lt;string[]&gt;([\'Vue\', \'TypeScript\', \'Element Plus\'])\n\nconst handleSearch = (keyword: string) => {\n  console.log(\'搜尋:\', keyword)\n  searchLoading.value = true\n  // 模擬搜尋延遲\n  setTimeout(() => {\n    searchLoading.value = false\n  }, 1000)\n}\n\nconst handleSuggestionClick = (suggestion: string) => {\n  searchKeyword.value = suggestion\n  handleSearch(suggestion)\n}\n&lt;/script&gt;')"
                class="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- FunctionHeader -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">FunctionHeader - 功能頁面標題組件</h3>
            <p class="text-gray-600 mb-4">提供頁面標題、麵包屑和操作按鈕的功能標題組件。</p>

            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative overflow-x-auto">
              <pre><code>&lt;template&gt;
  &lt;FunctionHeader
    title="用戶管理"
    sub-title="管理系統用戶信息"
    :breadcrumbs="breadcrumbs"
  &gt;
    &lt;template #actions&gt;
      &lt;BaseBtn type="primary"&gt;新增用戶&lt;/BaseBtn&gt;
      &lt;BaseBtn type="default"&gt;導出數據&lt;/BaseBtn&gt;
    &lt;/template&gt;
  &lt;/FunctionHeader&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { FunctionHeader, BaseBtn } from 'rayyy-vue-table-components'

const breadcrumbs = [
  { label: '首頁', path: '/' },
  { label: '系統管理', path: '/system' },
  { label: '用戶管理' }
]
&lt;/script&gt;</code></pre>
              <button
                @click="copyToClipboard('&lt;template&gt;\n  &lt;FunctionHeader\n    title=&quot;用戶管理&quot;\n    sub-title=&quot;管理系統用戶信息&quot;\n    :breadcrumbs=&quot;breadcrumbs&quot;\n  &gt;\n    &lt;template #actions&gt;\n      &lt;BaseBtn type=&quot;primary&quot;&gt;新增用戶&lt;/BaseBtn&gt;\n      &lt;BaseBtn type=&quot;default&quot;&gt;導出數據&lt;/BaseBtn&gt;\n    &lt;/template&gt;\n  &lt;/FunctionHeader&gt;\n&lt;/template&gt;\n\n&lt;script setup lang=&quot;ts&quot;&gt;\nimport { FunctionHeader, BaseBtn } from \'rayyy-vue-table-components\'\n\nconst breadcrumbs = [\n  { label: \'首頁\', path: \'/\' },\n  { label: \'系統管理\', path: \'/system\' },\n  { label: \'用戶管理\' }\n]\n&lt;/script&gt;')"
                class="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- MainPanel -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">MainPanel - 主要面板組件</h3>
            <p class="text-gray-600 mb-4">提供統一內容容器的面板組件。</p>

            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative overflow-x-auto">
              <pre><code>&lt;template&gt;
  &lt;MainPanel
    title="數據統計"
    :padding="24"
    :shadow="true"
  &gt;
    &lt;template #header&gt;
      &lt;div class="flex justify-between items-center"&gt;
        &lt;h3&gt;統計概覽&lt;/h3&gt;
        &lt;BaseBtn type="primary" size="small"&gt;刷新&lt;/BaseBtn&gt;
      &lt;/div&gt;
    &lt;/template&gt;

    &lt;template #content&gt;
      &lt;div class="grid grid-cols-3 gap-4"&gt;
        &lt;div class="stat-card"&gt;總用戶數: 1,234&lt;/div&gt;
        &lt;div class="stat-card"&gt;活躍用戶: 567&lt;/div&gt;
        &lt;div class="stat-card"&gt;新增用戶: 89&lt;/div&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/MainPanel&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { MainPanel, BaseBtn } from 'rayyy-vue-table-components'
&lt;/script&gt;</code></pre>
              <button
                @click="copyToClipboard('&lt;template&gt;\n  &lt;MainPanel\n    title=&quot;數據統計&quot;\n    :padding=&quot;24&quot;\n    :shadow=&quot;true&quot;\n  &gt;\n    &lt;template #header&gt;\n      &lt;div class=&quot;flex justify-between items-center&quot;&gt;\n        &lt;h3&gt;統計概覽&lt;/h3&gt;\n        &lt;BaseBtn type=&quot;primary&quot; size=&quot;small&quot;&gt;刷新&lt;/BaseBtn&gt;\n      &lt;/div&gt;\n    &lt;/template&gt;\n    \n    &lt;template #content&gt;\n      &lt;div class=&quot;grid grid-cols-3 gap-4&quot;&gt;\n        &lt;div class=&quot;stat-card&quot;&gt;總用戶數: 1,234&lt;/div&gt;\n        &lt;div class=&quot;stat-card&quot;&gt;活躍用戶: 567&lt;/div&gt;\n        &lt;div class=&quot;stat-card&quot;&gt;新增用戶: 89&lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/template&gt;\n  &lt;/MainPanel&gt;\n&lt;/template&gt;\n\n&lt;script setup lang=&quot;ts&quot;&gt;\nimport { MainPanel, BaseBtn } from \'rayyy-vue-table-components\'\n&lt;/script&gt;')"
                class="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- BaseDialog -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">BaseDialog - 對話框組件</h3>
            <p class="text-gray-600 mb-4">靈活的對話框組件，支援多種配置選項。</p>

            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative overflow-x-auto">
              <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;BaseBtn type="primary" @click="showDialog = true"&gt;
      打開對話框
    &lt;/BaseBtn&gt;

    &lt;BaseDialog
      v-model="showDialog"
      title="確認操作"
      sub-title="此操作將永久刪除該文件，是否繼續？"
      :is-warning="true"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    &gt;
      &lt;p&gt;這是對話框的內容區域，您可以放置任何內容。&lt;/p&gt;
    &lt;/BaseDialog&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { BaseBtn, BaseDialog } from 'rayyy-vue-table-components'

const showDialog = ref(false)

const handleConfirm = () => {
  console.log('確認操作')
  showDialog.value = false
}

const handleCancel = () => {
  console.log('取消操作')
  showDialog.value = false
}
&lt;/script&gt;</code></pre>
              <button
                @click="copyToClipboard('&lt;template&gt;\n  &lt;div&gt;\n    &lt;BaseBtn type=&quot;primary&quot; @click=&quot;showDialog = true&quot;&gt;\n      打開對話框\n    &lt;/BaseBtn&gt;\n    \n    &lt;BaseDialog \n      v-model=&quot;showDialog&quot; \n      title=&quot;確認操作&quot;\n      sub-title=&quot;此操作將永久刪除該文件，是否繼續？&quot;\n      :is-warning=&quot;true&quot;\n      @confirm=&quot;handleConfirm&quot;\n      @cancel=&quot;handleCancel&quot;\n    &gt;\n      &lt;p&gt;這是對話框的內容區域，您可以放置任何內容。&lt;/p&gt;\n    &lt;/BaseDialog&gt;\n  &lt;/div&gt;\n&lt;/template&gt;\n\n&lt;script setup lang=&quot;ts&quot;&gt;\nimport { ref } from \'vue\'\nimport { BaseBtn, BaseDialog } from \'rayyy-vue-table-components\'\n\nconst showDialog = ref(false)\n\nconst handleConfirm = () => {\n  console.log(\'確認操作\')\n  showDialog.value = false\n}\n\nconst handleCancel = () => {\n  console.log(\'取消操作\')\n  showDialog.value = false\n}\n&lt;/script&gt;')"
                class="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </el-card>

      <!-- API 參考 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-2xl font-bold text-gray-900">🔧 API 參考</h2>
        </template>

        <div class="space-y-8">
          <!-- SearchableListPanel API -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">SearchableListPanel</h3>
            <p class="text-gray-600 mb-4">整合式搜尋、篩選、分頁組件，提供完整的數據管理功能。</p>

            <div class="space-y-4">
              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Props</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">屬性</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">類型</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">默認值</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>data</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>T[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">列表數據</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>loading</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">加載狀態</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>total</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>number</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>0</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">總數據量</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>pageSize</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>number</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>10</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">每頁顯示數量</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>currentPage</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>number</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>1</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">當前頁碼</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>locale</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>Language</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>undefined</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><strong>Element Plus 語言設定，用於覆寫 i18n</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Events</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">事件名</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">參數</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>search</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>keyword: string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">搜尋時觸發</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>filter</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>filters: Record&lt;string, any&gt;</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">篩選時觸發</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>page-change</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>page: number</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">頁碼變更時觸發</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>


          <!-- TransferDialog API -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">TransferDialog</h3>
            <p class="text-gray-600 mb-4">支持拖拽排序和批量選擇的表格列配置對話框。</p>

            <div class="space-y-4">
              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Props</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">屬性</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">類型</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">默認值</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>modelValue</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">對話框顯示狀態</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>columns</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>TableColumn[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">表格列配置</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>visibleColumns</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">可見列屬性名數組</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>title</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>'列配置'</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">對話框標題</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Events</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">事件名</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">參數</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>confirm</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>columns: TableColumn[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">確認配置時觸發</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>cancel</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>void</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">取消配置時觸發</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- BaseTable API -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">BaseTable</h3>
            <p class="text-gray-600 mb-4">基礎表格組件，提供完整的數據展示和交互功能。</p>

            <div class="space-y-4">
              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Props</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">屬性</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">類型</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">默認值</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>data</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>T[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">表格數據</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>columns</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>TableColumn&lt;T&gt;[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">表格列配置</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>loading</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">加載狀態</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>showSelection</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">是否顯示選擇列</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>showSummary</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">是否顯示合計行</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Events</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">事件名</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">參數</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>selection-change</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>selection: T[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">選擇項變更時觸發</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>current-change</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>currentRow: T | null</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">當前行變更時觸發</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>cell-click</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>column: TableColumn&lt;T&gt;, row: T</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">單元格點擊時觸發</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>column-sort-change</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>value: SortChangValue&lt;T&gt;</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">列排序變更時觸發</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- BaseBtn API -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">BaseBtn</h3>
            <p class="text-gray-600 mb-4">增強的按鈕組件，基於 Element Plus Button 擴展。</p>

            <div class="space-y-4">
              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Props</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">屬性</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">類型</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">默認值</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>text</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">-</td>
                        <td class="px-4 py-2 text-sm text-gray-600">按鈕文字</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>type</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>ButtonType</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>'default'</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">按鈕類型</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>size</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>ComponentSize</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>'default'</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">按鈕尺寸</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>plain</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">是否為樸素按鈕</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>disabled</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">是否禁用</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>loading</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">是否顯示加載狀態</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">類型定義</h4>
                <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative overflow-x-auto">
                  <pre><code>type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger'
type ComponentSize = 'default' | 'small' | 'large'</code></pre>
                  <button
                    @click="copyToClipboard('type ButtonType = \'default\' | \'primary\' | \'success\' | \'warning\' | \'info\' | \'danger\'\ntype ComponentSize = \'default\' | \'small\' | \'large\'')"
                    class="absolute top-2 right-2 text-gray-400 hover:text-white"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- BaseInput API -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">BaseInput</h3>
            <p class="text-gray-600 mb-4">增強的輸入框組件，支援多種類型和驗證功能。</p>

            <div class="space-y-4">
              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Props</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">屬性</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">類型</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">默認值</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>modelValue</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>''</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">輸入值</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>type</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>'text'</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">輸入框類型</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>placeholder</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>''</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">佔位符</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>rules</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>ValidationRule[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">驗證規則</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>clearable</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">是否可清除</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>disabled</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">是否禁用</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- BaseSelector API -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">BaseSelector</h3>
            <p class="text-gray-600 mb-4">增強的選擇器組件，支援單選/多選、可清空、折疊標籤等功能，並解決了在 Dialog 中的 z-index 層級問題。</p>

            <div class="space-y-4">
              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Props</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">屬性</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">類型</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">默認值</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>modelValue</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string | string[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>''</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">選擇器的值</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>options</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>Array&lt;{value: string, label: string}&gt;</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>[{value: '', label: ''}]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">選項數據</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>placeholder</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>'請選擇'</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">佔位符文字</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>multiple</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">是否多選</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>disabled</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">是否禁用</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>collapseTags</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">是否折疊標籤</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>collapseTagsTooltip</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">是否顯示折疊標籤提示</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>class</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>'w-full'</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">自定義 CSS 類名</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Events</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">事件名</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">參數</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>update:modelValue</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>value?: string | string[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">選擇值變更時觸發</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">使用範例</h4>
                <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative overflow-x-auto">
                  <pre><code>&lt;template&gt;
  &lt;div class="space-y-4"&gt;
    &lt;!-- 基本選擇器 --&gt;
    &lt;BaseSelector
      v-model="selectedValue"
      :options="options"
      placeholder="請選擇選項"
    /&gt;

    &lt;!-- 多選選擇器 --&gt;
    &lt;BaseSelector
      v-model="selectedValues"
      :options="options"
      placeholder="請選擇多個選項"
      :multiple="true"
      :collapse-tags="true"
      :collapse-tags-tooltip="true"
    /&gt;

    &lt;!-- 禁用狀態 --&gt;
    &lt;BaseSelector
      v-model="selectedValue"
      :options="options"
      :disabled="true"
    /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { BaseSelector } from 'rayyy-vue-table-components'

const selectedValue = ref('')
const selectedValues = ref&lt;string[]&gt;([])

const options = [
  { value: 'option1', label: '選項一' },
  { value: 'option2', label: '選項二' },
  { value: 'option3', label: '選項三' }
]
&lt;/script&gt;</code></pre>
                  <button
                    @click="copyToClipboard('&lt;template&gt;\n  &lt;div class=&quot;space-y-4&quot;&gt;\n    &lt;!-- 基本選擇器 --&gt;\n    &lt;BaseSelector\n      v-model=&quot;selectedValue&quot;\n      :options=&quot;options&quot;\n      placeholder=&quot;請選擇選項&quot;\n    /&gt;\n\n    &lt;!-- 多選選擇器 --&gt;\n    &lt;BaseSelector\n      v-model=&quot;selectedValues&quot;\n      :options=&quot;options&quot;\n      placeholder=&quot;請選擇多個選項&quot;\n      :multiple=&quot;true&quot;\n      :collapse-tags=&quot;true&quot;\n      :collapse-tags-tooltip=&quot;true&quot;\n    /&gt;\n\n    &lt;!-- 禁用狀態 --&gt;\n    &lt;BaseSelector\n      v-model=&quot;selectedValue&quot;\n      :options=&quot;options&quot;\n      :disabled=&quot;true&quot;\n    /&gt;\n  &lt;/div&gt;\n&lt;/template&gt;\n\n&lt;script setup lang=&quot;ts&quot;&gt;\nimport { ref } from \'vue\'\nimport { BaseSelector } from \'rayyy-vue-table-components\'\n\nconst selectedValue = ref(\'\')\nconst selectedValues = ref&lt;string[]&gt;([])\n\nconst options = [\n  { value: \'option1\', label: \'選項一\' },\n  { value: \'option2\', label: \'選項二\' },\n  { value: \'option3\', label: \'選項三\' }\n]\n&lt;/script&gt;')"
                    class="absolute top-2 right-2 text-gray-400 hover:text-white"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- BaseDialog API -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">BaseDialog</h3>
            <p class="text-gray-600 mb-4">靈活的對話框組件，支援多種配置選項。</p>

            <div class="space-y-4">
              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Props</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">屬性</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">類型</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">默認值</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>modelValue</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">對話框顯示狀態</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>title</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>''</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">對話框標題</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>subTitle</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>''</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">對話框副標題</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>isWarning</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">是否為警告對話框</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>width</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>'50%'</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">對話框寬度</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Events</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">事件名</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">參數</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>confirm</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>void</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">確認時觸發</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>cancel</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>void</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">取消時觸發</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- SortTable API -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">SortTable</h3>
            <p class="text-gray-600 mb-4">支持多列排序的高級表格組件。</p>

            <div class="space-y-4">
              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Props</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">屬性</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">類型</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">默認值</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>data</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>T[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">表格數據</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>columns</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>TableColumn&lt;T&gt;[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">表格列配置</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>loading</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">加載狀態</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>multiSort</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>true</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">是否支持多列排序</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Events</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">事件名</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">參數</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>sort-change</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>sortInfo: SortInfo&lt;T&gt;</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">排序變更時觸發</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- SearchBar API -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">SearchBar</h3>
            <p class="text-gray-600 mb-4">功能豐富的搜尋欄組件，支援即時搜尋和搜尋建議。</p>

            <div class="space-y-4">
              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Props</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">屬性</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">類型</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">默認值</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>modelValue</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>''</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">搜尋關鍵字</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>placeholder</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>''</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">佔位符</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>suggestions</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">搜尋建議</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>loading</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">搜尋加載狀態</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Events</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">事件名</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">參數</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>search</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>keyword: string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">搜尋時觸發</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>suggestion-click</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>suggestion: string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">點擊建議時觸發</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- FunctionHeader API -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">FunctionHeader</h3>
            <p class="text-gray-600 mb-4">提供頁面標題、麵包屑和操作按鈕的功能標題組件。</p>

            <div class="space-y-4">
              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Props</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">屬性</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">類型</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">默認值</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>title</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>''</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">頁面標題</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>subTitle</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>''</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">頁面副標題</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>breadcrumbs</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>BreadcrumbItem[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>[]</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">麵包屑配置</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- MainPanel API -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">MainPanel</h3>
            <p class="text-gray-600 mb-4">提供統一內容容器的面板組件。</p>

            <div class="space-y-4">
              <div>
                <h4 class="text-lg font-medium text-gray-800 mb-3">Props</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">屬性</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">類型</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">默認值</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">說明</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>title</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>string</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>''</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">面板標題</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>padding</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>number</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>16</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">內邊距</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-sm text-gray-900"><code>shadow</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>boolean</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600"><code>false</code></td>
                        <td class="px-4 py-2 text-sm text-gray-600">是否顯示陰影</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 更多資源 -->
      <el-card shadow="always">
        <template #header>
          <h2 class="text-2xl font-bold text-gray-900">📚 更多資源</h2>
        </template>
        <div class="text-center">
            <div class="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">GitHub 源碼</h3>
            <p class="text-gray-600 mb-4">查看源碼、提交問題或貢獻代碼</p>
            <BaseBtn type="default" @click="openGitHubRepo">
              查看源碼
            </BaseBtn>
          </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
code {
  background-color: transparent;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

pre {
  white-space: pre-wrap;
}
</style>

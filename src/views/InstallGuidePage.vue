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

const openGitHubDocs = () => {
  router.push(ROUTES.DOCS_CENTER)
}

const openGitHubRepo = () => {
  window.open('https://github.com/Rayyyyyyyyyyyyyyyyyyyy/template', '_blank')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 返回按鈕 -->
      <div class="mb-6">
        <BaseBtn type="default" @click="goBack" class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          返回示範頁面
        </BaseBtn>
      </div>

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

      <!-- 特性介紹 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-2xl font-bold text-gray-900">✨ 特性</h2>
        </template>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-start">
            <span class="text-2xl mr-3">🚀</span>
            <div>
              <h3 class="font-semibold text-gray-900">現代化技術棧</h3>
              <p class="text-gray-600">基於 Vue 3 + TypeScript + Element Plus</p>
            </div>
          </div>
          <div class="flex items-start">
            <span class="text-2xl mr-3">📦</span>
            <div>
              <h3 class="font-semibold text-gray-900">開箱即用</h3>
              <p class="text-gray-600">提供完整的表格解決方案</p>
            </div>
          </div>
          <div class="flex items-start">
            <span class="text-2xl mr-3">🎯</span>
            <div>
              <h3 class="font-semibold text-gray-900">類型安全</h3>
              <p class="text-gray-600">完整的 TypeScript 類型定義</p>
            </div>
          </div>
          <div class="flex items-start">
            <span class="text-2xl mr-3">📱</span>
            <div>
              <h3 class="font-semibold text-gray-900">響應式設計</h3>
              <p class="text-gray-600">適配各種設備尺寸</p>
            </div>
          </div>
          <div class="flex items-start">
            <span class="text-2xl mr-3">🔧</span>
            <div>
              <h3 class="font-semibold text-gray-900">高度可配置</h3>
              <p class="text-gray-600">靈活的配置選項</p>
            </div>
          </div>
          <div class="flex items-start">
            <span class="text-2xl mr-3">🎨</span>
            <div>
              <h3 class="font-semibold text-gray-900">樣式系統</h3>
              <p class="text-gray-600">多種樣式導入方式，支援自定義主題</p>
            </div>
          </div>
          <div class="flex items-start">
            <span class="text-2xl mr-3">🛠️</span>
            <div>
              <h3 class="font-semibold text-gray-900">現代化工具</h3>
              <p class="text-gray-600">Sass 模組化 + TypeScript 樣式工具</p>
            </div>
          </div>
          <div class="flex items-start">
            <span class="text-2xl mr-3">💡</span>
            <div>
              <h3 class="font-semibold text-gray-900">豐富組件</h3>
              <p class="text-gray-600">表格、按鈕、對話框、穿梭框等</p>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 安裝指南 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-2xl font-bold text-gray-900">📦 安裝</h2>
        </template>
        <p class="text-gray-600 mb-4">使用您喜歡的包管理器安裝：</p>

        <div class="space-y-4">
          <div>
            <h3 class="font-semibold text-gray-900 mb-2">npm</h3>
            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative">
              <code>npm install rayyy-vue-table-components</code>
              <button
                @click="copyToClipboard('npm install rayyy-vue-table-components')"
                class="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <h3 class="font-semibold text-gray-900 mb-2">yarn</h3>
            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative">
              <code>yarn add rayyy-vue-table-components</code>
              <button
                @click="copyToClipboard('yarn add rayyy-vue-table-components')"
                class="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <h3 class="font-semibold text-gray-900 mb-2">pnpm</h3>
            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative">
              <code>pnpm add rayyy-vue-table-components</code>
              <button
                @click="copyToClipboard('pnpm add rayyy-vue-table-components')"
                class="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p class="text-yellow-800">
            <strong>注意:</strong> 本組件庫需要 Vue 3.0+ 和 Element Plus 作為對等依賴。
          </p>
        </div>
      </el-card>

      <!-- 快速開始 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-2xl font-bold text-gray-900">🚀 快速開始</h2>
        </template>

        <div class="space-y-8">
          <!-- 樣式引入 -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">樣式引入</h3>
            <p class="text-gray-600 mb-4">在 <code class="bg-gray-100 px-2 py-1 rounded">main.ts</code> 引入樣式</p>
            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative overflow-x-auto">
              <pre><code>

import 'rayyy-vue-table-components/styles'

</code></pre>
              <button
                @click="copyToClipboard('import { createApp } from \'vue\'\nimport ElementPlus from \'element-plus\'\nimport \'element-plus/dist/index.css\'\nimport VueTableComponents from \'rayyy-vue-table-components\'\nimport \'rayyy-vue-table-components/styles\'\n\nimport App from \'./App.vue\'\n\nconst app = createApp(App)\n\n// 安裝 Element Plus（可自定義語系）\napp.use(ElementPlus, {\n  locale: zhTw  // 設定繁體中文\n})\n\n// 安裝組件庫\napp.use(VueTableComponents)\n\napp.mount(\'#app\')')"
                class="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- 按需引入 -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">按需引入</h3>
            <p class="text-gray-600 mb-4">如果您只想使用部分組件，可以按需引入：</p>
            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative overflow-x-auto">
              <pre><code>&lt;script setup&gt;
import {
  SortTable,
  TransferDialog,
  TransferItem,
  BaseBtn,
  SearchableListPanel,
} from 'rayyy-vue-table-components'
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;BaseBtn&gt;按鈕&lt;/BaseBtn&gt;
    &lt;SortTable :data="tableData" /&gt;
    &lt;!-- 其他組件... --&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
              <button
                @click="copyToClipboard(`&lt;script setup&gt;
import {
  SortTable,
  TransferDialog,
  TransferItem,
  BaseBtn,
  SearchableListPanel,
} from 'rayyy-vue-table-components'
import 'rayyy-vue-table-components/styles'
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;BaseBtn&gt;按鈕&lt;/BaseBtn&gt;
    &lt;SortTable :data=&quot;tableData&quot; /&gt;
    &lt;!-- 其他組件... --&gt;
  &lt;/div&gt;
&lt;/template&gt;`)"
                class="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Hello World -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Hello World</h3>
            <p class="text-gray-600 mb-4">創建您的第一個表格：</p>
            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative overflow-x-auto">
              <pre><code>&lt;template&gt;
  &lt;BaseTable
    :data="tableData"
    :columns="columns"
    :loading="loading"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { BaseTable } from 'rayyy-vue-table-components'
import type { TableColumn } from 'rayyy-vue-table-components'

interface User {
  id: number
  name: string
  email: string
}

const loading = ref(false)
const tableData = ref&lt;User[]&gt;([
  { id: 1, name: '張三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' }
])

const columns: TableColumn&lt;User&gt;[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '郵箱' }
]
&lt;/script&gt;</code></pre>
              <button
                @click="copyToClipboard('&lt;template&gt;\n  &lt;BaseTable\n    :data=&quot;tableData&quot;\n    :columns=&quot;columns&quot;\n    :loading=&quot;loading&quot;\n  /&gt;\n&lt;/template&gt;\n\n&lt;script setup lang=&quot;ts&quot;&gt;\nimport { ref } from \'vue\'\nimport { BaseTable } from \'rayyy-vue-table-components\'\nimport type { TableColumn } from \'rayyy-vue-table-components\'\n\ninterface User {\n  id: number\n  name: string\n  email: string\n}\n\nconst loading = ref(false)\nconst tableData = ref&lt;User[]&gt;([\n  { id: 1, name: \'張三\', email: \'zhangsan@example.com\' },\n  { id: 2, name: \'李四\', email: \'lisi@example.com\' }\n])\n\nconst columns: TableColumn&lt;User&gt;[] = [\n  { prop: \'id\', label: \'ID\', width: 80 },\n  { prop: \'name\', label: \'姓名\' },\n  { prop: \'email\', label: \'郵箱\' }\n]\n&lt;/script&gt;')"
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

      <!-- 更多資源 -->
      <el-card shadow="always">
        <template #header>
          <h2 class="text-2xl font-bold text-gray-900">📚 更多資源</h2>
        </template>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="text-center">
            <div class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">完整文檔</h3>
            <p class="text-gray-600 mb-4">查看完整的 API 文檔和使用範例</p>
            <BaseBtn type="primary" @click="openGitHubDocs">
              查看文檔
            </BaseBtn>
          </div>
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

# Vue Table Components

<p align="center">
  <img src="https://img.shields.io/npm/v/rayyy-vue-table-components.svg" alt="npm version">
  <img src="https://img.shields.io/npm/dm/rayyy-vue-table-components.svg" alt="npm downloads">
  <img src="https://img.shields.io/github/license/rayshao/vue-table-components.svg" alt="license">
  <img src="https://img.shields.io/badge/vue-3.x-brightgreen.svg" alt="vue">
</p>

基於 Vue 3 + Element Plus + TypeScript 的現代化組件庫，提供豐富的表格、表單、佈局和交互組件，支援完整的 TypeScript 類型定義和現代化開發體驗。

## ✨ 特性

- 🚀 **現代化技術棧** - 基於 Vue 3 + TypeScript + Element Plus + Tailwind CSS
- 📦 **開箱即用** - 提供完整的組件解決方案，包含表格、表單、佈局、交互組件
- 🎯 **類型安全** - 完整的 TypeScript 類型定義，支援智能提示和類型檢查
- 🌐 **國際化支持** - 支援多語言切換，與外部專案 i18n 完美整合
- 📱 **響應式設計** - 使用 Tailwind CSS，適配各種設備尺寸
- 🔧 **高度可配置** - 靈活的配置選項和豐富的插槽支持
- 🎨 **樣式系統** - 多種樣式導入方式，支援自定義主題和 Tailwind CSS 集成
- 🛠️ **現代化工具** - Sass 模組化 + TypeScript 樣式工具 + 自動導入
- 💡 **豐富組件** - 15 個組件，涵蓋表格、表單、佈局、對話框、穿梭框等
- 🧪 **完整測試** - 單元測試 + E2E 測試，確保組件穩定性
- 📚 **詳細文檔** - 完整的 API 文檔和使用示例

## 📦 安裝

使用您喜歡的包管理器安裝：

```bash
# npm
npm install rayyy-vue-table-components

# yarn
yarn add rayyy-vue-table-components

# pnpm
pnpm add rayyy-vue-table-components
```

> **注意**: 本組件庫需要 Vue 3.0+、Element Plus 和 vue-i18n (>=10.0.0) 作為對等依賴。

## 🚀 快速開始

### 完整引入

在 `main.ts` 中完整引入所有組件：

```typescript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueTableComponents from 'rayyy-vue-table-components'
import 'rayyy-vue-table-components/styles'

import App from './App.vue'

const app = createApp(App)

// 安裝 Element Plus（可自定義語系）
app.use(ElementPlus, {
  locale: zhTw  // 設定繁體中文
})

// 安裝組件庫
app.use(VueTableComponents)

app.mount('#app')
```

### 語系設定

組件庫依賴 Element Plus，請在安裝 Element Plus 時設定語系：

```typescript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import en from 'element-plus/es/locale/lang/en'
import VueTableComponents from 'rayyy-vue-table-components'

const app = createApp(App)

// 使用繁體中文
app.use(ElementPlus, {
  locale: zhTw
})

// 或使用英文
app.use(ElementPlus, {
  locale: en
})

app.use(VueTableComponents)
app.mount('#app')
```

### 國際化 (i18n) 設定

組件庫支援國際化，需要與外部專案的 `vue-i18n` 整合。**重要**：組件庫提供翻譯檔案，需要外部專案合併使用：

```typescript
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import ElementPlus from 'element-plus'
import VueTableComponents, { messages as componentMessages } from 'rayyy-vue-table-components'

const app = createApp(App)

// 建立 i18n 實例，合併組件庫的翻譯
const i18n = createI18n({
  legacy: false,
  locale: 'zh-TW',
  fallbackLocale: 'zh-TW',
  messages: {
    // 合併組件庫的翻譯
    'zh-TW': {
      ...componentMessages['zh-TW'],
      // 可以添加您自己的翻譯
      'custom.key': '自定義翻譯'
    },
    'en-US': {
      ...componentMessages['en-US'],
      // 可以添加您自己的翻譯
      'custom.key': 'Custom Translation'
    }
  }
})

app.use(i18n)
app.use(ElementPlus)
app.use(VueTableComponents)
app.mount('#app')
```

**支援的語系：**
- `zh-TW` - 繁體中文（預設）
- `en-US` - 英文

**導入翻譯檔案：**
```typescript
// 導入組件庫的翻譯
import { messages as componentMessages } from 'rayyy-vue-table-components/locales'

// 導入特定語系
import { zhTW, enUS } from 'rayyy-vue-table-components/locales'

// 導入類型
import type { LocaleType } from 'rayyy-vue-table-components/locales'
```

### 按需引入

如果您只想使用部分組件，可以按需引入：

```vue
<script setup>
import {
  SortTable,
  TransferDialog,
  TransferItem,
  BaseBtn,
  SearchableListPanel,
} from 'rayyy-vue-table-components'
</script>

<template>
  <div>
    <BaseBtn>按鈕</BaseBtn>
    <SortTable :data="tableData" />
    <!-- 其他組件... -->
  </div>
</template>
```

### Hello World

創建您的第一個表格：

```vue
<template>
  <BaseTable
    :data="tableData"
    :columns="columns"
    :loading="loading"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseTable } from 'rayyy-vue-table-components'
import type { TableColumn } from 'rayyy-vue-table-components'

interface User {
  id: number
  name: string
  email: string
}

const loading = ref(false)
const tableData = ref<User[]>([
  { id: 1, name: '張三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' }
])

const columns: TableColumn<User>[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '郵箱' }
]
</script>
```

## 🎨 樣式配置

本組件庫提供多種靈活的樣式導入方式：

### 完整樣式導入（推薦）

```typescript
// main.ts
import 'element-plus/dist/index.css'
import 'rayyy-vue-table-components/styles'
```

### 自定義主題

```scss
// styles.scss
@import 'element-plus/dist/index.css';
@import 'rayyy-vue-table-components/styles/element';
```

### TypeScript 樣式工具

```vue
<template>
  <!-- 直接使用預定義的樣式類別 -->
  <div class="table-cell bg-blue-20">被駁回的單元格</div>
  <div class="table-header">標題行</div>
</template>
```

## 📚 組件示例

### 🗂️ 表格組件

#### BaseTable - 基礎數據表格

基礎的數據表格組件，支援排序、選擇、自定義列等功能。

<details>
<summary>基本用法</summary>

```vue
<template>
  <BaseTable
    :data="tableData"
    :columns="columns"
    :loading="loading"
    @column-sort-change="handleSortChange"
  />
</template>

<script setup lang="ts">
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
const tableData = ref<User[]>([
  { id: 1, name: '張三', email: 'zhangsan@example.com', age: 30 },
  { id: 2, name: '李四', email: 'lisi@example.com', age: 25 }
])

const columns: TableColumn<User>[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', sortable: true },
  { prop: 'email', label: '郵箱' },
  { prop: 'age', label: '年齡', sortable: true }
]

const handleSortChange = (sortInfo: SortChangValue<User>) => {
  console.log('排序變更:', sortInfo)
}
</script>
```
</details>

<details>
<summary>帶選擇和合計的表格</summary>

```vue
<template>
  <BaseTable
    :data="tableData"
    :columns="columns"
    :show-selection="true"
    :show-summary="true"
    :summary-method="summaryMethod"
    @selection-change="handleSelectionChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseTable } from 'rayyy-vue-table-components'
import type { TableColumn } from 'rayyy-vue-table-components'

interface Product {
  id: number
  name: string
  price: number
  quantity: number
}

const tableData = ref<Product[]>([
  { id: 1, name: '產品A', price: 100, quantity: 5 },
  { id: 2, name: '產品B', price: 200, quantity: 3 }
])

const columns: TableColumn<Product>[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '產品名稱' },
  { prop: 'price', label: '單價' },
  { prop: 'quantity', label: '數量' }
]

const summaryMethod = ({ columns, data }: any) => {
  const sums: string[] = []
  columns.forEach((column: any, index: number) => {
    if (index === 0) {
      sums[index] = '總計'
    } else if (column.property === 'price') {
      const values = data.map((item: Product) => Number(item.price))
      sums[index] = values.reduce((prev, curr) => prev + curr, 0).toString()
    } else if (column.property === 'quantity') {
      const values = data.map((item: Product) => Number(item.quantity))
      sums[index] = values.reduce((prev, curr) => prev + curr, 0).toString()
    } else {
      sums[index] = ''
    }
  })
  return sums
}

const handleSelectionChange = (selection: Product[]) => {
  console.log('選中項:', selection)
}
</script>
```
</details>

<details>
<summary>展開行用法</summary>

```vue
<template>
  <BaseTable
    :data="tableData"
    :columns="columns"
    show-expand
    preserve-expanded
  >
    <template #expand="{ row }">
      <div class="m-4">
        <p>State: {{ row.state }}</p>
        <p>City: {{ row.city }}</p>
        <el-table :data="row.family" border>
          <el-table-column label="Name" prop="name" />
          <el-table-column label="State" prop="state" />
        </el-table>
      </div>
    </template>
  </BaseTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseTable } from 'rayyy-vue-table-components'
import type { TableColumn } from 'rayyy-vue-table-components'

interface Family {
  name: string
  state: string
}

interface UserWithFamily {
  id: number
  name: string
  state: string
  city: string
  family: Family[]
}

const tableData = ref<UserWithFamily[]>([
  {
    id: 1,
    name: '張三',
    state: '台北',
    city: '信義區',
    family: [
      { name: '張小明', state: '台北' },
      { name: '張小華', state: '新北' },
    ],
  },
])

const columns: TableColumn<UserWithFamily>[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名' },
  { prop: 'state', label: '縣市' },
  { prop: 'city', label: '區域' },
]
</script>
```
</details>

<details>
<summary>樹形資料與懶加載用法</summary>

```vue
<template>
  <BaseTable
    :data="treeData"
    :columns="columns"
    row-key="id"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    :lazy="true"
    :load="loadChildren"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseTable } from 'rayyy-vue-table-components'
import type { TableColumn } from 'rayyy-vue-table-components'

interface TreeItem {
  id: string
  name: string
  department: string
  hasChildren?: boolean
  children?: TreeItem[]
}

const treeData = ref<TreeItem[]>([
  {
    id: 'dept-tech',
    name: '技術部',
    department: '技術部',
    children: [{ id: 'u-101', name: '林工程師', department: '技術部' }],
  },
  {
    id: 'dept-product',
    name: '產品部',
    department: '產品部',
    hasChildren: true,
  },
])

const columns: TableColumn<TreeItem>[] = [
  { prop: 'name', label: '名稱' },
  { prop: 'department', label: '部門' },
]

const loadChildren = (
  row: TreeItem,
  _treeNode: unknown,
  resolve: (data: TreeItem[]) => void,
) => {
  // 模擬 API
  setTimeout(() => {
    if (row.id === 'dept-product') {
      resolve([{ id: 'u-201', name: '蔡產品', department: '產品部' }])
      return
    }
    resolve([])
  }, 500)
}
</script>
```
</details>

#### SortTable - 排序表格

支援多列排序的高級表格組件。

<details>
<summary>基本用法</summary>

```vue
<template>
  <SortTable
    :data="tableData"
    :columns="columns"
    :loading="loading"
    @sort-change="handleSortChange"
  />
</template>

<script setup lang="ts">
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
const tableData = ref<User[]>([
  { id: 1, name: '張三', email: 'zhangsan@example.com', age: 30, score: 85 },
  { id: 2, name: '李四', email: 'lisi@example.com', age: 25, score: 92 }
])

const columns: TableColumn<User>[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', sortable: true },
  { prop: 'email', label: '郵箱' },
  { prop: 'age', label: '年齡', sortable: true },
  { prop: 'score', label: '分數', sortable: true }
]

const handleSortChange = (sortInfo: SortInfo<User>) => {
  console.log('排序變更:', sortInfo)
}
</script>
```
</details>

#### TitleTable - 標題表格

帶標題和操作按鈕的表格組件。

<details>
<summary>基本用法</summary>

```vue
<template>
  <TitleTable
    title="用戶列表"
    :data="tableData"
    :columns="columns"
    :loading="loading"
    @add="handleAdd"
    @export="handleExport"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TitleTable } from 'rayyy-vue-table-components'
import type { TableColumn } from 'rayyy-vue-table-components'

interface User {
  id: number
  name: string
  email: string
}

const loading = ref(false)
const tableData = ref<User[]>([
  { id: 1, name: '張三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' }
])

const columns: TableColumn<User>[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '郵箱' }
]

const handleAdd = () => {
  console.log('新增用戶')
}

const handleExport = () => {
  console.log('導出數據')
}
</script>
```
</details>

### 🎛️ 表單組件

#### BaseInput - 基礎輸入框

增強的輸入框組件，支援多種類型和驗證功能。

<details>
<summary>基本用法</summary>

```vue
<template>
  <div class="space-y-4">
    <BaseInput
      v-model="inputValue"
      placeholder="請輸入內容"
      :clearable="true"
    />
    <BaseInput
      v-model="passwordValue"
      type="password"
      placeholder="請輸入密碼"
      show-password
    />
    <BaseInput
      v-model="emailValue"
      type="email"
      placeholder="請輸入郵箱"
      :validate="validateEmail"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from 'rayyy-vue-table-components'

const inputValue = ref('')
const passwordValue = ref('')
const emailValue = ref('')

const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value) || '請輸入有效的郵箱地址'
}
</script>
```
</details>

### 🎨 交互組件

#### BaseBtn - 按鈕組件

增強的按鈕組件，支援多種樣式和狀態。

<details>
<summary>基本用法</summary>

```vue
<template>
  <div class="button-group">
    <BaseBtn type="primary" @click="handleClick">主要按鈕</BaseBtn>
    <BaseBtn type="success" :loading="loading">成功按鈕</BaseBtn>
    <BaseBtn type="warning" plain>樸素按鈕</BaseBtn>
    <BaseBtn type="danger" disabled>禁用按鈕</BaseBtn>
    <BaseBtn type="info" link>文字按鈕</BaseBtn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseBtn } from 'rayyy-vue-table-components'

const loading = ref(false)

const handleClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<style scoped>
.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
```
</details>

#### SearchBar - 搜尋欄組件

功能豐富的搜尋欄組件，支援即時搜尋和搜尋建議。

<details>
<summary>基本用法</summary>

```vue
<template>
  <SearchBar
    v-model="searchKeyword"
    placeholder="搜尋用戶、郵箱或電話..."
    :suggestions="suggestions"
    @search="handleSearch"
    @suggestion-click="handleSuggestionClick"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { SearchBar } from 'rayyy-vue-table-components'

const searchKeyword = ref('')
const allSuggestions = ref([
  '張三', '李四', '王五', '趙六'
])

const suggestions = computed(() => {
  if (!searchKeyword.value) return []
  return allSuggestions.value.filter(item => 
    item.includes(searchKeyword.value)
  )
})

const handleSearch = (keyword: string) => {
  console.log('搜尋關鍵字:', keyword)
}

const handleSuggestionClick = (suggestion: string) => {
  searchKeyword.value = suggestion
}
</script>
```
</details>

### 💬 對話框組件

#### BaseDialog - 基礎對話框

靈活的對話框組件，支援多種配置選項。

<details>
<summary>基本用法</summary>

```vue
<template>
  <div>
    <BaseBtn type="primary" @click="showDialog = true">
      打開對話框
    </BaseBtn>
    
    <BaseDialog 
      v-model="showDialog" 
      title="確認操作"
      sub-title="此操作將永久刪除該文件，是否繼續？"
      :is-warning="true"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <p>這是對話框的內容區域，您可以放置任何內容。</p>
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
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
</script>
```
</details>

#### BaseWaringDialog - 警告對話框

專門用於警告和確認操作的對話框組件。

<details>
<summary>基本用法</summary>

```vue
<template>
  <div>
    <BaseBtn type="danger" @click="showWarningDialog = true">
      刪除項目
    </BaseBtn>
    
    <BaseWaringDialog 
      v-model="showWarningDialog" 
      title="警告"
      sub-title="此操作無法復原，確定要刪除嗎？"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseBtn, BaseWaringDialog } from 'rayyy-vue-table-components'

const showWarningDialog = ref(false)

const handleConfirm = () => {
  console.log('確認刪除')
  showWarningDialog.value = false
}

const handleCancel = () => {
  console.log('取消刪除')
  showWarningDialog.value = false
}
</script>
```
</details>

### 🏗️ 佈局組件

#### MainPanel - 主面板組件

靈活的主面板組件，提供標題、返回按鈕和可自定義高度的滾動區域。

<details>
<summary>基本用法</summary>

```vue
<template>
  <MainPanel 
    title="用戶管理" 
    :show-back="true"
    max-height="calc(100vh-200px)"
  >
    <template #searchBar>
      <SearchBar @search="handleSearch" />
    </template>
    
    <template #main>
      <BaseTable
        :data="tableData"
        :columns="columns"
        :loading="loading"
      />
    </template>
    
    <template #footer>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </template>
  </MainPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MainPanel, SearchBar, BaseTable } from 'rayyy-vue-table-components'
import type { TableColumn } from 'rayyy-vue-table-components'

interface User {
  id: number
  name: string
  email: string
}

const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const tableData = ref<User[]>([
  { id: 1, name: '張三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' }
])

const columns: TableColumn<User>[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '郵箱' }
]

const handleSearch = (keyword: string) => {
  console.log('搜尋關鍵字:', keyword)
}
</script>
```
</details>

#### DetailLayout - 詳細頁面佈局

專門用於詳細頁面的佈局組件，支援編輯模式和只讀模式切換。

<details>
<summary>基本用法</summary>

```vue
<template>
  <DetailLayout
    title="用戶詳細信息"
    :editable="isEditable"
    :loading="loading"
    @save="handleSave"
    @cancel="handleCancel"
    @back="handleBack"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">用戶管理</h1>
        <BaseBtn 
          type="primary" 
          @click="toggleEdit"
        >
          {{ isEditable ? '保存' : '編輯' }}
        </BaseBtn>
      </div>
    </template>
    
    <template #main>
      <div class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <BaseInput
            v-model="userForm.name"
            label="姓名"
            :disabled="!isEditable"
          />
          <BaseInput
            v-model="userForm.email"
            label="郵箱"
            type="email"
            :disabled="!isEditable"
          />
        </div>
      </div>
    </template>
  </DetailLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DetailLayout, BaseBtn, BaseInput } from 'rayyy-vue-table-components'

const isEditable = ref(false)
const loading = ref(false)

const userForm = ref({
  name: '張三',
  email: 'zhangsan@example.com'
})

const toggleEdit = () => {
  isEditable.value = !isEditable.value
}

const handleSave = async () => {
  loading.value = true
  // 模擬保存操作
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
  isEditable.value = false
}

const handleCancel = () => {
  isEditable.value = false
}

const handleBack = () => {
  // 返回上一頁
  console.log('返回上一頁')
}
</script>
```
</details>

#### FilterLayout - 篩選頁面佈局

專門用於篩選頁面的佈局組件，支援自定義篩選表單。

<details>
<summary>基本用法</summary>

```vue
<template>
  <FilterLayout
    main-title="用戶管理"
    filter-title="篩選條件"
    @submit="handleFilterSubmit"
    @reset="handleFilterReset"
  >
    <template #filter-form>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BaseInput
          v-model="filterForm.keyword"
          label="關鍵字"
          placeholder="搜尋姓名或郵箱"
        />
        <BaseInput
          v-model="filterForm.dateRange"
          label="創建時間"
          type="daterange"
        />
      </div>
    </template>
  </FilterLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FilterLayout, BaseInput } from 'rayyy-vue-table-components'

const filterForm = ref({
  keyword: '',
  dateRange: []
})

const handleFilterSubmit = () => {
  console.log('篩選條件:', filterForm.value)
}

const handleFilterReset = () => {
  filterForm.value = {
    keyword: '',
    dateRange: []
  }
}
</script>
```
</details>

#### SearchableListPanel - 整合式搜尋面板

整合搜尋、篩選、分頁功能的綜合面板組件。**支援 locale prop 來覆寫 i18n 設定**。

<details>
<summary>基本用法</summary>

```vue
<template>
  <SearchableListPanel
    title="用戶列表"
    :data="tableData"
    :columns="columns"
    :loading="loading"
    :pagination="pagination"
    @search="handleSearch"
    @filter="handleFilter"
    @page-change="handlePageChange"
  >
    <template #firstButton>
      <BaseBtn type="primary" @click="handleAdd">
        新增用戶
      </BaseBtn>
    </template>
    
    <template #customButton>
      <BaseBtn type="success" @click="handleExport">
        導出數據
      </BaseBtn>
    </template>
    
    <template #lastButton>
      <BaseBtn type="warning" @click="handleBatch">
        批量操作
      </BaseBtn>
    </template>
  </SearchableListPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SearchableListPanel, BaseBtn } from 'rayyy-vue-table-components'
import type { TableColumn } from 'rayyy-vue-table-components'

interface User {
  id: number
  name: string
  email: string
  status: string
}

const loading = ref(false)
const tableData = ref<User[]>([
  { id: 1, name: '張三', email: 'zhangsan@example.com', status: 'active' },
  { id: 2, name: '李四', email: 'lisi@example.com', status: 'inactive' }
])

const columns: TableColumn<User>[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '郵箱' },
  { prop: 'status', label: '狀態' }
]

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 100
})

const handleSearch = (keyword: string) => {
  console.log('搜尋:', keyword)
}

const handleFilter = (filters: Record<string, any>) => {
  console.log('篩選:', filters)
}

const handlePageChange = (page: number, pageSize: number) => {
  console.log('分頁變更:', page, pageSize)
}

const handleAdd = () => {
  console.log('新增用戶')
}

const handleExport = () => {
  console.log('導出數據')
}

const handleBatch = () => {
  console.log('批量操作')
}
</script>
```
</details>

<details>
<summary>使用 locale prop 覆寫 i18n</summary>

```vue
<template>
  <SearchableListPanel
    title="User List"
    :data="tableData"
    :columns="columns"
    :loading="loading"
    :pagination="pagination"
    :locale="elementLocale"
    @search="handleSearch"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { SearchableListPanel } from 'rayyy-vue-table-components'
import en from 'element-plus/es/locale/lang/en'
import zhTw from 'element-plus/es/locale/lang/zh-tw'

const currentLocale = ref('zh-TW')

// 根據當前語系選擇 Element Plus locale
const elementLocale = computed(() => {
  return currentLocale.value === 'zh-TW' ? zhTw : en
})

// 切換語系
const switchLocale = () => {
  currentLocale.value = currentLocale.value === 'zh-TW' ? 'en-US' : 'zh-TW'
}

// 其他組件邏輯...
</script>
```
</details>

#### FunctionHeader - 功能頁面標題

提供頁面標題、麵包屑和操作按鈕的功能標題組件。

<details>
<summary>基本用法</summary>

```vue
<template>
  <FunctionHeader
    title="用戶管理"
    sub-title="管理系統用戶信息"
    :breadcrumbs="breadcrumbs"
  >
    <template #actions>
      <BaseBtn type="primary">新增用戶</BaseBtn>
      <BaseBtn type="default">導出數據</BaseBtn>
    </template>
  </FunctionHeader>
</template>

<script setup lang="ts">
import { FunctionHeader, BaseBtn } from 'rayyy-vue-table-components'

const breadcrumbs = [
  { label: '首頁', path: '/' },
  { label: '系統管理', path: '/system' },
  { label: '用戶管理' }
]
</script>
```
</details>

### 🔄 轉移組件

#### TransferDialog - 穿梭框對話框

用於表格列配置的穿梭框組件，支援拖拽排序。

<details>
<summary>基本用法</summary>

```vue
<template>
  <div>
    <BaseBtn @click="showTransferDialog = true">配置表格列</BaseBtn>
    
    <TransferDialog
      v-model="showTransferDialog"
      :columns-value="tableColumns"
      transfer-title="配置表格列"
      @update:submit="handleColumnSubmit"
    >
      <template #list-container="{ columns, clickItemProp, handleItemEvents, handleMousedown }">
        <draggable :list="columns" item-key="prop" delay="200">
          <template #item="{ element, index }">
            <TransferItem
              :columns-value="element"
              :columns-index="index"
              :columns-len="columns.length"
              :class="{
                'transfer-active-bg': element.checkActive,
                'transfer-active-border': clickItemProp === element.prop,
              }"
              @mousedown="handleMousedown(element.prop || '')"
              @update:toTop="handleItemEvents.toTop(index)"
              @update:toBottom="handleItemEvents.toBottom(index)"
              @update:toPre="handleItemEvents.toPre(index)"
              @update:toNext="handleItemEvents.toNext(index)"
            />
          </template>
        </draggable>
      </template>
    </TransferDialog>
    
    <!-- 使用配置後的表格 -->
    <BaseTable
      :data="tableData"
      :columns="visibleColumns"
      style="margin-top: 20px"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'
import { BaseBtn, BaseTable, TransferDialog, TransferItem } from 'rayyy-vue-table-components'
import type { TableColumn } from 'rayyy-vue-table-components'

interface User {
  id: number
  name: string
  email: string
  age: number
}

const showTransferDialog = ref(false)
const tableData = ref<User[]>([
  { id: 1, name: '張三', email: 'zhangsan@example.com', age: 30 },
  { id: 2, name: '李四', email: 'lisi@example.com', age: 25 }
])

const tableColumns = ref<TableColumn<User>[]>([
  { prop: 'id', label: 'ID', width: 80, checkActive: true },
  { prop: 'name', label: '姓名', checkActive: true },
  { prop: 'email', label: '郵箱', checkActive: true },
  { prop: 'age', label: '年齡', checkActive: false }
])

const visibleColumns = computed(() => 
  tableColumns.value.filter(col => col.checkActive)
)

const handleColumnSubmit = (newColumns: TableColumn<User>[]) => {
  tableColumns.value = newColumns
  showTransferDialog.value = false
}
</script>
```
</details>

## 🔧 API 參考

### BaseTable

基礎表格組件，提供完整的數據展示和交互功能。

#### Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `data` | `T[]` | `[]` | 表格數據 |
| `columns` | `TableColumn<T>[]` | `[]` | 表格列配置 |
| `loading` | `boolean` | `false` | 加載狀態 |
| `showSelection` | `boolean` | `false` | 是否顯示選擇列 |
| `showSummary` | `boolean` | `false` | 是否顯示合計行 |
| `showOverFlowTooltip` | `boolean` | `false` | 是否顯示溢出提示 |
| `summaryMethod` | `SummaryMethod<T>` | - | 合計行計算方法 |
| `baseTableRowClassName` | `RowClassNameGetter<T>` | - | 行樣式類名函數 |
| `showIndex` | `boolean` | `false` | 是否顯示索引列 |
| `showExpand` | `boolean` | `false` | 是否顯示展開列 |
| `rowKey` | `string \| ((row: T) => string)` | - | 行資料的唯一鍵（樹形資料與懶加載建議必填） |
| `treeProps` | `{ children?: string; hasChildren?: string; checkStrictly?: boolean }` | `{ children: 'children', hasChildren: 'hasChildren' }` | 樹形資料欄位配置 |
| `defaultExpandAll` | `boolean` | `false` | 是否預設展開所有節點 |
| `expandRowKeys` | `string[]` | `[]` | 指定展開節點 keys |
| `lazy` | `boolean` | `false` | 是否啟用懶加載子節點 |
| `load` | `(row, treeNode, resolve) => void` | - | 懶加載函式 |
| `showCheckBtn` | `boolean` | `false` | 是否顯示查看按鈕 |
| `showEditBtn` | `boolean` | `false` | 是否顯示編輯按鈕 |
| `preserveExpanded` | `boolean` | `false` | 資料更新時是否保留已展開狀態 |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `selection-change` | `selection: T[]` | 選擇項變更時觸發 |
| `current-change` | `currentRow: T \| null` | 當前行變更時觸發 |
| `cell-click` | `column: TableColumn<T>, row: T` | 單元格點擊時觸發 |
| `column-sort-change` | `value: SortChangValue<T>` | 列排序變更時觸發 |
| `click:checkRow` | `row: T` | 查看按鈕點擊時觸發 |
| `click:editRow` | `row: T` | 編輯按鈕點擊時觸發 |

#### Slots

| 插槽名 | 參數 | 說明 |
|--------|------|------|
| `expand` | `{ row: T, $index: number }` | 展開行的自訂內容（需搭配 `showExpand`） |

---

### BaseBtn

增強的按鈕組件，基於 Element Plus Button 擴展。

#### Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `text` | `string` | - | 按鈕文字 |
| `type` | `ButtonType` | `'default'` | 按鈕類型 |
| `size` | `ComponentSize` | `'default'` | 按鈕尺寸 |
| `plain` | `boolean` | `false` | 是否為樸素按鈕 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `loading` | `boolean` | `false` | 是否顯示加載狀態 |
| `icon` | `Component` | - | 圖標組件 |
| `link` | `boolean` | `false` | 是否為文字按鈕 |
| `isFill` | `boolean` | `false` | 是否為填充樣式 |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `click` | `event: MouseEvent` | 點擊按鈕時觸發 |

#### 類型定義

```typescript
type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger'
type ComponentSize = 'default' | 'small' | 'large'
```

---

### BaseInput

增強的輸入框組件，支援多種類型和驗證功能。

#### Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `modelValue` | `string \| number \| null` | - | 輸入值 |
| `placeholder` | `string` | - | 佔位符 |
| `type` | `string` | `'text'` | 輸入框類型 |
| `class` | `string \| object` | - | 自定義類名 |
| `showPassword` | `boolean` | `false` | 是否顯示密碼切換按鈕 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只讀 |
| `maxlength` | `string \| number` | - | 最大長度 |
| `autocomplete` | `'on' \| 'off'` | - | 自動完成 |
| `showSearch` | `boolean` | `false` | 是否顯示搜尋圖標 |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `update:modelValue` | `value: string \| number \| null` | 輸入值變更時觸發 |
| `update:clearValue` | - | 清除值時觸發 |

---

### BaseDialog

靈活的對話框組件，支援多種配置選項。

#### Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `modelValue` | `boolean` | - | 對話框顯示狀態 |
| `title` | `string` | - | 對話框標題 |
| `subTitle` | `string` | - | 副標題 |
| `isWarning` | `boolean` | `false` | 是否為警告對話框 |
| `isPrimary` | `boolean` | `false` | 是否為主要對話框 |
| `bodyLoading` | `boolean` | `false` | 內容區域加載狀態 |
| `submitLoading` | `boolean` | `false` | 提交按鈕加載狀態 |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `update:modelValue` | `value: boolean` | 對話框顯示狀態變更 |
| `confirm` | - | 確認按鈕點擊時觸發 |
| `cancel` | - | 取消按鈕點擊時觸發 |

#### Slots

| 插槽名 | 參數 | 說明 |
|--------|------|------|
| `default` | - | 對話框內容 |
| `footer` | - | 自定義底部按鈕區域 |

---

### BaseWaringDialog

警告對話框組件，專門用於警告和確認操作。

#### Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `modelValue` | `boolean` | - | 對話框顯示狀態 |
| `title` | `string` | - | 對話框標題 |
| `subTitle` | `string` | - | 副標題 |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `update:modelValue` | `value: boolean` | 對話框顯示狀態變更 |
| `confirm` | - | 確認按鈕點擊時觸發 |
| `cancel` | - | 取消按鈕點擊時觸發 |

---

### SortTable

支援多列排序的高級表格組件。

#### Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `data` | `T[]` | `[]` | 表格數據 |
| `columns` | `TableColumn<T>[]` | `[]` | 表格列配置 |
| `tableTitle` | `string` | - | 表格標題 |
| `showSelection` | `boolean` | `false` | 是否顯示選擇列 |
| `loading` | `boolean` | `false` | 加載狀態 |
| `showSummary` | `boolean` | `false` | 是否顯示合計行 |
| `showOverFlowTooltip` | `boolean` | `false` | 是否顯示溢出提示 |
| `summaryMethod` | `SummaryMethod<T>` | - | 合計行計算方法 |
| `sortTableRowClassName` | `RowClassNameGetter<T>` | - | 行樣式類名函數 |
| `showIndex` | `boolean` | `false` | 是否顯示索引列 |
| `showExpand` | `boolean` | `false` | 是否顯示展開列 |
| `rowKey` | `string \| ((row: T) => string)` | - | 行資料的唯一鍵（樹形資料與懶加載建議必填） |
| `treeProps` | `{ children?: string; hasChildren?: string; checkStrictly?: boolean }` | `{ children: 'children', hasChildren: 'hasChildren' }` | 樹形資料欄位配置 |
| `defaultExpandAll` | `boolean` | `false` | 是否預設展開所有節點 |
| `expandRowKeys` | `string[]` | `[]` | 指定展開節點 keys |
| `lazy` | `boolean` | `false` | 是否啟用懶加載子節點 |
| `load` | `(row, treeNode, resolve) => void` | - | 懶加載函式 |
| `showCheckBtn` | `boolean` | `false` | 是否顯示查看按鈕 |
| `showEditBtn` | `boolean` | `false` | 是否顯示編輯按鈕 |
| `preserveExpanded` | `boolean` | `false` | 資料更新時是否保留已展開狀態 |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `open:transfer` | - | 打開轉移對話框時觸發 |
| `click:downloadExcelFile` | - | 下載 Excel 檔案時觸發 |
| `update:selectRow` | `value: T[]` | 更新選擇行時觸發 |
| `click:cell` | `column: TableColumn<T>, row: T` | 單元格點擊時觸發 |
| `sort-change` | `sortInfo: SortInfo<T>` | 排序變更時觸發 |

#### Slots

| 插槽名 | 參數 | 說明 |
|--------|------|------|
| `firstButton` | - | 第一個按鈕插槽 |
| `expand` | `{ row: T, $index: number }` | 展開行的自訂內容（需搭配 `showExpand`） |

---

### TitleTable

帶標題和操作按鈕的表格組件。

#### Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `title` | `string` | - | 表格標題 |
| `data` | `T[]` | `[]` | 表格數據 |
| `columns` | `TableColumn<T>[]` | `[]` | 表格列配置 |
| `loading` | `boolean` | `false` | 加載狀態 |
| `showSelection` | `boolean` | `false` | 是否顯示選擇列 |
| `showSummary` | `boolean` | `false` | 是否顯示合計行 |
| `showOverFlowTooltip` | `boolean` | `false` | 是否顯示溢出提示 |
| `summaryMethod` | `SummaryMethod<T>` | - | 合計行計算方法 |
| `titleTableRowClassName` | `RowClassNameGetter<T>` | - | 行樣式類名函數 |
| `showIndex` | `boolean` | `false` | 是否顯示索引列 |
| `showExpand` | `boolean` | `false` | 是否顯示展開列 |
| `rowKey` | `string \| ((row: T) => string)` | - | 行資料的唯一鍵（樹形資料與懶加載建議必填） |
| `treeProps` | `{ children?: string; hasChildren?: string; checkStrictly?: boolean }` | `{ children: 'children', hasChildren: 'hasChildren' }` | 樹形資料欄位配置 |
| `defaultExpandAll` | `boolean` | `false` | 是否預設展開所有節點 |
| `expandRowKeys` | `string[]` | `[]` | 指定展開節點 keys |
| `lazy` | `boolean` | `false` | 是否啟用懶加載子節點 |
| `load` | `(row, treeNode, resolve) => void` | - | 懶加載函式 |
| `showCheckBtn` | `boolean` | `false` | 是否顯示查看按鈕 |
| `showEditBtn` | `boolean` | `false` | 是否顯示編輯按鈕 |
| `preserveExpanded` | `boolean` | `false` | 資料更新時是否保留已展開狀態 |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `add` | - | 新增按鈕點擊時觸發 |
| `export` | - | 導出按鈕點擊時觸發 |
| `update:selectRow` | `value: T[]` | 更新選擇行時觸發 |
| `click:cell` | `column: TableColumn<T>, row: T` | 單元格點擊時觸發 |
| `sort-change` | `sortInfo: SortInfo<T>` | 排序變更時觸發 |

#### Slots

| 插槽名 | 參數 | 說明 |
|--------|------|------|
| `tableSearch` | - | 搜尋區域插槽 |
| `editBtn` | - | 編輯按鈕區域插槽 |
| `expand` | `{ row: T, $index: number }` | 展開行的自訂內容（需搭配 `showExpand`） |

---

### SearchBar

功能豐富的搜尋欄組件，支援即時搜尋和搜尋建議。

#### Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `showSearch` | `boolean` | `false` | 是否顯示搜尋功能 |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `keydown:enter` | `data: string` | 按下 Enter 鍵時觸發 |
| `update:clear` | - | 清除時觸發 |
| `update:resetFilter` | - | 重置篩選時觸發 |

---

### TransferDialog

用於表格列配置的穿梭框組件。

#### Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `modelValue` | `boolean` | - | 對話框顯示狀態 |
| `columnsValue` | `TableColumn<T>[]` | `[]` | 表格列配置 |
| `transferTitle` | `string` | - | 對話框標題 |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `update:modelValue` | `value: boolean` | 對話框顯示狀態變更 |
| `update:submit` | `columns: TableColumn<T>[]` | 提交列配置時觸發 |

#### Slots

| 插槽名 | 參數 | 說明 |
|--------|------|------|
| `list-container` | `ListContainerSlotProps` | 自定義列表容器 |

#### 類型定義

```typescript
interface ListContainerSlotProps<T = any> {
  columns: TableColumn<T>[]
  clickItemProp: string
  handleItemEvents: {
    toTop: (index: number) => void
    toBottom: (index: number) => void
    toPre: (index: number) => void
    toNext: (index: number) => void
  }
  handleMousedown: (prop: string) => void
}
```

---

### TransferItem

轉移項目組件，用於 TransferDialog 中。

#### Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `columnsValue` | `TableColumn<T>` | - | 列配置對象 |
| `columnsIndex` | `number` | - | 列索引 |
| `columnsLen` | `number` | - | 列總數 |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `mousedown` | `prop: string` | 滑鼠按下時觸發 |
| `update:toTop` | `index: number` | 移至頂部時觸發 |
| `update:toBottom` | `index: number` | 移至底部時觸發 |
| `update:toPre` | `index: number` | 移至前一位時觸發 |
| `update:toNext` | `index: number` | 移至下一位時觸發 |

---

### MainPanel

主面板組件，提供標題、返回按鈕和可自定義高度的滾動區域。

#### Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `title` | `string` | `''` | 面板標題 |
| `showBack` | `boolean \| string \| object` | `false` | 是否顯示返回按鈕 |
| `depth` | `number` | `1` | 返回深度 |
| `maxHeight` | `string` | `'calc(100vh-120px)'` | 滾動區域最大高度 |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `back` | `payload: { path?: string; [key: string]: unknown }` | 返回按鈕點擊時觸發 |

#### Slots

| 插槽名 | 參數 | 說明 |
|--------|------|------|
| `searchBar` | - | 搜尋欄區域 |
| `main` | - | 主要內容區域 |
| `footer` | - | 底部區域（如分頁器） |

---

### SearchableListPanel

整合式搜尋、篩選、分頁組件。**支援 locale prop 來覆寫 i18n 設定**。

#### Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `title` | `string` | - | 面板標題 |
| `pagination` | `Pager` | - | 分頁配置 |
| `showBack` | `boolean \| string \| object` | `false` | 是否顯示返回按鈕 |
| `showSearch` | `boolean` | `false` | 是否顯示搜尋功能 |
| `pageSizeList` | `number[]` | `[10, 25, 50, 100, 200]` | 頁面大小選項 |
| `showPagination` | `boolean` | - | 是否顯示分頁器 |
| `locale` | `Language` | - | **Element Plus 語言設定，用於覆寫 i18n** |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `search` | `data: string \| null` | 搜尋時觸發 |
| `updatePage` | `page: number` | 頁碼變更時觸發 |
| `updatePageSize` | `limit: number` | 頁面大小變更時觸發 |
| `click:back` | - | 返回按鈕點擊時觸發 |

#### Slots

| 插槽名 | 參數 | 說明 |
|--------|------|------|
| `firstButton` | - | 第一個按鈕插槽 |
| `customButton` | - | 自定義按鈕插槽 |
| `lastButton` | - | 最後一個按鈕插槽 |
| `filterButton` | - | 篩選按鈕插槽 |
| `main` | - | 主要內容區域 |

---

### DetailLayout

詳細頁面佈局組件，支援編輯模式和只讀模式切換。

#### Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `title` | `string` | - | 頁面標題 |
| `editable` | `boolean` | `false` | 是否可編輯 |
| `loading` | `boolean` | `false` | 加載狀態 |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `save` | - | 保存時觸發 |
| `cancel` | - | 取消時觸發 |
| `back` | - | 返回時觸發 |

#### Slots

| 插槽名 | 參數 | 說明 |
|--------|------|------|
| `header` | - | 標題區域 |
| `main` | - | 主要內容區域 |

---

### FilterLayout

篩選頁面佈局組件，支援自定義篩選表單。

#### Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `mainTitle` | `string` | - | 主要標題 |
| `filterTitle` | `string` | - | 篩選標題 |

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `submit` | - | 提交篩選時觸發 |
| `reset` | - | 重置篩選時觸發 |

#### Slots

| 插槽名 | 參數 | 說明 |
|--------|------|------|
| `filter-form` | - | 篩選表單內容 |

---

### FunctionHeader

功能頁面標題組件，提供頁面標題、麵包屑和操作按鈕。

#### Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `title` | `string` | - | 頁面標題 |
| `subTitle` | `string` | - | 頁面副標題 |
| `breadcrumbs` | `BreadcrumbItem[]` | `[]` | 麵包屑配置 |

#### Slots

| 插槽名 | 參數 | 說明 |
|--------|------|------|
| `actions` | - | 操作按鈕區域 |

---

### 通用類型定義

#### TableColumn

```typescript
interface TableColumn<T = Record<string, unknown>> {
  prop?: keyof T | string
  label: string
  width?: number | string
  type?: 'selection' | 'index' | 'expand'
  fixed?: boolean | 'left' | 'right'
  align?: 'center' | 'left' | 'right'
  sortable?: boolean | 'custom'
  formatter?: (row: T) => string
  template?: (row: T) => VNode
  minWidth?: number | string
  headerAlign?: 'center' | 'left' | 'right'
  checkActive?: boolean
}
```

#### SortChangValue

```typescript
interface SortChangValue<T = any> {
  column: TableColumn<T>
  prop: keyof T | string
  order: 'ascending' | 'descending' | null
}
```

#### SortInfo

```typescript
interface SortInfo<T = any> {
  column: TableColumn<T>
  prop: keyof T | string
  order: 'ascending' | 'descending' | null
}
```

#### Pager

```typescript
interface Pager {
  page: number
  limit: number
  totalCount: number
}
```

## 🎨 樣式系統

### 樣式導入方式

本組件庫提供多種靈活的樣式導入方式，您可以根據項目需求選擇：

#### 1. 完整樣式導入（推薦）

適用於大多數項目，一次性導入所有樣式：

```typescript
// main.ts
import 'element-plus/dist/index.css'
import 'rayyy-vue-table-components/styles'
```

或在 CSS/SCSS 文件中：

```scss
// styles.scss
@import 'element-plus/dist/index.css';
@import 'rayyy-vue-table-components/styles';
```

#### 2. 模組化導入

按需導入特定模組的樣式：

```scss
// 只導入表格相關樣式
@import 'rayyy-vue-table-components/styles/table';

// 只導入對話框相關樣式
@import 'rayyy-vue-table-components/styles/dialog';

// 只導入組件樣式
@import 'rayyy-vue-table-components/styles/components';
```

#### 3. Element Plus 主題自定義

如果您需要自定義 Element Plus 主題：

```scss
// styles.scss
@import 'element-plus/dist/index.css';
@import 'rayyy-vue-table-components/styles/element';
```

### 樣式類別

組件庫提供預定義的 CSS 類別，您可以直接在組件中使用：

```vue
<template>
  <!-- 使用預定義的樣式類別 -->
  <div class="filter-btn">篩選按鈕</div>
  <div class="transfer-active-bg">轉移項目</div>
  <div class="table-cell">表格單元格</div>
</template>
```

### 自定義主題

您可以通過 CSS 變量來自定義組件主題：

```scss
:root {
  // 主色調
  --primary-color: #409eff;
  --primary-light: #ecf5ff;
  
  // 文字顏色
  --text-primary: #303133;
  --text-regular: #606266;
  --text-secondary: #909399;
  
  // 邊框顏色
  --border-color: #dcdfe6;
  --border-light: #e4e7ed;
  
  // 背景顏色
  --bg-color: #ffffff;
  --bg-light: #f5f7fa;
}
```

### Tailwind CSS 集成

如果您的項目使用 Tailwind CSS，可以直接使用工具類：

```vue
<template>
  <BaseTable
    :data="tableData"
    :columns="columns"
    class="shadow-lg rounded-lg"
    :base-table-row-class-name="getRowClass"
  />
</template>

<script setup lang="ts">
const getRowClass = ({ row, rowIndex }: any) => {
  return [
    'hover:bg-gray-50',
    'transition-colors',
    rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-25'
  ].join(' ')
}
</script>
```

### 響應式設計

組件內建響應式支援，您也可以使用響應式工具類：

```vue
<template>
  <BaseTable
    :data="tableData"
    :columns="columns"
    class="w-full sm:w-auto lg:w-full"
  />
</template>
```

## 🛠️ 開發指南

### 環境要求

- Node.js 22.0+
- npm 10.0+
- Vue 3.5+
- Element Plus 2.11+
- TypeScript 5.8+

### 本地開發

```bash
# 克隆項目
git clone https://github.com/your-username/vue-table-components.git
cd vue-table-components

# 安裝依賴
npm install

# 開發模式（啟動演示網站）
npm run dev

# 構建組件庫
npm run build-lib

# 構建演示網站
npm run build-demo

# 運行單元測試
npm run test:unit

# 運行 E2E 測試
npm run test:e2e

# 代碼檢查和格式化
npm run lint
npm run format

# TypeScript 類型檢查
npm run type-check
```

### 快速發布

使用內建的發布腳本快速發布新版本：

```bash
# 修復版本 (1.3.10 -> 1.3.11)
npm run release:patch

# 次要版本 (1.3.10 -> 1.4.0)
npm run release:minor

# 主要版本 (1.3.10 -> 2.0.0)
npm run release:major
```

發布腳本會自動執行：
- ✅ 運行所有測試
- ✅ 代碼品質檢查
- ✅ TypeScript 類型檢查
- ✅ 構建組件庫
- ✅ 更新版本號
- ✅ 創建 git tag
- ✅ 推送到遠端
- ✅ 發布到 npm

### 項目結構

```
src/
├── components/          # 組件源碼
│   ├── form/           # 表單組件
│   │   └── BaseInput.vue
│   ├── items/          # 交互組件
│   │   ├── BaseBtn.vue
│   │   ├── BaseDialog.vue
│   │   ├── BaseWaringDialog.vue
│   │   └── SearchBar.vue
│   ├── tables/         # 表格組件
│   │   ├── BaseTable.vue
│   │   ├── SortTable.vue
│   │   └── TitleTable.vue
│   ├── layout/         # 佈局組件
│   │   ├── MainPanel.vue
│   │   ├── DetailLayout.vue
│   │   ├── FilterLayout.vue
│   │   ├── FunctionHeader.vue
│   │   └── SearchableListPanel.vue
│   ├── transfer/       # 轉移組件
│   │   ├── TransferDialog.vue
│   │   └── transferItem.vue
│   └── index.ts        # 組件導出
├── assets/styles/      # 樣式文件
│   ├── tailwind.scss   # 主樣式入口
│   ├── _base.scss       # 基礎樣式
│   ├── _tables.scss     # 表格相關樣式
│   ├── _dialogs.scss    # 對話框相關樣式
│   ├── _components.scss # 組件樣式
│   └── element/        # Element Plus 主題
├── types/              # 類型定義
│   ├── components.d.ts # 組件類型定義
│   └── index.ts        # 類型導出
├── utils/              # 工具函數
│   ├── tableHelper.ts  # 表格工具函數
│   └── routeFormatters.ts # 路由格式化
├── views/              # 演示頁面
│   ├── demo/           # 組件演示
│   └── DemoPage.vue    # 演示首頁
├── router/             # 路由配置
├── const/              # 常量定義
└── index.ts            # 主入口文件
```

### 貢獻指南

歡迎貢獻代碼！請遵循以下步驟：

1. Fork 本項目
2. 創建功能分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add some amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

## 🤝 社區與支持

### 問題反饋

如果您遇到問題或有功能建議，請通過以下方式聯繫我們：

- [GitHub Issues](https://github.com/your-username/vue-table-components/issues)
- [討論區](https://github.com/your-username/vue-table-components/discussions)

### 版本更新

查看 [CHANGELOG.md](./CHANGELOG.md) 了解詳細的版本更新記錄。

#### 最新更新 (v2.0.52)

**🗂️ 表格組件增強**
- ✅ 新增展開行功能：`showExpand` prop + `expand` slot，支援自訂展開內容
- ✅ 新增 `preserveExpanded` prop，資料更新時可保留已展開狀態
- ✅ 新增 `showIndex` prop，支援索引列顯示
- ✅ BaseTable、SortTable、TitleTable 三個表格組件皆支援上述功能
- ✅ 新增 `BaseTableSlots`、`SortTableSlots`、`TitleTableSlots` 類型定義

#### v2.0.22

**🌐 國際化 (i18n) 支持**
- ✅ 新增完整的國際化支持，支援繁體中文 (zh-TW) 和英文 (en-US)
- ✅ 所有組件文字已替換為 i18n 翻譯鍵值
- ✅ 支援外部專案語系同步，需要合併 JSON 檔案使用
- ✅ 提供 `vue-i18n` 整合，支援 `>=10.0.0` 版本
- ✅ 新增語系切換功能，支援動態語言切換
- ✅ 提供翻譯檔案自動更新腳本，支援 Google Sheets 整合
- ✅ **SearchableListPanel 支援 locale prop 來覆寫 i18n 設定**

**🔧 技術改進**
- ✅ 修復 `vue-i18n` 依賴版本衝突問題
- ✅ 優化模組導出配置，支援 `./locales` 子路徑導入
- ✅ 完善 TypeScript 類型定義，提供完整的 i18n 類型支持
- ✅ 修復構建配置，確保翻譯檔案正確打包
- ✅ 更新 Vite 配置，優化 i18n 資源處理

**📦 新增功能**
- ✅ 新增 `useI18n` 和 `setLocale` 工具函數
- ✅ 新增 `messages` 和 `LocaleType` 類型導出
- ✅ 新增 i18n 測試演示頁面
- ✅ 新增語系切換按鈕和演示功能

### 組件統計

本組件庫目前包含 **15 個組件**，涵蓋以下類別：

| 類別 | 組件數量 | 主要組件 |
|------|----------|----------|
| 🗂️ 表格組件 | 3 | BaseTable, SortTable, TitleTable |
| 🎛️ 表單組件 | 1 | BaseInput |
| 🎨 交互組件 | 3 | BaseBtn, BaseDialog, BaseWaringDialog, SearchBar |
| 🏗️ 佈局組件 | 5 | MainPanel, DetailLayout, FilterLayout, FunctionHeader, SearchableListPanel |
| 🔄 轉移組件 | 2 | TransferDialog, TransferItem |

### 相關鏈接

- [Vue 3 官方文檔](https://vuejs.org/)
- [Element Plus 官方文檔](https://element-plus.org/)
- [TypeScript 官方文檔](https://www.typescriptlang.org/)
- [Tailwind CSS 官方文檔](https://tailwindcss.com/)
- [Vite 官方文檔](https://vitejs.dev/)
- [Vitest 測試框架](https://vitest.dev/)

## 📄 許可證

本項目基於 [MIT License](./LICENSE) 開源協議。

---

<p align="center">
  Made with ❤️ by the Vue Table Components Team
</p>
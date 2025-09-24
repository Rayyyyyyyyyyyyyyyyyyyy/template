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
- 📱 **響應式設計** - 使用 Tailwind CSS，適配各種設備尺寸
- 🔧 **高度可配置** - 靈活的配置選項和豐富的插槽支持
- 🎨 **樣式系統** - 多種樣式導入方式，支援自定義主題和 Tailwind CSS 集成
- 🛠️ **現代化工具** - Sass 模組化 + TypeScript 樣式工具 + 自動導入
- 💡 **豐富組件** - 17+ 個組件，涵蓋表格、表單、佈局、對話框、穿梭框等
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

> **注意**: 本組件庫需要 Vue 3.0+ 和 Element Plus 作為對等依賴。

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

#### BaseMultipleInput - 多標籤輸入

支援多標籤輸入的組件，適用於標籤管理和多值輸入場景。

<details>
<summary>基本用法</summary>

```vue
<template>
  <BaseMultipleInput
    v-model="tags"
    placeholder="輸入標籤後按 Enter 確認"
    :max-tags="10"
    :validate="validateTag"
    @change="handleTagsChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseMultipleInput } from 'rayyy-vue-table-components'

const tags = ref<string[]>(['Vue', 'TypeScript'])

const validateTag = (tag: string) => {
  if (tag.length < 2) return '標籤長度至少 2 個字符'
  if (tag.length > 20) return '標籤長度不能超過 20 個字符'
  return true
}

const handleTagsChange = (newTags: string[]) => {
  console.log('標籤變更:', newTags)
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

<details>
<summary>自定義高度</summary>

```vue
<template>
  <!-- 使用預設高度 -->
  <MainPanel title="預設高度">
    <template #main>
      <div>內容區域</div>
    </template>
  </MainPanel>
  
  <!-- 自定義高度 -->
  <MainPanel 
    title="自定義高度" 
    max-height="500px"
  >
    <template #main>
      <div>固定高度 500px 的內容區域</div>
    </template>
  </MainPanel>
  
  <!-- 響應式高度 -->
  <MainPanel 
    title="響應式高度" 
    max-height="calc(100vh-300px)"
  >
    <template #main>
      <div>根據視窗高度動態調整的內容區域</div>
    </template>
  </MainPanel>
</template>

<script setup lang="ts">
import { MainPanel } from 'rayyy-vue-table-components'
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
        <BaseSelector
          v-model="filterForm.status"
          label="狀態"
          :options="statusOptions"
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
import { FilterLayout, BaseInput, BaseSelector } from 'rayyy-vue-table-components'

const filterForm = ref({
  keyword: '',
  status: '',
  dateRange: []
})

const statusOptions = [
  { label: '全部', value: '' },
  { label: '啟用', value: 'active' },
  { label: '禁用', value: 'inactive' }
]

const handleFilterSubmit = () => {
  console.log('篩選條件:', filterForm.value)
}

const handleFilterReset = () => {
  filterForm.value = {
    keyword: '',
    status: '',
    dateRange: []
  }
}
</script>
```
</details>

#### SearchableListPanel - 整合式搜尋面板

整合搜尋、篩選、分頁功能的綜合面板組件。

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
      <BaseBtn type="default" @click="handleExport">
        導出數據
      </BaseBtn>
    </template>
    
    <template #filter-content>
      <div class="space-y-4">
        <BaseInput
          v-model="filterForm.keyword"
          label="關鍵字"
          placeholder="搜尋姓名或郵箱"
        />
        <BaseSelector
          v-model="filterForm.status"
          label="狀態"
          :options="statusOptions"
        />
      </div>
    </template>
  </SearchableListPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SearchableListPanel, BaseBtn, BaseInput, BaseSelector } from 'rayyy-vue-table-components'

const loading = ref(false)
const tableData = ref([
  { id: 1, name: '張三', email: 'zhangsan@example.com', status: 'active' },
  { id: 2, name: '李四', email: 'lisi@example.com', status: 'inactive' }
])

const columns = [
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

const filterForm = ref({
  keyword: '',
  status: ''
})

const statusOptions = [
  { label: '全部', value: '' },
  { label: '啟用', value: 'active' },
  { label: '禁用', value: 'inactive' }
]

const handleSearch = (keyword: string) => {
  console.log('搜尋:', keyword)
}

const handleFilter = (filters: any) => {
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
| `showCheckBtn` | `boolean` | `false` | 是否顯示查看按鈕 |
| `showEditBtn` | `boolean` | `false` | 是否顯示編輯按鈕 |

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
| `empty` | - | 空數據時的內容 |
| `append` | - | 插入至表格最後一行之後的內容 |

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

### BaseDialog

靈活的對話框組件，支援多種配置選項。

#### Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `modelValue` | `boolean` | - | 對話框顯示狀態 |
| `title` | `string` | - | 對話框標題 |
| `subTitle` | `string` | - | 副標題 |
| `customWidth` | `string` | - | 自定義寬度 |
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
│   │   ├── BaseInput.vue
│   │   └── BaseMultipleInput.vue
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

### 組件統計

本組件庫目前包含 **17+ 個組件**，涵蓋以下類別：

| 類別 | 組件數量 | 主要組件 |
|------|----------|----------|
| 🗂️ 表格組件 | 3 | BaseTable, SortTable, TitleTable |
| 🎛️ 表單組件 | 2 | BaseInput, BaseMultipleInput |
| 🎨 交互組件 | 4 | BaseBtn, BaseDialog, BaseWaringDialog, SearchBar |
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
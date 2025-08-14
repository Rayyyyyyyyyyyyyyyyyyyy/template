# Vue Table Components

基於 Vue 3 + Element Plus 的表格組件庫

## 特性

- 🚀 基於 Vue 3 + TypeScript
- 📦 基於 Element Plus 
- 🎯 完整的 TypeScript 類型支持
- 📱 響應式設計
- 🔧 高度可配置

## 安裝

```bash
npm install rayyy-vue-table-components
# 或
yarn add rayyy-vue-table-components
# 或
pnpm add rayyy-vue-table-components
```

## 使用方法

### 全局註冊

```typescript
import { createApp } from 'vue'
import VueTableComponents from 'rayyy-vue-table-components'
import 'rayyy-vue-table-components/dist/rayyy-vue-table-components.css'

const app = createApp(App)
app.use(VueTableComponents)
```

### 按需引入

```vue
<template>
  <BaseTable
    :data="tableData"
    :columns="columns"
    :loading="loading"
    @column-sort-change="handleSortChange"
  />
  
  <BaseBtn type="primary" @click="showDialog = true">
    打開對話框
  </BaseBtn>
  
  <BaseDialog v-model="showDialog" title="確認操作">
    <p>您確定要執行此操作嗎？</p>
  </BaseDialog>
</template>

<script setup lang="ts">
import { BaseTable, BaseBtn, BaseDialog } from 'rayyy-vue-table-components'
import type { TableColumn, SortChangValue } from 'rayyy-vue-table-components'
import 'rayyy-vue-table-components/dist/rayyy-vue-table-components.css'

interface User {
  id: number
  name: string
  email: string
  age: number
}

const tableData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 }
]

const columns: TableColumn<User>[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', sortable: true },
  { prop: 'email', label: '郵箱' },
  { prop: 'age', label: '年齡', sortable: true }
]

const loading = ref(false)

const handleSortChange = (sortInfo: SortChangValue<User>) => {
  console.log('排序變更:', sortInfo)
}
</script>
```

## API

### BaseTable Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| data | `T[]` | `[]` | 表格數據 |
| columns | `TableColumn<T>[]` | `[]` | 表格列配置 |
| loading | `boolean` | `false` | 加載狀態 |
| showSelection | `boolean` | `false` | 是否顯示選擇列 |
| showSummary | `boolean` | `false` | 是否顯示合計行 |
| showOverFlowTooltip | `boolean` | `false` | 是否顯示溢出提示 |
| summaryMethod | `Function` | - | 合計行計算方法 |
| baseTableRowClassName | `Function` | - | 行樣式類名函數 |

### BaseTable Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| selection-change | `selection: T[]` | 選擇項變更 |
| current-change | `currentRow: T` | 當前行變更 |
| cell-click | `column: TableColumn<T>, row: T` | 單元格點擊 |
| column-sort-change | `value: SortChangValue<T>` | 列排序變更 |

### BaseTable Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| data | `T[]` | `[]` | 表格數據 |
| columns | `TableColumn<T>[]` | `[]` | 表格列配置 |
| loading | `boolean` | `false` | 加載狀態 |
| showSelection | `boolean` | `false` | 是否顯示選擇列 |
| showSummary | `boolean` | `false` | 是否顯示合計行 |
| showOverFlowTooltip | `boolean` | `false` | 是否顯示溢出提示 |
| summaryMethod | `Function` | - | 合計行計算方法 |
| baseTableRowClassName | `Function` | - | 行樣式類名函數 |

### BaseBtn Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| text | `string` | - | 按鈕文字 |
| type | `'default' \| 'primary' \| 'success' \| 'warning' \| 'info' \| 'danger'` | `'default'` | 按鈕類型 |
| size | `'default' \| 'small' \| 'large'` | `'default'` | 按鈕尺寸 |
| plain | `boolean` | `false` | 是否為樸素按鈕 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否顯示加載狀態 |
| icon | `object` | - | 圖標 |
| link | `boolean` | `false` | 是否為文字按鈕 |
| isFill | `boolean` | `false` | 是否為填充樣式 |

### BaseDialog Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| modelValue | `boolean` | - | 對話框顯示狀態 |
| title | `string` | - | 對話框標題 |
| subTitle | `string` | - | 副標題 |
| customWidth | `string` | - | 自定義寬度 |
| isWaring | `boolean` | `false` | 是否為警告對話框 |
| isPrimary | `boolean` | `false` | 是否為主要對話框 |
| bodyLoading | `boolean` | `false` | 內容區域加載狀態 |
| submitLoading | `boolean` | `false` | 提交按鈕加載狀態 |

### TableColumn 接口

```typescript
interface TableColumn<T = Record<string, unknown>> {
  prop?: string
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

## 開發

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 構建庫
npm run build

# 運行測試
npm run test:unit

# 代碼檢查
npm run lint
```

## 許可證

MIT License
# Vue Table Components

基於 Vue 3 + Element Plus 的表格組件庫

## 特性

- 🚀 基於 Vue 3 + TypeScript
- 📦 基於 Element Plus 
- 🎯 完整的 TypeScript 類型支持
- 📱 響應式設計
- 🔧 高度可配置
- 🎨 靈活的樣式系統 - 支援多種導入方式
- 🛠️ 現代化的 Sass 模組系統
- 💡 TypeScript 樣式工具函數

## 安裝

```bash
npm install rayyy-vue-table-components
# 或
yarn add rayyy-vue-table-components
# 或
pnpm add rayyy-vue-table-components
```

## 樣式導入

本組件庫提供多種靈活的樣式導入方式，您可以根據項目需求選擇：

### 方式 1：完整樣式導入（推薦）

```typescript
// main.ts
import 'element-plus/dist/index.css'
import 'rayyy-vue-table-components/styles'  // 導入所有組件樣式
```

或在 CSS/SCSS 文件中：

```scss
// styles.scss
@import 'element-plus/dist/index.css';
@import 'rayyy-vue-table-components/styles';
```

### 方式 2：Element Plus 主題自定義

```scss
// styles.scss
@import 'element-plus/dist/index.css';
@import 'rayyy-vue-table-components/styles/element';  // 只導入 Element 主題
```

### 方式 3：TypeScript 樣式工具（推薦用於動態樣式）

```typescript
// 導入樣式工具函數
import { tableStyles, createTableCellClass } from 'rayyy-vue-table-components/utils/styles'

// 在組件中使用
const cellClass = createTableCellClass({ 
  isDismissed: true, 
  isHeader: false 
})
```

## 使用方法

### 全局註冊

```typescript
import { createApp } from 'vue'
import VueTableComponents from 'rayyy-vue-table-components'

// 導入樣式（選擇上述任一方式）
import 'rayyy-vue-table-components/styles'

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
  
  <!-- TransferDialog 示例 -->
  <TransferDialog
    v-model="showTransferDialog"
    :columns-value="tableColumns"
    transfer-title="配置表格列"
    @update:submit="handleColumnSubmit"
  >
    <template #list-container="{ columns, clickItemProp, handleItemEvents, handleMousedown }">
      <draggable :list="columns" item-key="prop" delay="200">
        <template #item="{ element, index }">
          <transfer-item
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
</template>

<script setup lang="ts">
// 方式一：從主模塊導入
import { BaseTable, BaseBtn, BaseDialog, TransferDialog, TransferItem } from 'rayyy-vue-table-components'
import type { TableColumn, SortChangValue } from 'rayyy-vue-table-components'

// 方式二：單獨導入組件
import { BaseTable } from 'rayyy-vue-table-components/components'
import type { TableColumn } from 'rayyy-vue-table-components/types'

// 方式三：單獨導入類型
import type { SortChangValue } from 'rayyy-vue-table-components/types'

// 方式四：導入樣式工具函數
import { tableStyles, createTableCellClass } from 'rayyy-vue-table-components/utils/styles'

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

const showTransferDialog = ref(false)
const tableColumns = ref(columns)

const handleColumnSubmit = (newColumns: TableColumn<User>[]) => {
  tableColumns.value = newColumns
  showTransferDialog.value = false
}
</script>
```

## TypeScript 類型支持

本庫提供完整的 TypeScript 類型定義，包括：

### 組件類型

```typescript
import type {
  // BaseTable 組件類型
  BaseTableProps,
  BaseTableEmits,
  BaseTableInstance,
  
  // BaseBtn 組件類型
  BaseBtnProps,
  BaseBtnEmits,
  BaseBtnInstance,
  
  // BaseDialog 組件類型
  BaseDialogProps,
  BaseDialogEmits,
  BaseDialogInstance,
  
  // 插件類型
  PluginOptions,
  VueTableComponentsPlugin
} from 'rayyy-vue-table-components/types/components'
```

### 數據類型

```typescript
import type {
  TableColumn,
  SortChangValue,
  TableListReq,
  Pager,
  MenuItemType,
  QRCodeResult
} from 'rayyy-vue-table-components/types'
```

### 樣式工具類型

```typescript
import type {
  TableStylesType,
  DataTableConfigType
} from 'rayyy-vue-table-components/utils/styles'

// 樣式工具函數
import {
  tableStyles,        // 預定義表格樣式對象
  componentStyles,    // 預定義組件樣式對象
  allComponentStyles, // 完整的樣式對象
  dataTableConfig,    // 表格配置對象
  createTableCellClass, // 動態生成表格單元格樣式
  createTextClass     // 動態生成文字樣式
} from 'rayyy-vue-table-components/utils/styles'
```

### 使用示例

```typescript
// 定義數據類型
interface User extends Record<string, unknown> {
  id: number
  name: string
  email: string
  age: number
  status: 'active' | 'inactive'
}

// 定義表格列配置
const userColumns: TableColumn<User>[] = [
  {
    prop: 'id',
    label: 'ID',
    width: 80,
    align: 'center'
  },
  {
    prop: 'name',
    label: '姓名',
    width: 120
  },
  {
    prop: 'email',
    label: '郵箱',
    width: 200
  },
  {
    prop: 'age',
    label: '年齡',
    width: 80,
    align: 'center',
    sortable: true
  },
  {
    prop: 'status',
    label: '狀態',
    width: 100,
    align: 'center',
    formatter: (row: User) => row.status === 'active' ? '啟用' : '停用'
  }
]

// 表格數據
const userData: User[] = [
  { id: 1, name: '張三', email: 'zhangsan@example.com', age: 25, status: 'active' },
  { id: 2, name: '李四', email: 'lisi@example.com', age: 30, status: 'inactive' }
]

// BaseTable Props 類型示例
const tableProps: BaseTableProps<User> = {
  loading: false,
  data: userData,
  columns: userColumns,
  showSelection: true,
  showSummary: true,
  showOverFlowTooltip: true,
  summaryMethod: ({ columns, data }) => {
    return ['總計', '', '', data.reduce((sum, user) => sum + user.age, 0).toString(), '']
  },
  baseTableRowClassName: ({ row, rowIndex }) => {
    return row.status === 'active' ? 'active-row' : 'inactive-row'
  }
}

// 樣式工具使用示例
const dynamicCellClass = createTableCellClass({
  isDismissed: user.status === 'inactive',
  isHeader: false
})

const textClass = createTextClass('blue') // 'blue' | 'red' | 'normal'

// 在模板中使用預定義樣式
const cellClasses = [
  tableStyles.cell,           // 基礎單元格樣式
  tableStyles.content,        // 內容樣式
  user.status === 'inactive' ? tableStyles.dismissed : ''
].filter(Boolean).join(' ')
```

## 樣式工具 API

### 預定義樣式

```typescript
// 直接使用預定義樣式
import { tableStyles, componentStyles } from 'rayyy-vue-table-components/utils/styles'

// 表格樣式
tableStyles.cell        // 表格單元格樣式: 'p-0 h-10'
tableStyles.header      // 表格標題樣式: 'bg-primary-15 font-bold text-text text-sm leading-4'
tableStyles.content     // 內容樣式: 'truncate'
tableStyles.dismissed   // 被駁回行樣式: 'bg-blue-20'
tableStyles.footer      // 表格底部樣式: 'font-bold'
tableStyles.blueText    // 藍色文字: 'text-blue-10'
tableStyles.redText     // 紅色文字: 'text-redText'

// 組件樣式
componentStyles.sortTableContainer     // SortTable 容器: 'w-full mb-4'
componentStyles.sortTableFunctionBar   // SortTable 功能欄
componentStyles.filterBtn              // FilterBtn 按鈕樣式
componentStyles.transferActiveBg       // Transfer 啟用背景
componentStyles.baseDialogTitle        // Dialog 標題樣式
componentStyles.cursorGrab            // 抓取游標
```

### 動態樣式函數

```typescript
// 創建動態表格單元格樣式
createTableCellClass(options?: {
  isDismissed?: boolean
  isHeader?: boolean
}) => string

// 創建文字顏色樣式
createTextClass(type: 'blue' | 'red' | 'normal' = 'normal') => string

// 使用示例
const cellClass = createTableCellClass({ 
  isDismissed: true,  // 添加被駁回樣式
  isHeader: false     // 不是標題行
})
// 結果: 'p-0 h-10 bg-blue-20'

const textClass = createTextClass('blue')
// 結果: 'text-blue-10'
```

### 配置對象

```typescript
// 表格配置對象，適用於 Element Plus 表格組件
import { dataTableConfig } from 'rayyy-vue-table-components/utils/styles'

// 在 Element Plus 表格中使用
<el-table 
  :cell-class-name="dataTableConfig.cellClass"
  :header-cell-class-name="dataTableConfig.headerClass"
>
</el-table>
```

## 組件 API

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

### TransferDialog Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| modelValue | `boolean` | - | 對話框顯示狀態 |
| columnsValue | `TableColumn<T>[]` | `[]` | 表格列配置 |
| transferTitle | `string` | - | 對話框標題 |

### TransferDialog Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| update:modelValue | `value: boolean` | 對話框顯示狀態變更 |
| update:submit | `columns: TableColumn<T>[]` | 提交列配置 |

### TransferDialog Slots

| 插槽名 | 參數 | 說明 |
|--------|------|------|
| list-container | `{ columns, clickItemProp, handleItemEvents, handleMousedown }` | 自定義列表容器，支持拖拽功能 |

### TransferItem Props

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| columnsValue | `TableColumn<T>` | - | 列配置對象 |
| columnsIndex | `number` | - | 列索引 |
| columnsLen | `number` | - | 總列數 |
| dialogModalVisible | `boolean` | - | 對話框顯示狀態 |

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

## TransferDialog 使用指南

TransferDialog 是一個靈活的表格列配置組件，支持自定義列表容器和拖拽功能。

### 基本使用

```vue
<template>
  <TransferDialog
    v-model="showDialog"
    :columns-value="columns"
    transfer-title="配置表格列"
    @update:submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { TransferDialog } from 'rayyy-vue-table-components'

const showDialog = ref(false)
const columns = ref<TableColumn<User>[]>([
  { prop: 'id', label: 'ID', checkActive: true },
  { prop: 'name', label: '姓名', checkActive: true },
  { prop: 'email', label: '郵箱', checkActive: false }
])

const handleSubmit = (newColumns: TableColumn<User>[]) => {
  columns.value = newColumns
  showDialog.value = false
}
</script>
```

### 自定義拖拽功能

```vue
<template>
  <TransferDialog
    v-model="showDialog"
    :columns-value="columns"
    transfer-title="配置表格列"
    @update:submit="handleSubmit"
  >
    <template #list-container="{ columns, clickItemProp, handleItemEvents, handleMousedown }">
      <!-- 使用 vuedraggable 實現拖拽 -->
      <draggable :list="columns" item-key="prop" delay="200">
        <template #item="{ element, index }">
          <transfer-item
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
</template>

<script setup lang="ts">
import { TransferDialog, TransferItem } from 'rayyy-vue-table-components'
import draggable from 'vuedraggable'
</script>
```

### 靜態列表（無拖拽）

```vue
<template>
  <TransferDialog
    v-model="showDialog"
    :columns-value="columns"
    transfer-title="配置表格列"
    @update:submit="handleSubmit"
  >
    <template #list-container="{ columns, clickItemProp, handleItemEvents, handleMousedown }">
      <!-- 使用靜態列表 -->
      <div class="transfer-list">
        <template v-for="(element, index) in columns" :key="element.prop">
          <transfer-item
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
      </div>
    </template>
  </TransferDialog>
</template>
```

### 功能特色

- ✅ **靈活的列表容器**：通過 slot 自定義列表渲染方式
- ✅ **可選的拖拽功能**：支持或不支持拖拽排序
- ✅ **內建排序操作**：上移、下移、置頂、置底
- ✅ **搜尋過濾**：按列名快速定位
- ✅ **批量選擇**：全選/取消全選功能
- ✅ **狀態保持**：記住列的顯示/隱藏狀態

## 開發

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 構建庫（包含樣式）
npm run build-lib

# 運行測試
npm run test:unit

# 代碼檢查
npm run lint
```

### 樣式開發指南

本組件庫採用現代化的樣式架構：

1. **Sass 模組化**：使用 `@use` 語法替代 `@import`
2. **Tailwind CSS 集成**：支援 Tailwind 工具類和自定義樣式
3. **TypeScript 樣式工具**：提供類型安全的樣式函數
4. **多種導出方式**：支援不同項目需求

#### 樣式文件結構

```
src/assets/styles/
├── tailwind.scss          # 主樣式入口
├── _table.scss           # 表格樣式
├── _dialog.scss          # 對話框樣式
├── _components.scss      # 組件樣式（從 tailwind-preset.js 轉移）
└── element/
    └── index.scss        # Element Plus 主題自定義

src/utils/
└── tableStyles.ts        # TypeScript 樣式工具
```

#### 添加新樣式

1. **SCSS 樣式**：在對應的 `_*.scss` 文件中添加
2. **TypeScript 工具**：在 `tableStyles.ts` 中添加新的工具函數
3. **導出配置**：在 `package.json` 的 `exports` 中添加新的導出路徑

## 許可證

MIT License
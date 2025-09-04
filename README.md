# Vue Table Components

<p align="center">
  <img src="https://img.shields.io/npm/v/rayyy-vue-table-components.svg" alt="npm version">
  <img src="https://img.shields.io/npm/dm/rayyy-vue-table-components.svg" alt="npm downloads">
  <img src="https://img.shields.io/github/license/rayshao/vue-table-components.svg" alt="license">
  <img src="https://img.shields.io/badge/vue-3.x-brightgreen.svg" alt="vue">
</p>

基於 Vue 3 + Element Plus 的現代化表格組件庫，提供豐富的表格功能和靈活的自定義選項。

## ✨ 特性

- 🚀 **現代化技術棧** - 基於 Vue 3 + TypeScript + Element Plus
- 📦 **開箱即用** - 提供完整的表格解決方案
- 🎯 **類型安全** - 完整的 TypeScript 類型定義
- 📱 **響應式設計** - 適配各種設備尺寸
- 🔧 **高度可配置** - 靈活的配置選項
- 🎨 **樣式系統** - 多種樣式導入方式，支援自定義主題
- 🛠️ **現代化工具** - Sass 模組化 + TypeScript 樣式工具
- 💡 **豐富組件** - 表格、按鈕、對話框、穿梭框等

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

app.use(ElementPlus)
app.use(VueTableComponents)
app.mount('#app')
```

### 按需引入

如果您只想使用部分組件，可以按需引入：

```typescript
import { createApp } from 'vue'
import { BaseTable, BaseBtn } from 'rayyy-vue-table-components'
import 'rayyy-vue-table-components/styles'

import App from './App.vue'

const app = createApp(App)

app.component('BaseTable', BaseTable)
app.component('BaseBtn', BaseBtn)
app.mount('#app')
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

```typescript
import { tableStyles, createTableCellClass } from 'rayyy-vue-table-components/utils/styles'

// 動態生成樣式類
const cellClass = createTableCellClass({ 
  isDismissed: true, 
  isHeader: false 
})
```

## 📚 組件示例

### BaseTable - 數據表格

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

### BaseBtn - 按鈕組件

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

### BaseDialog - 對話框組件

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

### TransferDialog - 穿梭框對話框

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

#### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `selection-change` | `selection: T[]` | 選擇項變更時觸發 |
| `current-change` | `currentRow: T \| null` | 當前行變更時觸發 |
| `cell-click` | `column: TableColumn<T>, row: T` | 單元格點擊時觸發 |
| `column-sort-change` | `value: SortChangValue<T>` | 列排序變更時觸發 |

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

### TypeScript 樣式工具

提供類型安全的樣式工具函數：

#### 預定義樣式

```typescript
import { STYLE_CLASSES } from 'rayyy-vue-table-components/utils/styles'

// 表格樣式常量
const styles = {
  cell: STYLE_CLASSES.tableCell,           // 'table-cell'
  header: STYLE_CLASSES.tableHeader,       // 'table-header'
  content: STYLE_CLASSES.tableCellContent, // 'table-cell-content'
  dismissed: STYLE_CLASSES.dismissedRow,   // 'dismissed-row'
  footer: STYLE_CLASSES.tableFooter,       // 'table-footer'
  blueText: STYLE_CLASSES.blueText,        // 'blue-text'
  redText: STYLE_CLASSES.redText,          // 'red-text'
}

// 組件樣式常量
const componentClasses = {
  sortTableContainer: STYLE_CLASSES.sortTableContainer,
  filterBtn: STYLE_CLASSES.filterBtn,
  transferActiveBg: STYLE_CLASSES.transferActiveBg,
  baseDialogTitle: STYLE_CLASSES.baseDialogTitle,
  cursorGrab: STYLE_CLASSES.cursorGrab,
}
```

#### 動態樣式生成器

```typescript
import { createTableCellClass, createTextClass } from 'rayyy-vue-table-components/utils/styles'

// 動態生成表格單元格樣式
const cellClass = createTableCellClass({
  isDismissed: true,  // 是否被駁回
  isHeader: false     // 是否為標題行
})
// 輸出: 'p-0 h-10 bg-blue-20'

// 動態生成文字顏色樣式
const textClass = createTextClass('blue') // 'blue' | 'red' | 'normal'
// 輸出: 'text-blue-10'
```

#### Element Plus 表格配置

```typescript
import { STYLE_CLASSES } from 'rayyy-vue-table-components/utils/styles'

// 在 Element Plus 原生表格中使用
<el-table 
  :cell-class-name="STYLE_CLASSES.tableCell"
  :header-cell-class-name="STYLE_CLASSES.tableHeader"
  :data="tableData"
>
  <el-table-column prop="name" label="姓名" />
</el-table>
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

- Node.js 16.0+
- Vue 3.0+
- Element Plus 2.0+

### 本地開發

```bash
# 克隆項目
git clone https://github.com/your-username/vue-table-components.git
cd vue-table-components

# 安裝依賴
npm install

# 開發模式
npm run dev

# 構建庫
npm run build-lib

# 運行測試
npm run test:unit

# 代碼檢查
npm run lint
```

### 項目結構

```
src/
├── components/          # 組件源碼
│   ├── BaseTable.vue   # 基礎表格組件
│   ├── BaseBtn.vue     # 按鈕組件
│   ├── BaseDialog.vue  # 對話框組件
│   └── transfer/       # 穿梭框組件
├── assets/styles/      # 樣式文件
│   ├── tailwind.scss   # 主樣式入口
│   ├── _base.scss       # 基礎樣式（表格基礎、文字樣式等）
│   ├── _tables.scss     # 表格相關樣式（Element Plus 表格覆蓋）
│   ├── _dialogs.scss    # 對話框相關樣式
│   ├── _components.scss # 組件樣式（SortTable、FilterBtn等）
│   └── element/        # Element Plus 主題
├── types/              # 類型定義
├── utils/              # 工具函數
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

### 相關鏈接

- [Vue 3 官方文檔](https://vuejs.org/)
- [Element Plus 官方文檔](https://element-plus.org/)
- [TypeScript 官方文檔](https://www.typescriptlang.org/)
- [Tailwind CSS 官方文檔](https://tailwindcss.com/)

## 📄 許可證

本項目基於 [MIT License](./LICENSE) 開源協議。

---

<p align="center">
  Made with ❤️ by the Vue Table Components Team
</p>
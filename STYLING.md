# Rayyy Vue Table Components - 樣式使用指南

本組件庫提供兩種樣式使用方式，以適應不同的專案需求。

## A. 有 Tailwind 的使用者

如果您已經在專案中使用 Tailwind CSS，可以使用我們的 Tailwind preset 來自動注入所需的樣式。

### 1. 安裝組件庫

```bash
npm install rayyy-vue-table-components
```

### 2. 配置 Tailwind

在您的 `tailwind.config.js` 中引入我們的 preset：

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/rayyy-vue-table-components/dist/**/*.js'
  ],
  presets: [
    require('rayyy-vue-table-components/tailwind-preset')
  ],
  // 其他配置...
}
```

### 3. 使用組件

現在您可以直接使用組件，所有樣式都會自動生效：

```vue
<template>
  <sort-table
    :data="tableData"
    :columns="columns"
    @open:transfer="handleTransfer"
  />
</template>

<script setup>
import { SortTable } from 'rayyy-vue-table-components'
</script>
```

### 4. 可用的自定義顏色

Preset 提供了以下自定義顏色：

```css
/* Primary 色系 */
.bg-primary-10    /* #e0e0e0 */
.bg-primary-15    /* #F5F5F5 */
.bg-primary-20    /* #E0E0E0 */
.bg-primary-40    /* #b1c4e4 */
.bg-primary-60    /* #8facd9 */
.bg-primary-80    /* #7198ce */
.bg-primary-dark  /* #4566a8 */

/* 文字顏色 */
.text-primary-10
.text-primary-15
.text-primary-20
.text-primary-40
.text-primary-60
.text-primary-80
.text-primary-dark

/* 邊框顏色 */
.border-primary-10
.border-primary-15
.border-primary-20
.border-primary-40
.border-primary-60
.border-primary-80
.border-primary-dark
```

## B. 沒有 Tailwind 的使用者

如果您沒有使用 Tailwind CSS，可以直接引入編譯好的 CSS 檔案。

### 1. 安裝組件庫

```bash
npm install rayyy-vue-table-components
```

### 2. 引入樣式

在您的主入口檔案中引入樣式：

```javascript
// main.js 或 main.ts
import 'rayyy-vue-table-components/components.css'
```

或者在 Vue 組件中引入：

```vue
<template>
  <div>
    <!-- 您的組件 -->
  </div>
</template>

<script setup>
// 組件邏輯
</script>

<style>
@import 'rayyy-vue-table-components/components.css';
</style>
```

### 3. 使用組件

組件會自動使用語意化的 CSS 類別：

```vue
<template>
  <sort-table
    :data="tableData"
    :columns="columns"
    @open:transfer="handleTransfer"
  />
</template>

<script setup>
import { SortTable } from 'rayyy-vue-table-components'
</script>
```

## 組件樣式類別

### SortTable 組件
- `.sort-table-container` - 主容器
- `.sort-table-function-bar` - 功能欄
- `.sort-table-settings-btn` - 設定按鈕

### FilterBtn 組件
- `.filter-btn` - 篩選按鈕

### TransferDialog 組件
- `.transfer-sort-wrapper` - 排序容器
- `.transfer-active-bg` - 啟用背景
- `.transfer-active-border` - 啟用邊框

### TransferItem 組件
- `.transfer-item-wrapper` - 項目容器
- `.transfer-arrow-wrapper` - 箭頭容器

### BaseDialog 組件
- `.base-dialog` - 對話框容器
- `.base-dialog-title` - 對話框標題

### 通用樣式
- `.cursor-grab` - 抓取游標
- `.cursor-grabbing` - 抓取中游標

## 響應式設計

所有組件都支援響應式設計，在移動設備上會自動調整樣式：

```css
@media (max-width: 768px) {
  .search-input {
    width: 100%;
  }
  
  .sort-table-function-bar {
    padding: 0 0.25rem;
  }
  
  .transfer-arrow-wrapper {
    width: 6rem;
  }
}
```

## 自定義樣式

如果您需要自定義樣式，可以覆蓋我們的 CSS 類別：

```css
/* 自定義 SortTable 功能欄背景色 */
.sort-table-function-bar {
  background-color: #your-custom-color;
}

/* 自定義 FilterBtn 按鈕顏色 */
.filter-btn {
  color: #your-custom-color;
}
```

## 注意事項

1. **Element Plus 依賴**：本組件庫依賴 Element Plus，請確保已正確安裝和配置
2. **Vue 3 要求**：僅支援 Vue 3.x 版本
3. **TypeScript 支援**：提供完整的 TypeScript 類型定義
4. **樣式衝突**：如果遇到樣式衝突，可以使用 CSS 優先級或 `!important` 來解決

## 故障排除

### 樣式沒有生效？

1. 確認已正確引入樣式檔案
2. 檢查 Tailwind 配置是否正確
3. 確認沒有其他 CSS 覆蓋了我們的樣式

### 顏色不正確？

1. 檢查 Tailwind preset 是否正確載入
2. 確認自定義顏色類別是否被正確生成
3. 檢查瀏覽器開發者工具中的樣式應用情況

### 響應式問題？

1. 確認 viewport meta 標籤已設定
2. 檢查 CSS media queries 是否正確
3. 測試不同螢幕尺寸下的顯示效果

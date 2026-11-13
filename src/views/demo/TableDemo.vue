<script setup lang="ts">
import DemoBlock from '../docs/DemoBlock.vue'
import { ROUTES } from '@/router/constants'
import TableSort from '../../../tests/consumer/src/examples/demo/table/TableSort.vue'
import sortSource from '../../../tests/consumer/src/examples/demo/table/TableSort.vue?raw'
import TableTitle from '../../../tests/consumer/src/examples/demo/table/TableTitle.vue'
import titleSource from '../../../tests/consumer/src/examples/demo/table/TableTitle.vue?raw'
import TableTree from '../../../tests/consumer/src/examples/demo/table/TableTree.vue'
import treeSource from '../../../tests/consumer/src/examples/demo/table/TableTree.vue?raw'
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Table 組件示範</h1>
      <p class="text-gray-600 mb-8">
        每個範例下方可複製或查看完整程式碼，內容與畫面上執行的是同一份檔案。一頁測試 SortTable、TitleTable、BaseTable 的展開列、索引列、樹形資料與懶加載，控制項放在各自的範例裡。範例需要宿主已安裝 Element Plus（全域註冊）與 vue-i18n（legacy: false），設定方式見<RouterLink :to="ROUTES.INSTALL_GUIDE" class="text-blue-700 underline">安裝指南</RouterLink>。
      </p>

      <DemoBlock
        title="SortTable 展示"
        description="排序 + 操作欄：支援列排序、選取、檢視/編輯按鈕，並可切換索引列與展開列。視窗小於 768px 時選取、序號、操作欄不固定。"
        :source="sortSource"
      >
        <TableSort />
      </DemoBlock>

      <DemoBlock
        title="TitleTable 展示"
        description="標題 + 搜尋 Slot：帶標題、搜尋區域、新增/刪除操作，並透傳展開列內容。"
        :source="titleSource"
      >
        <TableTitle />
      </DemoBlock>

      <DemoBlock
        title="BaseTable 樹形資料 + 懶加載"
        description="Tree / Lazy Load：以 row-key 與 tree-props 顯示樹形資料，展開部門時按需載入子節點。"
        :source="treeSource"
      >
        <TableTree />
      </DemoBlock>

      <h2 class="text-2xl font-semibold text-gray-900 mb-4">快速參數參考</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-xl border border-gray-200 p-4">
          <h3 class="mb-3 font-semibold text-gray-700">常用開關</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li><code>showIndex</code>：顯示索引列</li>
            <li><code>showExpand</code>：顯示展開列（搭配 <code>#expand</code>）</li>
            <li><code>preserveExpanded</code>：保留展開內容 DOM</li>
            <li><code>showSelection</code>：顯示勾選列</li>
          </ul>
        </div>
        <div class="rounded-xl border border-gray-200 p-4">
          <h3 class="mb-3 font-semibold text-gray-700">樹形/懶加載</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li><code>rowKey</code>：唯一鍵（建議必填）</li>
            <li><code>treeProps</code>：children/hasChildren 欄位映射</li>
            <li><code>lazy</code>：啟用懶加載子節點</li>
            <li><code>load</code>：載入函式 <code>(row, treeNode, resolve)</code></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

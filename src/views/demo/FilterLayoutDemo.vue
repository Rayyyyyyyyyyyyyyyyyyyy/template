<script setup lang="ts">
import DemoBlock from '../docs/DemoBlock.vue'
import { ROUTES } from '@/router/constants'
import FilterProducts from '../../../tests/consumer/src/examples/demo/filter-layout/FilterProducts.vue'
import productsSource from '../../../tests/consumer/src/examples/demo/filter-layout/FilterProducts.vue?raw'
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">FilterLayout 組件示範</h1>
      <p class="text-gray-600 mb-8">
        每個範例下方可複製或查看完整程式碼，內容與畫面上執行的是同一份檔案。FilterLayout 基於 MainPanel 構建，提供完整的篩選頁面佈局：響應式佈局、可自訂主要標題與篩選標題、預設插槽放完全自訂的篩選表單、內建執行與重設按鈕，並提供 submitEmit 與 resetEmit 事件。適用於產品篩選、數據查詢、報表篩選等需要複雜篩選條件的頁面。範例需要宿主已安裝 Element Plus（全域註冊）與 vue-i18n（legacy: false），設定方式見<RouterLink :to="ROUTES.INSTALL_GUIDE" class="text-blue-700 underline">安裝指南</RouterLink>。
      </p>

      <DemoBlock
        title="產品篩選"
        description="使用說明：1. 填寫篩選條件表單；2. 點擊「執行」提交篩選條件；3. 查看篩選結果（本示範顯示模擬數據）；4. 點擊「重設」清空所有篩選條件。"
        :source="productsSource"
      >
        <FilterProducts />
      </DemoBlock>
    </div>
  </div>
</template>

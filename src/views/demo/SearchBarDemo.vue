<script setup lang="ts">
import DemoBlock from '../docs/DemoBlock.vue'
import { ROUTES } from '@/router/constants'
import SearchBasic from '../../../tests/consumer/src/examples/demo/search-bar/SearchBasic.vue'
import basicSource from '../../../tests/consumer/src/examples/demo/search-bar/SearchBasic.vue?raw'
import SearchButtonSlot from '../../../tests/consumer/src/examples/demo/search-bar/SearchButtonSlot.vue'
import buttonSource from '../../../tests/consumer/src/examples/demo/search-bar/SearchButtonSlot.vue?raw'
import SearchFilterSlot from '../../../tests/consumer/src/examples/demo/search-bar/SearchFilterSlot.vue'
import filterSource from '../../../tests/consumer/src/examples/demo/search-bar/SearchFilterSlot.vue?raw'
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">SearchBar 組件示範</h1>
      <p class="text-gray-600 mb-8">
        每個範例下方可複製或查看完整程式碼，內容與畫面上執行的是同一份檔案。SearchBar 支援 Enter 觸發搜尋、清除搜尋內容，並提供 button 與 customerFilter 兩個插槽。範例需要宿主已安裝 Element Plus（全域註冊）與 vue-i18n（legacy: false），設定方式見<RouterLink :to="ROUTES.INSTALL_GUIDE" class="text-blue-700 underline">安裝指南</RouterLink>。
      </p>

      <DemoBlock title="基礎搜尋欄" description="按 Enter 觸發 keydown:enter，清除時觸發 update:clear。" :source="basicSource">
        <SearchBasic />
      </DemoBlock>

      <DemoBlock title="帶自定義按鈕的搜尋欄" description="用 button 插槽放置自訂按鈕。" :source="buttonSource">
        <SearchButtonSlot />
      </DemoBlock>

      <DemoBlock title="帶自定義篩選的搜尋欄" description="用 customerFilter 插槽放置自訂篩選。" :source="filterSource">
        <SearchFilterSlot />
      </DemoBlock>
    </div>
  </div>
</template>

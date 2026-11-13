<script setup lang="ts">
import DemoBlock from '../docs/DemoBlock.vue'
import { ROUTES } from '@/router/constants'
import SearchableListUsers from '../../../tests/consumer/src/examples/demo/searchable-list-panel/SearchableListUsers.vue'
import usersSource from '../../../tests/consumer/src/examples/demo/searchable-list-panel/SearchableListUsers.vue?raw'
</script>

<template>
  <div id="searchable-list-panel-demo" class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">SearchableListPanel 組件示範</h1>
      <p class="text-gray-600 mb-8">
        每個範例下方可複製或查看完整程式碼，內容與畫面上執行的是同一份檔案。以本地 mock 資料展示可執行的搜尋與分頁，不包含 API 或持久化。SearchableListPanel 結合搜尋、篩選、分頁於一體，提供 firstButton、customButton、lastButton、filterButton 插槽與 pageSizeList 設定，視窗小於 640px 時分頁只留上一頁／頁碼／下一頁。範例需要宿主已安裝 Element Plus（全域註冊）與 vue-i18n（legacy: false），設定方式見<RouterLink :to="ROUTES.INSTALL_GUIDE" class="text-blue-700 underline">安裝指南</RouterLink>。
      </p>

      <DemoBlock title="用戶管理列表" description="搜尋後回到第 1 頁，切換每頁筆數也會回到第 1 頁；可切換語系觀察分頁文字變化。" :source="usersSource">
        <SearchableListUsers />
      </DemoBlock>
    </div>
  </div>
</template>

<script setup lang="ts">
import DemoBlock from '../docs/DemoBlock.vue'
import { ROUTES } from '@/router/constants'
import LocaleSwitch from '../../../tests/consumer/src/examples/demo/i18n/LocaleSwitch.vue'
import switchSource from '../../../tests/consumer/src/examples/demo/i18n/LocaleSwitch.vue?raw'
import TableLocale from '../../../tests/consumer/src/examples/demo/i18n/TableLocale.vue'
import tableSource from '../../../tests/consumer/src/examples/demo/i18n/TableLocale.vue?raw'
import DialogLocale from '../../../tests/consumer/src/examples/demo/i18n/DialogLocale.vue'
import dialogSource from '../../../tests/consumer/src/examples/demo/i18n/DialogLocale.vue?raw'
import SearchLocale from '../../../tests/consumer/src/examples/demo/i18n/SearchLocale.vue'
import searchSource from '../../../tests/consumer/src/examples/demo/i18n/SearchLocale.vue?raw'
import PaginationLocale from '../../../tests/consumer/src/examples/demo/i18n/PaginationLocale.vue'
import paginationSource from '../../../tests/consumer/src/examples/demo/i18n/PaginationLocale.vue?raw'
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">多語系</h1>
      <p class="text-gray-600 mb-8">
        每個範例下方可複製或查看完整程式碼，內容與畫面上執行的是同一份檔案。元件庫沿用宿主的 vue-i18n，切換宿主 locale 就會切換元件文字；Element Plus 自己的文字則要用 ElConfigProvider 傳入對應語言包。範例需要宿主已安裝 Element Plus（全域註冊）與 vue-i18n（legacy: false），設定方式見<RouterLink :to="ROUTES.INSTALL_GUIDE" class="text-blue-700 underline">安裝指南</RouterLink>。
      </p>

      <DemoBlock title="語系切換" description="切換宿主 locale，並顯示目前的語系代碼與名稱。" :source="switchSource">
        <LocaleSwitch />
      </DemoBlock>

      <DemoBlock title="BaseTable 語系" description="載入文字、查看與編輯按鈕會跟著 locale 變化，並示範空資料。" :source="tableSource">
        <TableLocale />
      </DemoBlock>

      <DemoBlock title="BaseDialog 語系" description="確定與取消按鈕會跟著 locale 變化。" :source="dialogSource">
        <DialogLocale />
      </DemoBlock>

      <DemoBlock title="SearchBar 語系" description="搜尋框的 placeholder 會跟著 locale 變化。" :source="searchSource">
        <SearchLocale />
      </DemoBlock>

      <DemoBlock title="Element Plus Pagination 語系" description="用 ElConfigProvider 讓分頁文字跟著宿主 locale。" :source="paginationSource">
        <PaginationLocale />
      </DemoBlock>
    </div>
  </div>
</template>

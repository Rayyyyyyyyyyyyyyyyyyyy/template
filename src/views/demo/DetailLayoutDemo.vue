<script setup lang="ts">
import DemoBlock from '../docs/DemoBlock.vue'
import { ROUTES } from '@/router/constants'
import DetailEmployee from '../../../tests/consumer/src/examples/demo/detail-layout/DetailEmployee.vue'
import employeeSource from '../../../tests/consumer/src/examples/demo/detail-layout/DetailEmployee.vue?raw'
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">DetailLayout 組件示範</h1>
      <p class="text-gray-600 mb-8">
        每個範例下方可複製或查看完整程式碼，內容與畫面上執行的是同一份檔案。DetailLayout 基於 MainPanel 構建，提供完整的詳細頁面佈局：響應式佈局、可編輯與只讀模式切換、內建頁面加載狀態、detailHeader 與 main 具名插槽、內建儲存與捨棄按鈕、返回按鈕配置。適用於用戶資料、產品詳情、訂單詳情等需要展示和編輯的頁面。範例需要宿主已安裝 Element Plus（全域註冊）與 vue-i18n（legacy: false），設定方式見<RouterLink :to="ROUTES.INSTALL_GUIDE" class="text-blue-700 underline">安裝指南</RouterLink>。
      </p>

      <DemoBlock
        title="員工詳細資料"
        description="使用說明：1. 點擊「開始編輯」進入編輯模式；2. 在編輯模式下修改表單內容；3. 點擊「儲存」保存變更，或點擊「捨棄」取消編輯；4. 點擊「模擬加載」查看加載狀態效果。"
        :source="employeeSource"
      >
        <DetailEmployee />
      </DemoBlock>
    </div>
  </div>
</template>

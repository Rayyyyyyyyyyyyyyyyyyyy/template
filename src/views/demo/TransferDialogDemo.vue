<script setup lang="ts">
import DemoBlock from '../docs/DemoBlock.vue'
import { ROUTES } from '@/router/constants'
import TransferColumns from '../../../tests/consumer/src/examples/demo/transfer-dialog/TransferColumns.vue'
import columnsSource from '../../../tests/consumer/src/examples/demo/transfer-dialog/TransferColumns.vue?raw'
import TransferCustomList from '../../../tests/consumer/src/examples/demo/transfer-dialog/TransferCustomList.vue'
import customListSource from '../../../tests/consumer/src/examples/demo/transfer-dialog/TransferCustomList.vue?raw'
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">TransferDialog 組件示範</h1>
      <p class="text-gray-600 mb-8">
        每個範例下方可複製或查看完整程式碼，內容與畫面上執行的是同一份檔案。TransferDialog 提供表格列配置：搜尋過濾、批量選擇、上移／下移／置頂／置底與鎖定，確認前不改寫宿主表格欄位，確認後本地 mock 狀態才更新，未做持久化。TransferDialog 已移除 draggable 依賴，拖拽排序要透過 list-container slot 自行接上。範例需要宿主已安裝 Element Plus（全域註冊）與 vue-i18n（legacy: false），設定方式見<RouterLink :to="ROUTES.INSTALL_GUIDE" class="text-blue-700 underline">安裝指南</RouterLink>。
      </p>

      <DemoBlock title="配置表格欄位" description="點擊「配置用戶表格列」打開對話框，用搜尋框找到欄位、勾選控制顯示或隱藏、用方向按鈕調整順序，按「確定」套用，或按「重置列配置」恢復預設。" :source="columnsSource">
        <TransferColumns />
      </DemoBlock>

      <DemoBlock title="拖拽排序（自訂列表容器）" description="list-container slot 讓宿主決定欄位清單的容器；此範例接上 vuedraggable 做拖拽排序，也可以改用其他拖拽庫或不拖拽。拖拽需要宿主自行安裝 vuedraggable（npm i vuedraggable）。" :source="customListSource">
        <TransferCustomList />
      </DemoBlock>
    </div>
  </div>
</template>

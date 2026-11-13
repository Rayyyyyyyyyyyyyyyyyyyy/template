<script setup lang="ts">
import DemoBlock from '../docs/DemoBlock.vue'
import { ROUTES } from '@/router/constants'
import MainPanelExample from '../../../tests/consumer/src/examples/MainPanelExample.vue'
import exampleSource from '../../../tests/consumer/src/examples/MainPanelExample.vue?raw'
import PanelStats from '../../../tests/consumer/src/examples/demo/main-panel/PanelStats.vue'
import statsSource from '../../../tests/consumer/src/examples/demo/main-panel/PanelStats.vue?raw'
import PanelBack from '../../../tests/consumer/src/examples/demo/main-panel/PanelBack.vue'
import backSource from '../../../tests/consumer/src/examples/demo/main-panel/PanelBack.vue?raw'
import PanelCustom from '../../../tests/consumer/src/examples/demo/main-panel/PanelCustom.vue'
import customSource from '../../../tests/consumer/src/examples/demo/main-panel/PanelCustom.vue?raw'
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">MainPanel 組件示範</h1>
      <p class="text-gray-600 mb-8">
        每個範例下方可複製或查看完整程式碼，內容與畫面上執行的是同一份檔案。MainPanel 提供 searchBar、main、footer 三個具名插槽，click:back 帶出 showBack 對應的目標（如 { path: '/users' }），導頁由宿主決定。範例需要宿主已安裝 Element Plus（全域註冊）與 vue-i18n（legacy: false），設定方式見<RouterLink :to="ROUTES.INSTALL_GUIDE" class="text-blue-700 underline">安裝指南</RouterLink>。
      </p>

      <DemoBlock title="基礎主面板" description="同時使用 searchBar、main 與 footer 插槽。" :source="exampleSource">
        <MainPanelExample />
      </DemoBlock>

      <DemoBlock title="帶標題的主面板" description="用 title 設定標題，main 插槽放統計卡片。" :source="statsSource">
        <PanelStats />
      </DemoBlock>

      <DemoBlock title="帶返回按鈕的主面板" description="show-back 顯示返回按鈕，click:back 事件帶出 payload。" :source="backSource">
        <PanelBack />
      </DemoBlock>

      <DemoBlock title="自定義樣式的主面板" description="在 main 插槽自訂背景與內容樣式。" :source="customSource">
        <PanelCustom />
      </DemoBlock>
    </div>
  </div>
</template>

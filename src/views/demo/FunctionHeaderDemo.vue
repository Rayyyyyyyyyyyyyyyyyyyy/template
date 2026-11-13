<script setup lang="ts">
import DemoBlock from '../docs/DemoBlock.vue'
import { ROUTES } from '@/router/constants'
import HeaderBasic from '../../../tests/consumer/src/examples/demo/function-header/HeaderBasic.vue'
import basicSource from '../../../tests/consumer/src/examples/demo/function-header/HeaderBasic.vue?raw'
import HeaderBack from '../../../tests/consumer/src/examples/demo/function-header/HeaderBack.vue'
import backSource from '../../../tests/consumer/src/examples/demo/function-header/HeaderBack.vue?raw'
import HeaderBackPath from '../../../tests/consumer/src/examples/demo/function-header/HeaderBackPath.vue'
import pathSource from '../../../tests/consumer/src/examples/demo/function-header/HeaderBackPath.vue?raw'
import HeaderBackObject from '../../../tests/consumer/src/examples/demo/function-header/HeaderBackObject.vue'
import objectSource from '../../../tests/consumer/src/examples/demo/function-header/HeaderBackObject.vue?raw'
import HeaderExample from '../../../tests/consumer/src/examples/HeaderExample.vue'
import exampleSource from '../../../tests/consumer/src/examples/HeaderExample.vue?raw'
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">FunctionHeader 組件示範</h1>
      <p class="text-gray-600 mb-8">
        每個範例下方可複製或查看完整程式碼，內容與畫面上執行的是同一份檔案。返回操作只發出 payload，實際導頁由宿主決定；FunctionHeader 的 default slot 可放置自訂操作。範例需要宿主已安裝 Element Plus（全域註冊）與 vue-i18n（legacy: false），設定方式見<RouterLink :to="ROUTES.INSTALL_GUIDE" class="text-blue-700 underline">安裝指南</RouterLink>。
      </p>

      <DemoBlock title="基礎功能標題" description="只有標題，沒有返回按鈕。" :source="basicSource">
        <HeaderBasic />
      </DemoBlock>

      <DemoBlock title="帶返回按鈕的標題" description="show-back 為 true 時顯示返回按鈕，back 事件帶出 payload。" :source="backSource">
        <HeaderBack />
      </DemoBlock>

      <DemoBlock title="帶自定義返回路徑的標題" description="show-back 傳入字串路徑。" :source="pathSource">
        <HeaderBackPath />
      </DemoBlock>

      <DemoBlock title="帶自定義返回對象的標題" description="show-back 傳入含 path 與 query 的物件。" :source="objectSource">
        <HeaderBackObject />
      </DemoBlock>

      <DemoBlock title="完整使用範例與操作插槽" description="返回按鈕搭配 default slot 的操作按鈕。" :source="exampleSource">
        <HeaderExample />
      </DemoBlock>
    </div>
  </div>
</template>

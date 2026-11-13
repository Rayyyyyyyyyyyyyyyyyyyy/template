<script setup lang="ts">
import DemoBlock from '../docs/DemoBlock.vue'
import { ROUTES } from '@/router/constants'
import InputBasic from '../../../tests/consumer/src/examples/demo/base-input/InputBasic.vue'
import basicSource from '../../../tests/consumer/src/examples/demo/base-input/InputBasic.vue?raw'
import InputStates from '../../../tests/consumer/src/examples/demo/base-input/InputStates.vue'
import statesSource from '../../../tests/consumer/src/examples/demo/base-input/InputStates.vue?raw'
import InputClearable from '../../../tests/consumer/src/examples/demo/base-input/InputClearable.vue'
import clearableSource from '../../../tests/consumer/src/examples/demo/base-input/InputClearable.vue?raw'
import InputValidation from '../../../tests/consumer/src/examples/demo/base-input/InputValidation.vue'
import validationSource from '../../../tests/consumer/src/examples/demo/base-input/InputValidation.vue?raw'
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">BaseInput 組件示範</h1>
      <p class="text-gray-600 mb-8">
        每個範例下方可複製或查看完整程式碼，內容與畫面上執行的是同一份檔案。範例需要宿主已安裝 Element Plus（全域註冊）與 vue-i18n（legacy: false），設定方式見<RouterLink :to="ROUTES.INSTALL_GUIDE" class="text-blue-700 underline">安裝指南</RouterLink>。
      </p>

      <DemoBlock title="基礎輸入框" description="普通、密碼、郵箱與數字四種 type。" :source="basicSource">
        <InputBasic />
      </DemoBlock>

      <DemoBlock title="輸入框狀態" description="正常、disabled、readonly 與 error。" :source="statesSource">
        <InputStates />
      </DemoBlock>

      <DemoBlock title="可清除輸入框" description="用 clearable 顯示清除鈕，並監聽 input、focus、blur 事件。" :source="clearableSource">
        <InputClearable />
      </DemoBlock>

      <DemoBlock title="帶驗證的輸入框" description="用 rules 設定必填、長度與郵箱格式驗證，失焦時觸發。" :source="validationSource">
        <InputValidation />
      </DemoBlock>
    </div>
  </div>
</template>

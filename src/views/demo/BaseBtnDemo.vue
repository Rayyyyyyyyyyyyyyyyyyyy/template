<script setup lang="ts">
import DemoBlock from '../docs/DemoBlock.vue'
import ButtonTypes from '../../../tests/consumer/src/examples/demo/button/ButtonTypes.vue'
import typesSource from '../../../tests/consumer/src/examples/demo/button/ButtonTypes.vue?raw'
import ButtonSizes from '../../../tests/consumer/src/examples/demo/button/ButtonSizes.vue'
import sizesSource from '../../../tests/consumer/src/examples/demo/button/ButtonSizes.vue?raw'
import ButtonStates from '../../../tests/consumer/src/examples/demo/button/ButtonStates.vue'
import statesSource from '../../../tests/consumer/src/examples/demo/button/ButtonStates.vue?raw'
import DisabledButtons from '../../../tests/consumer/src/examples/demo/button/DisabledButtons.vue'
import disabledSource from '../../../tests/consumer/src/examples/demo/button/DisabledButtons.vue?raw'
import WithIcon from '../../../tests/consumer/src/examples/demo/button/WithIcon.vue'
import withIconSource from '../../../tests/consumer/src/examples/demo/button/WithIcon.vue?raw'
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">BaseBtn 組件示範</h1>
      <p class="text-gray-600 mb-8">每個範例下方可複製或查看完整程式碼，內容與畫面上執行的是同一份檔案。</p>

      <DemoBlock title="按鈕樣式" description="六種 type 對應不同語意的按鈕。" :source="typesSource">
        <ButtonTypes />
      </DemoBlock>

      <DemoBlock title="按鈕尺寸" description="用 size 設定 small、default、large。" :source="sizesSource">
        <ButtonSizes />
      </DemoBlock>

      <DemoBlock title="按鈕狀態" description="正常、loading 與 disabled。" :source="statesSource">
        <ButtonStates />
      </DemoBlock>

      <DemoBlock title="禁用狀態樣式" description="disabled 搭配 type、is-fill、plain、link 的樣式。" :source="disabledSource">
        <DisabledButtons />
      </DemoBlock>

      <DemoBlock title="帶圖標的按鈕" description="用 icon 傳入 Element Plus 圖示。" :source="withIconSource">
        <WithIcon />
      </DemoBlock>
    </div>
  </div>
</template>

<script setup lang="ts">
import DemoBlock from '../docs/DemoBlock.vue'
import DialogBasic from '../../../tests/consumer/src/examples/demo/base-dialog/DialogBasic.vue'
import basicSource from '../../../tests/consumer/src/examples/demo/base-dialog/DialogBasic.vue?raw'
import DialogLarge from '../../../tests/consumer/src/examples/demo/base-dialog/DialogLarge.vue'
import largeSource from '../../../tests/consumer/src/examples/demo/base-dialog/DialogLarge.vue?raw'
import DialogCustom from '../../../tests/consumer/src/examples/demo/base-dialog/DialogCustom.vue'
import customSource from '../../../tests/consumer/src/examples/demo/base-dialog/DialogCustom.vue?raw'
import DialogConfirm from '../../../tests/consumer/src/examples/demo/base-dialog/DialogConfirm.vue'
import confirmSource from '../../../tests/consumer/src/examples/demo/base-dialog/DialogConfirm.vue?raw'
import DialogWarning from '../../../tests/consumer/src/examples/demo/base-dialog/DialogWarning.vue'
import warningSource from '../../../tests/consumer/src/examples/demo/base-dialog/DialogWarning.vue?raw'
import DialogDangerSubmit from '../../../tests/consumer/src/examples/demo/base-dialog/DialogDangerSubmit.vue'
import dangerSubmitSource from '../../../tests/consumer/src/examples/demo/base-dialog/DialogDangerSubmit.vue?raw'
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">BaseDialog 組件示範</h1>
      <p class="text-gray-600 mb-8">每個範例下方可複製或查看完整程式碼，內容與畫面上執行的是同一份檔案。</p>

      <DemoBlock title="基礎對話框" description="用 title、sub-title 與 width 設定標題和寬度。" :source="basicSource">
        <DialogBasic />
      </DemoBlock>

      <DemoBlock title="大尺寸對話框" description="width 設為 800px，適合放較多內容。" :source="largeSource">
        <DialogLarge />
      </DemoBlock>

      <DemoBlock title="自定義對話框" description="用 header 與 footer slot 自訂標題列和頁尾。" :source="customSource">
        <DialogCustom />
      </DemoBlock>

      <DemoBlock title="確認對話框" description="監聽 confirm、cancel 事件處理確認與取消。" :source="confirmSource">
        <DialogConfirm />
      </DemoBlock>

      <DemoBlock title="警告對話框" description="is-warning 讓對話框以警告樣式呈現。" :source="warningSource">
        <DialogWarning />
      </DemoBlock>

      <DemoBlock title="危險確認（dangerSubmit）" description="danger-submit 讓確認鈕改用 danger 色，打開後焦點在取消鈕。" :source="dangerSubmitSource">
        <DialogDangerSubmit />
      </DemoBlock>
    </div>
  </div>
</template>

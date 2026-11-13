<script setup lang="ts">
import DemoBlock from '../docs/DemoBlock.vue'
import { ROUTES } from '@/router/constants'
import WarningRemoveUser from '../../../tests/consumer/src/examples/demo/base-warning-dialog/WarningRemoveUser.vue'
import removeUserSource from '../../../tests/consumer/src/examples/demo/base-warning-dialog/WarningRemoveUser.vue?raw'
import WarningDeleteFile from '../../../tests/consumer/src/examples/demo/base-warning-dialog/WarningDeleteFile.vue'
import deleteFileSource from '../../../tests/consumer/src/examples/demo/base-warning-dialog/WarningDeleteFile.vue?raw'
import WarningResetSettings from '../../../tests/consumer/src/examples/demo/base-warning-dialog/WarningResetSettings.vue'
import resetSettingsSource from '../../../tests/consumer/src/examples/demo/base-warning-dialog/WarningResetSettings.vue?raw'
import WarningExitSystem from '../../../tests/consumer/src/examples/demo/base-warning-dialog/WarningExitSystem.vue'
import exitSystemSource from '../../../tests/consumer/src/examples/demo/base-warning-dialog/WarningExitSystem.vue?raw'
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">BaseWarningDialog 組件示範</h1>
      <p class="text-gray-600 mb-8">
        每個範例下方可複製或查看完整程式碼，內容與畫面上執行的是同一份檔案。範例需要宿主已安裝 Element Plus（全域註冊）與 vue-i18n（legacy: false），設定方式見<RouterLink :to="ROUTES.INSTALL_GUIDE" class="text-blue-700 underline">安裝指南</RouterLink>。
      </p>

      <DemoBlock title="移除使用者" description="用 title-text、warning-text、sub-warning-text 設定文案，確認時觸發 update:submit。" :source="removeUserSource">
        <WarningRemoveUser />
      </DemoBlock>

      <DemoBlock title="刪除檔案" description="與移除使用者相同的基本用法，換成刪除檔案的文案。" :source="deleteFileSource">
        <WarningDeleteFile />
      </DemoBlock>

      <DemoBlock title="重置設定" description="用預設 slot 自訂對話框內容。" :source="resetSettingsSource">
        <WarningResetSettings />
      </DemoBlock>

      <DemoBlock title="退出系統" description="預設 slot 內容可加入圖示等自訂排版。" :source="exitSystemSource">
        <WarningExitSystem />
      </DemoBlock>
    </div>
  </div>
</template>

<script setup lang="ts">
import DemoBlock from '../docs/DemoBlock.vue'
import { ROUTES } from '@/router/constants'
import SelectorBasic from '../../../tests/consumer/src/examples/demo/base-selector/SelectorBasic.vue'
import basicSource from '../../../tests/consumer/src/examples/demo/base-selector/SelectorBasic.vue?raw'
import SelectorClearable from '../../../tests/consumer/src/examples/demo/base-selector/SelectorClearable.vue'
import clearableSource from '../../../tests/consumer/src/examples/demo/base-selector/SelectorClearable.vue?raw'
import SelectorDisabled from '../../../tests/consumer/src/examples/demo/base-selector/SelectorDisabled.vue'
import disabledSource from '../../../tests/consumer/src/examples/demo/base-selector/SelectorDisabled.vue?raw'
import SelectorCollapseTags from '../../../tests/consumer/src/examples/demo/base-selector/SelectorCollapseTags.vue'
import collapseSource from '../../../tests/consumer/src/examples/demo/base-selector/SelectorCollapseTags.vue?raw'
import SelectorWidth from '../../../tests/consumer/src/examples/demo/base-selector/SelectorWidth.vue'
import widthSource from '../../../tests/consumer/src/examples/demo/base-selector/SelectorWidth.vue?raw'
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">BaseSelector 組件示範</h1>
      <p class="text-gray-600 mb-8">
        每個範例下方可複製或查看完整程式碼，內容與畫面上執行的是同一份檔案。BaseSelector 以 v-model 綁定單選字串或多選陣列，清空時單選會得到 undefined。範例需要宿主已安裝 Element Plus（全域註冊）與 vue-i18n（legacy: false），設定方式見<RouterLink :to="ROUTES.INSTALL_GUIDE" class="text-blue-700 underline">安裝指南</RouterLink>。
      </p>

      <DemoBlock title="基本用法" description="單選與多選，下方顯示目前綁定的值。" :source="basicSource">
        <SelectorBasic />
      </DemoBlock>

      <DemoBlock title="清空功能示範" description="預設值可用清空圖示清除，單選與多選皆可清空。" :source="clearableSource">
        <SelectorClearable />
      </DemoBlock>

      <DemoBlock title="禁用狀態" description="disabled 為 true 時無法操作。" :source="disabledSource">
        <SelectorDisabled />
      </DemoBlock>

      <DemoBlock title="折疊標籤功能" description="多選時用 collapse-tags 折疊標籤，collapse-tags-tooltip 在滑過時顯示其餘項目。" :source="collapseSource">
        <SelectorCollapseTags />
      </DemoBlock>

      <DemoBlock title="自定義樣式" description="用 class 設定固定寬度或全寬度。" :source="widthSource">
        <SelectorWidth />
      </DemoBlock>

      <!-- 組件屬性說明 -->
      <el-card>
        <template #header>
          <h2 class="text-xl font-semibold">組件屬性說明</h2>
        </template>
        <div class="space-y-4">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    屬性名
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    類型
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    默認值
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    說明
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    modelValue
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    string | string[]
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">''</td>
                  <td class="px-6 py-4 text-sm text-gray-500">選擇器的值</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    options
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Array&lt;{value: string, label: string}&gt;
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    [{value: '', label: ''}]
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">選項數據</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    placeholder
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'請選擇'</td>
                  <td class="px-6 py-4 text-sm text-gray-500">佔位符文字</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    multiple
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">false</td>
                  <td class="px-6 py-4 text-sm text-gray-500">是否多選</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    disabled
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">false</td>
                  <td class="px-6 py-4 text-sm text-gray-500">是否禁用</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    collapseTags
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">false</td>
                  <td class="px-6 py-4 text-sm text-gray-500">是否折疊標籤</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    collapseTagsTooltip
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">false</td>
                  <td class="px-6 py-4 text-sm text-gray-500">是否顯示折疊標籤提示</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    class
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'w-full'</td>
                  <td class="px-6 py-4 text-sm text-gray-500">自定義 CSS 類名</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

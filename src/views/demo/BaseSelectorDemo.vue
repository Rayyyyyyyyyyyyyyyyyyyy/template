<script setup lang="ts">
import { ref, reactive } from 'vue'
import { BaseSelector } from '@/components'
import type { ElOptions } from '@/types/OptionDto'

// 基本選項數據
const basicOptions: ElOptions[] = [
  { value: 'option1', label: '選項一' },
  { value: 'option2', label: '選項二' },
  { value: 'option3', label: '選項三' },
  { value: 'option4', label: '選項四' },
  { value: 'option5', label: '選項五' },
]

// 多選選項數據
const multipleOptions: ElOptions[] = [
  { value: 'apple', label: '蘋果' },
  { value: 'banana', label: '香蕉' },
  { value: 'orange', label: '橘子' },
  { value: 'grape', label: '葡萄' },
  { value: 'strawberry', label: '草莓' },
]

// 狀態管理
const state = reactive({
  basicValue: '',
  multipleValue: [] as string[],
  clearableValue: '',
  disabledValue: 'option2',
  collapseTagsValue: ['apple', 'banana', 'orange'],
})

// 事件處理
const handleBasicChange = (value: string | string[] | undefined | null) => {
  console.log('基本選擇器值變更:', value)
  state.basicValue = value as string
}

const handleMultipleChange = (value: string | string[] | undefined | null) => {
  console.log('多選選擇器值變更:', value)
  state.multipleValue = value as string[]
}

const handleClearableChange = (value: string | string[] | undefined | null) => {
  console.log('可清空選擇器值變更:', value)
  state.clearableValue = value as string
}

const handleDisabledChange = (value: string | string[] | undefined | null) => {
  console.log('禁用選擇器值變更:', value)
  state.disabledValue = value as string
}

const handleCollapseTagsChange = (value: string | string[] | undefined | null) => {
  console.log('折疊標籤選擇器值變更:', value)
  state.collapseTagsValue = value as string[]
}
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">BaseSelector 組件示範</h1>

      <!-- 基本用法 -->
      <el-card class="mb-6">
        <template #header>
          <h2 class="text-xl font-semibold">基本用法</h2>
        </template>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">基本選擇器</label>
              <BaseSelector
                v-model="state.basicValue"
                :options="basicOptions"
                placeholder="請選擇選項"
                @update:model-value="handleBasicChange"
              />
              <p class="text-sm text-gray-500 mt-1">當前值: {{ state.basicValue || '未選擇' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">多選選擇器</label>
              <BaseSelector
                v-model="state.multipleValue"
                :options="multipleOptions"
                placeholder="請選擇水果"
                :multiple="true"
                @update:model-value="handleMultipleChange"
              />
              <p class="text-sm text-gray-500 mt-1">
                當前值: {{ state.multipleValue.length ? state.multipleValue.join(', ') : '未選擇' }}
              </p>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 清空功能示範 -->
      <el-card class="mb-6">
        <template #header>
          <h2 class="text-xl font-semibold">清空功能示範</h2>
        </template>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >基本選擇器（可清空）</label
              >
              <BaseSelector
                v-model="state.clearableValue"
                :options="basicOptions"
                placeholder="請選擇選項"
                @update:model-value="handleClearableChange"
              />
              <p class="text-sm text-gray-500 mt-1">
                當前值: {{ state.clearableValue || '未選擇' }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >多選選擇器（可清空）</label
              >
              <BaseSelector
                v-model="state.multipleValue"
                :options="multipleOptions"
                placeholder="請選擇水果"
                :multiple="true"
                @update:model-value="handleMultipleChange"
              />
              <p class="text-sm text-gray-500 mt-1">
                當前值: {{ state.multipleValue.length ? state.multipleValue.join(', ') : '未選擇' }}
              </p>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 禁用狀態 -->
      <el-card class="mb-6">
        <template #header>
          <h2 class="text-xl font-semibold">禁用狀態</h2>
        </template>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">禁用選擇器</label>
              <BaseSelector
                v-model="state.disabledValue"
                :options="basicOptions"
                placeholder="請選擇選項"
                :disabled="true"
                @update:model-value="handleDisabledChange"
              />
              <p class="text-sm text-gray-500 mt-1">
                當前值: {{ state.disabledValue || '未選擇' }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">正常選擇器</label>
              <BaseSelector
                v-model="state.basicValue"
                :options="basicOptions"
                placeholder="請選擇選項"
                :disabled="false"
              />
              <p class="text-sm text-gray-500 mt-1">當前值: {{ state.basicValue || '未選擇' }}</p>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 折疊標籤 -->
      <el-card class="mb-6">
        <template #header>
          <h2 class="text-xl font-semibold">折疊標籤功能</h2>
        </template>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >折疊標籤（顯示提示）</label
              >
              <BaseSelector
                v-model="state.collapseTagsValue"
                :options="multipleOptions"
                placeholder="請選擇水果"
                :multiple="true"
                :collapse-tags="true"
                :collapse-tags-tooltip="true"
                @update:model-value="handleCollapseTagsChange"
              />
              <p class="text-sm text-gray-500 mt-1">
                當前值:
                {{ state.collapseTagsValue.length ? state.collapseTagsValue.join(', ') : '未選擇' }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">不折疊標籤</label>
              <BaseSelector
                v-model="state.multipleValue"
                :options="multipleOptions"
                placeholder="請選擇水果"
                :multiple="true"
                :collapse-tags="false"
                @update:model-value="handleMultipleChange"
              />
              <p class="text-sm text-gray-500 mt-1">
                當前值: {{ state.multipleValue.length ? state.multipleValue.join(', ') : '未選擇' }}
              </p>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 自定義樣式 -->
      <el-card class="mb-6">
        <template #header>
          <h2 class="text-xl font-semibold">自定義樣式</h2>
        </template>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">自定義寬度</label>
              <BaseSelector
                v-model="state.basicValue"
                :options="basicOptions"
                placeholder="請選擇選項"
                class="w-64"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">全寬度</label>
              <BaseSelector
                v-model="state.basicValue"
                :options="basicOptions"
                placeholder="請選擇選項"
                class="w-full"
              />
            </div>
          </div>
        </div>
      </el-card>

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

<style scoped></style>

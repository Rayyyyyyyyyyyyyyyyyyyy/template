<script setup lang="ts">
import { reactive } from 'vue'
import { BaseMultipleInput } from '@/components'

// ==================== 響應式數據 ====================
const state = reactive({
  // BaseMultipleInput 數據
  multipleInputTags: ['標籤1', '標籤2', '標籤3'],
  multipleInputTags2: ['Vue', 'React', 'Angular'],
  multipleInputTags3: ['JavaScript', 'TypeScript', 'Python'],
})

// ==================== 事件處理函數 ====================
// BaseMultipleInput 相關事件處理
const handleMultipleInputChange = (tags: string[]) => {
  console.log('BaseMultipleInput 標籤變更:', tags)
  state.multipleInputTags = tags
}

const handleMultipleInputChange2 = (tags: string[]) => {
  console.log('BaseMultipleInput 2 標籤變更:', tags)
  state.multipleInputTags2 = tags
}

const handleMultipleInputChange3 = (tags: string[]) => {
  console.log('BaseMultipleInput 3 標籤變更:', tags)
  state.multipleInputTags3 = tags
}

const handleMultipleInputError = () => {
  console.log('BaseMultipleInput 輸入驗證失敗')
}

const validateTag = (input: string) => {
  return input.length > 0 && input.length <= 20 && !input.includes(' ')
}

const validateTechTag = (input: string) => {
  const validTechs = ['Vue', 'React', 'Angular', 'Svelte', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go']
  return validTechs.some(tech => tech.toLowerCase() === input.toLowerCase())
}
</script>

<template>
  <!-- BaseMultipleInput 示範 -->
  <section id="base-multiple-input-demo" class="mb-12">
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div class="px-8 py-6 border-b border-gray-100">
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">BaseMultipleInput 示範</h2>
        <p class="text-gray-600 text-base leading-relaxed">
          展示 BaseMultipleInput 組件的多標籤輸入功能
        </p>
      </div>
      <div class="p-8">
        <div class="space-y-8">
          <!-- 基本使用 -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">基本使用</h3>
            <div class="max-w-md">
              <BaseMultipleInput
                v-model="state.multipleInputTags"
                type="textarea"
                @update:model-value="handleMultipleInputChange"
                @input-error="handleMultipleInputError"
              />
            </div>
            <div class="mt-4 text-sm text-gray-600">
              <p>當前標籤：{{ state.multipleInputTags.join(', ') }}</p>
            </div>
          </div>

          <!-- 帶驗證規則 -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">帶驗證規則</h3>
            <div class="max-w-md">
              <BaseMultipleInput
                v-model="state.multipleInputTags2"
                type="textarea"
                :validate-rule="validateTag"
                @update:model-value="handleMultipleInputChange2"
                @input-error="handleMultipleInputError"
              />
            </div>
            <div class="mt-2 text-sm text-gray-500">
              <p>驗證規則：長度 1-20 字符，不能包含空格</p>
            </div>
            <div class="mt-2 text-sm text-gray-600">
              <p>當前標籤：{{ state.multipleInputTags2.join(', ') }}</p>
            </div>
          </div>

          <!-- 技術標籤驗證 -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">技術標籤驗證</h3>
            <div class="max-w-md">
              <BaseMultipleInput
                v-model="state.multipleInputTags3"
                type="textarea"
                :validate-rule="validateTechTag"
                @update:model-value="handleMultipleInputChange3"
                @input-error="handleMultipleInputError"
              />
            </div>
            <div class="mt-2 text-sm text-gray-500">
              <p>驗證規則：只允許特定的技術標籤（Vue, React, Angular, Svelte, JavaScript, TypeScript, Python, Java, C#, Go）</p>
            </div>
            <div class="mt-2 text-sm text-gray-600">
              <p>當前標籤：{{ state.multipleInputTags3.join(', ') }}</p>
            </div>
          </div>

          <!-- 不同輸入類型 -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">不同輸入類型</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-base font-medium text-gray-700 mb-2">Textarea 類型</h4>
                <BaseMultipleInput
                  v-model="state.multipleInputTags"
                  type="textarea"
                  @update:model-value="handleMultipleInputChange"
                />
              </div>
              <div>
                <h4 class="text-base font-medium text-gray-700 mb-2">Text 類型</h4>
                <BaseMultipleInput
                  v-model="state.multipleInputTags"
                  type="text"
                  @update:model-value="handleMultipleInputChange"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 bg-gray-50 rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            BaseMultipleInput 功能特色
          </h4>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>多標籤輸入：</strong>支持添加多個標籤，每個標籤可單獨刪除</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>輸入驗證：</strong>支持自定義驗證規則函數</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>鍵盤操作：</strong>Enter 鍵確認輸入，Delete 鍵刪除最後一個標籤</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>防重複：</strong>自動過濾重複的標籤</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>失焦確認：</strong>輸入框失焦時自動確認輸入</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>響應式設計：</strong>使用 Tailwind CSS 樣式</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>類型安全：</strong>完整的 TypeScript 支持</span>
            </li>
          </ul>
        </div>

        <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h5 class="text-base font-medium text-blue-900 mb-2 flex items-center">
            <svg class="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            使用說明
          </h5>
          <ol class="space-y-2 text-blue-800">
            <li class="flex items-start">
              <span class="bg-blue-200 text-blue-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
              <span>在輸入框中輸入標籤內容</span>
            </li>
            <li class="flex items-start">
              <span class="bg-blue-200 text-blue-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
              <span>按 Enter 鍵或點擊其他地方確認輸入</span>
            </li>
            <li class="flex items-start">
              <span class="bg-blue-200 text-blue-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
              <span>點擊標籤上的 × 按鈕刪除標籤</span>
            </li>
            <li class="flex items-start">
              <span class="bg-blue-200 text-blue-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
              <span>在空輸入框時按 Delete 鍵刪除最後一個標籤</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>

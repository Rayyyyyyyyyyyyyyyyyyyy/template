<script setup lang="ts">
import { BaseBtn } from '@/components'
import { ROUTES } from '@/router/constants'
import { useRouter } from 'vue-router'

// 示範頁面列表
const demoPages = [
  {
    title: 'SearchableListPanel',
    description: '整合式搜尋、篩選、分頁組件',
    route: ROUTES.SEARCHABLE_LIST_PANEL,
    features: [
      '整合式設計：結合搜尋、篩選、分頁於一體',
      '多個按鈕插槽：支持 firstButton、customButton、lastButton',
      '篩選抽屜：可自定義篩選條件內容',
      '分頁功能：內建分頁組件，支持頁面大小調整',
      '徽章顯示：篩選條件數量徽章提示',
      '響應式設計：適配不同螢幕尺寸',
    ],
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'BaseMultipleInput',
    description: '多標籤輸入組件',
    route: ROUTES.BASE_MULTIPLE_INPUT,
    features: [
      '多標籤輸入：支持添加多個標籤，每個標籤可單獨刪除',
      '輸入驗證：支持自定義驗證規則函數',
      '鍵盤操作：Enter 鍵確認輸入，Delete 鍵刪除最後一個標籤',
      '防重複：自動過濾重複的標籤',
      '失焦確認：輸入框失焦時自動確認輸入',
      '響應式設計：使用 Tailwind CSS 樣式',
      '類型安全：完整的 TypeScript 支持',
    ],
    icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
  },
  {
    title: 'TransferDialog',
    description: '表格列配置對話框組件',
    route: ROUTES.TRANSFER_DIALOG,
    features: [
      '拖拽排序：支持拖拽調整列順序',
      '批量選擇：支持全選/取消全選列',
      '搜尋過濾：支持按列名搜尋快速定位',
      '位置調整：支持上移、下移、置頂、置底操作',
      '即時預覽：配置變更即時反映到表格',
      '狀態保持：記住列的顯示/隱藏狀態',
    ],
    icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
  },
  {
    title: 'BaseTable',
    description: '基礎表格組件',
    route: ROUTES.BASE_TABLE,
    features: [
      '數據展示：支持多種數據格式展示',
      '列配置：可自定義列寬度和對齊方式',
      '排序功能：支持單列和多列排序',
      '分頁功能：內建分頁組件',
      '選擇功能：支持單選和多選',
      '響應式設計：適配不同螢幕尺寸',
    ],
    icon: 'M3 10h18M3 14h18m-9-4v8m-7 0V4a1 1 0 011-1h12a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1z',
  },
  {
    title: 'BaseBtn',
    description: '基礎按鈕組件',
    route: ROUTES.BASE_BTN,
    features: [
      '多種樣式：支持 primary、default、danger 等樣式',
      '多種尺寸：支持 small、medium、large 尺寸',
      '圖標支持：可添加前置和後置圖標',
      '載入狀態：支持載入中狀態顯示',
      '禁用狀態：支持禁用按鈕功能',
      '路由跳轉：支持 Vue Router 跳轉',
    ],
    icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
  },
  {
    title: 'BaseInput',
    description: '基礎輸入框組件',
    route: ROUTES.BASE_INPUT,
    features: [
      '多種類型：支持 text、password、email 等類型',
      '驗證功能：支持表單驗證和錯誤提示',
      '前後綴：支持前置和後置內容',
      '清除功能：支持一鍵清除輸入內容',
      '禁用狀態：支持禁用輸入功能',
      '只讀狀態：支持只讀模式',
    ],
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
  },
  {
    title: 'FilterBtn',
    description: '篩選按鈕組件',
    route: ROUTES.FILTER_BTN,
    features: [
      '徽章顯示：顯示篩選條件數量',
      '抽屜模式：支持篩選條件抽屜展示',
      '多個插槽：支持 default、fill-filter、filter-icon 插槽',
      '事件處理：支持重置和提交事件',
      '自定義樣式：可自定義按鈕和抽屜樣式',
      '響應式設計：適配不同螢幕尺寸',
    ],
    icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
  },
  {
    title: 'BaseDialog',
    description: '基礎對話框組件',
    route: ROUTES.BASE_DIALOG,
    features: [
      '多種尺寸：支持 small、medium、large 尺寸',
      '自定義標題：支持自定義對話框標題',
      '關閉功能：支持多種關閉方式',
      '遮罩層：支持遮罩層點擊關閉',
      '動畫效果：支持開啟和關閉動畫',
      '插槽支持：支持 header、body、footer 插槽',
    ],
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
  {
    title: 'BaseForm',
    description: '基礎表單組件',
    route: ROUTES.BASE_FORM,
    features: [
      '表單驗證：支持多種驗證規則',
      '動態表單：支持動態添加和刪除表單項',
      '布局支持：支持多種表單布局方式',
      '提交處理：支持表單提交和重置',
      '錯誤提示：支持表單錯誤信息顯示',
      '響應式設計：適配不同螢幕尺寸',
    ],
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    title: 'SortTable',
    description: '排序表格組件',
    route: ROUTES.SORT_TABLE,
    features: [
      '多列排序：支持多列同時排序',
      '排序指示：清晰的排序狀態指示',
      '自定義排序：支持自定義排序邏輯',
      '性能優化：大數據量下的性能優化',
      '可配置：支持排序功能的開關配置',
      '類型安全：完整的 TypeScript 支持',
    ],
    icon: 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4',
  },
  {
    title: 'SearchBar',
    description: '搜尋欄組件',
    route: ROUTES.SEARCH_BAR,
    features: [
      '即時搜尋：支持輸入即時搜尋',
      '搜尋建議：支持搜尋建議和自動完成',
      '搜尋歷史：支持搜尋歷史記錄',
      '快捷鍵：支持快捷鍵操作',
      '自定義樣式：可自定義搜尋欄樣式',
      '響應式設計：適配不同螢幕尺寸',
    ],
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  },
  {
    title: 'TransferItem',
    description: '穿梭框項目組件',
    route: ROUTES.TRANSFER_ITEM,
    features: [
      '拖拽支持：支持拖拽移動項目',
      '選擇狀態：支持單選和多選',
      '自定義內容：支持自定義項目內容',
      '禁用狀態：支持禁用特定項目',
      '過濾功能：支持項目過濾和搜尋',
      '事件處理：支持選擇和移動事件',
    ],
    icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
  },
  {
    title: 'FunctionHeader',
    description: '功能頁面標題組件',
    route: ROUTES.FUNCTION_HEADER,
    features: [
      '標題顯示：支持頁面標題和副標題',
      '麵包屑：支持麵包屑導航',
      '操作按鈕：支持標題區域操作按鈕',
      '自定義內容：支持自定義標題內容',
      '響應式設計：適配不同螢幕尺寸',
      '主題支持：支持多種主題樣式',
    ],
    icon: 'M4 6h16M4 10h16M4 14h16M4 18h16',
  },
  {
    title: 'MainPanel',
    description: '主要面板組件',
    route: ROUTES.MAIN_PANEL,
    features: [
      '內容容器：提供統一的內容容器',
      '邊距控制：支持自定義內外邊距',
      '背景樣式：支持多種背景樣式',
      '陰影效果：支持陰影和圓角效果',
      '響應式布局：適配不同螢幕尺寸',
      '插槽支持：支持多個內容插槽',
    ],
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  },
]
const router = useRouter()
const goDemoPage = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 頁面標題 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">組件示範中心</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          探索我們精心設計的 Vue 3 組件庫，每個組件都經過精心設計和測試，提供完整的 TypeScript
          支持和現代化的用戶體驗。
        </p>
      </div>

      <!-- 組件卡片網格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <el-card
          v-for="demo in demoPages"
          :key="demo.title"
          class="demo-card h-full flex flex-col"
          shadow="hover"
        >
          <!-- 卡片頭部 -->
          <template #header>
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg
                  class="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="demo.icon"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-xl font-semibold text-gray-900">{{ demo.title }}</h3>
                <p class="text-gray-600">{{ demo.description }}</p>
              </div>
            </div>
          </template>

          <!-- 功能特色 -->
          <div>
            <h4 class="text-sm font-medium text-gray-900 mb-3">功能特色</h4>
            <ul class="space-y-2">
              <li
                v-for="feature in demo.features.slice(0, 4)"
                :key="feature"
                class="flex items-start text-sm text-gray-600"
              >
                <svg
                  class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>{{ feature }}</span>
              </li>
              <li v-if="demo.features.length > 4" class="text-sm text-gray-500">
                還有 {{ demo.features.length - 4 }} 個功能特色...
              </li>
            </ul>
          </div>

          <!-- 卡片底部 -->
          <template #footer>
            <BaseBtn type="primary" @click="goDemoPage(demo.route)" class="w-full justify-center">
              查看示範
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </BaseBtn>
          </template>
        </el-card>
      </div>

      <!-- 快速開始 -->
      <el-card class="mt-16" shadow="always">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">快速開始</h2>
          <p class="text-gray-600 mb-6">
            想要在自己的專案中使用這些組件嗎？查看我們的安裝和使用指南。
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <BaseBtn type="primary" size="large" class="px-8 py-3"> 安裝指南 </BaseBtn>
            <BaseBtn type="default" size="large" class="px-8 py-3"> 文檔中心 </BaseBtn>
          </div>
        </div>
      </el-card>

      <!-- 技術特色 -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <el-card class="text-center" shadow="hover">
          <div
            class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">TypeScript 支持</h3>
          <p class="text-gray-600">完整的類型定義，提供更好的開發體驗和代碼提示。</p>
        </el-card>
        <el-card class="text-center" shadow="hover">
          <div
            class="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">高性能</h3>
          <p class="text-gray-600">基於 Vue 3 Composition API，提供更好的性能和更小的包大小。</p>
        </el-card>
        <el-card class="text-center" shadow="hover">
          <div
            class="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">響應式設計</h3>
          <p class="text-gray-600">使用 Tailwind CSS，適配各種螢幕尺寸和設備。</p>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-card :deep(.el-card__body) {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>

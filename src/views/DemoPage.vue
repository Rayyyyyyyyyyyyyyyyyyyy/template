<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { BaseBtn } from '@/components'
import { ROUTES } from '@/router/constants'
import { useRouter } from 'vue-router'

const { locale } = useI18n()
const currentLocale = ref(locale.value)

// 切換語系
const switchLocale = () => {
  currentLocale.value = currentLocale.value === 'zh-TW' ? 'en-US' : 'zh-TW'
  locale.value = currentLocale.value
}

// 新開頁面方法
const openInstallGuide = () => {
  router.push(ROUTES.INSTALL_GUIDE)
}

const openDocsCenter = () => {
  router.push(ROUTES.DOCS_CENTER)
}

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
    title: 'BaseSelector',
    description: '基礎選擇器組件',
    route: ROUTES.BASE_SELECTOR,
    features: [
      '單選/多選：支持單選和多選模式',
      '自動清空：始終支持一鍵清空選擇',
      '折疊標籤：多選時支持折疊標籤顯示',
      '禁用狀態：支持禁用選擇功能',
      '自定義樣式：支持自定義 CSS 類名',
      'z-index 修復：解決在 Dialog 中的層級問題',
    ],
    icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
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
    title: 'BaseWaringDialog',
    description: '警告對話框組件',
    route: ROUTES.BASE_WARING_DIALOG,
    features: [
      '警告樣式：專門用於警告和確認操作',
      '自定義文字：支持自定義警告文字和副標題',
      '自定義寬度：支持自定義對話框寬度',
      '插槽支持：支持自定義內容插槽',
      '事件處理：支持提交和取消事件',
      '視覺提示：使用警告色彩和圖示',
    ],
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
  },
  {
    title: 'Table',
    description: '表格組件集合',
    route: ROUTES.TABLE,
    features: [
      'SortTable：帶排序功能的表格組件',
      'TitleTable：帶標題和操作按鈕的表格組件',
      '多列排序：支持多列同時排序',
      '內建操作：新增、刪除、編輯功能',
      '轉移對話框：列配置轉移功能',
      '完整 API：詳細的 Props 和 Events 文檔',
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
  {
    title: 'DetailLayout',
    description: '詳細頁面佈局組件',
    route: ROUTES.DETAIL_LAYOUT,
    features: [
      '響應式佈局：自適應不同螢幕尺寸',
      '編輯模式：支持可編輯和只讀模式切換',
      '加載狀態：內建頁面加載狀態顯示',
      'Slot 設計：支持自定義標題區域和主要內容',
      '操作按鈕：內建保存和取消按鈕',
      '返回功能：支持返回按鈕配置',
    ],
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    title: 'FilterLayout',
    description: '篩選頁面佈局組件',
    route: ROUTES.FILTER_LAYOUT,
    features: [
      '響應式佈局：自適應不同螢幕尺寸的篩選表單',
      '靈活配置：支持自定義主要標題和篩選標題',
      '操作按鈕：內建執行和重設按鈕',
      'Slot 設計：支持完全自定義篩選表單內容',
      '事件處理：提供篩選提交和重置事件',
      '統一樣式：與其他佈局組件保持一致的設計風格',
    ],
    icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z',
  },
  {
    title: 'i18n Test',
    description: 'i18n 國際化測試頁面',
    route: ROUTES.I18N_TEST,
    features: [
      '語系切換：即時切換繁體中文和英文',
      'BaseTable 測試：測試表格組件的載入文字和操作按鈕',
      'BaseDialog 測試：測試對話框的確定和取消按鈕',
      'SearchBar 測試：測試搜尋框的 placeholder 文字',
      '完整展示：展示所有組件的 i18n 整合效果',
      '開發工具：用於驗證 i18n 功能是否正常運作',
    ],
    icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
  },
]
const router = useRouter()
const goDemoPage = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <header class="catalog-heading">
        <div>
          <h1>組件示範中心</h1>
          <p>
            探索我們精心設計的 Vue 3 組件庫，每個組件都經過精心設計和測試，提供完整的 TypeScript
            支持和現代化的用戶體驗。
          </p>
        </div>
        <base-btn
          :text="currentLocale === 'zh-TW' ? '中文 / English' : 'English / 中文'"
          @click="switchLocale"
        />
      </header>

      <div class="catalog-grid">
        <el-card v-for="demo in demoPages" :key="demo.title" class="demo-card" shadow="never">
          <template #header>
            <div class="demo-card__heading">
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  :d="demo.icon"
                />
              </svg>
              <h3>{{ demo.title }}</h3>
            </div>
            <p>{{ demo.description }}</p>
          </template>
          <ul class="demo-card__features">
            <li v-for="feature in demo.features.slice(0, 4)" :key="feature">{{ feature }}</li>
            <li v-if="demo.features.length > 4" class="demo-card__more">
              還有 {{ demo.features.length - 4 }} 個功能特色…
            </li>
          </ul>
          <template #footer>
            <BaseBtn
              type="primary"
              @click="goDemoPage(demo.route)"
              :aria-label="`查看 ${demo.title} 示範`"
              >查看示範</BaseBtn
            >
          </template>
        </el-card>
      </div>

      <section class="catalog-start">
        <div>
          <h2>快速開始</h2>
          <p>想要在自己的專案中使用這些組件嗎？查看我們的安裝和使用指南。</p>
        </div>
        <div class="catalog-start__actions">
          <BaseBtn type="primary" is-fill @click="openInstallGuide">安裝指南</BaseBtn>
          <BaseBtn @click="openDocsCenter">文檔中心</BaseBtn>
        </div>
      </section>

      <dl class="catalog-notes">
        <div>
          <dt>TypeScript 支持</dt>
          <dd>完整的類型定義，提供更好的開發體驗和代碼提示。</dd>
        </div>
        <div>
          <dt>高性能</dt>
          <dd>基於 Vue 3 Composition API，提供更好的性能和更小的包大小。</dd>
        </div>
        <div>
          <dt>響應式設計</dt>
          <dd>使用 Tailwind CSS，適配各種螢幕尺寸和設備。</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

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
    group: 'tables',
    features: [
      '整合式設計：結合搜尋、篩選、分頁於一體',
      '多個按鈕插槽：支持 firstButton、customButton、lastButton',
      '篩選抽屜：可自定義篩選條件內容',
      '分頁功能：內建分頁組件，支持頁面大小調整',
      '徽章顯示：篩選條件數量徽章提示',
      '響應式設計：適配不同螢幕尺寸',
    ],
  },
  {
    title: 'TransferDialog',
    description: '表格列配置對話框組件',
    route: ROUTES.TRANSFER_DIALOG,
    group: 'dialogs',
    features: [
      '拖拽排序：支持拖拽調整列順序',
      '批量選擇：支持全選/取消全選列',
      '搜尋過濾：支持按列名搜尋快速定位',
      '位置調整：支持上移、下移、置頂、置底操作',
      '即時預覽：配置變更即時反映到表格',
      '狀態保持：記住列的顯示/隱藏狀態',
    ],
  },
  {
    title: 'BaseBtn',
    description: '基礎按鈕組件',
    route: ROUTES.BASE_BTN,
    group: 'forms',
    features: [
      '多種樣式：支持 primary、default、danger 等樣式',
      '多種尺寸：支持 small、medium、large 尺寸',
      '圖標支持：可添加前置和後置圖標',
      '載入狀態：支持載入中狀態顯示',
      '禁用狀態：支持禁用按鈕功能',
      '路由跳轉：支持 Vue Router 跳轉',
    ],
  },
  {
    title: 'BaseInput',
    description: '基礎輸入框組件',
    route: ROUTES.BASE_INPUT,
    group: 'forms',
    features: [
      '多種類型：支持 text、password、email 等類型',
      '驗證功能：支持表單驗證和錯誤提示',
      '前後綴：支持前置和後置內容',
      '清除功能：支持一鍵清除輸入內容',
      '禁用狀態：支持禁用輸入功能',
      '只讀狀態：支持只讀模式',
    ],
  },
  {
    title: 'BaseSelector',
    description: '基礎選擇器組件',
    route: ROUTES.BASE_SELECTOR,
    group: 'forms',
    features: [
      '單選/多選：支持單選和多選模式',
      '自動清空：始終支持一鍵清空選擇',
      '折疊標籤：多選時支持折疊標籤顯示',
      '禁用狀態：支持禁用選擇功能',
      '自定義樣式：支持自定義 CSS 類名',
      'z-index 修復：解決在 Dialog 中的層級問題',
    ],
  },
  {
    title: 'BaseDialog',
    description: '基礎對話框組件',
    route: ROUTES.BASE_DIALOG,
    group: 'dialogs',
    features: [
      '多種尺寸：支持 small、medium、large 尺寸',
      '自定義標題：支持自定義對話框標題',
      '關閉功能：支持多種關閉方式',
      '遮罩層：支持遮罩層點擊關閉',
      '動畫效果：支持開啟和關閉動畫',
      '插槽支持：支持 header、body、footer 插槽',
    ],
  },
  {
    title: 'BaseWarningDialog',
    description: '警告對話框組件',
    route: ROUTES.BASE_WARNING_DIALOG,
    group: 'dialogs',
    features: [
      '警告樣式：專門用於警告和確認操作',
      '自定義文字：支持自定義警告文字和副標題',
      '自定義寬度：支持自定義對話框寬度',
      '插槽支持：支持自定義內容插槽',
      '事件處理：支持提交和取消事件',
      '視覺提示：使用警告色彩和圖示',
    ],
  },
  {
    title: 'Table',
    description: '表格組件集合',
    route: ROUTES.TABLE,
    group: 'tables',
    features: [
      'SortTable：帶排序功能的表格組件',
      'TitleTable：帶標題和操作按鈕的表格組件',
      '多列排序：支持多列同時排序',
      '內建操作：新增、刪除、編輯功能',
      '轉移對話框：列配置轉移功能',
      '完整 API：詳細的 Props 和 Events 文檔',
    ],
  },
  {
    title: 'SearchBar',
    description: '搜尋欄組件',
    route: ROUTES.SEARCH_BAR,
    group: 'forms',
    features: [
      '即時搜尋：支持輸入即時搜尋',
      '搜尋建議：支持搜尋建議和自動完成',
      '搜尋歷史：支持搜尋歷史記錄',
      '快捷鍵：支持快捷鍵操作',
      '自定義樣式：可自定義搜尋欄樣式',
      '響應式設計：適配不同螢幕尺寸',
    ],
  },
  {
    title: 'FunctionHeader',
    description: '功能頁面標題組件',
    route: ROUTES.FUNCTION_HEADER,
    group: 'layouts',
    features: [
      '標題顯示：支持頁面標題和副標題',
      '麵包屑：支持麵包屑導航',
      '操作按鈕：支持標題區域操作按鈕',
      '自定義內容：支持自定義標題內容',
      '響應式設計：適配不同螢幕尺寸',
      '主題支持：支持多種主題樣式',
    ],
  },
  {
    title: 'MainPanel',
    description: '主要面板組件',
    route: ROUTES.MAIN_PANEL,
    group: 'layouts',
    features: [
      '內容容器：提供統一的內容容器',
      '邊距控制：支持自定義內外邊距',
      '背景樣式：支持多種背景樣式',
      '陰影效果：支持陰影和圓角效果',
      '響應式布局：適配不同螢幕尺寸',
      '插槽支持：支持多個內容插槽',
    ],
  },
  {
    title: 'DetailLayout',
    description: '詳細頁面佈局組件',
    route: ROUTES.DETAIL_LAYOUT,
    group: 'layouts',
    features: [
      '響應式佈局：自適應不同螢幕尺寸',
      '編輯模式：支持可編輯和只讀模式切換',
      '加載狀態：內建頁面加載狀態顯示',
      'Slot 設計：支持自定義標題區域和主要內容',
      '操作按鈕：內建保存和取消按鈕',
      '返回功能：支持返回按鈕配置',
    ],
  },
  {
    title: 'FilterLayout',
    description: '篩選頁面佈局組件',
    route: ROUTES.FILTER_LAYOUT,
    group: 'layouts',
    features: [
      '響應式佈局：自適應不同螢幕尺寸的篩選表單',
      '靈活配置：支持自定義主要標題和篩選標題',
      '操作按鈕：內建執行和重設按鈕',
      'Slot 設計：支持完全自定義篩選表單內容',
      '事件處理：提供篩選提交和重置事件',
      '統一樣式：與其他佈局組件保持一致的設計風格',
    ],
  },
  {
    title: 'i18n Test',
    description: 'i18n 國際化測試頁面',
    route: ROUTES.I18N_TEST,
    group: 'forms',
    features: [
      '語系切換：即時切換繁體中文和英文',
      'BaseTable 測試：測試表格組件的載入文字和操作按鈕',
      'BaseDialog 測試：測試對話框的確定和取消按鈕',
      'SearchBar 測試：測試搜尋框的 placeholder 文字',
      '完整展示：展示所有組件的 i18n 整合效果',
      '開發工具：用於驗證 i18n 功能是否正常運作',
    ],
  },
]
const demoGroups = [
  { id: 'tables', title: '表格與列表' },
  { id: 'forms', title: '表單與控制' },
  { id: 'layouts', title: '版面配置' },
  { id: 'dialogs', title: '對話框' },
].map((group) => ({ ...group, pages: demoPages.filter((demo) => demo.group === group.id) }))

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
          <h1>組件目錄</h1>
          <p>依分類列出所有組件與它們的功能特色。點「查看示範」開啟該組件可操作的示範頁。</p>
        </div>
        <base-btn
          :text="currentLocale === 'zh-TW' ? '中文 / English' : 'English / 中文'"
          @click="switchLocale"
        />
      </header>

      <div class="catalog-layout">
        <nav class="catalog-nav" aria-label="組件分類">
          <a v-for="group in demoGroups" :key="group.id" :href="`#${group.id}`"
            >{{ group.title }}<span>{{ group.pages.length }}</span></a
          >
        </nav>
        <div class="catalog-groups">
          <section
            v-for="group in demoGroups"
            :id="group.id"
            :key="group.id"
            class="catalog-group"
            :aria-labelledby="`${group.id}-heading`"
          >
            <h2 :id="`${group.id}-heading`">{{ group.title }}</h2>
            <article v-for="demo in group.pages" :key="demo.title" class="demo-card">
              <div class="demo-card__content">
                <h3>
                  <RouterLink :to="demo.route">{{ demo.title }}</RouterLink>
                </h3>
                <p>{{ demo.description }}</p>
                <details class="demo-card__details">
                  <summary>功能特色</summary>
                  <ul>
                    <li v-for="feature in demo.features" :key="feature">{{ feature }}</li>
                  </ul>
                </details>
              </div>
              <BaseBtn
                type="primary"
                @click="goDemoPage(demo.route)"
                :aria-label="`查看 ${demo.title} 示範`"
                >查看示範</BaseBtn
              >
            </article>
          </section>
        </div>
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

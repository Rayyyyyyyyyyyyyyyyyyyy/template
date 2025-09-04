<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import {
  BaseTable,
  BaseBtn,
  BaseDialog,
  BaseForm,
  SortTable,
  SearchBar,
  TransferDialog,
  TransferItem,
  FunctionHeader,
  MainPanel,
} from '@/components'
import type { TableColumn, SortChangValue } from '@/types'
import { setActiveColumn } from '@/utils/tableHelper'
import { h } from 'vue'
import draggable from 'vuedraggable'
import {
  NAVIGATION_ITEMS,
  DEMO_CONSTANTS,
  DEMO_USER_DATA,
  DEPARTMENT_OPTIONS,
  STATUS_OPTIONS,
  type User,
} from '@/const/tableConst'

// ==================== 列配置工廠函數 ====================
const createUserColumns = (): TableColumn<User>[] =>
  setActiveColumn([
    {
      prop: 'id',
      label: 'ID',
      width: 80,
      align: 'center',
      sortable: true,
    },
    {
      prop: 'name',
      label: '姓名',
      width: 120,
      align: 'left',
      sortable: true,
    },
    {
      prop: 'email',
      label: '郵箱',
      width: 200,
      align: 'left',
      sortable: true,
    },
    {
      prop: 'age',
      label: '年齡',
      width: 80,
      align: 'center',
      sortable: true,
    },
    {
      prop: 'department',
      label: '部門',
      width: 120,
      align: 'center',
      sortable: true,
    },
    {
      prop: 'salary',
      label: '薪資',
      width: 120,
      align: 'right',
      sortable: true,
      formatter: (row: User) => `$${row.salary.toLocaleString()}`,
    },
    {
      prop: 'status',
      label: '狀態',
      width: 100,
      align: 'center',
      template: (row: User) => {
        const statusConfig = DEMO_CONSTANTS.STATUS_CONFIG[row.status]
        return h('div', { class: 'flex items-center justify-center' }, [
          h('span', { class: statusConfig.class }, statusConfig.icon),
          h('span', { class: 'ml-1 text-xs text-gray-500' }, statusConfig.text),
        ])
      },
    },
    {
      prop: 'joinDate',
      label: '入職日期',
      width: 120,
      align: 'center',
      sortable: true,
      formatter: (row: User) => new Date(row.joinDate).toLocaleDateString('zh-TW'),
    },
  ])

// ==================== 響應式數據 ====================
const state = reactive({
  // 數據
  userData: [...DEMO_USER_DATA] as User[],
  userColumns: createUserColumns() as TableColumn<User>[],

  // 加載狀態
  sortTableLoading: false,

  // 選擇狀態
  selectedSortData: [] as User[],

  // 對話框狀態
  showDialog: false,
  showConfirmDialog: false,
  showTransferDialog: false,

  // 搜尋狀態
  searchKeyword: '',

  // 篩選表單
  filterForm: {
    department: '',
    status: '',
  },
})

// 側邊導航狀態
const sidebarCollapsed = ref(false)
const activeSection = ref('transfer-dialog')

// ==================== 計算屬性 ====================
// 計算篩選表單中有值的欄位數量
const filterCount = computed(() => {
  return Object.values(state.filterForm).filter(
    (value) => value !== '' && value !== null && value !== undefined,
  ).length
})

// ==================== 事件處理函數 ====================
// 處理錨點變更事件
const handleAnchorChange = (link: string) => {
  const sectionId = link.replace('#', '')
  activeSection.value = sectionId
}

// 切換側邊欄
const toggleSidebar = () => {
  sidebarCollapsed.value = true
}

// 統一的日誌處理函數
const createLogHandler =
  <T,>(prefix: string) =>
  (data: T) => {
    console.log(`${prefix}:`, data)
  }

// 排序表格事件處理
const handleSortTableSelectionChange = (selection: User[]) => {
  state.selectedSortData = selection
  console.log('選中的排序表格數據:', selection)
}

const handleSortTableCellClick = createLogHandler('點擊排序表格單元格')

const handleSortTableSortChange = (value: SortChangValue<User>) => {
  console.log('排序表格排序變更:', value)
  // 實現實際的排序邏輯
  const { prop, order } = value
  if (prop && order) {
    // 創建新的數組進行排序，避免直接修改原數據
    const sortedData = [...state.userData].sort((a, b) => {
      const aVal = a[prop]
      const bVal = b[prop]

      // 處理不同類型的值
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return order === 'ascending' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === 'ascending' ? aVal - bVal : bVal - aVal
      }

      // 處理字符串日期
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        const aDate = new Date(aVal)
        const bDate = new Date(bVal)
        if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
          return order === 'ascending'
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime()
        }
      }

      // 默認比較 - 使用類型安全的比較
      const aStr = String(aVal)
      const bStr = String(bVal)
      if (aStr < bStr) return order === 'ascending' ? -1 : 1
      if (aStr > bStr) return order === 'ascending' ? 1 : -1
      return 0
    })

    state.userData = sortedData
  }
}

// 搜尋相關事件處理
const handleSearch = (keyword: string) => {
  console.log('搜尋關鍵字:', keyword)
  state.searchKeyword = keyword
  // 這裡可以實現實際的搜尋邏輯
}

const handleSearchClear = () => {
  console.log('清除搜尋')
  state.searchKeyword = ''
  // 這裡可以重置搜尋結果
}

const handleFilterReset = () => {
  console.log('重置篩選')
  state.filterForm = {
    department: '',
    status: '',
  }
  // 這裡可以重置篩選結果
}

// TransferDialog 相關處理
const handleTransferSubmit = (columns: TableColumn<User>[]) => {
  console.log('TransferDialog 提交的列配置:', columns)
  // 更新用戶表格的列配置
  state.userColumns.splice(0, state.userColumns.length, ...columns)
  state.showTransferDialog = false
}

// 重置用戶表格列配置
const resetUserColumns = () => {
  state.userColumns.splice(0, state.userColumns.length, ...createUserColumns())
}

// 模擬加載
const simulateLoading = () => {
  state.sortTableLoading = true

  setTimeout(() => {
    state.sortTableLoading = false
  }, DEMO_CONSTANTS.LOADING_DURATION)
}
</script>

<template>
  <!-- Main Content -->
  <MainPanel title="組件示範" :show-back="false">
    <template #main>
      <!-- TransferDialog 示範 -->
      <section class="mb-12">
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="px-8 py-6 border-b border-gray-100">
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">TransferDialog 示範</h2>
            <p class="text-gray-600 text-base leading-relaxed">展示 TransferDialog 組件的表格列配置功能</p>
          </div>
          <div class="p-8">
            <div class="flex items-center gap-3 mb-8">
              <BaseBtn type="primary" @click="state.showTransferDialog = true" class="px-6 py-2.5">
                配置用戶表格列
              </BaseBtn>
              <BaseBtn type="default" @click="resetUserColumns" class="px-6 py-2.5">
                重置列配置
              </BaseBtn>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h4 class="text-lg font-medium text-blue-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                TransferDialog 功能特色
              </h4>
              <ul class="space-y-2 text-blue-800">
                <li class="flex items-start">
                  <span class="text-blue-600 mr-2 mt-0.5">•</span>
                  <span><strong>拖拽排序：</strong>支持拖拽調整列順序</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-600 mr-2 mt-0.5">•</span>
                  <span><strong>批量選擇：</strong>支持全選/取消全選列</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-600 mr-2 mt-0.5">•</span>
                  <span><strong>搜尋過濾：</strong>支持按列名搜尋快速定位</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-600 mr-2 mt-0.5">•</span>
                  <span><strong>位置調整：</strong>支持上移、下移、置頂、置底操作</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-600 mr-2 mt-0.5">•</span>
                  <span><strong>即時預覽：</strong>配置變更即時反映到表格</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-600 mr-2 mt-0.5">•</span>
                  <span><strong>狀態保持：</strong>記住列的顯示/隱藏狀態</span>
                </li>
              </ul>
            </div>

            <div class="bg-gray-50 rounded-lg p-6 mb-8">
              <h4 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                使用說明
              </h4>
              <ol class="space-y-2 text-gray-700">
                <li class="flex items-start">
                  <span class="bg-gray-200 text-gray-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                  <span>點擊「配置用戶表格列」按鈕打開配置對話框</span>
                </li>
                <li class="flex items-start">
                  <span class="bg-gray-200 text-gray-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                  <span>使用搜尋框快速找到需要配置的列</span>
                </li>
                <li class="flex items-start">
                  <span class="bg-gray-200 text-gray-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                  <span>勾選/取消勾選來控制列的顯示/隱藏</span>
                </li>
                <li class="flex items-start">
                  <span class="bg-gray-200 text-gray-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                  <span><strong>拖拽列項目</strong>或使用方向按鈕調整列順序</span>
                </li>
                <li class="flex items-start">
                  <span class="bg-gray-200 text-gray-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">5</span>
                  <span>點擊「確定」保存配置，或點擊「重置列配置」恢復預設</span>
                </li>
              </ol>
            </div>

            <div class="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
              <h5 class="text-base font-medium text-amber-900 mb-2 flex items-center">
                <svg class="w-4 h-4 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                技術說明
              </h5>
              <p class="text-amber-800 text-sm leading-relaxed">
                TransferDialog 組件已移除 draggable 依賴，通過 slot 機制讓外部使用者可以自定義列表容器。
                本示範頁面使用 vuedraggable 實現拖拽功能，您也可以選擇不使用拖拽或使用其他拖拽庫。
              </p>
            </div>

            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <BaseTable
                :data="state.userData"
                :columns="state.userColumns.filter((item) => item.checkActive)"
                :loading="state.sortTableLoading"
                :show-selection="false"
                :show-over-flow-tooltip="true"
              />
            </div>

            <TransferDialog
              v-model="state.showTransferDialog"
              :columns-value="state.userColumns"
              transfer-title="配置用戶表格列"
              @update:submit="handleTransferSubmit"
            >
              <template
                #list-container="{ columns, clickItemProp, handleItemEvents, handleMousedown }"
              >
                <draggable :list="columns" item-key="prop" delay="200">
                  <template #item="{ element, index }">
                    <transfer-item
                      :dialog-modal-visible="state.showTransferDialog"
                      :columns-value="element"
                      :columns-index="index"
                      :columns-len="columns.length"
                      :class="{
                        'transfer-active-bg': element.checkActive,
                        'transfer-active-border': clickItemProp === element.prop,
                      }"
                      @mousedown="handleMousedown(element.prop)"
                      @update:toTop="handleItemEvents.toTop(index)"
                      @update:toBottom="handleItemEvents.toBottom(index)"
                      @update:toPre="handleItemEvents.toPre(index)"
                      @update:toNext="handleItemEvents.toNext(index)"
                    />
                  </template>
                </draggable>
              </template>
            </TransferDialog>
          </div>
        </div>
      </section>

      <!-- 排序表格示範 -->
      <section id="sort-table-demo" class="mb-12">
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="px-8 py-6 border-b border-gray-100">
            <div class="flex items-center justify-between mb-2">
              <h2 class="text-2xl font-semibold text-gray-900">排序表格示範</h2>
              <BaseBtn type="primary" @click="simulateLoading" class="px-6 py-2.5">
                模擬加載
              </BaseBtn>
            </div>
            <p class="text-gray-600 text-base leading-relaxed">
              展示 SortTable 組件的排序功能
              <span v-if="state.selectedSortData.length > 0" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2">
                已選擇 {{ state.selectedSortData.length }} 項
              </span>
            </p>
          </div>
          <div class="p-8">
            <SortTable
              :data="state.userData"
              :columns="state.userColumns"
              :loading="state.sortTableLoading"
              :show-selection="true"
              :show-over-flow-tooltip="true"
              @selection-change="handleSortTableSelectionChange"
              @click:columnSort="handleSortTableSortChange"
              @click:cell="handleSortTableCellClick"
            />
          </div>
        </div>
      </section>

      <!-- 搜尋欄示範 -->
      <section id="search-bar-demo" class="mb-12">
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="px-8 py-6 border-b border-gray-100">
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">搜尋欄示範</h2>
            <p class="text-gray-600 text-base leading-relaxed">展示 SearchBar 組件的搜尋和篩選功能</p>
          </div>
          <div class="p-8">
            <div class="space-y-8">
              <!-- 帶篩選的搜尋欄 -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">搜尋 + 篩選功能</h3>
                <SearchBar
                  :show-search="true"
                  :show-filter="true"
                  :badge-value="filterCount"
                  @keydown:enter="handleSearch"
                  @update:clear="handleSearchClear"
                  @update:resetFilter="handleFilterReset"
                >
                  <template #button>
                    <BaseBtn type="primary" size="small" class="px-4 py-2 mr-2"> 新增</BaseBtn>
                    <BaseBtn type="success" size="small" class="px-4 py-2"> 匯出</BaseBtn>
                  </template>
                  <template #filterBody>
                    <BaseForm
                      v-model="state.filterForm"
                      class="space-y-4"
                      label-width="60px"
                    >
                      <el-form-item label="部門">
                        <el-select
                          v-model="state.filterForm.department"
                          placeholder="全部"
                          clearable
                          class="w-full"
                        >
                          <el-option
                            v-for="option in DEPARTMENT_OPTIONS"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item label="狀態">
                        <el-select v-model="state.filterForm.status" placeholder="全部" clearable class="w-full">
                          <el-option
                            v-for="option in STATUS_OPTIONS"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value"
                          />
                        </el-select>
                      </el-form-item>
                    </BaseForm>
                  </template>
                </SearchBar>
              </div>
            </div>

            <div class="mt-8 bg-gray-50 rounded-lg p-6">
              <h4 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                功能說明
              </h4>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start">
                  <span class="text-gray-600 mr-2 mt-0.5">•</span>
                  <span>支持關鍵字搜尋（按 Enter 鍵觸發）</span>
                </li>
                <li class="flex items-start">
                  <span class="text-gray-600 mr-2 mt-0.5">•</span>
                  <span>支持清除搜尋內容</span>
                </li>
                <li class="flex items-start">
                  <span class="text-gray-600 mr-2 mt-0.5">•</span>
                  <span>可選的篩選功能（帶徽章顯示）</span>
                </li>
                <li class="flex items-start">
                  <span class="text-gray-600 mr-2 mt-0.5">•</span>
                  <span>自定義按鈕區域</span>
                </li>
                <li class="flex items-start">
                  <span class="text-gray-600 mr-2 mt-0.5">•</span>
                  <span>響應式設計，支持全寬模式</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 按鈕和對話框示範 -->
      <section id="buttons-dialogs-demo" class="mb-12">
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="px-8 py-6 border-b border-gray-100">
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">按鈕和對話框示範</h2>
            <p class="text-gray-600 text-base leading-relaxed">展示 BaseBtn 和 BaseDialog 組件的使用</p>
          </div>
          <div class="p-8">
            <div class="flex flex-wrap items-center gap-4">
              <BaseBtn type="primary" @click="state.showDialog = true" class="px-6 py-2.5">
                打開對話框
              </BaseBtn>
              <BaseBtn type="success" @click="state.showConfirmDialog = true" class="px-6 py-2.5">
                確認對話框
              </BaseBtn>
              <BaseBtn type="warning" loading class="px-6 py-2.5">
                加載中
              </BaseBtn>
              <BaseBtn type="danger" disabled class="px-6 py-2.5">
                禁用按鈕
              </BaseBtn>
              <BaseBtn type="default" plain class="px-6 py-2.5">
                樸素按鈕
              </BaseBtn>
              <BaseBtn type="primary" is-fill class="px-6 py-2.5">
                填充按鈕
              </BaseBtn>
            </div>
          </div>
        </div>
      </section>
    </template>
  </MainPanel>

  <!-- 對話框 -->
  <BaseDialog v-model="state.showDialog" title="示範對話框" sub-title="這是一個示範對話框">
    <div class="space-y-6">
      <p class="text-gray-700 leading-relaxed">這是一個 BaseDialog 組件的示範，展示了對話框的基本功能。</p>
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 class="text-base font-medium text-blue-900 mb-3">功能特色：</h4>
        <ul class="space-y-2 text-blue-800">
          <li class="flex items-start">
            <span class="text-blue-600 mr-2 mt-0.5">•</span>
            <span>響應式寬度設計</span>
          </li>
          <li class="flex items-start">
            <span class="text-blue-600 mr-2 mt-0.5">•</span>
            <span>自定義標題和副標題</span>
          </li>
          <li class="flex items-start">
            <span class="text-blue-600 mr-2 mt-0.5">•</span>
            <span>加載狀態支持</span>
          </li>
          <li class="flex items-start">
            <span class="text-blue-600 mr-2 mt-0.5">•</span>
            <span>自定義按鈕</span>
          </li>
        </ul>
      </div>
    </div>
  </BaseDialog>

  <BaseDialog
    v-model="state.showConfirmDialog"
    title="確認操作"
    is-waring
    :submit-loading="false"
    @click:submit="state.showConfirmDialog = false"
  >
    <p class="text-gray-700 leading-relaxed">您確定要執行此操作嗎？此操作無法撤銷。</p>
  </BaseDialog>
</template>

<style scoped></style>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import {
  BaseTable,
  BaseBtn,
  BaseDialog,
  BaseForm,
  SortTable,
  SearchBar,
  TransferDialog,
  TransferItem,
} from '@/components'
import type { TableColumn, SortChangValue } from '@/types'
import { setActiveColumn } from '@/utils/tableHelper'
import { h } from 'vue'
import draggable from 'vuedraggable'
import { layoutStore } from '@/stores/layoutStore.ts'

// ==================== 類型定義 ====================
interface User extends Record<string, unknown> {
  id: number
  name: string
  email: string
  age: number
  department: string
  salary: number
  status: 'active' | 'inactive' | 'pending'
  joinDate: string
}

interface Product extends Record<string, unknown> {
  id: number
  name: string
  category: string
  price: number
  stock: number
  rating: number
  isAvailable: boolean
}

// ==================== 常量定義 ====================
const DEMO_CONSTANTS = {
  LOADING_DURATION: 2000,
  DEFAULT_FILTER_COUNT: 3,
  STATUS_CONFIG: {
    active: { icon: '●', text: '啟用', class: 'text-green-500 text-lg' },
    inactive: { icon: '●', text: '停用', class: 'text-red-500 text-lg' },
    pending: { icon: '○', text: '待處理', class: 'text-yellow-500 text-lg' },
  },
} as const

// ==================== 測試數據 ====================
const DEMO_USER_DATA: User[] = [
  {
    id: 1,
    name: '張小明',
    email: 'zhang@example.com',
    age: 28,
    department: '工程部',
    salary: 45000,
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: '李小華',
    email: 'li@example.com',
    age: 32,
    department: '設計部',
    salary: 52000,
    status: 'active',
    joinDate: '2022-08-20',
  },
  {
    id: 3,
    name: '王小美',
    email: 'wang@example.com',
    age: 25,
    department: '行銷部',
    salary: 38000,
    status: 'pending',
    joinDate: '2024-03-10',
  },
  {
    id: 4,
    name: '陳大強',
    email: 'chen@example.com',
    age: 35,
    department: '工程部',
    salary: 60000,
    status: 'active',
    joinDate: '2021-12-01',
  },
  {
    id: 5,
    name: '林小芳',
    email: 'lin@example.com',
    age: 29,
    department: '設計部',
    salary: 48000,
    status: 'inactive',
    joinDate: '2023-06-15',
  },
]

const DEMO_PRODUCT_DATA: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro',
    category: '筆記型電腦',
    price: 45000,
    stock: 15,
    rating: 4.8,
    isAvailable: true,
  },
  {
    id: 2,
    name: 'iPhone 15',
    category: '手機',
    price: 28000,
    stock: 8,
    rating: 4.6,
    isAvailable: true,
  },
  {
    id: 3,
    name: 'AirPods Pro',
    category: '耳機',
    price: 6500,
    stock: 0,
    rating: 4.7,
    isAvailable: false,
  },
  {
    id: 4,
    name: 'iPad Air',
    category: '平板',
    price: 18000,
    stock: 12,
    rating: 4.5,
    isAvailable: true,
  },
  {
    id: 5,
    name: 'Apple Watch',
    category: '智慧手錶',
    price: 12000,
    stock: 5,
    rating: 4.4,
    isAvailable: true,
  },
]

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

const createProductColumns = (): TableColumn<Product>[] => [
  {
    prop: 'id',
    label: 'ID',
    width: 80,
    align: 'center',
    sortable: true,
  },
  {
    prop: 'name',
    label: '產品名稱',
    width: 150,
    align: 'left',
    sortable: true,
  },
  {
    prop: 'category',
    label: '分類',
    width: 120,
    align: 'center',
    sortable: true,
  },
  {
    prop: 'price',
    label: '價格',
    width: 120,
    align: 'right',
    sortable: true,
    formatter: (row: Product) => `$${row.price.toLocaleString()}`,
  },
  {
    prop: 'stock',
    label: '庫存',
    width: 100,
    align: 'center',
    sortable: true,
    template: (row: Product) =>
      h(
        'span',
        {
          class: row.stock > 0 ? 'text-green-600' : 'text-red-600 font-bold',
        },
        row.stock,
      ),
  },
  {
    prop: 'rating',
    label: '評分',
    width: 100,
    align: 'center',
    sortable: true,
    template: (row: Product) =>
      h(
        'div',
        {
          class: 'flex items-center justify-center',
        },
        [
          h('span', { class: 'text-yellow-500' }, '★'),
          h('span', { class: 'ml-1' }, row.rating.toFixed(1)),
        ],
      ),
  },
  {
    prop: 'isAvailable',
    label: '可購買',
    width: 100,
    align: 'center',
    template: (row: Product) =>
      h(
        'span',
        {
          class: row.isAvailable ? 'text-green-600' : 'text-red-600',
        },
        row.isAvailable ? '是' : '否',
      ),
  },
]

// ==================== 響應式數據 ====================
const state = reactive({
  // 數據
  userData: DEMO_USER_DATA as User[],
  productData: DEMO_PRODUCT_DATA as Product[],
  userColumns: createUserColumns() as TableColumn<User>[],
  productColumns: createProductColumns() as TableColumn<Product>[],

  // 加載狀態
  sortTableLoading: false,

  // 選擇狀態
  selectedUsers: [] as User[],
  selectedProducts: [] as Product[],
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

// ==================== 計算屬性 ====================
// 計算篩選表單中有值的欄位數量
const filterCount = computed(() => {
  return Object.values(state.filterForm).filter(
    (value) => value !== '' && value !== null && value !== undefined,
  ).length
})

// ==================== 事件處理函數 ====================
// 統一的日誌處理函數
const createLogHandler = (prefix: string) => (data: any) => {
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
    state.userData.sort((a, b) => {
      const aVal = a[prop] as string | number
      const bVal = b[prop] as string | number
      if (order === 'ascending') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })
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

watch(
  () => layoutStore.doResetFilter,
  (val) => {
    if (val) {
      state.filterForm = {
        department: '',
        status: '',
      }
    }
  },
)
</script>

<template>
  <div class="min-h-screen bg-navy-10">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">BaseTable 組件示範</h1>
            <p class="mt-2 text-gray-600">展示 Vue 3 + Element Plus 表格組件的各種功能</p>
          </div>
          <BaseBtn
            type="success"
            tag="a"
            href="https://www.npmjs.com/package/rayyy-vue-table-components"
            target="_blank"
          >
            查看 NPM
          </BaseBtn>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- TransferDialog 示範 -->
      <section class="mb-12">
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b">
            <h2 class="text-xl font-semibold text-gray-900">TransferDialog 示範</h2>
            <p class="mt-1 text-gray-600">展示 TransferDialog 組件的表格列配置功能</p>
          </div>
          <div class="p-6">
            <div class="flex flex-wrap gap-4 mb-6">
              <BaseBtn type="primary" @click="state.showTransferDialog = true">
                配置用戶表格列
              </BaseBtn>
              <BaseBtn type="default" @click="resetUserColumns"> 重置列配置</BaseBtn>
            </div>

            <div class="bg-navy-10 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">TransferDialog 功能特色：</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• <strong>拖拽排序：</strong>支持拖拽調整列順序</li>
                <li>• <strong>批量選擇：</strong>支持全選/取消全選列</li>
                <li>• <strong>搜尋過濾：</strong>支持按列名搜尋快速定位</li>
                <li>• <strong>位置調整：</strong>支持上移、下移、置頂、置底操作</li>
                <li>• <strong>即時預覽：</strong>配置變更即時反映到表格</li>
                <li>• <strong>狀態保持：</strong>記住列的顯示/隱藏狀態</li>
              </ul>
            </div>
            <div class="my-6">
              <BaseTable
                :data="state.userData"
                :columns="state.userColumns.filter((item) => item.checkActive)"
                :loading="state.sortTableLoading"
                :show-selection="false"
                :show-over-flow-tooltip="true"
              />
            </div>

            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 class="font-semibold text-yellow-800 mb-2">使用說明：</h4>
              <ol class="text-sm text-yellow-700 space-y-1">
                <li>1. 點擊「配置用戶表格列」按鈕打開配置對話框</li>
                <li>2. 使用搜尋框快速找到需要配置的列</li>
                <li>3. 勾選/取消勾選來控制列的顯示/隱藏</li>
                <li>4. <strong>拖拽列項目</strong>或使用方向按鈕調整列順序</li>
                <li>5. 點擊「確定」保存配置，或點擊「重置列配置」恢復預設</li>
              </ol>
              <div class="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                <h5 class="font-medium text-blue-800 mb-1">💡 技術說明：</h5>
                <p class="text-xs text-blue-700">
                  TransferDialog 組件已移除 draggable 依賴，通過 slot
                  機制讓外部使用者可以自定義列表容器。 本示範頁面使用 vuedraggable
                  實現拖拽功能，您也可以選擇不使用拖拽或使用其他拖拽庫。
                </p>
              </div>
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
      <section class="mb-12">
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b">
            <div class="flex gap-x-4">
              <h2 class="text-xl font-semibold text-gray-900">排序表格示範</h2>
              <BaseBtn type="primary" @click="simulateLoading"> 模擬加載 </BaseBtn>
            </div>
            <p class="mt-1 text-gray-600">
              展示 SortTable 組件的排序功能
              <span v-if="state.selectedSortData.length > 0" class="ml-2 text-primary">
                (已選擇 {{ state.selectedSortData.length }} 項)
              </span>
            </p>
          </div>
          <div class="p-6">
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
      <section class="mb-12">
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b">
            <h2 class="text-xl font-semibold text-gray-900">搜尋欄示範</h2>
            <p class="mt-1 text-gray-600">展示 SearchBar 組件的搜尋和篩選功能</p>
          </div>
          <div class="p-6">
            <div class="space-y-6">
              <!-- 帶篩選的搜尋欄 -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-3">搜尋 + 篩選功能</h3>
                <SearchBar
                  :show-search="true"
                  :show-filter="true"
                  :badge-value="filterCount"
                  @keydown:enter="handleSearch"
                  @update:clear="handleSearchClear"
                >
                  <template #button>
                    <BaseBtn type="primary" size="small" class="mr-2"> 新增</BaseBtn>
                    <BaseBtn type="success" size="small"> 匯出</BaseBtn>
                  </template>
                  <template #filterBody>
                    <BaseForm v-model="state.filterForm" class="p-4" label-width="60px">
                      <el-form-item label="部門">
                        <el-select
                          v-model="state.filterForm.department"
                          placeholder="全部"
                          clearable
                        >
                          <el-option label="全部" value="" />
                          <el-option label="工程部" value="engineering" />
                          <el-option label="設計部" value="design" />
                          <el-option label="行銷部" value="marketing" />
                        </el-select>
                      </el-form-item>
                      <el-form-item label="狀態">
                        <el-select v-model="state.filterForm.status" placeholder="全部" clearable>
                          <el-option label="全部" value="" />
                          <el-option label="啟用" value="active" />
                          <el-option label="停用" value="inactive" />
                          <el-option label="待處理" value="pending" />
                        </el-select>
                      </el-form-item>
                    </BaseForm>
                  </template>
                </SearchBar>
              </div>
            </div>

            <div class="mt-6 p-4 bg-navy-10 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">功能說明：</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• 支持關鍵字搜尋（按 Enter 鍵觸發）</li>
                <li>• 支持清除搜尋內容</li>
                <li>• 可選的篩選功能（帶徽章顯示）</li>
                <li>• 自定義按鈕區域</li>
                <li>• 響應式設計，支持全寬模式</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 按鈕和對話框示範 -->
      <section class="mb-12">
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b">
            <h2 class="text-xl font-semibold text-gray-900">按鈕和對話框示範</h2>
            <p class="mt-1 text-gray-600">展示 BaseBtn 和 BaseDialog 組件的使用</p>
          </div>
          <div class="p-6">
            <div class="flex flex-wrap gap-4 mb-6">
              <BaseBtn type="primary" @click="state.showDialog = true"> 打開對話框</BaseBtn>
              <BaseBtn type="success" @click="state.showConfirmDialog = true"> 確認對話框</BaseBtn>
              <BaseBtn type="warning" loading> 加載中</BaseBtn>
              <BaseBtn type="danger" disabled> 禁用按鈕</BaseBtn>
              <BaseBtn type="default" plain> 樸素按鈕</BaseBtn>
              <BaseBtn type="primary" is-fill> 填充按鈕</BaseBtn>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 對話框 -->
    <BaseDialog v-model="state.showDialog" title="示範對話框" sub-title="這是一個示範對話框">
      <div class="space-y-4">
        <p class="text-gray-600">這是一個 BaseDialog 組件的示範，展示了對話框的基本功能。</p>
        <div class="bg-navy-10 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">功能特色：</h4>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• 響應式寬度設計</li>
            <li>• 自定義標題和副標題</li>
            <li>• 加載狀態支持</li>
            <li>• 自定義按鈕</li>
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
      <p class="text-gray-600">您確定要執行此操作嗎？此操作無法撤銷。</p>
    </BaseDialog>
  </div>
</template>

<style scoped>
/* 自定義樣式 */
.data-table-container {
  @apply w-full;
}

/* 確保表格在容器中正確顯示 */
:deep(.el-table) {
  @apply w-full;
}

/* 自定義表格樣式 */
:deep(.el-table th) {
  @apply bg-navy-10 text-gray-700 font-semibold;
}

:deep(.el-table td) {
  @apply text-gray-800;
}

:deep(.el-table--striped .el-table__body tr.el-table__row--striped td) {
  @apply bg-navy-10;
}

:deep(.el-table__body tr:hover > td) {
  @apply bg-primary-20;
}
</style>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { BaseTable, BaseBtn, BaseDialog, SortTable, SearchBar, TransferDialog } from '@/components'
import type { TableColumn, SortChangValue } from '@/types'
import { h } from 'vue'
import _ from 'lodash'
import { setActiveColumn } from '@/utils/tableHelper.ts'

// 定義數據類型
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

// 用戶數據
const userData = ref<User[]>([
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
])

// 用戶表格列配置
const userColumns: TableColumn<User>[] = [
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
    template: (row: User) =>
      h(
        'div',
        {
          class: 'flex items-center justify-center',
        },
        [
          h(
            'span',
            {
              class: {
                'text-green-500 text-lg': row.status === 'active',
                'text-red-500 text-lg': row.status === 'inactive',
                'text-yellow-500 text-lg': row.status === 'pending',
              },
            },
            {
              active: '●',
              inactive: '●',
              pending: '○',
            }[row.status],
          ),
          h(
            'span',
            {
              class: 'ml-1 text-xs text-gray-500',
            },
            {
              active: '啟用',
              inactive: '停用',
              pending: '待處理',
            }[row.status],
          ),
        ],
      ),
  },
  {
    prop: 'joinDate',
    label: '入職日期',
    width: 120,
    align: 'center',
    sortable: true,
    formatter: (row: User) => new Date(row.joinDate).toLocaleDateString('zh-TW'),
  },
]
let tableColumns = reactive<TableColumn<User>[]>(setActiveColumn(userColumns))

// 狀態管理
const state = reactive({
  userLoading: false,
  productLoading: false,
  sortTableLoading: false,
  selectedUsers: [] as User[],
  selectedProducts: [] as Product[],
  selectedSortData: [] as User[],
  showDialog: false,
  showConfirmDialog: false,
  searchKeyword: '',
  filterForm: {
    department: '',
    status: '',
  },
  showTransferDialog: false,
})

// 事件處理
const handleUserSortChange = (value: SortChangValue<User>) => {
  console.log('用戶表格排序變更:', value)
}

const handleUserSelectionChange = (selection: User[]) => {
  state.selectedUsers = selection
  console.log('選中的用戶:', selection)
}

const handleUserCellClick = (column: TableColumn<User>, row: User) => {
  console.log('點擊用戶單元格:', column.label, row)
}

const handleSortTableSelectionChange = (selection: User[]) => {
  state.selectedSortData = selection
  console.log('選中的排序表格數據:', selection)
}

const handleSortTableCellClick = (column: TableColumn<User>, row: User) => {
  console.log('點擊排序表格單元格:', column.label, row)
}

const handleSortTableSortChange = (value: SortChangValue<User>) => {
  console.log('排序表格排序變更:', value)
  // 這裡可以實現實際的排序邏輯
  const { prop, order } = value
  if (prop && order) {
    userData.value.sort((a, b) => {
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

const handleSearch = (keyword: string) => {
  console.log('搜尋關鍵字:', keyword)
  state.searchKeyword = keyword
  // 這裡可以實現實際的搜尋邏輯
  // 例如過濾表格數據
}

const handleSearchClear = () => {
  console.log('清除搜尋')
  state.searchKeyword = ''
  // 這裡可以重置搜尋結果
}

const handleTransferSubmit = (columns: TableColumn<User>[]) => {
  tableColumns = [...columns]
  state.showTransferDialog = false
}

// 計算篩選條件數量
const filterCount = computed(() => {
  return Object.values(state.filterForm).filter((value) => value !== '').length
})

// 模擬加載
const simulateLoading = () => {
  state.userLoading = true
  state.productLoading = true

  setTimeout(() => {
    state.userLoading = false
    state.productLoading = false
  }, 2000)
}
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
          <div class="flex space-x-4">
            <button
              @click="simulateLoading"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              模擬加載
            </button>
            <a
              href="https://www.npmjs.com/package/rayyy-vue-table-components"
              target="_blank"
              class="px-4 py-2 bg-green text-white rounded-lg hover:bg-green-dark transition-colors"
            >
              查看 NPM
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 用戶表格示範 -->
      <section class="mb-12">
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b">
            <h2 class="text-xl font-semibold text-gray-900">用戶管理表格</h2>
            <p class="mt-1 text-gray-600">
              展示選擇列、排序、自定義模板等功能
              <span v-if="state.selectedUsers.length > 0" class="ml-2 text-primary">
                (已選擇 {{ state.selectedUsers.length }} 項)
              </span>
            </p>
          </div>
          <div class="p-6">
            <BaseTable
              :data="userData"
              :columns="userColumns"
              :loading="state.userLoading"
              :show-selection="true"
              :show-over-flow-tooltip="true"
              @selection-change="handleUserSelectionChange"
              @column-sort-change="handleUserSortChange"
              @cell-click="handleUserCellClick"
            />
          </div>
        </div>
      </section>

      <!-- 排序表格示範 -->
      <section class="mb-12">
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b">
            <h2 class="text-xl font-semibold text-gray-900">排序表格示範</h2>
            <p class="mt-1 text-gray-600">
              展示 SortTable 組件的排序功能
              <span v-if="state.selectedSortData.length > 0" class="ml-2 text-primary">
                (已選擇 {{ state.selectedSortData.length }} 項)
              </span>
            </p>
          </div>
          <div class="p-6">
            <SortTable
              :data="userData"
              :columns="tableColumns.filter((item) => item.checkActive)"
              :loading="state.sortTableLoading"
              :show-selection="true"
              :show-over-flow-tooltip="true"
              @open:transfer="state.showTransferDialog = true"
              @update:selectRow="handleSortTableSelectionChange"
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
              <!-- 基本搜尋欄 -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-3">基本搜尋功能</h3>
                <SearchBar
                  :show-search="true"
                  :show-filter="false"
                  @keydown:enter="handleSearch"
                  @update:clear="handleSearchClear"
                />
              </div>

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
                    <BaseBtn type="primary" size="small" class="mr-2"> 新增 </BaseBtn>
                    <BaseBtn type="success" size="small"> 匯出 </BaseBtn>
                  </template>
                  <template #filterBody>
                    <el-form :model="state.filterForm" label-width="60px" class="p-4">
                      <el-form-item label="部門">
                        <el-select
                          v-model="state.filterForm.department"
                          placeholder="請選擇部門"
                          class="w-full"
                        >
                          <el-option label="全部" value="" />
                          <el-option label="工程部" value="engineering" />
                          <el-option label="設計部" value="design" />
                          <el-option label="行銷部" value="marketing" />
                        </el-select>
                      </el-form-item>
                      <el-form-item label="狀態">
                        <el-select
                          v-model="state.filterForm.status"
                          placeholder="請選擇狀態"
                          class="w-full"
                        >
                          <el-option label="全部" value="" />
                          <el-option label="啟用" value="active" />
                          <el-option label="停用" value="inactive" />
                          <el-option label="待處理" value="pending" />
                        </el-select>
                      </el-form-item>
                    </el-form>
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
              <BaseBtn type="primary" @click="state.showDialog = true"> 打開對話框 </BaseBtn>
              <BaseBtn type="success" @click="state.showConfirmDialog = true"> 確認對話框 </BaseBtn>
              <BaseBtn type="danger" disabled> 禁用按鈕 </BaseBtn>
              <BaseBtn type="default" plain> 樸素按鈕 </BaseBtn>
              <BaseBtn type="primary" is-fill> 填充按鈕 </BaseBtn>
            </div>
          </div>
        </div>
      </section>

      <!-- 功能說明 -->
      <section class="bg-white rounded-lg shadow-sm border p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">功能特色</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-2">🚀 高性能</h3>
            <p class="text-gray-600 text-sm">基於 Vue 3 Composition API，支持虛擬滾動和懶加載</p>
          </div>
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-2">🎨 高度自定義</h3>
            <p class="text-gray-600 text-sm">支持自定義模板、格式化函數、樣式定制</p>
          </div>
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-2">📱 響應式設計</h3>
            <p class="text-gray-600 text-sm">適配各種螢幕尺寸，移動端友好</p>
          </div>
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-2">🔧 TypeScript 支持</h3>
            <p class="text-gray-600 text-sm">完整的類型定義，開發體驗更佳</p>
          </div>
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-2">⚡ 豐富功能</h3>
            <p class="text-gray-600 text-sm">排序、選擇、分頁、篩選等功能一應俱全</p>
          </div>
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-2">🎯 易於使用</h3>
            <p class="text-gray-600 text-sm">簡潔的 API 設計，快速上手</p>
          </div>
        </div>
      </section>

      <!-- 使用說明 -->
      <section class="bg-white rounded-lg shadow-sm border p-6 mt-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">快速開始</h2>
        <div class="bg-navy-10 rounded-lg p-4">
          <pre class="text-sm text-gray-800"><code># 安裝
npm install rayyy-vue-table-components

# 使用
import { BaseTable } from 'rayyy-vue-table-components'
import 'rayyy-vue-table-components/dist/rayyy-vue-table-components.css'

# 配置
const columns = [
  { prop: 'name', label: '姓名', sortable: true },
  { prop: 'age', label: '年齡', align: 'center' }
]

const data = [
  { name: '張三', age: 25 },
  { name: '李四', age: 30 }
]</code></pre>
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

    <TransferDialog
      :model-value="state.showTransferDialog"
      :columns-value="tableColumns"
      transfer-title="列配置管理"
      @update:model-value="state.showTransferDialog = $event"
      @update:submit="handleTransferSubmit"
    />
  </div>
</template>

<style scoped></style>

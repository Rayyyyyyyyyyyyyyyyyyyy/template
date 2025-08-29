<script setup lang="ts">
import { ref, reactive } from 'vue'
import { BaseTable, BaseBtn, BaseDialog, SortTable, SearchBar } from '@/components'
import TransferDialog from '@/components/transfer/TransferDialog.vue'
import type { TableColumn, SortChangValue } from '@/types'
import { setActiveColumn } from '@/utils/tableHelper'
import { h } from 'vue'

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
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: '李小華',
    email: 'li@example.com',
    age: 32,
    department: '設計部',
    salary: 52000,
    status: 'active',
    joinDate: '2022-08-20'
  },
  {
    id: 3,
    name: '王小美',
    email: 'wang@example.com',
    age: 25,
    department: '行銷部',
    salary: 38000,
    status: 'pending',
    joinDate: '2024-03-10'
  },
  {
    id: 4,
    name: '陳大強',
    email: 'chen@example.com',
    age: 35,
    department: '工程部',
    salary: 60000,
    status: 'active',
    joinDate: '2021-12-01'
  },
  {
    id: 5,
    name: '林小芳',
    email: 'lin@example.com',
    age: 29,
    department: '設計部',
    salary: 48000,
    status: 'inactive',
    joinDate: '2023-06-15'
  }
])

// 產品數據
const productData = ref<Product[]>([
  {
    id: 1,
    name: 'MacBook Pro',
    category: '筆記型電腦',
    price: 45000,
    stock: 15,
    rating: 4.8,
    isAvailable: true
  },
  {
    id: 2,
    name: 'iPhone 15',
    category: '手機',
    price: 28000,
    stock: 8,
    rating: 4.6,
    isAvailable: true
  },
  {
    id: 3,
    name: 'AirPods Pro',
    category: '耳機',
    price: 6500,
    stock: 0,
    rating: 4.7,
    isAvailable: false
  },
  {
    id: 4,
    name: 'iPad Air',
    category: '平板',
    price: 18000,
    stock: 12,
    rating: 4.5,
    isAvailable: true
  },
  {
    id: 5,
    name: 'Apple Watch',
    category: '智慧手錶',
    price: 12000,
    stock: 5,
    rating: 4.4,
    isAvailable: true
  }
])

// 用戶表格列配置
const userColumns: TableColumn<User>[] = setActiveColumn([
  {
    prop: 'id',
    label: 'ID',
    width: 80,
    align: 'center',
    sortable: true
  },
  {
    prop: 'name',
    label: '姓名',
    width: 120,
    align: 'left',
    sortable: true
  },
  {
    prop: 'email',
    label: '郵箱',
    width: 200,
    align: 'left',
    sortable: true
  },
  {
    prop: 'age',
    label: '年齡',
    width: 80,
    align: 'center',
    sortable: true
  },
  {
    prop: 'department',
    label: '部門',
    width: 120,
    align: 'center',
    sortable: true
  },
  {
    prop: 'salary',
    label: '薪資',
    width: 120,
    align: 'right',
    sortable: true,
    formatter: (row: User) => `$${row.salary.toLocaleString()}`
  },
  {
    prop: 'status',
    label: '狀態',
    width: 100,
    align: 'center',
    template: (row: User) => h('div', {
      class: 'flex items-center justify-center'
    }, [
      h('span', {
        class: {
          'text-green-500 text-lg': row.status === 'active',
          'text-red-500 text-lg': row.status === 'inactive',
          'text-yellow-500 text-lg': row.status === 'pending'
        }
      }, {
        active: '●',
        inactive: '●',
        pending: '○'
      }[row.status]),
      h('span', {
        class: 'ml-1 text-xs text-gray-500'
      }, {
        active: '啟用',
        inactive: '停用',
        pending: '待處理'
      }[row.status])
    ])
  },
  {
    prop: 'joinDate',
    label: '入職日期',
    width: 120,
    align: 'center',
    sortable: true,
    formatter: (row: User) => new Date(row.joinDate).toLocaleDateString('zh-TW')
  }
])

// 產品表格列配置
const productColumns: TableColumn<Product>[] = [
  {
    prop: 'id',
    label: 'ID',
    width: 80,
    align: 'center',
    sortable: true
  },
  {
    prop: 'name',
    label: '產品名稱',
    width: 150,
    align: 'left',
    sortable: true
  },
  {
    prop: 'category',
    label: '分類',
    width: 120,
    align: 'center',
    sortable: true
  },
  {
    prop: 'price',
    label: '價格',
    width: 120,
    align: 'right',
    sortable: true,
    formatter: (row: Product) => `$${row.price.toLocaleString()}`
  },
  {
    prop: 'stock',
    label: '庫存',
    width: 100,
    align: 'center',
    sortable: true,
    template: (row: Product) => h('span', {
      class: row.stock > 0 ? 'text-green-600' : 'text-red-600 font-bold'
    }, row.stock)
  },
  {
    prop: 'rating',
    label: '評分',
    width: 100,
    align: 'center',
    sortable: true,
    template: (row: Product) => h('div', {
      class: 'flex items-center justify-center'
    }, [
      h('span', { class: 'text-yellow-500' }, '★'),
      h('span', { class: 'ml-1' }, row.rating.toFixed(1))
    ])
  },
  {
    prop: 'isAvailable',
    label: '可購買',
    width: 100,
    align: 'center',
    template: (row: Product) => h('span', {
      class: row.isAvailable ? 'text-green-600' : 'text-red-600'
    }, row.isAvailable ? '是' : '否')
  }
]

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
  showTransferDialog: false,
  searchKeyword: '',
  filterCount: 3
})

// 事件處理
const handleUserSortChange = (value: SortChangValue<User>) => {
  console.log('用戶表格排序變更:', value)
}

const handleProductSortChange = (value: SortChangValue<Product>) => {
  console.log('產品表格排序變更:', value)
}

const handleUserSelectionChange = (selection: User[]) => {
  state.selectedUsers = selection
  console.log('選中的用戶:', selection)
}

const handleProductSelectionChange = (selection: Product[]) => {
  state.selectedProducts = selection
  console.log('選中的產品:', selection)
}

const handleUserCellClick = (column: TableColumn<User>, row: User) => {
  console.log('點擊用戶單元格:', column.label, row)
}

const handleProductCellClick = (column: TableColumn<Product>, row: Product) => {
  console.log('點擊產品單元格:', column.label, row)
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

// TransferDialog 相關處理
const handleTransferSubmit = (columns: TableColumn<User>[]) => {
  console.log('TransferDialog 提交的列配置:', columns)
  // 這裡可以更新表格的列配置
  // 例如：userColumns.value = columns
}

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

      <!-- 產品表格示範 -->
      <section class="mb-12">
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b">
            <h2 class="text-xl font-semibold text-gray-900">產品庫存表格</h2>
            <p class="mt-1 text-gray-600">
              展示格式化、自定義模板、狀態顯示等功能
              <span v-if="state.selectedProducts.length > 0" class="ml-2 text-primary">
                (已選擇 {{ state.selectedProducts.length }} 項)
              </span>
            </p>
          </div>
          <div class="p-6">
            <BaseTable
              :data="productData"
              :columns="productColumns"
              :loading="state.productLoading"
              :show-selection="true"
              :show-over-flow-tooltip="true"
              @selection-change="handleProductSelectionChange"
              @column-sort-change="handleProductSortChange"
              @cell-click="handleProductCellClick"
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
              :columns="userColumns"
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
                   :badge-value="state.filterCount"
                   @keydown:enter="handleSearch"
                   @update:clear="handleSearchClear"
                 >
                   <template #button>
                     <BaseBtn type="primary" size="small" class="mr-2">
                       新增
                     </BaseBtn>
                     <BaseBtn type="success" size="small">
                       匯出
                     </BaseBtn>
                   </template>
                   <template #filterBody>
                     <div class="p-4 space-y-3">
                       <div>
                         <label class="block text-sm font-medium text-gray-700 mb-1">部門</label>
                         <select class="w-full border border-gray-300 rounded-md px-3 py-2">
                           <option value="">全部</option>
                           <option value="engineering">工程部</option>
                           <option value="design">設計部</option>
                           <option value="marketing">行銷部</option>
                         </select>
                       </div>
                       <div>
                         <label class="block text-sm font-medium text-gray-700 mb-1">狀態</label>
                         <select class="w-full border border-gray-300 rounded-md px-3 py-2">
                           <option value="">全部</option>
                           <option value="active">啟用</option>
                           <option value="inactive">停用</option>
                           <option value="pending">待處理</option>
                         </select>
                       </div>
                       <div class="flex gap-2 pt-2">
                         <BaseBtn type="primary" size="small" class="flex-1">確定</BaseBtn>
                         <BaseBtn type="default" size="small" class="flex-1">重置</BaseBtn>
                       </div>
                     </div>
                   </template>
                 </SearchBar>
               </div>

               <!-- 全寬搜尋欄 -->
               <div>
                 <h3 class="text-lg font-medium text-gray-900 mb-3">全寬搜尋欄</h3>
                 <SearchBar
                   :show-search="true"
                   :show-filter="false"
                   :full-input="true"
                   @keydown:enter="handleSearch"
                   @update:clear="handleSearchClear"
                 />
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
              <BaseBtn type="primary" @click="state.showDialog = true">
                打開對話框
              </BaseBtn>
              <BaseBtn type="success" @click="state.showConfirmDialog = true">
                確認對話框
              </BaseBtn>
              <BaseBtn type="warning" loading>
                加載中
              </BaseBtn>
              <BaseBtn type="danger" disabled>
                禁用按鈕
              </BaseBtn>
              <BaseBtn type="default" plain>
                樸素按鈕
              </BaseBtn>
              <BaseBtn type="primary" is-fill>
                填充按鈕
              </BaseBtn>
            </div>
          </div>
        </div>
      </section>

      <!-- TransferDialog 示範 -->
      <section class="mb-12">
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b">
            <h2 class="text-xl font-semibold text-gray-900">TransferDialog 示範</h2>
            <p class="mt-1 text-gray-600">展示 TransferDialog 組件的列配置功能</p>
          </div>
          <div class="p-6">
            <BaseBtn type="primary" @click="state.showTransferDialog = true">
              打開 TransferDialog
            </BaseBtn>
                         <TransferDialog
               v-model="state.showTransferDialog"
               :columns-value="userColumns"
               transfer-title="配置表格列"
               @update:submit="handleTransferSubmit"
             />
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

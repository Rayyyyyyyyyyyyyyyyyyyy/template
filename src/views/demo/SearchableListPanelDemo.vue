<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import {
  BaseTable,
  BaseBtn,
  BaseForm,
  SearchableListPanel,
} from '@/components'
import type { TableColumn } from '@/types'
import { setActiveColumn } from '@/utils/tableHelper'
import { h } from 'vue'
import {
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

  // 搜尋狀態
  searchKeyword: '',

  // 篩選表單
  filterForm: {
    department: '',
    status: '',
  },

  // 分頁數據
  pagination: {
    totalCount: 100,
    limit: 10,
    page: 1,
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
// SearchableListPanel 相關事件處理
const handleSearchableListSearch = (keyword: string | null) => {
  console.log('SearchableListPanel 搜尋:', keyword)
  state.searchKeyword = keyword || ''
}

const handleSearchableListPageChange = (page: number) => {
  console.log('SearchableListPanel 頁面變更:', page)
  state.pagination.page = page
}

const handleSearchableListPageSizeChange = (limit: number) => {
  console.log('SearchableListPanel 頁面大小變更:', limit)
  state.pagination.limit = limit
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
  <!-- SearchableListPanel 示範 -->
  <section id="searchable-list-panel-demo" class="mb-12">
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div class="px-8 py-6 border-b border-gray-100">
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">SearchableListPanel 示範</h2>
        <p class="text-gray-600 text-base leading-relaxed">
          展示 SearchableListPanel 組件的完整功能
        </p>
      </div>
      <div class="p-8">
        <SearchableListPanel
          title="用戶管理"
          :pagination="state.pagination"
          :show-back="false"
          :show-search="true"
          :show-filter="true"
          :badge-value="filterCount"
          @search="handleSearchableListSearch"
          @update-page="handleSearchableListPageChange"
          @update-page-size="handleSearchableListPageSizeChange"
        >
          <template #firstButton>
            <BaseBtn type="primary" size="small" class="px-4 py-2 mr-2"> 新增用戶 </BaseBtn>
          </template>

          <template #customButton>
            <BaseBtn type="success" size="small" class="px-4 py-2 mr-2"> 匯出數據 </BaseBtn>
            <BaseBtn type="warning" size="small" class="px-4 py-2"> 批量操作 </BaseBtn>
          </template>

          <template #lastButton>
            <BaseBtn type="info" size="small" class="px-4 py-2"> 刷新 </BaseBtn>
          </template>

          <template #filterDrawBody>
            <BaseForm v-model="state.filterForm" class="space-y-4" label-width="60px">
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
                <el-select
                  v-model="state.filterForm.status"
                  placeholder="全部"
                  clearable
                  class="w-full"
                >
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

          <template #main>
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <BaseTable
                :data="state.userData.slice(0, state.pagination.limit)"
                :columns="state.userColumns.filter((item) => item.checkActive)"
                :loading="state.sortTableLoading"
                :show-selection="true"
                :show-over-flow-tooltip="true"
              />
            </div>
          </template>
        </SearchableListPanel>

        <div class="mt-8 bg-gray-50 rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            SearchableListPanel 功能特色
          </h4>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>整合式設計：</strong>結合搜尋、篩選、分頁於一體</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>多個按鈕插槽：</strong>支持 firstButton、customButton、lastButton</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>篩選抽屜：</strong>可自定義篩選條件內容</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>分頁功能：</strong>內建分頁組件，支持頁面大小調整</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>徽章顯示：</strong>篩選條件數量徽章提示</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2 mt-0.5">•</span>
              <span><strong>響應式設計：</strong>適配不同螢幕尺寸</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>

<script setup lang="ts">
import { computed, h, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import en from 'element-plus/es/locale/lang/en'
import { BaseBtn, BaseTable, SearchableListPanel } from 'rayyy-vue-table-components/components'
import type { TableColumn } from 'rayyy-vue-table-components/types'

type User = {
  id: number
  name: string
  email: string
  age: number
  department: string
  salary: number
  status: 'active' | 'inactive' | 'pending'
  joinDate: string
}

const users: User[] = [
  { id: 1, name: '張小明', email: 'zhang@example.com', age: 28, department: '工程部', salary: 45000, status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: '李小華', email: 'li@example.com', age: 32, department: '設計部', salary: 52000, status: 'active', joinDate: '2022-08-20' },
  { id: 3, name: '王小美', email: 'wang@example.com', age: 25, department: '行銷部', salary: 38000, status: 'pending', joinDate: '2024-03-10' },
  { id: 4, name: '陳大強', email: 'chen@example.com', age: 35, department: '工程部', salary: 60000, status: 'active', joinDate: '2021-12-01' },
  { id: 5, name: '林小芳', email: 'lin@example.com', age: 29, department: '設計部', salary: 48000, status: 'inactive', joinDate: '2023-06-15' },
]
const statusConfig = {
  active: { icon: '●', text: '啟用', color: 'var(--el-color-success)' },
  inactive: { icon: '●', text: '停用', color: 'var(--el-color-danger)' },
  pending: { icon: '○', text: '待處理', color: 'var(--el-color-warning)' },
}

const columns: TableColumn<User>[] = [
  { prop: 'id', label: 'ID', width: 80, align: 'center', sortable: true },
  { prop: 'name', label: '姓名', width: 120, align: 'left', sortable: true },
  { prop: 'email', label: '郵箱', align: 'left', sortable: true },
  { prop: 'age', label: '年齡', width: 80, align: 'center', sortable: true },
  { prop: 'department', label: '部門', width: 120, align: 'center', sortable: true },
  { prop: 'salary', label: '薪資', width: 120, align: 'right', sortable: true, formatter: (row: User) => `$${row.salary.toLocaleString()}` },
  {
    prop: 'status',
    label: '狀態',
    width: 100,
    align: 'center',
    template: (row: User) => {
      const { icon, text, color } = statusConfig[row.status]
      return h('div', { style: 'display: flex; align-items: center; justify-content: center' }, [
        h('span', { style: `color: ${color}` }, icon),
        h('span', { style: 'margin-left: 4px; font-size: 12px; color: var(--el-text-color-secondary)' }, text),
      ])
    },
  },
  { prop: 'joinDate', label: '入職日期', width: 120, align: 'center', sortable: true, formatter: (row: User) => new Date(row.joinDate).toLocaleDateString('zh-TW') },
]

// 切換的是宿主全域 locale（useI18n 未指定 scope），所有元件與範例一起跟著變。
// Element Plus 自己的文字（分頁等）不吃 vue-i18n，要把對應語言包傳給元件的 locale。
const { locale } = useI18n()
const elementLocale = computed(() => (locale.value === 'zh-TW' ? zhTw : en))

const keyword = ref('')
const pagination = reactive({ limit: 2, page: 1 })
const backPayload = ref('尚未返回')

const filtered = computed(() => {
  const key = keyword.value.trim().toLocaleLowerCase()
  if (!key) return users
  return users.filter((user) => [user.name, user.email, user.department].some((value) => value.toLocaleLowerCase().includes(key)))
})
const paged = computed(() => filtered.value.slice((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit))

const search = (value: string | null) => {
  keyword.value = value || ''
  pagination.page = 1
}
const changePageSize = (limit: number) => {
  pagination.limit = limit
  pagination.page = 1
}
</script>

<template>
  <div class="stack">
    <div class="actions">
      <span class="hint">當前語系: {{ locale }}</span>
      <BaseBtn type="primary" @click="locale = locale === 'zh-TW' ? 'en-US' : 'zh-TW'">
        切換語系 ({{ locale === 'zh-TW' ? '切換到英文' : '切換到中文' }})
      </BaseBtn>
    </div>
    <SearchableListPanel
      title="用戶管理"
      :pagination="{ ...pagination, totalCount: filtered.length }"
      :page-size-list="[2, 5, 10]"
      :compact-pagination-below="640"
      show-back
      show-search
      :locale="elementLocale"
      @search="search"
      @update-page="pagination.page = $event"
      @update-page-size="changePageSize"
      @click:back="backPayload = JSON.stringify($event)"
    >
      <template #firstButton>
        <BaseBtn type="primary" class="btn"> 新增用戶 </BaseBtn>
      </template>
      <template #customButton>
        <BaseBtn type="success" class="btn"> 匯出數據 </BaseBtn>
        <BaseBtn type="warning"> 批量操作 </BaseBtn>
      </template>
      <template #lastButton>
        <BaseBtn type="info"> 刷新 </BaseBtn>
      </template>
      <template #filterButton>
        <BaseBtn type="primary" class="filter-btn"> 篩選 </BaseBtn>
      </template>
      <template #main>
        <BaseTable :data="paged" :columns="columns" show-selection show-over-flow-tooltip />
      </template>
    </SearchableListPanel>
    <p class="hint">click:back payload: <output aria-live="polite">{{ backPayload }}</output>（實際導頁由宿主決定）</p>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 16px;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
.hint {
  margin: 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
.btn {
  margin-right: 8px;
}
.filter-btn {
  margin-left: 8px;
}
</style>

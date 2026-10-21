<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseTable from '@/components/tables/BaseTable.vue'
import SearchableListPanel from '@/components/layout/SearchableListPanel.vue'
import { DEMO_USER_DATA, type User } from '@/const/tableConst'
import type { TableColumn } from '@/types'
import { ROUTES } from '@/router/constants'

const router = useRouter()
const keyword = ref('')
const page = ref(1)
const limit = ref(3)
const columns: TableColumn<User>[] = [
  { prop: 'name', label: '姓名', minWidth: 90 },
  { prop: 'department', label: '部門', minWidth: 90 },
  { prop: 'joinDate', label: '入職日期', minWidth: 120 },
]
const filteredUsers = computed(() => {
  const query = keyword.value.trim().toLocaleLowerCase()
  return DEMO_USER_DATA.filter((user) =>
    [user.name, user.department].some((value) => value.toLocaleLowerCase().includes(query)),
  )
})
const pagination = computed(() => ({
  page: page.value,
  limit: limit.value,
  totalCount: filteredUsers.value.length,
}))
const visibleUsers = computed(() =>
  filteredUsers.value.slice((page.value - 1) * limit.value, page.value * limit.value),
)
function search(value: string | null) {
  keyword.value = value ?? ''
  page.value = 1
}
function resize(value: number) {
  limit.value = value
  page.value = 1
}
</script>

<template>
  <div class="home-page">
    <section class="home-showcase">
      <div class="home-intro">
        <h1>Vue Table Components</h1>
        <p>Vue 3 + Element Plus 表格組件庫。從資料表格到搜尋、分頁，直接在這裡試用。</p>
        <div class="home-actions">
          <button
            type="button"
            class="site-button site-button--primary"
            @click="router.push(ROUTES.DEMO)"
          >
            查看示範
          </button>
          <a
            class="site-button"
            href="https://www.npmjs.com/package/rayyy-vue-table-components"
            target="_blank"
            rel="noopener noreferrer"
          >
            安裝套件
          </a>
          <a
            class="site-button"
            href="https://github.com/Rayyyyyyyyyyyyyyyyyyyy/template"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
      <div class="home-preview" data-ui aria-label="可操作的列表示範">
        <SearchableListPanel
          title="用戶管理"
          show-search
          :pagination="pagination"
          :page-size-list="[3, 5]"
          @search="search"
          @update-page="page = $event"
          @update-page-size="resize"
        >
          <template #main><BaseTable :data="visibleUsers" :columns="columns" /></template>
        </SearchableListPanel>
        <p class="home-preview__hint">
          試試搜尋「工程部」，或切換下一頁。資料為本地示範，不會儲存。
        </p>
      </div>
    </section>
    <section class="home-reference">
      <h2>從表格到完整列表頁面</h2>
      <p>搜尋、篩選、分頁與欄位配置，沿用 Element Plus 的操作方式。</p>
      <dl class="home-components">
        <div>
          <dt><RouterLink :to="ROUTES.TABLE">BaseTable</RouterLink></dt>
          <dd>資料展示與自訂欄位</dd>
        </div>
        <div>
          <dt><RouterLink :to="ROUTES.SEARCHABLE_LIST_PANEL">SearchableListPanel</RouterLink></dt>
          <dd>搜尋、篩選與分頁</dd>
        </div>
        <div>
          <dt><RouterLink :to="ROUTES.TRANSFER_DIALOG">TransferDialog</RouterLink></dt>
          <dd>欄位顯示與拖曳排序</dd>
        </div>
      </dl>
      <code class="install-command">npm install rayyy-vue-table-components</code>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { BaseTable, SearchableListPanel } from 'rayyy-vue-table-components/components'
import type { TableColumn } from 'rayyy-vue-table-components/types'

type User = { id: number; name: string }
// 本地 mock；搜尋、分頁由宿主處理，沒有 API 或持久化。
const rows = ref<User[]>([{ id: 1, name: 'Ada' }, { id: 2, name: 'Grace' }, { id: 3, name: 'Lin' }])
const columns: TableColumn<User>[] = [{ prop: 'name', label: '姓名' }]
const keyword = ref('')
const page = ref(1)
const limit = ref(2)
const filtered = computed(() => rows.value.filter((row) => row.name.toLowerCase().includes(keyword.value.toLowerCase())))
const pagination = computed(() => ({ page: page.value, limit: limit.value, totalCount: filtered.value.length }))
const visible = computed(() => filtered.value.slice((page.value - 1) * limit.value, page.value * limit.value))
function search(value: string | null) { keyword.value = value ?? ''; page.value = 1 }
function resize(value: number) { limit.value = value; page.value = 1 }
</script>

<template>
  <SearchableListPanel title="用戶" show-search :pagination="pagination" :page-size-list="[2, 5, 10]"
    @search="search" @update-page="page = $event" @update-page-size="resize">
    <template #main><BaseTable :data="visible" :columns="columns" /></template>
  </SearchableListPanel>
</template>

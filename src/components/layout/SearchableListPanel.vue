<script setup lang="ts">
import { toRefs, computed } from 'vue'
import type { Pager } from '@/types'
import { MainPanel, SearchBar } from '@/components'

const props = withDefaults(
  defineProps<{
    title: string
    pagination: Pager
    showBack?: boolean | string | object
    showSearch?: boolean
    pageSizeList?: number[]
    showPagination?: boolean
  }>(),
  {
    pageSizeList: () => [10, 25, 50, 100, 200],
  },
)

const { pagination } = toRefs(props)

const emits = defineEmits<{
  (e: 'search', data: string | null): void
  (e: 'updatePage', page: number): boolean
  (e: 'updatePageSize', limit: number): boolean
  (e: 'click:back'): void
}>()

const search = (keyword: string) => {
  emits('search', keyword)
}

const clearable = () => {
  emits('search', null)
}

const updatePage = (page: number) => {
  emits('updatePage', page)
}

const changePageSize = (limit: number) => {
  emits('updatePageSize', limit)
}
const onBackClick = () => {
  emits('click:back')
}
const showPager = computed(() => {
  if (props.showPagination) {
    return props.showPagination
  } else {
    return props.pagination.totalCount > 0
  }
})
</script>

<template>
  <main-panel :title="props.title" :show-back="showBack" @click:back="onBackClick">
    <template #searchBar>
      <search-bar :show-search="showSearch" @keydown:enter="search" @update:clear="clearable">
        <template #button>
          <slot name="firstButton"></slot>
          <slot name="customButton"></slot>
          <slot name="lastButton"></slot>
        </template>
        <template #customerFilter>
          <slot name="filterButton"></slot>
        </template>
      </search-bar>
    </template>
    <template #main>
      <slot name="main" />
    </template>

    <template #footer>
      <el-pagination
        v-if="showPager"
        layout="jumper, prev, pager, next, total, sizes"
        :page-sizes="pageSizeList"
        :current-page="pagination.page"
        :page-size="pagination.limit"
        :total="pagination.totalCount"
        @current-change="updatePage"
        @size-change="changePageSize"
      />
    </template>
  </main-panel>
</template>

<style scoped lang="scss"></style>

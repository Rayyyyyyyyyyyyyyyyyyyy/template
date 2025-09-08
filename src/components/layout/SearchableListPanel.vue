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
    showEdit?: boolean
    showFilter?: boolean
    showDefaultSearch?: boolean
    badgeValue?: number
    filterDrawerSize?: string
    pageDefaultHeight?: string
  }>(),
  {
    pageDefaultHeight: '800px',
    filterDrawerSize: '50%',
  },
)

const { pagination } = toRefs(props)

const emits = defineEmits<{
  (e: 'search', data: string | null): void
  (e: 'updatePage', page: number): boolean
  (e: 'updatePageSize', limit: number): boolean
}>()

const showAllFeatures = computed(() => {
  return props.showDefaultSearch || (props.showSearch && props.showEdit && props.showFilter)
})
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
</script>

<template>
  <main-panel :title="props.title" :show-back="showBack" :max-height="pageDefaultHeight">
    <template #searchBar>
      <search-bar
        :show-filter="showAllFeatures || showFilter"
        :show-search="showAllFeatures || showSearch"
        :badge-value="badgeValue"
        :filter-drawer-size="filterDrawerSize"
        @keydown:enter="search"
        @update:clear="clearable"
      >
        <template #button>
          <slot name="firstButton"></slot>
          <slot name="customButton" v-if="showAllFeatures || showEdit"> </slot>
          <slot name="lastButton"></slot>
        </template>
        <template #filterBody>
          <slot name="filterDrawBody"></slot>
        </template>
      </search-bar>
    </template>
    <template #main>
      <slot name="main" />
    </template>

    <template #footer>
      <el-pagination
        v-if="pagination.totalCount > 0"
        layout="jumper, prev, pager, next, total, sizes"
        :page-sizes="[10, 20, 30, 40, 50]"
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

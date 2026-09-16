<script setup lang="ts">
import { toRefs, computed } from 'vue'
import MainPanel from './MainPanel.vue'
import SearchBar from '../items/SearchBar.vue'
import type {
  SearchableListPanelEventMap,
  SearchableListPanelProps,
  SearchableListPanelSlots,
} from '../../types/components'

const props = withDefaults(
  defineProps<SearchableListPanelProps>(),
  {
    pageSizeList: () => [10, 25, 50, 100, 200],
    showPagination: undefined,
  },
)

const { pagination } = toRefs(props)

const emits = defineEmits<SearchableListPanelEventMap>()

defineSlots<SearchableListPanelSlots>()

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
  return props.showPagination ?? props.pagination.totalCount > 0
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
      <el-config-provider v-if="props.locale" :locale="props.locale">
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
      </el-config-provider>
      <el-pagination
        v-else-if="showPager"
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

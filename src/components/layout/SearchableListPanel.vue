<script setup lang="ts">
import { toRefs, computed, ref, onMounted, onBeforeUnmount } from 'vue'
import MainPanel from './MainPanel.vue'
import SearchBar from '../items/SearchBar.vue'
import type {
  FunctionHeaderEventMap,
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

const viewportWidth = ref(typeof window === 'undefined' ? 1024 : window.innerWidth)
const updateViewportWidth = () => {
  viewportWidth.value = window.innerWidth
}

onMounted(() => window.addEventListener('resize', updateViewportWidth))
onBeforeUnmount(() => window.removeEventListener('resize', updateViewportWidth))

const DEFAULT_LAYOUT = 'prev, pager, next, total, sizes, jumper'
const layout = computed(() =>
  props.compactPaginationBelow !== undefined && viewportWidth.value < props.compactPaginationBelow
    ? 'prev, pager, next'
    : props.paginationLayout ?? DEFAULT_LAYOUT,
)

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
const onBackClick = (payload: FunctionHeaderEventMap['back'][0]) => {
  emits('click:back', payload)
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
          class="list-pagination"
          :layout="layout"
          :pager-count="5"
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
        class="list-pagination"
        :layout="layout"
        :pager-count="5"
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

<style scoped lang="scss">
.list-pagination.el-pagination {
  max-width: 100%;
  min-width: 0;
  flex-wrap: wrap;
  gap: 8px;
  white-space: normal;

  :deep(> *) {
    margin-left: 0;
    max-width: 100%;
  }

  :deep(.el-pager),
  :deep(.el-pagination__jump) {
    flex-wrap: wrap;
  }

  :deep(.el-pagination__total) {
    overflow-wrap: anywhere;
  }

  :deep(.el-select) {
    width: max(128px, 9em);
    max-width: 100%;
  }
}
</style>

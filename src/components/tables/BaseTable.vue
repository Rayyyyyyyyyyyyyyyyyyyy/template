<script setup lang="ts" generic="T extends Record<string, unknown> = Record<string, unknown>">
import type { FunctionalComponent, VNode } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TableColumnCtx, TableInstance } from 'element-plus'
import type { SortChangValue, TableColumn } from '../../types'
import type {
  BaseTableEventMap,
  BaseTableProps,
  BaseTableSlots,
} from '../../types/components'

const TemplateCell: FunctionalComponent<{ vnode: VNode }> = props => props.vnode

const { t } = useI18n()

// 組件屬性默認值
const props = withDefaults(defineProps<BaseTableProps<T>>(), {
  loading: false,
  error: false,
  data: () => [],
  defaultExpandAll: false,
  lazy: false,
  treeProps: () => ({
    children: 'children',
    hasChildren: 'hasChildren',
  }),
  showSelection: false,
  showIndex: false,
  showExpand: false,
  showSummary: false,
  showOverFlowTooltip: false,
  showCheckBtn: false,
  showEditBtn: false,
  preserveExpanded: false,
  summaryMethod: () => [],
  baseTableRowClassName: () => '',
})

const emit = defineEmits<BaseTableEventMap<T>>()

const tableRef = ref<TableInstance>()

const viewportWidth = ref(typeof window === 'undefined' ? 1024 : window.innerWidth)
const updateViewportWidth = () => {
  viewportWidth.value = window.innerWidth
}

onMounted(() => window.addEventListener('resize', updateViewportWidth))
onBeforeUnmount(() => window.removeEventListener('resize', updateViewportWidth))

const fixedEnabled = computed(() => props.unfixColumnsBelow === undefined || viewportWidth.value >= props.unfixColumnsBelow)

defineSlots<BaseTableSlots<T>>()

const handleCellClick = (column: TableColumn<T>, row: T) => {
  emit('cell-click', column, row)
}

const getSummaries = (param: { columns: TableColumnCtx<T>[]; data: T[] }) => {
  return props.summaryMethod ? props.summaryMethod(param as never) : []
}

const handleSelectionChange = (selection: T[]) => {
  emit('selection-change', selection)
}

type RowClassNameData<T> = { row: T; rowIndex: number }

const tableRowClassName = (data: RowClassNameData<T>) => {
  return props.baseTableRowClassName?.(data) ?? ''
}
const onSortChange = (value: unknown) => {
  emit('column-sort-change', value as SortChangValue<T>)
}
const handleOperateClick = (value: T, clickType: 'check' | 'edit') => {
  if (clickType === 'check') emit('click:checkRow', value)
  else emit('click:editRow', value)
}
const operatorWidth = computed(() => {
  if (props.showCheckBtn && props.showEditBtn) {
    return 120
  } else if (props.showCheckBtn && !props.showEditBtn) {
    return 60
  } else if (props.showEditBtn && !props.showCheckBtn) {
    return 60
  }
  return undefined
})

defineExpose({
  clearSelection: () => tableRef.value?.clearSelection(),
  toggleRowSelection: (row: T, selected?: boolean) => tableRef.value?.toggleRowSelection(row, selected),
  doLayout: () => tableRef.value?.doLayout(),
})
</script>

<template>
  <div v-loading="loading" :aria-busy="loading" :element-loading-text="t('common.loading')">
    <el-table
      ref="tableRef"
      v-if="data.length > 0 && !(error && !loading)"
      :data="data"
      :row-key="rowKey"
      :tree-props="treeProps"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :lazy="lazy"
      :load="load"
      border
      :show-summary="showSummary"
      :show-overflow-tooltip="showOverFlowTooltip"
      :summary-method="getSummaries"
      :row-class-name="tableRowClassName"
      class="data-table"
      @selection-change="handleSelectionChange"
      @current-change="(currentRow: any) => emit('current-change', currentRow)"
      :preserve-expanded-content="preserveExpanded"
      :sort="() => {}"
      @sort-change="onSortChange"
    >
      <!-- 選擇列 -->
      <el-table-column v-if="showSelection" type="selection" width="60" :fixed="fixedEnabled ? 'left' : false" align="center" />

      <!-- 索引列 -->
      <el-table-column v-if="showIndex" type="index" width="60" :fixed="fixedEnabled ? 'left' : false" align="center" :label="t('table.index')" />

      <!-- 展開列 -->
      <el-table-column v-if="showExpand" type="expand">
        <template #default="{ row, $index }">
          <slot name="expand" v-bind="{ row, $index }" />
        </template>
      </el-table-column>

      <!-- 數據列 -->
      <el-table-column v-for="(column, index) in columns" :key="column.prop ?? index" v-bind="column">
        <template #default="{ row }">
          <div class="cell-content" @click="handleCellClick(column, row)">
            <template v-if="column.formatter">
              {{ column.formatter(row) }}
            </template>
            <TemplateCell v-else-if="column.template" :vnode="column.template(row)" />
            <span v-else-if="column.prop">{{ row[column.prop] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="props.showCheckBtn || props.showEditBtn"
        :width="operatorWidth"
        align="center"
        :fixed="fixedEnabled ? 'right' : false"
      >
        <template #default="{ row }">
          <div class="flex items-center justify-center">
            <button
              type="button"
              class="blue-text cursor-pointer font-bold row-action"
              @click="handleOperateClick(row, 'check')"
              :aria-label="rowLabel ? `${t('common.view')} ${rowLabel(row)}` : undefined"
              v-if="showCheckBtn"
            >
              {{ t('common.view') }}
            </button>
            <el-divider direction="vertical" class="!mx-2" v-if="showCheckBtn && showEditBtn" />
            <button
              type="button"
              class="blue-text cursor-pointer font-bold row-action"
              @click="handleOperateClick(row, 'edit')"
              :aria-label="rowLabel ? `${t('common.edit')} ${rowLabel(row)}` : undefined"
              v-if="showEditBtn"
            >
              {{ t('common.edit') }}
            </button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <p v-else-if="loading" role="status" class="p-4 text-center">{{ t('common.loading') }}</p>
    <template v-else-if="error">
      <slot name="error"><el-empty :description="t('table.loadFailed')" /></slot>
    </template>
    <template v-else>
      <slot name="empty"><el-empty :description="t('table.empty')" /></slot>
    </template>
  </div>
</template>

<style scoped lang="scss">
.dark .row-action {
  background-color: transparent;
}

.row-action:focus-visible {
  outline: 2px solid var(--main-color, var(--el-color-primary));
  outline-offset: 2px;
}
</style>

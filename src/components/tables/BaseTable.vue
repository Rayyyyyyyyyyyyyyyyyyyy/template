<script setup lang="ts" generic="T extends Record<string, unknown> = Record<string, unknown>">
import type { VNode } from 'vue'
import type { TableColumnCtx } from 'element-plus'
import type { SortChangValue, TableColumn } from '@/types'

type Props<T extends Record<string, unknown> = Record<string, unknown>> = {
  loading?: boolean
  data: T[]
  columns: TableColumn<T>[]
  showSelection?: boolean
  showSummary?: boolean
  showOverFlowTooltip?: boolean
  summaryMethod?: (param: {
    columns: TableColumnCtx<Record<string, unknown>>[]
    data: T[]
  }) => (string | VNode)[]
  baseTableRowClassName?: (data: { row: T; rowIndex: number }) => string
}

// 組件屬性默認值
const props = withDefaults(defineProps<Props<T>>(), {
  loading: false,
  data: () => [],
  showSelection: false,
  showSummary: false,
  showOverFlowTooltip: false,
  summaryMethod: () => [],
  baseTableRowClassName: () => '',
})

const emit = defineEmits<{
  (e: 'selection-change', selection: T[]): void
  (e: 'current-change', currentRow: T): void
  (e: 'cell-click', column: TableColumn<T>, row: T): void
  (e: 'column-sort-change', value: SortChangValue<T>): void
}>()

const handleCellClick = (column: TableColumn<T>, row: T) => {
  emit('cell-click', column, row)
}

const getSummaries = (param: { columns: TableColumnCtx<Record<string, unknown>>[]; data: T[] }) => {
  return props.summaryMethod ? props.summaryMethod(param) : []
}

const handleSelectionChange = (selection: T[]) => {
  emit('selection-change', selection)
}

type RowClassNameData<T> = { row: T; rowIndex: number }

const tableRowClassName = (data: RowClassNameData<T>) => {
  return props.baseTableRowClassName?.(data) ?? ''
}
const onSortChange = (value: SortChangValue<T>) => {
  emit('column-sort-change', value)
}
</script>

<template>
  <el-table
    v-loading="loading"
    element-loading-text="數據加載中..."
    :data="data"
    border
    :show-summary="showSummary"
    :show-overflow-tooltip="showOverFlowTooltip"
    :summary-method="getSummaries"
    :row-class-name="tableRowClassName"
    class="data-table"
    @selection-change="handleSelectionChange"
    @current-change="(currentRow: any) => emit('current-change', currentRow)"
    :sort="() => {}"
    @sort-change="onSortChange"
  >
    <!-- 選擇列 -->
    <el-table-column v-if="showSelection" type="selection" width="60" fixed="left" align="center" />

    <!-- 數據列 -->
    <el-table-column v-for="(column, index) in columns" :key="index" v-bind="column">
      <template #default="{ row }">
        <div class="cell-content" @click="handleCellClick(column, row)">
          <template v-if="column.formatter">
            {{ column.formatter(row) }}
          </template>
          <component
            v-else-if="column.template"
            :is="{
              setup() {
                return () => column.template?.(row)
              },
            }"
          />
          <span v-else-if="column.prop">{{ row[column.prop] }}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss"></style>

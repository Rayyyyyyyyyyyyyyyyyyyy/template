<script setup lang="ts" generic="T extends Record<string, unknown> = Record<string, unknown>">
import type { VNode } from 'vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TableColumnCtx } from 'element-plus'
import type { SortChangValue, TableColumn } from '@/types'
import type { Language } from 'element-plus/es/locale'

const { t } = useI18n()

type Props<T extends Record<string, unknown> = Record<string, unknown>> = {
  loading?: boolean
  data: T[]
  columns: TableColumn<T>[]
  showSelection?: boolean
  showIndex?: boolean
  showSummary?: boolean
  showOverFlowTooltip?: boolean
  summaryMethod?: (param: {
    columns: TableColumnCtx<Record<string, unknown>>[]
    data: T[]
  }) => (string | VNode)[]
  baseTableRowClassName?: (data: { row: T; rowIndex: number }) => string
  showCheckBtn?: boolean
  showEditBtn?: boolean
  locale?: Language // 新增：Element Plus locale
}

// 組件屬性默認值
const props = withDefaults(defineProps<Props<T>>(), {
  loading: false,
  data: () => [],
  showSelection: false,
  showIndex: false,
  showSummary: false,
  showOverFlowTooltip: false,
  showCheckBtn: false,
  showEditBtn: false,
  summaryMethod: () => [],
  baseTableRowClassName: () => '',
})

const emit = defineEmits<{
  (e: 'selection-change', selection: T[]): void
  (e: 'current-change', currentRow: T): void
  (e: 'cell-click', column: TableColumn<T>, row: T): void
  (e: 'column-sort-change', value: SortChangValue<T>): void
  (e: 'click:checkRow', row: T): void
  (e: 'click:editRow', row: T): void
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
const handleOperateClick = (value: T, clickType: 'check' | 'edit') => {
  clickType == 'check' ? emit('click:checkRow', value) : emit('click:editRow', value)
}
const operatorWidth = computed(() => {
  if (props.showCheckBtn && props.showEditBtn) {
    return 120
  } else if (props.showCheckBtn && !props.showEditBtn) {
    return 60
  } else if (props.showEditBtn && !props.showCheckBtn) {
    return 60
  }
})
</script>

<template>
  <el-table
    v-if="data.length > 0"
    v-loading="loading"
    :element-loading-text="t('common.loading')"
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

    <!-- 索引列 -->
    <el-table-column v-if="showIndex" type="index" width="60" fixed="left" align="center" label="No" />

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
    <el-table-column
      v-if="props.showCheckBtn || props.showEditBtn"
      :width="operatorWidth"
      align="center"
      fixed="right"
    >
      <template #default="{ row }">
        <div class="flex items-center justify-center">
          <p
            class="blue-text cursor-pointer font-bold"
            @click="handleOperateClick(row, 'check')"
            v-if="showCheckBtn"
          >
            {{ t('common.view') }}
          </p>
          <el-divider direction="vertical" class="!mx-2" v-if="showCheckBtn && showEditBtn" />
          <p
            class="blue-text cursor-pointer font-bold"
            @click="handleOperateClick(row, 'edit')"
            v-if="showEditBtn"
          >
            {{ t('common.edit') }}
          </p>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-empty :description="t('table.empty')" v-else />
</template>

<style scoped lang="scss"></style>

<script setup lang="ts" generic="T extends Record<string, unknown>">
import type { SortChangValue, TableColumn } from '@/types'
import { reactive } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import BaseTable from './BaseTable.vue'
import type { SortTableEventMap, SortTableProps, SortTableSlots } from '../../types/components'

defineProps<SortTableProps<T>>()

const emit = defineEmits<SortTableEventMap<T>>()

defineSlots<SortTableSlots<T>>()

const openTransferDialog = () => {
  emit('open:transfer')
}

const handleSelectionChange = (selectList: T[]) => {
  emit('update:selectRow', selectList)
}
const handleCellClick = (column: TableColumn<T>, row: T) => {
  emit('click:cell', column, row)
}

const handleColumnSortChange = (data: SortChangValue<T>) => {
  emit('click:columnSort', data)
}

const handleCheckClick = (row: T) => {
  emit('click:checkRow', row)
}

const handleEditClick = (row: T) => {
  emit('click:editRow', row)
}
const handelExcelClick = () => {
  emit('click:downloadExcelFile')
}
const state = reactive({
  itemOnHover: false,
})
</script>

<template>
  <div class="w-full mb-4">
    <div class="flex items-center h-12 bg-gray-200 px-1.5 rounded-t justify-end">
      <div class="flex items-center mr-4">
        <slot name="firstButton"></slot>
        <div
          class="cursor-pointer text-text text-xl flex items-center justify-center hover:text-blue-600"
          @click="openTransferDialog"
        >
          <el-icon>
            <Setting />
          </el-icon>
        </div>

        <div
          class="cursor-pointer flex items-center justify-center ml-1"
          @mouseenter="state.itemOnHover = true"
          @mouseleave="state.itemOnHover = false"
          @click="handelExcelClick"
        >
          <img
            v-if="!state.itemOnHover"
            src="@/assets/icons/excel.svg"
            alt="Excel"
            class="w-6 h-6"
          />
          <img
            v-if="state.itemOnHover"
            src="@/assets/icons/excel-active.svg"
            alt="Excel-active"
            class="w-6 h-6"
          />
        </div>
      </div>
    </div>

    <base-table
      v-loading="loading"
      :data="data"
      :columns="columns"
      :row-key="rowKey"
      :tree-props="treeProps"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :lazy="lazy"
      :load="load"
      :show-summary="showSummary"
      :show-over-flow-tooltip="showOverFlowTooltip"
      :summary-method="summaryMethod"
      :show-selection="showSelection"
      :show-index="showIndex"
      :show-expand="showExpand"
      :base-table-row-class-name="sortTableRowClassName"
      :show-check-btn="showCheckBtn"
      :show-edit-btn="showEditBtn"
      :preserve-expanded="preserveExpanded"
      @selection-change="handleSelectionChange"
      @cell-click="handleCellClick"
      @column-sort-change="handleColumnSortChange"
      @click:checkRow="handleCheckClick"
      @click:editRow="handleEditClick"
    >
      <template #expand="{ row, $index }" v-if="showExpand">
        <slot name="expand" v-bind="{ row, $index }" />
      </template>
    </base-table>
  </div>
</template>

<style scoped lang="scss"></style>

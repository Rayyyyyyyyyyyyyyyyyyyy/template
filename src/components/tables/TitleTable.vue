<script setup lang="ts" generic="T extends Record<string, unknown>">
import type { VNode } from 'vue'
import type { TableColumnCtx } from 'element-plus'
import type { TableColumn } from 'src/types'
import { BaseTable, BaseBtn } from '@/components'

// 使用泛型 T 來定義數據類型
defineProps<{
  data: T[]
  columns: TableColumn<T>[]
  tableTitle?: string
  showSelection?: boolean
  loading?: boolean
  showSummary?: boolean
  showOverFlowTooltip?: boolean
  summaryMethod?: (param: {
    columns: TableColumnCtx<Record<string, unknown>>[]
    data: T[]
  }) => (string | VNode)[]
}>()

const emit = defineEmits<{
  (e: 'click:add'): void
  (e: 'click:edit'): void
  (e: 'click:delete'): void
  (e: 'update:selectRow', value: T[]): void
  (e: 'click:cell', column: TableColumn<T>, row: T): void
}>()

const addInvoiceDetail = () => {
  emit('click:add')
}
const deleteSelectRow = () => {
  emit('click:delete')
}
const handleSelectionChange = (selectList: T[]) => {
  emit('update:selectRow', selectList)
}
const handleCellClick = (column: TableColumn<T>, row: T) => {
  emit('click:cell', column, row)
}
</script>

<template>
  <div class="w-full mb-4">
    <!-- 表格標題區域：包含標題文本和操作按鈕 -->
    <div class="flex items-center h-12 bg-gray-200 px-1.5 rounded-t justify-between" v-if="tableTitle">
      <p class="font-bold text-20">{{ tableTitle }}</p>

      <div class="flex items-center">
        <slot name="tableSearch" />

        <div class="flex items-center">
          <BaseBtn text="新增" type="primary" @click="addInvoiceDetail" />
          <BaseBtn text="刪除" type="primary" @click="deleteSelectRow" />
        </div>
      </div>
    </div>

    <!-- 表格主體 -->
    <base-table
      v-loading="loading"
      element-loading-text="數據加載中..."
      :data="data"
      :columns="columns"
      :show-summary="showSummary"
      :summary-method="summaryMethod"
      :show-selection="showSelection"
      :show-over-flow-tooltip="showOverFlowTooltip"
      @selection-change="handleSelectionChange"
      @cell-click="handleCellClick"
    />
  </div>
</template>

<style scoped lang="scss"></style>

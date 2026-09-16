<script setup lang="ts" generic="T extends Record<string, unknown>">
import { useI18n } from 'vue-i18n'
import type { TableColumn } from '../../types'
import BaseTable from './BaseTable.vue'
import BaseBtn from '../items/BaseBtn.vue'
import type { TitleTableEventMap, TitleTableProps, TitleTableSlots } from '../../types/components'

const { t } = useI18n()

// 使用泛型 T 來定義數據類型
defineProps<TitleTableProps<T>>()

const emit = defineEmits<TitleTableEventMap<T>>()

defineSlots<TitleTableSlots<T>>()

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

const handleCheckClick = (row: T) => {
  emit('click:checkRow', row)
}

const handleEditClick = (row: T) => {
  emit('click:editRow', row)
}
</script>

<template>
  <div class="w-full mb-4">
    <!-- 表格標題區域：包含標題文本和操作按鈕 -->
    <div
      class="flex items-center h-12 bg-gray-200 px-1.5 rounded-t justify-between"
      v-if="tableTitle"
    >
      <p class="font-bold text-xl">{{ tableTitle }}</p>

      <div class="flex items-center">
        <slot name="tableSearch" />

        <div class="flex items-center" v-if="propIsEditable">
          <BaseBtn
            :text="t('button.add')"
            type="primary"
            @click="addInvoiceDetail"
            v-if="!onlyDelete"
          />
          <slot name="editBtn"></slot>
          <BaseBtn
            :text="t('button.delete')"
            type="primary"
            @click="deleteSelectRow"
            v-if="showDelete"
          />
        </div>
      </div>
    </div>

    <!-- 表格主體 -->
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
      :summary-method="summaryMethod"
      :show-selection="propIsEditable || showSelection"
      :show-index="showIndex"
      :show-expand="showExpand"
      :show-over-flow-tooltip="showOverFlowTooltip"
      :show-check-btn="showCheckBtn"
      :show-edit-btn="showEditBtn"
      :preserve-expanded="preserveExpanded"
      @selection-change="handleSelectionChange"
      @cell-click="handleCellClick"
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

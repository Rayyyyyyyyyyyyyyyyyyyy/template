<script setup lang="ts" generic="T extends Record<string, unknown>">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TableColumn } from '../../types'
import BaseTable from './BaseTable.vue'
import BaseBtn from '../items/BaseBtn.vue'
import type { TitleTableEventMap, TitleTableProps, TitleTableSlots, TableExposed } from '../../types/components'

const { t } = useI18n()

// 使用泛型 T 來定義數據類型
const props = defineProps<TitleTableProps<T>>()
const tableProps = computed(() => {
  const { tableTitle: _title, propIsEditable, onlyDelete: _onlyDelete, showDelete: _showDelete, ...shared } = props
  return { ...shared, showSelection: propIsEditable || shared.showSelection }
})

const tableRef = ref<TableExposed<T>>()

const emit = defineEmits<TitleTableEventMap<T>>()

const slots = defineSlots<TitleTableSlots<T>>()
const tableSlots = () => {
  const { tableSearch: _tableSearch, editBtn: _editBtn, ...shared } = slots
  return shared
}

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

defineExpose({
  clearSelection: () => tableRef.value?.clearSelection(),
  toggleRowSelection: (row: T, selected?: boolean) => tableRef.value?.toggleRowSelection(row, selected),
  doLayout: () => tableRef.value?.doLayout(),
})
</script>

<template>
  <div class="w-full mb-4">
    <!-- 表格標題區域：包含標題文本和操作按鈕 -->
    <div
      class="flex flex-wrap items-center min-h-12 rvtc-toolbar px-1.5 rounded-t justify-between"
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
      ref="tableRef"
      v-bind="tableProps"
      @selection-change="handleSelectionChange"
      @cell-click="handleCellClick"
      @click:checkRow="handleCheckClick"
      @click:editRow="handleEditClick"
    >
      <template v-for="(_, name) in tableSlots()" #[name]="scope">
        <slot :name="name" v-bind="scope as any" />
      </template>
    </base-table>
  </div>
</template>

<style scoped lang="scss"></style>

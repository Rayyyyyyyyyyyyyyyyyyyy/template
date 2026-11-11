<script setup lang="ts" generic="T extends Record<string, unknown>">
import type { SortChangValue, TableColumn } from '../../types'
import { computed, ref, reactive } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import BaseTable from './BaseTable.vue'
import type { SortTableEventMap, SortTableProps, SortTableSlots, TableExposed } from '../../types/components'

const props = defineProps<SortTableProps<T>>()
const { t } = useI18n()
const tableProps = computed(() => {
  const { tableTitle: _title, sortTableRowClassName, ...shared } = props
  return { ...shared, baseTableRowClassName: sortTableRowClassName ?? shared.baseTableRowClassName }
})

const tableRef = ref<TableExposed<T>>()

const emit = defineEmits<SortTableEventMap<T>>()

const slots = defineSlots<SortTableSlots<T>>()
const tableSlots = () => {
  const { firstButton: _firstButton, ...shared } = slots
  return shared
}

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

defineExpose({
  clearSelection: () => tableRef.value?.clearSelection(),
  toggleRowSelection: (row: T, selected?: boolean) => tableRef.value?.toggleRowSelection(row, selected),
  doLayout: () => tableRef.value?.doLayout(),
})
</script>

<template>
  <div class="w-full mb-4">
    <div class="flex flex-wrap items-center min-h-12 bg-gray-200 px-1.5 rounded-t justify-end">
      <div class="flex flex-wrap items-center gap-1">
        <slot name="firstButton"></slot>
        <button
          type="button"
          :aria-label="t('table.configureColumns')"
          class="table-icon-action cursor-pointer text-text text-xl flex items-center justify-center hover:text-blue-600"
          @click="openTransferDialog"
        >
          <el-icon aria-hidden="true">
            <Setting />
          </el-icon>
        </button>

        <button
          type="button"
          :aria-label="t('table.exportExcel')"
          class="table-icon-action cursor-pointer flex items-center justify-center"
          @mouseenter="state.itemOnHover = true"
          @mouseleave="state.itemOnHover = false"
          @click="handelExcelClick"
        >
          <img
            v-if="!state.itemOnHover"
            src="@/assets/icons/excel.svg"
            alt=""
            class="w-6 h-6"
          />
          <img
            v-if="state.itemOnHover"
            src="@/assets/icons/excel-active.svg"
            alt=""
            class="w-6 h-6"
          />
        </button>
      </div>
    </div>

    <base-table
      ref="tableRef"
      v-bind="tableProps"
      @selection-change="handleSelectionChange"
      @cell-click="handleCellClick"
      @column-sort-change="handleColumnSortChange"
      @click:checkRow="handleCheckClick"
      @click:editRow="handleEditClick"
    >
      <template v-for="(_, name) in tableSlots()" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>
    </base-table>
  </div>
</template>

<style scoped lang="scss">
.table-icon-action {
  min-width: 44px;
  min-height: 44px;

  &:focus-visible {
    outline: 2px solid var(--main-color);
    outline-offset: 2px;
  }
}
</style>

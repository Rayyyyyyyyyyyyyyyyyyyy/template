<script setup lang="ts">
import { h, ref } from 'vue'
import { BaseDialog, BaseTable, SearchableListPanel } from 'rayyy-vue-table-components/components'
import type {
  BaseDialogEmits,
  BaseDialogProps,
  BaseTableEmits,
  BaseTableSlots,
  TableColumn,
} from 'rayyy-vue-table-components/types'
import type { BaseTableEmits as LegacyBaseTableEmits } from 'rayyy-vue-table-components/types/components'

interface Row extends Record<string, unknown> {
  id: number
  name: string
}

const rows: Row[] = [{ id: 1, name: 'Ada' }]
const columns: TableColumn<Row>[] = [{ prop: 'name', label: 'Name' }]
const dialogVisible = ref(false)
const pager = { page: 1, limit: 10, totalCount: 1 }

const selectionHandler: BaseTableEmits<Row>['selection-change'] = (selection) => {
  void selection[0]?.name
}
const legacySelectionHandler: LegacyBaseTableEmits<Row>['selection-change'] = selectionHandler

const dialogEmit: BaseDialogEmits = (event, ...args) => {
  if (event === 'update:modelValue') dialogVisible.value = args[0] as boolean
}

const dialogProps: BaseDialogProps = {
  modelValue: true,
  customWidth: '720px',
}

const slots: BaseTableSlots<Row> = {
  expand: ({ row }) => [h('span', row.name)],
}

// @ts-expect-error selection payload must contain Row values
const badSelectionHandler: BaseTableEmits<Row>['selection-change'] = (selection: string[]) => selection
// @ts-expect-error customWidth must be a string
const badDialogProps: BaseDialogProps = { modelValue: true, customWidth: 720 }
// @ts-expect-error callable emits reject an invalid payload
dialogEmit('update:modelValue', 'yes')
// @ts-expect-error expand slot receives Row, not a number
slots.expand?.({ row: 1, $index: 0 })

void dialogProps
void legacySelectionHandler
void badSelectionHandler
void badDialogProps
</script>

<template>
  <BaseDialog v-model="dialogVisible" title="Consumer" custom-width="720px" />
  <SearchableListPanel title="Rows" :pagination="pager" :show-pagination="false">
    <template #main>
      <BaseTable
        :data="rows"
        :columns="columns"
        show-expand
        @selection-change="selectionHandler"
      >
        <template #expand="{ row }">{{ row.name }}</template>
      </BaseTable>
    </template>
  </SearchableListPanel>
</template>

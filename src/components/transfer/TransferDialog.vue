<script setup lang="ts" generic="T = Record<string, unknown>">
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TableColumn } from '../../types'
import type { CheckboxValueType } from 'element-plus'
import BaseDialog from '../items/BaseDialog.vue'
import TransferItem from './transferItem.vue'
import SearchBar from '../items/SearchBar.vue'
import type { TransferDialogEventMap, TransferDialogProps, TransferDialogSlots } from '../../types/components'

const { t } = useI18n()

const props = defineProps<TransferDialogProps<T>>()

const emit = defineEmits<TransferDialogEventMap<T>>()
defineSlots<TransferDialogSlots<T>>()

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

interface State {
  localColumns: TableColumn<T>[]
  clickItemProp: string
  checkList: string[]
}
const state = reactive<State>({
  localColumns: props.columnsValue.map((column) => ({ ...column })),
  clickItemProp: '',
  checkList: props.columnsValue
    .filter((item) => item.checkActive && item.prop)
    .map((item) => item.prop as string),
})

const searchKeyword = ref('')
const displayedColumns = computed(() => {
  const keyword = searchKeyword.value.trim()
  if (!keyword) return state.localColumns
  return state.localColumns.filter((column) => column.label.toLowerCase().includes(keyword.toLowerCase()))
})

const resolveDraftIndex = (displayIndex: number) => {
  const column = displayedColumns.value[displayIndex]
  if (!column) return -1
  return state.localColumns.indexOf(column)
}

const moveColumn = (from: number, to: number) => {
  if (from < 0 || to < 0 || from === to || to >= state.localColumns.length) return
  const [item] = state.localColumns.splice(from, 1)
  state.localColumns.splice(to, 0, item)
}

const handleItemEvents = {
  toTop: (index: number) => {
    moveColumn(resolveDraftIndex(index), 0)
  },
  toBottom: (index: number) => {
    moveColumn(resolveDraftIndex(index), state.localColumns.length - 1)
  },
  toPre: (index: number) => {
    const draftIndex = resolveDraftIndex(index)
    moveColumn(draftIndex, draftIndex - 1)
  },
  toNext: (index: number) => {
    const draftIndex = resolveDraftIndex(index)
    moveColumn(draftIndex, draftIndex + 1)
  },
  toLock: (index: number) => {
    const draftIndex = resolveDraftIndex(index)
    if (draftIndex < 0) return
    const item = state.localColumns.splice(draftIndex, 1)[0]
    item.fixed = 'left'
    state.localColumns.unshift(item)
  },

  toUnLock: (index: number) => {
    const draftIndex = resolveDraftIndex(index)
    if (draftIndex >= 0) delete state.localColumns[draftIndex].fixed
  },
}

// Accept only a permutation of the visible draft identities. A malformed slot
// payload must never drop, duplicate, or replace hidden columns or their edits.
const handleReorder = (columns: TableColumn<T>[]) => {
  const visible = displayedColumns.value
  if (columns.length !== visible.length || new Set(columns).size !== visible.length ||
      columns.some((column) => !visible.includes(column))) return
  const visibleSet = new Set(visible)
  let index = 0
  state.localColumns = state.localColumns.map((column) =>
    visibleSet.has(column) ? columns[index++] : column,
  )
}

const initializeState = () => {
  state.localColumns = props.columnsValue.map((column) => ({ ...column }))
  state.checkList = props.columnsValue
    .filter((item) => item.checkActive && item.prop)
    .map((item) => item.prop as string)
  searchKeyword.value = ''
}

watch(
  () => dialogVisible.value,
  (newValue) => {
    if (newValue) {
      initializeState()
    } else {
      state.clickItemProp = ''
      state.localColumns = []
      state.checkList = []
      searchKeyword.value = ''
    }
  },
)
const handlerSubmit = () => {
  emit('update:submit', state.localColumns.map((column) => ({ ...column })))
}

const handleCheckAllChange = (val: CheckboxValueType) => {
  state.checkList = val
    ? state.localColumns.filter((item) => item.prop).map((item) => item.prop as string)
    : []
  handleCheckChange(state.checkList)
}
const handleCheckChange = (val: CheckboxValueType[]) => {
  const stringValues = val.map((v) => String(v))
  state.checkList = stringValues
  state.localColumns.forEach((column) => {
    if (!column.prop) return
    column.checkActive = stringValues.includes(column.prop)
  })
  // 即時 emit checkbox 狀態變更
  emit('update:checkChange', {
    columns: state.localColumns.map((column) => ({ ...column })),
    checkList: [...state.checkList],
  })
}

const isAllChecked = computed(() => {
  return state.localColumns.length > 0 && state.checkList.length === state.localColumns.filter((c) => c.prop).length
})

const checkAll = computed({
  get: () => isAllChecked.value,
  set: (val) => handleCheckAllChange(val),
})
const resetFilterColumn = () => {
  searchKeyword.value = ''
}
const doFilterColumn = (keyword: string) => {
  searchKeyword.value = keyword
}
</script>

<template>
  <base-dialog v-model="dialogVisible" :title="transferTitle" @click:submit="handlerSubmit">
    <div class="search-bar">
      <search-bar
        :show-search="true"
        @update:clear="resetFilterColumn"
        @keydown:enter="doFilterColumn"
      />
    </div>
    <div class="transfer-sort-wrapper">
      <el-checkbox v-model="checkAll" class="px-4">
        {{ t('common.column') }} ({{ state.checkList.length }}/{{ state.localColumns.length }})
      </el-checkbox>
      <el-checkbox-group v-model="state.checkList" @change="handleCheckChange">
        <!-- 自定義列表容器 slot，讓外部可以選擇是否使用 draggable -->
        <slot
          name="list-container"
          :columns="displayedColumns"
          :click-item-prop="state.clickItemProp"
          :handle-item-events="handleItemEvents"
          :handle-reorder="handleReorder"
          :handle-mousedown="(prop: string) => (state.clickItemProp = prop)"
        >
          <!-- 默認的靜態列表 -->
          <template v-for="(element, index) in displayedColumns" :key="element.prop">
            <transfer-item
              :dialog-modal-visible="dialogVisible"
              :columns-value="element"
              :columns-index="state.localColumns.indexOf(element)"
              :columns-len="state.localColumns.length"
              :class="{
                'transfer-active-bg': element.checkActive,
                'transfer-active-border': state.clickItemProp == element.prop,
              }"
              @mousedown="state.clickItemProp = element.prop || ''"
              @update:toTop="handleItemEvents.toTop(index)"
              @update:toBottom="handleItemEvents.toBottom(index)"
              @update:toPre="handleItemEvents.toPre(index)"
              @update:toNext="handleItemEvents.toNext(index)"
              @update:toLock="handleItemEvents.toLock(index)"
              @update:toUnLock="handleItemEvents.toUnLock(index)"
            />
          </template>
        </slot>
      </el-checkbox-group>
    </div>
  </base-dialog>
</template>

<style scoped lang="scss"></style>

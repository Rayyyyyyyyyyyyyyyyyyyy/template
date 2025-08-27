<script setup lang="ts" generic="T = Record<string, unknown>">
import { computed, reactive, watch } from 'vue'
import type { TableColumn } from 'src/types'
import draggable from 'vuedraggable'
import _ from 'lodash'
import type { CheckboxValueType } from 'element-plus'
import BaseDialog from '@/components/BaseDialog.vue'
import SearchBar from '@/components/SearchBar.vue'
import TransferItem from '@/components/transfer/transferItem.vue'

const props = defineProps<{
  modelValue: boolean
  columnsValue: TableColumn<T>[]
  transferTitle: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:submit', data: TableColumn<T>[]): void
}>()

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
  localColumns: _.cloneDeep(props.columnsValue),
  clickItemProp: '',
  checkList: props.columnsValue.map((item) => item.prop) as string[],
})
const handleItemEvents = {
  toTop: (index: number) => {
    if (index <= 0) return
    const item = state.localColumns.splice(index, 1)[0]
    state.localColumns.unshift(item)
  },
  toBottom: (index: number) => {
    if (index >= state.localColumns.length - 1) return
    const item = state.localColumns.splice(index, 1)[0]
    state.localColumns.push(item)
  },
  toPre: (index: number) => {
    if (index > 0) {
      const temp = state.localColumns[index]
      state.localColumns[index] = state.localColumns[index - 1]
      state.localColumns[index - 1] = temp
    }
  },
  toNext: (index: number) => {
    if (index < state.localColumns.length - 1) {
      const temp = state.localColumns[index]
      state.localColumns[index] = state.localColumns[index + 1]
      state.localColumns[index + 1] = temp
    }
  },
}

const initializeState = () => {
  state.localColumns = _.cloneDeep(props.columnsValue)
  state.checkList = props.columnsValue
    .filter((item) => item.checkActive)
    .map((item) => item.prop || '') as string[]
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
    }
  },
)
const handlerSubmit = () => {
  emit('update:submit', state.localColumns)
}

const handleCheckAllChange = (val: CheckboxValueType) => {
  const allProp = props.columnsValue.map((item) => item.prop)
  state.checkList = val ? (allProp as string[]) : ([] as string[])
  handleCheckChange(state.checkList)
}
const handleCheckChange = (val: CheckboxValueType[]) => {
  const stringValues = val.map((v) => String(v))
  state.localColumns.forEach((column) => {
    column.checkActive = stringValues.includes(column.prop as string)
  })
}

const isAllChecked = computed(() => {
  return state.localColumns.length > 0 && state.checkList.length === state.localColumns.length
})

const checkAll = computed({
  get: () => isAllChecked.value,
  set: (val) => handleCheckAllChange(val),
})
const resetFilterColumn = () => {
  state.localColumns = _.cloneDeep(props.columnsValue)
}
const doFilterColumn = (keyword: string) => {
  if (keyword.length > 0) {
    const cloneList = _.cloneDeep(state.localColumns)
    state.localColumns = cloneList.filter((item) => item.label.includes(keyword))
  } else {
    resetFilterColumn()
  }
}
</script>

<template>
  <base-dialog v-model="dialogVisible" :title="transferTitle" @click:submit="handlerSubmit">
    <div class="search-bar">
      <search-bar
        :show-filter="false"
        :show-search="true"
        :full-input="true"
        @update:clear="resetFilterColumn"
        @keydown:enter="doFilterColumn"
      />
    </div>
    <div class="sort-wrapper">
      <el-checkbox v-model="checkAll" class="px-4" @change="handleCheckAllChange">
        欄 ({{ state.checkList.length }}/{{ state.localColumns.length }})
      </el-checkbox>
      <el-checkbox-group v-model="state.checkList" @change="handleCheckChange">
        <draggable :list="state.localColumns" item-key="prop" delay="200">
          <template #item="{ element, index }">
            <transfer-item
              :dialog-modal-visible="dialogVisible"
              :columns-value="element"
              :columns-index="index"
              :columns-len="state.localColumns.length"
              :class="{
                'active-border': state.clickItemProp == element.prop,
                'active-bg': element.checkActive,
              }"
              @mousedown="state.clickItemProp = element.prop"
              @update:toTop="handleItemEvents.toTop(index)"
              @update:toBottom="handleItemEvents.toBottom(index)"
              @update:toPre="handleItemEvents.toPre(index)"
              @update:toNext="handleItemEvents.toNext(index)"
            />
          </template>
        </draggable>
      </el-checkbox-group>
    </div>
  </base-dialog>
</template>

<style scoped lang="scss">
.sort-wrapper {
  @apply border;
  @apply h-96 overflow-auto;
}

.active-bg {
  @apply bg-primary/10;
}
.active-border {
  @apply border rounded;
  @apply border-primary-10;
}
</style>

<script setup lang="ts" generic="T = Record<string, unknown>">
import { ArrowUp, ArrowDown, Top, Bottom, Lock, Unlock } from '@element-plus/icons-vue'
import { computed, reactive, watch } from 'vue'
import BaseBtn from '../items/BaseBtn.vue'
import type { Component } from 'vue'
import type { TransferItemEventMap, TransferItemProps } from '../../types/components'

const props = defineProps<TransferItemProps<T>>()
const state = reactive({
  itemOnHover: false,
  itemOnClick: false,
})

type TEmitKey = keyof TransferItemEventMap

const emits = defineEmits<TransferItemEventMap>()

const onMouseDown = () => {
  state.itemOnClick = true
  state.itemOnHover = false
}
const onMouseUp = () => {
  state.itemOnClick = false
  state.itemOnHover = true
}

watch(
  () => props.dialogModalVisible,
  (newValue) => {
    if (!newValue) {
      state.itemOnClick = false
      state.itemOnHover = false
    }
  },
)

interface IItem {
  icon: Component
  emitKey: TEmitKey
  isDisabled: boolean
}

const isLockItem = computed(() => !!props.columnsValue.fixed)

const btnList = computed((): IItem[] => [
  {
    icon: Unlock,
    emitKey: 'update:toUnLock',
    isDisabled: !isLockItem.value,
  },
  {
    icon: Lock,
    emitKey: 'update:toLock',
    isDisabled: isLockItem.value,
  },
  {
    icon: Top,
    emitKey: 'update:toTop',
    isDisabled: props.columnsIndex === 0,
  },
  {
    icon: ArrowUp,
    emitKey: 'update:toPre',
    isDisabled: props.columnsIndex === 0,
  },
  {
    icon: ArrowDown,
    emitKey: 'update:toNext',
    isDisabled: props.columnsIndex === props.columnsLen - 1,
  },
  {
    icon: Bottom,
    emitKey: 'update:toBottom',
    isDisabled: props.columnsIndex === props.columnsLen - 1,
  },
])
const itemSpan = 24 / btnList.value.length

const onItemBtnClick = (key: TEmitKey) => {
  emits(key as Parameters<typeof emits>[0])
}
</script>

<template>
  <div
    class="transfer-item-wrapper"
    @mouseenter="state.itemOnHover = true"
    @mouseleave="state.itemOnHover = false"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    :class="{
      'cursor-grab': state.itemOnHover,
      'cursor-grabbing': state.itemOnClick,
    }"
  >
    <el-checkbox :label="columnsValue.label" :value="columnsValue.prop" :key="columnsValue.prop" />

    <el-row class="transfer-arrow-wrapper" justify="space-around" :gutter="8">
      <el-col :span="itemSpan" v-for="item in btnList" :key="item.emitKey">
        <base-btn
          :icon="item.icon"
          :disabled="item.isDisabled"
          link
          type="primary"
          @click="onItemBtnClick(item.emitKey)"
        />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts" generic="T = Record<string, unknown>">
import type { TableColumn } from 'src/types'
import { ArrowUp, ArrowDown, Top, Bottom } from '@element-plus/icons-vue'
import { reactive, watch } from 'vue'
import { BaseBtn } from '@/components'

const props = defineProps<{
  dialogModalVisible: boolean
  columnsValue: TableColumn<T>
  columnsIndex: number
  columnsLen: number
}>()
const state = reactive({
  itemOnHover: false,
  itemOnClick: false,
})

defineEmits<{
  (e: 'update:toTop'): void
  (e: 'update:toPre'): void
  (e: 'update:toNext'): void
  (e: 'update:toBottom'): void
}>()
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
</script>

<template>
  <div
    class="item-wrapper"
    @mouseenter="state.itemOnHover = true"
    @mouseleave="state.itemOnHover = false"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    :class="{ 'cursor-grab': state.itemOnHover, 'cursor-grabbing': state.itemOnClick }"
  >
    <el-checkbox :label="columnsValue.label" :value="columnsValue.prop" :key="columnsValue.prop" />

    <el-row class="arrow-wrapper" v-if="columnsValue.checkActive">
      <el-col :span="6">
        <base-btn
          :icon="Top"
          :disabled="columnsIndex === 0"
          link
          type="primary"
          @click="$emit('update:toTop')"
        />
      </el-col>
      <el-col :span="6">
        <base-btn
          :icon="ArrowUp"
          :disabled="columnsIndex === 0"
          link
          type="primary"
          @click="$emit('update:toPre')"
        />
      </el-col>
      <el-col :span="6">
        <base-btn
          :icon="ArrowDown"
          :disabled="columnsIndex === columnsLen - 1"
          link
          type="primary"
          @click="$emit('update:toNext')"
        />
      </el-col>
      <el-col :span="6">
        <base-btn
          :icon="Bottom"
          :disabled="columnsIndex === columnsLen - 1"
          link
          type="primary"
          @click="$emit('update:toBottom')"
        />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.item-wrapper {
  @apply border-t px-4;
  @apply flex items-center justify-between w-full;

  .arrow-wrapper {
    @apply w-28;
    @apply text-primary-10;
  }
}
</style>

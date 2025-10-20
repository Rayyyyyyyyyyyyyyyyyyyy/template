<script lang="ts" setup>
import type { ElOptions } from '@/types/OptionDto.ts'

export type Selection = string | string[]

const props = withDefaults(
  defineProps<{
    modelValue?: Selection
    options?: ElOptions[]
    placeholder?: string
    collapseTags?: boolean
    collapseTagsTooltip?: boolean
    multiple?: boolean
    disabled?: boolean
    class?: string
  }>(),
  {
    modelValue: () => '',
    options: () => [{ value: '', label: '' }],
    placeholder: '請選擇',
    class: 'w-full',
  },
)

const emits = defineEmits<{
  (e: 'update:modelValue', data?: Selection): void
}>()

function updateValue(val: Selection) {
  let value: Selection | undefined = val

  if (typeof value === 'string' && !value) {
    // el-select 元件裡包的是 input，所以當清空時預設會給 string，故把空字串轉成 undefined
    value = undefined
  }

  emits('update:modelValue', value)
}
</script>

<template>
  <el-select
    :model-value="modelValue"
    :class="props.class"
    :placeholder="props.placeholder"
    :clearable="true"
    :collapse-tags="props.collapseTags"
    :collapse-tags-tooltip="props.collapseTagsTooltip"
    :multiple="props.multiple"
    :disabled="props.disabled"
    :reserve-keyword="false"
    filterable
    @update:model-value="updateValue"
    popper-class="my-select-popper"
  >
    <el-option v-for="it in options" :key="it.label" :label="it.label" :value="it.value" />
  </el-select>
</template>

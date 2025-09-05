<template>
  <el-select
    :model-value="modelValue"
    :class="props.class"
    :placeholder="props.placeholder"
    :clearable="props.clearable"
    :collapse-tags="props.collapseTags"
    :collapse-tags-tooltip="props.collapseTagsTooltip"
    :multiple="props.multiple"
    :disabled="props.disabled"
    :reserve-keyword="false"
    filterable
    @update:model-value="updateValue"
  >
    <el-option v-for="it in options" :key="it.label" :label="it.label" :value="it.value" />
  </el-select>
</template>

<script lang="ts" setup>
import type { ElOptions } from '@/types/OptionDto.ts'

export type Selection = string | string[]

const props = withDefaults(
  defineProps<{
    modelValue?: Selection
    options?: ElOptions[]
    placeholder?: string
    clearable?: boolean
    collapseTags?: boolean
    collapseTagsTooltip?: boolean
    multiple?: boolean
    disabled?: boolean
    class?: string
    dataCy?: string
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
    value = undefined
  }

  emits('update:modelValue', value)
}
</script>

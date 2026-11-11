<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import type { BaseSelectorEventMap, BaseSelectorProps } from '../../types/components'

export type Selection = string | string[] | null

const props = withDefaults(
  defineProps<BaseSelectorProps>(),
  {
    modelValue: () => '',
    options: () => [{ value: '', label: '' }],
    class: 'w-full',
  },
)

const emits = defineEmits<BaseSelectorEventMap>()
const { t } = useI18n()

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
    :placeholder="props.placeholder ?? t('common.select')"
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
    <el-option v-for="it in options" :key="String(it.value)" :label="it.label" :value="it.value" />
  </el-select>
</template>

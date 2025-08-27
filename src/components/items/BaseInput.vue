
<script lang="ts" setup>
import { computed, useSlots } from 'vue'

const props = defineProps<{
  modelValue?: string | number | null
  placeholder?: string
  type?: string
  class?: string | { [key: string]: boolean }
  showPassword?: boolean
  disabled?: boolean
  readonly?: boolean
  maxlength?: string | number
  autocomplete?: string
  dataCy?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', data: string | number | undefined | null): void
  (e: 'update:clearValue'): void
}>()

const slots = useSlots()

const v = computed({
  get: () => props.modelValue,
  set: (val: string | number | null | undefined) => emits('update:modelValue', val),
})
const handlerClear = () => {
  emits('update:clearValue')
}
</script>


<template>
  <el-input
    v-model="v"
    :placeholder="props.placeholder"
    :type="props.type"
    :class="props.class"
    :show-password="props.showPassword"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :maxlength="props.maxlength"
    :autocomplete="props.autocomplete"
    clearable
    @clear="handlerClear"
  >
    <template v-if="slots.prefix" #prefix>
      <slot name="prefix" class="h-4" />
    </template>
    <template v-if="slots.append" #append><slot name="append" /></template>
  </el-input>
</template>

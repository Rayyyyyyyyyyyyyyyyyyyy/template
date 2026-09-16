<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import { Search } from '@element-plus/icons-vue'
import type { BaseInputEventMap, BaseInputProps } from '../../types/components'

const props = defineProps<BaseInputProps>()

const emits = defineEmits<BaseInputEventMap>()

// 獲取所有非 props 屬性
const attrs = useAttrs()

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
    v-bind="attrs"
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
    <template #prefix v-if="showSearch">
      <div class="text-text-border w-full h-full flex items-center justify-center text-lg">
        <el-icon><Search /></el-icon>
      </div>
    </template>
  </el-input>
</template>

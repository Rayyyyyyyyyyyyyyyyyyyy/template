<script setup lang="ts" generic="T extends Record<string, unknown>">
import { computed, ref, useAttrs } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

type Props<T extends object = object> = {
  modelValue?: T
  rules?: FormRules
  labelWidth?: string
}
const props = withDefaults(defineProps<Props>(), {})

// 獲取所有非 props 屬性
const attrs = useAttrs()

const computedLabelWidth = computed(() => {
  if (props.labelWidth) return props.labelWidth
  else return '100px'
})

const formData = computed(() => props.modelValue)

defineEmits<{
  (e: 'update:modelValue', value: Record<string, unknown>): void
  (e: 'submit'): void
  (e: 'validate', valid: boolean): void
}>()

const formRef = ref<FormInstance>()

const validate = async () => {
  if (!formRef.value) return false
  return await formRef.value.validate()
}

const resetFields = () => {
  formRef.value?.resetFields()
}

const clearValidate = (props?: string | string[]) => {
  formRef.value?.clearValidate(props)
}

const validateField = (prop: string) => {
  formRef.value?.validateField(prop)
}

defineExpose({
  validate,
  resetFields,
  clearValidate,
  validateField,
})
</script>

<template>
  <el-form
    v-bind="attrs"
    ref="formRef"
    :model="formData"
    :label-width="computedLabelWidth"
    :rules="rules"
    @submit.prevent
    class="filter-form"
  >
    <slot></slot>
  </el-form>
</template>

<style scoped lang="scss"></style>

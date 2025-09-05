
<script setup lang="ts">
import { ref } from 'vue'
import type { ElInput } from 'element-plus'

const inputValue = ref<string>('')
const InputRef = ref<InstanceType<typeof ElInput>>()

const props = withDefaults(
  defineProps<{
    modelValue: string[]
    type?: string
    validateRule?: (inputString: string) => boolean
  }>(),
  {
    type: 'textarea',
    validateRule: () => true,
  }
)

const emits = defineEmits<{
  (e: 'update:modelValue', val: string[]): void
  (e: 'inputError'): void
}>()

const remove = (position: number) => {
  emits(
    'update:modelValue',
    props.modelValue.filter((input, index) => index !== position)
  )
}

const handleInputConfirm = () => {
  const inputString = inputValue.value
  if (!inputString) {
    return
  }

  if (!props.validateRule(inputString)) {
    emits('inputError')
    return
  }
  if (!props.modelValue.includes(inputString)) {
    emits('update:modelValue', props.modelValue.concat(inputValue.value))
  }

  inputValue.value = ''
}

const focusInput = () => {
  InputRef.value?.focus()
}

const deleteLastTag = () => {
  if (inputValue.value) {
    return
  }
  emits('update:modelValue', props.modelValue.slice(0, -1))
}
</script>

<template>
  <div class="w-full border border-t rounded" @click="focusInput" >
    <el-tag
      v-for="(tag, position) in props.modelValue"
      :key="tag"
      class="m-0.5 break-all whitespace-pre-line"
      closable
      @close="() => remove(position)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      ref="InputRef"
      v-model="inputValue"
      :type="props.type"
      class="shadow-none"
      autosize
      resize="none"
      @keydown.enter.prevent="handleInputConfirm"
      @blur="handleInputConfirm"
      @keydown.delete.stop="deleteLastTag"
    />
  </div>
</template>


<style scoped lang="scss">
:deep(.el-input) {
  --el-input-border-color: transparent;
  --el-input-focus-border-color: transparent;
  --el-border-color-hover: transparent;
}

:deep(.el-input__inner) {
  box-shadow: none !important;
}

:deep(.el-input__inner:hover) {
  box-shadow: none !important;
}

:deep(.el-input)::-webkit-outer-spin-button,
:deep(.el-input)::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

:deep(.el-input[type='number']) {
  -moz-appearance: textfield;
}
</style>

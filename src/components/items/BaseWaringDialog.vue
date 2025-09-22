<script setup lang="ts">
import { computed } from 'vue'
import BaseDialog from './BaseDialog.vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    waringText?: string
    subWaringText?: string
    titleText?: string
    modalWidth?: string
  }>(),
  {
    waringText: '請問是否確認移除該使用者',
    titleText: '警告',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:submit'): void
}>()
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const handleSubmit = () => {
  emit('update:submit')
}
</script>

<template>
  <base-dialog
    v-model="dialogVisible"
    :title="titleText"
    :custom-width="modalWidth"
    :is-waring="true"
    @click:submit="handleSubmit"
  >
    <div class="w-full h-16 flex items-center justify-center flex-col">
      <slot>
        <p>{{ subWaringText }}</p>
        <p>{{ waringText }} ?</p>
      </slot>
    </div>
  </base-dialog>
</template>

<style scoped lang="scss"></style>

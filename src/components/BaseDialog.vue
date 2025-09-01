<script setup lang="ts">
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import BaseBtn from '@/components/items/BaseBtn.vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
  subTitle?: string
  beforeClose?: () => void
  customWidth?: string
  isWaring?: boolean
  isPrimary?: boolean
  bodyLoading?: boolean
  submitLoading?: boolean
}>()

const { width } = useWindowSize()

const emits = defineEmits<{
  (e: 'update:modelValue', data: boolean): void
  (e: 'click:submit'): void
}>()

const v = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emits('update:modelValue', val),
})

const getWidth = computed(() => {
  if (width.value < 1000) {
    return '80%'
  } else if (props.customWidth) {
    return props.customWidth
  }
  return '50%'
})

const handleCancel = () => {
  v.value = false
}
const handleSubmit = () => {
  emits('click:submit')
}
</script>

<template>
  <el-dialog
    v-model="v"
    :title="props.title"
    :width="getWidth"
    :before-close="props.beforeClose"
    :close-on-click-modal="false"
    center
    class="rounded-md base-dialog"
    :class="{ 'waring-dialog': props.isWaring, 'upload-result-dialog': props.isPrimary }"
    align-center
    destroy-on-close
  >
    <template #header="{ titleId, titleClass }">
      <slot name="customHeader">
        <p :id="titleId" class="base-dialog-title" :class="titleClass">
          {{ props.title }}
        </p>
      </slot>
    </template>

    <div class="p-2" v-loading="bodyLoading">
      <div
        class="sub-title"
        :class="{
          'border-b mb-4': typeof subTitle == 'string',
        }"
      >
        {{ subTitle }}
      </div>

      <slot></slot>
    </div>
    <template #footer>
      <footer>
        <slot name="customFooter">
          <base-btn
            text="確定"
            type="primary"
            is-fill
            @click="handleSubmit"
            :loading="submitLoading"
          />
          <base-btn text="取消" type="primary" @click="handleCancel" />
        </slot>
      </footer>
    </template>
  </el-dialog>
</template>

<style scoped></style>

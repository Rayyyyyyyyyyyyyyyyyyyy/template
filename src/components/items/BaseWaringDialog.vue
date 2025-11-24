<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseDialog from './BaseDialog.vue'

const { t } = useI18n()

const props = defineProps<{
  modelValue: boolean
  waringText?: string
  subWaringText?: string
  titleText?: string
}>()

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
    :title="titleText || t('common.warning')"
    :is-waring="true"
    @click:submit="handleSubmit"
  >
    <div class="w-full h-16 flex items-center justify-center flex-col">
      <slot>
        <p>{{ subWaringText }}</p>
        <p>{{ waringText || t('dialog.confirmRemoveUser') }} ?</p>
      </slot>
    </div>
  </base-dialog>
</template>

<style scoped lang="scss"></style>

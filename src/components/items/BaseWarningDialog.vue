<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseDialog from './BaseDialog.vue'
import type {
  BaseWarningDialogEventMap,
  BaseWarningDialogProps,
  BaseWarningDialogSlots,
} from '../../types/components'

const { t } = useI18n()

const props = defineProps<BaseWarningDialogProps>()

const emit = defineEmits<BaseWarningDialogEventMap>()
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const handleSubmit = () => {
  emit('update:submit')
}
defineSlots<BaseWarningDialogSlots>()
</script>

<template>
  <base-dialog
    v-model="dialogVisible"
    :title="titleText || t('common.warning')"
    :is-warning="true"
    :danger-submit="dangerSubmit"
    @click:submit="handleSubmit"
  >
    <div class="w-full min-h-16 flex items-center justify-center flex-col">
      <slot>
        <p>{{ subWarningText }}</p>
        <p>{{ warningText || t('dialog.confirmRemoveUser') }} ?</p>
      </slot>
    </div>
  </base-dialog>
</template>

<style scoped lang="scss"></style>

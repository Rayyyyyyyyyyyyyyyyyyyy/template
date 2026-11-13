<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseBtn from './BaseBtn.vue'
import type { BaseDialogSlots, BaseDialogEventMap, BaseDialogProps } from '../../types/components'

const { t } = useI18n()

const props = defineProps<BaseDialogProps>()

const viewportWidth = ref(typeof window === 'undefined' ? 1024 : window.innerWidth)
const updateViewportWidth = () => {
  viewportWidth.value = window.innerWidth
}

onMounted(() => window.addEventListener('resize', updateViewportWidth))
onBeforeUnmount(() => window.removeEventListener('resize', updateViewportWidth))

const emits = defineEmits<BaseDialogEventMap>()

const v = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emits('update:modelValue', val),
})

const getWidth = computed(() => {
  if (props.customWidth !== undefined) return props.customWidth
  return viewportWidth.value < 500 ? '100%' : '50%'
})

const handleCancel = () => {
  v.value = false
}
const cancelBtn = ref<InstanceType<typeof BaseBtn>>()
// el-dialog's focus trap focuses the container on open; `opened` fires after the enter transition, so move focus then.
const handleOpened = async () => {
  if (!props.dangerSubmit) return
  await nextTick()
  ;(cancelBtn.value?.$el as HTMLElement | undefined)?.focus()
}
const handleSubmit = () => {
  emits('click:submit')
}
defineSlots<BaseDialogSlots>()
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
    :class="{
      'warning-dialog': props.isWarning,
      'upload-result-dialog': props.isPrimary,
      'normal-header': !props.isPrimary && !props.isWarning,
    }"
    align-center
    destroy-on-close
    append-to-body
    @opened="handleOpened"
  >
    <template #header="{ titleId, titleClass }">
      <slot name="customHeader">
        <p :id="titleId" class="base-dialog-title" :class="titleClass">
          {{ props.title }}
        </p>
      </slot>
    </template>

    <div class="p-2" v-loading="bodyLoading">
      <div v-if="subTitle" class="sub-title">
        {{ subTitle }}
      </div>

      <slot></slot>
    </div>
    <template #footer>
      <footer :class="{ 'base-dialog-footer--stacked': viewportWidth < 500 }">
        <slot name="customFooter">
          <base-btn
            :text="t('common.close')"
            type="primary"
            is-fill
            @click="handleCancel"
            v-if="showClose"
          />
          <template v-if="!showClose">
            <base-btn
              :text="t('common.confirm')"
              :type="dangerSubmit ? 'danger' : 'primary'"
              is-fill
              @click="handleSubmit"
              :loading="submitLoading"
            />
            <base-btn
              ref="cancelBtn"
              :text="t('common.cancel')"
              type="primary"
              :autofocus="dangerSubmit"
              @click="handleCancel"
            />
          </template>
        </slot>
      </footer>
    </template>
  </el-dialog>
</template>

<style scoped>
.base-dialog-footer--stacked {
  display: flex;
  gap: 8px;
  width: 100%;
}
.base-dialog-footer--stacked > * {
  flex: 1 1 0;
  margin: 0;
}
</style>

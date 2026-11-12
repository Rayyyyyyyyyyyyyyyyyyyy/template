<script lang="ts" setup>
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import type { FunctionHeaderSlots, FunctionHeaderEventMap, FunctionHeaderProps } from '../../types/components'

const props = withDefaults(defineProps<FunctionHeaderProps>(), {
  title: '',
  showBack: false,
  depth: 1,
})

const emit = defineEmits<FunctionHeaderEventMap>()
const { t } = useI18n()

const handleClick = () => {
  const backPayload: { path?: string; [key: string]: unknown } = {}

  switch (typeof props.showBack) {
    case 'string':
      backPayload.path = props.showBack
      break
    case 'object':
      Object.assign(backPayload, props.showBack)
      break
    default:
      // 當 showBack 為 true 時，發出預設的返回事件
      backPayload.path = ''
  }

  emit('back', backPayload)
}
defineSlots<FunctionHeaderSlots>()
</script>

<template>
  <div class="function-header px-4 py-2 flex flex-wrap gap-3 justify-between items-center">
    <div class="flex items-center gap-2 min-w-0">
      <button v-if="showBack" type="button" :aria-label="t('common.back')"
        class="back-action flex shrink-0 items-center justify-center" @click="handleClick">
        <el-icon :size="16" aria-hidden="true"><ArrowLeftBold /></el-icon>
      </button>
      <div class="header-title font-semibold text-lg break-words min-w-0">{{ props.title }}</div>
    </div>
    <div class="flex items-center gap-3">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.function-header {
  min-height: 60px;
  background-color: var(--rvtc-header-bg, var(--el-fill-color-light));
  border-bottom: 1px solid var(--el-border-color-lighter);
}
.header-title {
  color: var(--rvtc-header-title-text, #333);
}
.back-action {
  min-width: var(--rvtc-control-min-size, 44px);
  min-height: var(--rvtc-control-min-size, 44px);
  color: var(--rvtc-text, var(--el-text-color-primary));
}
.back-action:focus-visible {
  outline: 2px solid var(--main-color, var(--el-color-primary));
  outline-offset: 2px;
}
</style>

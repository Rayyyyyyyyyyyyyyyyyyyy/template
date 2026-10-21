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
  <div class="function-header px-4 py-2 flex flex-wrap gap-3 justify-between items-center bg-primary-10">
    <div class="flex items-center gap-2 min-w-0">
      <button v-if="showBack" type="button" :aria-label="t('common.back')"
        class="back-action flex shrink-0 items-center justify-center text-black" @click="handleClick">
        <el-icon :size="16" aria-hidden="true"><ArrowLeftBold /></el-icon>
      </button>
      <div class="font-bold text-text text-xl md:text-2xl break-words min-w-0">{{ props.title }}</div>
    </div>
    <div class="flex items-center gap-3">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.function-header {
  min-height: 60px;
}
.back-action {
  min-width: 44px;
  min-height: 44px;
}
.back-action:focus-visible {
  outline: 2px solid var(--main-color);
  outline-offset: 2px;
}
</style>

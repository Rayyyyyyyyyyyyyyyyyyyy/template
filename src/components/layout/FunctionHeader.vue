<script lang="ts" setup>
import { ArrowLeftBold } from '@element-plus/icons-vue'
import type { FunctionHeaderSlots, FunctionHeaderEventMap, FunctionHeaderProps } from '../../types/components'

const props = withDefaults(defineProps<FunctionHeaderProps>(), {
  title: '',
  showBack: false,
  depth: 1,
})

const emit = defineEmits<FunctionHeaderEventMap>()

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
  <div class="h-header px-4 py-4 flex justify-between items-center bg-primary-10">
    <div class="flex items-center gap-2">
      <div v-if="showBack" class="flex items-center text-black">
        <el-icon :size="16" class="cursor-pointer" @click="handleClick"><ArrowLeftBold /></el-icon>
      </div>
      <div class="font-bold text-text text-xl md:text-2xl;">{{ props.title }}</div>
    </div>
    <div class="flex items-center gap-3">
      <slot />
    </div>
  </div>
</template>

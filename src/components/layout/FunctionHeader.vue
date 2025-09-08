<script lang="ts" setup>
import { ArrowLeftBold } from '@element-plus/icons-vue'

const props = defineProps({
  title: { type: String, required: false, default: '' },
  showBack: {
    type: [Boolean, String, Object],
    required: false,
    default: false,
  },
  depth: { type: Number, required: false, default: 1 },
})

const emit = defineEmits<{
  back: [payload: { path?: string; [key: string]: unknown }]
}>()

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

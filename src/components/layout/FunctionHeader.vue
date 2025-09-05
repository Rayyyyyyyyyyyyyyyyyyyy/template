<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { extractSubRoutes } from '@/utils/routeFormatters.ts'

const props = defineProps({
  title: { type: String, required: false, default: '' },
  showBack: {
    type: [Boolean, String, Object],
    required: false,
    default: false,
  },
  depth: { type: Number, required: false, default: 1 },
})

const { push } = useRouter()
const { path } = useRoute()

const handleClick = () => {
  const subdirectory = { path: extractSubRoutes(path, props.depth) }
  switch (typeof props.showBack) {
    case 'string':
      push(props.showBack)
      break
    case 'object':
      push({ ...subdirectory, ...props.showBack })
      break
    default:
      push(subdirectory)
  }
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

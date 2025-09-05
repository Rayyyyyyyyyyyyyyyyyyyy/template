<script lang="ts" setup>
import { FunctionHeader } from '@/components'

const props = withDefaults(
  defineProps<{
    title?: string
    showBack?: boolean | string | object
    depth?: number
  }>(),
  {
    title: '',
    showBack: false,
    depth: 1,
  },
)
</script>

<template>
  <function-header :title="props.title" :showBack="props.showBack" :depth="props.depth" />

  <el-scrollbar class="max-h-[calc(100vh-120px)] max-w-[100vw] overflow-auto">
    <div v-if="$slots.searchBar" class="px-4 pt-1.5">
      <slot name="searchBar" />
    </div>

    <div v-if="$slots.main" class="py-1.5 px-4">
      <slot name="main" />
    </div>
  </el-scrollbar>

  <div v-if="$slots.footer" class="flex justify-start pl-1.5 pt-0">
    <!-- 這個 slot 在列表可放 pagination -->
    <slot name="footer" />
  </div>
</template>



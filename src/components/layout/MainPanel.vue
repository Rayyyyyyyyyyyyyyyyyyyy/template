<script lang="ts" setup>
import FunctionHeader from './FunctionHeader.vue'
import type { FunctionHeaderEventMap, MainPanelSlots, MainPanelEventMap, MainPanelProps } from '../../types/components'

const props = withDefaults(
  defineProps<MainPanelProps>(),
  {
    title: '',
    showBack: false,
    depth: 1,
  },
)

const emit = defineEmits<MainPanelEventMap>()
const onBackClick = (payload: FunctionHeaderEventMap['back'][0]) => {
  emit('click:back', payload)
}
defineSlots<MainPanelSlots>()
</script>

<template>
  <function-header
    :title="props.title"
    :showBack="props.showBack"
    @back="onBackClick"
    :depth="props.depth"
  />

  <el-scrollbar class="panel-scrollbar">
    <div v-if="$slots.searchBar" class="px-4 pt-1.5">
      <slot name="searchBar" />
    </div>

    <div v-if="$slots.main" class="py-1.5 px-4">
      <slot name="main" />
    </div>
  </el-scrollbar>

  <div v-if="$slots.footer" class="panel-footer flex flex-wrap justify-start gap-3 px-4 py-2">
    <!-- 這個 slot 在列表可放 pagination -->
    <slot name="footer" />
  </div>
</template>

<style scoped>
.panel-scrollbar {
  max-height: var(--rvtc-panel-max-height, calc(100vh - 180px));
  max-width: 100vw;
  @apply overflow-auto;
}
.panel-footer {
  min-width: 0;
  max-width: 100%;
}
</style>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import MainPanel from './MainPanel.vue'
import BaseBtn from '../items/BaseBtn.vue'
import type { FunctionHeaderEventMap, FilterLayoutSlots, FilterLayoutEventMap, FilterLayoutProps } from '../../types/components'

const { t } = useI18n()

defineProps<FilterLayoutProps>()

const emit = defineEmits<FilterLayoutEventMap>()

const doFilter = () => {
  emit('submitEmit')
}
const resetFilter = () => {
  emit('resetEmit')
}

const handleBackClick = (payload: FunctionHeaderEventMap['back'][0]) => {
  emit('click:back', payload)
}
defineSlots<FilterLayoutSlots>()
</script>

<template>
  <MainPanel :title="mainTitle" :show-back="showBack" @click:back="handleBackClick">
    <template #main>
      <div class="filter-container">
        <div class="filter-header">{{ filterTitle }}</div>

        <slot></slot>
      </div>
    </template>
    <template #footer>
      <div class="submit-row">
        <base-btn :text="t('common.execute')" is-fill type="primary" @click="doFilter" />
        <base-btn :text="t('common.reset')" type="primary" @click="resetFilter" />
      </div>
    </template>
  </MainPanel>
</template>

<style scoped>
.filter-container {
  @apply w-full md:w-3/5;
}

.filter-header {
  @apply px-4 py-2   font-bold  border-b text-lg;
}

.submit-row {
  @apply flex items-center justify-end w-full;
  @apply pt-2 border-t;
}
</style>

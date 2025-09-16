<script setup lang="ts">
import { MainPanel, BaseBtn } from '@/components'

defineProps<{
  mainTitle: string
  showBack?: boolean | string | object
  filterTitle: string
}>()

const emit = defineEmits<{
  (e: 'submitEmit'): void
  (e: 'resetEmit'): void
  (e: 'click:back'): void
}>()

const doFilter = () => {
  emit('submitEmit')
}
const resetFilter = () => {
  emit('resetEmit')
}

const handleBackClick = () => {
  emit('click:back')
}
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
        <base-btn text="執行" is-fill type="primary" @click="doFilter" />
        <base-btn text="重設" type="primary" @click="resetFilter" />
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

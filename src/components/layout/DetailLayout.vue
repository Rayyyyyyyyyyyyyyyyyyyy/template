<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { MainPanel, BaseBtn, SearchableListPanel } from '@/components'

const { t } = useI18n()

defineProps<{
  title: string
  showBack?: boolean | string | object
  isEditable: boolean
  pageLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:saveEdit', value: boolean): void
  (e: 'update:cancelEdit'): void
  (e: 'click:back'): void
}>()

const saveDetailEdit = () => {
  emit('update:saveEdit', false)
}
const cancelDetailEdit = () => {
  emit('update:cancelEdit')
}
const handleBackClick = () => {
  emit('click:back')
}
</script>

<template>
  <MainPanel :title="title" :show-back="showBack" @click:back="handleBackClick">
    <template #main>
      <div class="detail-container" v-loading="pageLoading">
        <slot name="detailHeader"></slot>

        <div class="content-wrapper">
          <slot name="main"></slot>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="border-t py-4 w-full flex items-center justify-end" v-if="isEditable">
        <BaseBtn :text="t('common.save')" type="primary" is-fill @click="saveDetailEdit" />
        <BaseBtn :text="t('common.discard')" type="primary" @click="cancelDetailEdit" />
      </div>
    </template>
  </MainPanel>
</template>

<style lang="scss" scoped>
.detail-container {
  @apply h-full flex flex-col;
  min-height: calc(100vh - 140px);
}

.content-wrapper {
  @apply flex-1 overflow-y-auto;
  max-height: calc(100vh - 100px);
}
</style>

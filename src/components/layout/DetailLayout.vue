<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import MainPanel from './MainPanel.vue'
import BaseBtn from '../items/BaseBtn.vue'
import type { FunctionHeaderEventMap, DetailLayoutSlots, DetailLayoutEventMap, DetailLayoutProps } from '../../types/components'

const { t } = useI18n()

defineProps<DetailLayoutProps>()

const emit = defineEmits<DetailLayoutEventMap>()

const saveDetailEdit = () => {
  emit('update:saveEdit', false)
}
const cancelDetailEdit = () => {
  emit('update:cancelEdit')
}
const handleBackClick = (payload: FunctionHeaderEventMap['back'][0]) => {
  emit('click:back', payload)
}
defineSlots<DetailLayoutSlots>()
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
  min-height: calc(100vh - 200px);
}

.content-wrapper {
  @apply flex-1 overflow-y-auto;
  max-height: calc(100vh - 100px);
}
</style>

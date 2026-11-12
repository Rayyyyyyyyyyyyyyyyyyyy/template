<script lang="ts" setup>
import { getCurrentInstance, ref, useAttrs } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseInput from '../form/BaseInput.vue'
import type { SearchBarEventMap, SearchBarProps, SearchBarSlots } from '../../types/components'

const { t } = useI18n()
defineOptions({ inheritAttrs: false })

defineProps<SearchBarProps>()

const emits = defineEmits<SearchBarEventMap>()

defineSlots<SearchBarSlots>()

// 獲取所有非 props 屬性
const attrs = useAttrs()
const generatedId = `search-${getCurrentInstance()!.uid}`
const shellAttrs = () => {
  const { id: _id, 'aria-label': _label, 'aria-labelledby': _labelledby, ...shell } = attrs
  return shell
}

const keyword = ref('')

const doSearch = () => {
  emits('keydown:enter', keyword.value.trim())
}
const clearableClick = () => {
  emits('update:clear')
}
</script>

<template>
  <div v-bind="shellAttrs()" class="search-bar">
    <div class="search-bar-left">
      <slot name="button" />
    </div>

    <div class="flex flex-wrap gap-2 min-w-0 max-w-full items-center justify-end">
      <div v-if="showSearch" class="search-input">
        <label :for="(attrs.id as string) || generatedId" class="block text-sm font-bold mb-1">
          {{ t('search.label') }}
        </label>
        <base-input
          :id="(attrs.id as string) || generatedId"
          :aria-label="attrs['aria-label']"
          :aria-labelledby="attrs['aria-labelledby']"
          v-model="keyword"
          :placeholder="t('search.placeholder')"
          :show-search="true"
          @keydown.enter="doSearch"
          @update:clearValue="clearableClick"
          class="search-input_inner"
        />
      </div>
      <slot name="customerFilter"> </slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
.search-bar {
  @apply flex justify-between gap-3;
  @apply flex-wrap;
}

.search-input {
  @apply w-64 max-w-full;

  .el-input {
    --el-input-border-color: var(--main-color-border, var(--el-border-color));
    --el-input-hover-border-color: var(--main-color, var(--el-color-primary));
    --el-input-focus-border-color: var(--main-color, var(--el-color-primary));
    --el-input-placeholder-color: var(--main-color, var(--el-color-primary));

    :deep(.el-input__prefix) {
      color: var(--main-color, var(--el-color-primary));
    }
    :deep(.el-input__inner::placeholder) {
      @apply text-text-border;
    }
  }
}
</style>

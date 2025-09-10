<script lang="ts" setup>
import { ref, useAttrs } from 'vue'
import BaseInput from '../form/BaseInput.vue'

defineProps<{
  showSearch?: boolean
}>()

const emits = defineEmits<{
  (e: 'keydown:enter', data: string): void
  (e: 'update:clear'): void
  (e: 'update:resetFilter'): void
}>()

// 獲取所有非 props 屬性
const attrs = useAttrs()

const keyword = ref('')

const doSearch = () => {
  emits('keydown:enter', keyword.value)
}
const clearableClick = () => {
  emits('update:clear')
}
const resetFilter = () => {
  emits('update:resetFilter')
}
</script>

<template>
  <div v-bind="attrs" class="search-bar">
    <div class="search-bar-left">
      <slot name="button" />
    </div>

    <div class="flex items-center justify-end">
      <div v-if="showSearch" class="search-input">
        <base-input
          v-model="keyword"
          placeholder="請輸入關鍵字搜尋列表"
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
  @apply w-64;

  .el-input {
    --el-input-border-color: var(--main-color-border);
    --el-input-hover-border-color: var(--main-color);
    --el-input-focus-border-color: var(--main-color);
    --el-input-placeholder-color: var(--main-color);

    :deep(.el-input__prefix) {
      color: var(--main-color);
    }
    :deep(.el-input__inner::placeholder) {
      @apply text-text-border;
    }
  }
}
</style>

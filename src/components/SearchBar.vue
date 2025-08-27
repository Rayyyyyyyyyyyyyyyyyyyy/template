<script lang="ts" setup>
import { ref } from 'vue'
import BaseInput from '@/components/items/BaseInput.vue'
import { Search } from '@element-plus/icons-vue'
import FilterBtn from '@/components/items/FilterBtn.vue'

defineProps<{
  showFilter?: boolean
  showSearch?: boolean
  fullInput?: boolean
  badgeValue?: number
}>()

const emits = defineEmits<{
  (e: 'keydown:enter', data: string): void
  (e: 'update:clear'): void
}>()

const keyword = ref('')

const doSearch = () => {
  emits('keydown:enter', keyword.value)
}
const clearableClick = () => {
  emits('update:clear')
}
</script>

<template>
  <div class="search-bar">
    <div class="search-bar-left">
      <slot name="button" />
    </div>

    <div class="flex items-center justify-end">
      <div v-if="showSearch" :class="{ 'w-full': fullInput, 'search-input': !fullInput }">
        <base-input
          v-model="keyword"
          placeholder="請輸入關鍵字搜尋列表"
          @keydown.enter="doSearch"
          @update:clearValue="clearableClick"
          class="search-input_inner"
        />
      </div>

      <div class="filter-customer" v-if="showFilter">
        <filter-btn :badge-value="badgeValue">
          <slot name="filterBody" />
        </filter-btn>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.search-bar {
  @apply flex justify-between gap-3;
  @apply flex-wrap;
}

.filter-customer {
  @apply flex ml-0.5;
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
  }
}
</style>

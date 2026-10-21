<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput, FilterLayout } from 'rayyy-vue-table-components/components'
const keyword = ref('')
const applied = ref('')
function reset() { keyword.value = ''; applied.value = '' }
</script>

<template>
  <FilterLayout main-title="查詢用戶" filter-title="篩選條件"
    @submit-emit="applied = keyword.trim()" @reset-emit="reset">
    <BaseInput v-model="keyword" aria-label="姓名" placeholder="姓名" />
    <output aria-live="polite">已套用：{{ applied }}</output>
  </FilterLayout>
</template>

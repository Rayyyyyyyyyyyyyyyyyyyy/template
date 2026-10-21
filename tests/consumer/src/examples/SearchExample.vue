<script setup lang="ts">
import { ref } from 'vue'
import { SearchBar, BaseBtn } from 'rayyy-vue-table-components/components'
const keyword = ref('')
</script>

<template>
  <!-- 可見 label 自動關聯 input；id 與 ARIA 命名會到達實際 input。Enter 送出 trim 後的值。 -->
  <SearchBar id="user-search" aria-label="搜尋用戶" show-search @keydown:enter="keyword = $event" @update:clear="keyword = ''">
    <template #button><BaseBtn text="新增" @click="keyword = '新增操作'" /></template>
    <template #customerFilter><span>自訂篩選區</span></template>
  </SearchBar>
  <output aria-live="polite">搜尋：{{ keyword }}</output>
</template>

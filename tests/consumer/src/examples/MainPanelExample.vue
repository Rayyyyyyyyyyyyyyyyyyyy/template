<script setup lang="ts">
import { MainPanel } from 'rayyy-vue-table-components/components'
</script>

<template>
  <MainPanel title="用戶管理">
    <template #searchBar>搜尋操作區</template>
    <template #main><p>主要內容</p></template>
    <template #footer>頁尾操作區</template>
  </MainPanel>
</template>

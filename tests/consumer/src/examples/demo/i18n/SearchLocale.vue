<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { BaseBtn, SearchBar } from 'rayyy-vue-table-components/components'

// 切換的是宿主全域 locale（useI18n 未指定 scope），所有元件與範例一起跟著變。
const { locale, t } = useI18n()
</script>

<template>
  <div class="stack">
    <BaseBtn @click="locale = locale === 'zh-TW' ? 'en-US' : 'zh-TW'">切換語系 (當前: {{ locale }})</BaseBtn>
    <p class="hint">
      測試項目：
      <br />
      placeholder：{{ t('search.placeholder') }}
    </p>
    <SearchBar show-search />
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 16px;
  justify-items: start;
}
.stack > :last-child {
  justify-self: stretch;
}
.hint {
  margin: 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
</style>

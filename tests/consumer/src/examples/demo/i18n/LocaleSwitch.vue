<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { BaseBtn } from 'rayyy-vue-table-components/components'

// 元件庫跟著宿主 createI18n（legacy: false）的 locale 走，切換 locale 即切換元件文字。
const { locale } = useI18n()
</script>

<template>
  <div class="stack">
    <div class="actions">
      <BaseBtn type="primary" @click="locale = locale === 'zh-TW' ? 'en-US' : 'zh-TW'">切換語系 (當前: {{ locale }})</BaseBtn>
      <span class="hint">點擊按鈕切換語系，觀察其他範例的組件文字變化</span>
    </div>
    <p class="info"><strong>語系代碼：</strong>{{ locale }}</p>
    <p class="info"><strong>語系名稱：</strong>{{ locale === 'zh-TW' ? '繁體中文' : 'English' }}</p>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 8px;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
.hint,
.info {
  margin: 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElConfigProvider } from 'element-plus'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import en from 'element-plus/es/locale/lang/en'
import { SearchableListPanel } from 'rayyy-vue-table-components/components'
// main.ts 必須先安裝 legacy:false 的宿主 createI18n，並合併套件 messages。
const { locale } = useI18n()
const elementLocale = computed(() => locale.value === 'zh-TW' ? zhTw : en)
const pager = { page: 1, limit: 10, totalCount: 20 }
</script>

<template>
  <button @click="locale = locale === 'zh-TW' ? 'en-US' : 'zh-TW'">切換宿主語系</button>
  <ElConfigProvider :locale="elementLocale">
    <SearchableListPanel title="繼承宿主" show-search :pagination="pager" />
    <SearchableListPanel title="只有這個分頁固定繁體中文" :pagination="pager" :locale="zhTw" />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElConfigProvider } from 'element-plus'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import en from 'element-plus/es/locale/lang/en'
import { BaseBtn } from 'rayyy-vue-table-components/components'

// 切換的是宿主全域 locale（useI18n 未指定 scope），所有元件與範例一起跟著變。
// Element Plus 自己的文字不吃 vue-i18n，要用 ElConfigProvider 跟著宿主 locale 傳入對應語言包。
const { locale } = useI18n()
const elementLocale = computed(() => (locale.value === 'zh-TW' ? zhTw : en))
const currentPage = ref(1)
const pageSize = ref(10)
</script>

<template>
  <div class="stack">
    <BaseBtn @click="locale = locale === 'zh-TW' ? 'en-US' : 'zh-TW'">切換語系 (當前: {{ locale }})</BaseBtn>
    <p class="hint">
      測試項目：
      <br />
      1. 切換語系觀察 pagination 文字變化
      <br />
      2. 繁體中文：顯示「共 50 條」等中文文字
      <br />
      3. 英文：顯示「Total 50」等英文文字
    </p>
    <ElConfigProvider :locale="elementLocale">
      <div class="panel">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="50"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </ElConfigProvider>
    <div class="hint">
      <p>當前頁面：{{ currentPage }}</p>
      <p>每頁大小：{{ pageSize }}</p>
      <p>總數：50</p>
    </div>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 16px;
  justify-items: start;
}
.panel {
  padding: 16px;
  border-radius: 8px;
  background: var(--el-fill-color-light);
}
.hint {
  margin: 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
.hint p {
  margin: 0;
}
</style>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import enUs from 'element-plus/es/locale/lang/en'

import type { Language } from 'element-plus/es/locale'

// 使用 i18n 來響應式更新 Element Plus locale
const { locale } = useI18n()

const elLocale = computed<Language>(() => {
  return locale.value === 'zh-TW' ? zhTw : enUs
})
</script>

<template>
  <div class="app__container bg-primary-20">
    <el-config-provider :locale="elLocale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<style scoped lang="scss">
.app__container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

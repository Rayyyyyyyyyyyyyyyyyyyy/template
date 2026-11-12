<script setup lang="ts">
import { ROUTES } from '@/router/constants'
import { useRoute } from 'vue-router'
import { useDemoTheme } from '@/views/docs/useDemoTheme'

const route = useRoute()
const { theme } = useDemoTheme()
</script>

<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">跳至主要內容</a>
    <header class="site-header">
      <div class="site-header__inner">
        <RouterLink :to="ROUTES.ROOT" class="site-brand">Vue Table Components</RouterLink>
        <nav class="site-nav" aria-label="主要導覽">
          <RouterLink :to="ROUTES.DEMO">組件示範</RouterLink>
          <RouterLink :to="ROUTES.INSTALL_GUIDE">安裝指南</RouterLink>
          <RouterLink :to="ROUTES.DOCS_CENTER">文件中心</RouterLink>
        </nav>
        <el-radio-group v-model="theme" size="small" aria-label="色彩模式">
          <el-radio-button value="light">淺色</el-radio-button>
          <el-radio-button value="dark">深色</el-radio-button>
          <el-radio-button value="system">跟隨系統</el-radio-button>
        </el-radio-group>
      </div>
    </header>
    <main id="main-content" tabindex="-1">
      <div v-if="route.path.startsWith(`${ROUTES.DEMO}/`)" class="site-breadcrumb">
        <RouterLink :to="ROUTES.DEMO">返回組件示範</RouterLink>
      </div>
      <router-view v-slot="{ Component }">
        <keep-alive :include="/.*(Page|Detail)$/">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>

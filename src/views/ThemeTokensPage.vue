<script setup lang="ts">
import { themeTokens } from './docs/themeTokens'
</script>

<template>
  <div class="demo-page docs-page">
    <div class="demo-container space-y-8">
      <header class="space-y-3">
        <h1 class="text-4xl font-bold text-gray-900">主題 token</h1>
        <p class="text-gray-600">以下 CSS 變數可在宿主覆寫；未設定時使用 fallback，畫面不變。</p>
      </header>
      <section class="demo-section p-6">
        <el-table :data="themeTokens" border>
          <el-table-column prop="name" label="Token" min-width="260" />
          <el-table-column prop="fallback" label="Fallback" min-width="220" />
          <el-table-column prop="usage" label="用途" min-width="260" />
        </el-table>
      </section>
      <section class="space-y-3 demo-section p-6">
        <h2 class="text-xl font-semibold">深色模式</h2>
        <p>
          宿主載入 element-plus/theme-chalk/dark/css-vars.css，並在 html 切換 dark class，元件就會跟著變。
          套件的深色色值寫在 :root.dark，優先權高於 Element Plus 深色預設的 html.dark，確保主色色階不被蓋掉。
        </p>
      </section>
    </div>
  </div>
</template>

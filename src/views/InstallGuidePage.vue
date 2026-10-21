<script setup lang="ts">
import bootstrapExample from '../../tests/consumer/src/examples/main.ts?raw'
import namedInstallExample from '../../tests/consumer/src/examples/NamedInstall.ts?raw'
import { ROUTES } from '../router/constants'
import ExampleCode from './docs/ExampleCode.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto max-w-5xl space-y-8 px-4 sm:px-6">
      <header class="space-y-3">
        <h1 class="text-4xl font-bold text-gray-900">Vue Table Components 安裝指南</h1>
        <p>安裝 rayyy-vue-table-components、Vue、Element Plus 與 vue-i18n。</p>
        <p class="text-gray-600">下方兩份完整入口都納入 tarball consumer 的型別檢查與建置，展示與複製直接讀取相同來源。</p>
      </header>
      <section class="rounded-lg bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-semibold">完整安裝 · main.ts</h2>
        <ExampleCode :source="bootstrapExample" />
      </section>
      <section class="rounded-lg bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-semibold">單項安裝 · NamedInstall.ts</h2>
        <ExampleCode :source="namedInstallExample" />
      </section>
      <section class="space-y-3 rounded-lg bg-white p-6 shadow-sm">
        <h2 class="text-xl font-semibold">語系與樣式</h2>
        <p>元件文字跟隨宿主 vue-i18n，請合併套件 messages。Element Plus 請安裝於宿主應用。</p>
        <p>分頁預設繼承外層 ElConfigProvider；傳入 locale 只覆寫該面板。</p>
        <p>舊 setLocale、套件 useI18n 與 plugin locale 保留相容，但不控制元件文字。</p>
        <p>樣式入口為 /styles 與 /styles/element；Tailwind preset 為 /tailwind-preset。</p>
        <RouterLink :to="ROUTES.DOCS_CENTER" class="text-blue-700 underline">查看完整使用範例</RouterLink>
      </section>
    </div>
  </div>
</template>

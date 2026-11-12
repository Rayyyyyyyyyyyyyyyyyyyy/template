<script setup lang="ts">
import { ROUTES } from '../router/constants'
import ExampleCode from './docs/ExampleCode.vue'

const sources = import.meta.glob<string>('../../tests/consumer/src/examples/*.{vue,ts}', {
  query: '?raw', import: 'default', eager: true,
})
const examples = Object.entries(sources).map(([path, source]) => ({
  name: path.split('/').pop()!, source,
}))
</script>

<template>
  <div class="demo-page docs-page">
    <div class="demo-container space-y-8">
      <header class="space-y-3">
        <h1 class="text-4xl font-bold text-gray-900">Vue Table Components 文件中心</h1>
        <p class="text-gray-600">
          以下程式碼直接讀取 tarball consumer 的完整來源；展示、複製、型別檢查與建置使用同一份範例。
          請先依 main.ts 安裝 Element Plus、宿主 i18n 與樣式，再選擇需要的 Vue 範例。
        </p>
        <p class="text-gray-600">範例資料只保留於宿主記憶體；沒有 API、檔案匯出或持久化。</p>
        <nav aria-label="文件頁面" class="flex flex-wrap gap-x-4 gap-y-2">
          <RouterLink :to="ROUTES.DOCS_API" class="text-blue-700 underline">API 參考</RouterLink>
          <RouterLink :to="ROUTES.DOCS_CHANGELOG" class="text-blue-700 underline">變更紀錄</RouterLink>
          <RouterLink :to="ROUTES.DOCS_THEME" class="text-blue-700 underline">主題 token</RouterLink>
        </nav>
        <nav aria-label="範例目錄" class="flex flex-wrap gap-x-4 gap-y-2">
          <a v-for="example in examples" :key="example.name" :href="`#${example.name}`"
            class="text-blue-700 underline">{{ example.name }}</a>
        </nav>
      </header>

      <section class="demo-section p-6">
        <h2 class="text-xl font-semibold">公開契約</h2>
        <p class="mt-3">共同 table props 由 BaseTable 定義；SortTable、TitleTable 保留各自的工具列與事件。</p>
        <p>文字使用宿主 vue-i18n；分頁繼承 ElConfigProvider，也可用 locale prop 局部覆寫。</p>
        <p>root 與 /components 均提供可單項安裝的值；/types/components 是型別入口。</p>
        <p class="mt-3">
          完整 props、events 與 slots 以公開 TypeScript 定義為準：
          <a href="https://github.com/Rayyyyyyyyyyyyyyyyyyyy/template/blob/main/src/types/components.ts"
            class="text-blue-700 underline">契約定義</a>。
          入口與遷移說明見
          <a href="https://github.com/Rayyyyyyyyyyyyyyyyyyyy/template/blob/main/README.md"
            class="text-blue-700 underline">README</a>。
        </p>
      </section>

      <section v-for="example in examples" :id="example.name" :key="example.name"
        class="scroll-mt-24 demo-section p-6">
        <h2 class="mb-4 text-xl font-semibold">{{ example.name }}</h2>
        <ExampleCode :source="example.source" />
      </section>
    </div>
  </div>
</template>

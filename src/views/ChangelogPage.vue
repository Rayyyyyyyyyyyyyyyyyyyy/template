<script setup lang="ts">
import changelog from '../../CHANGELOG.md?raw'
</script>

<template>
  <div class="demo-page docs-page">
    <div class="demo-container space-y-8">
      <header>
        <h1 class="text-4xl font-bold text-gray-900">變更紀錄</h1>
      </header>
      <section class="demo-section p-6">
        <pre class="whitespace-pre-wrap">{{ changelog }}</pre>
      </section>
    </div>
  </div>
</template>

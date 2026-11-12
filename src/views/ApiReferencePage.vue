<script setup lang="ts">
import { apiReference } from './docs/apiReference'

const tables = [
  { key: 'props', title: 'Props' },
  { key: 'events', title: 'Events' },
  { key: 'slots', title: 'Slots' },
] as const
</script>

<template>
  <div class="demo-page docs-page">
    <div class="demo-container space-y-8">
      <header class="space-y-3">
        <h1 class="text-4xl font-bold text-gray-900">API 參考</h1>
        <p class="text-gray-600">內容對應 src/types/components.ts 的公開型別；泛型 T 為列資料型別。</p>
      </header>
      <section v-for="component in apiReference" :id="component.name" :key="component.name"
        class="scroll-mt-24 space-y-4 demo-section p-6">
        <h2 class="text-xl font-semibold">{{ component.name }}</h2>
        <p v-if="component.note" class="text-gray-600">{{ component.note }}</p>
        <div v-for="table in tables" :key="table.key">
          <h3 class="mb-2 text-lg font-medium">{{ table.title }}</h3>
          <el-table :data="component[table.key]" border>
            <el-table-column prop="name" label="名稱" min-width="160" />
            <el-table-column prop="type" label="型別" min-width="220" />
            <el-table-column prop="default" label="預設值" min-width="140" />
            <el-table-column prop="description" label="說明" min-width="260" />
          </el-table>
        </div>
      </section>
    </div>
  </div>
</template>

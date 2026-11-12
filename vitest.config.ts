import { fileURLToPath } from 'node:url'
import { defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    pool: 'forks',
    // 單一 worker
    maxWorkers: 1,
    testTimeout: 30000,
    hookTimeout: 30000,
    // 禁用並發
    maxConcurrency: 1
  },
  resolve: {
    alias: {
      'rayyy-vue-table-components/components': fileURLToPath(new URL('./src/components/index.ts', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 避免使用 rollup 相關功能
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  },
  esbuild: {
    target: 'es2022'
  }
})

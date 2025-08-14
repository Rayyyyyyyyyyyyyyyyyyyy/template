import { fileURLToPath } from 'node:url'
import { defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    // 在 CI 環境中使用單線程避免 rollup 問題
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true
      }
    },
    // 設置超時時間
    testTimeout: 10000,
    // 設置 hook 超時時間
    hookTimeout: 10000
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 避免使用 rollup 相關功能
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  }
})

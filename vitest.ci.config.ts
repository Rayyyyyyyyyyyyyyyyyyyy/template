import { fileURLToPath } from 'node:url'
import { defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    // 使用最簡單的配置避免 rollup 問題
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    },
    // 設置超時時間
    testTimeout: 30000,
    hookTimeout: 30000,
    // 禁用並發
    maxConcurrency: 1,
    // 禁用快照
    snapshotSerializers: [],
    // 禁用覆蓋率
    coverage: {
      enabled: false
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 最小化配置
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  },
  // 禁用所有優化
  esbuild: false,
  build: {
    rollupOptions: {
      external: []
    }
  }
})

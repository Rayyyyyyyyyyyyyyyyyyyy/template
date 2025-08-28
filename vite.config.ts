import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import dts from 'vite-plugin-dts'

// element plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'

  return {
    plugins: [
      vue(),
      vueJsx(),
      ...(isLib ? [] : [vueDevTools()]), // 只在開發模式啟用 devtools
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      ...(isLib
        ? [
            dts({
              insertTypesEntry: true,
              include: ['src'],
              exclude: ['src/**/*.spec.ts', 'src/**/__tests__/**'],
              outDir: 'dist',
              tsconfigPath: './tsconfig.app.json',
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      dedupe: isLib ? [] : ['vue'],
    },

    ...(isLib
      ? {
          build: {
            lib: {
              entry: resolve(__dirname, 'src/index.ts'),
              name: 'RayyyVueTableComponents',
              formats: ['es', 'umd'],
              fileName: (format) => (format === 'es' ? 'index.es.js' : 'index.umd.cjs'),
            },
            rollupOptions: {
              external: (id) =>
                /^vue($|\/)/.test(id) ||
                /^@vue\//.test(id) ||
                /^element-plus($|\/)/.test(id) ||
                /^@vueuse\//.test(id),
              output: {
                globals: {
                  vue: 'Vue',
                  'element-plus': 'ElementPlus',
                },
                exports: 'named',
              },
              treeshake: { moduleSideEffects: false },
            },
            target: 'es2018',
            sourcemap: true,
            minify: false, // 元件庫發佈通常不在這裡壓縮，交給使用者專案處理
          },
          define: {
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
          },
        }
      : {}),
  }
})

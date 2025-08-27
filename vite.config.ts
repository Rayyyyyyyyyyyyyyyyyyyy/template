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
      ...(isLib ? [] : [
        AutoImport({
          resolvers: [ElementPlusResolver()],
          imports: ['vue'],
          dts: false
        }),
        Components({
          resolvers: [ElementPlusResolver()],
          dts: false
        })
      ]),
      ...(isLib ? [
        dts({
          insertTypesEntry: true,
          include: ['src/**/*'],
          exclude: ['src/**/*.spec.ts', 'src/**/*.test.ts', 'src/**/__tests__/**', 'src/types/usage-examples.ts'],
          outDir: 'dist',
          copyDtsFiles: true,
          tsconfigPath: './tsconfig.app.json'
        })
      ] : [])
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    ...(isLib ? {
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'VueTableComponents',
          fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
          external: ['vue', 'element-plus'],
          output: {
            globals: {
              vue: 'Vue',
              'element-plus': 'ElementPlus'
            },
            exports: 'named'
          }
        }
      }
    } : {})
  }
})

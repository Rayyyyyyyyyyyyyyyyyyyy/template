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
              include: ['src/**/*'],
              exclude: [
                'src/**/*.spec.ts',
                'src/**/*.test.ts',
                'src/**/__tests__/**',
                'src/types/usage-examples.ts',
              ],
              outDir: 'dist',
              copyDtsFiles: true,
              tsconfigPath: './tsconfig.app.json',
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        ...(isLib
          ? {
              vue: 'vue/dist/vue.runtime.esm-bundler.js',
            }
          : {}),
      },
    },
    ...(isLib
      ? {
          build: {
            lib: {
              entry: resolve(__dirname, 'src/index.ts'),
              name: 'VueTableComponents',
              fileName: (format) => `index.${format}.js`,
            },
            rollupOptions: {
              external: [
                'vue',
                'element-plus',
                '@vue/runtime-core',
                '@vue/runtime-dom',
                '@vue/shared',
                '@vue/compiler-sfc',
                '@vue/compiler-dom',
                '@vue/compiler-core',
                '@vue/reactivity',
                '@vue/ref-transform',
                '@vueuse/core',
              ],
              output: {
                globals: {
                  vue: 'Vue',
                  'element-plus': 'ElementPlus',
                  '@vue/runtime-core': 'VueRuntimeCore',
                  '@vue/runtime-dom': 'VueRuntimeDom',
                  '@vue/shared': 'VueShared',
                  '@vue/compiler-sfc': 'VueCompilerSfc',
                  '@vue/compiler-dom': 'VueCompilerDom',
                  '@vue/compiler-core': 'VueCompilerCore',
                  '@vue/reactivity': 'VueReactivity',
                  '@vue/ref-transform': 'VueRefTransform',
                  '@vueuse/core': 'VueUse',
                },
                exports: 'named',
                format: 'es',
              },
            },
            define: {
              __VUE_OPTIONS_API__: true,
              __VUE_PROD_DEVTOOLS__: false,
            },
          },
          optimizeDeps: {
            exclude: [
              'vue',
              '@vue/runtime-core',
              '@vue/runtime-dom',
              '@vue/shared',
              '@vue/compiler-sfc',
              '@vue/compiler-dom',
              '@vue/compiler-core',
              '@vue/reactivity',
              '@vue/ref-transform',
              '@vueuse/core',
            ],
          },
        }
      : {}),
  }
})

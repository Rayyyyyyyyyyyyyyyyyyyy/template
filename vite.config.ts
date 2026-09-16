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

// Tailwind CSS
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'
  const elementPlusResolver = ElementPlusResolver({ importStyle: isLib ? false : 'css' })

  return {
    plugins: [
      vue(),
      vueJsx(),

      ...(isLib ? [] : [vueDevTools()]), // 只在開發模式啟用 devtools
      AutoImport({
        resolvers: [elementPlusResolver],
        dts: false,
      }),
      Components({
        resolvers: [elementPlusResolver],
        dts: false,
      }),
      ...(isLib ? [
        dts({
          insertTypesEntry: true,
          include: [
            'src/index.ts',
            'src/components/**/*',
            'src/types/**/*',
            'src/utils/**/*',
            'src/locales/**/*',
          ],
          exclude: ['src/**/*.spec.ts', 'src/**/*.test.ts', 'src/**/__tests__/**', 'src/types/usage-examples.ts'],
          outDir: 'dist/lib',
          copyDtsFiles: true,
          tsconfigPath: './tsconfig.app.json'
        })
      ] : [])
    ],
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
        ...(isLib ? [{ find: /^element-plus\/es$/, replacement: 'element-plus' }] : []),
      ],
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer,
        ],
      },
    },
    ...(isLib ? {
      build: {
        outDir: 'dist/lib',
        lib: {
          entry: {
            index: resolve(__dirname, 'src/index.ts'),
            components: resolve(__dirname, 'src/components/index.ts'),
            types: resolve(__dirname, 'src/types/index.ts'),
            utils: resolve(__dirname, 'src/utils/tableHelper.ts'),
            'utils-styles': resolve(__dirname, 'src/utils/tableStyles.ts'),
            locales: resolve(__dirname, 'src/locales/index.ts'),
          },
          name: 'VueTableComponents',
          formats: ['es', 'cjs'],
          fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
        },
        rollupOptions: {
          external: [
            'vue',
            'element-plus',
            'vue-i18n',
          ],
          output: {
            globals: {
              vue: 'Vue',
              'element-plus': 'ElementPlus',
              'vue-i18n': 'VueI18n'
            }
          }
        },
        cssCodeSplit: false,
        copyPublicDir: false
      }
    } : {
      build: {
        outDir: 'dist/demo',
      },
    })
  }
})

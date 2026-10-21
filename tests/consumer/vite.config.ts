import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const examples = resolve(import.meta.dirname, 'src/examples')

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      input: {
        app: resolve(import.meta.dirname, 'index.html'),
        ...Object.fromEntries(readdirSync(examples)
          .filter((name) => /\.(vue|ts)$/.test(name))
          .map((name) => [name.replace(/\.(vue|ts)$/, ''), resolve(examples, name)])),
      },
    },
  },
})

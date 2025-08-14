import pluginVue from 'eslint-plugin-vue'

export default {
  files: ['**/*.{ts,mts,tsx,vue}'],
  ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  ...pluginVue.configs['flat/essential'],
}

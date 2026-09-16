import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'auto-imports.d.ts', 'components.d.ts', 'cypress/screenshots/**', 'cypress/videos/**'] },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    // Keep legacy public any/object shapes; this gate checks correctness, not API redesign.
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
    },
  },
)

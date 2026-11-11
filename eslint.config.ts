import type { Linter } from 'eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

const message = 'Library code must not import demo code or the @/ alias; use a relative path inside src/.'
// no-restricted-imports matches import strings, so each file depth needs its own relative prefix.
const libBoundary = (files: string[], up: string): Linter.Config => ({
  files,
  ignores: ['src/components/__tests__/**'],
  rules: {
    'no-restricted-imports': ['error', {
      paths: [{ name: 'vue-router', message }],
      patterns: [
        { regex: '^@/', message },
        { regex: `^${up}(views|router|layout|const)(/|$)`, message },
        { regex: `^${up}(main|App)(\\.\\w+)?$`, message },
      ],
    }],
  },
})

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
  libBoundary(['src/index.ts'], '\\./'),
  libBoundary(['src/components/*.{ts,vue}', 'src/utils/*.ts', 'src/types/*.ts', 'src/locales/*.ts'], '\\.\\./'),
  libBoundary(['src/components/*/**/*.{ts,vue}'], '\\.\\./\\.\\./'),
)

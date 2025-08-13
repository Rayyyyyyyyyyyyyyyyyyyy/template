declare module '@your-scope/vue-table-components' {
  import type { App } from 'vue'
  import type { DefineComponent } from 'vue'

    export function install(app: App, options?: Record<string, unknown>): void

  export const BaseTable: DefineComponent

  export * from './types'

  const plugin: {
    install: typeof install
  }

  export default plugin
}

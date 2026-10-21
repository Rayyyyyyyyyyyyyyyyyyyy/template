import type { App, Component } from 'vue'

export function withInstall<T extends Component>(component: T, name: string) {
  return Object.assign(component, {
    install(app: App) {
      app.component(component.name || name, component)
    },
  })
}

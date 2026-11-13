import { createApp } from 'vue'
import { expect, it } from 'vitest'
import * as components from '../index'

it('installs every named component from /components without importing root', () => {
  const app = createApp({ render: () => null })
  expect(Object.keys(components)).toHaveLength(16)
  for (const [name, component] of Object.entries(components)) {
    expect(component, name).toHaveProperty('install', expect.any(Function))
    app.use(component)
    expect(app.component(name)).toBe(component)
  }
  expect(components).toHaveProperty('BaseWarningDialog')
  expect(components).not.toHaveProperty('BaseWaringDialog')
  expect(app.component('BaseWarningDialog')).toBe(components.BaseWarningDialog)
})

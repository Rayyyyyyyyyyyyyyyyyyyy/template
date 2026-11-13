import { readFileSync, readdirSync } from 'node:fs'
import { mount } from '@vue/test-utils'
import { expect } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import type { Component } from 'vue'
import { ROUTES } from '../../../router/constants'
import { createHostI18n } from '../../../components/__tests__/testHelpers'
import DemoBlock from '../../docs/DemoBlock.vue'

// extra: example files outside dir that the page also renders as DemoBlock (e.g. the shared *Example.vue)
export function expectDemoPage(page: Component, dir: string, extra: string[] = []) {
  const files = [...readdirSync(dir).filter((name) => name.endsWith('.vue')).map((name) => dir + name), ...extra]
  const router = createRouter({ history: createMemoryHistory(), routes: [{ path: ROUTES.INSTALL_GUIDE, component: {} }] })
  const wrapper = mount(page, { global: { stubs: { DemoBlock: false }, plugins: [createHostI18n(), router] } })
  const sources = wrapper.findAllComponents(DemoBlock).map((block) => block.props('source'))
  expect(sources).toHaveLength(files.length)
  expect([...sources].sort()).toEqual(files.map((file) => readFileSync(file, 'utf8')).sort())
  expect(wrapper.find(`a[href="${ROUTES.INSTALL_GUIDE}"]`).exists()).toBe(true)
}

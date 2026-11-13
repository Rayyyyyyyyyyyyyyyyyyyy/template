import { readFileSync, readdirSync } from 'node:fs'
import { mount } from '@vue/test-utils'
import { expect } from 'vitest'
import type { Component } from 'vue'
import { createHostI18n } from '../../../components/__tests__/testHelpers'
import DemoBlock from '../../docs/DemoBlock.vue'

export function expectDemoPage(page: Component, dir: string) {
  const files = readdirSync(dir).filter((name) => name.endsWith('.vue'))
  const wrapper = mount(page, { global: { stubs: { DemoBlock: false }, plugins: [createHostI18n()] } })
  const sources = wrapper.findAllComponents(DemoBlock).map((block) => block.props('source'))
  expect(sources).toHaveLength(files.length)
  expect([...sources].sort()).toEqual(files.map((name) => readFileSync(dir + name, 'utf8')).sort())
}

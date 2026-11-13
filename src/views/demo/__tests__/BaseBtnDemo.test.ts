import { readFileSync, readdirSync } from 'node:fs'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import BaseBtnDemo from '../BaseBtnDemo.vue'
import DemoBlock from '../../docs/DemoBlock.vue'

const dir = 'tests/consumer/src/examples/demo/button/'
const files = readdirSync(dir).filter((name) => name.endsWith('.vue'))

it('renders one DemoBlock per example file with that file as its source', () => {
  const wrapper = mount(BaseBtnDemo, { global: { stubs: { DemoBlock: false } } })
  const sources = wrapper.findAllComponents(DemoBlock).map((block) => block.props('source'))
  expect(sources).toHaveLength(files.length)
  expect([...sources].sort()).toEqual(files.map((name) => readFileSync(dir + name, 'utf8')).sort())
})

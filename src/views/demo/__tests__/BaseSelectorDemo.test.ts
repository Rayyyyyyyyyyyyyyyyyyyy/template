import { it } from 'vitest'
import BaseSelectorDemo from '../BaseSelectorDemo.vue'
import { expectDemoPage } from './expectDemoPage'

it('renders one DemoBlock per example file with that file as its source', () => {
  expectDemoPage(BaseSelectorDemo, 'tests/consumer/src/examples/demo/base-selector/')
})

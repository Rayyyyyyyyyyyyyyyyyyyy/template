import { it } from 'vitest'
import BaseBtnDemo from '../BaseBtnDemo.vue'
import { expectDemoPage } from './expectDemoPage'

it('renders one DemoBlock per example file with that file as its source', () => {
  expectDemoPage(BaseBtnDemo, 'tests/consumer/src/examples/demo/button/')
})

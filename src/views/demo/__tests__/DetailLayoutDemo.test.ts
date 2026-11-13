import { it } from 'vitest'
import DetailLayoutDemo from '../DetailLayoutDemo.vue'
import { expectDemoPage } from './expectDemoPage'

it('renders one DemoBlock per example file with that file as its source', () => {
  expectDemoPage(DetailLayoutDemo, 'tests/consumer/src/examples/demo/detail-layout/')
})

import { it } from 'vitest'
import TableDemo from '../TableDemo.vue'
import { expectDemoPage } from './expectDemoPage'

it('renders one DemoBlock per example file with that file as its source', () => {
  expectDemoPage(TableDemo, 'tests/consumer/src/examples/demo/table/')
})

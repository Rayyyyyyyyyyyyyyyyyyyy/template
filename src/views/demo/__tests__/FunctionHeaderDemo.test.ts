import { it } from 'vitest'
import FunctionHeaderDemo from '../FunctionHeaderDemo.vue'
import { expectDemoPage } from './expectDemoPage'

it('renders one DemoBlock per example file with that file as its source', () => {
  expectDemoPage(FunctionHeaderDemo, 'tests/consumer/src/examples/demo/function-header/', ['tests/consumer/src/examples/HeaderExample.vue'])
})

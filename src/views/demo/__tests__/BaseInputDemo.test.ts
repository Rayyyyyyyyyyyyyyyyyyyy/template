import { it } from 'vitest'
import BaseInputDemo from '../BaseInputDemo.vue'
import { expectDemoPage } from './expectDemoPage'

it('renders one DemoBlock per example file with that file as its source', () => {
  expectDemoPage(BaseInputDemo, 'tests/consumer/src/examples/demo/base-input/')
})

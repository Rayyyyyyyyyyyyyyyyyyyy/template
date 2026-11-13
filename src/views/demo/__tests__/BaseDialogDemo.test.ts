import { it } from 'vitest'
import BaseDialogDemo from '../BaseDialogDemo.vue'
import { expectDemoPage } from './expectDemoPage'

it('renders one DemoBlock per example file with that file as its source', () => {
  expectDemoPage(BaseDialogDemo, 'tests/consumer/src/examples/demo/base-dialog/')
})

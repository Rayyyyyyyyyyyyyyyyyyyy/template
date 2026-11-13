import { it } from 'vitest'
import BaseWarningDialogDemo from '../BaseWarningDialogDemo.vue'
import { expectDemoPage } from './expectDemoPage'

it('renders one DemoBlock per example file with that file as its source', () => {
  expectDemoPage(BaseWarningDialogDemo, 'tests/consumer/src/examples/demo/base-warning-dialog/')
})

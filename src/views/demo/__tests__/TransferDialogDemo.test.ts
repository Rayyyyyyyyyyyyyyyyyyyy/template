import { it } from 'vitest'
import TransferDialogDemo from '../TransferDialogDemo.vue'
import { expectDemoPage } from './expectDemoPage'

it('renders one DemoBlock per example file with that file as its source', () => {
  expectDemoPage(TransferDialogDemo, 'tests/consumer/src/examples/demo/transfer-dialog/')
})

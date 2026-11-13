import { it } from 'vitest'
import MainPanelDemo from '../MainPanelDemo.vue'
import { expectDemoPage } from './expectDemoPage'

it('renders one DemoBlock per example file with that file as its source', () => {
  expectDemoPage(MainPanelDemo, 'tests/consumer/src/examples/demo/main-panel/', ['tests/consumer/src/examples/MainPanelExample.vue'])
})

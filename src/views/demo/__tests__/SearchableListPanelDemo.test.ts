import { it } from 'vitest'
import SearchableListPanelDemo from '../SearchableListPanelDemo.vue'
import { expectDemoPage } from './expectDemoPage'

it('renders one DemoBlock per example file with that file as its source', () => {
  expectDemoPage(SearchableListPanelDemo, 'tests/consumer/src/examples/demo/searchable-list-panel/')
})

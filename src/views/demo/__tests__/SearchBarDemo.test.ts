import { it } from 'vitest'
import SearchBarDemo from '../SearchBarDemo.vue'
import { expectDemoPage } from './expectDemoPage'

it('renders one DemoBlock per example file with that file as its source', () => {
  expectDemoPage(SearchBarDemo, 'tests/consumer/src/examples/demo/search-bar/')
})

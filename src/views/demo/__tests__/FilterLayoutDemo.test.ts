import { it } from 'vitest'
import FilterLayoutDemo from '../FilterLayoutDemo.vue'
import { expectDemoPage } from './expectDemoPage'

it('renders one DemoBlock per example file with that file as its source', () => {
  expectDemoPage(FilterLayoutDemo, 'tests/consumer/src/examples/demo/filter-layout/')
})

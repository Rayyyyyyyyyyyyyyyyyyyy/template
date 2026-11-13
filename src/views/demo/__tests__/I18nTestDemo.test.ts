import { it } from 'vitest'
import I18nTestDemo from '../I18nTestDemo.vue'
import { expectDemoPage } from './expectDemoPage'

it('renders one DemoBlock per example file with that file as its source', () => {
  expectDemoPage(I18nTestDemo, 'tests/consumer/src/examples/demo/i18n/')
})

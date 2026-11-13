import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import BaseDialog from '../items/BaseDialog.vue'
import BaseWarningDialog from '../items/BaseWarningDialog.vue'
import { commonStubs, createHostI18n } from './testHelpers'

const originalWidth = window.innerWidth

afterEach(() => {
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth })
})

const mountDialog = (props: Record<string, unknown>) =>
  mount(BaseDialog, {
    props: { modelValue: true, ...props },
    global: {
      plugins: [createHostI18n()],
      stubs: commonStubs,
      directives: { loading: () => undefined },
    },
  })

describe('BaseDialog width contract', () => {
  it('updates on resize, and keeps explicit widths on prop updates', async () => {
    const wrapper = mountDialog({})
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 499 })
    window.dispatchEvent(new Event('resize'))
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'ElDialog' }).props('width')).toBe('100%')
    await wrapper.setProps({ customWidth: '720px' })
    expect(wrapper.findComponent({ name: 'ElDialog' }).props('width')).toBe('720px')
    wrapper.unmount()
  })
  it('uses customWidth before the responsive default', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320 })
    const wrapper = mountDialog({ customWidth: '720px' })
    expect(wrapper.findComponent({ name: 'ElDialog' }).props('width')).toBe('720px')
  })

  it.each([
    [320, '100%'],
    [499, '100%'],
    [500, '50%'],
    [900, '50%'],
  ])('uses %s px viewport to select %s', (innerWidth, expected) => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: innerWidth })
    const wrapper = mountDialog({})
    expect(wrapper.findComponent({ name: 'ElDialog' }).props('width')).toBe(expected)
  })
})

it('BaseWarningDialog content area grows with its text instead of a fixed height', () => {
  const wrapper = mount(BaseWarningDialog, {
    props: { modelValue: true },
    global: { plugins: [createHostI18n()], stubs: commonStubs, directives: { loading: () => undefined } },
  })
  expect(wrapper.find('.min-h-16').exists()).toBe(true)
  expect(wrapper.find('.h-16').exists()).toBe(false)
})

it('BaseWarningDialog renders warningText and subWarningText', () => {
  const wrapper = mount(BaseWarningDialog, {
    props: { modelValue: true, warningText: 'W-text', subWarningText: 'S-text' },
    global: { plugins: [createHostI18n()], stubs: commonStubs, directives: { loading: () => undefined } },
  })
  expect(wrapper.text()).toContain('W-text')
  expect(wrapper.text()).toContain('S-text')
})

it('BaseDialog isWarning adds the warning-dialog class', () => {
  const wrapper = mountDialog({ isWarning: true })
  expect(wrapper.findComponent({ name: 'ElDialog' }).classes()).toContain('warning-dialog')
})

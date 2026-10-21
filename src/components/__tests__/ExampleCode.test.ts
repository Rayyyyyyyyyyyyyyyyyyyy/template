import { mount, flushPromises } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import ExampleCode from '../../views/docs/ExampleCode.vue'

const clipboard = vi.hoisted(() => ({ copy: vi.fn(), supported: true }))
vi.mock('@vueuse/core', () => ({
  useClipboard: () => ({ copy: clipboard.copy, isSupported: { value: clipboard.supported } }),
}))
const mountExample = () => mount(ExampleCode, {
  props: { source: '<script setup>const value = 1</script>' },
  global: {
    stubs: {
      BaseBtn: {
        props: ['text', 'loading'], emits: ['click'],
        template: '<button :disabled="loading" @click="$emit(\'click\')">{{ text }}</button>',
      },
    },
  },
})

afterEach(() => { clipboard.copy.mockReset(); clipboard.supported = true })

it('copies exactly the displayed source once and reports pending then success', async () => {
  let complete!: () => void
  clipboard.copy.mockImplementation(() => new Promise<void>((resolve) => { complete = resolve }))
  const wrapper = mountExample()
  await wrapper.get('button').trigger('click')
  await wrapper.get('button').trigger('click')
  expect(clipboard.copy).toHaveBeenCalledExactlyOnceWith(wrapper.get('code').element.textContent)
  expect(wrapper.get('[role=status]').text()).toBe('複製中…')
  complete()
  await flushPromises()
  expect(wrapper.get('[role=status]').text()).toBe('已複製程式碼。')
  wrapper.unmount()
})

it('keeps source visible after failure and allows retry', async () => {
  clipboard.copy.mockRejectedValueOnce(new Error('clipboard unavailable')).mockResolvedValueOnce(undefined)
  const wrapper = mountExample()
  await wrapper.get('button').trigger('click')
  await flushPromises()
  expect(wrapper.get('[role=status]').text()).toContain('複製失敗')
  expect(wrapper.get('code').element.textContent).toBe('<script setup>const value = 1</script>')
  await wrapper.get('button').trigger('click')
  await flushPromises()
  expect(wrapper.get('[role=status]').text()).toBe('已複製程式碼。')
  wrapper.unmount()
})

it('offers manual selection when clipboard access is unsupported', async () => {
  clipboard.supported = false
  const wrapper = mountExample()
  await wrapper.get('button').trigger('click')
  expect(clipboard.copy).not.toHaveBeenCalled()
  expect(wrapper.get('[role=status]').text()).toContain('手動選取')
  wrapper.unmount()
})

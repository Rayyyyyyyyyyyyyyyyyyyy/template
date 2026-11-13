import { mount, flushPromises } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import DemoBlock from '../../views/docs/DemoBlock.vue'

const clipboard = vi.hoisted(() => ({ copy: vi.fn(), supported: true }))
vi.mock('@vueuse/core', () => ({
  useClipboard: () => ({ copy: clipboard.copy, isSupported: { value: clipboard.supported } }),
}))
const source = '<script setup>const value = 1</script>'
const mountBlock = () => mount(DemoBlock, {
  props: { title: '按鈕樣式', description: '說明文字', source },
  slots: { default: '<p class="live">live example</p>' },
})

afterEach(() => { clipboard.copy.mockReset(); clipboard.supported = true })

it('renders heading anchor, description and slot, collapsed by default', () => {
  const wrapper = mountBlock()
  expect(wrapper.get('h2').attributes('id')).toBe('按鈕樣式')
  expect(wrapper.text()).toContain('說明文字')
  expect(wrapper.find('.live').exists()).toBe(true)
  expect(wrapper.get('[aria-controls]').attributes('aria-expanded')).toBe('false')
  expect(wrapper.get('pre').element.parentElement!.style.display === 'none').toBe(true)
})

it('toggles the source open and closed', async () => {
  const wrapper = mountBlock()
  const toggle = wrapper.get('[aria-controls]')
  await toggle.trigger('click')
  expect(toggle.attributes('aria-expanded')).toBe('true')
  expect(wrapper.get('pre').element.parentElement!.style.display === 'none').toBe(false)
  expect(wrapper.get('code').element.textContent).toBe(source)
  expect(wrapper.find('#' + toggle.attributes('aria-controls')!).exists()).toBe(true)
  await wrapper.get('[data-test=hide-code]').trigger('click')
  expect(toggle.attributes('aria-expanded')).toBe('false')
  expect(wrapper.get('pre').element.parentElement!.style.display === 'none').toBe(true)
})

it('copies exactly the source and reports success', async () => {
  clipboard.copy.mockResolvedValue(undefined)
  const wrapper = mountBlock()
  await wrapper.get('[data-test=copy]').trigger('click')
  await flushPromises()
  expect(clipboard.copy).toHaveBeenCalledExactlyOnceWith(source)
  expect(wrapper.get('[role=status]').text()).toBe('已複製程式碼。')
  expect(wrapper.get('[data-test=copy]').attributes('aria-label')).toBeTruthy()
})

it('reports failure', async () => {
  clipboard.copy.mockRejectedValue(new Error('denied'))
  const wrapper = mountBlock()
  await wrapper.get('[data-test=copy]').trigger('click')
  await flushPromises()
  expect(wrapper.get('[role=status]').text()).toContain('複製失敗')
})

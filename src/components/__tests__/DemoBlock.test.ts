import { mount, flushPromises } from '@vue/test-utils'
import { ElTooltip } from 'element-plus'
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
  global: { components: { ElTooltip } },
})

afterEach(() => { clipboard.copy.mockReset(); clipboard.supported = true })

it('renders heading anchor, description and slot, collapsed by default', () => {
  const wrapper = mountBlock()
  expect(wrapper.get('h2').attributes('id')).toBe('按鈕樣式')
  expect(wrapper.text()).toContain('說明文字')
  expect(wrapper.find('.live').exists()).toBe(true)
  expect(wrapper.get('[data-test=toggle-code]').attributes('aria-expanded')).toBe('false')
  expect(wrapper.get('pre').element.parentElement!.style.display === 'none').toBe(true)
})

it('builds a URL-safe anchor from the title, or uses the id prop', () => {
  const mountWith = (props: { title: string; id?: string }) => mount(DemoBlock, { props: { source, ...props }, global: { components: { ElTooltip } } })
  expect(mountWith({ title: 'C# 是 100%? a/b' }).get('h2').attributes('id')).toBe('C-是-100-a-b')
  expect(mountWith({ title: 'x', id: 'custom' }).get('h2').attributes('id')).toBe('custom')
})

it('toggles the source open and closed', async () => {
  const wrapper = mountBlock()
  const toggle = wrapper.get('[data-test=toggle-code]')
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

it('toggle button label follows state and uses an inline svg icon', async () => {
  const wrapper = mountBlock()
  const toggle = wrapper.get('[data-test=toggle-code]')
  expect(toggle.attributes('aria-label')).toBe('查看程式碼')
  expect(toggle.find('svg[data-test=code-icon]').attributes('aria-hidden')).toBe('true')
  await toggle.trigger('click')
  expect(toggle.attributes('aria-label')).toBe('隱藏程式碼')
})

it('wraps both icon buttons in tooltips that also open on focus', async () => {
  const wrapper = mountBlock()
  const tips = wrapper.findAllComponents(ElTooltip)
  expect(tips.map(t => t.props('content'))).toEqual(['複製程式碼', '查看程式碼'])
  expect(tips.every(t => t.props('placement') === 'top' && (t.props('trigger') as string[]).includes('focus'))).toBe(true)
  await wrapper.get('[data-test=toggle-code]').trigger('click')
  expect(tips[1].props('content')).toBe('隱藏程式碼')
})

it('does not cancel Enter or Space keydown on the buttons', () => {
  const wrapper = mountBlock()
  for (const sel of ['[data-test=copy]', '[data-test=toggle-code]']) {
    for (const key of ['Enter', ' ']) {
      const event = new KeyboardEvent('keydown', { key, code: key === ' ' ? 'Space' : 'Enter', bubbles: true, cancelable: true })
      wrapper.get(sel).element.dispatchEvent(event)
      expect(event.defaultPrevented, `${sel} ${key}`).toBe(false)
    }
  }
})

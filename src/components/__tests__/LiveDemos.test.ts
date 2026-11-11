import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, onTestFinished, expect, it, vi } from 'vitest'
import ElementPlus from 'element-plus'
import MainPanelDemo from '../../views/demo/MainPanelDemo.vue'
import FunctionHeaderDemo from '../../views/demo/FunctionHeaderDemo.vue'
import MainPanel from '../layout/MainPanel.vue'
import FunctionHeader from '../layout/FunctionHeader.vue'
import { createHostI18n } from './testHelpers'

const push = vi.hoisted(() => vi.fn())
vi.mock('vue-router', () => ({ useRouter: () => ({ push }) }))
afterEach(() => push.mockClear())
const global = () => ({ plugins: [ElementPlus, createHostI18n()] })
const source = (name: string) => readFileSync(resolve(import.meta.dirname, '../../../tests/consumer/src/examples', name), 'utf8')

it('renders the main content of all four panels, canonical search/footer slots, and one back event', async () => {
  const wrapper = mount(MainPanelDemo, { global: global() })
  onTestFinished(() => wrapper.unmount())
  await flushPromises()
  const panels = wrapper.findAllComponents(MainPanel)
  expect(panels).toHaveLength(4)
  for (const [index, text] of ['主要內容', '1,234', '數據項目 3', '這是一個帶有淺色背景的自定義面板內容。'].entries()) {
    expect(panels[index].get('.panel-scrollbar').text()).toContain(text)
  }
  expect(panels[0].text()).toContain('搜尋操作區')
  expect(panels[0].get('.panel-footer').text()).toBe('頁尾操作區')
  expect(wrapper.get('pre code').element.textContent).toBe(source('MainPanelExample.vue'))
  await panels[2].get('button[aria-label="返回"]').trigger('click')
  expect(panels[2].emitted('click:back')).toEqual([[{ path: '' }]])
  expect(push).toHaveBeenCalledExactlyOnceWith('/demo')
  expect(wrapper.text()).not.toContain('返回深度')
})

it('renders only supported header demonstrations and preserves all back payloads and slot actions', async () => {
  const wrapper = mount(FunctionHeaderDemo, { global: global() })
  onTestFinished(() => wrapper.unmount())
  const headers = wrapper.findAllComponents(FunctionHeader)
  expect(headers.map((header) => header.props('title'))).toEqual(['用戶管理', '編輯用戶', '產品詳情', '訂單管理', '用戶管理'])
  expect(headers[0].find('button').exists()).toBe(false)
  for (const [index, payload] of [
    [1, { path: '' }],
    [2, { path: '/products' }],
    [3, { path: '/orders', query: { status: 'pending' } }],
  ] as const) {
    await headers[index].get('button[aria-label="返回"]').trigger('click')
    expect(headers[index].emitted('back')).toEqual([[payload]])
    expect(wrapper.findAll('output').at(-1)!.text()).toBe(JSON.stringify(payload))
  }
  await headers[4].get('button[aria-label="返回"]').trigger('click')
  expect(wrapper.findAll('output')[0].text()).toBe('/demo')
  await headers[4].findAll('button')[1].trigger('click')
  expect(wrapper.findAll('output')[0].text()).toBe('新增操作')
  expect(wrapper.get('pre code').element.textContent).toBe(source('HeaderExample.vue'))
  expect(wrapper.text()).not.toMatch(/副標題|麵包屑|返回深度/)
  expect(wrapper.find('[sub-title], [breadcrumbs]').exists()).toBe(false)
})

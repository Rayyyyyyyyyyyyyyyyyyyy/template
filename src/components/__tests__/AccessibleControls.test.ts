import { defineComponent, h, nextTick, toRaw } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { onTestFinished, expect, it, vi } from 'vitest'
import ElementPlus, { ElInput } from 'element-plus'
import SortTable from '../tables/SortTable.vue'
import BaseTable from '../tables/BaseTable.vue'
import FunctionHeader from '../layout/FunctionHeader.vue'
import TransferItem from '../transfer/transferItem.vue'
import SearchBar from '../items/SearchBar.vue'
import BaseInput from '../form/BaseInput.vue'
import { createHostI18n } from './testHelpers'

const global = () => ({ plugins: [ElementPlus, createHostI18n()] })

it('uses named, non-submitting native buttons and emits each table action once with the original row', async () => {
  const row = { name: 'Ada' }
  const customClick = vi.fn()
  const wrapper = mount(SortTable, {
    props: { data: [row], columns: [{ prop: 'name', label: 'Name' }], showCheckBtn: true, showEditBtn: true },
    slots: { firstButton: () => h('button', { type: 'button', class: 'consumer-action', onClick: customClick }, 'Consumer') },
    global: global(),
  })
  onTestFinished(() => wrapper.unmount())
  await flushPromises()
  const actions = wrapper.findAll('button').filter((button) => !button.classes().includes('consumer-action'))
  expect(actions).toHaveLength(4)
  for (const action of actions) {
    expect(action.attributes('type')).toBe('button')
    expect((action.element as HTMLButtonElement).tabIndex).toBe(0)
    expect(action.attributes('aria-label') || action.text()).toBeTruthy()
    await action.trigger('click')
  }
  expect(wrapper.emitted('open:transfer')).toEqual([[]])
  expect(wrapper.emitted('click:downloadExcelFile')).toEqual([[]])
  for (const event of ['click:checkRow', 'click:editRow']) {
    expect(wrapper.emitted(event)).toHaveLength(1)
    expect(toRaw(wrapper.emitted(event)![0][0])).toBe(row)
  }
  await wrapper.get('.consumer-action').trigger('click')
  expect(customClick).toHaveBeenCalledOnce()
  expect(wrapper.emitted('click:downloadExcelFile')).toHaveLength(1)
  expect(wrapper.findAll('img').every((image) => image.attributes('alt') === '')).toBe(true)
})

it('leaves a consumer template action intact', async () => {
  const click = vi.fn()
  const wrapper = mount(BaseTable, {
    props: { data: [{ id: 1 }], columns: [{ label: 'Action', template: () => h('button', { type: 'button', onClick: click }, 'Custom') }] },
    global: global(),
  })
  onTestFinished(() => wrapper.unmount())
  await flushPromises()
  expect(wrapper.findAll('button')).toHaveLength(1)
  await wrapper.get('button').trigger('click')
  expect(click).toHaveBeenCalledOnce()
  expect(wrapper.emitted('click:checkRow')).toBeUndefined()
})

it.each([
  [true, { path: '' }],
  ['/demo', { path: '/demo' }],
  [{ path: '/orders', query: { status: 'pending' } }, { path: '/orders', query: { status: 'pending' } }],
])('keeps the back payload for showBack=%s', async (showBack, payload) => {
  const wrapper = mount(FunctionHeader, { props: { showBack, title: 'Header' }, global: global() })
  onTestFinished(() => wrapper.unmount())
  const button = wrapper.get('button')
  expect(button.attributes('type')).toBe('button')
  expect(button.attributes('aria-label')).toBe('返回')
  expect((button.element as HTMLButtonElement).tabIndex).toBe(0)
  expect(button.find('[aria-hidden=true]').exists()).toBe(true)
  await button.trigger('click')
  expect(wrapper.emitted('back')).toEqual([[payload]])
})

it('localizes all six transfer names with the column and retains disabled boundaries', async () => {
  const i18n = createHostI18n()
  const wrapper = mount(TransferItem, {
    props: { columnsValue: { prop: 'name', label: '姓名' }, columnsIndex: 0, columnsLen: 3, dialogModalVisible: true },
    global: { plugins: [ElementPlus, i18n] },
  })
  onTestFinished(() => wrapper.unmount())
  const names = () => wrapper.findAll('button').map((button) => button.attributes('aria-label'))
  expect(names()).toEqual(['解鎖 姓名', '鎖定 姓名', '將 姓名 置頂', '將 姓名 上移', '將 姓名 下移', '將 姓名 置底'])
  const buttons = wrapper.findAll('button')
  for (const index of [0, 2, 3]) {
    expect((buttons[index].element as HTMLButtonElement).disabled).toBe(true)
    ;(buttons[index].element as HTMLButtonElement).click()
  }
  expect(wrapper.emitted('update:toUnLock')).toBeUndefined()
  expect(wrapper.emitted('update:toTop')).toBeUndefined()
  expect(wrapper.emitted('update:toPre')).toBeUndefined()
  await buttons[1].trigger('click')
  expect(wrapper.emitted('update:toLock')).toEqual([[]])
  expect(wrapper.findAll('button [aria-hidden=true]')).toHaveLength(6)
  i18n.global.locale.value = 'en-US'
  await nextTick()
  expect(names()).toEqual(['Unlock 姓名', 'Lock 姓名', 'Move 姓名 to top', 'Move 姓名 up', 'Move 姓名 down', 'Move 姓名 to bottom'])
  await wrapper.setProps({ columnsIndex: 2, columnsValue: { prop: 'name', label: '姓名', fixed: 'left' } })
  for (const index of [1, 4, 5]) {
    expect((buttons[index].element as HTMLButtonElement).disabled).toBe(true)
    ;(buttons[index].element as HTMLButtonElement).click()
  }
  expect(wrapper.emitted('update:toNext')).toBeUndefined()
  expect(wrapper.emitted('update:toBottom')).toBeUndefined()
  i18n.global.locale.value = 'zh-TW'
  await nextTick()
  expect(names()[0]).toBe('解鎖 姓名')
})

it('puts naming attrs on the real input while preserving shell attrs and reactive updates', async () => {
  const click = vi.fn()
  const wrapper = mount(SearchBar, {
    props: { showSearch: true },
    attrs: { id: 'users', 'aria-label': 'Find users', 'aria-labelledby': 'external-label', class: 'host-shell', style: 'margin-top: 3px', 'data-host': 'retained', onClick: click },
    global: global(),
  })
  onTestFinished(() => wrapper.unmount())
  await flushPromises()
  expect(wrapper.get('input').attributes()).toMatchObject({ id: 'users', 'aria-label': 'Find users', 'aria-labelledby': 'external-label' })
  expect(wrapper.get('label').attributes('for')).toBe('users')
  expect(wrapper.classes()).toContain('host-shell')
  expect(wrapper.attributes('style')).toContain('margin-top: 3px')
  expect(wrapper.attributes('data-host')).toBe('retained')
  for (const name of ['id', 'aria-label', 'aria-labelledby']) expect(wrapper.attributes(name)).toBeUndefined()
  await wrapper.trigger('click')
  expect(click).toHaveBeenCalledOnce()
  const updatedAttributes = { id: 'renamed', 'aria-label': 'Renamed search' }
  await wrapper.setProps({ showSearch: true, ...updatedAttributes })
  expect(wrapper.get('input').attributes('id')).toBe('renamed')
  expect(wrapper.get('label').attributes('for')).toBe('renamed')
  expect(wrapper.get('input').attributes('aria-label')).toBe('Renamed search')
})

it('keeps multiple default labels unique and stable, host locale, trim and clear events', async () => {
  const i18n = createHostI18n()
  const Host = defineComponent({ components: { SearchBar }, template: '<SearchBar show-search /><SearchBar show-search />' })
  const wrapper = mount(Host, { global: { plugins: [ElementPlus, i18n] } })
  onTestFinished(() => wrapper.unmount())
  await flushPromises()
  const ids = () => wrapper.findAll('input').map((input) => input.attributes('id'))
  const initial = ids()
  expect(new Set(initial).size).toBe(2)
  expect(initial.every(Boolean)).toBe(true)
  expect(wrapper.findAll('label').map((label) => label.attributes('for'))).toEqual(initial)
  const input = wrapper.findAll('input')[0]
  await input.setValue('  Ada  ')
  await input.trigger('keydown', { key: 'Enter' })
  const search = wrapper.findAllComponents(SearchBar)[0]
  expect(search.emitted('keydown:enter')).toEqual([['Ada']])
  search.findComponent(ElInput).vm.$emit('clear')
  await nextTick()
  expect(search.emitted('update:clear')).toEqual([[]])
  i18n.global.locale.value = 'en-US'
  await nextTick()
  expect(wrapper.findAll('label').map((label) => label.text())).toEqual(['Search', 'Search'])
  expect(ids()).toEqual(initial)
})

it('forwards standalone BaseInput naming to the actual input without duplicating listeners', async () => {
  const keydown = vi.fn()
  const wrapper = mount(BaseInput, { attrs: { id: 'standalone', 'aria-label': 'Name', 'aria-labelledby': 'name-label', onKeydown: keydown }, global: global() })
  onTestFinished(() => wrapper.unmount())
  await flushPromises()
  expect(wrapper.get('input').attributes()).toMatchObject({ id: 'standalone', 'aria-label': 'Name', 'aria-labelledby': 'name-label' })
  expect(wrapper.attributes('id')).toBeUndefined()
  await wrapper.get('input').trigger('keydown', { key: 'Enter' })
  expect(keydown).toHaveBeenCalledOnce()
})

import { defineComponent, h, nextTick, ref } from 'vue'
import { flushPromises, mount, enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ElementPlus, { ElConfigProvider, ElPagination, ElSelect, ElTable } from 'element-plus'
import type { Language } from 'element-plus/es/locale'
import en from 'element-plus/es/locale/lang/en'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import BaseSelector from '../form/BaseSelector.vue'
import BaseTable from '../tables/BaseTable.vue'
import SearchableListPanel from '../layout/SearchableListPanel.vue'
import TransferDialog from '../transfer/TransferDialog.vue'
import type { TableColumn } from '../../types'
import { createHostI18n } from './testHelpers'

enableAutoUnmount(afterEach)
const global = () => ({ plugins: [ElementPlus, createHostI18n()], stubs: { teleport: true }, renderStubDefaultSlot: true })

it('real Element Plus pager inherits a reactive host locale and locally overrides only one pager', async () => {
  const locale = ref<Language>(en)
  const Host = defineComponent({
    setup: () => () => h(ElConfigProvider, { locale: locale.value }, () => [
      h(SearchableListPanel, { title: 'Inherited', pagination: { page: 1, limit: 10, totalCount: 20 } }),
      h(SearchableListPanel, { title: 'Override', locale: zhTw, pagination: { page: 1, limit: 10, totalCount: 20 } }),
      h(ElPagination, { total: 20, layout: 'total' }),
    ]),
  })
  const wrapper = mount(Host, { global: global() })
  const totals = () => wrapper.findAll('.el-pagination__total').map((node) => node.text())
  expect(totals()).toEqual(['Total 20', '共 20 項', 'Total 20'])
  locale.value = zhTw
  await nextTick()
  expect(totals()).toEqual(['共 20 項', '共 20 項', '共 20 項'])
  locale.value = en
  await nextTick()
  expect(totals()).toEqual(['Total 20', '共 20 項', 'Total 20'])
})

it('keeps controlled paging and all controls through locale and visibility changes without extra events', async () => {
  const wrapper = mount(SearchableListPanel, {
    props: { title: 'Controlled', pagination: { page: 3, limit: 25, totalCount: 1000000 }, pageSizeList: [10, 25, 50], showPagination: true },
    global: global(),
  })
  await flushPromises()
  const pager = () => wrapper.findComponent(ElPagination)
  expect(pager().props()).toMatchObject({ currentPage: 3, pageSize: 25, pagerCount: 5 })
  for (const selector of ['.btn-prev', '.btn-next', '.el-pager .is-active', '.el-pagination__total', '.el-pagination__sizes', '.el-pagination__jump']) {
    expect(wrapper.find(selector).exists(), selector).toBe(true)
  }
  await wrapper.get('.btn-next').trigger('click')
  expect(wrapper.emitted('updatePage')).toEqual([[4]])
  pager().vm.$emit('size-change', 50)
  await wrapper.setProps({ pagination: { page: 4, limit: 50, totalCount: 1000000 } })
  expect(wrapper.emitted('updatePageSize')).toEqual([[50]])
  await wrapper.setProps({ locale: en })
  expect(wrapper.get('.el-pagination__total').text()).toBe('Total 1000000')
  await wrapper.setProps({ locale: zhTw })
  expect(wrapper.get('.el-pagination__total').text()).toBe('共 1000000 項')
  await wrapper.setProps({ showPagination: false })
  expect(pager().exists()).toBe(false)
  await wrapper.setProps({ showPagination: true, locale: en })
  await flushPromises()
  expect(pager().props()).toMatchObject({ currentPage: 4, pageSize: 50 })
  expect(wrapper.emitted('updatePage')).toEqual([[4]])
  expect(wrapper.emitted('updatePageSize')).toEqual([[50]])
})

it('real table selection, sort, template, expand and cell click retain row identity', async () => {
  const row = { id: 1, name: 'Ada' }
  const column: TableColumn<typeof row> = { prop: 'name', label: 'Name', sortable: 'custom', template: (r) => h('b', r.name) }
  const wrapper = mount(BaseTable<typeof row>, {
    props: { data: [row], columns: [column], showSelection: true, showExpand: true, rowKey: 'id' },
    slots: { expand: ({ row: expanded }: { row: { id: number; name: string } }) => h('p', { class: 'consumer-expand' }, expanded.name) },
    global: global(),
  })
  await flushPromises()
  wrapper.findComponent(ElTable).vm.toggleRowSelection(row, true)
  wrapper.findComponent(ElTable).vm.sort('name', 'ascending')
  await nextTick()
  expect(wrapper.emitted('selection-change')?.at(-1)).toEqual([[row]])
  expect(wrapper.emitted('column-sort-change')?.at(-1)?.[0]).toMatchObject({ prop: 'name', order: 'ascending' })
  await wrapper.find('.cell-content').trigger('click')
  expect(wrapper.emitted('cell-click')?.[0]).toEqual([column, row])
  expect(wrapper.find('.cell-content b').text()).toBe('Ada')
  await wrapper.find('.el-table__expand-icon').trigger('click')
  expect(wrapper.find('.el-table__expanded-cell .consumer-expand').text()).toBe('Ada')
})

describe('real TransferDialog draft interactions', () => {
  const columns = (): TableColumn[] => [
    { prop: 'a', label: 'Alpha', checkActive: true },
    { prop: 'b', label: 'Beta', checkActive: true },
    { prop: 'c', label: 'Gamma', checkActive: true },
  ]
  const submit = async (wrapper: ReturnType<typeof mount>) => {
    const confirm = wrapper.findAll('button').find((button) => button.text() === '確定')!
    await confirm.trigger('click')
    return wrapper.emitted('update:submit')!.at(-1)![0] as TableColumn[]
  }
  it('search → uncheck → confirm keeps hidden columns and leaves the host untouched', async () => {
    const host = columns()
    const wrapper = mount(TransferDialog<Record<string, unknown>>, { props: { modelValue: true, transferTitle: 'Columns', columnsValue: host }, global: global() })
    await flushPromises()
    await wrapper.find('.search-bar input').setValue('Beta')
    await wrapper.find('.search-bar input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.findAll('.transfer-item-wrapper')).toHaveLength(1)
    await wrapper.find('.transfer-item-wrapper input[type=checkbox]').setValue(false)
    const payload = await submit(wrapper)
    expect(payload.map((c) => [c.prop, c.checkActive])).toEqual([['a', true], ['b', false], ['c', true]])
    expect(host).toEqual(columns())
  })
  it('search changes and clearing preserve reordered/check drafts; cancel/reopen uses latest host', async () => {
    const host = columns()
    const wrapper = mount(TransferDialog<Record<string, unknown>>, { props: { modelValue: true, transferTitle: 'Columns', columnsValue: host }, global: global() })
    await flushPromises()
    const input = wrapper.find('.search-bar input')
    await input.setValue('Beta')
    await input.trigger('keydown', { key: 'Enter' })
    await wrapper.find('.transfer-item-wrapper input[type=checkbox]').setValue(false)
    // Third action is move-to-top. It remains enabled even when search displays a single item.
    await wrapper.findAll('.transfer-item-wrapper button')[2].trigger('click')
    await input.setValue('Gamma')
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.find('.transfer-item-wrapper').text()).toContain('Gamma')
    await input.setValue('')
    await input.trigger('keydown', { key: 'Enter' })
    expect((await submit(wrapper)).map((c) => [c.prop, c.checkActive])).toEqual([['b', false], ['a', true], ['c', true]])
    expect(host).toEqual(columns())
    const cancel = wrapper.findAll('button').find((button) => button.text() === '取消')!
    await cancel.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false])
    await wrapper.setProps({ modelValue: false })
    const latest = [...columns()].reverse()
    await wrapper.setProps({ modelValue: true, columnsValue: latest })
    await flushPromises()
    expect(await submit(wrapper)).toEqual(latest)
  })
})

it('BaseSelector placeholder follows host locale unless the host passes one', () => {
  const plugins = [ElementPlus, createHostI18n('en-US')]
  expect(mount(BaseSelector, { global: { plugins } }).findComponent(ElSelect).props('placeholder')).toBe('Please select')
  expect(mount(BaseSelector, { props: { placeholder: 'X' }, global: { plugins } }).findComponent(ElSelect).props('placeholder')).toBe('X')
})

it('BaseSelector keys options by value so equal labels do not warn about duplicate keys', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const wrapper = mount(BaseSelector, {
    props: { options: [{ label: 'X', value: '0' }] },
    global: {
      plugins: [createHostI18n()],
      components: {
        ElSelect: { name: 'ElSelect', template: '<div><slot /></div>' },
        ElOption: { name: 'ElOption', props: ['label', 'value'], template: '<i />' },
      },
    },
  })
  // Vue only checks duplicate keys when patching, not on first mount
  await wrapper.setProps({ options: [{ label: 'A', value: '1' }, { label: 'A', value: '2' }] })
  expect(warn.mock.calls.filter((args) => args.some((a) => String(a).includes('Duplicate keys')))).toEqual([])
  expect(wrapper.findAllComponents({ name: 'ElOption' })).toHaveLength(2)
  warn.mockRestore()
})

it.each([['zh-TW', '序號'], ['en-US', 'No']])('BaseTable index column label follows host locale %s', async (locale, label) => {
  const wrapper = mount(BaseTable, {
    props: { data: [{ id: 1, name: 'Ada' }], columns: [{ prop: 'name', label: 'Name' }], showIndex: true },
    global: { plugins: [ElementPlus, createHostI18n(locale)] },
  })
  await flushPromises()
  expect(wrapper.find('.el-table__header').text()).toContain(label)
})

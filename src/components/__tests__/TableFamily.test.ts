import { h, nextTick, toRaw } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { onTestFinished, describe, expect, it, vi } from 'vitest'
import ElementPlus, { ElTable } from 'element-plus'
import SortTable from '../tables/SortTable.vue'
import TitleTable from '../tables/TitleTable.vue'
import { createHostI18n } from './testHelpers'

const global = () => ({ plugins: [ElementPlus, createHostI18n()] })

type Row = { id: number; name: string }

describe.each([
  ['SortTable', SortTable<Row>],
  ['TitleTable', TitleTable<Row>],
] as const)('%s shared table behavior', (_name, component) => {
  it('renders shared row styling, expansion and selection through the public adapter', async () => {
    const row = { id: 1, name: 'Ada' }
    const column = { prop: 'name', label: 'Name', sortable: 'custom' as const }
    const wrapper = mount(component, {
      props: {
        data: [row], columns: [column], rowKey: 'id', showExpand: true,
        showSelection: true, showIndex: true, showCheckBtn: true, showEditBtn: true,
        baseTableRowClassName: () => 'family-row',
      },
      slots: { expand: ({ row: expanded }: { row: typeof row }) => h('b', { class: 'family-expand' }, expanded.name) },
      global: global(),
    })
    onTestFinished(() => wrapper.unmount())
    await flushPromises()
    expect(wrapper.find('tr.family-row').exists()).toBe(true)
    wrapper.findComponent(ElTable).vm.toggleRowSelection(row, true)
    await nextTick()
    expect(wrapper.emitted('update:selectRow')?.at(-1)?.[0]).toEqual([row])
    expect(toRaw((wrapper.emitted('update:selectRow')!.at(-1)![0] as typeof row[])[0])).toBe(row)
    await wrapper.get('.cell-content').trigger('click')
    expect(wrapper.emitted('click:cell')?.[0]).toEqual([column, row])
    await wrapper.get('.el-table__expand-icon').trigger('click')
    expect(wrapper.get('.el-table__expanded-cell .family-expand').text()).toBe('Ada')
    await wrapper.findAll('.blue-text')[0].trigger('click')
    await wrapper.findAll('.blue-text')[1].trigger('click')
    expect(toRaw(wrapper.emitted('click:checkRow')?.[0]?.[0])).toBe(row)
    expect(toRaw(wrapper.emitted('click:editRow')?.[0]?.[0])).toBe(row)
    await wrapper.setProps({ baseTableRowClassName: () => 'updated-row' })
    expect(wrapper.find('tr.updated-row').exists()).toBe(true)
  })

  it('shows waiting instead of an empty result until loading completes', async () => {
    const wrapper = mount(component, {
      props: { data: [], columns: [{ prop: 'name', label: 'Name' }], loading: true },
      global: global(),
    })
    onTestFinished(() => wrapper.unmount())
    await flushPromises()
    expect(wrapper.find('.el-empty').exists()).toBe(false)
    expect(wrapper.get('[role=status]').text()).toBe('數據加載中')
    expect(wrapper.find('[aria-busy=true]').exists()).toBe(true)
    await wrapper.setProps({ loading: false })
    expect(wrapper.find('.el-empty').exists()).toBe(true)
    expect(wrapper.find('[role=status]').exists()).toBe(false)
  })

  it('passes custom tree fields and the lazy loader through to the table', async () => {
    const row = { id: 1, name: 'Parent', more: true }
    const load = vi.fn((_row, _node, resolve) => resolve([{ id: 2, name: 'Child' }]))
    const wrapper = mount(component, {
      props: {
        data: [row], columns: [{ prop: 'name', label: 'Name' }], rowKey: 'id',
        lazy: true, treeProps: { children: 'nodes', hasChildren: 'more' }, load,
      },
      global: global(),
    })
    onTestFinished(() => wrapper.unmount())
    await flushPromises()
    await wrapper.get('.el-table__expand-icon').trigger('click')
    await flushPromises()
    expect(load).toHaveBeenCalledOnce()
    expect(toRaw(load.mock.calls[0][0])).toBe(row)
    expect(wrapper.text()).toContain('Child')
  })
})

it('keeps SortTable sorting and the historical row-class alias', async () => {
  const row = { id: 1, name: 'Ada' }
  const wrapper = mount(SortTable, {
    props: {
      data: [row], columns: [{ prop: 'name', label: 'Name', sortable: 'custom' }],
      baseTableRowClassName: () => 'common-row', sortTableRowClassName: () => 'legacy-row',
    },
    global: global(),
  })
  onTestFinished(() => wrapper.unmount())
  await flushPromises()
  expect(wrapper.find('tr.legacy-row').exists()).toBe(true)
  wrapper.findComponent(ElTable).vm.sort('name', 'ascending')
  await nextTick()
  expect(wrapper.emitted('click:columnSort')?.at(-1)?.[0]).toMatchObject({ prop: 'name', order: 'ascending' })
})

it('keeps TitleTable editing selection policy and toolbar events', async () => {
  const wrapper = mount(TitleTable, {
    props: {
      data: [{ id: 1, name: 'Ada' }], columns: [{ prop: 'name', label: 'Name' }],
      tableTitle: 'People', propIsEditable: true, showDelete: true,
    },
    global: global(),
  })
  onTestFinished(() => wrapper.unmount())
  await flushPromises()
  expect(wrapper.find('.el-table-column--selection').exists()).toBe(true)
  await wrapper.findAll('button')[0].trigger('click')
  await wrapper.findAll('button')[1].trigger('click')
  expect(wrapper.emitted('click:add')).toHaveLength(1)
  expect(wrapper.emitted('click:delete')).toHaveLength(1)
  await wrapper.setProps({ propIsEditable: false })
  expect(wrapper.find('.el-table-column--selection').exists()).toBe(false)
})

import { defineComponent, h, type PropType } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseTable from '../tables/BaseTable.vue'
import type { TableColumn } from '../../types'
import { commonStubs, createHostI18n } from './testHelpers'

let activeRow: Record<string, unknown> | undefined
const ElTable = defineComponent({
  name: 'ElTable',
  props: { data: { type: Array as PropType<Record<string, unknown>[]>, required: true } },
  emits: ['selection-change', 'current-change', 'sort-change'],
  setup(props, { slots }) {
    return () => {
      activeRow = props.data[0]
      return h('div', { class: 'table' }, slots.default?.())
    }
  },
})
const ElTableColumn = defineComponent({
  name: 'ElTableColumn',
  props: ['type', 'prop'],
  setup(_props, { slots }) {
    return () => h('div', { class: 'column' }, slots.default?.({ row: activeRow, $index: 0 }))
  },
})

interface Row extends Record<string, unknown> {
  id: number
  name: string
}

const row: Row = { id: 1, name: 'Ada' }
const columns: TableColumn<Row>[] = [
  { prop: 'name', label: 'Name' },
  {
    prop: 'id',
    label: 'Template',
    template: (value) => h('strong', { class: 'template-cell' }, value.name),
  },
]

describe('BaseTable', () => {
  it('renders template and expand contracts and forwards table events', async () => {
    const wrapper = mount(BaseTable<Row>, {
      props: { data: [row], columns, showExpand: true },
      slots: {
        expand: ({ row: expanded }: { row: Row }) =>
          h('i', { class: 'expand-cell' }, expanded.name),
      },
      global: {
        plugins: [createHostI18n()],
        stubs: { ...commonStubs, ElTable, ElTableColumn },
        directives: { loading: () => undefined },
      },
    })

    const table = wrapper.findComponent(ElTable)
    table.vm.$emit('selection-change', [row])
    table.vm.$emit('sort-change', { prop: 'name', order: 'ascending', column: [] })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.template-cell').text()).toBe('Ada')
    expect(wrapper.find('.expand-cell').text()).toBe('Ada')
    expect(wrapper.emitted('selection-change')).toEqual([[[row]]])
    expect(wrapper.emitted('column-sort-change')?.[0]?.[0]).toMatchObject({ prop: 'name' })
  })
})

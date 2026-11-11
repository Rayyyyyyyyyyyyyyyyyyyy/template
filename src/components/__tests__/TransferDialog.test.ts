import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TransferDialog from '../transfer/TransferDialog.vue'
import type { TransferDialogSlots } from '../../types/components'
import type { TableColumn } from '../../types'
import { createHostI18n } from './testHelpers'

const BaseDialog = defineComponent({
  name: 'BaseDialog',
  props: ['modelValue'],
  emits: ['update:modelValue', 'click:submit'],
  template: '<div><button class="submit" @click="$emit(\'click:submit\')">submit</button><slot /></div>',
})
const SearchBar = defineComponent({
  name: 'SearchBar',
  emits: ['keydown:enter', 'update:clear'],
  template: '<div />',
})
const TransferItem = defineComponent({
  name: 'TransferItem',
  props: ['columnsValue'],
  emits: ['update:toTop', 'update:toBottom', 'update:toPre', 'update:toNext', 'update:toLock', 'update:toUnLock'],
  template: '<div class="transfer-item">{{ columnsValue.label }}</div>',
})
const ElCheckboxGroup = defineComponent({
  name: 'ElCheckboxGroup',
  props: ['modelValue'],
  emits: ['update:modelValue', 'change'],
  template: '<div><slot /></div>',
})
const ElCheckbox = defineComponent({ name: 'ElCheckbox', template: '<label><slot /></label>' })

interface Row extends Record<string, unknown> {
  id: number
}

const original: TableColumn<Row>[] = [
  { prop: 'a', label: 'Alpha', checkActive: true },
  { prop: 'b', label: 'Beta', checkActive: true },
  { prop: 'c', label: 'Gamma', checkActive: true },
]

const mountDialog = () =>
  mount(TransferDialog<Row>, {
    props: { modelValue: true, columnsValue: original, transferTitle: 'Columns' },
    global: {
      plugins: [createHostI18n()],
      stubs: { BaseDialog, SearchBar, TransferItem, ElCheckboxGroup, ElCheckbox },
    },
  })

describe('TransferDialog draft contract', () => {
  it('keeps the full draft while searching, changing checks, sorting and confirming', async () => {
    const before = structuredClone(original)
    const wrapper = mountDialog()
    wrapper.findComponent(SearchBar).vm.$emit('keydown:enter', 'Beta')
    await wrapper.vm.$nextTick()
    expect(wrapper.findAllComponents(TransferItem).map((item) => item.text())).toEqual(['Beta'])

    const group = wrapper.findComponent(ElCheckboxGroup)
    group.vm.$emit('update:modelValue', ['b'])
    group.vm.$emit('change', ['b'])
    wrapper.findComponent(TransferItem).vm.$emit('update:toTop')
    wrapper.findComponent(SearchBar).vm.$emit('update:clear')
    await wrapper.vm.$nextTick()

    expect(wrapper.findAllComponents(TransferItem).map((item) => item.text())).toEqual([
      'Beta',
      'Alpha',
      'Gamma',
    ])
    await wrapper.find('.submit').trigger('click')

    const submitted = wrapper.emitted('update:submit')?.[0]?.[0] as TableColumn<Row>[]
    expect(submitted.map((column) => column.prop)).toEqual(['b', 'a', 'c'])
    expect(submitted.map((column) => column.checkActive)).toEqual([true, false, false])
    expect(original).toEqual(before)
  })

  it('discards only the draft when cancelled and reopened from new host columns', async () => {
    const wrapper = mountDialog()
    wrapper.findComponent(SearchBar).vm.$emit('keydown:enter', 'Beta')
    wrapper.findComponent(ElCheckboxGroup).vm.$emit('change', ['b'])
    await wrapper.setProps({ modelValue: false })

    const latest = original.map((column) => ({ ...column })).reverse()
    await wrapper.setProps({ columnsValue: latest, modelValue: true })
    expect(wrapper.findAllComponents(TransferItem).map((item) => item.text())).toEqual([
      'Gamma',
      'Beta',
      'Alpha',
    ])
  })
  it('slot reordering preserves hidden columns and rejects incomplete or duplicate identities', async () => {
    let scope!: Parameters<NonNullable<TransferDialogSlots<Row>['list-container']>>[0]
    const wrapper = mount(TransferDialog<Row>, {
      props: { modelValue: true, columnsValue: original.map((column) => ({ ...column, label: column.prop === 'c' ? 'Another' : column.label })), transferTitle: 'Columns' },
      slots: { 'list-container': (value: typeof scope) => { scope = value; return h('div') } },
      global: { plugins: [createHostI18n()], stubs: { BaseDialog, SearchBar, TransferItem, ElCheckboxGroup, ElCheckbox } },
    })
    wrapper.findComponent(SearchBar).vm.$emit('keydown:enter', 'A')
    await wrapper.vm.$nextTick()
    scope.handleReorder([...scope.columns].reverse())
    await wrapper.vm.$nextTick()
    const expected = scope.columns.map((column) => column.prop)
    scope.handleReorder([scope.columns[0], scope.columns[0]])
    await wrapper.vm.$nextTick()
    expect(scope.columns.map((column) => column.prop)).toEqual(expected)
    scope.handleReorder([])
    await wrapper.find('.submit').trigger('click')
    expect((wrapper.emitted('update:submit')?.[0]?.[0] as TableColumn[]).map((column) => column.prop)).toEqual(['c', 'b', 'a'])
    expect(original.map((column) => column.prop)).toEqual(['a', 'b', 'c'])
  })

  describe('columns without prop and case-insensitive search', () => {
    const columns: TableColumn<Row>[] = [
      { prop: 'a', label: 'Alpha', checkActive: true },
      { prop: 'b', label: 'Beta', checkActive: false },
      { label: 'Actions', checkActive: true },
    ]
    const mountWithColumns = () =>
      mount(TransferDialog<Row>, {
        props: { modelValue: true, columnsValue: columns, transferTitle: 'Columns' },
        global: {
          plugins: [createHostI18n()],
          stubs: { BaseDialog, SearchBar, TransferItem, ElCheckboxGroup, ElCheckbox },
        },
      })
    const lastColumns = (wrapper: ReturnType<typeof mountWithColumns>) => {
      const events = wrapper.emitted('update:checkChange') as { columns: TableColumn<Row>[] }[][]
      return events[events.length - 1][0].columns
    }

    it('A: a check change leaves the prop-less column untouched', () => {
      const wrapper = mountWithColumns()
      wrapper.findComponent({ name: 'ElCheckboxGroup' }).vm.$emit('change', ['a'])
      expect(lastColumns(wrapper).map((column) => column.checkActive)).toEqual([true, false, true])
    })

    it('B: check all selects only columns with prop and keeps the prop-less column', async () => {
      const wrapper = mountWithColumns()
      ;(wrapper.vm as unknown as { checkAll: boolean }).checkAll = true
      await nextTick()
      expect(lastColumns(wrapper).map((column) => column.checkActive)).toEqual([true, true, true])
      expect(wrapper.findComponent({ name: 'ElCheckboxGroup' }).props('modelValue')).toEqual(['a', 'b'])
    })

    it('B2: check all reports checkAll as true', async () => {
      const wrapper = mountWithColumns()
      ;(wrapper.vm as unknown as { checkAll: boolean }).checkAll = true
      await nextTick()
      expect((wrapper.vm as unknown as { checkAll: boolean }).checkAll).toBe(true)
    })

    it('C: search ignores case', async () => {
      const wrapper = mountWithColumns()
      for (const keyword of ['alpha', 'ALPHA']) {
        wrapper.findComponent(SearchBar).vm.$emit('keydown:enter', keyword)
        await nextTick()
        expect(wrapper.findAll('.transfer-item').map((item) => item.text())).toEqual(['Alpha'])
      }
    })
  })
})

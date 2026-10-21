import { flushPromises, mount } from '@vue/test-utils'
import { onTestFinished, expect, it } from 'vitest'
import ElementPlus, { ElTable } from 'element-plus'
import SortExample from '../../../tests/consumer/src/examples/SortTableExample.vue'
import TitleExample from '../../../tests/consumer/src/examples/TitleTableExample.vue'
import ListExample from '../../../tests/consumer/src/examples/ListExample.vue'
import DetailExample from '../../../tests/consumer/src/examples/DetailExample.vue'
import { createHostI18n } from './testHelpers'

const global = () => ({ plugins: [ElementPlus, createHostI18n()] })

it('the documented sort event actually reorders rows and reports its state', async () => {
  const wrapper = mount(SortExample, { global: global() })
  onTestFinished(() => wrapper.unmount())
  await flushPromises()
  wrapper.findComponent(ElTable).vm.sort('name', 'descending')
  await flushPromises()
  expect(wrapper.get('output').text()).toBe('descending')
  expect(wrapper.findAll('.cell-content').map((cell) => cell.text())).toEqual(['Grace', 'Ada'])
  await wrapper.get('.sort-caret.descending').trigger('click')
  await flushPromises()
  expect(wrapper.get('output').text()).toBe('未排序')
  expect(wrapper.findAll('.cell-content').map((cell) => cell.text())).toEqual(['Ada', 'Grace'])
})

it('the documented title actions add a row and delete only selected rows', async () => {
  const wrapper = mount(TitleExample, { global: global() })
  onTestFinished(() => wrapper.unmount())
  await flushPromises()
  const table = wrapper.findComponent(ElTable)
  const selected = table.props('data')![0]
  table.vm.toggleRowSelection(selected, true)
  await flushPromises()
  await wrapper.findAll('button')[0].trigger('click')
  expect(wrapper.findAll('.cell-content').map((cell) => cell.text())).toEqual(['Ada', 'New user'])
  await wrapper.findAll('button')[1].trigger('click')
  expect(wrapper.findAll('.cell-content').map((cell) => cell.text())).toEqual(['New user'])
})

it('the documented search resets paging and clears back to the full local list', async () => {
  const wrapper = mount(ListExample, { global: global() })
  onTestFinished(() => wrapper.unmount())
  await flushPromises()
  await wrapper.get('.el-pagination .btn-next').trigger('click')
  expect(wrapper.findAll('.cell-content').map((cell) => cell.text())).toEqual(['Lin'])
  const input = wrapper.get('.search-input input')
  await input.setValue('Grace')
  await input.trigger('keydown', { key: 'Enter' })
  expect(wrapper.findAll('.cell-content').map((cell) => cell.text())).toEqual(['Grace'])
  await input.setValue('')
  await input.trigger('keydown', { key: 'Enter' })
  expect(wrapper.findAll('.cell-content').map((cell) => cell.text())).toEqual(['Ada', 'Grace'])
})

it('the documented detail cancel restores saved input and save retains the next edit', async () => {
  const wrapper = mount(DetailExample, { global: global() })
  onTestFinished(() => wrapper.unmount())
  await flushPromises()
  await wrapper.get('input').setValue('Discard me')
  const button = (text: string) => wrapper.findAll('button').find((node) => node.text() === text)!
  await button('捨棄').trigger('click')
  await button('編輯').trigger('click')
  expect((wrapper.get('input').element as HTMLInputElement).value).toBe('Ada')
  await wrapper.get('input').setValue('Grace')
  await button('儲存').trigger('click')
  expect(wrapper.text()).toContain('Grace')
  await button('編輯').trigger('click')
  expect((wrapper.get('input').element as HTMLInputElement).value).toBe('Grace')
})

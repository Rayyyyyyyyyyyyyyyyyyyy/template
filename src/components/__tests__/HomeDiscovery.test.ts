import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { expect, it, onTestFinished } from 'vitest'
import ElementPlus from 'element-plus'
import HomePage from '../../views/HomePage.vue'
import DemoPage from '../../views/DemoPage.vue'
import { createHostI18n } from './testHelpers'

async function host() {
  const component = { template: '<div />' }
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component }],
  })
  await router.push('/')
  await router.isReady()
  return { plugins: [ElementPlus, createHostI18n(), router] }
}

it('lets visitors page, search and recover from an empty result in the home preview', async () => {
  const wrapper = mount(HomePage, { global: await host() })
  onTestFinished(() => wrapper.unmount())
  await flushPromises()
  const rows = () =>
    wrapper.findAll('.home-preview .el-table__body-wrapper tbody tr').map((row) => row.text())
  expect(rows()).toHaveLength(3)
  expect(rows()[0]).toContain('張小明')
  await wrapper.get('.btn-next').trigger('click')
  await flushPromises()
  expect(rows()).toHaveLength(2)
  expect(rows()[0]).toContain('陳大強')
  const input = wrapper.get('.search-input input')
  await input.setValue(' 工程部 ')
  await input.trigger('keydown', { key: 'Enter' })
  await flushPromises()
  expect(rows()).toHaveLength(2)
  expect(rows()[0]).toContain('張小明')
  expect(rows()[1]).toContain('陳大強')
  expect(wrapper.get('.el-pagination__total').text()).toContain('2')
  await input.setValue('找不到的用戶')
  await input.trigger('keydown', { key: 'Enter' })
  await flushPromises()
  expect(wrapper.find('.el-empty').exists()).toBe(true)
  expect(wrapper.find('.el-pagination').exists()).toBe(false)
  await input.setValue('')
  await input.trigger('keydown', { key: 'Enter' })
  await flushPromises()
  expect(rows()).toHaveLength(3)
  expect(rows()[0]).toContain('張小明')
  expect(wrapper.get('.el-pagination__total').text()).toContain('5')
})

it('groups all fourteen component demos exactly once and retains their routes and feature details', async () => {
  const wrapper = mount(DemoPage, { global: await host() })
  onTestFinished(() => wrapper.unmount())
  expect(wrapper.findAll('.catalog-nav a').map((link) => link.attributes('href'))).toEqual([
    '#tables',
    '#forms',
    '#layouts',
    '#dialogs',
  ])
  expect(
    wrapper.findAll('.catalog-group').map((section) => section.findAll('.demo-card').length),
  ).toEqual([2, 5, 4, 3])
  const links = wrapper.findAll('.demo-card h3 a').map((link) => link.attributes('href'))
  expect(new Set(links).size).toBe(14)
  expect(links).toContain('/demo/searchable-list-panel')
  expect(links).toContain('/demo/transfer-dialog')
  expect(links).toContain('/demo/i18n-test')
  expect(wrapper.findAll('details')).toHaveLength(14)
  const firstDetails = wrapper.get('details')
  expect((firstDetails.element as HTMLDetailsElement).open).toBe(false)
  expect(firstDetails.findAll('li')).toHaveLength(6)
})

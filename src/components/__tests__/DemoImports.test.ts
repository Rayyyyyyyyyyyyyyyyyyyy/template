import { h, nextTick, ref } from 'vue'
import { DOMWrapper, flushPromises, mount } from '@vue/test-utils'
import { expect, it, onTestFinished, vi } from 'vitest'
import {
  ElButton, ElConfigProvider, ElDialog, ElDivider, ElEmpty, ElIcon, ElInput,
  ElLoadingDirective, ElPagination, ElScrollbar, ElTable, ElTableColumn,
} from 'element-plus'
import en from 'element-plus/es/locale/lang/en'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import BaseTable from '../tables/BaseTable.vue'
import BaseDialog from '../items/BaseDialog.vue'
import SearchableListPanel from '../layout/SearchableListPanel.vue'
import { createHostI18n } from './testHelpers'

it('runs loading, dialog, search, pagination and locale with named imports instead of the ElementPlus plugin', async () => {
  const warnings = vi.fn()
  const i18n = createHostI18n()
  const locale = ref(zhTw)
  const loading = ref(true)
  const wrapper = mount(() => h(ElConfigProvider, { locale: locale.value }, () => [
    h(BaseTable, { data: [{ name: 'Ada' }], columns: [{ prop: 'name', label: 'Name' }], loading: loading.value }),
    h(BaseDialog, { modelValue: true, title: 'Dialog', bodyLoading: loading.value }, () => 'Dialog content'),
    h(SearchableListPanel, { title: 'List', showSearch: true, pagination: { page: 1, limit: 10, totalCount: 30 } }),
  ]), {
    // Element Plus >=2.14 teleports with the built-in Teleport; stubbing it remounts ElSelect's options in a loop, so read the dialog from the body.
    attachTo: document.body,
    global: {
      plugins: [i18n],
      components: { ElButton, ElConfigProvider, ElDialog, ElDivider, ElEmpty, ElIcon, ElInput, ElPagination, ElScrollbar, ElTable, ElTableColumn },
      directives: { loading: ElLoadingDirective },
      config: { warnHandler: warnings },
    },
  })
  onTestFinished(() => wrapper.unmount())
  await flushPromises()
  expect(wrapper.findComponent({ name: 'BaseTable' }).find('.el-loading-mask').exists()).toBe(true)
  expect(document.body.querySelector('.el-dialog .el-loading-mask')).not.toBeNull()
  expect(document.body.textContent).toContain('Dialog content')
  const list = wrapper.findComponent(SearchableListPanel)
  await list.get('input').setValue(' Ada ')
  await list.get('input').trigger('keydown', { key: 'Enter' })
  expect(list.emitted('search')).toEqual([['Ada']])
  await list.get('.btn-next').trigger('click')
  expect(list.emitted('updatePage')).toEqual([[2]])
  expect(list.get('.el-pagination__total').text()).toBe('共 30 項')
  locale.value = en
  i18n.global.locale.value = 'en-US'
  loading.value = false
  await nextTick()
  await flushPromises()
  expect(list.get('.el-pagination__total').text()).toBe('Total 30')
  expect(list.get('label').text()).toBe('Search')
  const dialog = wrapper.findComponent(BaseDialog)
  const cancel = new DOMWrapper(document.body).findAll('button').find((button) => button.text() === 'Cancel')!
  await cancel.trigger('click')
  expect(dialog.emitted('update:modelValue')).toEqual([[false]])
  expect(warnings.mock.calls.filter(([message]) => /resolve component|resolve directive/i.test(message))).toEqual([])
})

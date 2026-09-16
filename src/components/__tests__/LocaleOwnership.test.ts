import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseDialog from '../items/BaseDialog.vue'
import BaseTable from '../tables/BaseTable.vue'
import SearchBar from '../items/SearchBar.vue'
import { setLocale, useI18n as legacyI18n } from '../../utils/i18n'
import { commonStubs, createHostI18n } from './testHelpers'

const Host = defineComponent({
  components: { BaseDialog, BaseTable, SearchBar },
  template: `
    <BaseTable :data="[]" :columns="[]" />
    <SearchBar show-search />
    <BaseDialog :model-value="true" title="Locale" />
  `,
})

describe('host locale ownership', () => {
  it('reactively updates table, search and dialog text without remounting', async () => {
    const i18n = createHostI18n('zh-TW')
    const wrapper = mount(Host, {
      global: {
        plugins: [i18n],
        stubs: commonStubs,
        directives: { loading: () => undefined },
      },
    })

    expect(wrapper.findComponent({ name: 'ElEmpty' }).props('description')).toBe('暫無資料')
    expect(wrapper.findComponent({ name: 'ElInput' }).props('placeholder')).toBe(
      '請輸入關鍵字搜尋列表',
    )
    expect(wrapper.text()).toContain('確定')
    expect(wrapper.text()).toContain('取消')

    setLocale('en-US')
    expect(legacyI18n().locale.value).toBe('en-US')
    await nextTick()
    expect(wrapper.text()).toContain('確定')

    i18n.global.locale.value = 'en-US'
    await nextTick()

    expect(wrapper.findComponent({ name: 'ElEmpty' }).props('description')).toBe('No data')
    expect(wrapper.findComponent({ name: 'ElInput' }).props('placeholder')).toBe(
      'Please enter keywords to search the list',
    )
    expect(wrapper.text()).toContain('Confirm')
    expect(wrapper.text()).toContain('Cancel')
    i18n.global.locale.value = 'zh-TW'
    await nextTick()
    expect(wrapper.text()).toContain('確定')
    expect(wrapper.findComponent({ name: 'ElEmpty' }).props('description')).toBe('暫無資料')
  })
})

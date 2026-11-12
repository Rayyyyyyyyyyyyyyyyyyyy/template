import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SearchableListPanel from '../layout/SearchableListPanel.vue'

const MainPanel = defineComponent({
  name: 'MainPanel',
  template: '<main><slot name="searchBar" /><slot name="main" /><slot name="footer" /></main>',
})
const SearchBar = defineComponent({ name: 'SearchBar', template: '<div><slot name="button" /></div>' })
const ElPagination = defineComponent({
  name: 'ElPagination',
  props: ['total', 'currentPage', 'pageSize', 'layout'],
  emits: ['current-change', 'size-change'],
  template: '<div class="pagination" />',
})
const ElConfigProvider = defineComponent({
  name: 'ElConfigProvider',
  props: ['locale'],
  template: '<div class="provider"><slot /></div>',
})

const mountPanel = (props: Record<string, unknown>) =>
  mount(SearchableListPanel, {
    props: {
      title: 'Rows',
      pagination: { page: 1, limit: 10, totalCount: 0 },
      ...props,
    },
    global: { stubs: { MainPanel, SearchBar, ElPagination, ElConfigProvider } },
  })

describe('SearchableListPanel', () => {
  it.each([
    [undefined, 0, false],
    [undefined, 2, true],
    [false, 2, false],
    [false, 0, false],
    [true, 2, true],
    [true, 0, true],
  ])('showPagination=%s total=%s renders=%s', (showPagination, totalCount, visible) => {
    const wrapper = mountPanel({
      showPagination,
      pagination: { page: 1, limit: 10, totalCount },
    })
    expect(wrapper.findComponent(ElPagination).exists()).toBe(visible)
  })

  it('forwards page and page-size events', async () => {
    const wrapper = mountPanel({ showPagination: true })
    const pager = wrapper.findComponent(ElPagination)
    pager.vm.$emit('current-change', 3)
    pager.vm.$emit('size-change', 25)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('updatePage')).toEqual([[3]])
    expect(wrapper.emitted('updatePageSize')).toEqual([[25]])
  })

  it('inherits the host provider unless a local locale is supplied', () => {
    const inherited = mountPanel({ showPagination: true })
    expect(inherited.findComponent(ElConfigProvider).exists()).toBe(false)

    const localLocale = { name: 'fixture-locale', el: {} }
    const overridden = mountPanel({ showPagination: true, locale: localLocale })
    expect(overridden.findComponent(ElConfigProvider).props('locale')).toEqual(localLocale)
  })

  describe('pagination layout', () => {
    const DEFAULT_LAYOUT = 'prev, pager, next, total, sizes, jumper'
    const layoutOf = (wrapper: ReturnType<typeof mountPanel>) =>
      wrapper.findComponent(ElPagination).props('layout')

    it('uses the default layout without new props', () => {
      expect(layoutOf(mountPanel({ showPagination: true }))).toBe(DEFAULT_LAYOUT)
    })

    it('uses paginationLayout when provided', () => {
      const wrapper = mountPanel({ showPagination: true, paginationLayout: 'prev, next' })
      expect(layoutOf(wrapper)).toBe('prev, next')
    })

    it('compacts below compactPaginationBelow and follows resize', async () => {
      const original = window.innerWidth
      const setWidth = (w: number) => Object.defineProperty(window, 'innerWidth', { value: w, configurable: true, writable: true })
      try {
        setWidth(500)
        const wrapper = mountPanel({ showPagination: true, compactPaginationBelow: 640 })
        expect(layoutOf(wrapper)).toBe('prev, pager, next')
        setWidth(1024)
        window.dispatchEvent(new Event('resize'))
        await nextTick()
        expect(layoutOf(wrapper)).toBe(DEFAULT_LAYOUT)
        wrapper.unmount()
      } finally {
        setWidth(original)
      }
    })
  })
})

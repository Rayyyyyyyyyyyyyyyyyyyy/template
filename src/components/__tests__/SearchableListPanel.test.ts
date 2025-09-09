import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchableListPanel from '../layout/SearchableListPanel.vue'

// Mock dependencies
vi.mock('@/components', () => ({
  MainPanel: {
    name: 'MainPanel',
    props: ['title', 'showBack'],
    template: '<div class="main-panel-mock"><slot name="searchBar" /><slot name="main" /><slot name="footer" /></div>'
  },
  SearchBar: {
    name: 'SearchBar',
    props: ['showFilter', 'showSearch'],
    template: '<div class="search-bar-mock"><slot name="button" /><slot name="customerFilter" /></div>',
    emits: ['keydown:enter', 'update:clear']
  }
}))

// Mock Element Plus components globally
vi.mock('element-plus', () => ({
  ElPagination: {
    name: 'ElPagination',
    props: ['current-page', 'page-size', 'total', 'layout', 'page-sizes'],
    template: '<div class="el-pagination" :current-page="currentPage" :page-size="pageSize" :total="total" :layout="layout" :page-sizes="pageSizes"></div>',
    emits: ['current-change', 'size-change']
  }
}))

describe('SearchableListPanel', () => {
  const mockPagination = {
    page: 1,
    limit: 10,
    totalCount: 100
  }

  const defaultProps = {
    title: '測試標題',
    pagination: mockPagination
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with required props', () => {
    const wrapper = mount(SearchableListPanel, {
      props: defaultProps
    })

    expect(wrapper.find('.main-panel-mock').exists()).toBe(true)
    expect(wrapper.find('.search-bar-mock').exists()).toBe(true)
  })

  it('should pass title and showBack to MainPanel', () => {
    const props = {
      ...defaultProps,
      showBack: true
    }
    const wrapper = mount(SearchableListPanel, {
      props
    })

    const mainPanel = wrapper.findComponent({ name: 'MainPanel' })
    expect(mainPanel.props('title')).toBe(props.title)
    expect(mainPanel.props('showBack')).toBe(props.showBack)
  })

  it('should render pagination when totalCount > 0', () => {
    const wrapper = mount(SearchableListPanel, {
      props: defaultProps,
      global: {
        stubs: {
          'el-pagination': {
            template: '<div class="el-pagination" :current-page="currentPage" :page-size="pageSize" :total="total"></div>',
            props: ['current-page', 'page-size', 'total', 'layout', 'page-sizes']
          }
        }
      }
    })

    expect(wrapper.find('.el-pagination').exists()).toBe(true)
  })

  it('should not render pagination when totalCount is 0', () => {
    const props = {
      ...defaultProps,
      pagination: { ...mockPagination, totalCount: 0 }
    }
    const wrapper = mount(SearchableListPanel, {
      props
    })

    expect(wrapper.find('.el-pagination').exists()).toBe(false)
  })

  it('should emit search event when SearchBar emits keydown:enter', async () => {
    const wrapper = mount(SearchableListPanel, {
      props: defaultProps
    })

    const searchBar = wrapper.findComponent({ name: 'SearchBar' })
    await searchBar.vm.$emit('keydown:enter', 'test keyword')

    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')?.[0]).toEqual(['test keyword'])
  })

  it('should emit search event with null when SearchBar emits update:clear', async () => {
    const wrapper = mount(SearchableListPanel, {
      props: defaultProps
    })

    const searchBar = wrapper.findComponent({ name: 'SearchBar' })
    await searchBar.vm.$emit('update:clear')

    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')?.[0]).toEqual([null])
  })

  it('should emit updatePage when pagination current-page changes', async () => {
    const wrapper = mount(SearchableListPanel, {
      props: defaultProps,
      global: {
        stubs: {
          'el-pagination': {
            template: '<div class="el-pagination" @current-change="$emit(\'current-change\', $event)"></div>',
            emits: ['current-change']
          }
        }
      }
    })

    await wrapper.find('.el-pagination').trigger('current-change', { detail: 2 })

    expect(wrapper.emitted('updatePage')).toBeTruthy()
    expect(wrapper.emitted('updatePage')?.[0]).toEqual([2])
  })

  it('should emit updatePageSize when pagination size changes', async () => {
    const wrapper = mount(SearchableListPanel, {
      props: defaultProps,
      global: {
        stubs: {
          'el-pagination': {
            template: '<div class="el-pagination" @size-change="$emit(\'size-change\', $event)"></div>',
            emits: ['size-change']
          }
        }
      }
    })

    await wrapper.find('.el-pagination').trigger('size-change', { detail: 20 })

    expect(wrapper.emitted('updatePageSize')).toBeTruthy()
    expect(wrapper.emitted('updatePageSize')?.[0]).toEqual([20])
  })

  it('should show search when showSearch is true', () => {
    const props = {
      ...defaultProps,
      showSearch: true
    }
    const wrapper = mount(SearchableListPanel, {
      props
    })

    const searchBar = wrapper.findComponent({ name: 'SearchBar' })
    expect(searchBar.props('showSearch')).toBe(true)
  })

  it('should show filter when showFilter is true', () => {
    const props = {
      ...defaultProps,
      showFilter: true
    }
    const wrapper = mount(SearchableListPanel, {
      props
    })

    const searchBar = wrapper.findComponent({ name: 'SearchBar' })
    expect(searchBar.props('showFilter')).toBe(true)
  })

  it('should show all features when showDefaultSearch is true', () => {
    const props = {
      ...defaultProps,
      showDefaultSearch: true
    }
    const wrapper = mount(SearchableListPanel, {
      props
    })

    const searchBar = wrapper.findComponent({ name: 'SearchBar' })
    expect(searchBar.props('showSearch')).toBe(true)
    expect(searchBar.props('showFilter')).toBe(true)
  })

  it('should show all features when showSearch, showEdit, and showFilter are all true', () => {
    const props = {
      ...defaultProps,
      showSearch: true,
      showEdit: true,
      showFilter: true
    }
    const wrapper = mount(SearchableListPanel, {
      props
    })

    const searchBar = wrapper.findComponent({ name: 'SearchBar' })
    expect(searchBar.props('showSearch')).toBe(true)
    expect(searchBar.props('showFilter')).toBe(true)
  })

  it('should render firstButton slot', () => {
    const firstButtonContent = 'First Button'
    const wrapper = mount(SearchableListPanel, {
      props: defaultProps,
      slots: {
        firstButton: firstButtonContent
      }
    })

    expect(wrapper.text()).toContain(firstButtonContent)
  })

  it('should render customButton slot when showEdit is true', () => {
    const customButtonContent = 'Custom Button'
    const props = {
      ...defaultProps,
      showEdit: true
    }
    const wrapper = mount(SearchableListPanel, {
      props,
      slots: {
        customButton: customButtonContent
      }
    })

    expect(wrapper.text()).toContain(customButtonContent)
  })

  it('should render lastButton slot', () => {
    const lastButtonContent = 'Last Button'
    const wrapper = mount(SearchableListPanel, {
      props: defaultProps,
      slots: {
        lastButton: lastButtonContent
      }
    })

    expect(wrapper.text()).toContain(lastButtonContent)
  })

  it('should render filterButton slot', () => {
    const filterButtonContent = 'Filter Button'
    const wrapper = mount(SearchableListPanel, {
      props: defaultProps,
      slots: {
        filterButton: filterButtonContent
      }
    })

    expect(wrapper.text()).toContain(filterButtonContent)
  })

  it('should render main slot', () => {
    const mainContent = 'Main Content'
    const wrapper = mount(SearchableListPanel, {
      props: defaultProps,
      slots: {
        main: mainContent
      }
    })

    expect(wrapper.text()).toContain(mainContent)
  })

  it('should have correct pagination configuration', () => {
    const wrapper = mount(SearchableListPanel, {
      props: defaultProps,
      global: {
        stubs: {
          'el-pagination': {
            template: '<div class="el-pagination" :layout="layout" :page-sizes="pageSizes"></div>',
            props: ['layout', 'page-sizes']
          }
        }
      }
    })

    const pagination = wrapper.find('.el-pagination')
    expect(pagination.exists()).toBe(true)
  })

  it('should handle all slot combinations', () => {
    const slots = {
      firstButton: 'First',
      customButton: 'Custom',
      lastButton: 'Last',
      filterButton: 'Filter',
      main: 'Main'
    }

    const props = {
      ...defaultProps,
      showEdit: true
    }

    const wrapper = mount(SearchableListPanel, {
      props,
      slots
    })

    Object.values(slots).forEach(content => {
      expect(wrapper.text()).toContain(content)
    })
  })
})

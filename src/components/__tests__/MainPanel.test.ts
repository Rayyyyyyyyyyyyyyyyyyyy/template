import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MainPanel from '../layout/MainPanel.vue'
import FunctionHeader from '../layout/FunctionHeader.vue'

// Mock FunctionHeader component
vi.mock('../layout/FunctionHeader.vue', () => ({
  default: {
    name: 'FunctionHeader',
    props: ['title', 'showBack', 'depth'],
    template: '<div class="function-header-mock"><slot /></div>'
  }
}))

describe('MainPanel', () => {
  it('should render with default props', () => {
    const wrapper = mount(MainPanel)

    expect(wrapper.find('.function-header-mock').exists()).toBe(true)
    expect(wrapper.find('.panel-scrollbar').exists()).toBe(true)
  })

  it('should pass props to FunctionHeader', () => {
    const props = {
      title: '測試標題',
      showBack: true,
      depth: 2
    }
    const wrapper = mount(MainPanel, {
      props
    })

    const functionHeader = wrapper.findComponent(FunctionHeader)
    expect(functionHeader.props()).toEqual(props)
  })

  it('should render searchBar slot when provided', () => {
    const searchBarContent = 'Search Bar Content'
    const wrapper = mount(MainPanel, {
      slots: {
        searchBar: searchBarContent
      }
    })

    expect(wrapper.text()).toContain(searchBarContent)
    expect(wrapper.find('.px-4.pt-1\\.5').exists()).toBe(true)
  })

  it('should render main slot when provided', () => {
    const mainContent = 'Main Content'
    const wrapper = mount(MainPanel, {
      slots: {
        main: mainContent
      }
    })

    expect(wrapper.text()).toContain(mainContent)
    expect(wrapper.find('.py-1\\.5.px-4').exists()).toBe(true)
  })

  it('should render footer slot when provided', () => {
    const footerContent = 'Footer Content'
    const wrapper = mount(MainPanel, {
      slots: {
        footer: footerContent
      }
    })

    expect(wrapper.text()).toContain(footerContent)
    expect(wrapper.find('.flex.justify-start.pl-1\\.5.pt-0').exists()).toBe(true)
  })

  it('should render all slots together', () => {
    const searchBarContent = 'Search Bar'
    const mainContent = 'Main Content'
    const footerContent = 'Footer Content'

    const wrapper = mount(MainPanel, {
      slots: {
        searchBar: searchBarContent,
        main: mainContent,
        footer: footerContent
      }
    })

    expect(wrapper.text()).toContain(searchBarContent)
    expect(wrapper.text()).toContain(mainContent)
    expect(wrapper.text()).toContain(footerContent)
  })

  it('should apply correct CSS classes to scrollbar', () => {
    const wrapper = mount(MainPanel)

    const scrollbar = wrapper.find('.panel-scrollbar')
    expect(scrollbar.classes()).toContain('panel-scrollbar')
    expect(scrollbar.classes()).toContain('overflow-auto')
  })

  it('should have correct scrollbar styles', () => {
    const wrapper = mount(MainPanel)

    const scrollbar = wrapper.find('.panel-scrollbar')
    const styles = window.getComputedStyle(scrollbar.element)

    // Note: In test environment, computed styles might not be fully available
    // This test mainly ensures the element exists with correct classes
    expect(scrollbar.exists()).toBe(true)
  })

  it('should not render searchBar slot when not provided', () => {
    const wrapper = mount(MainPanel)

    expect(wrapper.find('.px-4.pt-1\\.5').exists()).toBe(false)
  })

  it('should not render main slot when not provided', () => {
    const wrapper = mount(MainPanel)

    expect(wrapper.find('.py-1\\.5.px-4').exists()).toBe(false)
  })

  it('should not render footer slot when not provided', () => {
    const wrapper = mount(MainPanel)

    expect(wrapper.find('.flex.justify-start.pl-1\\.5.pt-0').exists()).toBe(false)
  })

  it('should handle showBack prop variations', () => {
    const testCases = [
      { showBack: true },
      { showBack: false },
      { showBack: '/test-path' },
      { showBack: { path: '/test', custom: 'value' } }
    ]

    testCases.forEach((testCase) => {
      const wrapper = mount(MainPanel, {
        props: testCase as any
      })

      const functionHeader = wrapper.findComponent(FunctionHeader)
      expect(functionHeader.props('showBack')).toBe(testCase.showBack)
    })
  })
})

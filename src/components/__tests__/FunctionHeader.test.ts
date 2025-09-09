import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import FunctionHeader from '../layout/FunctionHeader.vue'

describe('FunctionHeader', () => {
  it('should render with default props', () => {
    const wrapper = mount(FunctionHeader)

    expect(wrapper.find('.h-header').exists()).toBe(true)
    expect(wrapper.find('.font-bold').text()).toBe('')
    expect(wrapper.findComponent({ name: 'ArrowLeftBold' }).exists()).toBe(false)
  })

  it('should render title when provided', () => {
    const title = '測試標題'
    const wrapper = mount(FunctionHeader, {
      props: { title }
    })

    expect(wrapper.find('.font-bold').text()).toBe(title)
  })

  it('should show back button when showBack is true', () => {
    const wrapper = mount(FunctionHeader, {
      props: { showBack: true }
    })

    expect(wrapper.findComponent({ name: 'ArrowLeftBold' }).exists()).toBe(true)
    expect(wrapper.find('.cursor-pointer').exists()).toBe(true)
  })

  it('should show back button when showBack is string', () => {
    const backPath = '/test-path'
    const wrapper = mount(FunctionHeader, {
      props: { showBack: backPath }
    })

    expect(wrapper.findComponent({ name: 'ArrowLeftBold' }).exists()).toBe(true)
  })

  it('should show back button when showBack is object', () => {
    const backConfig = { path: '/test', custom: 'value' }
    const wrapper = mount(FunctionHeader, {
      props: { showBack: backConfig }
    })

    expect(wrapper.findComponent({ name: 'ArrowLeftBold' }).exists()).toBe(true)
  })

  it('should emit back event with correct payload when showBack is true', async () => {
    const wrapper = mount(FunctionHeader, {
      props: { showBack: true }
    })

    await wrapper.find('.cursor-pointer').trigger('click')

    expect(wrapper.emitted('back')).toBeTruthy()
    expect(wrapper.emitted('back')?.[0]).toEqual([{ path: '' }])
  })

  it('should emit back event with path when showBack is string', async () => {
    const backPath = '/test-path'
    const wrapper = mount(FunctionHeader, {
      props: { showBack: backPath }
    })

    await wrapper.find('.cursor-pointer').trigger('click')

    expect(wrapper.emitted('back')).toBeTruthy()
    expect(wrapper.emitted('back')?.[0]).toEqual([{ path: backPath }])
  })

  it('should emit back event with object properties when showBack is object', async () => {
    const backConfig = { path: '/test', custom: 'value' }
    const wrapper = mount(FunctionHeader, {
      props: { showBack: backConfig }
    })

    await wrapper.find('.cursor-pointer').trigger('click')

    expect(wrapper.emitted('back')).toBeTruthy()
    expect(wrapper.emitted('back')?.[0]).toEqual([backConfig])
  })

  it('should render slot content', () => {
    const slotContent = 'Slot Content'
    const wrapper = mount(FunctionHeader, {
      slots: {
        default: slotContent
      }
    })

    expect(wrapper.text()).toContain(slotContent)
  })

  it('should apply correct CSS classes', () => {
    const wrapper = mount(FunctionHeader, {
      props: { title: 'Test Title' }
    })

    expect(wrapper.find('.h-header').classes()).toContain('h-header')
    expect(wrapper.find('.h-header').classes()).toContain('px-4')
    expect(wrapper.find('.h-header').classes()).toContain('py-4')
    expect(wrapper.find('.h-header').classes()).toContain('flex')
    expect(wrapper.find('.h-header').classes()).toContain('justify-between')
    expect(wrapper.find('.h-header').classes()).toContain('items-center')
    expect(wrapper.find('.h-header').classes()).toContain('bg-primary-10')
  })
})

import { flushPromises, mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { effectScope, nextTick } from 'vue'
import { afterEach, expect, it, vi } from 'vitest'
import HomeLayout from '../../layout/HomeLayout.vue'
import { useDemoTheme } from '../../views/docs/useDemoTheme'

const stubMatchMedia = (matches: boolean) =>
  vi.stubGlobal('matchMedia', () => ({ matches, addEventListener: vi.fn(), removeEventListener: vi.fn() }))

afterEach(() => {
  vi.unstubAllGlobals()
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

it('keeps the demo, install and documentation reachable and shows a return link on nested demos', async () => {
  stubMatchMedia(false)
  const component = { template: '<h1>Page</h1>' }
  const router = createRouter({
    history: createMemoryHistory(),
    routes: ['/', '/demo', '/demo/base-btn', '/install-guide', '/docs-center'].map((path) => ({
      path,
      component,
    })),
  })
  await router.push('/demo/base-btn')
  await router.isReady()
  const wrapper = mount(HomeLayout, { global: { plugins: [router] } })
  try {
    expect(
      wrapper
        .get('nav[aria-label="主要導覽"]')
        .findAll('a')
        .map((link) => link.attributes('href')),
    ).toEqual(['/demo', '/install-guide', '/docs-center'])
    expect(wrapper.get('.site-breadcrumb a').attributes('href')).toBe('/demo')
    expect(wrapper.get('.skip-link').attributes('href')).toBe('#main-content')
    expect(wrapper.get('#main-content').attributes('tabindex')).toBe('-1')
    await wrapper.get('a[href="/docs-center"]').trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.path).toBe('/docs-center')
    expect(wrapper.find('.site-breadcrumb').exists()).toBe(false)
    expect(wrapper.get('nav .router-link-exact-active').text()).toBe('文件中心')
  } finally {
    wrapper.unmount()
  }
})

it('toggles the dark class on <html> from the demo theme choice', async () => {
  stubMatchMedia(true)
  const scope = effectScope()
  const { theme } = scope.run(useDemoTheme)!
  const dark = () => document.documentElement.classList.contains('dark')
  try {
    expect(dark()).toBe(false)
    theme.value = 'dark'
    await nextTick()
    expect(dark()).toBe(true)
    theme.value = 'light'
    await nextTick()
    expect(dark()).toBe(false)
    theme.value = 'system'
    await nextTick()
    expect(dark()).toBe(true)
    expect(localStorage.getItem('rvtc-demo-theme')).toBe('system')
  } finally {
    scope.stop()
  }
})

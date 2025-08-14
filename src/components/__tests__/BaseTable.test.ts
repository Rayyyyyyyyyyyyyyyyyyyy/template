import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTable from '../BaseTable.vue'

describe('BaseTable', () => {
  it('renders properly', () => {
    const wrapper = mount(BaseTable, {
      props: {
        data: [],
        columns: []
      },
      global: {
        stubs: {
          'el-table': true,
          'el-table-column': true
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('accepts props correctly', () => {
    const data = [
      { id: 1, name: 'Test 1' },
      { id: 2, name: 'Test 2' }
    ]

    const columns = [
      { prop: 'id', label: 'ID' },
      { prop: 'name', label: 'Name' }
    ]

    const wrapper = mount(BaseTable, {
      props: {
        data,
        columns
      },
      global: {
        stubs: {
          'el-table': true,
          'el-table-column': true
        }
      }
    })

    expect(wrapper.props('data')).toEqual(data)
    expect(wrapper.props('columns')).toEqual(columns)
  })
})

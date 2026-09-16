import { resolve } from 'node:path'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { compileEmitsConsumer, emitContracts } from '../../../tests/consumer/emits-contract.mjs'

const contracts = resolve(import.meta.dirname, '../../types/components')

describe('public emits types in consumer SFCs', () => {
  it.each(emitContracts)('%s declares its runtime events', (typeName, events) => {
    const component = compileEmitsConsumer(typeName, contracts)
    expect(component.emits).toEqual(events)
  })

  it('notifies the host once when a wrapper forwards a native click', async () => {
    const component = compileEmitsConsumer('BaseBtnEmits', contracts,
      '<template><button @click="emit(\'click\', $event)">Confirm</button></template>')
    let calls = 0
    const wrapper = mount(component, { props: { onClick: () => { calls++ } } })
    await wrapper.get('button').trigger('click')
    expect(calls).toBe(1)
    wrapper.unmount()
  })
})

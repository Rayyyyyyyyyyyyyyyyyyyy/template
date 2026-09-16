import type { DefineComponent } from 'vue'

export const emitContracts: Array<[typeName: string, events: string[]]>

export function compileEmitsConsumer(
  typeName: string,
  moduleSpecifier?: string,
  template?: string,
): DefineComponent<Record<string, unknown>> & { emits: string[] }

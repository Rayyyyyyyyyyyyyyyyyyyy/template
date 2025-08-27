import type { TableColumn } from 'src/types'

export function setActiveColumn<T>(tableColumns: TableColumn<T>[]) {
  return tableColumns.map((col) => ({
    ...col,
    checkActive: true,
  }))
}

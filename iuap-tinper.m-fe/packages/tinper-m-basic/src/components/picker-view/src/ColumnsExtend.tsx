import { useMemo } from 'react'
import type { PickerValue, PickerValueExtend, PickerViewProps, } from './iPickerView'
import { withCache } from '@utils/WithCache'

export function generateColumnsExtend(
  rawColumns: PickerViewProps['columns'],
  val: PickerValue[]
) {
  const columns = withCache(() => {
    const c = typeof rawColumns === 'function' ? rawColumns(val) : rawColumns
    return c.map(column =>
      Object.assign(
        column.map(item =>
          typeof item === 'string'
            ? {
              label: item,
              value: item,
            }
            : item
        ),
        { label: column.label }
      )
    )
  })
  const items = withCache(() => val.map((v, index) => {
    const column = columns()[index]
    if (!column) return null
    return column.find(item => item.value === v) ?? null
  }))
  const extend: PickerValueExtend = {
    get columns() {
      return columns()
    },
    get items() {
      return items()
    },
  }
  return extend
}

export function useColumnsExtend(
  rawColumns: PickerViewProps['columns'],
  value: PickerValue[]
) {
  return useMemo(
    () => generateColumnsExtend(rawColumns, value),
    [rawColumns, value]
  )
}

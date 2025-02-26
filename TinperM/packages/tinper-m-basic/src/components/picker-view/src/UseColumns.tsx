import { useMemo } from 'react'
import { PickerColumn, PickerValue } from './iPickerView'

export function  useColumns(
  rawColumns: PickerColumn[] | ((value: PickerValue[]) => PickerColumn[]),
  value: PickerValue[]
) {
  return useMemo(() => {
    const columns =
      typeof rawColumns === 'function' ? rawColumns(value) : rawColumns
    return columns.map(column =>
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
  }, [rawColumns, value])
}

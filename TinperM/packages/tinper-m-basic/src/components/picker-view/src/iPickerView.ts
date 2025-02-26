import { NativeProps } from '@/utils/NativeProps'
import { ReactNode } from 'react'
import { PickerProps } from '@components/picker/src';

export type PickerValue = string | null

export type PickerValueExtend = {
  columns: PickerColumnItem[][]
  items: (PickerColumnItem | null)[]
}

export type PickerColumnItem = {
  label: ReactNode
  value: string
}

export type PickerColumnItems = PickerColumnItem[] & { label?: string }

export type PickerColumn = (string | PickerColumnItem)[] & { label?: string }
export type PickerViewProps = {
  columns: PickerColumn[] | ((value: PickerValue[]) => PickerColumn[])
  value?: PickerValue[]
  defaultValue?: PickerValue[]
  loading?: boolean
  loadingContent?: ReactNode
  onChange?: (value: PickerValue[], extend: PickerValueExtend) => void
  fieldid?: string,
  clsPrefix?: string,
  mouseWheel?: boolean
} & Pick<PickerProps, 'renderLabel'> & NativeProps<'--height' | '--item-height' | '--item-font-size'>

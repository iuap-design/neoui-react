
import { PickerProps, PickerRef } from '@components/picker/src/iPicker';


export type CascadePickerRef = PickerRef

export type CascadePickerOption = {
  label: string
  value: string
  children?: CascadePickerOption[]
}

export type CascadePickerProps = Omit<PickerProps, 'columns'> & {
  options: CascadePickerOption[]
}

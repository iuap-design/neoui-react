import { PickerViewProps } from '@tinper/m';
import { CascadePickerOption } from '@components/cascade-picker/src';

export type CascadePickerViewProps = Omit<PickerViewProps, 'columns'> & {
  options: CascadePickerOption[]
}

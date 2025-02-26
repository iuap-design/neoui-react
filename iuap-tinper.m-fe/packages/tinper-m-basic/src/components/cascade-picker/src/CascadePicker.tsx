import { Picker } from '@tinper/m';
import { mergeProps } from '@utils/WithDefaultProps';
import { forwardRef } from 'react';
import { useColumnsFn } from './CascadePickerUtils';
import { CascadePickerProps, CascadePickerRef } from './iCascadePicker';



export const CascadePicker = forwardRef<CascadePickerRef, CascadePickerProps>(
  (props, ref) => {
    const { options, clsPrefix, ...pickerProps } = mergeProps(props, {})
    const columnsFn = useColumnsFn(options)
    const classPrefix = `${clsPrefix}-cascade-picker`
    return <Picker className={classPrefix} {...pickerProps}  ref={ref} columns={columnsFn}  />
  }
)

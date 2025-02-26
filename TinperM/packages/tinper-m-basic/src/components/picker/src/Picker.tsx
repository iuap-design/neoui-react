import React, { useMemo } from 'react'
import { PickerView } from '@tinper/m';
import PickerFactory from '@components/picker/src/PickerFactory';
import { PickerProps } from '@components/picker/src/iPicker';


const Picker = (props: PickerProps) => {
  const Com = useMemo(() => PickerFactory(PickerView), [])
  return <Com {...props } />
}
Picker.displayName = 'Picker'
export default  Picker


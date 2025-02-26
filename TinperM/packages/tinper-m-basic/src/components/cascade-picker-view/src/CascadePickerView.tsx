import React from 'react'
import { useColumnsFn } from '@components/cascade-picker/src/CascadePickerUtils';
import { PickerView } from '@tinper/m';
import type { CascadePickerViewProps } from './iCascadePickerView'
import WebUI from '@utils/UpdatePrefixs'

const CascadePickerView: React.FC<CascadePickerViewProps> = props => {
  const { options, clsPrefix, className = '', ...pickerProps } = props
  const columnsFn = useColumnsFn(options)
  const _clsPrefix = `${clsPrefix}-cascade-picker-view`

  return <PickerView className={`${_clsPrefix} ${className}`} {...pickerProps} columns={columnsFn} />
}

export default WebUI({})(CascadePickerView)

import React, { FC, useEffect, useState } from 'react'
import { renderToBody } from '@utils/RenderToBody'
import DatePicker from './DatePicker'
import type { SingleDatePickerProps } from './iDatePicker'
import { PickerDate } from '@components/picker/src/util';

export function prompt(
  props: Omit<SingleDatePickerProps, 'value' | 'visible' | 'children'>
) {
  return new Promise<PickerDate  | null>(resolve => {
    const Wrapper: FC = () => {
      const [visible, setVisible] = useState(false)
      useEffect(() => {
        setVisible(true)
      }, [])
      return (
        <DatePicker
          {...props}
          visible={visible}
          onConfirm={(val) => {
            props.onConfirm?.(val)
            resolve(val)
          }}
          onClose={() => {
            props.onClose?.()
            setVisible(false)
            resolve(null)
          }}
          afterClose={() => {
            props.afterClose?.()
            unmount()
          }}
        />
      )
    }
    const unmount = renderToBody(<Wrapper />)
  })
}

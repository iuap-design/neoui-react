import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { Picker, PickerValue } from '@tinper/m'
import { renderToBody } from '@utils/RenderToBody';
import { PickerProps } from '@components/picker/src/iPicker';

export function prompt(
  props: Omit<PickerProps, 'value' | 'visible' | 'children'>
) {
  return new Promise<PickerValue[] | null>(resolve => {
    const Wrapper: FC = () => {
      const [visible, setVisible] = useState(false)
      useEffect(() => {
        setVisible(true)
      }, [])
      return (
        <Picker
          {...props}
          visible={visible}
          onConfirm={(val, extend) => {
            props.onConfirm?.(val, extend)
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

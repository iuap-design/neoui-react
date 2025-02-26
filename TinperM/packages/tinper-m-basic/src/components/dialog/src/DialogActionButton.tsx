import React, { useState } from 'react'
import classNames from 'classnames'
import { Button } from '@tinper/m'
import { DialogActionButtonProps } from './iDialog'
import { withNativeProps } from '@utils/NativeProps'

export const DialogActionButton = (props: DialogActionButtonProps) => {
  const { action, onAction, clsPrefix, fieldid } = props

  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const promise = onAction()
      await promise
      setLoading(false)
    } catch (e) {
      setLoading(false)
      throw e
    }
  }

  return withNativeProps(
    action,
    <Button
      key={action.key}
      onClick={handleClick}
      className={classNames(
        `${clsPrefix}-dialog-button`,
        action.bold && `${clsPrefix}-dialog-button-bold`,
        action.danger && `${clsPrefix}-dialog-button-danger`,
        action.primary && `${clsPrefix}-dialog-button-primary`
      )}
      block
      mode={'default'}
      loading={loading}
      disabled={action.disabled}
      fieldid={fieldid}
    >
      {action.text}
    </Button>
  )
}

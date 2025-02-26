import React, { useState } from 'react'
import classNames from 'classnames'
import { Button } from '@tinper/m'
import { withNativeProps } from '@utils/NativeProps'
import { ModalActionButtonProps } from './iModal'

export const ModalActionButton = (props: ModalActionButtonProps) => {
  const { action, clsPrefix, fieldid, onAction } = props

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
        `${clsPrefix}-modal-button`,
        action.primary && `${clsPrefix}-modal-button-primary`,
        action.danger && `${clsPrefix}-modal-button-danger`
      )}
      block
      mode={action.primary ? 'primary' : (action.danger ? 'danger' : 'default')}
      loading={loading}
      disabled={action.disabled}
      fieldid={fieldid}
    >
      {action.text}
    </Button>
  )
}

import { show } from './Show'
import { mergeProps } from '@utils/WithDefaultProps'
import { DialogConfirmProps } from './iDialog'
import { getTinpermLocaleConfig } from '@components/config-provider/src'

const defaultProps = {
  confirmText: getTinpermLocaleConfig().locale.Common.confirm,
  cancelText: getTinpermLocaleConfig().locale.Common.cancel,
}

export function confirm(p: DialogConfirmProps) {
  const props = mergeProps(defaultProps, p)
  return new Promise<boolean>(resolve => {
    show({
      ...props,
      closeOnAction: true,
      onClose: () => {
        props.onClose?.()
        resolve(false)
      },
      actions: [
        [
          {
            key: 'cancel',
            text: props.cancelText,
            onClick: async () => {
              await props.onCancel?.()
              resolve(false)
            },
          },
          {
            key: 'confirm',
            text: props.confirmText,
            primary: true,
            onClick: async () => {
              await props.onConfirm?.()
              resolve(true)
            },
          },
        ],
      ],
    })
  })
}

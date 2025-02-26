import { show } from './Show'
import { ModalConfirmProps } from './iModal'
import { mergeProps } from '@utils/WithDefaultProps'
import { getTinpermLocaleConfig } from '@components/config-provider/src'

const { locale } = getTinpermLocaleConfig()

const defaultProps = {
  confirmText: locale.Modal.confirm,
  cancelText: locale.Modal.cancel,
}

export function confirm(p: ModalConfirmProps) {
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
        {
          key: 'confirm',
          text: props.confirmText,
          primary: true,
          onClick: async () => {
            await props.onConfirm?.()
            resolve(true)
          },
        },
        {
          key: 'cancel',
          text: props.cancelText,
          onClick: async () => {
            await props.onCancel?.()
            resolve(false)
          },
        },
      ],
    })
  })
}

import { show } from './Show'
import { mergeProps } from '@utils/WithDefaultProps'
import { getTinpermLocaleConfig } from '@components/config-provider/src'
import { ModalAlertProps } from './iModal'

export function alert(p: ModalAlertProps) {
  const { locale } = getTinpermLocaleConfig()
  const defaultProps = { confirmText: locale.Modal.ok, }
  const props = mergeProps(defaultProps, p)
  return new Promise<void>(resolve => {
    show({
      ...props,
      closeOnAction: true,
      actions: [
        {
          key: 'confirm',
          text: props.confirmText,
          primary: true,
        },
      ],
      onAction: props.onConfirm,
      onClose: () => {
        props.onClose?.()
        resolve()
      },
    })
  })
}

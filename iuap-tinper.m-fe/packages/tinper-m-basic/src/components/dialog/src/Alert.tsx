import { show } from './Show'
import { mergeProps } from '@utils/WithDefaultProps'
import { getTinpermLocaleConfig } from '@components/config-provider/src'
import { DialogAlertProps } from './iDialog'

export function alert(p: DialogAlertProps) {
  const defaultProps = { confirmText: getTinpermLocaleConfig().locale.Dialog.ok, }
  const props = mergeProps(defaultProps, p)
  return new Promise<void>(resolve => {
    show({
      ...props,
      closeOnAction: true,
      actions: [
        {
          key: 'confirm',
          text: props.confirmText,
          primary: true
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

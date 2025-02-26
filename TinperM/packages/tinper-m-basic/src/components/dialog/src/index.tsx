import './Dialog.less'
import { show } from './Show'
import { alert } from './Alert'
import { confirm } from './Confirm'
import { clear } from './Clear'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import Dialog from './Dialog'

export type { DialogProps, Action, DialogShowProps, DialogShowRef, DialogAlertProps, DialogConfirmProps } from './iDialog'

export default attachPropertiesToComponent(Dialog, {
  show,
  alert,
  confirm,
  clear,
})

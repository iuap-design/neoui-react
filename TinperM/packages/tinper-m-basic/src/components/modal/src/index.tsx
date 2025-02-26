import './Modal.less'
import { show } from './Show'
import { alert } from './Alert'
import { confirm } from './Confirm'
import { clear } from './Clear'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import Modal from './Modal'

export type { ModalAlertProps, Action, ModalProps, ModalConfirmProps, ModalShowProps, ModalShowRef } from './iModal'

export default attachPropertiesToComponent(Modal, {
  show,
  alert,
  confirm,
  clear,
})

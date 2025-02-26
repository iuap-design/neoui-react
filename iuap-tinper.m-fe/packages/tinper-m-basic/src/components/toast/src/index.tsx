import './Toast.less'
import { clear, show, config } from './Method'

export type { ToastShowProps, ToastHandler } from './Method'

const Toast = {
  show,
  clear,
  config,
}

export default Toast

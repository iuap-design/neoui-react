import { NativeProps } from '@utils//NativeProps'

export interface NoticeProps extends NativeProps<
  | '--background-color'
  | '--border-color'
  | '--text-color'
  | '--font-size'
  | '--icon-font-size'
  | '--height'
> {
  /** 通告栏的类型 */
  color?: 'default' | 'success' | 'alert' | 'error' | 'info'
  /** 开始滚动的延迟，单位 ms */
  delay?: number
  /** 滚动速度，单位 px/s */
  speed?: number
  /** 公告内容 */
  content: React.ReactNode
  /** 是否可关闭 */
  closeable?: boolean
  /** 关闭时的回调 */
  onClose?: () => void
  /** 点击时的回调 */
  onClick?: () => void
  /** 额外操作区域，显示在关闭按钮左侧 */
  extra?: React.ReactNode
  /** 左侧广播图标 */
  icon?: React.ReactNode | 'none'
  /** 样式类名 */
  className?: string | undefined
  /** 类名前缀 */
  clsPrefix?: string | undefined
  /** dom标识 */
  fieldid?: string | undefined
  /** 模式 default: 默认 modal: 弹窗 */
  mode?: 'default' | 'modal'
  /** 消息弹窗是否展示 */
  noticeModalShow?: boolean
  /** 是否多行展示 */
  wrap?: boolean
}

import { NativeProps } from '@utils/NativeProps'

export interface ProgressBarProps extends NativeProps {
  percent: number
  rounded?: boolean
  text?: boolean | React.ReactNode | ((percent: number) => React.ReactNode)
  fieldid?: string
  className: string
  clsPrefix?: string
  style: object
}

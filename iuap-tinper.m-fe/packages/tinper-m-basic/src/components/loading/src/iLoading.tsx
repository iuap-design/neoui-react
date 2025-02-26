export interface LoadingProps {
  content?: string
  size?: string
  show?: boolean
  type?: 'toast' | 'progress' | 'spinloading' | 'dotloading'
  percent?: number
  duration?: number
  className?: string
  style?: React.CSSProperties
  fieldid?: string
  showBackDrop?: boolean
  clsPrefix?: string
  color?: string
  loadingStyle?: React.CSSProperties
}

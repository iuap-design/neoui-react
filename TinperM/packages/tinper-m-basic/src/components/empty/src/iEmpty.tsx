export interface EmptyProps {
  mode?: 'noData' | 'client' | 'blankPage' | 'error'| 'review' | 'server' | 'noNetwork'
  message?: string
  style?: React.CSSProperties
  fieldid?: string
  image?: string | React.ReactNode
  imageStyle?: React.CSSProperties
  clsPrefix?: string
  className?: string
}

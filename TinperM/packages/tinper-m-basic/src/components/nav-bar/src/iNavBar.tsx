export interface NavBarProps {
  fieldid?: string
  clsPrefix?: string
  className?: string
  style?: any
  back?: React.ReactNode
  backArrow?: React.ReactNode
  onBack?: () => void
  children?: React.ReactNode
  titleAlign?: 'left' | 'center' | 'right'
  blur?: boolean
  left?: React.ReactNode
  right?: React.ReactNode
}

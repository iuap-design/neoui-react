export interface FlexProps {
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  visible?: boolean
  direction: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justify: 'start' | 'end' | 'between' | 'center' | 'around'
  align: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  alignContent: 'start' | 'end' | 'center' | 'between' | 'around' | 'stretch'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  onClick?: () => void
  fieldid?: string
  clsPrefix?: string
}

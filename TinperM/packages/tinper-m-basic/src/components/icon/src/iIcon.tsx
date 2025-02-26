export interface IconProps {
  type: string
  color?: string
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  fieldid?: string,
  clsPrefix?: string
}

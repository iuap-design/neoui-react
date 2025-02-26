export interface FormItemWrapperProps {
  splitLine: boolean
  singleLine: boolean
  required: boolean
  labelIcon?: string | React.ReactNode
  showExtraLabelIcon: boolean
  showLabel: boolean
  label: string
  subLabel: string
  labelCls: string
  labelStyle: object
  contentCls: string
  contentStyle: object
  wrapStyle: object
  error: boolean
  errorText: string
  errorCls: string
  onClick: () => void
  children?: React.ReactNode
  className: string
  clsPrefix?: string
  style: object
  readOnly: boolean
  readOnlyContent: React.ReactNode
  disabled: boolean
  showIcon: boolean
  rightIcon: React.ReactNode
  rightIconCls: string
  tips: string
  fieldid: string,
  wrapMode?: 'word' | 'letter'
}

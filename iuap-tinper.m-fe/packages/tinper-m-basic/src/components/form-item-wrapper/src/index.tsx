import './FormItemWrapper.less'
import FormItemWrapper from './FormItemWrapper'

export const WrapperProps = [
  'splitLine',
  'singleLine',
  'required',
  'showExtraLabelIcon',
  'label',
  'subLabel',
  'labelCls',
  'labelStyle',
  'contentCls',
  'contentStyle',
  'error',
  'errorText',
  'errorCls',
  'children',
  'onClick',
  'className',
  'style',
  'readOnly',
  'readOnlyContent',
  'rightIcon',
  'rightIconCls',
  'fieldid',
]

export const getListItemProps = (props: any, other:any = {}) => {
  const res: any = {}
  for (const key of WrapperProps) {
    if (props[key] !== undefined) res[key] = props[key]
    if (other?.[key] !== undefined) res[key] = other[key]
  }
  return res
}
FormItemWrapper.getListItemProps = getListItemProps
export default FormItemWrapper

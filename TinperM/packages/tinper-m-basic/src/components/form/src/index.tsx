import './index.less'
import Form from './Form'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import FormItem from './FormItem'
import { Header } from './Header'
import { useWatch, useForm } from 'rc-field-form'
import { FormSubscribe } from './FormSubscribe'
import FormArray from './FormArray'

export type FormLayout = 'vertical' | 'horizontal'
export type { FormProps, FormInstance, FormItemProps, FormSubscribeProps, FormArrayField, FormArrayOperation, FormArrayProps } from './iForm'
export type {
  ValidateMessages,
  FieldData,
  NamePath,
  Rule,
  RuleObject,
  RuleRender,
} from 'rc-field-form/es/interface'

export default attachPropertiesToComponent(Form, {
  Item: FormItem,
  Subscribe: FormSubscribe,
  Header,
  Array: FormArray,
  useForm,
  useWatch,
})

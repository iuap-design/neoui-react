import React, { ReactNode, ReactElement, MutableRefObject } from 'react'
import type { Meta, InternalNamePath } from 'rc-field-form/lib/interface'
import { NativeProps } from '@utils/NativeProps'
import { ListProps, ListItemProps } from '../../list/src/index'
import type {
  FormProps as RcFormProps,
  FormInstance as RCFormInstance,
} from 'rc-field-form'
import type { StoreValue, NamePath, Callbacks, Store, ValidateMessages } from 'rc-field-form/es/interface'
import type { FormLayout } from './index'
import type { FieldProps } from 'rc-field-form/lib/Field'

export interface FormContextType {
  name?: string
  hasFeedback: boolean
  layout: FormLayout
  requiredMarkStyle: 'asterisk' | 'text-required' | 'text-optional' | 'none'
  disabled: boolean
  requiredPosition?: 'left' | 'right'
}

export const defaultFormContext: FormContextType = {
  name: undefined,
  hasFeedback: true,
  layout: 'vertical',
  requiredMarkStyle: 'asterisk',
  disabled: false,
  requiredPosition: 'right'
}

export const FormContext =
  React.createContext<FormContextType>(defaultFormContext)

export interface OnSubMetaChange {
  (meta: Meta & { destroy?: boolean }, namePath: InternalNamePath): void;
}

export const NoStyleItemContext = React.createContext<OnSubMetaChange | null>(
  null
)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FormInstance extends Pick<RCFormInstance,
  'getFieldValue'
  | 'getFieldsValue'
  | 'getFieldError'
  | 'getFieldsError'
  | 'isFieldTouched'
  | 'isFieldsTouched'
  | 'resetFields'
  | 'setFields'
  | 'setFieldValue'
  | 'setFieldsValue'
  | 'submit'
  | 'validateFields'
> { }

export interface FormProps<Values = any> extends Pick<
  RcFormProps,
  | 'form'
  | 'children'
>, NativeProps<'--border-inner' | '--border-top' | '--border-bottom' | '--prefix-width'>, Partial<FormContextType> {
  footer?: ReactNode;
  mode?: ListProps['mode'];
  clsPrefix?: string;
  fieldid?: string;
  className?: string;
  initialValues?: Store;
  name?: string;
  validateMessages?: ValidateMessages;
  onValuesChange?: Callbacks<Values>['onValuesChange'];
  onFieldsChange?: Callbacks<Values>['onFieldsChange'];
  onFinish?: Callbacks<Values>['onFinish'];
  onFinishFailed?: Callbacks<Values>['onFinishFailed'];
  validateTrigger?: string | string[] | false;
  preserve?: boolean;
  disabled?: boolean;
  hasFeedback?: boolean;
  layout?: FormLayout;
  requiredMarkStyle?: 'asterisk' | 'text-required' | 'text-optional' | 'none';
}

export interface FormArrayField {
  index: number
  key: number
}

export interface FormArrayOperation {
  add: (defaultValue?: StoreValue, insertIndex?: number) => void
  remove: (index: number | number[]) => void
  move: (from: number, to: number) => void
}

export interface FormArrayProps {
  name: string | number | (string | number)[]
  initialValue?: any[]
  renderHeader?: (
    field: FormArrayField,
    operation: FormArrayOperation
  ) => ReactNode
  onAdd?: (operation: FormArrayOperation) => void
  renderAdd?: () => ReactNode
  children: (
    fields: FormArrayField[],
    operation: FormArrayOperation
  ) => ReactElement[],
  clsPrefix?: string;
  fieldid?: string;
}

export type RenderChildren<Values = any> = (form: RCFormInstance<Values>) => ReactNode
type ChildrenType<Values = any> = RenderChildren<Values> | ReactNode

type RcFieldProps = Omit<FieldProps, 'children'>

export interface FormItemProps extends NativeProps, Pick<RcFieldProps,
  'dependencies'
  | 'valuePropName'
  | 'name'
  | 'rules'
  | 'messageVariables'
  | 'trigger'
  | 'validateTrigger'
  | 'shouldUpdate'
  | 'initialValue'
  | 'getValueFromEvent'
  | 'getValueProps'
  | 'normalize'
  | 'preserve'
  | 'validateFirst'
>, Pick<ListItemProps,
  'style'
  | 'extra'
  | 'clickable'
  | 'arrow'
  | 'description'
> {
  label?: React.ReactNode;
  help?: React.ReactNode;
  hasFeedback?: boolean;
  required?: boolean;
  noStyle?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  layout?: FormLayout;
  childElementPosition?: 'normal' | 'right';
  children?: ChildrenType;
  onClick?: (e: React.MouseEvent, widgetRef: React.MutableRefObject<any>) => void;
  clsPrefix?: string;
  fieldid?: string;
  rightIcon?: React.ReactNode;
  showErrorIcon?: boolean;
  showFeedbackError?: boolean;
  rightErrorIconStyle?: React.CSSProperties;
  requiredPosition?: 'left' | 'right';
}

export interface MemoInputProps {
  value: any
  update: number
  children: ReactNode
}

export interface FormItemLayoutProps extends NativeProps, Pick<
  FormItemProps,
  | 'className'
  | 'style'
  | 'required'
  | 'hasFeedback'
  | 'disabled'
  | 'label'
  | 'help'
  | 'hidden'
  | 'layout'
  | 'extra'
  | 'clickable'
  | 'arrow'
  | 'description'
  | 'childElementPosition'
> {
  onClick?: (e: React.MouseEvent) => void
  htmlFor?: string
  errors: string[]
  warnings: string[]
  children: ReactNode
  clsPrefix?: string
  fieldid?: string
  rightIcon?: React.ReactNode;
  showErrorIcon?: boolean;
  showFeedbackError?: boolean;
  rightErrorIconStyle?: React.CSSProperties;
  requiredPosition?: 'left' | 'right';
}

type RenderChildrenItem<Values = any> = (
  changedValues: Record<string, any>,
  form: RCFormInstance<Values>
) => ReactNode
type ChildrenTypeItem<Values = any> = RenderChildrenItem<Values>

export interface FormSubscribeProps {
  to: NamePath[]
  children: ChildrenTypeItem
}

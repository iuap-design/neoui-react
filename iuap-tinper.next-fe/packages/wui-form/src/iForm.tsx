import * as React from 'react';
import { tuple } from '../../wui-core/src/utils/type';
import { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import { FormInstance as RcFormInstance } from 'rc-field-form';
import { Options as ScrollOptions } from 'scroll-into-view-if-needed';
import { StoreValue, NamePath, InternalNamePath, ValidateErrorEntity, Meta, ValidatorRule} from 'rc-field-form/lib/interface';
import { FieldProps } from 'rc-field-form/lib/Field';
import { FormProviderProps as RcFormProviderProps } from 'rc-field-form/lib/FormContext';
import type {BaseProps, Key, SizeType} from '../../wui-core/src/iCore';

type ColSpanType = number | string;

type FlexType = number | 'none' | 'auto' | string;

export interface ColSize {
  flex?: FlexType;
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  flex?: FlexType;
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
  xs?: ColSpanType | ColSize;
  sm?: ColSpanType | ColSize;
  md?: ColSpanType | ColSize;
  lg?: ColSpanType | ColSize;
  xl?: ColSpanType | ColSize;
  xxl?: ColSpanType | ColSize;
  prefixCls?: string;
}

export type FormLabelAlign = 'left' | 'right';

const validateStatuses = tuple('success', 'warning', 'error', 'validating', '');
export type ValidateStatus = typeof validateStatuses[number];

// context

export interface FormProviderProps extends Omit<RcFormProviderProps, 'validateMessages'> {
  prefixCls?: string;
}
export interface FormContextProps {
    vertical?: boolean;
    name?: string;
    colon?: boolean;
    labelAlign?: FormLabelAlign | string;
    labelCol?: ColProps;
    labelWrap?: boolean;
    itemRef?: (name: (string | number)[]) => void;
  }
export interface FormItemPrefixContextProps {
    prefixCls: string;
    status?: ValidateStatus;
  }

// useForm
export interface FormInstance<Values = any> extends RcFormInstance<Values> {
    scrollToField: (name: NamePath, options?: ScrollOptions) => void;
    /** This is an internal usage. Do not use in your prod */
    __INTERNAL__: {
      /** No! Do not use this in your code! */
      name?: string;
      /** No! Do not use this in your code! */
      itemRef: (name: InternalNamePath) => (node: React.ReactElement) => void;
    };
    getFieldInstance: (name: NamePath) => any;
  }
export {NamePath, InternalNamePath, ScrollOptions, ValidateErrorEntity, Meta, RcFormInstance}

// Form
export type RequiredMark = boolean | 'optional';
export type FormLayout = 'horizontal' | 'inline' | 'vertical' | string;

export interface FormProps<Values = any> extends Omit<RcFormProps<Values>, 'form' | 'hidden'>, Omit<BaseProps, 'children'> {
  prefixCls?: string;
  colon?: boolean;
  name?: string;
  layout?: FormLayout;
  labelAlign?: FormLabelAlign;
  labelCol?: ColProps;
  labelWrap?: boolean;
  wrapperCol?: ColProps;
  form?: FormInstance<Values>;
  size?: SizeType;
  scrollToFirstError?: ScrollOptions | boolean;
  requiredMark?: RequiredMark;
  hidden?: boolean | 'visible' | 'hidden' | 'destroy';
  /** @deprecated Will warning in future branch. Pls use `requiredMark` instead. */
  hideRequiredMark?: boolean;
  disabled?: boolean;
}

// FormLable
export interface FormItemLabelProps {
    colon?: boolean;
    htmlFor?: string;
    label?: React.ReactNode;
    labelAlign?: FormLabelAlign;
    labelWrap?: boolean;
    labelCol?: ColProps;
    requiredMark?: RequiredMark;
    tooltip?: React.ReactNode;
  }

// FormInput
export interface FormItemInputProps {
    wrapperCol?: ColProps;
    help?: React.ReactNode;
    extra?: React.ReactNode;
    status?: ValidateStatus;
  }
export interface FormItemInputMiscProps {
    prefixCls: string;
    children: React.ReactNode;
    errors: React.ReactNode[];
    hasFeedback?: boolean;
    validateStatus?: ValidateStatus;
    onDomErrorVisibleChange: (visible: boolean) => void;
    /** @private Internal Usage, do not use in any of your production. */
    _internalItemRender?: {
      mark: string;
      render: (
        props: FormItemInputProps & FormItemInputMiscProps,
        domList: {
          input: JSX.Element;
          errorList: JSX.Element | null;
          extra: JSX.Element | null;
        },
      ) => React.ReactNode;
    };
  }

// FormItem
export type RenderChildren<Values = any> = (form: RcFormInstance<Values>) => React.ReactElement;
export type RcFieldProps<Values = any> = Omit<FieldProps<Values>, 'children'>;
export type ChildrenType<Values = any> = RenderChildren<Values> | React.ReactElement;

export interface MemoInputProps {
    value: any;
    update: number;
    children: React.ReactNode;
  }


export interface FormItemProps<Values = any>
    extends FormItemLabelProps,
      FormItemInputProps,
      RcFieldProps<Values>,
      Omit<BaseProps, 'children'> {
    prefixCls?: string;
    noStyle?: boolean;
    size?: SizeType;
    // style?: React.CSSProperties;
    // className?: string;
    // children?: ChildrenType<Values>;
    children?: any;
    id?: string;
    hasFeedback?: boolean;
    validateStatus?: ValidateStatus;
    required?: boolean;
    hidden?: boolean | 'hidden' | 'destroy' | 'visible';
    initialValue?: any;
    messageVariables?: Record<string, string>;
    tooltip?: React.ReactNode;
    /** Auto passed by List render props. User should not use this. */
    fieldKey?: Key | Key[];
    onSubmit?: any;
  }

// FormList
export interface FormListFieldData {
    name: number;
    key: number;
    fieldKey?: number;
  }

export interface FormListOperation {
    add: (defaultValue?: StoreValue, insertIndex?: number) => void;
    remove: (index: number | number[]) => void;
    move: (from: number, to: number) => void;
  }

export interface FormListProps {
    prefixCls?: string;
    name: string | number | (string | number)[];
    rules?: ValidatorRule[];
    initialValue?: any[];
    children: (
      fields: FormListFieldData[],
      operation: FormListOperation,
      meta: { errors: React.ReactNode[] },
    ) => React.ReactNode;
  }

export interface V3FormInstance {
  getFieldProps: (a1?: any, a2?:any, a3?: any) => any;
  getFieldDecorator: (a1?: any, a2?:any, a3?: any) => (node?:React.ReactNode) => React.ReactNode;
  getFieldValue: (name: string) => any;
  getFieldsValue:(fieldNames?: Array<string>) => { [field: string]: any };
  getFieldError: (name: string) => string[] | undefined;
  getFieldsError: (nameList?: string[]) => Record<string, string[] | undefined>;
  getFieldInstance: (name: string) => any;
  getFieldWarning: (name: string) => string[];
  isFieldsTouched: ((nameList?: string[], allFieldsTouched?: boolean) => boolean) & ((allFieldsTouched?: boolean) => boolean);
  isFieldTouched: (name: string) => boolean;
  isFieldValidating: (name: string) => boolean;
  isFieldsValidating: (nameList: string[]) => boolean;
  resetFields: (names?: Array<string>) => void;
  setFields: (fields: Object) => void;
  setFieldValue: (name: Object, callback?: Function) => void;
  setFieldsValue: (name: Object, callback?: Function) => void;
  setFieldsInitialValue: (name: Object, callback?: Function) => void;
  validateFields: (a1?: any, a2?:any, a3?: any) => void;
  isSubmitting: (a1?: any) => boolean;
  submit: (fn?: Function) => void;
}

export type UnionFormInstance = FormInstance & V3FormInstance;
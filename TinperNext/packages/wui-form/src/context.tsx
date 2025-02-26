import {FormProvider as RcFormProvider} from 'rc-field-form';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import type {FormItemPrefixContextProps, FormProviderProps} from './iForm'

export const FormContext = React.createContext({
    labelAlign: 'right',
    vertical: false,
    itemRef: (() => {}) as any
});

export interface FormItemContextProps {
    updateItemErrors: (name: string, errors: string[], originName?: string) => void;
  }

export const FormItemContext = React.createContext<FormItemContextProps>({
    updateItemErrors: () => {}
});

export const FormProvider: React.FC<FormProviderProps> = props => {
    const providerProps = omit(props, ['prefixCls']);
    return <RcFormProvider {...providerProps} />;
};

export const FormItemPrefixContext = React.createContext<FormItemPrefixContextProps>({
    prefixCls: ''
});

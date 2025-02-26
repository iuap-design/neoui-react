import {List} from 'rc-field-form';
import * as React from 'react';
// import { ValidatorRule, StoreValue } from 'rc-field-form/lib/interface';
// import devWarning from '../_util/devWarning';
import {ConfigContext} from '../../wui-provider/src/context';
import {FormItemPrefixContext} from './context';
import type {FormListProps, Meta, FormListFieldData, FormListOperation} from './iForm'

const FormList: React.FC<FormListProps> = ({prefixCls: customizePrefixCls, children, ...props}) => {
    // devWarning(!!props.name, 'Form.List', 'Miss `name` prop.');

    const {getPrefixCls} = React.useContext(ConfigContext);
    const prefixCls = getPrefixCls('form', customizePrefixCls);

    return (
        <List {...props}>
            {(fields: FormListFieldData[], operation: FormListOperation, meta: Meta) => (
                <FormItemPrefixContext.Provider value={{prefixCls, status: 'error'}}>
                    {children(
                        fields.map(field => ({...field, fieldKey: field.key})),
                        operation,
                        {
                            errors: meta.errors
                        }
                    )}
                </FormItemPrefixContext.Provider>
            )}
        </List>
    );
};

export default FormList;

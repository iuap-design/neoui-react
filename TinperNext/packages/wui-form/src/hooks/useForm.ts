import {useForm as useRcForm} from 'rc-field-form';
import * as React from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import {getFieldId, toArray} from '../util';
import type {NamePath, InternalNamePath, FormInstance, ScrollOptions} from '../iForm'

function toNamePathStr(name: NamePath) {
    const namePath = toArray(name);
    return namePath.join('_');
}

export default function useForm<Values = any>(form?: FormInstance<Values>): [FormInstance<Values>] {
    const [rcForm] = useRcForm();
    const itemsRef = React.useRef<Record<string, React.ReactElement>>({});

    const wrapForm: FormInstance<Values> = React.useMemo(
        () =>
            form || {
                ...rcForm,
                __INTERNAL__: {
                    itemRef: (name: InternalNamePath) => (node: React.ReactElement) => {
                        const namePathStr = toNamePathStr(name);
                        if (node) {
                            itemsRef.current[namePathStr] = node;
                        } else {
                            delete itemsRef.current[namePathStr];
                        }
                    }
                },
                scrollToField: (name: NamePath, options: ScrollOptions) => {
                    const namePath = toArray(name);
                    const fieldId = getFieldId(namePath, wrapForm.__INTERNAL__.name);
                    const node = fieldId ? document.getElementById(fieldId) : null;

                    if (node) {
                        scrollIntoView(node, {
                            scrollMode: 'if-needed',
                            block: 'nearest',
                            ...options
                        });
                    }
                },
                getFieldInstance: (name: NamePath) => {
                    const namePathStr = toNamePathStr(name);
                    return itemsRef.current[namePathStr];
                }
            },
        [form, rcForm]
    );

    return [wrapForm];
}

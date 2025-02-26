/**
 * - `size` not work with customizeInput
 * - CustomizeInput not feedback `ENTER` key since accessibility enhancement
 */

import classNames from 'classnames';
import type { BaseSelectRef } from 'rc-select';
import toArray from 'rc-util/lib/Children/toArray';
import omit from 'omit.js';
import * as React from 'react';
import {ConfigContext} from "../../wui-provider/src/context";
import type {
    AutoCompletePropsSub
} from './iAutoComplete';
import type {
    SelectProps,
} from '../../wui-select/src/iSelect';
import Select from '../../wui-select/src';

const reRegExpChar = /[\\^$.*+?()[\]{}|]/g
const reHasRegExpChar = RegExp(reRegExpChar.source)
// 转义 RegExp 字符串中特殊的字符 "^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", 和 "|" in .
function escapeRegExp(string: string) {
    return (string && reHasRegExpChar.test(string))
        ? string.replace(reRegExpChar, '\\$&')
        : (string || '')
}

function isSelectOptionOrSelectOptGroup(child: any): Boolean {
    return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}


const AutoComplete: React.ForwardRefRenderFunction<BaseSelectRef, AutoCompletePropsSub> = (
    props,
    ref,
) => {
    const {
        prefixCls: customizePrefixCls,
        className,
        children,
        options = [],
        ...others
    } = props;
    const [currentValue, setCurrentValue] = React.useState(typeof props.value === 'undefined' ? props.defaultValue : props.value);
    const childNodes: React.ReactElement[] = toArray(children);
    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls('autocomplete', customizePrefixCls);

    // ============================= Input =============================
    let customizeInput: React.ReactElement | undefined;

    if (
        childNodes.length === 1 &&
        React.isValidElement(childNodes[0]) &&
     !isSelectOptionOrSelectOptGroup(childNodes[0])
    ) {
        [customizeInput] = childNodes;
    }

    const getInputElement = customizeInput ? (): React.ReactElement => customizeInput! : undefined;
    // console.log('getInputElement', getInputElement);

    // ============================ value ============================
    const onChange = (value: string, option: any) => {
        setCurrentValue(value)
        props.onChange && props.onChange(value, option)
    }

    React.useEffect(() => { // 受控的select，每次都随传来的value更新state
        if ('value' in props) {
            setCurrentValue(props.value)
        }
    })


    // ============================ Options ============================

    const replaceCurrentMatchWord = (str: string) => {
        const displayName = escapeRegExp(currentValue as string)
        if (!displayName) return str;
        const regexp = new RegExp(displayName, 'g')
        str = str.replace(regexp, match => {
            if (match) {
                return `<span class="${prefixCls}-match-words">${match}</span>`
            } else {
                return ""
            }
        });
        return str
    }

    // options兼容string[]旧格式 改为{label, value}[]形式
    const optionList = options.map((item) => {
        switch (typeof item) {
            case 'string':
                return {value: item, label: item};
            case 'object': {
                return item;
            }
            default:
                console.warn(
                    'AutoComplete',
                    '`options` is only supports type `string[] | {label, value}[]`.',
                );
                return undefined;
        }
    })

    const filterOption: SelectProps['filterOption'] = (inputValue, option) => {
        if (props.filterOption && typeof props.filterOption === 'function') {
            return props.filterOption(inputValue, option);
        }
        return (option!.value as string).toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
    }

    return (
        <Select
            ref={ref}
            value={currentValue}
            {...omit(others, ['value', 'defaultValue', 'onChange'])}
            onChange={onChange}
            className={classNames(prefixCls, className)}
            mode="combobox"
            {...{
                // Internal api
                getInputElement,
            }}
            filterOption={filterOption}
        >
            {
                optionList.map((item: any) => {
                    return !!item && (
                        <Select.Option value={item.value} key={item.value}>
                            <span dangerouslySetInnerHTML={{__html: replaceCurrentMatchWord(item.label)}}></span>
                        </Select.Option>
                    );
                })
            }
        </Select>
    );
};

const RefAutoComplete = React.forwardRef<BaseSelectRef, AutoCompletePropsSub>(AutoComplete);

export default RefAutoComplete;

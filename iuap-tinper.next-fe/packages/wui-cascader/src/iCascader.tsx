import * as React from 'react';
import type { AlignType, BaseProps, BorderType, SizeType } from '../../wui-core/src/iCore';

export interface OptionType {
    label?: string;
    value?: string | number | null;
    children?: OptionType[];
    isEmptyNode?: string;
}

export interface CascaderOption {
    value?: string | number;
    label?: React.ReactNode;
    disabled?: boolean;
    isLeaf?: boolean;
    loading?: boolean;
    children?: CascaderOption[];
    [key: string]: any;
}
// 自定义字段
export interface FieldNames {
    label?: string;
    value?: string;
    children?: string;
    fieldid?: string;
    id?: string;
}
export interface ShowSearchType {
    filter?: (inputValue?: string, options?: CascaderOption[], fieldNames?: FieldNames) => boolean;
    render?: (
      inputValue?: string,
      path?: CascaderOption[],
      prefixCls?: string,
      fieldNames?: FieldNames,
    ) => React.ReactNode;
    sort?: (a: CascaderOption[], b: CascaderOption[], inputValue?: string, fieldNames?: FieldNames) => number;
    matchInputWidth?: boolean;
    limit?: number | false;
}
// export type SingleValueType = (string | number)[];
// export type ValueType = SingleValueType | SingleValueType[];
export interface CascaderProps extends BaseProps {
    allowClear?: boolean;
    autoFocus?: boolean;
    align?: AlignType;
    bordered?: BorderType;
    requiredStyle?: boolean;
    changeOnSelect?: boolean;
    // className?: string;
    defaultValue?: Array<string>;
    disabled?: boolean;
    displayRender?: (label?: Array<string>, selectedOptions?: CascaderOption[]) => React.ReactNode;
    dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
    expandIcon?: React.ReactNode;
    expandTrigger?: 'hover' | 'click';
    fieldNames?: FieldNames;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    loadData?: (selectOptions: CascaderOption[], callBack?: any) => void
    notFoundContent?: string;
    options?: CascaderOption[];
    placeholder?: string;
    popupClassName?: string | undefined;
    popupPlacement?: string;
    showSearch?: boolean | ShowSearchType;
    size?: SizeType;
    separator?: string;
    // style?: React.CSSProperties;
    suffixIcon?: React.ReactNode;
    onChange?: (label?: Array<string>, selectedOptions?: CascaderOption[]) => void;
    onPopupVisibleChange?: (isShow?: boolean, _isClear?: any) => void;
    popupVisible?: boolean | undefined;
    value?: (string | number)[] | CascaderOption[];
    // fieldid?: string;
    prefixCls?: string;
    inputValue?: string;
    onSearch?: (label?: string, selectedOptions?: CascaderOption[]) => void;
    locale?: string;
    multiple?: boolean;
    maxTagCount?: number;
    showCheckedStrategy?: any;
    maxTagPlaceholder?: React.ReactNode;
    maxTagTextLength?: number;
    tagRender?: (val: any) => React.ReactElement;
    dropdownType?: string;
    dropdownTabsContent?: (val: any) => {dropdownTabsContentTop?: React.ReactNode, dropdownTabsContentBody?: React.ReactNode};
    onRef?: any;
    onChangeTabs?: (val: string) => void;
    resultListMatchInputWidth?: boolean;
    tabsItems?: Record<string, any>[];
    dir?: 'ltr'|'rtl'|undefined;
    loadDataFlag?: boolean;
}
export interface CascaderState {
    value: any;
    inputValue?: string;
    inputFocused: boolean;
    popupVisible: boolean | undefined;
    prevProps: any;
    flattenOptions: any;
    popupClassName: string | undefined;
    initInputValue?: string;
    dropDownCls?: boolean;
    loadedKeys: Array<string>;
    dropdownMatchSelectWidth?: boolean;
    dropdownDom?: any;
    restData?: Record<string, any>[];
    isMoreTagClick?: boolean;
    tabsArr?: Record<string, any>[];
    tabsActiveKey?: string;
    tiledContent?: () => any;
    deepNum?: number;
    tiledValue?: any;
    tiledSelectedOptions?: CascaderOption[];
    options?: CascaderOption[];
    isClear?: boolean;
}
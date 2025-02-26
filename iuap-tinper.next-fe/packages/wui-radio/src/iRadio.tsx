import React, { ReactElement, ReactNode } from 'react'
import { BaseProps, IDirection } from '../../wui-core/src/iCore';
import { DropDownProps } from '../../wui-dropdown/src/iDropdown';

export type Color = '' | 'dark' | 'success' | 'info' | 'warning' | 'danger' | 'primary'
export type Size = 'lg' | 'sm' | 'small' | 'large' | 'default' | 'md' | 'middle'
export type RadioValue = string | boolean | number;

export interface RadioGroupProps extends BaseProps {
    name: string;
    /**
     * 默认选中的值
     */
    defaultValue: RadioValue;
    /**
     * 选中的值
     */
    selectedValue?: RadioValue;
    /**
     * 选中的值,作用与selectedValue一致，添加value属性是为了配合form表单校验初始化等一起使用
     */
    value?: RadioValue;
    /**
     * 暴露给用户，且与子Radio通信的方法
     */
    onChange: (value: RadioValue | React.ChangeEvent | React.MouseEvent<HTMLElement>, event?: | React.ChangeEvent | React.MouseEvent<HTMLElement>, options?: {maxCount?: number}) => void;

    onClick: (value: RadioValue | React.ChangeEvent | React.MouseEvent<HTMLElement>, event?: | React.ChangeEvent | React.MouseEvent<HTMLElement>) => void;
    /**
     * radio 大小
     */
    size?: Size;

    // 是否兼容ant design模式
    antd: boolean;

    Component: keyof JSX.IntrinsicElements | React.ComponentClass<any>;

    disabled?: boolean;
    readOnly: boolean;
    options?: (RadioProps & { label: ReactNode } | string)[];
    optionType?: "button" | "default";
    spaceSize?: string | number;
    maxCount?: boolean | number;
    dropDrownProps: DropDownProps;
    children: ReactElement<RadioProps> | ReactNode;
    dir:IDirection,
}

export interface RadioGroupState {
    focusValue?: RadioValue;
    selectedValue?: RadioValue | React.ChangeEvent;
    maxCount: number;
}

export interface RadioProps extends Pick<Partial<RadioGroupProps>,
    'size' | 'disabled' | 'readOnly' | 'antd' | 'value' | 'name' | 'selectedValue' | 'onClick' |'dir'>, BaseProps {
    /**
    * radio 颜色 样式
    */
    color?: Color;
    /**
     * radio 样式 是否使用红色填充
     */
    inverse?: boolean;
    /**
     * radio 指定当前是否选中
     */
    checked?: boolean;
    /**
     * radio 初始是否选中
     */
    defaultChecked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: RadioValue) => void;
    focusValue?: RadioValue;
}

export interface RadioState {
    checked: boolean;
    focused: boolean;
    hovered: boolean;
}

export interface MockRadio {
    props: {
        value: RadioValue
    }
}

export interface RadioContext<T extends RadioGroupProps> {
    radioGroup: {
        name: T['name'];
        selectedValue: T['selectedValue'];
        onChange: T['onChange'];
        size: T['size'];
        focusValue: T['value']
    }
}

export interface OptionalProps {
    checked?: boolean
}

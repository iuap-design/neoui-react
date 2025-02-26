import * as React from 'react';
import { BaseProps } from '../../wui-core/src/iCore';
import { DropDownProps } from '../../wui-dropdown/src/iDropdown';

export type CheckboxValueType = string | boolean | number

export interface CheckboxState {
    checked: boolean;
    focused: boolean;
    hovered: boolean;
}

export interface CheckboxGroupState {
    values?: CheckboxValueType[];
    maxCount: number
}

export type OnChange = {
    (checked: boolean, event: React.MouseEvent): void;
    (event: React.MouseEvent, checked: boolean): void;
};

export type CheckboxColor = '' | 'dark' | 'success' | 'info' | 'warning' | 'danger' | 'primary';

export interface CheckboxOption {
    value?: CheckboxValueType;
    label?: string;
    disabled?: boolean;
    onChange?: OnChange
}

export interface CheckboxOnChangeParams {
    checked: boolean,
    e: React.MouseEvent<HTMLElement>
}

export interface CheckboxProps extends BaseProps {
    colors?: CheckboxColor;
    disabled?: boolean;
    readOnly?: boolean;
    checked?: boolean;
    inverse?: boolean;
    onClick?: (e: React.ChangeEvent<HTMLElement>) => void;
    onDoubleClick?: (checked: boolean, e: React.MouseEvent<HTMLElement>) => void;
    onChange?: (event: React.MouseEvent | boolean, checked: React.MouseEvent | boolean) => void;
    antd?: boolean;
    defaultChecked?: boolean;
    value?: CheckboxValueType;
    indeterminate?: boolean;
    size?: string;
    title?: string;
    optionType?: 'button' | 'default';
}

export interface CheckboxGroupProps extends BaseProps {
    value?: CheckboxValueType[];
    onChange?: (values: CheckboxValueType[]) => void;
    disabled?: boolean;
    readOnly?: boolean;
    options: (CheckboxOption | string)[];
    defaultValue?: CheckboxValueType[];
    name?: string;
    maxCount?: boolean;
    optionType?: 'button' | 'default';
    size?: string;
    Component: keyof JSX.IntrinsicElements | React.ComponentClass<any>;
    dropDrownProps?: DropDownProps;
}

export interface CheckboxOtherGroups {
    name?: string
    size?: string
}
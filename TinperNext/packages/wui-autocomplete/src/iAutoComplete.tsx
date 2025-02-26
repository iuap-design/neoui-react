import * as React from 'react';
import { BaseProps } from '../../wui-core/src/iCore';
import type {
    SelectProps,
    SelectValue,
} from '../../wui-select/src/iSelect';

export interface AutoCompleteProps extends BaseProps {
    value?: string;
    show?: boolean;
    disabled?: boolean;
    options?: string[];
    onChange?: (value: string, activeItemIndex?: number) => void;
    onBlur?: (value: string) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onSelectOption?: (value: string) => void;
    placeholder?: string;
}

export interface AutoCompleteState {
    show: boolean;
    displayValue: string;
    activeItemIndex: number;
    options: string[];
    value: string;
    placeholder: string;
}

export interface AutoCompletePropsSub
extends Omit<SelectProps<SelectValue>, 'inputIcon' | 'loading' | 'mode' | 'optionLabelProp' | 'labelInValue' | 'options'> {
    options: string[] | object[];
    show?: boolean;
    onSelectOption?: (value: string) => void;
 }

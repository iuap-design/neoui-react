import * as React from 'react';
import { SelectProps as RcSelectProps, BaseSelectProps } from 'rc-select';
import { ResizeStartCallback, ResizeCallback } from 're-resizable';
import { OptionProps } from 'rc-select/lib/Option';
import { DefaultOptionType } from 'rc-select/lib/Select';
import { AlignType, BaseProps, BorderType, SizeType } from '../../wui-core/src/iCore';
import { AnyObject } from '../../wui-tree/src/iTree';

export type RawValue = string | number;

export { OptionProps, DefaultOptionType };

// export type OptionType = typeof Option;

// export interface OptionData {
//     label: React.ReactNode;
//     value?: string | number | null;
//     [name: string]: any;
// }

export interface LabeledValue {
  key?: React.Key;
  value?: RawValue;
  label?: React.ReactNode;
  [name: string]: any;
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined | null;

export interface OptionValue extends Omit<DefaultOptionType, 'value'> {
  value?: SelectValue
}

export declare type SelectHandler<VT = SelectValue, OT = OptionValue> = ((value: RawValue | LabeledValue, option: OptionValue) => void) | ((value: VT, option: OT) => void);

export interface InternalSelectProps<VT> extends Omit<RcSelectProps<VT>, 'mode' | 'listHeight'> {
  suffixIcon?: React.ReactNode;
  size?: SizeType | 'default'; // 兼容：default将被转为md，待废弃
  mode?: 'multiple' | 'tags' | 'combobox';
  bordered?: BorderType;
  align?: AlignType;
  requiredStyle?: boolean;
  fieldid?: string;
}

export interface AddEventLReturn {
  remove: () => void
}

export interface SelectProps<VT extends SelectValue = SelectValue>
  extends Omit<InternalSelectProps<VT>, 'inputIcon' | 'mode' | 'getInputElement' | 'backfill' | 'maxTagCount' | 'options' | 'data'> {
  title?: string,
  mode?: 'multiple' | 'tags' | 'combobox';
  onRenderRest?: (values: DisplayValueType[]) => void;
  onTagMouseDown?: (event: React.MouseEvent) => void;
  multiple?: boolean;
  supportWrite?: boolean;
  getSelectAttrs?: () => AnyObject;
  combobox?: boolean;
  data?: LabeledValue[];
  options?: LabeledValue[];
  tags?: boolean;
  locale?: string;
  itemIcon?: any;
  dropdownMenuStyle?: React.CSSProperties;
  dataIndex?: number;
  filterDropdown?: 'show' | 'hide';
  filterDropdownType?: string;
  filterDropdownIncludeKeys?: string[];
  onChange?: (value: VT, option: OptionValue | OptionValue[]) => void;
  onSelect?: SelectHandler<VT>;
  onDeselect?: SelectHandler<VT>;
  scrollToEnd?: () => void;
  onFilterChange?: () => void;
  onFilterClear?: (dataIndex?: string | number) => void;
  onKeyDown?: () => void; // itemIcon到onKeydown是其它组件可能传给Select的属性，或者是旧的api
  maxTagCount?: number | 'responsive' | 'auto';
  resizable?: boolean | 'horizontal' | 'vertical';
  onResizeStart?: ResizeStartCallback;
  onResize?: ResizeCallback;
  onResizeStop?: ResizeCallback;
  nid?: string;
  uitype?: string;
  getFilterOptions?: (filterOptions: any[], options: any, searchValue: string) => void;
  listHeight?: number | boolean;
  dir?: 'ltr' | 'rtl';
}

// 直接使用rc-select的接口BaseSelectRef替代
// export interface RefSelectProps {
//   focus: () => void;
//   blur: () => void;
//   scrollTo: () => void;
// }

export interface SelectOverflowItem extends BaseProps, DisplayValueType {
    onDelete: (val: RawValue, option: DisplayValueType) => void;
    tagRender: BaseSelectProps['tagRender'];
}

export interface DisplayValueType {
    key: React.Key;
    value: RawValue;
    label: string;
    disabled?: boolean;
    title?: string | number;
}
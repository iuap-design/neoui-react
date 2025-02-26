import * as React from 'react';
import type {BaseHtmlProps} from '../../wui-core/src/iCore';

export type SwitchEvent = React.MouseEvent | React.KeyboardEvent;
export type SwitchSize = 'small' | 'default' | 'sm' | 'lg' | string;
export type SwitchColors = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'dark' | 'default';
export type SwitchChangeEventHandler = (checked: boolean, event?: SwitchEvent) => void;
export type SwitchClickEventHandler = SwitchChangeEventHandler;

export interface SwitchProps extends Omit<BaseHtmlProps<HTMLButtonElement>, 'size' | 'defaultValue' | 'onChange' | 'onClick' | 'type'> {
  dir?: "rtl" |"ltr";
  // clsPrefix?: string;
  colors?: SwitchColors;
  disabled?: boolean;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  onChange?: SwitchChangeEventHandler;
  onChangeHandler?: SwitchChangeEventHandler;
  onClick?: SwitchClickEventHandler;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  enterKeyDown?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
  defaultValue?: boolean;
  defaultChecked?: boolean;
  checked?: boolean;
  size?: SwitchSize;
  // fieldid?: string;
  // className?: string;
  id?: string;
}

export interface SwitchState {
  checked?: boolean;
}
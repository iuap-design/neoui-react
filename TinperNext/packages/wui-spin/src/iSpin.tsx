import * as React from 'react';
import type {BaseHtmlProps} from '../../wui-core/src/iCore';

export type SpinType = 'default' | 'rotate' | 'line' | 'custom' | 'antd' | 'cricle';
export type SpinColor = 'primary' | 'success' | 'warning' | '';
export type SpinSize = 'small' | 'default' | 'large' | 'sm' | 'lg';
export type SpinIndicator = React.ReactElement<HTMLElement>;
export type SpinContainerFunc = (triggerNode?: HTMLElement) => HTMLElement | React.ReactInstance| Element | React.Component | null;
export type SpinContainer = SpinContainerFunc | React.ReactInstance | React.Component | HTMLElement | null;

export interface SpinProps extends Omit<BaseHtmlProps<HTMLDivElement>, 'size'> {
  prefixCls?: string;
  // className?: string;
  locale?: string;
  // clsPrefix?: string;
  spinning?: boolean;
  show?: boolean;
  antd?: boolean;
  container?: SpinContainer;
  getPopupContainer?: SpinContainer;
  showBackDrop?: boolean;
  fullScreen?: boolean;
  loadingType?: SpinType;
  // style?: React.CSSProperties;
  size?: SpinSize;
  tip?: React.ReactNode;
  delay?: number;
  wrapperClassName?: string;
  indicator?: SpinIndicator;
  // children?: React.ReactNode;
  backDropClassName?: string;
  clsLoadBack?: string;
  color?: SpinColor;
}

export interface SpinState {
  spinning?: boolean;
  hasDIdMount?: boolean;
}
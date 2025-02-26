import * as React from 'react';
import {TooltipPlacement} from '../../wui-tooltip/src/iTooltip';
import type {BaseProps} from '../../wui-core/src/iCore';

export type OnStartMove = (e: React.MouseEvent | React.TouchEvent, valueIndex: number) => void;
export type AriaValueFormat = (value: number) => string;

export interface HandleProps {
    className?: string;
    fieldid?: string | number;
    prefixCls?: string;
    vertical?: boolean;
    offset?: number;
    value?: number;
    dragging?: boolean;
    disabled?: boolean;
    min?: number;
    max?: number;
    reverse?: boolean;
    index?: number;
    tabIndex?: number;
    style?: React.CSSProperties;
    dir?: 'ltr'|'rtl'|undefined
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }

export interface MarkObj {
    style?: React.CSSProperties;
    label?: React.ReactNode;
  }

export interface InternalMarkObj extends MarkObj {
    value: number;
  }

export interface StepsProps {
    prefixCls?: string;
    marks: InternalMarkObj[];
    dots?: boolean;
    dotStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
    activeDotStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
    reverse?: boolean;
    included?: boolean;
    vertical: boolean;
    fieldid?: string | number;
    max: number;
    min: number;
    step: number;
    upperBound: number;
    lowerBound: number;
    dir?:'ltr'|'rtl'|undefined;
  }

export interface MarksProps {
    className?: string;
    prefixCls?: string;
    marks: InternalMarkObj[];
    reverse?: boolean;
    included?: boolean;
    vertical: boolean;
    fieldid?: string | number;
    max: number;
    min: number;
    upperBound: number;
    lowerBound: number;
    dir?: "ltr"|"rtl"|undefined;
  }

export interface TrackProps {
    className: string;
    style?: React.CSSProperties | React.CSSProperties[];
    vertical?: boolean;
    included?: boolean;
    offset?: number;
    length?: number;
    reverse?: boolean;
    fieldid?: string | number;
    dir?: "ltr"|"rtl"|undefined;
  }

export interface GenericSliderProps extends Omit<BaseProps, 'fieldid'> {
    // 选填项
    prefixCls?: string;
    range?: boolean;
    trackStyle?: React.CSSProperties | React.CSSProperties[];
    handleStyle?: React.CSSProperties | React.CSSProperties[];
    autoFocus?: boolean;
    onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
    maximumTrackStyle?: React.CSSProperties;
    railStyle?: React.CSSProperties;
    dotStyle?: React.CSSProperties;
    activeDotStyle?: React.CSSProperties;
    fieldid?: string | number;
    // style?: React.CSSProperties;

    // 必填项
    className: string;
    mark: Record<number, React.ReactNode | { style?: React.CSSProperties; label?: string }>;
    marks: any;
    dots: boolean;
    count: number;
    step: number | null;
    pushable: any;
    vertical: boolean;
    included: boolean;
    disabled: boolean;
    reverse: boolean;
    allowClear: boolean;
    min: number;
    max: number;
    dir?: 'rtl'|'ltr'|undefined;
  }
export interface GenericSliderState {
    value?: any;
    zoom?: number;
  }

export interface SliderProps extends GenericSliderProps {
    defaultValue?: number;
    onChange?: (value: number) => void;
    onBeforeChange?: (value: number) => void;
    onAfterChange?: (value: number) => void;
    minimumTrackStyle?: React.CSSProperties;
    trackStyle?: React.CSSProperties | React.CSSProperties[];
    handleStyle?: React.CSSProperties | React.CSSProperties[];
    tabIndex?: number;
    startPoint?: number;

    // 必填项
    value: number;
    handle: (props: {
      className: string;
      fieldid?: string | number;
      prefixCls?: string;
      vertical?: boolean;
      offset?: number;
      value?: number;
      dragging?: boolean;
      disabled?: boolean;
      min?: number;
      max?: number;
      reverse?: boolean;
      index?: number;
      tabIndex?: number;
      style?: React.CSSProperties;
      dir?: "ltr"|"rtl"|undefined;
      ref?: React.Ref<any>;
    }) => React.ReactElement;
  }
export interface SliderState extends GenericSliderState {
    value: number;
    dragging: boolean;
  }

export interface RangeProps extends GenericSliderProps {
    allowCross?: boolean;
    defaultValue?: number[];
    onChange?: (value: number[]) => void;
    onBeforeChange?: (value: number[]) => void;
    onAfterChange?: (value: number[]) => void;
    threshold?: number;
    tabIndex?: number | Array<number>;

    // 必填项
    trackStyle: React.CSSProperties[];
    handleStyle: React.CSSProperties[];
    handle: SliderProps['handle'];
    value: number[];

  }

export interface RangeState extends GenericSliderState {
    bounds: number[];
    handle?: number | null;
    recent?: number;
  }

export interface FieldidProps {
    id?: string;
    fieldid?: string;
}
export interface FieldidClearProps {
    rail?: string;
    clear?: string;
}

export interface GenericSliderClass<Props, State> extends React.Component<Props, State> {
  onStart: (position: number) => void;

  onEnd: (force?: boolean) => void;

  onMove: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    position: number,
  ) => void;

  onKeyboard: (e: React.KeyboardEvent<HTMLDivElement>) => void;

  onChange: (state: any) => void;

  trimAlignValue: (v: number, nextProps?: Partial<Props>) => number;

  getUpperBound: () => number;

  getLowerBound: () => number;

  clearSliderValue?: () => void;
}
export interface GenericSlider<Props, State>
  extends Pick<
    React.ComponentClass<Props, State>,
    | 'displayName'
    | 'defaultProps'
    | 'propTypes'
    | 'contextType'
    | 'contextTypes'
    | 'childContextTypes'
  > {
  new (props: Props, context?: any): GenericSliderClass<Props, State>;
}

export interface ComponentWrapperProps {
    tipFormatter: (value: number) => React.ReactNode;
    tipProps: {
      prefixCls?: string;
      overlay?: string;
      placement?: string;
      visible?: boolean;
    };
    getTooltipContainer?: () => HTMLElement;
    getTooltipPopupContainer?: (dom: HTMLElement) => HTMLElement;
    tooltipPlacement?: TooltipPlacement;
    tooltipVisible?: boolean;
    handleStyle: React.CSSProperties[];
    tooltip?: SliderTooltipProps;
  }

export interface SliderTooltipProps {
    open?: boolean;
    placement?: TooltipPlacement;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    formatter?: (value: number) => React.ReactNode;
  }
export interface ComponentWrapperState {
    visibles: Record<number, boolean>;
    index?: any;
  }

export interface CommonSliderProps extends GenericSliderProps {
    value: any;
    trackStyle: any;
    handleStyle: any;
    handle: SliderProps['handle'];
}

export interface AddEventListenerType {
  remove: () => void;
}

export type SliderSingProps = Partial<SliderProps & CommonSliderProps & ComponentWrapperProps | RangeProps>
import * as React from 'react';
import {ReactElement, ReactNode} from "react";
import type {BaseHtmlProps} from '../../wui-core/src/iCore';

export type StepsSize = 'default' | 'small';
export type StepsIcons = {
    finish?: ReactNode,
    error?: ReactNode
};
export type StepsProgressDot = boolean | ((ele?: ReactNode, obj?: object) => ReactElement);
export type StepsType = 'default' | 'number' | 'dot' | 'arrow';
export type ChangePosition = 'left' | 'center' | 'right';

export interface StepsProps extends Omit<BaseHtmlProps<HTMLDivElement>, 'size' | 'onChange'> {
    // clsPrefix?: string;
    iconPrefix?: string;
    // className?: string;
    direction?: string;
    labelPlacement?: string;
    status?: string;
    size?: StepsSize;
    // children?: React.ReactNode;
    // style?: React.CSSProperties;
    progressDot?: StepsProgressDot;
    initial?: number;
    current?: number;
    icons?: StepsIcons;
    disabled?: boolean;
    type?: StepsType;
    onChange?: (index: number, position: ChangePosition) => void;
    more?: boolean;
    locale?: string;
    // fieldid?: string;
    id?: string;
    items?: Array<StepProps>;
    percent?: number;
}

export interface StepsState {
    flexSupported: boolean;
    lastStepOffsetWidth: number;
    menuFrontArr: ReactNode[];
    menuAfterArr: ReactNode[];
    activeNum: number;
}

export type StepStatus = 'finish' | 'process' | 'error' | 'wait';

export interface StepProps extends Omit<BaseHtmlProps<HTMLDivElement>, 'title' | 'size'> {
    stepIndex?: number;
    direction?: string;
    onStepClick?: (i?: number) => void;
    onClick?: (e?: React.MouseEvent) => void;
    stepNumber?: number | React.ReactNode;
    adjustMarginRight?: number;
    itemWidth?: number;
    // clsPrefix?: string;
    iconPrefix?: string;
    status?: StepStatus;
    icon?: React.ReactNode | string;
    tailContent?: React.ReactNode | string;
    // style?: React.CSSProperties;
    title?: ReactNode;
    // className?: string;
    out?: boolean;
    icons?: StepsIcons;
    active?: boolean;
    description?: ReactNode;
    progressDot?: StepsProgressDot;
    disabled?: boolean;
    type?: StepsType;
    more?: boolean;
    stepFieldId?: string;
    // fieldid?: string;
    id?: string;
    subTitle?: ReactNode;
    percent?: number;
    size?: StepsSize;
}
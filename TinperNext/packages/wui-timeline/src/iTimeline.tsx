import {ReactElement, ReactNode} from "react";
import type {BaseHtmlProps} from '../../wui-core/src/iCore';

export type TimelineColor = 'primary' | 'success' | 'info' | 'danger' | 'warning' | 'green' | string;
export type TimelineMode = 'left' | 'right' | 'alternate';
export type TimelineGroupSize = 'small' | 'middle' | 'large' | number;

export interface TimelineProps extends BaseHtmlProps<HTMLUListElement> {
    // clsPrefix?: string;
    // className?: string;
    // children?: React.ReactNode;
    dot?: ReactElement;
    color?: TimelineColor;
    pending?: boolean | ReactElement;
    mode?: TimelineMode;
    reverse?: boolean;
    pendingDot?: ReactNode;
    labelWidth?: number | [number, number];
    // fieldid?: string;
}

export interface TimelineItemProps extends Omit<TimelineProps, 'label'> {
    timelineFieldId?: string;
    label?: ReactNode;
}

export interface TimelineItemGroupProps extends Omit<TimelineItemProps, 'size'> {
    size?: TimelineGroupSize;
}
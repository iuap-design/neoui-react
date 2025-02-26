import { ComponentClass, CSSProperties, ReactElement, ReactNode } from "react";
import { BaseProps } from "../../wui-core/src/iCore";

type ProgressTypes = 'line' |'circle' |'dashboard';
type Color = "success" | "warning" | "danger" | "info" | "primary" | "dark";
export type ProgressStatus = 'normal' |'exception' |'active' |'success';
type StrokeLinecap = 'round' | 'square';
type GapPosition = 'top' | 'bottom' | 'left' | 'right' ;
export interface ProgressProps extends BaseProps {
    status?: ProgressStatus;
    width?: number;
    strokeWidth?: number;
    strokeColor?: string | {[key:string]: string} | string[];
    format?: (a: number, b: number) => (string | HTMLElement);
    successPercent?: number;
    success?: {
        percent?: number;
        strokeColor?: string;
    };
    steps?: number;
    gapPosition?: GapPosition;
    strokeLinecap: StrokeLinecap;
    trailColor: string;
    gapDegree: number;
    size: string;
    type: ProgressTypes;
    showInfo: boolean;
    percent: number;
    dir?: 'ltr' | 'rtl';
    tipsContent?: any;

    // fieldid: string;
    // clsPrefix: string;
    // className: string;
}

export interface ProgressLineProps {
    children?: ReactNode;
    percent?: number;
    successPercent?: number;
    success?: {
        percent?: number;
        strokeColor?: string;
    };
    strokeWidth?: number;
    size?: string;
    strokeColor?: string | {[key:string]: string};
    strokeLinecap?: StrokeLinecap;
    fieldid?: string;
    clsPrefix?: string;

}
export interface ProgressCircleProps extends Omit<ProgressProps, 'status' | 'showInfo' | 'format' | 'size' | 'steps' | 'className'> {
    progressStatus?: ProgressStatus;
    strokeColor?: string | {[key:string]: string};
}
// export interface ProgressBarProps extends Omit<ProgressProps, 'status' | 'showInfo' | 'format' | 'size' | 'steps' | 'className'> {
export interface ProgressBarProps extends BaseProps {
        /**
         *  最小数值
         */
        min: number;
        /**
         *  有效数值
         */
        now?: number;
        /**
         *  最大数值
         */
        max: number;
        /**
         *  文字描述标签
         */
        label?: ReactElement | string;
        /**
         *  文字描述标签显示
         */
        srOnly: boolean;
        /**
         *  条纹样式
         */
        striped: boolean;
        /**
         *  激活状态
         */
        active: boolean;
        /**
         *  大小
         */
        size?: 'xs' | 'sm';
        /**
         *  labelPosition
         */
        labelPosition: 'right' | 'left' | 'center';
        /**
         *  子组件 必须是ProgressBar
         */
        children?: ReactNode;
        /**
         *  子组件 必须是ProgressBar
         */
        style?: CSSProperties;
        isChild: boolean;

        /**
         * @private
         */
        colors?: Color;
        // className: string;
        // clsPrefix: string;
}

export interface ProgressStepProps extends BaseProps {
    size?: string;
    steps?: number;
    percent?: number;
    strokeWidth?: number;
    strokeColor?: string | string[];
    trailColor?: string;
    tipsContent?: any;
    // fieldid: string;
    // clsPrefix: string;
}
export type PartialProgressBarProps = ComponentClass<Partial<ProgressBarProps>> & {
    start: ()=> void;
    set: (v: any)=> void;
    inc: ()=> void;
    done: ()=> void;
}
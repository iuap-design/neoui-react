import { CSSProperties, KeyboardEvent, Key } from "react";
import { Content, NewInstanceCbArg, NoticeProps } from "../../wui-notification/src/iNotification";

export type PositionType = "top" | "bottom" | "topRight" | "bottomRight" | "topLeft" | "bottomLeft";
export interface MessageProps extends NoticeProps {
    style?: CSSProperties;
    innerStyle?: CSSProperties;
    wrapperStyle?: CSSProperties;
    wrapperClassName?: string;
    onEscapeKeyUp?: (e?: KeyboardEvent) => void;
    showIcon?: boolean;
    icon?: string;
    position?: PositionType;
    keyboard?: boolean;
    message?: Content;
    maxCount?: number;
    containerKey?: string;
}

export interface ThenableArgument {
    (_: any): any;
}
export interface ApiType {
    create: (props: MessageProps | string) => void;
    config: (options: MessageProps & {top: number; defaultBottom: number; bottom: number; width: number}) => void;
    destroy: (props?: Key) => void;
    success?: (props: MessageProps | string) => void;
    info?: (props: MessageProps | string) => void;
    warn?: (props: MessageProps | string) => void;
    warning?: (props: MessageProps | string) => void;
    error?: (props: MessageProps | string) => void;
    loading?: (props: MessageProps) => void;
    infolight?: (props: MessageProps) => void;
    successlight?: (props: MessageProps) => void;
    dangerlight?: (props: MessageProps) => void;
    warninglight?: (props: MessageProps) => void;
}
export type InstanceObject = NewInstanceCbArg & {container?: Element};
export type InstancesObject = Partial<{
    [key: string]: InstanceObject | null | undefined;}>;

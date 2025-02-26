import { CSSProperties, ReactElement } from "react";
import { BaseProps, Key } from "../../wui-core/src/iCore";

export interface AnimateProps extends BaseProps {
    transitionName?: string | Record<string, any>;
    showProp?: string;
    className?: string;
    style?: CSSProperties;
    children?: any;
    exclusive?: boolean;
    component: keyof JSX.IntrinsicElements;
    animation: Record<string, any>;
    transitionEnter: boolean;
    transitionAppear: boolean;
    transitionLeave: boolean;
    onEnd: (key: ReactElement | Key, t:boolean) => void;
    onEnter: (key: ReactElement | Key) => void;
    onLeave: (key: ReactElement | Key) => void;
    onAppear: (key: ReactElement | Key) => void;
}
export interface AnimateChildProps {
    children?: any;
    key?: Key;
    transitionName?: string | Record<string, any>;
    animation?: any;
    transitionEnter?: boolean;
    transitionAppear?: boolean;
    transitionLeave?: boolean;
}

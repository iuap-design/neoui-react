import * as React from 'react';
import type { BaseProps } from '../../wui-core/src/iCore';

export type ExpandIconPosition = 'left' | 'right';
export type CollapsibleString = 'icon' | 'header' | 'disabled' | string;
export interface CollapsePublicProps extends BaseProps {
    // 是否是手风琴效果
    accordion?: boolean;
    // 选中函数
    onChange?: (activeKey: string) => void;
    bordered?: boolean;
    ghost?: boolean;
    expandIconPosition?: ExpandIconPosition;
    collapsible?: CollapsibleString | boolean;
    expandIcon?: any;
    destroyInactivePanel?: boolean;
    bodyClassName?: string;
    // fieldid?: string;
    // clsPrefix?: string;
}
export interface CollapseProps extends CollapsePublicProps {
    // 激活的项
    activeKey?: string | (string)[];
    // 默认的激活的项
    defaultActiveKey?: string | (string)[];
    role?: string;
    // style?: React.CSSProperties;
    // className?: string;
    onSelect?: (activeKey: string | undefined, e: React.MouseEvent<HTMLElement>) => void;
    type?: 'list' | 'card' | 'lineFirstLevel' | 'lineSecondLevel';
}

export interface PanelProps extends CollapsePublicProps {
    // 头部组件
    header?: React.ReactNode;
    headerStyle?: React.CSSProperties;
    id?: string | undefined;
    headerContent?: boolean;
    // footer组件
    footer?: React.ReactNode;
    footerStyle?: React.CSSProperties;
    // 默认是否打开
    defaultExpanded?: boolean;
    // 是否打开
    expanded?: boolean;
    // 每个panel的标记
    eventKey?: string;
    headerRole?: string;
    panelRole?: string;
    // 颜色
    colors?: string;
    onSelect?: (activeKey: string | undefined, expanded: boolean, e: React.MouseEvent<HTMLElement>) => void;
    // From Collapse.的扩展动画
    onEnter?: () => void;
    onEntering?: () => void;
    onEntered?: () => void;
    onExit?: () => void;
    onExiting?: () => void;
    onExited?: () => void;
    // 是否可复制内容
    copyable?: boolean;
    showArrow?: boolean;
    extra?: React.ReactNode;
    forceRender?: boolean;
    parentFlag?: boolean;
    // className?: string;
    defaultActiveKey?: string | (string)[];
    parentActiveKey?: boolean;
    type?: 'list' | 'card' | 'lineFirstLevel' | 'lineSecondLevel';
}

export interface EntranceProps extends Omit<PanelProps, 'onSelect' | 'onChange'> {
    onSelect?: (activeKey: string, e: React.MouseEvent<HTMLElement>) => void;
    onChange?: (activeKey: string, e: React.MouseEvent<HTMLElement>) => void;
    activeKey?: string | (string)[];
}

export interface CollapseState {
    activeKey: string | (string)[] | undefined;
}

export interface PanelState {
    expanded: boolean | undefined;
}
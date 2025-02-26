/*
 * @Author: Mr.mjc
 * @Date: 2022-06-28 20:41:24
 * @LastEditors: Mr.mjc
 * @LastEditTime: 2022-07-28 19:15:16
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/iExpandIcon.tsx
 */
import React from 'react'
import {
    DefaultRecordType,
    RenderExpandIcon
} from './interface';
export interface ExpandIconProps<T = DefaultRecordType> {
    fixedIndex: number;
    record?: T;
    expanded?: boolean;
    onExpand?: (expanded?: boolean, record?: T, fixedIndex?: number, event?: React.MouseEvent<HTMLElement>) => void;
    clsPrefix?: string;
    expandable?: boolean;
    index?: number;
    isShowExpandIcon?: boolean;
    expandedIcon?: JSX.Element;
    collapsedIcon?: React.ReactNode;
    expandIcon?: RenderExpandIcon<T>;
    needIndentSpaced?: boolean;
    fieldid?: string;
    oldMode?: boolean;
}
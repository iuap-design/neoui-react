/*
 * @Author: Mr.mjc
 * @Date: 2022-06-20 17:52:03
 * @LastEditors: MJC
 * @LastEditTime: 2024-05-20 14:15:13
 * @Description: 常量声明文件
 * @FilePath: /next-ui/packages/wui-table/src/constant.tsx
 */
import React from 'react';
import Icon from '../../wui-icon/src';

export const DRAGHANDLE = 'dragHandle';
export const MULTISELECT = 'multiselect';
export const SINGLESELECT = 'singleselect';
export const ROWNUM = 'rownum';

export const DEFAULT_SELECT_WIDTH = 40;
export const DEFAULT_DRAG_WIDTH = 40;
export const DEFAULT_ROW_NUM_WIDTH = 50;
export const DEFAULT_MIN_COLUMN_WIDTH = 90;

export const columnType = {
    DEFAULTTYPE: 'data',
    ROWDRAG: 'rowdrag',
    MULTISELECT: 'multiselect',
    SINGLESELECT: 'singleselect',
    ROWNUM: 'rownum'
}

export const defaultEmptyColumn = {
    title: "",
    key: '_inner_empty',
    dataIndex: '_inner_empty',
    width: 54,
    // minWidth: 0,
    singleFilter: false, // 不可过滤
    singleFind: false, // 不可查找
    dragborder: false, // 不可拖拽

}

export const defaultDragHandleColumn = {
    className: "drag-handle-column",
    title: "",
    key: DRAGHANDLE,
    dataIndex: DRAGHANDLE,
    width: DEFAULT_DRAG_WIDTH,
    // minWidth: DEFAULT_DRAG_WIDTH, // 限制拖拽列拖拽最小宽度
    draggable: true,
    columnType: columnType.ROWDRAG,
    singleFilter: false, // 不可过滤
    singleFind: false, // 不可查找
    dragborder: false, // 不可拖拽
    render: () => {
        return <Icon type="uf-navmenu"/>
    }
}

export const defaultMulSelect = {
    key: 'checkbox',
    dataIndex: 'checkbox',
    columnType: columnType.MULTISELECT,
}

export const defaultSingleSelect = {
    key: 'radio',
    dataIndex: 'radio',
    columnType: columnType.SINGLESELECT,
}

export const defaultRowNum = {
    key: '_index',
    dataIndex: '_index',
    singleFilter: false, // 不可过滤
    singleFind: false, // 不可查找
    columnType: columnType.ROWNUM,
}


export const preCol = (width: number) => ({
    className: "pre",
    title: "",
    key: '_pre',
    dataIndex: '_pre',
    width,
})

export const sufCol = (width: number) => ({
    className: "suf",
    title: "",
    key: '_suf',
    dataIndex: '_suf',
    width,
})


export const SELECTION_ALL = 'selectAll';
export const SELECTION_INVERT = 'SELECTION_INVERT';
export const SELECTION_NONE = 'SELECTION_NONE';
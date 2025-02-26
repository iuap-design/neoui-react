/* eslint-disable react/display-name */
import React, { useMemo, forwardRef } from 'react';
import {Table, TableProps } from '@tinper/next-ui';

const {
    bigData,
    dragColumn,
    sum,
    singleFind,
    sort,
    singleFilter,
    filterColumn
} = Table;

interface MergeTableProps extends TableProps {
    fillSpace: any;
    isBigData?: boolean,
    isSingleFind?: boolean,
    isSum?: boolean,
    isDragColumn?: boolean,
    isFilterColumn?: boolean,
    isSort?: boolean,
    isSingleFilter?: boolean
}

// 整合高阶组件
const mergeTable: any = forwardRef((props: MergeTableProps, ref: any) => {
    const {
        isBigData,
        isSingleFind,
        isSum,
        isDragColumn,
        isFilterColumn,
        isSort,
        isSingleFilter

    } = props;

    const View = useMemo(() => {
        let showView: any = Table;
        if (isBigData) {
            showView = bigData(showView)
        }
        if (isSingleFind) {
            showView = singleFind(showView)
        }
        if (isSingleFilter) {
            showView = singleFilter(showView)
        }
        if (isSort) {
            showView = sort(showView)
        }
        if (isFilterColumn) {
            showView = filterColumn(showView)
        }
        if (isSum) {
            showView = sum(showView)
        }
        if (isDragColumn) {
            showView = dragColumn(showView)
        }
        return showView
    }, [isBigData, isSingleFind, isSum, isDragColumn, isFilterColumn, isSort, isSingleFilter])
    // 如果外部未声明，则默认自动开启填充。
    const autoFillSpace = (typeof props.fillSpace === "undefined") ? true : props.fillSpace;

    return (
        <View
            {...props}
            fillSpace={autoFillSpace}
            ref={ref}
            draggable
            dragborder
        ></View>
    )
})
mergeTable.DefaultProps = {
    fillSpace: true,
    isBigData: true,
    isSingleFind: true,
    isSum: false,
    isDragColumn: true,

    isFilterColumn: false,
    isSort: false,
    isSingleFilter: false
}

export default mergeTable

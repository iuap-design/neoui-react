import React, { useMemo, forwardRef } from 'react';
import Table from '../IsSticky';
import bigData from './bigData';
import dragColumn from './dragColumn';
import sum from './sum';
import singleFind from './singleFind';
import sort from './sort';
import singleFilter from './singleFilter';
import filterColumn from './filterColumn';
import { TableProps } from '../iTable';

interface MergeTableProps extends TableProps {
    isBigData?: boolean,
    isSingleFind?: boolean,
    isSum?: boolean,
    isDragColumn?: boolean,
    isFilterColumn?: boolean,
    isSort?: boolean,
    isSingleFilter?: boolean
}

// 整合高阶组件
const mergeTable: React.FC<Partial<MergeTableProps>> = forwardRef((props: MergeTableProps, ref) => {

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

    return (
        <View
            {...props}
            ref={ref}
        ></View>
    )
})

export default mergeTable
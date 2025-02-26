/*
 * @Author: Mr.mjc
 * @Date: 2022-08-17 16:43:47
 * @LastEditors: MJC
 * @LastEditTime: 2024-12-31 15:09:55
 * @Description: 区分表格模式出口文件
 * @FilePath: /next-ui/packages/wui-table/src/IsSticky.tsx
 */
import React, { useMemo, useContext } from 'react';
import objectPath from 'object-path';
import Table from './Table';
import StickyTable from './stickyTable/StickyTable';
import { TableProps, DefaultRecordType } from './iTable';
import { sticky } from './lib/util';
import {getLangInfo} from "../../wui-locale/src/tool";
import {ConfigContext} from '../../wui-provider/src/context';
import i18n from "./lib/i18n";
import { DicimalFormater, convertListToTree } from './lib/utils';

const renderTable: React.FC<Partial<TableProps>> = React.forwardRef((props: TableProps, ref) => {
    const context = useContext(ConfigContext)
    // 大数据模式下会传过来截取完的data,拿不到完整的data,影响多选单选的selectKeys全选取值会少
    let {
        scrollMode,
        data: showData = [], // 大数据下分割后的数据
        showSum = [],
        sumPrecision = 2,
        columns: propsColumns,
        children,
        locale,
        expandable, // 兼容新版的antd的API，此层处理兼容
        expandIconCellWidth,
        defaultExpandAllRows,
        defaultExpandedRowKeys,
        expandedRowClassName,
        expandedRowKeys,
        expandedRowRender,
        expandIcon,
        expandRowByClick,
        indentSize,
        onExpand,
        onExpandedRowsChange,
        expandIconAsCell,
        haveExpandIcon,
        showExpandIcon,
        expandedIcon,
        collapsedIcon,
        showHeaderExpandIcon,
        onExpandAll,
        expandIconColumnIndex,
        childrenColumnName = 'children',
        lazyLoad,
        dir: direction,
    } = props;

    let _scrollMode = useMemo(() => {
        if (scrollMode) {
            return scrollMode;
        } else {
            let hasSticky = sticky();
            if (!hasSticky) { // 不支持
                return 'table'
            } else {
                return 'sticky'
            }
        }
    }, [scrollMode])

    const expandableProps = useMemo(() => {
        return {
            childrenColumnName: expandable?.childrenColumnName || childrenColumnName,
            expandableColumnTitle: expandable?.columnTitle,
            expandIconCellWidth: expandable?.columnWidth || expandIconCellWidth,
            defaultExpandAllRows: expandable?.defaultExpandAllRows || defaultExpandAllRows,
            defaultExpandedRowKeys: expandable?.defaultExpandedRowKeys || defaultExpandedRowKeys,
            expandedRowClassName: expandable?.expandedRowClassName || expandedRowClassName,
            expandedRowKeys: expandable?.expandedRowKeys || expandedRowKeys,
            expandedRowRender: expandable?.expandedRowRender || expandedRowRender,
            expandIcon: expandable?.expandIcon || expandIcon,
            expandRowByClick: expandable?.expandRowByClick || expandRowByClick,
            expandIconFixed: expandable?.fixed,
            indentSize: expandable?.indentSize || indentSize,
            showExpandColumn: expandable?.showExpandColumn,
            onExpand: expandable?.onExpand || onExpand,
            onExpandedRowsChange: expandable?.onExpandedRowsChange || onExpandedRowsChange,
            expandIconAsCell: expandable?.expandIconAsCell || expandIconAsCell,
            expandIconColumnIndex: expandable?.expandIconColumnIndex || expandIconColumnIndex,
            haveExpandIcon: expandable?.haveExpandIcon || haveExpandIcon,
            showExpandIcon: expandable?.showExpandIcon || showExpandIcon,
            expandedIcon: expandable?.expandedIcon || expandedIcon,
            collapsedIcon: expandable?.collapsedIcon || collapsedIcon,
            showHeaderExpandIcon: expandable?.showHeaderExpandIcon || showHeaderExpandIcon,
            onExpandAll: expandable?.onExpandAll || onExpandAll
        }
    },
    [
        expandable,
        childrenColumnName,
        expandIconCellWidth,
        defaultExpandAllRows,
        defaultExpandedRowKeys,
        expandedRowClassName,
        expandedRowKeys,
        expandedRowRender,
        expandIcon,
        expandRowByClick,
        indentSize,
        onExpand,
        onExpandedRowsChange,
        expandIconAsCell,
        expandIconColumnIndex,
        haveExpandIcon,
        showExpandIcon,
        expandedIcon,
        collapsedIcon,
        showHeaderExpandIcon,
        onExpandAll
    ])


    // 合计行高阶组件逻辑下沉，避免表格内部前端分页计算问题
    const addSumData = useMemo(() => {
        if (!(showSum || []).length) {
            return {sumdata: [], totalData: []};
        }
        let realColumns = propsColumns;
        let sumdata = {}, totalData = {}, newColumns: any = [];
        let istree = (realColumns || []).some(col => col.children && Array.isArray(col.children) && col.children.length); // 是否是tree结构
        let getNodeItem = (array: DefaultRecordType[], newArray: DefaultRecordType[]):DefaultRecordType[] => {
		    array.forEach((da:DefaultRecordType) => {
		        if (da.children && Array.isArray(da.children) && da.children.length) {
		            getNodeItem(da.children, newArray);
		        } else {
		            newArray.push(da);
		        }
		    });
            return newArray
        }
        if (istree) {
            newColumns = getNodeItem(realColumns, newColumns)
        } else {
            newColumns = realColumns;
        }
        (newColumns || []).forEach((column: DefaultRecordType, _index: number) => {
            const cloumnsPrecision = 'sumPrecision' in column ? column.sumPrecision : sumPrecision == 0 ? 0 : sumPrecision || 2;
            if (Array.isArray(showSum) && showSum.includes('subtotal')) {
                sumdata[column.dataIndex] = "";
                // eslint-disable-next-line dot-notation
                sumdata['key'] = `table_sum`; // 没有key会导致hover状态与固定列不同步
                if (column.sumCol) {
                    let count = 0;
                    showData.forEach(da => {
                        let colDataIndex = column.key || column.dataIndex
                        let _num = parseFloat(objectPath.has(da, colDataIndex) ? objectPath.get(da, colDataIndex) : objectPath.get(da, [colDataIndex]))
                        // 排查字段值为NAN情况
                        if (!isNaN(_num)) {
                            count += _num;
                        }
                    })
                    let sum = DicimalFormater(count, cloumnsPrecision);
                    if (column.sumThousandth) {
                        let source = String(sum || 0).split(".");// 按小数点分成2部分
                        source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");// 只将整数部分进行都好分割
                        sum = source.join(".");// 再将小数部分合并进来
                    }
                    sumdata[column.dataIndex] = sum;
                    if (column.sumRender && typeof column.sumRender == 'function') {
                        sumdata[column.dataIndex] = column.sumRender(sum)
                    }
                }
            }
            if (Array.isArray(showSum) && showSum.includes('total')) {
                totalData[column.dataIndex] = "";
                // eslint-disable-next-line dot-notation
                totalData['key'] = `table_total_sum`; // 没有key会导致hover状态与固定列不同步
                const { totalRender } = column;
                if (totalRender || totalRender == '0') {
                    if (typeof totalRender === 'function') {
                        totalData[column.dataIndex] = totalRender(column, showData)
                    } else {
                        totalData[column.dataIndex] = column.totalRender
                    }
                }
            }
        })
        return {sumdata, totalData}
    }, [showData, propsColumns, children, sumPrecision, showSum])

    // 处理大数据
    const handleData = useMemo(() => {
        let dataSource: any[] = [];
        if (!lazyLoad) { // 未开启大数据
            return showData
        }
        const {TreeType, startIndex, endIndex, flatTreeKeysMap} = lazyLoad;
        if (TreeType) {
            let sliceTreeList = showData.slice(startIndex, endIndex + 1);
            let attr = {id: 'key', parendId: '_innerParentKey', rootId: null, _isLeaf: '_isLeaf'};
            dataSource = convertListToTree(sliceTreeList, attr, flatTreeKeysMap)
        } else {
            dataSource = showData.slice(startIndex, endIndex + 1);
        }
        return dataSource;
    }, [lazyLoad, showData])

    // 合计及后续添加column后的处理
    const realData = useMemo(() => {
        if (Array.isArray(showSum) && showSum.length && addSumData && handleData.length) {
            const {sumdata = {}, totalData = {}} = addSumData || {};
            let realColumns = propsColumns;
            let firstColumn = realColumns[0];
            let propsLocale = locale || context.locale
		    let _locale = getLangInfo(propsLocale, i18n, 'table');
            let addData = [...handleData];
            // && (!firstColumn.sumRender || typeof firstColumn.sumRender !== 'function')
            if (firstColumn.dataIndex || firstColumn.dataIndex == '0') {
                if (Object.keys(sumdata).length) {
                    if (!firstColumn.sumRender || typeof firstColumn.sumRender !== 'function') {
                        sumdata[firstColumn.dataIndex] = '';
                        let sumStr = _locale.langMap.subtotal || '小计';
                        sumdata[firstColumn.dataIndex] = `${sumStr} ` + (sumdata[firstColumn.dataIndex] || '');
                    }
                    addData = addData.concat([sumdata])
                }
                if (Object.keys(totalData).length) {
                    if (!firstColumn.totalRender || typeof firstColumn.totalRender !== 'function') {
                        totalData[firstColumn.dataIndex] = '';
                        let totalStr = _locale.langMap.total || '合计';
                        totalData[firstColumn.dataIndex] = `${totalStr} ` + (totalData[firstColumn.dataIndex] || '');
                    }
                    addData = addData.concat([totalData])
                }
            }
            return addData
        } else {
            return handleData;
        }

    }, [handleData, showSum, addSumData, propsColumns, locale])


    let renderContent = useMemo(() => {
        let renderProps = {
            ...props,
            ...expandableProps,
            data: realData,
            // direction: direction || context.direction
            dir: direction
        }
        let showContent = _scrollMode === 'sticky' ?
            // @ts-ignore
            <StickyTable {...renderProps} ref={ref}></StickyTable> :
            // @ts-ignore
            <Table {...renderProps} ref={ref}></Table>;
        // @ts-ignore
        return showContent;
    },
    [_scrollMode, realData, expandableProps]
    )

    return renderContent;
})
export default renderTable;
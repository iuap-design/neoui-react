/*
 * @Author: Mr.mjc
 * @Date: 2022-08-17 16:43:47
 * @LastEditors: MJC
 * @LastEditTime: 2024-08-23 16:09:17
 * @Description: 计算内部显示数据及嵌套高阶组件
 * @FilePath: /next-ui/packages/wui-table/src/MiddlewareTable.tsx
 */
import React, { useMemo, Fragment, useCallback } from 'react';
import omit from 'omit.js';
import { TableProps, DefaultRecordType } from './iTable';
import { useConfigContext } from '../../wui-provider/src/context';
import TablePage from './lib/tablePage';
import { prefix } from "../../wui-core/src/index";
import usePagination, { getPaginationParam } from './hooks/usePagination';
import useSelect from './hooks/useSelect'
import useFilter from './hooks/useFilter'
import cacheTarget from './lib/cache';
import { normalize} from './lib/utils';
import bigDataX from './lib/bigDataX';
import IsSticky from './IsSticky';
import Pagination from '../../wui-pagination/src';
// import { ubaReport, ubaTargetReportCount } from '../../wui-core/src/uba';

const middlewareTable: React.FC<Partial<TableProps>> = React.forwardRef((props: TableProps, ref) => {
    // 大数据模式下会传过来截取完的data,拿不到完整的data,影响多选单选的selectKeys全选取值会少
    let {
        pagination = false,
        data: innerData = [], // 大数据下分割后的数据
        originData, // 大数据下全部数据
        antd,
        onChange: onOutChange,
        fieldid,
        rowKey = 'key',
        columns: propsColumns,
        multiSelectConfig,
        children,
        childrenColumnName = 'children',
        getSelectedDataFunc,
        autoSelect,
        rowSelection,
        selectType,
        onRowClick,
        autoCheckedByClickRows = true,
        expandIconColumnIndex,
        selectedRowIndex,
        locale,
        cacheId,
        isBigData,
        bigData = false,
        singleFilter = false,
        onSingleFilterRender,
        filterMode,
        _onDataChange
    } = props;
    const {dir} = useConfigContext()
    const direction = props.dir || dir;


    // useEffect(() => {
    //     ubaReport('[Tinper_Next_Table]组件加载')
    //     ubaTargetReportCount('Table', props)
    // }, [])

    const { checkStrictly = true } = rowSelection || {};

    const getRowKey = useMemo(() => {
        return typeof rowKey === 'function' ? rowKey : (record: DefaultRecordType) => (record[rowKey as string])
    }, [rowKey])

    const columns = useMemo(() => {
        let _columns = propsColumns;
        if (propsColumns === undefined && children && Array.isArray(children) && children.length > 0) {
            _columns = normalize(children)
        }
        if (cacheId && typeof cacheId === 'string') { // 读取缓存
            _columns = cacheTarget.get(cacheId, _columns)
        }
        return _columns;
    }, [propsColumns, cacheId, children])

    // 处理分页的cacheId
    const tableRef = React.useRef<any>(null);
    const getPaginationCache = () => {
        const pageCacheId = cacheId ? `${cacheId}_pagination` : '';
        return Pagination?.getCache && Pagination?.getCache(pageCacheId)
    }
    React.useImperativeHandle(ref, () => {
        return {
            ...tableRef.current,
            getPaginationCache
        }
    })

    const pageCacheId = cacheId ? `${cacheId}_pagination` : undefined;
    React.useMemo(() => {
        // 初始化时依据cacheId读取缓存pageSize
        if (pagination && typeof pagination === 'object' && getPaginationCache()?.pageSize) {
            pagination.pageSize = getPaginationCache()?.pageSize;
        }
    }, [cacheId]);

    const changeEventInfo:any = {} // 缓存后续一些改变的值sort,filter,pagination

    // 内部一些如sort排序无改变引用地址，故监听不到，需处理
    let data = useMemo(() => {
        return [
            ...innerData
        ]
    }, [innerData, [...innerData]])

    const dataLength = useMemo(() => {
        return data.length
    }, [data])


    const treeToList = useCallback((data: DefaultRecordType[]) => {
        return (data || []).reduce((newData: DefaultRecordType[], record: DefaultRecordType, _index: number) => {
	        newData.push(record);
	        if (record[childrenColumnName] && Array.isArray(record[childrenColumnName]) && record[childrenColumnName].length) {
	            newData = newData.concat(treeToList(record[childrenColumnName]))
	        }
	        return newData;
	    }, [])
    }, [data, childrenColumnName])

    const keyToIndex = useMemo(() => {
	    let target = {};
	    let newData = treeToList(data);
	    newData.forEach((record: DefaultRecordType, index: number) => {
	        const key = getRowKey(record, index);
            if (!key || target.hasOwnProperty(key)) {
                // console.error(`[Tinper-Next-Table] Each child in an array or iterator should have a unique "key" prop, Please set the 'rowKey' in props`);
            }
	        target[key] = index;
	    })
	    return target;
    }, [data, childrenColumnName])

    const onPaginationChange = (current: number, pageSize: number) => {
        triggerOnChange(
            {
                pagination: { ...changeEventInfo.pagination, current, pageSize },
            },
            'paginate',
        );
    };

    const [mergedPagination, resetPagination] = usePagination(
        data.length,
        pagination,
        onPaginationChange,
    );

    changeEventInfo.pagination = pagination === false ? {} : getPaginationParam(pagination, mergedPagination);

    changeEventInfo.resetPagination = resetPagination;

    // 打平columns为一级数组
    const flatColumns = useMemo(() => {
        return (columns || []).reduce((newColumns: any[], column: any) => {
            if (column.children) {
                newColumns = newColumns.concat(column.children)
            } else {
                newColumns.push(column)
            }
            return newColumns
        }, [])
    }, [columns])

    const onFilterChange = (filterInfo: any, data: any) => {
        triggerOnChange(
            {
                filters: filterInfo,
            },
            'filter',
            false,
            data
        );
    }

    const [filterColumns, filterStatus, filterData] = useFilter({
        columns: columns,
        flatColumns,
        showData: originData || innerData,
        // showData: originData || showData, // 大数据 + 全选性能
        singleFilter,
        locale,
        fieldid,
        onSingleFilterRender,
        filterMode,
        childrenColumnName,
        onFilterChange,
        keyToIndex,
        getRowKey,
        _onDataChange
    })

    // 展示的数据，涉及前端分页
    const showData = useMemo(() => {
        if (antd) { // table.AntdTable
            return filterData
        } else {
            if (pagination === false || !mergedPagination.pageSize) {
                return filterData
            }
            const {current = 1, pageSize = 10, total} = mergedPagination || {};
            if (filterData.length < total!) {
                if (filterData.length > pageSize) {
                    return (filterData || []).slice((current - 1) * pageSize, current * pageSize);
                }
                return filterData
            }
            return (filterData || []).slice((current - 1) * pageSize, current * pageSize);
        }
    }, [
        !!pagination,
        data,
        mergedPagination && mergedPagination.current,
        mergedPagination && mergedPagination.pageSize,
        mergedPagination && mergedPagination.total,
        antd,
        filterData
    ])


    changeEventInfo.filters = filterStatus;
    changeEventInfo.filterData = filterData;

    const [innerColumns, selectedRowKeys, setByClickRowsChange] = useSelect(rowSelection, {
        columns: filterColumns(columns),
        data: originData || innerData,
        showData: originData || showData, // 大数据 + 全选性能
        selectType,
        getRowKey,
        multiSelectConfig,
        children,
        childrenColumnName,
        getSelectedDataFunc,
        checkStrictly,
        autoSelect,
        autoCheckedByClickRows,
        selectedRowIndex,
        antd,
        locale,
        fieldid,
        onRowClick
    })


    const triggerOnChange = useCallback((
        info: any,
        action: string,
        reset: boolean = false,
        newData?: any
    ) => {

        const changeInfo = {
            ...changeEventInfo,
            ...info
        }
        if (reset) {
            changeEventInfo.resetPagination!();
        }

        onOutChange?.(changeInfo.pagination!, changeInfo.filters!, {}, {
            currentDataSource: newData || data,
            action,
        });
    }, [filterData])


    const realColumns = useMemo(() => {
        return innerColumns(filterColumns(columns))
    }, [innerColumns, filterColumns, columns])

    const onInnerRowClick = useCallback((record: DefaultRecordType, index: number, event: React.MouseEvent<HTMLElement>, isActive?: boolean) => {
        if (autoCheckedByClickRows && (!!selectType || rowSelection !== undefined)) { // 多选单选
            setByClickRowsChange(record, index, event, onRowClick)
        } else {
            onRowClick && onRowClick(record, index, event, isActive);
        }
    }, [originData, innerData, autoCheckedByClickRows, selectType, rowSelection, selectedRowKeys, showData])

    let hasPageTop = useMemo(() => {
        if (pagination === false || mergedPagination === false) {
            return null
        } else {
            let {
                position = ['bottomRight'],
                ref
            } = mergedPagination;
            if (Object.prototype.toString.call(mergedPagination) === '[object Object]') {
                // let pageProps = Object.assign({}, {...mergedPagination}, { total: dataLength })
                let pageProps = Object.assign({}, { total: dataLength }, {...mergedPagination})
                let topPos = position.find((item: string) => item.includes('top'))
                if (topPos) {
                    let currentTop = topPos.toLowerCase().replace('top', '')
                    let fieldidAttr = fieldid ? { fieldid } : {}
                    let refAttr = ref ? { ref } : {}
                    let directionAttr = direction === 'rtl' ? { dir: direction } : {}
                    return <TablePage cacheId={pageCacheId} {...omit(pageProps, ['position'])} className={`${prefix}-table-page ${prefix}-table-page-${currentTop}`} {...fieldidAttr} {...refAttr} {...directionAttr}/>
                }
                return null
            }
            return null
        }
    }, [mergedPagination, pagination, dataLength])

    let hasPageBottom = useMemo(() => {
        if (pagination === false || mergedPagination === false) {
            return null
        } else {
            let {
                position = ['bottomRight'],
                ref
            } = mergedPagination;
            if (Object.prototype.toString.call(mergedPagination) === '[object Object]') {
                // 以外部传入的total为主
                // let pageProps = Object.assign({}, {...mergedPagination}, { total: dataLength })
                let pageProps = Object.assign({}, { total: dataLength }, {...mergedPagination})
                let bottomPos = position.find((item: string) => item.includes('bottom'))
                if (bottomPos) {
                    let currentBottom = bottomPos.toLowerCase().replace('bottom', '')
                    let fieldidAttr = fieldid ? { fieldid } : {}
                    let refAttr = ref ? { ref } : {}
                    let directionAttr = direction === 'rtl' ? { direction } : {}
                    return <TablePage cacheId={pageCacheId} {...omit(pageProps, ['position'])} className={`${prefix}-table-page ${prefix}-table-page-${currentBottom}`} {...fieldidAttr} {...refAttr} {...directionAttr}/>
                }
                return null
            }
            return null
        }
    }, [mergedPagination, pagination, dataLength])

    const RealView = useMemo(() => {
        let showView: any = IsSticky;
        if (isBigData || bigData === true) {
            showView = bigDataX(showView)
        }
        return showView
    }, [isBigData, bigData])


    // const RealView = useMemo(() => {
    //     let showView: any = View;
    //     if (!isBigData && bigData) { // 非大数据高级组件嵌套，并且未手动限制大数据才会开启大数据模式
    //         if ((showData && Array.isArray(showData) && showData.length > 200)) { // 不能每次都重新渲染，只有从非大数据切换到大数据或者大数据切换到非大数据需要重新挂载, 需要缓存一下渲染组件状态
    //             showView = bigDataX(View)
    //         }
    //     }
    //     return showView
    // }, [View, isBigData, showData.length])


    let renderContent = useMemo(() => {
        let renderProps = {
            ...props,
            keyToIndex,
            dir: direction,
            // ...expandableProps,
            // data: filterData,
            data: showData,
            columns: realColumns,
            selectedRowKeys,
            onRowClick: onInnerRowClick,
            // @ts-ignore
            expandIconColumnIndex: (!!selectType || (rowSelection !== undefined && rowSelection !== false)) && expandIconColumnIndex ? expandIconColumnIndex + 1 : (!!selectType || (rowSelection !== undefined && rowSelection !== false)) && !expandIconColumnIndex ? 1 : expandIconColumnIndex ? expandIconColumnIndex : 0
        }
        const { expandable } = props;
        let tableContent = <RealView {...renderProps} {...expandable} ref={tableRef}></RealView>
        let showContent = <Fragment>
            { !antd && hasPageTop }
            {tableContent}
            { !antd && hasPageBottom }
        </Fragment>
        return showContent;
    },
    [hasPageTop, hasPageBottom, antd, showData, columns, selectType, rowSelection, expandIconColumnIndex]
    )

    return renderContent;
})
export default middlewareTable;
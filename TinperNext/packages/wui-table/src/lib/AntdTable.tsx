/*
 * @Author: Mr.mjc
 * @Date: 2021-11-16 20:13:21
 * @LastEditors: MJC
 * @LastEditTime: 2024-08-06 10:37:29
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/lib/AntdTable.tsx
 */
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Checkbox from '../../../wui-checkbox/src';
// import Icon from '../../../wui-icon/src';
import Pagination from '../../../wui-pagination/src';
import {ConfigContext} from '../../../wui-provider/src/context';
import i18n from "./i18n";
import {getLangInfo} from "../../../wui-locale/src/tool";
import Radio from '../../../wui-radio/src';
import {pageConf} from '../antdTable/config';
import {
    checkOne,
    getRowKey,
    // getSingleIndex,
    handleColumns,
    handleData,
    handlePageFun,
    handlePropsFun,
    resetFilterInfo,
    showDataFun
} from '../antdTable/util';
import Table from "../MiddlewareTable";
import bigData from './bigData';
import dragColumn from './dragColumn';
import multiSelect from './multiSelect';
import singleSelect from './singleSelect';
import sort from './sort';
import { DefaultRecordType, GetRowKey, Key, PageInfo } from '../interface';
import { TableProps, RowSelectionType, ColumnType, IAntdTableState } from '../iTable';
import { TableInterface } from "../index";
import { ConfigConsumerProps } from '../../../wui-provider/src/iProvider';
import { normalize } from './utils';

function antdTable(Table: React.FC<Partial<TableProps>> | TableInterface) {
    return class AntdTable extends Component<TableProps, IAntdTableState> {
        // static propTypes = {
        //     dataSource: PropTypes.array,
        //     data: PropTypes.array,
        //     columns: PropTypes.array,
        //     rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        //     rowSelection: PropTypes.object,
        //     expandable: PropTypes.object,
        //     pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
        //     onExpandedRowsChange: PropTypes.func,
        //     onExpand: PropTypes.func,
        //     onChange: PropTypes.func,
        // }
		static contextType = ConfigContext;
		// static defaultProps = {
		//     // dataSource: [],
		//     columns: []
		// }
		_sorterInfo: DefaultRecordType;
		_filterInfo: DefaultRecordType;
		dataSource: DefaultRecordType[];
		getCheckboxProps: ((record?:DefaultRecordType, index?: number) => Record<string, any>) | undefined;
		rowKey: string | GetRowKey<DefaultRecordType>;
		rowSelection: RowSelectionType;
		expandable: Record<string, any>;
		defaultPagination: { current: number; pageSize: number; };
		columnsOutSorterClick: Record<string | number, any>;
		isMultiSelect: boolean;
		isSingleSelect: boolean;
		isSort: boolean;
		isDragColumn: boolean;
		isBigData: boolean;
		ComplexTable: React.ComponentClass;
		ComplexColumns: ColumnType[];
		ComplexData: DefaultRecordType[];
		ComplexPagination: Record<string, any>; // 是否需要引入分页的相关
		ComplexProps: any;
		context!: ConfigConsumerProps;
		constructor(props: TableProps) {
		    super(props)
		    let {
		        dataSource,
		        data,
		        columns,
		        rowKey,
		        rowSelection = {},
		        expandable = {}, // 可扩展行处理
		        pagination, // 分页信息
		        children,
		        cacheId,
		    } = props;
		    dataSource = dataSource || data || [];
		    if (columns === undefined && children && Array.isArray(children) && children.length > 0) {
		        columns = normalize(children)
		    }
		    // 展开功能的配置
		    const {
		        defaultExpandedRowKeys = [],
		        expandedRowKeys,
		    } = expandable || {};
		    // 选择功能
		    const {
		        selectedRowKeys,
		        defaultSelectedRowKeys = [],
		        getCheckboxProps = undefined
		    } = rowSelection || {};

		    this._sorterInfo = {
		        column: null,
		        columnKey: null,
		        field: null,
		        order: false
		    } // 缓存排序的信息
		    this._filterInfo = resetFilterInfo(columns)// 缓存filter的信息（后续需要时候直接取）
		    const _selectedRowKeys = checkOne(selectedRowKeys, defaultSelectedRowKeys)
		    const _expandedRowKeys = checkOne(expandedRowKeys, defaultExpandedRowKeys)
		    // 处理props里面的数据
		    if (cacheId && typeof cacheId === 'string') {
		        const pageCache = Pagination.getCache(`${cacheId}_pagination`);
		        if (pagination && typeof pagination === 'object' && pageCache?.pageSize) {
		            pagination.pageSize = pageCache.pageSize;
		        }
		    }
		    this.state = {
		        _selectedRowKeys, // 缓存的已选信息,1,外部受控的selectRowKey影响。2，内部操作数据回流影响
		        _expandedRowKeys, // 缓存已展开行的key 1，外部受控的expandedRowKeys。 2，内部操作数据回流影响
		        pagination, // 缓存分页信息
		    }
		    this.dataSource = dataSource;
		    this.getCheckboxProps = getCheckboxProps;
		    this.rowKey = rowKey;
		    this.rowSelection = rowSelection
		    this.expandable = expandable;
		    this.defaultPagination = {
		        current: 1,
		        pageSize: 10
		    }
		    this.columnsOutSorterClick = {} // 缓存列排序点击事件
		    this.isMultiSelect = this.isMultiSelectFun(props); // 是否是多选组件
		    this.isSingleSelect = this.isSingleSelectFun(props); // 是否是单选组件
		    this.isSort = this.isSortFun(props); // 是否是排序组件
		    this.isDragColumn = this.isDragColumnFun(props); // 是否是拖拽组件
		    this.isBigData = this.isBigDataFun(props); // 是否是大数据组件
		    this.ComplexTable = this.constructFun(Table, props); // 初始化组件
		    this.ComplexColumns = handleColumns(columns, this.columnsOutSorterClick, this._changeSort); // 初始化columns
		    this.ComplexData = handleData(dataSource, _selectedRowKeys, getCheckboxProps, rowKey) // 初始化dataSource
		    this.ComplexPagination = handlePageFun(pagination) // 初始化分页信息
		    this.ComplexProps = handlePropsFun(props, this.ComplexColumns, _expandedRowKeys) // 初始化要传递的props信息

		}

		UNSAFE_componentWillReceiveProps(nextProps: TableProps) {
		    // 判断组件类型是否有变化
		    let isMultiSelect = this.isMultiSelectFun(nextProps);
		    let isSingleSelect = this.isSingleSelectFun(nextProps);
		    let isSort = this.isSortFun(nextProps);
		    let isDragColumn = this.isDragColumnFun(nextProps);
		    let isBigData = this.isBigDataFun(nextProps);
		    if (
		        isMultiSelect !== this.isMultiSelect ||
				isSingleSelect !== this.isSingleSelect ||
				isSort !== this.isSort ||
				isDragColumn !== this.isDragColumn ||
				isBigData !== this.isBigData
		    ) {
		        // 组件状态状态变化，应更新缓存的组件状态
		        this.isMultiSelect = isMultiSelect;
		        this.isSingleSelect = isSingleSelect;
		        this.isSort = isSort;
		        this.isDragColumn = isDragColumn;
		        this.isBigData = isBigData;
		        this.ComplexTable = this.constructFun(Table, nextProps)
		    }

		    if ('columns' in nextProps || 'children' in nextProps) {
		        this.resetColumns(nextProps)
		    }


		    if ('dataSource' in nextProps || 'data' in nextProps || 'rowKey' in nextProps || 'getCheckboxProps' in nextProps || 'rowSelection' in nextProps) {
		        let {rowSelection, dataSource, data, rowKey} = nextProps;
		        rowSelection = rowSelection == null ? {} : rowSelection;
		        dataSource = dataSource || data || []
		        const {
		            selectedRowKeys = undefined,
		            // defaultSelectedRowKeys = [],
		            getCheckboxProps = undefined
		        } = rowSelection == null ? {} : rowSelection;
		        let _selectedRowKeys = selectedRowKeys ? selectedRowKeys : this.state._selectedRowKeys;
		        this.resetData(dataSource, _selectedRowKeys, getCheckboxProps, rowKey, rowSelection)
		    }


		    if ('expandable' in nextProps) {
		        const {expandable = {}} = nextProps;
		        const {expandedRowKeys = undefined} = expandable == null ? {} : expandable;
		        const {_expandedRowKeys} = this.state;
		        const _key = expandedRowKeys ? expandedRowKeys : _expandedRowKeys;
		        this.ComplexProps = handlePropsFun(nextProps, this.ComplexColumns, _key)
		        this.expandable = expandable
		        this.setState({
		            _expandedRowKeys: _key
		        })
		    }

		    if ('pagination' in nextProps) {
		        let {pagination} = nextProps;
		        if (JSON.stringify(pagination) !== JSON.stringify(this.state.pagination)) {
		            this.ComplexPagination = handlePageFun(pagination)
		            this.setState({
		                pagination
		            })
		        }
		    }
		}

		isMultiSelectFun = (props: TableProps) => {
		    let {rowSelection = {}} = props;
		    rowSelection = rowSelection == null ? {} : rowSelection;
		    if (Object.keys(rowSelection).length) {
		        let selectionType = rowSelection.type || 'checkbox'; // 默认为多选
		        return selectionType === 'checkbox'
		    }
		    return false
		}

		isSingleSelectFun = (props: TableProps) => {
		    let {rowSelection = {}} = props;
		    rowSelection = rowSelection == null ? {} : rowSelection;
		    if (Object.keys(rowSelection).length) {
		        let selectionType = rowSelection.type || 'checkbox';
		        return selectionType !== 'checkbox'
		    }
		    return false
		}

		isSortFun = (props: TableProps) => {
		    const {columns = []} = props;
		    if (columns.filter((el:any) => el.hasOwnProperty('sorter')).length) {
		        return true
		    }
		    return false
		}

		isDragColumnFun = (props: TableProps) => {
		    const {dragborder, draggable} = props;
		    if (dragborder || draggable) {
		        return true
		    }
		    return false
		}

		isBigDataFun = (props: TableProps) => {
		    const { isBigData = false } = props;
		    return isBigData
		}

		constructFun = (baseTable: React.FC, props: TableProps) => {
		    let {rowSelection = {}, columns = [], dragborder, draggable, isBigData = false} = props;
		    let mixTable: any = baseTable;

		    if (isBigData) {
		        mixTable = bigData(mixTable)
		    }

		    if (dragborder || draggable) {
		        mixTable = dragColumn(mixTable)
		    }

		    // 排序
		    if (columns.filter(el => (el || {}).hasOwnProperty('sorter')).length) {
		        mixTable = sort(mixTable)
		    }

		    // 兼容expandable，rowSelection外部传null得情况
		    rowSelection = rowSelection == null ? {} : rowSelection;

		    // 多选单选
		    if (Object.keys(rowSelection).length) {
		        let selectionType = rowSelection.type || 'checkbox'; // 默认为多选
		        // @ts-ignore
		        mixTable = selectionType === 'checkbox' ? multiSelect(mixTable, Checkbox) : singleSelect(mixTable, Radio)
		    }

		    return mixTable
		}

		resetColumns = (nextProps: TableProps) => {
		    let {columns, children} = nextProps;
		    if (columns === undefined && children && Array.isArray(children) && children.length > 0) {
		        columns = normalize(children)
		    }
		    this.columnsOutSorterClick = {} // 缓存列排序点击事件
		    this.ComplexColumns = handleColumns(columns, this.columnsOutSorterClick, this._changeSort);
		    this.ComplexProps = handlePropsFun(nextProps, this.ComplexColumns, this.state._expandedRowKeys)
		}

		resetData = (dataSource: DefaultRecordType[], _selectedRowKeys: Key[], getCheckboxProps: any, rowKey: string | GetRowKey<DefaultRecordType>, rowSelection: RowSelectionType) => {
		    this.getCheckboxProps = getCheckboxProps;
		    this.rowKey = rowKey;
		    this.dataSource = dataSource;
		    this.rowSelection = rowSelection;
		    this.ComplexData = handleData(dataSource, _selectedRowKeys, getCheckboxProps, rowKey);
		    this.setState({
		        _selectedRowKeys
		    })
		}

		/**
		 * @description: 多选事件处理，触发条件：全选/点击单个选中时
		 * @tip: 对外暴露参数不同，如与antd保持一致需修改底层文件multiSelect.js回调函数暴露数据
		 * @param {*}
		 * @return {*}
		 */
		// _handleCheckbox = (selectList, record, index, data, e, changedList) => {
		//     const { dataSource, rowSelection = {}, rowKey, expandable = {} } = this;
		//     const { onSelectAll, onSelect, onChange, selectedRowKeys, getCheckboxProps } = rowSelection == null ? {} : rowSelection;
		//     const { childrenColumnName = 'children' } = expandable;
		//     const _selectedRowKeys = getSelectedRowKeys(selectList, rowKey, childrenColumnName)

		//     if (!selectedRowKeys) { //非受控属性
		//         this.resetData(dataSource, _selectedRowKeys, getCheckboxProps, rowKey, rowSelection)
		//     } else {
		//         this.resetData(dataSource, this.state._selectedRowKeys, getCheckboxProps, rowKey, rowSelection)
		//     }

		//     if (!record && !index) {
		//         let flag = selectList.length
		//         onSelectAll && onSelectAll(flag, selectList, changedList || [])
		//         onChange && onChange(_selectedRowKeys, selectList)
		//     } else {
		//         onChange && onChange(_selectedRowKeys, selectList)
		//         onSelect && onSelect(record, record._checked, selectList, e);
		//     }
		// }

		/**
		 * @description: 单选点击选择事件
		 * @param {*}
		 * @return {*}
		 */
		// _handleRadioCheck = (record: DefaultRecordType, index: number, e: React.MouseEvent<HTMLElement>) => {
		//     const {dataSource, rowSelection, rowKey} = this;
		//     const {_selectedRowKeys} = this.state
		//     const {onSelect = undefined, onChange = undefined, selectedRowKeys = undefined, getCheckboxProps = undefined} = rowSelection == null ? {} : rowSelection;

		//     if (!selectedRowKeys) { // 非受控属性
		//         this.resetData(dataSource, [index], getCheckboxProps, rowKey, rowSelection)
		//     } else {
		//         this.resetData(dataSource, [_selectedRowKeys[0]], getCheckboxProps, rowKey, rowSelection)
		//     }

		//     let singleSelect = getRowKey(record, index, rowKey);

		//     onChange && onChange([singleSelect], [record]);
		//     onSelect && onSelect(record, true, [record], e)
		// }

		/**
		 * @description: 切换页
		 * @param {*}
		 * @return {*}
		 */
		_changePage = ({current, pageSize}: PageInfo) => {
		    const {ComplexPagination} = this;
		    const {pagination} = this.props;
		    let pageObj;
		    let pageKeys = Object.keys(pagination || {});
		    if (pageKeys.includes('current') && pageKeys.includes('pageSize')) {// 页码和页数都受控
		        pageObj = Object.assign({}, {...this.ComplexPagination}, {current, pageSize})
		    } else if (pageKeys.includes('current')) { // 页码受控
		        this.ComplexPagination = Object.assign({}, {...ComplexPagination}, {pageSize})
		        pageObj = Object.assign({}, {...this.ComplexPagination}, {current})
		        this.setState({
		            pagination
		        })
		    } else if (pageKeys.includes('pageSize')) { // 页数受控
		        this.ComplexPagination = Object.assign({}, {...ComplexPagination}, {current})
		        pageObj = Object.assign({}, {...this.ComplexPagination}, {pageSize})
		        this.setState({
		            pagination
		        })
		    } else { // 页码和页数都不受控
		        pageObj = Object.assign({}, {...ComplexPagination}, {current, pageSize}) // onChange对外暴露分页相关属性
		        this.ComplexPagination = pageObj; // 重置本地的ComplexPagination
		        this.setState({
		            pagination
		        })
		    }
		    this.onOutChange('paginate', pageObj)
		}

		/**
		 * @description: 排序
		 * @param {*}
		 * @return {*}
		 */
		_changeSort = (_sorterInfo: DefaultRecordType) => {
		    this._sorterInfo = _sorterInfo;
		    let sortObj = Object.assign({}, _sorterInfo)
		    this.onOutChange('sort', sortObj)
		}

		/**
		 * @description: 筛选: TODO
		 * @param {*}
		 * @return {*}
		 */
		_changeFilter = (_filterInfo: DefaultRecordType) => {
		    this._filterInfo = _filterInfo;
		    let filterObj = Object.assign({}, _filterInfo)
		    this.onOutChange('filter', filterObj)
		}

		/**
		 * @description: 对外统一暴露的onChange事件，兼容antd，待补充
		 * @param {*}
		 * @return {*}
		 */
		onOutChange = (str: string, data: DefaultRecordType) => { // TODO:补充其他触发
		    const {ComplexPagination, _sorterInfo, _filterInfo} = this;
		    const {onChange, dataSource} = this.props;
		    const target = {
		        action: str,
		        currentDataSource: dataSource
		    }
		    if (str === 'paginate') { // 受控属性
		        onChange && onChange(data, _filterInfo, _sorterInfo, target)
		    } else {
		        onChange && onChange((ComplexPagination || {}), _filterInfo, _sorterInfo, target)
		    }
		}

		/**
		 * @description: 展开行事件，兼容antd
		 * @param {*}
		 * @return {*}
		 */
		_onExpand = (expanded: boolean, record: DefaultRecordType, index: number) => {
		    const {_expandedRowKeys} = this.state;
		    let {expandable, onExpandedRowsChange, rowKey, onExpand} = this.props;
		    expandable = expandable == null ? {} : expandable;
		    const {
		        // expandedRowKeys,
		        onExpandedRowsChange: antdOnExpandedRowsChange,
		        onExpand: antdOnExpand
		    } = expandable;

		    let current = getRowKey(record, index, rowKey);

		    let _expand = []

		    if (expanded) {
		        _expand = _expandedRowKeys.concat(current)
		    } else {
		        _expand = _expandedRowKeys.filter(el => el !== current)
		    }
		    // 是否可控由外层控制，在本层都是可控底层的table
		    this.setState({
		        _expandedRowKeys: _expand
		    })
		    this.ComplexProps = handlePropsFun(this.props, this.ComplexColumns, _expand)
		    onExpand && onExpand(expanded, record)
		    antdOnExpand && antdOnExpand(expanded, record)
		    antdOnExpandedRowsChange && antdOnExpandedRowsChange(_expand);
		    onExpandedRowsChange && onExpandedRowsChange(_expand);
		}

		render() {
		    // eslint-disable-next-line @typescript-eslint/naming-convention
		    const {ComplexPagination, ComplexData, ComplexProps} = this;
		    const {pagination} = this.state
		    const {fieldid, cacheId, dir: direction = 'ltr'} = this.props;
		    // let {type: selectionType = undefined} = rowSelection == null ? {} : rowSelection;

		    // 分页组件
		    let showData = showDataFun(pagination, ComplexPagination, ComplexData); // 前端分页
		    let fieldidAttr = fieldid ? { fieldid } : {}
		    let propsLocale = this.props.locale || this.context.locale
		    let locale = getLangInfo(propsLocale, i18n, 'table');
		    let localeAttr = locale && locale.lang ? { locale: locale.lang } : {}
		    let directionAttr = direction === 'rtl' ? { direction } : {}
		    const pageView =
				pagination === false
				    ? null
				    : <Pagination
				        total={(ComplexData || []).length}
				        {...localeAttr}
				        {...(ComplexPagination || {})}
				        {...fieldidAttr}
				        {...directionAttr}
				        style={{justifyContent: pageConf[(ComplexPagination || {}).position || 'bottomRight'].position}}
				        onSelect={(current, pageSize) => this._changePage({current, pageSize})}
				        onDataNumSelect={(current, pageSize) => this._changePage({current, pageSize})}
				        cacheId={cacheId ? `${cacheId}_pagination` : undefined}
				    />
		    // 选择组件
		    // let _props, _selectionType = selectionType; // 1，渲染组件 2，传递props
		    // if (Object.keys(rowSelection == null ? {} : rowSelection).length && !selectionType) {
		    //     _selectionType = 'checkbox'; // 默认为多选
		    // }

		    // switch (_selectionType) {
		    // // case 'radio': {
		    // //     // 处理props
		    // //     let selectedRowIndex = getSingleIndex(showData, this.state._selectedRowKeys[0], this.rowKey)
		    // //     _props = {
		    // //         ...ComplexProps,
		    // //         data: showData,
		    // //         selectedRowIndex,
		    // //         // getSelectedDataFunc: (record: DefaultRecordType, index: number, e: React.MouseEvent<HTMLElement>) => this._handleRadioCheck(record, index, e),
		    // //     }
		    // //     break;
		    // // }
		    // case 'radio': {
		    //     _props = {
		    //         ...ComplexProps,
		    //         data: showData,
		    //     }
		    //     break;
		    // }
		    // default: {
		    //     _props = {
		    //         ...ComplexProps,
		    //         data: showData,
		    //     }
		    //     break;
		    // }
		    // }
		    let _props = {
		        ...ComplexProps,
		        data: showData,
		        antd: true
		    }

		    const ComplexTable: React.ComponentClass = this.ComplexTable;
		    return (
		        <>
		            {pageConf[(ComplexPagination || {}).position || 'bottomRight'].top ? pageView : null}
		            <ComplexTable {..._props}
								  onExpand={this._onExpand}
		            />
		            {pageConf[(ComplexPagination || {}).position || 'bottomRight'].top ? null : pageView}
		        </>
		    )
		}
    } as React.ComponentClass<Partial<TableProps>> | TableInterface;
}


const AntdTable = antdTable(Table)
export default AntdTable;

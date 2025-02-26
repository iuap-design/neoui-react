import classnames from 'classnames';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ResizeObserver from 'rc-resize-observer';
import shallowequal from 'shallowequal';
import {getNid, prefix, WebUI} from "../../wui-core/src/index"
// import {getComponentLocale} from "../../wui-locale/src/tool";
import {WithConfigConsumer} from "../../wui-provider/src/context";
import Loading from '../../wui-spin/src';
import Empty from '../../wui-empty/src';
import Popover from '../../wui-popover/src';
import Icon from '../../wui-icon/src';
import ColumnManager from './ColumnManager';
import createStore from './createStore';
import DragResizerLine from "./DragResizerLine";
import DragRowLine from "./DragRowLine";
// import i18n from "./lib/i18n";
import {arrayMoveTo, arrayTreeMoveTo, getValueByRowKey, getTableCssHeight} from "./lib/util";
import {closest, debounce, Event, EventUtil, fillTargetSpace, measureScrollbar, myBrowser, getSumWidth, computeIndex, getColLeave} from './lib/utils';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
// import {getLangInfo} from "../../wui-locale/src/tool";
import { TableProps, TableState, ColumnsType, ColumnType } from './iTable';
import { Key, DefaultRecordType, FixedType, DropDataSourceType, BrowserInfoType, GetTableOptions } from './interface'
import { preCol, sufCol } from './constant';

// export const propTypes = {
//     data: PropTypes.array,
//     expandIconAsCell: PropTypes.bool,
//     defaultExpandAllRows: PropTypes.bool,
//     expandedRowKeys: PropTypes.array,
//     defaultExpandedRowKeys: PropTypes.array,
//     useFixedHeader: PropTypes.bool,
//     columns: PropTypes.array,
//     clsPrefix: PropTypes.string,
//     bodyStyle: PropTypes.object,
//     style: PropTypes.object,
//     // 特殊的渲染规则的key值
//     rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
//     rowClassName: PropTypes.func,
//     // column的主键，和 column.key 作用相同
//     columnKey: PropTypes.string,
//     expandedRowClassName: PropTypes.func,
//     childrenColumnName: PropTypes.string,
//     onExpand: PropTypes.func,
//     onRowHover: PropTypes.func,
//     onExpandedRowsChange: PropTypes.func,
//     indentSize: PropTypes.number,
//     onRowClick: PropTypes.func,
//     onRowDoubleClick: PropTypes.func,
//     expandIconColumnIndex: PropTypes.number,
//     // 是否显示表头
//     showHeader: PropTypes.bool,
//     title: PropTypes.func,
//     footer: PropTypes.func,
//     emptyText: PropTypes.func,
//     scroll: PropTypes.object,
//     rowRef: PropTypes.func,
//     getBodyWrapper: PropTypes.func,
//     children: PropTypes.node,
//     draggable: PropTypes.bool,
//     minColumnWidth: PropTypes.number,
//     filterable: PropTypes.bool,
//     filterDelay: PropTypes.number,
//     onFilterChange: PropTypes.func,
//     onFilterClear: PropTypes.func,
//     syncHover: PropTypes.bool,
//     tabIndex: PropTypes.string,
//     hoverContent: PropTypes.func,
//     size: PropTypes.oneOf(['sm', 'md', 'lg']),
//     rowDraggAble: PropTypes.bool,
//     hideDragHandle: PropTypes.bool, // 隐藏行拖拽把手
//     onDropRow: PropTypes.func,
//     onDragRowStart: PropTypes.func,
//     onBodyScroll: PropTypes.func,
//     bodyDisplayInRow: PropTypes.bool, // 表格内容超出列宽度时进行换行 or 以...形式展现
//     headerDisplayInRow: PropTypes.bool, // 表头内容超出列宽度时进行换行 or 以...形式展现
//     showRowNum: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]), // 表格是否自动生成序号,格式为{base:number || 0,defaultKey:string || '_index',defaultName:string || '序号'}
//     onPaste: PropTypes.func,
//     onBodyMouseLeave: PropTypes.func,
//     originWidth: PropTypes.number,
//     scrollTop: PropTypes.number,
//     lazyLoad: PropTypes.object,
//     ignoreScrollYChange: PropTypes.func,
//     onResize: PropTypes.func,
//     bordered: PropTypes.bool,
//     onDragStart: PropTypes.func,
//     onDragEnter: PropTypes.func,
//     onDragOver: PropTypes.func,
//     onDrop: PropTypes.func,
//     onDragEnd: PropTypes.func,
//     onMouseDown: PropTypes.func,
//     onMouseMove: PropTypes.func,
//     onMouseUp: PropTypes.func,
//     dragborder: PropTypes.bool,
//     onDropBorder: PropTypes.func,
//     onDraggingBorder: PropTypes.func,
//     dragborderKey: PropTypes.string,
//     headerHeight: PropTypes.number,
//     afterDragColWidth: PropTypes.number,
//     headerScroll: PropTypes.func,
//     headerEventNoStop: PropTypes.bool,
//     onCopy: PropTypes.func,
//     resetScroll: PropTypes.func,
//     footerScroll: PropTypes.func,
//     hideHeaderScroll: PropTypes.func,
//     locale: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//     getCellClassName: PropTypes.string,
//     useDragHandle: PropTypes.bool,
//     expandedRowRender: PropTypes.any,
//     expandRowByClick: PropTypes.bool,
//     haveExpandIcon: PropTypes.any,
//     showExpandIcon: PropTypes.any, //  替换原有的haveExpandIcon
//     expandedIcon: PropTypes.any,
//     collapsedIcon: PropTypes.any,
//     expandIcon: PropTypes.func, // 新增
//     height: PropTypes.number,
//     showSum: PropTypes.bool,
//     heightConsistent: PropTypes.bool,
//     syncFixedRowHeight: PropTypes.bool,
//     setRowHeight: PropTypes.func,
//     setRowParentIndex: PropTypes.func,
//     handleScrollY: PropTypes.func,
//     handleScrollX: PropTypes.func,
//     onKeyTab: PropTypes.func,
//     onKeyUp: PropTypes.func,
//     onKeyDown: PropTypes.func,
//     onTableKeyDown: PropTypes.func,
//     focusable: PropTypes.bool,
//     loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
//     expandIconCellWidth: PropTypes.number,
//     selectedRowKeys: PropTypes.array,
//     stripeLine: PropTypes.bool,
//     findRowKeys: PropTypes.array,
//     fillSpace: PropTypes.bool,
//     onHeaderRow: PropTypes.func,
//     onRow: PropTypes.func,
//     onRowDragStart: PropTypes.func,
//     onRowDragDrop: PropTypes.func,
//     bodyClassName: PropTypes.string,
//     footerClassName: PropTypes.string,
//     emptyClassName: PropTypes.string,
//     fieldid: PropTypes.string
// };

export const defaultProps = {
    data: [],
    useFixedHeader: true,
    expandIconAsCell: false,
    defaultExpandAllRows: false,
    defaultExpandedRowKeys: [],
    columnKey: 'key',
    rowKey: 'key',
    bordered: false,
    rowClassName: () => '',
    expandedRowClassName: () => '',
    onExpand() {
    },
    onExpandedRowsChange() {
    },
    onRowClick() {
    },
    // onRowDoubleClick() { },
    clsPrefix: prefix + '-table',
    bodyStyle: {},
    style: {},
    childrenColumnName: 'children',
    indentSize: 15,
    expandIconColumnIndex: 0,
    showHeader: true,
    scroll: {},
    rowRef: () => null,
    getBodyWrapper: (body: any) => body,
    // emptyText: () => <div><Icon type="uf-nodata" className="table-nodata"></Icon><span>{locale["noData"]}</span></div>,
    columns: [],
    minColumnWidth: 80,
    syncHover: true,
    // setRowHeight:()=>{},
    // setRowParentIndex: () => {
    // },
    tabIndex: 0,
    height: null,
    // heightConsistent: false,
    // syncFixedRowHeight: false,
    // size: 'md',
    rowDraggAble: false,
    hideDragHandle: false,
    onDropRow: () => {
    },
    onDragRowStart: () => {
    },
    onBodyScroll: () => {
    },
    bodyDisplayInRow: true,
    headerDisplayInRow: true,
    headerHeight: null,
    showRowNum: false,
    onPaste: () => {
    },
    originWidth: null, // 做什么用??
    selectedRowKeys: [],
    stripeLine: false,
    findRowKeys: [], // 找到的匹配的行
    fillSpace: false,
    locale: 'zh-cn',
    bigColumns: false, // 是否开启大数据列
    columnsLoadBuffer: 5, // 大数据列缓存列数
    columnFilterAble: false,
    showHeaderExpandIcon: false,
    showExpandColumn: true
};

const expandIconCellWidth = Number(43);

const tableUUID = () => "_table_uid_" + new Date().getTime()
let browserInfo: BrowserInfoType = {};
const heigtMap: any = {
    '0': 29,
    '1': 35,
    '2': 41
}

@WithConfigConsumer({name: "table"})
@WebUI({name: "table", defaultProps})
class Table extends Component<TableProps<DefaultRecordType>, TableState> {
	static defaultProps = {...defaultProps};
	currentScrollColumnIndex: number;
	columnManager: ColumnManager;
	store: { setState: (newState: any) => void; getState: () => any; subscribe: (listener: any) => void;};
	firstDid: boolean;
	scrollYChanged: boolean;
	tableUid: string;
	contentTable: HTMLElement | null;
	leftColumnsLength: number;
	dataChanged: boolean;
	fixedColumnsBodyRowsHeightCache: Record<Key, number> | null;
	fixedColumnsExpandedRowsHeightCache: Record<Key, number | string> | null;
	emptyFillHeight: null | number;
	tableContext: DefaultRecordType | null;
	centerColumnsLength: number;
	scrollbarWidth: number;
	fillSpaceStyle: {
		width?: string;
		height?: string;
	} | undefined;
	scrollTop: number;
	hoverDom: HTMLDivElement | undefined | null;
	headTable: HTMLDivElement | undefined | null;
	bottomTable: HTMLElement | undefined;
	bodyTable: HTMLDivElement | undefined | null;
	hoverContentClass: string | undefined;
	titleTable: HTMLDivElement | undefined | null;
	currentHoverKey: number | string | undefined;
	leftHeadTable: HTMLDivElement | undefined | null;
	rightHeadTable: HTMLDivElement | undefined | null;
	contentDomWidth: number;
	treeType: boolean;
	isTreeType: boolean;
	fixedLeftBodyInner: HTMLDivElement | undefined | null;
	fixedRightBodyInner: HTMLDivElement | undefined | null;
	contentWidth: number | undefined;
	resizerLine: DragResizerLine | undefined | null;
	computeWidth: number;
	domWidthDiff: number;
	treeRowIndex: number;
	bodyMouseLeaveTimmer: any;
	scrollHoverKeyTimer: any;
	lastScrollLeft: number;
	lastScrollTop: number;
	hoverKey: Key | null;
	dragrowLine: DragRowLine | undefined | null;
	changeEmpty: boolean;
	headerShowExpandIcon: boolean;
	constructor(props: TableProps<DefaultRecordType>) {
	    super(props);
	    browserInfo = myBrowser();
	    let expandedRowKeys: Key[] = [];
	    let rows = [...(props.data || [])];
	    const showDragHandle = !props.hideDragHandle && props.rowDraggAble;
	    let defaultColumnWidth = getTableCssHeight(`--${prefix}-table-cloumn-width`);
	    this.columnManager = new ColumnManager(props.columns, (props.children as JSX.Element[]), (props.originWidth as number), showDragHandle, props.showRowNum, props.locale, defaultColumnWidth); // 加入props.showRowNum参数
	    this.store = createStore({currentHoverKey: null, currentRecord: null, currentIndex: null});
	    this.firstDid = true;
	    this.treeType = false;
	    this.isTreeType = false;
	    this.scrollYChanged = false;
	    this.scrollTop = 0;
	    this.contentWidth = 0;
	    this.contentDomWidth = 0;
	    this.computeWidth = 0;
	    this.domWidthDiff = 0;
	    this.scrollbarWidth = 0;
	    this.treeRowIndex = 0;
	    this.lastScrollLeft = 0;
	    this.lastScrollTop = 0;
	    this.hoverKey = null;
	    this.currentScrollColumnIndex = -1; // 大数据列最后一行表头列的index
	    if (props.defaultExpandAllRows) {
	        if (props.expandedRowKeys) {
			  expandedRowKeys = props.expandedRowKeys
	        } else {
			  for (let i = 0; i < rows.length; i++) {
	                const row = rows[i];
	                expandedRowKeys.push(this.getRowKey(row, i));
	                rows = rows.concat(row[props.childrenColumnName] || []);
			  }
	        }
		  } else {
	        expandedRowKeys = props.expandedRowKeys || props.defaultExpandedRowKeys || [];
		  }
	    let cssRowHeight = getTableCssHeight(`--${prefix}-table-row-height`);
	    let cssRowHeaderHeight = getTableCssHeight(`--${prefix}-table-row-header-height`);
	    this.state = {
	        expandedRowKeys,
	        data: props.data || [],
	        currentHoverKey: null,
	        scrollPosition: 'left',
	        fixedColumnsHeadRowsHeight: null,
	        fixedColumnsBodyRowsHeight: [],
	        fixedColumnsExpandedRowsHeight: {}, // 扩展行的高度
	        scroll: props.scroll,
	        cssRowHeight: props.height || cssRowHeight || 35,
	        cssRowHeaderHeight: props.headerHeight || cssRowHeaderHeight || 30,
	        defaultColumnWidth,
	        contentDomWidth: 0,
	        selectCellColumnKeys: [],
	        selectCellRowsKeys: [],
	    }

	    this.tableUid = tableUUID();
	    this.contentTable = null;
	    this.leftColumnsLength = 0; // 左侧固定列的长度
	    this.centerColumnsLength = 0; // 非固定列的长度// this.columnsChildrenList = [];//复杂表头、所有叶子节点
	    this.dataChanged = false; // 数据是否改变
	    // 同步行高时使用的缓存
	    this.fixedColumnsBodyRowsHeightCache = null;
	    this.fixedColumnsExpandedRowsHeightCache = null;
	    this.emptyFillHeight = null; // 填充的空数据高度
	    this.tableContext = null;
	    this.changeEmpty = true;
	    this.getJDiwork();
	    this.headerShowExpandIcon = false
	}

	UNSAFE_componentWillMount() {
	    this.centerColumnsLength = this.columnManager.centerColumns().length
	    this.leftColumnsLength = this.columnManager.leftColumns().length
	}

	componentDidMount() {
	    // this.getTableUID();
	    EventUtil.addHandler(this.contentTable, 'keydown', this.onKeyDown);
	    EventUtil.addHandler(this.contentTable, 'focus', this.onFocus);
	    // setTimeout(this.resetScrollX, 300);
	    // 含有纵向滚动条
	    // if(this.props.scroll.y){
	    //    this.scrollbarWidth = measureScrollbar(`.u-table`);
	    // }
	    this.scrollbarWidth = measureScrollbar(`div.${this.props.clsPrefix}[data-for-table='${this.tableUid}']`);// dom装载后获取浏览器下的滚动条宽度
	    // 后续也放在recevice里面
	    if (!this.props.originWidth) {
	        this.computeTableWidth();
	    }
	    let {useFixedHeader} = this.props;
	    // if (this.columnManager.isAnyColumnsFixed()) {
	    //     this.syncFixedTableRowHeight();// 同步固定列的内容行高度
	    //     const targetNode = this.contentTable
	    //     if (targetNode) {
	    //         this.resizeObserver = new ResizeObserver(() => {
	    //             this.resize()
	    //         });
	    //         this.resizeObserver.observe(targetNode)
	    //     }
	    // }
	    if (this.contentTable) { // 监听table尺寸变化重新计算列宽度
	        if (this.columnManager.isAnyColumnsFixed()) {
	            this.syncFixedTableRowHeight();// 同步固定列的内容行高度
	        }
	    }
	    if (useFixedHeader) {// 固定列头存在则执行head和body的宽度
	        this.syncFixedTableScrollWidth();// 同步固定列的滚动宽度
	    }

	    if (this.props.fillSpace) {
	        const targetNode = this.contentTable as HTMLElement;
	        fillTargetSpace(targetNode, undefined, (_element: HTMLElement, _parent: HTMLElement, noPaddingMaxW: number, noPaddingMaxH: number) => {
	            // tip: 需要设置整体Table的宽高（通过变量加入style最妥当），需要设置scroll.y = noPaddingMaxH - 表头高度（考虑多表头）
	            let {scroll} = this.state;
	            let maxHeaderHeight = this.getHeaderHeight();
	            // let _scroll = Object.assign(scroll, {
	            //     y: noPaddingMaxH - maxHeaderHeight
	            // })
	            this.fillSpaceStyle = {
	                width: noPaddingMaxW + 'px',
	                height: noPaddingMaxH + 'px'
	            }
	            this.emptyFillHeight = noPaddingMaxH - maxHeaderHeight;
	            let tableDom = this.contentTable as HTMLElement;
	            if (tableDom && this.emptyFillHeight) {
	                const { clsPrefix } = this.props;
	                let centerBodyDom = tableDom.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-body`) as HTMLElement;
	                centerBodyDom.style.height = `${this.emptyFillHeight}px`
	            }
	            this.setState({
	                scroll: {
	                    ...scroll,
                    	y: noPaddingMaxH - maxHeaderHeight
	                }
	            })
	        })
	    } else {
	        this.fillSpaceStyle = {}
	    }
	    if ('currentScrollColumn' in this.props) {
	        this.scrollColumnFun(this.props)
	    } else {
	        setTimeout(this.resetScrollX, 300);
	    }
	}

	UNSAFE_componentWillReceiveProps(nextProps: TableProps<DefaultRecordType>) {
	    let {hideDragHandle, rowDraggAble, showRowNum, clsPrefix, useFixedHeader, locale} = this.props;
	    // 清除同步行高时使用的缓存
	    this.fixedColumnsBodyRowsHeightCache = null;
	    this.fixedColumnsExpandedRowsHeightCache = null;

	    if ('scroll' in nextProps) {
	        this.setState({
	            scroll: nextProps.scroll || {},
	        }, () => {
	            if (useFixedHeader) {// 固定列头存在则执行head和body的宽度
	                this.syncFixedTableScrollWidth();// 同步固定列的滚动宽度
	            }
	        });
	    }


	    if ('data' in nextProps) {
	        this.setState({
            	data: nextProps.data || [],
	        });
	    }
	    if ('defaultExpandAllRows' in nextProps && this.props.defaultExpandAllRows !== nextProps.defaultExpandAllRows) {
	        const { defaultExpandAllRows, data, expandedRowKeys, childrenColumnName = 'children'} = nextProps;
	        if (!expandedRowKeys) {
	            if (defaultExpandAllRows) {
	                let _expandedRowKeys = [];
	                let rows = [...(data || [])];
	                for (let i = 0; i < rows.length; i++) {
	    				  const row = rows[i];
	    				  _expandedRowKeys.push(this.getRowKey(row, i));
	    				  rows = rows.concat(row[childrenColumnName] || []);
	                }
	                this.setState({
	    				  expandedRowKeys: _expandedRowKeys
	                })
	            }
	        }
	      }
	    if ('expandedRowKeys' in nextProps && nextProps.expandedRowKeys !== undefined) {
	        this.setState({
	            expandedRowKeys: nextProps.expandedRowKeys,
	        });
	    }

	    if (nextProps.columns && !shallowequal(nextProps.columns, this.props.columns)) {
	        this.columnManager.reset(nextProps.columns, null, showRowNum, !hideDragHandle && rowDraggAble, locale); // 加入this.props.showRowNum参数
	        if (nextProps.columns.length !== this.props.columns.length && this.bodyTable) {
	            this.scrollTop = this.bodyTable.scrollTop;
	        }
	        // 单表头和多表头切换需要重新计算高度
	        this.setState({
	            fixedColumnsHeadRowsHeight: null,
	        });
	    } else if (nextProps.children !== this.props.children) {
	        // this.columnManager.reset(null, nextProps.children, showRowNum, !hideDragHandle && rowDraggAble); // 加入this.props.showRowNum参数
	        this.columnManager.reset([], nextProps.children, showRowNum, !hideDragHandle && rowDraggAble, locale); // 加入this.props.showRowNum参数
	        this.setState({
	            fixedColumnsHeadRowsHeight: null,
	        });
	    }

	    if ('currentScrollColumn' in nextProps) {
	        this.scrollColumnFun(nextProps)
	    }

	    // 适配lazyload
	    if ((nextProps.scrollTop || nextProps.scrollTop == 0) && nextProps.scrollTop > -1) {
	        // this.bodyTable.scrollTop = nextProps.scrollTop;
	        this.scrollTop = nextProps.scrollTop;
	    }
	    // fix:模态框中使用table，计算的滚动条宽度为0的bug
	    // fix:表格首次渲染时 display:none，再显示时，未重新计算，导致表行出现错位的bug
	    // if(this.scrollbarWidth<=0 && this.props.scroll.y){
	    //   this.scrollbarWidth = measureScrollbar(`.${clsPrefix}`);
	    // }
	    if (!nextProps.originWidth) {
	        this.computeTableWidth();
	        this.firstDid = true;// 避免重复update
	    }
	    if (nextProps.resetScroll) {
	        this.resetScrollX();
	    }

	    if ('fillSpace' in nextProps) {
	        if (nextProps.fillSpace) {
	            const targetNode = this.contentTable as HTMLElement;
	            fillTargetSpace(targetNode, undefined, (_element: HTMLElement, _parent: HTMLElement, noPaddingMaxW: number, noPaddingMaxH: number) => {
	                let {scroll} = this.state;
	                let maxHeaderHeight = this.getHeaderHeight();
	                // let _scroll = Object.assign(scroll, {
	                //     y: noPaddingMaxH - maxHeaderHeight
	                // })
	                this.fillSpaceStyle = {
	                    width: noPaddingMaxW + 'px',
	                    height: noPaddingMaxH + 'px'
	                }
	                this.emptyFillHeight = noPaddingMaxH - maxHeaderHeight;
	                let tableDom = this.contentTable as HTMLElement;
	                if (tableDom && this.emptyFillHeight) {
	                    const { clsPrefix } = nextProps;
	                    let centerBodyDom = tableDom.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-body`) as HTMLElement;
	                    centerBodyDom.style.height = `${this.emptyFillHeight}px`
	                }
	                this.setState({
	                    scroll: {
	                        ...scroll,
	                        y: noPaddingMaxH - maxHeaderHeight
	                    }
	                })
	            })
	        } else {
	            this.fillSpaceStyle = {}
	        }
	    }

	    if ('selectedRowKeys' in nextProps) {
	        const {selectedRowKeys, syncHover = true} = nextProps;
	        if (Array.isArray(selectedRowKeys)) {
	            if (this.hoverDom) {
	                const {currentHoverRecord, currentHoverIndex} = this.state;
	                let currentHoverKey = this.getRowKey(currentHoverRecord as DefaultRecordType, currentHoverIndex as number);
	                if (selectedRowKeys.includes(currentHoverKey)) {
	                    this.hoverContentClass = classnames({
	                        [`${prefix}-row-hover`]: true,
	                        [`${clsPrefix}-hovercontent-selected`]: syncHover
	                    })
	                } else {
	                    this.hoverContentClass = classnames({
	                        [`${prefix}-row-hover`]: true,
	                        [`${clsPrefix}-hovercontent-hover`]: syncHover,
	                    })
	                }
	            }
	        }
	    }
	}

	componentDidUpdate(prevProps:TableProps<DefaultRecordType>) {
	    // todo: IE 大数据渲染，行高不固定，且设置了 heightConsistent={true} 时，滚动加载操作会导致 ie11 浏览器崩溃
	    // https://github.com/tinper-bee/bee-table/commit/bd2092cdbaad236ff89477304e58dea93325bf09
	    let {useFixedHeader} = this.props;
	    if (this.columnManager.isAnyColumnsFixed()) {
	        debounce(this.syncFixedTableRowHeight(), 200, false);// 同步固定列内容行的高度
	    }
	    if (useFixedHeader) {// 固定列头存在则执行head和body的宽度
	        debounce(this.syncFixedTableScrollWidth(), 200, false);// 同步固定列的滚动宽度
	    }

	    // 适应模态框中表格、以及父容器宽度变化的情况
	    if (typeof (this.state.scroll && this.state.scroll.x) !== 'number' && (this.contentTable as HTMLElement).getBoundingClientRect().width !== this.contentDomWidth && this.firstDid) {
	        this.computeTableWidth();
	        this.firstDid = false;// 避免重复update
	    }
	    if (this.scrollTop > -1) {
	        this.fixedLeftBodyInner && (this.fixedLeftBodyInner.scrollTop = this.scrollTop);
	        this.fixedRightBodyInner && (this.fixedRightBodyInner.scrollTop = this.scrollTop);
	        this.bodyTable && (this.bodyTable.scrollTop = this.scrollTop);
	        this.scrollTop = -1;
	    }
	    // 当表格没有数据时，重置滚动条位置，造成grid里面的表头列无法操作
	    // if (prevProps.data.length === 0  || this.props.data.length === 0 ) {
	    //   this.resetScrollX();
	    // }
	    // 当懒加载手动设置的scroll.y发生变化时，滚动条回到顶部
	    const prevScrollY = (prevProps.scroll && prevProps.scroll.y) as number;
	    const currentScrollY = (this.props.scroll && this.props.scroll.y) as number;
	    if (prevScrollY && currentScrollY && (prevScrollY !== currentScrollY) && this.props.lazyLoad && !this.props.ignoreScrollYChange) {
	        this.bodyTable && (this.bodyTable.scrollTop = 0)
	    } else if (this.props.ignoreScrollYChange && currentScrollY && prevScrollY) {
	        if (prevScrollY !== currentScrollY) {
	            this.scrollYChanged = true
	            const bodyScrollTop = this.bodyTable && this.bodyTable.scrollTop
	            if (bodyScrollTop === 0) { // 在顶部的时候，滚动条不用动
	                this.bodyTable && (this.bodyTable.scrollTop = 0);
	            } else {
	                const distance = (bodyScrollTop as number) + currentScrollY - prevScrollY;
	                if (distance < 0) {
	                    this.bodyTable && (this.bodyTable.scrollTop = 0);
	                } else {
	                    const {scrollHeight, scrollTop} = this.bodyTable as HTMLElement
	                    const bottomDistance = Math.abs(scrollHeight - scrollTop - prevScrollY) // 在最底部的时候也不用滚动滚动条
	                    if (bottomDistance < 5) { // 有些dom计算不是十分精确，设置一个值来缓冲一下
	                        this.bodyTable && (this.bodyTable.scrollTop = scrollTop + prevScrollY - currentScrollY)
	                    } else {
	                        this.bodyTable && (this.bodyTable.scrollTop = distance);
	                    }
	                }
	            }
	        } else if (this.scrollYChanged) {
	            this.bodyTable && (this.bodyTable.scrollTop += 1)
	            this.scrollYChanged = false
	        }
	    }
	    // 是否传入 scroll中的y属性，如果传入判断是否是整数，如果是则进行比较 。bodyTable 的clientHeight进行判断
	    // this.isShowScrollY();
	    // gx为了解决底部滚动条显示的问题
	    // if (this.bodyTable) {
	    //   const currentOverflowX = window.getComputedStyle(this.bodyTable).overflowX;
	    //   if (this.props.scroll.x && currentOverflowX !== 'scroll') {
	    //     // 此处应该对比一下实际的
	    //     if (this.computeWidth > this.contentDomWidth) {
	    //       this.bodyTable.style.overflowX = 'scroll';
	    //     }
	    //   }
	    // }
	    // let scrollContainerWidth = window.getComputedStyle(this.bodyTableOuter.querySelector('.scroll-container')).width; // scroll-container层元素的宽度
	    // let scrollContainerTableWidth =  this.bodyTableOuter.querySelector('.table-bordered').style.width; // scroll-container内层table元素的宽度
	    // // 有左右固定列时，scroll-container因为有竖直滚动条，使得scroll-container实际宽度（不包括滚动条的宽度）小于内部table宽度出现水平方向滚动条，导致滚动到底部不对齐
	    // if ((parseFloat(scrollContainerWidth) >= parseFloat(scrollContainerTableWidth)) && (this.columnManager.leftLeafColumns().length > 0 || this.columnManager.rightLeafColumns().length > 0)) {
	    //   this.bodyTable.style.overflowX = 'hidden';
	    // } else {
	    //   this.bodyTable.style.overflowX = 'auto';
	    // }
	    // if (this.bodyTableOuter) { // 隐藏几个不需要真正滚动的父元素的滚动条
	    //   this.bodyTableOuter.style.overflowY = 'hidden'
	    // }
	    // if (this.fixedColumnsBodyLeftOuter) {
	    //   this.fixedColumnsBodyLeftOuter.style.overflowY = 'hidden'
	    // }
	    // if (this.fixedColumnsBodyRightOuter) {
	    //   this.fixedColumnsBodyRightOuter.style.overflowY = 'hidden'
	    // }
	    // 解决初始化table渲染在dom树上但是不显示this.scrollbarWidth = 0的问题
	    if (!this.scrollbarWidth) {
	        this.scrollbarWidth = measureScrollbar(`div.${this.props.clsPrefix}[data-for-table='${this.tableUid}']`)
	    }
	}

	componentWillUnmount() {
	    // 移除绑定事件,避免内存泄漏
	    this.contentTable = null;
	    EventUtil.removeHandler(this.contentTable, 'keydown', this.onKeyDown);
	    EventUtil.removeHandler(this.contentTable, 'focus', this.onFocus);
	}

	scrollColumnFun = (props: TableProps) => {
	    let { currentScrollColumn } = props;
	    let columnsWidth = this.columnManager.centerColumns() as DefaultRecordType[];
	    columnsWidth.forEach((col:ColumnType<DefaultRecordType>) => {
	        // 如果列显示
	        if ((col.ifshow || col.isShow) && this.contentWidth) {
	            let width = col.width;
	            if (typeof (width) == 'string' && width.includes('%')) {
	                col.width = this.contentWidth * parseInt(col.width + '') / 100;
	            } else {
	                col.width = parseInt(col.width + '');
	            }
	        }
	    })
	    this.currentScrollColumnIndex = columnsWidth.findIndex((col: ColumnType) => col.key === currentScrollColumn);
	    if (this.currentScrollColumnIndex < 0) return;
	    let offsetWidth = 0;
	    columnsWidth.slice(0, this.currentScrollColumnIndex).forEach((col: ColumnType, _index: number) => {
	        if (col.key !== currentScrollColumn) {
	            offsetWidth += col.width as number;
	        }
	    })
	    setTimeout(() => {
	        if (this.headTable) {
	            this.headTable.scrollLeft = offsetWidth;
	        }
	        if (this.bodyTable) {
	            this.bodyTable.scrollLeft = offsetWidth;
	        }
	    }, 300)
	}

	getHeaderHeight = () => {
	    const headCenterTableDom = this.headTable && this.headTable.querySelector('table');
	    const headLeftTableDom = this.leftHeadTable && this.leftHeadTable.querySelector('table');
	    const headRightTableDom = this.rightHeadTable && this.rightHeadTable.querySelector('table');
	    const priorityHeight = this.state.cssRowHeaderHeight;
	    // 计算出左中右三个表头的最大高度值
	    let maxHeight = Math.ceil(Math.max( // 注意：不能使用getBoundingClientRect().height在ie下会出现小数点导致高度自动增长的问题
	        headLeftTableDom ? headLeftTableDom.clientHeight : 0,
	        headRightTableDom ? headRightTableDom.clientHeight : 0,
	        headCenterTableDom ? headCenterTableDom.clientHeight : 0,
	        priorityHeight || 0
	    ));
	    return maxHeight
	}

	resize = () => {
	    window.requestAnimationFrame(() => {
	        let debounceFunc = () => {
	            this.syncFixedTableRowHeight();
	            this.computeTableWidth();
	            typeof this.props.onResize == 'function' && this.props.onResize();
	        };
	        debounce(debounceFunc(), 150);
	        let renderFlag = this.state.renderFlag;
	        this.setState({
	            renderFlag: !renderFlag
	        });
	    })
	}
	/*
  getTableUID =()=>{
    let uid = "_table_uid_"+new Date().getTime();
    this.tableUid = uid;
    let div = document.createElement("div");
    div.className = "u-table-drag-hidden-cont";
    div.id = uid;
    this.contentTable.appendChild(div);
  }
   */
	// 计算表格宽度 --- 这块有必要？待确认 待废除 zzj
	computeTableWidth = () => {
	    let {expandIconAsCell, showExpandColumn} = this.props;
	    // 如果用户传了scroll.x按用户传的为主
	    let setWidthParam = this.state.scroll && this.state.scroll.x;
	    if (this.contentTable) {
	        if (typeof (setWidthParam) == 'number') {
	            let numSetWidthParam = parseInt(setWidthParam + '');
	            this.contentWidth = numSetWidthParam;
	        } else {
	            // this.preContentDomWidth = this.contentDomWidth;
	            // 计算总表格宽度、根据表格宽度和各列的宽度和比较，重置最后一列
	            this.contentDomWidth = (this.contentTable as HTMLElement).getBoundingClientRect().width;// 表格容器宽度

	            this.contentWidth = this.contentDomWidth;// 默认与容器宽度一样

	        }
	        const computeObj = this.columnManager.getColumnWidth(this.contentWidth);
	        const expandColWidth = expandIconAsCell && showExpandColumn ? (this.props.expandIconCellWidth || expandIconCellWidth) : 0;
	        let lastShowIndex = computeObj.lastShowIndex;
	        this.computeWidth = computeObj.computeWidth + expandColWidth;

	        this.domWidthDiff = this.contentDomWidth - this.computeWidth;
	        if (typeof (setWidthParam) == 'string' && setWidthParam.indexOf('%')) {
	            this.contentWidth = this.contentWidth * parseInt(setWidthParam) / 100;
	            this.domWidthDiff = this.contentDomWidth - this.contentWidth;
	        }

	        if (this.computeWidth < this.contentWidth) {
	            let contentWidthDiff = this.scrollbarWidth ? this.contentWidth - this.computeWidth - this.scrollbarWidth : this.contentWidth - this.computeWidth;
	            // bordered的表格需要减去边框的差值1
	            if (this.props.bordered) {
	                contentWidthDiff = contentWidthDiff - 1;
	            }
	            this.setState({contentWidthDiff, lastShowIndex});
	        } else {
	            this.contentWidth = this.computeWidth;
	            this.setState({contentWidthDiff: 0, lastShowIndex});// 重新渲染，为了显示滚动条
	        }
	    }
	}

	// 同步固定列情况下部分区域滚动条出现引起的错位问题
	syncFixedTableScrollWidth = () => {
	    const {clsPrefix, fillSpace} = this.props;
	    let { scroll = {} } = this.state;
	    let tableDom = this.contentTable as HTMLElement;
	    if (tableDom) {
	        let tableContentDom = tableDom.querySelector(`.${clsPrefix}-content`);
	        let tableFixedRight = tableDom.querySelector(`.${clsPrefix}-fixed-right`);
	        let centerBodyDom = tableDom.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-body`) as HTMLElement;
	        let centerHeadDom = tableDom.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-header`) as HTMLElement;// 固定列头的情况下
	        if (!centerHeadDom) centerHeadDom = tableDom.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-thead`) as HTMLElement;// 未固定列头的情况下
	        // 注意精准匹配，以确保行展开表格嵌套表格时正确匹配
	        let centerHeadTableDom = tableDom.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-header > table[data-for-table='${this.tableUid}']`) as HTMLElement;
	        let centerBodyTableDom = tableDom.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-body > table[data-for-table='${this.tableUid}']`) as HTMLElement;
	        if (!centerHeadTableDom || !centerBodyTableDom) return;
	        let bodyInnerDoms = tableDom.querySelectorAll(`.${clsPrefix}-body-outer .${clsPrefix}-body-inner`);
	        // if(!this.scrollbarWidth)this.scrollbarWidth=measureScrollbar();
	        let scrollbarWidth = this.scrollbarWidth;
	        let hasCenterScrollY = centerBodyTableDom.getBoundingClientRect().height > centerBodyDom.getBoundingClientRect().height;// 中间区域是否存在垂直滚动条
	        // let hasCenterScrollX = centerBodyTableDom.getBoundingClientRect().width>centerBodyDom.getBoundingClientRect().width?true:false;//中间区域存在水平滚动条
	        let noDataDom = tableDom.querySelector(`.${clsPrefix}-content-inner > .${clsPrefix}-placeholder[data-for-table='${this.tableUid}']`) as HTMLElement;
	        // let hasCenterScrollX = centerBodyDom.scrollWidth > (centerBodyDom.clientWidth + 1);// 中间区域存在水平滚动条
	        let hasCenterScrollX = noDataDom ? centerHeadDom.scrollWidth > (centerHeadDom.clientWidth + 1) : centerBodyDom.scrollWidth > (centerBodyDom.clientWidth + 1);// 中间区域存在水平滚动条
	        // let noDataDomHeight: number = 0;
	        // if (Array.isArray(data) && data.length == 0 && this.changeEmpty) {
	        //     let height = `${noDataDom.getBoundingClientRect().height}`;
	        //     if (bodyStyle.hasOwnProperty('height') || bodyStyle.hasOwnProperty('minHeight')) {
	        //         height = `${bodyStyle.height || bodyStyle.minHeight}`
	        //     }
	        //     let cssHeight = this.emptyFillHeight ? `${this.emptyFillHeight}px` : height;
	        //     let realHeight = ((scroll && scroll.y) || cssHeight) + ''
	        //     noDataDomHeight = parseFloat(realHeight);
	        // }
	        // let centerScrollX = centerBodyTableDom.clientWidth > centerBodyDom.scrollWidth;
	        // 解决存在右侧固定列,中间区域垂直滚动条需要隐藏显示的问题
	        if (hasCenterScrollY && this.columnManager.isAnyColumnsRightFixed()) {
	            // 非Chrome内核浏览器中间区域会出现多余垂直滚动条需要隐藏
	            if (browserInfo.browserType == 'Chrome') {
	                centerBodyDom.style.marginRight = '0';
	            } else {
	                centerBodyDom.style.marginRight = (-scrollbarWidth) + "px";
	            }
	            if (browserInfo.osType == 'Mac' && browserInfo.browserType == 'FF') {// 解决mac的ff下右侧固定列存在，中间区域右侧被遮挡的问题
	                centerBodyTableDom.style.paddingRight = scrollbarWidth + "px";
	            }
	        } else {
	            centerBodyDom.style.marginRight = '0';
	        }
	        if (centerHeadDom) centerHeadDom.style.marginRight = centerBodyDom.style.marginRight;
	        // 解决中间区域存在水平滚动条，左右固定区域无法跟其对齐的问题
	        if (bodyInnerDoms && bodyInnerDoms.length) {
	            [].forEach.call(bodyInnerDoms, (bodyInnerDom: HTMLElement) => {
	                if (hasCenterScrollX) {
	                    if (browserInfo.browserType == 'Chrome') {// mac下验证
	                        if (hasCenterScrollX) {
	                            bodyInnerDom.style.overflowX = 'scroll';
	                        } else {
	                            bodyInnerDom.style.overflowX = 'hidden';
	                        }
	                    } else {
	                        if (browserInfo.osType == 'Win' && browserInfo.browserType == 'FF') {
	                            bodyInnerDom.style.overflowX = 'hidden';// win的firefox下，中间x滚动出现时，左右固定列x滚动条隐藏通过paddingBottom填充占位
	                        } else {
	                            bodyInnerDom.style.overflowX = 'scroll';// 确保中间x滚动出现时，左右固定列x滚动条正确显示占位
	                        }
	                    }
	                    // bodyInnerDom.style.paddingBottom = browserInfo.browserType=='Chrome'?0:`${scrollbarWidth}px`;//chrome下左右固定列底部不需要填充占位,firefox需要占位，
	                    if (browserInfo.osType == 'Win' && browserInfo.browserType == 'FF') {
	                        bodyInnerDom.style.paddingBottom = `${scrollbarWidth}px`;// win的firefox不需显示x滚动条但需要填充占位
	                    } else {
	                        bodyInnerDom.style.paddingBottom = '0';// firefox升级89.0.2后不需要占位了
	                    }

	                } else {
	                    bodyInnerDom.style.overflowX = 'hidden';// 确保中间x滚动不出现时，左右固定列x滚动条不显示
	                    bodyInnerDom.style.paddingBottom = '0';
	                }
	            });
	        }
	        // 解决中间存在水平滚动条头部区域无法对齐的问题
	        if (centerHeadTableDom) {
	            let paddingWidth = 0;
	            if (hasCenterScrollY && hasCenterScrollX || hasCenterScrollY && !tableFixedRight) {
	                paddingWidth = paddingWidth + scrollbarWidth;
	            }
	            centerHeadTableDom.style.paddingRight = `${paddingWidth}px`;
	        }
	        // 为表格追加是否存在滚动条的样式标识
	        // fillSpace(考虑border情况) > scroll.y > bodyStyle （谷歌/火狐/win/Mac） 滚动条情况
	        // 不要改动无数据dom的样式，fillSpace下谷歌浏览器存在滚动条会隐藏滚动条
	        if (tableContentDom) {
	            if (hasCenterScrollX) { // 存在横向滚动条
	                if (!tableContentDom.classList.contains('has-scroll-x')) tableContentDom.classList.add('has-scroll-x');
	                if (noDataDom) {
	                    let noDataDomHeight = noDataDom.getBoundingClientRect().height;
	                    if (!fillSpace) { // 无填充
	                        noDataDom.style.bottom = `${this.scrollbarWidth}px`
	                        centerBodyDom.style.height = `${noDataDomHeight + this.scrollbarWidth}px`;
	                        if (scroll && scroll.y) {
	                            centerBodyDom.style.maxHeight = `${noDataDomHeight + this.scrollbarWidth}px`;
	                        }
	                    } else {
	                        noDataDom.style.bottom = `0px`
	                        centerBodyDom.style.height = `${noDataDomHeight}px`;
	                    }

	                    // mac火狐浏览器要滚动需要给子dom加高度（centerBodyTableDom）
	                    if (browserInfo.osType == 'Mac' && browserInfo.browserType == 'FF') {
	                        centerBodyTableDom.style.height = centerBodyDom.style.height;
	                    }

	                    if (browserInfo.osType == 'Win' && browserInfo.browserType == 'FF') { // 解决无数据情况下win下FF的无滚动条的问题
	                        centerBodyTableDom.style.height = `${noDataDomHeight + this.scrollbarWidth}px`;
	                    }
	                } else {
	                    if (browserInfo.osType == 'Win' && browserInfo.browserType == 'FF') { // 解决无数据情况下win下FF的无滚动条的问题
	                        centerBodyTableDom.style.height = `auto`;
	                    }
	                }
	            } else {
	                tableContentDom.classList.remove('has-scroll-x');
	                if (noDataDom) {
	                    let noDataDomHeight = noDataDom.getBoundingClientRect().height;
	                    if (!fillSpace) { // 无填充
	                        noDataDom.style.bottom = `0px`
	                        centerBodyDom.style.height = `${noDataDomHeight}px`;
	                        if (scroll && scroll.y) {
	                            centerBodyDom.style.maxHeight = `${noDataDomHeight}px`;
	                        }
	                    } else {
	                        noDataDom.style.bottom = `0px`
	                        centerBodyDom.style.height = `${noDataDomHeight}px`;
	                    }

	                    if (browserInfo.osType == 'Win' && browserInfo.browserType == 'FF') { // 解决无数据情况下win下FF的无滚动条的问题
	                        centerBodyTableDom.style.height = `${noDataDomHeight}px`;
	                    }
	                } else {
	                    if (browserInfo.osType == 'Win' && browserInfo.browserType == 'FF') { // 解决无数据情况下win下FF的无滚动条的问题
	                        centerBodyTableDom.style.height = `auto`;
	                    }
	                }
	            }
	            if (hasCenterScrollY) {
	                if (!tableContentDom.classList.contains('has-scroll-y')) tableContentDom.classList.add('has-scroll-y');
	            } else {
	                tableContentDom.classList.remove('has-scroll-y');
	            }
	            // 中间区域有垂直滚动条
	            if (hasCenterScrollY) {
	                if (this.headTable) {// 中间区域有垂直滚动条，则头部也需要显示头部滚动条
	                    this.headTable.style.overflowY = 'scroll';
	                    if (this.columnManager.isAnyColumnsRightFixed()) {
	                        // 右侧固定列存在时需要头部Y滚动条占位
	                    } else {
	                        if (browserInfo.osType == 'Win' && browserInfo.browserType == 'FF') { // 解决win下FF的头部右上角多于滚动条显示问题
	                            this.headTable.style.overflowY = 'hidden';
	                            this.headTable.style.paddingRight = `${scrollbarWidth}px`;
	                        }
	                    }
	                }
	            } else {
	                if (this.headTable) {
	                    this.headTable.style.overflowY = 'hidden';
	                    if (browserInfo.osType == 'Win' && browserInfo.browserType == 'FF') { // 解决win下FF的头部右上角于滚动条占位显示问题
	                        this.headTable.style.paddingRight = `0px`
	                    }
	                }// 中间区域无垂直滚动条，则头部也不需要显示头部滚动条
	            }
	        }
	    }

	}

	onExpandedRowsChange = (expandedRowKeys: Key[]) => {
	    const { onExpandedRowsChange } = this.props;
	    if (!this.props.expandedRowKeys) {
	        this.setState({expandedRowKeys});
	    }
	    onExpandedRowsChange && onExpandedRowsChange(expandedRowKeys);
	}

	onExpanded = (expanded: boolean, record: DefaultRecordType, index: number, e:React.MouseEvent<HTMLElement>) => {
	    const { onExpand } = this.props;
	    if (e) {
	        e.preventDefault();
	        e.stopPropagation();
	    }
	    const info = this.findExpandedRow(record, index);
	    if (typeof info !== 'undefined' && !expanded) {
	        this.onRowDestroy(record, index, true);
	    } else if (!info && expanded) {
	        const expandedRows = this.getExpandedRows().concat();
	        expandedRows.push(this.getRowKey(record, index));
	        this.onExpandedRowsChange(expandedRows);
	    }
	    onExpand && onExpand(expanded, record, index);
	}

	onRowDestroy = (record: DefaultRecordType, rowIndex: number, isExpandOperation?: boolean) => {
	    const expandedRows = this.getExpandedRows().concat();
	    const rowKey = this.getRowKey(record, rowIndex);
	    let index = -1;
	    expandedRows.forEach((r, i) => {
	        if (r === rowKey) {
	            index = i;
	        }
	    });
	    if (index !== -1) {
	        expandedRows.splice(index, 1);
	    }
	    //
	    if (this.currentHoverKey == rowKey && this.hoverDom) {
	        this.hoverDom.style.display = 'none';
	    }
	    // todo:如果是TableRow组件卸载触发的该方法，需要加判断，解决懒加载时，持续触发onExpandedRowsChange的问题
	    if (isExpandOperation) {
	        this.onExpandedRowsChange(expandedRows);
	    } else {
	        const info = this.findExpandedRow(record, index);
	        if (typeof info === 'undefined') {
	            this.onExpandedRowsChange(expandedRows);
	        }
	    }
	}

	getRowKey = (record: DefaultRecordType, index: number) => {
	    return getValueByRowKey(this.props.rowKey, record, index);
	}

	getExpandedRows = () => {
	    return this.props.expandedRowKeys || this.state.expandedRowKeys || [];
	}

	onExpandedAll = (expanded: boolean) => {
	    let { onExpandAll, expandedRowKeys } = this.props
	    let innerExpandedRowKeys = [];
	    if (expanded) {
	        innerExpandedRowKeys = []
	    } else {
	        let rows = [...(this.props.data || [])];
	        for (let i = 0; i < rows.length; i++) {
	            const row = rows[i];
	            innerExpandedRowKeys.push(this.getRowKey(row, i));
	            rows = rows.concat(row[this.props.childrenColumnName] || []);
	        }
	    }
	    if (!expandedRowKeys || !Array.isArray(expandedRowKeys)) {
	        this.setState({
	            expandedRowKeys: innerExpandedRowKeys
	        })
	    }
	    if (onExpandAll) {
	        onExpandAll(expanded, innerExpandedRowKeys)
	    }
	}

	getHeader = (columns: ColumnsType, fixed: FixedType, leftFixedWidth: number, rightFixedWidth: number) => {
	    const {
	        filterDelay,
	        onFilterChange,
	        onFilterClear,
	        filterable,
	        showHeader,
	        expandIconAsCell,
	        clsPrefix,
	        onDragStart,
	        onDragEnter,
	        onDragOver,
	        onDrop,
	        onDragEnd,
	        draggable,
	        // onMouseDown,
	        // onMouseMove,
	        // onMouseUp,
	        dragborder,
	        // dragborderKey,
	        minColumnWidth,
	        // headerHeight,
	        afterDragColWidth,
	        // headerScroll,
	        bordered,
	        onDropBorder,
	        onDraggingBorder,
	        bodyDisplayInRow,
	        headerEventNoStop,
	        onCopy,
	        onHeaderRow,
	        fieldid,
	        expandIconColumnIndex,
	        childrenColumnName,
	        showExpandColumn
	    } = this.props;
	    let { expandedRowKeys } = this.state
	    let expandedFlag = false
	    if (Array.isArray(expandedRowKeys)) {
	        expandedFlag = expandedRowKeys?.filter(Boolean)?.length !== 0
	    }
	    let columnsChildrenList:ColumnType<DefaultRecordType>[] = []; // 复杂表头拖拽，重新render表头前，将其置空
	    // let columnsChildrenList:Partial<ColumnType<DefaultRecordType>>[] = []; // 复杂表头拖拽，重新render表头前，将其置空
	    const rows = this.getHeaderRows({columns, columnsChildrenList});
	    if (expandIconAsCell && showExpandColumn) {
	        let hasLeftFixed = this.columnManager.isAnyColumnsLeftFixed();
	        if ((hasLeftFixed && fixed == 'left') // 存在左侧固定列则展开图标独立到左侧区域
				|| (!hasLeftFixed && !fixed) // 不存在左侧固定列则展开图标独立到中间区域
	        ) {
	            rows[0].unshift({
	                key: `${prefix}-table-expandIconAsCell`,
	                className: `${clsPrefix}-expand-icon-th`,
	                title: '',
	                rowSpan: rows.length,
	                width: this.props.expandIconCellWidth || expandIconCellWidth
	            });
	            columnsChildrenList.unshift({
	                className: `${prefix}-table-expand-icon-column`,
	                key: "expand-icon"
	            })
	        }
	    }
	    if (fixed) {
	        columnsChildrenList = columnsChildrenList.filter((col) => col.fixed == fixed);// 只获取对应的固定列
	    } else {
	        columnsChildrenList = columnsChildrenList.filter((col) => !col.fixed);// 只获取非固定的列
	    }
	    // const trStyle = headerHeight&&!fixed ? { height: headerHeight } : (fixed ? this.getHeaderRowStyle(columns, rows) : null);
	    const trStyle = this.getHeaderRowStyle(columns, rows);// 确保固定列和非固定列表头行高一致
	    let drop = draggable ? {onDragStart, onDragOver, onDrop, onDragEnd, onDragEnter, draggable} : {};
	    let dragBorder = dragborder ? {
	        onMouseDown: this.onDragBorderMouseDown,
	        // onMouseMove,
	        // onMouseUp,
	        dragborder,
	        // dragborderKey,
	        onDropBorder,
	        onDraggingBorder
	    } : {};

	    const needIndentSpaced = (this.props.data || []).some(record => record[childrenColumnName]);
	    return showHeader ? (
	        <TableHeader
	            {...drop}
	            {...dragBorder}
	            columnManager={this.columnManager}
	            columnsChildrenList={columnsChildrenList}
	            locale={this.props.locale}
	            minColumnWidth={minColumnWidth}
	            contentWidthDiff={!fixed ? this.state.contentWidthDiff : 0}
	            // contentWidth={this.contentWidth}
	            clsPrefix={clsPrefix}
	            rows={rows}
	            contentTable={this.contentTable}
	            rowStyle={trStyle}
	            fixed={fixed}
	            filterable={filterable}
	            onFilterChange={onFilterChange}
	            onFilterClear={onFilterClear}
	            filterDelay={filterDelay}
	            afterDragColWidth={afterDragColWidth}
	            contentDomWidth={this.contentDomWidth}
	            scrollbarWidth={this.scrollbarWidth}
	            // headerScroll={headerScroll}
	            bordered={bordered}
	            tableUid={this.tableUid}
	            leftFixedWidth={leftFixedWidth}
	            rightFixedWidth={rightFixedWidth}
	            bodyDisplayInRow={bodyDisplayInRow}
	            eventNoStop={headerEventNoStop}
	            onCopy={onCopy}
	            fieldid={fieldid}
	            onHeaderRow={onHeaderRow}
	            expandIconColumnIndex={expandIconColumnIndex}
	            onExpandedAll={this.onExpandedAll}
	            headerShowExpandIcon={this.headerShowExpandIcon}
	            needIndentSpaced={needIndentSpaced}
	            expanded={expandedFlag}
	            expandIconAsCell={expandIconAsCell}
	            showExpandColumn={showExpandColumn}
	            showHeaderExpandIcon={this.props.showHeaderExpandIcon}
	            expandableColumnTitle={this.props.expandableColumnTitle}
	        />
	    ) : null;
	}

	getHeaderRows = (options: {columns: ColumnsType, currentRow?: number, rows?: any[], columnsChildrenList: ColumnsType}) => {
	    let {columns, currentRow = 0, rows, columnsChildrenList} = options;
	    const {columnKey} = this.props;
	    // let { contentWidthDiff = 0, lastShowIndex = -1 } = this.state;
	    let filterCol: any[] = [];
	    rows = rows || [];
	    rows[currentRow] = rows[currentRow] || [];
	    // let centerShowColCount = 0;
	    columns.forEach((column: ColumnType<DefaultRecordType>) => {
	        if (!column.key) {
	            // @ts-ignore
	            column.key = column[columnKey as Key];
	        }
	        if (column.rowSpan && rows && rows.length < column.rowSpan) {
	            while (rows.length < column.rowSpan) {
	                rows.push([]);
	            }
	        }
	        let width = column.width;
	        if (typeof (width) == 'string' && width.indexOf('%') > -1 && this.contentWidth) {
	            width = Math.ceil(this.contentWidth * parseInt(width) / 100);
	        } else if (width) {
	            width = parseInt(width + '');
	        }
	        // if (!column.fixed && column.ifshow) {
	        //   centerShowColCount++;//非固定列显示的个数
	        //   if(lastShowIndex+1 == centerShowColCount && width){//对最后一列进行补全宽度
	        //     width = width + contentWidthDiff;
	        //   }
	        // }
	        const cell:DefaultRecordType = {
	            key: column.key,
	            className: column.className || '',
	            children: column.title,
	            innerHeaderIcon: column.innerHeaderIcon,
	            drgHover: column.drgHover,
	            fixed: column.fixed,
	            width: width,
	            dataIndex: column.dataIndex,
	            textAlign: column.textAlign,
	            titleAlign: column.titleAlign, // 标题水平对齐方式
	            required: column.required, // 标题是否展示必填标志
	            dragborder: column.dragborder, // 此列是否可拖动
	            fieldid: column.fieldid
	        };
	        if (column.onHeadCellClick) {
	            cell.onClick = column.onHeadCellClick;
	        }
	        if (column.children) {
	            this.getHeaderRows({columns: column.children as ColumnType<DefaultRecordType>[], currentRow: currentRow + 1, rows, columnsChildrenList});
	        } else {
	            columnsChildrenList && columnsChildrenList.push(column); // 复杂表头拖拽，所有叶子节点
	        }
	        if ('colSpan' in column) {
	            cell.colSpan = column.colSpan;
	        }
	        if ('rowSpan' in column) {
	            cell.rowSpan = column.rowSpan;
	        }
	        if (cell.colSpan !== 0 && rows) {
	            rows[currentRow].push(cell);
	        }
	        // onHeaderCell
	        if (column.onHeaderCell && typeof column.onHeaderCell === 'function') {
	            cell.onHeaderCell = column.onHeaderCell;
	        }
	        // 判断是否启用过滤
	        if (this.props.filterable) {
	            // 组装Filter需要的Col
	            filterCol.push({
	                key: column.key,
	                children: "过滤渲染",
	                width: column.width,
	                fixed: column.fixed, // fixed
	                filtertype: column.filterType, // 下拉的类型 包括['text','dropdown','date','daterange','number']
	                dataIndex: column.dataIndex, // field
	                datasource: this.props.data || [], // 需要单独拿到数据处理
	                format: column.format, // 设置日期的格式
	                filterdropdown: column.filterDropdown, // 是否显示 show hide
	                filterdropdownauto: column.filterDropdownAuto, // 是否自定义数据
	                filterdropdowndata: column.filterDropdownData, // 自定义数据格式
	                filterdropdownfocus: column.filterDropdownFocus, // 焦点触发函数回调
	                filterdropdowntype: column.filterDropdownType, // 下拉的类型分为 String,Number 默认是String
	                filterdropdownincludekeys: column.filterDropdownIncludeKeys, // 下拉条件按照指定的keys去显示
	                filterdropdownoptions: column.filterDropdownOptions,
	                filterinputnumberoptions: column.filterInputNumberOptions// 设置数值框内的详细属性
	            });
	        }
	    });
	    if (this.props.filterable) {
	        rows.push(filterCol);
	    }
	    return rows.filter(row => row.length > 0);
	}

	getExpandedRow = (key:Key, content: JSX.Element, visible: boolean, className: string, fixed?:FixedType) => {
	    const {clsPrefix, expandIconAsCell, onPaste, getCellClassName, showExpandColumn} = this.props;
	    let colCount: number;
	    if (fixed === 'left') {
	        colCount = this.columnManager.leftLeafColumns().length;
	    } else if (fixed === 'right') {
	        colCount = this.columnManager.rightLeafColumns().length;
	    } else {
	        // colCount = this.columnManager.centerColumns().length; // 计算非固定列的个数，fix: 嵌套表格场景，右侧列断开的问题
	        colCount = this.columnManager.centerLeafColumns().length; // 兼容多表头的问腿
	    }
	    let hasLeftFixed = this.columnManager.isAnyColumnsLeftFixed();
	    let expandedRowHeight = (this.state.fixedColumnsExpandedRowsHeight[key]) || 'auto';

	    function contentContainer() {
	        if (content && content.props && content.props.style) {
	            return (
	                <div style={{height: content.props.style.height}}></div>
	            )
	        } else {
	            return ' '
	        }
	    }

	    const columns: ColumnsType = [{
	        key: 'extra-row',
	        render: () => ({
	            props: {
	                colSpan: colCount,
	            },
	            children: !fixed ? content : contentContainer(),
	        }),
	    }];

	    if (expandIconAsCell && showExpandColumn) {
	        if ((hasLeftFixed && fixed == 'left')
				|| (!hasLeftFixed && !fixed)) {
	            columns.unshift({
	                key: 'expand-icon-placeholder',
	                className: 'expand-icon-placeholder',
	                render: () => null,
	            });
	        }
	    }
	    // : TableRow
	    return (
	        <TableRow
	            record={{}}
	            // fixedIndex={undefined}
	            // index={undefined} // 以上属性虚拟必传字段解决下游组件的深层嵌套很多问题（不受影响）
	            tableUid={this.tableUid}
	            onPaste={onPaste}
	            columns={columns}
	            visible={visible}
	            className={className}
	            key={`${key}-extra-row`}
	            clsPrefix={`${clsPrefix}-expanded-row`}
	            indent={1}
	            expandIconAsCell={false}
	            showExpandColumn={showExpandColumn}
	            expandable={false}
	            store={this.store}
	            // dragborderKey={this.props.dragborderKey}
	            rowDraggAble={this.props.rowDraggAble}
	            useDragHandle={this.props.useDragHandle}
	            height={expandedRowHeight}
	            getCellClassName={getCellClassName}
	            onRow={this.props.onRow}
	            selectedRowKeys={this.props.selectedRowKeys}
	            findRowKeys={this.props.findRowKeys}
	            findCurrentRowKey={this.props.findCurrentRowKey}
	            fieldid={this.props.fieldid}
	            locale={this.props.locale}
	            isExpandedRow={true} // 此标记为标记为展开行
	        />
	    );
	}
	// 列宽度拖拽-鼠标按下的事件
	onDragBorderMouseDown = (event:React.MouseEvent<HTMLElement>) => {
	    if (this.contentTable) {
	        this.contentTable.style.cursor = ''
	    }
	    const {minColumnWidth} = this.props;
	    let dragGapDom = Event.getTarget(event);
	    let currentDom = dragGapDom.parentElement;
	    let columnKey = currentDom.getAttribute('data-col-key');
	    let columnFixed = currentDom.getAttribute('data-th-fixed');
	    let columnWidth = currentDom.getAttribute('data-th-width');
	    let columnIndex = currentDom.getAttribute('data-col-index');
	    let currentInfo = {columnKey, columnFixed, columnWidth, columnIndex};

	    let tableRect = (this.contentTable as HTMLElement).getBoundingClientRect();// 表格
	    let dragGapRect = dragGapDom.getBoundingClientRect();// 当前的伸缩label
	    // 向上查找th元素
	    function getParentThElement(element: HTMLElement): HTMLElement | null {
	        let _tagName = element.tagName.toLowerCase();
	        if (element.getAttribute('data-filter-type') === 'filterContext') return null;
	        if (_tagName === 'i') return null;
	        if (_tagName != 'th') {
	            return getParentThElement(element.parentElement as HTMLElement);
	        } else {
	            return element;
	        }
	    }

	    let thDom = getParentThElement(currentDom) as HTMLElement;
	    let resizerDefaultWidth = thDom.getBoundingClientRect().width;
	    let resizerLineHeight = tableRect.height;
	    let resizerLineLeft = dragGapRect.right - tableRect.left - parseInt(dragGapRect.width / 2 + '') - 1;
	    let column = this.columnManager.leafColumns().find((col: ColumnType<DefaultRecordType>) => col.key ? col.key == columnKey : col.dataIndex == columnKey);

	    this.setState({
	        resizerVisible: true,
	        resizerLineHeight,
	        resizerLineLeft,
	        resizerDefaultWidth,
	        resizerMinWidth: column.minWidth || minColumnWidth,
	        dataSource: currentInfo,
	    });
	    this.resizerLine && this.resizerLine.start(event);
	}

	// 列宽度拖拽-鼠标松开的事件
	onDragBorderMouseUp = (event:React.MouseEvent<HTMLElement>, moveX: number, info?: DropDataSourceType) => {
	    if (this.contentTable) {
	        this.contentTable.style.cursor = ''
	    }
	    const {minColumnWidth = 80, onDropBorder} = this.props;
	    // let target = Event.getTarget(event);
	    let {columnKey, columnWidth} = info as DropDataSourceType;
	    let column = this.columnManager.leafColumns().find((col: ColumnType<DefaultRecordType>) => col.key ? col.key == columnKey : col.dataIndex == columnKey);
	    let oldWidth = this.state.defaultColumnWidth;
	    // 原宽度
	    if (typeof (column.width) == 'string' && column.width.indexOf('%') > -1) {// 百分比情况
	        oldWidth = parseInt(columnWidth + '');
	    } else if (column.width) {// 非百分比情况
	        oldWidth = parseInt(column.width);
	    }
	    let newWidth = oldWidth + moveX;// 拖动后的宽度
	    newWidth = newWidth < minColumnWidth ? minColumnWidth : newWidth;// 限制最小宽度
	    this.columnManager.clearCache();// 注意：先清除缓存
	    let changeColumn = this.columnManager.findColumn(column.key || column.dataIndex);
	    if (!changeColumn) {
	        // console.error('拖拽列宽度未找到列定义：' + (column.key || column.dataIndex), column);
	        return;
	    }
	    changeColumn.width = newWidth;
	    this.computeTableWidth();// 注意：重新计算需要补充的列宽度
	    // let newWidthDiff = newWidth-oldWidth;//计算新旧宽度的实际变化距离, 负数为缩小，正数为放大
	    // console.log("AAA---onDragBorderMouseUp-->最终距离"+moveX+'---表宽度--'+this.contentWidth+'---实际变化距离---'+newWidthDiff,this.columnManager.columns)
	    this.setState({
	        resizerVisible: false,
	        fixedColumnsHeadRowsHeight: null,
	        fixedColumnsBodyRowsHeight: [],
	        fixedColumnsExpandedRowsHeight: {}, // 扩展行的高度
	    });
	    typeof onDropBorder == 'function' && onDropBorder(event, newWidth, column, this.columnManager.columns);
	}
	// 列宽度拖拽-取消事件
	onDragBorderCancel = () => {
	    if (this.contentTable) {
	        this.contentTable.style.cursor = ''
	    }
	    this.setState({resizerVisible: false});
	}
	// 列宽度拖拽-鼠标移动的事件
	onDragBorderMouseMove = (event:React.MouseEvent<HTMLElement>, moveX: number, info?: DropDataSourceType) => {
	    if (this.contentTable) {
	        this.contentTable.style.cursor = 'col-resize'
	    }
	    const {minColumnWidth = 80, onDraggingBorder} = this.props;
	    let {columnKey, columnWidth} = info as DropDataSourceType;
	    let column = this.columnManager.leafColumns().find((col:ColumnType<DefaultRecordType>) => col.key ? col.key == columnKey : col.dataIndex == columnKey);
	    let oldWidth = this.state.defaultColumnWidth;// 原宽度
	    // 原宽度
	    if (typeof (column.width) == 'string' && column.width.indexOf('%') > -1) {// 百分比情况
	        oldWidth = parseInt(columnWidth + '');
	    } else if (column.width) {// 非百分比情况
	        oldWidth = parseInt(column.width);
	    }
	    let newWidth = oldWidth + moveX;// 拖动后的宽度
	    newWidth = newWidth < minColumnWidth ? minColumnWidth : newWidth;// 限制最小宽度
	    typeof onDraggingBorder == 'function' && onDraggingBorder(event, newWidth, column, this.columnManager.columns);
	    // console.log("AAA---onDragBorderMouseMove-->移动距离"+moveX)
	}
	/**
	 * 行拖拽开始时触发
	 * @param currentKey 当前拖拽目标的key
	 */
	_onRowDragStart = (options: DefaultRecordType) => {
	    let {dragStartKey} = options;
	    let {lazyLoad, onRowDragStart} = this.props;
	    if (lazyLoad) {
	        onRowDragStart && onRowDragStart(options);// 直接传递给bigDataX触发
	    } else {
	        let {data} = this.state, currentIndex, record;
	        data.forEach((da, i) => {
	            // tr 的唯一标识通过 data.key 或 rowKey 两种方式传进来
	            let trKey = da.key ? da.key : this.getRowKey(da, i);
	            if (trKey == dragStartKey) {
	                currentIndex = i;
	                record = da;
	            }
	        });
	        this.props.onDragRowStart && this.props.onDragRowStart(record, currentIndex);
	    }
	}

	_onRowDrop = (options: DefaultRecordType) => {
	    let {dragEnterKey} = options;
	    let {lazyLoad, onRowDrop} = this.props;
	    if (lazyLoad) {
	        onRowDrop && onRowDrop(options);// 直接传递给bigDataX触发
	    } else {
	        let {data} = this.state, currentIndex, record;
	        data.forEach((da, i) => {
	            // tr 的唯一标识通过 data.key 或 rowKey 两种方式传进来
	            let trKey = da.key ? da.key : this.getRowKey(da, i);
	            if (trKey == dragEnterKey) {
	                currentIndex = i;
	                record = da;
	            }
	        });
	        this.props.onRowDrop && this.props.onRowDrop(record, currentIndex);
	    }
	}

	/**
	 * 行拖拽结束时触发
	 */
	_onRowDragDrop = (options: DefaultRecordType) => {
	    let {lazyLoad, onRowDragDrop, childrenColumnName = 'children', rowKey} = this.props;
	    const { expandedRowKeys } = this.state;
	    if (lazyLoad) {
	        onRowDragDrop && onRowDragDrop(options);// 直接传递给bigDataX触发
	    } else {
	        let {dragTargetKey, dragTargetIndex, dropTargetKey, dropTargetIndex} = options;
	        let {data} = this.state, record;
	        for (let i = 0; i < data.length; i++) {
	            let da = data[i];
	            // tr 的唯一标识通过 data.key 或 rowKey 两种方式传进来
	            let trKey = da.key ? da.key : this.getRowKey(da, i);
	            if (trKey == dragTargetKey) {
	                record = da;
	                break; // 匹配到后则退出减少性能开销
	            }
	        }
	        // if (dragTargetIndex > -1) {
	        if (dragTargetIndex > -1 && dropTargetKey !== null && dropTargetIndex !== null) {
	            if (this.treeType) { // 树形数据
	                data = arrayTreeMoveTo(data, dragTargetKey, dropTargetKey, childrenColumnName, rowKey, expandedRowKeys);
	            } else {
	                data = arrayMoveTo(data, dragTargetIndex, dropTargetIndex);
	            }
	            this.props.onDropRow && this.props.onDropRow(data, record, dropTargetIndex);
	            this.setState({data});
	        } else {
	            this.props.onDropRow && this.props.onDropRow(data, record, dropTargetIndex);
	        }
	    }
	}

	/**
	 *
	 *
	 * @param {*} data
	 * @param {*} visible
	 * @param {*} indent 层级
	 * @param {*} columns
	 * @param {*} fixed
	 * @param {number} [rootIndex=-1] 祖级节点
	 * @returns
	 * @memberof Table
	 */
	getRowsByData = (data: DefaultRecordType[], visible: boolean, indent: number, columns: ColumnType<DefaultRecordType>[], fixed?: FixedType, rootIndex:number = -1): JSX.Element[] => {
	    const props = this.props;
	    const childrenColumnName = props.childrenColumnName;
	    const expandedRowRender = props.expandedRowRender;
	    const expandRowByClick = props.expandRowByClick;
	    const onPaste = props.onPaste;
	    const anyColumnsFixed = this.columnManager.isAnyColumnsFixed();
	    const hasLeftFixed = this.columnManager.isAnyColumnsLeftFixed();
	    const {fixedColumnsBodyRowsHeight} = this.state;
	    let rst = [];
	    let height = this.props.height || this.state.cssRowHeight;
	    const rowClassName = props.rowClassName;
	    const rowRef = props.rowRef;
	    const expandedRowClassName = props.expandedRowClassName;
	    const needIndentSpaced = (props.data || []).some(record => record[childrenColumnName]);
	    const onRowClick = props.onRowClick;
	    // const onRowClick = this.onRowClick;
	    const onRowDoubleClick = props.onRowDoubleClick;
	    // let priorityHeight = props.height ?? this.state.cssRowHeight;

	    // const expandIconAsCell = fixed !== 'right' ? props.expandIconAsCell : false;
	    const expandIconColumnIndex = props.expandIconColumnIndex
	    if (props.lazyLoad && props.lazyLoad.preHeight && indent == 0) {
	        // console.log("AAA--->lazyLoad--first->"+props.lazyLoad.preHeight);
	        rst.push(
	            <TableRow
	                record={{}}
	                // fixedIndex={undefined}
	                // index={undefined}
	                // indent={undefined} // 以上属性虚拟必传字段解决下游组件的深层嵌套很多问题（不受影响）
	                onPaste={onPaste}
	                height={props.lazyLoad.preHeight}
	                indentSize={props.indentSize}
	                columns={[]}
	                className='table_lazyload_row_first'
	                key={'table_lazyload_row_first'}
	                store={this.store}
	                visible={true}
	                onRow={this.props.onRow}
	                selectedRowKeys={this.props.selectedRowKeys}
	                findRowKeys={this.props.findRowKeys}
	                findCurrentRowKey={this.props.findCurrentRowKey}
	                locale={this.props.locale}
	                fieldid={this.props.fieldid}/>
	        )
	    }
	    let leafColumns;
	    if (fixed === 'left') {
	        leafColumns = this.columnManager.leftLeafColumns();
	    } else if (fixed === 'right') {
	        leafColumns = this.columnManager.rightLeafColumns();
	    } else {
	        // leafColumns = this.columnManager.leafColumns();
	        leafColumns = this.columnManager._leafColumns(columns)
	    }
	    const lazyCurrentIndex = props.lazyLoad && props.lazyLoad.startIndex ? props.lazyLoad.startIndex : 0;
	    const lazyParentIndex = props.lazyLoad && props.lazyLoad.startParentIndex ? props.lazyLoad.startParentIndex : 0;
	    const lazyEndIndex = props.lazyLoad && props.lazyLoad.endIndex ? props.lazyLoad.endIndex : -1;
	    const lazyLoadEnable = (props.lazyLoad && props.lazyLoad.startIndex > -1 && props.lazyLoad.endIndex > -1);
	    for (let i = 0; i < data.length; i++) {
	        let isShowExpandIcon: boolean;
	        const record = data[i];
	        const key = this.getRowKey(record, i);
	        // 兼容 NCC 以前的业务逻辑，支持外部通过 record 中的 isleaf 字段，判断是否为叶子节点
	        // record['_isLeaf'] = typeof record['isleaf'] === 'boolean' ? record['isleaf'] : record['_isLeaf'];
	        if (typeof record.isleaf === 'boolean') {
	            record._isLeaf = record.isleaf; // 如果isleaf存在并且为boolean的情况下才生成_isLeaf，否则无需生成
	        }
	        // _isLeaf 字段是在 bigData 里添加的，只有层级树大数据场景需要该字段
	        // _isLeaf 有三种取值情况：true / false / null。（Table内部字段）
	        const _isLeaf = typeof record._isLeaf === 'boolean' ? record._isLeaf : null;
	        const childrenColumn = _isLeaf ? false : record[childrenColumnName];
	        const isRowExpanded = this.isRowExpanded(record, i);
	        let expandedRowContent: JSX.Element | boolean = false;
	        let expandedContentHeight = 0;
	        // fixedIndex一般是跟index是一个值的，只有是树结构时，会讲子节点的值也累计上
	        let fixedIndex = i;
	        // 判断是否是tree结构
	        if (this.treeType) {
	            fixedIndex = this.treeRowIndex;
	        }
	        if (expandedRowRender && isRowExpanded) {
	            expandedRowContent = expandedRowRender(record, fixedIndex + lazyCurrentIndex, indent) as JSX.Element;
	            expandedContentHeight = parseInt(expandedRowContent.props && expandedRowContent.props.style && expandedRowContent.props.style.height ? expandedRowContent.props.style.height : 0);
	        }
	        // 只有当使用expandedRowRender参数的时候才去识别isHiddenExpandIcon（隐藏行展开的icon）
	        // if (expandedRowRender && typeof props.haveExpandIcon == 'function') {
	        //     isShowExpandIcon = !props.haveExpandIcon(record, i);
	        // }


	        // 最初的haveExpandIcon实际效果和语义话的意思是相反的，为了兼容之前业务，引入新api(showExpandIcon)取代haveExpandIcon，保证新旧api兼容
	        // showExpandIcon替换旧api(haveExpandIcon),新showExpandIcon优先级大于旧haveExpandIcon，新api语义化调整正确，支持布尔类型或函数类型
	        let defaultFn = (record: DefaultRecordType, _i?: number) => ((record[childrenColumnName] || []).length > 0)
	        let showExpandIcon = false;
	        let oldMode = false;
	        if (props.hasOwnProperty('showExpandIcon') && props.showExpandIcon !== undefined) {
	            if (typeof props.showExpandIcon == 'function') {
	                showExpandIcon = props.showExpandIcon(record, i);
	            } else if (typeof props.showExpandIcon == 'boolean') {
	                if (props.showExpandIcon) {
	                    showExpandIcon = record[childrenColumnName] && Array.isArray(record[childrenColumnName])
	                } else {
	                    showExpandIcon = defaultFn(record, i);
	                }
	            }
	        } else if (_isLeaf === false) { // 大数据字段过来
	            showExpandIcon = true;
	        } else {
	            showExpandIcon = defaultFn(record, i);
	        }
	        if (!props.hasOwnProperty('showExpandIcon') || props.showExpandIcon === undefined) { // 未传新api(showExpandIcon)
	            if (expandedRowRender) { // 与旧的保持一致
	                if (props.hasOwnProperty('haveExpandIcon') && typeof props.haveExpandIcon == 'function') {
	                    isShowExpandIcon = !props.haveExpandIcon(record, i);
	                    if (!props.haveExpandIcon(record, i)) {
	                        this.headerShowExpandIcon = !props.haveExpandIcon(record, i) // 确认表格是否是折叠表格，传Header内部添加头部折叠图标
	                    }
	                    oldMode = true
	                } else { // 外部未传haveExpandIcon或者不是function类型，默认全部有展开行icon(兼容旧的) => 旧有的项目有的没有按照文档标注的类型传，传的bool(true)
	                    isShowExpandIcon = true
	                    this.headerShowExpandIcon = true
	                }
	            } else {
	                isShowExpandIcon = showExpandIcon
	                if (showExpandIcon) {
	                    this.headerShowExpandIcon = showExpandIcon
	                }
	            }
	        } else { // 传入新的api
	            isShowExpandIcon = showExpandIcon
	            if (showExpandIcon) {
	                this.headerShowExpandIcon = showExpandIcon
	            }
	        }

	        if (props.bodyDisplayInRow) {// 内容显示不换行，即显示为"..."
	            if (anyColumnsFixed) {// 存在固定列则强制同步行高度，以确保行不会错位
	                height = height ? height : (fixedColumnsBodyRowsHeight as number[])[fixedIndex];
	            } else { // 不存在固定列，则按指定高度呈现行
	                height = height || 40;
	            }
	        } else {// 内容自适应行高
	            if (anyColumnsFixed) {// 存在固定列则强制同步行高度，以确保行不会错位
	                height = (fixedColumnsBodyRowsHeight as number[])[fixedIndex];
	            } else {
	                // 不存在固定列，则按内容高度自行呈现
	            }
	        }

	        // if (props.bodyDisplayInRow && props.height) {
	        //   height = props.height
	        // } else if(fixed || props.heightConsistent) {
	        //   height = fixedColumnsBodyRowsHeight[fixedIndex];
	        // }

	        let className = rowClassName(record, fixedIndex + lazyCurrentIndex, indent);

	        // 合计代码如果是最后一行并且有合计功能并且属于第一层不是某一行数据的子集，最后一行为合计列
	        if (i == data.length - 1 && props.showSum && rootIndex < 0) {
	            className = className + ' sumrow';
	        }

	        let paramRootIndex = rootIndex;
	        // 小于0说明为第一层节点，她的子孙节点要保存自己的根节点
	        if (paramRootIndex < 0) {
	            paramRootIndex = i + lazyParentIndex;
	        }
	        let index = i;
	        if (rootIndex == -1) {
	            index = i + lazyParentIndex
	        }
	        if (lazyLoadEnable && this.treeType && (record.index < lazyCurrentIndex || record.index > lazyEndIndex)) {
	            // 大数据表格下，如果是树表，父节点如果已经不在区域范围则无需渲染dom，解决快速向上滚动父级树节点闪现的问题
	            fixedIndex--;
	            this.treeRowIndex--;
	        } else {
	            rst.push(
	                <TableRow
	                    onPaste={onPaste}
	                    indent={indent}
	                    indentSize={props.indentSize}
	                    needIndentSpaced={needIndentSpaced}
	                    className={`${className}`}
	                    record={record}
	                    hasLeftFixed={hasLeftFixed}
	                    expandIconAsCell={props.expandIconAsCell}
	                    showExpandColumn={props.showExpandColumn}
	                    onDestroy={this.onRowDestroy}
	                    index={index}
	                    visible={visible}
	                    expandRowByClick={expandRowByClick}
	                    onExpand={this.onExpanded}
	                    // expandable={expandedRowRender || ((childrenColumn && childrenColumn.length > 0) ? true : _isLeaf === false)}
	                    expandable={!!expandedRowRender || (childrenColumn ? true : _isLeaf === false)}
	                    expanded={isRowExpanded}
	                    clsPrefix={`${props.clsPrefix}-row`}
	                    childrenColumnName={childrenColumnName}
	                    columns={leafColumns}
	                    expandIconColumnIndex={expandIconColumnIndex}
	                    onRowClick={onRowClick}
	                    onRowDoubleClick={onRowDoubleClick}
	                    height={height}
	                    isShowExpandIcon={isShowExpandIcon}
	                    onHover={this.handleRowHover}
	                    key={"table_row_" + key}
	                    hoverKey={key}
	                    ref={rowRef(record, index, indent)}
	                    store={this.store}
	                    fixed={fixed}
	                    expandedContentHeight={expandedContentHeight}
	                    setRowHeight={props.setRowHeight}
	                    // setRowParentIndex={props.setRowParentIndex} //  追踪逻辑没用？
	                    treeType={!!(childrenColumn || this.treeType)}
	                    fixedIndex={fixedIndex + lazyCurrentIndex}
	                    rootIndex={rootIndex}
	                    syncHover={props.syncHover}
	                    bodyDisplayInRow={props.bodyDisplayInRow}
	                    rowDraggAble={props.rowDraggAble}
	                    useDragHandle={props.useDragHandle}
	                    contentTable={this.contentTable}
	                    tableUid={this.tableUid}
	                    expandedIcon={props.expandedIcon}
	                    collapsedIcon={props.collapsedIcon}
	                    expandIcon={props.expandIcon}
	                    lazyStartIndex={lazyCurrentIndex}
	                    lazyEndIndex={lazyEndIndex}
	                    centerColumnsLength={this.centerColumnsLength}
	                    leftColumnsLength={this.leftColumnsLength}
	                    expandIconCellWidth={this.props.expandIconCellWidth || expandIconCellWidth}
	                    getCellClassName={props.getCellClassName}
	                    onRow={props.onRow}
	                    selectedRowKeys={props.selectedRowKeys}
	                    findRowKeys={props.findRowKeys}
	                    findCurrentRowKey={this.props.findCurrentRowKey}
	                    fieldid={props.fieldid}
	                    locale={props.locale}
	                    oldMode={oldMode}
	                />
	            );
	        }
	        this.treeRowIndex++;
	        const subVisible = visible && isRowExpanded;

	        if (expandedRowContent && isRowExpanded) {
	            rst.push(this.getExpandedRow(
	                key, expandedRowContent, subVisible, expandedRowClassName(record, i, indent), fixed
	            ));
	        }
	        if (childrenColumn) {
	            this.isTreeType = true; // 增加该标志位，为了兼容老版本，不修改以前的 `this.treeType` 的相关逻辑
	            this.treeType = true;// 证明是tree表形式visible = {true}
	            rst = rst.concat(this.getRowsByData(
	                childrenColumn, subVisible, indent + 1, columns, fixed, paramRootIndex
	            ));
	        }
	    }

	    if (props.lazyLoad && props.lazyLoad.sufHeight && indent == 0) {
	        // console.log("AAA--->lazyLoad---last-->"+props.lazyLoad.sufHeight);
	        rst.push(
	            <TableRow
	                record={{}}
	                // fixedIndex={undefined}
	                // index={undefined}
	                // indentSize={undefined}
	                // indent={undefined} // 以上属性虚拟必传字段解决下游组件的深层嵌套很多问题（不受影响）
	                onPaste={onPaste} // containerWidth={this.contentDomWidth} isSuf //滚动loading相关的暂时不用
	                height={props.lazyLoad.sufHeight}
	                key={'table_lazyload_row_end'}
	                columns={[]}
	                className='table_lazyload_row_end'
	                store={this.store}
	                visible={true}
	                onRow={props.onRow}
	                selectedRowKeys={props.selectedRowKeys}
	                findRowKeys={props.findRowKeys}
	                findCurrentRowKey={this.props.findCurrentRowKey}
	                locale={props.locale}
	                fieldid={props.fieldid}/>
	        )
	    }
	    if (!this.isTreeType) {
	        this.treeType = false;
	    }
	    return rst;
	}

	getRows = (columns: DefaultRecordType[], fixed?: FixedType): JSX.Element[] => {
	    // 统计index，只有含有树表结构才有用，因为树表结构时，固定列的索引取值有问题
	    this.treeRowIndex = 0;
	    // 每次遍历 data 前，将this.isTreeType置为 false，若遍历完 data，此变量仍为 false，说明是普通表格
	    this.isTreeType = false;
      	this.treeType = false;
	    let rs = this.getRowsByData(this.state.data, true, 0, columns, fixed);
	    return rs;
	}

	setColumnsWidth = (columns: ColumnType<DefaultRecordType>[], fixed?: FixedType): ColumnType<DefaultRecordType>[] => {
	    let {contentWidthDiff = 0, lastShowIndex = -1} = this.state;
	    let cols: ColumnType<DefaultRecordType>[] = [];
	    columns.forEach((c:ColumnType<DefaultRecordType>, i?: number) => {
	        let width = c.width;
	        if (typeof (width) == 'string' && width.indexOf('%') > -1 && this.contentWidth) {
	            width = Math.floor((this.contentWidth - this.scrollbarWidth) * parseInt(width) / 100);// 向下取整，解决宽度2518px时10列每列10%(四舍五入时252px)的情况下，合计2520px导致出现滚动条的问题
	        } else if (width) {
	            width = parseInt(width + '');
	        }
	        // 中间区域非固定的最后一列自动补充宽度
	        if (!fixed && lastShowIndex == i && width) {
	            width = parseInt(width + '') + (contentWidthDiff < 0 ? 0 : contentWidthDiff);
	        }
	        cols.push({
	            ...c,
	            width
	        })
	    });
	    return cols;
	}

	getColGroup = (_columns?: DefaultRecordType[], fixed?: FixedType) => {
	    let cols = [];
	    let that = this;

	    let {contentWidthDiff = 0, lastShowIndex = -1} = this.state;
	    let {expandIconAsCell, bigColumns, showExpandColumn} = this.props;
	    let hasLeftFixed = this.columnManager.isAnyColumnsLeftFixed();
	    if ((expandIconAsCell && hasLeftFixed && fixed == 'left' && showExpandColumn)
			|| (expandIconAsCell && !hasLeftFixed && !fixed && showExpandColumn)
	    ) {
	        cols.push(
	            <col
	                style={{
	                    minWidth: this.props.expandIconCellWidth || expandIconCellWidth,
	                    width: this.props.expandIconCellWidth || expandIconCellWidth
	                }}
	                className={`${this.props.clsPrefix}-expand-icon-col`}
	                key={`${prefix}-table-expand-icon-col`}
	            />
	        );
	    }
	    let leafColumns: DefaultRecordType[];
	    if (fixed === 'left') {
	        contentWidthDiff = 0;
	        leafColumns = this.columnManager.leftLeafColumns();
	    } else if (fixed === 'right') {
	        contentWidthDiff = 0;
	        leafColumns = this.columnManager.rightLeafColumns();
	    } else {
	        // leafColumns = bigColumns ? this.getBigShowColumns(this.columnManager.centerLeafColumns()) : this.columnManager.centerLeafColumns();
	        leafColumns = bigColumns ? this.columnManager._leafColumns(this.getBigShowColumns(this.columnManager.centerColumns())) : this.columnManager.centerLeafColumns();
	    }
	    cols = cols.concat(leafColumns.map((c:DefaultRecordType, i?: number) => {
	        let fixedClass = '';
	        let width = c.width;
	        if (typeof (width) == 'string' && width.indexOf('%') > -1 && that.contentWidth) {
	            width = Math.floor((that.contentWidth - that.scrollbarWidth) * parseInt(width) / 100);// 向下取整，解决宽度2518px时10列每列10%(四舍五入时252px)的情况下，合计2520px导致出现滚动条的问题
	        } else if (width) {
	            width = parseInt(width);
	        }
	        // 中间区域非固定的最后一列自动补充宽度
	        if (!fixed && lastShowIndex == i && width) {
	            width = width + (contentWidthDiff < 0 ? 0 : contentWidthDiff);
	        }
	        // if (!fixed && c.fixed) {//之前中间区域会渲染固定列dom单不让显示，现在直接不渲染dom了，所以需要了
	        //   fixedClass = ` ${this.props.clsPrefix}-row-fixed-columns-in-body`;
	        // }
	        return <col key={c.key || c.dataIndex} style={{width: width, minWidth: c.width}}
	            className={fixedClass || ''}/>;
	    }));
	    return <colgroup className={`${prefix}-table-colgroup`}>{cols}</colgroup>;
	}

	// renderDragHideTable = () => {
	//   const { columns,clsPrefix, dragborder, dragborderKey } = this.props;
	//   if (!dragborder) return null;
	//   let sum = 0;
	//   return (<div id={`u-table-drag-hide-table-${dragborderKey}`} className={`${clsPrefix}-hiden-drag`} >
	//     {
	//       columns.map((da, i) => {
	//         sum += da.width ? parseInt(da.width) : 0;
	//         return (<div className={`${clsPrefix}-hiden-drag-li`} key={da + "_hiden_" + i} style={{ left: sum + "px" }}></div>);
	//       })
	//     }
	//   </div>);
	// }

	getLeftFixedTable = () => {
	    return this.getTable({
	        columns: this.columnManager.leftColumns(),
	        fixed: 'left',
	    });
	}

	getRightFixedTable = () => {
	    return this.getTable({
	        columns: this.columnManager.rightColumns(),
	        fixed: 'right',
	    });
	}

	getTable = (options:GetTableOptions) => {
	    const {columns, fixed} = options;
	    const {scroll = {}} = this.state;
	    const {
	        clsPrefix,
	        data,
	        bordered,
	        getBodyWrapper,
	        footerScroll,
	        // headerScroll,
	        // hideHeaderScroll = false,
	        expandIconAsCell,
	        bodyClassName,
	        fieldid,
	        bigColumns,
	        showExpandColumn
	    } = this.props;
	    let useFixedHeader = this.props.useFixedHeader; // let变量声明
	    let bodyStyle = {...this.props.bodyStyle} as React.CSSProperties; // 克隆一份
	    const headStyle: React.CSSProperties = {};
	    const innerBodyStyle: React.CSSProperties = {};
	    const leftFixedWidth = this.columnManager.getLeftColumnsWidth(this.contentWidth); // gx + (bordered ? 1 : 0); // 边框table需要把左边的1像素边框加上
	    const rightFixedWidth = this.columnManager.getRightColumnsWidth(this.contentWidth); // gx + (browserInfo.browserType=='IE' ? 16 : 0); // IE右侧固定列会被横竖滚动条影响一些宽度

	    let tableClassName = fixed ? `${clsPrefix}-fixed` : '';

	    if (scroll.x || fixed // || this.contentDomWidth < this.contentWidth  //表格元素的宽度大于容器的宽度也显示滚动条
	    ) {

	        // 没有数据并且含有顶部菜单时
	        // if (data.length == 0 && this.props.headerScroll) {
	        if (data.length == 0) {
	            bodyStyle.overflowX = 'hidden';
	        }
	        if (!footerScroll) {
	            bodyStyle.overflowX = bodyStyle.overflowX || 'auto';
	        }
	    }

	    if (scroll.y) {
	        // maxHeight will make fixed-Table scrolling not working
	        // so we only set maxHeight to body-Table here
	        if (fixed) {// 固定表格
	            // bodyStyle.height = bodyStyle.height || scroll.y;
	            innerBodyStyle.minHeight = bodyStyle.minHeight || scroll.y;
	            innerBodyStyle.maxHeight = bodyStyle.maxHeight || scroll.y;
	            innerBodyStyle.overflowY = bodyStyle.overflowY || 'auto';
	            // gx解决底部滚动条的显示问题
	            // if (this.computeWidth > this.contentDomWidth) {
	            //   innerBodyStyle.overflowX = 'scroll';
	            // } else if (this.contentWidth === this.contentDomWidth) {
	            //   innerBodyStyle.overflowX = 'hidden';
	            // }
	        } else {
	            bodyStyle.maxHeight = bodyStyle.maxHeight || scroll.y;
	        }
	        bodyStyle.overflowY = bodyStyle.overflowY || 'auto';
	        useFixedHeader = true;

	        // Add negative margin bottom for scroll bar overflow bug
	        // const scrollbarWidth = this.scrollbarWidth;
	        // if (scrollbarWidth >= 0) {
	        //   (fixed ? bodyStyle : headStyle).paddingBottom = '0px';
	        //   //显示表头滚动条
	        //   if(headerScroll){
	        //     if(fixed){
	        //
	        //      if(this.domWidthDiff <= 0){
	        //         headStyle.marginBottom = `${scrollbarWidth}px`;
	        //         bodyStyle.marginBottom = `-${scrollbarWidth}px`;
	        //       }else{
	        //         innerBodyStyle.overflowX = 'auto';
	        //       }
	        //     }else{
	        //          //内容少，不用显示滚动条
	        //          if(this.domWidthDiff > 0){
	        //           headStyle.overflowX = 'hidden';
	        //         }
	        //       headStyle.marginBottom = `0px`;
	        //     }
	        //   }else{
	        //     if(fixed){
	        //       if(this.domWidthDiff > 0){
	        //         headStyle.overflow = 'hidden';
	        //         innerBodyStyle.overflowX = 'auto'; //兼容expand场景、子表格含有固定列的场景
	        //       }else{
	        //         // 海龙为了解决固定右侧滚动条Firefox下的现象问题，解决方案不合适，暂时不用，还原
	        //         // if (this.computeWidth > this.contentDomWidth) {
	        //         //   bodyStyle.marginBottom = '-' + scrollbarWidth + 'px';
	        //         //   const userAgent = navigator.userAgent; // 火狐，IE浏览器，固定表格跟随resize事件产生的滚动条隐藏
	        //         //   const isFF = userAgent.indexOf("Firefox") > -1;
	        //         //   const isIE = !!window.ActiveXObject || "ActiveXObject" in window
	        //         //   if (isFF || isIE) {
	        //         //     // innerBodyStyle.overflowX = 'hidden';
	        //         //     delete innerBodyStyle.overflowX
	        //         //   }
	        //         // }
	        //         bodyStyle.marginBottom = `-${scrollbarWidth}px`;
	        //       }
	        //
	        //     }else{
	        //         // // 没有数据时，表头滚动条隐藏问题
	        //         // if(data.length == 0 && this.domWidthDiff < 0){
	        //         //   headStyle.marginBottom = '0px';
	        //         // }else{
	        //         //   headStyle.marginBottom = `-${scrollbarWidth}px`;
	        //         // }
	        //
	        //     }
	        //
	        //   }
	        // }
	    }

	    // if(data.length == 0 && hideHeaderScroll){
	    //   //支持 NCC 需求:表格无数据时，去掉表头滚动条 (https://github.com/iuap-design/tinper-bee/issues/207)
	    //   headStyle.marginBottom = `-${this.scrollbarWidth}px`;
	    // }

	    // ----------------水平滚动条的显示处理-------------
	    // 没有数据时
	    if (data.length == 0) {
	        // if (fixed) {// 固定列头部滚水平动条隐藏
	        //     headStyle.overflowX = 'hidden';
	        // } else {// 中间列头部水平滚动条自动显示
	        //     headStyle.overflowX = 'auto';
	        // }
	        headStyle.overflowX = 'hidden';
	    } else {// 有数据时，头部水平滚动条隐藏
	        headStyle.overflowX = 'hidden';
	    }
	    // 强制固定列和中间列隐藏头部水平滚动条，
	    // 无影响，废弃
	    // if (hideHeaderScroll) {
	    //     headStyle.overflowX = 'hidden'
	    // }

	    // ---------------垂直滚动条的显示处理---------------
	    if (data.length == 0) {
	        bodyStyle.overflowY = 'hidden';
	        innerBodyStyle.overflowY = 'hidden';
	        headStyle.overflowY = 'hidden';
	    } else {
	        bodyStyle.overflowY = bodyStyle.overflowY || 'auto';
	        innerBodyStyle.overflowY = bodyStyle.overflowY;
	        headStyle.overflowY = innerBodyStyle.overflowY;
	    }

	    let headerFieldidAttr = fieldid ? { fieldid: `table-header` } : {}
	    let bodyFieldidAttr = fieldid ? { fieldid: `table-body` } : {}
	    const renderTable = (hasHead: boolean = true, hasBody: boolean = true, options: GetTableOptions) => {
	        const {columns, fixed} = options;
	        const tableStyle: DefaultRecordType = {};
	        if (!fixed && scroll.x) {// 非固定列的中间表格
	            // not set width, then use content fixed width
	            if (scroll.x === true) {
	                tableStyle.tableLayout = 'fixed';
	            } else {
	                // tableStyle.width = this.contentWidth - this.columnManager.getLeftColumnsWidth(this.contentWidth) - this.columnManager.getRightColumnsWidth(this.contentWidth);
	                tableStyle.width = scroll.x;
	            }
	        }
	        const tableBody = hasBody ? getBodyWrapper(
	            <tbody className={`${clsPrefix}-tbody`} onMouseLeave={this.onBodyMouseLeave}>
	                {/* {this.getRows(columns, fixed)} */}
	                {this.getRows(bigColumns && !fixed ? this.getBigShowColumns(columns) : columns, fixed)}
	            </tbody>
	        ) : null;
	        let dragClass = this.props.dragborder ? "table-drag-bordered" : ""
	        return (
	            <table className={` ${tableClassName}  table-bordered ${dragClass} `} data-for-table={this.tableUid}>
	                {/* {this.props.dragborder?null:this.getColGroup(columns, fixed)} */}
	                {/* {this.getColGroup(columns, fixed)}
	                {hasHead ? this.getHeader(columns, fixed, leftFixedWidth, rightFixedWidth) : null} */}
	                {this.getColGroup(bigColumns && !fixed ? this.getBigShowColumns(columns) : columns, fixed)}
	                {hasHead ? this.getHeader(bigColumns && !fixed ? this.getBigShowColumns(columns) : columns, fixed, leftFixedWidth, rightFixedWidth) : null}
	                {tableBody}
	            </table>
	        );
	    };

	    let headTable: React.ReactNode;
	    if (useFixedHeader) {
	        headTable = (
	            <div
	                className={`${clsPrefix}-header`}
	                ref={(el) => {
	                    if (fixed == 'right') {
	                        this.rightHeadTable = el;
	                    } else if (fixed) {
	                        this.leftHeadTable = el;
	                    } else {
	                        this.headTable = el;
	                    }
	                }}
	                {...headerFieldidAttr}
	                style={headStyle}
	                // onMouseOver={this.detectScrollTarget}
	                // onTouchStart={this.detectScrollTarget}
	                onScroll={this.handleBodyScroll}
	            >
	                {renderTable(true, false, options)}
	            </div>
	        );
	    }

	    let BodyTable = ( // 中间表格的body
	        <div
	            // className={`${clsPrefix}-body`}
	            className={classnames({
	                [`${clsPrefix}-body`]: 1,
	                [`${bodyClassName}`]: bodyClassName,
	            })}
	            style={bodyStyle}
	            ref={(el) => {
	                this.bodyTable = el
	            }}
	            {...bodyFieldidAttr}
	            // onMouseOver={this.detectScrollTarget}
	            // onTouchStart={this.detectScrollTarget}
	            onScroll={this.handleBodyScroll}
	            onMouseLeave={this.onBodyMouseLeave}
	        >
	            {/* {this.renderDragHideTable()}*/}
	            {renderTable(!useFixedHeader, true, options)}
	        </div>
	    );

	    if (fixed && columns.length) {// 固定表格的body
	        delete bodyStyle.overflowX;
	        delete bodyStyle.overflowY;
	        BodyTable = (
	            <div
	                className={`${clsPrefix}-body-outer`}
	                style={{...bodyStyle}}
	                {...bodyFieldidAttr}
	            >
	                <div
	                    style={{...innerBodyStyle}}
	                    className={`${clsPrefix}-body-inner`}
	                    ref={(ref) => {
	                        switch (fixed) {
	                        case "left":
	                            this.fixedLeftBodyInner = ref;
	                            break;
	                        case "right":
	                            this.fixedRightBodyInner = ref;
	                            break;
	                        default:
	                            break;
	                        }
	                    }}
	                    // onMouseOver={this.detectScrollTarget}
	                    // onTouchStart={this.detectScrollTarget}
	                    onScroll={this.handleBodyScroll}
	                >
	                    {renderTable(!useFixedHeader, true, options)}
	                </div>
	            </div>
	        );
	    }
	    // const leftFixedWidth = this.columnManager.getLeftColumnsWidth(this.contentWidth);
	    // const rightFixedWidth = this.columnManager.getRightColumnsWidth(this.contentWidth);
	    let expandIconWidth = expandIconAsCell && showExpandColumn && this.columnManager.isAnyColumnsLeftFixed() ? (this.props.expandIconCellWidth || expandIconCellWidth) : 0;
	    // if(expandIconAsCell && typeof this.props.expandedRowRender == 'function'){
	    //   let hasLeftFixed = this.columnManager.isAnyColumnsLeftFixed();
	    //   if((hasLeftFixed&& fixed == 'left')
	    //     ||!hasLeftFixed&& !fixed
	    //   ){
	    //     expandIconWidth = expandIconCellWidth;
	    //   }
	    // }
	    let parStyle: DefaultRecordType = {}
	    if (!fixed) {// 渲染中间区域
	        parStyle.marginRight = rightFixedWidth;
	        let leftBorderedWidth = 0;
	        if (bordered && leftFixedWidth > 0) {
	            leftBorderedWidth = 1;
	            parStyle.paddingLeft = 1;
	        }
	        parStyle.marginLeft = leftFixedWidth + expandIconWidth - leftBorderedWidth;
	    }
	    return <div style={parStyle}>{headTable}{BodyTable}</div>;
	}

	// 大数据列下获取的展示列，针对中间非固定列计算，截取计算
	getBigShowColumns = (cols: DefaultRecordType[]) => {
	    const { columnsLoadBuffer = 5 } = this.props;
	    // 非固定列
	    let centerColumns = cols.filter(item => !item.fixed && item.fixed !== 'left' && item.fixed !== 'right' && item.key !== '_pre' && item.key !== '_suf');
	    centerColumns = this.setColumnsWidth(this.columnManager.centerColumns(), false);
	    // 获取非规定列区域显示的列数
	    // 多表头获取数量比较少
	    let showCount = this.getShowColumns(centerColumns, this.currentScrollColumnIndex);
	    // 计算非固定列缓存数
	    // currentScrollColumnIndex是相对于最末级算出的下标，对于多表头给的是顶级的，会有误差
	    let colBuffer = computeIndex(centerColumns.length, showCount, columnsLoadBuffer, this.currentScrollColumnIndex, centerColumns);
	    // let colBuffer = this.computeIndex(leafCenterColumns.length, showCount, columnsLoadBuffer, this.currentScrollColumnIndex);
	    let colLazyLoad = {
	        startIndex: colBuffer.startIndex,
	        endIndex: colBuffer.endIndex,
	        preWidth: 0,
	        sufWidth: 0
	    }
	    // centerColumns不一致
	    // colLazyLoad.preWidth = this.getSumWidth(leftColumns.length, colLazyLoad.startIndex + leftColumns.length, centerColumns)
	    // colLazyLoad.sufWidth = this.getSumWidth(colLazyLoad.endIndex - rightColumns.length, centerColumns.length - 1 - rightColumns.length, centerColumns);
	    colLazyLoad.preWidth = getSumWidth(0, colLazyLoad.startIndex, centerColumns);
	    colLazyLoad.sufWidth = getSumWidth(colLazyLoad.endIndex, centerColumns.length - 1, centerColumns);
	    let centerShowCols = centerColumns.slice(colLazyLoad.startIndex, colLazyLoad.endIndex + 1);
	    let preColumn = colLazyLoad.preWidth ? [preCol(colLazyLoad.preWidth)] : []
	    let sufColumn = colLazyLoad.sufWidth ? [sufCol(colLazyLoad.sufWidth)] : []
	    let colSource = [
	        ...preColumn,
	        ...centerShowCols,
	        ...sufColumn,
	    ]
	    return colSource;
	}

	// 动态获取非固定列区域显示的列数
	getShowColumns = (centerColumns: DefaultRecordType[], currentScrollColumnIndex: number) => {
	    if (!this.contentDomWidth) return;
	    let fixedWidth = 0;
	    let leftColumns = this.columnManager.leftColumns() as DefaultRecordType[];
	    let rightColumns = this.columnManager.rightColumns() as DefaultRecordType[];
	    // 计算固定列的总长度
	    leftColumns.concat(rightColumns).forEach(col => {
	        fixedWidth += col.width
	    });
	    // 中间非固定列页面显示的宽度
	    let centerColumnWidth = this.contentDomWidth - fixedWidth;
	    let showNum = 0;
	    centerColumns.slice(currentScrollColumnIndex < 0 ? 0 : currentScrollColumnIndex).forEach((col: DefaultRecordType) => {
	        if (centerColumnWidth > 0) {
	            centerColumnWidth = centerColumnWidth - col.width;
	            showNum++
	        }
	    })
	    return showNum + 1;
	}

	getTitle = () => {
	    const {title, clsPrefix} = this.props;
	    return title ? (
	        <div className={`${clsPrefix}-title`} ref={(el) => {
	            this.titleTable = el
	        }}>
	            {title(this.state.data)}
	        </div>
	    ) : null;
	}

	getFooter = () => {
	    const {footer, clsPrefix, footerClassName} = this.props;
	    return footer ? (
	        <div className={classnames({
	            [`${clsPrefix}-footer`]: 1,
	            [`${footerClassName}`]: footerClassName
	        })}>
	            {footer(this.state.data)}
	        </div>
	    ) : null;
	}

	getEmptyText = () => {
	    const {emptyText: defaultEmptyText, clsPrefix, data, bodyStyle = {}, emptyClassName, bordered} = this.props;
	    const { scroll = {} } = this.state;
	    let emptyCla = {
	        [`${clsPrefix}-placeholder-inner`]: true,
	    }
	    let classes = classnames(emptyCla);
	    let emptyLocaleAttr = this.props.locale && typeof this.props.locale === 'string' ? {locale: this.props.locale} : {}
	    let emptyFieldidAttr = this.props.fieldid ? {fieldid: this.props.fieldid} : {}
	    let emptyText = defaultEmptyText !== undefined ?
	        defaultEmptyText :
	        () =>
	            <div className={classes}>
	                <Empty {...emptyLocaleAttr} {...emptyFieldidAttr} image={this.emptyFillHeight && this.emptyFillHeight > 135 ? 'no-data' : 'no-data-easy'}/>
	            </div>;
	    let height = 'auto'
	    if (bodyStyle.hasOwnProperty('height') || bodyStyle.hasOwnProperty('minHeight')) {
	        height = `${bodyStyle.height || bodyStyle.minHeight}`
	    }
	    let cssHeight = this.emptyFillHeight ? `${this.emptyFillHeight - (bordered ? 1 : 0)}px` : height;
	    let className = emptyClassName && typeof emptyClassName === 'string' ? `${clsPrefix}-placeholder ${emptyClassName}` : `${clsPrefix}-placeholder`
	    return !data.length ? (
	        <div className={className} style={{bottom: 0, height: this.emptyFillHeight ? cssHeight || (scroll && scroll.y) : (scroll && scroll.y) || cssHeight}} data-for-table={this.tableUid}>
	            <div className={`${clsPrefix}-placeholder-fixed`} style={{top: `-${this.scrollbarWidth}px`, height: `${this.scrollbarWidth}px`}}></div>
	            {typeof emptyText === 'function' ? emptyText() : emptyText}
	        </div>
	    ) : null;
	}

	getHeaderRowStyle = (columns: DefaultRecordType[], rows:DefaultRecordType[][]) => {
	    const {headerHeight} = this.props;// 表头每行的高度，注意多表头是多行高度总和
	    const {fixedColumnsHeadRowsHeight} = this.state;

	    if (headerHeight && columns) {
	        // if (headerHeight === 'auto') {
	        //     return {height: 'auto'};
	        // }
	        if (!Number(headerHeight)) {
	            return {height: 'auto'};
	        }
	        return {height: headerHeight / rows.length};
	    } else if (!headerHeight && columns && fixedColumnsHeadRowsHeight) { // 当headerHeight为null时，确保左中右多表头高度一致
	        return {height: fixedColumnsHeadRowsHeight / rows.length};
	    }
	    return null;
	}

	syncFixedTableRowHeight = () => {
	    // this.props.height、headerHeight分别为用户传入的行高和表头高度，如果有值，所有行的高度都是固定的，主要为了避免在千行数据中有固定列时获取行高度有问题
	    const {
	        clsPrefix,
	        height,
	        // headerHeight,
	        // columns,
	        // heightConsistent,
	        bodyDisplayInRow,
	        // lazyLoad,
	        // syncFixedRowHeight
	        bigColumns,
	        filterable,
	        headerHeight
	    } = this.props;
	    const expandedRows = this.bodyTable && this.bodyTable.querySelectorAll(`.${clsPrefix}-expanded-row[data-for-table='${this.tableUid}']`) || [];
	    const bodyRows = this.bodyTable && this.bodyTable.querySelectorAll(`.${clsPrefix}-row[data-for-table='${this.tableUid}']`) || [];
	    const leftBodyRows = !this.dataChanged && this.fixedLeftBodyInner && this.fixedLeftBodyInner.querySelectorAll(`.${clsPrefix}-row[data-for-table='${this.tableUid}']`) || [];
	    const rightBodyRows = !this.dataChanged && this.fixedRightBodyInner && this.fixedRightBodyInner.querySelectorAll(`.${clsPrefix}-row[data-for-table='${this.tableUid}']`) || [];
	    this.dataChanged = false
	    /*
    const headRows = this.headTable ?this.headTable.querySelector('thead') : this.bodyTable ?this.bodyTable.querySelectorAll('thead') : [];
    const fixedColumnsHeadRowsHeight = [].map.call(
      headRows, row =>{
        let height = headerHeight;
        if(headerHeight){
          height = (getMaxColChildrenLength(columns)+1)*headerHeight;
        }
        return headerHeight ? height : (Math.ceil(row.getBoundingClientRect().height) || 'auto')}//向上取整
    );
     */
	    const headCenterTableDom = this.headTable && this.headTable.querySelector('table');
	    const headLeftTableDom = this.leftHeadTable && this.leftHeadTable.querySelector('table');
	    const headRightTableDom = this.rightHeadTable && this.rightHeadTable.querySelector('table');
	    const priorityHeight = this.state.cssRowHeaderHeight;
	    let maxLevel = bigColumns ? getColLeave(this.columnManager.groupedColumns()) : 1;
	    let headerMaxHeight = bigColumns ? headerHeight ? headerHeight : (filterable ? maxLevel + 1 : maxLevel) * 30 : 30
	    // 计算出左中右三个表头的最大高度值
	    let fixedColumnsHeadRowsHeight = Math.ceil(Math.max( // 注意：不能使用getBoundingClientRect().height在ie下会出现小数点导致高度自动增长的问题
	        headLeftTableDom ? headLeftTableDom.clientHeight : 0,
	        headRightTableDom ? headRightTableDom.clientHeight : 0,
	        headCenterTableDom ? headCenterTableDom.clientHeight : 0,
	        priorityHeight || 0,
	        headerMaxHeight
	    ));
	    // const flatRecords = this.getFlatRecords(this.props.data || [])
	    // const fixedColumnsBodyRowsHeight = [].map.call(
	    //   bodyRows, (row,index) =>{
	    //     let rsHeight = height;
	    //     if(bodyDisplayInRow && rsHeight){
	    //       return rsHeight;
	    //     }else{
	    //       const rowKey = row.getAttribute('data-row-key')
	    //       const record = flatRecords.find(record => record.key === rowKey) || {}
	    //       const leafKey = 'isleaf' in record ? 'isleaf' : '_isLeaf' in record ? '_isLeaf' : null // ncc传递这俩属性区分是否是子节点
	    //       const isLeaf = leafKey && record[leafKey] === true
	    //       if (isLeaf) {
	    //         return Number((Number(row.getBoundingClientRect().height)).toFixed(2)) || 'auto';
	    //       }
	    //       // 为了提高性能，默认获取主表的高度，但是有的场景中固定列的高度比主表的高度高，所以提供此属性，会统计所有列的高度取最大的，设置
	    //       // 内容折行显示，并又设置了 height 的情况下，也要获取主表高度
	    //       if(heightConsistent || (!bodyDisplayInRow && rsHeight && syncFixedRowHeight)){
	    //         let leftHeight,rightHeight,currentHeight,maxHeight;
	    //         leftHeight = leftBodyRows[index]?Number(leftBodyRows[index].getBoundingClientRect().height).toFixed(2):0; // 有些浏览器中，取到的高度是小数，直接parseInt有问题，保留两位小数处理
	    //         rightHeight = rightBodyRows[index]?Number(rightBodyRows[index].getBoundingClientRect().height).toFixed(2):0;
	    //         currentHeight = Number(row.getBoundingClientRect().height).toFixed(2)
	    //         maxHeight = Math.max(leftHeight,rightHeight,currentHeight);
	    //         return maxHeight || 'auto'
	    //       }else{
	    //         return Number((Number(row.getBoundingClientRect().height)).toFixed(2)) || 'auto';
	    //       }
	    //     }
	    //   }
	    // );
	    // add by zzj
	    // 记录表格各行高缓存
	    this.fixedColumnsBodyRowsHeightCache = this.fixedColumnsBodyRowsHeightCache || {};
	    // 计算出表格各行的最大高度（非折叠展开行）
	    const fixedColumnsBodyRowsHeight: number[] = [];
	    bodyRows.length > 0 && [].forEach.call(
	        bodyRows, (row: HTMLElement, i: number) => {
	            let rsHeight = height;
	            if (bodyDisplayInRow && rsHeight) {
	                rsHeight = height;// 使用指定的固定行高
	            } else {// 使用自适应行高
	                let rsKey = row.getAttribute("data-row-key") as Key;
	                if (browserInfo.browserType == 'IE' && (this.fixedColumnsBodyRowsHeightCache as Record<Key, number>)[rsKey]) {// 暂时仅ie下走缓存，解决ie下的自动增长行高的问题
	                    rsHeight = (this.fixedColumnsBodyRowsHeightCache as Record<Key, number>)[rsKey];
	                    // console.log("AAA-->fixedColumnsBodyRowsHeight->cache-->"+this.props.name+"rsKey:"+rsKey+":"+i+":"+rsHeight)
	                } else {
	                    rsHeight = Math.max(
	                        leftBodyRows.length ? Math.ceil(leftBodyRows[i].getBoundingClientRect().height) : 0,
	                        rightBodyRows.length ? Math.ceil(rightBodyRows[i].getBoundingClientRect().height) : 0,
	                        Math.ceil(row.getBoundingClientRect().height)
	                    );
	                    // console.log("AAA-->fixedColumnsBodyRowsHeight->no cache-->"+this.props.name+"rsKey:"+rsKey+":"+i+":"+rsHeight)
	                    (this.fixedColumnsBodyRowsHeightCache as Record<Key, number>)[rsKey] = rsHeight;
	                }
	            }
	            fixedColumnsBodyRowsHeight[i] = rsHeight as number;
	        });
	    // console.log("AAA--->fixedColumnsBodyRowsHeight->" + fixedColumnsBodyRowsHeight)
	    // 记录表格各折叠行高缓存
	    this.fixedColumnsExpandedRowsHeightCache = this.fixedColumnsExpandedRowsHeightCache || {};
	    // 计算出表格各折叠展开行的高度
	    const fixedColumnsExpandedRowsHeight: any = {};
	    expandedRows.length > 0 && [].forEach.call(expandedRows, (row: HTMLElement) => {
	        let parentRowKey = (row && row.previousSibling && (row.previousSibling as HTMLElement).getAttribute("data-row-key")) as string;
	        // fix: ie 展开表格计算渲染bug
	        // try {//子表数据减少时，动态计算高度
	        //   let td = row.querySelector('td');
	        //   let tdPadding = this.getTdPadding(td);
	        //   let trueheight = parseInt(row.querySelectorAll('.u-table')[0].getBoundingClientRect().height);
	        //   exHeight = trueheight+tdPadding;
	        // } catch (error) {
	        // }

	        if (browserInfo.browserType == 'IE' && (this.fixedColumnsExpandedRowsHeightCache as Record<Key, number | string>)[parentRowKey]) {// 暂时仅ie下走缓存，解决ie下的自动增长行高的问题
	            fixedColumnsExpandedRowsHeight[parentRowKey as string] = (this.fixedColumnsExpandedRowsHeightCache as Record<Key, number | string>)[parentRowKey];
	            // console.log("AAA-->fixedColumnsExpandedRowsHeight->cache-->"+"rsKey:"+parentRowKey+":"+":"+this.fixedColumnsExpandedRowsHeightCache[parentRowKey])
	        } else {
	            // 解决相同行的expandedRowRender内容高度动态变化的问题：先动态设置td为伸缩盒，再获取高度，再还原为table-cell渲染。
	            (row.children[0] as HTMLElement).style.display = 'flex';
	            let exHeight = row && Math.ceil(row.children[0].getBoundingClientRect().height) || 'auto';
	            (row.children[0] as HTMLElement).style.display = 'table-cell';// 解决相同行的expandedRowRender内容高度动态变化的问题：先动态设置td为伸缩盒，再获取高度，再还原为table-cell渲染。
	            fixedColumnsExpandedRowsHeight[parentRowKey as string] = exHeight;
	            (this.fixedColumnsExpandedRowsHeightCache as Record<Key, number | string>)[parentRowKey] = exHeight;
	            // console.log("AAA-->fixedColumnsExpandedRowsHeight->no cache-->"+this.props.name+":rsKey:"+parentRowKey+":"+":"+exHeight)
	        }
	    })
	    if (shallowequal(this.state.fixedColumnsHeadRowsHeight, fixedColumnsHeadRowsHeight) &&
			shallowequal(this.state.fixedColumnsBodyRowsHeight, fixedColumnsBodyRowsHeight) &&
			shallowequal(this.state.fixedColumnsExpandedRowsHeight, fixedColumnsExpandedRowsHeight)) {
	        return;
	    }
	    // add by zzj
	    // clearTimeout(this.timer);
	    // this.timer = setTimeout(() => {
	    let updateRowHeightState = () => {
	        this.setState({
	            fixedColumnsHeadRowsHeight,
	            fixedColumnsBodyRowsHeight,
	            fixedColumnsExpandedRowsHeight,
	        }, () => {
	            let center = this.bodyTable;
	            let left = this.fixedLeftBodyInner;
	            let right = this.fixedRightBodyInner;
	            // 滚动条在最底部并且表格行高变化时，inner部分scrollTop数值不一致造成的表格没对齐。
	            if (this.columnManager.isAnyColumnsRightFixed()) {
	                if (center && right && center.scrollTop !== right.scrollTop) {
	                    center.scrollTop = right.scrollTop;
	                }
	                if (center && left && right && left.scrollTop !== right.scrollTop) {
	                    left.scrollTop = right.scrollTop;
	                }
	            } else {
	                if (center && left && center.scrollTop !== left.scrollTop) {
	                    left.scrollTop = center.scrollTop;
	                }
	            }
	        });
	        // }, 10);
	    }
	    debounce(updateRowHeightState(), 100);
	}

	resetScrollX = () => {
	    if (this.headTable) {
	        this.headTable.scrollLeft = 0;
	    }
	    if (this.bodyTable) {
	        this.bodyTable.scrollLeft = 0;
	    }
	}

	findExpandedRow = (record: DefaultRecordType, index: number) => {
	    const rows = this.getExpandedRows().filter(i => i === this.getRowKey(record, index));
	    return rows[0];
	}

	isRowExpanded = (record: DefaultRecordType, index: number) => {
	    return typeof this.findExpandedRow(record, index) !== 'undefined';
	}

	clearBodyMouseLeaveTimer = () => {
	    if (this.bodyMouseLeaveTimmer) {
	        clearTimeout(this.bodyMouseLeaveTimmer)
	        this.bodyMouseLeaveTimmer = null
	    }
	}

	onBodyMouseLeave = (e?:React.MouseEvent<HTMLElement>) => {
	    this.hideHoverDom(e);
	    const {onBodyMouseLeave} = this.props;
	    if (typeof onBodyMouseLeave === 'function') {
	        this.clearBodyMouseLeaveTimer();
	        // 因为鼠标移动到 hoverContent 中也会触发 onBodyMouseLeave，这是错误的
	        // 所以讲 onBodyMouseLeave 回调的调用放入 setTimeout中，
	        // 当触发 hoverContent 的 onRowHoverMouseEnter 回调时，清除此定时器
	        this.bodyMouseLeaveTimmer = setTimeout(onBodyMouseLeave, 0)
	    }
	}
	/*
  detectScrollTarget(e) {
    if (this.scrollTarget !== e.currentTarget) {
      this.scrollTarget = e.currentTarget;
    }
  }
  */

	// 隐藏行上悬浮的自定义dom
	hideHoverDom(_e?:React.UIEvent<HTMLElement>) {
	    if (this.hoverDom) {
	        this.hoverDom.style.display = 'none';
	    }
	}

	// 处理表格体内滚动
	handleBodyScroll = (e:React.UIEvent<HTMLElement>) => {
	    const {handleScrollY, handleScrollX, onBodyScroll, bigColumns} = this.props;
	    const {headTable, bodyTable, bottomTable, fixedLeftBodyInner, fixedRightBodyInner} = this;
	    // Prevent scrollTop setter trigger onScroll event
	    // http://stackoverflow.com/q/1386696
	    /*
    if (this.scrollTarget && e.target !== this.scrollTarget && e.target !== headTable) {//仅body区域滚动生效，头部区域滚动无需处理
      return;
    }
    */
	    if (this.lastScrollLeft == undefined) this.lastScrollLeft = 0;
	    if (this.lastScrollTop == undefined) this.lastScrollTop = 0;

	    // 水平滚动的逻辑处理
	    if ((e.target as HTMLElement).scrollLeft !== this.lastScrollLeft &&
			(e.target == bodyTable || e.target == headTable)
	    ) {
	        if (e.target === bodyTable) {// 中间内容中的水平滚动
	            if (headTable)
	                headTable.scrollLeft = (e.target as HTMLElement).scrollLeft;
	            if (bottomTable)
	                bottomTable.scrollLeft = (e.target as HTMLElement).scrollLeft;
	        } else if (e.target === headTable && bodyTable) {
	            bodyTable.scrollLeft = (e.target as HTMLElement).scrollLeft;
	        }
	        if ((e.target as HTMLElement).scrollLeft === 0) {
	            this.setState({scrollPosition: 'left'});
	        } else if ((e.target as HTMLElement).scrollLeft + 1 >=
				((e.target as HTMLElement).querySelector('table') as HTMLElement).getBoundingClientRect().width -
				(e.target as HTMLElement).getBoundingClientRect().width) {
	            this.setState({scrollPosition: 'right'});
	        } else if (this.state.scrollPosition !== 'middle') {
	            this.setState({scrollPosition: 'middle'});
	        }
	        if (handleScrollX) {// 触发props.handleScrollX
	            // debounce(
	            handleScrollX((e.target as HTMLElement).scrollLeft, this.treeType)
	            // ,300)
	        }
	        this.lastScrollLeft = (e.target as HTMLElement).scrollLeft;// 记录最后一次水平滚动位置
	        // 设置大数据列的滚动位置
	        if (bigColumns) {
	            let tempScrollLeft = (e.target as HTMLElement).scrollLeft;
	            // 支持到祖级滚动定位
	            // let cols = this.columnManager.centerColumns();
	            let cols = this.setColumnsWidth(this.columnManager.centerColumns(), false);
	            // console.log('cols', cols)
	            let index = 0; // 滚动后的位置索引
	            while (tempScrollLeft > 0 && index < cols.length) {
	                tempScrollLeft -= cols[index].width as number;
	                if (tempScrollLeft > -1) {
	                    index += 1;
	                }
	            }
	            if (this.currentScrollColumnIndex !== index) { // 表头最后一行
	                this.currentScrollColumnIndex = index
	            }
	            let renderFlag = this.state.renderFlag;
	            this.setState({
	                renderFlag: !renderFlag
	            });
	        }
	    }
	    // 垂直滚动的逻辑处理
	    if (this.lastScrollTop !== (e.target as HTMLElement).scrollTop &&
			(e.target == bodyTable || e.target == fixedLeftBodyInner || e.target == fixedRightBodyInner)// 仅对此三个区域的垂直滚动条进行同步，以防止水平滚动时，scrollTop>0时被重置为0的问题
	    ) {
	        // console.log("AAA---handleBodyScroll-->垂直滚动："+e.target.scrollTop+"---lastScrollTop:"+this.lastScrollTop,e.target);
	        if (fixedLeftBodyInner && e.target !== fixedLeftBodyInner) {
	            fixedLeftBodyInner.scrollTop = (e.target as HTMLElement).scrollTop;
	        }
	        if (fixedRightBodyInner && e.target !== fixedRightBodyInner) {
	            fixedRightBodyInner.scrollTop = (e.target as HTMLElement).scrollTop;
	        }
	        if (bodyTable && e.target !== bodyTable) {
	            // console.log("AAA---handleBodyScroll-->中间内容垂直滚动："+e.target.scrollTop);
	            bodyTable.scrollTop = (e.target as HTMLElement).scrollTop;
	        }
	        // 注意快速滚动时将行的hover效果隐藏，timeout之后还原，以解决固定列情况下表格滚动时hover效果错位的问题。
	        if (!this.state.currentHoverKey) {
	            this.store.setState({currentHoverKey: null});
	            clearTimeout(this.scrollHoverKeyTimer);
	            this.scrollHoverKeyTimer = setTimeout(() => {
	                this.store.setState({currentHoverKey: this.hoverKey})
	            }, 100)
	        }
	        // this.store.setState({currentHoverKey: null});
	        this.hideHoverDom(e);// 隐藏外部自定义悬浮dom
	        this.lastScrollTop = (e.target as HTMLElement).scrollTop;// 记录最后一次垂直滚动位置
	        if (handleScrollY) {// 触发props.handleScrollY
	            // debounce(
	            handleScrollY(this.lastScrollTop, this.treeType, onBodyScroll)
	            // ,300)
	        } else {
	            onBodyScroll(this.lastScrollTop)// 触发props.onBodyScroll滚动回调
	        }

	    }
	}

	handleRowHover = (isHover: boolean, key: Key, event:React.MouseEvent<HTMLElement>, currentIndex: number, propsRecord: DefaultRecordType) => {
	    // 增加新的API，设置是否同步Hover状态，提高性能，避免无关的渲染
	    let {syncHover, onRowHover, data, lazyLoad, clsPrefix} = this.props;
	    // fix:树形表，onRowHover返回参数异常
	    let {isTreeType} = this;
	    const record = (isTreeType ? propsRecord : lazyLoad ? data.find((item, index) => {
	        const rowKey = item.key ? item.key : this.getRowKey(item, index);
	        return rowKey === key
	    }) : data[currentIndex]) as DefaultRecordType;
	    this.hoverKey = isHover ? key : null;
	    // 清空缓存，通知所有的tableRow清除currentHoverKey，再次移动鼠标不会有之前缓存的hover状态
	    // this.store.setState({
	    //     currentHoverKey: null,
	    // });
	    // 固定列、或者含有hoverdom时情况下同步hover状态
	    // if (this.columnManager.isAnyColumnsFixed() && syncHover) {
	    //     this.store.setState({
	    //         currentHoverKey: isHover ? key : null,
	    //     });
	    // }
	    this.store.setState({
	        currentHoverKey: isHover ? key : null,
	    });

	    if (this.hoverDom) {
	        if (isHover) {
	            this.currentHoverKey = key;
	            const td = closest(event.target, 'td');
	            if (td) {
	                const scrollTop = this.lastScrollTop ? this.lastScrollTop : 0
	                let top = td.offsetTop - scrollTop;
	                // 存在title情况
	                if (this.titleTable) {
	                    top = top + this.titleTable.clientHeight;
	                }
	                if (this.headTable) {
	                    top = top + this.headTable.clientHeight;
	                }
	                // hoverContainer添加了背景色，高度为行高，为了不遮挡边线，高度减1
	                this.hoverDom.style.top = top + 1 + 'px';
	                this.hoverDom.style.height = td.offsetHeight / (td.rowSpan || 1) - 1 + 'px';
	                this.hoverDom.style.lineHeight = td.offsetHeight / (td.rowSpan || 1) - 1 + 'px';
	                this.hoverDom.style.display = 'block';
	                this.hoverContentClass = classnames({
	                    [`${prefix}-row-hover`]: true,
	                    [`${clsPrefix}-hovercontent-hover`]: syncHover
	                })
	                // if (propsRecord._checked) {
	                if (this.props.selectedRowKeys.includes(key)) {
	                    this.hoverContentClass = classnames({
	                        [`${prefix}-row-hover`]: true,
	                        [`${clsPrefix}-hovercontent-selected`]: syncHover
	                    })
	                }
	            }
	            this.setState({
	                currentHoverIndex: currentIndex,
	                copyCurrentHoverIndex: currentIndex,
	                currentHoverRecord: record,
	                copyCurrentHoverRecord: record
	            })
	        } else { // 鼠标离开行时，清空currentHoverRecord（解决切换数据时currentHoverRecord获取了上次hover的数据）
	            this.setState({
	                copyCurrentHoverRecord: null,
	                copyCurrentHoverIndex: null
	            })
	            this.hoverDom.style.display = 'none'
	        }
	    }
	    onRowHover && onRowHover(currentIndex, record, isHover);

	}

	onRowHoverMouseEnter = () => {

	    let currentHoverRecordData = this.state.currentHoverRecord
	    let currentHoverIndexData = this.state.currentHoverIndex
	    this.setState({
	        copyCurrentHoverRecord: currentHoverRecordData,
	        copyCurrentHoverIndex: currentHoverIndexData
	    })
	    this.store.setState({
	        currentHoverKey: this.currentHoverKey,
	    });
	    if (this.hoverDom) this.hoverDom.style.display = 'block';
	    this.clearBodyMouseLeaveTimer();

	}
	onRowHoverMouseLeave = () => {

	    this.setState({
	        copyCurrentHoverRecord: null,
	        copyCurrentHoverIndex: null
	    })
	    this.store.setState({
	        currentHoverKey: null,
	    });
	    if (this.hoverDom) this.hoverDom.style.display = 'none';
	}
	// 表格mouseLeave时移除hoverContent元素
	onTableHoverMouseLeave = () => {
	    this.hideHoverDom();
	    this.store.setState({currentHoverKey: null});
	}
	onFocus = (e?:React.FocusEvent<HTMLElement>) => {
	    this.props.onKeyTab && this.props.onKeyTab(e);
	}

	onKeyDown = (e?:React.KeyboardEvent<HTMLElement>) => {
	    let event = Event.getEvent(e);
	    // event.preventDefault?event.preventDefault():event.returnValue = false;
	    if (event.keyCode === 38) {// up
	        event.preventDefault && event.preventDefault();
	        this.props.onKeyUp && this.props.onKeyUp(e);
	    } else if (event.keyCode === 40) {// down
	        event.preventDefault && event.preventDefault();
	        this.props.onKeyDown && this.props.onKeyDown(e);
	    }
	    this.props.onTableKeyDown && this.props.onTableKeyDown(e);
	}

    getJDiwork = () => {
        try {
            if ((window as any).jDiwork) {
                (window as any).jDiwork?.getContext?.((data:DefaultRecordType)=>{
                    this.tableContext = JSON.parse(data.tableContent);
                });
            }
        } catch (e) {
            this.tableContext = null;
        }
    }

	filterColumnOpenCloumList = () => {
	    const { filterColumnOpenCloumList } = this.props;
	    if (!this.headTable) {
	        filterColumnOpenCloumList && filterColumnOpenCloumList();
	        return;
	    } else {
	        let DH = document.body.clientHeight;
	        let CH = this.headTable.getBoundingClientRect()?.bottom;
	        let adaptiveHeight = DH - CH - this.getHeaderHeight()
	        filterColumnOpenCloumList && filterColumnOpenCloumList(adaptiveHeight);
	    }


	}

	render() {
	    const {
	        currentHoverRecord,
	        copyCurrentHoverRecord,
	        // currentHoverIndex,
	        copyCurrentHoverIndex,
	        scrollPosition,
	        scroll = {},
	        cssRowHeight
	    } = this.state;
	    const props = this.props;
	    const hasFixedLeft = this.columnManager.isAnyColumnsLeftFixed();
	    const hasFixedRight = this.columnManager.isAnyColumnsRightFixed();
	    // const isTableScroll = this.columnManager.isAnyColumnsFixed() || props.scroll.x || props.scroll.y;
	    const isTableScroll = this.columnManager.isAnyColumnsFixed() || scroll.x || scroll.y;
	    let {
	        clsPrefix,
	        className,
	        useFixedHeader,
	        // scroll,
	        showHeader,
	        bordered,
	        onCopy,
	        bodyDisplayInRow,
	        height,
	        headerDisplayInRow,
	        // size,
	        loading,
	        stripeLine,
	        fieldid,
	        locale
	    } = props;

	    if (this.tableContext && typeof this.tableContext === 'object') {
	        // @ts-ignore
	        stripeLine = stripeLine ?? this.tableContext.tableRowZebraStripes;
	        bordered = bordered ?? this.tableContext.tableRowSplitLine;
	        height = height ?? heigtMap[this.tableContext.tableRowHeight];
	    } else {
	        height = (height ?? cssRowHeight) as number
	    }

	    let clsObj = {
	        [`${className}`]: !!className,
	        [`${clsPrefix}-fixed-header`]: useFixedHeader || (scroll && scroll.y),
	        [`${clsPrefix}-hide-header`]: !showHeader,
	        [`${clsPrefix}-bordered`]: bordered,
	        [`copy`]: onCopy,
	        [`${clsPrefix}-scroll-position-${scrollPosition}`]: true,
	        [`fixed-height`]: bodyDisplayInRow && height,
	        [`body-dispaly-in-row`]: bodyDisplayInRow,
	        [`header-dispaly-in-row`]: headerDisplayInRow,
	        // [`${clsPrefix}-${props.size}`]: size,
	        [`has-fixed-left`]: hasFixedLeft,
	        [`has-fixed-right`]: hasFixedRight,
	        [`${clsPrefix}-striped`]: stripeLine,
	    };
	    let contCla = {
	        [`${clsPrefix}-scroll`]: isTableScroll,
	        [`${clsPrefix}-content-inner`]: true
	    }
	    let classes = classnames(clsPrefix, clsObj);
	    let contClasses = classnames(contCla);
	    let adapterNid = getNid(this.props) // 适配nid、uitype
	    let tableProps = fieldid ? { fieldid: `${fieldid}_table` } : {};
	    let style = Object.assign({}, {...props.style}, {...this.fillSpaceStyle})
	    let tabIndexAttr = props.focusable ? { tabIndex: (props.tabIndex ? props.tabIndex : 0)} : {}
	    return (
	        <ResizeObserver onResize={this.resize}>
    	        <div className={classes} style={style} ref={el => this.contentTable = el} data-for-table={this.tableUid}
    				 onMouseLeave={this.onTableHoverMouseLeave} {...tabIndexAttr} {...adapterNid} {...tableProps}>
    	            {this.getTitle()}
    	            <div className={`${clsPrefix}-content`}>
    	                <div className={contClasses}>
    	                    {this.getTable({columns: this.columnManager.groupedColumns()})}
    	                    {this.getEmptyText()}
    	                </div>
    	                {hasFixedLeft &&
    						<div className={`${clsPrefix}-fixed-left`}
    							 key={"left_" + this.columnManager.getLeftColumnKeys()}>
    						    {this.getLeftFixedTable()}
    						</div>}
    	                {hasFixedRight &&
    						<div className={`${clsPrefix}-fixed-right`}
    							 key={"right_" + this.columnManager.getRightColumnKeys()}>
    						    {this.getRightFixedTable()}
    						</div>}
    	            </div>
    	            {this.getFooter()}
    	            {props.rowDraggAble ? <DragRowLine
    	                container={this}
    	                clsPrefix={clsPrefix}
    	                bigData={!!props.lazyLoad}
    	                data={this.state.data}
    	                useDragHandle={props.useDragHandle}
    	                ref={(line) => this.dragrowLine = line}
    	                onRowDragStart={this._onRowDragStart}
    	                onRowDragDrop={this._onRowDragDrop}
	                    onRowDrop={this._onRowDrop}
    	            /> : null}
    	            {props.dragborder ? <DragResizerLine
    	                key={"DragResizerLine_" + this.tableUid}
    	                ref={(line) => this.resizerLine = line}
    	                container={this}
    	                clsPrefix={clsPrefix}
    	                left={this.state.resizerLineLeft}
    	                height={this.state.resizerLineHeight}
    	                defaultWidth={this.state.resizerDefaultWidth}
    	                minWidth={this.state.resizerMinWidth}
    	                visible={this.state.resizerVisible}
    	                onChange={this.onDragBorderMouseMove}
    	                onResizeEnd={this.onDragBorderMouseUp}
    	                onResizeCancel={this.onDragBorderCancel}
    	                dataSource={this.state.dataSource}
    	            /> : null}
    	            <Loading
    	                getPopupContainer={() => this}
    	                locale={locale as string}
    	                {...(typeof loading === 'boolean' ? {spinning: loading} : loading)}/>
    	            {props.hoverContent && <div className={this.hoverContentClass}
    	                onMouseEnter={this.onRowHoverMouseEnter}
    	                onMouseLeave={this.onRowHoverMouseLeave}
    	                ref={el => this.hoverDom = el}>{currentHoverRecord ? props.hoverContent(copyCurrentHoverRecord, copyCurrentHoverIndex) : null}</div>}
	                {this.props.columnFilterAble == false ? (
		                ""
		            ) : (
		                <div className={`${clsPrefix}-filter-column-filter-icon`}>
		                    <Popover
		                        placement="bottomRight"
		                        content={this.props.filterColumnContent}
		                        arrowPointAtCenter
		                        show={this.props.filterColumnShowModal}
		                        onHide={this.props.filterColumnOnHide}
		                        onVisibleChange={this.props.filterColumnOnVisibleChange}
		                        trigger="click"
		                    >
		                        <Icon type="uf-3dot-h" onClick={this.filterColumnOpenCloumList}/>
		                    </Popover>
		                </div>
		            )}
    	        </div>
	        </ResizeObserver>
	    );
	}
}

// Table.propTypes = propTypes;
// Table.contextTypes = {
//     beeLocale: PropTypes.object
// };

// export default Table;
export default Table as React.ComponentClass<Partial<TableProps<DefaultRecordType>>>;

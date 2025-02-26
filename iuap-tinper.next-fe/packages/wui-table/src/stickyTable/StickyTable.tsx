import classnames from 'classnames';
import React, {Component, Fragment} from 'react';
import RefResizeObserver from 'rc-resize-observer';
import ResizeObserver from 'resize-observer-polyfill';
import shallowequal from 'shallowequal';
import {getNid, prefix, WebUI} from "../../../wui-core/src/index"
import {WithConfigConsumer} from "../../../wui-provider/src/context";
import Loading from '../../../wui-spin/src';
import Empty from '../../../wui-empty/src';
import Popover from '../../../wui-popover/src';
import Icon from '../../../wui-icon/src';
import Message from '../../../wui-message/src';
import ColumnManager from '../ColumnManager';
import createStore from '../createStore';
import DragResizerLine from "../DragResizerLine";
import DragRowLine from "../DragRowLine";
import i18n from "../lib/i18n";
import {arrayMoveTo, arrayTreeMoveTo, getValueByRowKey, getTableCssHeight} from "../lib/util";
import {Event, EventUtil, fillTargetSpace, measureScrollbar, myBrowser, getColLeave, getSumWidth, computeIndex, throttle, isWithinTolerance, closest, getBordered} from '../lib/utils';
import TableHeader from './StickyHeader';
import TableRow from './StickyRows';
import {getLangInfo} from "../../../wui-locale/src/tool";
import { TableProps, TableState, ColumnsType, InnerColumnType } from '../iTable';
import { Key, DefaultRecordType, DropDataSourceType, BrowserInfoType } from '../interface';
import { preCol, sufCol, DEFAULT_SELECT_WIDTH, DEFAULT_ROW_NUM_WIDTH, DEFAULT_DRAG_WIDTH, DEFAULT_MIN_COLUMN_WIDTH, defaultEmptyColumn } from '../constant';
import cacheTarget from '../lib/cache';
import HoverContent from '../HoverContent';
import { useTimeoutLock } from '../lockFrame';
import PopMenu from '../PopMenu';
import { OrNull } from '../../../wui-core/src/utils/type';
import {ConfigContext} from '../../../wui-provider/src/context';
import { ConfigConsumerProps } from "../../../wui-provider/src/iProvider";
import {ObjectAssign} from "../lib/util";

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
    // minColumnWidth: 80,
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
    showExpandColumn: true,
    scrollType: "multiple",
    rowActiveKeys: false, // 是否开启行点击状态记录
    addEmptyColumn: false, // 是否开启内置增加空白列
    openSelectCells: false, // 开启框选
    // dir: 'ltr',
};

const expandIconCellWidth = Number(43);
// const sumRowHeight = Number(26)

const tableUUID = () => "_table_uid_" + new Date().getTime()
let browserInfo: BrowserInfoType = {};
const heigtMap = {
    '0': 29,
    '1': 35,
    '2': 41
}

@WithConfigConsumer({name: "table"})
@WebUI({name: "table", defaultProps})
class Table extends Component<TableProps<DefaultRecordType>, TableState> {
	currentScrollColumnIndex: number;
	firstResize: boolean;
	static defaultProps = {...defaultProps};
	static contextType = ConfigContext;
	context!: ConfigConsumerProps;
	columnManager: ColumnManager;
	store: { setState: (newState: any) => void; getState: () => any; subscribe: (listener: any) => void;};
	shouldUpdate: boolean;
	scrollYChanged: boolean;
	tableUid: string;
	contentTable: HTMLElement | null;
	emptyFillHeight: null | number;
	tableContext: DefaultRecordType | null;
	scrollbarWidth: number;
	fillSpaceStyle: {
		width?: string;
		height?: string;
	} | undefined;
	scrollTop: number;
	headTable: HTMLDivElement | undefined | null;
	bodyTable: HTMLDivElement | undefined | null;
	footTable: HTMLDivElement | undefined | null;
	hoverContentClass: string | undefined;
	titleTable: HTMLDivElement | undefined | null;
	hoverDom: HTMLDivElement | undefined | null;
	// contentDomWidth: number;
	treeType: boolean;
	isTreeType: boolean;
	contentWidth: number;
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
	hoverContentStyle: React.CSSProperties;
	// debounceResize: { (this: any): void; cancel: () => void; } | undefined;
	// debounceSyncFixedTableScrollWidth: { (this: any): void; cancel: () => void; } | undefined;
	dobounceHandleBodyScroll: (() => void | undefined) | undefined | null;
	contextMenuKey: Key | undefined;
	contextMenuDataIndex: Key | undefined;
	lockStore: { setState: (newState: any) => void; getState: () => any; };
	tablepopmenu: any;
	debounceResize: (() => void | undefined) | undefined | null;
	parentResizeObserver: OrNull<ResizeObserver> = null;
	dobounceFillSpaceFun: (() => void | undefined) | undefined | null;
	handleColumns: DefaultRecordType[] = [];
	selFirstCol: any;
	leafLeafColumns: any;
	selFirstColIndex: any;
	selectColIndexSet!: Set<any>;
	selectColMap!: Map<any, any>;
	selectRowMap!: Map<any, any>;
	selFirstRowIndex!: number;
	selRowIndexSet!: Set<number>;
	cellSelecting!: boolean;
	selLastColIndex: any;
	selLastRowIndex: number | undefined;
	flatData: any;
	selectCellCopyed: boolean;
	cellTextTarget: any;
	copyType: string;
	constructor(props: TableProps<DefaultRecordType>) {
	    super(props);
	    browserInfo = myBrowser();
	    let expandedRowKeys: Key[] = [];
	    let rows = [...(props.data || [])];
	    let defaultColumnWidth = getTableCssHeight(`--${prefix}-table-cloumn-width`);
	    const showDragHandle = !props.hideDragHandle && props.rowDraggAble;
	    this.columnManager = new ColumnManager(props.columns, (props.children as JSX.Element[]), (props.originWidth as number), showDragHandle, props.showRowNum, props.locale || this.context.locale, defaultColumnWidth); // 加入props.showRowNum参数
	    this.store = createStore({currentHoverKey: null, currentRecord: null, currentIndex: null});
	    this.lockStore = useTimeoutLock()
	    this.shouldUpdate = false;
	    this.treeType = false;
	    this.isTreeType = false;
	    this.scrollYChanged = false;
	    this.scrollTop = 0;
	    this.contentWidth = 0;
	    // this.contentDomWidth = 0;
	    this.computeWidth = 0;
	    this.domWidthDiff = 0;
	    this.scrollbarWidth = 0;
	    this.treeRowIndex = 0;
	    this.lastScrollLeft = 0;
	    this.lastScrollTop = 0;
	    this.hoverKey = null;
	    this.firstResize = true;
	    this.selectCellCopyed = false;
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
	    let _cssRowHeight = getTableCssHeight(`--${prefix}-table-row-height`);
	    let _cssRowHeaderHeight = getTableCssHeight(`--${prefix}-table-row-header-height`);
	    let cssRowHeight = props.height || (_cssRowHeight !== 35 ? _cssRowHeight : null);
	    let cssRowHeaderHeight = props.height || (_cssRowHeaderHeight !== 30 ? _cssRowHeaderHeight : null)
	    this.state = {
	        expandedRowKeys,
	        data: props.data || [],
	        currentHoverKey: null,
	        scrollPosition: 'left',
	        fixedColumnsBodyRowsHeight: [],
	        fixedColumnsExpandedRowsHeight: {}, // 扩展行的高度
	        scroll: props.scroll,
	        cssRowHeight: cssRowHeight,
	        cssRowHeaderHeight: cssRowHeaderHeight,
	        defaultColumnWidth,
	        contentDomWidth: 0, // 表格宽度，保持一个页面多个表格的独立性
	        selectCellColumnKeys: [],
	        selectCellRowsKeys: []
	    }

	    this.tableUid = tableUUID();
	    this.contentTable = null;
	    this.emptyFillHeight = null; // 填充的空数据高度
	    this.tableContext = null;
	    this.hoverContentStyle = {}
	    this.cellTextTarget = {};
	    this.copyType = '_all';
	    this.getJDiwork();
	}

	componentDidMount() {
	    let { useFixedHeader, fillSpace, filterColumnShowModal, filterColumnOpenCloumList, scrollType, openSelectCells, focusable } = this.props;
	    if (focusable) {
	        EventUtil.addHandler(this.contentTable, 'keydown', this.onKeyDown);
	        EventUtil.addHandler(this.contentTable, 'focus', this.onFocus);
	    }
	    EventUtil.addHandler(window, 'resize', this.resizeWindow);
	    EventUtil.addHandler(document, 'copy', this.onCopyCell);
	    EventUtil.addHandler(document, 'mousedown', this.onDocumentClick);
	    if (openSelectCells) {
	        EventUtil.addHandler(this.contentTable, 'contextmenu', this.handleContextMenu);
	    }
	    this.scrollbarWidth = measureScrollbar(`div.${this.props.clsPrefix}[data-for-table='${this.tableUid}']`);// dom装载后获取浏览器下的滚动条宽度
	    // 后续也放在recevice里面
	    this.computeTableWidth();
	    if (useFixedHeader) {// 固定列头存在则执行head和body的宽度
	        this.syncFixedTableScrollWidth();// 同步固定列的滚动宽度
	    }
	    if ('currentScrollColumn' in this.props) { // scrollIntoColumnKey
	        this.scrollColumnFun(this.props);
	    } else {
	        setTimeout(this.resetScrollX, 300);
	    }

	    this.debounceResize = throttle(() => {
	        window.requestAnimationFrame(() => {
	            // this.contentDomWidth = (this.contentTable as HTMLElement).getBoundingClientRect().width;
	            // console.log('resize contentDomWidth', this.contentDomWidth, this.tableUid)
	            if (fillSpace) {
	                this.setFillSpaceFun();
	            } else {
	                this.fillSpaceStyle = {}
	                this.emptyFillHeight = null
	            }
	            if (filterColumnShowModal) {
	                if (!this.headTable && scrollType !== 'single') return;
	                let contentTableHeight = (this.contentTable as HTMLElement).getBoundingClientRect().height;// 表格容器宽度
	                // let DH = document.body.clientHeight;
	                // let CH = this.headTable.getBoundingClientRect()?.bottom;
	                let adaptiveHeight = contentTableHeight - this.getHeaderHeight()
	                filterColumnOpenCloumList && filterColumnOpenCloumList(adaptiveHeight);
	            }
	            this.checkFixedColumn()
	            // this.computeTableWidth();
	        })

	        typeof this.props.onResize == 'function' && this.props.onResize();
	    }, 300, false);

	    this.dobounceHandleBodyScroll = throttle(this.handleBodyScroll, 200, true);
	    // this.dobounceFillSpaceFun = throttle(this.setFillSpaceFun, 200, true)
		// this.dobounceHandleBodyScroll = throttle((e) => this.handleBodyScroll(e), 200, true);
	    this.dobounceFillSpaceFun = throttle(this.setFillSpaceFun, 200, true)

	    // 父级监听
	    if (fillSpace) {
	        if (this.contentTable) {
	            let parent = this.contentTable.parentNode;
	            if (parent && (parent as HTMLElement).nodeName.toUpperCase() === 'FORM') {
	                parent = parent.parentNode;
	            }
	            if (parent) {
	                this.parentResizeObserver = new ResizeObserver(() => {
	                    // throttle(() => this.setFillSpaceFun(), 200)
	                    this.dobounceFillSpaceFun && this.dobounceFillSpaceFun()
	                });
	                this.parentResizeObserver.observe(parent as Element)
	            }
	        }
	    }
	}

	UNSAFE_componentWillReceiveProps(nextProps: TableProps<DefaultRecordType>) {
	    let {hideDragHandle, rowDraggAble, showRowNum, useFixedHeader, locale, clsPrefix} = nextProps;
	    if ('scroll' in nextProps && !shallowequal(nextProps.scroll, this.props.scroll)) {
	        this.shouldUpdate = true;
	        this.setState({
	            scroll: nextProps.scroll || {},
	        }, () => {
	            if (useFixedHeader) {// 固定列头存在则执行head和body的宽度
	                this.syncFixedTableScrollWidth();// 同步固定列的滚动宽度
	            }
	        });
	    }


	    if ('data' in nextProps) {
	        let hasChange = !shallowequal(nextProps.data, this.props.data);
	        if (hasChange) {
	            this.shouldUpdate = true;
	            this.setState({
	                data: nextProps.data || [],
	            })
	        }
	    }
	    if (('defaultExpandAllRows' in nextProps && this.props.defaultExpandAllRows !== nextProps.defaultExpandAllRows)
			|| ('defaultExpandAllRows' in nextProps && (!(this.props.data || []).length || !shallowequal(nextProps.data, this.props.data))) && (nextProps.data || []).length
	    ) {
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
	    if ('expandedRowKeys' in nextProps && nextProps.expandedRowKeys !== undefined && !shallowequal(nextProps.expandedRowKeys, this.props.expandedRowKeys)) {
	        this.setState({
	            expandedRowKeys: nextProps.expandedRowKeys,
	        });
	    }

	    if (nextProps.resetScroll) {
	        this.resetScrollX();
	    }

	    if (nextProps.columns && !shallowequal(nextProps.columns, this.props.columns)) {
	        this.columnManager.reset(nextProps.columns, null, showRowNum, !hideDragHandle && rowDraggAble, locale || this.context.locale); // 加入this.props.showRowNum参数
	        this.shouldUpdate = true;
	        if (nextProps.columns.length !== this.props.columns.length && this.bodyTable) {
	            this.scrollTop = this.bodyTable.scrollTop;
	        }
	    } else if (nextProps.children !== this.props.children) {
	        // this.columnManager.reset(null, nextProps.children, showRowNum, !hideDragHandle && rowDraggAble); // 加入this.props.showRowNum参数
	        this.columnManager.reset([], nextProps.children, showRowNum, !hideDragHandle && rowDraggAble, locale || this.context.locale); // 加入this.props.showRowNum参数
	        this.shouldUpdate = true;
	    }

	    if ('currentScrollColumn' in nextProps && nextProps.currentScrollColumn !== this.props.currentScrollColumn) {
	        this.scrollColumnFun(nextProps);
	    }

	    // 适配lazyload
	    if ((nextProps.scrollTop || nextProps.scrollTop == 0) && nextProps.scrollTop > -1) {
	        // this.bodyTable.scrollTop = nextProps.scrollTop;
	        this.scrollTop = nextProps.scrollTop;
	    }

	    if ('fillSpace' in nextProps) {
	        if (nextProps.fillSpace) {
	            this.setFillSpaceFun();
	        } else {
	            this.fillSpaceStyle = {}
	            this.emptyFillHeight = null
	        }
	    }
	    if ('selectedRowKeys' in nextProps) {
	        const {selectedRowKeys, syncHover = true} = nextProps;
	        if (Array.isArray(selectedRowKeys)) {
	            if (this.hoverDom) {
	                const { currentHoverKey } = this.store.getState();
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
	                if (this.hoverContentClass !== this.store.getState().hoverContentClass) {
	                    this.store.setState({
	                        currentHoverKey: this.store.getState().currentHoverKey,
	                        currentRecord: this.store.getState().currentRecord,
	                        currentIndex: this.store.getState().currentIndex,
	                        hoverContentClass: this.hoverContentClass
	                    });
	                }
	            }
	        }
	    }

	}

	componentDidUpdate(prevProps:TableProps<DefaultRecordType>) {
	    let {useFixedHeader} = this.props;

	    if (useFixedHeader) {// 固定列头存在则执行head和body的宽度
	        // QDJCJS-14181 计算不需要防抖，延迟会带来计算错误，从而滚动条出现又消失
	        window.requestAnimationFrame(() => {
	            this.syncFixedTableScrollWidth()
	        })
	    	// this.syncFixedTableScrollWidth(); // 同步固定列的滚动宽度
	        // this.debounceSyncFixedTableScrollWidth && this.debounceSyncFixedTableScrollWidth()
	    }

	    // 适应模态框中表格、以及父容器宽度变化的情况
	    // if (typeof (this.state.scroll && this.state.scroll.x) !== 'number' && (this.contentTable as HTMLElement).getBoundingClientRect().width !== this.contentDomWidth && this.shouldUpdate) {
	    //     this.computeTableWidth();
	    //     this.shouldUpdate = false;// 避免重复update
	    // }
	    if (this.scrollTop > -1) {
	        this.bodyTable && (this.bodyTable.scrollTop = this.scrollTop);
	        this.scrollTop = -1;
	    }
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
	    // DZKJDA-47348 火狐浏览器某些情况下错位
	    if (this.headTable && this.bodyTable && this.headTable?.scrollLeft && this.headTable?.scrollLeft !== this.bodyTable?.scrollLeft) {
	        this.resetScrollX(this.headTable?.scrollLeft)
	    }
	    // 解决初始化table渲染在dom树上但是不显示this.scrollbarWidth = 0的问题
	    if (!this.scrollbarWidth) {
	        this.scrollbarWidth = measureScrollbar(`div.${this.props.clsPrefix}[data-for-table='${this.tableUid}']`)
	    }
	    if (this.props.fillSpace) {
	        this.setFillSpaceFun();
	    } else {
	        this.fillSpaceStyle = {}
	        this.emptyFillHeight = null
	    }

	    if (this.shouldUpdate) {
	        this.cellTextTarget = {};
	        this.computeTableWidth();
	        this.shouldUpdate = false
	    }
	}

	componentWillUnmount() {
	    // 移除绑定事件,避免内存泄漏
	    this.contentTable = null;
	    this.debounceResize = null;
	    this.dobounceHandleBodyScroll = null;
	    this.dobounceFillSpaceFun = null;
	    this.fillSpaceStyle = {}
	    this.emptyFillHeight = null
	    this.cellTextTarget = null;
	    let { openSelectCells, focusable} = this.props;
	    if (focusable) {
	        EventUtil.removeHandler(this.contentTable, 'keydown', this.onKeyDown);
	        EventUtil.removeHandler(this.contentTable, 'focus', this.onFocus);
	    }
	    EventUtil.removeHandler(window, 'resize', this.resizeWindow);
	    EventUtil.removeHandler(document, 'copy', this.onCopyCell);
	    EventUtil.removeHandler(document, 'mousedown', this.onDocumentClick);
	    if (openSelectCells) {
	        EventUtil.addHandler(this.contentTable, 'contextmenu', this.handleContextMenu);
	    }
	    if (this.parentResizeObserver) {
	        this.parentResizeObserver.disconnect();
	    }
	}

	// 检测可视区域表格宽度是否列全部是是固定列，如果是则强行解除最后的固定列，初始化的时候接触至可视区域至少有一列是非固定列
	checkFixedColumn = () => {
	    // return;
	    let contentDomWidth = (this.contentTable as HTMLElement)?.getBoundingClientRect().width;// 表格容器宽度
	    const { resetFilterColumns, cacheId } = this.props;
	    if (contentDomWidth) {
	        // 排除掉右固定列的宽度总和
	        let rightColumns = this.handleColumns.filter(item => item.fixed === 'right');
	        let rightColumnsWidth = getSumWidth(0, rightColumns.length, rightColumns);
	        let restColumnsWidth = contentDomWidth - rightColumnsWidth;
	        // const originColumns = direction === 'rtl' ? this.revertForRtl(ObjectAssign(this.columnManager.get()) as InnerColumnType[]) as InnerColumnType[] : ObjectAssign(this.columnManager.get()) as InnerColumnType[];
	        const originColumns = ObjectAssign(this.columnManager.get()) as InnerColumnType[];
	        if (originColumns.length) {
	            for (let i = 0; i < this.handleColumns.length; i++) {
	                let col = this.handleColumns[i];
	                if (col.key === '_inner_empty') {
	                    continue;
	                }
	                restColumnsWidth -= col.width;
	                if (col.fixed === true || col.fixed === 'left') {
	                    if (restColumnsWidth <= 0) {
	                        let propsLocale = this.props.locale || this.context.locale
	                        let locale = getLangInfo(propsLocale, i18n, 'table');
	                        Message.destroy();
	                        Message.create({ content: `${locale.langMap.cancelLock || '锁定区域超出屏幕范围, 已为您临时取消锁定'}`, color: 'warning' });
	                        originColumns[i].fixed = false;
	                        if (this.handleColumns[i].children && Array.isArray(this.handleColumns[i].children) && this.handleColumns[i].children.length) {
	                            // 递归所有的子集都去掉固定
	                            this.setColumnsFixed(this.handleColumns[i].children, (originColumns[i]?.children || []) as DefaultRecordType[], false);
	                        }
	                    } else {
	                        if (this.handleColumns[i].children && Array.isArray(this.handleColumns[i].children) && this.handleColumns[i].children.length) {
	                            // 递归所有的子集都去掉固定
	                            this.setColumnsFixed(this.handleColumns[i].children, (originColumns[i]?.children || []) as DefaultRecordType[], true);
	                        }
	                    }
	                } else if (!col.fixed) {
	                    if (restColumnsWidth > 0) {
	                        // originColumns[i].fixed = false;
	                        if (this.handleColumns[i].children && Array.isArray(this.handleColumns[i].children) && this.handleColumns[i].children.length) {
	                            // 递归所有的子集都去掉固定
	                            this.setColumnsFixed(this.handleColumns[i].children, (originColumns[i]?.children || []) as DefaultRecordType[], !!originColumns[i].fixed);
	                        }
	                    }
	                }
	            }
	            resetFilterColumns && resetFilterColumns(originColumns);
	            if (cacheId && typeof cacheId === 'string') {
	                cacheTarget.set(cacheId, originColumns);
	            }
	            this.columnManager.set(originColumns);
	        }
	    }
	    this.computeTableWidth();
	}

	setColumnsFixed = (columns: DefaultRecordType[], originColumns: DefaultRecordType[], fixed: boolean) => {
	    columns.forEach((col: DefaultRecordType, index: number) => {
	        if (col.children && Array.isArray(col.children) && col.children.length) {
	            this.setColumnsFixed(col.children, originColumns[index].children, fixed);
	        }
	        originColumns[index].fixed = fixed;
	    })
	}

	handleContextMenu = (event: any) => {
	    let target = event.target as any;
	    let { nodeName, parentElement } = target;
	    const { openSelectCells } = this.props;
	    const { selectCellColumnKeys, selectCellRowsKeys } = this.state;
	    if (nodeName !== "TD" || !openSelectCells) {
	        return;
	    }
	    this.contextMenuKey = parentElement.dataset.rowKey; // 当前行的key
	    this.contextMenuDataIndex = target.dataset.index; // 当前单元格的dataIndex
	    event.preventDefault();
	    event.stopPropagation()

	    if ((!this.contextMenuKey && this.contextMenuKey != '0') || (!this.contextMenuDataIndex && this.contextMenuDataIndex != '0')) return;

	    // const { selectCellColumnKeys, selectCellRowsKeys } = this.state;
	    // const boxLeft = this.contentTable?.getBoundingClientRect().left || 0;
	    // const boxTop = this.contentTable?.getBoundingClientRect().top || 0;
	    // const boxLeft = target?.getBoundingClientRect().left || 0;
	    // const boxTop = target?.getBoundingClientRect().top || 0;
	    // console.log('boxTop', boxTop, target, event.clientY)
	    // let l = event.clientX - boxLeft + 2; // 2代表点击位置有个稍微的错开位移
	    // let t = event.clientY - boxTop + 2;
	    let l = event.clientX; // 2代表点击位置有个稍微的错开位移
	    let t = event.clientY;
	    // 判断框选的单元格是否包含当前右键的单元格，如果包含，则直接弹出右键，如果不包含，取消原来的框选，改为框选当前单元格
	    if (!selectCellColumnKeys.includes(this.contextMenuDataIndex) || !selectCellRowsKeys.includes(this.contextMenuKey)) {
	        this.setState({
	            selectCellColumnKeys: [this.contextMenuDataIndex],
	            selectCellRowsKeys: [this.contextMenuKey]
	        })
	        this.tablepopmenu?.show(event, [this.contextMenuKey], [this.contextMenuDataIndex], l, t);
	    } else {
	        this.tablepopmenu?.show(event, selectCellRowsKeys, selectCellColumnKeys, l, t);
	    }
	    return false;
	}

	// 下拉显示隐藏回调
	onPopMenuIsShow = (open: boolean) => {
	    let { onPopMenu } = this.props
	    const { selectCellColumnKeys, selectCellRowsKeys } = this.state;
	    if (onPopMenu) {
	        // onPopMenu(open, this.contextMenuKey, this.contextMenuDataIndex)
	        onPopMenu(open, selectCellRowsKeys, selectCellColumnKeys)
	    }
	}

	// 右键弹出菜单相关回调
	handleMenuClick = (type: Key, rowKeys: Key[], colKeys: Key[]) => {
	    let {onPopMenuClick} = this.props;
	    if (onPopMenuClick) {
	        onPopMenuClick(type, rowKeys, colKeys)
	    }
	}

	resizeWindow = () => {
	    const { fillSpace, filterColumnShowModal, filterColumnOpenCloumList, scrollType} = this.props;

	    if (fillSpace) {
	        this.setFillSpaceFun();
	    } else {
	        this.fillSpaceStyle = {}
	        this.emptyFillHeight = null
	    }
	    if (filterColumnShowModal) {
	        if (!this.headTable && scrollType !== 'single') return;
	        let contentTableHeight = (this.contentTable as HTMLElement).getBoundingClientRect().height;// 表格容器宽度
	        // let DH = document.body.clientHeight;
	        // let CH = this.headTable.getBoundingClientRect()?.bottom;
	        let adaptiveHeight = contentTableHeight - this.getHeaderHeight()
	        filterColumnOpenCloumList && filterColumnOpenCloumList(adaptiveHeight);
	    }
	}

	scrollColumnFun = (props: TableProps) => {
	    let { currentScrollColumn } = props;
	    let columnsWidth = this.getColumnsWidth();
	    let leftColumns = columnsWidth.filter(item => item.fixed === 'left' || item.fixed === true);
	    // 非固定列
	    let centerColumns = columnsWidth.filter(item => !item.fixed && item.fixed !== 'left' && item.fixed !== 'right');
	    this.currentScrollColumnIndex = centerColumns.findIndex(col => col.key === currentScrollColumn);
	    if (this.currentScrollColumnIndex < 0) return;
	    let fixLeftWidth = 0;
	    let allOffsetWidth = 0;
	    columnsWidth.slice(0, this.currentScrollColumnIndex + leftColumns.length).forEach((col, _index) => {
	        if (col.key !== currentScrollColumn) {
	            if (col.fixed === 'left' || col.fixed === true) {
	                fixLeftWidth += col.width;
	            }
	            allOffsetWidth += col.width;
	        }
	    })
	    let offsetWidth = allOffsetWidth - fixLeftWidth;
	    // scrollLeft设置需要定时器设置
	    setTimeout(() => {
	        if (this.headTable) {
	            this.headTable.scrollLeft = offsetWidth;
	        }
	        if (this.bodyTable) {
	            this.bodyTable.scrollLeft = offsetWidth;
	        }
	        if (this.footTable) {
	            this.footTable.scrollLeft = offsetWidth;
	        }
	    }, 300)
	}

	// 抽离fillSpace逻辑
	setFillSpaceFun = () => {
	    const { scrollType, clsPrefix } = this.props;
	    const targetNode = this.contentTable as HTMLElement;
	    if (targetNode) {
	        fillTargetSpace(targetNode, undefined, (_element: HTMLElement, _parent: HTMLElement, noPaddingMaxW: number, noPaddingMaxH: number) => {
	            let refresh = true;
	            if (this.fillSpaceStyle) { // 保证误差在可控范围，不去重新渲染
	                let preWidth = parseFloat(this.fillSpaceStyle?.width || '0')
	                let preHeight = parseFloat(this.fillSpaceStyle?.height || '0')
	                if (isWithinTolerance(preWidth, noPaddingMaxW) && isWithinTolerance(preHeight, noPaddingMaxH)) {
	                    refresh = false;
	                    // return;
	                }
	            }
	            if (refresh) {
	                targetNode.style.width = 0 + 'px';
	                targetNode.style.height = 0 + 'px'
	                this.fillSpaceStyle = {
	                    width: noPaddingMaxW + 'px',
	                    height: noPaddingMaxH + 'px'
	                }
	                targetNode.style.width = noPaddingMaxW + 'px';
	                targetNode.style.height = noPaddingMaxH + 'px'
	            }
	            // 再计算之前先把表格部分高度置为0,防止对父元素高度宽度的计算产生影响，例如flex布局下父元素flex:1 填满剩余空间
	            // targetNode.style.width = 0 + 'px';
	            // targetNode.style.height = 0 + 'px'
	            // tip: 需要设置整体Table的宽高（通过变量加入style最妥当），需要设置scroll.y = noPaddingMaxH - 表头高度（考虑多表头）
	            // let {scroll} = this.state;
	            let maxHeaderHeight = this.getHeaderHeight();
	            // this.fillSpaceStyle = {
	            //     width: noPaddingMaxW + 'px',
	            //     height: noPaddingMaxH + 'px'
	            // }
	            // targetNode.style.width = noPaddingMaxW + 'px';
	            // targetNode.style.height = noPaddingMaxH + 'px'
	            let footCenterDomHeight = (this.footTable && this.footTable.clientHeight) || 0; // 默认合计行和边框的高度

	            this.emptyFillHeight = noPaddingMaxH - (scrollType === 'single' ? 0 : maxHeaderHeight) - footCenterDomHeight;
	            // fix布局尝试修改。验证footer等场景
	            if (this.emptyFillHeight) {
	                let centerBodyDom = targetNode.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-body`) as HTMLElement;
	                centerBodyDom.style.height = `${this.emptyFillHeight}px`
	            }
	        })
	    }
	}

	getHeaderHeight = () => {
	    const headCenterTableDom = (this.headTable && this.headTable.querySelector(`table[data-for-table='${this.tableUid}']`)) || (this.contentTable && this.contentTable.querySelector(`thead[data-for-head='${this.tableUid}']`)); // 兼容单表格模式
	    const priorityHeight = this.state.cssRowHeaderHeight;
	    // 计算出左中右三个表头的最大高度值
	    let maxHeight = Math.ceil(Math.max( // 注意：不能使用getBoundingClientRect().height在ie下会出现小数点导致高度自动增长的问题
	        // headCenterTableDom ? Math.ceil(headCenterTableDom.clientHeight) : 0,
	        headCenterTableDom ? Math.ceil(headCenterTableDom?.getBoundingClientRect().height) : 0,
	        priorityHeight || 30
	    ));
	    return maxHeight
	}

	resize = () => {
	    this.debounceResize && this.debounceResize()
	}

	// 计算最后一列补充宽度，影响因素（columns,data, children, scroll）
	computeTableWidth = () => {
	    let {expandIconAsCell, showExpandColumn, bordered} = this.props;
	    // 如果用户传了scroll.x按用户传的为主
	    let setWidthParam = this.state.scroll && this.state.scroll.x;
	    // 用户传入scroll并且scroll.x大于容器宽度
	    if (this.contentTable) {
	        let contentDomWidth = (this.contentTable as HTMLElement).getBoundingClientRect().width;// 表格容器宽度
	        if (!contentDomWidth) return;
	        if (typeof (setWidthParam) == 'number' && contentDomWidth as number < setWidthParam) {
	            let numSetWidthParam = parseInt(setWidthParam + '');
	            this.contentWidth = numSetWidthParam;
	        } else {
	            // this.preContentDomWidth = this.contentDomWidth;
	            // 计算总表格宽度、根据表格宽度和各列的宽度和比较，重置最后一列
	            // this.contentDomWidth = (this.contentTable as HTMLElement).getBoundingClientRect().width;// 表格容器宽度

	            this.contentWidth = contentDomWidth;// 默认与容器宽度一样

	        }
	        const computeObj = this.columnManager.getColumnWidth(this.contentWidth);
	        const expandColWidth = expandIconAsCell && showExpandColumn ? (this.props.expandIconCellWidth || expandIconCellWidth) : 0;
	        let lastShowIndex = computeObj.lastShowIndex;
	        let lastDataIndex = computeObj.lastDataIndex;
	        this.computeWidth = computeObj.computeWidth + expandColWidth;

	        this.domWidthDiff = contentDomWidth - this.computeWidth;
	        if (typeof (setWidthParam) == 'string' && setWidthParam.indexOf('%')) {
	            this.contentWidth = this.contentWidth * parseInt(setWidthParam) / 100;
	            this.domWidthDiff = contentDomWidth - this.contentWidth;
	        }

	        if (this.computeWidth < this.contentWidth) {
	            // 列总长度和 < 渲染表格宽度，竖向滚动条宽度占据渲染表格宽度，所以需要判断是否有竖向滚动条，不应该判断是否有滚动条宽度
	            const {clsPrefix} = this.props;
	            let tableDom = this.contentTable as HTMLElement;
	            let centerBodyDom = tableDom.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-body`) as HTMLElement;
	            let centerBodyTableDom = tableDom.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-body > table[data-for-table='${this.tableUid}']`) as HTMLElement;
	            let scrollbarWidth = this.scrollbarWidth;
	            let hasCenterScrollY = centerBodyTableDom.getBoundingClientRect().height > centerBodyDom.getBoundingClientRect().height;
	        	// let hasCenterScrollX = centerBodyDom.scrollWidth > centerBodyDom.clientWidth + (hasCenterScrollY ? scrollbarWidth : 0)
	            // let hasCenterScrollX = centerBodyDom.scrollWidth > centerBodyDom.clientWidth;// 中间区域存在水平滚动条(新版边框不影响这个逻辑，不需要加1)
	            // // 如果存在合计行，则滚动条位于tfoot区域，判断是否存在y滚动条 不用减去x滚动条宽度(合计行吸底后dom结构变更带来逻辑影响)
	            // let hasCenterScrollY = centerBodyTableDom.getBoundingClientRect().height > Math.ceil(centerBodyDom.getBoundingClientRect().height) - (hasCenterScrollX && !showSum ? scrollbarWidth : 0);// 中间区域是否存在垂直滚动条
	            let contentWidthDiff = hasCenterScrollY ? Math.ceil(this.contentWidth) - this.computeWidth - scrollbarWidth : this.contentWidth - this.computeWidth;
	            // Tip: 由于表头边框不再受bordered影响，表格需要减去左右边框的差值2
	            contentWidthDiff = contentWidthDiff - (getBordered(bordered) ? 2 : 0);
	            if (!isWithinTolerance(this.state.contentWidthDiff || 0, contentWidthDiff) || this.state.lastShowIndex !== lastShowIndex || this.state.lastDataIndex !== lastDataIndex || !isWithinTolerance(this.state.contentDomWidth, contentDomWidth)) {
	            // if (this.state.contentWidthDiff !== contentWidthDiff || this.state.lastShowIndex !== lastShowIndex || this.state.lastDataIndex !== lastDataIndex) {
	                this.setState({contentWidthDiff, lastShowIndex, lastDataIndex, contentDomWidth});
	            }
	        } else {
	            this.contentWidth = this.computeWidth;
	            if (this.state.contentWidthDiff !== 0 || this.state.lastShowIndex !== lastShowIndex || this.state.lastDataIndex !== lastDataIndex || this.state.contentDomWidth !== contentDomWidth) {
	                this.setState({contentWidthDiff: 0, lastShowIndex, lastDataIndex, contentDomWidth});// 重新渲染，为了显示滚动条
	            }
	        }
	    }
	}

	// 同步固定列情况下部分区域滚动条出现引起的错位问题
	syncFixedTableScrollWidth = () => {
	    const {clsPrefix, bordered, dir: direction} = this.props;
	    let { contentDomWidth } = this.state;
	    let tableDom = this.contentTable as HTMLElement;
	    if (tableDom && (this.contentTable as HTMLElement)?.getBoundingClientRect().width) {
	        let tableContentDom = tableDom.querySelector(`.${clsPrefix}-content`);
	        let centerBodyDom = tableDom.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-body`) as HTMLElement;
	        let centerHeadTableBoxDom = tableDom.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-header-box`) as HTMLElement;
	        let centerSumTableBoxDom = tableDom.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-sum-box`) as HTMLElement;
	        let centerHeadTableDom = tableDom.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-header > table[data-for-table='${this.tableUid}']`) as HTMLElement;
	        let centerBodyTableDom = tableDom.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-body > table[data-for-table='${this.tableUid}']`) as HTMLElement;
	        // 扩展行和无数据状态的dom应该是粘性布局，长度和表格保持一致
	        let noDataDom = tableDom.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-body .${clsPrefix}-placeholder[data-for-table='${this.tableUid}']`) as HTMLElement;
	        let expendDataDom = tableDom.querySelectorAll(`.${clsPrefix}-content-inner .${clsPrefix}-body .${clsPrefix}-expanded-row-content`) as NodeListOf<HTMLElement>;
	        if (!centerBodyTableDom) return;
	        let scrollbarWidth = this.scrollbarWidth;
	        let paddingDirection = direction === 'rtl' ? 'paddingLeft' : 'paddingRight';
	        // Tip: scrollWidth包含::after/::before伪类的宽度，所以针对全左固定等情况需要做特殊处理，减去伪类的宽度
	        // 所以在CSS中针对第一个td/th的右固定列或者最后一个td/th的左固定列去除阴影效果，防止计算失误

	        // this.contentDomWidth 表格容器宽度，横向vs纵向滚动条临界点互相影响
	        // 谷歌下mac,window都始终显示滚动条，火狐下mac默认不显示滚动条，滚动时才显示，window下显示滚动条
	        // let isWFF = browserInfo.osType == 'Win' && browserInfo.browserType == 'FF' // window && FF

	        // let isMFF = browserInfo.osType == 'Mac' && browserInfo.browserType == 'FF' // Mac && FF
	        // let hasCenterScrollX, hasCenterScrollY = false; // 默认false
	        // let originHasCenterScrollY = centerBodyTableDom.getBoundingClientRect().height > centerBodyDom.getBoundingClientRect().height;
	        // let originHasCenterScrollX = centerBodyDom.scrollWidth > centerBodyDom.clientWidth + (bordered ? 2 : 0);
	        // if (isMFF) {
	        //     hasCenterScrollY = originHasCenterScrollY;
	        // 	hasCenterScrollX = originHasCenterScrollX
	        // } else {
	        //     let exceedScrollbarWidthX = originHasCenterScrollX && centerBodyDom.scrollWidth - centerBodyDom.clientWidth + (bordered ? 2 : 0) >= scrollbarWidth;
	        //     let exceedScrollbarWidthY = originHasCenterScrollY && centerBodyTableDom.getBoundingClientRect().height - centerBodyDom.getBoundingClientRect().height >= scrollbarWidth;
	        //     if (!originHasCenterScrollX) { // 不存在横向滚动条，纵向滚动条对是否存在横向滚动条没有影响
	        //         if (!originHasCenterScrollY) { // 都不存在
	        //             hasCenterScrollX = originHasCenterScrollX;
	        //         	hasCenterScrollY = originHasCenterScrollY;
	        //         } else { // 存在纵向滚动条，不存在横向，纵向影响横向
	        //             hasCenterScrollX = centerBodyDom.scrollWidth + scrollbarWidth >= centerBodyDom.clientWidth + (bordered ? 2 : 0);
	        //             hasCenterScrollY = originHasCenterScrollY;
	        //         }
	        //     } else { // 存在横向滚动条
	        //         if (exceedScrollbarWidthX) { // 存在横向滚动条并且超出了滚动条宽度的距离，那么是否存在纵向滚动条对是否存在横向滚动条没有影响
	        //             hasCenterScrollX = originHasCenterScrollX; // 横向滚动条愿逻辑判断
	        //        		hasCenterScrollY = centerBodyTableDom.getBoundingClientRect().height + scrollbarWidth > centerBodyDom.getBoundingClientRect().height; // 纵向滚动条判断要加上滚动条宽度
	        //         } else { // 存在横向滚动条并且超出距离小于滚动条的宽度，那么纵向滚动条是否存在影响横向滚动条
	        //             if (!originHasCenterScrollY) { //
	        //                 hasCenterScrollY = centerBodyTableDom.getBoundingClientRect().height + scrollbarWidth > centerBodyDom.getBoundingClientRect().height;
	        // 				hasCenterScrollX = originHasCenterScrollX
	        //             } else {
	        //                 if (exceedScrollbarWidthY) { // 存在纵向滚动条并且滚动距离大于滚动条宽度，那么横向滚动条不影响纵向滚动条
	        //                     hasCenterScrollY = originHasCenterScrollY;
	        //                     hasCenterScrollX = centerBodyDom.scrollWidth > centerBodyDom.clientWidth + (bordered ? 2 : 0) + scrollbarWidth
	        //                 } else { // 存在纵向滚动条并且滚动距离小于滚动条宽度（临界点）
	        //                     hasCenterScrollY = originHasCenterScrollY;
	        //                     hasCenterScrollX = originHasCenterScrollX
	        //                 }
	        //             }
	        //         }
	        //     }
	        // }


	        let hasCenterScrollY = centerBodyTableDom.getBoundingClientRect().height > centerBodyDom.getBoundingClientRect().height;
	        // let hasCenterScrollX = centerBodyDom.scrollWidth > centerBodyDom.clientWidth + (bordered ? 2 : 0)
	        let hasCenterScrollX = centerBodyDom.scrollWidth > centerBodyDom.clientWidth + (hasCenterScrollY ? scrollbarWidth : 0) + (getBordered(bordered) ? 2 : 0)

	        // let hasCenterScrollX = centerBodyDom.scrollWidth > centerBodyDom.clientWidth;// 中间区域存在水平滚动条(新版边框不影响这个逻辑，不需要加1)
	        // 如果存在合计行，则滚动条位于tfoot区域，判断是否存在y滚动条 不用减去x滚动条宽度(合计行吸底后dom结构变更带来逻辑影响)
	        // let hasCenterScrollY = centerBodyTableDom.getBoundingClientRect().height > Math.ceil(centerBodyDom.getBoundingClientRect().height) - (hasCenterScrollX && !showSum ? scrollbarWidth : 0);// 中间区域是否存在垂直滚动条
	        // 为表格追加是否存在滚动条的样式标识
	        if (tableContentDom) {
	            if (hasCenterScrollX) {
	                if (!tableContentDom.classList.contains('has-scroll-x')) tableContentDom.classList.add('has-scroll-x');
	                centerBodyDom.style.overflowX = 'scroll'
	            } else {
	                tableContentDom.classList.remove('has-scroll-x');
	                centerBodyDom.style.overflowX = 'hidden'
	            }
	            if (hasCenterScrollY) {
	                if (!tableContentDom.classList.contains('has-scroll-y')) tableContentDom.classList.add('has-scroll-y');
	                centerBodyDom.style.overflowY = 'scroll'
	                if (noDataDom) {
	                    let noDataDomWidth = getBordered(bordered) ? contentDomWidth - scrollbarWidth - 2 : contentDomWidth - scrollbarWidth
	                    noDataDom.style.width = getBordered(bordered) ? `${contentDomWidth - scrollbarWidth - 2}px` : `${contentDomWidth - scrollbarWidth}px`;
	                    noDataDom.style.padding = noDataDomWidth === 0 ? '0' : '10px 8px'
	                }
	                if (expendDataDom) {
	                    (expendDataDom || []).forEach(node => {
	                        node.style.width = getBordered(bordered) ? `${Math .ceil(contentDomWidth) - scrollbarWidth - 2}px` : `${Math .ceil(contentDomWidth) - scrollbarWidth}px`;
	                    })
	                }
	                if (this.headTable) {
	                    // centerHeadTableBoxDom.style.paddingRight = bordered ? `${scrollbarWidth + 1}px` : `${scrollbarWidth}px`;
	                    (centerHeadTableBoxDom.style as any)[`${paddingDirection}`] = `${scrollbarWidth}px`;
	                    centerHeadTableBoxDom.classList.add(`${clsPrefix}-scroll-header`);
	                    if (browserInfo.osType == 'Mac' && browserInfo.browserType == 'FF') { // 解决Mac下FF的头部空间多出的问题
	                    	(centerHeadTableBoxDom.style as any)[`${paddingDirection}`] = `0px`;
	                        centerHeadTableBoxDom.classList.remove(`${clsPrefix}-scroll-header`);
	                    }
	                    if (browserInfo.browserType == 'FF') { // 解决Mac下FF的头部空间多出的问题
	                        // centerHeadTableDom.style.paddingRight = bordered ? `${scrollbarWidth + 1}px` : `${scrollbarWidth}px`;
	                    	(centerHeadTableDom.style as any)[`${paddingDirection}`] = `${scrollbarWidth}px`;
	                    }
	                }
	                if (this.footTable) {
	                    (centerSumTableBoxDom.style as any)[`${paddingDirection}`] = `${scrollbarWidth}px`;
	                    centerSumTableBoxDom.classList.add(`${clsPrefix}-scroll-sum`);
	                    // this.footTable.style.paddingRight = `${scrollbarWidth}px`;
	                    if (browserInfo.osType == 'Mac' && browserInfo.browserType == 'FF') { // 解决Mac下FF的头部空间多出的问题
	                    	(this.footTable.style as any)[`${paddingDirection}`] = `0px`;
	                        this.footTable.classList.remove(`${clsPrefix}-scroll-header`);
	                    }
	                }

	            } else {
	                tableContentDom.classList.remove('has-scroll-y');
	                centerBodyDom.style.overflowY = 'hidden'
	                if (noDataDom) {
	                    let noDataDomWidth = getBordered(bordered) ? contentDomWidth - 2 : contentDomWidth
	                    noDataDom.style.width = getBordered(bordered) ? `${contentDomWidth - 2}px` : `${contentDomWidth}px`;
	                    noDataDom.style.padding = noDataDomWidth === 0 ? '0' : '10px 8px'
	                }
	                if (expendDataDom) {
	                    (expendDataDom || []).forEach(node => {
	                        node.style.width = getBordered(bordered) ? `${Math .ceil(contentDomWidth) - 2}px` : `${Math .ceil(contentDomWidth)}px`;
	                    })
	                }
	                if (this.headTable) {
	                    (centerHeadTableBoxDom.style as any)[`${paddingDirection}`] = `0px`
	                    centerHeadTableBoxDom.classList.remove(`${clsPrefix}-scroll-header`);
	                    if (browserInfo.browserType == 'FF') { // 解决Mac下FF的头部空间多出的问题
	                    	(centerHeadTableDom.style as any)[`${paddingDirection}`] = `0px`;
	                    }
	                }
	                if (this.footTable) {
	                    (centerSumTableBoxDom.style as any)[`${paddingDirection}`] = `0px`;
	                    centerSumTableBoxDom.classList.remove(`${clsPrefix}-scroll-sum`);
	                    (this.footTable.style as any)[`${paddingDirection}`] = `0px`
	                }

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

	onExpandedAll = (expanded: boolean) => {
	    let { onExpandAll, expandedRowKeys } = this.props
	    let innerExpandedRowKeys = [];
	    if (!expanded) {
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
	    if (this.store.getState().currentHoverKey == rowKey && this.hoverDom) {
	        this.hoverContentStyle.display = 'none';
	        this.store.setState({hoverContentStyle: this.hoverContentStyle});
	    }

	    // todo:如果是TableRow组件卸载触发的该方法，需要加判断，解决懒加载时，持续触发onExpandedRowsChange的问题
	    if (isExpandOperation) {
	        this.onExpandedRowsChange(expandedRows);
	    } else {
	        const info = this.findExpandedRow(record, index);
	        if (typeof info === 'undefined' && expandedRows.includes(this.getRowKey(record, index))) {
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

	getHeader = (columns: ColumnsType, maxLevel: number, leftFixedWidth?: number, rightFixedWidth?: number) => {
	    const {
	        filterDelay,
	        onFilterChange,
	        onFilterClear,
	        filterable,
	        showHeader,
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
	        headerHeight,
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
	        bigColumns,
	        expandIconColumnIndex,
	        childrenColumnName,
	        expandIconAsCell,
	        showExpandColumn,
	        dir: direction,
	        data
	    } = this.props;
	    let { expandedRowKeys } = this.state
	    let expandedFlag = false
	    if (Array.isArray(expandedRowKeys)) {
	        // expandedFlag = expandedRowKeys?.filter(Boolean)?.length !== 0
	        let innerExpandedRowKeys = [];
	        let rows = [...(data || [])];
	        for (let i = 0; i < rows.length; i++) {
	            const row = rows[i];
	            innerExpandedRowKeys.push(this.getRowKey(row, i));
	            rows = rows.concat(row[this.props.childrenColumnName] || []);
	        }
	        expandedFlag = innerExpandedRowKeys.every((item) => expandedRowKeys.includes(item))
	    }
	    let columnsChildrenList:InnerColumnType[] = []; // 复杂表头拖拽，重新render表头前，将其置空
	    const rows = this.getHeaderRows({columns, columnsChildrenList });
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
	    const needIndentSpaced = (data || []).some(record => record[childrenColumnName]);
	    return showHeader ? (
	        <TableHeader
	            {...drop}
	            {...dragBorder}
	            columnManager={this.columnManager}
	            columnsChildrenList={columnsChildrenList}
	            locale={this.props.locale}
	            minColumnWidth={minColumnWidth}
	            contentWidthDiff={this.state.contentWidthDiff}
	            // contentWidth={this.contentWidth}
	            clsPrefix={clsPrefix}
	            rows={rows}
	            contentTable={this.contentTable}
	            rowStyle={trStyle}
	            // fixed={fixed}
	            filterable={filterable}
	            onFilterChange={onFilterChange}
	            onFilterClear={onFilterClear}
	            filterDelay={filterDelay}
	            afterDragColWidth={afterDragColWidth}
	            contentDomWidth={this.state.contentDomWidth}
	            scrollbarWidth={this.scrollbarWidth}
	            // headerScroll={headerScroll}
	            bordered={getBordered(bordered)}
	            tableUid={this.tableUid}
	            leftFixedWidth={leftFixedWidth}
	            rightFixedWidth={rightFixedWidth}
	            bodyDisplayInRow={bodyDisplayInRow}
	            eventNoStop={headerEventNoStop}
	            onCopy={onCopy}
	            fieldid={fieldid}
	            onHeaderRow={onHeaderRow}
	            bigColumns={bigColumns}
	            headerHeight={headerHeight}
	            maxLevel={maxLevel}
	            expandIconColumnIndex={expandIconColumnIndex}
	            onExpandedAll={this.onExpandedAll}
	            needIndentSpaced={needIndentSpaced}
	            expanded={expandedFlag}
	            expandIconAsCell={expandIconAsCell}
	            showHeaderExpandIcon={this.props.showHeaderExpandIcon}
	            expandableColumnTitle={this.props.expandableColumnTitle}
	            showExpandColumn={showExpandColumn}
	            dir={direction}
	        />
	    ) : null;
	}

	getHeaderRows = (options: {columns: ColumnsType, currentRow?: number, rows?: any[], columnsChildrenList: ColumnsType}) => {
	    let {columns, currentRow = 0, rows, columnsChildrenList} = options;
	    const {columnKey} = this.props;
	    let filterCol: any[] = [];
	    rows = rows || [];
	    rows[currentRow] = rows[currentRow] || [];
	    // let centerShowColCount = 0;

	    columns.forEach((column: InnerColumnType) => {
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
	        let adapterNid = getNid(column)
	        const cell:DefaultRecordType = {
	            key: column.key,
	            className: column.className || '',
	            children: column.title,
	            // children: children,
	            innerHeaderIcon: column.innerHeaderIcon,
	            drgHover: column.drgHover,
	            fixed: column.fixed,
	            width: width,
	            dataIndex: column.dataIndex,
	            textAlign: column.textAlign,
	            titleAlign: column.titleAlign, // 标题水平对齐方式
	            required: column.required, // 标题是否展示必填标志
	            dragborder: column.dragborder, // 此列是否可拖动
	            fieldid: column.fieldid,
	            offsetWidth: column.offsetWidth,
	            // isSticky: column.isSticky,
	            isLastLeft: column.isLastLeft,
	            isFirstRight: column.isFirstRight,
	            isAllLeft: column.isAllLeft,
	            tip: column.tip,
	            ...adapterNid
	        };
	        if (column.onHeadCellClick) {
	            cell.onClick = column.onHeadCellClick;
	        }
	        if (column.children) {
	            this.getHeaderRows({columns: column.children as InnerColumnType[], currentRow: currentRow + 1, rows, columnsChildrenList});
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
	                filterinputnumberoptions: column.filterInputNumberOptions, // 设置数值框内的详细属性
	                fieldid: column.fieldid,
	                offsetWidth: column.offsetWidth,
	                // isSticky: column.isSticky,
	                isLastLeft: column.isLastLeft,
	                isFirstRight: column.isFirstRight,
	                isAllLeft: column.isAllLeft
	            });
	        }
	    });
	    if (this.props.filterable) {
	        rows.push(filterCol);
	    }
	    return rows.filter(row => row.length > 0);
	}

	// 扁平化可展示的数据，需要判断父节点是否是展开状态
	getFlatData = (data: DefaultRecordType[]): DefaultRecordType[] => {
	    const { childrenColumnName } = this.props;
	    const { expandedRowKeys } = this.state;
	    let flatData: DefaultRecordType[] = [];
	    data.forEach((record, index) => {
	        flatData.push(record);
	        if (record[childrenColumnName] && Array.isArray(record[childrenColumnName]) && record[childrenColumnName].length > 0) {
	            if (expandedRowKeys.includes(this.getRowKey(record, index))) {
	                flatData = flatData.concat(this.getFlatData(record[childrenColumnName]));
	            }
	        }
	    });
	    return flatData;
	}

	onInnerCopyCell = (_e: any, type:string) => {
	    this.copyType = type;
	    document.execCommand('copy');
	}

	getSelectData = () => {
	    const { selectCellColumnKeys, selectCellRowsKeys } = this.state;
	    if (!selectCellColumnKeys.length || !selectCellRowsKeys.length) return;
	    let copyCellColumnKeys = [...selectCellColumnKeys];
	    let copyCellRowsKeys = [...selectCellRowsKeys];
	    if (this.copyType === '_row') { // 复制整行，只复制行的数据，列统计需要从第一列到最后一列
	        copyCellColumnKeys = this.leafLeafColumns.map((col: InnerColumnType) => col.key || col.dataIndex);
	    } else if (this.copyType === '_cell') { // 复制整列，只复制列的数据，行统计需要从第一行到最后一行
	        copyCellRowsKeys = this.flatData.map((record: DefaultRecordType, index: number) => this.getRowKey(record, index));
	    }
	    let copyText = '';
	    for (let i = 0; i <= copyCellRowsKeys.length; i++) {
	        for (let j = 0; j <= copyCellColumnKeys.length; j++) {
	            const record = this.flatData.find((item: DefaultRecordType) => this.getRowKey(item, i) === copyCellRowsKeys[i]);
	            if (!record) continue;
	            const column = this.columnManager.leafColumns().find((col: InnerColumnType) => col.key === copyCellColumnKeys[j] || col.dataIndex === copyCellColumnKeys[j]);
	            if (!column) continue;
	            copyText += (this.cellTextTarget[copyCellRowsKeys[i]][copyCellColumnKeys[j]] || {}).text + '\t';
	            // copyText += record[column.dataIndex] + '\t';
	        }
	        if (i !== copyCellRowsKeys.length) {
	            copyText += '\n';
	        }
	    }
	    return copyText;
	}

	onCopyCell = (e: any) => {
	    if (!this.selFirstCol) return;
	    // 复制单元格的内容到粘贴板，边框变为虚线
	    this.selectCellCopyed = true;
	    const copyText = this.getSelectData();
	    this.copyType = '_all'; // 重制
	    if (e?.type === 'copy') {
	        e?.clipboardData.setData('text/plain', copyText);
	        this.setState({ renderFlag: this.state.renderFlag }); // 触发重新渲染
	        e?.preventDefault();
	    }
	}

	// 单元格鼠标按下事件
	onCellMouseDown = (event: React.MouseEvent<HTMLElement>, record: DefaultRecordType, rowIndex: number, columnKey: Key) => {
	    const { openSelectCells } = this.props;
	    if (!openSelectCells || !columnKey || event.button === 2) return; // 未开启则不做任何操作, 无key和dataIndex则不做任何操作, 右键不做任何操作
	    const { nativeEvent } = event;
	    const { shiftKey } = nativeEvent;
	    this.leafLeafColumns = this.columnManager.leafColumns(); // 末级节点的列
	    this.flatData = this.getFlatData(this.props.data || []); // 扁平化数据
	    if (this.selFirstCol && shiftKey) { // 已经选中了第一个单元格，且按下shift键，则选中区域
	        this.cellSelecting = true; // 开始选中单元格
	        const currentColIndex = this.leafLeafColumns.findIndex((col: InnerColumnType) => col.key === columnKey || col.dataIndex === columnKey);
	        this.selectColIndexSet?.add(currentColIndex);
	        this.selLastColIndex = currentColIndex;
	        this.selectColMap?.set(currentColIndex, columnKey)
	        this.selLastRowIndex = rowIndex;
	        this.selRowIndexSet?.add(rowIndex)
	        this.selectRowMap?.set(rowIndex, this.getRowKey(record, rowIndex))


	        const [selectCellColumnKeys, selectCellRowsKeys] = this.getMergeSelectCells(rowIndex);
	        this.setState({
	            selectCellColumnKeys,
	            selectCellRowsKeys
	        })
	    } else {
	        if (this.selFirstCol && !shiftKey) { // 已经选中了第一个单元格，且没有按下shift键，则清空之前选中的单元格
	            this.clearSelectCells()
	        }
	        this.selFirstCol = columnKey; // 第一个选中的列
	        this.selFirstColIndex = this.leafLeafColumns.findIndex((col: InnerColumnType) => col.key === columnKey || col.dataIndex === columnKey); // 第一个选中列的索引
	        this.selectColIndexSet = new Set([this.selFirstColIndex]) // 选中的列索引集合
	        this.selectColMap = new Map();
	        this.selectRowMap = new Map();
	        this.selectColMap.set(this.selFirstColIndex, columnKey); // 选中的列索引和列key的映射
	        this.selFirstRowIndex = rowIndex;
	        this.selRowIndexSet = new Set([rowIndex]);
	        this.selectRowMap.set(rowIndex, this.getRowKey(record, rowIndex)); // 选中的行索引和行key的映射
	        this.cellSelecting = true; // 开始选中单元格
	        let selectCellColumnKeys = [columnKey]
	        let selectCellRowsKeys = [this.getRowKey(record, rowIndex)]
	        this.selectCellCopyed = false; // 标志是否已经复制，未复制则为实线，已复制则为虚线
	        this.setState({
	            selectCellColumnKeys,
	            selectCellRowsKeys
	        })
	    }
	}

	// 单元格鼠标进入事件
	onCellMouseEnter = (_event: React.MouseEvent<HTMLElement>, record: DefaultRecordType, rowIndex: number, columnKey: Key) => {
	    if (this.cellSelecting) {
	        const currentColIndex = this.leafLeafColumns.findIndex((col: InnerColumnType) => col.key === columnKey || col.dataIndex === columnKey);
	        this.selectColIndexSet?.add(currentColIndex);
	        this.selLastColIndex = currentColIndex;
	        this.selectColMap?.set(currentColIndex, columnKey)
	        this.selLastRowIndex = rowIndex;
	        this.selRowIndexSet?.add(rowIndex)
	        this.selectRowMap?.set(rowIndex, this.getRowKey(record, rowIndex))


	        const [selectCellColumnKeys, selectCellRowsKeys] = this.getMergeSelectCells(rowIndex);
	        this.setState({
	            selectCellColumnKeys,
	            selectCellRowsKeys
	        })
	    }
	}

	// 处理合并行，合并列情况，返回最终的选择的列和行
	getMergeSelectCells = (rowIndex: number) => {
	    if (!this.flatData || !this.flatData.length) return [[], []];
	    let firstCol = Math.min(this.selFirstColIndex, this.selLastColIndex);
      	let lastCol = Math.max(this.selFirstColIndex, this.selLastColIndex);
	    let firstRow = Math.min(this.selFirstRowIndex, rowIndex);
	    let lastRow = Math.max(this.selFirstRowIndex, rowIndex);
	    let selectCellColumnKeys: any[] = [];
	    let selectCellRowsKeys: any[] = [];

	    // 找到合并列中的第一列和最后一列

	    let maxFirstColSpan = 0;
	    let maxLastColSpan = 0;

	    for (let i = firstRow; i <= lastRow; i++) {
	        const currentRowKey = this.getRowKey(this.flatData[i], i);
	        let firstColKey = this.leafLeafColumns[firstCol].key || this.leafLeafColumns[firstCol].dataIndex;
	        let prevColKeyIndex = firstCol - 1; // 前一个
	        let firstRowColSpan = (this.cellTextTarget[currentRowKey][firstColKey] || {}).colSpan;
	        let firstNum = 0; // 第一列相对于这行向左偏移量
	        let lastNum = 0; // 最后一列相对于这行向右偏移量
	        while (prevColKeyIndex >= 0 && firstRowColSpan < 1) {
	            let prevColKey = this.leafLeafColumns[prevColKeyIndex].key || this.leafLeafColumns[prevColKeyIndex].dataIndex;
	            prevColKeyIndex--;
	            firstNum++;
	            firstRowColSpan = (this.cellTextTarget[currentRowKey][prevColKey] || {}).colSpan;
	        }
	        maxFirstColSpan = Math.max(maxFirstColSpan, firstNum) // 取最大值的偏移量
	        let lastColKey = this.leafLeafColumns[lastCol].key || this.leafLeafColumns[lastCol].dataIndex;
	        let lastRowColSpan = (this.cellTextTarget[currentRowKey][lastColKey] || {}).colSpan;
	        if (lastRowColSpan > 1) { // 直接移动到合并列的第一列
	            lastNum = lastRowColSpan - 1;
	        } else if (lastRowColSpan < 1) { // 合并列中的非第一列
	            let prevColKeyIndex = lastCol - 1; // 找前一列
	            while (prevColKeyIndex >= 0 && lastRowColSpan < 1) {
	                let prevColKey = this.leafLeafColumns[prevColKeyIndex].key || this.leafLeafColumns[prevColKeyIndex].dataIndex;
	                prevColKeyIndex--;
	                lastNum++;
	                lastRowColSpan = (this.cellTextTarget[currentRowKey][prevColKey] || {}).colSpan;
	            }
	            // lastNum --;
	            // console.log('合并列中的非第一列', lastCol, maxLastColSpan, lastNum)
	            lastNum = lastRowColSpan - lastNum - 1
	        }

	        maxLastColSpan = Math.max(maxLastColSpan, lastNum); // 取最大值的偏移量
	    }

	    // 修正第一列和最后一列
	    firstCol = Math.min(firstCol, firstCol - maxFirstColSpan);
	    lastCol = Math.max(lastCol, lastCol + maxLastColSpan)

	    // 找到合并行中的第一行和最后一行
	    let maxFirstRowSpan = 0;
	    let maxLastRowSpan = 0;

	    for (let i = firstCol; i <= lastCol; i++) {
	        const currentKey = this.leafLeafColumns[i].key || this.leafLeafColumns[i].dataIndex;
	        let firstRowKey = this.getRowKey(this.flatData[firstRow], firstRow);
	        let firstColRowSpan = (this.cellTextTarget[firstRowKey][currentKey] || {}).rowSpan;
	        let firstNum = 0; // 第一行相对于这列向上偏移量
	        let lastNum = 0; // 最后一行相对于这列向下偏移量
	        while (firstRowKey && firstColRowSpan < 1) {
	            let prevRow = firstRow - 1;
	            let prevRowKey = this.getRowKey(this.flatData[prevRow], prevRow)
	            firstColRowSpan = (this.cellTextTarget[prevRowKey][currentKey] || {}).rowSpan;
	            prevRow--;
	            firstNum++;
	        }
	        maxFirstRowSpan = Math.max(maxFirstRowSpan, firstNum);
	        // maxFirstRowSpan = maxFirstRowSpan - firstNum;

	        let lastRowKey = this.getRowKey(this.flatData[lastRow], lastRow);
	        let lastColRowSpan = (this.cellTextTarget[lastRowKey][currentKey] || {}).rowSpan;
	        if (lastColRowSpan > 1) { // 直接移动到合并行的第一行
	            // lastNum = Math.max(maxLastRowSpan, lastColRowSpan);
	            lastNum = lastColRowSpan - 1;
	        } else if (lastColRowSpan < 1) {
	            let prevRow = lastRow - 1; // 向上查找到合并行的第一行
	            while (lastRowKey >= 0 && lastColRowSpan < 1) {
	                let prevRowKey = this.getRowKey(this.flatData[prevRow], prevRow)
	                lastColRowSpan = (this.cellTextTarget[prevRowKey][currentKey] || {}).rowSpan;
	                prevRow--;
	                lastNum++;
	            }
	            // lastNum--;
	            lastNum = lastColRowSpan - lastNum - 1
	        }
	        maxLastRowSpan = Math.max(maxLastRowSpan, lastNum);
	    }

	    // 修正第一行和最后一行
	    firstRow = Math.min(firstRow, firstRow - maxFirstRowSpan);
	    lastRow = Math.max(lastRow, lastRow + maxLastRowSpan)

	    for (let i = firstCol; i <= lastCol; i++) {
	        const currentKey = this.leafLeafColumns[i].key || this.leafLeafColumns[i].dataIndex;
	        // console.log('当前列', this.leafLeafColumns[i])
	        selectCellColumnKeys.push(currentKey);
	        for (let j = firstRow; j <= lastRow; j++) {
	            const currentRowKey = this.getRowKey(this.flatData[j], j);
	            // console.log('当前行', this.flatData[j])
	            selectCellRowsKeys.push(currentRowKey);
	            const currentCell = this.cellTextTarget[currentRowKey][currentKey];
	            // 合并行的情况会没有currentCell
	            if (!currentCell) continue;
	            const { rowSpan = 1, colSpan = 1 } = currentCell;
	            if (rowSpan > 1) {
	                lastRow = Math.max(lastRow, j + rowSpan - 1);
	            }
	            if (colSpan > 1) {
	                lastCol = Math.max(lastCol, i + colSpan - 1);
	            }
	        }
	    }
	    return [selectCellColumnKeys, [...new Set(selectCellRowsKeys)]]
	}
	// 设置class类名
	setCellSelectClass = (record: DefaultRecordType, index: number, column: InnerColumnType) => {
	    const { getCellClassName, clsPrefix } = this.props;
	    const { selectCellColumnKeys = [], selectCellRowsKeys = []} = this.state;
	    const columnKey = column.key || column.dataIndex;
	    let className = getCellClassName && getCellClassName(record, index, column) || '';
	    if (selectCellColumnKeys.length === 0 || selectCellRowsKeys.length === 0 || !columnKey) {
	        return className;
	    }
	    const lineType = this.selectCellCopyed ? 'dashed' : 'solid';
	    const cellSelectClass = `${clsPrefix}-cell-selected`;
	    // console.log('selectCellColumnKeys', selectCellColumnKeys, 'selectCellRowsKeys', selectCellRowsKeys)
	    const rowKey = this.getRowKey(record, index);
	    let currentSelectColIndex = selectCellColumnKeys.indexOf(columnKey);
	    let currentSelectRowIndex = selectCellRowsKeys.indexOf(rowKey);

	    if (currentSelectColIndex < 0) {
	        return className;
	    } else {
	        let currentSelectColKey = selectCellColumnKeys[currentSelectColIndex];
	        if (currentSelectColIndex === 0 && currentSelectColIndex === selectCellColumnKeys.length - 1) { // 只选中一列
	            if (currentSelectRowIndex < 0) {
	                return className;
	            } else {
	                let currentSelectRowKey = selectCellRowsKeys[currentSelectRowIndex];
	                if (currentSelectRowIndex === 0 && currentSelectRowIndex === selectCellRowsKeys.length - 1) { // 只选中一行
	                    return `${className} ${cellSelectClass} ${cellSelectClass}-top-${lineType} ${cellSelectClass}-bottom-${lineType} ${cellSelectClass}-left-${lineType} ${cellSelectClass}-right-${lineType}`
	                } else if (currentSelectRowIndex === 0) { // 第一列第一行
	                    let targetRowCellInfo = this.cellTextTarget[currentSelectRowKey][currentSelectColKey];
	                    let tempClass = `${className} ${cellSelectClass} ${cellSelectClass}-top-${lineType} ${cellSelectClass}-left-${lineType} ${cellSelectClass}-right-${lineType}`;
	                    if (targetRowCellInfo) {
	                        const { rowSpan = 1 } = targetRowCellInfo;
	                        if (rowSpan > 1 && rowSpan + currentSelectRowIndex === selectCellRowsKeys.length) {
	                            tempClass += ` ${cellSelectClass}-bottom-${lineType}`;
	                        }
	                    }
	                    return tempClass
	                } else if (currentSelectRowIndex === selectCellRowsKeys.length - 1) { // 第一列最后一行
	                    let tempClass = `${className} ${cellSelectClass} ${cellSelectClass}-bottom-${lineType} ${cellSelectClass}-left-${lineType} ${cellSelectClass}-right-${lineType}`
	                    return tempClass;
	                } else {
	                    let targetRowCellInfo = this.cellTextTarget[currentSelectRowKey][currentSelectColKey];
	                    let tempClass = `${className} ${cellSelectClass} ${cellSelectClass}-left-${lineType} ${cellSelectClass}-right-${lineType}`;
	                    // 如果该行为合并行，则需要加下边框
	                    if (targetRowCellInfo) {
	                        const { rowSpan = 1 } = targetRowCellInfo;
	                        if (rowSpan > 1 && rowSpan + currentSelectRowIndex === selectCellRowsKeys.length) {
	                            tempClass += ` ${cellSelectClass}-bottom-${lineType}`;
	                        }
	                    }
	                    return tempClass
	                }
	            }
	        } else if (currentSelectColIndex === 0) { // 第一列
	            if (currentSelectRowIndex < 0) {
	                return className;
	            } else {
	                let currentSelectRowKey = selectCellRowsKeys[currentSelectRowIndex];
	                if (currentSelectRowIndex === 0 && currentSelectRowIndex === selectCellRowsKeys.length - 1) { // 只选中一行
	                    return `${className} ${cellSelectClass} ${cellSelectClass}-top-${lineType} ${cellSelectClass}-bottom-${lineType} ${cellSelectClass}-left-${lineType}`
	                } else if (currentSelectRowIndex === 0) { // 第一行第一列
	                    let targetRowCellInfo = this.cellTextTarget[currentSelectRowKey][currentSelectColKey];
	                    let tempClass = `${className} ${cellSelectClass} ${cellSelectClass}-top-${lineType} ${cellSelectClass}-left-${lineType}`
	                    if (targetRowCellInfo) {
	                        const { rowSpan, colSpan } = targetRowCellInfo;
	                        if (rowSpan > 1 && rowSpan + currentSelectRowIndex === selectCellRowsKeys.length) {
	                            tempClass += ` ${cellSelectClass}-bottom-${lineType}`;
	                        }
	                        if (colSpan > 1 && colSpan + currentSelectColIndex === selectCellColumnKeys.length) {
	                            tempClass += ` ${cellSelectClass}-right-${lineType}`;
	                        }
	                    }
	                    return tempClass
	                } else if (currentSelectRowIndex === selectCellRowsKeys.length - 1) { // 最后一行第一列
	                    let targetRowCellInfo = this.cellTextTarget[currentSelectRowKey][currentSelectColKey];
	                    let tempClass = `${className} ${cellSelectClass} ${cellSelectClass}-bottom-${lineType} ${cellSelectClass}-left-${lineType}`
	                    if (targetRowCellInfo) {
	                        const { colSpan } = targetRowCellInfo;
	                        if (colSpan > 1 && colSpan + currentSelectColIndex === selectCellColumnKeys.length) {
	                            tempClass += ` ${cellSelectClass}-right-${lineType}`;
	                        }
	                    }
	                    return tempClass;
	                } else {
	                    let targetRowCellInfo = this.cellTextTarget[currentSelectRowKey][currentSelectColKey];
	                    let tempClass = `${className} ${cellSelectClass} ${cellSelectClass}-left-${lineType}`
	                    if (targetRowCellInfo) {
	                        const { rowSpan = 1, colSpan } = targetRowCellInfo;
	                        if (rowSpan > 1 && rowSpan + currentSelectRowIndex === selectCellRowsKeys.length) {
	                            tempClass += ` ${cellSelectClass}-bottom-${lineType}`;
	                        }
	                        if (colSpan > 1 && colSpan + currentSelectColIndex === selectCellColumnKeys.length) {
	                            tempClass += ` ${cellSelectClass}-right-${lineType}`;
	                        }
	                    }
	                    return tempClass;
	                }
	            }
	        } else if (currentSelectColIndex === selectCellColumnKeys.length - 1) { // 最后一列
	            if (currentSelectRowIndex < 0) {
	                return className;
	            } else {
	                let currentSelectRowKey = selectCellRowsKeys[currentSelectRowIndex];
	                if (currentSelectRowIndex === 0 && currentSelectRowIndex === selectCellRowsKeys.length - 1) { // 只选中一行
	                    let tempClass = `${className} ${cellSelectClass} ${cellSelectClass}-top-${lineType} ${cellSelectClass}-bottom-${lineType} ${cellSelectClass}-right-${lineType}`
	                    return tempClass
	                } else if (currentSelectRowIndex === 0) { // 第一行最后一列
	                    let targetRowCellInfo = this.cellTextTarget[currentSelectRowKey][currentSelectColKey];
	                    let tempClass = `${className} ${cellSelectClass} ${cellSelectClass}-top-${lineType} ${cellSelectClass}-right-${lineType}`
	                    if (targetRowCellInfo) {
	                        const { rowSpan = 1 } = targetRowCellInfo;
	                        if (rowSpan > 1 && rowSpan + currentSelectRowIndex === selectCellRowsKeys.length) {
	                            tempClass += ` ${cellSelectClass}-bottom-${lineType}`;
	                        }
	                    }
	                    return tempClass
	                } else if (currentSelectRowIndex === selectCellRowsKeys.length - 1) { // 最后一行最后一列
	                    return `${className} ${cellSelectClass} ${cellSelectClass}-bottom-${lineType} ${cellSelectClass}-right-${lineType}`
	                } else {
	                    let tempClass = `${className} ${cellSelectClass} ${cellSelectClass}-right-${lineType}`;
	                    if (this.cellTextTarget[currentSelectRowKey][currentSelectColKey]) {
	                        const { rowSpan = 1 } = this.cellTextTarget[currentSelectRowKey][currentSelectColKey];
	                        if (rowSpan > 1 && rowSpan + currentSelectRowIndex === selectCellRowsKeys.length) {
	                            tempClass += ` ${cellSelectClass}-bottom-${lineType}`;
	                        }
	                    }
	                    return tempClass
	                }
	            }
	        } else {
	            if (currentSelectRowIndex < 0) {
	                return className;
	            } else {
	                let currentSelectRowKey = selectCellRowsKeys[currentSelectRowIndex];
	                if (currentSelectRowIndex === 0 && currentSelectRowIndex === selectCellRowsKeys.length - 1) { // 只选中一行
	                    let targetRowCellInfo = this.cellTextTarget[currentSelectRowKey][currentSelectColKey];
	                    let tempClass = `${className} ${cellSelectClass} ${cellSelectClass}-top-${lineType} ${cellSelectClass}-bottom-${lineType}`
	                    if (targetRowCellInfo) {
	                        const { colSpan } = targetRowCellInfo;
	                        if (colSpan > 1 && colSpan + currentSelectColIndex === selectCellColumnKeys.length) {
	                            tempClass += ` ${cellSelectClass}-right-${lineType}`;
	                        }
	                    }
	                    return tempClass;
	                } else if (currentSelectRowIndex === 0) { // 第一行中间列
	                    let targetRowCellInfo = this.cellTextTarget[currentSelectRowKey][currentSelectColKey];
	                    let tempClass = `${className} ${cellSelectClass} ${cellSelectClass}-top-${lineType}`
	                    if (targetRowCellInfo) {
	                        const { rowSpan, colSpan } = targetRowCellInfo;
	                        if (rowSpan > 1 && rowSpan + currentSelectRowIndex === selectCellRowsKeys.length) {
	                            tempClass += ` ${cellSelectClass}-bottom-${lineType}`;
	                        }
	                        if (colSpan > 1 && colSpan + currentSelectColIndex === selectCellColumnKeys.length) {
	                            tempClass += ` ${cellSelectClass}-right-${lineType}`;
	                        }
	                    }
	                    return tempClass;
	                } else if (currentSelectRowIndex === selectCellRowsKeys.length - 1) { // 最后一行中间列
	                    let targetRowCellInfo = this.cellTextTarget[currentSelectRowKey][currentSelectColKey];
	                    let tempClass = `${className} ${cellSelectClass} ${cellSelectClass}-bottom-${lineType}`
	                    if (targetRowCellInfo) {
	                        const { colSpan } = targetRowCellInfo;
	                        if (colSpan > 1 && colSpan + currentSelectColIndex === selectCellColumnKeys.length) {
	                            tempClass += ` ${cellSelectClass}-right-${lineType}`;
	                        }
	                    }
	                    return tempClass;
	                } else {
	                    let targetRowCellInfo = this.cellTextTarget[currentSelectRowKey][currentSelectColKey];
	                    let tempClass = `${className} ${cellSelectClass}`;
	                    if (targetRowCellInfo) {
	                        const { rowSpan = 1, colSpan } = targetRowCellInfo;
	                        if (rowSpan > 1 && rowSpan + currentSelectRowIndex === selectCellRowsKeys.length) {
	                            tempClass += ` ${cellSelectClass}-bottom-${lineType}`;
	                        }
	                        if (colSpan > 1 && colSpan + currentSelectColIndex === selectCellColumnKeys.length) {
	                            tempClass += ` ${cellSelectClass}-right-${lineType}`;
	                        }
	                    }
	                    return tempClass
	                }
	            }
	        }
	    }
	}


	onDocumentClick = (e: any) => {
	    if (!this.selFirstCol || e.button === 2) return;
	    const { clsPrefix } = this.props;
	    let target = e.target;
	    let isCellMenu = true;
	    while (target && target !== document.body) { // 点击右键框不清空框选单元格
	        if (target.classList.contains(`${clsPrefix}-cell-selected-menu`)) {
	            isCellMenu = false;
	            break;
	        }
	        target = target.parentElement;
	    }
	    if (!isCellMenu) { // 右键
	        return;
	    }
	    this.clearSelectCells();
	}

	// 清除单元格选择效果
	clearSelectCells = () => {
	    if (this.cellSelecting) return;
	    this.selFirstCol = null;
	    this.selFirstColIndex = -1;
	    this.selectColIndexSet.clear();
	    this.selectColMap.clear();
	    this.selFirstRowIndex = -1;
	    this.selRowIndexSet.clear();
	    this.selLastColIndex = -1;
	    this.selectRowMap.clear();
	    this.setState({
	        selectCellColumnKeys: [],
	        selectCellRowsKeys: []
	    })
	}

	// 单元格鼠标抬起事件
	onCellMouseUp = (_event: React.MouseEvent<HTMLElement>, _record: DefaultRecordType, _rowIndex: number, _columnKey: Key) => {
	    this.cellSelecting = false;
	}

	getExpandedRow = (key:Key, content: JSX.Element, visible: boolean, className: string) => {
	    const {clsPrefix, expandIconAsCell, onPaste, getCellClassName, showExpandColumn, openSelectCells, dir: direction} = this.props;
	    let colCount: number = this.columnManager.leafColumns().length;
	    let expandedRowHeight = (this.state.fixedColumnsExpandedRowsHeight[key]) || 'auto';
	    const contentContainer = () => {
	        return (
	            React.Children.map(content, (item) => (<div className={`${clsPrefix}-expanded-row-content`} style={{height: expandedRowHeight}}>{item}</div>))
	        )
	    }

	    const columns: InnerColumnType[] = [{
	        key: 'extra-row',
	        render: () => ({
	            props: {
	                colSpan: expandIconAsCell && showExpandColumn ? colCount + 1 : colCount,
	            },
	            children: contentContainer()
	        }),
	    }];

	    return (
	        <TableRow
	            record={{}}
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
	            getCellClassName={ openSelectCells ? this.setCellSelectClass : getCellClassName}
	            onRow={this.props.onRow}
	            selectedRowKeys={this.props.selectedRowKeys}
	            findRowKeys={this.props.findRowKeys}
	            findCurrentRowKey={this.props.findCurrentRowKey}
	            fieldid={this.props.fieldid}
	            locale={this.props.locale}
	            isExpandedRow={true} // 此标记为标记为展开行
	            bordered={getBordered(this.props.bordered)}
	            rowActiveKeys={this.props.rowActiveKeys}
	            hoverContent={this.props.hoverContent}
	            contentDomWidth={this.state.contentDomWidth}
	            onCellMouseDown={this.onCellMouseDown}
	            onCellMouseEnter={this.onCellMouseEnter}
	            onCellMouseUp={this.onCellMouseUp}
	            openSelectCells={this.props.openSelectCells}
	            container={this.cellTextTarget}
	            dir={direction}
	        />
	    );
	}
	// 列宽度拖拽-鼠标按下的事件
	onDragBorderMouseDown = (event:React.MouseEvent<HTMLElement>) => {
	    if (this.contentTable) {
	        this.contentTable.style.cursor = '';
			this.contentTable.style.userSelect = 'none'
	    }
	    let { contentDomWidth } = this.state;
	    const {dir} = this.props;

	    let dragGapDom = Event.getTarget(event);
	    let currentDom = dragGapDom.hasAttribute('data-type') && dragGapDom.getAttribute('data-type') === 'online' ? dragGapDom : dragGapDom.parentElement;
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
	    let resizerLineLeft = dragGapRect.right - tableRect.left - parseInt(dragGapRect.width / 2 + '') + (dir === 'rtl' ? -20 : 1);
	    // let currentIndex = this.columnManager.leafColumns().findIndex((col: InnerColumnType) => col.key ? col.key == columnKey : col.dataIndex == columnKey)

	    let leafColumns = this.getColumnsWidth(this.columnManager.leafColumns());
	    let _columnIndex = leafColumns.findIndex((col:InnerColumnType) => col.key ? col.key == columnKey : col.dataIndex == columnKey);
	    let column = leafColumns.find((col:InnerColumnType) => col.key ? col.key == columnKey : col.dataIndex == columnKey);
	    let nextColumn = _columnIndex === leafColumns.length - 1 ? null : leafColumns[_columnIndex + 1]
	    let defaultMinWidth = columnKey === 'checkbox' || columnKey === 'radio' ? DEFAULT_SELECT_WIDTH : columnKey === 'dragHandle' ? DEFAULT_DRAG_WIDTH : columnKey === '_index' ? DEFAULT_ROW_NUM_WIDTH : column?.tip ? DEFAULT_MIN_COLUMN_WIDTH + 18 : DEFAULT_MIN_COLUMN_WIDTH;
	    const {minColumnWidth = defaultMinWidth, maxColumnWidth, dragborder} = this.props;
	    // let column = this.columnManager.leafColumns().find((col: InnerColumnType) => col.key ? col.key == columnKey : col.dataIndex == columnKey);
	    if (column) {
	        let selfMinWidth = parseFloat(column.minWidth || minColumnWidth);
	        let selfMaxWidth = parseFloat(column.maxWidth || maxColumnWidth);
	        if (dragborder === 'fixed' && nextColumn && nextColumn.dragborder !== false) {
	            let totalWidth = parseFloat(column.width) + parseFloat(nextColumn.width); // 两列的宽度的和
	            let nextColumnDefaultMinWidth = parseFloat(nextColumn.minWidth || minColumnWidth); // 后一列的最小宽度
	            let nextColumnDefaultMaxWidth = parseFloat(nextColumn.maxWidth || maxColumnWidth || contentDomWidth - nextColumnDefaultMinWidth); // 后一列的最大宽度


	            let columnDefaultMinWidth = parseFloat(column.minWidth || minColumnWidth); // 当前列的最小宽度
	            let columnDefaultMaxWidth = parseFloat(column.maxWidth || maxColumnWidth || contentDomWidth - columnDefaultMinWidth); //  当前列的最大宽度


	            selfMinWidth = columnDefaultMinWidth - (totalWidth - nextColumnDefaultMaxWidth) ? columnDefaultMinWidth : totalWidth - nextColumnDefaultMaxWidth // 取最大的最小宽度
	            selfMaxWidth = columnDefaultMaxWidth - (totalWidth - nextColumnDefaultMinWidth) ? totalWidth - nextColumnDefaultMinWidth : columnDefaultMaxWidth // 取最小的最大宽度
	        }

	        this.setState({
	            resizerVisible: true,
	            resizerLineHeight,
	            resizerLineLeft,
	            resizerDefaultWidth,
	            resizerMinWidth: selfMinWidth,
	            resizerMaxWidth: selfMaxWidth,
	            dataSource: currentInfo,
	        });
	        this.resizerLine && this.resizerLine.start(event);
	    }

	}

	// 列宽度拖拽-鼠标松开的事件
	onDragBorderMouseUp = (event:React.MouseEvent<HTMLElement>, moveX: number, info?: DropDataSourceType) => {
	    if (this.contentTable) {
	        this.contentTable.style.cursor = '';
			this.contentTable.style.userSelect = ''
	    }
	    const { contentDomWidth } = this.state;
	    const {dir} = this.props;
	    let {columnKey} = info as DropDataSourceType;

	    let leafColumns = this.getColumnsWidth(this.columnManager.leafColumns());
	    let columnIndex = leafColumns.findIndex((col:InnerColumnType) => col.key ? col.key == columnKey : col.dataIndex == columnKey);
	    let column = leafColumns.find((col:InnerColumnType) => col.key ? col.key == columnKey : col.dataIndex == columnKey);
	    let nextColumn = columnIndex === leafColumns.length - 1 ? null : leafColumns[columnIndex + 1]

	    let defaultMinWidth = columnKey === 'checkbox' || columnKey === 'radio' ? DEFAULT_SELECT_WIDTH : columnKey === 'dragHandle' ? DEFAULT_DRAG_WIDTH : columnKey === '_index' ? DEFAULT_ROW_NUM_WIDTH : column?.tip ? DEFAULT_MIN_COLUMN_WIDTH + 18 : DEFAULT_MIN_COLUMN_WIDTH;
	    const {minColumnWidth = defaultMinWidth, onDropBorder, cacheId, columns, maxColumnWidth, dragborder} = this.props;

	    if (column) {
	        let newWidth = dir === 'rtl' ? column.width as number - moveX : column.width as number + moveX;// 拖动后的宽度
	        let nextWidth = nextColumn ? nextColumn.width : null;
	        if (dragborder === true || dragborder === 'default') { // 旧模式拖拽
	            newWidth = newWidth < (column.minWidth || minColumnWidth) ? (column.minWidth || minColumnWidth) : newWidth > (column.maxWidth || maxColumnWidth) ? (column.maxWidth || maxColumnWidth) : newWidth;// 限制最小宽度
	        } else if (dragborder === 'fixed') { // 新拖拽模式
	            if (!nextColumn || nextColumn.dragborder === false) { // 拖拽为最后一列或者拖拽列的下一列禁止拖拽
	                return;
	            } else {
	                let totalWidth = parseFloat(column.width) + parseFloat(nextColumn.width); // 两列的宽度的和
	                let nextColumnDefaultMinWidth = parseFloat(nextColumn.minWidth || minColumnWidth); // 后一列的最小宽度
	                let nextColumnDefaultMaxWidth = parseFloat(nextColumn.maxWidth || maxColumnWidth || contentDomWidth - nextColumnDefaultMinWidth); // 后一列的最大宽度


	                let columnDefaultMinWidth = parseFloat(column.minWidth || minColumnWidth); // 当前列的最小宽度
	                let columnDefaultMaxWidth = parseFloat(column.maxWidth || maxColumnWidth || contentDomWidth - columnDefaultMinWidth); //  当前列的最大宽度


	                let selfMinWidth = columnDefaultMinWidth - (totalWidth - nextColumnDefaultMaxWidth) ? columnDefaultMinWidth : totalWidth - nextColumnDefaultMaxWidth // 取最大的最小宽度
	                let selfMaxWidth = columnDefaultMaxWidth - (totalWidth - nextColumnDefaultMinWidth) ? totalWidth - nextColumnDefaultMinWidth : columnDefaultMaxWidth // 取最小的最大宽度
	                newWidth = newWidth < selfMinWidth ? selfMinWidth : newWidth > selfMaxWidth ? selfMaxWidth : newWidth;
	                nextWidth = totalWidth - newWidth;
	            }
	        }

	        this.columnManager.clearCache();
	        let changeColumn = this.columnManager.findColumn(column.key || column.dataIndex);
	        let nextChangeColumn = nextColumn ? this.columnManager.findColumn(nextColumn.key || nextColumn.dataIndex) : null;
	        if (!changeColumn) {
	            return;
	        }
	        changeColumn.width = newWidth;
	        if (nextColumn) {
	            nextChangeColumn.width = nextWidth;
	        }
	        // const newColumns = this.columnManager.columns.map(col => {
	        // 	const {key} = col;
	        // 	if (key === changeColumn?.key) {
	        // 		return changeColumn;
	        // 	} else if (key === nextChangeColumn?.key) {
	        // 		return nextChangeColumn
	        // 	} else {
	        // 		return col;
	        // 	}
	        // })
	        // this.columnManager.set(newColumns)
	        this.computeTableWidth();// 注意：重新计算需要补充的列宽度
	        // let newWidthDiff = newWidth-oldWidth;//计算新旧宽度的实际变化距离, 负数为缩小，正数为放大
	        this.setState({
	            resizerVisible: false,
	            fixedColumnsBodyRowsHeight: [],
	            fixedColumnsExpandedRowsHeight: {}, // 扩展行的高度
	        });

	        // 缓存
	        if (cacheId && typeof cacheId === 'string') {
	            cacheTarget.setOne(cacheId, columns, changeColumn)
	        }
	        typeof onDropBorder == 'function' && onDropBorder(event, newWidth, column, this.columnManager.columns);
	    }

	}
	// 列宽度拖拽-取消事件
	onDragBorderCancel = () => {
	    if (this.contentTable) {
	        this.contentTable.style.cursor = '';
			this.contentTable.style.userSelect = ''
	    }
	    this.setState({resizerVisible: false});
	}
	// 列宽度拖拽-鼠标移动的事件
	onDragBorderMouseMove = (event:React.MouseEvent<HTMLElement>, moveX: number, info?: DropDataSourceType) => {
	    if (this.contentTable) {
	        this.contentTable.style.cursor = 'col-resize';
			this.contentTable.style.userSelect = 'none'
	    }
	    const { contentDomWidth } = this.state;
	    let {columnKey} = info as DropDataSourceType;

	    let leafColumns = this.getColumnsWidth(this.columnManager.leafColumns());

	    let columnIndex = leafColumns.findIndex((col:InnerColumnType) => col.key ? col.key == columnKey : col.dataIndex == columnKey);
	    let column = leafColumns.find((col:InnerColumnType) => col.key ? col.key == columnKey : col.dataIndex == columnKey);
	    let nextColumn = columnIndex === leafColumns.length - 1 ? null : leafColumns[columnIndex + 1]
	    if (!column) {
	        return
	    }
	    let defaultMinWidth = columnKey === 'checkbox' || columnKey === 'radio' ? DEFAULT_SELECT_WIDTH : columnKey === 'dragHandle' ? DEFAULT_DRAG_WIDTH : columnKey === '_index' ? DEFAULT_ROW_NUM_WIDTH : column?.tip ? DEFAULT_MIN_COLUMN_WIDTH + 18 : DEFAULT_MIN_COLUMN_WIDTH;
	    const {minColumnWidth = defaultMinWidth, onDraggingBorder, maxColumnWidth, dragborder} = this.props;
	    let newWidth = column.width as number + moveX;// 拖动后的宽度
	    if (dragborder === true || dragborder === 'default') { // 旧模式拖拽
	    	newWidth = newWidth < (column.minWidth || minColumnWidth) ? (column.minWidth || minColumnWidth) : newWidth > (column.maxWidth || maxColumnWidth) ? (column.maxWidth || maxColumnWidth) : newWidth;// 限制最小宽度
	    } else if (dragborder === 'fixed') { // 新拖拽模式
	        if (!nextColumn || nextColumn.dragborder === false) { // 拖拽为最后一列或者拖拽列的下一列禁止拖拽
	            return;
	        } else {
	            let totalWidth = parseFloat(column.width) + parseFloat(nextColumn.width); // 两列的宽度的和
	            let nextColumnDefaultMinWidth = parseFloat(nextColumn.minWidth || minColumnWidth); // 后一列的最小宽度
	            let nextColumnDefaultMaxWidth = parseFloat(nextColumn.maxWidth || maxColumnWidth || contentDomWidth - nextColumnDefaultMinWidth); // 后一列的最大宽度


	            let columnDefaultMinWidth = parseFloat(column.minWidth || minColumnWidth); // 当前列的最小宽度
	            let columnDefaultMaxWidth = parseFloat(column.maxWidth || maxColumnWidth || contentDomWidth - columnDefaultMinWidth); //  当前列的最大宽度


	            let selfMinWidth = columnDefaultMinWidth - (totalWidth - nextColumnDefaultMaxWidth) ? columnDefaultMinWidth : totalWidth - nextColumnDefaultMaxWidth // 取最大的最小宽度
	            let selfMaxWidth = columnDefaultMaxWidth - (totalWidth - nextColumnDefaultMinWidth) ? totalWidth - nextColumnDefaultMinWidth : columnDefaultMaxWidth // 取最小的最大宽度
	            newWidth = newWidth < selfMinWidth ? selfMinWidth : newWidth > selfMaxWidth ? selfMaxWidth : newWidth
	        }
	    }
	    typeof onDraggingBorder == 'function' && onDraggingBorder(event, newWidth, column, this.columnManager.columns);
	}
	/**
	 * 行拖拽开始时触发
	 * @param currentKey 当前拖拽目标的key
	 */
	_onRowDragStart = (options: DefaultRecordType) => {
	    let {dragStartKey, dragStartIndex} = options;
	    let {lazyLoad, onRowDragStart, childrenColumnName} = this.props;
	    if (lazyLoad) {
	        onRowDragStart && onRowDragStart(options);// 直接传递给bigDataX触发
	    } else {
	        let {data} = this.state, record;
	        let getDroptarget = (dragStartKey: Key, data: DefaultRecordType[]) => {
	            for (let i = 0; i < data.length; i++) {
	                let da = data[i];
	                let currentKey = this.getRowKey(da, i) || da.key
	                if (currentKey == dragStartKey) {
	                    record = da;
	                    break; // 匹配到后则退出减少性能开销
	                }
	                if (da[childrenColumnName] && Array.isArray(da[childrenColumnName]) && da[childrenColumnName].length) {
	                    getDroptarget(dragStartKey, da[this.props.childrenColumnName])
	                }
	            }
	        }
	        getDroptarget(dragStartKey, data)
	        this.props.onDragRowStart && this.props.onDragRowStart(record, dragStartIndex);
	    }
	}

	_onRowDrop = (options: DefaultRecordType) => {
	    let {dragEnterKey, dataIndex, e} = options;
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
	        this.props.onRowDrop && this.props.onRowDrop(record, currentIndex, dataIndex, e);
	    }
	}


	/**
	 * 行拖拽结束时触发
	 */
	_onRowDragDrop = (options: DefaultRecordType) => {
	    let {lazyLoad, onRowDragDrop, childrenColumnName = 'children', rowKey} = this.props;
	    let { event } = options;
	    const { expandedRowKeys } = this.state;
	    if (lazyLoad) {
	        onRowDragDrop && onRowDragDrop(options);// 直接传递给bigDataX触发
	    } else {
	        let {dragTargetKey, dragTargetIndex, dropTargetKey, dropTargetIndex} = options;
	        let {data} = this.state, record: DefaultRecordType | undefined, dropRecord: DefaultRecordType | undefined;
	        let getDroptarget = (dragTargetKey: Key, data: DefaultRecordType[]) => {
	            for (let i = 0; i < data.length; i++) {
	                let da = data[i];
	                let currentKey = this.getRowKey(da, i) || da.key
	                if (record && dropRecord) {
	                    break ;
	                }
	                if (currentKey == dragTargetKey) {
	                    record = da;
	                    // break; // 匹配到后则退出减少性能开销
	                }
	                if (currentKey == dropTargetKey) {
	                    dropRecord = da;
	                }
	                if (da[childrenColumnName] && Array.isArray(da[childrenColumnName]) && da[childrenColumnName].length) {
	                    getDroptarget(dragTargetKey, da[this.props.childrenColumnName])
	                }

	            }
	        }
	        getDroptarget(dragTargetKey, data)
	        // if (dragTargetIndex > -1) {
	        if (dragTargetIndex > -1 && dropTargetKey !== null && dropTargetIndex !== null) {
	            if (this.treeType) { // 树形数据
	                data = arrayTreeMoveTo(data, dragTargetKey, dropTargetKey, childrenColumnName, rowKey, expandedRowKeys);
	            } else {
	                data = arrayMoveTo(data, dragTargetIndex, dropTargetIndex);
	            }
	            this.props.onDropRow && this.props.onDropRow(data, record, dragTargetIndex, dropRecord, dropTargetIndex, event);
	            this.setState({data});
	        } else {
	            this.props.onDropRow && this.props.onDropRow(data, record, dragTargetIndex, dropRecord, dropTargetIndex, event);
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
	 * @param {number} [rootIndex=-1] 祖级节点
	 * @returns
	 * @memberof Table
	 */
	getRowsByData = (data: DefaultRecordType[], visible: boolean, indent: number, columns: DefaultRecordType[], hasFoot: Boolean, rootIndex:number = -1): JSX.Element[] => {
	    const { props } = this;
	    const {
	        childrenColumnName,
	        expandedRowRender,
	        expandRowByClick,
	        onPaste,
	        rowClassName,
	        rowRef,
	        expandedRowClassName,
	        onRowClick,
	        onRowDoubleClick,
	        expandIconColumnIndex,
	        lazyLoad,
	        showSum = [],
	        openSelectCells,
	        isEmptyHiddenIcon,
	        dir: direction
	    } = props;
	    let rst = [];
	    // let height = hasFoot ? sumRowHeight : this.props.height || this.state.cssRowHeight;
	    let height = this.state.cssRowHeight;
	    // const needIndentSpaced = (props.data || []).some(record => record[childrenColumnName]);
	    const _needIndentSpaced = (props.data || []).some(record => record[childrenColumnName]);
	    if (lazyLoad && lazyLoad.preHeight && indent == 0 && !hasFoot) {
	        rst.push(
	            <TableRow
	                record={{}}
	                onPaste={onPaste}
	                height={lazyLoad.preHeight}
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
	                fieldid={this.props.fieldid}
	                bordered={getBordered(this.props.bordered)}
	                dir={direction}
	            />
	        )
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
	        let needIndentSpaced = typeof record._isLeaf === 'boolean' ? true : _needIndentSpaced;
	        // _isLeaf 字段是在 bigData 里添加的，只有层级树大数据场景需要该字段
	        // _isLeaf 有三种取值情况：true / false / null。（Table内部字段）
	        const _isLeaf = typeof record._isLeaf === 'boolean' ? record._isLeaf : null;
	        // const childrenColumn = _isLeaf ? false : record[childrenColumnName];
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


	        // 最初的haveExpandIcon实际效果和语义话的意思是相反的，为了兼容之前业务，引入新api(showExpandIcon)取代haveExpandIcon，保证新旧api兼容
	        // showExpandIcon替换旧api(haveExpandIcon),新showExpandIcon优先级大于旧haveExpandIcon，新api语义化调整正确，支持布尔类型或函数类型
	        // let defaultFn = (record: DefaultRecordType, _i?: number) => ((record[childrenColumnName] || []).length > 0)
	        // let defaultFn = (record: DefaultRecordType, _i?: number) => (record[childrenColumnName])
	        let defaultFn = (record: DefaultRecordType, _i?: number) => (record[childrenColumnName] ? record[childrenColumnName].length > 0 ? true : !isEmptyHiddenIcon : false)
	        let showExpandIcon = false;
	        let oldMode = false;
	        if (props.hasOwnProperty('showExpandIcon') && props.showExpandIcon !== undefined) {
	            if (typeof props.showExpandIcon == 'function') {
	                showExpandIcon = props.showExpandIcon(record, i);
	            } else if (typeof props.showExpandIcon == 'boolean') {
	                if (props.showExpandIcon) {
	                    // showExpandIcon = record[childrenColumnName] && Array.isArray(record[childrenColumnName])
	                    showExpandIcon = typeof record._isLeaf === 'boolean' ? !record._isLeaf : record[childrenColumnName] && Array.isArray(record[childrenColumnName])
	                } else {
	                    // showExpandIcon = defaultFn(record, i);
	                    showExpandIcon = false
	                }
	            }
	        } else if (_isLeaf === false) { // 大数据字段过来
	            showExpandIcon = true;
	        } else if (_isLeaf === true) { // 大数据字段过来
	            showExpandIcon = false;
	        } else {
	            showExpandIcon = defaultFn(record, i);
	        }
	        if (!props.hasOwnProperty('showExpandIcon') || props.showExpandIcon === undefined) { // 未传新api(showExpandIcon)
	            if (expandedRowRender) { // 与旧的保持一致
	                if (props.hasOwnProperty('haveExpandIcon') && typeof props.haveExpandIcon == 'function') {
	                    isShowExpandIcon = !props.haveExpandIcon(record, i);
	                    oldMode = true
	                } else { // 外部未传haveExpandIcon或者不是function类型，默认全部有展开行icon(兼容旧的) => 旧有的项目有的没有按照文档标注的类型传，传的bool(true)
	                    isShowExpandIcon = true
	                }
	            } else {
	                isShowExpandIcon = showExpandIcon
	            }
	        } else { // 传入新的api
	            isShowExpandIcon = showExpandIcon
	        }
	        let className = rowClassName(record, fixedIndex + lazyCurrentIndex, indent);

	        // 合计代码如果是最后一行并且有合计功能并且属于第一层不是某一行数据的子集，最后一行为合计列
	        // if (i == data.length - 1 && props.showSum && rootIndex < 0) {
	        //     className = className + ' sumrow';
	        // }

	        if (Array.isArray(showSum) && showSum.includes('subtotal') && showSum.includes('total')) {
	            if (i == data.length - 2 && hasFoot && rootIndex < 0) {
	                className = className + ' sumrow';
	            }
	            if (i == data.length - 1 && hasFoot && rootIndex < 0) {
	                className = className + ' totalrow';
	            }
	        } else if (Array.isArray(showSum) && showSum.includes('subtotal')) {
	            if (i == data.length - 1 && hasFoot && rootIndex < 0) {
	                className = className + ' sumrow';
	            }
	        } else if (Array.isArray(showSum) && showSum.includes('total')) {
	            if (i == data.length - 1 && hasFoot && rootIndex < 0) {
	                className = className + ' totalrow';
	            }
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
	                    // hasLeftFixed={hasLeftFixed}
	                    expandIconAsCell={props.expandIconAsCell}
	                    showExpandColumn={props.showExpandColumn}
	                    onDestroy={this.onRowDestroy}
	                    index={index}
	                    visible={visible}
	                    expandRowByClick={expandRowByClick}
	                    onExpand={this.onExpanded}
	                    // expandable={expandedRowRender || ((childrenColumn && childrenColumn.length > 0) ? true : _isLeaf === false)}
	                    expandable={!!expandedRowRender || (childrenColumn ? true : _isLeaf === false)}
	                    // expandable={!!expandedRowRender || (childrenColumn ? true : typeof record._isLeaf === 'boolean')}
	                    expanded={isRowExpanded}
	                    clsPrefix={`${props.clsPrefix}-row`}
	                    childrenColumnName={childrenColumnName}
	                    columns={columns}
	                    expandIconColumnIndex={expandIconColumnIndex}
	                    onRowClick={onRowClick}
	                    onRowDoubleClick={onRowDoubleClick}
	                    height={record.key === 'table_sum' || record.key === 'table_total_sum' ? undefined : height}
	                    isShowExpandIcon={isShowExpandIcon}
	                    onHover={this.handleRowHover}
	                    key={"table_row_" + key}
	                    hoverKey={key}
	                    ref={rowRef(record, index, indent)}
	                    store={this.store}
	                    expandedContentHeight={expandedContentHeight}
	                    setRowHeight={props.setRowHeight}
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
	                    expandIconCellWidth={this.props.expandIconCellWidth || expandIconCellWidth}
	                    // getCellClassName={props.getCellClassName}
	                    getCellClassName={ openSelectCells ? this.setCellSelectClass : props.getCellClassName}
	                    onRow={props.onRow}
	                    selectedRowKeys={props.selectedRowKeys}
	                    findRowKeys={props.findRowKeys}
	                    findCurrentRowKey={props.findCurrentRowKey}
	                    fieldid={props.fieldid}
	                    locale={props.locale}
	                    oldMode={oldMode}
	                    bordered={getBordered(this.props.bordered)}
	                    lastScrollTop={this.lastScrollTop}
	                    headTable={this.headTable}
	                    rowActiveKeys={this.props.rowActiveKeys}
	                    hoverContent={this.props.hoverContent}
	                    contentDomWidth={this.state.contentDomWidth}
	                    sumIndex={this.props?.keyToIndex[key]}
	                    onCellMouseDown={this.onCellMouseDown}
	                    onCellMouseEnter={this.onCellMouseEnter}
	                    onCellMouseUp={this.onCellMouseUp}
	                    container={this.cellTextTarget}
	                    openSelectCells={this.props.openSelectCells}
	                    dir={direction}
	                />
	            );
	        }
	        this.treeRowIndex++;
	        const subVisible = visible && isRowExpanded;

	        if (expandedRowContent && isRowExpanded) {
	            rst.push(this.getExpandedRow(
	                key, expandedRowContent, subVisible, expandedRowClassName(record, i, indent)
	            ));
	        }
	        if (childrenColumn) {
	            this.isTreeType = true; // 增加该标志位，为了兼容老版本，不修改以前的 `this.treeType` 的相关逻辑
	            this.treeType = true;// 证明是tree表形式visible = {true}
	            rst = rst.concat(this.getRowsByData(
	                childrenColumn, subVisible, indent + 1, columns, hasFoot, paramRootIndex
	            ));
	        }
	    }

	    if (props.lazyLoad && props.lazyLoad.sufHeight && indent == 0 && !hasFoot) {
	        rst.push(
	            <TableRow
	                record={{}}
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
	                findCurrentRowKey={props.findCurrentRowKey}
	                locale={props.locale}
	                fieldid={props.fieldid}
	                bordered={getBordered(this.props.bordered)}
	                dir={direction}
	            />
	        )
	    }
	    if (!this.isTreeType) {
	        this.treeType = false;
	    }
	    return rst;
	}

	getRows = (columns: DefaultRecordType[], hasFoot: boolean): JSX.Element[] => {
	    // console.time('getRows')
	    const { showSum = [] } = this.props; // 是否有合计行
	    // 统计index，只有含有树表结构才有用，因为树表结构时，固定列的索引取值有问题
	    this.treeRowIndex = 0;
	    // 每次遍历 data 前，将this.isTreeType置为 false，若遍历完 data，此变量仍为 false，说明是普通表格 (合计行不用重置)
	    if (!hasFoot) {
	        this.isTreeType = false;
      		this.treeType = false;
	    }
	    let sliceLength = Array.isArray(showSum) && showSum.includes('subtotal') && showSum.includes('total') ? 2 : Array.isArray(showSum) && (showSum.includes('subtotal') || showSum.includes('total')) ? 1 : 0;
	    let data = hasFoot ? this.state.data.slice(-sliceLength) : this.state.data.slice(0, this.state.data.length - sliceLength)
	    // let rs = this.getRowsByData(this.state.data, true, 0, columns);
	    let rs = this.getRowsByData(data, true, 0, columns, hasFoot);
	    // console.timeEnd('getRows')
	    return rs;
	}

	getColGroup = (columns: DefaultRecordType[]) => {
	    // const { lastDataIndex } = this.state;
	    let cols = columns.map((col, _index) => {
	        // const { dataIndex } = col;
	        // return lastDataIndex !== dataIndex ? <col key={col.key || col.dataIndex} style={{width: col.width, minWidth: col.width}}/> : <col></col>
	        return <col key={col.key || col.dataIndex} style={{width: col.width, minWidth: col.width}}/>
	    })
	    return <colgroup className={`${prefix}-table-colgroup`}>{cols}</colgroup>;
	}

	// 末级下的表头节点
	getleafColumnsWidth = (columns: DefaultRecordType[]):DefaultRecordType[] => {
	    return this.columnManager._leafColumns(columns)
	}

	// 计算columns的宽度,顶层
	getColumnsWidth = (columns?: DefaultRecordType[]):DefaultRecordType[] => {
	    // 多表头情况下表头需要用最高层的columns，表体需要用最底层铺开的columns
	    let cols: any[] = [];
	    let that = this;
	    let {contentWidthDiff = 0, lastDataIndex} = this.state;
	    let {expandIconAsCell, expandIconFixed, showExpandColumn, addEmptyColumn } = this.props;
	    let expandIcoCols = [];
	    if (expandIconAsCell && showExpandColumn) {
	        // cols.push({
	        //     width: this.props.expandIconCellWidth || expandIconCellWidth,
	        //     className: `${this.props.clsPrefix}-expand-icon-col`,
	        //     key: `${prefix}-table-expand-icon-col`,
	        //     dataIndex: `${prefix}-table-expand-icon-col`,
	        //     fixed: expandIconFixed !== undefined ? (expandIconFixed === false ? expandIconFixed : 'left') : 'left',
	        // 	rowSpan: getColLeave(this.columnManager.groupedColumns('show'))
	        // })
	        expandIcoCols.push({
	            width: this.props.expandIconCellWidth || expandIconCellWidth,
	            className: `${this.props.clsPrefix}-expand-icon-col`,
	            key: `${prefix}-table-expand-icon-col`,
	            dataIndex: `${prefix}-table-expand-icon-col`,
	            fixed: expandIconFixed !== undefined ? (expandIconFixed === false ? expandIconFixed : 'left') : 'left',
	            rowSpan: getColLeave(this.columnManager.groupedColumns('show'))
	        })
	    }
	    // let originGroupColumns = this.columnManager.groupedColumns('show');
	    let leafColumns = columns ? columns : this.columnManager.groupedColumns('show');
	    // let centerLastIndex = this.columnManager.leftLeafColumns().length + lastShowIndex;
	    let setWidthFun = (columns: DefaultRecordType[], cols: DefaultRecordType[]) => {
	        columns.forEach((c:DefaultRecordType, i: number) => {
	            let currentDataIndex = c.dataIndex || c.key;
	            let width = c.width;
	            if (typeof (width) == 'string' && width.indexOf('%') > -1 && that.contentWidth) {
	                // width = Math.floor((that.contentWidth - that.scrollbarWidth) * parseInt(width) / 100);// 向下取整，解决宽度2518px时10列每列10%(四舍五入时252px)的情况下，合计2520px导致出现滚动条的问题
	                width = Math.floor(that.contentWidth * parseInt(width) / 100);
	            } else if (width) {
	                width = parseInt(width);
	            }
	            // 中间区域非固定的最后一列自动补充宽度
	            if (lastDataIndex == currentDataIndex && width && !addEmptyColumn) {
	                width = width + (contentWidthDiff < 0 ? 0 : contentWidthDiff);
	            }
	            cols.push({
	                ...c,
	                width
	            })
	            if (c.children && Array.isArray(c.children) && c.children.length > 0) {
	                cols[i].children = [];
	                setWidthFun(c.children, cols[i].children)
	            }
	        });
	        return cols;
	    }
	    cols = setWidthFun(leafColumns, cols)
	    if (expandIcoCols.length) {
	        cols = [...expandIcoCols, ...cols]
	    }
	    if (addEmptyColumn) {
	        if (typeof addEmptyColumn === 'boolean') {
	            cols = cols.concat({
	                ...defaultEmptyColumn,
	                // fixed: cols[cols.length - 1].fixed,
	                fixed: false,
	                width: contentWidthDiff > 0 ? contentWidthDiff : 54
	            })
	        }
	        if (typeof addEmptyColumn === 'number') {
	            if (addEmptyColumn > -1) {
	                cols.splice(addEmptyColumn, 0, {
	                    ...defaultEmptyColumn,
	                    // fixed: cols[cols.length - 1].fixed,
	                    fixed: false,
	                    width: contentWidthDiff > 0 ? contentWidthDiff : 54
	                })
	            }
	        }
	    }
	    // cols = direction === 'rtl' ? this.revertForRtl(cols) : cols;
	    this.handleColumns = cols
	    // console.log('---', cols)
	    return cols;
	}

	revertForRtl = (columns: DefaultRecordType[]) => {
	    return columns.map(column => {
	        const { fixed, ...restProps } = column;
	        // console.log('column', columns)
	        let parsedFixed = fixed;
	        if (fixed === 'left' || fixed === true) {
	            parsedFixed = 'right';
	        } else if (fixed === 'right') {
	            parsedFixed = 'left';
	        }
	        return {
	            fixed: parsedFixed,
	            ...restProps,
	        };
	    });
	}

	// 大数据列下获取的展示列，针对中间非固定列计算，截取计算
	getBigShowColumns = (cols: DefaultRecordType[]) => {
	    // 考虑多表头情况下，表头渲染和表体渲染传入的cols不一致，导致截取的长度不一致, 多表头情况下需要
	    let { columnsLoadBuffer = 5 } = this.props;
	    columnsLoadBuffer = columnsLoadBuffer <= 0 ? 5 : columnsLoadBuffer;
	    let leftColumns = cols.filter(item => item.fixed === 'left' || item.fixed === true);
	    let rightColumns = cols.filter(item => item.fixed === 'right');
	    // 非固定列
	    let centerColumns = cols.filter(item => !item.fixed && item.fixed !== 'left' && item.fixed !== 'right' && item.key !== '_pre' && item.key !== '_suf');
	    // 获取非规定列区域显示的列数
	    // 多表头获取数量比较少
	    let showCount = this.getShowColumns(leftColumns, centerColumns, rightColumns, this.currentScrollColumnIndex);
	    // 计算非固定列缓存数
	    // currentScrollColumnIndex是相对于最末级算出的下标，对于多表头给的是顶级的，会有误差
	    let colBuffer = computeIndex(centerColumns.length, showCount, columnsLoadBuffer, this.currentScrollColumnIndex, centerColumns);
	    let colLazyLoad = {
	        startIndex: colBuffer.startIndex,
	        endIndex: colBuffer.endIndex,
	        preWidth: 0,
	        sufWidth: 0
	    }
	    // centerColumns不一致
	    colLazyLoad.preWidth = getSumWidth(0, colLazyLoad.startIndex, centerColumns);
	    colLazyLoad.sufWidth = getSumWidth(colLazyLoad.endIndex, centerColumns.length - 1, centerColumns);
	    let centerShowCols = centerColumns.slice(colLazyLoad.startIndex, colLazyLoad.endIndex + 1);
	    let preColumn = colLazyLoad.preWidth ? [preCol(colLazyLoad.preWidth)] : []
	    let sufColumn = colLazyLoad.sufWidth ? [sufCol(colLazyLoad.sufWidth)] : []
	    let colSource = [
	        ...leftColumns,
	        ...preColumn,
	        ...centerShowCols,
	        ...sufColumn,
	        ...rightColumns
	    ]
	    return colSource;
	}

	// 动态获取非固定列区域显示的列数
	getShowColumns = (leftColumns: DefaultRecordType[], centerColumns: DefaultRecordType[], rightColumns: DefaultRecordType[], currentScrollColumnIndex: number) => {
	    let realWidth = this.contentTable && (this.contentTable as HTMLElement)?.getBoundingClientRect()?.width || this.state.contentDomWidth;
	    if (!realWidth) return;
	    let fixedWidth = 0;
	    // 计算固定列的总长度
	    leftColumns.concat(rightColumns).forEach(col => {
	        fixedWidth += col.width
	    });
	    // 中间非固定列页面显示的宽度
	    let centerColumnWidth = realWidth - fixedWidth;
	    let showNum = 0;
	    centerColumns.slice(currentScrollColumnIndex < 0 ? 0 : currentScrollColumnIndex).forEach((col: DefaultRecordType) => {
	        if (centerColumnWidth > 0) {
	            centerColumnWidth = centerColumnWidth - col.width;
	            showNum++
	        }
	    })
	    return showNum + 1;
	}

	setLeftTreeFixed = (leftColumns: DefaultRecordType[], parentColumn?: DefaultRecordType) => {
	    leftColumns.forEach((col, index) => {
	        col = col || {};

	        // 关于多表头设置父级的偏移值
	        col.parentOffset = parentColumn ? parentColumn.offsetWidth : 0;
	        if (index === 0) {
	            col.offsetWidth = 0 + col.parentOffset
	        } else {
	            col.offsetWidth = Number(leftColumns[index - 1].offsetWidth) + Number(leftColumns[index - 1].width)
	        }
	        col.isAllLeft = false;
	        if (index === leftColumns.length - 1) {
	            col.isLastLeft = true;
	            // 计算是否给予isAllLeft(左固定列是否占据整个表格可视区域)解决火狐浏览器左固定列宽度超出表格可视区域宽度横向滚动右侧出现空白的问题
	            if (this.state.contentDomWidth) {
	                if (col.offsetWidth + col.width >= this.state.contentDomWidth) {
	                    col.isAllLeft = true
	                }
	            }
	        }
	        if (col.children && Array.isArray(col.children)) {
	            this.setLeftTreeFixed(col.children, col)
	        }
	    })
	}

	setRightTreeFixed = (rightColumns: DefaultRecordType[], parentColumn?: DefaultRecordType) => {
	    for (let i = rightColumns.length - 1; i >= 0; i--) {
	        // 关于多表头设置父级的偏移值
	        rightColumns[i].parentOffset = parentColumn ? parentColumn.offsetWidth : 0;
	        if (i === rightColumns.length - 1) {
	            rightColumns[i].offsetWidth = 0 + rightColumns[i].parentOffset
	        } else {
	            rightColumns[i].offsetWidth = Number(rightColumns[i + 1].offsetWidth) + Number(rightColumns[i + 1].width)
	        }
	        if (i === 0) {
	            rightColumns[i].isFirstRight = true
	        }
	        if (rightColumns[i].children && Array.isArray(rightColumns[i].children)) {
	            this.setRightTreeFixed(rightColumns[i].children, rightColumns[i])
	        }
	    }
	}

	// 计算粘性布局的属性mergeColumns
	setFixed = (columns: DefaultRecordType[]) => {
	    let leftColumns = columns.filter(item => item.fixed === 'left' || item.fixed === true);
	    let rightColumns = columns.filter(item => item.fixed === 'right');
	    let centerColumns = columns.filter(item => !item.fixed);
	    this.setLeftTreeFixed(leftColumns);
	    this.setRightTreeFixed(rightColumns);
	    let mergeColumns = leftColumns.concat(centerColumns).concat(rightColumns);
	    return mergeColumns;
	}

	renderTable = (hasHead: boolean = true, hasBody: boolean = true, hasFoot: boolean, renderColumns: DefaultRecordType[]) => {
	    const {scroll = {}, data} = this.state;
	    const {
	        clsPrefix,
	        bordered,
	        getBodyWrapper,
	        dragborder,
	        bigColumns
	    } = this.props;
	    const tableStyle: DefaultRecordType = {};
	    if (scroll.x) {// 非固定列的中间表格
	        // not set width, then use content fixed width
	        if (scroll.x === true) {
	            tableStyle.tableLayout = 'fixed';
	        } else {
	            tableStyle.width = scroll.x;
	        }
	    }
	    let _columns = bigColumns ? this.getBigShowColumns(this.getColumnsWidth()) : this.getColumnsWidth()
	    let leafColumnsWidth = bigColumns ? this.setFixed(this.getleafColumnsWidth(_columns)) : this.getleafColumnsWidth(this.setFixed(_columns));
	    // let leafColumnsWidth = bigColumns ? this.setFixed(this.getleafColumnsWidth(this.getBigShowColumns(renderColumns))) : this.getleafColumnsWidth(this.setFixed(renderColumns));
	    const tableBody = hasBody ? getBodyWrapper(
	        <tbody className={`${clsPrefix}-tbody`} onMouseLeave={this.onBodyMouseLeave}>
	            {data.length ? this.getRows(leafColumnsWidth, hasFoot) : this.getEmptyDom(leafColumnsWidth)}
	        </tbody>
	    ) : null;
	    let tableFoot = hasFoot ?
	        <tfoot className={`${clsPrefix}-tfoot`} onMouseLeave={this.onBodyMouseLeave}>
	            {this.getRows(leafColumnsWidth, hasFoot)}
	        </tfoot>
	    : null;
	    let contCla = {
	        [`table-bordered`]: getBordered(bordered),
	        [`table-drag-bordered`]: dragborder
	    }
	    let contClasses = classnames(contCla);
	    let overColumns = bigColumns ? this.setFixed(this.getBigShowColumns(renderColumns)) : this.setFixed(renderColumns);
	    // let maxLevel = bigColumns ? getColLeave(this.columnManager.groupedColumns('show')) : 1;
	    let maxLevel = getColLeave(this.columnManager.groupedColumns('show'));
	    return (
	        <table className={contClasses} data-for-table={this.tableUid}>
	            {this.getColGroup(leafColumnsWidth)}
	            {hasHead ? this.getHeader(overColumns, maxLevel) : null}
	            {tableBody}
	            {tableFoot}
	        </table>
	    );
	};

	getTable = () => {
	    const {scroll = {}} = this.state;
	    const {
	        clsPrefix,
	        data,
	        bodyClassName,
	        fieldid,
	        showSum = [],
	        sumClassName,
	        scrollType,
	        hoverContent
	    } = this.props;
	    let useFixedHeader = this.props.useFixedHeader; // let变量声明
	    let bodyStyle = {...this.props.bodyStyle} as React.CSSProperties; // 克隆一份
	    const headStyle: React.CSSProperties = {};
	    const footStyle: React.CSSProperties = {};
	    if (scroll.y) {
	        bodyStyle.maxHeight = bodyStyle.maxHeight || scroll.y;
	        bodyStyle.overflowY = bodyStyle.overflowY || 'auto';
	        useFixedHeader = true;
	    }

	    // ---------------垂直滚动条的显示处理---------------
	    headStyle.overflow = 'hidden';
	    // if (data.length == 0) {
	    //     bodyStyle.overflowY = 'hidden';
	    //     headStyle.overflowY = 'hidden';
	    // } else {
	    //     bodyStyle.overflowY = bodyStyle.overflowY || 'auto';
	    //     headStyle.overflowY = bodyStyle.overflowY;
	    // }

	    // 判断空数据样式集中到this.emptyFillHeight处理
	    if (bodyStyle.minHeight) {
	        this.emptyFillHeight = parseInt(bodyStyle.minHeight + '')
	    }
	    if (bodyStyle.height) {
	        this.emptyFillHeight = parseInt(bodyStyle.height + '')
	    }

	    // 处理foot滚动条（合计行）
	    if (Array.isArray(showSum) && showSum.length && (showSum.includes('subtotal') || showSum.includes('total')) && data.length) {
	        // bodyStyle.overflowX = 'hidden';
	        bodyStyle.overflowX = 'scroll';
	        footStyle.overflowY = 'hidden';
	    }

	    let headerFieldidAttr = fieldid ? { fieldid: `table-header` } : {}
	    let bodyFieldidAttr = fieldid ? { fieldid: `table-body` } : {}
	    let newColumns = this.getColumnsWidth();

	    let headTable: React.ReactNode;
	    let footTable: React.ReactNode;
	    // console.time('header区域')
	    if (useFixedHeader) {
	        headTable = (
	            <div className={`${clsPrefix}-header-box`}>
	                <div
	                    className={`${clsPrefix}-header`}
	                    ref={(el) => this.headTable = el}
	                    {...headerFieldidAttr}
	                    style={headStyle}
	                    onScroll={this.scrollBody}
	                >
	                    {this.renderTable(true, false, false, newColumns)}
	                </div>
	            </div>
	        );
	    }
	    // console.timeEnd('header区域')
	    // console.log('重绘了表体')
	    let BodyTable = ( // 中间表格的body
	        <div
	            className={classnames({
	                [`${clsPrefix}-body`]: 1,
	                [`${bodyClassName}`]: bodyClassName,
	            })}
	            style={bodyStyle}
	            ref={(el) => {
	                this.bodyTable = el
	            }}
	            {...bodyFieldidAttr}
	            onScroll={this.scrollBody}
	            onMouseLeave={this.onBodyMouseLeave}
	        >
	            {this.renderTable(scrollType === 'single' ? true : !useFixedHeader, true, false, newColumns)}
	            {/* {this.renderTable(true, true, false, newColumns)} */}
	        </div>
	    );
	    // console.timeEnd('body区域')

	    if (Array.isArray(showSum) && showSum.length && (showSum.includes('subtotal') || showSum.includes('total')) && data.length) {
	        footTable =
				<div className={`${clsPrefix}-sum-box`}>
				    <div
				        className={classnames({
				            [`${clsPrefix}-sum`]: 1,
				            [`${sumClassName}`]: sumClassName,
				        })}
				        ref={(el) => {
				            this.footTable = el
				        }}
				        style={footStyle}
				        onScroll={this.scrollBody}
				        onMouseLeave={this.onBodyMouseLeave}
				    >
				        {this.renderTable(!useFixedHeader, false, true, newColumns)}
				    </div>
				</div>
	    }
	    let hoverContentDom = hoverContent &&
	    <HoverContent
	        // hoverContentClass={this.hoverContentClass}
	        ref={(el: any) => this.hoverDom = el}
	        store={this.store}
	        // hoverContentStyle={this.hoverContentStyle}
	        hoverContent={hoverContent}
	    >
	    </HoverContent>


	    return <div>{scrollType === 'single' ? null : headTable}{BodyTable}{footTable}{hoverContentDom}</div>;

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

	getEmptyDom = (renderColumns: DefaultRecordType[]) => {
	    // 影响空数据高度的因素：bodyStyle,fillSpace
	    const {emptyText: defaultEmptyText, clsPrefix, emptyClassName, scrollType} = this.props;
	    let maxHeaderHeight = this.getHeaderHeight();
	    let realHeight = this.emptyFillHeight ? (scrollType === 'single' ? this.emptyFillHeight - maxHeaderHeight : this.emptyFillHeight) : 0;
	    let emptyStyle = this.emptyFillHeight ? {style: {height: realHeight}} : {};
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
	                <Empty {...emptyLocaleAttr} {...emptyFieldidAttr} image={realHeight && realHeight > 135 ? 'no-data' : 'no-data-easy'}/>
	            </div>;
	    let className = emptyClassName && typeof emptyClassName === 'string' ? `${clsPrefix}-placeholder ${emptyClassName}` : `${clsPrefix}-placeholder`
	    return (
	        <tr>
	            <td colSpan={renderColumns.length} className={`${clsPrefix}-placeholder-cell`} {...emptyStyle}>
	                <div className={className} data-for-table={this.tableUid}>
	                    {typeof emptyText === 'function' ? emptyText() : emptyText}
	                </div>
	            </td>
	        </tr>
	    )
	}

	getHeaderRowStyle = (columns: DefaultRecordType[], rows:DefaultRecordType[][]) => {
	    const {headerHeight} = this.props;// 表头每行的高度，注意多表头是多行高度总和

	    if (headerHeight && columns) {
	        if (!Number(headerHeight)) {
	            return {height: 'auto'};
	        }
	        return {height: headerHeight / rows.length};
	    }
	    return null;
	}

	resetScrollX = (left?: number) => {
	    if (this.headTable) {
	        this.headTable.scrollLeft = left || 0;
	    }
	    if (this.bodyTable) {
	        this.bodyTable.scrollLeft = left || 0;
	    }
	    if (this.footTable) {
	        this.footTable.scrollLeft = left || 0;
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

	// 隐藏行上悬浮的自定义dom
	hideHoverDom(_e?:React.UIEvent<HTMLElement>) {
	    if (this.hoverDom) {
	        this.hoverContentStyle.display = 'none';
	        this.store.setState({hoverContentStyle: this.hoverContentStyle});
	    }
	}


	forceScroll = (scrollLeft: number, target: any) => {
	    if (!target) {
		  return;
	    }
	    if (target.scrollLeft !== scrollLeft) {
		  target.scrollLeft = scrollLeft;

		  if (target.scrollLeft !== scrollLeft) {
	        setTimeout(() => {
			 	target.scrollLeft = scrollLeft;
	        }, 0);
		  }
	    }
	  }

	scrollBody = (e:React.UIEvent<HTMLElement>) => {
	    const { handleScrollX, bigColumns } = this.props;
	    const currentTarget = e.target as HTMLElement;
	    const { scrollLeft, offsetWidth, scrollWidth } = e.target as HTMLElement;
	    if (this.lastScrollTop !== (e.target as HTMLElement).scrollTop && (e.target == this.bodyTable)) {
	        if (this.hoverDom) {
	            this.hoverContentStyle.display = 'none'
	            this.store.setState({currentHoverKey: null, currentRecord: null, currentIndex: null, hoverContentStyle: this.hoverContentStyle});
	        }
	    }
	    if (this.lastScrollTop !== (e.target as HTMLElement).scrollTop) {
	        // @ts-ignore
	        this.dobounceHandleBodyScroll && this.dobounceHandleBodyScroll(e)
	    } else {
	        if (!this.lockStore.getState() || this.lockStore.getState() === currentTarget) {
	            this.lockStore.setState(currentTarget)
	            this.forceScroll(scrollLeft, this.headTable)
	            this.forceScroll(scrollLeft, this.bodyTable)
	            this.forceScroll(scrollLeft, this.footTable)
	        }
	        if (scrollLeft === 0) {
	            this.setState({scrollPosition: 'left'});
	        } else if (scrollLeft + 1 >= scrollWidth - offsetWidth) {
	            this.setState({scrollPosition: 'right'});
	        } else if (this.state.scrollPosition !== 'middle') {
	            this.setState({scrollPosition: 'middle'});
	        }
	        if (handleScrollX) {// 触发props.handleScrollX
	            handleScrollX(scrollLeft, this.treeType, e)
	        }
	        this.lastScrollLeft = scrollLeft;// 记录最后一次水平滚动位置
	        // 设置大数据列的滚动位置
	        if (bigColumns) {
	            let tempScrollLeft = scrollLeft;
	            // 支持到祖级滚动定位
	            let cols = this.getColumnsWidth().filter(item => !item.fixed && item.fixed !== 'left' && item.fixed !== 'right')
	            let index = 0; // 滚动后的位置索引
	            let scrollIndex = 0;
	            while (tempScrollLeft > 0 && index < cols.length) {
	                tempScrollLeft -= cols[index].width;
	                if (tempScrollLeft > -1) {
	                    index += 1;
	                }
	                if (tempScrollLeft > -1 && (!cols[index - 1].fixed || cols[index - 1].fixed !== 'left')) {// 排除左固定列
	                    scrollIndex += 1;
	                }
	            }
	            if (this.currentScrollColumnIndex !== scrollIndex) { // 表头最后一行
	                this.currentScrollColumnIndex = scrollIndex
	            }
	            let renderFlag = this.state.renderFlag;
	            this.setState({
	                renderFlag: !renderFlag
	            });
	        }
	    }
	}

	// 处理表格体内滚动
	handleBodyScroll = (e:React.UIEvent<HTMLElement>) => {
	    // console.log('e', e)
	    const {handleScrollY, onBodyScroll, clsPrefix} = this.props;
	    const { bodyTable } = this;
	    if (this.lastScrollLeft == undefined) this.lastScrollLeft = 0;
	    if (this.lastScrollTop == undefined) this.lastScrollTop = 0;
	    // 垂直滚动的逻辑处理
	    let targetDom = e.target ? e.target : bodyTable
	    if (this.lastScrollTop !== (targetDom as HTMLElement).scrollTop && (targetDom == bodyTable)) {
	        if (bodyTable && targetDom !== bodyTable) {
	            bodyTable.scrollTop = (targetDom as HTMLElement).scrollTop;
	        }
	        // 注意快速滚动时将行的hover效果隐藏，timeout之后还原，以解决固定列情况下表格滚动时hover效果错位的问题。
	        if (this.hoverDom) {
	            const { currentHoverKey, currentRecord, currentIndex } = this.store.getState();
	            this.hoverContentStyle.display = 'none'
	            this.store.setState({currentHoverKey: null, currentRecord: null, currentIndex: null});
	            clearTimeout(this.scrollHoverKeyTimer);
	            this.scrollHoverKeyTimer = setTimeout(() => {
	                let tableDom = this.contentTable as HTMLElement;
	                // 需要等表格渲染完
	                let currentTr = tableDom.querySelector(`.${clsPrefix}-content-inner .${clsPrefix}-body > table[data-for-table='${this.tableUid}'] .${clsPrefix}-tbody tr[data-row-key='${currentHoverKey}']`) as HTMLElement;
	                if (tableDom && currentTr) {
	                    const scrollTop = (targetDom as HTMLElement).scrollTop ? (targetDom as HTMLElement).scrollTop : 0;
	                    let top = currentTr.offsetTop - scrollTop;
	                    if (this.headTable) {
	                        top = top + this.headTable.clientHeight;
	                    }
	                    this.hoverContentStyle.top = top + 'px';
	                }
	                this.hoverContentStyle.display = 'block';
	                this.store.setState({currentHoverKey, currentRecord, currentIndex, hoverContentStyle: this.hoverContentStyle})
	            }, 100)
	        }
	        this.hideHoverDom(e);// 隐藏外部自定义悬浮dom
	        this.lastScrollTop = (targetDom as HTMLElement).scrollTop;// 记录最后一次垂直滚动位置
	        if (handleScrollY) {// 触发props.handleScrollY
	            handleScrollY(this.lastScrollTop, this.treeType, onBodyScroll)
	        } else {
	            onBodyScroll(this.lastScrollTop)// 触发props.onBodyScroll滚动回调
	        }

	    }
	}

	handleRowHover = (isHover: boolean, key: Key, event:React.MouseEvent<HTMLElement>, currentIndex: number, propsRecord: DefaultRecordType) => {
	    // 增加新的API，设置是否同步Hover状态，提高性能，避免无关的渲染
	    let {onRowHover, syncHover, clsPrefix} = this.props;
	    // fix:树形表，onRowHover返回参数异常
	    // let {isTreeType} = this;
	    // 合计行抽入底部另一个表格，所以单独判断
	    // const record = (isTreeType || (propsRecord.key && propsRecord.key === 'table_sum') ? propsRecord : lazyLoad ? data.find((item, index) => {
	    //     const rowKey = item.key ? item.key : this.getRowKey(item, index);
	    //     return rowKey === key
	    // }) : data[currentIndex]) as DefaultRecordType;
	    this.hoverKey = isHover ? key : null;
	    if (this.hoverDom && propsRecord.key !== 'table_sum') {
	        if (isHover) {
	            // this.currentHoverKey = key;
	            const td = closest(event.target, 'td');
	            if (td) {
	                const scrollTop = this.lastScrollTop ? this.lastScrollTop : 0
	                let top = td.offsetTop - scrollTop;
	                if (this.headTable) {
	                    top = top + this.headTable.clientHeight;
	                }
	                this.hoverContentStyle.top = top + 'px';
	                this.hoverContentStyle.height = td.offsetHeight / (td.rowSpan || 1) - 1 + 'px';
	                this.hoverContentStyle.lineHeight = td.offsetHeight / (td.rowSpan || 1) - 3 + 'px';
	                this.hoverContentStyle.display = 'block';

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
	        } else { // 鼠标离开行时，清空currentHoverRecord（解决切换数据时currentHoverRecord获取了上次hover的数据）
	            this.hoverContentStyle.display = 'none'
	        }
	    }
	    this.store.setState({
	        currentRecord: isHover ? propsRecord : null,
	        currentHoverKey: isHover ? key : null,
	        currentIndex: isHover ? currentIndex : null,
	        hoverContentClass: this.hoverContentClass,
	        hoverContentStyle: this.hoverContentStyle
	    });

	    onRowHover && onRowHover(currentIndex, propsRecord, isHover, event);

	}

	// 表格mouseLeave时移除hoverContent元素
	onTableHoverMouseLeave = () => {
	    this.hoverContentStyle.display = 'none'
	    this.store.setState({currentHoverKey: null, currentRecord: null, currentIndex: null, hoverContentStyle: this.hoverContentStyle});
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
                    if (data && data.tableContent) {
                        this.tableContext = JSON.parse(data.tableContent);
                    }
                });
            }
        } catch (e) {
            this.tableContext = null;
        }
    }

	filterColumnOpenCloumList = () => {
	    const { filterColumnOpenCloumList, scrollType } = this.props;
	    if (!this.headTable && scrollType !== 'single') {
	        filterColumnOpenCloumList && filterColumnOpenCloumList();
	        return;
	    } else {
	        let contentTableHeight = (this.contentTable as HTMLElement).getBoundingClientRect().height;// 表格容器宽度
	        // let DH = document.body.clientHeight;
	        // let CH = this.headTable.getBoundingClientRect()?.bottom;
	        let adaptiveHeight = contentTableHeight - this.getHeaderHeight()
	        filterColumnOpenCloumList && filterColumnOpenCloumList(adaptiveHeight);
	    }


	}

	render() {
	    const {
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
	        locale,
	        showSum = [],
	        data,
	        scrollType,
	        openSelectCells,
	        dir: direction
	    } = props;

	    if (this.tableContext && typeof this.tableContext === 'object') {
	        // @ts-ignore
	        stripeLine = stripeLine ?? this.tableContext.tableRowZebraStripes;
	        bordered = getBordered(bordered) ?? this.tableContext.tableRowSplitLine;
	        // @ts-ignore
	        height = height ?? heigtMap[this.tableContext.tableRowHeight];
	    } else {
	        // eslint-disable-next-line no-unused-vars
	        height = (height ?? cssRowHeight) as number
	    }

	    let clsObj = {
	        [`${clsPrefix}-sticky`]: true, // 新表格新增类名，便于css处理
	        [`${className}`]: !!className,
	        [`${clsPrefix}-fixed-header`]: useFixedHeader || (scroll && scroll.y),
	        [`${clsPrefix}-hide-header`]: !showHeader,
	        [`${clsPrefix}-bordered`]: getBordered(bordered),
	        [`copy`]: onCopy,
	        [`${clsPrefix}-scroll-position-${scrollPosition}`]: true,
	        [`fixed-height`]: bodyDisplayInRow,
	        [`body-dispaly-in-row`]: bodyDisplayInRow,
	        [`header-dispaly-in-row`]: headerDisplayInRow,
	        // [`${clsPrefix}-${props.size}`]: size,
	        [`has-fixed-left`]: hasFixedLeft,
	        [`has-fixed-right`]: hasFixedRight,
	        [`${clsPrefix}-striped`]: stripeLine,
	        [`${clsPrefix}-has-sum`]: Array.isArray(showSum) && showSum.length && (showSum.includes('subtotal') || showSum.includes('total')) && data.length,
	        [`${clsPrefix}-single`]: scrollType === 'single',
	        [`${clsPrefix}-select-cell`]: openSelectCells,
	        [`${clsPrefix}-rtl`]: direction === 'rtl'
	    };
	    let contCla = {
	        [`${clsPrefix}-scroll`]: isTableScroll,
	        [`${clsPrefix}-content-inner`]: true
	    }
	    let classes = classnames(clsPrefix, clsObj);
	    let contClasses = classnames(contCla);
	    let adapterNid = getNid(this.props) // 适配nid、uitype
	    let tableProps = fieldid ? { fieldid: `${fieldid}_table` } : {};
	    let filterColumnField = fieldid ? { fieldid: `${fieldid}_filter_column_icon` } : {};
	    let style = Object.assign({}, {...props.style}, {...this.fillSpaceStyle})
	    let tabIndexAttr = props.focusable ? { tabIndex: (props.tabIndex ? props.tabIndex : 0)} : {}
	    return (
	        <Fragment>
	            <RefResizeObserver onResize={this.resize}>
	                <div className={classes} style={style} ref={el => this.contentTable = el} data-for-table={this.tableUid} onMouseLeave={this.onTableHoverMouseLeave}
	                    {...tabIndexAttr} {...adapterNid} {...tableProps}>
	                    {this.getTitle()}
	                    <div className={`${clsPrefix}-content`}>
	                        <div className={contClasses}>
	                            {this.getTable()}
	                        </div>
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
	                        dir={direction}
	                        left={this.state.resizerLineLeft}
	                        height={this.state.resizerLineHeight}
	                        defaultWidth={this.state.resizerDefaultWidth}
	                        minWidth={this.state.resizerMinWidth}
	                        maxWidth={this.state.resizerMaxWidth}
	                        visible={this.state.resizerVisible}
	                        onChange={this.onDragBorderMouseMove}
	                        onResizeEnd={this.onDragBorderMouseUp}
	                        onResizeCancel={this.onDragBorderCancel}
	                        contentDomWidth={this.state.contentDomWidth}
	                        dataSource={this.state.dataSource}
	                        dragborder={props.dragborder}
	                    /> : null}
	                    <Loading
	                        getPopupContainer={() => this}
	                        locale={locale as string}
	                        {...(typeof loading === 'boolean' ? {spinning: loading} : loading)}/>
	                    {this.props.columnFilterAble == false ? (
	                        ""
	                    ) : (
	                        <div className={`${clsPrefix}-filter-column-filter-icon`}>
	                            <Popover
	                                placement="bottomRight"
	                                content={this.props.filterColumnContent}
	                                // overlayStyle={{minHeight: '250px'}}
	                                arrowPointAtCenter
	                                show={this.props.filterColumnShowModal}
	                                onHide={this.props.filterColumnOnHide}
	                                onVisibleChange={this.props.filterColumnOnVisibleChange}
	                                className={`${clsPrefix}-filter-column-popover`}
	                                trigger="click"
	                                getPopupContainer={() => document.body}
	                                zIndex={1701}
	                            >
	                                <Icon type="uf-liebiaoshezhi" {...filterColumnField} onClick={this.filterColumnOpenCloumList}/>
	                            </Popover>
	                        </div>
	                    )}
	                    <PopMenu ref={(el: any) => this.tablepopmenu = el} onMenuClick={this.handleMenuClick} popMenu={this.props.popMenu} clsPrefix={clsPrefix} onPopMenuIsShow={this.onPopMenuIsShow} onCopyCell={this.onInnerCopyCell} locale={locale} dir={direction}/>
	                </div>
	            </RefResizeObserver>
	            {/* <PopMenu ref={(el: any) => this.tablepopmenu = el} onMenuClick={this.handleMenuClick} popMenu={this.props.popMenu} clsPrefix={clsPrefix} onPopMenuIsShow={this.onPopMenuIsShow} onCopyCell={this.onInnerCopyCell} locale={locale}/> */}
	        </Fragment>

	    );
	}
}

export default Table as React.ComponentClass<Partial<TableProps<DefaultRecordType>>>;
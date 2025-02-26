import React, {Component} from "react";
import classnames from 'classnames';
import omit from 'omit.js';
// import {debounce} from "throttle-debounce";
import {prefix} from "../../../wui-core/src/index";
import FilterType from "../FilterType";
import {Event, EventUtil, debounce} from "../lib/utils";
import { TableHeaderProps } from '../iTableHeader';
import { DefaultRecordType, DataIndex } from '../interface';
import { InnerColumnType } from '../iTable';
import { SelectValue, SelectProps } from '../../../wui-select/src/iSelect';
import ExpandIcon from '../ExpandIcon';
import Tooltip from '../../../wui-tooltip/src/index';
import Icon from '../../../wui-icon/src/index';
import {getLangInfo} from "../../../wui-locale/src/tool";
import i18n from '../lib/i18n';

class TableHeader extends Component<TableHeaderProps> {
	theadKey: number;
	drag: {
		option: string; // 拖拽的操作类型
		newWidth?: number;
		currIndex?: number;
		dragTarget?: HTMLElement;
		enterTarget?: HTMLElement;
	};
	minWidth: number;
	table: DefaultRecordType;
	_thead: HTMLElement | null;
	event: boolean;
	isIE: boolean;
	tableNoneContId: string;
	currentDome: HTMLElement | null;
	gap: HTMLDivElement | null;
	constructor(props:TableHeaderProps) {
	    super(props);
	    this.theadKey = new Date().getTime();
	    this.drag = {
	        option: ''// 拖拽的操作类型
	    };
	    this.minWidth = parseInt(props.minColumnWidth + '');
	    this.table = {};
	    this._thead = null;// 当前对象
	    this.event = false;// 避免多次绑定问题
	    // this.lastColumWidth = null;// 非固定列最后一列的初始化宽度
	    // this.fixedTable = {};
	    this.isIE = !!(window as any).ActiveXObject || "ActiveXObject" in window;
	    this.tableNoneContId = props.tableUid || "_table_uid_" + new Date().getTime();
	    this.currentDome = null;
	    this.gap = null;
	}

	static defaultProps = {
	    columnsChildrenList: [],
	    rows: [],
	    // tableUid: null,
	    // columnManager: null,
	    draggable: false,
	    onDragEnd: null,
	    onDrop: null,
	    // afterDragColWidth: null,
	    contentWidthDiff: 0// 中间区域最后一列需要补充的宽度
	}

	UNSAFE_componentWillReceiveProps(nextProps:TableHeaderProps) {
	    // 表格column改变时，要重新绑定拖拽事件，否则拖拽不生效
	    const {columnsChildrenList: oldCols} = this.props;
	    const {columnsChildrenList: newCols} = nextProps;
	    if (this._thead) {
	        if (newCols.length !== oldCols.length) {
	            this.event = false;
	            return;
	        }
	        oldCols.some((item, index) => {
	            if (newCols[index] && newCols[index].dataIndex !== item.dataIndex) {
	                this.event = false;
	                return true;
	            }
	        });
	    }
	    if ('tableUid' in nextProps) {
	        this.tableNoneContId = this.props.tableUid || "_table_uid_" + new Date().getTime();
	    }
	}

	componentDidUpdate() {
	    this.initTable();
	    this.initEvent();
	}

	// ----交换列头顺序时抓起的副本---begin
	createTableNone = () => {
	    this.tableNoneContId = this.props.tableUid || "_table_uid_" + new Date().getTime();
	    if (document.getElementById(this.tableNoneContId)) return;
	    let div = document.createElement("div");
	    div.className = `${prefix}-table-drag-hidden-cont`;
	    div.id = this.tableNoneContId;
	    document.body.appendChild(div);
	    return div;
	}
	destroyTableNone = () => {
	    let elem = document.getElementById(this.tableNoneContId);
	    if (!elem) return;
	    if (elem.remove) {
	        elem.remove();
	    } else {// ie 不支持remove方法，只能用removeChild方法
	        (elem.parentNode as HTMLElement).removeChild(elem);
	    }
	}

	// ----交换列头顺序时抓起的副本---end
	componentDidMount() {
	    this.createTableNone(); // 交换列头时用到的副本-创建
	}

	componentWillUnmount() {
	    this.destroyTableNone();// 交换列头时用到的副本-销毁
	    // this.fixedTable = null;
	    if (!this.table) return;
	    const {dragborder, draggable} = this.props;
	    dragborder && this.dragBorderEvent().off();
	    draggable && this.dragAbleEvent().off();
	    // this.eventListen([{key:'mousedown',fun:this.onTrMouseDown}],'remove',this.table.tr[0]);
	    this.eventListen([{key: 'mouseup', fun: this.bodyonLineMouseUp}], 'remove', document.body);
	}

	/**
	 * 获取table的属性存放在this.table 中。(公用方法)
	 * @returns
	 * @memberof TableHeader
	 */
	initTable() {
	    const {clsPrefix, contentTable} = this.props;
	    if (!this.props.dragborder && !this.props.draggable) return;
	    let tableDome = (this._thead as HTMLElement).parentNode as HTMLElement;
	    let table:DefaultRecordType = {};
	    if (tableDome && tableDome.nodeName && tableDome.nodeName.toUpperCase() == "TABLE" && contentTable) {
	        table.table = tableDome;
	        table.cols = tableDome.getElementsByTagName("col");
	        table.ths = tableDome.getElementsByTagName("th");
	        table.tr = tableDome.getElementsByTagName("tr");
	        table.thDragGaps = tableDome.getElementsByClassName(`${clsPrefix}-thead-th-drag-gap`) || [];// 拖拽列宽的全部抓手
	        table.tableHeaderCols = contentTable.querySelector(`.${prefix}-table-scroll .${prefix}-table-header`) && (contentTable.querySelector(`.${prefix}-table-scroll .${prefix}-table-header`) as HTMLElement).getElementsByTagName("col");
	        table.tableBody = contentTable.querySelector(`.${prefix}-table-scroll .${prefix}-table-body`) && contentTable.querySelector(`.${prefix}-table-scroll .${prefix}-table-body`);
	        table.tableBodyCols = contentTable.querySelector(`.${prefix}-table-scroll .${prefix}-table-body`) && (contentTable.querySelector(`.${prefix}-table-scroll .${prefix}-table-body`) as HTMLElement).getElementsByTagName("col");
	        table.bodyRows = table.tableBody && table.tableBody.querySelectorAll('tr') || [];
	        table.contentTableHeader = contentTable.querySelector(`.${prefix}-table-scroll .${prefix}-table-header`);
	    }

	    // 维护表格全部的dom元素
	    this.table = table;
	}

	/**
	 * 事件初始化
	 */
	initEvent() {
	    let {dragborder, draggable, rows} = this.props;
	    // 当传入的 columns 为空时，不绑定拖拽事件
	    if (Object.prototype.toString.call(rows) === '[object Array]' && rows.length === 0) {
	        return;
	    }
	    // if(!this.event){ //避免多次绑定问题。
	    //   this.event = true;
	    this.dragBorderEvent().off();// 拖拽列宽事件-清理
	    if (dragborder) {
	        this.dragBorderEvent().on();// 交换列事件-绑定
	    }
	    this.dragAbleEvent().off();// 交换列事件-清理
	    if (draggable) {
	        this.dragAbleEvent().on();// 交换列事件-绑定
	    }
	    this.eventListen([{key: 'mouseup', fun: this.bodyonLineMouseUp}], 'remove', document.body);
	    this.eventListen([{key: 'mouseup', fun: this.bodyonLineMouseUp}], '', document.body);// body mouseup
	    // }
	}


	doEventList(trs: JSX.Element[], action: (tr: JSX.Element) => void) {
	    if (trs && HTMLCollection.prototype.isPrototypeOf(trs) && action) {
	        if (this.isIE && !trs[0]) return
	        for (let index = 0; index < trs.length; index++) {
	            action(trs[index]);
	        }
	    }
	}

	/**
	 * 拖拽列宽事件的监听
	 */
	dragBorderEvent() {
	    if (!this.table || !this.table.thDragGaps) return {
	        off: () => {
	        }, on: () => {
	        }
	    };
	    let events = [
	        // {key:'mousedown', fun:this.onTrMouseDown},
	        {key: 'mousedown', fun: this.onDragMouseDown}, // 拖拽列宽度-尺标方式
	        {key: 'mouseup', fun: this.onTrMouseUp},
	        // {key:'mousemove', fun:this.onTrMouseMove},
	    ];
	    return {
	        off: () => {// 清理事件
	            this.doEventList(this.table.thDragGaps, (elem) => {
	                this.eventListen(events, 'remove', elem);
	            })
	        },
	        on: () => {// 绑定事件
	            this.doEventList(this.table.thDragGaps, (elem) => {
	                this.eventListen(events, '', elem);// 表示把事件添加到元素上
	            })
	        }
	    }
	}

	// 将多个事件绑定到dom元素上
	eventListen(events: DefaultRecordType, type: string, eventSource: JSX.Element | HTMLElement) {
	    if (!this.table) return;
	    if (!eventSource) {
	        // console.log("Please set the attributes of column !");
	        return;
	    }
	    for (let i = 0; i < events.length; i++) {
	        const _event = events[i];
	        if (type === "remove") {
	            EventUtil.removeHandler(eventSource, _event.key, _event.fun);
	        } else {
	            EventUtil.addHandler(eventSource, _event.key, _event.fun);
	        }
	    }
	}

	/**
	 * 调整列宽的down事件
	 * @memberof TableHeader
	 */
	onDragMouseDown = (e?:React.DragEvent<HTMLElement>) => {
	    const {dragborder, eventNoStop, onMouseDown} = this.props;
	    !eventNoStop && Event.stopPropagation(e);
	    dragborder && typeof onMouseDown == 'function' && onMouseDown(e);
	}

	// getTableWidth = () => {
	//     let tableWidth = 0, offWidth = 0;// this.table.cols.length;
	//     for (let index = 0; index < this.table.cols.length; index++) {
	//         let da = this.table.cols[index];
	//         tableWidth += parseInt((da).style.width);
	//     }
	//     return (tableWidth - offWidth);
	// }

	/**
	 * 根据当前节点查找到有data-type类型的容器返回。
	 * @memberof TableHeader
	 */
	getTargetToType = (targetEvent: HTMLElement): HTMLElement => {
	    let tag = targetEvent;
	    if (targetEvent && !targetEvent.getAttribute("data-type")) {
	        tag = this.getTargetToType(targetEvent.parentElement as HTMLElement);
	    }
	    return tag;
	}


	/**
	 * 判断当前的target 是否是 th，如果不是，直接递归查找。
	 * @memberof TableHeader
	 */
	// getTargetToTh = (targetEvent: HTMLElement) => {
	//     let th:HTMLElement = targetEvent;
	//     if (targetEvent.nodeName.toUpperCase() != "TH") {
	//         th = this.getThDome(targetEvent) as HTMLElement;
	//     }
	//     return th;
	// }

	// syncFixedBodyTableWidth = () => {
	//     let {
	//         fixedLeftHeaderTableBody,
	//         fixedLeftInnerTableBody,
	//         fixedRightHeaderTableBody,
	//         fixedRightInnerTableBody
	//     } = this.table
	//     if (fixedLeftHeaderTableBody && fixedLeftInnerTableBody) {
	//         fixedLeftInnerTableBody.style.width = fixedLeftHeaderTableBody.getBoundingClientRect().width + 'px'
	//     }
	//     if (fixedRightHeaderTableBody && fixedRightInnerTableBody) {
	//         fixedRightInnerTableBody.style.width = fixedRightHeaderTableBody.getBoundingClientRect().width + 'px'
	//     }
	// }

	/**
	 * 调整列宽的up事件
	 * @memberof TableHeader
	 */
	onTrMouseUp = (e?: React.MouseEvent) => {
	    let event = Event.getEvent(e);
	    let width = this.drag.newWidth;
	    let opt = this.drag.option;
	    this.mouseClear();
	    if (opt !== "border") return; // fix:点击表头会触发onDropBorder事件的问题
	    this.props.onDropBorder && this.props.onDropBorder(event, width);
	};


	mouseClear() {
	    if (!this.drag || !this.drag.option) return;
	    let {rows} = this.props;
	    let data = {rows: rows[0], cols: this.table.cols as JSX.Element[], currIndex: this.drag.currIndex as number};
	    this.props.afterDragColWidth && this.props.afterDragColWidth(data);
	    this.drag = {
	        option: ""
	    };
	    this.clearThsDr();
	}

	clearThsDr = () => {
	    let ths = this.table.ths;
	    for (let index = 0; index < ths.length; index++) {
	        ths[index].setAttribute('draggable', false);// 去掉交换列效果
	    }
	}

	/**
	 * 当前对象上绑定全局事件，用于拖拽区域以外时的事件处理
	 * @param {*} events
	 * @param {*} type
	 * @memberof TableHeader
	 */
	bodyonLineMouseUp = () => {
	    if (!this.drag || !this.drag.option) return;
	    this.mouseClear();
	}

	// ---拖拽交换列代码----start-----
	/**
	 * 添加换列的事件监听
	 */
	dragAbleEvent() {
	    if (!this.table || !this.table.tr) return {
	        off: () => {
	        }, on: () => {
	        }
	    };
	    let events = [
	        {key: 'mousedown', fun: this.dragAbleMouseDown}, // 用户开始按住列头元素时触发
	        {key: 'dragstart', fun: this.onDragStart}, // 用户开始拖动元素时触发
	        {key: 'dragover', fun: this.onDragOver}, // 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
	        {key: 'drop', fun: this.onDrop}, // 在一个拖动过程中，释放鼠标键时触发此事件
	        {key: 'dragenter', fun: this.onDragEnter},
	        {key: 'dragend', fun: this.onDragEnd},
	        {key: 'dragleave', fun: this.onDragLeave},
	    ];
	    return {
	        off: () => {// 关闭事件
	            this.eventListen(events, 'remove', this.table.tr[0]);
	        },
	        on: () => {// 开启事件
	            if (this.props.draggable) {
	                this.eventListen(events, '', this.table.tr[0]);// 表示把事件添加到th元素上
	            }
	        }
	    }
	}

	/**
	 * 按下调整交换列的事件
	 */
	dragAbleMouseDown = (e: React.DragEvent<HTMLElement>) => {
	    const {eventNoStop} = this.props;
	    !eventNoStop && Event.stopPropagation(e);
	    let event = Event.getEvent(e),
	        targetEvent = Event.getTarget(event);
	    if (!this.props.draggable) return;
	    let currentElement = this.getTargetToType(targetEvent);
	    if (!currentElement) return;
	    let type = currentElement.getAttribute('data-type');
	    if (type == 'draggable' && this.props.draggable) {
	        let th = currentElement;
	        th.setAttribute('draggable', 'true');// 添加交换列效果
	        this.drag.option = 'dragAble';
	        this.currentDome = th;
	        this.drag.dragTarget = th;// 抓起的th目标
	    }
	}

	/**
	 * 开始调整交换列的事件
	 */
	onDragStart = (e: React.DragEvent<HTMLElement>) => {
	    if (!this.props.draggable) return;
	    if (this.drag && this.drag.option != 'dragAble') {
	        return;
	    }
	    let event = Event.getEvent(e);
	    let target = this.drag.dragTarget as HTMLElement;// 抓起的th目标
	    let currColKey = target.getAttribute("data-col-key");
	    let currColIndex = target.getAttribute('data-col-index') as string;
	    if (event.dataTransfer?.setDragImage) {
	        let crt = target.cloneNode(true) as HTMLElement;
	        crt.style.backgroundColor = "#ebecf0";
	        crt.style.width = this.table.cols[currColIndex].style.width;// 拖动后再交换列的时候，阴影效果可同步
	        crt.style.height = "40px";
	        (document.getElementById(this.tableNoneContId) as HTMLElement).appendChild(crt);
	        event.dataTransfer?.setDragImage(crt, 0, 0);
	    }
	    if (event.dataTransfer) {
	        event.dataTransfer.effectAllowed = "move";
	    	event.dataTransfer.setData("Text", currColKey);
	    }
	};

	onDragOver = (e: React.DragEvent<HTMLElement>) => {
	    let event = Event.getEvent(e);
	    event.preventDefault();
	};

	/**
	 * 在一个拖动过程中，释放鼠标键时触发此事件。【目标事件】
	 * @memberof TableHeader
	 */
	onDrop = (e: React.DragEvent<HTMLElement>) => {
	    if (!this.props.draggable) return;
	    if (this.drag && this.drag.option != 'dragAble') {
	        this.props.onDrop && this.props.onDrop(e);
	        return;
	    }
	    let event = Event.getEvent(e);
	    Event.preventDefault(e);// 防止拖拽后打开a链接
	    Event.stopPropagation(e);
	    this.currentDome && this.currentDome.setAttribute('draggable', 'false');// 添加交换列效果
	    if (!this.props.onDrop) return;
	    let {dragTarget, enterTarget} = this.drag;
	    let dragColKey = dragTarget && dragTarget.getAttribute("data-col-key");// 抓起的th目标
	    let dropColKey = enterTarget && enterTarget.getAttribute("data-col-key");
	    let dragSourceColumn = this.props.rows[0].find(da => da.key == dragColKey) as InnerColumnType;// 抓取来源列定义
	    let dragTargetColumn = this.props.rows[0].find(da => da.key == dropColKey) as InnerColumnType;// 放置目标列定义
	    if (dragSourceColumn.fixed !== dragTargetColumn.fixed) return;// 固定列和非固定列之间不能拖拽换顺序
	    this.props.onDrop(event, {dragSource: dragSourceColumn, dragTarget: dragTargetColumn});
	};


	onDragEnter = (e: React.DragEvent<HTMLElement>) => {
	    let event = Event.getEvent(e),
	        target = Event.getTarget(event);
	    this.drag.enterTarget = target;// 拖拽进入的目标th
	    let dragColKey = this.drag.dragTarget && this.drag.dragTarget.getAttribute('data-col-key');
	    let dragColFixed = this.drag.dragTarget && this.drag.dragTarget.getAttribute('data-th-fixed');
	    let currColKey = target.getAttribute("data-col-key");
	    let currColFixed = target.getAttribute("data-th-fixed");
	    if (dragColFixed !== currColFixed) return;// 固定列和非固定列之间不能拖拽换顺序
	    if (!currColKey || currColKey === dragColKey) return;// 拖放在同一个th目标上时则结束
	    if (target.nodeName.toUpperCase() === "TH") {
	        // 显示交换的插入点
	        target.setAttribute("style", "border-right:2px dashed rgb(30, 136, 229)");
	    }
	}
	// 注意：列不多的情况下，如果最后一列：实际宽度-100，被填充宽度-300，则与其前面列交换后宽度只是实际宽度交换，填充宽度不会交换
	onDragEnd = (e: React.DragEvent<HTMLElement>) => {
	    let event = Event.getEvent(e);
	        // target = Event.getTarget(event);
	    let {enterTarget, dragTarget} = this.drag;
	    enterTarget && enterTarget.setAttribute("style", "");// 清除进入目标th的插入点
	    event.preventDefault()
	    event.stopPropagation();
	    // 清除抓取目标的副本
	    (document.getElementById(this.tableNoneContId) as HTMLElement).innerHTML = "";
	    if (!this.props.onDragEnd) return;
	    let dragColKey = dragTarget && dragTarget.getAttribute('data-col-key');
	    let dropColKey = enterTarget && enterTarget.getAttribute("data-col-key");
	    let dragSourceColumn = this.props.rows[0].find(da => da.key == dragColKey) as InnerColumnType;// 抓取来源列定义
	    let dragTargetColumn = this.props.rows[0].find(da => da.key == dropColKey) as InnerColumnType;// 放置目标列定义
	    if (!dragTargetColumn) return;
	    if (dragSourceColumn.fixed !== dragTargetColumn.fixed) return;// 固定列和非固定列之间不能拖拽换顺序
	    if (!dropColKey || dropColKey == dragColKey) return;
	    this.props.onDragEnd(event, {dragSource: dragSourceColumn, dragTarget: dragTargetColumn});
	}


	onDragLeave = (e: React.DragEvent<HTMLElement>) => {
	    let event = Event.getEvent(e),
	        target = Event.getTarget(event);
	    let dragColKey = this.drag.dragTarget && this.drag.dragTarget.getAttribute('data-col-key');
	    let currColKey = target.getAttribute("data-col-key");
	    if (!currColKey || currColKey === dragColKey) return;
	    if (target.nodeName.toUpperCase() === "TH") {
	        // 清除交换的插入点
	        target.setAttribute("style", "");
	    }
	}

	/**
	 * 根据当前鼠标点击的节点，进行递归遍历，最终找到th
	 * @param {*} element
	 * @returns  <th />对象
	 * @memberof TableHeader
	 */
	getThDome = (element: HTMLElement): HTMLElement | null => {
	    let _tagName = element.tagName.toLowerCase();
	    if (element.getAttribute('data-filter-type') === 'filterContext') return null;
	    if (_tagName === 'i') return null;
	    if (_tagName != 'th' && element.parentElement) {
	        return this.getThDome(element.parentElement);
	    } else {
	        return element;
	    }
	}


	// ---拖拽列交换----end-----

	/**
	 * 过滤输入后或下拉条件的回调函数
	 */
	handlerFilterChange = (key: DataIndex, value: string, condition: 'LIKE' | 'EQ') => {
	    let {onFilterChange} = this.props;
	    if (onFilterChange) {
	        onFilterChange(key, value, condition);
	    }
	};

	/**
	 * 过滤行清除回调
	 */
	handlerFilterClear = (field: DataIndex) => {
	    let {onFilterClear} = this.props;
	    if (onFilterClear) {
	        onFilterClear(field);
	    }
	}

	/**
	 * 过滤渲染的组件类型
	 */
	filterRenderType = (type: string, dataIndex: DataIndex, index: number, filterFieldid: string | undefined) => {
	    const {clsPrefix, rows, filterDelay, locale, dir: direction} = this.props;
	    let selectDataSource = [];
	    switch (type) {
	    // 文本输入
	    case "text":
	        return (
	            <FilterType
	                locale={locale}// 多语
	                    dir={direction}
	                fieldid={filterFieldid}
	                rendertype={type}// 渲染类型
	                clsPrefix={clsPrefix}// css前缀
	                className={`${clsPrefix} filter-text`}
	                dataIndex={dataIndex}// 字段
	                onFilterChange={debounce(this.handlerFilterChange, filterDelay || 300, false)}// 输入框回调
	                onFilterClear={this.handlerFilterClear}// 清除回调
	                filterDropdown={rows[1][index].filterdropdown}// 是否显示下拉条件
	                filterDropdownType={rows[1][index].filterdropdowntype}// 下拉的条件类型为string,number
	                filterDropdownIncludeKeys={rows[1][index].filterdropdownincludekeys}// 下拉条件按照指定的keys去显示
	                filterDropdownOptions={rows[1][index].filterdropdownoptions}
	            />
	        );
	        // 数值输入
	    case "number":
	        return (
	            <FilterType
	                locale={locale}
	                    dir={direction}
	                fieldid={filterFieldid}
	                rendertype={type}
	                clsPrefix={clsPrefix}
	                className={`${clsPrefix} filter-text`}
	                dataIndex={dataIndex}// 字段
	                onFilterChange={debounce(this.handlerFilterChange, filterDelay || 300, false)}// 输入框回调并且函数防抖动
	                onFilterClear={this.handlerFilterClear}// 清除回调
	                filterDropdown={rows[1][index].filterdropdown}
	                filterDropdownType={rows[1][index].filterdropdowntype}// 下拉的条件类型为string,number
	                filterDropdownIncludeKeys={rows[1][index].filterdropdownincludekeys}// 下拉条件按照指定的keys去显示
	                filterInputNumberOptions={rows[1][index].filterinputnumberoptions}// 设置数值框内的详细属性
	                    filterDropdownOptions={rows[1][index].filterdropdownoptions}
	            />
	        );
	        // 下拉框选择
	    case "dropdown":
	        // 处理没有输入数据源的时候，系统自动查找自带的数据筛选后注入
	        if (rows.length > 0 && (rows[1][index].filterdropdownauto || "auto") == "auto") {
	                let hash = {};
	                let _arr:SelectProps<SelectValue>['data'][] = []
	                // 处理下拉重复对象组装dropdown
	                // @ts-ignore
	            selectDataSource = Array.from(rows[1][0].datasource, (x: Record<string | number, any>) => ({
	                key: x[dataIndex],
	                value: x[dataIndex]
	            }));
	            selectDataSource = selectDataSource.reduceRight((item, next) => {
	                // @ts-ignore
	                hash[next.key] ? "" : (hash[next.key] = true && item.push(next));
	                return item;
	            }, _arr);
	        } else {
	            // 从外部数据源加载系统数据
	            // selectDataSource = rows[1][index].filterdropdowndata;
	            selectDataSource = rows[1][index].filterdropdowndata.map((item: any) => {
	                    return {
	                        ...item,
	                        label: item.key
	                    }
	                });
	        }
	        return (
	            <FilterType
	                locale={locale}
	                    dir={direction}
	                fieldid={filterFieldid}
	                rendertype={type}
	                clsPrefix={clsPrefix}
	                className={`${clsPrefix} filter-dropdown`}
	                options={selectDataSource}
	                notFoundContent={"Loading"}// 没有数据显示的默认字
	                dataIndex={dataIndex}// 字段
	                onFilterChange={this.handlerFilterChange}// 输入框回调
	                onFilterClear={this.handlerFilterClear}// 清除回调
	                filterDropdown={rows[1][index].filterdropdown}
	                onFocus={rows[1][index].filterdropdownfocus}
	                filterDropdownType={rows[1][index].filterdropdowntype}// 下拉的条件类型为string,number
	                filterDropdownIncludeKeys={rows[1][index].filterdropdownincludekeys}// 下拉条件按照指定的keys去显示
	                    filterDropdownOptions={rows[1][index].filterdropdownoptions}
	            />
	        );
	        // 日期
	    case "date":
	        return (
	            <FilterType
	                locale={locale}
	                    dir={direction}
	                fieldid={filterFieldid}
	                rendertype={type}
	                clsPrefix={clsPrefix}
	                className={`filter-date`}
	                format={rows[1][index].format || "YYYY-MM-DD"}
	                dataIndex={dataIndex}// 字段
	                onFilterChange={this.handlerFilterChange}// 输入框回调
	                onFilterClear={this.handlerFilterClear}// 清除回调
	                filterDropdown={rows[1][index].filterdropdown}
	                filterDropdownType={rows[1][index].filterdropdowntype}// 下拉的条件类型为string,number
	                filterDropdownIncludeKeys={rows[1][index].filterdropdownincludekeys}// 下拉条件按照指定的keys去显示
	                    filterDropdownOptions={rows[1][index].filterdropdownoptions}
	            />
	        );
	        // 日期 年
	    case "dateyear":
	        return (
	            <FilterType
	                locale={locale}
	                    dir={direction}
	                fieldid={filterFieldid}
	                rendertype={type}
	                clsPrefix={clsPrefix}
	                className={`filter-date`}
	                format={rows[1][index].format || "YYYY"}
	                dataIndex={dataIndex}// 字段
	                onFilterChange={this.handlerFilterChange}// 输入框回调
	                onFilterClear={this.handlerFilterClear}// 清除回调
	                filterDropdown={rows[1][index].filterdropdown}
	                filterDropdownType={rows[1][index].filterdropdowntype}// 下拉的条件类型为string,number
	                filterDropdownIncludeKeys={rows[1][index].filterdropdownincludekeys}// 下拉条件按照指定的keys去显示
	                    filterDropdownOptions={rows[1][index].filterdropdownoptions}
	            />
	        );
	        // 日期 月
	    case "datemonth":
	        return (
	            <FilterType
	                locale={locale}
	                    dir={direction}
	                fieldid={filterFieldid}
	                rendertype={type}
	                clsPrefix={clsPrefix}
	                className={`filter-date`}
	                format={rows[1][index].format || "YYYY-MM"}
	                dataIndex={dataIndex}// 字段
	                onFilterChange={this.handlerFilterChange}// 输入框回调
	                onFilterClear={this.handlerFilterClear}// 清除回调
	                filterDropdown={rows[1][index].filterdropdown}
	                filterDropdownType={rows[1][index].filterdropdowntype}// 下拉的条件类型为string,number
	                filterDropdownIncludeKeys={rows[1][index].filterdropdownincludekeys}// 下拉条件按照指定的keys去显示
	                    filterDropdownOptions={rows[1][index].filterdropdownoptions}
	            />
	        );
	        // 日期 周
	    case "dateweek":
	        return (
	            <FilterType
	                locale={locale}
	                    dir={direction}
	                fieldid={filterFieldid}
	                rendertype={type}
	                clsPrefix={clsPrefix}
	                className={`filter-date`}
	                format={rows[1][index].format || "YYYY-Wo"}
	                dataIndex={dataIndex}// 字段
	                onFilterChange={this.handlerFilterChange}// 输入框回调
	                onFilterClear={this.handlerFilterClear}// 清除回调
	                filterDropdown={rows[1][index].filterdropdown}
	                filterDropdownType={rows[1][index].filterdropdowntype}// 下拉的条件类型为string,number
	                filterDropdownIncludeKeys={rows[1][index].filterdropdownincludekeys}// 下拉条件按照指定的keys去显示
	                    filterDropdownOptions={rows[1][index].filterdropdownoptions}
	            />
	        );
	    // 日期范围
	    case "daterange":
	        return (
	            <FilterType
	                locale={locale}
	                    dir={direction}
	                fieldid={filterFieldid}
	                rendertype={type}
	                clsPrefix={clsPrefix}
	                className={`filter-date`}
	                format={rows[1][index].format || "YYYY-MM-DD"}
	                dataIndex={dataIndex}// 字段
	                onFilterChange={this.handlerFilterChange}// 输入框回调
	                onFilterClear={this.handlerFilterClear}// 清除回调
	                filterDropdown={rows[1][index].filterdropdown}
	                filterDropdownType={rows[1][index].filterdropdowntype}// 下拉的条件类型为string,number
	                filterDropdownIncludeKeys={rows[1][index].filterdropdownincludekeys}// 下拉条件按照指定的keys去显示
	                    filterDropdownOptions={rows[1][index].filterdropdownoptions}
	            />
	        );
		 // 时间范围
		 case "time":
	            return (
	                <FilterType
	                    locale={locale}
	                    dir={direction}
	                    fieldid={filterFieldid}
	                    rendertype={type}
	                    clsPrefix={clsPrefix}
	                    className={`filter-time`}
	                    // format={rows[1][index].format}
	                    dataIndex={dataIndex}// 字段
	                    onFilterChange={this.handlerFilterChange}// 输入框回调
	                    onFilterClear={this.handlerFilterClear}// 清除回调
	                    filterDropdown={rows[1][index].filterdropdown}
	                    filterDropdownType={rows[1][index].filterdropdowntype}// 下拉的条件类型为string,number
	                    filterDropdownIncludeKeys={rows[1][index].filterdropdownincludekeys}// 下拉条件按照指定的keys去显示
	                    filterDropdownOptions={rows[1][index].filterdropdownoptions}
	                />
	            );
	            // 开关
		 case "bool":
	            return (
	                <FilterType
	                    locale={locale}
	                    dir={direction}
	                    fieldid={filterFieldid}
	                    rendertype={type}
	                    clsPrefix={clsPrefix}
	                    className={`filter-witch`}
	                    // format={rows[1][index].format}
	                    dataIndex={dataIndex}// 字段
	                    onFilterChange={this.handlerFilterChange}// 输入框回调
	                    onFilterClear={this.handlerFilterClear}// 清除回调
	                    filterDropdown={rows[1][index].filterdropdown}
	                    filterDropdownType={rows[1][index].filterdropdowntype}// 下拉的条件类型为string,number
	                    filterDropdownIncludeKeys={rows[1][index].filterdropdownincludekeys}// 下拉条件按照指定的keys去显示
	                    filterDropdownOptions={rows[1][index].filterdropdownoptions}
	                />
	            );
	    default:
	        // 不匹配类型默认文本输入,注意需要一个空格占位以撑开div
	        return <div dangerouslySetInnerHTML={{__html: '&nbsp;'}}/>;
	    }
	};

	onCopy = (data: InnerColumnType, index?: number, event?: React.ClipboardEventHandler<HTMLTableHeaderCellElement>): void => {
	    if (this.props.onCopy) {
	        this.props.onCopy(Object.assign(data, {col: index}), event)
	    }
	}

	onExpand = (status: boolean) => {
	    // console.log('点击折叠的值', v1, v2, v3, v4)
	    let { onExpandedAll } = this.props
	    onExpandedAll && onExpandedAll(status)
	}

	renderCell = (props: TableHeaderProps, columns: any, row: any, index: number, headerLocal?: any) => {
	    const {
	        clsPrefix,
	        filterable,
	        rows,
	        draggable,
	        dragborder,
	        columnManager,
	        fieldid,
	        expandIconColumnIndex,
	        expandedIcon,
	        collapsedIcon,
	        needIndentSpaced,
	        expandIconAsCell,
	        showHeaderExpandIcon,
	        expandableColumnTitle,
	        showExpandColumn,
	        expanded,
	        dir
	    } = props;
	    let showColumns = columnManager && columnManager.showLeafColumns(undefined, true);
	    return row.map((da: any, columIndex: number) => {
	        const {
	            onHeaderCell,
	            required,
	            drgHover,
	            className,
	            titleAlign,
	            textAlign,
	            key,
	            dataIndex,
	            children,
	            filtertype,
	            fixed: daFixed,
	            width,
	            // maxWidth,
	            colSpan,
	            dragborder: daDragborder,
	            isFirstRight,
	            isLastLeft,
	            isAllLeft,
	            fieldid: cellFieldid,
	            innerHeaderIcon,
	            tip
	        } = da;
	        const onHeaderCellObj = onHeaderCell && typeof onHeaderCell === 'function' ? onHeaderCell(columns[columIndex], undefined) : {} // 添加onHeaderCell属性
	        let thClassName = classnames({
	            [`${className}`]: !!className,
	            [`text-${titleAlign}`]: titleAlign,
	            [`text-${textAlign}`]: textAlign,
	            [`${clsPrefix}-thead`]: draggable,
	            [`${clsPrefix}-header-cell`]: 1,
	            [`th-drag`]: draggable,
	            [`${clsPrefix}-thead`]: drgHover && draggable,
	            [`th-drag-hover`]: drgHover && draggable,
	            [`${clsPrefix}-thead-th`]: dragborder,
	            [`${clsPrefix}-cell-fix-${daFixed === true ? 'left' : daFixed}`]: daFixed,
	            [`${clsPrefix}-cell-fix-right-first`]: isFirstRight,
	            [`${clsPrefix}-cell-fix-left-last`]: isLastLeft,
	            [`${clsPrefix}-cell-fix-left-all`]: isAllLeft,
	        })

	        let colKey = key || dataIndex || index + '-' + columIndex; // 避免key为undefined

	        let domData = {
	            'data-th-fixed': daFixed,
	            'data-th-width': width,
	            'data-line-key': key,
	            'data-col-key': colKey,
	            'data-col-index': columIndex
	        };
	        // 渲染拖拽列宽度的抓手
	        let dragGapView = null;
	        // if (dragborder && daDragborder !== false && !colSpan) {// 如果存在colSpan则表明其是组合列（不允许拖拽），不是最终显示列。
			if (dragborder && daDragborder !== false && (colSpan == undefined || colSpan === 1)) {// 如果存在colSpan则表明其是组合列（不允许拖拽），不是最终显示列。
	            let dragGapViewClass = classnames({
	                [`${clsPrefix}-thead-th-drag-gap`]: true,
	                [`${daFixed === true ? (dir === 'rtl' ? 'left' : "right") : daFixed}`]: daFixed,
	                [`last`]: columIndex === showColumns.length - 1,
	            })
	            dragGapView = <div
	                ref={el => (this.gap = el)}
	                data-type="online"
	                {...domData}
	                className={dragGapViewClass}>
	                <div className='online'/>
	            </div>
	        }
	        let thProps = Object.assign({}, da, {dragborder: daDragborder == null ? '' : daDragborder.toString()}); // 消除dragborder的警告
	        thProps.style = thProps.style || {};
	        // if (maxWidth || width) {// 由于th中文本过长时会撑开内容需要显示声明maxWidth以确保省略文本css样式生效
	        //     thProps.style.maxWidth = maxWidth || width;
	        // }
	        if (['right', 'left', true].includes(daFixed)) {
	            thClassName += ` ${prefix}-table-header-fix-sticky`
	            if (da.fixed == 'right') {
	                thProps.style[dir === 'rtl' ? "left" : "right"] = da.offsetWidth;
	            } else {
	                thProps.style[dir === 'rtl' ? "right" : "left"] = da.offsetWidth;
	            }
	        }
	        let thFieldidAttr = fieldid ? { fieldid: cellFieldid || dataIndex || key } : {}
	        let draggableaAttr = daFixed ? {} : { 'data-type': "draggable"}

	        const expandIcon = (
	            <Tooltip className={`${clsPrefix}-header-cell-expand`} overlay={expanded ? headerLocal?.langMap?.collapseAll : headerLocal?.langMap?.expandAll}>
	                <ExpandIcon
	                    expandable={true}
	                    clsPrefix={clsPrefix + '-row'}
	                    onExpand={this.onExpand}
	                    needIndentSpaced={needIndentSpaced}
	                    expanded={expanded}
	                    // record={record}
	                    fixedIndex={expandIconColumnIndex as number}
	                    expandedIcon={expandedIcon}
	                    // expandIcon={_expandIcon}
	                    collapsedIcon={collapsedIcon}
	                    isShowExpandIcon={true}
	                    fieldid={fieldid}
	                    // oldMode={this.props.oldMode}
	                />
	                <></>
	            </Tooltip>
	        );
	        let tipRender = null;
	        if (tip) {
	            let tipContent = typeof tip === 'string' ? tip : typeof tip === 'function' ? tip() : null;
	            if (tipContent) {
	                tipRender =
					<div className={`${prefix}-table-title-icon ${prefix}-table-column-tip`}>
					    <Tooltip overlay={tipContent} placement='top' overlayStyle={{zIndex: 1541}}>
					        <Icon type="uf-a-wenhaomoren" />
					    </Tooltip>
					</div>
	            }
	        }
	        let _index = expandIconAsCell && showExpandColumn ? 0 : expandIconColumnIndex
	        let expandHeaderContent = showExpandColumn ? (<>{showHeaderExpandIcon ? expandIcon : null}{expandableColumnTitle && expandIconAsCell ? expandableColumnTitle : null}</>) : null;
	        let hasInnerHeaderIcon = innerHeaderIcon && Object.keys(innerHeaderIcon).length;
	        let lockStyle = {}
	        if (hasInnerHeaderIcon && innerHeaderIcon.lockButton && columIndex === row.length - 1) {
	            lockStyle = {
	                // maxWidth: 'calc(100% - 40px)'
	                width: '100%',
   			 		paddingRight: '40px'
	            }
	        }
	        if (hasInnerHeaderIcon) {
	            thClassName += ` ${prefix}-table-header-has-icon`
	        }


	        let renderChildren = required ? hasInnerHeaderIcon ?
	            <div className={hasInnerHeaderIcon ? `${prefix}-table-title-icon-list-${Object.keys(innerHeaderIcon).length}` : undefined} title={typeof children === 'string' ? children : undefined} style={lockStyle}>
	                {columIndex === _index ? expandHeaderContent : null}
	                {
	                    titleAlign === 'right' ? (
	                        <>
	                            {hasInnerHeaderIcon ? Object.values(innerHeaderIcon).map((item: any) => (item)) : null}
	                            <span className='required'>*</span>
	                            {children}
	                            {tipRender}
	                        </>
							 ) : (
	                        <>
	                            <span className='required'>*</span>
	                            {children}
	                            {tipRender}
	                            {hasInnerHeaderIcon ? Object.values(innerHeaderIcon).map((item: any) => (item)) : null}
	                        </>
							 )

	                }
	            </div> : <>{columIndex === _index ? expandHeaderContent : null}<span className='required'>*</span>{children}{tipRender}</> : hasInnerHeaderIcon ?
	            <div className={hasInnerHeaderIcon ? `${prefix}-table-title-icon-list-${Object.keys(innerHeaderIcon).length}` : undefined} title={typeof children === 'string' ? children : undefined} style={lockStyle}>
	                {columIndex === _index ? expandHeaderContent : null}
	                {
	                    titleAlign === 'right' ? (
	                        <>
	                            {hasInnerHeaderIcon ? Object.values(innerHeaderIcon).map((item: any) => (item)) : null}
	                            {children}
	                            {tipRender}
	                        </>
	                    ) : (
	                        <>
	                            {children}
	                            {tipRender}
	                            {hasInnerHeaderIcon ? Object.values(innerHeaderIcon).map((item: any) => (item)) : null}
	                        </>
	                    )
	                }

	            </div> : <>{columIndex === _index ? expandHeaderContent : null}{children}{tipRender}</>;

	        if (filterable && index == rows.length - 1) {
	            let filterFieldid = fieldid ? cellFieldid || dataIndex || key : undefined;
	            renderChildren = this.filterRenderType(filtertype, dataIndex, columIndex, filterFieldid);
	            if (key === undefined) {
	                colKey = colKey + '-filterable'
	            }
	        }

	        let titleAttr = typeof children === 'string' ? {title: children} : {}

	        return (
	            <th
	                {...omit(thProps, ['textAlign', 'titleAlign', 'drgHover', 'filterdropdownfocus', 'width', 'datasource', 'dataIndex', 'offsetWidth', 'isLastLeft', 'isFirstRight', 'isAllLeft', 'innerHeaderIcon'])}
	                key={colKey + "_" + daFixed}
	                className={thClassName}
	                onClick={da.onClick ? da.onClick.bind(this, da) : null}
	                {...draggableaAttr}
	                {...domData}
	                {...thFieldidAttr}
	                {...onHeaderCellObj}
	                {...titleAttr}
	                onCopy={
	                    (event: React.ClipboardEventHandler<HTMLTableHeaderCellElement>) => {
	                        this.onCopy(da, columIndex, event)
	                    }
	                }
	            >
	                {
	                    (da.isFirstRight || da.isLastLeft) && this.props.bodyDisplayInRow ?
	                        <span className={`${clsPrefix}-cell-content`}>
	                            {renderChildren}{dragGapView}
	                        </span> :
	                        <>
	                            {renderChildren}{dragGapView}
	                        </>
	                }
	            </th>
	        )
	    })
	}

	renderRows = (props: TableHeaderProps, columns: any, onHeaderRowObj: any, row: any, index: number, bigColumns?: boolean, trHeigh?: number, headerLocal?: any) => {
	    const {
	        rowStyle,
	        rows,
	        filterable,
	    } = props;
	    let trStyle = bigColumns ? {height: trHeigh} : {}
	    return (
	        <tr
	            key={index}
	            style={rowStyle as React.CSSProperties}
	        	className={(filterable && index == rows.length - 1) ? 'filterable' : ''}
	            {...onHeaderRowObj}
	            {...trStyle}
	        >
	        	{this.renderCell(props, columns, row, index, headerLocal)}
	    	</tr>
	    )
	}

	renderHeader = (props: TableHeaderProps) => {
	    const {
	        clsPrefix,
	        rows,
	        dragborder,
	        columnManager,
	        onHeaderRow,
	        bigColumns,
	        headerHeight,
	        filterable,
	        maxLevel = 1,
	        locale,
	        tableUid
	    } = props;
	    let headerLocal = getLangInfo(locale, i18n, 'table')
	    let attr = dragborder ? {id: `${prefix}-table-drag-thead-${this.theadKey}`} : {};
	    let columns = columnManager && columnManager.columns || [];
	    let bigColumnsHeight = headerHeight ? headerHeight : (filterable ? maxLevel + 1 : maxLevel) * 30
	    let trHeight = bigColumns && rows.length ? bigColumnsHeight / rows.length : 0;
	    const onHeaderRowObj = onHeaderRow && typeof onHeaderRow === 'function' ? onHeaderRow(columns as InnerColumnType[], 0) : {}// 添加onHeaderRow属性
	    return (
	        <thead
	            className={`${clsPrefix}-thead`}
	            {...attr}
	            data-theader-fixed='scroll'
	            ref={_thead => this._thead = _thead}
	            data-for-head={tableUid}
	        >
	            {rows.map((row, index) => {
	                return this.renderRows(props, columns, onHeaderRowObj, row, index, bigColumns, trHeight, headerLocal)
	            })}
	        </thead>
	    )

	}


	render() {
	    return this.renderHeader(this.props)
	    // const {
	    //     clsPrefix, rowStyle, draggable,
	    //     dragborder, rows, filterable, fixed, columnManager, onHeaderRow, fieldid
	    // } = this.props;
	    // let attr = dragborder ? {id: `${prefix}-table-drag-thead-${this.theadKey}`} : {};
	    // let showColumns = columnManager && columnManager.showLeafColumns(fixed);
	    // let columns = columnManager && columnManager.columns || [];
	    // const onHeaderRowObj = onHeaderRow && typeof onHeaderRow === 'function' ? onHeaderRow(columns as InnerColumnType[], 0) : {}// 添加onHeaderRow属性
	    // return (
	    //     <thead className={`${clsPrefix}-thead`} {...attr} data-theader-fixed='scroll'
	    // 		   ref={_thead => this._thead = _thead}>
	    //         {rows.map((row, index) => {
	    //             let leftFixedColIndex = 0, rightFixedColIndex = 0, centerColIndex = 0;
	    //             return (<tr key={index} style={rowStyle as React.CSSProperties}
	    //                 className={(filterable && index == rows.length - 1) ? 'filterable' : ''} {...onHeaderRowObj}>
	    //                 {row.map((da, columIndex) => {
	    //                     const {onHeaderCell} = da;
	    //                     const onHeaderCellObj = onHeaderCell && typeof onHeaderCell === 'function' ? onHeaderCell(columns[columIndex], undefined) : {} // 添加onHeaderCell属性
	    //                     da.children = da.required ?
	    //                         <span><span className='required'>*</span>{da.children}</span> : da.children;
	    //                     let thHover = da.drgHover ? ` ${clsPrefix}-thead th-drag-hover` : "";
	    //                     delete da.drgHover;
	    //                     /*
	    // 					let fixedStyle = "";
	    // 					//主表格下、固定列或者是过滤行中含有固定列时添加该属性
	    // 					if (!fixed && (da.fixed || (filterable && index == rows.length - 1 && rows[0][columIndex].fixed)) ) {
	    // 					  fixedStyle = ` ${clsPrefix}-row-fixed-columns-in-body`;
	    // 					}
	    // 					*/
	    //                     let thClassName = `${da.className}` ? `${da.className}` : '';
	    //                     thClassName += ` ${clsPrefix}-header-cell`
	    //                     if (da.titleAlign) {
	    //                         thClassName += ` text-${da.titleAlign} `;
	    //                     } else if (da.textAlign) {
	    //                         thClassName += ` text-${da.textAlign} `;
	    //                     }

	    //                     delete da.textAlign;
	    //                     delete da.titleAlign;
	    //                     let colKey = da.key || da.dataIndex || index + '-' + columIndex; // 避免key为undefined

	    //                     if (filterable && index == rows.length - 1) {
	    //                         da.children = this.filterRenderType(
	    //                             da.filtertype,
	    //                             da.dataIndex,
	    //                             columIndex
	    //                         );
	    //                         if (da.key === undefined) {
	    //                             colKey = colKey + '-filterable'
	    //                         }
	    //                         delete da.filterdropdownfocus;
	    //                     }

	    //                     if (draggable) {
	    //                         thClassName += ` ${clsPrefix}-thead th-drag ${thHover} `;
	    //                     }
	    //                     if (dragborder) {
	    //                         thClassName += ` ${clsPrefix}-thead-th `;
	    //                     }
	    //                     // 固定列添加类名
	    //                     if (da.fixed) {
	    //                         thClassName += ` ${clsPrefix}-cell-fix-${da.fixed}`
	    //                         if (da.isFirstRight) {
	    //                             thClassName += ` ${clsPrefix}-cell-fix-${da.fixed}-first`
	    //                         }
	    //                         if (da.isLastLeft) {
	    //                             thClassName += ` ${clsPrefix}-cell-fix-${da.fixed}-last`
	    //                         }
	    //                     }
	    //                     // if (columnsChildrenList.length-1 == columIndex) {
	    //                     //   thClassName += " th-can-not-drag";
	    //                     // }
	    //                     // thClassName += ` ${fixedStyle}`;

	    //                     // 存放到dom上的数据
	    //                     let domData = {
	    //                         'data-th-fixed': da.fixed,
	    //                         'data-th-width': da.width,
	    //                         'data-line-key': da.key,
	    //                         // 'data-line-index':columIndex,//不分区域的列索引
	    //                         'data-col-key': colKey,
	    //                         'data-col-index': fixed && da.fixed ? (da.fixed == 'right' ? rightFixedColIndex : leftFixedColIndex) : !fixed && !da.fixed && centerColIndex// 左中右各区域的列索引
	    //                     };


	    //                     // 渲染拖拽列宽度的抓手
	    //                     let dragGapView = null;
	    //                     if (dragborder && da.dragborder !== false && !da.colSpan) {// 如果存在colSpan则表明其是组合列（不允许拖拽），不是最终显示列。
	    //                         let isLastCol: boolean | string = false;// 是否为本区域最后一列
	    //                         if (fixed && da.fixed) {
	    //                             if (fixed == 'right' && da.fixed == 'right') {
	    //                                 isLastCol = showColumns.length - 1 == rightFixedColIndex ? 'last' : '';
	    //                             }
	    //                         } else if (!fixed && !da.fixed) {
	    //                             isLastCol = showColumns.length - 1 == centerColIndex
	    //                         }
	    //                         dragGapView = <div ref={el => (this.gap = el)} data-type="online" {...domData}
	    // 										   className={`${clsPrefix}-thead-th-drag-gap ${da.fixed} ${isLastCol ? 'last' : ''}`}>
	    //                             <div className='online'/>
	    //                         </div>
	    //                     }
	    //                     let thProps = Object.assign({}, da, {dragborder: da.dragborder == null ? '' : da.dragborder.toString()}); // 消除dragborder的警告
	    //                     if (da.maxWidth || da.width) {// 由于th中文本过长时会撑开内容需要显示声明maxWidth以确保省略文本css样式生效
	    //                         thProps.style = thProps.style || {};
	    //                         thProps.style.maxWidth = da.maxWidth || da.width;
	    //                     }
	    //                     if (da.fixed === 'right' || da.fixed === 'left' || da.fixed === true) {
	    //                         thProps.style = thProps.style || {};
	    //                         thProps.style.position = 'sticky';
	    //                         thProps.style.zIndex = 2;
	    //                         if (da.fixed == 'left') {
	    //                             thProps.style.left = da.offsetWidth;
	    //                         } else {
	    //                             thProps.style.right = da.offsetWidth;
	    //                         }
	    //                     } else {
	    //                         thProps.style = thProps.style || {};
	    //                         thProps.style.position = 'relative';
	    //                     }
	    //                     delete thProps.width;
	    //                     delete thProps.datasource;
	    //                     delete thProps.dataIndex;// 多余属性不渲染到dom元素上
	    //                     // 计数+1
	    //                     fixed && da.fixed ? (da.fixed == 'right' ? rightFixedColIndex++ : leftFixedColIndex++) : !fixed && !da.fixed && centerColIndex++;
	    //                     const {fieldid: cellFieldid} = da;
	    //                     let thFieldidAttr = fieldid ? { fieldid: cellFieldid || da.dataIndex || da.key } : {}
	    //                     // 固定列th添加span
	    //                     // column.stickyInfo && (column.stickyInfo.isFirstRight || column.stickyInfo.isLastLeft)) && bodyDisplayInRow
	    //                     let headerHh: any = ''
	    //                     if ((da.isFirstRight || da.isLastLeft) && this.props.bodyDisplayInRow) {
	    //                         headerHh = <th {...thProps} {...thFieldidAttr} {...onHeaderCellObj} {...domData} className={thClassName}><span className={`${clsPrefix}-cell-content`}>{da.children}</span></th>
	    //                     } else {
	    //                         headerHh = <th {...thProps} {...thFieldidAttr} {...onHeaderCellObj} {...domData} className={thClassName}>{da.children}</th>
	    //                     }
	    //                     if (!da.fixed && !fixed) { // 非固定表头 , data-type="draggable"标识允许进行列拖拽排序
	    //                         return (<th {...thProps} key={colKey + "_" + fixed} className={thClassName} onClick={da.onClick ? da.onClick.bind(this, da) : null}
	    //                             data-type="draggable" {...domData} {...thFieldidAttr} {...onHeaderCellObj} onCopy={(event: React.ClipboardEventHandler<HTMLTableHeaderCellElement>) => {
	    //                                 this.onCopy(da, columIndex, event)
	    //                             }}>
	    //                             {da.children}
	    //                             {dragGapView}
	    //                         </th>)
	    //                     } else if (da.fixed && fixed) { // 固定表头
	    //                         if (da.dataIndex == 'checkbox' && da.fixed == 'left') {// 多选框列
	    //                             return <th {...thProps} {...thFieldidAttr} {...onHeaderCellObj}>{da.children}</th>;
	    //                         } else if (filterable && index == rows.length - 1) {// 固定列下的筛选单元格需要一个空占位
	    //                             return <th dangerouslySetInnerHTML={{__html: '&nbsp;'}} {...onHeaderCellObj}></th>
	    //                         } else {
	    //                             return (<th {...thProps} onClick={da.onClick ? da.onClick.bind(this, da) : null}
	    //                                 key={colKey + "_" + fixed} {...domData} {...thFieldidAttr} {...onHeaderCellObj}
	    //                                 onCopy={this.onCopy} className={thClassName}>
	    //                                 {da.children}
	    //                                 {dragGapView}
	    //                             </th>)
	    //                         }
	    //                     } else if (da.fixed && !fixed) {
	    //                         return headerHh
	    //                     } else {
	    //                         if (da.key == `${prefix}-table-expandIconAsCell`) {// 展开列
	    //                             return <th {...thProps} {...onHeaderCellObj}>{da.children}</th>;
	    //                         }
	    //                     }
	    //                 })}
	    //             </tr>
	    //             )
	    //         })}
	    //     </thead>
	    // );
	}
}

// TableHeader.propTypes = propTypes;
export default TableHeader;

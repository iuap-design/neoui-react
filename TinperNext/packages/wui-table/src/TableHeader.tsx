// import PropTypes from "prop-types";
import classnames from 'classnames';
import React, {Component} from "react";
// import {debounce} from "throttle-debounce";
import {prefix} from "../../wui-core/src/index";
import FilterType from "./FilterType";
import {Event, EventUtil, debounce} from "./lib/utils";
import { TableHeaderProps } from './iTableHeader';
import { DefaultRecordType, DataIndex } from './interface';
import { ColumnType } from './iTable';
import { SelectValue, SelectProps } from '../../wui-select/src/iSelect'
import ExpandIcon from './ExpandIcon';
import Tooltip from '../../wui-tooltip/src/index'
import {getLangInfo} from "../../wui-locale/src/tool";
import i18n from './lib/i18n';

// const propTypes = {
//     clsPrefix: PropTypes.string,
//     locale: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//     rowStyle: PropTypes.object,
//     rows: PropTypes.array,
//     minColumnWidth: PropTypes.number,
//     contentDomWidth: PropTypes.number,
//     scrollbarWidth: PropTypes.number,
//     columnsChildrenList: PropTypes.any,
//     tableUid: PropTypes.string,
//     draggable: PropTypes.bool,
//     dragborder: PropTypes.bool,
//     contentTable: PropTypes.any,
//     headerScroll: PropTypes.any,
//     parentNode: PropTypes.any,
//     columnManager: PropTypes.any,
//     filterable: PropTypes.any,
//     lastShowIndex: PropTypes.number,
//     leftFixedWidth: PropTypes.number,
//     rightFixedWidth: PropTypes.number,
//     onMouseMove: PropTypes.func,
//     onDraggingBorder: PropTypes.func,
//     onDragEnd: PropTypes.func,
//     onMouseDown: PropTypes.func,
//     onDrop: PropTypes.func,
//     onFilterChange: PropTypes.func,
//     onFilterClear: PropTypes.func,
//     onCopy: PropTypes.func,
//     bodyDisplayInRow: PropTypes.bool,
//     eventNoStop: PropTypes.bool,
//     onDropBorder: PropTypes.func,
//     fixed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
//     afterDragColWidth: PropTypes.func,
//     filterDelay: PropTypes.number,
//     onHeaderRow: PropTypes.func,
// };


class TableHeader extends Component<TableHeaderProps, {expanded: boolean}> {
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
	// lastColumWidth: number;
	// fixedTable: DefaultRecordType | null;
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
	    this.state = {
	        expanded: props.expanded || false
	    }
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
	    if ('expanded' in nextProps) {
	        this.setState({
	            expanded: nextProps.expanded as boolean
	        })
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

	        table.fixedLeftHeaderTable = contentTable.querySelector(`.${prefix}-table-fixed-left .${prefix}-table-header`);
	        table.fixedRightHeaderTable = contentTable.querySelector(`.${prefix}-table-fixed-right .${prefix}-table-header`);
	        table.contentTableHeader = contentTable.querySelector(`.${prefix}-table-scroll .${prefix}-table-header`);
	        table.fixedLeftBodyTable = contentTable.querySelectorAll(`.${prefix}-table-fixed-left .${prefix}-table-body-outer`);
	        if (table.fixedLeftBodyTable) {
	            const leftBodyTableIndex = table.fixedLeftBodyTable.length - 1 < 0 ? 0 : table.fixedLeftBodyTable.length - 1
	            table.fixedLeftBodyTable = table.fixedLeftBodyTable[leftBodyTableIndex]
	        }

	        table.fixedRightBodyTable = contentTable.querySelectorAll(`.${prefix}-table-fixed-right .${prefix}-table-body-outer`);
	        if (table.fixedRightBodyTable) {
	            const rightBodyTableIndex = table.fixedRightBodyTable.length - 1 < 0 ? 0 : table.fixedRightBodyTable.length - 1
	            table.fixedRightBodyTable = table.fixedRightBodyTable[rightBodyTableIndex]
	        }

	        table.innerTableBody = contentTable.querySelector(`.${prefix}-table-scroll .${prefix}-table-body table`);
	        table.fixedLeftHeaderTableBody = table.fixedLeftHeaderTable && table.fixedLeftHeaderTable.querySelector('table') || null;
	        table.fixedRightHeaderTableBody = table.fixedRightHeaderTable && table.fixedRightHeaderTable.querySelector('table') || null;
	        table.fixedLeftInnerTableBody = table.fixedLeftBodyTable && table.fixedLeftBodyTable.querySelector('table') || null;
	        table.fixedRightInnerTableBody = table.fixedRightBodyTable && table.fixedRightBodyTable.querySelector('table') || null;
	        table.fixedLeftBodyRows = table.fixedLeftBodyTable && table.fixedLeftBodyTable.querySelectorAll('tr') || [];
	        table.fixedRightBodyRows = table.fixedRightBodyTable && table.fixedRightBodyTable.querySelectorAll('tr') || [];
	    }

	    // 维护表格全部的dom元素
	    this.table = table;

	    /*
		if(!this.props.dragborder)return;
		if(document.getElementById("u-table-drag-thead-" + this.theadKey)){
		  this.fixedTable = {};
		  let _fixedParentContext =  document.getElementById("u-table-drag-thead-" + this.theadKey).parentNode;
		  let siblingDom = _fixedParentContext.parentNode.nextElementSibling;
		  if (siblingDom) {
			let fixedTable = siblingDom.querySelector("table");
			// this.fixedTable.table = fixedTable //没有用到
			this.fixedTable.cols = fixedTable&&fixedTable.getElementsByTagName("col");
			// this.fixedTable.ths = fixedTable.tableDome.getElementsByTagName("th");
		  }
		}
		*/
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
	    /* 事件监听不应该渲染到body上性能损耗很大 by zhuzj
		this.eventListen([{key:'mouseup', fun:this.onTrMouseUp}],'',document.body);
		this.eventListen([{key:'mousemove', fun:this.onTrMouseMove}],'',document.body);
		*/
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
	 *
	 *根据 data-type 来获取当前拖拽的对象的Object，如果为null表示拖动的对象并非是online
	 * @memberof TableHeader
	 */
	// getOnLineObject = (_element) => {
	//     let type = _element.getAttribute('data-type'), elementObj = null;
	//     if (!type) {
	//         let element = _element.parentElement || parentNode;// 兼容写法。
	//         if (element.getAttribute('data-type')) {
	//             elementObj = element;
	//         }
	//     } else {
	//         elementObj = _element;
	//     }
	//     return elementObj;
	// }

	/**
	 * 调整列宽的down事件
	 * @memberof TableHeader
	 */
	onDragMouseDown = (e?:React.DragEvent<HTMLElement>) => {
	    const {dragborder, eventNoStop, onMouseDown} = this.props;
	    !eventNoStop && Event.stopPropagation(e);
	    dragborder && typeof onMouseDown == 'function' && onMouseDown(e);
	}
	/*
	onTrMouseDown = (e) => {
	  const { eventNoStop } = this.props;
	  !eventNoStop && Event.stopPropagation(e);
	  let event = Event.getEvent(e) ,
	  targetEvent = Event.getTarget(event);
	  const { clsPrefix, contentTable,lastShowIndex,columnsChildrenList } = this.props;
	  // let currentElement = this.getOnLineObject(targetEvent);
	  let currentElement = this.getTargetToType(targetEvent);
	  if(!currentElement)return;
	  let type = currentElement.getAttribute('data-type');
	  const fixedType = currentElement.getAttribute('data-th-fixed');
	  if(!this.props.dragborder && !this.props.draggable)return;
	  if(type == 'online' && this.props.dragborder){
		// if(!this.props.dragborder)return;
		targetEvent.setAttribute('draggable',false);//添加交换列效果
		let currentIndex = -1;
		let defaultWidth = currentElement.getAttribute("data-th-width");
		this.drag.option = "border";//拖拽操作
		if(columnsChildrenList){
		  let columnKey = currentElement.getAttribute("data-line-key");
		  if(columnKey){
			currentIndex = columnsChildrenList.findIndex(da=> (da.key && da.key.toLowerCase()) === columnKey.toLowerCase());
		  }
		}
		if(currentIndex < 0){
		  console.log('Key must be set for column!')
		  return;
		}
		let currentObj = this.table.cols[currentIndex];
		this.drag.currIndex = currentIndex;
		this.drag.oldLeft = event.clientX;
		this.drag.currentLeft = event.clientX;
		this.drag.oldWidth = parseInt((currentObj).style.width);
		this.drag.minWidth = currentObj.style.minWidth != ""?parseInt(currentObj.style.minWidth):defaultWidth;
		this.drag.tableWidth = parseInt(this.table.table.style.width ?this.table.table.style.width:this.table.table.scrollWidth);
		if(!this.tableOldWidth){
		  this.tableOldWidth = this.drag.tableWidth;//this.getTableWidth();
		}

		// if(!this.lastColumWidth){
		  const contentT = this.table.tableHeaderCols || this.table.cols ;
		  this.lastColumWidth = parseInt(contentT[contentT.length-1].style.width);
		  // console.log('begin--lastColumnWidth',this.lastColumWidth);
		// }
		this.drag.contentTableCWidth = this.table.contentTableHeader.clientWidth;
		this.drag.contentTableSWidth = this.table.contentTableHeader.scrollWidth;
		if(fixedType) {
			const contentTablePar = this.table.contentTableHeader.parentNode;

			if(contentTablePar) {
			  const originL = parseInt(contentTablePar.style.marginLeft);
			  const originR = parseInt(contentTablePar.style.marginRight);
			  // 内容区表格marginLef
			  this.drag.contentTableML = originL;
			  this.drag.contentTableMR = originR;
			}
		}
		this.drag.fixedType = fixedType;
		// add by gx
		// if (fixedType === 'left' && this.table.fixedRightBodyTable) {
		//   this.drag.fixedRightBodyTableLeft = this.table.fixedRightBodyTable.getBoundingClientRect().left
		// } else {
		//   this.drag.fixedRightBodyTableLeft = null
		// }
	  }else if(type != 'online' &&  this.props.draggable){
		  // if (!this.props.draggable || targetEvent.nodeName.toUpperCase() != "TH") return;
		  if (!this.props.draggable) return;
		  let th = this.getTargetToType(targetEvent);
		  th.setAttribute('draggable',true);//添加交换列效果
		  this.drag.option = 'dragAble';
		  this.currentDome = th;
		  let currentIndex = parseInt(th.getAttribute("data-line-index"));
		  this.drag.currIndex = currentIndex;
	  }else{
		// console.log("onTrMouseDown dragborder or draggable is all false !");
		return ;
	  }
	};
	*/
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
	//     // console.log(" getTargetToTh: ", th);
	//     return th;
	// }
	/**
	 * 调整列宽的move事件
	 * @memberof TableHeader
	 * @deprecated
	 */
	// onTrMouseMove = (e) => {
	//     // console.log("AAA---TableHeader---mousemove->",e);
	//     if (!this.props.dragborder && !this.props.draggable) return;
	//     const {
	//         // clsPrefix,
	//         // dragborder,
	//         // contentDomWidth,
	//         // scrollbarWidth,
	//         // contentTable,
	//         // headerScroll,
	//         // lastShowIndex,
	//         // onMouseMove,
	//         onDraggingBorder,
	//         // leftFixedWidth,
	//         // rightFixedWidth,
	//         bodyDisplayInRow,
	//         eventNoStop
	//     } = this.props;
	//     !eventNoStop && Event.stopPropagation(e);
	//     let event = Event.getEvent(e);
	//     if (this.props.dragborder && this.drag.option == "border") {
	//         // 移动改变宽度

	//         const isMoveToRight = this.drag.currentLeft < event.clientX;
	//         if (this.drag.fixedType === 'left' && isMoveToRight && this.drag.fixedRightBodyTableLeft) {
	//             if (this.drag.fixedRightBodyTableLeft - event.clientX < 100) {
	//                 return // 拖动左侧固定列，离右侧固定列距离小于100时，禁止拖动
	//             }
	//         }
	//         // let currentCols = this.table.cols[this.drag.currIndex];
	//         let diff = (event.clientX - this.drag.oldLeft);
	//         let newWidth = this.drag.oldWidth + diff;
	//         this.drag.newWidth = newWidth > 0 ? newWidth : this.minWidth;
	//         this.drag.currentLeft = event.clientX;

	//         // displayinrow 判断、 固定行高判断
	//         if (!bodyDisplayInRow) {
	//             this.table.bodyRows.forEach((row, index) => {
	//                 const leftRow = this.table.fixedLeftBodyRows[index];
	//                 const rightRow = this.table.fixedRightBodyRows[index];
	//                 if (leftRow || rightRow) {
	//                     const height = row.getBoundingClientRect().height;
	//                     leftRow && (leftRow.style.height = height + "px")
	//                     rightRow && (rightRow.style.height = height + "px")
	//                 }
	//             })
	//         }

	//         if (newWidth > this.minWidth) {// 移动后的宽度大于列最小宽度，则更新列和内容宽度
	//             /* 拖拽列宽度使用尺标代替不再实时更新重绘宽度
	// 			currentCols.style.width = newWidth +'px'; //中间表头-拖拽过程中实时更新重绘宽度
	// 			//hao 支持固定表头拖拽 修改表体的width
	// 			if(this.fixedTable.cols){
	// 				this.fixedTable.cols[this.drag.currIndex].style.width = newWidth + "px";//固定列表头-拖拽过程中实时更新重绘宽度
	// 			}

	// 			const  contentTableSWidth = this.drag.contentTableSWidth - this.drag.contentTableCWidth;
	// 			  // console.log('contentTableSWidth+diff',contentTableSWidth+diff,'diff',diff);
	// 			  if(diff<0 && contentTableSWidth+diff < 0) {//拖拽后宽度小于可视宽度，则最后一列自动缩减宽度
	// 				const headerCols = this.table.tableHeaderCols || this.table.cols;
	// 				const lastWidth =this.lastColumWidth - (contentTableSWidth+diff);
	// 				headerCols[headerCols.length-1].style.width = lastWidth +"px";//同步表头
	// 				this.table.tableBodyCols[headerCols.length-1].style.width = lastWidth + "px";//同步表体
	// 			  }
	// 			 */
	//             // 内容区非固定列场景拖拽
	//             if (!this.drag.fixedType) {

	//                 // let newDiff = (parseInt(currentCols.style.minWidth) - parseInt(currentCols.style.width));
	//                 // if(newDiff > 0){//缩小
	//                 //   let lastWidth = this.lastColumWidth + newDiff;
	//                 //   this.table.cols[lastShowIndex].style.width = lastWidth +"px";//同步表头
	//                 //   this.table.tableBodyCols[lastShowIndex].style.width = lastWidth + "px";//同步表体

	//                 // }


	//                 // let dargTableWidth = parseFloat(window.getComputedStyle(this.table.table).width)
	//                 // let showScroll =  contentDomWidth - (leftFixedWidth + rightFixedWidth) - (dargTableWidth + diff) - scrollbarWidth;
	//                 // //let showScroll =  contentDomWidth - (leftFixedWidth + rightFixedWidth) - (this.drag.tableWidth + diff) - scrollbarWidth ;
	//                 //
	//                 //  //表头滚动条处理
	//                 //  if(headerScroll){
	//                 //    if(showScroll < 0){ //小于 0 出现滚动条
	//                 //        //找到固定列表格，设置表头的marginBottom值为scrollbarWidth;
	//                 //        this.table.contentTableHeader.style.overflowX = 'scroll';
	//                 //        this.optTableMargin( this.table.fixedLeftHeaderTable,scrollbarWidth);
	//                 //        this.optTableMargin( this.table.fixedRightHeaderTable,scrollbarWidth);
	//                 //      }else{ //大于 0 不显示滚动条
	//                 //        this.table.contentTableHeader.style.overflowX = 'hidden';
	//                 //        this.optTableMargin( this.table.fixedLeftHeaderTable,0);
	//                 //        this.optTableMargin( this.table.fixedRightHeaderTable,0);
	//                 //    }
	//                 //  }else{
	//                 //  // const scrollContainers = this.table.tableBody.querySelectorAll('.scroll-container') || []
	//                 //  if(showScroll < 0){
	//                 //    // scrollContainers[0] ? scrollContainers[0].style.overflowX = 'auto' : null//暂时注释，还原原来逻辑
	//                 //        this.table.tableBody.style.overflowX = 'auto';
	//                 //        this.optTableMargin( this.table.fixedLeftBodyTable,'-'+scrollbarWidth);
	//                 //        this.optTableMargin( this.table.fixedRightBodyTable,'-'+scrollbarWidth);
	//                 //        this.optTableScroll( this.table.fixedLeftBodyTable,{x:'scroll'});
	//                 //        this.optTableScroll( this.table.fixedRightBodyTable,{x:'scroll'});
	//                 //  }else{
	//                 //    // scrollContainers[0] ? scrollContainers[0].style.overflowX = 'hidden' : null
	//                 //    this.table.tableBody.style.overflowX = 'hidden';//暂时注释，还原原来逻辑
	//                 //    this.optTableMargin( this.table.fixedLeftBodyTable,0);
	//                 //    this.optTableMargin( this.table.fixedRightBodyTable,0);
	//                 //    this.optTableScroll( this.table.fixedLeftBodyTable,{x:'auto'});
	//                 //    this.optTableScroll( this.table.fixedRightBodyTable,{x:'auto'});
	//                 //  }
	//                 //  }
	//             } else if (this.drag.fixedType) {
	//                 if (this.table.ths[this.drag.currIndex]) {
	//                     this.table.ths[this.drag.currIndex].width = newWidth
	//                 }
	//                 // console.log('this.drag.contentTableML',this.drag.contentTableML,'diff',diff);
	//                 // debugger
	//                 // this.syncFixedBodyTableWidth() // 同步body中table的宽度 以移到Table.syncFixedBodyTableWidth
	//                 const contentTablePar = this.table.contentTableHeader.parentNode;
	//                 // left、right缩小的内容，在没有滚动条时，需要将宽度同步到到最后一列
	//                 // diff<0 往里拖，
	//                 // const  contentTableSWidth = this.drag.contentTableSWidth - this.drag.contentTableCWidth;
	//                 // console.log('contentTableSWidth+diff',contentTableSWidth+diff,'diff',diff);
	//                 // if(diff<0 && contentTableSWidth+diff < 0) {
	//                 //   const headerCols = this.table.tableHeaderCols || this.table.cols;
	//                 //   const lastWidth =this.lastColumWidth - (contentTableSWidth+diff);
	//                 //   console.log('lastWidth',lastWidth,'lastShowIndex',lastShowIndex);
	//                 //   headerCols[lastShowIndex].style.width = lastWidth +"px";//同步表头
	//                 //   this.table.tableBodyCols[lastShowIndex].style.width = lastWidth + "px";//同步表体
	//                 // }
	//                 if (this.drag.fixedType == 'left') {
	//                     contentTablePar.style.marginLeft = this.drag.contentTableML + diff + 'px'
	//                 } else {
	//                     contentTablePar.style.marginRight = this.drag.contentTableMR + diff + 'px'
	//                 }
	//                 // 暂时注释，还原
	//                 // const containerWidth = contentTablePar.getBoundingClientRect().width
	//                 // const tableWidth = this.table.innerTableBody.getBoundingClientRect().width
	//                 // const scrollContainers = this.table.tableBody.querySelectorAll('.scroll-container') || []
	//                 // if (tableWidth > containerWidth) {
	//                 //   scrollContainers[0] ? scrollContainers[0].style.overflowX = 'auto' : null
	//                 //   this.optTableMargin( this.table.fixedLeftBodyTable,'-'+scrollbarWidth);
	//                 //   this.optTableMargin( this.table.fixedRightBodyTable,'-'+scrollbarWidth);
	//                 //   this.optTableScroll( this.table.fixedLeftBodyTable,{x:'scroll'});
	//                 //   this.optTableScroll( this.table.fixedRightBodyTable,{x:'scroll'});
	//                 // } else {
	//                 //   scrollContainers[0] ? scrollContainers[0].style.overflowX = 'hidden' : null
	//                 //   this.optTableMargin( this.table.fixedLeftBodyTable,0);
	//                 //   this.optTableMargin( this.table.fixedRightBodyTable,0);
	//                 //   this.optTableScroll( this.table.fixedLeftBodyTable,{x:'auto'});
	//                 //   this.optTableScroll( this.table.fixedRightBodyTable,{x:'auto'});
	//                 // }
	//             }

	//         } else {
	//             this.drag.newWidth = this.minWidth;
	//         }
	//     }
	//     // console.log("AAAA----TableHeader---newWidth-->"+this.drag.newWidth)
	//     // onMouseMove && onMouseMove(e);
	//     // 增加拖拽列宽动作的回调函数
	//     this.drag.newWidth && onDraggingBorder && onDraggingBorder(event, this.drag.newWidth);
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


	/**
	 *相关滚动条联动操作
	 *
	 * @memberof TableHeader
	 */
	/*
	optTableMargin =(table,scrollbarWidth)=>{
	  if(table){
		table.style.marginBottom = scrollbarWidth + "px"
	  }
	}

	optTableScroll = (table,overflow ={})=>{
	  if(table){
		const innerTable = table.querySelector('.u-table-body-inner');
		if(innerTable){
		  //fixbug: 拖拽列宽后，滚动条滚到表格底部，会导致固定列和非固定列错行，//暂时注释，还原
		  // if (overflow.x) {
		  //   const fixedScrollContainers = innerTable.querySelectorAll('.fixed-scroll-container')
		  //   if (fixedScrollContainers && fixedScrollContainers.length) {
		  //     fixedScrollContainers[0] && (fixedScrollContainers[0].style.overflowX = overflow.x);
		  //     fixedScrollContainers[1] && (fixedScrollContainers[1].style.overflowX = overflow.x);
		  //   }
		  // }
		  overflow.y && (innerTable.style.overflowY = overflow.y);
		  // overflow.x && (innerTable.style.overflowX = overflow.x);
		}

	  }
	}
	*/

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
	    let dragSourceColumn = this.props.rows[0].find(da => da.key == dragColKey) as ColumnType<DefaultRecordType>;// 抓取来源列定义
	    let dragTargetColumn = this.props.rows[0].find(da => da.key == dropColKey) as ColumnType<DefaultRecordType>;// 放置目标列定义
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
	    let dragSourceColumn = this.props.rows[0].find(da => da.key == dragColKey) as ColumnType<DefaultRecordType>;// 抓取来源列定义
	    let dragTargetColumn = this.props.rows[0].find(da => da.key == dropColKey) as ColumnType<DefaultRecordType>;// 放置目标列定义
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
	 * 获取当前th上的对象数据
	 * @param {*} e
	 * @returns
	 * @memberof TableHeader
	 */

	/*
	getCurrentEventData(th){
	  if(!th){
		console.log(" event target is not th ! ");
		return null;
	  }
	  let key = th.getAttribute('data-line-key');
	  let data = this.props.rows[0].find(da=>da.key == key);
	  if(data){
		return data;
	  }else{
		console.log(" getCurrentEventData data is null ");
		return null;
	  }
	}
	*/
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
	filterRenderType = (type: string, dataIndex: DataIndex, index: number) => {
	    const {clsPrefix, rows, filterDelay, locale} = this.props;
	    let selectDataSource = [];
	    switch (type) {
	    // 文本输入
	    case "text":
	        return (
	            <FilterType
	                locale={locale}// 多语
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
	                rendertype={type}
	                clsPrefix={clsPrefix}
	                className={`${clsPrefix} filter-text`}
	                dataIndex={dataIndex}// 字段
	                onFilterChange={debounce(this.handlerFilterChange, filterDelay || 300, false)}// 输入框回调并且函数防抖动
	                onFilterClear={this.handlerFilterClear}// 清除回调
	                filterDropdown={rows[1][index].filterdropdown}
	                filterDropdownType={rows[1][index].filterdropdowntype}// 下拉的条件类型为string,number
	                filterDropdownIncludeKeys={rows[1][index].filterdropdownincludekeys}// 下拉条件按照指定的keys去显示
	                filterDropdownOptions={rows[1][index].filterdropdownoptions}
	                filterInputNumberOptions={rows[1][index].filterinputnumberoptions}// 设置数值框内的详细属性
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
	                rendertype={type}
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
	                rendertype={type}
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
	                rendertype={type}
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
	                rendertype={type}
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
	                rendertype={type}
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
	                rendertype={type}
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
	            // 日期范围
	        case "time":
	            return (
	                <FilterType
	                    locale={locale}
	                    rendertype={type}
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

	onCopy = (data: ColumnType<DefaultRecordType>, index?: number, event?: React.ClipboardEventHandler<HTMLTableHeaderCellElement>): void => {
	    if (this.props.onCopy) {
	        this.props.onCopy(Object.assign(data, {col: index}), event)
	    }
	}
	onExpand = () => {
	    // console.log('点击折叠的值', v1, v2, v3, v4)
	    let { onExpandedAll } = this.props
	    this.setState({
	        expanded: !this.state.expanded
	    })
	    onExpandedAll && onExpandedAll(this.state.expanded)
	}

	renderCell = (props: TableHeaderProps, columns: any, row: any, index: number, leftFixedColIndex: number, rightFixedColIndex: number, centerColIndex: number) => {
	    const {
	        clsPrefix,
	        filterable,
	        rows,
	        draggable,
	        dragborder,
	        fixed,
	        columnManager,
	        fieldid,
	        expandIconColumnIndex,
	        expandedIcon,
	        collapsedIcon,
	        headerShowExpandIcon,
	        needIndentSpaced,
	        expandIconAsCell,
	        showHeaderExpandIcon,
	        expandableColumnTitle,
	        showExpandColumn
	    } = props;
	    let showColumns = columnManager && columnManager.showLeafColumns(fixed);
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
	            maxWidth,
	            colSpan,
	            dragborder: daDragborder,
	            filterdropdown,
	            innerHeaderIcon
	        } = da;
	        const onHeaderCellObj = onHeaderCell && typeof onHeaderCell === 'function' ? onHeaderCell(columns[columIndex], undefined) : {} // 添加onHeaderCell属性
	        // da.children = required ? <span><span className='required'>*</span>{children}</span> : children;
	        let thHover = drgHover ? ` ${clsPrefix}-thead th-drag-hover` : "";
	        delete da.drgHover;
	        let thClassName = classnames({
	            [`${className}`]: !!className,
	            [`text-${titleAlign}`]: titleAlign,
	            [`text-${textAlign}`]: textAlign,
	            [`${clsPrefix}-thead`]: draggable,
	            [`th-drag`]: draggable,
	            [`${thHover}`]: draggable,
	            [`${clsPrefix}-thead-th`]: dragborder,
	        })

	        delete da.textAlign;
	        delete da.titleAlign;
	        let colKey = key || dataIndex || index + '-' + columIndex; // 避免key为undefined

	        let domData = {
	            'data-th-fixed': daFixed,
	            'data-th-width': width,
	            'data-line-key': key,
	            'data-col-key': colKey,
	            'data-col-index': fixed && daFixed ? (daFixed == 'right' ? rightFixedColIndex : leftFixedColIndex) : !fixed && !daFixed && centerColIndex// 左中右各区域的列索引
	        };


	        // 渲染拖拽列宽度的抓手
	        let dragGapView = null;
	        if (dragborder && daDragborder !== false && !colSpan) {// 如果存在colSpan则表明其是组合列（不允许拖拽），不是最终显示列。
	            let isLastCol: boolean | string = false;// 是否为本区域最后一列
	            if (fixed && daFixed) {
	                if (fixed == 'right' && daFixed == 'right') {
	                    isLastCol = showColumns.length - 1 == rightFixedColIndex ? 'last' : '';
	                }
	            } else if (!fixed && !daFixed) {
	                isLastCol = showColumns.length - 1 == centerColIndex
	            }
	            dragGapView = <div ref={el => (this.gap = el)} data-type="online" {...domData}
								   className={`${clsPrefix}-thead-th-drag-gap ${daFixed} ${isLastCol ? 'last' : ''}`}>
	                <div className='online'/>
	            </div>
	        }
	        let thProps = Object.assign({}, da, {dragborder: daDragborder == null ? '' : daDragborder.toString()}); // 消除dragborder的警告
	        if (maxWidth || width) {// 由于th中文本过长时会撑开内容需要显示声明maxWidth以确保省略文本css样式生效
	            thProps.style = thProps.style || {};
	            thProps.style.maxWidth = maxWidth || width;
	            thProps.style.minWidth = da.minWidth || width; // 解决奇安信、360浏览器th宽度渲染不准确问题（col标签的width值和th实际宽度不一致）导致边框表格左固定列和中间表格显示双线条问题
	        }
	        delete thProps.width;
	        delete thProps.datasource;
	        delete thProps.dataIndex;// 多余属性不渲染到dom元素上
	        // 计数+1
	        fixed && daFixed ? (daFixed == 'right' ? rightFixedColIndex++ : leftFixedColIndex++) : !fixed && !daFixed && centerColIndex++;
	        const {fieldid: cellFieldid} = da;
	        let thFieldidAttr = fieldid ? { fieldid: cellFieldid || dataIndex || key } : {}

	        let local = getLangInfo(this.props.locale, i18n, 'table')
	        const expandIcon = (
	            <Tooltip className={`${clsPrefix}-header-cell-expand`} overlay={this.state.expanded ? local.langMap.collapseAll : local.langMap.expandAll}>
	                <ExpandIcon
	                    expandable={true}
	                    clsPrefix={clsPrefix + '-row'}
	                    onExpand={this.onExpand}
	                    needIndentSpaced={needIndentSpaced}
	                    expanded={this.state.expanded}
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
	        let _index = expandIconAsCell && showExpandColumn ? 0 : expandIconColumnIndex
	        // let expandHeaderContent = showExpandColumn ? (expandableColumnTitle ? expandableColumnTitle : showHeaderExpandIcon ? expandIcon : null) : null
	        let expandHeaderContent = showExpandColumn ? (<>{showHeaderExpandIcon ? expandIcon : null}{expandableColumnTitle && expandIconAsCell ? expandableColumnTitle : null}</>) : null
	        let hasInnerHeaderIcon = innerHeaderIcon && Object.keys(innerHeaderIcon).length;
	        if (hasInnerHeaderIcon) {
	            thClassName += ` ${prefix}-table-header-has-icon`
	        }
	        let renderChildren = required ? hasInnerHeaderIcon ?
	            <div className={hasInnerHeaderIcon ? `${prefix}-table-title-icon-list-${Object.keys(innerHeaderIcon).length}` : undefined} title={typeof children === 'string' ? children : undefined}>
	                {headerShowExpandIcon && columIndex === _index ? expandHeaderContent : null}<span className='required'>*</span>{children}
	                {hasInnerHeaderIcon ? Object.values(innerHeaderIcon).map(
	                    (item: any) => (item)
	                ) : null}
	            </div> : <>{headerShowExpandIcon && columIndex === _index ? expandHeaderContent : null}<span className='required'>*</span>{children}</> : hasInnerHeaderIcon ?
	            <div className={hasInnerHeaderIcon ? `${prefix}-table-title-icon-list-${Object.keys(innerHeaderIcon).length}` : undefined} title={typeof children === 'string' ? children : undefined}>
	                {headerShowExpandIcon && columIndex === _index ? expandHeaderContent : null}{children}
	                {hasInnerHeaderIcon ? Object.values(innerHeaderIcon).map(
	                    (item: any) => (item)
	                ) : null}
	            </div> : <>{headerShowExpandIcon && columIndex === _index ? expandHeaderContent : null}{children}</>;

	        if (filterable && index == rows.length - 1) {
	            renderChildren = this.filterRenderType(filtertype, dataIndex, columIndex);
	            if (key === undefined) {
	                colKey = colKey + '-filterable'
	            }
	            delete da.filterdropdownfocus;
	        }

	        if (!daFixed && !fixed) { // 非固定表头 , data-type="draggable"标识允许进行列拖拽排序
	            return (<th {...thProps} key={colKey + "_" + fixed} className={thClassName} onClick={da.onClick ? da.onClick.bind(this, da) : null}
	                data-type="draggable" {...domData} {...thFieldidAttr} {...onHeaderCellObj} onCopy={(event: React.ClipboardEventHandler<HTMLTableHeaderCellElement>) => {
	                    this.onCopy(da, columIndex, event)
	                }}>
	                {headerShowExpandIcon && columIndex === _index && daFixed !== 'right' ? <>{renderChildren}{dragGapView}</> : <>{renderChildren}{dragGapView}</>}
	                {/* {da.children}
	                {dragGapView} */}
	            </th>)
	        } else if (daFixed && fixed) { // 固定表头
	            if (da.dataIndex == 'checkbox' && daFixed == 'left') {// 多选框列
	                return <th key={colKey + "_" + fixed} {...thProps} {...thFieldidAttr} {...onHeaderCellObj}>
	                    {headerShowExpandIcon && columIndex === _index && daFixed !== 'right' ? <>{renderChildren}</> : <>{renderChildren}</>}
	                    {/* {da.children} */}
	                </th>;
	            } else if (filterable && index == rows.length - 1 && !filterdropdown) {// 固定列下的筛选单元格需要一个空占位
	                return <th key={colKey + "_" + fixed} dangerouslySetInnerHTML={{__html: '&nbsp;'}} {...onHeaderCellObj}></th>
	            } else {
	                return (<th {...thProps} onClick={da.onClick ? da.onClick.bind(this, da) : null}
	                    key={colKey + "_" + fixed} {...domData} {...thFieldidAttr} {...onHeaderCellObj}
	                    onCopy={this.onCopy} className={thClassName}>
	                    {headerShowExpandIcon && columIndex === _index && daFixed !== 'right' ? <>{renderChildren}{dragGapView}</> : <>{renderChildren}{dragGapView}</>}
	                    {/* {da.children}
	                    {dragGapView} */}
	                </th>)
	            }
	        } else {
	            if (da.key == `${prefix}-table-expandIconAsCell`) {// 展开列
	                return <th key={colKey + "_" + fixed} {...thProps} {...onHeaderCellObj}>
	                    {headerShowExpandIcon && columIndex === _index && daFixed !== 'right' ? <>{renderChildren}</> : <>{renderChildren}</>}
	                    {/* {da.children} */}
	                </th>;
	            }
	        }
	    })
	}

	renderRows = (props: TableHeaderProps, columns: any, onHeaderRowObj: any, row: any, index: number, leftFixedColIndex: number, rightFixedColIndex: number, centerColIndex: number) => {
	    const {
	        rowStyle,
	        rows,
	        filterable,
	    } = props;
	    return (
	        <tr
	            key={index}
	            style={rowStyle as React.CSSProperties}
	        	className={(filterable && index == rows.length - 1) ? 'filterable' : ''}
	            {...onHeaderRowObj}
	        >
	        	{this.renderCell(props, columns, row, index, leftFixedColIndex, rightFixedColIndex, centerColIndex)}
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
	    } = props;
	    let attr = dragborder ? {id: `${prefix}-table-drag-thead-${this.theadKey}`} : {};
	    let columns = columnManager && columnManager.columns || [];
	    const onHeaderRowObj = onHeaderRow && typeof onHeaderRow === 'function' ? onHeaderRow(columns as ColumnType<DefaultRecordType>[], 0) : {}// 添加onHeaderRow属性
	    return (
	        <thead
	            className={`${clsPrefix}-thead`}
	            {...attr}
	            data-theader-fixed='scroll'
	            ref={_thead => this._thead = _thead}
	        >
	            {rows.map((row, index) => {
	                let leftFixedColIndex = 0, rightFixedColIndex = 0, centerColIndex = 0;
	                return this.renderRows(props, columns, onHeaderRowObj, row, index, leftFixedColIndex, rightFixedColIndex, centerColIndex)
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
	    // const onHeaderRowObj = onHeaderRow && typeof onHeaderRow === 'function' ? onHeaderRow(columns as ColumnType<DefaultRecordType>[], 0) : {}// 添加onHeaderRow属性
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
	    //                     delete thProps.width;
	    //                     delete thProps.datasource;
	    //                     delete thProps.dataIndex;// 多余属性不渲染到dom元素上
	    //                     // 计数+1
	    //                     fixed && da.fixed ? (da.fixed == 'right' ? rightFixedColIndex++ : leftFixedColIndex++) : !fixed && !da.fixed && centerColIndex++;
	    //                     const {fieldid: cellFieldid} = da;
	    //                     let thFieldidAttr = fieldid ? { fieldid: cellFieldid || da.dataIndex || da.key } : {}
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

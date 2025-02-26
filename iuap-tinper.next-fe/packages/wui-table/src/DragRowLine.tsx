/* eslint-disable indent */
/*
 * @Author: Mr.mjc
 * @Date: 2022-01-05 15:16:04
 * @LastEditors: MJC
 * @LastEditTime: 2024-03-05 18:51:13
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/DragRowLine.tsx
 */
import React, {Component} from "react";
// import PropTypes from 'prop-types';
import {findDOMNode} from "react-dom";
import {Event} from "./lib/utils";
import { columnType } from './constant';
import shallowequal from 'shallowequal';
import { IDragRowLineProps, IDragRowLineState } from './iTable'

const CAN_TOUCH = Event.isSupportTouch();// 是否支持触摸
type GetTableRowDomsType = {
	centerTrs: HTMLCollectionOf<HTMLTableRowElement> | null,
	leftTrs: HTMLCollectionOf<HTMLTableRowElement> | null,
	rightTrs: HTMLCollectionOf<HTMLTableRowElement> | null
}

/** *
 * @author Dio.Zhu
 * 提供表格拖拽行排序的能力，显示拖拽行的尺标线
 */
export default class DragRowLine extends Component<IDragRowLineProps, IDragRowLineState> {

	static defaultProps = {
	    clsPrefix: '', // 样式名前缀
	    container: null, // 所属容器组件
	    onRowDragStart: null, // 拖拽开始的回调
	    onRowDragDrop: null, // 拖拽放置完成的回调
	    rowDraggAble: true, // 是否启用行拖拽
	    useDragHandle: false, // 是否只启用抓手拖拽
	    bigData: false// 是否大数据场景
	};
	isTouchDragRow: boolean;

	// static propTypes = {
	//     bigData: PropTypes.bool,
	//     data: PropTypes.array,
	//     onRowDragStart: PropTypes.func,
	// 	onRowDragDrop: PropTypes.func,
	// 	useDragHandle: PropTypes.bool,
	// }

	constructor(props:IDragRowLineProps) {
	    super(props);
	    this.state = {
	        visible: false,
	        top: 0,
	        left: 0,
	        width: 0
		}
		this.isTouchDragRow = false
	}

	componentDidMount() {
	    if (!this.props.bigData) {// 非大数据场景则直接初始化事件一次节省性能开销
	        this.initEvent();
	    }
	}

	componentWillUnmount() {
	    this.removeEvent();
	}

	componentDidUpdate(prevProps: IDragRowLineProps) {
	    if (this.props.bigData) {// 大数据场景则每次更新都需要重新初始化绑定事件
	        this.removeEvent();
	        this.initEvent();
	    // } else if ((prevProps.data || []).toString() !== (this.props.data || []).toString()) {
		} else if (!shallowequal((prevProps.data || []), (this.props.data || []))) { // 针对antdTable标签有前端自动分页
	        this.removeEvent();
	        this.initEvent();
	    }
	}

	// 获取左、中、右三个区域的全部行dom元素
	getTableRowDoms = (): GetTableRowDomsType | void => {
	    const {container, clsPrefix} = this.props;
	    if (!container || !clsPrefix) return;
	    let domElem = findDOMNode(container) as HTMLElement;
	    let centerBody = domElem.querySelector(`.${clsPrefix}-scroll table tbody`);
	    if (!centerBody) {// 非固定表头的情况下
	        centerBody = domElem.querySelector(`.${clsPrefix}-body table tbody`);
	    }
	    let leftBody = domElem.querySelector(`.${clsPrefix}-fixed-left table tbody`);
	    let rightBody = domElem.querySelector(`.${clsPrefix}-scroll table tbody`);
	    let centerTrs = centerBody && centerBody.getElementsByTagName("tr");
	    let leftTrs = leftBody && leftBody.getElementsByTagName("tr");
	    let rightTrs = rightBody && rightBody.getElementsByTagName("tr");
	    return {centerTrs, leftTrs, rightTrs}
	}

	// 初始化绑定相关事件
	initEvent = () => {
		let {centerTrs, leftTrs, rightTrs} = this.getTableRowDoms() as GetTableRowDomsType;
		let arr: any[] = []
		let allTrs: Array<(HTMLElement)[]> = arr.concat(centerTrs, leftTrs, rightTrs);
	    // Event.addHandler(document.body,'drop',this.onBodyDrop);
	    allTrs.forEach((trs: HTMLElement[]) => {
	        Event.addHandlerArray(trs, 'dragstart', this.onDragStart);
	        Event.addHandlerArray(trs, 'dragenter', this.onDragEnter);
			Event.addHandlerArray(trs, 'drop', this.onDrop);
	        Event.addHandlerArray(trs, 'dragover', this.onDragOver);
	        Event.addHandlerArray(trs, 'dragend', this.onDragEnd);
	        // 触屏下支持
	        if (CAN_TOUCH) {
	            Event.addHandlerArray(trs, 'touchstart', this.onTouchStart);// 手指触摸到一个 DOM 元素时触发
	            Event.addHandlerArray(trs, 'touchmove', this.onTouchMove); // 手指在一个 DOM 元素上滑动时触发
	            Event.addHandlerArray(trs, 'touchend', this.onTouchEnd); // 手指从一个 DOM 元素上移开时触发
	        }
	    })
	}
	// 移除相关事件
	removeEvent = () => {
		let {centerTrs, leftTrs, rightTrs} = this.getTableRowDoms() as GetTableRowDomsType;
		let arr: any[] = []
	    let allTrs: Array<(HTMLElement)[]> = arr.concat(centerTrs, leftTrs, rightTrs);
	    allTrs.forEach((trs: HTMLElement[]) => {
	        Event.removeHandlerArray(trs, 'dragstart', this.onDragStart);
	        Event.removeHandlerArray(trs, 'dragenter', this.onDragEnter);
			Event.removeHandlerArray(trs, 'drop', this.onDrop);
	        Event.removeHandlerArray(trs, 'dragover', this.onDragOver);
	        Event.removeHandlerArray(trs, 'dragend', this.onDragEnd);
	        // 触屏下支持
	        if (CAN_TOUCH) {
	            Event.removeHandlerArray(trs, 'touchstart', this.onTouchStart);// 手指触摸到一个 DOM 元素时触发
	            Event.removeHandlerArray(trs, 'touchmove', this.onTouchMove); // 手指在一个 DOM 元素上滑动时触发
	            Event.removeHandlerArray(trs, 'touchend', this.onTouchEnd); // 手指从一个 DOM 元素上移开时触发
	        }
	    })
	    // Event.removeHandler(document.body,'drop',this.onBodyDrop);
	}
	/* 会导致单元格内自定义onDrop冒泡失效，所以body上不阻止冒泡。
	//拖放到body区域时触发，解决Firefox下拖放会新打开浏览器窗口的问题
	onBodyDrop(e){
		// console.log("AAA--->2",e.dataTransfer.getData('Text'))
		Event.stopPropagation(e);
	}*/
	/**
	 * 【交换行】开始拖拽
	 */
	onDragStart = (e: React.DragEvent<HTMLElement>, touchTarget: React.ReactNode) => {
		let {onRowDragStart, container, useDragHandle} = this.props;
		// @ts-ignore
	    let {contentTable} = container;
	    let event = Event.getEvent(e);
	    let target = touchTarget ? touchTarget : Event.getTarget(event);// 支持触屏目标对象
	    if (useDragHandle) {
			if (target.nodeName.toUpperCase() !== 'TD' || target.attributes.getNamedItem('columntype').value !== columnType.ROWDRAG) {
				return;
			}
		}
	    if (target.nodeName.toUpperCase() == 'TD') target = target.parentNode;// 如果是TD，则找到TR
	    if (target.nodeName.toUpperCase() !== "TR") return;// 如果不是TR则终止
	    let dragStartKey = target.getAttribute("data-row-key");
	    let dragStartIndex = target.getAttribute("data-row-index");
	    // console.log("AAA---row-1--onDragStart"+dragStartKey)
	    if (!touchTarget) {// 非触摸屏
	        event.dataTransfer.effectAllowed = "move";
	        event.dataTransfer.setData("Text", JSON.stringify({dragStartKey, dragStartIndex}));
	    } else {
	        // 目前触屏下没有提供抓取的阴影副本对象
	    }
	    if (contentTable) {
	        contentTable.dragStartKey = dragStartKey;
	        contentTable.dragStartIndex = dragStartIndex;
	    }
	    onRowDragStart && onRowDragStart({dragStartKey, dragStartIndex});
	}
	/**
	 * 【交换行】拖拽经过目标行
	 */
	onDragEnter = (e: React.DragEvent<HTMLElement>, touchTarget: ParentNode | null) => {
		const {container} = this.props;
		// @ts-ignore
	    let {contentTable} = container;
	    let event = Event.getEvent(e),
	        _target = Event.getTarget(event);
	    let target = touchTarget ? touchTarget : _target.parentNode;// 支持触屏目标对象
	    if (target.nodeName.toUpperCase() == 'TD') target = target.parentNode;// 如果是TD，则找到TR
	    if (target.nodeName.toUpperCase() !== "TR") return;// 如果不是TR则终止
	    if (!contentTable) return;
	    let dragEnterKey = target.getAttribute("data-row-key");
	    let dragEnterIndex = target.getAttribute("data-row-index");
	    if (!dragEnterKey) return;
	    let dropAlign = parseInt(dragEnterIndex) >= parseInt(contentTable.dragStartIndex) + 1 ? 'bottom' : 'top';
	    if (contentTable.dragStartKey && dragEnterKey !== contentTable.dragStartKey) {
	        contentTable.dragEnterKey = dragEnterKey;
	        contentTable.dragEnterIndex = dragEnterIndex;
	        // onRowDragEnter && onRowDragEnter(dragEnterKey,dropAlign,target);
	        // console.log("AAAA---1.1--enter-->"+contentTable.dragStartIndex+"->"+dragEnterIndex)
	        this.setLinePosition(contentTable, target, dropAlign); // 显示行拖拽的尺表线
	    } else {
	        contentTable.dragEnterKey = null;
	        contentTable.dragEnterIndex = null;
	        // console.log("AAAA---1.1--enter-hidden-->"+contentTable.dragStartIndex+"->"+dragEnterIndex)
	        // onRowDragEnter && onRowDragEnter(dragEnterKey,null,null);
	        this.setLinePosition(contentTable, null, null); // 隐藏行拖拽的尺表线
	    }
	}

	onDrop = (e: React.DragEvent<HTMLElement>, touchTarget: ParentNode | null) => {
		// 外部阻止冒泡
		// e.preventDefault();
		// e.stopPropagation();
		const { container } = this.props;
		// @ts-ignore
		let { contentTable } = container;
	    let event = Event.getEvent(e),
	        _target = Event.getTarget(event);
	    let target = touchTarget ? touchTarget : _target.parentNode;// 支持触屏目标对象
		// let dataIndex;
		// if (_target.nodeName.toUpperCase() == 'TD') {
		// 	dataIndex = _target.getAttribute("data-index");
		// }
		let dataIndex;
		while (_target.nodeName.toUpperCase() !== 'TD') {
			_target = _target.parentNode;
		}
		dataIndex = _target.getAttribute("data-index");

	    if (target.nodeName.toUpperCase() == 'TD') target = target.parentNode;// 如果是TD，则找到TR
	    if (target.nodeName.toUpperCase() !== "TR") return;// 如果不是TR则终止
	    if (!contentTable) return;
	    let dragEnterKey = target.getAttribute("data-row-key");
	    let dragEnterIndex = target.getAttribute("data-row-index");
		this.props.onRowDrop && this.props.onRowDrop({dragEnterKey, dragEnterIndex, dataIndex, e})

	}
	/**
	 * 【交换行】结束拖拽
	 */
	onDragEnd = (e: React.DragEvent<HTMLElement>) => {
		let {onRowDragDrop, container} = this.props;
		// @ts-ignore
	    let {contentTable} = container;
	    if (!contentTable) return;
	    let {dragStartKey, dragStartIndex, dragEnterKey, dragEnterIndex} = contentTable || {};
	    // console.log("AAA---row-3--onDragEnd:"+dragStartKey+"->"+dragEnterKey)
	    onRowDragDrop && onRowDragDrop({
	        dragTargetKey: dragStartKey,
	        dragTargetIndex: dragStartIndex,
	        dropTargetKey: dragEnterKey,
	        dropTargetIndex: dragEnterIndex,
			event: e
	    });
	    contentTable.dragStartKey = null;
	    contentTable.dragStartIndex = null;
	    contentTable.dragEnterKey = null;
	    contentTable.dragEnterIndex = null;
	    this.setLinePosition(null, null, null); // 隐藏行拖拽的尺表线
	}
	onDragOver = (e: React.DragEvent<HTMLElement>) => {
	    let event = Event.getEvent(e);
	    event.preventDefault();
	};
	// 触屏-手指点击时触发
	onTouchStart = (e: React.DragEvent<HTMLElement>) => {
	    e.stopPropagation()
	    let event = Event.getEvent(e),
	        _target = Event.getTarget(event);
	    let target = _target;
	    let maxCount = 0;// 向上查找最多层级数
	    while (target.tagName !== 'TR') {
	        target = target.parentNode;
	        maxCount++;
	        if (target.tagName == 'TABLE' || target.tagName == 'BODY' || maxCount > 10) {
	            break;
	        }
	    }
	    if (target.tagName === 'TR') {
	        this.isTouchDragRow = true;
	        this.onDragStart(e, target);
	    } else {
	        this.isTouchDragRow = false
	    }
	}
	// 触屏-手指滑动时触发
	onTouchMove = (e: React.DragEvent<HTMLElement>) => {
	    if (!this.isTouchDragRow) return;
	    e.stopPropagation()
	    let event = Event.getEvent(e);
	    event.preventDefault();
	    let touchTarget = this.getTouchDom(event) as HTMLElement,
	        target = touchTarget.parentNode;
	    this.onDragEnter(e, target);
	}
	// 触屏-手指移开时触发
	onTouchEnd = (e: React.DragEvent<HTMLElement>) => {
	    if (!this.isTouchDragRow) return;
	    e.stopPropagation()
	    // let event = Event.getEvent(e),
	    //     touchTarget = this.getTouchDom(event) as HTMLElement, // 当前触摸的DOM节点
	    //     target = touchTarget.parentNode; // 目标位置的行
	    this.onDragEnd(e);
	    this.isTouchDragRow = false;
	}

	// 获取当前触摸的Dom节点
	getTouchDom = (event: React.TouchEvent) => {
	    let currentLocation = event.changedTouches[0];
	    let realTarget = document.elementFromPoint(currentLocation.clientX, currentLocation.clientY);
	    return realTarget;
	}
	/**
	 * 设置尺标线显示的位置
	 * @param targetContainer
	 * @param targetDom
	 * @param targetAlign
	 */
	setLinePosition = (targetContainer: HTMLElement | null, targetDom: HTMLElement | null, targetAlign: string | null) => {
	    let {clsPrefix} = this.props;
	    if (!targetContainer || !targetDom) {
	        this.setState({left: 0, top: 0, width: 0, visible: false});
	    } else {
	        let contRect = targetContainer.getBoundingClientRect();
	        let centerBodyDom = targetContainer.querySelector(`.${clsPrefix}-content .${clsPrefix}-body`) as HTMLElement;
	        let centerBodyRect = centerBodyDom.getBoundingClientRect();
	        let headerHeight = centerBodyRect.top - contRect.top;
	        let targetRect = (targetDom as HTMLElement).getBoundingClientRect();
	        let top = headerHeight + targetRect.top - centerBodyRect.top - 1;
	        if (targetAlign && ['bottom', 'down'].includes(targetAlign)) {
	            top = top + targetRect.height;
	        }
	        this.setState({left: 0, width: contRect.width, top, visible: true})
	    }
	}

	render() {
	    const {clsPrefix} = this.props;
	    const {left, width, top, visible} = this.state;
	    let style = {
	        position: 'absolute',
	        left: left + 'px',
	        top: top + 'px',
	        height: '2px',
	        width: width + 'px',
	        background: '#02B1FD',
	        zIndex: 'auto',
	        display: visible ? 'block' : 'none'
	    };
	    return (
	        <div style={style as React.CSSProperties} className={`${clsPrefix}-drag-row-line`}
				 dangerouslySetInnerHTML={{__html: '&nbsp;'}}></div>
	    );
	}
}

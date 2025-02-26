import cx from 'classnames';
import moment, {Moment} from 'moment';
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom'
import { OrNull } from '../../wui-core/src/utils/type';
import type {EventObject, CalendarNode, EventObjectT, EventObjectO, EventObjectInput, CalendarHourBodyProps, CalendarHourBodyState} from './iCalendar';
import {compare, separaTime, upDateItemsFrame, splitFirst, greaterThan} from './util/utils'
import ResizeObserver from 'resize-observer-polyfill';
import { getChildrenText } from '../../wui-core/src';
import Modal from '../../wui-modal/src';
import Button from '../../wui-button/src';

// 日视图中事件最小高度
const minHeight = 15;
// 日视图事件宽度小于28px时不显示内容
const nullWidth = 28;
// 日视图事件不足以显示两个字时不显示内容显示省略号
const elsWidth = 58;
class CalendarHourBody extends Component<CalendarHourBodyProps, CalendarHourBodyState> {
    // 存储计算非全天事件渲染百分比时对应的节点
    currentFirstStartTime!: string;
    firstEventDom: OrNull<HTMLDivElement> = null;
    currLine: OrNull<HTMLDivElement> = null;
    fullbodydom: OrNull<HTMLDivElement> = null;
    private widthDiv: OrNull<HTMLDivElement> = null;
    resizeObserver: OrNull<ResizeObserver> = null;
    offsetTop: number;
    startY: any;
    newHeight: any;
    // silderdomTop: number;
    startEventTime: any;
    endEventTime: any;
    startTime: any;
    diffNum: any;
    endPositionY: any;
    finishFlag: boolean;
    dragging: boolean;
    timer: any;
    sildeDom: HTMLElement | null;
    eventInitObj: any;
    isResizing: boolean;
    initClientY: number;
    parentNode: any;
    initDomHeight: number;
    initDOmTop: number;
    targetNode: any;
    draggerPlace: string;
    draggedH: number;
    constructor(props: CalendarHourBodyProps, context: {}) {
        super(props, context);

        this.offsetTop = 0
        this.startY = 0
        this.newHeight = null
        // this.silderdomTop = 0
        this.startEventTime = ''
        this.endEventTime = ''
        this.startTime = '' // 鼠标按下时，此时所在的时间位置
        this.diffNum = '' // 鼠标按下时，此时的位置距离滚动元素顶部的距离
        this.endPositionY = 0 // 鼠标最后放手时位置
        this.finishFlag = false // 鼠标松开，拖拽完成标志
        this.dragging = false // 鼠标是否为拖拽状态，而不是点击状态
        this.timer = null
        this.sildeDom = null
        this.eventInitObj = null
        this.isResizing = false
        this.initClientY = 0
        this.parentNode = null
        this.initDomHeight = 0
        this.initDOmTop = 0
        this.targetNode = null
        this.draggerPlace = '' // 记录拖拽上面还是下面
        this.draggedH = 0
        this.state = {
            divWidth: 0,
            modalVisible: false,
            targetEventDom: null
        }
    }
    // 确保初次渲染时widthDiv不为null
    componentDidMount() {
        this.setState({ divWidth: this.widthDiv ? this.widthDiv.offsetWidth : this.state.divWidth})
        if (this.widthDiv) {
	        this.resizeObserver = new ResizeObserver(() => {
                this.setState({ divWidth: this.widthDiv ? this.widthDiv.offsetWidth : this.state.divWidth})
	        });
	        this.resizeObserver.observe(this.widthDiv)
	    }
        // 存在 主线程中 某父级组件未挂载完 导致this.firstEventDom.offsetTop为0，故添加到时间队列中
        // 或者 不使用 此方式 使用监听 this.firstEventDom.offsetTop 从 0 变为具体值 后设置 滚动位置
        setTimeout(() => {
            // 初始化滚动位置
            if (this.firstEventDom && this.fullbodydom) {
                this.fullbodydom.parentElement!.scrollTop = Math.max(this.firstEventDom.offsetTop - 10, 0);
            } else if (this.currLine && this.fullbodydom) {
                this.fullbodydom.parentElement!.scrollTop = Math.max(this.currLine.offsetTop - 10, 0);
            }
        }, 0)
        this.creatSildeDom()
        this.fullbodydom?.addEventListener('click', this.onDocumentClick) // 点击事件是添加阴影，标注选择的事件
        this.fullbodydom?.parentNode?.addEventListener('scroll', this.scrollHandle)
    }
    componentWillUnmount() {
        if (this.resizeObserver) {
	        this.resizeObserver.disconnect();
	    }
        this.fullbodydom?.removeEventListener('mousedown', this.handleMouseDown)
        document.removeEventListener('mouseup', this.handleMouseUp)
        document.removeEventListener('mousemove', this.handleMouseMove)
        this.fullbodydom?.removeEventListener('click', this.onDocumentClick)
        this.fullbodydom?.parentNode?.removeEventListener('scroll', this.scrollHandle)
        clearInterval(this.timer)
    }
    UNSAFE_componentWillReceiveProps(nextProps: Readonly<CalendarHourBodyProps>): void {
        if (nextProps.value?.format?.('yyyy-MM-DD') !== this.props.value?.format?.('yyyy-MM-DD')) {
            this.firstEventDom = null;
            this.currLine = null;
            this.currentFirstStartTime = '';
        }
    }
    componentDidUpdate(prevProps: CalendarHourBodyProps) {
        if (this.widthDiv?.offsetWidth !== this.state.divWidth) {
            this.setState({ divWidth: this.widthDiv ? this.widthDiv.offsetWidth : this.state.divWidth})
        }
        // 切换 日期后 重置滚动位置
        if (prevProps.value?.format?.('yyyy-MM-DD') !== this.props.value?.format?.('yyyy-MM-DD')) {
            // 初始化滚动位置
            if (this.firstEventDom && this.fullbodydom) {
                this.fullbodydom.parentElement!.scrollTop = Math.max(this.firstEventDom.offsetTop - 10, 0);
            } else if (this.currLine && this.fullbodydom) {
                this.fullbodydom.parentElement!.scrollTop = Math.max(this.currLine.offsetTop - 10, 0);
            }
        }
    }

    // 判断n是否在root内
    contains(root: any, n: any) {
	    let node: any = n;
	    while (node) {
	        if (node === root) return true;
	        node = node.parentNode
	    }
	    return false;
    }

	// 点击contextmenu以外的地方将其关闭
	onDocumentClick = (event: any) => {
	    // if (this.mounted === false) return;// 解决IE下报错findDOMNode
	    let target = event.target;
	    let element = this.state.targetEventDom
	    let contextDom = findDOMNode(element);
	    if (contextDom && !this.contains(contextDom, target)) {
	        element.style.boxShadow = 'none'
	    }
	}

    scrollHandle = (e: any) => {
        let { onHourBodyScroll } = this.props
        onHourBodyScroll && onHourBodyScroll(e)
    }

    onCloseSlide = () => {
        let dom = this.sildeDom as HTMLElement
        dom.innerHTML = ''
        dom.style.height = 0 + 'px'
        dom.style.border = 'none'
        this.setState({
            modalVisible: false
        })
    }

    // 滑动鼠标添加滑过区域
    creatSildeDom = () => {
        let { isDragEvent } = this.props
        if (!isDragEvent) return
        this.fullbodydom?.addEventListener('mousedown', this.handleMouseDown)
        document.addEventListener('mouseup', this.handleMouseUp)
    }


    // 鼠标按下事件
    handleMouseDown = (event: any) => {
        let { isDragEvent } = this.props
        if (!isDragEvent) return
        event.preventDefault(); // 阻止默认行为（如选中文本
        this.dragging = false
        this.timer = setTimeout(() => {
            this.dragging = true
        }, 50)
        this.finishFlag = false
        this.offsetTop = 0
        this.startY = 0
        this.newHeight = null
        // this.silderdomTop = 0
        // this.startEventTime = ''
        // this.endEventTime = ''
        this.startTime = null
        this.diffNum = ''
        this.endPositionY = 0
        // console.log('鼠标按下时的dom', event)
        // silderdomTop = event.target.offsetTop
        let mouseDownEvent = event || window.event;
        // this.silderdomTop = mouseDownEvent.clientY;

        // let liTop = parseInt(event.target.getBoundingClientRect().top)

        // this.diffNum = event.target.getBoundingClientRect().top + (this.silderdomTop - liTop) - event.target.parentNode.getBoundingClientRect().top
        this.diffNum = event.target.getBoundingClientRect().top - event.target.parentNode.getBoundingClientRect().top

        this.startTime = event.target.getAttribute('data-time')
        this.setState({
            modalVisible: false
        })
        if (!this.startTime) {
            this.finishFlag = true
            return
        }
        let startTimeArr = this.startTime.split(':')
        // this.startEventTime = startTimeArr[0] + ':' + ((parseInt(startTimeArr[1]) + (this.silderdomTop - liTop)) < 10 ? '0' + (parseInt(startTimeArr[1]) + (this.silderdomTop - liTop)) : (parseInt(startTimeArr[1]) + (this.silderdomTop - liTop)))
        this.startEventTime = startTimeArr[0] + ':' + startTimeArr[1]
        // console.log('开始li时间切割', mouseDownEvent, startTimeArr, this.startEventTime, parseInt(startTimeArr[1]), this.silderdomTop, event.target.getBoundingClientRect().top)
        // 计算相对于DIV上边界的距离
        this.startY = mouseDownEvent.clientY - this.offsetTop;
        document.addEventListener('mousemove', this.handleMouseMove);
        // 跟随滚动逻辑
        // let dragItem = document.querySelector('.wui-calendar-scrollWrap')
        // this.startYY = event.clientY
        // this.offsetYY = event.clientY - dragItem.scrollTop - dragItem.getBoundingClientRect().top
        // document.body.style.userSelect = 'none';
    }
    // 鼠标松开事件
    handleMouseUp = (_event: any) => {
        // console.log('鼠标松开了吗', _event, this.dragging)
        let { isDragEvent } = this.props
        if (!isDragEvent) return
        if (!this.dragging) {
            this.finishFlag = true
        } else {
            if (!this.startTime) return
            if (this.newHeight !== undefined && this.newHeight !== null && !isNaN(this.newHeight)) {
                let {onCreateEvent} = this.props
                // // let dom = document.getElementById('silderdom')
                // // console.log('滑块dom元素', this.sildeDom, dom)
                // // let endoffsetTop = event.target.offsetTop
                // // let endsilderDomTop = event.layerY
                // let endsilderDomTop: number = parseInt(this.endPositionY)
                // let endEventTimeHour = parseInt(endsilderDomTop / 60) < 10 ? '0' + parseInt(endsilderDomTop / 60) : parseInt(endsilderDomTop / 60)
                // let endEventTimeMinutes = (endsilderDomTop % 60 < 10 ? '0' + endsilderDomTop % 60 : endsilderDomTop % 60)
                // let endEventTime = endEventTimeHour + ':' + endEventTimeMinutes
                // console.log('结束时的高度', event, endEventTime)
                // // let domHeight = endsilderDomTop - this.silderdomTop
                // // dom.style.height = domHeight + 'px'; // 设置DIV的新高度
                let dateNum = this.props.value.format('YYYY-MM-DD')
                // console.log('获取日期--------', dateNum, this.props)
                let start = ''
                let end = ''
                if (this.startEventTime < this.endEventTime) {
                    start = dateNum + ' ' + this.startEventTime
                    end = dateNum + ' ' + this.endEventTime
                } else {
                    start = dateNum + ' ' + this.endEventTime
                    end = dateNum + ' ' + this.startEventTime
                }
                this.setState({
                    modalVisible: true
                })
                onCreateEvent && onCreateEvent({start, end, currentDate: this.props.value})
            }
            this.startY = null; // 重置变量
            this.newHeight = null;
            this.finishFlag = true
        }
        document.removeEventListener('mousemove', this.handleMouseMove)
        // this.fullbodydom.removeEventListener('mousemove', this.handleMouseMove)

        this.dragging = false
        // document.body.style.userSelect = 'auto';
    }

    // 鼠标移动事件
    handleMouseMove = (event: any) => {
        // console.log('结束标志************', this.finishFlag)
        let { isDragEvent, type } = this.props
        if (this.finishFlag || !isDragEvent) return
        let {customInterval} = this.props
        let mouseMoveEvent = event || window.event;
        let currentY = mouseMoveEvent.clientY - this.startY; // 根据鼠标位置计算新的高度值
        // let domH = 0
        // var currentY = mouseMoveEvent.clientY - startY; // 根据鼠标位置计算新的高度值
        // console.log('移动时的高度1', currentY, mouseMoveEvent.layerY, mouseMoveEvent)
        let dom = this.sildeDom as HTMLElement
        let customIntervalNum = isNaN(customInterval) ? 1 : customInterval
        let dividend = 60
        if (customIntervalNum > 1) {
            dividend = 15
        }
        if (currentY > 0) {
            // dom.style.height = currentY + 'px'; // 设置DIV的新高度
            dom.style.height = currentY + (15 - currentY % 15) + 'px'; // 设置DIV的新高度
            // domH = currentY + (15 - currentY % 15)
            dom.style.width = type === 'week' ? 'calc(100% - 3px)' : 'calc(100% - 85px)'; // 设置DIV的新高度
            // dom.style.top = silderdomTop + 'px'
            dom.style.top = this.diffNum + 'px'
            dom.style.border = '1px solid #3b82f6'
            this.endPositionY = currentY + this.diffNum
            let endsilderDomTop = parseInt(this.endPositionY)
            let endEventTimeHour = parseInt((endsilderDomTop / dividend).toString()) < 10 ? '0' + parseInt((endsilderDomTop / dividend).toString()) : parseInt((endsilderDomTop / dividend).toString())
            let endEventTimeHourNum = parseInt((endsilderDomTop / dividend).toString())
            let endEventTimeMinutes = (endsilderDomTop % 60 < 10 ? '0' + endsilderDomTop % 60 : endsilderDomTop % 60)
            let endEventTimeMinutesNum = endsilderDomTop % 60
            // console.log('分钟数………………………………………………………………', endEventTimeMinutes)
            if (customIntervalNum > 1) {
                endEventTimeMinutes = '00'
                endEventTimeHourNum = endEventTimeHourNum + 1
            } else {
                if (endEventTimeMinutesNum >= 0 && endEventTimeMinutesNum < 15) {
                    endEventTimeMinutes = '15'
                    // dom.style.height = currentY + (15 - currentY % 15) + 'px'; // 设置DIV的新高度
                } else if (endEventTimeMinutesNum >= 15 && endEventTimeMinutesNum < 30) {
                    endEventTimeMinutes = '30'
                } else if (endEventTimeMinutesNum >= 30 && endEventTimeMinutesNum < 45) {
                    endEventTimeMinutes = '45'
                } else if (endEventTimeMinutesNum >= 45 && endEventTimeMinutesNum < 60) {
                    endEventTimeMinutes = '00'
                    endEventTimeHourNum = endEventTimeHourNum + 1
                }
            }
            endEventTimeHour = endEventTimeHourNum < 10 ? '0' + endEventTimeHourNum : endEventTimeHourNum
            this.endEventTime = endEventTimeHour + ':' + endEventTimeMinutes
            dom.innerText = `${this.startEventTime} - ${this.endEventTime}`
        } else {
            // dom.style.height = -currentY + 'px'; // 设置DIV的新高度
            dom.style.height = -currentY + (15 - (-currentY) % 15) + 'px'; // 设置DIV的新高度
            // domH = -currentY + (15 - (-currentY) % 15)
            dom.style.width = type === 'week' ? 'calc(100% - 3px)' : 'calc(100% - 85px)'; // 设置DIV的新高度
            // dom.style.top = this.diffNum - (-currentY) + 'px'
            dom.style.top = this.diffNum - (-currentY + (15 - (-currentY) % 15)) + 'px'
            dom.style.border = '1px solid #3b82f6'
            this.endPositionY = this.diffNum - (-currentY)

            let endsilderDomTop = parseInt(this.endPositionY)
            let endEventTimeHour = parseInt((endsilderDomTop / dividend).toString()) < 10 ? '0' + parseInt((endsilderDomTop / dividend).toString()) : parseInt((endsilderDomTop / dividend).toString())
            let endEventTimeHourNum = parseInt((endsilderDomTop / dividend).toString())
            let endEventTimeMinutes = (endsilderDomTop % 60 < 10 ? '0' + endsilderDomTop % 60 : endsilderDomTop % 60)
            let endEventTimeMinutesNum = endsilderDomTop % 60
            if (customIntervalNum > 1) {
                endEventTimeMinutes = '00'
                // endEventTimeHourNum = endEventTimeHourNum + 1
            } else {
                if (endEventTimeMinutesNum >= 0 && endEventTimeMinutesNum < 15) {
                    endEventTimeMinutes = '00'
                    // dom.style.height = currentY + (15 - currentY % 15) + 'px'; // 设置DIV的新高度
                } else if (endEventTimeMinutesNum >= 15 && endEventTimeMinutesNum < 30) {
                    endEventTimeMinutes = '15'
                } else if (endEventTimeMinutesNum >= 30 && endEventTimeMinutesNum < 45) {
                    endEventTimeMinutes = '30'
                } else if (endEventTimeMinutesNum >= 45 && endEventTimeMinutesNum < 60) {
                    endEventTimeMinutes = '45'
                    // endEventTimeHourNum = endEventTimeHourNum + 1
                }
            }
            endEventTimeHour = endEventTimeHourNum < 10 ? '0' + endEventTimeHourNum : endEventTimeHourNum
            this.endEventTime = endEventTimeHour + ':' + endEventTimeMinutes
            dom.innerText = `${this.endEventTime} - ${this.startEventTime}`
            // if (mouseMoveEvent.layerY > 0) {
            //     dom.style.top = mouseMoveEvent.clientY + 'px'
            // }
        }
        if (!isNaN(currentY)) {
            this.newHeight = Math.max(0, currentY); // 限制最小高度为50像素
        }
        //  滚动逻辑--------------
        // // let moveY = event.clientY - this.startYY;
        // // let y = moveY;
        // let dragItem = document.querySelector('.wui-calendar-scrollWrap')
        // // var rect = dragItem.getBoundingClientRect();
        // // if (rect.top < 0) {
        // //     y = 0;
        // // } else if (rect.bottom > window.innerHeight) {
        // //     y = window.innerHeight - rect.height;
        // // }
        // // // dragItem.scrollTop = y + 'px';
        // // console.log('gundong元素----------', dragItem)
        // // dragItem.scrollTop = y
        // let newY = event.clientY - this.offsetYY
        // let domTop = dragItem?.getBoundingClientRect().top
        // let maxScrollTop = dragItem?.scrollHeight - dragItem?.clientHeight
        // console.log('滚出目标区时的event', event, event.clientY, domH, dragItem.offsetTop)
        // // if (event.clientY >= domH + domTop) {
        // //     console.log('滚出目标区时的event===========', event, event.clientY)
        // //     if (newY - this.startYY > maxScrollTop) {
        // //         dragItem.scrollTop = maxScrollTop;
        // //       } else {
        // //         dragItem.scrollTop += newY - this.startYY - dragItem.scrollTop;
        // //       }
        // // }
    }

    // 弹窗确认
    onOk = () => {
        let { onModalOk } = this.props
        onModalOk && onModalOk(this.onCloseSlide)
        if (this.draggerPlace && this.parentNode) {
            this.parentNode.style.border = 'none'
            this.parentNode.style.borderLeft = '3px solid rgb(20, 192, 254)'
            this.parentNode.style.background = 'rgba(20, 192, 254, 5%)'
            this.parentNode = null
        }
    }

    // 点击遮罩取消创建
    onMaskClick = () => {
        this.onCloseSlide()
        if (this.draggerPlace && this.parentNode) {
            this.parentNode.style.height = this.initDomHeight + 'px'
            this.parentNode.style.top = this.initDOmTop + 'px'
            this.parentNode.style.border = 'none'
            this.parentNode.style.borderLeft = '3px solid rgb(20, 192, 254)'
            this.parentNode.style.background = 'rgba(20, 192, 254, 5%)'
            this.parentNode = null
            this.draggerPlace = ''
        }
    }

    // 右上角关闭按钮事件
    onCancel = () => {
        this.onCloseSlide()
        if (this.draggerPlace && this.parentNode) {
            this.parentNode.style.height = this.initDomHeight + 'px'
            this.parentNode.style.top = this.initDOmTop + 'px'
            this.parentNode.style.border = 'none'
            this.parentNode.style.borderLeft = '3px solid rgb(20, 192, 254)'
            this.parentNode.style.background = 'rgba(20, 192, 254, 5%)'
            this.parentNode = null
            this.draggerPlace = ''
        }
    }

    // 渲染当前时间线
    renderCurrentTime = () => {
        const {current, clsPrefix, customInterval} = this.props;
        const currTime = current.format('HH:mm')
        let intervalNum = (24 / customInterval) % 1 == 0 ? customInterval : 1;
        // 当前时间线对应的位置
        // 当customInterval不为1时，之前的计算结果除以4（因为之前一个格子分成四份一份15像素对应15分钟，设置间隔之后一个格子分成customInterval份，一份15像素对应60分钟）
        const top = intervalNum === 1 ? Number(current.format('HH')) * 60 + Number(current.format('mm')) : (Number(current.format('HH')) * 60 + Number(current.format('mm'))) / 4
        // 分别渲染当前时间线，当前时间线边缘点，当前时间
        const line = (<div ref={ref => this.currLine = ref} className={`${clsPrefix}-curr-line`} style={{top: top}}/>)
        const circle = (<div className={`${clsPrefix}-curr-circle`} style={{top: top}}/>)
        const time = (<div className={`${clsPrefix}-curr-time`} style={{top: top - 8}}>{currTime}</div>)
        return (
            <React.Fragment key={currTime}>
                {line}
                {circle}
                {time}
            </React.Fragment>
        )
    }
    // 渲染非全天事件
    renderDayEvents = (timeEvents: EventObject[]) => {
        const {clsPrefix, layout, customInterval, type, isEditEvent} = this.props;
        const value = moment(this.props.value).format('YYYY-MM-DD');
        let intervalNum = (24 / customInterval) % 1 == 0 ? customInterval : 1;
        let dayArr: EventObjectT[] = [];
        // 获取所有非全天事件
        timeEvents?.forEach((item: EventObject) => {
            let startDate = splitFirst(moment(item.start).format('YYYY-MM-DD HH:mm'))[0],
                endDate = splitFirst(moment(item.end).format('YYYY-MM-DD HH:mm'))[0],
                startTime = splitFirst(moment(item.start).format('YYYY-MM-DD HH:mm'))[1],
                endTime = splitFirst(moment(item.end).format('YYYY-MM-DD HH:mm'))[1],
                content = getChildrenText(item.content).join(''),
                key = item.key,
                className = item.className,
                contentDom = item.contentDom
            if (startDate == endDate && value == startDate) {
                // 事件遍历中获取 到 最 早的事件时间 （初始化滚动位置使用）
                if (!this.currentFirstStartTime || greaterThan(this.currentFirstStartTime, startTime)) {
                    this.currentFirstStartTime = startTime
                }
                dayArr.push({date: startDate, start: startTime, end: endTime, content, key, className, contentDom})
            }
        })
        if (dayArr.length !== 0) {
            let dom: JSX.Element[] = [];
            // 通过setAlgor算法计算所有事件width，left
            let temp = this.setAlgor(dayArr);
            let style = type === 'week' ? {width: '100%'} : layout == 'left' ? {width: 'calc(100% - 85px)'} : {width: 'calc(100% - 78px)'}
            return (
                <div className={`${clsPrefix}-day-events`} style={style}>
                    {
                        temp.map((item: CalendarNode, index: number) => {
                            let tempp = (item: CalendarNode) => {
                                let startPos = intervalNum === 1 ? item.data[0].hour * 60 + item.data[0].minute + 1 : (item.data[0].hour * 60 + item.data[0].minute + 1) / 4;
                                let beginTime = item.data[0].beginTime;
                                let height = intervalNum === 1 ? item.data[1].hour * 60 + item.data[1].minute - (item.data[0].hour * 60 + item.data[0].minute) - 2 : (item.data[1].hour * 60 + item.data[1].minute - (item.data[0].hour * 60 + item.data[0].minute) - 2) / 4;
                                let content;
                                // 设置最小高度minHeight
                                height = height < minHeight ? minHeight : height;
                                if (item.arguments.width / 100 < nullWidth / (this.widthDiv ? this.widthDiv.offsetWidth : this.state.divWidth)) {
                                    // 小于一定宽度，内部不显示任何文本
                                    content = null
                                } else if (item.arguments.width / 100 < elsWidth / (this.widthDiv ? this.widthDiv.offsetWidth : this.state.divWidth)) {
                                    // 小于两个字宽度时，显示...
                                    content = '...'
                                    if (type === 'week') {
                                        content = item.arguments.content
                                    }
                                } else {
                                    content = item.arguments.content
                                }
                                // 设置layout不同取值下对应的style样式
                                let style = layout == "left" ? {width: `calc(${item.arguments.width}% - ${type === 'week' ? 6 : 0}px)`, left: `calc(${item.arguments.left}% + ${type === 'week' ? 3 : 75}px)`, top: startPos, height: height, lineHeight: `${height}px`}
                                    : {width: item.arguments.width + '%', right: `calc(${item.arguments.left}% + 68px)`, top: startPos, height: height, lineHeight: `${height}px`};
                                // 点击非全天事件时打印的参数
                                let itemTemp = {start: value + ' ' + item.data[4][0], end: value + ' ' + item.data[4][1], content: item.data[3], key: item.data[5]}
                                if (item.children.length == 0) {
                                    dom.push(
                                        <div key={item.level + startPos} ref={(ref)=> {
                                            if (!this.firstEventDom && this.currentFirstStartTime === beginTime) {
                                                this.firstEventDom = ref
                                            }
                                        }} className={`${clsPrefix}-day-events-item ${item.data[6] ? item.data[6] : ''}`} onClick={(e) => this.onTimeEventsClick(e, itemTemp, moment(moment(this.props.value).format('YYYY-MM-DD') + ' ' + item.data[4][0]))}
                                        style={style}
                                        title={content as string}
                                        >
                                            {isEditEvent && <div onMouseDown={(e) => this.itemDown(e, itemTemp, 'top')} className={`${clsPrefix}-day-events-item-resizer-top-line`}>
                                                <div className={`${clsPrefix}-day-events-item-resizer-line-item`}></div>
                                                <div className={`${clsPrefix}-day-events-item-resizer-line-item`}></div>
                                            </div>}
                                            {item.data[7] ? item.data[7] : content}
                                            {isEditEvent && <div onMouseDown={(e) => this.itemDown(e, itemTemp, 'bottom')} className={`${clsPrefix}-day-events-item-resizer-bottom-line`}>
                                                <div className={`${clsPrefix}-day-events-item-resizer-line-item`}></div>
                                                <div className={`${clsPrefix}-day-events-item-resizer-line-item`}></div>
                                            </div>}
                                        </div>
                                    )
                                } else {
                                    item.children.forEach((i: CalendarNode) => tempp(i))
                                    dom.push(
                                        <div key={item.level + startPos} className={`${clsPrefix}-day-events-item ${item.data[6] ? item.data[6] : ''}`} ref={(ref)=> {
                                            if (!this.firstEventDom && this.currentFirstStartTime === beginTime) {
                                                this.firstEventDom = ref
                                            }
                                        }} onClick={(e) => this.onTimeEventsClick(e, itemTemp, moment(moment(this.props.value).format('YYYY-MM-DD') + ' ' + item.data[4][0]))}
                                        style={style}
                                        title={content as string}
                                        >
                                            {isEditEvent && <div onMouseDown={(e) => this.itemDown(e, itemTemp, 'top')} className={`${clsPrefix}-day-events-item-resizer-top-line`}>
                                                <div className={`${clsPrefix}-day-events-item-resizer-line-item`}></div>
                                                <div className={`${clsPrefix}-day-events-item-resizer-line-item`}></div>
                                            </div>}
                                            {item.data[7] ? item.data[7] : content}
                                            {isEditEvent && <div onMouseDown={(e) => this.itemDown(e, itemTemp, 'bottom')} className={`${clsPrefix}-day-events-item-resizer-bottom-line`}>
                                                <div className={`${clsPrefix}-day-events-item-resizer-line-item`}></div>
                                                <div className={`${clsPrefix}-day-events-item-resizer-line-item`}></div>
                                            </div>}
                                        </div>
                                    )
                                }
                            }
                            tempp(item);
                            if (index == temp.length - 1) return dom
                        })
                    }
                </div>
            )
        }
    }

    itemDown = (e: any, itemTemp: any, place: any) => {
        let { clsPrefix, isEditEvent } = this.props
        if (!isEditEvent) return
        this.eventInitObj = itemTemp
        this.isResizing = true
        this.initClientY = e.clientY
        this.parentNode = e.target.classList.value === `${clsPrefix}-day-events-item-resizer-line-item` ? e.target.parentNode.parentNode : e.target.parentNode
        this.initDomHeight = this.parentNode.getBoundingClientRect().height
        this.initDOmTop = parseInt(window.getComputedStyle(this.parentNode)?.top)
        this.targetNode = e.target.classList.value === `${clsPrefix}-day-events-item-resizer-line-item` ? e.target.parentNode : e.target
        this.targetNode.classList.add('wui-calendar-resize-hover')
        // this.fullbodydom.style.cursor = 'ns-resize'
        this.parentNode.style.border = '1px solid #3b82f6'
        this.parentNode.style.background = '#3b82f61a'
        this.draggerPlace = place // 记录拖拽上面还是下面
        document.addEventListener('mousemove', this.itemMove)
        document.addEventListener('mouseup', this.itemUp)
    }
    itemMove = (e: any) => {
        let { isEditEvent } = this.props
        if (!isEditEvent) return
        if (this.isResizing) {
            if (this.draggerPlace == 'bottom') { // 事件下方触发拖拽改变
                let diffY = e.clientY - this.initClientY
                // let diffNum = diffY + (15 - diffY % 15)
                let diffNum = diffY < 0 && diffY > -15 ? 0 : diffY + (15 - diffY % 15)
                this.parentNode.style.height = (this.initDomHeight + diffNum < 15 ? 15 : this.initDomHeight + diffNum) + 'px' // 以15分钟为基础加或者减拖拽距离，这里为了方便计算拖拽改变的分钟数
                this.draggedH = diffY + (15 - diffY % 15)
            } else { // 事件上方触发拖拽改变
                let diffY = e.clientY - this.initClientY
                let diffNum = diffY + (15 - diffY % 15)
                this.parentNode.style.height = this.initDomHeight - diffNum + 'px' // 以15分钟为基础加或者减拖拽距离，这里为了方便计算拖拽改变的分钟数
                this.parentNode.style.top = (this.initDomHeight - diffNum < 15 ? this.initDOmTop + this.initDomHeight - 15 : this.initDOmTop + diffNum) + 'px'
                this.draggedH = diffY + (15 - diffY % 15)
            }
        }
    }
    itemUp = (_e: any) => {
        let { onCreateEvent, isEditEvent } = this.props
        if (!isEditEvent) return
        this.isResizing = false
        // this.parentNode = null
        let endValue = this.eventInitObj.end // 下方拖拽时使用
        let endTime = endValue.split(' ')
        let startValue = this.eventInitObj.start // 上方拖拽时使用
        let startTime = startValue.split(' ')
        let roundOff = 0
        let remainder = 0
        if (this.draggerPlace == 'bottom') {
            if (this.draggedH > 0) {
                roundOff = Math.floor(this.draggedH / 60)
                remainder = this.draggedH % 60
                if (remainder + parseInt(endTime[1].split(':')[1]) >= 60) {
                    let lastHour = parseInt(endTime[1].split(':')[0]) + roundOff + 1
                    let lastMinutes = (remainder + parseInt(endTime[1].split(':')[1])) % 60
                    let lastValue = endTime[0] + ' ' + lastHour + ":" + (lastMinutes == 0 ? "00" : lastMinutes)
                    this.setState({
                        modalVisible: true
                    })
                    onCreateEvent && onCreateEvent({start: this.eventInitObj.start, end: lastValue, currentDate: this.props.value, key: this.eventInitObj.key, content: this.eventInitObj.content, createOrEdit: 'edit'})
                } else {
                    let lastHour = parseInt(endTime[1].split(':')[0]) + roundOff
                    let lastMinutes = (remainder + parseInt(endTime[1].split(':')[1])) % 60
                    let lastValue = endTime[0] + ' ' + lastHour + ":" + (lastMinutes == 0 ? "00" : lastMinutes)
                    this.setState({
                        modalVisible: true
                    })
                    onCreateEvent && onCreateEvent({start: this.eventInitObj.start, end: lastValue, currentDate: this.props.value, key: this.eventInitObj.key, content: this.eventInitObj.content, createOrEdit: 'edit'})
                }
            } else {
                if (this.initDomHeight + this.draggedH < 15) {
                    let lastValue = '0'
                    if (parseInt(startTime[1].split(':')[1]) >= 0 && parseInt(startTime[1].split(':')[1]) < 45) {
                        lastValue = startTime[0] + ' ' + startTime[1].split(':')[0] + ':' + (parseInt(startTime[1].split(':')[1]) + 15)
                    } else {
                        lastValue = startTime[0] + ' ' + (parseInt(startTime[1].split(':')[0]) + 1 < 10 ? '0' + parseInt(startTime[1].split(':')[0]) + 1 : parseInt(startTime[1].split(':')[0]) + 1) + ':' + ((parseInt(startTime[1].split(':')[1]) + 15) % 60 < 10 ? '0' + (parseInt(startTime[1].split(':')[1]) + 15) % 60 : (parseInt(startTime[1].split(':')[1]) + 15) % 60)
                    }
                    this.setState({
                        modalVisible: true
                    })
                    onCreateEvent && onCreateEvent({start: this.eventInitObj.start, end: lastValue, currentDate: this.props.value, key: this.eventInitObj.key, content: this.eventInitObj.content, createOrEdit: 'edit'})
                } else {
                    roundOff = Math.floor(-this.draggedH / 60)
                    remainder = -this.draggedH % 60
                    if (parseInt(endTime[1].split(':')[1]) - remainder <= 0) {
                        let lastHour = 0
                        if (parseInt(endTime[1].split(':')[1]) - remainder == 0) {
                            lastHour = parseInt(endTime[1].split(':')[0]) - roundOff
                        } else {
                            lastHour = parseInt(endTime[1].split(':')[0]) - roundOff - 1
                        }
                        let lastMinutes = 0
                        if (parseInt(endTime[1].split(':')[1]) == 0 && remainder == 0) {
                            lastMinutes = (parseInt(endTime[1].split(':')[1]) - remainder) % 60
                        } else if (parseInt(endTime[1].split(':')[1]) <= 30) {
                            if (parseInt(endTime[1].split(':')[1]) - remainder === 0) {
                                lastMinutes = 0
                            } else {
                                lastMinutes = 60 + (parseInt(endTime[1].split(':')[1]) - remainder) % 60
                            }
                        } else {
                            lastMinutes = parseInt(endTime[1].split(':')[1]) - remainder
                        }
                        let lastValue = endTime[0] + ' ' + lastHour + ":" + (lastMinutes == 0 ? "00" : lastMinutes)
                        this.setState({
                            modalVisible: true
                        })
                        onCreateEvent && onCreateEvent({start: this.eventInitObj.start, end: lastValue, currentDate: this.props.value, key: this.eventInitObj.key, content: this.eventInitObj.content, createOrEdit: 'edit'})
                    } else {
                        let lastHour = parseInt(endTime[1].split(':')[0]) - roundOff
                        let lastMinutes = 0
                        if (parseInt(endTime[1].split(':')[1]) == 0 && remainder == 0) {
                            lastMinutes = (parseInt(endTime[1].split(':')[1]) - remainder) % 60
                        } else if (parseInt(endTime[1].split(':')[1]) <= 30) {
                            if (parseInt(endTime[1].split(':')[1]) - remainder === 0) {
                                lastMinutes = 0
                            } else {
                                lastMinutes = 60 + (parseInt(endTime[1].split(':')[1]) - remainder) % 60
                            }
                        } else {
                            lastMinutes = parseInt(endTime[1].split(':')[1]) - remainder
                        }
                        let lastValue = endTime[0] + ' ' + lastHour + ":" + (lastMinutes == 0 ? "00" : lastMinutes)
                        this.setState({
                            modalVisible: true
                        })
                        onCreateEvent && onCreateEvent({start: this.eventInitObj.start, end: lastValue, currentDate: this.props.value, key: this.eventInitObj.key, content: this.eventInitObj.content, createOrEdit: 'edit'})
                    }
                }
            }
        } else {
            if (this.draggedH > 0) {
                if (this.initDomHeight - this.draggedH < 15) {
                    let lastValue = '0'
                    if (parseInt(endTime[1].split(':')[1]) > 15) {
                        lastValue = endTime[0] + ' ' + endTime[1].split(':')[0] + ':' + (parseInt(endTime[1].split(':')[1]) - 15)
                    } else {
                        lastValue = endTime[0] + ' ' + (parseInt(endTime[1].split(':')[0]) - 1 < 10 ? '0' + (parseInt(endTime[1].split(':')[0]) - 1) : parseInt(endTime[1].split(':')[0]) - 1) + ':' + (60 - (15 - (parseInt(endTime[1].split(':')[1]))) % 60)
                    }
                    this.setState({
                        modalVisible: true
                    })
                    onCreateEvent && onCreateEvent({start: lastValue, end: this.eventInitObj.end, currentDate: this.props.value, key: this.eventInitObj.key, content: this.eventInitObj.content, createOrEdit: 'edit'})
                } else {
                    roundOff = Math.floor(this.draggedH / 60)
                    remainder = this.draggedH % 60
                    if (remainder + parseInt(startTime[1].split(':')[1]) >= 60) {
                        let lastHour = parseInt(startTime[1].split(':')[0]) + roundOff + 1
                        let lastMinutes = (remainder + parseInt(startTime[1].split(':')[1])) % 60
                        let lastValue = startTime[0] + ' ' + lastHour + ":" + (lastMinutes == 0 ? "00" : lastMinutes)
                        this.setState({
                            modalVisible: true
                        })
                        onCreateEvent && onCreateEvent({start: lastValue, end: this.eventInitObj.end, currentDate: this.props.value, key: this.eventInitObj.key, content: this.eventInitObj.content, createOrEdit: 'edit'})
                    } else {
                        let lastHour = parseInt(startTime[1].split(':')[0]) + roundOff
                        let lastMinutes = (remainder + parseInt(startTime[1].split(':')[1])) % 60
                        let lastValue = startTime[0] + ' ' + lastHour + ":" + (lastMinutes == 0 ? "00" : lastMinutes)
                        this.setState({
                            modalVisible: true
                        })
                        onCreateEvent && onCreateEvent({start: lastValue, end: this.eventInitObj.end, currentDate: this.props.value, key: this.eventInitObj.key, content: this.eventInitObj.content, createOrEdit: 'edit'})
                    }
                }
            } else {
                roundOff = Math.floor(-this.draggedH / 60)
                remainder = -this.draggedH % 60
                if (parseInt(startTime[1].split(':')[1]) - remainder <= 0) {
                    let lastHour = 0
                    if (parseInt(startTime[1].split(':')[1]) - remainder == 0) {
                        lastHour = parseInt(startTime[1].split(':')[0]) - roundOff
                    } else {
                        lastHour = parseInt(startTime[1].split(':')[0]) - roundOff - 1
                    }
                    let lastMinutes = 0
                    if (parseInt(startTime[1].split(':')[1]) == 0 && remainder == 0) {
                        lastMinutes = (parseInt(startTime[1].split(':')[1]) - remainder) % 60
                    } else if (parseInt(startTime[1].split(':')[1]) <= 30) {
                        if (parseInt(startTime[1].split(':')[1]) - remainder === 0) {
                            lastMinutes = 0
                        } else {
                            lastMinutes = 60 + (parseInt(startTime[1].split(':')[1]) - remainder) % 60
                        }
                    } else {
                        lastMinutes = parseInt(startTime[1].split(':')[1]) - remainder
                    }
                    let lastValue = startTime[0] + ' ' + lastHour + ":" + (lastMinutes == 0 ? "00" : lastMinutes)
                    this.setState({
                        modalVisible: true
                    })
                    onCreateEvent && onCreateEvent({start: lastValue, end: this.eventInitObj.end, currentDate: this.props.value, key: this.eventInitObj.key, content: this.eventInitObj.content, createOrEdit: 'edit'})
                } else {
                    let lastHour = parseInt(startTime[1].split(':')[0]) - roundOff
                    let lastMinutes = 0
                    if (parseInt(startTime[1].split(':')[1]) == 0 && remainder == 0) {
                        lastMinutes = (parseInt(startTime[1].split(':')[1]) - remainder) % 60
                    } else if (parseInt(startTime[1].split(':')[1]) <= 30) {
                        if (parseInt(startTime[1].split(':')[1]) - remainder === 0) {
                            lastMinutes = 0
                        } else {
                            lastMinutes = (60 + (parseInt(startTime[1].split(':')[1]) - remainder)) % 60
                        }
                    } else {
                        lastMinutes = parseInt(startTime[1].split(':')[1]) - remainder
                    }
                    let lastValue = startTime[0] + ' ' + lastHour + ":" + (lastMinutes == 0 ? "00" : lastMinutes)
                    this.setState({
                        modalVisible: true
                    })
                    onCreateEvent && onCreateEvent({start: lastValue, end: this.eventInitObj.end, currentDate: this.props.value, key: this.eventInitObj.key, content: this.eventInitObj.content, createOrEdit: 'edit'})
                }
            }
        }
        this.targetNode.classList.remove('wui-calendar-resize-hover')
        this.targetNode = null
        document.removeEventListener('mousemove', this.itemMove)
        document.removeEventListener('mouseup', this.itemUp)
    }

    // 通过该算法，获得对应非全天事件的width、left
    setAlgor = (timeEvents: EventObjectO[]) => {
        // 根据开始时间将所有非全天事件排序
        timeEvents.sort(function(x, y) {
            let a = separaTime(x.start, x.end).begin.hour + ':' + separaTime(x.start, x.end).begin.minute;
            let b = separaTime(y.start, y.end).begin.hour + ':' + separaTime(y.start, y.end).begin.minute;
            return compare(a, b)
        })
        let nodeArr: CalendarNode['data'][] = [];
        timeEvents.forEach((item, index) => {
            let temp = separaTime(item.start, item.end);
            nodeArr.push([temp.begin, temp.end, index, item.content, [temp.begin.beginTime, temp.end.endTime], item.key, item.className, item.contentDom])
        })
        let domWidth = this.widthDiv?.offsetWidth || this.state.divWidth;
        return upDateItemsFrame(nodeArr, domWidth)
    }
    onTimeEventsClick = (e: React.MouseEvent<HTMLElement>, value: EventObjectInput, time: Moment) => {
        let { type } = this.props
        if (this.props.onTimeEventsClick) {
            this.props.onTimeEventsClick(e, value, time)
        }
        let { clsPrefix } = this.props
        let dom = e.target as HTMLElement
        if (dom.classList.contains(`${clsPrefix}-day-events-item`)) {
            dom.style.boxShadow = type === 'week' ? '' : '0 2px 8px 0 rgba(0, 0, 0, .3)'
            this.setState({
                targetEventDom: dom
            })
        }
    }
    // 渲染body内部，每一份代表一小时，每小时又均分为15分钟
    renderFullBody = () => {
        const {clsPrefix, fieldid, timeEvents, showTimeLine, customInterval, silderModalBody, silderModalHeader, locale} = this.props;
        const value = moment(this.props.value);
        let interVal = (24 / customInterval) % 1 == 0 ? 24 / customInterval : 24;
        let intervalNum = (24 / customInterval) % 1 == 0 ? customInterval : 1;
        return (
            <div ref={(ref) => this.fullbodydom = ref} className={`${clsPrefix}-full-body`}>
                <div ref={(ref) => this.widthDiv = ref ? ref : this.widthDiv} className={`${clsPrefix}-full-body-container`}>
                    {value.format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') && showTimeLine !== false && this.props.type != 'week' ? this.renderCurrentTime() : null}
                    <ul>
                        {[...Array(interVal).keys()].map(item => {
                            // 每小时分为4份，一份15分钟
                            let time = item < 10 ? "0" + item : String(item);
                            if (intervalNum === 1) {
                                return [":00", ":15", ":30", ":45"].map((it: string) => {
                                    // 点击每一块区域打印的参数，包含这块区域开始的事件
                                    let outPutValue = {start: value.format('YYYY-MM-DD') + ' ' + (time + it)};
                                    return (
                                        <li key={item + it} data-time={`${time}:${it.slice(1)}`} fieldid={fieldid ? `${fieldid}_bodyTime_${time}_${it.slice(1)}` : undefined} className={cx({[`${clsPrefix}-last-item`]: it == ':45'})} onClick={(e) => this.onTimeEventsClick(e, outPutValue, moment(value.format('YYYY-MM-DD') + ' ' + outPutValue.start))}></li>
                                    )
                                })
                            } else {
                                return [...Array(intervalNum).keys()].map((it: number, _index: number) => {
                                    // 点击每一块区域打印的参数，包含这块区域开始的事件
                                    let hour = item * intervalNum + it < 10 ? '0' + (item * intervalNum + it) : item * intervalNum + it
                                    let outPutValue = {start: value.format('YYYY-MM-DD') + ' ' + hour + ':00'};
                                    return (
                                        <li key={item + it} data-time={`${hour}:00`} fieldid={fieldid ? `${fieldid}_bodyTime_${time}_${it}` : undefined} className={cx({[`${clsPrefix}-last-item`]: it + 1 == intervalNum})} onClick={(e) => this.onTimeEventsClick(e, outPutValue, moment(value.format('YYYY-MM-DD') + ' ' + outPutValue.start))}></li>
                                    )
                                })
                            }
                        })}
                        {timeEvents ? this.renderDayEvents(timeEvents) : null}
                    </ul>
                    <div className="wui-calendar-slide-dom" ref={(el) => this.sildeDom = el}></div>
                </div>
                <Modal visible={this.state.modalVisible} mask onMaskClick={this.onMaskClick} onCancel={this.onCancel}>
                    <Modal.Header closeButton>
	                    {silderModalHeader ? silderModalHeader : locale?.modalHeader}
	                </Modal.Header>
	                <Modal.Body>
	                    <div tinper-next-role="container">
                            {silderModalBody ? silderModalBody : locale?.modalBody}
	                    </div>
	                </Modal.Body>
	                <Modal.Footer>
	                    <Button onClick={this.onMaskClick} colors="secondary" style={{ marginRight: 8 }}>{locale?.cancel}</Button>
	                    <Button onClick={this.onOk} colors='primary'>{locale?.ok}</Button>
	                </Modal.Footer>
                </Modal>
            </div>
        )
    }
    render() {
	    return (
            this.renderFullBody()
        )
    }
}

export default CalendarHourBody;
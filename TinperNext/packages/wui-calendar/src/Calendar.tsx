import cx from 'classnames';
import moment, {Moment} from 'moment';
// import PropTypes from 'prop-types';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import {getTodayTime} from 'rc-calendar/lib/util/';
import React, {Component, ReactElement} from 'react';
import events from 'dom-helpers/events';
import solar2lunar from 'tinper-solar2lunar'
import {WebUI, delayEvent, fillSpace as fillSpaceFunc, detectZoom, getChildrenText} from "../../wui-core/src/index"
import { OrNull } from '../../wui-core/src/utils/type';
import {getLangInfo} from '../../wui-locale/src/tool';
import Checkbox from './../../wui-checkbox/src/index';
import Select from './../../wui-select/src/index';
import Modal from './../../wui-modal/src';
import Button from './../../wui-button/src';
import CalendarHourBody from './CalendarHourBody';
import CalendarWeekBody from './CalendarWeekBody';
import CalendarHeader from './CalendarHeader';
import CalendarSider from './CalendarSider';
import i18n from './i18n/lang';
import type {CalendarProps, CalendarState, CalendarType, EventObject, EventObjectInput} from './iCalendar';
import {formatMonth, splitFirst} from './util/utils'
import generate from './Generate';
import {getMomentConfig} from '../../wui-datepicker/src/_utils/lang'
import { globalConfig } from '../../wui-provider/src';
// import ResizeObserver from 'resize-observer-polyfill';
const getWeekStartsOn = (weekStartsOn?: any) => weekStartsOn ?? globalConfig().getGlobalDataFormat()?.dayOfWeek
const {generateM} = generate;
const isSameDay = (one: Moment, two: Moment) => {
    return one && two && one.isSame(two, 'day');
}

const festivalArray = ['元旦', '春节', '清明节', '劳动节', '端午节', '中秋节', '国庆节'];

const getLunarContent = (current: Moment, mutiple?: boolean | undefined) : string => {
    const lunarResult = solar2lunar.solar2lunar(current.toString());
    const {fullLunarMonthString, IDayCn: iDayCn, festivalName} = lunarResult as {
        fullLunarMonthString: string,
        IDayCn: string,
        festivalName: string
    };
    // 因为有双节的情况，故需要此判断
    return festivalArray.some((f) => festivalName.includes(f)) ? festivalName : (
        mutiple && iDayCn === '初一' ? fullLunarMonthString : iDayCn
    )
}

// const propTypes = {
//     onChange: PropTypes.func,
//     value: PropTypes.object,
//     defaultValue: PropTypes.object,
//     defaultType: PropTypes.string,
//     type: PropTypes.string,
//     locale: PropTypes.string,
//     onTypeChange: PropTypes.func,
//     fullscreen: PropTypes.bool,
//     monthCellRender: PropTypes.func,
//     dateCellRender: PropTypes.func,
//     disabledDate: PropTypes.object,
//     monthCellContentRender: PropTypes.func,
//     dateCellContentRender: PropTypes.func,
//     mutiple: PropTypes.bool,
//     dateCellHeaderReader: PropTypes.func,
//     onSelect: PropTypes.func,
//     headerRender: PropTypes.element,
//     fieldid: PropTypes.string,
//     onYearChange: PropTypes.func,
//     getDateCellAttr: PropTypes.func,
//     fillSpace: PropTypes.bool,
//     quickSelect: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
//     onQuickSelect: PropTypes.func,
//     headerComponent: PropTypes.element,
// };

const dateHeight = 81;
const defaultColomns = 54;
const defaultProps = {
    quickSelect: false,
    sidebar: true,
    locale: 'en-us',
    // weekStartsOn: 0,
    customInterval: 1,
    // showSingleMonth: false
    isShowWeek: true
};

function beforeCurrentDate(current: Moment, today: Moment) {
    if (current.year() < today.year()) {
        return true;
    } else if (current.year() === today.year()) {
        if (current.month() < today.month()) {
            return true;
        } else if (current.month() === today.month()) {
            return current.date() < today.date()
        }
    }
    return false
}

// 预制 禁用的日期
const prefabricatedDisabledDate = new Map([
    // 1. 预制今天之前的日期为禁用日期
    ['beforeCurrentDate', beforeCurrentDate],
    // // 2.当月之前的日期为禁用日期
    // ['beforeCurrentMonth', beforeCurrentMonth],

]);
const _disabledDate = (disabledDate?: string | ((current: Moment, value?: Moment) => boolean)) => {
    return (current: Moment) => {
        if (typeof disabledDate === 'string') {
            return prefabricatedDisabledDate.get(disabledDate)?.(current, getTodayTime(generateM()())) || false;
        } else if (typeof disabledDate === 'function') {
            return disabledDate(current);
        }
        return false;
    }

}
@WebUI({name: "calendar", defaultProps})
class Calendar extends Component<CalendarProps<null>, CalendarState> {
    static defaultProps = defaultProps;
    private rootRef: OrNull<HTMLDivElement> = null;
    private scrollDiv: OrNull<HTMLDivElement> = null;
    // 屏幕缩放时 触发了滚动 事件
    private scalingRatio = 1;
    // 切换年时 防止 切回的开关
    private inChangeYearDir = false;
    // eslint-disable-next-line no-undef
    private tomer?: NodeJS.Timeout;
    // fillSpace ：点击12月时自动滚动后 阻止 重复通过 自动计算 滚动高度 重设value
    private siderToScroll: boolean = false;
    moveFlag: any;
    timer: any;
    timerMove: any;
    timerChange: any;
    startTitleValue: any;
    endTitleValue: any;
    dataFlag: any;
    dragging: boolean;
    // startY: any;
    newHeight: any;
    offsetTop: any;
    // debouncedResize: any;
    // resizeObserver: any;
    flagParentKey: any;
    dragStartTitleValue: any;
    editDomTop: any;
    flagDragging: boolean;
    constructor(props: CalendarProps<null>, context: {}) {
        super(props, context);
        const {value, defaultValue, mutiple, scrollIntoValue, defaultScrollIntoValue} = this.props as CalendarProps<Array<string>>;
        this.offsetTop = 0
        this.moveFlag = [] // 删除后需要上移的dom元素标识项集合
        this.timer = null
        this.timerMove = null
        this.timerChange = null
        this.startTitleValue = '' // 鼠标按下时的位置
        this.endTitleValue = ''
        this.dataFlag = 'calendar' + new Date().getTime()
        this.dragging = false // 判断鼠标为拖拽还是点击
        // this.startY = 0
        this.newHeight = 0
        this.flagParentKey = ''
        this.dragStartTitleValue = []
        this.editDomTop = 0
        this.flagDragging = false
        let type: string;
        let selectValuesMap = new Map();
        if ('type' in props) {
            type = props.type as string;
        } else {
            type = props.mode || props.defaultType || "date";
        }
        if (mutiple) {
            let _value: Moment[] = defaultValue || [];
            if ('value' in props) {
                _value = value as Moment[];
            }
            _value?.forEach(v => {
                selectValuesMap.set(v.format('YYYY-MM-DD'), true)
            })
        }
        this.state = {
            selectValuesMap,
            value: (scrollIntoValue?.clone() || defaultScrollIntoValue?.clone() || generateM()()),
            fillSpaceStyle: {},
            hourFillSpaceStyle: {},
            highLightDate: [],
            type,
            current: generateM()(),
            // 多选模式下焦点态日期
            focusedDay: '',
            isFlag: false,
            callFunction: false,
            strideValue: props.strideValue || [],
            allDataAdd: [],
            modalVisible: false,
            isDelete: false,
            cellHeight: 405
        }
    }
    // static getDerivedStateFromProps(nextProps: Readonly<CalendarProps<Array<string>>>, state: CalendarState) {

    //     let newState: Partial<CalendarState> = {};
    //     const {value, mutiple, scrollIntoValue} = nextProps;

    //     if ('value' in nextProps && mutiple) {
    //         const _value = value || nextProps.defaultValue;
    //         const selectValuesMap = new Map();
    //         (_value as Moment[])?.forEach((v: Moment) => {
    //             selectValuesMap.set(v.format('YYYY-MM-DD'), true)
    //         })
    //         newState.selectValuesMap = selectValuesMap;
    //     }
    //     if ('scrollIntoValue' in nextProps && (nextProps.scrollIntoValue as Moment).format('YYYY-MM-DD') !== state.value.format('YYYY-MM-DD') && mutiple) {
    //         newState.value = scrollIntoValue!.clone() as Moment;
    //     }
    //     if ('type' in nextProps) {
    //         newState.type = nextProps.type
    //     }
    //     if ('strideValue' in nextProps && nextProps.strideValue?.length != state.strideValue?.length) {
    //         // console.log('新========----------', nextProps, state)
    //         // this.setCreatDom(nextProps.strideValue)
    //         newState.strideValue = nextProps.strideValue
    //         newState.callFunction = true
    //     }
    //     return newState
    // }

    componentWillReceiveProps(nextProps: Readonly<CalendarProps<null>>): void {
        if ('value' in nextProps && 'mutiple' in nextProps) {
            const _value = nextProps.value || nextProps.defaultValue;
            const selectValuesMap = new Map();
            (_value as Moment[])?.forEach((v: Moment) => {
                selectValuesMap.set(v.format('YYYY-MM-DD'), true)
            })
            // newState.selectValuesMap = selectValuesMap;
            this.setState({
                selectValuesMap
            })
        }
        if ('scrollIntoValue' in nextProps && (nextProps.scrollIntoValue as Moment).format('YYYY-MM-DD') !== this.state.value.format('YYYY-MM-DD') && 'mutiple' in nextProps) {
            // newState.value = scrollIntoValue!.clone() as Moment;
            this.setState({
                value: nextProps.scrollIntoValue!.clone()
            })
        }
        if ('type' in nextProps) {
            // newState.type = nextProps.type
            this.setState({
                type: nextProps.type as string
            })
            // 从小时面板切换到日面板时，之前创建的事件都需要重新渲染
            if (((nextProps.type === 'date' && this.props.type !== 'date') || (nextProps.type === 'month' && this.props.type !== 'month')) && 'strideValue' in nextProps && nextProps.strideValue?.length > 0) {
                this.timerChange = setTimeout(() => {
                    this.setCreatDom(nextProps.strideValue)
                }, 500)
            }
            this.setCellHeight(nextProps.type)
        }
        if ('isEditEvent' in nextProps && nextProps.isEditEvent && 'strideValue' in nextProps) {
            this.setCreatDom(nextProps.strideValue)
            // newState.strideValue = nextProps.strideValue
            // newState.callFunction = true
            this.setState({
                strideValue: nextProps.strideValue
            })
        }
        if ('strideValue' in nextProps && nextProps.strideValue?.length != this.props.strideValue?.length) {
            this.setCreatDom(nextProps.strideValue)
            // newState.strideValue = nextProps.strideValue
            // newState.callFunction = true
            this.setState({
                strideValue: nextProps.strideValue
            })
        }
    }
    componentDidUpdate(_prevProps: Readonly<CalendarProps<Array<string>>>, prevState: CalendarState) {
        if (this.props.mutiple && prevState.value && prevState.value.format('YYYY-MM-DD') !== this.state.value.format('YYYY-MM-DD')) {
            this.setScroll();
        }
        if (this.props.fillSpace && this.props.mutiple && (prevState.fillSpaceStyle !== this.state.fillSpaceStyle || prevState.hourFillSpaceStyle !== this.state.hourFillSpaceStyle)) {
            this.setScroll();
        }
    }

    componentDidMount() {
        const { fillSpace, mutiple } = this.props;
        this.scalingRatio = detectZoom();
        // 保证时间变化时，当前时间线实时更新
        this.timeFunc()
        if (fillSpace) {
            this.setFillSpace();
            events.on(window, 'resize', this.setFillSpace); // 浏览器窗口大小变化时重置
        } else {
            if (mutiple) {
                this.setScroll();
            }
        }
        this.creatSildeDom()
        this.setCreatDom(this.props.strideValue || [])
        this.setCellHeight()
        // this.debouncedResize = debounce(() => {
        //     this.setCellHeight()
        //     this.setFillSpace()
        // }, 200);
        // this.resizeObserver = new ResizeObserver(this.debouncedResize);
        // this.resizeObserver.observe(this.rootRef?.parentNode);
    }

    // 遍历所有父元素
    getParentTitle = (parent: any) => {
        let lastTitle = ''
        let dep = (parent: any) => {
            if (parent?.getAttribute) {
                let parentTitle = parent?.getAttribute('datatitle')
                if (parentTitle) {
                    lastTitle = parentTitle
                    return
                } else {
                    dep(parent.parentNode)
                }
            }
        }
        dep(parent)
        return lastTitle
    }

    // 滑动鼠标添加滑过区域
    creatSildeDom = () => {
        let { isDragEvent } = this.props
        if (!isDragEvent) return
        this.rootRef?.addEventListener('mousedown', this.handleMouseDown)
        this.rootRef?.addEventListener('mouseup', this.handleMouseUp)
    }

    // 鼠标按下事件
    handleMouseDown = (event: any) => {
        let { isDragEvent, clsPrefix } = this.props
        let isTableHead = event.target.classList
        if (!isDragEvent || isTableHead.contains(`${clsPrefix}-column-header-inner`) || isTableHead.contains(`${clsPrefix}-column-header`) || isTableHead.contains(`${clsPrefix}-full-header`) || isTableHead.contains(`${clsPrefix}-more-event`)) return
        event.preventDefault(); // 阻止默认行为（如选中文本）
        let { fullscreen, mutiple, type } = this.props
        if (!(fullscreen && mutiple && (type === 'date' || type === 'month'))) return
        this.dragging = false
        this.timer = setTimeout(() => {
            this.dragging = true
        }, 50)
        this.startTitleValue = '' // 鼠标按下时的位置
        this.endTitleValue = ''
        // let mouseDownEvent = event || window.event;
        // this.startY = null; // 计算相对于DIV上边界的距离
        this.newHeight = null
        let parentElement = event.target.parentNode
        this.startTitleValue = this.getParentTitle(parentElement)
        this.dataFlag = 'calendar' + new Date().getTime()
        this.setState({
            isDelete: false
        })
        this.rootRef?.addEventListener('mousemove', this.handleMouseMove);
    }

    // 鼠标松开事件
    handleMouseUp = (event: any) => {
        let { isDragEvent, clsPrefix, isEditEvent } = this.props
        if (!isDragEvent) return
        let { fullscreen, mutiple, onCreateEvent, type, strideValue } = this.props
        if (!(fullscreen && mutiple && (type === 'date' || type === 'month'))) return
        clearTimeout(this.timer)
        if (!this.dragging) {
            // console.log('执行了点击吗', event)
        } else {
            // console.log('执行了移动吗', event)
            if (this.newHeight !== undefined && this.newHeight !== null && !isNaN(this.newHeight)) {
                let parentElement = event.target.parentNode
                this.endTitleValue = this.getParentTitle(parentElement)
                // onMouseHandle && onMouseHandle({startTitleValue, titleValue: endTitleValue, dataFlag}, this.setFirstCellCotent)
                // onMouseHandle && onMouseHandle({startTitleValue: this.startTitleValue, titleValue: this.endTitleValue, dataFlag: this.dataFlag})
                onCreateEvent && onCreateEvent({start: this.startTitleValue, end: this.endTitleValue, dataFlag: this.dataFlag})
                let lastValue = strideValue && strideValue?.length > 0 ? strideValue[strideValue?.length - 1] : []
                this.setFirstCellCotent(lastValue)
                this.setState({
                    modalVisible: true,
                    dataFlag: this.dataFlag
                })
                // 拖拽完成之后创建元素
                if (isEditEvent) {
                    let allKeyDom = this.rootRef?.querySelectorAll(`[data-add="${this.dataFlag}"]`)
                    allKeyDom?.forEach((item, index) => {
                        if (index === allKeyDom!?.length - 1) {
                            let flagDom = document.createElement('div')
                            flagDom.style.right = '0'
                            flagDom.setAttribute('isFirst', 'is')
                            flagDom.classList.add(`${clsPrefix}-drag-flag-online`)
                            flagDom.onmousedown = this.itemDown
                            item.appendChild(flagDom)
                        }
                    })
                }
            }
            // this.startY = null; // 重置变量
            this.newHeight = null;
            // this.contentText = ''
        }
        this.rootRef?.removeEventListener('mousemove', this.handleMouseMove)
    }

    // 鼠标移动事件
    handleMouseMove = (event: any) => {
        let { isDragEvent } = this.props
        if (!isDragEvent) return
        let { fullscreen, mutiple, type } = this.props
        if (!(fullscreen && mutiple && (type === 'date' || type === 'month'))) return
        if (!this.dragging) return
        this.moveFlag = []
        // let mouseMoveEvent = event || window.event;
        let parentElement = event.target.parentNode
        let titleValue = this.getParentTitle(parentElement) // 不能只取一层父级元素，内部添加元素 这个逻辑有问题
        // let bodyDom = event.target.querySelector('.wui-calendar-cell-body')
        this.setCreatDom([{startTitleValue: this.startTitleValue, titleValue, dataFlag: this.dataFlag}], 'mouseMove')
        this.newHeight = 0
    }

    setCreatDom = (arr: any, _mouseOver?: any) => {
        let { dateCellRender, clsPrefix } = this.props
        if (dateCellRender) return
        let addDataDom = this.rootRef?.querySelectorAll('[data-add]')
        let allDataAdd: any = []
        let lastDataAdd: any = []
        addDataDom?.forEach(item => {
            let domGetAttr = item.getAttribute('data-add')
            allDataAdd.push(domGetAttr)
        })
        let newDataArr = Array.from(new Set(allDataAdd))
        arr.forEach(({startTitleValue, titleValue, dataFlag, tex}: any) => {
            let startTime = new Date(startTitleValue)
            let endTime = new Date(titleValue)
            if (startTime.getTime() >= endTime.getTime()) {
                // 鼠标按下时间大于结束时间
                // 计算时间段内的所有dom
                let sectionDom: any = []
                let allDom: any = this.rootRef?.querySelectorAll('[datatitle]')
                allDom.forEach((item: any) => {
                    let itemTitle = item?.getAttribute('datatitle')
                    let currentTime = new Date(itemTitle).getTime()
                    if (titleValue && endTime.getTime() <= currentTime && currentTime <= startTime.getTime()) {
                        sectionDom.push(item)
                    } else {
                        let otherDom = item.querySelector(`[data-add="${dataFlag}"]`)
                        if (otherDom) {
                            otherDom.remove()
                        }
                    }
                })
                sectionDom.forEach((item: any, index: number) => {
                    // let itemValue = item?.getAttribute('datatitle')
                    // if (endTime.getTime() < new Date(itemValue).getTime() && new Date(itemValue).getTime() < startTime.getTime()) {
                    let bodyDom = item.querySelector('.wui-calendar-cell-body')
                    let newDom = document.createElement('div')
                    newDom.style.width = 'calc(100% + 1px)'
                    newDom.style.height = '20px'
                    newDom.style.background = '#EFF6FF'
                    // newDom.style.borderTop = '1px solid #ffa600'
                    // newDom.style.borderBottom = '1px solid #ffa600'
                    // newDom.style.boxShadow = 'rgb(59, 130, 246) 0px 0px 1px inset'
                    newDom.style.border = '1px solid #3b82f6'
                    if (index != 0) {
                        newDom.style.borderLeft = 'none'
                    }
                    // newDom.style.borderLeft = 'none'
                    newDom.style.position = 'absolute'
                    if (_mouseOver == 'flagMouseMove') {
                        newDom.style.top = this.editDomTop
                    } else {
                        newDom.style.top = '0'
                    }
                    // newDom.onclick = this.cellClick(sectionDom, dataFlag)
                    // newDom.cdom = 'tt'
                    newDom.setAttribute('data-add', dataFlag)
                    newDom.onclick = this.cellClick
                    let newcDom = bodyDom.querySelector(`[data-add="${dataFlag}"]`)
                    if (this.state.isDelete) {
                        newcDom.remove()
                        if (bodyDom.firstChild) {
                            bodyDom.insertBefore(newDom, bodyDom.firstChild)
                        } else {
                            bodyDom.appendChild(newDom)
                        }
                        bodyDom.style.position = 'relative'
                        this.setOtherDomPosition(bodyDom, dataFlag)
                    } else {
                        if (!newcDom) {
                            if (bodyDom.firstChild) {
                                bodyDom.insertBefore(newDom, bodyDom.firstChild)
                            } else {
                                bodyDom.appendChild(newDom)
                            }
                            bodyDom.style.position = 'relative'
                            this.setOtherDomPosition(bodyDom, dataFlag)
                        }
                    }
                    // if (!newcDom) {
                    //     if (bodyDom.firstChild) {
                    //         bodyDom.insertBefore(newDom, bodyDom.firstChild)
                    //     } else {
                    //         bodyDom.appendChild(newDom)
                    //     }
                    //     bodyDom.style.position = 'relative'
                    //     this.setOtherDomPosition(bodyDom, dataFlag)
                    // }
                })
            } else if (startTime.getTime() < endTime.getTime()) {
                // 鼠标按下事件小于结束时间
                // 计算时间段内的所有dom
                let sectionDom: any = []
                let allDom: any = this.rootRef?.querySelectorAll('[datatitle]')
                allDom.forEach((item: any) => {
                    let itemTitle = item?.getAttribute('datatitle')
                    let currentTime = new Date(itemTitle).getTime()
                    if (titleValue && endTime.getTime() >= currentTime && currentTime >= startTime.getTime()) {
                        sectionDom.push(item)
                    } else {
                        let otherDom = item.querySelector(`[data-add="${dataFlag}"]`)
                        if (otherDom) {
                            otherDom.remove()
                        }
                    }
                })
                sectionDom.forEach((item: any, index: number) => {
                    // let itemValue = item?.getAttribute('datatitle')
                    // if (endTime.getTime() < new Date(itemValue).getTime() && new Date(itemValue).getTime() < startTime.getTime()) {
                    let bodyDom = item.querySelector('.wui-calendar-cell-body')
                    // let bodyDom = type === 'date' ? item.querySelector('.wui-calendar-cell-body') : item.querySelector('.wui-calendar-month-panel-month')
                    let newDom = document.createElement('div')
                    newDom.style.width = 'calc(100% + 1px)'
                    newDom.style.height = '20px'
                    newDom.style.background = '#EFF6FF'
                    // newDom.style.borderTop = '1px solid #ffa600'
                    // newDom.style.borderBottom = '1px solid #ffa600'
                    // newDom.style.boxShadow = 'rgb(59, 130, 246) 0px 0px 1px inset'
                    newDom.style.border = '1px solid #3b82f6'
                    // newDom.style.borderLeft = 'none'
                    if (index != 0) {
                        newDom.style.borderLeft = 'none'
                    }
                    newDom.style.position = 'absolute'
                    if (_mouseOver == 'flagMouseMove') {
                        newDom.style.top = this.editDomTop
                    } else {
                        newDom.style.top = '0'
                    }
                    // newDom.style.top = '0'
                    // newDom.onclick = this.cellClick(sectionDom, dataFlag)
                    newDom.setAttribute('data-add', dataFlag)
                    newDom.onclick = this.cellClick
                    // console.log('每个单元格-----------540', newDom, sectionDom)
                    if ((index == sectionDom.length - 1) && _mouseOver !== 'mouseMove' && _mouseOver !== 'flagMouseMove') {
                        let flagDom = document.createElement('div')
                        // flagDom.style.width = '7px'
                        // flagDom.style.height = '20px'
                        // flagDom.style.background = '#999'
                        // flagDom.style.position = 'absolute'
                        flagDom.style.right = '0'
                        flagDom.setAttribute('isFirst', 'is')
                        flagDom.classList.add(`${clsPrefix}-drag-flag-online`)
                        flagDom.onmousedown = this.itemDown
                        newDom.appendChild(flagDom)
                    }
                    let newcDom = bodyDom.querySelector(`[data-add="${dataFlag}"]`)
                    if (this.state.isDelete) {
                        newcDom?.remove()
                        if (bodyDom.firstChild) {
                            bodyDom.insertBefore(newDom, bodyDom.firstChild)
                        } else {
                            bodyDom.appendChild(newDom)
                        }
                        bodyDom.style.position = 'relative'
                        this.setOtherDomPosition(bodyDom, dataFlag)
                    } else {
                        if (!newcDom) {
                            // newcDom.remove()
                            if (bodyDom.firstChild) {
                                bodyDom.insertBefore(newDom, bodyDom.firstChild)
                            } else {
                                bodyDom.appendChild(newDom)
                            }
                            bodyDom.style.position = 'relative'
                            this.setOtherDomPosition(bodyDom, dataFlag)
                        }
                    }
                })
            }
            lastDataAdd.push(dataFlag)
            if (!['mouseMove', 'flagMouseMove'].includes(_mouseOver)) {
                this.setFirstCellCotent({startTitleValue, titleValue, dataFlag, tex})
            }
        })
        let initProps = this.props.strideValue || []
        let strideValueArr = [...initProps, ...arr]
        strideValueArr.forEach(item => {
            lastDataAdd.push(item.dataFlag)
        })
        let createDeleteArr = Array.from(new Set(lastDataAdd))
        let differArr = newDataArr.filter(item => !createDeleteArr.includes(item))
        let domPath = null
        differArr.forEach(item => {
            domPath = this.rootRef?.querySelectorAll(`[data-add="${item}"]`)
            domPath?.forEach((_en) => {
                this.moveUpDom(_en)
                _en.remove()
                // this.moveUpDom(_en)
            })
        })
    }

    itemDown = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        let flagParent = e.target.parentNode
        this.flagParentKey = flagParent.getAttribute('data-add')
        let allKeyDom = this.rootRef?.querySelectorAll(`[data-add="${this.flagParentKey}"]`)
        let keyTimeArr: any = []
        allKeyDom?.forEach(item => {
            let itemTime = this.getParentTitle(item)
            keyTimeArr.push(itemTime)
        })
        this.dragStartTitleValue = keyTimeArr
        this.editDomTop = window.getComputedStyle(flagParent)?.top
        this.flagDragging = false
        setTimeout(() => {
            this.flagDragging = true
        }, 50)
        document.addEventListener('mousemove', this.itemMove)
        document.addEventListener('mouseup', this.itemUp)
    }

    itemMove = (e: any) => {
        // console.log('鼠标移动', e)
        if (!this.flagDragging) return
        let allKeyDom = this.rootRef?.querySelectorAll(`[data-add="${this.flagParentKey}"]`)
        let keyTimeArr = []
        allKeyDom?.forEach(item => {
            let itemTime = this.getParentTitle(item)
            keyTimeArr.push(itemTime)
        })
        let endTime = this.getParentTitle(e.target)
        let startTitleValue = this.dragStartTitleValue[0]
        if (new Date(endTime).getTime() < new Date(this.dragStartTitleValue[0]).getTime()) {
            startTitleValue = this.dragStartTitleValue[this.dragStartTitleValue?.length - 1]
        }
        let obj = {startTitleValue: startTitleValue, titleValue: endTime, dataFlag: this.flagParentKey}
        this.setCreatDom([obj], 'flagMouseMove')
    }

    itemUp = (e: any) => {
        let { clsPrefix } = this.props
        if (this.flagDragging) {
            let {onCreateEvent, strideValue} = this.props
            let allKeyDom = this.rootRef?.querySelectorAll(`[data-add="${this.flagParentKey}"]`)
            let keyTimeArr = []
            allKeyDom?.forEach(item => {
                let itemTime = this.getParentTitle(item)
                keyTimeArr.push(itemTime)
            })
            // console.log('所有的时间-------------', keyTimeArr)
            let endTime = this.getParentTitle(e.target)
            let startTitleValue = this.dragStartTitleValue[0]
            if (new Date(endTime).getTime() < new Date(this.dragStartTitleValue[0]).getTime()) {
                startTitleValue = this.dragStartTitleValue[this.dragStartTitleValue?.length - 1]
            }
            onCreateEvent && onCreateEvent({start: startTitleValue, end: endTime, dataFlag: this.flagParentKey})
            let lastValue = strideValue && strideValue?.length > 0 ? strideValue[strideValue?.length - 1] : []
            this.setFirstCellCotent(lastValue)
            this.setState({
                modalVisible: true,
                dataFlag: this.flagParentKey
            })
            // 拖拽完成之后创建元素
            let allKeyDomCopy = this.rootRef?.querySelectorAll(`[data-add="${this.flagParentKey}"]`)
            allKeyDomCopy?.forEach((item, index) => {
                if (index === allKeyDomCopy!?.length - 1) {
                    let flagDom = document.createElement('div')
                    // flagDom.style.width = '7px'
                    // flagDom.style.height = '20px'
                    // flagDom.style.background = '#999'
                    // flagDom.style.position = 'absolute'
                    flagDom.style.right = '0'
                    flagDom.setAttribute('isFirst', 'is')
                    flagDom.classList.add(`${clsPrefix}-drag-flag-online`)
                    flagDom.onmousedown = this.itemDown
                    item.appendChild(flagDom)
                }
            })
        }
        document.removeEventListener('mousemove', this.itemMove)
        this.flagDragging = false
    }

    // 删除之后下方事件上移
    moveUpDom = (_en: Element) => {
        let { locale } = this.props
        const _locale = getLangInfo(locale, i18n, 'calendar')
        let parentNode = _en.parentNode
        let allChildNode = parentNode?.querySelectorAll(`[data-add]`)
        let allDataAdd: string[] = []
        allChildNode?.forEach((item: any) => {
            let titleFlag = item.getAttribute('data-add')
            allDataAdd.push(titleFlag)
        })
        let oldDataAdd = [...this.state.allDataAdd]
        this.moveFlag = [...this.moveFlag, ...allDataAdd]
        this.setState({
            allDataAdd: [...oldDataAdd, ...allDataAdd]
        })
        clearTimeout(this.timerMove) // 删除之后，下方dom上移，确保每次删除dom，下方dom上移只执行一次
        this.timerMove = setTimeout(() => {
            let moveDomArr = Array.from(new Set([...this.moveFlag]))
            moveDomArr.forEach(list => {
                let sameFlagDom: any = this.rootRef?.querySelectorAll(`[data-add="${list}"]`)
                // let isMove = true
                // sameFlagDom.forEach((val: any) => {
                //     // 这里 那获取每个元素的父元素下的第一个子元素是否top值为0，如果为0，则不上移
                //     let parentElement = val.parentNode.querySelectorAll(`[data-add]`)
                //     let firstChildDomStyle = window.getComputedStyle(parentElement[0])
                //     if (parseInt(firstChildDomStyle?.top) === 0) {
                //         isMove = false
                //     }
                // })
                // 删除dom之后，下方dom上移逻辑
                sameFlagDom.forEach((li: any) => {
                    let itemStyle = window.getComputedStyle(li)
                    if (parseInt(itemStyle?.top) > 0) {
                        li.style.top = (parseInt(itemStyle?.top) - 20) + 'px'
                    } else {
                        // return
                    }
                    // 删除后隐藏日程数量更新
                    let moveParentDom = li.parentNode
                    let moveChildDom = moveParentDom?.querySelectorAll(`[data-add]`)
                    if (moveChildDom?.length == 1) {
                        let moveDomStyle = window.getComputedStyle(moveChildDom[0])
                        if (parseInt(moveDomStyle?.top) == 20) {
                            let moreDom = moveParentDom.querySelector(`[moredom="is"]`)
                            if (moreDom) {
                                moreDom.remove()
                            }
                        }
                    } else if (moveChildDom?.length == 2) {
                        let topArr: any = []
                        moveChildDom.forEach((item: any) => {
                            let moveDomStyle = window.getComputedStyle(item)
                            topArr.push(parseInt(moveDomStyle?.top))
                        })
                        topArr.sort((a: any, b: any) => a - b)
                        if (topArr[0] == 0 && topArr[1] == 20) {
                            let moreDom = moveParentDom.querySelector(`[moredom="is"]`)
                            if (moreDom) {
                                moreDom.remove()
                            }
                        } else if (topArr[0] >= 20) {
                            let moreDom = moveParentDom.querySelector(`[moredom="is"]`)
                            if (moreDom) {
                                // moreDom.innerText = `${_locale.langMap.moreBefore} ${2} ${_locale.langMap.moreAfter}`
                                moreDom.innerText = `${_locale.langMap.more}`
                            }
                        }
                    } else if (moveChildDom?.length > 2) {
                        let topArr: any = []
                        moveChildDom.forEach((item: any) => {
                            let moveDomStyle = window.getComputedStyle(item)
                            topArr.push(parseInt(moveDomStyle?.top))
                        })
                        topArr.sort((a: any, b: any) => a - b)
                        if (topArr[0] == 0) {
                            let moreDom = moveParentDom.querySelector(`[moredom="is"]`)
                            if (moreDom) {
                                // moreDom.innerText = `${_locale.langMap.moreBefore} ${moveChildDom?.length - 1} ${_locale.langMap.moreAfter}`
                                moreDom.innerText = `${_locale.langMap.more}`
                            }
                        } else if (topArr[0] > 0) {
                            let moreDom = moveParentDom.querySelector(`[moredom="is"]`)
                            if (moreDom) {
                                // moreDom.innerText = `${_locale.langMap.moreBefore} ${moveChildDom?.length} ${_locale.langMap.moreAfter}`
                                moreDom.innerText = `${_locale.langMap.more}`
                            }
                        }
                    }
                })
            })
        }, 0)
    }

    setOtherDomPosition = (bodyDom: any, dataFlag: string) => {
        let { locale, cellAdaptHeight } = this.props
        const _locale = getLangInfo(locale, i18n, 'calendar')
        let allDataAddDom = bodyDom.querySelectorAll(`[data-add]`)
        const gapNum = 0
        allDataAddDom.forEach((item: any, index: number) => {
            let itemDataAdd = item?.getAttribute('data-add')
            if (itemDataAdd != dataFlag) {
                let addSameDataAddDom = this.rootRef?.querySelectorAll(`[data-add="${itemDataAdd}"]`)
                addSameDataAddDom?.forEach((val: any) => {
                    if (index == 1) {
                        // let styleAll = window.getComputedStyle(item)
                        if (parseInt(item.style?.top) > 20 + gapNum) {
                            // console.log('进入111111111')
                        } else {
                            val.style.position = 'absolute'
                            val.style.top = index * 20 + gapNum + 'px'
                        }
                    } else {
                        let styleAll = window.getComputedStyle(val)
                        if (parseInt(styleAll?.top) > index * (20 + gapNum)) {
                            val.style.top = parseInt(styleAll?.top) + 'px'
                        } else {
                            val.style.top = index * (20 + gapNum) + 'px'
                        }
                        val.style.position = 'absolute'
                        // val.style.top = index * 20 + 'px'
                        // let childrenDom = bodyDom.querySelectorAll(`[data-add]`)
                        // 每一项的父元素
                        let parentDom = val.parentNode
                        // let newcDom = parentDom.querySelector(`[moredom="is"]`)
                        let allchildDom = parentDom?.querySelectorAll(`[data-add]`)
                        allchildDom?.forEach((domItem: any, ind: number) => {
                            let parentDom1 = domItem.parentNode
                            let newcDom = parentDom1.querySelector(`[moredom="is"]`)
                            if (cellAdaptHeight) {
                                let diffNum = Math.floor((this.state.cellHeight - 30) / 20)
                                if (ind <= diffNum - 1 && parseInt(domItem.style.top) > (diffNum - 1) * 20) {
                                    if (newcDom) {
                                        // newcDom.innerText = `${_locale.langMap.moreBefore} ${allchildDom.length} ${_locale.langMap.moreAfter}`
                                        newcDom.innerText = `${_locale.langMap.more}`
                                    } else {
                                        let moreDom = document.createElement('div')
                                        moreDom.style.width = 'calc(100% + 1px)'
                                        moreDom.style.height = '20px'
                                        moreDom.style.background = '#3B82F6'
                                        moreDom.style.boxShadow = 'rgb(59, 130, 246) 0px 0px 1px inset'
                                        moreDom.style.position = 'absolute'
                                        moreDom.style.top = '0'
                                        moreDom.style.top = `${(diffNum - 1) * 20}px`
                                        // moreDom.innerHTML = `${_locale.langMap.moreBefore} ${allchildDom.length} ${_locale.langMap.moreAfter}`
                                        moreDom.innerHTML = `${_locale.langMap.more}`
                                        moreDom.setAttribute('moredom', 'is')
                                        moreDom.onclick = this.moreDomHandle
                                        parentDom1.appendChild(moreDom)
                                    }
                                } else if (ind == allchildDom?.length - 1 && parseInt(domItem.style.top) > (diffNum - 1) * 20) {
                                    if (newcDom) {
                                        // newcDom.innerText = `${_locale.langMap.moreBefore} ${allchildDom.length} ${_locale.langMap.moreAfter}`
                                        newcDom.innerText = `${_locale.langMap.more}`
                                    } else {
                                        let moreDom = document.createElement('div')
                                        moreDom.style.width = 'calc(100% + 1px)'
                                        moreDom.style.height = '20px'
                                        moreDom.style.background = '#3B82F6'
                                        moreDom.style.boxShadow = 'rgb(59, 130, 246) 0px 0px 1px inset'
                                        moreDom.style.position = 'absolute'
                                        moreDom.style.top = '0'
                                        moreDom.style.top = `${(diffNum - 1) * 20}px`
                                        // moreDom.innerHTML = `${_locale.langMap.moreBefore} ${allchildDom.length} ${_locale.langMap.moreAfter}`
                                        moreDom.innerHTML = `${_locale.langMap.more}`
                                        moreDom.setAttribute('moredom', 'is')
                                        moreDom.onclick = this.moreDomHandle
                                        parentDom1.appendChild(moreDom)
                                    }
                                } else if (ind > diffNum - 1) {
                                    if (newcDom) {
                                        // newcDom.innerText = `${_locale.langMap.moreBefore} ${allchildDom.length - 1} ${_locale.langMap.moreAfter}`
                                        newcDom.innerText = `${_locale.langMap.more}`
                                    } else {
                                        let moreDom = document.createElement('div')
                                        moreDom.style.width = 'calc(100% + 1px)'
                                        moreDom.style.height = '20px'
                                        moreDom.style.background = '#3B82F6'
                                        moreDom.style.boxShadow = 'rgb(59, 130, 246) 0px 0px 1px inset'
                                        moreDom.style.position = 'absolute'
                                        moreDom.style.top = '0'
                                        moreDom.style.top = `${(diffNum - 1) * 20}px`
                                        // moreDom.innerHTML = `${_locale.langMap.moreBefore} ${allchildDom.length - 1} ${_locale.langMap.moreAfter}`
                                        moreDom.innerHTML = `${_locale.langMap.more}`
                                        moreDom.setAttribute('moredom', 'is')
                                        moreDom.onclick = this.moreDomHandle
                                        parentDom1.appendChild(moreDom)
                                    }
                                }
                            } else {
                                if (ind == 0 && domItem.style.top != '0px' || ind == 0 && domItem.style.top != '20px') {
                                    if (newcDom) {
                                        // newcDom.innerText = `${_locale.langMap.moreBefore} ${allchildDom.length} ${_locale.langMap.moreAfter}`
                                        newcDom.innerText = `${_locale.langMap.more}`
                                    } else {
                                        let moreDom = document.createElement('div')
                                        moreDom.style.width = 'calc(100% + 1px)'
                                        moreDom.style.height = '20px'
                                        moreDom.style.background = '#3B82F6'
                                        moreDom.style.boxShadow = 'rgb(59, 130, 246) 0px 0px 1px inset'
                                        moreDom.style.position = 'absolute'
                                        moreDom.style.top = '0'
                                        moreDom.style.top = '20px'
                                        // moreDom.innerHTML = `${_locale.langMap.moreBefore} ${allchildDom.length} ${_locale.langMap.moreAfter}`
                                        moreDom.innerHTML = `${_locale.langMap.more}`
                                        moreDom.setAttribute('moredom', 'is')
                                        moreDom.onclick = this.moreDomHandle
                                        parentDom1.appendChild(moreDom)
                                    }
                                } else if (ind == 1 && domItem.style.top != '20px') {
                                    if (newcDom) {
                                        // newcDom.innerText = `${_locale.langMap.moreBefore} ${allchildDom.length - 1} ${_locale.langMap.moreAfter}`
                                        newcDom.innerText = `${_locale.langMap.more}`
                                    } else {
                                        let moreDom = document.createElement('div')
                                        moreDom.style.width = 'calc(100% + 1px)'
                                        moreDom.style.height = '20px'
                                        moreDom.style.background = '#3B82F6'
                                        moreDom.style.boxShadow = 'rgb(59, 130, 246) 0px 0px 1px inset'
                                        moreDom.style.position = 'absolute'
                                        moreDom.style.top = '0'
                                        moreDom.style.top = '20px'
                                        // moreDom.innerHTML = `${_locale.langMap.moreBefore} ${allchildDom.length - 1} ${_locale.langMap.moreAfter}`
                                        moreDom.innerHTML = `${_locale.langMap.more}`
                                        moreDom.setAttribute('moredom', 'is')
                                        moreDom.onclick = this.moreDomHandle
                                        parentDom1.appendChild(moreDom)
                                    }
                                } else {
                                    if (newcDom) {
                                        // newcDom.innerText = `${_locale.langMap.moreBefore} ${allchildDom.length - 1} ${_locale.langMap.moreAfter}`
                                        newcDom.innerText = `${_locale.langMap.more}`
                                    } else {
                                        let moreDom = document.createElement('div')
                                        moreDom.style.width = 'calc(100% + 1px)'
                                        moreDom.style.height = '20px'
                                        moreDom.style.background = '#3B82F6'
                                        moreDom.style.boxShadow = 'rgb(59, 130, 246) 0px 0px 1px inset'
                                        moreDom.style.position = 'absolute'
                                        moreDom.style.top = '0'
                                        moreDom.style.top = '20px'
                                        // moreDom.innerHTML = `${_locale.langMap.moreBefore} ${allchildDom.length - 1} ${_locale.langMap.moreAfter}`
                                        moreDom.innerHTML = `${_locale.langMap.more}`
                                        moreDom.setAttribute('moredom', 'is')
                                        moreDom.onclick = this.moreDomHandle
                                        parentDom1.appendChild(moreDom)
                                    }
                                }
                            }
                        })
                    }
                })
            }
        })
    }

    // 点击更多的收起项
    moreDomHandle = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        let { strideValue } = this.state
        let { onMoreEvent, type } = this.props
        let parentNode = e.target.parentNode
        let allDataAdd = parentNode.querySelectorAll(`[data-add]`)
        let sameCellDom: any = []
        allDataAdd.forEach((item: any) => {
            let dataFlag = item.getAttribute('data-add')
            for (let i = 0; i < strideValue?.length; i++) {
                if (dataFlag === strideValue[i].dataFlag) {
                    sameCellDom.push(strideValue[i])
                }
            }
        })
        let date = ''
        if (type == 'date') {
            date = parentNode?.parentNode?.parentNode.getAttribute('datatitle')
        } else if (type == 'month') {
            date = parentNode?.parentNode?.parentNode?.parentNode.getAttribute('datatitle')
        }
        onMoreEvent && onMoreEvent(e, sameCellDom, date)
    }

    // 点击每条日程的事件
    cellClick = (event: any) => {
        let { strideValue, type } = this.state
        let dataFlag = event.target.getAttribute('data-add')
        let sameCellDom = null
        for (let i = 0; i < strideValue?.length; i++) {
            if (dataFlag === strideValue[i].dataFlag) {
                sameCellDom = strideValue[i]
            }
        }
        let date = ''
        if (type == 'date') {
            date = event.target?.parentNode?.parentNode?.parentNode.getAttribute('datatitle')
        } else if (type == 'month') {
            date = event.target?.parentNode?.parentNode?.parentNode?.parentNode.getAttribute('datatitle')
        }
        let {onCellClick} = this.props
        onCellClick && onCellClick(event, sameCellDom, date)
    }

    setFirstCellCotent = (obj: any) => {
        let { isEditEvent, clsPrefix } = this.props
        let startTime = new Date(obj.startTitleValue).getTime()
        let endTime = new Date(obj.titleValue).getTime()
        if (endTime <= startTime) {
            let targetDom: any = this.rootRef?.querySelector(`[datatitle="${obj.titleValue}"]`)?.querySelector(`[data-add="${obj.dataFlag}"]`)
            let endDom: any = this.rootRef?.querySelector(`[datatitle="${obj.startTitleValue}"]`)?.querySelector(`[data-add="${obj.dataFlag}"]`)
            let addDom: any = this.rootRef?.querySelectorAll(`[data-add="${obj.dataFlag}"]`)
            addDom.forEach((item: any, index: number) => {
                item.style.border = 'none'
                item.style.borderTop = '1px solid #fff'
                if (index !== 0 && index != addDom.length - 1) {
                    let oldFlagDom = item.querySelector(`[isFirst="is"]`)
                    item.style.width = 'calc(100%)'
                    oldFlagDom?.remove()
                    item.innerHTML = ''
                }
            })
            if (endDom) {
                endDom.style.width = 'calc(100% - 4px)'
                // this.endDom = endDom
                targetDom.innerHTML = ''
                targetDom.style.borderLeft = '3px solid #3b82f6'
                targetDom.style.borderTopLeftRadius = '3px'
                targetDom.style.borderBottomLeftRadius = '3px'
                if (isEditEvent) {
                    let flagDom = document.createElement('div')
                    flagDom.style.left = '0'
                    flagDom.setAttribute('isFirst', 'is')
                    flagDom.classList.add(`${clsPrefix}-drag-flag-online`)
                    flagDom.onmousedown = this.itemDown
                    targetDom.appendChild(flagDom)
                    // 最后一个元素内的拖拽元素定位到元素后面
                    let lastDragDom = endDom.querySelector(`[isFirst="is"]`)
                    if (lastDragDom) {
                        lastDragDom.style.left = 'calc(100% - 7px)'
                    }
                }
                let textDom = document.createElement('span')
                textDom.innerHTML = obj.tex
                targetDom.appendChild(textDom)
                // targetDom.innerHTML = obj.tex
                targetDom.setAttribute('title', obj.tex)
            }
        } else if (endTime >= startTime) {
            let targetDom: any = this.rootRef?.querySelector(`[datatitle="${obj.startTitleValue}"]`)?.querySelector(`[data-add="${obj.dataFlag}"]`)
            let endDom: any = this.rootRef?.querySelector(`[datatitle="${obj.titleValue}"]`)?.querySelector(`[data-add="${obj.dataFlag}"]`)
            let addDom: any = this.rootRef?.querySelectorAll(`[data-add="${obj.dataFlag}"]`)
            addDom.forEach((item: any, index: number) => {
                item.style.border = 'none'
                item.style.borderTop = '1px solid #fff'
                if (index !== 0 && index != addDom.length - 1) {
                    let oldFlagDom = item.querySelector(`[isFirst="is"]`)
                    item.style.width = 'calc(100%)'
                    oldFlagDom?.remove()
                    item.innerHTML = ''
                }
            })
            if (endDom && targetDom) {
                endDom.style.width = 'calc(100% - 4px)'
                targetDom.innerHTML = ''
                targetDom.style.borderLeft = '3px solid #3b82f6'
                targetDom.style.borderTopLeftRadius = '3px'
                targetDom.style.borderBottomLeftRadius = '3px'
                if (isEditEvent) {
                    let flagDom = document.createElement('div')
                    flagDom.style.left = '0'
                    flagDom.setAttribute('isFirst', 'is')
                    flagDom.classList.add(`${clsPrefix}-drag-flag-online`)
                    flagDom.onmousedown = this.itemDown
                    targetDom.appendChild(flagDom)
                    // 最后一个元素内的拖拽元素定位到元素后面
                    let lastDragDom = endDom.querySelector(`[isFirst="is"]`)
                    if (lastDragDom) {
                        lastDragDom.style.left = 'calc(100% - 7px)'
                    }
                }
                let textDom = document.createElement('span')
                textDom.innerHTML = obj.tex
                targetDom.appendChild(textDom)
                // targetDom.innerHTML = obj.tex
                targetDom.setAttribute('title', obj.tex)
            }
        }
    }

    // modal点击确认回调
    onOk = () => {
        let { onModalOk } = this.props
        this.setState({
            modalVisible: false
        })
        onModalOk && onModalOk(this.onCloseModal)
    }

    // 点击遮罩回调
    onMaskClick = () => {
        this.onCloseSlide()
    }

    // 点击关闭回调
    onCancel = () => {
        this.onCloseSlide()
    }

    // 取消创建事件
    onCloseSlide = () => {
        let {dataFlag} = this.state
        this.setState({
            modalVisible: false
        })
        let domPath = this.rootRef?.querySelectorAll(`[data-add="${dataFlag}"]`)
        domPath?.forEach((_en) => {
            // this.moveUpDom(_en)
            _en.remove()
        })
        this.deleteEvent()
    }

    // 创建成功之后关闭弹窗
    onCloseModal = () => {
        this.setState({
            modalVisible: false
        })
    }

    // 内部删除逻辑
    deleteEvent = () => {
        let {dataFlag} = this.state
        let {strideValue} = this.props
        let newStrideValue = [...strideValue]
        let newArr: any = []
        newStrideValue.forEach(item => {
            if (item.dataFlag != dataFlag) {
                newArr.push(item)
            }
        })
        this.setState({
            strideValue: newArr,
            isDelete: true
        }, () => {
            // this.setCreatDom(newStrideValue)
            this.setCreatDom(newArr)
        })
    }

    setFillSpace = () => {
        const {mutiple, fillSpace} = this.props;
        let { type } = this.state;
        if (!fillSpace) return;
        fillSpaceFunc(this.rootRef!, undefined, (_element, _parent, _noPaddingMaxW, noPaddingMaxH) => {
            if (mutiple) {
                // 暂时固定 处理 下版本完整处理
                if (type === 'hour') {
                    const height = noPaddingMaxH - this.rootRef!.getElementsByClassName('wui-calendar-full-header')[0].clientHeight - this.rootRef!.getElementsByClassName('wui-calendar-allDay-container')[0].clientHeight
                    this.setState({hourFillSpaceStyle: {
                        height: height + 'px'
                    }})
                } else {
                    const height = noPaddingMaxH - this.rootRef!.getElementsByTagName('thead')[0]?.clientHeight - this.rootRef!.getElementsByClassName('wui-calendar-full-header')[0].clientHeight;
                    this.setState({fillSpaceStyle: {
                        // width: noPaddingMaxW + 'px',
                        height: (height) + 'px'
                    },
                    // hourFillSpaceStyle: {} // 是否加上清空，不加可缓存下高度切换时不会有闪烁情况
                    })
                    this.setScroll();
                }
            } else {
                this.setState({fillSpaceStyle: {
                    // width: noPaddingMaxW + 'px',
                    height: (noPaddingMaxH || 450) + 'px'
                }, hourFillSpaceStyle: {}})
            }
        })
    }
    // 保证时间变化时，当前时间线实时更新
    timeFunc = () => {
        // temp后更新一次
        let temp = (60 - Number(generateM()().format('ss'))) * 1000;
        this.tomer = setTimeout(() => {
            this.setState({ current: generateM()() })
            clearTimeout(this.tomer)
            this.timeFunc();
        }, (temp))
    }
    componentWillUnmount() {
        clearTimeout(this.tomer);
        clearTimeout(this.timer);
        clearTimeout(this.timerMove);
        clearTimeout(this.timerChange);
        events.off(window, 'resize', this.setFillSpace);
        this.rootRef?.removeEventListener('mousedown', this.handleMouseDown)
        this.rootRef?.removeEventListener('mouseup', this.handleMouseUp)
        this.rootRef?.removeEventListener('mousemove', this.handleMouseMove)
        // if (this.resizeObserver) {
        //     this.resizeObserver.disconnect();
        // }
        // if (this.debouncedResize && this.debouncedResize.cancel) {
        //     this.debouncedResize.cancel();
        // }
    }
	setScroll = (v?: Moment) => {
	    const {value, cellHeight} = this.state;
	    const {clsPrefix, cellAdaptHeight} = this.props;
	    const scalingRatio = detectZoom();
	    let value1 = (v?.clone?.() || value!.clone());
	    value1 = value1.date(1);
	    const year = value1.year();
	    const firstDays = generateM()(`${year}-01-01`).day();
	    const scrollDates = value1.dayOfYear() + firstDays - 1;
	    const scrollRows = parseInt(scrollDates / 7 + "");
	    if (this.scrollDiv) {
	        const tbody = this.scrollDiv.getElementsByClassName(`${clsPrefix}-tbody`)[0];
	        let scrollTop = scrollRows * dateHeight + Math.floor(10 * scalingRatio);
	        if (cellAdaptHeight) {
	            scrollTop = scrollRows * cellHeight + Math.floor(10 * scalingRatio);
	        }
	        // 显示区域大于整月时 fillSpace 特殊计算
	        if (tbody.scrollHeight && tbody.clientHeight && scrollTop > tbody.scrollHeight - tbody.clientHeight - Math.floor(10 * scalingRatio)) {
	            scrollTop = tbody.scrollHeight - tbody.clientHeight - Math.floor(10 * scalingRatio);
	            this.siderToScroll = true;
	        }
	        tbody.scrollTop = scrollTop;
	    }
	}
	onMutiChange = (value: Moment, flag: boolean) => {
	    const { onChange } = this.props;
	    const {selectValuesMap: values} = this.state;
	    if (flag === undefined || flag === null) return;
	    if (flag) {
	        values.set(value.format('YYYY-MM-DD'), flag);
	    } else {
	        values.delete(value.format('YYYY-MM-DD'));
	    }
	    this.setState({selectValuesMap: values})
	    onChange && onChange(value, flag, [...values.keys()])
	}
    headerChangeYear = async(value: Moment) => {
        const {onSelect, onYearChange} = this.props;
        await delayEvent(onYearChange, ()=> {
            this.setScroll(value);
            onSelect && onSelect(value)
    	    this.setState({value})
        })
    }
	onChange = (value: Moment) => {
	    const {onChange, onSelect} = this.props;
	    value = generateM()(value.format());
	    if (this.state.type === 'date' && this.props.mutiple) {
	        this.setScroll(value);
	        onSelect && onSelect(value);
	    }
	    this.setState({value})
	    if (!this.props.mutiple) {
	        onChange && onChange(value);
	    }
	}
	typeChange = (type: CalendarType) => {
	    if (type === 'date' && this.props.mutiple) {
	        setTimeout(() => {
	            this.setScroll(this.state.value);
	        }, 200)
	    }
	    setTimeout(() => { // 切换面板之后等加载完在计算高度
	        this.setFillSpace()
	    }, 200)
	    this.setState({type});
	    (this.props.onTypeChange && this.props.onTypeChange(type)) || (this.props.onPanelChange && this.props.onPanelChange(type))
	}
	getMonthFormDates = (dates: number, year: number): number | undefined => {
	    for (let i = 1; i <= 12; i++) {
	        if (generateM()(`${year}-${i < 10 ? '0' + i : i}-15`).dayOfYear() > dates) {
	            return i
	        }
	    }
	}
    setYear = (value: Moment, year: number, month: number) => {
        value.year(year);
        value.month(month);
    }
    getScrollRows = () => {
        const {clsPrefix} = this.props;
        const { scrollTop } = this.scrollDiv!.getElementsByClassName(`${clsPrefix}-tbody`)[0];
        return scrollTop % dateHeight ? parseInt(scrollTop / dateHeight + 1 + "") : scrollTop / dateHeight;
    }
    getScrollDates = () => {
        const {value} = this.state;
        const year = value.year();
        const firstDateOfYear = generateM()(`${year}-01-01`).locale('en-us')
        const firstDays = firstDateOfYear.day();
        return this.getScrollRows() * 7 - firstDays;
    }

	orderScroll = async(e: React.UIEvent<HTMLDivElement>) => {
	    const { onYearChange, scrollIntoValue, mutiple, isDragEvent} = this.props;

	    if (!mutiple || isDragEvent) return;
	    if (this.siderToScroll) {
	        this.siderToScroll = false;
	        return
	    }
	    const {clientHeight, scrollHeight, scrollTop} = e.currentTarget;
	    let {value} = this.state;
	    const year = value.year();
	    const scrollDates = this.getScrollDates();
	    const _month = this.getMonthFormDates(scrollDates, year);
	    _month && value.month(_month - 1);
	    //  缩放页面时 更新实际滚动高度
	    const scalingRatio = detectZoom()
	    if (scalingRatio !== this.scalingRatio) {
	        this.scalingRatio = scalingRatio;
	        this.setState({value});
	        return;
	    }

	    if (scrollHeight < clientHeight + scrollTop + 10) {

	        //  向下滚动时 如果为 up 则 不向上翻年
	        if (!this.inChangeYearDir) {
	            this.inChangeYearDir = true;
	            await delayEvent(onYearChange, this.setYear, value, year + 1, 0);
	        }
	    } else if (Math.round(scrollTop) < Math.floor(10 * scalingRatio)) {
	        // 向上 翻年时 不允许重复触发 翻年操作
	        if (!this.inChangeYearDir) {
	            this.inChangeYearDir = true;
	            await delayEvent(onYearChange, this.setYear, value, year - 1, 11);
	        }
	    } else {
	        // 滚动到 非翻页区域 后方可再次 翻页
	        this.inChangeYearDir = false;
	    }
	    if (!value.isSame(value, 'month')) {
	        if (scrollIntoValue) {
	            this.props.onSelect && this.props.onSelect(value)
	        } else {
	            this.setState({value}, () => this.props.onSelect && this.props.onSelect(value));
	        }
	    }
	}
    getRowHightlightDates = (firstDay: Moment) => {
        const { disabledDate } = this.props;
        const changeDatesFormat = []
        for (let i = 0; i < 7; i++) {
            const current = firstDay.clone().add(i, 'day');
            const isCurrentDisabled = _disabledDate(disabledDate)(current);
            if (!isCurrentDisabled) {
                changeDatesFormat.push(current.format('YYYY-MM-DD'));
            }

        }
        return changeDatesFormat
    }
    selectRow = (firstDay: Moment) => {
        const {selectValuesMap} = this.state;
        const {quickSelect, onQuickSelect } = this.props;
        if (!quickSelect) return;
        const changeDatesFormat = this.getRowHightlightDates(firstDay);
        let flag = true;
        // 如果都是被选中 则 再次点击 清除
        if (changeDatesFormat.every(date => selectValuesMap.get(date) === true)) {
            flag = false;
        }
        onQuickSelect && onQuickSelect({changeValues: changeDatesFormat, isChecked: flag, value: selectValuesMap, direction: 'horizontal'})

    }
    setRowHighLight = (firstDay: Moment) => {
        const {quickSelect } = this.props;
        if (!quickSelect) return;
        const changeDatesFormat = this.getRowHightlightDates(firstDay);
        this.setState({
            highLightDate: changeDatesFormat
        })
    }
    public getColumnHightlightDates = (index: number) => {
        const {quickSelect, disabledDate} = this.props;
        this.removeCellHighLight();
        const {value} = this.state;
        const _value = value.clone().locale('en-us');
        // 默认 剩余周数
        const scrollRows = this.getScrollRows();
        const columnSelectNumber = typeof quickSelect === 'number' ? quickSelect : defaultColomns - scrollRows + 1;
        const changeDatesFormat = [];
        const scrollDates = this.getScrollDates();
        for (let i = 0; i < columnSelectNumber; i++) {
            // 找到此星期下的第一个日期
            let current = _value.clone().dayOfYear(scrollDates - (7 - 1 - index)).add(i * 7, 'day');
            const isCurrentDisabled = _disabledDate(disabledDate)(current);
            if (!isCurrentDisabled && current.year() === _value.year())
                changeDatesFormat.push(current.format('YYYY-MM-DD'))
        }
        return changeDatesFormat
    }
    selectColumn = (index: number) => {
        const { quickSelect, onQuickSelect } = this.props;
        if (!quickSelect) return;

        const {selectValuesMap} = this.state;
        const changeDatesFormat = this.getColumnHightlightDates(index);
        let flag = true;
        // 如果都是被选中 则 再次点击 清除
        if (changeDatesFormat.every(date => selectValuesMap.get(date) === true)) {
            flag = false;
        }
        // 业务决定是否 选择
        onQuickSelect && onQuickSelect({changeValues: changeDatesFormat, isChecked: flag, value: selectValuesMap, direction: 'vertical' })

    }
    setColomnHighLight = (index: number) => {
        const {quickSelect } = this.props;
        if (!quickSelect) return;
        const changeDatesFormat = this.getColumnHightlightDates(index);
        this.setState({
            highLightDate: changeDatesFormat
        })
    }
    removeCellHighLight= () => {
        this.setState({
            highLightDate: []
        })
    }
    getDateCellAttr = (current: Moment, value: Moment) => {
        const { getDateCellAttr, clsPrefix } = this.props;
        const customAttrs = getDateCellAttr?.(current, value) || {};
        if (this.state.highLightDate.some(date => date === current.format('YYYY-MM-DD'))) {
            customAttrs.className = `${clsPrefix}-high-light` + (customAttrs.className ? ` ${customAttrs.className}` : '')
        }
        return customAttrs
    }
    renderDateHeaderCell = (day: string, xindex: number, clsPrefix: string) => {
        const { quickSelect, locale, mutiple, renderDateHeaderCell, markWeekend } = this.props;
        let weekStartsOn = getWeekStartsOn(this.props.weekStartsOn) || 0
        // let weekStartsOn = this.props.weekStartsOn || defaultProps.weekStartsOn;
	    const _locale = getLangInfo(locale, i18n, 'calendar')
        const renderDay = renderDateHeaderCell?.(day, xindex) || day;
        // 是否为日历周末头部添加背景色
        let headerMark = false;
        if (
            (markWeekend && weekStartsOn === 1 && (xindex === 5 || xindex === 6)) ||
            (markWeekend && weekStartsOn === 2 && (xindex === 4 || xindex === 5)) ||
            (markWeekend && weekStartsOn === 3 && (xindex === 3 || xindex === 4)) ||
            (markWeekend && weekStartsOn === 4 && (xindex === 2 || xindex === 3)) ||
            (markWeekend && weekStartsOn === 5 && (xindex === 1 || xindex === 2)) ||
            (markWeekend && weekStartsOn === 6 && (xindex === 0 || xindex === 1)) ||
            (markWeekend && (weekStartsOn === 0 || !markWeekend) && (xindex === 6 || xindex === 0))
        ) {
            headerMark = true;
        }
        if (mutiple && quickSelect) {
            // 快选模式下 对齐
            if (xindex === 0) {
                return [
                    <th style={{width: '22px'}} key={`${xindex}-0`}></th>,
                    <th
                        key={xindex}
                        role="columnheader"
                        title={_locale.langMap.clickSelectColomn}
                        onClick={()=> this.selectColumn(xindex)}
                        onMouseEnter={()=> this.setColomnHighLight(xindex)}
                        onMouseLeave={this.removeCellHighLight}
                        className={
                            cx({
                                [`${clsPrefix}-column-header`]: true,
                                [`${clsPrefix}-column-select-header`]: quickSelect
                            })}
                    >
                        <span className={`${clsPrefix}-column-header-inner`}>
                            {renderDay}
                        </span>
                        <span className={`${clsPrefix}-column-header-inner-select`}>
                            {_locale.langMap.clickSelectColomn}
                        </span>
                    </th>
                ]
            }
            return [
                <th
                    key={xindex}
                    role="columnheader"
                    title={_locale.langMap.clickSelectColomn}
                    onClick={()=> this.selectColumn(xindex)}
                    onMouseEnter={()=> this.setColomnHighLight(xindex)}
                    onMouseLeave={this.removeCellHighLight}
                    className={
                        cx({
                            [`${clsPrefix}-column-header`]: true,
                            [`${clsPrefix}-column-select-header`]: quickSelect
                        })}
                >
                    <span className={`${clsPrefix}-column-header-inner`}>
                        {renderDay}
                    </span>
                    <span className={`${clsPrefix}-column-header-inner-select`}>
                        {_locale.langMap.clickSelectColomn}
                    </span>
                </th>
            ]
        }
        const columnheader = (
            <th
                key={xindex}
                role="columnheader"
                className={
                    cx({
                        [`${clsPrefix}-column-header`]: true,
                        [`${clsPrefix}-column-header-mark`]: headerMark
                    })}
            >
                <span className={`${clsPrefix}-column-header-inner`}>
                    {renderDay}
                </span>
            </th>
        )
        if (xindex === 0 && mutiple) {
            return [
                <th style={{width: '22px'}} key={`${xindex}-0`}></th>,
                columnheader
            ]
        }
        return columnheader
    }
    renderSelectRow = (_xindex: number, date: Moment) => {
        const { quickSelect, clsPrefix, locale, disabledHoverStyle } = this.props;
	    const _locale = getLangInfo(locale, i18n, 'calendar')

        return quickSelect ? (
            <td onClick={()=>this.selectRow(date.clone())}
                onMouseEnter={()=> this.setRowHighLight(date.clone())}
                onMouseLeave={this.removeCellHighLight}
                style={{width: '16px', border: 0}}>
                <div
                    className={
                        cx({
                            [`${clsPrefix}-date`]: true,
                            [`${clsPrefix}-date-hover`]: disabledHoverStyle,
                            [`${clsPrefix}-row-select`]: quickSelect
                        })}><span>{_locale.langMap.clickSelect}</span></div>
            </td>
        ) : undefined;
    }
	// value   本组件内 value 取值为数组， 内部子组件取值为 对象
	renderDefaultDate = (current: Moment, value: Moment) => {
	    const {selectValuesMap} = this.state;
	    const {dateCellHeaderReader, dateCellContentRender, dateFullCellRender, mutiple, clsPrefix, disabledDate, fieldid, allowLunar, locale, disabledHoverStyle, moreRender, weekStartsOn, isDragEvent} = this.props;
	    const selectValues = [...selectValuesMap.keys()].map(v => generateM()(v));
	    const dateClass = `${clsPrefix}-date`;
	    let today;
	    let checked = false;
	    let isFocusedDay = current.format('YYYY-MM-DD') == this.state.focusedDay;
	    if (mutiple) {
	        today = getTodayTime(selectValues[0] || value);
	        checked = selectValues.some(v => isSameDay(v, current));
	    } else {
	        today = getTodayTime(value);
	    }
	    const isToday = isSameDay(current, today);
	    let header;
	    let isEdit = true;
	    const isCurrentDisabled = _disabledDate(disabledDate)(current);
	    const headerChilds =
			[mutiple ? <Checkbox className={`${clsPrefix}-cell-header-check`} disabled={isCurrentDisabled} key={current?.format('YYYY-MM-DD') + "_checkbox"}
								 onClick={() => !isCurrentDisabled && this.onMutiChange(current, !checked)}
								 checked={checked} fieldid={fieldid ? fieldid + '_input_' + current.format('YYYY_MM_DD') : undefined}/> : null,
			isToday ? (
			        <span key={current.format('YYYY-MM-DD') + "_span"} className={`${clsPrefix}-cell-header-date ${clsPrefix}-cell-header-today`}>
			        { mutiple && current.date() === 1 ? formatMonth(current.month(), getLangInfo(locale, i18n, 'calendar').langMap) : current.date()}
			    </span>
			    ) : (
			        <span key={current.format('YYYY-MM-DD') + "_span"} className={`${clsPrefix}-cell-header-date ${clsPrefix}-cell-header-solarday`}>
			            { mutiple && current.date() === 1 ? formatMonth(current.month(), getLangInfo(locale, i18n, 'calendar').langMap) : current.date()}
			        </span>
			    )
			];
	    if (allowLunar) {
	        headerChilds.push(
	            <span key={current.format('YYYY-MM-DD') + 'lunar-day'} className={`${clsPrefix}-cell-header-date ${clsPrefix}-cell-header-lunarday`}>
	                {
	                    getLunarContent(current, mutiple)
	                }
	            </span>
	        )
	    }
	    if (dateCellHeaderReader) {
	        const dateCellHeaderReaderArr = dateCellHeaderReader(current, selectValues, headerChilds);
	        if (dateCellHeaderReaderArr[0].props.clsPrefix !== 'wui-checkbox') {
	            isEdit = false;
	        }
	        header = <div className={`${clsPrefix}-cell-header`}>{dateCellHeaderReaderArr}</div>
	    }

	    let content: ReactElement | string | null = "";
	    if (dateCellContentRender) {
	        content = dateCellContentRender(current, selectValues);
	    } else if (dateFullCellRender) {
	        content = dateFullCellRender(current, selectValues);
	    }
	    let moreDom = moreRender ? moreRender(current) : null
	    let dayNum = false
	    if (weekStartsOn && weekStartsOn === 0 && (current.day() === 6 || current.day() === 5)) {
	        dayNum = true
	    } else if (weekStartsOn && weekStartsOn === 1 && (current.day() === 0 || current.day() === 6)) {
	        dayNum = true
	    } else if (!weekStartsOn && (current.day() === 6 || current.day() === 5)) {
	        dayNum = true
	    }
	    const body = <div className={
	        cx({
	            [`${clsPrefix}-cell-body`]: true,
	            [`${clsPrefix}-cell-body-drag`]: isDragEvent
	        })
	    }>{content}</div>
	    return (
	        <div onClick={() => {
	            this.setState({ focusedDay: current.format('YYYY-MM-DD') })
	            if (!isEdit || isCurrentDisabled) return;
	            this.onMutiChange(current, !checked)
	        }}
	        className={
	            cx({
	                [dateClass]: true,
	                [`${clsPrefix}-date-hover`]: disabledHoverStyle,
	                [`${clsPrefix}-mutiple-selected-day`]: true,
	                [`${clsPrefix}-before-today`]: isCurrentDisabled,
	                [`${clsPrefix}-mutiple-selected-day-edit`]: checked && !isEdit,
	                [`${clsPrefix}-mutiple-focused-day`]: isFocusedDay && !isCurrentDisabled,
	            })}>
	            {header}
	            {body}
	            {moreDom ? <div className={
	                cx({
	                    [`${clsPrefix}-more-event`]: true,
	                    [`${clsPrefix}-more-event-right`]: dayNum,
	                })
	            }>{moreDom}</div> : null}
	        </div>
	    )
	}

    setCellHeight = (_val?: any) => {
        let {cellAdaptHeight, type} = this.props
        if (!cellAdaptHeight) return
        setTimeout(() => {
            let bodyHeight = this.scrollDiv!?.getBoundingClientRect().height - 32
            let cellItemHeight = bodyHeight ? parseInt((bodyHeight / 6).toString()) : 81
            let _type = _val ? _val : type
            if (_type === 'month') {
                bodyHeight = this.rootRef?.parentNode ? (this.rootRef?.parentNode as any)?.getBoundingClientRect().height : this.rootRef?.getBoundingClientRect().height
                cellItemHeight = bodyHeight ? parseInt((bodyHeight / 4).toString()) : 81
                let selectCell = this.rootRef?.querySelectorAll('.wui-calendar-month-panel-month')
                if (selectCell && selectCell?.length > 0) {
                    selectCell.forEach((item: any) => {
                        item.style.height = cellItemHeight + 'px'
                    })
                }
            } else if (_type === 'date') {
                let selectCell = this.rootRef?.querySelectorAll('.wui-calendar-mutiple-selected-day')
                if (selectCell && selectCell?.length > 0) {
                    selectCell.forEach((item: any) => {
                        item.style.height = cellItemHeight + 'px'
                    })
                }
            }
            this.setState({
                cellHeight: cellItemHeight
            })
            let cellBody = this.rootRef?.querySelectorAll('.wui-calendar-cell-body-drag')
            if (cellBody && cellBody?.length > 0) {
                cellBody.forEach((item: any) => {
                    item.style.height = (cellItemHeight - 30 - (cellItemHeight - 30) % 20) + 'px'
                })
            }
        }, 100)
    }

    renderFullDefaultDate = (current: Moment) => {
        const {clsPrefix, allowLunar} = this.props;
        const headerChilds =
            [
                <span key={current.format('YYYY-MM-DD') + "_span"} className={`${clsPrefix}-cell-header-date ${clsPrefix}-cell-header-solarday`}>
                    {current.date()}
                </span>
            ];
        if (allowLunar) {
            headerChilds.push(
                <span key={current.format('YYYY-MM-DD') + 'lunar-day'} className={`${clsPrefix}-cell-header-date ${clsPrefix}-cell-header-lunarday`}>
	                {
                        getLunarContent(current)
                    }
	            </span>
            )
        }
        return headerChilds;
    }
    onTimeEventsClick = (e: React.MouseEvent<HTMLElement>, value: EventObjectInput, time: Moment) => {
        if (this.props.onTimeEventsClick) {
            this.props.onTimeEventsClick(e, value, time)
        }
    }
    // 渲染全天事件
    renderAllDayEvents = () => {
        const {clsPrefix, timeEvents, fieldid, locale, createAdd} = this.props;
        let { isFlag } = this.state
        let allDayArr: EventObject[] = [];
        let allDayArray: EventObject[] = [];
        // 获取所有全天事件存入数组allDayArr
        timeEvents?.forEach(item => {
            splitFirst(generateM()(item.start).format('YYYY-MM-DD HH:mm'))[0] !== splitFirst(generateM()(item.end).format('YYYY-MM-DD HH:mm'))[0] ? allDayArr.push(item) : null
        })
        // 控制只在相关时间内显示对应全天事件
        allDayArr.forEach(item => {
            let now = generateM()(this.state.value.format('YYYY-MM-DD') + ' 00:00').valueOf();
            let startDate = (new Date(generateM()(item.start).format('YYYY-MM-DD') + ' 00:00')).valueOf();
            let endDate = (new Date(generateM()(item.end).format('YYYY-MM-DD') + ' 00:00')).valueOf();
            !(Number(startDate) > Number(now)) && !(Number(endDate) < Number(now)) && allDayArray.push(item)
        })
        if (allDayArray.length !== 0) {
            let contentCx = cx({
                [`${clsPrefix}-allDay-container-right`]: true,
	            [`${clsPrefix}-allDay-container-unfold`]: this.state.isFlag
            })
            return (
                <div className={`${clsPrefix}-allDay-container`} fieldid={fieldid ? `${fieldid}_allDay_container` : undefined}>
                    <div className={`${clsPrefix}-allDay-container-left`}>{getLangInfo(locale, i18n, 'calendar').langMap.allDay}</div>
                    <ul className={contentCx}>
                        {createAdd}
                        {allDayArray.map((allItem: EventObject, allIndex: number) => {
                            allItem.content = getChildrenText(allItem.content).join('')
                            // 全天事件渲染时显示的文本信息，包括时间和事件
                            let content = generateM()(allItem.start).format('YYYY-MM-DD HH:mm') + ' - ' + generateM()(allItem.end).format('YYYY-MM-DD HH:mm') + ' ' + allItem.content;
                            // 点击全天事件时打印出的参数，包括起始时间和事件名称
                            let valueTemp = {start: generateM()(allItem.start).format('YYYY-MM-DD HH:mm'), end: generateM()(allItem.end).format('YYYY-MM-DD HH:mm'), content: allItem.content}
                            return (
                                <li key={allIndex} className={`${allItem.className ? allItem.className : ''}`} fieldid={fieldid ? `${fieldid}_allDayEvents_${allIndex}` : undefined} onClick={(e) => this.onTimeEventsClick(e, valueTemp, generateM()(this.state.value.format('YYYY-MM-DD') + ' 00:00:00'))}>{content}</li>
                            )
                        })}
                        {
                            allDayArray?.length > 3 && !isFlag ? <li className={`${clsPrefix}-allDay-container-unfold-btn`} onClick={this.onClickUnfold}>展开</li> : null
                        }
                    </ul>
                </div>
            );
        }
    }

    onClickUnfold = () => {
        this.setState({
            isFlag: true
        })
    }

    renderDefaultMonth = (current: Moment, _value: Moment) => {
        let { clsPrefix, locale, mutiple, moreRender, isDragEvent } = this.props
        const headerChilds =
			[<span key={current.format('YYYY-MM-DD') + "_span"} className={`${clsPrefix}-cell-header-date ${clsPrefix}-cell-header-today`}>
			    { mutiple && current.date() === 1 ? formatMonth(current.month(), getLangInfo(locale, i18n, 'calendar').langMap) : current.format('MMM')}
			</span>];
        let header = <div className={`${clsPrefix}-cell-header`}>{headerChilds}</div>
        const body = <div className={
            cx({
                [`${clsPrefix}-cell-body`]: true,
                [`${clsPrefix}-cell-body-drag`]: isDragEvent
            })
        }></div>
        let moreDom = moreRender ? moreRender(current) : null
        return (
            <div className={`${clsPrefix}-month-cell-box`}>
                {header}
                {body}
                {moreDom ? <div className={`${clsPrefix}-more-event`}>{moreDom}</div> : null}
            </div>
        )
    }

    renderFullBody = () => {
        const {clsPrefix, fieldid, mutiple, dateCellRender, fillSpace, locale, renderDateHeaderCell, timeEvents, showTimeLine, onTimeEventsClick, layout, headerRender, customInterval, showSingleMonth, isDragEvent, ...others} = this.props;
        const {value: stateValue, fillSpaceStyle} = this.state;
        let monthRender = this.state.type === 'month' && isDragEvent ? this.renderDefaultMonth : this.props.monthCellContentRender || this.props.monthFullCellRender;
        // const _locale = getLangInfo(locale, i18n)
	    const _locale = getLangInfo(locale, i18n, 'calendar')
	    stateValue.locale(_locale.lang)
	    const valueYear = stateValue.year();
        let value1 = stateValue
        if (!showSingleMonth) {
            value1 = generateM()(`${valueYear}-01-01`);
        }
        const cls = cx({
	        [`${clsPrefix}-full-body`]: true,
	        [`${clsPrefix}-display-sing-month`]: !!showSingleMonth
	    });
	    let dataRender = dateCellRender || this.renderDefaultDate;

        if (this.state.type === 'date') {
            return (
	            <div className={cls}>
	                <div ref={(ref) => this.scrollDiv = ref}>
	                    <FullCalendar
	                        prefixCls={clsPrefix}
	                        Select={Select}
	                        fieldid={fieldid}
	                        renderDateHeaderCell={this.renderDateHeaderCell}
	                        renderSelectRow={this.renderSelectRow}
	                        dateCellRender={dataRender}
	                        disabledDate={() => false}
                            headerRender={() => null}
	                        locale={_locale.langMap}
	                        lang={_locale.lang}
	                        getDateCellAttr={this.getDateCellAttr}
                            onTimeEventsClick={onTimeEventsClick}
                            showSingleMonth={!!showSingleMonth}
                            calendar={generate}
	                        {...others}
	                        value={value1}
	                        mutiple={mutiple}
	                        scrollAttrs={{onScroll: this.orderScroll, style: fillSpaceStyle, className: fillSpace ? `${clsPrefix}-fill-space-init` : ``}}
                            onChange={this.onChange}
	                    />
	                </div>
	            </div>
	        )
        } else if (this.state.type === 'hour') {
            return (
                <CalendarHourBody
                    clsPrefix={clsPrefix}
                    fieldid={fieldid}
                    value={this.state.value}
                    timeEvents={timeEvents}
                    showTimeLine={showTimeLine}
                    current={this.state.current}
                    onTimeEventsClick={onTimeEventsClick}
                    layout={layout}
                    customInterval={customInterval}
                    onCreateEvent={this.props.onCreateEvent}
                    silderModalBody={this.props.silderModalBody}
                    silderModalHeader={this.props.silderModalHeader}
                    onModalOk={this.props.onModalOk}
                    isDragEvent={this.props.isDragEvent}
                    locale={_locale.langMap}
                    isEditEvent={this.props.isEditEvent}
                    onHourBodyScroll={this.props.onHourBodyScroll}
                />
            )
        } else if (this.state.type === 'week') {
            return (
                <CalendarWeekBody
                    clsPrefix={clsPrefix}
                    fieldid={fieldid}
                    value={this.state.value}
                    // timeEvents={timeEvents}
                    weekTimeEvents={this.props.weekTimeEvents}
                    showTimeLine={showTimeLine}
                    current={this.state.current}
                    onTimeEventsClick={onTimeEventsClick}
                    // layout={layout}
                    customInterval={customInterval}
                    onCreateEvent={this.props.onCreateEvent}
                    silderModalBody={this.props.silderModalBody}
                    silderModalHeader={this.props.silderModalHeader}
                    onModalOk={this.props.onModalOk}
                    isDragEvent={this.props.isDragEvent}
                    weekStartsOn={this.props.weekStartsOn}
                    locale={_locale.langMap}
                    isEditEvent={this.props.isEditEvent}
                />
            )
        } else {
            return (
	            <FullCalendar
	                prefixCls={clsPrefix}
	                Select={Select}
	                fieldid={fieldid}
	                headerRender={() => null}
	                locale={_locale.langMap}
	                lang={_locale.lang}
                    calendar={generate}
	                {...others}
                    monthCellContentRender={monthRender}
	                value={stateValue}
	                type="month"
	                onChange={this.onChange}
	            />
	        )
        }
    }

    setSelectValue = (val: Moment) => {
        let {onSelectChange, isDragEvent, strideValue} = this.props
        this.setState({
            value: val
        })
        if (isDragEvent) {
            this.setCreatDom(strideValue || [])
        }
        onSelectChange && onSelectChange(val)
    }

    mutiRender = () => {
        const {clsPrefix, layout, quickSelect, fieldid, showTimeLine, onTimeEventsClick, locale, timeEvents, headerRender, hourCellRender, hourCellContentRender, sidebar, customInterval, bodyClassName, silderModalHeader, silderModalBody, isShowWeek} = this.props;
        const {value: stateValue, hourFillSpaceStyle} = this.state;
        // const _locale = getLangInfo(locale, i18n)
	    const _locale = getLangInfo(locale, i18n, 'calendar')
	    stateValue.locale(_locale.lang)
        const classPosition = cx({
	        [`${clsPrefix}-root-right`]: layout !== 'left',
	        [`${clsPrefix}-root-left`]: layout === 'left',
            [`${clsPrefix}-root-nosidebar`]: !sidebar,
	    });
        let intervalNum = (24 / customInterval) % 1 == 0 ? customInterval : 1;
        const classTime = cx({
            [`${clsPrefix}-root-hour`]: this.state.type === 'hour',
            [`${clsPrefix}-root-week`]: this.state.type === 'week',
            [`${clsPrefix}-root-date`]: this.state.type === 'date',
            [`${clsPrefix}-root-hour-customInterval`]: intervalNum > 1
        });
        const classBody = cx({
            [`${clsPrefix}-schedule`]: true,
            [`${bodyClassName}`]: bodyClassName,
        })
        return (
            <div className={cx(classPosition, classTime, {[`${clsPrefix}-root`]: true, [`${clsPrefix}-quick-select`]: quickSelect})} fieldid={fieldid} ref={(ref) => this.rootRef = ref}>
	            <CalendarHeader
	                key="calendar-header"
	                {...this.props}
	                prefixCls={`${clsPrefix}-full`}
	                type={this.state.type}
	                locale={_locale.langMap}
                    lang={_locale.lang}
	                Select={Select}
	                fieldid={fieldid}
	                value={stateValue}
                    headerComponents={headerRender}
	                onTypeChange={this.typeChange}
	                onValueChange={this.headerChangeYear}
	                showTypeSwitch={false}
                    setSelectValue={this.setSelectValue}
                    isShowWeek={isShowWeek}
	            />
	            <div className={classBody}>
                    {timeEvents && this.state.type == 'hour' ? this.renderAllDayEvents() : null}
                    <div className={`${clsPrefix}-scrollWrap`} style={{...hourFillSpaceStyle}}>
                        {this.renderFullBody()}
                        {
                            ((sidebar || this.state.type === "hour") && this.state.type !== "week") && (
                                <CalendarSider key="calendar-sider"
                                    prefixCls={clsPrefix}
                                    lang={_locale.lang}
                                    localeData={_locale.langMap}
                                    value={stateValue}
                                    fieldid={fieldid}
                                    onMonthChange={this.onChange}
                                    type={this.state.type == 'hour' ? 'hour' : undefined}
                                    onTimeEventsClick={onTimeEventsClick}
                                    showTimeLine={showTimeLine}
                                    hourCellRender={hourCellRender}
                                    hourCellContentRender={hourCellContentRender}
                                    customInterval={customInterval}
                                />
                            )
                        }
                    </div>
                </div>
                <Modal visible={this.state.modalVisible} mask onMaskClick={this.onMaskClick} onCancel={this.onCancel}>
                    <Modal.Header closeButton>
	                    {silderModalHeader ? silderModalHeader : _locale.langMap.modalHeader}
	                </Modal.Header>
	                <Modal.Body>
	                    <div tinper-next-role="container">
                            {silderModalBody ? silderModalBody : _locale.langMap.modalBody}
	                    </div>
	                </Modal.Body>
	                <Modal.Footer>
	                    <Button onClick={this.onMaskClick} colors="secondary" style={{ marginRight: 8 }}>{_locale.langMap.cancel}</Button>
	                    <Button onClick={this.onOk} colors='primary'>{_locale.langMap.ok}</Button>
	                </Modal.Footer>
                </Modal>
	        </div>
        )
    }

    render() {
	    const {clsPrefix, mutiple, onSelect, locale, fieldid, disabledDate, getDateCellAttr, onTimeEventsClick, headerComponent, markWeekend, style, fillSpace
            , className, weekStartsOn, onPanelChange, onTypeChange, dateCellContentRender, dateFullCellRender, monthCellContentRender, monthFullCellRender} = this.props;
	    const {value: stateValue, fillSpaceStyle} = this.state;
	    const _locale = getLangInfo(locale, i18n, 'calendar')
	    stateValue.locale(_locale.lang)
        let styleRoot = style || {};
        let classNameRoot = className || "";
        if (fillSpace) {
            styleRoot = {height: 0, ...styleRoot, ...fillSpaceStyle};
            classNameRoot = cx(`${clsPrefix}-fill-space`, className)
        }
        const _weekStartsOn = getWeekStartsOn(weekStartsOn)
        if ((_weekStartsOn === 'SUNDAY' || _weekStartsOn === 0) && !this.props.fullscreen && headerComponent && _locale?.lang == 'en-us') {
            moment.locale(_locale.lang, getMomentConfig(_weekStartsOn))
        }

	    return (
	        mutiple ? this.mutiRender() : <FullCalendar
	            prefixCls={clsPrefix}
	            Select={Select}
	            onSelect={onSelect}
	            fieldid={fieldid}
	            getDateCellAttr={getDateCellAttr}
                onTimeEventsClick={onTimeEventsClick}
                onTypeChange={onPanelChange || onTypeChange}
                dateCellContentRender={dateCellContentRender || dateFullCellRender || this.renderFullDefaultDate}
                monthCellContentRender={monthCellContentRender || monthFullCellRender}
                calendar={generate}
	            {...this.props}
                showSingleMonth={true}
                defaultType={this.props.mode || this.props.defaultType}
	            disabledDate={disabledDate ? _disabledDate(disabledDate) : disabledDate}
	            locale={_locale.langMap}
	            lang={_locale.lang}
	            onChange={this.onChange}
	            headerComponent={headerComponent}
	            renderDateHeaderCell={this.renderDateHeaderCell}
                markWeekend={markWeekend}
                ref={(r: any) => this.rootRef = r?.rootInstance}
                style={styleRoot}
                className={classNameRoot}
                weekStartsOn={_weekStartsOn === 'MONDAY' ? 1 : _weekStartsOn == undefined ? 0 : _weekStartsOn}
                // weekStartsOn={weekStartsOn}
	        />
	    )
    }
}

export default Calendar as React.ComponentClass<Partial<CalendarProps<null>>>;

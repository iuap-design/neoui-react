import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Affix from '../../wui-affix/src'
import Icon from '../../wui-icon/src'
// import {createChainedFunction} from '../../wui-core/src';
import {getNid, WebUI, createChainedFunction, debounce} from "../../wui-core/src/index"
import Menu from '../../wui-menu/src';
import Dropdown from '../../wui-dropdown/src';
import ResizeObserver from 'resize-observer-polyfill';
import { AntdAnchorProps, AnchorHorizontalState } from './iAnchor'
import AntdAnchorLink from './AntdAnchorLink';

const {Item} = Menu

const perchWidth = 78 // 出现左右箭头和下拉时，占位的宽度

// const propTypes = {
//     getContainer: PropTypes.func, // 指定滚动的容器
//     affix: PropTypes.bool, // 固定模式
//     offsetTop: PropTypes.number, // 距离窗口顶部达到指定偏移量后触发
//     showInkInFixed: PropTypes.bool, // affix={false} 时是否显示小圆点
//     onChange: PropTypes.func, // 监听锚点链接改变
//     onClick: PropTypes.func, // click 事件的回调
//     style: PropTypes.oneOfType([
//         PropTypes.object,
//         PropTypes.string
//     ]),
//     fieldid: PropTypes.string,
//     activeKey: PropTypes.string
// };
const defaultProps = {
    // getContainer: () => window,
    prefixCls: 'wui-anchor',
    affix: true,
    offsetTop: 0,
    showInkInFixed: false,
    onChange: null,
    onClick: null
};

@WebUI({name: "anchor", defaultProps})
class AntdAnchor extends Component<AntdAnchorProps, AnchorHorizontalState> {
	startIndex: number;
	endIndex: number;
	activeKeyNum: number;
	hrefArr: string[];
	isScroll: boolean;
	debouncedResize: any;
	resizeObserver: any;
	anchorRef!: HTMLElement;
	wrapperRef!: HTMLElement;
	dropDownStatus?: boolean;
	arrowStatus?: boolean;
	prevScreenItem?: number[];
	onscrollTo?: () => void;
	prevTransitionEnd?: () => void;
	contentDom?: HTMLElement;
	rightNumber: number;
	leftNumber: number;
	// wrapperRef!: React.RefObject<HTMLElement>
	constructor(props: AntdAnchorProps) {
	    super(props)
	    // this.offset = 0;
	    // this.scrollNumNext = 0; // 右翻页偏移量
	    // this.scrollNumPrev = 0; // 左翻页偏移量
	    // this.offsetNum = 0
	    this.startIndex = 0 // 当前屏幕开始位置节点下标
	    this.endIndex = 0 // 当前屏幕结束位置节点下标
	    this.activeKeyNum = 0 // 锚点内容滚动时锚点切换的临界值
	    this.prevScreenItem = []
	    this.state = {
	        activeKey: props.activeKey,
	        next: false,
	        prev: false,
	        prevStatus: false,
	        nextStatus: false,
	        menuArr: '',
	        scrollX: 0, // X轴滚动距离
	        wrapperW: 0,
	        anchorItems: [], // 所有锚点尺寸
	        allItemW: 0, // 所有节点总宽
	    }
	    // this.wrapperRef = React.createRef();
	    this.handleSelect = this.handleSelect.bind(this);
	    this.hrefArr = [];
	    this.isScroll = true;
	    this.rightNumber = 1
	    this.leftNumber = 1
	}

	componentDidMount() {
	    let {children, activeKey, items} = this.props
	    this.calculateW()
	    if (items && items.length > 0) {
	        this.setState({
	            activeKey: activeKey || items[0]?.href
	        })
	        items.map((item: {key: string, href: string, title: string}) => {
	            this.hrefArr.push(item.href)
	        })
	    } else {
	        React.Children.map(children, (child: React.ReactElement, index) => {
	            this.hrefArr.push(child.props.href)
	            if (index === 0) {
	                this.setState({
	                    activeKey: activeKey || child.props.href
	                })
	            }
	        })
	    }
	    if (this.props?.getContainer === undefined) {
	        document.addEventListener('scroll', this.scrollHand)
	    } else {
	        this.props?.getContainer()?.addEventListener('scroll', this.scrollHand)
	    }
	    this.setState({
	        wrapperW: this.getOffsetWH(this.wrapperRef)
	    }, ()=>{
	        this.setNextPrev();
	    })
	    this.debouncedResize = debounce(() => {
	        this.setState({
	            wrapperW: this.getOffsetWH(this.wrapperRef)
	        }, () => {
	            this.setNextPrev();
	            setTimeout(()=>{
	                this.getMenuItem(0);
	            }, 200)
	        })
	    }, 200);
	    this.resizeObserver = new ResizeObserver(this.debouncedResize);
	    this.resizeObserver.observe(this.wrapperRef);
	    this.getMenuItem(0)
	}
	UNSAFE_componentWillReceiveProps(nextProps: Readonly<AntdAnchorProps>): void {
	    if ('activeKey' in nextProps && this.props.activeKey !== nextProps.activeKey) {
	        this.setState({
	            activeKey: nextProps.activeKey
	        })
	        document.getElementById(nextProps?.activeKey as string)?.scrollIntoView(true)
	    }
	}

	componentWillUnmount() {
	    // document.removeEventListener('scroll', this.scrollHand)
	    if (this.props?.getContainer === undefined) {
	        document.removeEventListener('scroll', this.scrollHand)
	    } else {
	        this.props?.getContainer()?.removeEventListener('scroll', this.scrollHand)
	    }
	    if (this.resizeObserver) {
	        this.resizeObserver.disconnect();
	    }
	}

    // 初始化计算所有节点宽
    calculateW = () => {
        let { prefixCls } = this.props
        let domNode = Array.prototype.slice.call(this.wrapperRef!.children[1].children)
        let allItems:{key: number | string, width: number, left: number, href: string}[] = []
        let allItemW: number = 0
        domNode.forEach((item, index) => {
            // this.anchorItems = [...this.anchorItems, {key: index}]
            let itemW = item.offsetWidth + parseFloat(getComputedStyle(item, null).marginRight) + parseFloat(getComputedStyle(item, null).marginLeft)
            let itemLeft = item.offsetLeft
            let href = item?.querySelector(`.${prefixCls}-link-title`)?.getAttribute('href')
            allItems = [...allItems, {key: index, width: itemW, left: itemLeft, href}]
        })
        for (let i = 0; i < allItems.length; i++) {
            allItemW += allItems[i].width
        }
        this.setState({
            anchorItems: [...allItems],
            allItemW: allItemW // active时当前激活元素margin-left添加为16
            // wrapperW1: this.getOffsetWH(this.wrapperRef)
        })
        return {
            anchorItems: [...allItems],
            allItemW
        }
    }

	// 获取首屏项
	getFirstScreenItem = () => {
	    let { anchorItems, wrapperW } = this.state
	    let screenItemArr = [] // 首屏能显示的项
	    let itemWtotal = 0
	    // for (let i = this.state.startIndex; i < anchorItems.length - 1; i++) {
	    for (let i = 0; i < anchorItems.length - 1; i++) {
	        itemWtotal += anchorItems[i].width
	        if (itemWtotal < wrapperW - perchWidth) {
	            screenItemArr.push(i)
	        }
	    }
	    return screenItemArr
	}

	// 滚动时计算startIndex
	getStartIndex = (index: number) => {
	    let { anchorItems, wrapperW } = this.state
	    let screeItemW = 0
	    let screenItemArr = []
	    for (let i = index; i > 0; i--) {
	        screeItemW += anchorItems[i].width
	        if (screeItemW < wrapperW - perchWidth) {
	            screenItemArr.push(i)
	        }
	    }
	    return screenItemArr
	}

	// 滚动页面时切换锚点项
	scrollItem = (index: number) => {
	    let { scrollX, anchorItems, wrapperW, next, allItemW } = this.state
	    let screenItemArr = this.getFirstScreenItem() // 首屏你那能显示的项
	    // let itemWtotal = 0
	    if (!next) {
	        return
	    }
	    // for (let i = this.state.startIndex; i < anchorItems.length - 1; i++) {
	    // for (let i = 0; i < anchorItems.length - 1; i++) {
	    //     itemWtotal += anchorItems[i].width
	    //     if (itemWtotal < wrapperW - perchWidth) {
	    //         screenItemArr.push(i)
	    //     }
	    // }
	    let scrollItem = this.getStartIndex(index)
	    if (this.activeKeyNum != index && index > this.activeKeyNum && !screenItemArr.includes(index) && this.state.scrollX != -(allItemW - (wrapperW - perchWidth))) { // 向下滑动内容区是，控制锚点项滚动
	        let newScrollX = 0
	        let firsrScreeItemW = 0
	        if (screenItemArr.length == index) { // 首屏后面临界值显示了某个节点的一部分内容时，滚动距离不应为当前节点的宽度需要计算
	            for (let i = 0; i < screenItemArr.length + 1; i++) {
	                firsrScreeItemW += anchorItems[i].width
	            }
	            newScrollX = scrollX - (firsrScreeItemW - wrapperW + perchWidth)
	        } else { // 滚动时候移动一个节点宽
	            newScrollX = scrollX - this.state.anchorItems[index].width
	        }
	        if (anchorItems.length - 1 == index) {
	            this.setState({
	                nextStatus: true
	            })
	        }
	        this.setState({
	            scrollX: newScrollX,
	            prevStatus: false
	        })
	        this.startIndex = scrollItem.sort()[0] - 1
	    }
	    if (this.activeKeyNum != index && index > this.activeKeyNum && !screenItemArr.includes(index)) { // 不管移动与否，activeKeyNum都要更新
	        this.activeKeyNum = index
	    }
	    if (this.activeKeyNum != index && index < this.activeKeyNum && !(index < screenItemArr[screenItemArr.length - 1]) && this.state.scrollX != 0) {
	        let newScrollX = 0
	        let firsrScreeItemW = 0
	        if (screenItemArr.length - 1 == index) { // 首屏后面临界值显示了某个节点的一部分内容时，滚动距离不应为当前节点的宽度需要计算
	            // debugger
	            for (let i = 0; i < screenItemArr.length + 1; i++) {
	                firsrScreeItemW += anchorItems[i].width
	            }
	            newScrollX = scrollX + (firsrScreeItemW - wrapperW + perchWidth)
	        } else { // 滚动时候移动一个节点宽
	            newScrollX = scrollX + this.state.anchorItems[this.activeKeyNum].width
	        }
	        if (index == 1) {
	            this.setState({
	                prevStatus: true
	            })
	            this.startIndex = 0
	        }
	        this.setState({
	            scrollX: newScrollX,
	            nextStatus: false
	        })
	    }
	    // 特殊情况，当点击翻页之后，在点击当前屏幕首项，则activeKeyNum在左侧第一项，向上滚动时，激活项为首屏项时位置归0
	    if (this.activeKeyNum != index && index < this.activeKeyNum && index < screenItemArr[screenItemArr.length - 1] && this.prevScreenItem?.includes(this.activeKeyNum) && this.activeKeyNum != this.prevScreenItem[this.prevScreenItem.length - 1]) {
	        this.setState({
	            scrollX: 0,
	            nextStatus: false
	        })
	        this.prevScreenItem = []
	    }
	    if (this.activeKeyNum != index && index < this.activeKeyNum && !(index < screenItemArr[screenItemArr.length - 1])) {
	        this.activeKeyNum = index
	    }
	    // 滚动到第一屏时左箭头失效
	    if (this.activeKeyNum != index && index < this.activeKeyNum && (index < screenItemArr[screenItemArr.length - 1])) {
	        this.setState({
	            prevStatus: true
	        })
	    }
	    this.getMenuItem(index)
	}

	scrollHand = () => {
	    if (this.isScroll) {
	        this.hrefArr.forEach((item, index) => {
	            if (this.props.getContainer === undefined) {
	                let getContentH = document.getElementById(item) == undefined ? 0 : document.getElementById(item)!?.getBoundingClientRect().height
	                // let contentY = document.getElementById(item) == undefined ? 0 : document.getElementById(item)!?.getBoundingClientRect().y
	                let contentY = document.getElementById(item) == undefined ? document.getElementById(this.props?.curAnchorItem as string) == undefined ? 0 : document.getElementById(this.props?.curAnchorItem as string)!.getBoundingClientRect().y : document.getElementById(item)!.getBoundingClientRect().y
	                if (-getContentH < contentY && contentY <= 0) {
	                    this.setState({
	                        activeKey: item
	                    })
						if (!this.props?.curAnchorItem) {
							this.scrollItem(index)
						}
	                }
	            } else {
	                if (typeof this.props?.getContainer === 'function') {
	                    // getContainer传入的元素的位置，锚点滚动内容位置
	                    let getContentY = this.props.getContainer() == undefined ? 0 : this.props.getContainer()?.getBoundingClientRect().y
	                    // let contentY = document.getElementById(item) == undefined ? 0 : document.getElementById(item)!.getBoundingClientRect().y
	                    let contentY = document.getElementById(item) == undefined ? document.getElementById(this.props?.curAnchorItem as string) == undefined ? 0 : document.getElementById(this.props?.curAnchorItem as string)!.getBoundingClientRect().y : document.getElementById(item)!.getBoundingClientRect().y
	                    if (getContentY - contentY <= contentY && contentY <= getContentY) {
	                        this.setState({
	                            activeKey: item
	                        })
	                        if (!this.props?.curAnchorItem) {
								this.scrollItem(index)
							}
	                    }
	                }
	            }

	        })
	    }
	    setTimeout(() => {
	        this.isScroll = true
	    }, 10);

	}
	handleSelect(val: {href: string, title: string}) {
	    let { anchorItems, wrapperW, scrollX, next, allItemW } = this.state
	    this.setState({activeKey: val.href});
	    this.isScroll = false;
	    // let { title, href } = val
	    if (this.props.onClick) {
	        this.props.onClick(val)
	    }
	    if (this.props.onChange) {
	        this.props.onChange(val.href)
	    }
	    if (!next) { // 不是多锚点情况不用进行之后的计算
	        return
	    }
	    let itemWtotal = 0
	    let screenItemArr = []
	    // for (let i = this.state.startIndex; i < anchorItems.length - 1; i++) {
	    for (let i = this.startIndex; i < anchorItems.length - 1; i++) {
	        itemWtotal += anchorItems[i].width
	        if (itemWtotal < wrapperW - perchWidth) {
	            screenItemArr.push(i)
	        }
	    }
	    this.startIndex = screenItemArr[0]
	    let firsrScreeItemW = 0, newScrollX = 0
	    if (anchorItems[screenItemArr[screenItemArr.length - 1] + 1]?.href == val.href && val.href != anchorItems[anchorItems.length - 1]?.href) {
	        for (let i = screenItemArr[0]; i < screenItemArr[screenItemArr.length - 1] + 2; i++) {
	            firsrScreeItemW += anchorItems[i].width
	        }
	        newScrollX = scrollX - (firsrScreeItemW + 13 - wrapperW + perchWidth) // 13为锚点项active时和非active时的宽度差值
	        this.setState({
	            scrollX: newScrollX
	        })
	        this.activeKeyNum = screenItemArr[screenItemArr.length - 1] + 1
	        this.startIndex = screenItemArr[screenItemArr.length - 1] + 1
	        this.endIndex = screenItemArr[screenItemArr.length - 1] + 1 // 此时的endIndex值做更新下拉项使用
	    }
	    // 当最后一项显示不全时，点击显示全移动距离
	    if (anchorItems[screenItemArr[screenItemArr.length - 1] + 1]?.href == val.href && val.href == anchorItems[anchorItems.length - 1]?.href) {
	        let offsetX = 0
	        offsetX = allItemW - (wrapperW - perchWidth)
	        this.setState({
	            scrollX: -offsetX
	        })
	        this.endIndex = anchorItems.length - 1
	    }
	    if (screenItemArr[0] != 0) { // 当前屏幕项第一项不完全显示时，并且不是总体项第一项时进行此操作，时当前屏幕项展示完全
	        let warpperX = this.wrapperRef.getBoundingClientRect().x
		    let anchorX = this.anchorRef.getBoundingClientRect().x
	        this.prevScreenItem = screenItemArr
	        if (anchorItems[screenItemArr[0]]?.href == val.href) {
	            newScrollX = scrollX + (warpperX - anchorX - anchorItems[screenItemArr[0]].left) + 16
	            this.setState({
	                scrollX: newScrollX
	            })
	            // this.startIndex = screenItemArr[0] - 1
	            this.endIndex = screenItemArr[screenItemArr.length - 1]
	        }
	    }
	    if (val.href == anchorItems[anchorItems.length - 1].href) { // 当点击最后一个锚点项是记录activeKeyNum的值为当前值
	        this.activeKeyNum = anchorItems.length - 1
	    }
	    anchorItems.forEach((item, index) => { // 点击项时，设置this.activeKeyNum,保证滚动时拿到正确的值
	        if (val.href == item.href) {
	            this.activeKeyNum = index
	        }
	    })
	    if (val.href == anchorItems[0].href) {
	        this.setState({
	            scrollX: 0
	        })
	        this.activeKeyNum = 0
	        this.startIndex = 0
	        this.endIndex = 0 // 此时相当回到最初始状态
	    }
	    this.getMenuItem(this.endIndex)
	}

	// 获取元素宽度
	getOffsetWH = (node: HTMLElement) => {
	    let prop = 'offsetWidth';
	    return node ? node[prop] : 0;
	}

	// 是否显示左右箭头
    setNextPrev = () => {
        const navNode = this.wrapperRef;
        // const navNodeWH = this.getOffsetWH(navNode);
        const containerWH = this.getOffsetWH(this.anchorRef) + 1;
        let { wrapperW } = this.state
        // const navWrapNodeWH = this.getOffsetWH(this.props.getRef('navWrap'));
        const minOffset = containerWH - wrapperW;
        // let { next, prev } = this.state;
        if (navNode.getBoundingClientRect().x == this.anchorRef.getBoundingClientRect().x) {
            this.setState({
                prevStatus: true
            })
        }
        if (minOffset > 0) {
            // next = true;
            this.setState({
                next: true
            })
        } else {
            // next = false;
            this.setState({
                next: false
            })
        }

        let {prev, next} = this.state
        let showArrow = prev || next
        if (showArrow) {
            this.wrapperRef.style.paddingRight = perchWidth + 'px'
        }
    }

	// 右翻页
	next = () => {
	    this.dropDownStatus = false
	    this.arrowStatus = true
	    this.setState({
	        prevStatus: false
	    })

	    // 修改后
	    let { scrollX } = this.state
	    let { anchorItems, allItemW } = this.calculateW()
	    let wrapperW = this.getOffsetWH(this.wrapperRef)
	    let itemWtotal = 0
	    let screenItemArr = []
	    // for (let i = this.state.startIndex; i < anchorItems.length - 1; i++) {
	    for (let i = this.startIndex; i < anchorItems.length - 1; i++) {
	        itemWtotal += anchorItems[i].width
	        if (itemWtotal < wrapperW - perchWidth) {
	            screenItemArr.push(i)
	        }
	    }

	    this.startIndex = screenItemArr[0]
	    this.endIndex = screenItemArr[screenItemArr.length - 1] + 1
	    // 计算移动的距离
	    let offsetX = 0
	    // 分情况（当可视区后面部分的宽度小于可视区时，移动的距离因为可是去后部分宽度）
	    let afterW = 0
	    // console.log('第一次计算的endx', this.endIndex)
	    // for (let i = this.state.endIndex; i < anchorItems.length; i++) {
	    // for (let i = this.endIndex; i < anchorItems.length; i++) {
	    //     afterW += anchorItems[i].width
	    // }
	    afterW = this.anchorRef.getBoundingClientRect().width - (wrapperW - perchWidth) * this.rightNumber
	    if (afterW <= wrapperW - perchWidth) {
	        // offsetX = anchorItems[anchorItems.length - 1].left + anchorItems[anchorItems.length - 1].width - wrapperW + perchWidth - 8
	        // let newScrollX = -offsetX
	        let newScrollX = -(allItemW - (wrapperW - perchWidth))
	        this.setState({
	            scrollX: newScrollX,
	            nextStatus: true
	        })
	        // 计算startIndex
	        let nextScreenIndex = 0
	        let startIndexArr = []
	        for (let i = anchorItems.length - 1; i > 0; i--) {
	            nextScreenIndex += anchorItems[i].width
	            if (nextScreenIndex >= wrapperW - perchWidth) {
	                startIndexArr.push(i)
	            }
	        }
	        this.startIndex = startIndexArr[0]
	        // this.startIndex = this.endIndex + 1
	        this.endIndex = anchorItems.length - 1
	    } else {
	        for (let i = 0; i < anchorItems.length; i++) {
	            // offsetX += anchorItems[i].width
	            for (let j = 0; j < screenItemArr.length; j++) {
	                if (i == screenItemArr[j]) {
	                    offsetX += anchorItems[i].width
	                }
	            }
	        }
	        offsetX = wrapperW - perchWidth
	        let newScrollX = scrollX - offsetX
	        this.setState({
	            scrollX: newScrollX
	        })
	        // let nextStartIndex = this.state.endIndex
	        let nextStartIndex = this.endIndex
	        this.startIndex = nextStartIndex
	    }
	    this.rightNumber++
	    if (this.leftNumber > 1) {
	        this.leftNumber--
	    }
	    this.getMenuItem(this.endIndex + 1)
	}

	// 左翻页
	prev = () => {
	    this.dropDownStatus = false
	    this.arrowStatus = true
	    this.setState({
	        nextStatus: false
	    })
	    // 修改后
	    let { scrollX } = this.state
	    let { anchorItems } = this.calculateW()
	    let wrapperW = this.getOffsetWH(this.wrapperRef)
	    let itemWtotal = 0
	    let screenItemArr = []
	    for (let i = this.endIndex - 1; i >= 0; i--) {
	        itemWtotal += anchorItems[i]?.width
	        if (itemWtotal < wrapperW - perchWidth) {
	            screenItemArr.push(i)
	        }
	    }
	    // 计算移动的距离
	    let offsetX = 0
	    screenItemArr.sort()
	    this.startIndex = screenItemArr[0]
	    this.endIndex = screenItemArr[screenItemArr.length - 1] + 1

	    // 分情况（当可视区前面部分的宽度小于可视区时，移动的距离应为最初距离）
	    let beforeW = 0
	    // for (let i = 0; i < this.startIndex; i++) {
	    //     beforeW += anchorItems[i].width
	    // }
	    beforeW = this.anchorRef.getBoundingClientRect().width - (wrapperW - perchWidth) * this.leftNumber
	    if (beforeW <= wrapperW - perchWidth) {
	        offsetX = 0
	        let newScrollX = offsetX
	        this.setState({
	            scrollX: newScrollX,
	            prevStatus: true
	        })
	        this.startIndex = 0
	        this.endIndex = 0

	    } else {
	        for (let i = 0; i < anchorItems.length; i++) {
	            for (let j = 0; j < screenItemArr.length; j++) {
	                if (i == screenItemArr[j]) {
	                    offsetX += anchorItems[i].width
	                }
	            }
	        }
	        let newScrollX = scrollX + offsetX
	        this.setState({
	            scrollX: newScrollX
	        })
	        let nextStartIndex = this.startIndex
	        this.endIndex = nextStartIndex
	    }
	    this.leftNumber++
	    this.rightNumber--
	    this.getMenuItem(this.endIndex + 1)
	}
	onSelect = (key: Record<string, any>) => { // 当选择项时，移动位置
	    this.dropDownStatus = true
	    this.arrowStatus = false
	    this.isScroll = false;
	    const navNode = this.wrapperRef;
	    const navNodeWH = this.getOffsetWH(navNode);

	    // 修改优化后
	    let { scrollX } = this.state
	    let { anchorItems } = this.calculateW()
	    let wrapperW = this.getOffsetWH(this.wrapperRef)
	    let itemWtotal = 0
	    let screenItemArr = []
	    let scrollNum = 0 // 点击下拉项时，锚点项移动的相对距离
	    if (this.startIndex < Number(key.key)) {
	        let offsetW = 0
	        // let tragetW = 0
	        // for (let i = Number(key.key); i < anchorItems.length; i++) {
	        //     tragetW += anchorItems[i].width
	        // }
	        // if (tragetW < wrapperW - perchWidth) {
	        //     this.setState({
	        //         prevStatus: false,
	        //         nextStatus: true
	        //     })
	        // }
	        this.setState({
	            prevStatus: false
	        })
	        if (Number(key.key) == anchorItems.length - 1) {
	            this.setState({
	                nextStatus: true
	            })
	        }
	        let warpperX = this.wrapperRef.getBoundingClientRect().x
		    let anchorX = this.anchorRef.getBoundingClientRect().x
	        offsetW = anchorItems[Number(key.key)]?.left - (warpperX - anchorX) - (wrapperW - perchWidth) + anchorItems[Number(key.key)]?.width + 16
	        scrollNum = scrollX - offsetW
	        // this.setState({
	        //     scrollX: scrollX - offsetW
	        // })
	        this.endIndex = Number(key.key)
	        // 计算startIndex
	        for (let i = this.endIndex; i > 0; i--) {
	            itemWtotal += anchorItems[i]?.width
	            if (itemWtotal < wrapperW - perchWidth) {
	                screenItemArr.push(i)
	            }
	        }
	        screenItemArr.sort()

	        this.startIndex = screenItemArr[0] - 1
	    } else {
	        let beforeW = 0
	        for (let i = 0;i <= key.key; i++) {
	            beforeW += anchorItems[i]?.width
	        }
	        if (beforeW < navNodeWH - perchWidth) {
	            // let newScrollX = scrollX + offsetW
	            scrollNum = 0
	            this.setState({
	                // scrollX: 0,
	                prevStatus: true,
	                nextStatus: false
	            })
	            this.startIndex = 0
	            this.endIndex = 0
	        } else {
	            let offsetW = 0
	            for (let i = Number(key.key) + 1; i <= this.endIndex; i++) { // 保证滚动之后使目标项显示在最右侧
	                offsetW += anchorItems[i]?.width
	            }
	            // offsetW = anchorItems[this.startIndex].left - anchorItems[Number(key.key)].left
	            // let newScrollX = scrollX + offsetW
	            scrollNum = scrollX + offsetW
	            // this.setState({
	            //     scrollX: newScrollX
	            // })
	            this.startIndex = Number(key.key)
	            this.endIndex = Number(key.key)
	        }
	    }
	    // this.scrollItem(Number(key.key))
	    document.getElementById(anchorItems[Number(key.key)]?.href)?.scrollIntoView(true)
	    this.activeKeyNum = Number(key.key)
	    this.setState({
	        scrollX: scrollNum,
	        activeKey: anchorItems[Number(key.key)]?.href
	    })
	    this.getMenuItem(key.key)
	    let {onDropDownChange} = this.props
	    if (onDropDownChange) {
	        onDropDownChange(anchorItems[Number(key?.key)]?.href)
	    }
	}

	getMenuItem = (itemIndex: number) => {
	    let {prev, next, wrapperW} = this.state
	    let domNode = Array.prototype.slice.call(this.wrapperRef.children[1].children)
	    if (prev || next) {

	        let widthNum = 0
	        let dropDownArr = [];
	        let firstArr: number[] = []
	        let getFirstScreenItem = this.getFirstScreenItem()
	        // if (itemIndex == 0) {
	        if (getFirstScreenItem.includes(Number(itemIndex))) {
	            for (let i = 0; i < domNode.length; i++) {
	                widthNum += this.getOffsetWH(domNode[i]) + parseFloat(getComputedStyle(domNode[i], null).marginRight) + parseFloat(getComputedStyle(domNode[i], null).marginLeft)
	                if (widthNum > wrapperW - perchWidth) {
	                    firstArr = [...firstArr, i]
	                }
	            }
	            for (let i = 0; i < domNode.length; i++) {
	                for (let j = 0; j < firstArr.length; j++) {
	                    if (firstArr[j] === i) {
	                        dropDownArr.push({key: i, title: domNode[i].outerText})
	                    }
	                }

	            }
	            let menuArr = (
	                dropDownArr.map((item) =>
	                    item && <Item key={item.key}>{item.title}</Item>
	                )
	            )
	            this.setState({
	                menuArr
	            })
	        } else {
	            // 查询在可视区域的item
	            // let preWidth = 0
	            let newArr: React.ReactNode[] = []
	            let pageArr: number[] = []
	            let dropDownArr = []
	            domNode.forEach((item, index) => {
	                if (index <= itemIndex) {
	                    // preWidth += this.getOffsetWH(item) + parseFloat(getComputedStyle(item, null).marginRight) + parseFloat(getComputedStyle(item, null).marginLeft)
	                    newArr = [...newArr, item]
	                }
	            })
	            // 计算可视区前项
	            for (let i = newArr.length - 1; i >= 0; i--) {
	                widthNum += this.getOffsetWH(domNode[i]) + parseFloat(getComputedStyle(domNode[i], null).marginRight) + parseFloat(getComputedStyle(domNode[i], null).marginLeft)
	                if (widthNum > wrapperW - perchWidth) {
	                    pageArr = [...pageArr, i]
	                }
	            }
	            // 计算可视区后项
	            for (let i = 0; i < domNode.length; i++) {
	                if (i > itemIndex) {
	                    pageArr.push(i)
	                }
	            }
	            // 计算dropdown要显示的项数据
	            for (let i = 0; i < domNode.length; i++) {
	                for (let j = 0; j < pageArr.length; j++) {
	                    if (pageArr[j] == i) {
	                        dropDownArr.push({key: i, title: domNode[i].outerText})
	                    }
	                }
	            }
	            let menuArr = (
	                dropDownArr.map((item) =>
	                    item && <Item key={item.key}>{item.title}</Item>
	                )
	            )
	            this.setState({
	                menuArr
	            })
	        }
	    }
	}

	handleItems = () => {
	    let { items, children, fieldid, activeIcon } = this.props
	    let { activeKey } = this.state
	    let linkArr: any[] = []
	    if (items && items.length > 0) {
	        items.map((item: {key: string, href: string, title: string}) => {
	            let linkItem = <AntdAnchorLink
	                // onscrollTo={this.onscrollTo}
	                // eventKey={item.href}
	                expanded={item.href === activeKey}
	                fieldid={fieldid}
	                onSelect={this.handleSelect}
	                href={item.href}
	                title={item.title}
	                key={item.key}
	                isdirection={true}
	                activeIcon={activeIcon}
	            />
	            linkArr.push(linkItem)
	        })
	    } else {
	        React.Children.map(children, (child: React.ReactElement) => {
	            let linkHref = child.props.href
	            let childProps = {
	                onscrollTo: this.onscrollTo,
	                eventKey: linkHref,
	                expanded: linkHref === activeKey,
	                onSelect: createChainedFunction(
	                    this.handleSelect, child.props.onSelect
	                ),
	                fieldid,
	                activeIcon,
	                isdirection: true,
	            }
	            linkArr.push(React.cloneElement(child, childProps))
	            // return React.cloneElement(child, childProps);
	        })
	    }
	    return linkArr
	}


	render() {
	    let {
	        // children,
	        style,
	        className = '',
	        prefixCls,
	        affix,
	        offsetTop,
	        getContainer,
	        showInkInFixed,
	        fieldid,
	        // activeIcon,
	    } = this.props
	    let {prev, next, prevStatus, nextStatus} = this.state;
	    const showNextPrev = prev || next;
	    const prevButton = (
	        <span
	            onClick={prevStatus ? undefined : this.prev}
	            className={classNames({
	                [`${prefixCls}-prev-arrow`]: true,
	                [`${prefixCls}-disabled`]: prevStatus
	            })}
	            onTransitionEnd={this.prevTransitionEnd}
	        >
	            {<Icon type="uf-anglepointingtoleft"/>}
	        </span>
	    );
	    const nextButton = (
	        <span
	            onClick={!nextStatus ? this.next : undefined}
	            className={classNames({
	                [`${prefixCls}-next-arrow`]: true,
	                [`${prefixCls}-disabled`]: nextStatus
	            })}
	        >
	            {<Icon type="uf-anglearrowpointingtoright"/>}
	        </span>
	    );

	    // 下拉框
	    const menu = (
	        <Menu onClick={this.onSelect}>
	            {this.state.menuArr}
	        </Menu>
	    )
	    const moreTabsNode = (
	        <Dropdown
	            trigger={['hover']}
	            overlay={menu}
	            animation="slide-up"
	            // onVisibleChange={onVisibleChange}
	            overlayClassName={`${prefixCls}-more-select-dropdown`}
	        >
	            <span className={`${prefixCls}-more-select`}>
	                <Icon type="uf-listwithdots"/>
	            </span>
	        </Dropdown>
	    )
	    const wrapperClass = classNames(
	        `${prefixCls}-wrapper`,
	        {
	            [`${prefixCls}-horizontal`]: true
	        },
	        className,
	    );
	    const wrapperStyle = {
	        maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
	        ...style,
	    };
	    const anchorClass = classNames(prefixCls, {
	        fixed: !affix && !showInkInFixed,
	    });
	    // const inkClass = classNames(`${prefixCls}-ink-ball`, {
	    //     visible: '',
	    // });
	    let adapterNid = getNid(this.props) // 适配nid、uitype
	    const anchorContent = (
	        <div ref={el => this.wrapperRef = el as HTMLElement} className={wrapperClass} style={wrapperStyle}>
	            <div className={`${prefixCls}-btn`}>
	                {showNextPrev && prevButton}
	                {showNextPrev && nextButton}
	                {showNextPrev && moreTabsNode}
	            </div>
	            <div className={anchorClass} style={{transform: `translate3d(${this.state.scrollX}px,0,0)`}} ref={el => this.anchorRef = el as HTMLElement}>
	                {/* <div className={`${prefixCls}-ink`}>
	                </div> */}
	                {/* {this.inkNode()} */}
	                {/* {children} */}
	                {
	                    // React.Children.map(children, (child: React.ReactElement) => {
	                    //     let linkHref = child.props.href
	                    //     let childProps = {
	                    //         onscrollTo: this.onscrollTo,
	                    //         eventKey: linkHref,
	                    //         expanded: linkHref === activeKey,
	                    //         onSelect: createChainedFunction(
	                    //             this.handleSelect, child.props.onSelect
	                    //         ),
	                    //         fieldid,
	                    //         activeIcon,
	                    //         isdirection: true,
	                    //     }
	                    //     return React.cloneElement(child, childProps);
	                    // })
	                    this.handleItems()
	                }
	            </div>
	        </div>
	    );
	    return (
	        <div {...adapterNid} fieldid={fieldid} ref={el => this.contentDom = el as HTMLElement}>
	            {!affix ? (
	                anchorContent
	            ) : (
	                <Affix offsetTop={offsetTop} target={getContainer} getPopupContainer={getContainer ? this.contentDom : null} zIndex={1000}>
	                    {anchorContent}
	                </Affix>
	            )}
	        </div>
	    )
	}
}

// AntdAnchor.propTypes = propTypes;
export default AntdAnchor

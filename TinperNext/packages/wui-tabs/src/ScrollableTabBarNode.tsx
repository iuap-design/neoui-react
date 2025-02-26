/**
 * This source code is quoted from rc-tabs.
 * homepage: https://github.com/react-component/tabs
 */
import classnames from 'classnames';
import {debounce} from "../../wui-core/src/index";
import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import Dropdown from '../../wui-dropdown/src';
import Icon from '../../wui-icon/src'
import Menu from '../../wui-menu/src';
import {isTransformSupported, requestAnimationFrame, setTransform} from './utils';
import { ScrollableTabBarNodeProps, ScrollableTabBarNodeState } from './iTabs'
import { MenuProps } from '../../wui-menu/src/iMenu'

const {Item} = Menu

const defaultProps = {
    tabBarPosition: 'left',
    clsPrefix: '',
    scrollAnimated: true,
    onPrevClick: () => {
    },
    onNextClick: () => {
    },
    navWrapper: (ele: any) => ele,
};
let seed = 0
const tabsUUID = () => `${new Date().getTime()}_${seed++}`
export default class ScrollableTabBarNode extends React.Component<ScrollableTabBarNodeProps, ScrollableTabBarNodeState> {
    static defaultProps = defaultProps
    offset: number;
    isPrev: boolean;
    chageLast: boolean;
    timer: any;
    debouncedResize: any;
    resizeObserver: any;
    lastNextPrevShown: any;
    itemMenuIndex: number;
    tabsUid: any;
    constructor(props: ScrollableTabBarNodeProps) {
        super(props);
        this.offset = 0;
        this.itemMenuIndex = 0;
        this.isPrev = false
        this.chageLast = false

        this.state = {
            next: false,
            prev: false,
            menuArr: '',
            menuArrowLeft: '',
            menuArrowRight: '',
            isShowArr: null,
            dropDownArr: null,
            tabsItems: [], // 所有页签项数据{index，width：每项页签宽度， left：每项页签左面距离}
            allItemW: 0, // 所有子页签的宽度合
            deltaY: 0, // 鼠标滚轮滚动的距离
            prevTransformValue: 0
        };
        this.tabsUid = tabsUUID();
    }

    componentDidMount() {
        this.calculateW()
        this.timer = setTimeout(() => {
            this.getMenuItem(0)
            this.scrollToActiveTab() // 初始化时让defaultActive的值出现在可视区
            this.mouseScroll1('')
        }, 500)
        this.debouncedResize = debounce(() => {
            this.setNextPrev();
            // this.scrollToActiveTab();
            // 多页签下拉时，resize时从新计算下拉内容
            if (this.props?.moreType === 'moreTabsSelect') {
                this.scrollToActiveTab()
                this.getMenuItem(0)
                this.upDataItem() // 根据activeKey值，从新计算下拉内容项
            }
        }, 200);
        this.resizeObserver = new ResizeObserver(this.debouncedResize);
        this.resizeObserver.observe(this.props.getRef?.('container'));
        this.handleKeyDown() // 监听键盘左右键
        this.props.getRef!('nav')?.addEventListener('wheel', this.mouseScroll, {passive: false})
    }

    // eslint-disable-next-line
    UNSAFE_componentWillReceiveProps(nextProps: ScrollableTabBarNodeProps) {
        // 动态添加tabpanel时，当标签过多时显示下拉框内容更新
        if (nextProps.panels && nextProps?.panels?.length != this.props?.panels?.length && this.props?.panels?.length != 0) {
            if (this.props?.isEditNum != nextProps?.isEditNum) { // 此情况只有type为editable-card形式是，传入这个值,有操作新增页签功能并增加为多页签时有效
                // this.getMenuItem(nextProps?.isEditNum - 1)
                setTimeout(() => { // 这里加了定时器，因为新增了页签时，拿不到最新的新增之后的子元素
                    let domNode = Array.prototype.slice.call(this.props.getRef!('nav').children[0].children) // 所有tab项元素的数组集合
                    if (nextProps?.isEditNum == domNode.length) {
                        this.getMenuItem(nextProps?.isEditNum - 1)
                        this.upDataItem()
                        this.setNextPrev()
                    } else {
                        this.getMenuItem(nextProps?.isEditNum)
                    }
                    // 动态添加页签是更新数据
                    this.calculateW()
                    this.mouseScroll1('')
                }, 500)
            } else {
                setTimeout(() => {
                    let domNode = Array.prototype.slice.call(this.props.getRef!('nav').children[0].children) // 所有tab项元素的数组集合
                    if (nextProps?.isEditNum == domNode?.length) { // 当删除最后一项时
                        this.getMenuItem(nextProps?.isEditNum - 1)
                    } else if (nextProps?.isEditNum! + 1 == domNode?.length) { // 删除在增加页签时出现此情况
                        this.getMenuItem(nextProps?.isEditNum)
                    } else {
                        this.getMenuItem(0)
                    }
                }, 500)
            }
        }
        // 特出场景：页签外部逻辑点击整体页签tab换名称，更新下拉内容
        if (nextProps.items && this.props.items && nextProps.items?.length > 0 && this.props.items?.length > 0) {
            if (nextProps.items[0]?.props?.tab?.props?.children[0]?.props?.children != this.props.items[0]?.props?.tab?.props?.children[0]?.props?.children) {
                let num = 0
                nextProps.items.forEach((item: any, index: number) => {
                    if (nextProps.activeKey == item.key) {
                        num = index
                    }
                })
                setTimeout(() => {
                    this.getMenuItem(num)
                }, 500)
            }
        }
        if ('moreType' in nextProps && this.props?.moreType != nextProps?.moreType) {
            if (nextProps.moreType === 'moreTabsSelect') {
                if (this.props.getRef?.('container')) {
                    this.props.getRef('container').style.paddingRight = '32px'
                    this.props.getRef('container').style.paddingLeft = '0'
                    this.getMenuItem(0)
                }
            }
        }
    }

    componentDidUpdate(prevProps: ScrollableTabBarNodeProps) {
        requestAnimationFrame(() => {
            const props = this.props;
            if (prevProps && prevProps.tabBarPosition !== props.tabBarPosition) {
                this.setOffset(0);
                return;
            }
            if (props.moreTypeAllShow || props.moreType === 'moreTabsArrow') {
                this.setNextPrev()
            }
            // const nextPrev = this.setNextPrev();
            // wait next, prev show hide
            /* eslint react/no-did-update-set-state:0 */
            if (!prevProps || props.activeKey !== prevProps.activeKey) {
                // can not use props.activeKey
                this.scrollToActiveTab();
            }
        })
    }

    componentWillUnmount() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        if (this.debouncedResize && this.debouncedResize.cancel) {
            this.debouncedResize.cancel();
        }
        clearTimeout(this.timer);
        document.removeEventListener('keydown', this.handleArrow)
        this.props.getRef!('nav')?.removeEventListener('wheel', this.mouseScroll)
        this.tabsUid = null
    }

    // 为每个wui-tabs-tab元素添加键盘监听事件
    handleKeyDown = () => {
        // let domNode = Array.prototype.slice.call(this.props.getRef!('nav').children[0].children) // 所有tab项元素的数组集合
        // const navNode = this.props.getRef?.('root');
        // domNode.forEach(item => {
        //     item.addEventListener('keydown', this.handleArrow)
        //     item.style.height = '40px'
        // })
        // let activeTab = this.props.getRef?.('activeTab');
        document.addEventListener('keydown', this.handleArrow)
    }

    // 左右箭头监听事件
    handleArrow = (event: any) => {
        // let {activeKey} = this.props
        // let { prevTransformValue = 0 } = this.state
        // event.stopPropagation()
        // event.preventDefault()
        if (event.keyCode === 37) {
            // 添加定时器，为了获取最新的navNode元素的transform属性
            setTimeout(() => {
                // const navNode = this.props.getRef?.('nav');
                // let transformValue = navNode?.style?.transform
                // let prefixIndex = transformValue!?.indexOf("(") + 1;
                // let translateValues = transformValue?.slice(prefixIndex).split(", ");
                // // 每点击一下右箭头移动的距离
                // // let offsetNum = translateValues![0] === '' ? 0 : -parseFloat(translateValues![0]) + prevTransformValue
                // this.setState({
                //     prevTransformValue: translateValues![0] === '' ? 0 : parseFloat(translateValues![0])
                // })
                this.mouseScroll1('')
            }, 0)
        } else if (event.keyCode === 39) {
            setTimeout(() => {
                // const navNode = this.props.getRef?.('nav');
                // let transformValue = navNode?.style?.transform
                // let prefixIndex = transformValue!?.indexOf("(") + 1;
                // let translateValues = transformValue?.slice(prefixIndex).split(", ");
                // // 每点击一下右箭头移动的距离
                // // let offsetNum = translateValues![0] === '' ? 0 : -parseFloat(translateValues![0]) + prevTransformValue
                // this.setState({
                //     prevTransformValue: translateValues![0] === '' ? 0 : parseFloat(translateValues![0])
                // })
                this.mouseScroll1('')
            }, 0)
        }
    }

    // 初始化计算所有节点宽
    calculateW = () => {
        // let { prefixCls } = this.props
        // let domNode = Array.prototype.slice.call(this.wrapperRef!.children[1].children)
        let domNode = Array.prototype.slice.call(this.props.getRef!('nav').children[0].children) // 所有tab项元素的数组集合
        let allItems:{index: number | string, width: number, left: number}[] = []
        let allItemW: number = 0
        domNode.forEach((item, index) => {
            // this.anchorItems = [...this.anchorItems, {key: index}]
            // parseFloat(item.getBoundingClientRect().width.toFixed(2))
            const computedStyle = getComputedStyle(item, null)
            let itemW = parseFloat(computedStyle.width + computedStyle.marginRight + computedStyle.marginLeft)
            let itemLeft = item.offsetLeft
            // let href = item?.querySelector(`.${prefixCls}-link-title`)?.getAttribute('href')
            allItems = [...allItems, {index, width: itemW, left: itemLeft}]
        })
        for (let i = 0; i < allItems.length; i++) {
            allItemW += allItems[i].width
        }
        this.setState({
            tabsItems: [...allItems],
            allItemW: allItemW // active时当前激活元素margin-left添加为16
            // wrapperW1: this.getOffsetWH(this.wrapperRef)
        })
        // return {
        //     tabsItems: [...allItems],
        //     allItemW
        // }
    }

    setNextPrev() {
        const navNode = this.props.getRef?.('nav');
        const navTabsContainer = this.props.getRef?.('navTabsContainer');
        const navNodeWH: number = this.getScrollWH((navTabsContainer as HTMLElement) || navNode);
        // Add 1px to fix `offsetWidth` with decimal in Chrome not correct handle
        // https://github.com/ant-design/ant-design/issues/13423
        // let containerWH = 0
        let {prev, next} = this.state
        let {offset} = this;
        if (this.props?.moreType === 'moreTabsArrow') {
            if (!prev) {
                // this.props.getRef('container').style.paddingLeft = 0
                if (this.props.getRef?.('container')) {
                    this.props.getRef('container').style.paddingLeft = '0'
                }
            } else {
                if (this.props.getRef?.('container')) {
                    this.props.getRef('container').style.paddingLeft = '32px'
                }
                // this.props.getRef('container').style.paddingLeft = '32px'
            }
            if (!next) {
                // this.props.getRef('container').style.paddingRight = 0
                if (this.props.getRef?.('container')) {
                    if (this.props.moreTypeAllShow) {
                        // this.props.getRef('container').style.paddingRight = '32px'
                        if (offset < -1) {
                            this.props.getRef('container').style.paddingRight = '32px'
                        } else {
                            this.props.getRef('container').style.paddingRight = '0'
                        }
                    } else {
                        this.props.getRef('container').style.paddingRight = '0'
                    }
                    // this.props.getRef('container').style.paddingRight = '0'
                }
            } else {
                // this.props.getRef('container').style.paddingRight = '32px'
                if (this.props.getRef?.('container')) {
                    if (this.props.moreTypeAllShow) {
                        this.props.getRef('container').style.paddingRight = '64px'
                    } else {
                        this.props.getRef('container').style.paddingRight = '32px'
                    }
                    // this.props.getRef('container').style.paddingRight = '32px'
                }
            }
        }
        const containerWH = (this.getOffsetWH!(this.props.getRef!('container')) as number) + 1;
        const navWrapNodeWH: number = this.getOffsetWH(this.props.getRef!('navWrap'));
        // let {offset} = this;
        const minOffset = containerWH - navNodeWH;
        // let { next, prev } = this.state;
        if (minOffset >= 0) {
            if (navNodeWH != 0) { // 所属容器为0的情况为当整个tabs display为none时存在，此时不应更新移动位置
                next = false;
                this.setOffset(0, false);
                offset = 0;
            }
        } else if (minOffset < offset) {
            next = true;
        } else {
            next = false;
            // Fix https://github.com/ant-design/ant-design/issues/8861
            // Test with container offset which is stable
            // and set the offset of the nav wrap node
            if (navNodeWH != 0) {
                const realOffset = navWrapNodeWH - navNodeWH;
                this.setOffset(realOffset, false);
                offset = realOffset;
            }
            // const realOffset = navWrapNodeWH - navNodeWH;
            // this.setOffset(realOffset, false);
            // offset = realOffset;
        }

        if (offset < 0) {
            prev = offset !== -32;
            // prev = true
        } else {
            prev = false;
        }
        let { isTruncationShow, dragable, moreTypeAllShow } = this.props
        if (isTruncationShow && moreTypeAllShow) { // 特殊场景，左树每点击一个节点添加一项tabs，并更新组件
            let { isPrev } = this
            let activeTab: HTMLElement | undefined | null = this.props.getRef?.('activeTab');
            let activeKey = activeTab?.getAttribute('nodekey')
            let domNode = dragable ? Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children[0].children) : Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children)
            let atherArr: any[] = []
            // const navWrap = this.props.getRef?.('navWrap');
            // const navWrapNodeWH: number = this.getOffsetWH(navWrap as HTMLElement);
            domNode.forEach((item, index) => {
                atherArr = [...atherArr, JSON.stringify({key: item.getAttribute('nodekey'), title: item.innerText, closable: item.getAttribute('closable'), index})]
            })
            const navNode = this.props.getRef?.('nav');
            let transformValue = navNode?.style?.transform
            let prefixIndex = transformValue!?.indexOf("(") + 1;
            let translateValues = transformValue?.slice(prefixIndex).split(", ");
            if (JSON.parse(atherArr[atherArr?.length - 1])?.key === activeKey && !isPrev) {
            // if ((-offset + containerWH - 64 + 2 > navNodeWH) && (-offset + containerWH - 64 - 2 < navNodeWH)) {
                // if ((-offset + containerWH - 64 + 2 > navNodeWH) && (-offset + containerWH - 64 - 2 < navNodeWH)) {
                //     next = false
                // }
                // if (parseFloat(translateValues![0]) && (-parseFloat(translateValues![0]) + containerWH) < navNodeWH + 64) {
                //     next = false
                // }
                next = false
            } else if (isPrev) {
                next = true
            }
            // if (this.chageLast) {
            //     next = false
            // }
            if (parseFloat(translateValues![0]) && parseFloat(translateValues![0]) != 0) {
                prev = true
            }
            activeTab = null
        }

        this.setNext(next);
        this.setPrev(prev);
        return {
            next,
            prev,
        };
    }

    getOffsetWH(node: HTMLElement): number {
        const tabBarPosition = this.props.tabBarPosition;
        let prop = 'offsetWidth';
        if (tabBarPosition === 'left' || tabBarPosition === 'right') {
            prop = 'offsetHeight';
        }
        return node[prop];
    }

    getScrollWH(node: HTMLElement): number {
        const tabBarPosition = this.props.tabBarPosition;
        let prop = 'scrollWidth';
        if (tabBarPosition === 'left' || tabBarPosition === 'right') {
            prop = 'scrollHeight';
        }
        return node[prop];
    }


    getOffsetLT(node: HTMLElement): number {
        const tabBarPosition = this.props.tabBarPosition;
        let prop = 'left';
        if (tabBarPosition === 'left' || tabBarPosition === 'right') {
            prop = 'top';
        }
        return node.getBoundingClientRect()[prop];
    }

    setOffset(offset: number, checkNextPrev = true) {
        let target = Math.min(0, offset);
        const navNode = this.props.getRef?.('nav');
        let transformValue = navNode?.style?.transform
        let prefixIndex = transformValue!?.indexOf("(") + 1;
        let translateValues = transformValue!?.slice(prefixIndex).split(", ");
        let { isTruncationShow, moreTypeAllShow } = this.props
        if (isTruncationShow && moreTypeAllShow && this.isPrev) {
            if (!isNaN(parseFloat(translateValues[0]))) {
                this.offset = parseFloat(translateValues[0])
            }
        }
        if (this.offset !== target) {
            this.offset = target;
            let navOffset: {name?: string, value?: string} = {};
            const tabBarPosition = this.props.tabBarPosition;
            const navStyle = this.props.getRef?.('nav').style as React.CSSProperties;
            const transformSupported = isTransformSupported(navStyle);
            if (tabBarPosition === 'left' || tabBarPosition === 'right') {
                if (transformSupported) {
                    navOffset = {
                        value: `translate3d(0,${target}px,0)`,
                    };
                } else {
                    navOffset = {
                        name: 'top',
                        value: `${target}px`,
                    };
                }
            } else if (transformSupported) {
                if (this.props.dir === 'rtl') {
                    target = -target;
                }
                navOffset = {
                    value: `translate3d(${target == -32 ? 0 : target}px,0,0)`,
                };
            } else {
                navOffset = {
                    name: 'left',
                    value: `${target}px`,
                };
            }
            if (transformSupported) {
                setTransform(navStyle, navOffset.value);
            } else {
                navStyle[navOffset.name!] = navOffset.value;
            }
            if (checkNextPrev) {
                this.setNextPrev();
            }
        }
    }

    getTabItemDom(i: number): HTMLElement {
        let {dragable} = this.props
        let dom = dragable ? this.props.getRef?.('nav').children[0].children[0].children[i] : this.props.getRef?.('nav').children[0].children[i]
        return dom as HTMLElement
    }

    getMenuCurrentPage(i: number, isShowItemWidth: number) {
        const tabBarPosition = this.props.tabBarPosition;
        const navWrapNode = this.props.getRef?.('navWrap');
        const navWrapNodeWH: number = this.getOffsetWH(navWrapNode as HTMLElement);
        let menuItem = '';
        let menuItemWH = 0
        if (tabBarPosition === 'left' || tabBarPosition === 'right') {
            // 计算每项页签实际占位大小
            let verHeightNum = this.getTabItemDom(i) == undefined ? 0 : this.getTabItemDom(i)?.getBoundingClientRect().height
            let verMarTOpNum = this.getTabItemDom(i) == undefined ? 0 : parseFloat(getComputedStyle(this.getTabItemDom(i), null)?.marginTop)
            let verMarBotNum = this.getTabItemDom(i) == undefined ? 0 : parseFloat(getComputedStyle(this.getTabItemDom(i), null)?.marginBottom)
            menuItemWH = verHeightNum + verMarTOpNum + verMarBotNum
        } else {
            // 计算每项页签实际占位大小，实际宽度加上左右margin值，有的使用场景可能存在this.getTabItemDom(i)为undefined情况
            let horWidthNum = this.getTabItemDom(i) == undefined ? 0 : this.getTabItemDom(i)?.getBoundingClientRect().width
            let horMarRightNum = this.getTabItemDom(i) == undefined ? 0 : parseFloat(getComputedStyle(this.getTabItemDom(i), null)?.marginRight)
            let horMarLeftNum = this.getTabItemDom(i) == undefined ? 0 : parseFloat(getComputedStyle(this.getTabItemDom(i), null)?.marginLeft)
            menuItemWH = horWidthNum + horMarRightNum + horMarLeftNum
        }
        if (isShowItemWidth < navWrapNodeWH - menuItemWH) {
            menuItem = JSON.stringify({
                key: this.getTabItemDom(i)?.getAttribute('nodekey'),
                title: this.getTabItemDom(i)?.innerText,
                closable: this.getTabItemDom(i)?.getAttribute('closable'),
                index: i
            })
        }
        return {menuItem, menuItemWH}
    }

    getMenuItem(itemIndex = 0) {
        let {dragable} = this.props
        this.itemMenuIndex = itemIndex
        const tabBarPosition = this.props.tabBarPosition;
        const navWrapNode = this.props.getRef?.('navWrap');
        const navWrapNodeWH: number = this.getOffsetWH?.(navWrapNode as HTMLElement);
        let domNode = dragable ? Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children[0].children) : Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children)
        // let domNode = Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children) // 所有tab项元素的数组集合
        let isShowItemWidth = 0; // 显示的每一项的宽或高总和
        let initFirstPageWidth = 0; // 初始化显示的每一项的宽或高总和
        let isShowArr: any[] = []; // 显示项的集合
        let firstPageIndex: number[] = [] // 初始化显示项集合
        for (let i = 0; i < domNode.length; i++) { // 计算出第一屏显示的项的临界值，firstPageIndex为第一屏下标的数组，用于后面计算目标项是否在第一屏
            if (tabBarPosition === 'left' || tabBarPosition === 'right') {
                initFirstPageWidth += this.getTabItemDom(i)?.getBoundingClientRect().height + parseFloat(getComputedStyle(this.getTabItemDom(i), null)?.marginTop) + parseFloat(getComputedStyle(this.getTabItemDom(i), null)?.marginBottom)
            } else {
                initFirstPageWidth += this.getTabItemDom(i)?.getBoundingClientRect().width + parseFloat(getComputedStyle(this.getTabItemDom(i), null)?.marginRight) + parseFloat(getComputedStyle(this.getTabItemDom(i), null)?.marginLeft)
            }
            if (initFirstPageWidth >= navWrapNodeWH) {
                firstPageIndex = [...firstPageIndex, i]
            }
        }
        if (Math.min(...firstPageIndex) > itemIndex) { // 当目标项第一屏时，计算当前屏应该展示的项
            for (let i = 0; i < domNode.length; i++) {
                let newVal = this.getMenuCurrentPage(i, isShowItemWidth)
                isShowItemWidth += newVal.menuItemWH
                isShowArr = [...isShowArr, newVal.menuItem]
            }
        } else {
            for (let i = itemIndex; i >= 0; i--) {
                let newVal = this.getMenuCurrentPage(i, isShowItemWidth)
                isShowItemWidth += newVal.menuItemWH
                isShowArr = [...isShowArr, newVal.menuItem]
            }
        }
        let dropDownArr = [];
        let atherArr: any[] = []
        domNode.forEach((item, index) => {
            atherArr = [...atherArr, JSON.stringify({key: item.getAttribute('nodekey'), title: item.innerText || item.textContent, closable: item.getAttribute('closable'), index, fieldid: item?.getAttribute('fieldid') ? 'tabs_menu_' + item?.getAttribute('fieldid') : undefined, langid: item?.firstChild?.getAttribute ? item?.firstChild?.getAttribute('langid') : undefined})]
        })
        // @ts-ignore
        dropDownArr = atherArr.concat(isShowArr).filter(function(v, i, arr) { // 计算当前屏展示的项与总项不同的项（这为应放在select中的项）
            return arr.indexOf(v) === arr.lastIndexOf(v);
        })
        this.setState({
            isShowArr,
            dropDownArr
        })

        let menuArr = (
            atherArr.map((item) =>
                // @ts-ignore
                item && <Item fieldid={JSON.parse(item)?.fieldid} key={JSON.parse(item).key} langid={JSON.parse(item).langid}>{JSON.parse(item).title}{this.iseditCardTabs(item, 'isLeft')}</Item>
            )
        )
        this.setState({
            menuArr
        })
    }

    // editable-card类型tabs，下拉项根据closable添加关闭按钮
    iseditCardTabs = (item: string, isLeft?: string) => {
        let { type } = this.props
        if (type == 'editable-card' && JSON.parse(item).closable != 'noClose') {
            return (<Icon onClick={this.menuItemClickHandle.bind(this, JSON.parse(item).key, isLeft)} style={{position: 'absolute', right: '0', fontSize: '12px'}} type="uf-close" />)
        }
        return
    }
    // 点击下拉项内的关闭图标触发
    menuItemClickHandle = (key: string, isLeft: string, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        let { onEdit } = this.props
        if (onEdit) {
	        onEdit(key, 'remove');
	    }
        const navNode = this.props.getRef?.('nav');
        let transformValue = navNode?.style?.transform
        let prefixIndex = transformValue!?.indexOf("(") + 1;
        let translateValues = transformValue!?.slice(prefixIndex).split(", ");
        if (isLeft && isLeft === 'isLeft') { // 点击左侧截断关闭，之前的偏移量应更新
            if (!isNaN(parseFloat(translateValues[0]))) {
                this.mouseScroll1('')
                this.setOffset(parseFloat(translateValues[0] + 150))
            }
        }
    }

	onSelect: MenuProps['onSelect'] = key => { // 当选择项时，tabs移动到相应位置
	    let {dragable} = this.props
	    this.isPrev = false
	    const tabBarPosition = this.props.tabBarPosition;
	    const navWrapNode = this.props.getRef?.('navWrap');
	    const navWrapNodeWH: number = this.getOffsetWH?.(navWrapNode as HTMLElement);
	    let domNode = dragable ? Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children[0].children) : Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children)
	    // let domNode = Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children)
	    let itemIndex = 0
	    let atherArr: any[] = []
	    let activeTab: HTMLElement | undefined | null = this.props.getRef?.('activeTab');
	    let activeKey = activeTab?.getAttribute('nodekey')
	    domNode.forEach((item, index) => {
	        // console.log(item.getAttribute('nodekey') == key.key)
	        atherArr = [...atherArr, JSON.stringify({key: item.getAttribute('nodekey'), title: item.innerText, closable: item.getAttribute('closable'), index})]
	        if (item.getAttribute('nodekey') == key.key) {
	            itemIndex = index
	            if (tabBarPosition === 'left' || tabBarPosition === 'right') {
	                this.setOffset((this.props.getRef?.('nav') as HTMLElement).getBoundingClientRect().top - this.getTabItemDom(index).getBoundingClientRect().top + navWrapNodeWH - this.getTabItemDom(index).getBoundingClientRect().height)
	            } else {
	                this.setOffset((this.props.getRef?.('nav') as HTMLElement).getBoundingClientRect().left - this.getTabItemDom(index).getBoundingClientRect().left + navWrapNodeWH - this.getTabItemDom(index).getBoundingClientRect().width)
	            }
	        }
	    })
	    if (JSON.parse(atherArr[atherArr?.length - 1])?.key === activeKey) {
	        this.chageLast = true
	    }
	    this.getMenuItem(itemIndex)
	    this.props.onTabClick?.(key.key);
	    // 当选择下拉项时，更新翻页截断内容项
	    if (!this.props.isTruncationShow) return
	    const navNode = this.props.getRef?.('nav');
	    // let { prevTransformValue = 0 } = this.state
	    let transformValue = navNode?.style?.transform
	    let prefixIndex = transformValue!?.indexOf("(") + 1;
	    let translateValues = transformValue!?.slice(prefixIndex).split(", ");
	    // 每点击一下右箭头移动的距离
	    // let offsetNum = parseFloat(translateValues[0]) === 0 ? (-parseFloat(translateValues[0]) + prevTransformValue) : (-parseFloat(translateValues[0]) + prevTransformValue)
	    this.setState({
	        prevTransformValue: parseFloat(translateValues[0])
	    })
	    this.mouseScroll1('select')
	    activeTab = null
	}

	setPrev(v: boolean) {
	    if (this.state.prev !== v) {
	        this.setState({
	            prev: v,
	        });
	    }
	}

	setNext(v?: boolean) {
	    if (this.state.next !== v) {
	        this.setState({
	            next: v,
	        });
	    }
	}

	isNextPrevShown(state?: ScrollableTabBarNodeState) {
	    if (state) {
	        return state.next || state.prev;
	    }
	    return this.state.next || this.state.prev;
	}

	prevTransitionEnd = (e: React.TransitionEvent) => {
	    if (e.propertyName !== 'opacity') {
	        return;
	    }
	    const container = this.props.getRef?.('container');
	    this.scrollToActiveTab({
	        target: container,
	        currentTarget: container,
	    });
	}

    // 全量下拉显示时定位到选中项
    onVisibleChange = () => {
        let {clsPrefix, dragable} = this.props
        let activeTab: HTMLElement | undefined | null = this.props.getRef?.('activeTab');
        let activeKey = activeTab?.getAttribute('nodekey')
        let domNode = dragable ? Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children[0].children) : Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children)
        let atherArr: any[] = []
        let scrollIndex: number = 1
        domNode.forEach((item, index) => {
            atherArr = [...atherArr, JSON.stringify({key: item.getAttribute('nodekey'), title: item.innerText, closable: item.getAttribute('closable'), index})]
        })
        atherArr.forEach((item: any) => {
            if (JSON.parse(item)?.key === activeKey) {
                scrollIndex = JSON.parse(item)?.index
            }
        })
        setTimeout(() => {
            document.querySelector(`.${clsPrefix}-more-select-dropdown-${this.tabsUid}`)!.scrollTop = (scrollIndex - 6) * 32;
        }, 200)
        activeTab = null
    }

	scrollToActiveTab = (e?: {target: any, currentTarget: any}): undefined | null => {
	    let activeTab: HTMLElement | undefined | null = this.props.getRef?.('activeTab');
	    const navWrap = this.props.getRef?.('navWrap');
	    let { moreTypeAllShow, type } = this.props
	    if (e && e.target !== e.currentTarget || !activeTab) {
	        return;
	    }

	    // when not scrollable or enter scrollable first time, don't emit scrolling
	    // const needToSroll = this.isNextPrevShown() && this.lastNextPrevShown;
	    // this.lastNextPrevShown = this.isNextPrevShown();
	    const needToSroll = this.isNextPrevShown() // 默认初始化的时候就根据defaultActive的值，使defaultActive的在可视区
	    if (!needToSroll) {
	        if (!moreTypeAllShow) {
	            return
	        }
	        // return;
	    }

	    const activeTabWH: number = this.getScrollWH(activeTab);
	    const navWrapNodeWH: number = this.getOffsetWH(navWrap as HTMLElement);
	    let {offset} = this;
	    const wrapOffset: number = this.getOffsetLT(navWrap as HTMLElement);
	    const activeTabOffset: number = this.getOffsetLT(activeTab);
	    const { moreType, isTruncationShow } = this.props;
	    let difference = 0
	    if (moreType === 'moreTabsArrow') { // 存在左右箭头时，初始化位移是加上左右箭头占位宽度
	        difference = 32
	    }
	    let pcNum = 0
	    if (wrapOffset > activeTabOffset) {
	        offset += (wrapOffset - activeTabOffset);
	        pcNum = wrapOffset - activeTabOffset
	        this.setOffset(offset);
	    } else if ((wrapOffset + navWrapNodeWH) < (activeTabOffset + activeTabWH)) {
	        if (isTruncationShow && moreTypeAllShow && type == 'editable-card') {
	            offset -= (activeTabOffset + activeTabWH) - (wrapOffset + navWrapNodeWH) + difference + 3;
	        } else if (isTruncationShow && moreTypeAllShow) {
	            offset -= (activeTabOffset + activeTabWH) - (wrapOffset + navWrapNodeWH) + difference;
	        } else {
	            offset -= (activeTabOffset + activeTabWH) - (wrapOffset + navWrapNodeWH);
	        }
	        // offset -= (activeTabOffset + activeTabWH) - (wrapOffset + navWrapNodeWH);
	        pcNum = -((activeTabOffset + activeTabWH) - (wrapOffset + navWrapNodeWH) + difference)
	        this.setOffset(offset);
	    }
	    if (pcNum < activeTab.getBoundingClientRect().width && pcNum > 0) {
	        this.getTabsItemKey(this.itemMenuIndex - 1)
	    }
	    if (Math.abs(pcNum) < activeTab.getBoundingClientRect().width && Math.abs(pcNum) >= 0 && pcNum <= 0) {
	        this.getTabsItemKey()
	    }
	    activeTab = null
	}

    // 点击tabs节点(极值当多页签左右显示不全时，点击极值之后下拉项更新)
    getTabsItemKey = (num = 0) => {
        if (num != 0) {
            this.getMenuItem(num)
        } else {
            this.getItem()
        }
    }

    getItem = () => {
        let {dragable} = this.props
        let domNode = dragable ? Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children[0].children) : Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children)
        // let domNode = Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children)
        let activeTab: HTMLElement | undefined | null = this.props.getRef?.('activeTab');
        let activeKey = activeTab?.getAttribute('nodekey')
        domNode.forEach((item, index) => {
            let targetNodeKey = item.getAttribute('nodekey')
            if (activeKey == targetNodeKey) {
                this.getMenuItem(index)
            }
        })
        activeTab = null
    }

    // 嵌套多页签，内部页签存在位移时，更新下拉项
    upDataItem = () => {
        let {dragable, isTruncationShow} = this.props
        let domNode = dragable ? Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children[0].children) : Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children)
        // let domNode = Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children)
        let activeTab: HTMLElement | undefined | null = this.props.getRef?.('activeTab');
        let activeKey = activeTab?.getAttribute('nodekey')
        let navWrapNode = this.props.getRef?.('navWrap');
        let acLeft: number = activeTab!?.getBoundingClientRect().left
        let contentLeft: number = navWrapNode!.getBoundingClientRect().left
        let acWidth: number = activeTab!?.getBoundingClientRect().width
        let contendWidth: number = navWrapNode!.getBoundingClientRect().width
        let activeKeyIndex = 0
        let firstCreenWidth = 0
        let firstCreenArr: any[] = []
        if (activeKey && (acLeft - contentLeft + acWidth < contendWidth)) {
            domNode.forEach((item, index) => {
                if (item?.getAttribute('nodekey') == activeKey) {
                    activeKeyIndex = index
                }
                firstCreenWidth += item?.getBoundingClientRect().width + parseFloat(getComputedStyle(item, null).marginLeft) + parseFloat(getComputedStyle(item, null).marginRight)
                if (firstCreenWidth <= contendWidth) {
                    firstCreenArr.push(index)
                }
            })
            let lastWidth = contendWidth - acLeft + contentLeft
            let lastAllWidth = 0
            let lastArr = []
            if (firstCreenArr.includes(activeKeyIndex)) {
                this.getMenuItem(0)
                this.setOffset(0)
                if (isTruncationShow) {
                    this.mouseScroll1('')
                }
            } else {
                for (let i = activeKeyIndex; i < domNode?.length; i++) {
                    lastAllWidth += domNode[i]?.getBoundingClientRect().width
                    if (lastAllWidth < lastWidth) {
                        lastArr.push(i)
                    }
                }
                this.getMenuItem(lastArr[lastArr.length - 1])
                if (isTruncationShow) {
                    this.mouseScroll1('')
                }
            }
        } else {
            this.getItem()
        }
        activeTab = null
    }

	prev = (e: React.MouseEvent) => {
	    this.isPrev = true
	    this.chageLast = false
	    this.props.onPrevClick!(e);
	    const navWrapNode = this.props.getRef!('navWrap');
	    const navWrapNodeWH: number = this.getOffsetWH(navWrapNode as HTMLElement);
	    const {offset} = this;
	    this.setOffset(offset + navWrapNodeWH);
	    // 左箭头点击之后计算左右箭头下拉剩余量
	    const navNode = this.props.getRef?.('nav');
	    let transformValue = navNode?.style?.transform
	    let prefixIndex = transformValue!?.indexOf("(") + 1;
	    let translateValues = transformValue?.slice(prefixIndex).split(", ");
	    // 每点击一下左箭头移动的距离
	    // let offsetNum = -parseFloat(translateValues![0]) + offset
	    this.setState({
	        prevTransformValue: parseFloat(translateValues![0])
	    })
	    // this.mouseScroll({deltaY: offsetNum}, 'arrowScroll')
	    this.mouseScroll1('')
	}

	next = (e: React.MouseEvent) => {
	    this.isPrev = false
	    this.chageLast = false
	    this.props.onNextClick!(e);
	    const navWrapNode = this.props.getRef!('navWrap');
	    const navWrapNodeWH: number = this.getOffsetWH(navWrapNode);
	    const {offset} = this;
	    this.setOffset(offset - navWrapNodeWH);
	    // 左箭头点击之后计算左右箭头下拉剩余量
	    const navNode = this.props.getRef?.('nav');
	    let transformValue = navNode?.style?.transform
	    let prefixIndex = transformValue!?.indexOf("(") + 1;
	    let translateValues = transformValue?.slice(prefixIndex).split(", ");
	    // 每点击一下右箭头移动的距离
	    // let offsetNum = -parseFloat(translateValues![0]) + offset
	    this.setState({
	        prevTransformValue: parseFloat(translateValues![0])
	    })
	    // this.mouseScroll({deltaY: offsetNum}, 'arrowScroll')
	    this.mouseScroll1('')
	}

    mouseScroll1 = (val: string) => { // 鼠标滚动切换页签
        let { dragable, isTruncationShow } = this.props
        let { tabsItems, allItemW = 0 } = this.state
        if (!isTruncationShow) return

        // 左箭头点击之后计算左右箭头下拉剩余量
        const navNode = this.props.getRef?.('nav');
        let transformValue = navNode?.style?.transform
        let prefixIndex = transformValue!?.indexOf("(") + 1;
        let translateValues = transformValue?.slice(prefixIndex).split(", ");
        const navWrapNode = this.props.getRef!('navWrap');
        const navWrapNodeWH: number = this.getOffsetWH(navWrapNode);
        let domNode = dragable ? Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children[0].children) : Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children)
        let atherArr: any[] = []
        domNode.forEach((item, index) => {
            atherArr = [...atherArr, JSON.stringify({key: item.getAttribute('nodekey'), title: item.innerText, closable: item.getAttribute('closable'), index})]
        })
        let startIndex = 0
        let endIndex = 0
        let scrollW: number = -parseFloat(translateValues![0]) || 0
        let startWidth = 0
        // 如果 滚动的距离 > 总页签宽度 - 容器宽度 + 左右padding  说明向右滚动到头部了，不需要在进行后续逻辑
        if (scrollW > allItemW - navWrapNodeWH + 32) {
            // this.setState({
            //     deltaY: allItemW - navWrapNodeWH - e?.deltaY
            // })
            // return
        }
        if (tabsItems?.length === 0) return
        tabsItems!.forEach((item) => {
            startWidth += item.width
            // if (startWidth <= scrollW && startWidth <= allItemW) {
            //     console.log('====计算开始位置', startWidth, scrollW, item, this.state.next)
            //     if ((startWidth + (tabsItems![item.index + 1]?.width ? tabsItems![item.index + 1]?.width : 0) / 2) > scrollW) {
            //         startIndex = item.index + 1
            //     } else {
            //         startIndex = item.index + 1
            //     }
            // }
            if ((allItemW - (scrollW + navWrapNodeWH) < 1)) {
                if (startWidth <= scrollW - 32 && startWidth <= allItemW) {
                    startIndex = item.index + 1
                }
            } else {
                if (startWidth <= scrollW && startWidth <= allItemW) {
                    startIndex = item.index + 1
                }
            }
            if (this.offset === 0) {
                if (startWidth <= scrollW + navWrapNodeWH + 32) {
                    endIndex = item.index
                }
            } else {
                if (val === 'select') {
                    if (startWidth <= scrollW + navWrapNodeWH + 32) {
                        endIndex = item.index
                    }
                } else {
                    if (startWidth <= scrollW + navWrapNodeWH - 32) {
                        endIndex = item.index
                    }
                }
            }
        })
        let menuLeft: any[] = []
        let menuRight: any[] = []
        atherArr.forEach(item => {
            if (JSON.parse(item).index <= startIndex) {
                menuLeft.push(item)
            }
            if (JSON.parse(item).index > endIndex) {
                menuRight.push(item)
            }
        })
        let menuArrowLeft = (
            menuLeft.map((item) =>
                item && <Item key={JSON.parse(item).key}>{JSON.parse(item).title}{this.iseditCardTabs(item, 'isLeft')}</Item>
            )
        )
        let menuArrowRight = (
            menuRight.map((item) =>
                item && <Item key={JSON.parse(item).key}>{JSON.parse(item).title}{this.iseditCardTabs(item)}</Item>
            )
        )
        this.setState({
            menuArrowLeft,
            menuArrowRight,
            deltaY: scrollW
        })
    }

    mouseScroll = (e: any) => { // 鼠标滚动切换页签
        e.stopPropagation()
        e.preventDefault()
        this.chageLast = false
        let deltalNum = e?.deltaY || e?.detail || 0
        if (deltalNum < 0 && !this.state.prev || deltalNum > 0 && !this.state.next) { // 开始或结束之后不在做操作
            return
        }
        let { dragable } = this.props
        let { tabsItems, allItemW = 0, deltaY } = this.state
        this.setState({
            deltaY: deltaY + e?.deltaY
        }, () => {
            const navWrapNode = this.props.getRef!('navWrap');
	        const navWrapNodeWH: number = this.getOffsetWH(navWrapNode);
            let domNode = dragable ? Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children[0].children) : Array.prototype.slice.call(this.props.getRef?.('nav').children[0].children)
            let atherArr: any[] = []
            domNode.forEach((item, index) => {
                atherArr = [...atherArr, JSON.stringify({key: item.getAttribute('nodekey'), title: item.innerText, closable: item.getAttribute('closable'), index})]
            })
            let startIndex = 0
            let endIndex = 0
            let scrollW: number = this.state.deltaY || 0
            let startWidth = 0
            // 如果 滚动的距离 > 总页签宽度 - 容器宽度 + 左右padding  说明向右滚动到头部了，不需要在进行后续逻辑
            if (scrollW > allItemW - navWrapNodeWH + 32) {
                this.setState({
                    deltaY: allItemW - navWrapNodeWH - e?.deltaY
                })
                return
            }
            if (tabsItems?.length === 0) return
            tabsItems!.forEach((item) => {
                startWidth += item.width
                if (startWidth <= scrollW && startWidth <= allItemW) {
                    if ((startWidth + (tabsItems![item.index + 1]?.width ? tabsItems![item.index + 1]?.width : 0) / 2) > scrollW) {
                        startIndex = item.index + 1
                    } else {
                        startIndex = item.index + 1
                    }
                }
                if (this.offset === -100) {
                    if (startWidth <= scrollW + navWrapNodeWH + 32) {
                        endIndex = item.index
                    }
                } else {
                    if (startWidth <= scrollW + navWrapNodeWH) {
                        endIndex = item.index
                    }
                }
            })
            let menuLeft: any[] = []
            let menuRight: any[] = []
            atherArr.forEach(item => {
                if (JSON.parse(item).index <= startIndex) {
                    menuLeft.push(item)
                }
                if (JSON.parse(item).index > endIndex) {
                    menuRight.push(item)
                }
            })
            let menuArrowLeft = (
                menuLeft.map((item) =>
                    item && <Item key={JSON.parse(item).key}>{JSON.parse(item).title}{this.iseditCardTabs(item)}</Item>
                )
            )
            let menuArrowRight = (
                menuRight.map((item) =>
                    item && <Item key={JSON.parse(item).key}>{JSON.parse(item).title}{this.iseditCardTabs(item)}</Item>
                )
            )
            this.setState({
                menuArrowLeft,
                menuArrowRight
            })
        })
        // if (scrollFlag != 'arrowScroll') {
        //     const {offset} = this;
        //     this.setOffset(offset - e?.deltaY);
        // }
        const {offset} = this;
        this.setOffset(offset - e?.deltaY);
    }

    render() {
	    const {next, prev} = this.state;
	    const {
	        clsPrefix,
	        scrollAnimated,
	        navWrapper,
	        prevIcon,
	        nextIcon,
	        moreType,
	        fieldid,
	        dropdownClassName,
	        moreIcon,
            moreTypeAllShow,
            isTruncationShow,
            type
	    } = this.props;
	    const showNextPrev = prev || next;

        const menuLeft = (
	        <Menu onClick={this.onSelect} fieldid={fieldid ? fieldid + '_tabs' : undefined} className={`${clsPrefix}-more-menu`}>
	            {this.state.menuArrowLeft}
	        </Menu>
	    )
        const menuRight = (
	        <Menu onClick={this.onSelect} fieldid={fieldid ? fieldid + '_tabs' : undefined} className={`${clsPrefix}-more-menu`}>
	            {this.state.menuArrowRight}
	        </Menu>
	    )

        let dropdownArrowClassname = classnames({
            [`${clsPrefix}-more-select-truncation-dropdown`]: true,
	        [`${clsPrefix}-more-select-dropdown`]: true,
            [`${clsPrefix}-more-select-dropdown-editable`]: type == 'editable-card'
	    });
	    const prevButton = isTruncationShow ? (
            <Dropdown
	            trigger={['hover']}
	            overlay={menuLeft}
	            animation="slide-up"
	            // onVisibleChange={onVisibleChange}
	            overlayClassName={dropdownArrowClassname}
	        >
	        <span
	            onClick={prev ? this.prev : undefined}
	            // @ts-ignore
	            unselectable="unselectable"
	            className={classnames({
	                [`${clsPrefix}-tab-prev`]: 1,
	                [`${clsPrefix}-tab-btn-disabled`]: !prev,
	                [`${clsPrefix}-tab-arrow-show`]: showNextPrev,
	            })}
	            // onTransitionEnd={this.prevTransitionEnd}
	        >
	            {prevIcon || <Icon fieldid={fieldid ? fieldid + '_prev_btn' : undefined} type="uf-anglepointingtoleft"/>}
	        </span>
            </Dropdown>
	    ) : <span
            onClick={prev ? this.prev : undefined}
            // @ts-ignore
            unselectable="unselectable"
            className={classnames({
                [`${clsPrefix}-tab-prev`]: 1,
                [`${clsPrefix}-tab-btn-disabled`]: !prev,
                [`${clsPrefix}-tab-arrow-show`]: showNextPrev,
            })}
            // onTransitionEnd={this.prevTransitionEnd}
        >
            {prevIcon || <Icon fieldid={fieldid ? fieldid + '_prev_btn' : undefined} type="uf-anglepointingtoleft"/>}
        </span>;
	    const nextButton = isTruncationShow ? (
            <Dropdown
	            trigger={['hover']}
	            overlay={menuRight}
	            animation="slide-up"
	            // onVisibleChange={onVisibleChange}
	            overlayClassName={dropdownArrowClassname}
	        >
	        <span
	            onClick={next ? this.next : undefined}
	            // @ts-ignore
	            unselectable="unselectable"
	            className={classnames({
	                [`${clsPrefix}-tab-next`]: 1,
	                [`${clsPrefix}-tab-btn-disabled`]: !next,
	                [`${clsPrefix}-tab-arrow-show`]: showNextPrev,
	            })}
	        >
	            {nextIcon || <Icon fieldid={fieldid ? fieldid + '_next_btn' : undefined} type="uf-anglearrowpointingtoright"/>}
	        </span>
            </Dropdown>
	    ) : <span
            onClick={next ? this.next : undefined}
            // @ts-ignore
            unselectable="unselectable"
            className={classnames({
                [`${clsPrefix}-tab-next`]: 1,
                [`${clsPrefix}-tab-btn-disabled`]: !next,
                [`${clsPrefix}-tab-arrow-show`]: showNextPrev,
            })}
        >
            {nextIcon || <Icon fieldid={fieldid ? fieldid + '_next_btn' : undefined} type="uf-anglearrowpointingtoright"/>}
        </span>;
	    const menu = (
            <Menu onClick={this.onSelect} fieldid={fieldid ? fieldid + '_tabs' : undefined} className={`${clsPrefix}-more-menu`} selectedKeys={[this.props.activeKey as string]}>
	            {this.state.menuArr}
	        </Menu>
	    )
	    let dropdownClassname = classnames({
	        [`${clsPrefix}-more-select-dropdown`]: true,
	        [`${dropdownClassName}`]: dropdownClassName,
            [`${clsPrefix}-more-select-dropdown-${this.tabsUid}`]: true,
            [`${clsPrefix}-more-select-dropdown-editable`]: type == 'editable-card'
	    });
	    const moreTabsNode = (
	        <Dropdown
	            trigger={['hover']}
	            overlay={menu}
	            animation="slide-up"
	            onVisibleChange={this.onVisibleChange}
	            overlayClassName={dropdownClassname}

	        >
	            <span className={`${clsPrefix}-tab-more-select`}>
	                { moreIcon ? moreIcon : <Icon fieldid={fieldid ? fieldid + '_select_btn' : undefined} type="uf-mulu"/> }
	            </span>
	        </Dropdown>
	    )

	    const navClassName = `${clsPrefix}-nav`;
	    const navClasses = classnames({
	        [navClassName]: true,
	        [
	        scrollAnimated ?
	            `${navClassName}-animated` :
	            `${navClassName}-no-animated`
	        ]: true,
	    });

	    return (
	        <div
	            className={classnames({
	                [`${clsPrefix}-nav-container`]: 1,
	                [`${clsPrefix}-nav-container-scrolling`]: showNextPrev && moreType === 'moreTabsArrow',
	                [`${clsPrefix}-nav-more`]: showNextPrev && moreType === 'moreTabsSelect',
                    [`${clsPrefix}-nav-container-allshow`]: showNextPrev && moreTypeAllShow,
	            })}
	            key="container"
	            // @ts-ignore
	            ref={this.props.saveRef!('container')}
                style={{minWidth: '32px'}}
	        >
                {showNextPrev ? moreTypeAllShow ? prevButton : moreType === 'moreTabsArrow' ? prevButton : null : null}
                {showNextPrev ? moreTypeAllShow ? nextButton : moreType === 'moreTabsArrow' ? nextButton : null : null}
                {showNextPrev ? moreTypeAllShow ? moreTabsNode : moreType === 'moreTabsSelect' ? moreTabsNode : null : null}
	            {/* {showNextPrev && moreType === 'moreTabsArrow' && prevButton}
	            {showNextPrev && moreType === 'moreTabsArrow' && nextButton}
	            {showNextPrev && moreType === 'moreTabsSelect' && moreTabsNode} */}
	            <div
	                className={`${clsPrefix}-nav-wrap`}
	                // @ts-ignore
	                ref={this.props.saveRef!('navWrap')}
	            >
	                <div className={`${clsPrefix}-nav-scroll`}>
	                    <div
	                        className={navClasses}
	                        // @ts-ignore
	                        ref={this.props.saveRef!('nav')}
                            // onWheel={this.mouseScroll as any}
	                    >
	                        {navWrapper!(this.props.children)}
	                    </div>
	                </div>
	            </div>
	        </div>
	    );
    }
}

// ScrollableTabBarNode.propTypes = {
//     activeKey: PropTypes.string,
//     getRef: PropTypes.func.isRequired,
//     saveRef: PropTypes.func.isRequired,
//     tabBarPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
//     clsPrefix: PropTypes.string,
//     scrollAnimated: PropTypes.bool,
//     onPrevClick: PropTypes.func,
//     onNextClick: PropTypes.func,
//     navWrapper: PropTypes.func,
//     children: PropTypes.node,
//     prevIcon: PropTypes.node,
//     nextIcon: PropTypes.node,
//     direction: PropTypes.node,
//     onTabClick: PropTypes.func,
//     moreType: PropTypes.string,
//     panels: PropTypes.any,
//     isEditNum: PropTypes.number
// };

// ScrollableTabBarNode.defaultProps = {
//     tabBarPosition: 'left',
//     clsPrefix: '',
//     scrollAnimated: true,
//     onPrevClick: () => {
//     },
//     onNextClick: () => {
//     },
//     navWrapper: (ele) => ele,
// };

/**
 * This source code is quoted from rc-tabs.
 * homepage: https://github.com/react-component/tabs
 */
import classnames from "classnames";
import omit from "omit.js"
// import PropTypes from 'prop-types';
import React from "react";
import {findDOMNode} from 'react-dom'
import {prefix, WebUI, getNid} from "../../wui-core/src/index";
import Icon from '../../wui-icon/src';
import KeyCode from "./KeyCode.js";
import PopMenu from './popmenu/PopMenu'
import ScrollableInkTabBar from "./ScrollableInkTabBar";
import TabContent from "./TabContent";
import TabPane from "./TabPane";
import { TabsProps, TabsState } from './iTabs'

function noop() {
}

function getDefaultActiveKey(props: TabsProps) {
    let activeKey = '';
    let { items } = props
    if (items && items?.length > 0) {
        items?.map(item => {
            if (item.key && !activeKey && !item.disabled) {
                activeKey = item.key as string;
            }
        })
    } else {
        React.Children.forEach(props.children, (child: React.ReactElement) => {
            if (child && !activeKey && !child.props.disabled) {
                activeKey = child.key as string;
            }
        });
    }
    return activeKey;
}

// const propTypes = {
//     destroyInactiveTabPane: PropTypes.bool,
//     renderTabBar: PropTypes.func.isRequired,
//     renderTabContent: PropTypes.func.isRequired,
//     onChange: PropTypes.func,
//     children: PropTypes.any,
//     clsPrefix: PropTypes.string,
//     className: PropTypes.string,
//     tabBarPosition: PropTypes.string,
//     style: PropTypes.object,
//     type: PropTypes.oneOf([
//         "simple",
//         "fill",
//         "primary",
//         "trangle",
//         "upborder",
//         "fade",
//         "downborder",
//         "trapezoid",
//         "editable-card"
//     ]),
//     activeKey: PropTypes.string,
//     defaultActiveKey: PropTypes.string,
//     onTabClick: PropTypes.func,
//     hideAdd: PropTypes.bool,
//     onEdit: PropTypes.func,
//     menuClose: PropTypes.any,
//     onMenuClose: PropTypes.func,
//     onPrevClick: PropTypes.func,
//     onTabScroll: PropTypes.func,
//     onNextClick: PropTypes.func,
//     extraContent: PropTypes.any,
//     animated: PropTypes.any,
//     tabIndex: PropTypes.any,
//     inkBarAnimated: PropTypes.any,
//     moreType: PropTypes.string,
//     tabBarClassName: PropTypes.string,
//     tabContentClassName: PropTypes.string,
//     fieldid: PropTypes.string,
//     dragable: PropTypes.bool,
//     onDrag: PropTypes.func
// }
const defaultProps = {
    clsPrefix: `${prefix}-tabs`,
    destroyInactiveTabPane: false,
    onChange: noop,
    tabBarPosition: "top",
    style: {},
    renderTabContent: () => <TabContent/>,
    renderTabBar: () => <ScrollableInkTabBar/>,
    type: "simple",
    animated: true,
    // activeKey: undefined,
    defaultActiveKey: undefined,
    moreType: 'moreTabsSelect',
    onTabClick: () => {
    },
    className: '',
    hideAdd: false,
    onEdit: () => {
    },
    dragable: false,
  	onDrag: ()=>{
    },
    // menuClose: false,
    trigger: ['click'],
    centered: false
};

@WebUI({name: "tabs", defaultProps})
class Tabs extends React.Component<TabsProps, TabsState> {

	// static defaultProps = {...defaultProps}
	static TabPane = TabPane;
	isEditNum: number;
	constructor(props: TabsProps) {
	    super(props)
	    this.state = {
	        activeKey: props.activeKey || props.defaultActiveKey || getDefaultActiveKey(props),
	        disableCloseOth: false,
	        contextmenuType: null
	    }
	    this.isEditNum = 0 // 当新增或者删除页签时，传递给子组件，当出现多页签时用以从新计算dropDown内的内容项
	}
	tabNavs: any;
	tabspopmenu: any;
	tabBar: any;
	nodeKey: any;
	targetNodeBox?: HTMLElement;
	tabsBox?: HTMLElement;
	tabBarContent: any;

	componentDidMount() {
	    this.bindContextMenuEvents()
	}

	componentDidUpdate() {
	    this.bindContextMenuEvents();
	}

	// eslint-disable-next-line
    componentWillReceiveProps(nextProps: TabsProps) {
	    if ("activeKey" in nextProps && nextProps.activeKey != this.state.activeKey) {
	        this.setState({
	            activeKey: nextProps.activeKey
	        });
	    }
	    if ((this.props.children as any)?.length != (nextProps.children as any)?.length) {
	        this.isEditNum = (nextProps.children as any)?.length
	    }
	}

	componentWillUnMount() {
	    this.unbindContextMenuEvents();
	}

	// 绑定右键弹出菜单
	bindContextMenuEvents = () => {
	    let { trigger, clsPrefix, popMenu, className } = this.props
	    // this.tabNavs = (findDOMNode(this) as HTMLElement).querySelectorAll('.wui-tabs > .wui-tabs-bar .wui-tabs-tab');
	    // this.tabNavs = (findDOMNode(this) as HTMLElement).querySelectorAll(`.${clsPrefix} > .${clsPrefix}-bar .${clsPrefix}-tab`);
	    if (popMenu) { // 当属性popMenu存在时在监听
	        let classNameArr: any = []
	        if (className && className.includes(' ')) {
	            classNameArr = className.split(' ').filter((item) => item != '')
	        }
	        let classNameStr = classNameArr.length > 0 ? '.' + classNameArr.join('.') : className ? '.' + className : ''
	        this.tabNavs = className ? (findDOMNode(this) as HTMLElement).querySelectorAll(`.${clsPrefix}${classNameStr} > .${clsPrefix}-bar .${clsPrefix}-tab`) : (findDOMNode(this) as HTMLElement).querySelectorAll(`.${clsPrefix} > .${clsPrefix}-bar .${clsPrefix}-tab`)
	        if (trigger!.includes('hover') && !trigger!.includes('click')) {
	            for (let i = 0; i < this.tabNavs.length; i++) {
	                this.tabNavs[i].addEventListener('mouseenter', this.contextMenuHandler);
	                this.tabNavs[i].removeEventListener('contextmenu', this.contextMenuHandler);
	            }
	        } else if (trigger!.includes('hover') && trigger!.includes('click')) {
	            for (let i = 0; i < this.tabNavs.length; i++) {
	                this.tabNavs[i].addEventListener('contextmenu', this.contextMenuHandler);
	                this.tabNavs[i].addEventListener('mouseenter', this.contextMenuHandler);
	            }
	        } else {
	            for (let i = 0; i < this.tabNavs.length; i++) {
	                this.tabNavs[i].addEventListener('contextmenu', this.contextMenuHandler);
	                this.tabNavs[i].removeEventListener('mouseenter', this.contextMenuHandler);
	            }
	        }
	        // for (let i = 0; i < this.tabNavs.length; i++) {
	        // 	this.tabNavs[i].addEventListener('contextmenu', this.contextMenuHandler);
	        // }
	    }
	}
	// 解绑定右键弹出菜单
	unbindContextMenuEvents = () => {
	    for (let i = 0; i < this.tabNavs.length; i++) {
	        if (this.tabNavs[i]) {
	            this.tabNavs[i].removeEventListener('contextmenu', this.contextMenuHandler);
	            this.tabNavs[i].removeEventListener('mouseenter', this.contextMenuHandler);
	        }
	    }
	}

	contextMenuHandler = (event: any) => {
	    if (!this.props.popMenu) return;
	    event.preventDefault();
	    event.stopPropagation();
	    let target = event.target;
	    let key = ''; // 获取右击标签页的key
	    // let closeable; // 判断标签页是否可关闭
	    let closeableNum = 0; // 可关闭的标签页

	    // 某一项设置了disabled属性时不做交互
	    if (target.ariaDisabled == true || target.ariaDisabled == 'true') {
	        return
	    }
	    let tabs = this.props.children ? this.props.children as any : [];
	    if (!Array.isArray(tabs)) {
	        tabs = [this.props.children];
	    }
	    this.getTargetNodeKey(target)
	    key = this.nodeKey

	    // let keyArr: string[] = []
	    if (tabs.length > 0) {
	        // tabs.forEach((item: any) => {
	            // let tabText = ReactUtils.getChildrenText(item.props.tab).join('');
	            // keyArr.push(item.key)
	            // let tabText = item!.props.tab
	            // this.getTabsText(item!.props.tab)
	            // if (this.getText === target.textContent) {
	            //     // closeable = item.props.disabled==true||item.props.disabled=='true' ? true : false;
	            //     key = item.key;

	            // }
	        // })
	        // 统计可关闭标签页数量
	        tabs.forEach(function(item: any) {
	            if (item.props.closeable == true || item.props.closeable == 'true') {
	                ++closeableNum;
	            }
	        })
	    }
	    // 是否禁用关闭其他
	    this.setState({disableCloseOth: closeableNum <= 1});
	    // 绝对定位计算menu X轴位置
	    // let keyIndex = keyArr.findIndex((item) => item == key)
	    let leftNum = 0
	    let tabHeight = 0
	    let tabNavsNode = Array.prototype.slice.call(this.tabNavs) // 兼容ie处理
	    // tabNavsNode.forEach((item: HTMLElement, index: number) => {
	    //     if (index < keyIndex) {
	    //         leftNum += item.getBoundingClientRect().width + parseInt(getComputedStyle(item, null).marginRight) + parseInt(getComputedStyle(item, null).marginLeft)
	    //     }
	    //     tabHeight = item?.getBoundingClientRect().height
	    // })
	    // 获取下拉位置，兼容多页签情况存在translate属性时，准确获取位置
	    leftNum = this.targetNodeBox!.getBoundingClientRect().left - this.tabsBox!.getBoundingClientRect().left
	    tabHeight = tabNavsNode[0]?.getBoundingClientRect().height
	    // 显示弹出菜单
	    let { trigger } = this.props
	    if (trigger!.includes('hover')) { // hover状态要求300ms延时显示下拉
	        setTimeout(()=>{
	            this.tabspopmenu?.show(event, key, leftNum, tabHeight); // 下拉框显示在target元素下面
	        }, 300)
	    } else {
	        this.tabspopmenu?.show(event, key, leftNum, tabHeight);
	    }
	    // this.tabspopmenu.show(event, key, target?.getBoundingClientRect().left, target?.getBoundingClientRect().bottom);
	}

	// 获取目标元素的key方法 (之前的方式getTabsText方法当tabpanel的tab属性自定义内容存在多个元素时会有问题)
	getTargetNodeKey = (target: any) => {
	    if (target.getAttribute('nodekey')) {
	        this.nodeKey = target.getAttribute('nodekey')
	        this.targetNodeBox = target
	        return
	    } else {
	        let parentDom = target.parentNode
	        this.getTargetNodeKey(parentDom)
	    }
	}

	// 获取tabs头部表体内容
	// getTabsText = (item: any) => {
	//     if (typeof item === 'string') {
	//         this.getText = item
	//         return item
	//     } else if (item == undefined) {
	//         return
	//     } else {
	//         let node = item?.props.children ? item?.props.children : item?.props.text // 如果tabpanel的tab属性传入的是高阶组件要带text（头部显示信息）属性
	//         this.getTabsText(node)
	//     }
	// }

	// 构建右键弹出菜单
	createContextMenuItems = () => {
	    let { clsPrefix, popMenu, dir } = this.props
	    // let menuItems = [
	    //     {key: "closecur", text: "关闭当前"}
	    //     , {key: "closeall", text: "关闭全部"}
	    //     , {key: "closeoth", text: "关闭其他", disabled: this.state.disableCloseOth}
	    // ];
	    let menuItems = null
	    if (popMenu && Array.isArray(popMenu()) && popMenu().length > 0) {
	        menuItems = popMenu(this.nodeKey)
	    } else {
	        return
	    }
	    return <PopMenu dir={dir} ref={el => this.tabspopmenu = el} onMenuClick={this.handleMenuClick} items={menuItems} clsPrefix={clsPrefix} onPopMenuIsShow={this.onPopMenuIsShow} />
	}

	// 下拉显示隐藏回调
	onPopMenuIsShow = (open: boolean) => {
	    let { onPopMenu } = this.props
	    if (onPopMenu) {
	        onPopMenu(open, this.nodeKey) // 第一个参数为下拉框的显隐状态，第二个参数为触发下拉显隐的tab页签key
	    }
	}

	// 右键弹出菜单相关回调
	handleMenuClick = (type: string, key: string) => {
	    // var action = event.key;
	    let obj = {type, tabKey: key}
	    let {onPopMenuClick} = this.props;
	    if (onPopMenuClick) {
	        onPopMenuClick(obj)
	    }
	    this.setState({
	        contextmenuType: obj
	    })
	    // if(type === 'closecur') {//关闭当前
	    //     let onMenuClose = this.props.onMenuClose;
	    //     if(typeof onMenuClose == 'function') {
	    //       onMenuClose(key);
	    //     }
	    // } else if(type === 'closeall') {//关闭全部
	    //     var closeAllTab = this.props.closeAllTab;
	    //     if(_.isFunction(closeAllTab)) {
	    //         closeAllTab(key);
	    //     }
	    // } else if(type === 'closeoth') {//关闭其它
	    //     var closeOthTab = this.props.closeOthTab;
	    //     if(_.isFunction(closeOthTab)) {
	    //         closeOthTab(key);
	    //     }
	    // }
	}

	onTabClick = (activeKey: string) => {
	    this.props.onTabClick && this.props.onTabClick(activeKey);
	    if (this.tabBar.props.onTabClick) {
	        this.tabBar.props.onTabClick(activeKey);
	    }
	    this.setActiveKey(activeKey);
	}

	onNavKeyDown = (e: React.KeyboardEvent) => {
	    const eventKeyCode = e.keyCode;
	    if (eventKeyCode === KeyCode.RIGHT || eventKeyCode === KeyCode.DOWN) {
	        e.preventDefault();
	        const nextKey = this.getNextActiveKey(true);
	        this.onTabClick(nextKey);
	    } else if (eventKeyCode === KeyCode.LEFT || eventKeyCode === KeyCode.UP) {
	        e.preventDefault();
	        const previousKey = this.getNextActiveKey(false);
	        this.onTabClick(previousKey);
	    }
	}

	setActiveKey = (activeKey: string) => {
	    if (this.state.activeKey !== activeKey) {
	        if (!("activeKey" in this.props)) {
	            this.setState({
	                activeKey
	            });
	        }
	        this.props.onChange!(activeKey);
	    }
	}

	getNextActiveKey = (next: boolean) => {
	    const activeKey = this.state.activeKey;
	    const children: any[] = [];
	    React.Children.forEach(this.props.children, (c: React.ReactElement) => {
	        if (c && !c.props.disabled) {
	            if (next) {
	                children.push(c);
	            } else {
	                children.unshift(c);
	            }
	        }
	    });
	    const length = children.length;
	    let ret = length && children[0].key;
	    children.forEach((child, i) => {
	        if (child.key === activeKey) {
	            if (i === length - 1) {
	                ret = children[0].key;
	            } else {
	                ret = children[i + 1].key;
	            }
	        }
	    });
	    return ret;
	}
	onPrevClick = (e: React.MouseEvent) => {
	    let {tabBarPosition, onPrevClick, onTabScroll} = this.props;
	    if (['top', 'bottom'].includes(tabBarPosition as string)) {
	        onTabScroll && onTabScroll({direction: 'left'}, e);
	    } else {
	        onTabScroll && onTabScroll({direction: 'top'}, e);
	    }
	    onPrevClick && onPrevClick(e);
	}
	onNextClick = (e: React.MouseEvent) => {
	    let {tabBarPosition, onNextClick, onTabScroll} = this.props;
	    if (['top', 'bottom'].includes(tabBarPosition as string)) {
	        onTabScroll && onTabScroll({direction: 'right'}, e);
	    } else {
	        onTabScroll && onTabScroll({direction: 'bottom'}, e);
	    }
	    onNextClick && onNextClick(e);
	}
	createNewTab = (targetKey:string) => {
	    const {onEdit, children} = this.props;
	    this.isEditNum = (children as any[])?.length
	    if (onEdit) {
	        onEdit(targetKey, 'add');
	    }
	}
	removeTab = (targetKey: string, e: React.MouseEvent) => {
	    e.stopPropagation();
	    if (!targetKey) {
	        return;
	    }
	    React.Children.forEach(this.props?.children, (child: React.ReactElement, index) => {
	        if (child?.key === targetKey) {
	            this.isEditNum = index
	        }
	    })

	    const {onEdit} = this.props;
	    if (onEdit) {
	        onEdit(targetKey, 'remove');
	    }
	}

	render() {
	    const props = this.props;
	    const {
	        // activeKey,
	        // defaultActiveKey,
	        clsPrefix,
	        tabBarPosition,
	        className,
	        renderTabContent,
	        renderTabBar,
	        tabBarStyle,
	        type,
	        extraContent,
	        animated,
	        tabIndex,
	        children,
	        hideAdd,
	        dir,
	        // scrollAnimated,
	        inkBarAnimated,
	        // useTransform3d,
	        // destroyInactiveTabPane,
	        // onTabClick,
	        // onEdit,
	        // onNextClick,
	        // onPrevClick,
	        // onChange,
	        // fieldid,
	        addIcon,
	        items,
	        centered,
	        ...others
	    } = props;

	    const cls = classnames({
	        [`${clsPrefix}`]: true,
	        [`${clsPrefix}-${tabBarPosition}`]: true,
	        [`${className}`]: !!className,
	        [`${clsPrefix}-${type}`]: true,
	        [`${clsPrefix}-centered`]: centered
	    });
	    const renderProps = {
	        ...this.props,
	        children: null,
	        inkBarAnimated,
	        extraContent: extraContent,
	        className: cls,
	    };
	    if (renderTabBar) {
	        this.tabBar = renderTabBar(renderProps, ScrollableInkTabBar);
	    } else {
	        this.tabBar = <ScrollableInkTabBar {...renderProps} />;
	    }

	    // only card type tabs can be added and closed
	    let childrenWithClose: any[] = [],
	        tabBarExtraContent = extraContent;
	    if (type === 'editable-card') {
	        childrenWithClose = [];
	        // 使用items属性时，在type为editable-card类型是要处理关闭图标相关逻辑
	        if (items && items?.length > 0) {
	            items?.map((item, index) => {
	                let {closable, closeIcon} = item;
	                closable = typeof closable === 'undefined' ? true : closable;
	                const closeIconDom = closable ? closeIcon ? closeIcon : (
	                    <Icon
	                        type="uf-close"
	                        className={`${clsPrefix}-close-x`}
	                        fieldid={props.fieldid ? props.fieldid + '_edit_close_' + index : undefined}
	                    />
	                ) : null;
	                childrenWithClose.push(
	                    React.cloneElement(<TabPane>{item.children}</TabPane>, {
	                        // @ts-ignore
	                        tab: (
	                            <div className={closable ? undefined : `${clsPrefix}-tab-unclosable`}>
	                                {item.tab}
	                                <span onClick={e => this.removeTab(item.key as string, e)}>
	                                    {closeIconDom}
	                                </span>
	                            </div>
	                        ),
	                        key: item.key || index,
	                        disabled: item?.disabled,
	                    }),
	                );
	            })
	        } else {
	            React.Children.forEach(children, (child: any, index) => {
	                if (!React.isValidElement(child)) return child;
	                let {closable, closeIcon} = child.props as TabsProps;
	                closable = typeof closable === 'undefined' ? true : closable;
	                const closeIconDom = closable ? closeIcon ? closeIcon : (
	                    <Icon
	                        type="uf-close"
	                        className={`${clsPrefix}-close-x`}
	                        fieldid={props.fieldid ? props.fieldid + '_edit_close_' + index : undefined}
	                    />
	                ) : null;
	                childrenWithClose.push(
	                    React.cloneElement(child, {
	                        // @ts-ignore
	                        tab: (
	                            <div className={closable ? undefined : `${clsPrefix}-tab-unclosable`}>
	                                {(child as React.ReactElement).props.tab}
	                                <span onClick={e => this.removeTab(child.key as string, e)}>
	                                    {closeIconDom}
	                                </span>
	                            </div>
	                        ),
	                        key: child.key || index,
	                    }),
	                );
	            });
	        }
	        // Add new tab handler
	        if (!hideAdd) {
	            let newAddIcon = null
	            if (addIcon) {
	                newAddIcon = React.cloneElement(addIcon, {
	                    onClick: this.createNewTab,
	                    className: `${clsPrefix}-new-tab`
	                })
	            }
	            tabBarExtraContent = (
	                <span>
	                    {
	                        addIcon ? newAddIcon : <Icon
	                        type="uf-plus"
	                        className={`${clsPrefix}-new-tab`}
	                        // @ts-expect-error: Unreachable code error
	                        onClick={this.createNewTab}
	                    />
	                    }
	                    {extraContent}
	                </span>
	            );
	        }
	    } else if (type === 'trapezoid') {
	        React.Children.forEach(children, (child: any, index) => {
	            if (!React.isValidElement(child)) return child;
	            childrenWithClose.push(
	                React.cloneElement(child, {
	                    // @ts-ignore
	                    tab: (
	                        <div className={`${clsPrefix}-tab-item`}>
	                            {(child as React.ReactElement).props.tab}
	                        </div>
	                    ),
	                    key: child.key || index,
	                }),
	            );
	        });
	    } else if (type === 'fill-line') {
	        React.Children.forEach(children, (child: any, index) => {
	            if (!React.isValidElement(child)) return child;
	            childrenWithClose.push(
	                React.cloneElement(child, {
	                    // @ts-ignore
	                    tab: (
	                        <div className={`${clsPrefix}-tab-item`}>
	                            {(child as React.ReactElement).props.tab}
	                        </div>
	                    ),
	                    key: child.key || index,
	                }),
	            );
	        });
	    }

	    const contents = [
	        React.cloneElement(this.tabBar, {
	            clsPrefix,
	            dir,
	            key: "tabBar",
	            onKeyDown: this.onNavKeyDown,
	            tabBarPosition,
	            extraContent: tabBarExtraContent,
	            onTabClick: this.onTabClick,
	            panels: childrenWithClose.length > 0 ? childrenWithClose : children,
	            activeKey: this.state.activeKey,
	            tabIndex,
	            onPrevClick: this.onPrevClick,
	            onNextClick: this.onNextClick,
	            type,
	            tabBarStyle: tabBarStyle,
	            moreType: this.props.moreType,
	            // menuClose: this.props.menuClose,
	            contextmenuType: this.state.contextmenuType,
	            tabBarClassName: this.props.tabBarClassName,
	            fieldid: this.props.fieldid,
	            id: this.props.id,
	            dragable: this.props.dragable,
        		onDrag: this.props.onDrag,
	            isEditNum: this.isEditNum,
	            onEdit: this.props.onEdit,
	            moreIcon: this.props.moreIcon,
	            items: type === 'trapezoid' || type === 'fill-line' ? this.props.items || [] : childrenWithClose.length > 0 ? childrenWithClose : this.props.items,
	            dropdownClassName: this.props.dropdownClassName,
	            moreTypeAllShow: this.props.moreTypeAllShow,
	            isTruncationShow: this.props.isTruncationShow
	        }),
	        React.cloneElement(renderTabContent!() as React.ReactElement, {
	            clsPrefix,
	            dir,
	            tabBarPosition,
	            animated,
	            activeKey: this.state.activeKey,
	            destroyInactiveTabPane: props.destroyInactiveTabPane,
	            children: props.children,
	            // style: tabsBarStyle,
	            onChange: this.setActiveKey,
	            key: "tabContent",
	            tabContentClassName: this.props.tabContentClassName,
	            items: this.props.items,
	        })
	    ];
	    if (tabBarPosition === "bottom") {
	        contents.reverse();
	    }
	    let adapterNid = getNid(this.props)
	    return (
	        <div className={cls} ref={el => this.tabsBox = el as HTMLElement} style={props.style} {...omit(others, ["moreType", "onTabScroll", "activeKey", "defaultActiveKey", "scrollAnimated", "destroyInactiveTabPane", "onTabClick", "onEdit", "onNextClick", "onPrevClick", "onChange", "moreIcon", "tabContentClassName", "tabBarExtraContent"])} {...adapterNid}>
	            {contents}
	            {this.createContextMenuItems()}
	        </div>
	    );
	}
}

// Tabs.propTypes = propTypes;
// Tabs.defaultProps = defaultProps;
// Tabs.TabPane = TabPane;

export {Tabs};

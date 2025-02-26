import classNames from 'classnames';
import React from 'react';
import Animate from '../../wui-animate/src';
import Icon from '../../wui-icon/src';
import {KeyCode, isPlainObject, getNid} from '../../wui-core/src';
// import { propTypes as treePropTypes } from "./Tree";
import { browser, getNodeChildren, toArray, warnOnlyTreeNode } from './util';
import { TreeNodeProps, TreeNodeState, TreeNodeLinkDomProps, AnimateProps, TreeNodesStates } from './iTree'
import {globalConfig} from '../../wui-provider/src';
const browserUa = typeof window !== 'undefined' ? browser(window.navigator) : '';
const ieOrEdge = /.*(IE|Edge).+/.test(browserUa);
// const uaArray = browserUa.split(' ');
// const gtIE8 = uaArray.length !== 2 || uaArray[0].indexOf('IE') === -1 || Number(uaArray[1]) > 8;

const defaultTitle = '---';
const treeNodeDefaultBefore = 4;
const treeNodeDefaultAfter = 12;
const dragX = 26;

class TreeNode extends React.Component<TreeNodeProps, TreeNodeState> {
	static defaultProps = {
	    title: defaultTitle,
	    tabIndexValue: 0,
	    mustExpandable: false,
	    visibleCheckbox: true,
	    root: {},
	    onRenderTitle: null,
	};

	static isTreeNode = 1
	lastExecutionTime: number = 0;
	initExpand: boolean
	clickEvents: string[]
	titleHeight: number
	renderFirst: number | undefined
	checkbox: HTMLSpanElement | null = null
	treeNodeContentWrapper: HTMLAnchorElement | null = null
	doubleClickFlag: ReturnType<typeof setTimeout> | null = null

	constructor(props: TreeNodeProps) {
	    super(props);
	    this.state = {
	        dataLoading: false,
	        dragNodeHighlight: false,
	    };
	    this.initExpand = false
	    this.clickEvents = []
	    this.titleHeight = 0
	}

	componentDidMount() {
	    // if (!get(this, ['props', 'root', '_treeNodeInstances'])) { // _treeNodeInstances没有发现有什么用
	    // if (!get(this, ['props', 'root'])) {
	    //     this.props.root = {} // 只读属性，不可以直接赋值，在defaultProps里兼容
	    // }
	    //   this.props.root?._treeNodeInstances = []
	    // }
	    // this.props.root?._treeNodeInstances.push(this);
	    this.autoExpandNode(this.props)
	}

	// eslint-disable-next-line camelcase
	UNSAFE_componentWillReceiveProps(nextProps: TreeNodeProps) {
	    if (!this.initExpand) {
	        this.autoExpandNode(nextProps)
	    }
	}

	autoExpandNode = (props: TreeNodeProps) => {
	    if (props.autoExpand && !props.expanded && !props.isLeaf) {
	        this.onExpand()
	        this.initExpand = true
	    }
	}

	// shouldComponentUpdate(nextProps) {
	//   if (!nextProps.expanded) {
	//     return false;
	//   }
	//   return true;
	// }

	checkIfTriggerSyncFunc = (type: "onCheck" | "onSelect") => {
	    const { syncCheckedAndSelectedStatus, checked, selected } = this.props
	    if (syncCheckedAndSelectedStatus && this.clickEvents.length < 1) {
	        if (checked && !selected && type === 'onCheck') {
	            return false // 当即将被点击的树节点已经被选中，但是没有高亮时，不触发onCheck事件
	        }
	        if (checked && !selected && type === 'onSelect') {
	            return false // 当即将被点击的树节点已经被选中，但是没有高亮时，不触发onClick事件
	        }
	        this.clickEvents.push(type)
	        this.syncCheckedAndSelectedStatusFunc(type)
	    }
	}
	onCheck = (e?: React.MouseEvent) => {
	    const currentTime = Date.now();
	    if (!this.lastExecutionTime || currentTime - this.lastExecutionTime >= 200) {
	        this.checkIfTriggerSyncFunc('onCheck')
	        this.props.root?.onCheck(this, e as React.MouseEvent);
	        this.lastExecutionTime = currentTime;
	  	} else if (currentTime - this.lastExecutionTime < 200) {
	    	this.lastExecutionTime = currentTime
	    }
	}

	onSelect = (e?: React.MouseEvent) => {
	    const {root} = this.props;
	    const currentTime = Date.now();
	    // 做去重操作
	    if (!this.lastExecutionTime || currentTime - this.lastExecutionTime >= 200) {
	        this.checkIfTriggerSyncFunc('onSelect')
	        root?.onSelect(this, e as React.MouseEvent);
	        this.lastExecutionTime = currentTime;
	  	} else if (currentTime - this.lastExecutionTime < 200) {
	    	this.lastExecutionTime = currentTime
	    }
	}

	syncCheckedAndSelectedStatusFunc = (type: "onCheck" | "onSelect") => {
	    if (type === 'onSelect') {
	        this.checkbox && this.checkbox.click() // 触发checkbox点击
	    } else {
	        this.treeNodeContentWrapper?.click?.() // 触发a点击
	    }
	    if (this.clickEvents.length >= 1) {

	        this.clickEvents = [];
	    }

	}
	onDoubleClick = (e: React.MouseEvent) => {
	    this.doubleClickFlag && clearTimeout(this.doubleClickFlag);
	    this.props.root?.onDoubleClick(this, e);
	}

	onMouseEnter = (e: React.MouseEvent) => {
	    e.preventDefault();
	    this.props.root?.onMouseEnter(e, this);
	}

	onMouseLeave = (e: React.MouseEvent) => {
	    e.preventDefault();
	    this.props.root?.onMouseLeave(e, this);
	}

	onContextMenu = (e: React.MouseEvent) => {
	    e.preventDefault();
	    this.props.root?.onContextMenu(e, this);
	}

	onDragStart = (e: React.DragEvent) => {
	    // console.log('dragstart', this.props.eventKey, e);
	    // e.preventDefault();
	    e.stopPropagation();
	    this.setState({
	        dragNodeHighlight: true,
	    });
	    this.props.root?.onDragStart(e, this);
	    try {
	        // ie throw error
	        // firefox-need-it
	        e?.dataTransfer?.setData('text/plain', '');
	    } finally {
	        // empty
	    }
	}

	onDragEnter = (e: React.DragEvent) => {
	    e.preventDefault();
	    e.stopPropagation();
	    this.props.root?.onDragEnter(e, this);
	}

	onDragOver = (e: React.DragEvent) => {
	    // todo disabled
	    e.preventDefault();
	    e.stopPropagation();
	    this.props.root?.onDragOver(e, this);
	    return false;
	}

	onDragLeave = (e: React.DragEvent) => {
	    e.stopPropagation();
	    this.props.root?.onDragLeave(e, this);
	}

	onDrop = (e: React.DragEvent) => {
	    e.preventDefault();
	    e.stopPropagation();
	    this.setState({
	        dragNodeHighlight: false,
	    });
	    this.props.root?.onDrop(e, this);
	}

	onDragEnd = (e: React.DragEvent) => {
	    e.stopPropagation();
	    this.setState({
	        dragNodeHighlight: false,
	    });
	    this.props.root?.onDragEnd(e, this);
	}

	onExpand = (e?: React.MouseEvent) => {
	    const callbackPromise: undefined | Promise<any> = this.props.root?.onExpand(this, '', e);
	    if (callbackPromise && typeof callbackPromise === 'object') {
	        const setLoading = (dataLoading: boolean) => {
	            this.setState({
	                dataLoading
	            });
	        };
	        setLoading(true);
	        (callbackPromise as Promise<any>).then(() => {
	            setLoading(false);
	        }, () => {
	            setLoading(false);
	        });
	    }
	}

	// keyboard event support
	onKeyDown = (e: React.KeyboardEvent) => {
	    this.props.root?.onKeyDown(e, this);
	    if ([
	        KeyCode.SPACE,
	        KeyCode.DOWN,
	        KeyCode.LEFT,
	        KeyCode.RIGHT,
	        KeyCode.UP
	    ].includes(e.keyCode)) {
	        e.preventDefault();
	    }
	}

	onSwitcherMouseDown = (e: React.MouseEvent) => {
	    e.preventDefault();
	}

	onCheckboxMouseDown = (e: React.MouseEvent) => {
	    e.preventDefault();
	}

	renderSwitcher(props: TreeNodeProps, expandedState: string) { // 渲染展开收起标志 <Icon type="uf-xiangxia1" />
	    // const iconType: string = expandedState === 'open' ? "uf-xiangxia1" : 'uf-triangle-right'
	    const clsPrefix = props.clsPrefix;
	    let stateIcon: any = <Icon className={`${clsPrefix}-switcher-state-icon ${clsPrefix}-switcher-state-icon-${props.dir}`} type="uf-xiangxia1" />;
	    // const switcherStyle = props.switcherStyle || {
	    //     border: "none",
	    //     lineHeight: "1"
	    // };
	    const switcherCls = {
	        [`${clsPrefix}-switcher`]: true,
	        ['icon-none']: true
	    };
	    const switcherStyle = props.switcherStyle || undefined;
	    if (!props.showLine) {
	        switcherCls[`${clsPrefix}-noline_${expandedState}`] = true;
	    } else if (props.pos === '0-0') {
	        switcherCls[`${clsPrefix}-roots_${expandedState}`] = true;
	    } else {
	        switcherCls[`${clsPrefix}-first_${expandedState}`] = !!props.first;
	        switcherCls[`${clsPrefix}-center_${expandedState}`] = !props.last;
	        switcherCls[`${clsPrefix}-bottom_${expandedState}`] = !!props.last;
	    }
	    if (expandedState === 'open' && props.openIcon) {
	        stateIcon = props.openIcon;
	    }
	    if (expandedState === 'close' && props.closeIcon) {
	        stateIcon = props.closeIcon;
	    }
	    const fieldidProp = props.fieldidPrefix ? { fieldid: `${props.fieldidPrefix}_tree_switcher_${props.fieldid || props.eventKey || props.pos}` } : {}
	    // switcherCls[stateIcon] = stateIcon;
	    props.switcherClass ? switcherCls[`${props.switcherClass}`] = true : '';
	    if (props.disabled && !props.mustExpandable) {
	        switcherCls[`${clsPrefix}-switcher-disabled`] = true;
	        return <span {...fieldidProp} className={classNames(switcherCls)} onClick={this.onExpand} style={switcherStyle}>{stateIcon}</span>;
	    }
	    // @ts-ignore
	    return <span {...fieldidProp} uiclickable={props?.uirunmode === 'design' ? 'true' : undefined} className={classNames(switcherCls)} style={switcherStyle}
	        onMouseDown={this.onSwitcherMouseDown} onClick={this.onExpand}>{stateIcon}</span>;
	}

	renderCheckbox(props: TreeNodeProps) { // 渲染选择框
	    const disabled = props.disabled || props.disableCheckbox
	    const inverse = props.inverse
	    const clsPrefix = props.clsPrefix;
	    const checkboxCls = {
	        [`${clsPrefix}-checkbox`]: true,
	        [`${clsPrefix}-checkbox-inverse`]: inverse
	    };
	    let checkboxAttrs = {}
	    const fieldidCheckboxProp = props.fieldidPrefix ? { fieldid: `${props.fieldidPrefix}_tree_checkbox_${props.fieldid || props.eventKey || props.pos}`} : {}
	    // if (props.getCheckboxAttrs && isFunction(props.getCheckboxAttrs)) {
	    if (props.getCheckboxAttrs && typeof props.getCheckboxAttrs === 'function') {
	        const obj = props.getCheckboxAttrs(props)
	        if (isPlainObject(obj)) { // 只有普通js对象可以传到dom上
	            checkboxAttrs = obj
	        }
	    }
	    if (props.checked) {
	        checkboxCls[`${clsPrefix}-checkbox-checked`] = true;
	    } else if (props.halfChecked) {
	        checkboxCls[`${clsPrefix}-checkbox-indeterminate`] = true;
	    }
	    let customEle = null;
	    if (typeof props.checkable !== 'boolean') {
	        customEle = props.checkable;
	    }
	    if (disabled) {
	        checkboxCls[`${clsPrefix}-checkbox-disabled`] = true;
	        return <span {...checkboxAttrs} className={classNames(checkboxCls)}>{customEle}</span>;
	    }
	    return (
	        <span
	            {...checkboxAttrs}
	            {...fieldidCheckboxProp}
	            ref={ref => this.checkbox = ref}
	            className={classNames(checkboxCls)}
	            onClick={this.onCheck}
	            onMouseDown={this.onCheckboxMouseDown}
	        >{customEle}</span>);
	}

	renderChildren(props: TreeNodeProps) { // 渲染树节点下面的子节点
	    const renderFirst = this.renderFirst;
	    this.renderFirst = 1;
	    let transitionAppear = true;
	    if (!renderFirst && props.expanded) {
	        transitionAppear = false;
	    }
	    const children = props.children && Array.isArray(props.children) ? props.children.filter(child => child) : props.children;
	    let newChildren = children;
	    // 确定所有子节点是否是TreeNode
	    let allTreeNode = false;
	    if (Array.isArray(children)) {
	        for (let index = 0; index < children.length; index++) {
	            let item = children[index];
	            if (!item) break;
	            allTreeNode = item.type.isTreeNode == 1;
	            if (!allTreeNode) {
	                // 当检查到子节点中有不是 TreeNode 的，则直接结束检查。同时不会渲染所有子节点
	                break;
	            }
	        }
	    } else if (children && (children as React.ReactElement).type && ((children as React.ReactElement).type as any).isTreeNode == 1) {
	        allTreeNode = true;
	    }
	    //  如果props.children的长度大于0才可以生成子对象
	    if (allTreeNode && React.Children.count(children)) {
	        const cls = {
	            [`${props.clsPrefix}-child-tree`]: true,
	            [`${props.clsPrefix}-child-tree-open`]: props.expanded,
	        };
	        const animProps: AnimateProps = {};
	        if (props.openTransitionName) {
	            animProps.transitionName = props.openTransitionName;
	        } else if (typeof props.openAnimation === 'object') {
	            animProps.animation = Object.assign({}, props.openAnimation);
	            if (!transitionAppear) {
	                delete animProps.animation?.appear;
	            }
	        }
	        newChildren = (
	            <Animate
	                {...animProps}
	                showProp="data-expanded"
	                transitionAppear={transitionAppear}
	            >
	                {!props.expanded ? null : <ul className={classNames(cls)} data-expanded={props.expanded}>
	                    {React.Children.map(children, (item, index) => {
	                        return props.root?.renderTreeNode(item, index, props.pos);
	                    })}
	                </ul>}
	            </Animate>
	        );
	    }
	    return newChildren;
	}

	getNodeChildren = () => {
	    const { children } = this.props;
	    const originList = toArray(children as React.ReactElement[]).filter(node => node);
	    const targetList = getNodeChildren(originList);
	    if (originList.length !== targetList.length) {
	        warnOnlyTreeNode(); // 有非树节点
	    }
	    return targetList;
	};

	/**
	 *判断是否为叶子节点，isLeaf的优先级>props.children。如果是异步加载是根据isLeaf的值进行判断的
	 *
	 * @returns
	 * @memberof TreeNode
	 */
	checkIsLeaf() {
	    const { isLeaf, loadData } = this.props;
	    if (isLeaf === false || isLeaf === true) {
	        return isLeaf;
	    } else {
	        const hasChildren = this.getNodeChildren().length !== 0;
	        return (!loadData && !hasChildren);
	    }
	}

	renderTreeNodeContent = (iconState: string, expandedState: string) => { // 渲染树节点内部要展示内容的dom结构
	    const { props } = this
	    let { onRenderTitle, ext, clsPrefix, 'title': titleContent, titleClass, selected, contentCls, titleStyle, fieldidPrefix, fieldid, eventKey, pos, loadData, onMouseLeave, dropPositionX,
	        showIcon, icon, disabled, _dropTrigger, selectable, checkable, onDoubleClick, onRightClick, onMouseEnter, draggable, focusable, tabIndexKey, tabIndexValue, onResetFocusKey, expandOnClickNode, isLeaf } = props;
	    const content = (typeof onRenderTitle == 'function') ? onRenderTitle(ext, props) : titleContent; // ext来自tree.props.treeData的json原始数据 同 props 对象是有区别的，原始json数据由使用方传入，所以优先传回给使用方，同时保障了向下兼容。
	    // const clsPrefix = clsPrefix;
	    titleClass = titleClass ? clsPrefix + '-title' + ' ' + titleClass : clsPrefix + '-title';
	    const iconEleCls = {
	        [`${clsPrefix}-iconEle`]: true,
	        [`${clsPrefix}-icon_loading`]: this.state.dataLoading,
	        [`${clsPrefix}-icon__${iconState}`]: true
	    };
	    const fieldidContentProp = fieldidPrefix ? { fieldid: `${fieldidPrefix}_tree_content_${fieldid || eventKey || pos}` } : {}
	    const fieldidIconProp = fieldidPrefix ? { fieldid: `${fieldidPrefix}_tree_icon_${fieldid || eventKey || pos}` } : {}
	    const fieldidTitleProp = fieldidPrefix ? { fieldid: `${fieldidPrefix}_tree_title_${fieldid || eventKey || pos}` } : {}
	    // const icon = (props.showIcon || props.loadData && this.state.dataLoading) ?
	    //   <span className={classNames(iconEleCls)}></span> : null;
	    let _icon;
	    const isLoading = loadData && this.state.dataLoading
	    if (isLoading) { // loading优先级最高
	        _icon = <span {...fieldidIconProp} className={classNames(iconEleCls)}></span>
	    } else if (showIcon && !icon) { // 没传icon，不是loading状态，不显示这个icon
	        _icon = null
	    } else if (showIcon && icon) {
	        _icon = <span
	            {...fieldidIconProp}
	            className={classNames(
	                `${clsPrefix}-iconEle`,
	                `${clsPrefix}-icon__customize`,
	            )}
	        >
	            {typeof icon === 'function' ?
	                icon(props) : icon
	            }
	        </span>
	    }
	    const title = <span {...fieldidTitleProp} className={titleClass} style={titleStyle}>{content}</span>;
	    // const dot = iconState === 'docu' ? <span className={classNames(`${clsPrefix}-treenode-dot`)} /> : null
	    const wrap = `${clsPrefix}-node-content-wrapper`;
	    let domProps: TreeNodeLinkDomProps = {
	        className: `${wrap} ${wrap}-${iconState === expandedState ? iconState : 'normal'}`
	    };
	    if (selected) { // 只要被选择了，就有这个类名
	        domProps.className += ` ${clsPrefix}-node-selected`;
	    }
	    if (contentCls) {
	        domProps.className += ` ${contentCls}`;
	    }
	    if (!disabled) {
	        if (!_dropTrigger && this.state.dragNodeHighlight && !domProps.className.includes(`${clsPrefix}-node-selected`)) {
	            domProps.className += ` ${clsPrefix}-node-selected`;
	        }

	        if (onDoubleClick) {
	            domProps.onDoubleClick = this.onDoubleClick;
	        }
	        if (onRightClick) {
	            domProps.onContextMenu = this.onContextMenu;
	        }
	        if (onMouseEnter) {
	            domProps.onMouseEnter = this.onMouseEnter;
	        }
	        if (onMouseLeave) {
	            domProps.onMouseLeave = this.onMouseLeave;
	        }

	        if (draggable) {
	            domProps.className += ' draggable';
	            if (ieOrEdge) {
	                // ie bug!
	                domProps.href = '#';
	            }
	            domProps.draggable = true;
	            domProps['aria-grabbed'] = true;
	            domProps.onDragStart = this.onDragStart;
	        }
	    }
	    domProps.onClick = (e: React.MouseEvent) => {
	        e.preventDefault();
	        if (expandOnClickNode && !isLeaf) {
	            this.onExpand(e);
	        }
	        if (selectable && !disabled) {
	            this.onSelect(e);
	        } else if (checkable && !disabled) {
	            this.onCheck()
	        }
	    };
	    // 设置tabIndex
	    if (focusable) {
	        domProps.onKeyDown = this.onKeyDown;
	        domProps.tabIndex = -1;
	        if (tabIndexKey) {
	            if (eventKey == tabIndexKey) {
	                domProps.tabIndex = tabIndexValue;
	            }
	        } else if (pos == '0-0') {
	            domProps.tabIndex = tabIndexValue;
	        }
	        domProps.onBlur = onResetFocusKey || (() => {})
	    }
	    let len = 0;
	    if (dropPositionX?.startsWith('left')) {
	        len = +dropPositionX.split('_')[1]
	    }
	    const nodeBeforeStyle = len ? {left: `${-len * dragX + treeNodeDefaultBefore}px`} : {};
	    const nodeAfterStyle = len ? {left: `${-len * dragX + treeNodeDefaultAfter}px`, with: `calc(100% + ${len * dragX}px)`} : {};
	    if (draggable) {
	        domProps = {...domProps,
	            onDragEnter: this.onDragEnter,
	            onDragOver: this.onDragOver,
	            onDragLeave: this.onDragLeave,
	            onDrop: this.onDrop,
	            onDragEnd: this.onDragEnd
	        }
	    }
	    return (
	        <a
	            {...fieldidContentProp}
	            ref={(el) => {
	                this.treeNodeContentWrapper = el
	            }}
	            pos={pos}
	            title={typeof content === 'string' ? content : ''}
	            {...domProps}
	        >
	            {_icon}
	            {title}
	            {
	                draggable ? <>
	                    <span style={nodeBeforeStyle} className={`${clsPrefix}-node-before`}></span>
	            <span style={nodeAfterStyle} className={`${clsPrefix}-node-after`}></span></> : null
	            }
	        </a>
	    );
	}

	renderNoopSwitcher = () => { // 渲染没有展开标志的dom结构
	    const { props } = this
	    const clsPrefix = props.clsPrefix;
	    const cls = {
	        [`${clsPrefix}-switcher`]: true,
	        [`${clsPrefix}-switcher-noop`]: true,
	    };
	    if (props.showLine) {
	        // console.log('line---------');
	        cls[`${clsPrefix}-center_docu`] = !props.last;
	        cls[`${clsPrefix}-bottom_docu`] = !!props.last;
	    } else {
	        cls[`${clsPrefix}-noline_docu`] = true;
	    }
	    return <span className={classNames(cls)}></span>;
	}

	getLiClassNames = (props: TreeNodeProps, expandedState: string, canRenderSwitcher: boolean, iconState: string) => { // 获取树节点最外层li类名
	    const { dropPositionX, clsPrefix, last, first, filterTreeNode, selected, focused, className } = props;
	    const baseCls = `${clsPrefix}-treenode`;
	    let disabledCls = ''; // 禁用类名
	    let dragOverCls = ''; // 拖拽类名
	    let switcherDashedLineCls = canRenderSwitcher && !props.last && expandedState === 'close' ? `${clsPrefix}-treenode-line` : ''
	    let lastLiCls = last ? `${clsPrefix}-treenode-last` : ''
	    let firstLiCls = first ? `${clsPrefix}-treenode-first` : ''
	    let isLeafCls = iconState === 'docu' ? `${clsPrefix}-treenode-leaf` : `${clsPrefix}-treenode-parent`
	    if (props.disabled) {
	        disabledCls = `${clsPrefix}-treenode-disabled`;
	    } else if (props.dragOver) {
	        dragOverCls = 'drag-over';
	    } else if (props.dragOverGapTop) {
	        dragOverCls = 'drag-over-gap-top';
	    } else if (props.dragOverGapBottom) {
	        dragOverCls = 'drag-over-gap-bottom';
	    }
	    const dropX = dropPositionX ? `${clsPrefix}-treenode-drag-x-${dropPositionX}` : null;
	    const filterCls = filterTreeNode ? (filterTreeNode(this as any) ? `${clsPrefix}-treenode-filter-node` : '') : ''; // 过滤类名
	    const selectedCls = selected ? `${clsPrefix}-treenode-selected` : ''; // 被选择类名
	    const focusedCls = focused ? `${clsPrefix}-treenode-focused` : ''; // 聚焦状态类名
	    const expandedCls = `${clsPrefix}-treenode-${expandedState}`; // 展开状态类名
	    return classNames(className, baseCls, disabledCls, dragOverCls, filterCls, selectedCls, focusedCls, dropX,
	        expandedCls, switcherDashedLineCls, lastLiCls, firstLiCls, isLeafCls) // TODO: 减少一些类名
	}

	getLiProps = (props: TreeNodeProps) => {
	    let liProps = {};
	    if (props.liAttr) {
	        liProps = Object.assign({}, props.liAttr);
	    }
	    if (props.draggable) {
	        liProps = {
	            ...liProps,
	            // onDragEnter: this.onDragEnter,
	            // onDragOver: this.onDragOver,
	            // onDragLeave: this.onDragLeave,
	            // onDrop: this.onDrop,
	            // onDragEnd: this.onDragEnd
	        }
	    }
	    return liProps
	}

	renderIndents(props: TreeNodeProps) { // 渲染带有竖向连接线的小格子
	    const level = props.treeNodesStatesKeysInfo?.[props.eventKey as string] // 获取当前节点的位置信息，如0-3-2-5-9
	    if (!level) return null

	    const getGlobalDirection = globalConfig().getGlobalDirection;
	    const direction = getGlobalDirection();
	    const levelsArr = level.split('-')
	    const levels = levelsArr.length - 1 // 获得距离最外层节点的层级数量
	    const res = []
	    if (levels > 0) {
	        const ulPadding = 26 // 当前设计规范的padding距离，也是一个格子的宽度
	        for (let i = 0; i < levels - 1; i++) { // 自己的一层没有格子
	            const parentPos = levelsArr.slice(0, levels - i) // 父节点（祖先节点）的位置，如父组件位置是0-3-2-5，祖父节点位置是0-3-2...
	            const parentInfo = (props.treeNodesStates as TreeNodesStates)[parentPos.join('-')];
	            const isParentNodeLast = parentInfo ? !!parentInfo?.siblingPosition?.last : false // 父节点是否是所在层级的最后一个节点，是最后一个的话，增加end类名，没有向下的连接线
	            res.unshift(<span className={`${props.clsPrefix}-indent ${props.clsPrefix}-indent-${isParentNodeLast ? 'end' : 'start'}`} />)
	        }
	        return <span style={{ [direction === 'rtl' ? 'right' : 'left']: (levels - 1) * -1 * ulPadding }} className={`${props.clsPrefix}-indents`}>
	            {res}
	        </span>
	    } else {
	        return null
	    }
	}

	render() {
	    const props = this.props;
	    const expandedState = props.expanded ? 'open' : 'close';
	    let iconState = expandedState;
	    let canRenderSwitcher = true;
	    if (this.checkIsLeaf()) {
	        canRenderSwitcher = false;
	        iconState = 'docu';
	    }
	    const fieldidProp = props.fieldidPrefix ? { fieldid: `${props.fieldidPrefix}_option_${props.fieldid || props.eventKey || props.pos}` } : {}
	    let adapterNid = getNid(props)
	    return (
	        <li
	            {...this.getLiProps(props)}
	            style={props.style}
	            className={this.getLiClassNames(props, expandedState, canRenderSwitcher, iconState)}
	            {...fieldidProp}
	            {...adapterNid}
	        >
	            {
	                props.showLine ? <div className={`${this.props.clsPrefix}-line`}>
	                    {canRenderSwitcher ? this.renderSwitcher(props, expandedState) : this.renderNoopSwitcher()}
	                    <span className={`${this.props.clsPrefix}-treenode-line`} />
	                    {this.renderIndents(props)}
	                    {props.checkable && props.visibleCheckbox ? this.renderCheckbox(props) : null}
	                    {this.renderTreeNodeContent(iconState, expandedState)}
	                </div>
	                    : <div className={`${this.props.clsPrefix}-treenode-line-content`}>
	                        {canRenderSwitcher ? this.renderSwitcher(props, expandedState) : this.renderNoopSwitcher()}
	                        {props.checkable && props.visibleCheckbox ? this.renderCheckbox(props) : null}
	                        {this.renderTreeNodeContent(iconState, expandedState)}
	                    </div>
	            }
	            {this.renderChildren(props)}
	        </li>
	    );
	}
}

// TreeNode.isTreeNode = 1;
//
// TreeNode.propTypes = {
//     ...treePropTypes,
//     clsPrefix: PropTypes.string,
//     disabled: PropTypes.bool,
//     disableCheckbox: PropTypes.bool,
//     visibleCheckbox: PropTypes.bool,
//     expanded: PropTypes.bool,
//     isLeaf: PropTypes.bool,
//     root: PropTypes.object,
//     onSelect: PropTypes.func,
//     openIcon: PropTypes.element,
//     closeIcon: PropTypes.element,
//     style: PropTypes.object,
//     className: PropTypes.string,
//     titleClass: PropTypes.string,
//     titleStyle: PropTypes.object,
//     switcherClass: PropTypes.string,
//     switcherStyle: PropTypes.object
// };
//
// TreeNode.defaultProps = {
//     title: defaultTitle,
//     tabIndexValue: 0,
//     mustExpandable: false,
//     visibleCheckbox: true,
//     root: {}
// };

export default TreeNode;

/* eslint no-console:0 */
import classNames from 'classnames';
import omit from 'omit.js';
import React, { cloneElement } from 'react';
import { KeyCode, getNid } from '../../wui-core/src';
import CONFIG from './config';
import createStore from './createStore';
import InfiniteScroll from './infiniteScroll';
import TreeNode from './TreeNode';
import {
    arraysEqual,
    closest,
    convertListToTree,
    filterParentPosition,
    getCheck,
    getOffset,
    getStrictlyValue,
    getSumHeight,
    handleCheckState,
    isInclude,
    loopAllChildren,
} from './util';

import {
    TreeProps, TreeState, LatestTreeNodeProps, OnDragEnterState, OnDropInfo, TreeUlDomProps, RootTreeMethods, TreeNodesStates, DisabledTreeNode,
    FlatTreeData, AnyObject, OnCheckInfo, CheckKeysInfo, CheckedKeysObj, TreeData, SibilingPosition, UpdateStateObj, TreeNodeProps, FlatTreeKeysMap, TreeStore
} from './iTree'
import { WithConfigConsumer } from '../../wui-provider/src/context';

function noop() {
}

interface DropMapProps {
	[name: string]: number
}

const dropMap: DropMapProps = {
    center: 1,
    right: 0,
    left: 1
}
@WithConfigConsumer()
class Tree extends React.Component<TreeProps, TreeState> {

	static defaultProps = {
	    clsPrefix: 'rc-tree',
	    blockNode: true,
	    showLine: false,
	    showIcon: true,
	    selectable: true,
	    multiple: false,
	    checkable: false,
	    checkStrictly: false,
	    draggable: false,
	    autoExpandParent: true,
	    defaultExpandAll: false,
	    defaultExpandedKeys: [],
	    defaultCheckedKeys: [],
	    defaultSelectedKeys: [],
	    onExpand: noop,
	    onCheck: noop,
	    onSelect: noop,
	    onDragStart: noop,
	    onDragEnter: noop,
	    onDragOver: noop,
	    onDragLeave: noop,
	    onDrop: noop,
	    onDragEnd: noop,
	    tabIndexValue: 0,
	    lazyLoad: false,
	    autoSelectWhenFocus: false,
	    getScrollContainer: noop,
	    // expandWhenDoubleClick: false,
	    expandOnClickNode: true,
	    getCheckboxAttrs: noop,
	    fieldid: '',
	    syncCheckedAndSelectedStatus: false,
	    disabled: false,
	    icon: null,
	    inverse: false,
	    fieldNames: { title: "title", key: "key", children: "children" },
	    dragDelayExpandTime: 500
	}

	contextmenuKeys: string[]
	latestTreeNode: LatestTreeNodeProps
	checkedKeysChange: boolean
	selectKeyDomPos: string
	autoExpandKeys: string[] | null
	rowsInView: number
	loadCount: number
	flatTreeKeysMap: FlatTreeKeysMap
	startIndex: number
	endIndex: number
	cacheTreeNodes: React.ReactElement[]
	disabledTreeNodes: DisabledTreeNode[]
	store: TreeStore
	latestState: boolean | null
	cachedLatestState: boolean | null
	treeNodesStates: TreeNodesStates
	treeKeysCopy: string[] = [];
	lazyLoadAllChildren: React.ReactElement[]
	lazyLoadTreeNodesStates: TreeNodesStates
	checkedKeys: string[]
	dragNodesKeys: string[]
	treeNodesStatesKeysInfo: Partial<AnyObject>
	checkKeys: CheckKeysInfo | undefined
	_checkedKeys: string[] | undefined
	// -1 表示 在首个节点 上方； 0 表示在这个节点之上； 1 表示在元素的下方； 2 表示元素上方（上一个元素的下方）
	dropPositionY: number | undefined;
	_rawExpandedKeys: string[] | undefined
	hasCalculateRowHeight = false
	tree: HTMLUListElement | null = null
	dragNode!: React.ReactElement
	_dropTrigger = true
	cacheExpandedKeys: Set<string> | null = null
	loadedKeys: string[] = []
	halfCheckedKeys: string[] = []
	selectKeyDomExist = false
	dataChange = false
	dragX: number | null = null
	timer: ReturnType<typeof setTimeout> | undefined = undefined;
	flatKeyTree: string[] = [];
	treeElsObj: { [key: string]: any } = [];
	betweenWithKey: (string)[] = [];
	dropPositionX: string = '';

	constructor(props: TreeProps) {
	    super(props);
	    this.contextmenuKeys = [];
	    this.latestTreeNode = {};
	    this.checkedKeysChange = true;
	    this.selectKeyDomPos = '0-0';

	    this.autoExpandKeys = null
	    const { defaultExpandedKeys, loadData } = this.props
	    // 如果是异步加载数据，而且传了默认展开的节点key，这些key不放在第一次渲染的expandedKeys当中，而是在treeNode渲染的时候，调用打开的方法展开
	    if (defaultExpandedKeys && Array.isArray(defaultExpandedKeys) && defaultExpandedKeys.length && loadData) {
	        this.autoExpandKeys = defaultExpandedKeys
	    }

	    this.state = {
	        expandedKeys: this.getDefaultExpandedKeys(props) as string[],
	        checkedKeys: (this.getDefaultCheckedKeys(props) as string[]),
	        selectedKeys: (this.getDefaultSelectedKeys(props) as string[]),
	        dragNodesKeys: [], // 实际上这个state没有用到，设置成什么都可以
	        dragOverNodeKey: '',
	        dropNodeKey: '',
	        focusKey: '', // 上下箭头选择树节点时，用于标识focus状态
	        treeData: [], // Tree结构数组(全量)
	        loadedKeys: [],
	        flatTreeData: [], // 一维数组(全量)
	        prevProps: null,
	        dropPositionX: '' // 用于state 更新，精准插入线left位置
	    };
	    // 默认显示20条，rowsInView根据定高算的。在非固定高下，这个只是一个大概的值。
	    this.rowsInView = CONFIG.defaultRowsInView;
	    // 一次加载多少数据
	    this.loadCount = CONFIG.loadBuffer ? this.rowsInView + CONFIG.loadBuffer * 2 : 16;
	    this.flatTreeKeysMap = {}; // 存储所有 key-value 的映射，方便获取各节点信息
	    this.startIndex = 0;
	    this.endIndex = this.startIndex + this.loadCount;
	    this.cacheTreeNodes = []; // 缓存 treenode 节点数组
	    this.disabledTreeNodes = []; // disabled状态的节点数组
	    this.store = createStore({ rowHeight: 28 }); // rowHeight 树节点的高度，此变量在滚动加载场景很关键
	    this.latestState = null
	    this.cachedLatestState = null
	    this.treeNodesStates = {}
	    this.lazyLoadAllChildren = []
	    this.lazyLoadTreeNodesStates = {}
	    this.checkedKeys = []
	    this.treeNodesStatesKeysInfo = {}
	    this.dragNodesKeys = []
	}

	componentDidMount() {
	    // 此处为了区分数据是不是异步渲染的，prevProps 作为标识
	    if (this.hasTreeNode()) {
	        this.setState({
	            prevProps: this.props
	        })
	    }
	    // ncc制造，树参照包含下级需求，checkStrictly 动态改变后，拿到组件内部属性 this.checkedKeys
	    if (this.props._getTreeObj) {
	        this.props._getTreeObj(this as any);
	    }
	    this.calculateRowHeight();
	}

	// 判断初始化挂载时，有没有渲染树节点
	hasTreeNode = () => {
	    const { children, treeData } = this.props;
	    let noTreeNode = children === null || typeof children === 'undefined' || (typeof children === 'object' && (children as any).length === 0) || (typeof treeData === 'object' && treeData.length === 0);
	    return !noTreeNode;
	}

	// eslint-disable-next-line camelcase
	UNSAFE_componentWillMount() {
	    const { treeData, lazyLoad, children } = this.props;
	    if (children) { // 将所有disabled状态的treeNode整理到一起
	        loopAllChildren(children as React.ReactElement[], (item: React.ReactElement) => {
	            if (item.props.disabled && item.key) {
	                this.disabledTreeNodes.push({ key: item.key as string })
	            }
	        });
	    }
	    let sliceTreeList: FlatTreeData[] = [];
	    // 启用懒加载，把 Tree 结构拍平，为后续动态截取数据做准备
	    if (lazyLoad) {
	        let flatTreeData = this.deepTraversal(treeData as TreeData[]); // 有lazyload一定要有treeData
	        flatTreeData.forEach((element: FlatTreeData) => {
	            if (sliceTreeList.length >= this.loadCount) return;
	            sliceTreeList.push(element);
	        });
	        this.handleTreeListChange(sliceTreeList);
	        this.lazyLoadAllChildren = this.renderTreefromData(this.props.treeData as TreeData[]) // 所有节点渲染出的children
	        this.setState({
	            flatTreeData
	        })
	    } else {
	        this.setState({
	            treeData: treeData || [] // state.treeData不可以是undefined
	        })
	    }
	}

	// eslint-disable-next-line camelcase
	UNSAFE_componentWillReceiveProps(nextProps: TreeProps) {
	    const { children } = nextProps;
	    const { loadedKeys } = this.state;
	    const newLoadedKeys: string[] = []
	    if (children) { // 更新treeNodes的disabled状态
	        loopAllChildren(children as React.ReactElement[], (item: React.ReactElement) => {
	            if (item.props.disabled && item.key && !this.disabledTreeNodes.every((node: DisabledTreeNode) => node.key !== item.key)) {
	                this.disabledTreeNodes.push({ key: item.key as string })
	            } else if (!item.props.disabled && item.key && this.disabledTreeNodes.some((node: DisabledTreeNode) => node.key === item.key)) {
	                this.disabledTreeNodes = this.disabledTreeNodes.filter((node: DisabledTreeNode) => node.key !== item.key)
	            }
	            if (item.key && loadedKeys.some((key: string) => key === item.key)) {
	                newLoadedKeys.push(item.key + '')
	            }
	        });
	    }
	    let flatTreeDataDone = false;// 已经更新过flatTree
	    const { startIndex, endIndex, props, state } = this;
	    const { prevProps } = state;
	    const expandedKeys = this.getDefaultExpandedKeys(nextProps, true);
	    const checkedKeys = this.getDefaultCheckedKeys(nextProps, true);
	    const selectedKeys = this.getDefaultSelectedKeys(nextProps, true);
	    const st: Partial<UpdateStateObj> = {
	        prevProps: nextProps
	    };
	    // 用于记录这次data内容有没有变化
	    this.dataChange = false;

	    function needSync(name: keyof TreeProps) {
	        return (!prevProps && name in nextProps) || (prevProps && prevProps[name] !== nextProps[name]);
	    }

	    // ================ expandedKeys =================
	    if (needSync('expandedKeys') || (prevProps && needSync('autoExpandParent')) || (prevProps && prevProps.expandedKeys !== expandedKeys)) {
	        st.expandedKeys = expandedKeys;
	    } else if ((!prevProps && props.defaultExpandAll) || (!prevProps && props.defaultExpandedKeys)) {
	        st.expandedKeys = this.getDefaultExpandedKeys(nextProps);
	    }
	    if (st.expandedKeys) {
	        // 缓存 expandedKeys
	        this.cacheExpandedKeys = new Set(expandedKeys || st.expandedKeys);
	        if (nextProps.lazyLoad) {
	            let flatTreeData = this.deepTraversal(nextProps.treeData);
	            this.cacheExpandedKeys = null;
	            st.flatTreeData = flatTreeData;
	            let newTreeList = flatTreeData.slice(startIndex, endIndex);
	            this.handleTreeListChange(newTreeList, startIndex, endIndex);
	            flatTreeDataDone = true;
	        }
	    }

	    // ================ checkedKeys =================
	    if (checkedKeys) {
	        if (nextProps.checkedKeys === this.props.checkedKeys) {
	            this.checkedKeysChange = false;
	        } else {
	            this.checkedKeysChange = true;
	        }
	        st.checkedKeys = checkedKeys as string[];
	        if (nextProps.lazyLoad && !flatTreeDataDone && this.checkedKeysChange) {
	            let flatTreeData = this.deepTraversal(nextProps.treeData);
	            st.flatTreeData = flatTreeData;
	            let newTreeList = flatTreeData.slice(startIndex, endIndex);
	            this.handleTreeListChange(newTreeList, startIndex, endIndex);
	            flatTreeDataDone = true;
	        }
	    }

	    // ================ selectedKeys =================
	    if (selectedKeys) {
	        st.selectedKeys = selectedKeys;
	    }

	    // ================ treeData =================
	    if (nextProps.hasOwnProperty('treeData') && nextProps.treeData !== this.props.treeData) {
	        this.dataChange = true;
	        // treeData更新时，需要重新处理一次数据
	        if (nextProps.lazyLoad) {
	            if (!flatTreeDataDone) {
	                let flatTreeData = this.deepTraversal(nextProps.treeData);
	                st.flatTreeData = flatTreeData;
	                let newTreeList = flatTreeData.slice(startIndex, endIndex);
	                this.handleTreeListChange(newTreeList, startIndex, endIndex);
	            }

	        } else {
	            st.treeData = nextProps.treeData || [];
	        }
	    }

	    // ================ children =================
	    if (nextProps.children !== this.props.children) {
	        this.dataChange = true;
	    }
	    if (nextProps.hasOwnProperty('loadedKeys') && nextProps.loadedKeys !== this.props.loadedKeys) {
	        st.loadedKeys = nextProps.loadedKeys;
	    } else if (!nextProps.hasOwnProperty('loadedKeys')) {
	        st.loadedKeys = newLoadedKeys;
	    }
	    this.setState(st as Pick<TreeState, 'prevProps' | 'expandedKeys' | 'flatTreeData' | 'checkedKeys' | 'selectedKeys' | 'treeData'>);
	}

	componentDidUpdate() {
	    if (!this.hasCalculateRowHeight) {
	        this.calculateRowHeight();
	    }
	}
	componentWillUnmount() {
	    this.treeNodesStates = {};
	    this.selectKeyDomPos = '';
	    this.loadedKeys = [];
	    clearTimeout(this.timer);
	}
	isRootNode = (node: React.ReactElement) => { // 该方法只作用在canCloseFreely的情况下，而且根节点只有一个
	    const { canCloseFreely } = this.props
	    if (!canCloseFreely) return false
	    const nodeKey = node.props.eventKey
	    if ((this.props?.children as React.ReactElement[])?.length === 1) {
	        return (this.props.children as React.ReactElement[])[0].key === nodeKey
	    } else if (this.cacheTreeNodes.length === 1) {
	        return this.cacheTreeNodes[0].key === nodeKey
	    } else {
	        return false
	    }
	}

	calculateRowHeight = () => {
	    const { lazyLoad, clsPrefix } = this.props;
	    // 启用懒加载，计算树节点真实高度
	    if (!lazyLoad) return;
	    const treenodes = this.tree?.querySelectorAll(`.${clsPrefix}-treenode-close`)[0];
	    if (!treenodes) return;
	    this.hasCalculateRowHeight = true;
	    let rowHeight = treenodes.getBoundingClientRect().height;
	    this.store.setState({
	        rowHeight: rowHeight || 28
	    });
	}

	onDragStart(e: React.DragEvent, treeNode: React.ReactElement) {
	    this.dragNode = treeNode;
	    this.dragNodesKeys = this.getDragNodes(treeNode);
	    const st: Partial<TreeState> = {
	        dragNodesKeys: this.dragNodesKeys,
	    };
	    if (!this.props.dragInitialState) {
	        const expandedKeys = this.getExpandedKeys(treeNode, false);
	        if (expandedKeys) {
	            // Controlled expand, save and then reset
	            this.getRawExpandedKeys();
	            st.expandedKeys = expandedKeys;
	        }
	        this.setState(st as Pick<TreeState, 'dragNodesKeys' | 'expandedKeys'>);
	    }
	    this.props.onDragStart?.({
	        event: e,
	        node: treeNode,
	    });
	    this._dropTrigger = false;
	}

	onDragEnterGap(e: React.DragEvent, treeNode: any) { // TODO: ts define type
	    const offsetTop = getOffset(treeNode.treeNodeContentWrapper).top; // TODO: ts check here
	    const offsetHeight = treeNode.treeNodeContentWrapper.offsetHeight;
	    const pageY = e.pageY || 0;
	    const gapHeight = 8;
	    // 处理 hover treenode 下半部分
	    if (pageY > offsetTop + offsetHeight - gapHeight) {
	        clearTimeout(this.timer)
	        this.timer = undefined;
	        const keyIndex = this.flatKeyTree.indexOf(treeNode.props.eventKey)
	        if (this.betweenWithKey[1] !== this.flatKeyTree[keyIndex + 1] || this.betweenWithKey[0] !== treeNode.props.eventKey) {
	            // 处理 未展开的情况
	            if (this.flatKeyTree[keyIndex + 1] && this.treeElsObj[this.flatKeyTree[keyIndex + 1]]?.props.pos.length > this.treeElsObj[this.flatKeyTree[keyIndex]]?.props.pos.length) {

	                if (this.state.expandedKeys.includes(this.flatKeyTree[keyIndex])) {
	                    this.betweenWithKey = [treeNode.props.eventKey, this.flatKeyTree[keyIndex + 1]]
	                } else {
	                    let betweenWithKey1: string = '';
	                    for (let i = keyIndex + 1; i < this.flatKeyTree.length; i++) {
	                        const element = this.flatKeyTree[i];
	                        if (this.treeElsObj[element]?.props.pos.length <= this.treeElsObj[this.flatKeyTree[keyIndex]]?.props.pos.length) {
	                            betweenWithKey1 = element
	                            break;
	                        }
	                    }
	                    this.betweenWithKey = [treeNode.props.eventKey, betweenWithKey1]
	                }
	                // 已展开情况
	            } else {
	                this.betweenWithKey = [treeNode.props.eventKey, this.flatKeyTree[keyIndex + 1]]
	            }
	            this.dragX = e.pageX;
	        }
	        this.dropPositionY = 1;
	        // 在最后一个节点下面的时候 失去插入位置
	        if (pageY > offsetTop + offsetHeight - 2 && !this.betweenWithKey[1]) {
	            this.betweenWithKey = [];
	            this.dropPositionY = undefined;
	        }
	        // if (pageY > offsetTop + offsetHeight - gapHeight) {
	        //     const { dragDelayExpandTime } = this.props;
	        //     const expandedKeys = this.getExpandedKeys(treeNode, true);
	        //     clearTimeout(this.timer)
	        //     this.timer = setTimeout(() => {
	        //         if (expandedKeys) {
	        //             this.getRawExpandedKeys();
	        //             this.setState({ expandedKeys: expandedKeys });
	        //         }
	        //     }, dragDelayExpandTime)
	        // }
	        // 处理 hover treenode 上半部分
	    } else if (pageY < offsetTop + gapHeight) {
	        clearTimeout(this.timer)
	        this.timer = undefined;
	        const keyIndex = this.flatKeyTree.indexOf(treeNode.props.eventKey)
	        if (this.betweenWithKey[0] !== this.flatKeyTree[keyIndex - 1] || this.betweenWithKey[1] !== treeNode.props.eventKey) {
	            // 处理 上级节点 未展开的情况
	            if (this.flatKeyTree[keyIndex - 1] && this.treeElsObj[this.flatKeyTree[keyIndex - 1]]?.props.pos.length > this.treeElsObj[this.flatKeyTree[keyIndex]]?.props.pos.length) {
	                let parentTree;
	                if (this.flatKeyTree[keyIndex - 1]) {
	                    const prePos = this.treeElsObj[this.flatKeyTree[keyIndex - 1]]?.props.pos.split('-');
	                    const curPosLength = treeNode.props.pos.split('-').length;
	                    for (let i = curPosLength - 1; i < prePos.length; i++) {
	                        const parentPos = prePos.slice(0, i + 1).join('-');
	                        parentTree = Object.values(this.treeElsObj).find(tree => tree.props.pos === parentPos);
	                        if (!this.state.expandedKeys?.includes(parentTree.props.eventKey)) {
	                            break;
	                        }
	                    }
	                }
	                if (!parentTree) {
	                    this.betweenWithKey = [this.flatKeyTree[keyIndex - 1], treeNode.props.eventKey]
	                } else {
	                    this.betweenWithKey = [parentTree!.props.eventKey, treeNode.props.eventKey]
	                }
	                // 处理 已展开的情况
	            } else {
	                this.betweenWithKey = [this.flatKeyTree[keyIndex - 1], treeNode.props.eventKey]
	            }
	            this.dragX = e.pageX;
	        }
	        this.dropPositionY = this.betweenWithKey[0] ? 2 : -1;
	        // 在第一个节点上面的时候  失去插入位置
	        if (this.dropPositionY === -1 && pageY < offsetTop) {
	            this.betweenWithKey = [];
	            this.dropPositionY = undefined;
	        }
	        // if (pageY < offsetTop + gapHeight - gapHeight) {
	        //     const { dragDelayExpandTime } = this.props;
	        //     const expandedKeys = this.getExpandedKeys(treeNode, true);
	        //     clearTimeout(this.timer)
	        //     this.timer = setTimeout(() => {
	        //         if (expandedKeys) {
	        //             this.getRawExpandedKeys();
	        //             this.setState({ expandedKeys: expandedKeys });
	        //         }
	        //     }, dragDelayExpandTime)
	        // }
	    } else {
	        // 这个情况处理 覆盖在节点只上的情况
	        this.dropPositionY = 0;
	        this.betweenWithKey[0] = treeNode.props.eventKey;
	        this.betweenWithKey[1] = treeNode.props.eventKey;
	        this.dragX = e.pageX;
	        if (this.state.dragOverNodeKey === treeNode.props.eventKey) {
	            if (!this.timer && !this.props.dragInitialState) {
	                const { dragDelayExpandTime } = this.props;
	                const expandedKeys = this.getExpandedKeys(treeNode, true);
	                this.timer = setTimeout(() => {
	                    if (expandedKeys) {
	                        this.getRawExpandedKeys();
	                        this.setState({ expandedKeys: expandedKeys });
	                    }
	                }, dragDelayExpandTime)
	            }
	        }
	    }
	    // // 处理 拖拽到本体位置
	    // if (this.betweenWithKey?.[0] === this.dragNode?.props.eventKey) {
	    //     return this.dropPositionY = undefined;
	    // }
	}

	onDragEnter(e: React.DragEvent, treeNode: React.ReactElement) {
	    // const { dragDelayExpandTime } = this.props;
	    const expandedKeys = this.getExpandedKeys(treeNode, true);
	    // clearTimeout(this.timer)
	    // this.timer = setTimeout(() => {
	    //     if (expandedKeys) {
	    //         this.getRawExpandedKeys();
	    //         this.setState({expandedKeys: expandedKeys});
	    //     }
	    // }, dragDelayExpandTime)
	    const posArr = treeNode.props.pos.split('-');
	    this.props.onDragEnter?.({
	        event: e,
	        node: treeNode,
	        expandedKeys: expandedKeys && [...expandedKeys] || [...this.state.expandedKeys],
	        dropPosition: dropMap[this.dropPositionX] as number + Number(posArr[posArr.length - 1]),
	    });
	}
	// 由 回到的结果 决定
	dragOverCallBack = (e: React.DragEvent, treeNode: any, position: {statePosition: string; positionX?: string}) => {
	    const {statePosition, positionX} = position;
	    const allowPisitionX = this.props.onDragOver?.({
	        event: e,
	        node: treeNode,
	        extension: {
	            dropPosition: statePosition,
	            dropPositionX: positionX || statePosition
	        }
	    });
	    if (typeof allowPisitionX === 'boolean') {
	        return allowPisitionX && this.setState({ dropPositionX: positionX || statePosition})
	    }
	    this.dropPositionX = statePosition;
	    // 兼容大数据模式，dropPositionX 不进行state 更新
	    if (!this.props.unsetDropPositionX) {
	        this.setState({dropPositionX: statePosition})
	    }
	}
	onDragOver(e: React.DragEvent, treeNode: any) {
	    if (this.state.dropPositionX !== '' && this.dragX === null) {
	        this.setState({
	            dropPositionX: ''
	        })
	    }
	    const staticNum = 20;
	    // 在父节点 和第一个组节点时 一直为right
	    if (this.dropPositionY === 0) {
	        this.dragOverCallBack(e, treeNode, {statePosition: 'right'})

	    } else if (this.dragX !== null && (this.betweenWithKey[0] && this.betweenWithKey[1] && this.treeElsObj[this.betweenWithKey[1]].props.pos.length > this.treeElsObj[this.betweenWithKey[0]].props.pos.length && this.state.expandedKeys.includes(this.betweenWithKey[0]))) {
	        this.dragOverCallBack(e, treeNode, {statePosition: 'right', positionX: 'center'})
	        // 同级 插入
	    } else if (this.dragX !== null && (this.dropPositionX !== 'center' && e.pageX >= this.dragX - staticNum && e.pageX <= this.dragX + staticNum)) {
	        this.dragOverCallBack(e, treeNode, {statePosition: 'center'})

	    } else if (this.dragX !== null && (this.dropPositionX !== 'right' && e.pageX > this.dragX + staticNum)) {
	        this.dragOverCallBack(e, treeNode, {statePosition: 'right'})

	    } else if (this.dragX !== null && (this.dropPositionX !== 'left' && e.pageX < this.dragX - staticNum)) {
	        if (this.betweenWithKey[0] && this.betweenWithKey[1] &&
				(this.treeElsObj[this.betweenWithKey[1]].props.pos.length < this.treeElsObj[this.betweenWithKey[0]].props.pos.length)) {
	            const len = this.treeElsObj[this.betweenWithKey[0]].props.pos.split('-').length - this.treeElsObj[this.betweenWithKey[1]].props.pos.split('-').length;
	            for (let i = 0; i < len + 1; i++) {
	                if (i === len && e.pageX < this.dragX - (i) * staticNum) {
	                    this.dragOverCallBack(e, treeNode, {statePosition: `left_${i}`})
	                    break;
	                }
	                if (e.pageX < this.dragX - (i) * staticNum && e.pageX > this.dragX - (i + 1) * staticNum) {
	                    this.dragOverCallBack(e, treeNode, {statePosition: `left_${i}`})
	                    break;
	                }
	            }
	        }
	    } else {
	        this.dragOverCallBack(e, treeNode, {statePosition: this.dropPositionX || 'center'}) // 到达临界点，什么条件都不满足，维持原来的position信息
	    }
	    this.onDragEnterGap(e, treeNode);

	    if ((this.dragNode as React.ReactElement)?.props?.eventKey === treeNode.props.eventKey) {
	        if (this.state.dragOverNodeKey === '') {
	            return;
	        }
	        this.setState({
	            dragOverNodeKey: '',
	        });
	        return;
	    }

	    const st: OnDragEnterState = {
	        dragOverNodeKey: treeNode.props.eventKey,
	    };
	    if (!this.props.selectedKeys?.length) {
	        st.selectedKeys = [];
	    }
	    if (this.betweenWithKey[0] && this.state.dragOverNodeKey !== this.betweenWithKey[0]) {
	        st.dragOverNodeKey = this.betweenWithKey[0]
	        this.setState(st as Pick<TreeState, 'dragOverNodeKey' | 'expandedKeys'>);
	    }
	}

	onDragLeave(e: React.DragEvent, treeNode: React.ReactElement) {
	    this.props.onDragLeave?.({
	        event: e,
	        node: treeNode
	    });
	}

	onDrop(e: React.DragEvent, treeNode: React.ReactElement) {
	    // if (this.betweenWithKey.includes(this.dragNode?.props.eventKey)) {
	    //     return
	    // }
	    // if (this.betweenWithKey?.[0] === this.dragNode?.props.eventKey) {
	    //     return this.dropPositionY = undefined;
	    // }
	    const key = treeNode.props.eventKey;
	    this.setState({
	        dragOverNodeKey: '',
	        dropNodeKey: key,
	    });
	    if (this.dragNodesKeys.indexOf(key) > -1) {
	        if (console.warn) {
	            console.warn('can not drop to dragNode(include it\'s children node)');
	        }
	        return false;
	    }
	    let node = this.betweenWithKey[0] === key ? treeNode : this.treeElsObj[this.betweenWithKey[0]];
	    let dropPosition = dropMap[this.dropPositionX] as number;
	    // 在第一个 元素的上面
	    if (!this.betweenWithKey[0]) {
	        node = treeNode;
	        dropPosition = -1;
	    }
	    // 处理左侧的层级
	    if (this.dropPositionX.startsWith('left')) {
	        const len = +this.dropPositionX.split('_')[1];
	        const posArr = this.treeElsObj[this.betweenWithKey[0]].props.pos.split('-');
	        posArr.length = posArr.length - len;
	        const nodePos = posArr.join('-');
	        node = Object.values(this.treeElsObj).find(tree => tree.props.pos === nodePos)!;
	        dropPosition = 1;
	    }
	    const posArr = node.props.pos.split('-');
	    const res: OnDropInfo = {
	        event: e,
	        node: node,
	        dragNode: this.dragNode,
	        dragNodesKeys: [...this.dragNodesKeys],
	        dropPosition: dropPosition + Number(posArr[posArr.length - 1]),
	    };
	    if (dropMap[this.dropPositionX] !== 0) {
	        res.dropToGap = true;
	    }
	    if ('expandedKeys' in this.props) {
	        res.rawExpandedKeys = this._rawExpandedKeys ? [...this._rawExpandedKeys] : [...this.state.expandedKeys];
	    }
	    if (isNaN(res?.dropPosition)) {
	    }
	    this.props.onDrop?.(res);
	    this._dropTrigger = true;
	    // drop 后 防止点击展开使expanedKeys 延时 设置 结果错误
	    if (this.timer) {
	        clearTimeout(this.timer);
	    }
	}

	onDragEnd(e: React.DragEvent, treeNode: React.ReactElement) {
	    this.setState({
	        dragOverNodeKey: '',
	    });
	    this.dragNodesKeys = [];
	    this.props.onDragEnd?.({
	        event: e,
	        node: treeNode
	    });
	}

	/**
	 *
	 *
	 * @param {*} treeNode 当前操作的节点
	 * @param {*} keyType 键盘事件通用的key类型 left 为收起，right为展开
	 * @returns
	 * @memberof Tree
	 */
	onExpand(treeNode: React.ReactElement, keyType?: string, e?: React.MouseEvent | React.KeyboardEvent): undefined | Promise<any> {
	    const { treeData, lazyLoad, loadData, onLoad } = this.props;
	    const { loadedKeys } = this.state;
	    let expanded = !treeNode.props.expanded;
	    const isRootNode = this.isRootNode(treeNode)
	    this.latestState = isRootNode ? expanded : null // 非根级节点不记录状态
	    this.cachedLatestState = treeNode.props.expanded
	    this.latestTreeNode = treeNode.props
	    const controlled = 'expandedKeys' in this.props;
	    const expandedKeys = [...this.state.expandedKeys];
	    const index = expandedKeys.indexOf(treeNode.props.eventKey);

	    if (keyType == 'left') {
	        expanded = false;
	    } else if (keyType == 'right') {
	        expanded = true;
	    }

	    if (expanded && index === -1) {
	        expandedKeys.push(treeNode.props.eventKey);
	    } else if (!expanded && index > -1) {
	        expandedKeys.splice(index, 1);
	    }
	    if (!controlled) {
	        this.setState({
	            expandedKeys
	        });
	    }
	    this.props.onExpand?.(expandedKeys, {
	        node: treeNode,
	        expanded
	    }, e);
	    // 收起和展开时，缓存 expandedKeys
	    this.cacheExpandedKeys = new Set(expandedKeys);
	    // after data loaded, need set new expandedKeys
	    if (expanded && loadData) {
	        if (loadedKeys.includes(treeNode.props.eventKey) && treeNode.props.children?.length) {
	            return
	        }
	        return loadData(treeNode)?.then(() => {
	            if (!controlled) {
	                //  expandedKeys 最新的 1.当异步很快时 state.expandedKeys 存在【】的情况， 2. 快速展开多个节点  state.expandedKeys 变化过快导致后者覆盖前者
	                const allExpandedKeys = Array.from(new Set([...this.state.expandedKeys, ...expandedKeys]));
	                this.setState({
	                    expandedKeys: allExpandedKeys
	                });
	            }
	            this.loadedKeys.push(treeNode.props.eventKey);
	            const allLoadedKeys = Array.from(new Set([...loadedKeys, ...this.loadedKeys, treeNode.props.eventKey]));
	            // loadedKeys 不 受控 时 内部存放
	            if (!('loadedKeys' in this.props)) {
	                this.setState({
	                    loadedKeys: allLoadedKeys
	                })
	            }
	            onLoad?.(allLoadedKeys, {
	                event: 'load',
	                node: treeNode
	            })
	        });
	    }
	    // 启用懒加载，把 Tree 结构拍平，为后续动态截取数据做准备
	    if (lazyLoad) {
	        let flatTreeData = this.deepTraversal(treeData);
	        this.cacheExpandedKeys = null;
	        this.setState({
	            flatTreeData
	        })
	    }
	}

	getCheckedKeys = (keys = this.state.checkedKeys) => { // 传入keys列表，去除disabled状态的节点
	    let checkedKeys = [...keys]
	    for (let i = 0; i < this.disabledTreeNodes.length; i++) {
	        const key = this.disabledTreeNodes[i].key
	        const checked = this.disabledTreeNodes[i].checked
	        if (typeof checked !== 'boolean') {
	            continue
	        }
	        if (!checked && checkedKeys.includes(key)) { // 如果禁用的节点是未选中的初始状态，结果里面有这个节点，去掉这个key
	            const index = checkedKeys.indexOf(key)
	            checkedKeys.splice(index, 0)
	        } else if (checked && !checkedKeys.includes(key)) { // 如果禁用的节点是选中的状态，结果里面没有这个节点，加入这个key
	            checkedKeys.push(key)
	        }
	    }
	    return checkedKeys
	}

	onCheck = (treeNode: React.ReactElement, event?: React.MouseEvent | React.KeyboardEvent) => {
	    let checked = !treeNode.props.checked;
	    const lazyLoad = this.props.lazyLoad
	    if (treeNode.props.halfChecked) {
	        checked = true;
	    }
	    const key = treeNode.props.eventKey;
	    let checkedKeys = [...(this.state.checkedKeys as string[])];
	    const index = checkedKeys.indexOf(key); // index很有可能是-1

	    const newSt: OnCheckInfo = {
	        event: 'check',
	        node: treeNode,
	        checked,
	        eventObject: event
	    };

	    let oldCheckedKeys = (this.state.checkedKeys as string[])
	    if (this.props.checkStrictly) {
	        // feat: 参照需要按照勾选的先后顺序展示和储存
	        // let rsCheckedKeys: string[] = [];
	        if (checked && index === -1) {
	            checkedKeys.push(key);
	            // rsCheckedKeys.push(key);//onCheck第一个参数的key不对
	        }
	        if (!checked && index > -1) {
	            checkedKeys.splice(index, 1);
	        }
	        if (lazyLoad) {
	            if (this.lazyLoadTreeNodesStates[treeNode.props.pos]) {
	                this.lazyLoadTreeNodesStates[treeNode.props.pos].checked = checked;
	            } else {
	                const treeNodes: any[] = Object.values(this.lazyLoadTreeNodesStates) // TODO: define type
	                const node = treeNodes.find(node => node.key === treeNode.props.eventKey)
	                if (node && this.lazyLoadTreeNodesStates[node?.props?.pos]) {
	                    this.lazyLoadTreeNodesStates[node.props.pos].checked = checked
	                }
	            }
	        } else {
	            this.treeNodesStates[treeNode.props.pos].checked = checked;
	        }
	        newSt.checkedNodes = [];
	        let childs = this.props.children
	        const { renderTreeNodes, treeData } = this.props
	        if (renderTreeNodes && treeData) {
	            childs = renderTreeNodes(treeData)
	        }
	        if (!this.props.children && treeData) { // 传入json数据
	            childs = this.renderTreefromData(treeData);
	        }
	        loopAllChildren(childs as React.ReactElement[], (item: React.ReactElement, _ind: number, _pos: string, keyOrPos: string) => {
	            if (checkedKeys.indexOf(keyOrPos) !== -1) {
	                (newSt.checkedNodes as React.ReactNode[]).push(item);
	                // rsCheckedKeys.push(keyOrPos);
	            }
	        });
	        if (!('checkedKeys' in this.props)) {
	            this.setState({
	                checkedKeys
	            });
	        }
	        const halfChecked: string[] = this.props.checkedKeys ? (this.props.checkedKeys as CheckedKeysObj).halfChecked : []; // checkedKeys可能是数组或者对象
	        this.props.onCheck?.(getStrictlyValue(checkedKeys, halfChecked), newSt);
	    } else {
	        if (lazyLoad) {
	            let realPos = treeNode.props.pos // 这个pos信息在利用treeChildren循环渲染treeNode时，计算结果和this.lazyLoadTreeNodesStates变量中的不一致，需要找到在变量中真实的pos
	            for (let i in this.lazyLoadTreeNodesStates) {
	                if (this.lazyLoadTreeNodesStates[i].key === treeNode.props.eventKey) {
	                    realPos = i // 真实的pos
	                    break;
	                }
	            }
	            if (checked && index === -1) {
	                this.lazyLoadTreeNodesStates[realPos].checked = true; // 一律采用pos作为键，可以在check时得到父子关系
	                const checkedPositions: string[] = [];
	                Object.keys(this.lazyLoadTreeNodesStates).forEach(i => {
	                    if (this.lazyLoadTreeNodesStates[i].checked) {
	                        checkedPositions.push(i);
	                    }
	                });
	                // handleCheckState(this.lazyLoadTreeNodesStates, filterParentPosition(checkedPositions), true);
	                handleCheckState(this.lazyLoadTreeNodesStates, checkedPositions, true, []);
	            }
	            if (!checked) { // 不选中，则这个节点的选中和半选都为否
	                this.lazyLoadTreeNodesStates[realPos].checked = false;
	                this.lazyLoadTreeNodesStates[realPos].halfChecked = false;
	                handleCheckState(this.lazyLoadTreeNodesStates, [realPos], false, []); // 取消的时候，只传这个被取消掉的key
	            }
	            const checkKeys = getCheck(this.lazyLoadTreeNodesStates);
	            newSt.checkedNodes = checkKeys.checkedNodes;
	            newSt.checkedNodesPositions = checkKeys.checkedNodesPositions;
	            newSt.halfCheckedKeys = checkKeys.halfCheckedKeys;
	            newSt.checkedChildrenKeys = checkKeys.checkedChildrenKeys;
	            this.checkKeys = checkKeys;
	            this._checkedKeys = checkedKeys = this.getCheckedKeys(checkKeys.checkedKeys);
	            if (!('checkedKeys' in this.props)) {
	                if (!checked) {
	                    oldCheckedKeys = oldCheckedKeys.filter(oldCheckedKey => { // 旧的已选的数据如果被取消勾选，从旧的已选数据中去掉
	                        return oldCheckedKey !== key && checkedKeys.includes(key) // 既要直接去掉这个key，还要保证新的keys里不包含这个key的各种父级元素的key
	                    })
	                }
	                // checkedKeys = uniq([
	                //     ...oldCheckedKeys,
	                //     ...checkedKeys
	                // ])
	                checkedKeys = [...new Set([...oldCheckedKeys, ...checkedKeys])]
	                this.setState({
	                    checkedKeys: checkedKeys
	                });
	                this.checkedKeys = checkedKeys
	            }
	            this.props.onCheck?.(checkedKeys, newSt);
	        } else {
	            if (checked && index === -1) {
	                this.treeNodesStates[treeNode.props.pos].checked = true;
	                const checkedPositions: string[] = [];
	                Object.keys(this.treeNodesStates).forEach(i => {
	                    if (this.treeNodesStates[i].checked) {
	                        checkedPositions.push(i);
	                    }
	                });
	                // handleCheckState(this.treeNodesStates, filterParentPosition(checkedPositions), true);
	                handleCheckState(this.treeNodesStates, checkedPositions, true, []);
	            }
	            if (!checked) { // 不选中，则这个节点的选中和半选都为否
	                this.treeNodesStates[treeNode.props.pos].checked = false;
	                this.treeNodesStates[treeNode.props.pos].halfChecked = false;
	                handleCheckState(this.treeNodesStates, [treeNode.props.pos], false, []); // 取消的时候，只传这个被取消掉的key
	            }
	            const checkKeys = getCheck(this.treeNodesStates);
	            newSt.checkedNodes = checkKeys.checkedNodes;
	            newSt.checkedNodesPositions = checkKeys.checkedNodesPositions;
	            newSt.halfCheckedKeys = this.halfCheckedKeys = checkKeys.halfCheckedKeys;
	            newSt.checkedChildrenKeys = checkKeys.checkedChildrenKeys;
	            this.checkKeys = checkKeys;
	            this._checkedKeys = checkedKeys = this.getCheckedKeys(checkKeys.checkedKeys);
	            if (!('checkedKeys' in this.props)) {
	                if (!checked) {
	                    oldCheckedKeys = oldCheckedKeys.filter(oldCheckedKey => { // 旧的已选的数据如果被取消勾选，从旧的已选数据中去掉
	                        return oldCheckedKey !== key && checkedKeys.includes(key) // 既要直接去掉这个key，还要保证新的keys里不包含这个key的各种父级元素的key
	                    })
	                }
	                this.setState({
	                    checkedKeys
	                });
	            }
	            this.props.onCheck?.(checkedKeys, newSt);
	        }
	    }
	}

	onSelect(treeNode: React.ReactElement, event: React.MouseEvent | React.KeyboardEvent) {
	    const props = this.props;
	    const selectedKeys = [...this.state.selectedKeys];
	    const eventKey = treeNode.props.eventKey || treeNode.key;
	    const index = selectedKeys.indexOf(eventKey);
	    let selected = false; // 初始值是false
	    // cancelUnSelect为true时第二次点击时不取消选中
	    if (props.cancelUnSelect) {
	        if (index == -1) {
	            selected = true;
	            if (!props.multiple) {
	                selectedKeys.length = 0;
	            }
	            selectedKeys.push(eventKey);
	        }
	    } else {
	        if (index !== -1) {
	            selected = false;
	            selectedKeys.splice(index, 1);
	        } else {
	            selected = true;
	            if (!props.multiple) {
	                selectedKeys.length = 0;
	            }
	            selectedKeys.push(eventKey);
	        }
	    }

	    const selectedNodes: React.ReactElement[] = [];
	    if (selectedKeys.length) {
	        const treeNodes = this.props.children || treeNode.props.root.cacheTreeNodes
	        loopAllChildren(treeNodes, (item: React.ReactElement) => {
	            if (selectedKeys.indexOf(item.key as string) !== -1) {
	                selectedNodes.push(item);
	            }
	        });
	    }
	    const newSt = {
	        event: 'select',
	        eventObject: event,
	        node: treeNode,
	        selected,
	        selectedNodes,
	    };
	    if (!('selectedKeys' in this.props)) {
	        this.setState({
	            selectedKeys,
	        });
	    }
	    props.onSelect?.(selectedKeys, newSt);
	}


	onDoubleClick(treeNode: React.ReactElement) {
	    const props = this.props;
	    const eventKey = treeNode.props.eventKey;
	    const newSt = {
	        event: 'dblclick',
	        node: treeNode
	    };
	    // if (props.expandWhenDoubleClick) {
	    //     this.onExpand(treeNode, "", e);
	    // }
	    props.onDoubleClick?.(eventKey, newSt);
	}

	onMouseEnter(e: React.MouseEvent, treeNode: React.ReactElement) {
	    this.props.onMouseEnter?.({
	        event: e,
	        node: treeNode
	    });
	}

	onMouseLeave(e: React.MouseEvent, treeNode: React.ReactElement) {
	    this.props.onMouseLeave?.({
	        event: e,
	        node: treeNode
	    });
	}

	// 无使用
	onContextMenu(e: React.MouseEvent, treeNode: React.ReactElement) {
	    const selectedKeys = [...this.state.selectedKeys];
	    const eventKey = treeNode.props.eventKey;
	    if (this.contextmenuKeys.indexOf(eventKey) === -1) {
	        this.contextmenuKeys.push(eventKey);
	    }
	    this.contextmenuKeys.forEach((key) => {
	        const index = selectedKeys.indexOf(key);
	        if (index !== -1) {
	            selectedKeys.splice(index, 1);
	        }
	    });
	    if (selectedKeys.indexOf(eventKey) === -1) {
	        selectedKeys.push(eventKey);
	    }
	    this.setState({
	        selectedKeys,
	    });
	    this.props.onRightClick?.({
	        event: e,
	        node: treeNode
	    });
	}

	goDown(currentPos: string, currentIndex: string, e: React.KeyboardEvent, treeNode: React.ReactElement) {
	    const props = this.props;
	    const state = this.state;
	    let treeChildren = props.children ? props.children : this.cacheTreeNodes; // 最终渲染在 Tree 标签中的子节点
	    const nextIndex = parseInt(currentIndex) + 1;

	    let nextPos: string, backNextPos;
	    let nextTreeNode;
	    const backNextPosArr: string[] = [], backNextTreeNodeArr: React.ReactElement[] = [], tempBackNextPosArr: string[] = [];
	    // 是否为展开的节点，如果展开获取第一个子节点的信息，如果没有取相邻节点，若也没有相邻节点则获取父节点的下一个节点
	    if (state.expandedKeys.indexOf(treeNode.props.eventKey) > -1) {
	        nextPos = currentPos + '-0';
	    } else {
	        nextPos = currentPos.substr(0, currentPos.lastIndexOf('-') + 1) + nextIndex;


	    }
	    // 若向下的节点没有了，找到父级相邻节点
	    let tempPosArr = currentPos.split('-');
	    let tempPosArrLength = tempPosArr.length;
	    // 将可能是下一个节点的的位置都备份一遍
	    while (tempPosArrLength > 1) {
	        backNextPos = tempPosArrLength > 1 && tempPosArr.slice(0, tempPosArrLength - 1).join('-') + '-' + (parseInt(tempPosArr[tempPosArrLength - 1]) + 1)
	        tempBackNextPosArr.push(backNextPos as string);
	        tempPosArr = tempPosArr.slice(0, tempPosArrLength - 1)
	        tempPosArrLength = tempPosArr.length;
	    }
	    // 选中下一个相邻的节点
	    loopAllChildren(treeChildren as React.ReactElement[], (itemNode: React.ReactElement, _index: number, pos: string) => {
	        if (pos == nextPos) {
	            nextTreeNode = itemNode;
	        }
	        tempBackNextPosArr.forEach(item => {
	            if (item && item == pos) {
	                // backNextTreeNode = item;
	                backNextTreeNodeArr.push(itemNode);
	                backNextPosArr.push(pos);
	            }
	        })

	    })
	    // 如果没有下一个节点，则获取父节点的下一个节点
	    if (!nextTreeNode) {
	        for (let i = 0; i < backNextTreeNodeArr.length; i++) {
	            if (backNextTreeNodeArr[i]) {
	                nextTreeNode = backNextTreeNodeArr[i];
	                nextPos = backNextPosArr[i];
	                break;
	            }
	        }


	    }

	    // 查询的下一个节点不为空的话，则选中
	    if (nextTreeNode) {
	        const queryInfo = `a[pos="${nextPos}"]`;
	        const parentEle = closest(e.target, `.${props.clsPrefix}`)
	        const focusEle = parentEle ? parentEle.querySelector(queryInfo) : null;
	        focusEle && focusEle.focus()
	        const eventKey = nextTreeNode.props.eventKey || nextTreeNode.key;
	        this.setState({
	            focusKey: eventKey
	        })
	        if (props.autoSelectWhenFocus) {
	            this.onSelect(nextTreeNode, e);
	        }
	    } else {
	        this._setDataTransfer(e);
	        console.debug('%c[wui-tree] [goDown()] nextTreeNode is null, e ==> ', 'color:blue', e);
	    }
	}

	goUp(currentPos: string, currentIndex: string, e: React.KeyboardEvent) {
	    const props = this.props;
	    const state = this.state;
	    const { clsPrefix } = props
	    if (currentIndex == "0" && currentPos.length === 3) { // currentIndex是字符串
	        this._setDataTransfer(e);
	        console.debug('%c[wui-tree] [goUp()] return with noting to do because currentIndex == 0 && currentPos.length === 3, e ==> ', 'color:blue', e);
	        return
	    }
	    // 向上键Up
	    const preIndex = parseInt(currentIndex) - 1;
	    let prePos: string;
	    if (preIndex >= 0) {
	        prePos = currentPos.substr(0, currentPos.lastIndexOf('-') + 1) + preIndex;
	    } else {
	        prePos = currentPos.substr(0, currentPos.lastIndexOf('-'));
	    }

	    let prevTreeNode: React.ReactElement | undefined, preElement: HTMLElement | undefined | null;
	    const treeNodes = props.children || this.cacheTreeNodes
	    // 选中上一个相邻的节点
	    loopAllChildren(treeNodes as React.ReactElement[], (item: React.ReactElement, _index: number, pos: string) => {
	        if (pos == prePos) {
	            prevTreeNode = item;
	        }
	    })
	    // 查询的上一个节点不为空的话，则选中
	    if (prevTreeNode) {
	        const eventTarget = e.target as HTMLElement;
	        if (preIndex >= 0) {
	            // 如果上面的节点展开则默认选择最后一个子节点
	            if (state.expandedKeys.indexOf((prevTreeNode.key as string)) > -1) {
	                const preElementArr = props.showLine ? eventTarget?.parentElement?.parentElement?.previousElementSibling?.querySelectorAll(`.${clsPrefix}-node-content-wrapper`)
	                    : eventTarget?.parentElement?.parentElement?.previousElementSibling?.querySelectorAll(`.${clsPrefix}-node-content-wrapper`);
	                preElement = preElementArr?.[preElementArr.length - 1] as HTMLElement;
	                prePos = preElement?.getAttribute('pos') || '';
	                loopAllChildren(treeNodes as React.ReactElement[], (item: React.ReactElement, _index: number, pos: string) => {
	                    if (pos == prePos) {
	                        prevTreeNode = item;
	                    }
	                })
	            } else {
	                // 上一个节点没有展开
	                preElement = props.showLine ? eventTarget?.parentElement?.parentElement?.previousElementSibling?.querySelector(`.${clsPrefix}-node-content-wrapper`)
	                    : eventTarget?.parentElement?.parentElement?.previousElementSibling?.querySelector(`.${clsPrefix}-node-content-wrapper`)
	            }
	        } else {
	            // 不存在上一个节点时，选中它的父节点
	            preElement = props.showLine ? eventTarget?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.querySelector(`.${clsPrefix}-node-content-wrapper`)
	                : eventTarget?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.querySelector(`.${clsPrefix}-node-content-wrapper`)
	        }


	    } else {
	        this._setDataTransfer(e);
	        console.debug('%c[wui-tree] [goUp()] prevTreeNode is null, e ==> ', 'color:blue', e);
	    }
	    if (!preElement) {
	        this._setDataTransfer(e);
	        console.debug('%c[wui-tree] [goUp()] preElement is null, e ==> ', 'color:blue', e);
	    }
	    preElement && preElement.focus();
	    if (prevTreeNode) {
	        const eventKey = prevTreeNode.props.eventKey || prevTreeNode.key;
	        this.setState({
	            focusKey: eventKey
	        })
	        if (props.autoSelectWhenFocus) {
	            this.onSelect(prevTreeNode, e);
	        }
	    }
	}

	// all keyboard events callbacks run from here at first
	onKeyDown = (e: React.KeyboardEvent, treeNode: React.ReactElement) => {
	    // e.stopPropagation();
	    const props = this.props;
	    const currentPos = treeNode.props.pos;
	    const selectable = treeNode.props.selectable;
	    const currentIndex = currentPos.substr(currentPos.lastIndexOf('-') + 1);
	    // 向下键down
	    if (e.keyCode == KeyCode.DOWN) {
	        this.goDown(currentPos, currentIndex, e, treeNode);
	    } else if (e.keyCode == KeyCode.UP) {
	        this.goUp(currentPos, currentIndex, e); // 只有三个参数
	    } else if (e.keyCode == KeyCode.LEFT && !treeNode.props.isLeaf) {
	        // 收起树节点
	        this.onExpand(treeNode, 'left', e);
	    } else if (e.keyCode == KeyCode.RIGHT && !treeNode.props.isLeaf) {
	        // 展开树节点
	        this.onExpand(treeNode, 'right', e);
	    } else if (e.keyCode == KeyCode.SPACE) {
	        this.onSelect(treeNode, e);
	        // 如果是多选tree则进行选中或者反选该节点
	        props.checkable && this.onCheck(treeNode);
	    } else if (e.keyCode == KeyCode.ENTER) {
	        if (props.onDoubleClick) {
	            this.onDoubleClick(treeNode);
	        } else {
	            selectable && this.onSelect(treeNode, e);
	            props.checkable && this.onCheck(treeNode);
	        }
	    }
	    this.props.keyFun && this.props.keyFun(e, treeNode);
	    // e.preventDefault();

	}

	_setDataTransfer(e: React.KeyboardEvent) {
	    (e.target as any)._dataTransfer = { // 自定义的属性，强加到e.target上
	        ooo: 'bee-tree',
	        _cancelBubble: false // 向上层发出不取消冒泡标识，表示bee-Tree不处理该事件，上层可以处理
	    };
	}

	_focusDom = (selectKeyDomPos: string, targetDom: HTMLElement) => {
	    const queryInfo = `a[pos="${selectKeyDomPos}"]`;
	    const parentEle = closest(targetDom, `.${this.props.clsPrefix}`)
	    const focusEle = parentEle ? parentEle.querySelector(queryInfo) : null;
	    if (document.activeElement !== focusEle) {
	        focusEle && focusEle.focus();
	    }
	}

	/**
	 * 此方法为了解决树快捷键，当有的元素隐藏，按tab键也要显示的问题
	 * @param {*} e
	 */
	onUlFocus = (e: React.FocusEvent<HTMLUListElement>) => {
	    const targetDom = e.target;

	    // 如果当前tree节点不包括上一个焦点节点会触发此方法
	    if (this.tree == targetDom && !this.tree?.contains(e.relatedTarget)) {
	        const { onFocus } = this.props;
	        let children = this.props.children || this.cacheTreeNodes
	        if (children && !Array.isArray(children)) {
	            children = [children]
	        }
	        const { selectedKeys = [] } = this.state;
	        let tabIndexKey = selectedKeys[0]
	        let isExist = false;
	        const treeNode = children && (children as React.ReactElement[]).length && (children as React.ReactElement[])[0];
	        let eventKey = treeNode && (treeNode.props.eventKey || treeNode.key);
	        if ((this.selectKeyDomExist && tabIndexKey) || !tabIndexKey) {
	            isExist = true;
	            const queryInfo = `a[pos="${this.selectKeyDomPos}"]`;
	            const parentEle = closest(e.target, `.${this.props.clsPrefix}`)
	            const focusEle = parentEle ? parentEle.querySelector(queryInfo) : null;
	            focusEle && focusEle.focus();
	            // TAB键选中树后，默认聚焦在第一个（已选中）节点，并显示 focus 状态。
	            this.setState({
	                focusKey: tabIndexKey || eventKey
	            })
	        }
	        let onFocusRes: Promise<unknown> | void = onFocus && onFocus(isExist); // 这个方法没有暴露出去
	        if (onFocusRes instanceof Promise) {
	            onFocusRes.then(() => {
	                this._focusDom(this.selectKeyDomPos, targetDom);
	            });
	        } else {
	            this._focusDom(this.selectKeyDomPos, targetDom);
	        }
	    }
	}

	getFilterExpandedKeys(props: TreeProps, expandKeyProp: string, expandAll: boolean): string[] {
	    let keys: string[] = props[expandKeyProp as keyof TreeProps] as string[] || [];
	    if (expandKeyProp === 'defaultExpandedKeys' // 如果默认展开值数组有值的话，这些值不作为展开值
			&& this.autoExpandKeys
			&& this.autoExpandKeys.length
	    ) {
	        keys = []
	    }
	    if (!expandAll && !props.autoExpandParent) {
	        return keys || [];
	    }
	    let childs = props.children;
	    if (props.treeData && !childs) {
	        childs = this.renderTreefromData(props.treeData)
	    }
	    const expandedPositionArr: string[] = [];
	    if (props.autoExpandParent) {
	        loopAllChildren(childs as React.ReactElement[], (_item: React.ReactElement, _index: number, pos: string, newKey: string) => {
	            if (keys.indexOf(newKey) > -1) {
	                expandedPositionArr.push(pos);
	            }
	        });
	    }
	    const filterExpandedKeys: string[] = [];
	    const removeRoot = this.latestState === false && props.canCloseFreely
	    const cachedLatestState = this.latestState // 这个值用来判断此次刷新是否是因为点击了展开/收回
	    this.latestState = null
	    loopAllChildren(childs as React.ReactElement[], (_item: React.ReactElement, _index: number, pos: string, newKey: string) => {
	        if (expandAll) {
	            filterExpandedKeys.push(newKey);
	        } else if (props.autoExpandParent) {
	            if (expandKeyProp === 'expandedKeys' && keys.includes(newKey)) {
	                filterExpandedKeys.push(newKey); // 如果外部传来的expandedKeys本来包含了这个节点的key，就不用进行遍历，直接放到结果里
	            } else {
	                expandedPositionArr.forEach(p => {
	                    if ((p.split('-').length > pos.split('-').length && isInclude(pos.split('-'), p.split('-')) || pos === p) && filterExpandedKeys.indexOf(newKey) === -1) {
	                        if (!props.canCloseFreely || (cachedLatestState === null ? true : this.cacheExpandedKeys ? this.cacheExpandedKeys.has(newKey) : true)) {
	                            filterExpandedKeys.push(newKey);
	                        }
	                    }
	                });
	            }
	        }
	    });
	    if (removeRoot && this.latestTreeNode.eventKey && filterExpandedKeys.includes(this.latestTreeNode.eventKey)) {
	        const index = filterExpandedKeys.indexOf(this.latestTreeNode.eventKey)
	        filterExpandedKeys.splice(index, 1)
	    }
	    return filterExpandedKeys.length ? filterExpandedKeys : keys;
	}

	getDefaultExpandedKeys(props: TreeProps, willReceiveProps?: boolean) {
	    let expandedKeys = willReceiveProps ? undefined :
	        this.getFilterExpandedKeys(props, 'defaultExpandedKeys',
	            (props.defaultExpandedKeys as string[]).length ? false : (props.defaultExpandAll as boolean));
	    if ('expandedKeys' in props) {
	        expandedKeys = (props.autoExpandParent ?
	            this.getFilterExpandedKeys(props, 'expandedKeys', false) :
	            props.expandedKeys) || [];
	    }
	    return expandedKeys;
	}

	getDefaultCheckedKeys(props: TreeProps, willReceiveProps?: boolean) {
	    let checkedKeys: string[] | undefined | CheckedKeysObj = willReceiveProps ? undefined : props.defaultCheckedKeys;
	    if ('checkedKeys' in props) {
	        checkedKeys = props.checkedKeys || [];
	        if (props.checkStrictly) {
	            // if (get(props, ['checkedKeys', 'checked'])) {
	            if ((props.checkedKeys as CheckedKeysObj)?.checked) {
	                checkedKeys = (props.checkedKeys as CheckedKeysObj).checked; // 使用者传来的keys对象
	            } else if (!Array.isArray(props.checkedKeys)) {
	                checkedKeys = [];
	            }
	        }
	    }
	    return checkedKeys;
	}

	getDefaultSelectedKeys(props: TreeProps, willReceiveProps?: boolean) {
	    const getKeys = (keys: string[]) => {
	        if (props.multiple) {
	            return [...keys];
	        }
	        if (keys.length) {
	            return [keys[0]];
	        }
	        return keys;
	    };
	    let selectedKeys = willReceiveProps ? undefined : getKeys((props.defaultSelectedKeys as string[]));
	    if ('selectedKeys' in props) {
	        selectedKeys = getKeys(props.selectedKeys as string[]);
	    }
	    return selectedKeys;
	}

	getRawExpandedKeys() {
	    if (!this._rawExpandedKeys && ('expandedKeys' in this.props)) {
	        this._rawExpandedKeys = [...this.state.expandedKeys];
	    }
	}

	getOpenTransitionName() {
	    const props = this.props;
	    let transitionName = props.openTransitionName;
	    const animationName = props.openAnimation;
	    if (!transitionName && typeof animationName === 'string') {
	        transitionName = `${props.clsPrefix}-open-${animationName}`;
	    }
	    return transitionName;
	}

	getDragNodes(treeNode: React.ReactElement) {
	    const dragNodesKeys: string[] = [];
	    const tPArr = treeNode.props.pos.split('-');
	    loopAllChildren(this.props.children as React.ReactElement[], (_item: React.ReactElement, _index: number, pos: string, newKey: string) => {
	        const pArr = pos.split('-');
	        if (treeNode.props.pos === pos || tPArr.length < pArr.length && isInclude(tPArr, pArr)) {
	            dragNodesKeys.push(newKey);
	        }
	    });
	    return dragNodesKeys;
	}

	getExpandedKeys(treeNode: React.ReactElement, expand: boolean) {
	    const key = treeNode.props.eventKey;
	    const expandedKeys = this.state.expandedKeys;
	    const expandedIndex = expandedKeys.indexOf(key);
	    let exKeys;
	    if (expandedIndex > -1 && !expand) {
	        exKeys = [...expandedKeys];
	        exKeys.splice(expandedIndex, 1);
	        return exKeys;
	    }
	    if (expand && expandedKeys.indexOf(key) === -1) {
	        return expandedKeys.concat([key]);
	    }
	}

	filterTreeNode(treeNode: React.ReactElement) {
	    const filterTreeNode = this.props.filterTreeNode;
	    if (typeof filterTreeNode !== 'function' || treeNode.props.disabled) {
	        return false;
	    }
	    return filterTreeNode.call(this, treeNode);
	}

	/**
	 * 将截取后的 List 数组转换为 Tree 结构，并更新 state
	 */
	handleTreeListChange = (treeList: FlatTreeData[], startIndex?: number, endIndex?: number) => {
	    // 属性配置设置
	    let attr = {
	        id: 'key',
	        parendId: 'parentKey',
	        name: 'title',
	        rootId: null,
	        isLeaf: 'isLeaf',
	        children: this.props.fieldNames?.children || 'children'
	    };
	    let treeData = convertListToTree(treeList, attr, this.flatTreeKeysMap);
	    this.startIndex = typeof (startIndex) !== "undefined" ? startIndex : this.startIndex;
	    this.endIndex = typeof (endIndex) !== "undefined" ? endIndex : this.endIndex;

	    this.setState({
	        treeData: treeData
	    })
	    this.dataChange = true;
	}

	/**
	 * 深度遍历 treeData，把Tree数据拍平，变为一维数组
	 * @param {*} treeData
	 * @param {*} parentKey 标识父节点
	 * @param {*} isShown 该节点是否显示在页面中，当节点的父节点是展开状态 或 该节点是根节点时，该值为 true
	 */
	deepTraversal = (treeData: TreeData[] = [], parentKey: string | null = null, isShown?: boolean): FlatTreeData[] => {
	    const { fieldNames, loadData } = this.props;
	    let { expandedKeys } = this.state,
	        expandedKeysSet = this.cacheExpandedKeys ? this.cacheExpandedKeys : new Set(expandedKeys),
	        flatTreeData: FlatTreeData[] = [],
	        flatTreeKeysMap = this.flatTreeKeysMap, // 存储所有 key-value 的映射，方便获取各节点信息
	        dataCopy = treeData;
	    if (Array.isArray(dataCopy)) {
	        for (let i = 0, l = dataCopy.length; i < l; i++) {
	            let { key, title, children, ...props } = dataCopy[i],
	                dataCopyI: FlatTreeData = new Object();
	            title = fieldNames?.title ? dataCopy[i][fieldNames?.title] : title;
	            key = (fieldNames?.key ? dataCopy[i][fieldNames?.key] : key) + "";
	            children = fieldNames?.children ? dataCopy[i][fieldNames?.children] : children;
	            // 叶子 不存在子节点  排除动态加载时  children 为[] 仍 被认为 有子节点
	            const isLeaf = !(children?.length || (children?.length === 0 && loadData));
	            let isExpanded = (parentKey === null || expandedKeysSet.has(parentKey)) ? expandedKeysSet.has(key as string) : false;
	            dataCopyI = Object.assign(dataCopyI, {
	                key,
	                title,
	                isExpanded,
	                parentKey: parentKey || null,
	                isShown,
	                isLeaf
	            }, { ...props });
	            // 该节点的父节点是展开状态 或 该节点是根节点
	            if (isShown || parentKey === null) {
	                flatTreeData.push(dataCopyI); // 取每项数据放入一个新数组
	                flatTreeKeysMap[key] = dataCopyI;
	            }
	            if (Array.isArray(children) && children.length > 0 && isExpanded) {
	                // 若存在children则递归调用，把数据拼接到新数组中，并且删除该children
	                flatTreeData = flatTreeData.concat(this.deepTraversal(children, key, isExpanded));
	            }
	        }
	    }
	    return flatTreeData;
	}

	/**
	 * 根据 treeData 渲染树节点
	 * @param data 树形结构的数组
	 * @param preHeight 前置占位高度
	 * @param sufHeight 后置占位高度
	 */
	renderTreefromData = (data: TreeData[]) => {
	    let { renderTitle, renderTreeNodes, fieldid, fieldNames } = this.props;
	    if (renderTreeNodes) {
	        return renderTreeNodes(data);
	    }
	    const loop = (data: TreeData[]) => data.map((item) => {
	        let { key, title, isLeaf, children, ...others } = item;
	        title = fieldNames?.title ? item[fieldNames?.title] : title;
	        key = (fieldNames?.key ? item[fieldNames?.key] : key) + "";
	        children = fieldNames?.children ? item[fieldNames?.children] : children;

	        if (children) {
	            return (
	                <TreeNode {...omit(others, ["children"])} fieldidPrefix={fieldid ? fieldid : undefined} key={key} isLeaf={isLeaf} ext={item}
	                    title={title} onRenderTitle={renderTitle} // 优化性能
	                    // title={renderTitle ? renderTitle(item) : title} // 存在性能缺陷
	                >
	                    {loop(children)}
	                </TreeNode>
	            );
	        }
	        return <TreeNode {...others} fieldidPrefix={fieldid ? fieldid : undefined} key={key} isLeaf={isLeaf} ext={item}
	            // title={renderTitle ? renderTitle(item) : title} // 优化性能
	            title={title} onRenderTitle={renderTitle} // 存在性能缺陷
	        />;
	    });
	    return loop(data);
	}

	renderTreeNode = (child: React.ReactElement, index: number, level = 0) => {
	    // fix: 懒加载场景，index 计算错误
	    const actualIndex = index + parseInt(this.startIndex as any);
	    const pos = `${level}-${actualIndex}`;
	    if (!child) return null
	    const key: string = child.key as string || pos;
	    const fieldid: string = child.props.fieldid as string;

	    const state = this.state;
	    const props = this.props;
	    let { selectedKeys = [], dropPositionX } = this.state;
	    let tabIndexKey = selectedKeys[0]
	    if (tabIndexKey && key == tabIndexKey) {
	        this.selectKeyDomExist = true;
	        this.selectKeyDomPos = pos;
	    }
	    // prefer to child's own selectable property if passed
	    let selectable = props.selectable;
	    if (child.props.hasOwnProperty('selectable')) {
	        selectable = child.props.selectable;
	    }
	    let draggable = props.draggable;
	    if (child.props.hasOwnProperty('draggable')) {
	        draggable = child.props.draggable;
	    }
	    let isLeaf = null;
	    if (child.props.hasOwnProperty('isLeaf')) {
	        isLeaf = child.props.isLeaf;
	    }
	    let autoExpand = false // 自动点击展开
	    if (this.autoExpandKeys && this.autoExpandKeys.includes(key)) {
	        autoExpand = true
	        const index = this.autoExpandKeys.indexOf(key)
	        this.autoExpandKeys.splice(index, 0)
	        if (this.autoExpandKeys.length === 0) {
	            this.autoExpandKeys = null
	        }
	    }
	    if (props.syncCheckedAndSelectedStatus && !props.checkStrictly && props.multiple) {
	        selectedKeys = this.state.checkedKeys // 如果是多选，父子选中状态同步，多选的情况，selectedKeys和checkedKeys相等
	    }
	    const cloneProps: TreeNodeProps = {
	        root: (this as RootTreeMethods),
	        eventKey: key,
	        autoExpand,
	        pos,
	        selectable,
	        expandOnClickNode: props.expandOnClickNode,
	        loadData: props.loadData,
	        onMouseEnter: props.onMouseEnter,
	        onMouseLeave: props.onMouseLeave,
	        onRightClick: props.onRightClick,
	        onDoubleClick: props.onDoubleClick,
	        onKeyDown: props.onKeyDown,
	        clsPrefix: props.clsPrefix,
	        showLine: props.showLine,
	        showIcon: props.showIcon,
	        draggable,
	        dragOver: state.dragOverNodeKey === key && this.dropPositionY === 0,
	        dragOverGapTop: state.dragOverNodeKey === key && this.dropPositionY === -1,
	        dragOverGapBottom: state.dragOverNodeKey === key && (this.dropPositionY === 1 || this.dropPositionY === 2),
	        dropPositionX: state.dragOverNodeKey === key ? dropPositionX : undefined,
	        _dropTrigger: this._dropTrigger,
	        expanded: state.expandedKeys.indexOf(key) !== -1,
	        selected: selectedKeys.indexOf(key) !== -1,
	        focused: state.focusKey === key,
	        openTransitionName: this.getOpenTransitionName(),
	        openAnimation: props.openAnimation,
	        filterTreeNode: this.filterTreeNode.bind(this),
	        openIcon: props.openIcon,
	        closeIcon: props.closeIcon,
	        focusable: props.focusable,
	        tabIndexKey: selectedKeys[0],
	        tabIndexValue: props.tabIndexValue,
	        ext: child.props.ext,
	        mustExpandable: props.mustExpandable,
	        isLeaf,
	        fieldid: fieldid,
	        fieldidPrefix: props.fieldid,
	        syncCheckedAndSelectedStatus: props.syncCheckedAndSelectedStatus,
	        disabled: !!child?.props?.disabled || props.disabled,
	        icon: child?.props?.icon || props.icon // 没传就是null
	    };
	    if (props.checkable) {
	        cloneProps.checkable = props.checkable;
	        cloneProps.inverse = props.inverse;
	        cloneProps.getCheckboxAttrs = props.getCheckboxAttrs; // 只在树组件checkable的情况下，传递这个属性
	        if (props.checkStrictly) {
	            if (state.checkedKeys) {
	                cloneProps.checked = state.checkedKeys.indexOf(key) !== -1 || false;
	            }
	            if (props.checkedKeys && (props.checkedKeys as CheckedKeysObj).halfChecked) {
	                cloneProps.halfChecked = (props.checkedKeys as CheckedKeysObj).halfChecked.indexOf(key) !== -1 || false;
	            } else {
	                cloneProps.halfChecked = false;
	            }
	        } else {
	            if (this.checkedKeys) {
	                cloneProps.checked = this.checkedKeys.indexOf(key) !== -1 || false;
	            }
	            cloneProps.halfChecked = this.halfCheckedKeys.indexOf(key) !== -1;
	        }
	    }
	    if (props.showLine) { // 连接线需要的信息
	        const treeNodesStates = props.lazyLoad ? this.lazyLoadTreeNodesStates : this.treeNodesStates // 获得拍平的数据信息
	        cloneProps.treeNodesStatesKeysInfo = this.treeNodesStatesKeysInfo
	        cloneProps.treeNodesStates = treeNodesStates
	    }
	    if (props.focusable) { // 如果是可以被选中的节点，失去焦点（选择了别的节点，点击了其它组件）的时候清空focusKey。
	        cloneProps.onResetFocusKey = () => {
	            this.setState({
	                focusKey: ''
	            })
	        }
	    }
	    if (this.treeNodesStates && this.treeNodesStates[pos] && !this.props.lazyLoad) {
	        Object.assign(cloneProps, this.treeNodesStates[pos].siblingPosition);
	    } else if (this.lazyLoadTreeNodesStates && this.lazyLoadTreeNodesStates[pos] && this.props.lazyLoad) {
	        Object.assign(cloneProps, this.lazyLoadTreeNodesStates[pos].siblingPosition);
	    }
	    return React.cloneElement(child, cloneProps);
	}

	render() {
	    const props = this.props;
	    const {
	        showLine, clsPrefix, className, focusable, checkable, loadData, disabled, blockNode,
	        checkStrictly, tabIndexValue, lazyLoad, getScrollContainer, debounceDuration, height,
	        draggable, expandOnClickNode, dir, ...others
	    } = this.props;
	    const customProps = {
	        ...omit(others, [
	            'showIcon',
	            'onLoad',
	            'cancelUnSelect',
	            'onCheck',
	            'selectable',
	            'autoExpandParent',
	            'defaultExpandAll',
	            'onExpand',
	            'autoSelectWhenFocus',
	            // 'expandWhenDoubleClick',
	            'expandedKeys',
	            'keyFun',
	            'openIcon',
	            'closeIcon',
	            'treeData',
	            'checkedKeys',
	            'selectedKeys',
	            'renderTreeNodes',
	            'mustExpandable',
	            'onMouseEnter',
	            'onMouseLeave',
	            'onFocus',
	            'onDoubleClick',
	            'onDragStart',
	            'onDragEnter',
	            'onDragOver',
	            'onDragLeave',
	            'onDrop',
	            'onDragEnd',
	            'onSelect',
	            // "draggable",
	            "getCheckboxAttrs",
	            "fieldid",
	            "icon",
	            "openAnimation",
	            'inverse',
	            'syncCheckedAndSelectedStatus',
	            "defaultExpandedKeys",
	            "defaultCheckedKeys",
	            "fieldNames",
	            "dragDelayExpandTime",
	            "defaultSelectedKeys" // 补充几个不传到dom层的属性，会有控制台报warning
	        ])
	    }
	    const { treeData, flatTreeData } = this.state; // 实际去生成树的数据，全部的数据
	    let { startIndex, endIndex } = this, // 数据截取的开始位置和结束位置
	        preHeight = 0, // 前置占位高度
	        sufHeight = 0, // 后置占位高度
	        treeNode = [], // 根据传入的 treeData 生成的 treeNode 节点数组
	        treeChildren = props.children; // 最终渲染在 Tree 标签中的子节点
	    if (lazyLoad) { // 前后的div高度
	        const rowHeight = this.store.getState().rowHeight
	        preHeight = getSumHeight(0, startIndex, rowHeight);
	        sufHeight = getSumHeight(endIndex, flatTreeData.length, rowHeight);
	    }
	    if (!props.children && treeData) { // 传入json数据
	        treeNode = this.renderTreefromData(treeData); // 一堆树节点组件
	        this.cacheTreeNodes = treeNode;
	        treeChildren = treeNode;
	    }
	    let showLineCls = "";
	    if (showLine) {
	        showLineCls = `${clsPrefix}-show-line`;
	    }
	    let blockCls = "";
	    if (blockNode) {
	        blockCls = `${clsPrefix}-block-node`;
	    }
	    let checkableCls = ""
	    if (props.checkable) {
	        checkableCls = `${clsPrefix}-checkable`
	    }
	    let disabledCls = ""
	    if (disabled) {
	        disabledCls = `${clsPrefix}-disabled`
	    } // TODO 减少if 判断

	    let expandOnClickNodeCls = expandOnClickNode ? `${clsPrefix}-expand-on-click` : "";

	    const domProps: TreeUlDomProps = {
	        className: classNames(className, clsPrefix, `${clsPrefix}${dir === 'rtl' ? "-rtl" : ""}`, showLineCls, blockCls, checkableCls, disabledCls, expandOnClickNodeCls),
	        role: 'tree-node',
	    };

	    if (focusable) {
	        domProps.onFocus = this.onUlFocus;
	    }

	    if (props.fieldid) {
	        domProps.fieldid = props.fieldid
	    }

	    // if (props.focusable) {
	    //   // domProps.tabIndex = '0';//需求改成了默认选择第一个节点或者选中的节点
	    //   // domProps.onKeyDown = this.onKeyDown;//添加到具体的treeNode上了
	    // }
	    const getTreeNodesStates = (lazyLoad?: boolean) => { // 获取树节点状态
	        if (lazyLoad) {
	            this.lazyLoadTreeNodesStates = {};
	            this.lazyLoadAllChildren = this.renderTreefromData(this.props.treeData as TreeData[])
	            this.flatKeyTree = [];
	            this.treeElsObj = {};
	            loopAllChildren(this.lazyLoadAllChildren, (item: React.ReactElement, _index: number, pos: string, _keyOrPos: string, siblingPosition: SibilingPosition) => { // 利用真正渲染出来的children，来计算treeNodesStates
	                this.lazyLoadTreeNodesStates[pos] = {
	                    siblingPosition,
	                    node: item
	                };
	                this.flatKeyTree.push(_keyOrPos);
	                this.treeElsObj[_keyOrPos] = cloneElement(item, { pos, eventKey: _keyOrPos });
	            }, undefined, startIndex);
	        } else {
	            this.treeNodesStates = {}; // 在这里清空树节点
	            this.flatKeyTree = [];
	            this.treeElsObj = {};
	            loopAllChildren(treeChildren as React.ReactElement[], (item: React.ReactElement, _index: number, pos: string, _keyOrPos: string, siblingPosition: SibilingPosition) => { // 利用真正渲染出来的children，来计算treeNodesStates
	                this.treeNodesStates[pos] = {
	                    siblingPosition,
	                    node: item
	                };
	                this.flatKeyTree.push(_keyOrPos);
	                this.treeElsObj[_keyOrPos] = cloneElement(item, { pos, eventKey: _keyOrPos });
	            }, undefined, startIndex);
	        }
	    };
	    if ((showLine || draggable) && !checkable) {
	        if (lazyLoad) {
	            getTreeNodesStates(true);
	        } else {
	            getTreeNodesStates();
	        }
	    }
	    if (checkable && (this.checkedKeysChange || loadData || this.dataChange)) {
	        if (checkStrictly) {
	            if (lazyLoad) {
	                getTreeNodesStates(true);
	            } else {
	                getTreeNodesStates();
	            }
	        } else if (props._treeNodesStates) {
	            this.treeNodesStates = props._treeNodesStates.treeNodesStates;
	            this.halfCheckedKeys = props._treeNodesStates.halfCheckedKeys;
	            this.checkedKeys = props._treeNodesStates.checkedKeys;
	        } else {
	            const checkedKeys = this.state.checkedKeys;
	            let checkKeys;
	            if (!loadData && this.checkKeys && this._checkedKeys &&
					arraysEqual(this._checkedKeys, checkedKeys) && !this.dataChange) {
	                // if checkedKeys the same as _checkedKeys from onCheck, use _checkedKeys.
	                checkKeys = this.checkKeys;
	                if (this.props.lazyLoad) { // 只有懒加载的时候，才需要重新处理this.lazyLoadTreeNodesStates
	                    checkKeys = getCheck(this.lazyLoadTreeNodesStates);
	                    this.halfCheckedKeys = checkKeys.halfCheckedKeys;
	                    this.checkedKeys = this.getCheckedKeys(checkKeys.checkedKeys);
	                } else {
	                    this.checkedKeys = checkedKeys
	                }
	            } else {
	                if (lazyLoad) {
	                    this.lazyLoadAllChildren = this.renderTreefromData(this.props.treeData as TreeData[])
	                    const checkedPositions: string[] = [];
	                    this.treeKeysCopy = this.lazyLoadTreeNodesStates ? Object.keys(this.lazyLoadTreeNodesStates) : [];
	                    this.lazyLoadTreeNodesStates = {};
	                    const checkedKeys = this.state.checkedKeys;
	                    loopAllChildren(this.lazyLoadAllChildren as React.ReactElement[], (item: React.ReactElement, _index: number, pos: string, keyOrPos: string, siblingPosition: SibilingPosition) => {
	                        this.lazyLoadTreeNodesStates[pos] = {
	                            node: item,
	                            key: keyOrPos,
	                            checked: false,
	                            halfChecked: false,
	                            siblingPosition,
	                        };
	                        if (checkedKeys.indexOf(keyOrPos) !== -1) {
	                            this.lazyLoadTreeNodesStates[pos].checked = true;
	                            checkedPositions.push(pos);
	                        }
	                    }, undefined, this.startIndex);

	                    // const parents = filterParentPosition(checkedPositions);
	                    handleCheckState(this.lazyLoadTreeNodesStates, checkedPositions, true, this.treeKeysCopy);
	                    checkKeys = getCheck(this.lazyLoadTreeNodesStates);
	                    this.halfCheckedKeys = checkKeys.halfCheckedKeys;
	                    this.checkedKeys = this.getCheckedKeys(checkKeys.checkedKeys);

	                } else {
	                    const checkedPositions: string[] = [];
	                    this.treeKeysCopy = this.treeNodesStates ? Object.keys(this.treeNodesStates) : [];
	                    this.treeNodesStates = {}; // 也清空
	                    loopAllChildren(treeChildren as React.ReactElement[], (item: React.ReactElement, _index: number, pos: string, keyOrPos: string, siblingPosition: SibilingPosition) => {
	                        this.treeNodesStates[pos] = {
	                            node: item,
	                            key: keyOrPos,
	                            checked: false,
	                            halfChecked: false,
	                            siblingPosition,
	                        };
	                        if (checkedKeys.indexOf(keyOrPos) !== -1) {
	                            this.treeNodesStates[pos].checked = true;
	                            checkedPositions.push(pos);
	                        }
	                    }, undefined, startIndex);
	                    // if the parent node's key exists, it all children node will be checked
	                    const parents = filterParentPosition(checkedPositions);
	                    handleCheckState(this.treeNodesStates, parents, true, this.treeKeysCopy);
	                    checkKeys = getCheck(this.treeNodesStates);
	                    this.halfCheckedKeys = checkKeys.halfCheckedKeys;
	                    this.checkedKeys = this.getCheckedKeys(checkKeys.checkedKeys);
	                }
	            }
	        }
	    }
	    if (this.disabledTreeNodes.length && this.checkedKeys) {
	        for (let i = 0; i < this.disabledTreeNodes.length; i++) {
	            const keys = Object.keys(this.disabledTreeNodes[i])
	            if (!keys.includes('checked')) {
	                this.disabledTreeNodes[i].checked = this.checkedKeys.includes(this.disabledTreeNodes[i].key)
	            }
	        }
	    }
	    this.selectKeyDomExist = false;
	    const isFold = this.cachedLatestState === true;
	    if (this.props.showLine) {
	        this.treeNodesStatesKeysInfo = {}
	        const treeNodesStates = props.lazyLoad ? this.lazyLoadTreeNodesStates : this.treeNodesStates // 获得拍平的数据信息
	        for (let i in treeNodesStates) {
	            if (treeNodesStates[i]?.node?.key) {
	                this.treeNodesStatesKeysInfo[treeNodesStates[i].node.key as string] = i
	            }
	        }
	    }
	    let adapterNid = getNid(this.props)

	    return (
	        lazyLoad ?
	            <InfiniteScroll
	                className={`${clsPrefix}-infinite-scroll`}
	                treeList={flatTreeData}
	                debounceDuration={debounceDuration || 150}
	                // style={{height: `${height}px`}}
	                height={height}
	                isFold={isFold}
	                handleTreeListChange={this.handleTreeListChange}
	                getScrollParent={getScrollContainer}
	                store={this.store}
	            >
	                <ul {...domProps} unselectable={undefined} ref={(el) => {
	                    this.tree = el
	                }} tabIndex={focusable && tabIndexValue || undefined} {...customProps} {...adapterNid}>
	                    <li style={{ height: preHeight }} className={`${clsPrefix}node-start`}
	                        key={'tree_node_start'}></li>
	                    {React.Children.map(treeChildren, this.renderTreeNode)}
	                    <li style={{ height: sufHeight }} className={`${clsPrefix}node-end`} key={'tree_node_end'}></li>
	                </ul>
	            </InfiniteScroll>
	            :
	            <ul {...domProps} unselectable={undefined} ref={(el) => {
	                this.tree = el
	            }} tabIndex={focusable && tabIndexValue || undefined} {...customProps} {...adapterNid}>
	                {React.Children.map(treeChildren, this.renderTreeNode)}
	            </ul>
	    );
	}
}

// Tree.propTypes = propTypes;
export default Tree;

/**
 * 处理滚动加载逻辑
 */
import omit from "omit.js"
// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CONFIG from './config';
// import { throttle } from './util';
import { getSumHeight } from './util';
import { debounce } from "../../wui-core/src/browserUtils";
import { FlatTreeData, InfiniteScrollProps, InfiniteScrollRestProps } from './iTree'

export default class InfiniteScroll extends Component<InfiniteScrollProps> {
    // static propTypes = {
    //     children: PropTypes.node.isRequired,
    //     element: PropTypes.node,
    //     ref: PropTypes.func,
    //     getScrollParent: PropTypes.func,
    //     treeList: PropTypes.array,
    //     handleTreeListChange: PropTypes.func,
    //     isFold: PropTypes.bool,
    //     useCapture: PropTypes.bool,
    //     useWindow: PropTypes.bool,
    //     debounceDuration: PropTypes.number,
    //     store: PropTypes.any,
    // };

	static defaultProps = {
	    element: 'div',
	    ref: null,
	    style: {},
	    getScrollParent: null,
	    treeList: [],
	    handleTreeListChange: () => {}
	};

	rowsInView: number
	treeList: any
	loadCount: number
	currentIndex: number
	startIndex: number
	endIndex: number
	options: any
	scrollComponent: HTMLElement | undefined
	scrollTop: number = 0

	constructor(props: InfiniteScrollProps) {
	    super(props);

	    // 默认显示20条，rowsInView根据定高算的。在非固定高下，这个只是一个大概的值。
	    this.rowsInView = CONFIG.defaultRowsInView;
	    // 一维数组
	    this.treeList = props.treeList;
	    // 一次加载多少数据
	    this.loadCount = (props.loadBuffer || CONFIG.loadBuffer) ? this.rowsInView + (props.loadBuffer ?? CONFIG.loadBuffer) * 2 : 16;
	    // 可视区第一条数据的 index
	    this.currentIndex = 0;
	    this.startIndex = this.currentIndex; // 数据开始位置
	    this.endIndex = this.currentIndex + this.loadCount; // 数据结束位置
	}

	componentDidMount() {
	    this.options = this.eventListenerOptions();
	    this.attachScrollListener();
	}

	// eslint-disable-next-line camelcase
	UNSAFE_componentWillReceiveProps(nextProps: InfiniteScrollProps) {
	    let { treeList: newTreeList } = nextProps;
	    let { treeList: oldTreeList } = this.props;
	    if (newTreeList !== oldTreeList) {
	        const isNewDataLess = (newTreeList as FlatTreeData[]).length < (oldTreeList as FlatTreeData[]).length
	        this.treeList = newTreeList;
	        this.handleScrollY(isNewDataLess, nextProps.isFold);
	    }
	}

	// componentDidUpdate() {
	//   const el = this.scrollComponent;
	//   const parentNode = this.getParentElement(el);
	//   parentNode.scrollTop = this.scrollTop;
	// };

	componentWillUnmount() {
	    this.detachScrollListener();
	    // this.detachMousewheelListener();
	}

	isPassiveSupported() {
	    let passive = false;
	    const testOptions = {
	        get passive() {
	            passive = true;
	            return '';
	        }
	    };
	    try {
	        // @ts-ignore 仅用于测试是否可以使用 passive listener
	        document.addEventListener('test', null, testOptions);
	        // @ts-ignore 仅用于测试是否可以使用 passive listener
	        document.removeEventListener('test', null, testOptions);
	    } catch (e) {
	        // ignore
	    }
	    return passive;
	}

	eventListenerOptions = () => {
	    let options: any = this.props.useCapture; // 其实没有传这个属性

	    if (this.isPassiveSupported()) {
	        options = {
	            useCapture: this.props.useCapture,
	            passive: true
	        };
	    }
	    return options;
	}

	/**
	 * 解除mousewheel事件监听
	 */
	// detachMousewheelListener() { // 这个事件没有绑定，暂时不定义解绑了
	//     let scrollEl = window;
	//     if (this.props.useWindow === false) {
	//         scrollEl = this.scrollComponent.parentNode;
	//     }

	//     scrollEl.removeEventListener(
	//         'mousewheel',
	//         this.mousewheelListener,
	//         this.options ? this.options : this.props.useCapture
	//     );
	// }

	/**
	 * 解除scroll事件监听
	 */
	detachScrollListener() {
	    let scrollEl: HTMLElement | (Window & typeof globalThis) = window;
	    if (this.props.useWindow === false) {
	        scrollEl = this.getParentElement(this.scrollComponent);
	    }

	    scrollEl.removeEventListener(
	        'scroll',
	        this.scrollOrResizeHandler,
	        this.options ? this.options : this.props.useCapture
	    );
	    scrollEl.removeEventListener(
	        'resize',
	        this.scrollOrResizeHandler,
	        this.options ? this.options : this.props.useCapture
	    );
	}

	/**
	 * 获取父组件(用户自定义父组件或者当前dom的parentNode)
	 * @param {*} el
	 */
	getParentElement(el: HTMLElement | undefined): (HTMLElement) {
	    const scrollParent =
			this.props.getScrollParent && this.props.getScrollParent();
	    if (scrollParent != null) {
	        return scrollParent;
	    }
	    return (el && el.parentNode) as HTMLElement;
	}

	filterProps(props: InfiniteScrollProps) { // 未知方法
	    return props;
	}

	/**
	 * 绑定scroll事件
	 */
	attachScrollListener() {
	    const { store, height } = this.props;
	    let parentElement = height ? this.scrollComponent : this.getParentElement(this.scrollComponent);
	    if (!parentElement) {
	        return;
	    }
	    let scrollEl = parentElement;
	    let scrollY = scrollEl && scrollEl.clientHeight;

	    let rowHeight = store.getState().rowHeight;
	    // 默认显示20条，rowsInView根据定高算的。
	    this.rowsInView = scrollY ? Math.floor(scrollY / rowHeight) : CONFIG.defaultRowsInView;
	    scrollEl.addEventListener('scroll', this.scrollOrResizeHandler,
	        this.options ? this.options : this.props.useCapture
	    );
	    scrollEl.addEventListener('resize', this.scrollOrResizeHandler,
	        this.options ? this.options : this.props.useCapture
	    );
	}
    scrollOrResizeHandler = ()=>{
        const { debounceDuration } = this.props;
        debounce(this.scrollListener(), (debounceDuration ?? 150), false)
    }

	mousewheelListener = (e: React.WheelEvent) => {
	    // Prevents Chrome hangups
	    // See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
	    if (e.deltaY === 1 && !this.isPassiveSupported()) {
	        e.preventDefault();
	    }
	}
	/**
	 * 滚动事件监听
	 */
	scrollListener = () => {
	    const { height } = this.props;
	    const el = this.scrollComponent!;
	    const parentNode = height ? el : this.getParentElement(el);
	    this.scrollTop = parentNode?.scrollTop;
	    this.handleScrollY()
	}

	/**
	 * @description 根据返回的scrollTop计算当前的索引。
	 */
	handleScrollY = (isNewDataLess?: boolean, isFold?: boolean) => {
	    const { store } = this.props;
	    const parentElement = this.getParentElement(this.scrollComponent);
	    if (!parentElement) {
	        return;
	    }
	    let scrollEl = parentElement;
	    let scrollY = scrollEl && scrollEl.clientHeight;
	    let scrollTop = scrollEl && scrollEl.scrollTop;
	    let rowHeight = store.getState().rowHeight;
	    // 默认显示20条，rowsInView根据定高算的。在非固定高下，这个只是一个大概的值。
	    this.rowsInView = scrollY ? Math.floor(scrollY / rowHeight) : CONFIG.defaultRowsInView;
	    let currentIndex = this.currentIndex,
	        startIndex = this.startIndex,
	        endIndex = this.endIndex,
	        treeList = this.treeList,
	        loadCount = this.loadCount,
	        rowsInView = this.rowsInView,
	        loadBuffer = this.props.loadBuffer ?? CONFIG.loadBuffer;
	    let index = 0;
	    let tempScrollTop = this.scrollTop;
	    // 根据 scrollTop 计算 currentIndex
	    while (tempScrollTop > 0) {
	        tempScrollTop -= rowHeight;
	        if (tempScrollTop > 0) {
	            index += 1;
	        }
	    }
	    if (isNewDataLess && !isFold) {
	        parentElement.scrollTop = 0 // 如果不是因为点击收起造成的数据减少，则滚动条回到顶部
	    }
	    // true 为向下滚动， false 为向上滚动
	    let isScrollDown = index - currentIndex > 0;

	    if (index < 0) index = 0;
	    // 如果之前的索引和下一次的不一样则重置索引和滚动的位置
	    this.currentIndex = currentIndex !== index ? index : currentIndex;

	    // 如果rowsInView 小于 缓存的数据则重新render
	    // 向下滚动 下临界值超出缓存的endIndex则重新渲染
	    if (isScrollDown && rowsInView + index > endIndex - CONFIG.rowDiff) {
	        startIndex = index - loadBuffer > 0 ? index - loadBuffer : 0;
	        endIndex = startIndex + loadCount;
	        if (endIndex > treeList.length) {
	            endIndex = treeList.length;
	        } else {
	            const rowHeight: number = store.getState().rowHeight
	            const preHeight = getSumHeight(0, startIndex, rowHeight);
	            const sufHeight = getSumHeight(endIndex, treeList.length, rowHeight);
	            if (scrollTop > preHeight + sufHeight) { // 不够再滚动一次了，直接渲染到最后一个节点
	                endIndex = treeList.length;
	            }
	        }

	        if (endIndex > this.endIndex) {
	            this.startIndex = startIndex;
	            this.endIndex = endIndex;
	            this.sliceTreeList(this.startIndex, this.endIndex);
	        }
	    }
	    // 向上滚动，当前的index是否已经加载（currentIndex），若干上临界值小于startIndex则重新渲染
	    if (!isScrollDown && index < startIndex + CONFIG.rowDiff) {
	        startIndex = index - loadBuffer;
	        if (startIndex < 0) {
	            startIndex = 0;
	        }
	        if (startIndex <= this.startIndex) {
	            this.startIndex = startIndex;
	            this.endIndex = this.startIndex + loadCount;
	            this.sliceTreeList(this.startIndex, this.endIndex);
	        }
	    }
	}

	/**
	 * 根据 startIndex 和 endIndex 截取数据
	 * @param startIndex
	 * @param endIndex
	 */
	sliceTreeList = (startIndex: number, endIndex: number) => {
	    let newTreeList = []; // 存储截取后的新数据
	    newTreeList = this.treeList.slice(startIndex, endIndex);
	    this.props.handleTreeListChange && this.props.handleTreeListChange(newTreeList, startIndex, endIndex);
	}

	render() {
	    const {
	        children,
	        element,
	        height,
	        style: styleRoot,
	        ref,
	        ...props
	    } = this.props;
	    (props as InfiniteScrollRestProps).ref = (node: HTMLElement) => {
	        this.scrollComponent = node;
	        if (ref) {
	            ref(node);
	        }
	    };
	    const style = height ? {...styleRoot, height: `${height}px`, overflowY: 'scroll'} : styleRoot;
	    const childrenArray = [children];
	    return React.createElement((element as string), {...omit(props, ["debounceDuration", "isFold", "getScrollParent", "treeList", "handleTreeListChange", "store"]), style}, childrenArray);
	}
}

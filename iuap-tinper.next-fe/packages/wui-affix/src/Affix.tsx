import classnames from 'classnames';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import omit from 'omit.js';
import ResizeObserver from 'resize-observer-polyfill';
import {Warning, getNid, cssUtil} from "../../wui-core/src";
import {addEventListener, prefix} from "../../wui-core/src/index";
import {AffixProps, AffixState} from './iAffix'

const {isShouldUpdate} = Warning;

function noop() {}

/* const propTypes = {
    container: PropTypes.object,
    getPopupContainer: PropTypes.object,
    offsetTop: PropTypes.number, /!** 距离窗口顶部达到指定偏移量后触发 *!/
    offsetBottom: PropTypes.number, /!** 距离窗口底部达到指定偏移量后触发 *!/
    horizontal: PropTypes.bool,
    target: PropTypes.func, // 不对外开放，获取滚动scroll以及resize功能
    onChange: PropTypes.func, // 状态fixed或infixed时候调用
    onTargetChange: PropTypes.func, // 功能只有一个，时时刻刻输出state的状态
    zIndex: PropTypes.number,
    canHidden: PropTypes.bool,
    childrenRef: PropTypes.object,
    initCalc: PropTypes.bool // 初始化是否计算元素位置
};*/

const defaultProps = {
    horizontal: false,
    // container: document.body,
    target: () => window,
    onChange: noop,
    onTargetChange: noop,
    zIndex: 2019,
    canHidden: false,
    childrenRef: null,
    initCalc: false
};

class Affix extends Component<AffixProps, AffixState> {
    constructor(props: AffixProps) {
        super(props);
        this.state = {
            affixed: false,
            initTop: 0,
            initBottom: 0,
            initLeft: 0,
            top: 0, // affix距离顶部的距离
            left: 0, // affix距离左边的距离
            bottom: 0, // affix距离底部的距离
            marginTop: 0, // top - containerTop
            marginBottom: 0, // bottom - containerBottom
            marginLeft: 0, // left - containerLeft
            height: 0, // affix的高度
            width: 0, // affix的宽度
            containerHeight: 0, // container的高度
            containerWidth: 0, // container的宽度
            containerId: `${prefix}-affix-container` + Math.random().toString(26).substring(2, 10),
            isMount: false // 组件是否已加载完成
        }
        // offsetTop默认值设置，如果没有offsetBottom和offsetTop属性，offsetTop默认值设置为0
        this.offsetTopCp = props.hasOwnProperty('offsetBottom') ? undefined : (props.hasOwnProperty('offsetTop') ? props.offsetTop : 0)
        this.calculate = this.calculate.bind(this);
        this.getInitPosition = this.getInitPosition.bind(this);
        this.getContainerDOM = this.getContainerDOM.bind(this);
        this.handleTargetChange = this.handleTargetChange.bind(this);
    }
    static defaultProps = defaultProps;
	offsetTopCp?: number;
	observerWidth: number = -1;
	resizeHandler!: any;
	scrollHandler!: {remove:()=> void};


	componentDidMount() {
	    const listenTarget = this.props.target?.();
	    if (listenTarget !== window) {
	        const {top} = (listenTarget as HTMLElement).getBoundingClientRect();
	        (this.offsetTopCp as number) += top;
	    }
	    if (listenTarget) {
	        if (listenTarget !== window) { // dom 绑定 onresize 不会触发 resize事件 用 ResizeObserver代替
	            this.resizeHandler = new ResizeObserver((entries) => {
	                entries.forEach((item, _index) =>{
	                    if (this.observerWidth === -1) { // 初始化宽度
	                        this.observerWidth = item.contentRect.width
	                    }
	                    if (this.observerWidth !== item.contentRect.width) { // 宽度变化时，重新计算
	                        this.observerWidth = item.contentRect.width
	                        if (this.observerWidth !== 0) { // display: none 时不重新计算
	                            this.handleTargetChange(item as any)
	                        }
	                    }
	                    // console.log('AAA-item.enyries', item.contentRect)
	                })
	            })
	            this.resizeHandler.observe(listenTarget)
	        } else {
	            this.resizeHandler = addEventListener(listenTarget, 'resize', this.handleTargetChange);
	        }
	        this.scrollHandler = addEventListener(listenTarget, 'scroll', this.handleTargetChange);
	        // listenTarget.addEventListener('resize', e=>this.handleTargetChange(e,'resize'))
	        // listenTarget.addEventListener('scroll', e=>this.handleTargetChange(e,'scroll'))
	    }
	    this.setState({
	        isMount: true
	    })
	    this.getInitPosition(undefined, true);
	}

	// eslint-disable-next-line
    UNSAFE_componentWillReceiveProps(nextProps: AffixProps) {
	    if (nextProps.getPopupContainer !== this.props.getPopupContainer) {
	        this.getInitPosition(nextProps, true);
	    }
	}

	componentWillUnmount() {
	    const listenTarget = this.props.target?.();
	    if (listenTarget) {
	        this.scrollHandler.remove();

	        if (listenTarget !== window) {
	            this.resizeHandler && this.resizeHandler.disconnect() // 关闭监听宽度
	        } else {
	            this.resizeHandler.remove();
	        }
	        // removeEventListener(listenTarget,'resize',this.handleTargetChange);
	        // removeEventListener(listenTarget,'scroll',this.handleTargetChange);
	        // listenTarget.addEventListener('resize', e=>this.handleTargetChange(e,'resize'))
	        // listenTarget.addEventListener('scroll', e=>this.handleTargetChange(e,'scroll'))
	    }
	}

	/**
	 * 获取container
	 * @return {[type]} [description]
	 */
	getContainerDOM = (nextProps?: AffixProps) => {
	    const container = nextProps ? (nextProps.getPopupContainer || nextProps.container) : (this.props.getPopupContainer || this.props.container);
	    if (!container) {
	        return document.body
	    }
	    if (container != document.body) {
	        return ReactDOM.findDOMNode(container as React.ReactInstance);
	    }
	    return container;
	}

	/**
	 * 第一次 和 每次srcoll和resize也会执行该方法
	 * initTop,initLeft，marginTop,marginLeft都是不变的
	 * @return {[type]} [description]
	 */
	getInitPosition(nextProps?: AffixProps, flag?: boolean) {
	    const container = this.getContainerDOM(nextProps) as HTMLElement;
	    // 20180927children是个变化，所以在nextprops要传入childrenRef，否则直接使用后面的语句
	    const thisElm = nextProps && nextProps.childrenRef && ReactDOM.findDOMNode(nextProps.childrenRef) as HTMLElement || ReactDOM.findDOMNode(this) as HTMLElement;
	    this.setState({
	        height: thisElm.offsetHeight,
	        width: thisElm.offsetWidth,
	        containerHeight: container.offsetHeight,
	        containerWidth: container.offsetWidth,
	    })
	    const containerRect = container.getBoundingClientRect();
	    const thisEleCon = ReactDOM.findDOMNode(this) as HTMLElement; // children是个变化的情况，top等值需要用this的值
	    const thisElemRect = thisEleCon.getBoundingClientRect();
	    let {top, left, bottom} = thisElemRect;
	    const marginTop = top - containerRect.top;
	    const marginLeft = left - containerRect.left;
	    const marginBottom = containerRect.bottom - bottom; // 距离底部距离
	    this.setState({
	        top: top,
	        left: left,
	        initTop: flag ? top : this.state.initTop,
	        initBottom: flag ? bottom : this.state.initBottom,
	        initLeft: flag ? left : this.state.initLeft,
	        marginTop: marginTop,
	        marginBottom: marginBottom,
	        marginLeft: marginLeft
	    });
	}

	/**
	 * [description]主要用于处理scroll以及reseize事件重新计算布局
	 * @param  {[object]} evt [scroll或者resize事件]
	 * 有两个函数：onChange 和 onTargetChange;
	 */
	handleTargetChange = (evt: MouseEvent) => {
	    const container = this.getContainerDOM() as HTMLElement;// 是body
	    const {top, left, bottom} = container.getBoundingClientRect()

	    this.setState({
	        top: top + this.state.marginTop, // =0是临界值，滚动条使得屏幕顶端正好在affix上面，前者一直变化后者为不变
	        left: left + this.state.marginLeft, // 原理同上
	        bottom: window.innerHeight - bottom + this.state.marginBottom, // 原理同上
	        containerHeight: container.offsetHeight,
	        containerWidth: container.offsetWidth,
	    }, () => {

	        if ((this.offsetTopCp !== undefined && this.state.top < this.offsetTopCp) || (this.props.offsetBottom !== undefined && this.state.bottom > this.props.offsetBottom)) {
	            if (this.state.affixed === false) {
	                this.props.onChange?.({affixed: true, event: evt});
	            }
	            this.setState({affixed: true}, () => {
	                this.props.onTargetChange?.(this.state);
	            });// =true,calculate起作用
	        } else if ((this.offsetTopCp !== undefined && this.state.top >= this.offsetTopCp) || (this.props.offsetBottom !== undefined && this.state.bottom <= this.props.offsetBottom)) {
	            if (this.state.affixed === true) {
	                this.props.onChange?.({affixed: false, event: evt});
	            }
	            this.setState({affixed: false}, () => {
	                this.props.onTargetChange?.(this.state);
	            })
	        } else {
	            this.props.onTargetChange?.(this.state);
	        }

	        this.getInitPosition(undefined, false);

	    });
	}

	/**
	 * 只有上面的方法handleTargetChange使得affixed=ture才会执行
	 * @return {[type]} [description]
	 */
	calculate = () => {
	    let fixStyle = {};
	    let boxStyle = {};
	    // 组件挂载完成才计算高度，否则高度获取有偏差
	    if (this.state.isMount === false) {
	        return {fixStyle, boxStyle}
	    }
	    // 组件initCalc初始化计算的时候应添加初始化高度，用户只传getPopupContainer，不传target时，以getPopupContainer坐标为基础高度(都传时以target坐标为基础)
	    if (this.props.target?.() === window && this.props.initCalc && this.getContainerDOM() !== document.body) {
	        this.offsetTopCp = this.props.offsetTop! + this.state.initTop;
	    }
	    // 20171102修改，添加(this.state.top - this.state.marginTop == 0)的判断，谨防height+offsetTop >= containerHeight, handleTargetChange中的
	    // this.state.top <= this.props.offsetTop 恒成立，一直有position:affixed
	    // initCalc 可能存在一直有position: fixed
	    if (!this.props.initCalc && (!this.state.affixed || (this.offsetTopCp !== undefined && this.state.top - this.state.marginTop == 0))) return {
	        fixStyle,
	        boxStyle
	    }
	    let h = (this.state.top - this.state.marginTop + this.state.containerHeight) - this.state.height;
	    // modal包含affix时，因modal wui-modal-content层存在transform属性导致affix组件内的fiexed定位失效变成了相对modal的定位，所以此情况要从新计算top、bottom、left
	    let isParentModalNode = cssUtil.parent(document.getElementById(this.state.containerId)!, ".wui-modal-content [tinper-next-role=container]")
	    let modalLeft = this.props?.getPopupContainer?.getBoundingClientRect()?.left || this.state.left
	    if (this.offsetTopCp !== undefined && this.state.top < this.offsetTopCp) {
	        fixStyle = {
	            position: "fixed",
	            // 修改20171102 去掉展示Affix全部内容，若是Affix内容高度大于container可展示，那么Affix只可展示部分
	            // top: this.props.canHidden ? ( h < 0 ? h : Math.min(h, this.props.offsetTop)) : ( h < 0 ? 0 : Math.min(h, this.props.offsetTop)),
	            top: isParentModalNode ? this.props.offsetTop : this.props.canHidden ? (h < 0 ? h : Math.min(h, this.offsetTopCp)) : this.offsetTopCp,
	            left: isParentModalNode ? modalLeft - this.state.left : this.props.horizontal ? this.state.initLeft : this.state.left,
	            height: this.state.height,
	            width: this.state.width,
	            zIndex: this.props.zIndex,
	        }
	        boxStyle = {height: this.state.height}
	    } else if (this.props.offsetBottom !== undefined && this.state.bottom > this.props.offsetBottom) {
	        fixStyle = {
	            position: "fixed",
	            // 修改20171102 去掉展示Affix全部内容，若是Affix内容高度大于container可展示，那么Affix只可展示部分
	            // top: this.props.canHidden ? ( h < 0 ? h : Math.min(h, this.props.offsetTop)) : ( h < 0 ? 0 : Math.min(h, this.props.offsetTop)),
	            bottom: isParentModalNode ? this.props.offsetBottom : this.props.canHidden ? (h < 0 ? h : Math.min(h, this.props.offsetBottom)) : this.props.offsetBottom,
	            left: isParentModalNode ? modalLeft - this.state.left : this.props.horizontal ? this.state.initLeft : this.state.left,
	            height: this.state.height,
	            width: this.state.width,
	            zIndex: this.props.zIndex,
	        }
	        boxStyle = {height: this.state.height}
	    }
	    return {fixStyle, boxStyle}
	}

	render() {
	    const {fixStyle, boxStyle} = this.calculate();
	    const {
	        ...others
	    } = this.props;
	    isShouldUpdate("Affix", this.props);
	    let adapterNid = getNid(this.props)
	    return (
	        <div {...omit(others, ["offsetTop", "offsetBottom", "horizontal", "container", "getPopupContainer", "target", "onChange", "onTargetChange", "zIndex", "canHidden", "childrenRef", "initCalc"])}
				 className={classnames(`${prefix}-affix-container`, this.props.className)}
				 id={this.state.containerId} style={boxStyle} {...adapterNid}>
	            <div className={`${prefix}-affix-content`} style={fixStyle}>
	                {this.props.children}
	            </div>
	        </div>
	    )
	}
}

// Affix.propTypes = propTypes;
// Affix.defaultProps = defaultProps;
export default Affix;

import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import {Warning} from "../../wui-core/src";
import {getNid, WebUI} from "../../wui-core/src/index"
import Icon from '../../wui-icon/src';
import addEventListener from '../../wui-overlay/src/utils/addEventListener';
import ownerDocument from '../../wui-overlay/src/utils/ownerDocument';
import {bindAll, isNumber} from './common/index.js';

import { DrawerProps, DrawerState } from './iDrawer'
import { WithConfigConsumer } from '../../wui-provider/src/context';
// const {isShouldUpdate} = Warning;
// const propTypes = {
//     placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
//     hasHeader: PropTypes.bool,
//     show: PropTypes.bool,
//     title: PropTypes.any,
//     className: PropTypes.string,
//     showMask: PropTypes.bool,
//     maskClosable: PropTypes.bool,
//     zIndex: PropTypes.number,
//     showClose: PropTypes.bool,
//     width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     destroyOnClose: PropTypes.bool,
//     container: PropTypes.any,
//     getContainer: PropTypes.any,
//     getPopupContainer: PropTypes.any,
//     closeIcon: PropTypes.node,
//     onClose: PropTypes.func,
//     fMaskClick: PropTypes.func,
//     drawerStyle: PropTypes.object,
//     footerStyle: PropTypes.object,
//     footer: PropTypes.node,
//     style: PropTypes.object,
//     maskStyle: PropTypes.object,
//     headerStyle: PropTypes.object,
//     bodyStyle: PropTypes.object,
//     contentWrapperStyle: PropTypes.object,
//     push: PropTypes.any,
//     forceRender: PropTypes.bool,
//     keyboard: PropTypes.bool,
//     fieldid: PropTypes.string
// }

const defaultProps = {
    placement: 'right', // 抽屉的位置有四个预置的选项:left,right,top,bottom
    hasHeader: true, // 是否显示Drawer的头部信息
    show: false, // 是否显示抽屉组件
    showMask: true, // 是否显示遮罩
    maskClosable: true, // 点击遮罩是否可以关闭抽屉
    zIndex: 100, // 抽屉容器的层级，可以修改层级
    showClose: false, // 是否显示关闭按钮
    width: 'auto', // 抽屉的宽度
    height: 'auto', // 抽屉的高度
    destroyOnClose: false, // 关闭时候是否销毁抽屉的内容
    container: 'body', // 指定 Drawer 挂载的 HTML 节点
    closeIcon: null, // 自定义关闭图标
    title: '', // 抽屉的头部的标题
    className: '', // 抽屉容器的class, 用来自定义组件样式
    drawerStyle: {}, // 用于设置 Drawer 弹出层的样式
    footer: null, // 抽屉的页脚
    footerStyle: {}, // 抽屉页脚部件的样式
    style: {}, // 可用于设置 Drawer 最外层容器的样式，和drawerStyle的区别是作用节点包括mask
    maskStyle: {}, // 遮罩样式
    headerStyle: {}, // 用于设置 Drawer 头部的样式
    bodyStyle: {}, // 可用于设置 Drawer 内容部分的样式
    contentWrapperStyle: {}, // 可用于设置 Drawer 包裹内容部分的样式
    push: true,
    autoFocus: true,
    forceRender: false,
    keyboard: false
}

const DrawerContext = React.createContext && React.createContext<any>(null);
@WithConfigConsumer()
@WebUI({name: "drawer", defaultProps})
class Drawer extends Component<DrawerProps, DrawerState> {
    constructor(props: DrawerProps) {
        super(props);
        this.state = {
            show: props.show,
            width: '0',
            // push: props.push,
            pushFlag: false
        };
        this.drawer = null;
        this.parentDrawer = null;
        bindAll(this, ['fMaskClick', 'fDrawerTransitionEnd', 'renderMask', 'renderClose', 'fCloseClick', 'renderBody', 'renderAll']);
    }

	drawer: any
	parentDrawer: any
	_onDocumentKeyupListener: any
	componentDidUpdate(preProps: DrawerProps) {
	    // 在有父级抽屉时候，子级触发父级向外移动一段距离
	    if (preProps.show != this.props.show) {
	        if (this.props.show) {
	            if (this.props.autoFocus) {
	                // 此处 timeout 不能去掉 解决 原示例中 添加的 overflow 切换 导致 滚动条闪动 问题 / dom show 时 和 focus 同时出现 也会出现闪动 问题 （领域可能仍然存在 overflow 切换）
	                setTimeout(() => {
	                    this.drawer?.focus?.();
	                }, 300)
	            }
	        }
	        if (this.parentDrawer) {
	            if (this.props.show) {
	                this.parentDrawer.push();
	            } else {
	                this.parentDrawer.pull();
	            }
	        }

	    }
	}

	// eslint-disable-next-line
    UNSAFE_componentWillReceiveProps(nextProps: DrawerProps) {
	    if ('show' in nextProps) {
	        this.setState({
	            show: nextProps.show
	        })
	    }
	}

	componentDidMount() {
	    let doc = ownerDocument(this);
	    this._onDocumentKeyupListener = addEventListener(doc, 'keyup', this.handleDocumentKeyUp);
	}

	componentWillUnmount() {
	    this._onDocumentKeyupListener.remove();
	}

	handleDocumentKeyUp = (e: React.KeyboardEvent) => {
	    if (this.props.keyboard && e.keyCode === 27) {
	        const {onClose} = this.props;
	        onClose && onClose();
	    }
	}

	push() {
	    this.setState({
	        pushFlag: true
	    })
	}

	pull() {
	    // debugger
	    this.setState({
	        pushFlag: false
	    })
	}

	fMaskClick() {
	    const {maskClosable} = this.props;
	    if (maskClosable) {
	        const {onClose} = this.props;
	        // onClose && onClose();
	        if (onClose) {
	            onClose()
	        } else {
	            this.setState({
	                show: false
	            })
	        }
	    }
	}

	fCloseClick() {
	    const {onClose} = this.props;
	    // onClose && onClose();
	    if (onClose) {
	        onClose()
	    } else {
	        this.setState({
	            show: false
	        })
	    }
	}

	fDrawerTransitionEnd() {

	}

	renderMask() {
	    const {showMask, clsPrefix, maskStyle, fieldid} = this.props;
	    let {show} = this.state
	    // mask样式
	    let maskStyleNode;
	    if (show) {
	        maskStyleNode = {
	            opacity: 1,
	            width: '100%',
	            ...maskStyle
	        }
	    } else {
	        maskStyleNode = {
	            opacity: 0,
	            width: 0
	        }
	    }
	    return (
	        showMask ?
	            <div className={`${clsPrefix}-mask`} style={maskStyleNode} onClick={this.fMaskClick} fieldid={fieldid ? fieldid + '-mask' : undefined}></div> : null
	    )
	}

	renderClose() {
	    const {showClose, closeIcon, clsPrefix, fieldid} = this.props;
	    let closeDom = closeIcon || <Icon type="uf-close"/>;
	    return (
	        showClose ? <span className={`${clsPrefix}-close`} onClick={this.fCloseClick} fieldid={fieldid ? fieldid + '-close' : undefined}>{closeDom}</span> : null
	    )
	}
	getDomNodeFromChildren = (children: React.ReactNodeArray, className: string, excludClassNames?: string[]) => {
	    if (!children) return;
	    if (!Array.isArray(children)) {
	        children = [children]
	    }
	    //  将 非标准类的内容 放置body 显示区域
	    if (excludClassNames?.length) {
	        // 兼容 不包含 标准 body情况
	        // if (children.every((child: React.ReactElement) => {
	        //     const clsPrefix = child && child.props && child.props.clsPrefix ? child.props.clsPrefix : ''
	        //     return !clsPrefix.includes(className)
	        // })) {
	        //     return null;
	        // }
	        return children.filter((child: React.ReactElement) => {
	            const clsPrefix = child && child.props && child.props.clsPrefix ? child.props.clsPrefix : ''
	            if (excludClassNames.every(className => !clsPrefix.includes(className))) {
	                return true;
	            }
	            return false;
	        })
	    }
	    return children.find((child: React.ReactElement) => {
	        const clsPrefix = child && child.props && child.props.clsPrefix ? child.props.clsPrefix : ''
	        if (!clsPrefix) return false;
	        return clsPrefix.includes(className)
	    })
	}
	renderBody() {
	    const {destroyOnClose, clsPrefix} = this.props;
	    let {show} = this.state
	    // if (destroyOnClose && !show) {
	    //     return null;
	    // }
	    let {
	        hasHeader,
	        title,
	        children,
	        width,
	        height,
	        placement,
	        drawerStyle,
	        footer,
	        footerStyle,
	        headerStyle,
	        bodyStyle,
	        push,
	        extra,
	        dir: direction
	    } = this.props;
	    let {pushFlag} = this.state;
	    // 抽屉类
	    const drawerClass = classNames(`${clsPrefix}`, `${clsPrefix}-${placement}`);
	    // 根据位置获取抽屉样式
	    const translateHideMap = {
	        left: direction === 'rtl' ? 'translateX(100%)' : 'translateX(-100%)',
	        right: direction === 'rtl' ? 'translateX(-100%)' : 'translateX(100%)',
	        top: 'translateY(-100%)',
	        bottom: 'translateY(100%)'
	    };
	    let translateShow = 'translate(0,0)';

	    if (pushFlag) {
	        let pushNum = 50;
	        if (push === true) {
	            pushNum = 50;
	        } else if (push === false) {
	            pushNum = 0
	        } else if (typeof push === 'object') {
	            if (push.distance) {
	                pushNum = parseFloat(push.distance)
	            } else {
	                pushNum = 50
	            }
	        }
	        const translateShowMap = {
	            left: `translate(${direction === 'rtl' ? -pushNum : pushNum}px,0)`,
	            right: `translate(${direction === 'rtl' ? pushNum : -pushNum}px,0)`,
	            top: `translate(0,${pushNum}px)`,
	            bottom: `translate(0,-${pushNum}px)`
	        }
	        translateShow = translateShowMap[placement];
	    }
	    const translate = show ? translateShow : translateHideMap[placement];
	    // 抽屉面板样式
	    if (isNumber(width)) {
	        width = width + 'px';
	    } else if (typeof width == 'string' && width.endsWith('%')) {
	        // width = width;
	    } else if (typeof width == 'string' && parseInt(width) > -1) {
	        width = parseInt(width) + 'px';
	    }
	    if (isNumber(height)) {
	        height = height + 'px';
	    } else if (typeof height == 'string' && height.endsWith('%')) {
	        // height = height;
	    } else if (typeof height == 'string' && parseInt(height) > -1) {
	        height = parseInt(height) + 'px';
	    }
	    if (placement == 'top' || placement == 'bottom') {
	        if (width == 'auto') {
	            width = '100%';
	        }
	    }
	    if (placement == 'left' || placement == 'right') {
	        if (height == 'auto') {
	            height = '100%';
	        }
	    }
	    let showStatus = false
	    if (!show && !destroyOnClose && (placement == 'top' || placement == 'bottom')) {
	        width = 0
	        showStatus = true
	    }
	    if (!show && !destroyOnClose && (placement == 'left' || placement == 'right')) {
	        height = 0
	        showStatus = true
	    }
	    if (show) {
	        showStatus = true
	    }
	    const drawerStyleBody = {
	        transform: translate,
	        WebkitTransform: translate,
	        width: width,
	        height: height,
	        ...drawerStyle
	    }
	    const closer = this.renderClose();
	    const header = (
	        hasHeader ? (<div className={`${clsPrefix}-header`}>
	            <div className={`${clsPrefix}-header-title`}>{title}</div>
	        </div>) : ''
	    )
	    const headerBoxClass = classNames({
	        [`${clsPrefix}-header-box`]: true,
	        [`${clsPrefix}-header-box-ishead`]: !hasHeader,
	    });
	    // let childrenContent = React.cloneElement(children, {
	    // 	style: contentWrapperStyle,
	    //   })
	    return (
	        <DrawerContext.Provider value={this}>
	            {showStatus && (
	                <div ref={(drawer) => {
	                    this.drawer = drawer
	                }} onTransitionEnd={this.fDrawerTransitionEnd} tabIndex={-1} className={drawerClass} style={drawerStyleBody}>
	                    <div className={headerBoxClass} style={headerStyle}>
	                        {header}
	                        {extra && <div className={`${clsPrefix}-extra`} style={{ right: this.props.showClose ? 40 : 20 }}>{extra}</div>}
	                        {closer}
	                    </div>
	                    <div className={`${clsPrefix}-body`} style={bodyStyle}>
	                        {this.getDomNodeFromChildren((children as React.ReactNodeArray), ``, [`${clsPrefix}-header`, `${clsPrefix}-footer`])}
	                    </div>
	                    {footer ? (
	                        <div className={`${clsPrefix}-footer`} style={footerStyle}>
	                            {footer}
	                        </div>
	                    ) : this.getDomNodeFromChildren((children as React.ReactNodeArray), `${clsPrefix}-footer`)
	                    }
	                </div>
	            )}
	        </DrawerContext.Provider>
	    )
	}

	// renderFooter () {
	// 	let { footer, footerStyle, clsPrefix } = this.props
	// 	return (
	// 		footer && (
	// 			<div className={`${clsPrefix}-footer`} style={footerStyle}>
	// 				{footer}
	// 			</div>
	// 		)
	// 	)
	// }
	renderAll(value: any) {
	    let {className, zIndex, style, forceRender, fieldid, destroyOnClose, showMask, clsPrefix} = this.props;
	    let {show} = this.state
	    if (!forceRender && destroyOnClose && !show) {
	        return null
	    }
	    // 容器类
	    // const drawercClass = classNames('drawerc', className);
		const drawercClass = classNames({
	        [`drawerc`]: true,
	        [`${clsPrefix}-hidden-mask`]: !showMask,
			[`${className}`]: className
	    });
	    // 容器样式
	    let drawercStyle: {zIndex: number | undefined, width: string | number} = {zIndex: zIndex, width: 0}
	    if (show) {
	        drawercStyle.width = '100%';
	    } else {
	        drawercStyle.width = 0;
	    }
	    Object.assign(drawercStyle, style)
	    // 获取父级抽屉
	    this.parentDrawer = value;
	    let adapterNid = getNid(this.props) // 适配nid、uitype

	    return (
	        <div className={drawercClass} style={drawercStyle} {...adapterNid} fieldid={fieldid}>
	            {this.renderMask()}
	            {this.renderBody()}
	        </div>
	    )
	}

	getParent() {
	    const {container, getContainer, getPopupContainer} = this.props; // getPopupContainer, getContainer, container属性api适配
	    const containerDom = getPopupContainer || getContainer || container;
	    if (typeof containerDom === 'string') {
	        return document.querySelector(containerDom)
	    }
	    if (typeof containerDom === 'function') {
	        let returnData = (containerDom as () => HTMLElement)()
	        if (typeof returnData === 'string') {
	            return document.querySelector(returnData)
	        } else if (typeof returnData === 'object' && (returnData as HTMLElement) instanceof window.HTMLElement) {
	            return returnData
	        } else if (typeof returnData === 'object' || typeof returnData === 'number' || typeof returnData === 'boolean' || typeof returnData === undefined) {
	            return document.querySelector('body')
	        }
	    }
	    if (typeof containerDom === 'object' && (containerDom as HTMLElement) instanceof window.HTMLElement) {
	        return containerDom
	    }
	    return document.querySelector('body')
	}

	render() {
	    // const {container} = this.props;
	    // const conDom = document.querySelector(container);
	    const conDom = this.getParent()
	    // isShouldUpdate("Drawer", this.props);

	    return (
	        ReactDOM.createPortal(<DrawerContext.Consumer>{this.renderAll}</DrawerContext.Consumer>, conDom as HTMLElement)
	    )
	}
}

// Drawer.propTypes = propTypes;
// Drawer.defaultProps = defaultProps;


export default Drawer;

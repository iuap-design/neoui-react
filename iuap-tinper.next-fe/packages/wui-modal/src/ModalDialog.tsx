import classNames from 'classnames';
import events from 'dom-helpers/events';
import omit from "omit.js";
import Resizable from 're-resizable';
import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler } from 'react-draggable';
import ResizeObserver from 'resize-observer-polyfill';
import { setComponentSize } from "../../wui-core/src/componentStyle";
import { WebUI, cssUtil, getNid, prefix } from "../../wui-core/src/index";
import { OrNull } from '../../wui-core/src/utils/type';
import { Bounds, ModalDialogProps, ModalDialogState, NumberSize, ResizableDirection } from './iModal';

const defaultProps: ModalDialogProps = {
    optimizePerformance: false,
    minHeight: 150,
    minWidth: 200,
    dragCtrlId: 0,
    clsPrefix: `${prefix}-modal`,
    bounds: null,
    contentStyle: {},
    onStart: () => {
    },
    onStop: () => {
    },
    isMaximize: false,
    maximizeDOM: null,
    showPosition: {x: null, y: null}
};

@WebUI({name: "modal", defaultProps})
class ModalDialog extends React.Component<ModalDialogProps, Partial<ModalDialogState>> {
    static defaultProps = defaultProps;
	isdraged = false;
    modalDialog: OrNull<HTMLDivElement> = null;
    resize: OrNull<HTMLDivElement> = null;
    resizable: OrNull<Resizable> = null;
    modelWrap: OrNull<HTMLDivElement> = null;
    resizeObserver: OrNull<ResizeObserver> = null;
    containerResizeObserver: OrNull<ResizeObserver> = null;
	contentResizeObserver: OrNull<ResizeObserver> = null;
    dialogWidth: number = 0;
    oldDialogWidth: number | undefined = undefined;
    position: null | {x: number; y: number} = null;
    positionOffset: undefined | {x: number; y: number} = undefined;
    resizeY = 0;
    resizeHeight: number = 0;
	maximizeRect: null | {
        width: number | string;
        height: number | string;
        transitionX: number;
        transitionY: number;
    } = null;
	rectParent: {x: number; y: number; right: number, bottom: number} = {x: 0, y: 0, right: 0, bottom: 0};
	rectChild: {width: number} = {width: 0};
	state: ModalDialogState = {
	    _bounds: undefined,
	    original: {
	        x: 0,
	        y: 0
	    },
	    isScroll: false,
	    maxWidth: Number.MAX_SAFE_INTEGER,
	    maxHeight: Number.MAX_SAFE_INTEGER,
	    width: null,
	    height: null,
	    bottomEdgeTrim: false,
	    rightEdgeTrim: false,
	    zoom: 1,
	};

	componentDidUpdate(prevProps: Readonly<ModalDialogProps>) {
	    const {resizable, draggable, contentStyle: {width}, centered, showPosition} = this.props;
	    if (resizable) {
	        let {maxWidth, maxHeight} = this.getMaxSizesFromProps();
	        if (maxWidth != this.state.maxWidth || maxHeight != this.state.maxHeight) {
	            this.setState({
	                maxWidth,
	                maxHeight
	            })
	        }
	        // 强制窗体居中设置；处理一些特殊情况导致的 窗体变化 如 通过事件增加 内容导致窗体变化
	        if (!draggable && centered === true) {
	            this.setDialogPosition(false);
	        }
	    }
	    // 强制窗体居中设置；处理一些特殊情况导致的 窗体变化 如 通过事件 、异步 增加 或通过contentStyle 设置width 内容导致窗体变化 视为初始化
	    if (!draggable && centered === true || prevProps.contentStyle.width !== width) {
	        this.setDialogPosition(true);
	    }
	    if (prevProps.showPosition.x !== showPosition.x || prevProps.showPosition.y !== showPosition.y) {
	        this.setDialogPosition(true);
	    }
	    // 处理初始化最大化,缩小后位置不准确的问题,没拖拽就居中，拖拽了就不居中
	    if (prevProps.isMaximize && !this.props.isMaximize && !this.isdraged) {
	        this.setDialogPosition(true);
	    }
	    if (prevProps.show && !this.props.show) {
	        this.isdraged = false;
	    }
	}

	componentDidMount() {
	    // 兼容工作台 内modal 拖动范围
	    this.setWorkbenchBounds();
	    this.setScrollState();
	    this.setDialogPosition(true);
	    if (this.modalDialog) {
	        this.resizeObserver = new ResizeObserver(() => {
	            this.setScrollState()
	            this.listenDialog(this.modalDialog) // 处理切换到其他页签并且改变dialog Width后，再返回时，modal未居中问题
	            this.getZoom()
	        });
	        this.resizeObserver.observe(this.modalDialog)
	    }

	    // 监听modal-container宽度变化
	    const modalContainer = document.querySelector('div[tinper-next-role=modal-container]');
	    if (modalContainer) {
	        this.containerResizeObserver = new ResizeObserver(() => {
	            // modal-container宽度改变时，重新居中
	            this.setDialogPosition(true);
	            this.isdraged = false; // 处理工作台宽度变化后，放大后缩小不居中问题
	        });
	        this.containerResizeObserver.observe(modalContainer);
	    }

	    if (this.resize) {
	        // 监听modal-content宽度变化
	        this.contentResizeObserver = new ResizeObserver(() => {
	            if (this.props.centered === true) {
	                this.setDialogPosition(false); // 设置centered，弹窗内容宽高改变时，重新居中
	            }
	        });
	        this.contentResizeObserver.observe(this.resize);
	    }
	    events.on(window, 'resize', this.setSomeState); // 浏览器窗口大小变化时重置弹窗显示位置
	}

	componentWillUnmount() {
	    events.off(window, 'resize', this.setSomeState);
	    if (this.resizeObserver) {
	        this.resizeObserver.disconnect();
	    }
	    if (this.containerResizeObserver) {
	        this.containerResizeObserver.disconnect();
	    }
	    if (this.contentResizeObserver) {
	        this.contentResizeObserver.disconnect();
	    }
	}
	getZoom = () => {
	    let winodwThis;
	    try {
	        winodwThis = window; //  兼容 window globalThis（window 兼容IE）
	    } catch (error) {
	        winodwThis = globalThis;
	    }
	    if ((winodwThis as any).jDiwork) {
	        (winodwThis as any).jDiwork.getContext((data: any) => {
	            if (data._SCALE !== this.state.zoom) {
	                this.setState({
	                    zoom: data._SCALE || 1
	                }, () => this.setDialogPosition(true))
	            }
	        })
	    } else {
	        let newZoom = (document.body.style as any).zoom === "" ? 1 : Number((document.body.style as any).zoom);
	        if (newZoom !== this.state.zoom) {
	            this.setState({
	                zoom: newZoom || 1
	            }, () => this.setDialogPosition(true))
	        }
	    }
	}
	setSomeState = (isInit : boolean) => {
	    const dialogDom: HTMLDivElement = ReactDOM.findDOMNode(this.modalDialog!) as HTMLDivElement;
	    // 判断 框体是否被 因窗口大小变化导致移出屏幕，此时重置modal位置
	    if (typeof this.props.showPosition.x !== 'number' && dialogDom && (dialogDom.scrollWidth > dialogDom.offsetWidth || dialogDom.scrollHeight > dialogDom.offsetHeight) || this.props.centered === true) {

	        this.setDialogPosition(isInit);
	    }
	    if (this.props.isMaximize && this.maximizeRect && JSON.stringify(this.maximizeRect) !== JSON.stringify(this.getMaximizeRect())) {
	        // 最大化的位置和范围发生变化
	        this.forceUpdate()
	    }
	    this.setScrollState();
	}
	// 存储 当前的scroll 状态 (判断是否穿透条件)
	setScrollState = () => {
	    if (this.props.optimizePerformance) {
	        return
	    }
	    const dialogDom = ReactDOM.findDOMNode(this.modalDialog)as HTMLDivElement;
	    if (!this.state.isScroll && (dialogDom.scrollHeight > dialogDom.clientHeight || dialogDom.scrollWidth > dialogDom.clientWidth)) {
	        this.setState({
	            isScroll: true
	        })
	    }
	    if (this.state.isScroll && dialogDom.scrollHeight <= dialogDom.clientHeight && dialogDom.scrollWidth <= dialogDom.clientWidth) {
	        this.setState({
	            isScroll: false
	        })
	    }
	}
    hasOffset = () => {
        let { _bounds } = this.state
        _bounds = _bounds || '.diwork-content-fixed'
	    if (_bounds && typeof _bounds === 'string') {
            let boundDom;
            try {
                boundDom = document.querySelector(_bounds);
            } catch (error) {
                console.error(`设置bounds值 ${_bounds} 为非法选择器，导致 设置该属性失败`)
            }
	        if (boundDom) {
                const offsets = this.calcOffsets(boundDom, {})
	            return {y: offsets.y, x: offsets.x}
	        }
	    }
        return {x: 0, y: 0}
    }

	// 设置弹窗的显示位置
	setDialogPosition = (isInit: boolean) => {
	    let {centered, showPosition: {x, y}, draggable, clsPrefix, optimizePerformance} = this.props;
	    if (optimizePerformance) { // 星网性能优化，不计算dom
	        return
	    }
	    let dialogDom = ReactDOM.findDOMNode(this.modalDialog as HTMLDivElement) as HTMLDivElement;
	    let contentDom = ReactDOM.findDOMNode(this.resize as HTMLDivElement) as HTMLDivElement;
	    let rectParent = dialogDom.getBoundingClientRect();
	    let rectChild = contentDom.getBoundingClientRect();
	    this.rectParent = rectParent
	    this.rectChild = rectChild
	    const { left: dialogLeft, top: dialogTop } = rectParent;
	    // 特殊场景 dom 层 弹窗嵌套位置
	    const popupContainer = cssUtil.parentsUntil(dialogDom, [`.${clsPrefix}-content`]);
	    // 寻找tinper-next-role=modal-container 以之为居中父元素
	    const customParent = (!popupContainer || popupContainer.nodeName === 'BODY') ? document.querySelector('div[tinper-next-role=modal-container]')?.getBoundingClientRect() : null; // 确保有挂载点时能取到父元素
	    if (customParent) {
	        rectParent = customParent
	        this.rectParent = customParent
	    }
	    if (rectParent.width === 0) return // modalDialog宽度为零时，不做居中处理
	    // 如果因为设置了bounds 导致存在Y轴偏移量 则将默认偏移量修正为30
	    const {x: offsetLeft, y: offsetTop} = this.hasOffset();
	    // 初始化固定位置
	    if (typeof x === 'number' || typeof y === 'number') {
	        if (!isInit) return;
	        if (typeof x !== 'number') {
	            // 默认 仅仅输入y时 ；x 默认居中
	            x = parseInt((rectParent.width - rectChild.width) / 2 + "");// 水平距中
	            //  如果 拖拽场景存在bounds 不使用偏移量
	            if (!draggable || !offsetLeft) {
	                x += rectParent.left;
	            }
	        }
	        if (typeof y !== 'number') {
	            const initValue = parseInt((rectParent.height - rectChild.height) / 2 + "")
	            y = initValue < 0 ? 0 : initValue
	        }

	        this.setState({original: {x: x + offsetLeft, y: y + offsetTop}}) // todo 有showPostion要加上
	        return
	    }
	    if (centered !== true && isInit !== true) return;
	    let showX = parseInt((rectParent.width - rectChild.width) / 2 + ""); // 水平距中

	    // 处理 宽度大于屏幕宽度 情况， 存在draggable时 设置bounds  有时会存在 offsetLeft/offsetTop 此时多出一个 translate
	    // 如果bounds不是tinper-next-role=modal-container，减去多出的偏移量
	    const rectParentLeft = customParent ? rectParent.left - dialogLeft : 0;
	    const rectParentTop = customParent ? rectParent.top - dialogTop : 0;

	    const isDraggableX = draggable && offsetLeft
	    showX = showX < 0 ? rectParentLeft : showX + (isDraggableX ? offsetLeft : rectParentLeft);
	    let showY = 100;// 默认距离顶部高度

	    if (centered === true || centered === 'once') {
	        const centerValue = parseInt((rectParent.height - rectChild.height) / 2 + "") + rectParentTop;
	        showY = centerValue < 0 ? 0 : centerValue;// 垂直距中
	    }
	    // showX = this.props.dir === 'rtl' ? -showX : showX;
	    // 包含初始化时默认显示的位置
	    if (this.state.original.x !== showX || this.state.original.y !== showY) {
	        // 初始化 / 更新位置 时 拖拽边角不隐藏;
	        this.setState({original: {x: showX, y: showY }, bottomEdgeTrim: false, rightEdgeTrim: false})
	    }
	};
	// 处理一种特殊情况 QDJCJS-6829
	// 处理异步打开modal时 因 某个父元素 设置了 display none ， dialog width 丢失 使得 居中失效
	// 此种情况视为异步初始化
	listenDialog = (ref : null | HTMLDivElement) => {
	    if (!ref) return;
	    // <---start----- 星网性能优化，有contentStyle.width时避免获取dom导致的重绘 ---------->
	    const { contentStyle, optimizePerformance } = this.props;
	    if (optimizePerformance) {
	        const contentStyleWidth = contentStyle?.width && parseFloat('' + contentStyle.width)
	        if (contentStyleWidth) {
	            if (this.oldDialogWidth === 0 && contentStyleWidth) {
	                this.setDialogPosition(true);
	            }
	            this.oldDialogWidth = contentStyleWidth;
	            return
	        }
	    }
	    // <---end----- 星网性能优化，有contentStyle.width时避免获取dom导致的重绘 ---------->
	    this.dialogWidth = (ReactDOM.findDOMNode(ref as HTMLDivElement) as Element).getBoundingClientRect().width;
	    if (this.oldDialogWidth === 0 && this.dialogWidth) {
	        this.setDialogPosition(true);
	    }
	    this.oldDialogWidth = this.dialogWidth;
	}
	onStart: DraggableEventHandler = (event: DraggableEvent, delta: DraggableData) => {
	    let {onStart} = this.props;
	    typeof onStart == 'function' && onStart(event, delta);
	    if (event) {
	        event.stopPropagation() // 两个可拖拽modal嵌套的时候，事件冒泡会引起两个可拖拽modal一起动
	    }
	}
	// 当ModalDialog留在可视区的宽度 < 50px 时，拖拽不生效
	onStop: DraggableEventHandler = (e: DraggableEvent, delta: DraggableData) => {
	    // 处于全屏/最大化状态下时 禁止拖动
	    if (this.props.isMaximize) {
	        return
	    }
	    const original = {
	        // 解决可能拖动到窗口外的问题
	        x: Math.floor(delta.x), // x 限制在最大值和最小值之间，左右最小留100px
	        y: Math.floor(delta.y), // y 限制在最大值和最小值之间，上不超出parent，下最小留40px
	    }
	    // delta受setWorkbenchBounds的影响，根本拖不出去
	    if (this.rectParent && this.rectChild && this.rectParent.right > 0 && this.rectParent.bottom > 0) {
	        const minX = this.rectParent.x - this.rectChild.width + 100 /** 左侧拖出至少100可见 */
	        const maxX = this.rectParent.right - 100 /** 右侧拖出至少100可见 */
	        original.x = delta.x < minX ? minX : delta.x > maxX ? maxX : delta.x; // x 限制在最大值和最小值之间，左右最小留100px
	        if (this.props.dir === 'rtl') {
	            original.x = -delta.x < minX ? minX : -delta.x > maxX ? maxX : -delta.x; // x 限制在最大值和最小值之间，左右最小留100px

	        }
	        const minY = this.rectParent.y /** 上方不超出可见区域 */
	        const maxY = this.rectParent.bottom - 40 /** 下方至少留40 */
	        // 解决可能拖动到窗口外的问题
	        original.y = delta.y < minY ? minY : delta.y > maxY ? maxY : delta.y; // y 限制在最大值和最小值之间，上不超出parent，下最小留40px
	    }
	    this.isdraged = true;
	    this.setState({original})
	    this.props.onStop(e, {...delta, ...original})
	}
	onDrag = (_e: DraggableEvent, delta: DraggableData) => {
	    const { resizable } = this.props;
	    if (resizable) {
	        this.setScrollState();
	        this.handleResizScrollbar(delta);
	    }
	}
    handleResizScrollbar = (delta: Pick<DraggableData, 'x' | 'y'>) => {
        const {rightEdgeTrim, bottomEdgeTrim} = this.state;
        // 处理re-resize 生成的多余dom在边角时产生的 滚动条 ： 在距离右侧、下侧边缘10px以内 去除对应边框外边缘的resize区域 仅保留内部resize 区域（折中方案：保证拖拽过程中无滚动条的闪动）
        if (!bottomEdgeTrim && delta.y + (this.resize as HTMLDivElement).clientHeight + 10 >= (this.modalDialog as HTMLDivElement).clientHeight) {
            this.setState({
                bottomEdgeTrim: true
            })
        }
        if (bottomEdgeTrim && delta.y + (this.resize as HTMLDivElement).clientHeight + 10 < (this.modalDialog as HTMLDivElement).clientHeight) {
            this.setState({
                bottomEdgeTrim: false
            })
        }
        if (!rightEdgeTrim && delta.x + (this.resize as HTMLDivElement).clientWidth + 10 >= (this.modalDialog as HTMLDivElement).clientWidth) {
            this.setState({
                rightEdgeTrim: true
            })
        }
        if (rightEdgeTrim && delta.x + (this.resize as HTMLDivElement).clientWidth + 10 < (this.modalDialog as HTMLDivElement).clientWidth) {
            this.setState({
                rightEdgeTrim: false
            })
        }
    }
	/* 开始resize */
	onResizeStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, dir: ResizableDirection, elementRef: HTMLDivElement) => {
	    let {onResizeStart} = this.props;

	    typeof onResizeStart === "function" && onResizeStart(e, dir, elementRef);
	};

    firstResizing = true;

	/* resizing */
	onResize = (e: MouseEvent | TouchEvent, direction: ResizableDirection, elementRef: HTMLDivElement, delta: NumberSize) => {
	    // fix QDJCJS-12488 resize-modal点击边框收起问题
	    if (delta.width === 0 && delta.height === 0) return;

	    // 仅仅点击边框 不会触发此事件 会触发onResizeStart和onResizeStop
	    if (this.firstResizing) {
	        let newState: Partial<ModalDialogState> = {};
	        if (direction === 'right' || direction === 'left') {
	            newState.width = elementRef.offsetWidth;
	        } else if (direction === 'top' || direction === 'bottom') {
	            newState.height = elementRef.offsetHeight;
	        } else {
	            newState.width = elementRef.offsetWidth;
	            newState.height = elementRef.offsetHeight;
	        }
	        this.setState(newState)
	        this.firstResizing = false;
	    }
	    let {onResize} = this.props;
	    let {original} = this.state;
	    /* resize 之前的值 */
	    let originX = original.x;
	    let originY = original.y;

	    /* 移动的位移 */
	    let moveW = delta.width;
	    let moveH = delta.height;

	    /* 移动的位移 */
	    let x = null, y = null;

	    /* 处理左上边缘 */
	    if (/topLeft/i.test(direction) && this.props.dir !== 'rtl') {
	        x = originX - moveW ;
	        y = originY - moveH;
	        this.position = {x: Math.max(x, 0), y: Math.max(y, 0)}
	    } else if (/left/i.test(direction) && this.props.dir !== 'rtl') {
	        x = originX - moveW;
	        y = originY;
	        this.position = {x: Math.max(x, 0), y}

	        /* 处理左边缘 */
	    } if (/topRight/i.test(direction) && this.props.dir === 'rtl') {
	        x = originX - moveW ;
	        y = originY - moveH;
	        this.position = {x: Math.max(x, 0), y: Math.max(y, 0)}
	    } else if (/right/i.test(direction) && this.props.dir === 'rtl') {
	        x = originX - moveW;
	        y = originY;
	        this.position = {x: Math.max(x, 0), y}

	        /* 处理左边缘 */
	    } else if (/top/i.test(direction)) {
	        x = this.props.dir === 'rtl' ? -originX : originX;
	        y = originY - moveH;
	        this.position = {x, y: Math.max(y, 0)}

	    } else {
	        this.position = null;
	    }

	    if (x || y) {
	        // 由于设置bounds,会计算positionOffset,多出一个translate(x,y),此处需要加上,解决resize弹框抖动问题 QDJCJS-12427
	        const modifiedX = Math.floor(Math.max(x as number, 0)) + Number(this.positionOffset?.x ?? 0);
	        const modifiedY = Math.max(y as number, 0) + Number(this.positionOffset?.y ?? 0);
	        elementRef.style.transform = `translate(${this.props.dir === "rtl" ? -modifiedX : modifiedX}px, ${modifiedY}px)`;
	        // 由于re-resize 不能限制鼠标向左侧和上侧屏幕之外拖拽，此处在鼠标拖拽到屏幕外后对高度和位置作出改变originY < 0时 位置置零
	        // x 方向 出现概率较小  暂不优化
	        if (typeof y === 'number' && y >= 0) {
	            this.resizeHeight = elementRef.clientHeight;
	            // 设置this.resizeY 的原因是 很大概率 onResize 不能不能捕捉 y === 0 的瞬间，此时y>0且接近0 ，下一个y会小于0，此时 this.resizeHeight 比真是的height少了一个y的距离
	            // 即elementRef.style.height = this.resizeHeight + this.resizeY
	            this.resizeY = y as number;
	        } else if (typeof y === 'number' && y < 0) {
	            elementRef.style.height = this.resizeHeight + this.resizeY + 'px';
	        }
	    }
	    if (delta.height) {
	        this.updateBodyH()
	    }

	    typeof onResize === "function" && onResize(e, direction, elementRef, delta);
	}


	/* resize 结束 */
	// e 的 类型源自 re-resizble(内部有类型错误) 此处补充 layerX/Y ;
	onResizeStop = (e: (MouseEvent | TouchEvent) & {layerX: number; layerY:number}, direction: ResizableDirection, elementRef: HTMLDivElement, delta: NumberSize) => {
	    // fix QDJCJS-12488 resize-modal点击边框收起问题
	    if (delta.width === 0 && delta.height === 0) return;

	    if (this.props.isMaximize) return;
	    const {onResizeStop, centered} = this.props;
	    // 鼠标点击边框情况 未拉伸
	    if (this.firstResizing) {
	        return
	    }
	    this.firstResizing = true;
	    let newState: Partial<ModalDialogState> = {};
	    if (direction === 'right' || direction === 'left') {
	        newState.width = elementRef.offsetWidth;
	    } else if (direction === 'top' || direction === 'bottom') {
	        newState.height = elementRef.offsetHeight;
	    } else {
	        newState.width = elementRef.offsetWidth;
	        newState.height = elementRef.offsetHeight;
	    }
	    if (this.position) {
	        newState.original = this.position
	    }

	    this.setState(newState)
	    typeof onResizeStop === "function" && onResizeStop(e, direction, elementRef, delta);
	    if (centered === true) {
	        this.setDialogPosition(false)
	    }
	    this.handleResizScrollbar({x: e.layerX, y: e.layerY});
	}

	/**
	 * 更新Modal.Body的高度
	 */
	updateBodyH = () => {
	    let $resizable = ReactDOM.findDOMNode(this.resizable as Resizable) as HTMLDivElement;
	    let $header = $resizable.querySelector(`.${prefix}-modal-header`) as HTMLDivElement;
	    let $body = $resizable.querySelector(`.${prefix}-modal-body`) as HTMLDivElement;
	    let $footer = $resizable.querySelector(`.${prefix}-modal-footer`) as HTMLDivElement;

	    let totalH: number | string = $resizable.style.height;
	    totalH = Number(totalH.replace("px", ""))
	    if ($header) {
	        totalH -= $header.offsetHeight;
	    }
	    if ($footer) {
	        totalH -= $footer.offsetHeight;
	    }
	    if ($body) {
	        $body.style.height = `${totalH}px`;
	    }
	}

	/**
	 * 获取最大宽度和高度
	 */
	getMaxSizesFromProps = () => {
	    let backDropW = this.modelWrap && this.modelWrap.offsetWidth ? this.modelWrap.offsetWidth : Number.MAX_SAFE_INTEGER;
	    let backDropH = this.modelWrap && this.modelWrap.offsetHeight ? this.modelWrap.offsetHeight : Number.MAX_SAFE_INTEGER;
	    // 小屏幕时 会有modal content 超过  背景的情况
	    const contentW = this.resize && this.resize.offsetWidth || 0;
	    const contentH = this.resize && this.resize.offsetHeight || 0;
	    const maxWidth = this.props.maxWidth || Math.max(backDropW, contentW);
	    const maxHeight = this.props.maxHeight || Math.max(backDropH, contentH);
	    return {maxWidth, maxHeight};
	}

	handleWH = (value: string | number, type?: string) => {
	    let size = value;
	    if (typeof value === "string" && value.endsWith("px")) {
	        size = Number(value.replace("px", ""));
	    } else if (typeof Number(value) === "number" && !Number.isNaN(Number(value))) {
	        size = Number(value)
	    } else if (typeof value === 'string' && value.endsWith('%') && type) {
	        let ratio = Number(value.replace('%', '')) / 100;
	        let modalDialogWH = type === 'H' ? this.modalDialog?.offsetHeight : this.modalDialog?.offsetWidth;
	        if (modalDialogWH) size = Number(modalDialogWH) * ratio;
	    }
	    return size;
	}
	renderModalContent = () => {
	    let {
	        clsPrefix,
	        children,
	        resizable,
	        contentStyle,
	        minHeight,
	        minWidth,
	        isMaximize,
	        optimizePerformance,
	        resizeClassName,
	        dir: direction
	    } = this.props;
	    let {maxWidth, maxHeight, original, width: _width, height: _height, bottomEdgeTrim, rightEdgeTrim} = this.state;
	    const _minWidth = this.handleWH(minWidth);
	    const _minHeight = this.handleWH(minHeight);
	    let propsStyle: CSSProperties = Object.assign({minHeight: _minHeight, minWidth: _minWidth}, contentStyle);
	    let _contentStyle = {transform: `translate(${ direction === 'rtl' ? -original.x : original.x}px, ${original.y}px)`};
	    if (isMaximize) {
	        this.maximizeRect = this.getMaximizeRect()
	        propsStyle = {
	            ...contentStyle,
	            width: this.maximizeRect.width,
	            height: this.maximizeRect.height,
	        }
	        _contentStyle = {transform: `translate(${direction === "rtl" ? -this.maximizeRect.transitionX : this.maximizeRect.transitionX}px, ${this.maximizeRect.transitionY}px)`};

	    }

	    if (!resizable) {
	        return (
	            <div style={{...(optimizePerformance ? {} : _contentStyle), ...propsStyle}} className={classNames([`${clsPrefix}-content`])}
					 role="document" ref={ref => this.resize = ref}>
	                {children}
	            </div>
	        )
	    }
	    const {width: initWidth, height: initHeight} = contentStyle;

	    let maxH = this.handleWH(maxHeight);
	    let maxW = this.handleWH(maxWidth);
	    // 特殊处理 优先 从state取值 经过变化的宽高
	    _width ??= initWidth;
	    _height ??= initHeight;
	    // 在没有宽高时, 需要把maxWidth，maxHeight等写入propStyle，且需要对百分比进行计算，解决内容过大（过小），resize边界和content边界不一致问题
	    propsStyle = {
	        ...propsStyle,
	        maxWidth: _width ? undefined : `${this.handleWH(maxWidth, 'W')}px`,
	        maxHeight: _height ? undefined : `${this.handleWH(maxHeight, 'H')}px`,
	        minWidth: _width ? undefined : `${this.handleWH(minWidth, 'W')}px`,
	        minHeight: _height ? undefined : `${this.handleWH(minHeight, 'H')}px`
	    }
	    let enable: {
			top?: boolean;
			right?: boolean;
			bottom?: boolean;
			left?: boolean;
			topRight?: boolean;
			bottomRight?: boolean;
			bottomLeft?: boolean;
			topLeft?: boolean;
		} | undefined = {
		    top: false,
		    right: true,
		    bottom: true,
		    left: true,
		    topRight: false,
		    bottomRight: true,
		    bottomLeft: true,
		    topLeft: false,
		};
	    if (isMaximize) {
	        _width = propsStyle.width || '100%';
	    	_height = propsStyle.height || '100%';
	        enable = {
	            top: false,
	            right: false,
	            bottom: false,
	            left: false,
	            topRight: false,
	            bottomRight: false,
	            bottomLeft: false,
	            topLeft: false,
	        }
	        maxH = '100%';
	    	maxW = '100%';
	        propsStyle = {...propsStyle, maxWidth: '100%', maxHeight: '100%'}

	    }
	    // 没有其他宽高属性时，使用默认 css 宽高
	    const contentWidth = _width ? '100%' : undefined;
	    const contentHeight = _height ? '100%' : undefined;

	    return (
	        <Resizable
	            className={classNames(`${clsPrefix}-resizbox`, resizeClassName)}
	            ref={c => {
	                this.resizable = c;
	            }}
	            style={{position: 'absolute', ..._contentStyle}}
	            onResizeStart={this.onResizeStart}
	            onResize={this.onResize}
	            onResizeStop={this.onResizeStop}
	            bounds={"window"}
	            minWidth={_minWidth}
	            minHeight={_minHeight}
	            maxWidth={maxW}
	            enable={enable}
	            maxHeight={maxH}

	            size={{width: _width, height: _height}}
	            handleWrapperClass={classNames({
	                [`${clsPrefix}-resize-bottom-trim`]: bottomEdgeTrim,
	                [`${clsPrefix}-resize-right-trim`]: rightEdgeTrim,
	            })}
	        >
	            <div
	                style={{
	                    ...propsStyle,
	                    width: contentWidth,
	                    height: contentHeight,
	                    position: "relative",
	                }}
	                className={classNames([`${clsPrefix}-content`])}
	                role="document"
	                ref={ref => this.resize = ref}
	            >
	                {children}
	            </div>
	        </Resizable>
	    )
	}
	// 渲染遮罩
	_renderBackdrop = () => {
	    const {clsPrefix, backdrop, renderBackdrop, maskClassName, onMaskClick, backdropStyle} = this.props;
	    const _maskClick = (e: React.MouseEvent<HTMLDivElement>) => {
	        onMaskClick && onMaskClick(e)
	    }
	    if (backdrop) {
	        if (typeof renderBackdrop == 'function') {
	            return renderBackdrop();
	        } else {
	            return <div className={classNames(`${clsPrefix}-mask`, maskClassName)} style={backdropStyle}
	                onClick={_maskClick}></div>;
	        }
	    } else {
	        return null;
	    }
	}

    calcOffsets = (dom: Element | null, {x = 0, y = 0}: {x?: number ; y?: number}): {x: number; y:number} => {
        const {offsetLeft, offsetTop, offsetParent} = dom as HTMLElement;
        x += offsetLeft;
        y += offsetTop;
        if (['BODY', null].includes(offsetParent?.nodeName || null)/** 父节点为body */) {
            return {x, y};
        }
        return this.calcOffsets(offsetParent, {x, y})
    }

    setWorkbenchBounds = () => {
        let {bounds} = this.props
        // 该默认配置会导致弹窗无法部分拖出.diwork-content-fixed区域，改为didMount / onStop时重置位置
        // if (!bounds && document.querySelector('.diwork-content-fixed')) {
        //     bounds = '.diwork-content-fixed';
        // }
        this.setState({
            _bounds: bounds as Bounds
        })
    }

	getMaximizePosition = () => {
	    const { maximizeDOM } = this.props;
	    const dialogDom = ReactDOM.findDOMNode(this.modalDialog as HTMLDivElement) as HTMLDivElement;
	    if (maximizeDOM && dialogDom) {
	        const _transitionY = Math.floor(maximizeDOM.getBoundingClientRect().top) - Math.floor(dialogDom.getBoundingClientRect().top);
	        const _transitionX = Math.floor(maximizeDOM.getBoundingClientRect().left) - Math.floor(dialogDom.getBoundingClientRect().left);
	        return { x: _transitionX, y: _transitionY };
	    } else return { x: 0, y: 0 };
	}
	getMaximizeRect = () => {
	    const { maximizeDOM, dir: direction } = this.props;
	    const width = maximizeDOM?.offsetWidth ? `${maximizeDOM.offsetWidth}px` : '100%'
	    const height = maximizeDOM?.offsetHeight ? `${maximizeDOM.offsetHeight}px` : '100%'
	    const transitionY = this.getMaximizePosition().y
	    const transitionX = direction === "rtl" ? -this.getMaximizePosition().x : this.getMaximizePosition().x
	    return { width, height, transitionX, transitionY };
	};

	render() {
	    const {
	        dialogClassName,
	        wrapClassName,
	        clsPrefix,
	        size,
	        style,
	        draggable,
	        zIndex,
	        show,
	        centered,
	        destroyOnClose,
	        isMaximize,
	        dragCtrlId,
	        optimizePerformance,
	        ...props
	    } = this.props;
	    let {
	        original,
	        isScroll,
	        _bounds
	    } = this.state;

	    const wrapClassNames = classNames({
	        [`${clsPrefix}`]: true,
	        [`${clsPrefix}-open`]: show,
	        [`${clsPrefix}-centered`]: centered,
	    }, wrapClassName);

	    const modalStyle: React.CSSProperties = {display: show ? 'block' : 'none'};
	    if (destroyOnClose) {
	        modalStyle.display = show ? 'block' : 'none';
	    } else {// 关闭时不销毁仅隐藏元素
	        modalStyle.visibility = show ? 'visible' : 'hidden';// 使用visibility以确保元素可计算
	    }
	    if (zIndex) {
	        modalStyle.zIndex = zIndex
	    }

	    const dialogClasses = classNames({
	        [`${clsPrefix}-dialog`]: true,
	        [`${clsPrefix}-${setComponentSize(size)}`]: setComponentSize(size),
	        [`${clsPrefix}-maximize`]: isMaximize,
	        [`${clsPrefix}-draggable`]: draggable
	    }, dialogClassName);

	    const dialogStyle: React.CSSProperties = {...style, pointerEvents: isScroll ? 'all' : 'none'}

	    if (!optimizePerformance && _bounds && typeof _bounds === 'string') {
	        let boundDom;
	        try {
	            boundDom = document.querySelector(_bounds);
	        } catch (error) {
	            console.error(`设置bounds值 ${_bounds} 为非法选择器，导致 设置该属性失败`)
	        }
	        if (boundDom) {
	            this.positionOffset = this.calcOffsets(boundDom, {})
	        }
	    }
	    let adapterNid = getNid(this.props)
	    const dom = this.renderModalContent();
	    return (
	        <div
	            {...omit(props, ["onStart", "onStop", "onMaskClick", "renderBackdrop", "maskClassName", "onResizeStart", "onResize", "onResizeStop", "backdropStyle", 'bounds'])}
	            tabIndex={-1}
	            role="dialog"
	            style={modalStyle}
	            ref={ref => this.modelWrap = ref}
	            className={wrapClassNames}
	            {...adapterNid}
	            onTouchStart={(event) => {
	                event.stopPropagation()
	            }}
	            onTouchEnd={(event) => {
	                event.stopPropagation()
	            }}
	            onTouchMove={(event) => {
	                event.stopPropagation()
	            }}
	        >
	            {this._renderBackdrop()}
	            <div
	                className={classNames(dialogClasses, optimizePerformance && `${clsPrefix}-dialog-optimize`)}
	                style={dialogStyle}
	                ref={ref => {
	                    this.modalDialog = ref;
	                    // 处理一种特殊情况 QDJCJS-6829
	                    this.listenDialog(ref);
	                }}
	            >
	                {
	                    draggable ? (
	                        <Draggable
	                            handle={`.${clsPrefix}-header-handle-${dragCtrlId}`}
	                            cancel=".dnd-cancel"
	                            // 默认值设为body，存在 多个 modal 第一个modal 为mask = false 情况
	                            bounds={ _bounds as Bounds } // 防止拖拽时，Header 被导航栏覆盖
	                            positionOffset={isMaximize || optimizePerformance ? undefined : this.positionOffset} // 最大化时不需要设置拖拽偏移
	                            disabled={isMaximize}
	                            onStart={this.onStart}
	                            onStop={this.onStop}
	                            onDrag={this.onDrag}
	                            position={isMaximize ? this.getMaximizePosition() : {...original, x: this.props.dir === 'rtl' ? -original.x : original.x}}
	                        >
	                            {dom}
	                        </Draggable>
	                    ) : dom
	                }

	            </div>
	        </div>
	    );
	}
}

export default ModalDialog as React.ComponentClass<Partial<ModalDialogProps>>;

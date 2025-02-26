import activeElement from 'dom-helpers/activeElement';
import contains from 'dom-helpers/query/contains';
import canUseDom from 'dom-helpers/util/inDOM';
import events from 'dom-helpers/events';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import warning from 'warning';

import {prefix, KeyCode, cssUtil} from "../../wui-core/src/index";
import Portal from '../../wui-overlay/src/Portal';
import addEventListener from '../../wui-overlay/src/utils/addEventListener';
import addFocusListener from '../../wui-overlay/src/utils/addFocusListener';

import ownerDocument from '../../wui-overlay/src/utils/ownerDocument';
import { ModalPortalProps, ModalContext } from './iModal';
const keyboardTransfer = {
    esc: KeyCode.ESC,
    cancel: KeyCode.N,
    ok: KeyCode.Y,
    enter: KeyCode.ENTER,
}
let openModalCount = 0;

const defaultProps = {
    show: false,
    destroyOnClose: true,
    backdrop: true,
    keyboard: null,
    autoFocus: true,
    enforceFocus: true,
    onShow: null,
    onHide: null,
    onEscapeKeyUp: null,
    onKeyUp: null,
};
const contextTypes = {
    $modal: PropTypes.shape({
        onCancel: PropTypes.func,
        onOk: PropTypes.func,
        handleHide: PropTypes.func,
    }),
};

class ModalPortal extends Component<ModalPortalProps> {
    static defaultProps = defaultProps;
    isInitModal: boolean;
    modal: HTMLDivElement | null = null;
    lastFocus: HTMLDivElement | null = null;
    _onDocumentKeyupListener: any = null;
    _onFocusinListener: any = null;
    static contextTypes = contextTypes;
	context!: ModalContext;
	windowActive: boolean = true;
	constructor(props: ModalPortalProps, _content: {}) {
	    super(props);
	    this.isInitModal = true;
	}
	/* eslint-disable */
	UNSAFE_componentWillUpdate(nextProps: ModalPortalProps) {
		if (!this.props.show && nextProps.show) {
			this.checkForFocus();
		}
	}
	/* eslint-disable */
	UNSAFE_componentWillReceiveProps(props: ModalPortalProps) {
		if (props.show) {
			this.isInitModal = false;
		}
	}

	componentDidMount() {
		if (this.props.show) {
			this.onShow();
		}
	}

	componentWillUnmount() {
		if (this.props.show) {
			this.onHide();
		}
	}

	componentDidUpdate(prevProps: ModalPortalProps) {
		if (prevProps.show && !this.props.show) {
			// Otherwise handleHidden will call this.
			this.onHide();
		} else if (!prevProps.show && this.props.show) {
			this.onShow();
		} else if (prevProps.show && this.props.show) {
            // 无遮罩变成有遮罩 更新背部是否滚动
            if (!prevProps.backdrop && this.props.backdrop) {
                this.addScrolling();
            // 有遮罩变成无遮罩 更新背部是否滚动
            } else if (prevProps.backdrop && !this.props.backdrop) {
                this.removeScrolling();
            }
        }
	}
    addScrolling = () => {
        openModalCount ++;
        if (openModalCount !== 1) {
            return;
        }
        const { clsPrefix } = this.props;
        const scrollingClassName = clsPrefix + '-body-overflow';
        document.body.className += ' ' + scrollingClassName;
    }
    removeScrolling = () => {
        openModalCount --;
        if (openModalCount !== 0) {
            return;
        }
        const { clsPrefix } = this.props;
        const scrollingClassName = clsPrefix + '-body-overflow';
        const body = document.body;
        body.className = body.className.replace(scrollingClassName, '');
    }
	windowFocus = ()=>{
		// QDJCJS-16536 修复按Esc关闭微信时，浏览器会自动聚焦，且keyup事件会冒泡到Modal上，导致modal关闭
		setTimeout(()=>{
			this.windowActive = true;
		}, 300)
	}
	windowBlur = ()=>{
		this.windowActive = false;
	}
	onShow = () => {
		events.on(window, 'focus', this.windowFocus);
		events.on(window, 'blur', this.windowBlur);
        if (this.props.backdrop) {
            this.addScrolling();
        }
	    this._onDocumentKeyupListener = addEventListener(document, 'keyup', this.handleDocumentKeyUp);
	    this._onFocusinListener = addFocusListener(this.enforceFocus);

	    this.focus();

	    if (this.props.onShow) {
	        this.props.onShow(this.modal);
	    }
	}

	onHide = () => {
		events.off(window, 'focus', this.windowFocus);
		events.off(window, 'blur', this.windowBlur);
        if (this.props.backdrop) {
            this.removeScrolling();
        }
	    if (this._onDocumentKeyupListener) {
	        this._onDocumentKeyupListener.remove();
	        this._onDocumentKeyupListener = null;
	    }
	    if (this._onFocusinListener) {
	        this._onFocusinListener.remove();
	        this._onFocusinListener = null;
	    }
	    this.restoreLastFocus();

	    if (this.props.onHide) {
	        this.props.onHide();
	    }
	}

	// 在document下按esc键
	handleDocumentKeyUp = (e : React.KeyboardEvent) => {
		const {keyboard, onKeyUp} = this.props;
		const active = activeElement(ownerDocument(this));
		const modal = this.getDialogElement();
		if (!this.windowActive) return; // 浏览器失焦时按键事件不应该生效
		if (modal && modal !== active && !contains(modal, active)) {
			return
		}
		onKeyUp && onKeyUp(e, this.modal as HTMLDivElement);
        if (keyboard instanceof Array) {
            keyboard.forEach(key => {
                this.keyboardEvents(e, keyboardTransfer[key])
            })
            return;
        }
		this.keyboardEvents(e, keyboard);
	}
    keyboardEvents = (e: React.KeyboardEvent, allowKey?: number | boolean) => {
		const KeyUpEnter = (e: React.KeyboardEvent) => {
            if (e.keyCode === KeyCode.ENTER) {
                const modal = this.context && this.context.$modal;
				if (modal) {
					modal.onOk(e);
                }
            }
        }
        const KeyUpEsc = (e: React.KeyboardEvent) => {
		    const {onEscapeKeyUp} = this.props;
            if (e.keyCode === KeyCode.ESC /*&& this.isTopModal()*/) {
                if (onEscapeKeyUp) {
                    onEscapeKeyUp(e);
                }
                const modal = this.context && this.context.$modal;
                if (modal) {
                    modal.onCancel();
                }
            }
        }
        const KeyUpAltN = (e: React.KeyboardEvent) => {
            if (e.keyCode === KeyCode.N && e.altKey) {
                const modal = this.context && this.context.$modal;
                modal.onCancel();
            }
        }
        const KeyUpAltY = (e: React.KeyboardEvent) => {
            if (e.keyCode === KeyCode.Y && e.altKey) {
                const modal = this.context && this.context.$modal;
                modal.onOk(e);
            }
        }
        switch (allowKey) {
            case KeyCode.ENTER:
                KeyUpEnter(e)
                break;
            case KeyCode.ESC:
                KeyUpEsc(e);
                break;
            case KeyCode.Y:
                KeyUpAltY(e)
                break;
            case KeyCode.N:
                KeyUpAltN(e)
                break;
            case true:
                KeyUpEsc(e);
                KeyUpAltY(e);
                KeyUpAltN(e);
                KeyUpEnter(e);
                break;
            case null :
                KeyUpEsc(e);
                break;
            default:
                break;
        }
    }

	checkForFocus = () => {
	    if (canUseDom) {
	        this.lastFocus = activeElement();
	    }
	}

	focus = () => {
	    let autoFocus = this.props.autoFocus;
		let focusElement = this.getModalBody(this.modal as HTMLDivElement) as HTMLElement;
		if(typeof autoFocus === 'string'){ 
			const selector = (autoFocus ==='ok' || autoFocus ==='cancel') ? `.${prefix}-modal-${autoFocus}-button` : autoFocus;
			focusElement = this.modal?.querySelector(selector) as HTMLElement;
		}
	    let current = activeElement(ownerDocument(this));
	    let focusInModal = focusElement && current && contains(focusElement, current);

	    if (focusElement && autoFocus && !focusInModal) {
	        this.lastFocus = current;

	        if (!focusElement.hasAttribute('tabIndex')) {
	            focusElement.setAttribute('tabIndex', "-1");
	            warning(false,
	                'The modal content node does not accept focus. ' +
					'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".');
	        }

	        focusElement.focus();
	    }
	}

	restoreLastFocus = () => {
	    // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
	    if (this.lastFocus && this.lastFocus.focus) {
	        this.lastFocus.focus();
	        this.lastFocus = null;
	    }
	}

	enforceFocus = () => {
	    let {enforceFocus} = this.props;

	    if (!enforceFocus /* || !this.mounted || !this.isTopModal()*/) {
	        return;
	    }

	    let active = activeElement(ownerDocument(this));
	    let modal = this.getDialogElement() as HTMLDivElement;

	    if (modal && modal !== active && !contains(modal, active)) {
	        modal.focus();
	    }
	}

	// instead of a ref, which might conflict with one the parent applied.
	getDialogElement = () => {
	    let node = this.modal;
	    return node && node.lastChild;
	}

	getModalBody = (node: HTMLDivElement) => {
	    return node?.getElementsByClassName?.(`${prefix}-modal-body`)?.[0];
	}

	findChildElement: any = (parent: any) => {
		if (!parent) {
			return undefined
		}
		if (parent?.stateNode?.nodeName && parent?.stateNode.nodeType) {
			return parent.stateNode.firstChild || parent.stateNode
		}
		return this.findChildElement(parent?.return)
	}
	getPopContainer = () => {
		const {container} = this.props;
		if ( typeof container === 'object' && (container as HTMLElement)?.nodeType === 1 && typeof (container as HTMLElement)?.nodeName === 'string') {
			return container as HTMLElement
		}
	    if (typeof container === 'function') {
	        return (container as (node?: HTMLElement) => HTMLElement)()
	    } else {
			// 兼容 react 16 _reactInternalFiber 和 react 18 _reactInternals
			const parent = ((this as any)._reactInternalFiber || (this as any)._reactInternals).return;
			// 通过虚拟dom的方式  查找到 Modal 的父组件节点
			const dom = this.findChildElement(parent);
	        return cssUtil.parentsUntil(dom, [`[tinper-next-role=container]`]);
	    }
	}
	render() {
	    const {
	        destroyOnClose,
	        show,
	        children,
	        className,
            fieldid,
	        style,
			forceRender,
	    } = this.props;

	    if (!show && this.isInitModal && !forceRender) {
	        return null;
	    }
	    if (!show && destroyOnClose && !this.isInitModal) {
	        return null;
	    }

	    return (
	        <Portal
	            container={this.getPopContainer}
	        >
	            <div
	                ref={(el) => {
	                    this.modal = el
	                }}
	                role={'dialogRoot'}
                    fieldid={fieldid}
	                style={style}
	                className={className}
	            >
	                {children}
	            </div>
	        </Portal>
	    );
	}
}

ModalPortal.contextTypes = contextTypes;

export default ModalPortal;

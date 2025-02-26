/* eslint-disable react/prop-types */
import activeElement from 'dom-helpers/activeElement';
import contains from 'dom-helpers/query/contains';
import canUseDom from 'dom-helpers/util/inDOM';
import PropTypes from 'prop-types';
import React, {cloneElement, Component} from 'react';
import warning from 'warning';
import {componentOrElement, elementType} from '../../wui-core/src';
import Portal from './Portal';
import addEventListener from './utils/addEventListener';
import addFocusListener from './utils/addFocusListener';
// import PortalWrapper from 'rc-util/lib/PortalWrapper';
// import ModalManager from './ModalManager';
import ownerDocument from './utils/ownerDocument';

// let modalManager = new ModalManager();

/**
 * 模态框
 */

const propTypes = {
    ...Portal.propTypes,

    /**
	 * 是否显示
	 */
    show: PropTypes.bool,

    /**
	 * 容器
	 */
    container: PropTypes.oneOfType([
        componentOrElement,
        PropTypes.func
    ]),

    /**
	 * 当模态框打开时的钩子函数
	 */
    onShow: PropTypes.func,

    /**
	 * 当show参数为false时触发的模态框关闭时的钩子函数
	 */
    onHide: PropTypes.func,

    /**
	 * 是否包含背景
	 */
    backdrop: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(['static'])
    ]),

    /**
	 *返回背景组件的函数
	 */
    renderBackdrop: PropTypes.func,

    /**
	 * 设置esc键特殊钩子函数
	 */
    onEscapeKeyUp: PropTypes.func,

    /**
	 * 当点击背景时触发的函数
	 */
    onBackdropClick: PropTypes.func,

    /**
	 * 背景的style
	 */
    backdropStyle: PropTypes.object,

    /**
	 * 背景的class
	 */
    backdropClassName: PropTypes.string,

    /**
	 *容器的class
	 */
    containerClassName: PropTypes.string,

    /**
	 * 按esc键是否关闭模态框
	 */
    keyboard: PropTypes.bool,

    /**
	 * 动画组件
	 */
    transition: elementType,

    /**
	 * 设置动画超时时间
	 */
    dialogTransitionTimeout: PropTypes.number,

    /**
	 * 设置背景动画超时时间
	 */
    backdropTransitionTimeout: PropTypes.number,

    /**
	 * 是否自动设置焦点
	 */
    autoFocus: PropTypes.bool,

    /**
	 * 防止焦点离开模态框
	 */
    enforceFocus: PropTypes.bool,

    /**
	 * 模态框进入时的钩子函数
	 */
    onEnter: PropTypes.func,

    /**
	 * 模态框开始进入时的钩子函数
	 */
    onEntering: PropTypes.func,

    /**
	 * 模态框进入后的钩子函数
	 */
    onEntered: PropTypes.func,

    /**
	 * 模态框退出时的钩子函数
	 */
    onExit: PropTypes.func,

    /**
	 * 模态框开始退出时的钩子函数
	 */
    onExiting: PropTypes.func,

    /**
	 * 模态框推出后的钩子函数
	 */
    onExited: PropTypes.func,

    /**
	 *管理model状态的实例
	 */
    // manager: PropTypes.object.isRequired
};

const defaultProps = {
    show: false,
    destroyOnClose: true,
    backdrop: true,
    keyboard: true,
    autoFocus: true,
    enforceFocus: true,
    onHide: () => {
    },
    // manager: modalManager,
    renderBackdrop: (props) => <div {...props} />
};

/**
 * @deprecated
 */
class BaseModal extends Component {
    constructor(props, content) {
        super(props);
        this.state = {
            exited: !this.props.show
        };

        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
        this.setMountNode = this.setMountNode.bind(this);
        this.handleHidden = this.handleHidden.bind(this);
        this.handleBackdropClick = this.handleBackdropClick.bind(this);
        this.handleDocumentKeyUp = this.handleDocumentKeyUp.bind(this);
        this.checkForFocus = this.checkForFocus.bind(this);
        this.focus = this.focus.bind(this);
        this.restoreLastFocus = this.restoreLastFocus.bind(this);
        this.enforceFocus = this.enforceFocus.bind(this);
        this.getDialogElement = this.getDialogElement.bind(this);
        // this.isTopModal = this.isTopModal.bind(this);
        this.renderBackdrop = this.renderBackdrop.bind(this);
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            this.setState({exited: false});
        } else if (!nextProps.transition) {
            // Otherwise let handleHidden take care of marking exited.
            this.setState({exited: true});
        }
    }

    UNSAFE_componentWillUpdate(nextProps) {
        if (!this.props.show && nextProps.show) {
            this.checkForFocus();
        }
    }

    componentDidMount() {
        if (this.props.show) {
            this.onShow();
        }
        this.mounted = true;
    }

    componentDidUpdate(prevProps) {
        let {transition} = this.props;

        if (prevProps.show && !this.props.show && !transition) {
            // Otherwise handleHidden will call this.
            this.onHide();
        } else if (!prevProps.show && this.props.show) {
            this.onShow();
        }
    }

    componentWillUnmount() {
        let {show, transition} = this.props;

        if (show || (transition && !this.state.exited)) {
            this.onHide();
        }

        this.mounted = false;
    }

    onShow() {
        let doc = ownerDocument(this);
        // let container = getContainer(this.props.container, doc.body);

        // this.props.manager.add(this, container, this.props.containerClassName);

        this._onDocumentKeyupListener =
			addEventListener(doc, 'keyup', this.handleDocumentKeyUp);

        this._onFocusinListener =
			addFocusListener(this.enforceFocus);

        this.focus();

        if (this.props.onShow) {
            this.props.onShow();
        }
    }

    onHide() {
        // this.props.manager.remove(this);

        this._onDocumentKeyupListener.remove();
        this._onDocumentKeyupListener = null;

        this._onFocusinListener.remove();
        this._onFocusinListener = null;

        this.restoreLastFocus();
    }

    setMountNode(ref) {
        this.mountNode = ref && ref.getMountNode ? ref.getMountNode() : ref;
    }

    handleHidden(...args) {
        this.setState({exited: true});
        this.onHide();

        if (this.props.onExited) {
            this.props.onExited(...args);
        }
    }

    handleBackdropClick(e) {
        if (e.target !== e.currentTarget) {
            return;
        }

        if (this.props.onBackdropClick) {
            this.props.onBackdropClick(e);
        }

        if (this.props.backdrop === true) {
            this.props.onHide();
        }
    }

    // 在document下按esc键
    handleDocumentKeyUp(e) {
        if (this.props.keyboard && e.keyCode === 27 /* && this.isTopModal()*/) {
            if (this.props.onEscapeKeyUp) {
                this.props.onEscapeKeyUp(e);
            }
            this.props.onHide();
        }
    }

    checkForFocus() {
        if (canUseDom) {
            this.lastFocus = activeElement();
        }
    }

    focus() {
        let autoFocus = this.props.autoFocus;
        let modalContent = this.getDialogElement();
        let current = activeElement(ownerDocument(this));
        let focusInModal = current && contains(modalContent, current);

        if (modalContent && autoFocus && !focusInModal) {
            this.lastFocus = current;

            if (!modalContent.hasAttribute('tabIndex')) {
                modalContent.setAttribute('tabIndex', -1);
                warning(false,
                    'The modal content node does not accept focus. ' +
					'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".');
            }

            modalContent.focus();
        }
    }

    restoreLastFocus() {
        // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
        if (this.lastFocus && this.lastFocus.focus) {
            this.lastFocus.focus();
            this.lastFocus = null;
        }
    }

    enforceFocus() {
        let {enforceFocus} = this.props;

        if (!enforceFocus || !this.mounted /* || !this.isTopModal()*/) {
            return;
        }

        let active = activeElement(ownerDocument(this));
        let modal = this.getDialogElement();

        if (modal && modal !== active && !contains(modal, active)) {
            modal.focus();
        }
    }

    // instead of a ref, which might conflict with one the parent applied.
    getDialogElement() {
        let node = this.modal;
        return node && node.lastChild;
    }

    // 是否顶层弹窗
    // isTopModal=()=> {
    //    return this.props.manager.isTopModal(this);
    // }

    renderBackdrop() {
        let {
            backdropStyle,
            backdropClassName,
            renderBackdrop,
            transition: Transition,
            backdropTransitionTimeout
        } = this.props;

        const backdropRef = ref => this.backdrop = ref;

        let backdrop = (
            <div
                ref={backdropRef}
                style={this.props.backdropStyle}
                className={this.props.backdropClassName}
                onClick={this.handleBackdropClick}
            />
        );

        if (Transition) {
            backdrop = (
                <Transition transitionAppear
                    in={this.props.show}
                    timeout={backdropTransitionTimeout}
                >
                    {renderBackdrop({
                        ref: backdropRef,
                        style: backdropStyle,
                        className: backdropClassName,
                        onClick: this.handleBackdropClick
                    })}
                </Transition>
            );
        }

        return backdrop;
    }


    render() {
        const {
            destroyOnClose,
            show,
            container,
            children,
            transition: Transition,
            backdrop,
            dialogTransitionTimeout,
            className,
            style,
            onExit,
            onExiting,
            onEnter,
            onEntering,
            onEntered
        } = this.props;

        let dialog = React.Children.only(children);

        const mountModal = show || (Transition && !this.state.exited);

        if (!mountModal && destroyOnClose) {
            return null;
        }

        const {role, tabIndex} = dialog.props;

        if (role === undefined || tabIndex === undefined) {
            dialog = cloneElement(dialog, {
                role: role === undefined ? 'document' : role,
                tabIndex: tabIndex == null ? '-1' : tabIndex
            });
        }

        if (Transition) {
            dialog = (
                <Transition
                    transitionAppear
                    unmountOnExit
                    in={show}
                    timeout={dialogTransitionTimeout}
                    onExit={onExit}
                    onExiting={onExiting}
                    onExited={this.handleHidden}
                    onEnter={onEnter}
                    onEntering={onEntering}
                    onEntered={onEntered}
                >
                    {dialog}
                </Transition>
            );
        }

        return (
            <Portal
                ref={this.setMountNode}
                container={container}
            >
                <div
                    ref={(el) => {
                        this.modal = el
                    }}
                    role={role || 'dialog'}
                    style={style}
                    className={className}
                >
                    {backdrop && this.renderBackdrop()}
                    {dialog}
                </div>
            </Portal>
        );
    }

}

// BaseModal.Manager = ModalManager;

BaseModal.propTypes = propTypes;
BaseModal.defaultProps = defaultProps;


export default BaseModal;

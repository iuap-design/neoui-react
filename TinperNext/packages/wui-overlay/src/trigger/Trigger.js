/**
 * This source code is quoted from rc-trigger.
 * homepage: https://github.com/react-component/trigger
 */
import contains from 'dom-helpers/query/contains';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import {addEventListener} from '../../../wui-core/src';
import Popup from './Popup';
import {getAlignFromPlacement, getPopupClassNameFromAlign} from './utils';

// import getContainerRenderMixin from './getContainerRenderMixin';

function noop() {
}

function returnEmptyString() {
    return '';
}

const ALL_HANDLERS = ['onClick', 'onMouseDown', 'onTouchStart', 'onMouseEnter',
    'onMouseLeave', 'onFocus', 'onBlur'];

const propTypes = {
    children: PropTypes.any,
    action: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    showAction: PropTypes.any,
    hideAction: PropTypes.any,
    getPopupClassNameFromAlign: PropTypes.any,
    onPopupVisibleChange: PropTypes.func,
    afterPopupVisibleChange: PropTypes.func,
    popup: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func,
    ]).isRequired,
    popupStyle: PropTypes.object,
    clsPrefix: PropTypes.string,
    popupClassName: PropTypes.string,
    popupPlacement: PropTypes.string,
    builtinPlacements: PropTypes.object,
    popupTransitionName: PropTypes.string,
    popupAnimation: PropTypes.any,
    mouseEnterDelay: PropTypes.number,
    mouseLeaveDelay: PropTypes.number,
    zIndex: PropTypes.number,
    focusDelay: PropTypes.number,
    blurDelay: PropTypes.number,
    getPopupContainer: PropTypes.func,
    destroyPopupOnHide: PropTypes.bool,
    mask: PropTypes.bool,
    maskClosable: PropTypes.bool,
    defaultPopupVisible: PropTypes.bool,
    onPopupAlign: PropTypes.func,
    popupAlign: PropTypes.object,
    popupVisible: PropTypes.bool,
    maskTransitionName: PropTypes.string,
    maskAnimation: PropTypes.string,
    getDocument: PropTypes.func, // 获得点击消失的document对象，适用于getPopupContainer渲染到非当前document情况，例如iframe
    popData: PropTypes.object // 弹窗层自定义属性
}

const defaultProps = {
    clsPrefix: 'rc-trigger-popup',
    getPopupClassNameFromAlign: returnEmptyString,
    onPopupVisibleChange: noop,
    afterPopupVisibleChange: noop,
    onPopupAlign: noop,
    popupClassName: '',
    mouseEnterDelay: 0,
    mouseLeaveDelay: 0.1,
    focusDelay: 0,
    blurDelay: 0.15,
    popupStyle: {},
    destroyPopupOnHide: false,
    popupAlign: {},
    defaultPopupVisible: false,
    mask: false,
    maskClosable: true,
    action: [],
    showAction: [],
    hideAction: [],
    getDocument: () => document,
    popData: {}
}

class Trigger extends Component {

    constructor(props) {
        super(props);

        this.state = {
            popupVisible: !!this.props.popupVisible || this.props.defaultPopupVisible
        }
        // this.removeContainer = this.removeContainer.bind(this);
        this.getContainer = this.getContainer.bind(this);
        this.renderComponent = this.renderComponent.bind(this);
        this.isVisible = this.isVisible.bind(this);

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onPopupMouseEnter = this.onPopupMouseEnter.bind(this);
        this.onPopupMouseLeave = this.onPopupMouseLeave.bind(this);
        this.onFocus = this.onFocus.bind(this);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.getPopupDomNode = this.getPopupDomNode.bind(this);

        this.getRootDomNode = this.getRootDomNode.bind(this);
        this.getPopupClassNameFromAlign = this.getPopupClassNameFromAlign.bind(this);
        this.getPopupAlign = this.getPopupAlign.bind(this);
        this.getComponent = this.getComponent.bind(this);
        this.setPopupVisible = this.setPopupVisible.bind(this);

        this.delaySetPopupVisible = this.delaySetPopupVisible.bind(this);
        this.clearDelayTimer = this.clearDelayTimer.bind(this);
        this.createTwoChains = this.createTwoChains.bind(this);
        this.isClickToShow = this.isClickToShow.bind(this);
        this.isClickToHide = this.isClickToHide.bind(this);

        this.isMouseEnterToShow = this.isMouseEnterToShow.bind(this);
        this.isMouseLeaveToHide = this.isMouseLeaveToHide.bind(this);
        this.isFocusToShow = this.isFocusToShow.bind(this);
        this.isBlurToHide = this.isBlurToHide.bind(this);
        this.forcePopupAlign = this.forcePopupAlign.bind(this);

        this.fireEvents = this.fireEvents.bind(this);
        this.close = this.close.bind(this);
        this.onClick = this.onClick.bind(this);
    }

	getDocument = () => {
	    let doc = document;
	    if (this.props.getDocument) doc = this.props.getDocument();
	    return doc;
	}
	bindDocument = () => {
	    let doc = document;
	    if (this.props.getDocument) {
	        doc = this.props.getDocument();
	    }
	    if (Array.isArray(doc)) {
	        let doc1 = doc[0];
	        let doc2 = doc[1]
	        this.clickOutsideHandler = addEventListener(doc1,
	            'mousedown', this.onDocumentClick);
	        this.touchOutsideHandler = addEventListener(doc1,
	            'touchstart', this.onDocumentClick);
	        this.mouseWheelOutsideHandler = addEventListener(doc1,
	            'mousewheel', this.onDocumentClick);
	        this.clickOutsideHandlerIframe = addEventListener(doc2,
	            'mousedown', this.onDocumentClick);
	        this.touchOutsideHandlerIframe = addEventListener(doc2,
	            'touchstart', this.onDocumentClick);
	        this.mouseWheelOutsideHandlerIframe = addEventListener(doc2,
	            'mousewheel', this.onDocumentClick);
	    } else {
	        this.clickOutsideHandler = addEventListener(doc,
	            'mousedown', this.onDocumentClick);
	        this.touchOutsideHandler = addEventListener(doc,
	            'touchstart', this.onDocumentClick);
	        this.mouseWheelOutsideHandler = addEventListener(doc,
	            'mousewheel', this.onDocumentClick);
	    }
	}
	removeDocument = () => {
	    let doc = document;
	    if (this.props.getDocument) {
	        doc = this.props.getDocument();
	    }
	    if (Array.isArray(doc)) {
	        this.clickOutsideHandler.remove();
	        this.touchOutsideHandler.remove();
	        this.mouseWheelOutsideHandler.remove();
	        this.clickOutsideHandlerIframe.remove();
	        this.touchOutsideHandlerIframe.remove();
	        this.mouseWheelOutsideHandlerIframe.remove();
	        this.clickOutsideHandler = null;
	        this.touchOutsideHandler = null;
	        this.mouseWheelOutsideHandler = null;
	        this.clickOutsideHandlerIframe = null;
	        this.touchOutsideHandlerIframe = null;
	        this.mouseWheelOutsideHandlerIframe = null;

	    } else {
	        this.clickOutsideHandler.remove();
	        this.touchOutsideHandler.remove();
	        this.mouseWheelOutsideHandler.remove();
	        this.clickOutsideHandler = null;
	        this.touchOutsideHandler = null;
	        this.mouseWheelOutsideHandler = null;
	    }
	}

	isVisible(instance) {
	    return instance.state.popupVisible;
	}

	getContainer(instance) {
	    const popupContainer = document.createElement('div');
	    const mountNode = instance.props.getPopupContainer ?
	        instance.props.getPopupContainer(findDOMNode(instance)) : document.body;
	    mountNode.appendChild(popupContainer);
	    return popupContainer;
	}

	renderComponent(instance, componentArg, ready) {
	    if (instance._component || this.isVisible(instance)) {
	        if (!instance._container) {
	            instance._container = this.getContainer(instance);
	        }
	        let component = instance.getComponent(componentArg);
	        ReactDOM.unstable_renderSubtreeIntoContainer(instance,
	            component, instance._container,
	            function callback() {
	                instance._component = this;
	                if (ready) {
	                    ready.call(this);
	                }
	            });
	    }
	}

	UNSAFE_componentWillMount() {
	    this.mounted = false;
	    ALL_HANDLERS.forEach((h) => {
	        this[`fire${h}`] = (e) => {
	            this.fireEvents(h, e);
	        };
	    });
	}

	componentDidMount() {
	    this.mounted = true;
	    this.componentDidUpdate({}, {
	        popupVisible: this.state.popupVisible,
	    });
	}

	UNSAFE_componentWillReceiveProps({popupVisible}) {
	    if (popupVisible !== undefined) {
	        this.setState({
	            popupVisible,
	        });
	    }
	}

	componentDidUpdate(_, prevState) {
	    const props = this.props;
	    const state = this.state;
	    this.renderComponent(this, null, () => {
	        if (prevState.popupVisible !== state.popupVisible) {
	            props.afterPopupVisibleChange(state.popupVisible);
	        }
	    });
	    if (this.isClickToHide()) {
	        if (state.popupVisible) {
	            if (!this.clickOutsideHandler) {
	                this.bindDocument()
	            }
	            return;
	        }
	    }
	    if (this.clickOutsideHandler) {
	        this.removeDocument()
	    }
	}

	componentWillUnmount() {
	    this.clearDelayTimer();
	    if (this.clickOutsideHandler) {
	        this.removeDocument()
	    }
	    if (this._container) {
	        ReactDOM.unmountComponentAtNode(this._container);
	    }

	    // this.removeContainer();
	}

	onMouseEnter(e) {
	    this.fireEvents('onMouseEnter', e);
	    this.delaySetPopupVisible(true, this.props.mouseEnterDelay);
	}

	onMouseLeave(e) {
	    this.fireEvents('onMouseLeave', e);
	    this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
	}

	onPopupMouseEnter() {
	    this.clearDelayTimer();
	}

	onPopupMouseLeave(e) {
	    // https://github.com/react-component/trigger/pull/13
	    // react bug?
	    if (e.relatedTarget && !e.relatedTarget.setTimeout &&
			this._component &&
			contains(this._component.getPopupDomNode(), e.relatedTarget)) {
	        return;
	    }
	    this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
	}

	onFocus(e) {
	    this.fireEvents('onFocus', e);
	    // incase focusin and focusout
	    this.clearDelayTimer();
	    if (this.isFocusToShow()) {
	        this.focusTime = Date.now();
	        this.delaySetPopupVisible(true, this.props.focusDelay);
	    }
	}

	onMouseDown(e) {
	    this.fireEvents('onMouseDown', e);
	    this.preClickTime = Date.now();
	}

	onTouchStart(e) {
	    this.fireEvents('onTouchStart', e);
	    this.preTouchTime = Date.now();
	}

	onBlur(e) {
	    this.fireEvents('onBlur', e);
	    this.clearDelayTimer();
	    if (this.isBlurToHide()) {
	        this.delaySetPopupVisible(false, this.props.blurDelay);
	    }
	}

	onClick(event) {
	    this.fireEvents('onClick', event);
	    // focus will trigger click
	    if (this.focusTime) {
	        let preTime;
	        if (this.preClickTime && this.preTouchTime) {
	            preTime = Math.min(this.preClickTime, this.preTouchTime);
	        } else if (this.preClickTime) {
	            preTime = this.preClickTime;
	        } else if (this.preTouchTime) {
	            preTime = this.preTouchTime;
	        }
	        if (Math.abs(preTime - this.focusTime) < 20) {
	            return;
	        }
	        this.focusTime = 0;
	    }
	    this.preClickTime = 0;
	    this.preTouchTime = 0;
	    event.preventDefault();
	    const nextVisible = !this.state.popupVisible;
	    if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
	        this.setPopupVisible(!this.state.popupVisible);
	    }
	}

	onDocumentClick(event) {
	    if (this.props.mask && !this.props.maskClosable) {
	        return;
	    }
	    const target = event.target;
	    const root = findDOMNode(this);
	    const popupNode = this.getPopupDomNode();
	    if (!contains(root, target) && !contains(popupNode, target)) {
	        this.close();
	    }
	}

	getPopupDomNode() {
	    // for test
	    if (this._component) {
	        return this.mounted ? this._component.getPopupDomNode() : null;
	    }
	    return null;
	}

	getRootDomNode() {
	    return ReactDOM.findDOMNode(this);
	}

	getPopupClassNameFromAlign(align) {
	    const className = [];
	    const props = this.props;
	    const {popupPlacement, builtinPlacements, clsPrefix} = props;
	    if (popupPlacement && builtinPlacements) {
	        className.push(getPopupClassNameFromAlign(builtinPlacements, clsPrefix, align));
	    }
	    if (props.getPopupClassNameFromAlign) {
	        className.push(props.getPopupClassNameFromAlign(align));
	    }
	    return className.join(' ');
	}

	getPopupAlign() {
	    const props = this.props;
	    const {popupPlacement, popupAlign, builtinPlacements} = props;
	    if (popupPlacement && builtinPlacements) {
	        return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
	    }
	    return popupAlign;
	}

	getComponent() {
	    const {props, state} = this;
	    const mouseProps = {};
	    if (this.isMouseEnterToShow()) {
	        mouseProps.onMouseEnter = this.onPopupMouseEnter;
	    }
	    if (this.isMouseLeaveToHide()) {
	        mouseProps.onMouseLeave = this.onPopupMouseLeave;
	    }
	    return (
	        <Popup
	            clsPrefix={props.clsPrefix}
	            destroyPopupOnHide={props.destroyPopupOnHide}
	            visible={state.popupVisible}
	            className={props.popupClassName}
	            action={props.action}
	            align={this.getPopupAlign()}
	            onAlign={props.onPopupAlign}
	            animation={props.popupAnimation}
	            getClassNameFromAlign={this.getPopupClassNameFromAlign}
	            {...mouseProps}
	            getRootDomNode={this.getRootDomNode}
	            style={props.popupStyle}
	            mask={props.mask}
	            zIndex={props.zIndex}
	            transitionName={props.popupTransitionName}
	            maskAnimation={props.maskAnimation}
	            maskTransitionName={props.maskTransitionName}
	            popData={props.popData}
	        >
	            {typeof props.popup === 'function' ? props.popup() : props.popup}
	        </Popup>
	    );
	}

	setPopupVisible(popupVisible) {
	    this.clearDelayTimer();
	    if (this.state.popupVisible !== popupVisible) {
	        if (!('popupVisible' in this.props)) {
	            this.setState({
	                popupVisible,
	            });
	        }
	        this.props.onPopupVisibleChange(popupVisible);
	    }
	}

	delaySetPopupVisible(visible, delayS) {
	    const delay = delayS * 1000;
	    this.clearDelayTimer();
	    if (delay) {
	        this.delayTimer = setTimeout(() => {
	            this.setPopupVisible(visible);
	            this.clearDelayTimer();
	        }, delay);
	    } else {
	        this.setPopupVisible(visible);
	    }
	}

	clearDelayTimer() {
	    if (this.delayTimer) {
	        clearTimeout(this.delayTimer);
	        this.delayTimer = null;
	    }
	}

	createTwoChains(event) {
	    const childPros = this.props.children.props;
	    const props = this.props;
	    if (childPros[event] && props[event]) {
	        return this[`fire${event}`];
	    }
	    return childPros[event] || props[event];
	}

	isClickToShow() {
	    const {action, showAction} = this.props;
	    return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
	}

	isClickToHide() {
	    const {action, hideAction} = this.props;
	    return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
	}

	isMouseEnterToShow() {
	    const {action, showAction} = this.props;
	    return action.indexOf('hover') !== -1 || showAction.indexOf('mouseEnter') !== -1;
	}

	isMouseLeaveToHide() {
	    const {action, hideAction} = this.props;
	    return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1;
	}

	isFocusToShow() {
	    const {action, showAction} = this.props;
	    return action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1;
	}

	isBlurToHide() {
	    const {action, hideAction} = this.props;
	    return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
	}

	forcePopupAlign() {
	    if (this.state.popupVisible && this.popupInstance && this.popupInstance.alignInstance) {
	        this.popupInstance.alignInstance.forceAlign();
	    }
	}

	fireEvents(type, e) {
	    const childCallback = this.props.children.props[type];
	    if (childCallback) {
	        childCallback(e);
	    }
	    const callback = this.props[type];
	    if (callback) {
	        callback(e);
	    }
	}

	close() {
	    this.setPopupVisible(false);
	}

	render() {
	    const props = this.props;
	    const children = props.children;
	    const child = React.Children.only(children);
	    const newChildProps = {};

	    if (this.isClickToHide() || this.isClickToShow()) {
	        newChildProps.onClick = this.onClick;
	        newChildProps.onMouseDown = this.onMouseDown;
	        newChildProps.onTouchStart = this.onTouchStart;
	    } else {
	        newChildProps.onClick = this.createTwoChains('onClick');
	        newChildProps.onMouseDown = this.createTwoChains('onMouseDown');
	        newChildProps.onTouchStart = this.createTwoChains('onTouchStart');
	    }
	    if (this.isMouseEnterToShow()) {
	        newChildProps.onMouseEnter = this.onMouseEnter;
	    } else {
	        newChildProps.onMouseEnter = this.createTwoChains('onMouseEnter');
	    }
	    if (this.isMouseLeaveToHide()) {
	        newChildProps.onMouseLeave = this.onMouseLeave;
	    } else {
	        newChildProps.onMouseLeave = this.createTwoChains('onMouseLeave');
	    }
	    if (this.isFocusToShow() || this.isBlurToHide()) {
	        newChildProps.onFocus = this.onFocus;
	        newChildProps.onBlur = this.onBlur;
	    } else {
	        newChildProps.onFocus = this.createTwoChains('onFocus');
	        newChildProps.onBlur = this.createTwoChains('onBlur');
	    }
	    return React.cloneElement(child, newChildProps);
	}
}

Trigger.propTypes = propTypes;
Trigger.defaultProps = defaultProps;
export default Trigger;

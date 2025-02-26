import contains from 'dom-helpers/query/contains';
import PropTypes from 'prop-types';
import React, {cloneElement, Component} from 'react';
import ReactDOM from 'react-dom';
import Overlay from './Overlay';
import Portal from './Portal';

import createChainedFunction from './utils/createChainedFunction';

const isReact16 = ReactDOM.createPortal !== undefined;
isReact16 ? ReactDOM.createPortal : ReactDOM.unstable_renderSubtreeIntoContainer;

/**
 * 检查值是属于这个值，还是等于这个值
 *
 * @param {string} one
 * @param {string|array} of
 * @returns {boolean}
 */
function isOneOf(one, of) {
    if (Array.isArray(of)) {
        return of.indexOf(one) >= 0;
    }
    return one === of;
}

const triggerType = PropTypes.oneOf(['click', 'hover', 'focus']);

const propTypes = {
    ...Portal.propTypes,
    ...Overlay.propTypes,

    /**
	 * 指定哪些操作或操作触发叠加层可见性
	 */
    trigger: PropTypes.oneOfType([
        triggerType, PropTypes.arrayOf(triggerType),
    ]),

    /**
	 * 显示和隐藏覆盖一旦触发的毫秒延迟量
	 */
    delay: PropTypes.number,
    /**
	 * 触发后显示叠加层之前的延迟毫秒
	 */
    delayShow: PropTypes.number,
    /**
	 * 触发后隐藏叠加层的延迟毫秒
	 */
    delayHide: PropTypes.number,

    // FIXME: This should be `defaultShow`.
    /**
	 * 覆盖的初始可见性状态。对于更细微的可见性控制，请考虑直接使用覆盖组件。
	 */
    defaultOverlayShown: PropTypes.bool,
    visible: PropTypes.bool,

    /**
	 * 要覆盖在目标旁边的元素或文本。
	 */
    overlay: PropTypes.node.isRequired,

    /**
	 * @private
	 */
    onBlur: PropTypes.func,
    /**
	 * @private
	 */
    onClick: PropTypes.func,
    /**
	 * @private
	 */
    onFocus: PropTypes.func,
    /**
	 * @private
	 */
    onMouseOut: PropTypes.func,
    /**
	 * @private
	 */
    onMouseOver: PropTypes.func,

    // Overridden props from `<Overlay>`.
    /**
	 * @private
	 */
    target: PropTypes.oneOf([null]),
    /**
	 * @private
	 */
    onHide: PropTypes.func,
    /**
	 * @private
	 */
    show: PropTypes.bool,
};

const defaultProps = {
    defaultOverlayShown: false,
    trigger: ['hover', 'focus'],
};

class OverlayTrigger extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleToggle = this.handleToggle.bind(this);
        this.handleDelayedShow = this.handleDelayedShow.bind(this);
        this.handleDelayedHide = this.handleDelayedHide.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.makeOverlay = this.makeOverlay.bind(this);


        this.handleMouseOver = e => (
            this.handleMouseOverOut(this.handleDelayedShow, e)
        );
        this.handleMouseOut = e => (
            this.handleMouseOverOut(this.handleDelayedHide, e)
        );

        this._mountNode = null;

        let visible;
        if ('visible' in props) {
            visible = !!props.visible;
        } else {
            visible = !!props.defaultOverlayShown;
        }

        this.state = {
            show: visible,
        };
    }

    componentDidMount() {
        this._mountNode = document.createElement('div');
        !isReact16 && this.renderOverlay();
    }

    componentDidUpdate(prevProps) {
        !isReact16 && this.renderOverlay();
        if ('visible' in this.props && prevProps.visible !== this.props.visible) {
            this.setState({
                show: this.props.visible
            })
        }
        if ('isHoverShow' in this.props && prevProps.isHoverShow !== this.props.isHoverShow) {
            this.setState({
                show: this.props.isHoverShow
            })
        }
    }

    componentWillUnmount() {
        !isReact16 && ReactDOM.unmountComponentAtNode(this._mountNode);
        this._mountNode = null;
        // 加判断去掉 clearTimeout
        this._hoverShowDelay && clearTimeout(this._hoverShowDelay);
        this._hoverShowDelay && clearTimeout(this._hoverHideDelay);
    }

    handleToggle() {
        if (this.state.show) {
            this.hide();
        } else {
            this.show();
        }
    }

    handleDelayedShow() {
        if (this._hoverHideDelay != null) {
            clearTimeout(this._hoverHideDelay);
            this._hoverHideDelay = null;
            return;
        }

        if (this.state.show || this._hoverShowDelay != null) {
            return;
        }

        const delay = this.props.delayShow != null ?
            this.props.delayShow : this.props.delay;

        if (!delay) {
            this.show();
            return;
        }

        this._hoverShowDelay = setTimeout(() => {
            this._hoverShowDelay = null;
            this.show();
        }, delay);
    }

    handleDelayedHide() {
        if (this._hoverShowDelay != null) {
            clearTimeout(this._hoverShowDelay);
            this._hoverShowDelay = null;
            return;
        }

        if (!this.state.show || this._hoverHideDelay != null) {
            return;
        }

        const delay = this.props.delayHide != null ?
            this.props.delayHide : this.props.delay;

        if (!delay) {
            this.hide();
            return;
        }

        this._hoverHideDelay = setTimeout(() => {
            this._hoverHideDelay = null;
            this.hide();
        }, delay);
    }

    // 简单实现mouseEnter和mouseLeave。
    // React的内置版本是有问题的：https://github.com/facebook/react/issues/4251
    // 在触发器被禁用的情况下，mouseOut / Over可能导致闪烁
    // 从一个子元素移动到另一个子元素。
    handleMouseOverOut(handler, e) {
        const target = e.currentTarget;
        const related = e.relatedTarget || e.nativeEvent.toElement;

        if (!related || related !== target && !contains(target, related)) {
            handler(e);
        }
    }

    handleHide() {
        this.hide();
    }

	handleVisibleChange = (visible) => {
	    this.props.onVisibleChange && this.props.onVisibleChange(visible);
	}

	show() {
	    this.setState({show: true});
	}

	hide() {
	    this.setState({show: false});
	    this.props.onHide && this.props.onHide();
	}

	makeOverlay(overlay, props) {
	    return (
	        <Overlay
	            {...props}
	            show={this.state.show}
	            onHide={this.handleHide}
	            onEntered={() => this.handleVisibleChange(true)}
	            onExited={() => this.handleVisibleChange(false)}
	            target={this}
	        >
	            {overlay}
	        </Overlay>
	    );
	}

	renderOverlay() {
	    ReactDOM.unstable_renderSubtreeIntoContainer(
	        this, this._overlay, this._mountNode
	    );
	}

	render() {
	    const {
	        trigger,
	        overlay,
	        children,
	        onBlur,
	        onClick,
	        onFocus,
	        onMouseOut,
	        onMouseOver,
	        ...props
	    } = this.props;

	    delete props.delay;
	    delete props.delayShow;
	    delete props.delayHide;
	    delete props.defaultOverlayShown;

	    const child = React.Children.only(children);
	    const childProps = child.props;

	    const triggerProps = {
	        'aria-describedby': overlay.props.id
	    };

	    // FIXME: 这里用于传递这个组件上的处理程序的逻辑是不一致的。我们不应该通过任何这些道具。

	    triggerProps.onClick = createChainedFunction(childProps.onClick, onClick);

	    if (isOneOf('click', trigger) && !('visible' in this.props)) {
	        triggerProps.onClick = createChainedFunction(
	            triggerProps.onClick, this.handleToggle
	        );
	    }

	    if (isOneOf('hover', trigger) && !('visible' in this.props)) {
	        // warning(!(trigger === 'hover'),
	        //     '[react-bootstrap] Specifying only the `"hover"` trigger limits the ' +
	        //     'visibility of the overlay to just mouse users. Consider also ' +
	        //     'including the `"focus"` trigger so that touch and keyboard only ' +
	        //     'users can see the overlay as well.'
	        // );

	        triggerProps.onMouseOver = createChainedFunction(
	            childProps.onMouseOver, onMouseOver, this.handleMouseOver
	        );
	        triggerProps.onMouseOut = createChainedFunction(
	            childProps.onMouseOut, onMouseOut, this.handleMouseOut
	        );
	    }

	    if (isOneOf('focus', trigger) && !('visible' in this.props)) {
	        triggerProps.onFocus = createChainedFunction(
	            childProps.onFocus, onFocus, this.handleDelayedShow
	        );
	        triggerProps.onBlur = createChainedFunction(
	            childProps.onBlur, onBlur, this.handleDelayedHide
	        );
	    }

	    this._overlay = this.makeOverlay(overlay, props);

	    if (!isReact16) {
	        return cloneElement(child, triggerProps);
	    }
	    triggerProps.key = 'overlay';

	    let portal = (
	        <Portal
	            key="portal"
	            container={props.container}>
	            {this._overlay}
	        </Portal>
	    )


	    return [
	        cloneElement(child, triggerProps),
	        portal
	    ]


	}
}

OverlayTrigger.propTypes = propTypes;
OverlayTrigger.defaultProps = defaultProps;

export default OverlayTrigger;

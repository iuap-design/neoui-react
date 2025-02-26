import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {cloneElement, Component} from 'react';
import {elementType} from '../../wui-core/src';
import BaseOverlay from './BaseOverlay';
import Fade from './Fade';

const propTypes = {
    ...BaseOverlay.propTypes,

    /**
	 * 是否显示
	 */
    show: PropTypes.bool,
    /**
	 * 是
	 */
    rootClose: PropTypes.bool,
    /**
	 * 当点击rootClose触发close时的回调函数
	 */
    onHide: PropTypes.func,

    /**
	 * 使用动画
	 */
    animation: PropTypes.oneOfType([
        elementType,
        PropTypes.func
    ]),

    /**
	 * Callback fired before the Overlay transitions in
	 */
    onEnter: PropTypes.func,

    /**
	 * Callback fired as the Overlay begins to transition in
	 */
    onEntering: PropTypes.func,

    /**
	 * Callback fired after the Overlay finishes transitioning in
	 */
    onEntered: PropTypes.func,

    /**
	 * Callback fired right before the Overlay transitions out
	 */
    onExit: PropTypes.func,

    /**
	 * Callback fired as the Overlay begins to transition out
	 */
    onExiting: PropTypes.func,

    /**
	 * Callback fired after the Overlay finishes transitioning out
	 */
    onExited: PropTypes.func,

    /**
	 * Sets the direction of the Overlay.
	 */
    placement: PropTypes.oneOf(["top", "right", "bottom", "left", "topLeft", "rightTop", "bottomLeft", "leftTop", "topRight", "rightBottom", "bottomRight", "leftBottom"]),

    /**
	 * 当Overlay在placement方向放不下时的第二优先级方向
	 */
    secondPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

const defaultProps = {
    animation: Fade,
    rootClose: false,
    show: false,
    placement: 'right',
};

class Overlay extends Component {
    render() {
        const {animation, children, ...props} = this.props;

        const transition = animation === true ? Fade : animation || null;

        let child;

        if (!transition) {
            child = cloneElement(children, {
                className: classNames(children.props.className, 'in'),
            });
        } else {
            child = children;
        }

        return (
            <BaseOverlay
                {...props}
                transition={transition}
                onHide={props.onHide}
            >
                {child}
            </BaseOverlay>
        );
    }
}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;

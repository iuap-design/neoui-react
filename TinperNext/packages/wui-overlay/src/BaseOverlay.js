import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {elementType} from '../../wui-core/src';
import Portal from './Portal';
import Position from './Position';
import RootCloseWrapper from './RootCloseWrapper';

const isReact16 = ReactDOM.createPortal !== undefined;

const propTypes = {
    ...Position.propTypes,

    /**
	 * 是否显示
	 */
    show: PropTypes.bool,

    /**
	 * 点击其他地方，是否隐藏overlay
	 */
    rootClose: PropTypes.bool,

    /**
	 * 当rootClose为true的时候，触发的隐藏方法
	 * @type func
	 */
    onHide(props, ...args) {
        let propType = PropTypes.func;
        if (props.rootClose) {
            propType = propType.isRequired;
        }

        return propType(props, ...args)
    },

    /**
	 * 过渡动画组件
	 */
    transition: PropTypes.oneOfType([
        elementType,
        PropTypes.func
    ]),

    /**
	 * overlay添加动画前的钩子函数
	 */
    onEnter: PropTypes.func,

    /**
	 * 开始动画的钩子函数
	 */
    onEntering: PropTypes.func,

    /**
	 * 渲染之后的钩子函数
	 */
    onEntered: PropTypes.func,

    /**
	 * 关闭开始时的钩子函数
	 */
    onExit: PropTypes.func,

    /**
	 * 关闭时的钩子函数
	 */
    onExiting: PropTypes.func,

    /**
	 * 关闭后的钩子函数
	 */
    onExited: PropTypes.func
}

const defaultProps = {
    show: false,
    rootClose: true
};

/**
 * 悬浮组件
 */
class BaseOverlay extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {exited: !props.show};
        this.onHiddenListener = this.handleHidden.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            this.setState({exited: false});
        } else if (!nextProps.transition) {
            // Otherwise let handleHidden take care of marking exited.
            this.setState({exited: true});
        }
    }

    handleHidden(...args) {
        this.setState({exited: true});

        if (this.props.onExited) {
            this.props.onExited(...args);
        }
    }

    render() {
        let {
            container
            , containerPadding
            , target
            , placement
            , secondPlacement
            , shouldUpdatePosition
            , rootClose
            , positionLeft
            , positionTop
            , children
            , transition: Transition
            , ...props
        } = this.props;


        // Don't un-render the overlay while it's transitioning out.
        const mountOverlay = props.show || (Transition && !this.state.exited);
        if (!mountOverlay) {
            // Don't bother showing anything if we don't have to.
            return null;
        }

        let child = children;

        // Position is be inner-most because it adds inline styles into the child,
        // which the other wrappers don't forward correctly.
        child = (
            <Position
                {...{
                    container,
                    containerPadding,
                    target,
                    positionLeft,
                    positionTop,
                    placement,
                    secondPlacement,
                    shouldUpdatePosition
                }}>
                {child}
            </Position>
        );

        if (Transition) {
            let {onExit, onExiting, onEnter, onEntering, onEntered} = props;

            // This animates the child node by injecting props, so it must precede
            // anything that adds a wrapping div.
            child = (
                <Transition
                    in={props.show}
                    transitionAppear
                    onExit={onExit}
                    onExiting={onExiting}
                    onExited={this.onHiddenListener}
                    onEnter={onEnter}
                    onEntering={onEntering}
                    onEntered={onEntered}
                >
                    {child}
                </Transition>
            );
        }

        // This goes after everything else because it adds a wrapping div.
        if (rootClose) {
            child = (
                <RootCloseWrapper onRootClose={props.onHide}>
                    {child}
                </RootCloseWrapper>
            );
        }

        if (isReact16) {
            return child;
        } else {
            return (
                <Portal container={container}>
                    {child}
                </Portal>
            );
        }

    }


}

BaseOverlay.propTypes = propTypes;
BaseOverlay.defaultProps = defaultProps;

export default BaseOverlay;

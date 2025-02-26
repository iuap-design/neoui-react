import classnames from 'classnames';
import addEventListener from 'dom-helpers/events/on';
import transitionInfo from 'dom-helpers/transition/properties';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

let transitionEndEvent = transitionInfo.end;

// 设置状态码
export const UNMOUNTED = 0;
export const EXITED = 1;
export const ENTERING = 2;
export const ENTERED = 3;
export const EXITING = 4;

const propTypes = {
    /**
	 * 是否触发动画
	 */
    in: PropTypes.bool,

    /**
	 * 不显示的时候是否移除组件
	 */
    unmountOnExit: PropTypes.bool,

    /**
	 * 如果设置为默认显示，挂载时显示动画
	 */
    transitionAppear: PropTypes.bool,

    /**
	 * 设置超时时间，防止出现问题，可设置为>=动画时间
	 */
    timeout: PropTypes.number,

    /**
	 * 退出组件时添加的class
	 */
    exitedClassName: PropTypes.string,
    /**
	 * 退出组件中添加的class
	 */
    exitingClassName: PropTypes.string,
    /**
	 * 进入动画后添加的class
	 */
    enteredClassName: PropTypes.string,
    /**
	 * 进入动画时添加的class
	 */
    enteringClassName: PropTypes.string,

    /**
	 * 进入动画开始时的钩子函数
	 */
    onEnter: PropTypes.func,
    /**
	 * 进入动画中的钩子函数
	 */
    onEntering: PropTypes.func,
    /**
	 * 进入动画后的钩子函数
	 */
    onEntered: PropTypes.func,
    /**
	 * 退出动画开始时的钩子函数
	 */
    onExit: PropTypes.func,
    /**
	 * 退出动画中的钩子函数
	 */
    onExiting: PropTypes.func,
    /**
	 * 退出动画后的钩子函数
	 */
    onExited: PropTypes.func
};

function noop() {
}

const defaultProps = {
    in: false,
    unmountOnExit: false,
    transitionAppear: false,
    timeout: 5000,
    onEnter: noop,
    onEntering: noop,
    onEntered: noop,
    onExit: noop,
    onExiting: noop,
    onExited: noop
};

/**
 * 动画组件
 */
class Transition extends Component {
    constructor(props, context) {
        super(props, context);

        let initialStatus;
        if (props.in) {
            // 在componentdidmount时开始执行动画
            initialStatus = props.transitionAppear ? EXITED : ENTERED;
        } else {
            initialStatus = props.unmountOnExit ? UNMOUNTED : EXITED;
        }
        this.state = {status: initialStatus};

        this.nextCallback = null;

        this.timer = null;
    }

    componentDidMount() {
        if (this.props.transitionAppear && this.props.in) {
            this.performEnter(this.props);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.in && this.props.unmountOnExit) {
            if (this.state.status === UNMOUNTED) {
                // 在componentDidUpdate执行动画.
                this.setState({status: EXITED});
            }
        } else {
            this._needsUpdate = true
        }
    }

    componentDidUpdate() {
        const status = this.state.status;

        if (this.props.unmountOnExit && status === EXITED) {
            // 当使用unmountOnExit时，exited为exiting和unmont的过渡状态
            if (this.props.in) {
                this.performEnter(this.props);
            } else {
                this.setState({status: UNMOUNTED});
            }

            return
        }

        // 确保只响应prop变化
        if (this._needsUpdate) {
            this._needsUpdate = false;

            if (this.props.in) {
                if (status === EXITING) {
                    this.performEnter(this.props);
                } else if (status === EXITED) {
                    this.performEnter(this.props);
                }
                // 其他，当我们已经输入或输出
            } else {
                if (status === ENTERING || status === ENTERED) {
                    this.performExit(this.props);
                }
                // 我们已经输入或输出完成
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
        this.timer = null
        this.cancelNextCallback();
    }

    performEnter(props) {
        this.cancelNextCallback();
        const node = ReactDOM.findDOMNode(this);

        // 这里接收新props
        props.onEnter(node);

        this.safeSetState({status: ENTERING}, () => {
            this.props.onEntering(node);

            this.onTransitionEnd(node, () => {
                this.safeSetState({status: ENTERED}, () => {
                    this.props.onEntered(node);
                });
            });
        });
    }

    performExit(props) {
        this.cancelNextCallback();
        const node = ReactDOM.findDOMNode(this);


        props.onExit(node);

        this.safeSetState({status: EXITING}, () => {
            this.props.onExiting(node);

            this.onTransitionEnd(node, () => {
                this.safeSetState({status: EXITED}, () => {
                    this.props.onExited(node);
                });
            });
        });
    }

    cancelNextCallback() {
        if (this.nextCallback !== null) {
            this.nextCallback.cancel();
            this.nextCallback = null;
        }
    }

    safeSetState(nextState, callback) {
        // 确保在组件销毁后挂起的setState被消除
        this.setState(nextState, this.setNextCallback(callback));
    }

    setNextCallback(callback) {
        let active = true;

        this.nextCallback = (event) => {
            if (active) {
                active = false;
                this.nextCallback = null;

                callback(event);
            }
        };

        this.nextCallback.cancel = () => {
            active = false;
        };

        return this.nextCallback;
    }

    onTransitionEnd(node, handler) {
        this.setNextCallback(handler);

        if (node) {
            if (transitionEndEvent == undefined) {
                this.nextCallback();
            } else {
                addEventListener(node, transitionEndEvent, this.nextCallback);
            }
            clearTimeout(this.timer)
            this.timer = setTimeout(this.nextCallback, this.props.timeout);
        } else {
            clearTimeout(this.timer)
            this.timer = setTimeout(this.nextCallback, 0);
        }
    }

    render() {
        const status = this.state.status;
        if (status === UNMOUNTED) {
            return null;
        }

        const {children, className, ...childProps} = this.props;
        Object.keys(Transition.propTypes).forEach(key => delete childProps[key]);

        let transitionClassName;
        if (status === EXITED) {
            transitionClassName = this.props.exitedClassName;
        } else if (status === ENTERING) {
            transitionClassName = this.props.enteringClassName;
        } else if (status === ENTERED) {
            transitionClassName = this.props.enteredClassName;
        } else if (status === EXITING) {
            transitionClassName = this.props.exitingClassName;
        }

        const child = React.Children.only(children);
        return React.cloneElement(
            child,
            {
                ...childProps,
                className: classnames(
                    child.props.className,
                    className,
                    transitionClassName
                )
            }
        );
    }
}

Transition.propTypes = propTypes;

Transition.defaultProps = defaultProps;

export default Transition;

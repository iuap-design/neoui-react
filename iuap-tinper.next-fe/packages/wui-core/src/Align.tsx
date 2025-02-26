/**
 * This source code is quoted from rc-util.
 * homepage: https://github.com/react-component/util
 */
import align from 'dom-align';
// import PropTypes from 'prop-types';
import React from 'react';

import ReactDOM from 'react-dom';
import addEventListener from './addEventListener';

// import isWindow from './isWindow';

function isWindow(obj:any) {
    /* eslint no-eq-null: 0 */
    /* eslint eqeqeq: 0 */
    return obj != null && obj == obj.window;
}

function buffer(fn:Function, ms:number) {
    let timer:number = -1;

    function clear() {
        if (timer) {
            clearTimeout(timer);
            timer = -1;
        }
    }

    function bufferFn() {
        clear();
        timer = setTimeout(fn, ms);
    }

    bufferFn.clear = clear;

    return bufferFn;
}

// const propTypes = {
//     childrenProps: PropTypes.object,
//     align: PropTypes.object.isRequired,
//     target: PropTypes.func,
//     onAlign: PropTypes.func,
//     monitorBufferTime: PropTypes.number,
//     monitorWindowResize: PropTypes.bool,
//     disabled: PropTypes.bool,
//     children: PropTypes.any,
// }
interface AlignProps {
    childrenProps?: any,
    align?:any,
    target?: ()=>any,
    onAlign?: (source:any, align:any)=>any,
    monitorBufferTime?: number,
    monitorWindowResize?: boolean,
    disabled?: boolean,
    children?: any,
}

const defaultProps = {
    target() {
        return window;
    },
    onAlign() {
    },
    monitorBufferTime: 50,
    monitorWindowResize: false,
    disabled: false,
}

class Align extends React.Component<AlignProps> {
    static defaultProps = defaultProps;
    resizeHandler:any;
    bufferMonitor:any;
    constructor(props:AlignProps) {
        super(props);
    }

    componentDidMount() {
        const props = this.props;
        // if parent ref not attached .... use document.getElementById
        this.forceAlign();
        if (!props.disabled && props.monitorWindowResize) {
            this.startMonitorWindowResize();
        }
    }

    componentDidUpdate(prevProps:AlignProps) {
        let reAlign = false;
        const props = this.props;

        if (!props.disabled) {
            if (prevProps.disabled || prevProps.align !== props.align) {
                reAlign = true;
            } else {
                const lastTarget = prevProps.target && prevProps.target();
                const currentTarget = props.target && props.target();
                if (isWindow(lastTarget) && isWindow(currentTarget)) {
                    reAlign = false;
                } else if (lastTarget !== currentTarget) {
                    reAlign = true;
                }
            }
        }

        if (reAlign) {
            this.forceAlign();
        }

        if (props.monitorWindowResize && !props.disabled) {
            this.startMonitorWindowResize();
        } else {
            this.stopMonitorWindowResize();
        }
    }

    componentWillUnmount() {
        this.stopMonitorWindowResize();
    }

	startMonitorWindowResize = () => {
	    if (!this.resizeHandler) {
	        this.bufferMonitor = buffer(this.forceAlign, this.props.monitorBufferTime!);
	        this.resizeHandler = addEventListener(window, 'resize', this.bufferMonitor);
	    }
	}

	stopMonitorWindowResize = () => {
	    if (this.resizeHandler) {
	        this.bufferMonitor.clear();
	        this.resizeHandler.remove();
	        this.resizeHandler = null;
	    }
	}

	forceAlign = () => {
	    const props = this.props;
	    if (!props.disabled) {
	        const source = ReactDOM.findDOMNode(this);
	        props.onAlign && props.onAlign(source, align(source, props.target && props.target(), props.align));
	    }
	}

	render() {
	    const {childrenProps, children} = this.props;
	    const child = React.Children.only(children);
	    if (childrenProps) {
	        const newProps = {};
	        for (const prop in childrenProps) {
	            if (childrenProps.hasOwnProperty(prop)) {
	                newProps[prop] = this.props[childrenProps[prop]];
	            }
	        }
	        return React.cloneElement(child, newProps);
	    }
	    return child;
	}
}

// Align.defaultProps = defaultProps;
// Align.propTypes = propTypes;

export default Align;

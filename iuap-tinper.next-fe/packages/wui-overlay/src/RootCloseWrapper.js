import contains from 'dom-helpers/query/contains';
import PropTypes from 'prop-types';
import {Component} from 'react';
import ReactDOM from 'react-dom';

import addEventListener from './utils/addEventListener';
import ownerDocument from './utils/ownerDocument';

const propTypes = {
    onRootClose: PropTypes.func,
    children: PropTypes.element,
    /**
	 * 是否禁用
	 */
    disabled: PropTypes.bool,
    /**
	 * 触发事件选择
	 */
    event: PropTypes.oneOf(['click', 'mousedown'])
};

const defaultProps = {
    event: 'click'
};

function isLeftClickEvent(event) {
    return event.button === 0;
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class RootCloseWrapper extends Component {
    constructor(props, context) {
        super(props, context);

        this.preventMouseRootClose = false;

        this.addEventListeners = this.addEventListeners.bind(this);
        this.removeEventListeners = this.removeEventListeners.bind(this);

    }

    componentDidMount() {
        if (!this.props.disabled) {
            this.addEventListeners();
        }
    }

    componentDidUpdate(prevProps) {
        if (!this.props.disabled && prevProps.disabled) {
            this.addEventListeners();
        } else if (this.props.disabled && !prevProps.disabled) {
            this.removeEventListeners();
        }
    }

    componentWillUnmount() {
        if (!this.props.disabled) {
            this.removeEventListeners();
        }
    }

    addEventListeners() {
        const {event} = this.props;
        const doc = ownerDocument(this);

        // 避免react的监听事件触发引起判断的不准确
        this.documentMouseCaptureListener =
			addEventListener(doc, event, this.handleMouseCapture, true);

        this.documentMouseListener =
			addEventListener(doc, event, this.handleMouse);

        this.documentKeyupListener =
			addEventListener(doc, 'keyup', this.handleKeyUp);
    }

    removeEventListeners() {
        if (this.documentMouseCaptureListener) {
            this.documentMouseCaptureListener.remove();
        }

        if (this.documentMouseListener) {
            this.documentMouseListener.remove();
        }

        if (this.documentKeyupListener) {
            this.documentKeyupListener.remove();
        }
    }

	handleMouseCapture = (e) => {
	    this.preventMouseRootClose = (
	        isModifiedEvent(e) ||
			!isLeftClickEvent(e) ||
			contains(ReactDOM.findDOMNode(this), e.target)
	    );
	};

	handleMouse = () => {
	    if (!this.preventMouseRootClose && this.props.onRootClose) {
	        this.props.onRootClose();
	    }
	};

	handleKeyUp = (e) => {
	    if (e.keyCode === 27 && this.props.onRootClose) {
	        this.props.onRootClose();
	    }
	};

	render() {
	    return this.props.children;
	}
}


RootCloseWrapper.propTypes = propTypes;

RootCloseWrapper.defaultProps = defaultProps;

export default RootCloseWrapper;

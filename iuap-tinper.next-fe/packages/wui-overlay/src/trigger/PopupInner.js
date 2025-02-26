/**
 * This source code is quoted from rc-trigger.
 * homepage: https://github.com/react-component/trigger
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import LazyRenderBox from './LazyRenderBox';

const propTypes = {
    hiddenClassName: PropTypes.string,
    className: PropTypes.string,
    clsPrefix: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    children: PropTypes.any,
    popData: PropTypes.any,
    visible: PropTypes.bool,
    style: PropTypes.object,
}

class PopupInner extends Component {

    render() {
        const props = this.props;
        let className = props.className;
        if (!props.visible) {
            className += ` ${props.hiddenClassName}`;
        }
        return (<div {...props.popData}
					 className={className}
					 onMouseEnter={props.onMouseEnter}
					 onMouseLeave={props.onMouseLeave}
					 style={props.style}
        >
            <LazyRenderBox className={`${props.clsPrefix}-content`} visible={props.visible}>
                {props.children}
            </LazyRenderBox>
        </div>);
    }
}

PopupInner.propTypes = propTypes;
export default PopupInner;

/**
 * This source code is quoted from rc-trigger.
 * homepage: https://github.com/react-component/trigger
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';

const propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    visible: PropTypes.bool,
    hiddenClassName: PropTypes.string,
}

class LazyRenderBox extends Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.hiddenClassName || nextProps.visible;
    }

    render() {
        const {hiddenClassName, visible, ...props} = this.props;

        if (hiddenClassName || React.Children.count(props.children) > 1) {
            if (!visible && hiddenClassName) {
                props.className += ` ${hiddenClassName}`;
            }
            return <div {...props}/>;
        }

        return React.Children.only(props.children);
    }
}
LazyRenderBox.propTypes = propTypes;

export default LazyRenderBox;

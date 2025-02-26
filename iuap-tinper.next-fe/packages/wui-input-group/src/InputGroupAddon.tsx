import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React from 'react';
import {prefix} from '../../wui-core/src/updatePrefix';
import type {InputGroupAddonProps} from './iInputGroup'

// const propTypes = {
//     addonType: PropTypes.string
// };

class InputGroupAddon extends React.Component<InputGroupAddonProps> {
    render() {
        let {className, clsPrefix, addonType, ...others} = this.props;
        clsPrefix = clsPrefix || (addonType === 'button' ? `${prefix}-input-group-btn` : `${prefix}-input-group-addon`);

        return <span {...others} className={classNames(className, clsPrefix)} />;
    }
}

// InputGroupAddon.propTypes = propTypes;
export default InputGroupAddon;

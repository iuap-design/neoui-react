// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Anchor from './Anchor';
import AntdAnchor from './AntdAnchor';
import AntdAnchorLink from './AntdAnchorLink';
import AnchorHorizontal from './AnchorHorizontal'
import { EntranceProps } from './iAnchor'

// const propTypes = {
//     antd: PropTypes.bool,
//     direction: PropTypes.string
// }

class AnchorWrapper extends Component<EntranceProps> {
    static Link = AntdAnchorLink
    constructor(props: EntranceProps) {
        super(props)
    }

    render() {
        let {antd, children, direction, activeKey, getCurrentAnchor, ...other} = this.props;
        const disableProps = {
            activeKey: activeKey ? activeKey : getCurrentAnchor ? getCurrentAnchor() : ''
        };
        return (
            direction === 'horizontal' ? <AnchorHorizontal {...other} {...disableProps}>{children}</AnchorHorizontal> : antd ? <AntdAnchor {...other} {...disableProps}>{children}</AntdAnchor> : <Anchor {...other}>{children}</Anchor>
        )
    }
}

// AnchorWrapper.Link = AntdAnchorLink;
// AnchorWrapper.propTypes = propTypes;
export default AnchorWrapper;

// import PropTypes from 'prop-types';
import React from 'react';
import {Warning} from "../../wui-core/src";
import Collapse from './Collapse';
import Panel from './Panel';

import { EntranceProps } from './iCollapse';

const {isShouldUpdate} = Warning;

// const propTypes = {
//     onSelect: PropTypes.func,
//     onChange: PropTypes.func
// }

class CollapseWrapper extends React.Component<EntranceProps> {
    static Panel: typeof Panel
    constructor(props: EntranceProps) {
        super(props);
    }

    render() {
        const {
            onSelect,
            onChange,
            ...others
        } = this.props
        isShouldUpdate("Collapse", this.props)
        const extral = {
            onSelect: onChange ? onChange : onSelect
        }
        return <Collapse {...extral} {...others} />
    }
}

CollapseWrapper.Panel = Panel;
// CollapseWrapper.propTypes = propTypes;
export default CollapseWrapper

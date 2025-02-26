/**
 * This source code is quoted from rc-tabs.
 * homepage: https://github.com/react-component/tabs
 */
import classnames from "classnames";
// import PropTypes from "prop-types";
import React, {Component} from "react";
import omit from "omit.js"
import { TabPaneProps } from './iTabs'
import {getNid} from "../../wui-core/src/index"

// const propTypes = {
//     className: PropTypes.string,
//     rootclsPrefix: PropTypes.string,
//     active: PropTypes.bool,
//     style: PropTypes.any,
//     destroyInactiveTabPane: PropTypes.bool,
//     forceRender: PropTypes.bool,
//     placeholder: PropTypes.node
// };
const defaultProps = {
    placeholder: null
};

class TabPane extends Component<TabPaneProps> {
    static defaultProps = {...defaultProps}
    _isActived!: boolean;
    render() {
        const props = this.props;
        const {className, destroyInactiveTabPane, active, forceRender, ...others} = props;
        this._isActived = this._isActived || active as boolean;
        const clsPrefix = `${props.rootclsPrefix}-tabpane`;
        const cls = classnames({
            [clsPrefix]: 1,
            [`${clsPrefix}-inactive`]: !active,
            [`${clsPrefix}-active`]: active,
            [`${className}`]: className
        });
        const isRender = destroyInactiveTabPane ? active : this._isActived;
        let adapterNid = getNid(this.props)
        return (
            // @ts-ignore
            <div
                style={props.style}
                role="tabpanel"
                aria-hidden={props.active ? "false" : "true"}
                className={cls}
                {...omit(others, ["rootclsPrefix", "closeIcon", "tab", "placeholder"])}
                // @ts-ignore
                nid={adapterNid?.nid ? adapterNid?.nid + "_body" : others?.nid}
            >
                {isRender || forceRender ? props.children : props.placeholder}
            </div>
        );
    }
}

// TabPane.propTypes = propTypes;
// TabPane.defaultProps = defaultProps;

export default TabPane;

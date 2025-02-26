import classNames from 'classnames';
import React from 'react';
// import {elementType} from '../../wui-core/src';
import {prefix, WebUI, getNid} from "../../wui-core/src/index"
// import PropTypes from 'prop-types';
import { DrawerFooterProps } from './iDrawer';

// const propTypes = {
//     componentClass: elementType,
//     fieldid: PropTypes.string
// };

const defaultProps = {
    componentClass: 'div',
    clsPrefix: `${prefix}-drawer-footer`,
};

@WebUI({name: "drawer-footer", defaultProps})
class DrawerFooter extends React.Component<DrawerFooterProps> {
    static defaultProps = defaultProps;
    render() {
        const {componentClass: Component, clsPrefix, className, children, onCustomRender, ...props} = this.props;
        const footerChildren = typeof onCustomRender === 'function' ? onCustomRender(children) : children;

        const classes: any = {};
        classes[`${clsPrefix}`] = true;
        let adapterNid = getNid(this.props)
        return (
            <Component
                {...props}
                className={classNames(className, classes)}
                {...adapterNid}
            >
                {footerChildren}
            </Component>
        );
    }
}

// DrawerFooter.propTypes = propTypes;

export default DrawerFooter as React.ComponentClass<Partial<DrawerFooterProps>>;

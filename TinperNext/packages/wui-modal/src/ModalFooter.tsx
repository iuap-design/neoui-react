import classNames from 'classnames';
import React from 'react';
import {prefix, WebUI, getNid} from "../../wui-core/src/index"
import { AnyObject, ModalFooterProps } from './iModal';

const defaultProps = {
    componentClass: 'div',
    clsPrefix: `${prefix}-modal-footer`,
};

@WebUI({name: "modal-footer", defaultProps})
class ModalFooter extends React.Component<ModalFooterProps> {
    static defaultProps = defaultProps;
    render() {
        const {componentClass: Component, clsPrefix, className, children, onCustomRender, ...props} = this.props;
        const footerChildren = typeof onCustomRender === 'function' ? onCustomRender(children) : children;

        const classes: AnyObject = {};
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

export default ModalFooter as React.ComponentClass<Partial<ModalFooterProps>>;

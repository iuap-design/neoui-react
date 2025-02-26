import classNames from 'classnames';
import React from 'react';
import {prefix, WebUI, getNid} from "../../wui-core/src/index"
import { AnyObject, ModalBodyProps } from './iModal';

const defaultProps: ModalBodyProps = {
    componentClass: 'div',
    clsPrefix: `${prefix}-modal-body`
};

@WebUI({name: "modal-body", defaultProps})
class ModalBody extends React.Component<ModalBodyProps> {
    static defaultProps = defaultProps;
    render() {
        const {componentClass: Component, clsPrefix, className, ...props} = this.props;
        const classes: AnyObject = {};
        classes[`${clsPrefix}`] = true;
        let adapterNid = getNid(this.props)

        return (
            <Component
                onCancel={(event) => {
                    event.stopPropagation()
                }}
                {...props}
                className={classNames(className, classes)}
                {...adapterNid}
            />
        );
    }
}

export default ModalBody as React.ComponentClass<Partial<ModalBodyProps>>;
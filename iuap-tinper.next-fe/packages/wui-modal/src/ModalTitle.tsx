import classNames from 'classnames';
import React from 'react';
import { prefix, WebUI} from '../../wui-core/src';
import { ModalTitleProps } from './iModal';

const defaultProps = {
    componentClass: 'h4',
    clsPrefix: `${prefix}-modal-title`
};

@WebUI({name: "modal-title", defaultProps})
class ModalTitle extends React.Component<ModalTitleProps> {
    static defaultProps = defaultProps;
    render() {
        const {
            componentClass: Component,
            className,
            clsPrefix,
            ...props
        } = this.props;


        const classes: {[key: string]: boolean} = {};
        classes[`${clsPrefix}`] = true;

        return (
            <Component
                {...props}
                className={classNames(className, classes)}
            />
        );
    }
}

export default ModalTitle as React.ComponentClass<Partial<ModalTitleProps>>;

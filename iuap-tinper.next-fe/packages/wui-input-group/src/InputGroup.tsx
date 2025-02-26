import React from 'react';
import classnames from 'classnames';
// import PropTypes from 'prop-types';
import {WebUI, setComponentClass, getNid} from '../../wui-core/src/index';
import InputGroupAddon from './InputGroupAddon';
import type {InputGroupProps, InputGroupAddonProps} from './iInputGroup';

// const propTypes = {
//     simple: PropTypes.bool
// };
const defaultProps = {
    simple: false
};

@WebUI({name: 'input-group', defaultProps})
class InputGroup extends React.Component<InputGroupProps> {
    static readonly Addon: any;
    static readonly Button: any;
    render() {
        const {className, clsPrefix, simple, dir, ...others} = this.props;
        const {bordered, align} = others
        let adapterNid = getNid(this.props)
        return (
            <span
                dir={dir}
                {...others}
                className={classnames(className, clsPrefix, `${clsPrefix}-${dir}`, simple && 'simple', {
                    ...setComponentClass({clsPrefix, bordered, align})
                })}
                {...adapterNid}
            />
        );
    }
}

/**
 * 将InputGroupAddon与InputGroupButton组件作为InputGroup的附属组件
 */
const addonMap: Record<string, string> = {
    addon: 'Addon',
    button: 'Button'
};
for (let k in addonMap) {
    // eslint-disable-next-line react/display-name
    (InputGroup as Record<string, any>)[addonMap[k]] = React.forwardRef((props: InputGroupAddonProps, ref: React.Ref<any>) => {
        return <InputGroupAddon ref={ref} addonType={k} {...props} />;
    });
}

// InputGroup.propTypes = propTypes;
export default InputGroup;

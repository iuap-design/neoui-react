import classNames from 'classnames';
// import PropTypes from 'prop-types';
import * as React from 'react';
import {ConfigContext} from "../../wui-provider/src/context";
import { GridProps } from './iCard';
import {getNid} from "../../wui-core/src/index"

// const propTypes = {
//     // prefixCls: PropTypes.string,
//     className: PropTypes.string,
//     hoverable: PropTypes.bool,
//     style: PropTypes.object,
// }

const defaultProps = {
    className: '',
    hoverable: false,
    style: {},
}

const Grid: React.FC<GridProps> = ({className, hoverable, ...props}) => (
    <ConfigContext.Consumer>
        {({getPrefixCls}) => {
            const prefixCls = getPrefixCls('card');
            const classString = classNames(`${prefixCls}-grid`, className, {
                [`${prefixCls}-grid-hoverable`]: hoverable,
            });
            let adapterNid = getNid(props)

            return <div {...props} className={classString} {...adapterNid}/>;
        }}
    </ConfigContext.Consumer>
);

// Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;

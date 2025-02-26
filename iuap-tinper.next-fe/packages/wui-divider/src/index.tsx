import classNames from 'classnames';
// import PropTypes from 'prop-types';
import * as React from 'react';
import { ConfigContext } from "../../wui-provider/src/context";
import { DividerProps } from './iDivider';
import { Warning, getNid } from "../../wui-core/src";
const { isShouldUpdate } = Warning;
// const propTypes = {
//     type: PropTypes.oneOf(['horizontal', 'vertical']),
//     orientation: PropTypes.oneOf(['left', 'right', 'center']), // 文字位置
//     className: PropTypes.string,
//     children: PropTypes.element,
//     dashed: PropTypes.bool,
//     style: PropTypes.object,
//     fieldid: PropTypes.string,
// }

const defaultProps: DividerProps = {
    type: 'horizontal',
    orientation: 'center',
    dashed: false,
    lineType: 'solid',
}


const Divider: React.FC<DividerProps> = props => {

    const { getPrefixCls } = React.useContext(ConfigContext);
    const {
        type,
        orientation = "center",
        className,
        children,
        dashed,
        lineType,
        ...restProps
    } = props;
    isShouldUpdate("Divider", props);
    const prefixCls = getPrefixCls('divider');
    const orientationPrefix = orientation.length > 0 ? `-${orientation}` : orientation;
    const hasChildren = !!children;
    const classString = classNames(
        prefixCls,
        `${prefixCls}-${type}`,
        lineType && `${prefixCls}-${lineType}`,
        {
            [`${prefixCls}-with-text`]: hasChildren,
            [`${prefixCls}-with-text${orientationPrefix}`]: hasChildren,
            [`${prefixCls}-dashed`]: !!dashed,
            // [`${prefixCls}-rtl`]: direction === 'rtl',
        },
        className,
    );
    let adapterNid = getNid(props)
    return (
        <div className={classString} {...restProps} role="separator" {...adapterNid}>
            {children && <span className={`${prefixCls}-inner-text`}>{children}</span>}
        </div>
    );
};

// Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;

export default Divider;

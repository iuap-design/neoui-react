import classNames from 'classnames';
// import PropTypes from 'prop-types';
import toArray from 'rc-util/lib/Children/toArray';
import * as React from 'react';
import Popover from '../../wui-popover/src/index';
import {ConfigContext} from "../../wui-provider/src/context";
import Avatar from './Avatar';
import {SizeContextProvider} from './SizeContext';
import { GroupProps } from './iAvatar';
import {getNid} from "../../wui-core/src/index"

// const propTypes = {
//     className: PropTypes.string,
//     children: PropTypes.element,
//     style: PropTypes.object,
//     prefixCls: PropTypes.string,
//     maxCount: PropTypes.number,
//     maxStyle: PropTypes.object,
//     maxPopoverPlacement: PropTypes.oneOf(['top', 'bottom']),
//     /*
// 	 * Size of avatar, options: `large`, `small`, `default`
// 	 * or a custom number size
// 	 * */
//     size: PropTypes.oneOfType([PropTypes.oneOf(['large', 'small', 'default']), PropTypes.number]),
//     fieldid: PropTypes.string,
// }

const Group: React.FC<GroupProps> = props => {
    const {getPrefixCls} = React.useContext(ConfigContext);
    const {className = '', maxCount, maxStyle, size, maxPopoverTrigger} = props;

    const prefixCls = getPrefixCls('avatar-group');

    const cls = classNames(
        prefixCls,
        className,
    );

    const { children, maxPopoverPlacement = 'top', fieldid, reverse } = props;
    let childrenWithProps = toArray(children).map((child: React.ReactElement, index: number) =>
        React.cloneElement(child, {
            key: `avatar-key-${index}`,
            style: reverse ? { ...child.props.style, zIndex: index } : child.props.style
        }),
    );
    if (reverse) {
        childrenWithProps = childrenWithProps.reverse();
    }
    const numOfChildren = childrenWithProps.length;
    if (maxCount && maxCount < numOfChildren) {
        const childrenShow = childrenWithProps.slice(0, maxCount);
        const childrenHidden = childrenWithProps.slice(maxCount, numOfChildren);
        childrenShow.push(
            <Popover
                key="avatar-popover-key"
                content={childrenHidden}
                trigger={maxPopoverTrigger || 'hover'}
                placement={maxPopoverPlacement}
                overlayClassName={`${prefixCls}-popover`}
                fieldid={fieldid && `${fieldid}_avatar-popover`}
            >
                <Avatar fieldid={fieldid && `${fieldid}_avatar-num`} style={reverse ? { ...maxStyle, zIndex: 0 } : maxStyle}>{`+${numOfChildren - maxCount}`}</Avatar>
            </Popover>,
        );
        return (
            <SizeContextProvider size={size}>
                <div fieldid={fieldid} className={cls} style={props.style}>
                    {childrenShow}
                </div>
            </SizeContextProvider>
        );
    }

    let adapterNid = getNid(props) // 适配nid、uitype
    return (
        <SizeContextProvider size={size}>
            <div fieldid={fieldid} className={cls} style={props.style} {...adapterNid}>
                {childrenWithProps}
            </div>
        </SizeContextProvider>
    );
};

// Group.propTypes = propTypes;

export default Group;

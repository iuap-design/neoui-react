

import classNames from 'classnames';
import { Divider } from 'rc-menu';
import * as React from 'react';
import MenuContext from './config-provider/MenuContext';
import { MenuDividerProps, MenuContextProps } from './iMenu';


class MenuDivider extends React.Component<MenuDividerProps> {

    static contextType = MenuContext;

    render() {
        const { className, dashed, ...restProps } = this.props;

        const {rootPrefixCls} = this.context as MenuContextProps;

        const classString = classNames(
            {
                [`${rootPrefixCls}-item-divider-dashed`]: !!dashed,
            },
            className,
        );
        return <Divider className={classString} {...restProps} />;
    }
}

export default MenuDivider;

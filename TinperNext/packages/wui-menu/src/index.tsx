import classNames from 'classnames';
import omit from 'omit.js';
// import PropTypes from 'prop-types';
import RcMenu, {ItemGroup} from 'rc-menu';
import { MenuProps as RcMenuProps } from 'rc-menu';
import * as React from 'react';
import {getClsPrefix, WebUI, getNid} from "../../wui-core/src"
import {SiderContext} from '../../wui-layout/src/Sider';
import Icon from "../../wui-icon/src";
import useItems from './hooks/useItems'
import MenuContext from './config-provider/MenuContext';
import Item from './MenuItem';
import SubMenu from './SubMenu';
import MenuDivider from './MenuDivider';
import { InternalMenuProps, MenuProps, MenuPosition } from './iMenu';
import { useConfigContext } from '../../wui-provider/src/context';
import {useMemo} from "react";


const menuClsPrefix = getClsPrefix("menu");
const dropdownClsPrefix = getClsPrefix("dropdown");

export function cloneElement(
    element: React.ReactNode,
    props: {},
) {
    if (!React.isValidElement(element)) return element;

    return React.cloneElement(
        element,
        typeof props === 'function' ? props(element.props || {}) : props,
    );
}

const popupPlacementMap: Record<MenuPosition, 'vertical-left' | 'vertical-right'> = {
    'rightTop': 'vertical-left',
    'leftTop': 'vertical-right',
};


const InternalMenu: React.FC<InternalMenuProps> = (props) => {
    const {
        clsPrefix,
        inlineCollapsed,
        siderCollapsed,
        items,
        children,
        arrowdown,
        expandIcon,
        dir: directionProp,
        position,
        selectIcon,
        multiple,
        fieldid,
        className = '', // 自定义类名
        theme = 'light', // 主题颜色
        mode = 'vertical', // 菜单类型，对外使用vertical horizontal inline
        keyboard = false, // 是否使用键盘操作
        inlineIndent = 24,
        tabIndex = 0,
        popupOffset
    } = props;
    const {dir} = directionProp ? {dir: directionProp} : useConfigContext();
    // ========================== clsPreFix =======================
    const mergeClsPrefix = mode === 'dropdown' ? `${dropdownClsPrefix}-menu` : clsPrefix || menuClsPrefix;
    // ========================== mergeSelectIcon ==================
    const mergeSelectIcon = !selectIcon && mode === 'dropdown' ? <Icon type="uf-correct-2"/> : selectIcon;
    // ========================= Items ===========================
    const mergedChildren = useItems(items) || children;
    // ========================= MergeMode ======================
    const mergeMode = React.useMemo(() => {
        let _mode = mode === 'dropdown' ? 'vertical' : mode;
        return (position && popupPlacementMap[position] ? popupPlacementMap[position] : _mode) as RcMenuProps['mode']
    }, [mode, position]);
    // ======================= expandIcon ====================
    const mergeExpandIcon = useMemo(() => {
        return cloneElement(expandIcon as React.ReactNode, {
            className: `${mergeClsPrefix}-submenu-expand-icon`,
        })
    }, [expandIcon, mergeClsPrefix]);

    const _inlineCollapsed = React.useMemo(() => {
        if (siderCollapsed !== undefined) {
            return siderCollapsed;
        }
        return inlineCollapsed;
    }, [inlineCollapsed, siderCollapsed]);

    const menuClassName = classNames(
        `${mergeClsPrefix}-${theme}`,
        {
            [`${mergeClsPrefix}-inline-collapsed`]: _inlineCollapsed,
        },
        className,
    );
    let adapterNid = getNid(props)

    return (
        <MenuContext.Provider
            value={{
                inlineCollapsed: _inlineCollapsed || false,
                menuTheme: theme,
                dir,
                firstLevel: true,
                rootPrefixCls: mergeClsPrefix,
                selectIcon: mergeSelectIcon,
                multiple,
                mode: mergeMode,
                arrowdown,
                parentFieldid: fieldid,
                popupOffset
            }}
        >
            <RcMenu
                direction={dir}
                {...omit(props, ['keyboard', 'items', 'mode', 'clsPrefix', 'className', 'expandIcon', 'arrowdown', 'tabIndex', 'selectIcon', 'inlineIndent'])}
                mode={mergeMode}
                className={menuClassName}
                prefixCls={mergeClsPrefix}
                tabIndex={keyboard ? tabIndex : -1}
                // defaultmotions={defaultMotions}
                expandIcon={mergeExpandIcon}
                inlineIndent={inlineIndent}
                {...adapterNid}
            >
                {mergedChildren}
            </RcMenu>
        </MenuContext.Provider>
    );
}

// We should keep this as ref-able

@WebUI({name: "menu"})
class Menu extends React.Component<MenuProps> {
	static Divider = MenuDivider;

	static Item = Item;

	static SubMenu = SubMenu;

	static ItemGroup = ItemGroup;

	render() {
	    const { onSubMenuClick, theme } = this.props;
	    // onSubMenuClick传入 开启分割模式(暗黑模式除外)
	    return (
	        <SiderContext.Consumer>
	            {(context) => <InternalMenu {...this.props } {...context} onSubMenuClick={ theme !== 'dark' ? onSubMenuClick : undefined} />}
	        </SiderContext.Consumer>
	    );
	}
}


export default Menu;

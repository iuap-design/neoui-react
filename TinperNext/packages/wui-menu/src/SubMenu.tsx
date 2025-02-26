import classNames from 'classnames';
// import PropTypes from 'prop-types';
import {SubMenu as RcSubMenu} from 'rc-menu';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import {WebUI, getNid} from "../../wui-core/src/index"
import MenuContext from './config-provider/MenuContext';
import { SubMenuProps, MenuContextProps } from './iMenu';

const defaultProps = {
    disabled: false, // 是否禁用
    icon: null, // 菜单图标
    // popupClassName: '', // 子菜单样式，mode="inline" 时无效
    // title: '', // 子菜单项值
    popupOffset: [0, 5], // 子菜单偏移量，mode="inline" 时无效
    // onTitleClick: null, // 点击子菜单标题
}
@WebUI({name: "menu", defaultProps})
class SubMenu extends React.Component<SubMenuProps> {

    // static propTypes = {
    //     clsPrefix: PropTypes.string,
    //     className: PropTypes.string,
    //     disabled: PropTypes.bool,
    //     title: PropTypes.node,
    //     icon: PropTypes.node,
    //     style: PropTypes.object,
    //     onTitleClick: PropTypes.func,
    //     onTitleMouseEnter: PropTypes.func,
    //     onTitleMouseLeave: PropTypes.func,
    //     popupOffset: PropTypes.array,
    //     popupClassName: PropTypes.string,
    // }

	static contextType = MenuContext;

	static isSubMenu = true;

	renderTitle() {
	    const {inlineCollapsed, firstLevel} = this.context as MenuContextProps;
	    const {icon, title, clsPrefix} = this.props;
	    if (!icon) {
	        return inlineCollapsed && firstLevel && title && typeof title === 'string' ? (
	            <div className={`${clsPrefix}-inline-collapsed-noicon`}>{title}</div>
	        ) : (
	            title
	        );
	    }
	    // inline-collapsed.md demo 依赖 span 来隐藏文字,有 icon 属性，则内部包裹一个 span
	    const titleIsSpan = React.isValidElement(title) && title.type === 'span';
	    return (
	        <>
	            {icon}
	            {titleIsSpan ? title : <span>{title}</span>}
	        </>
	    );
	}

	render() {
	    const {menuTheme, mode, arrowdown, firstLevel, dir} = this.context as MenuContextProps;
	    const {clsPrefix, popupClassName, className } = this.props;
	    const titleNode = this.renderTitle();
	    let adapterNid = getNid(this.props)
	    let { popupOffset } = this.context as MenuContextProps;
	    // 第一级采用传过来的，其他默认
	    if (!firstLevel) {
	        popupOffset = [0, 5]
	    }
	    return (
	        <MenuContext.Provider
	            value={{
	                ...(this.context as MenuContextProps),
	                firstLevel: false,
	            }}
	        >
	            <RcSubMenu
	                dir={dir}
	                {...omit(this.props, ['icon', 'clsPrefix', 'popupClassName'])}
	                title={titleNode}
	                className={classNames(
	                    {[`${clsPrefix}-submenu-arrowdown`]: (mode === 'horizontal' && arrowdown)},
	                    className
	                )}
	                popupOffset={popupOffset || this.props.popupOffset}
	                popupClassName={classNames(
	                    clsPrefix,
	                    `${clsPrefix}-${menuTheme}`,
	                    popupClassName,
	                )}
	                {...adapterNid}
	            />
	        </MenuContext.Provider>
	    );
	}
}

export default SubMenu;

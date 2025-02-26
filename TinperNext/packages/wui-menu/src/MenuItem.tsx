import classNames from 'classnames';
// import PropTypes from 'prop-types';
import {Item} from 'rc-menu';
import toArray from 'rc-util/lib/Children/toArray';
import * as React from 'react';
import omit from 'omit.js';
import Tooltip from '../../wui-tooltip/src';
import {cloneElement} from './index';
import MenuContext from './config-provider/MenuContext';
import { MenuItemProps, MenuContextProps } from './iMenu';
import { TooltipProps } from '../../wui-tooltip/src/iTooltip';
import { getChildrenText, getNid } from '../../wui-core/src';


// const {propTypes: RcMenuItemProps} = Item;

class MenuItem extends React.Component<MenuItemProps> {

    // static propTypes = {
    //     ...RcMenuItemProps,
    //     disabled: PropTypes.bool,
    //     icon: PropTypes.node,
    //     danger: PropTypes.bool,
    //     title: PropTypes.node,
    //     attribute: PropTypes.object,
    //     fieldid: PropTypes.string,
    // }

	static defaultProps = {
	    danger: false, // 暂不支持该属性
	    disabled: false, // 是否禁用
	    // icon: null, // 菜单图标
	    // title: '', // 设置收缩时展示的悬浮标题
	    // attribute: {}, // 添加到dom上的属性
	}

	static isMenuItem = true;

	static contextType = MenuContext;

	renderItemChildren(inlineCollapsed: boolean) {
	    const {firstLevel, rootPrefixCls} = this.context as MenuContextProps;
	    const {icon, children} = this.props;
	    // inline-collapsed.md demo 依赖 span 来隐藏文字,有 icon 属性，则内部包裹一个 span
	    if (!icon || (children && React.isValidElement(children) && children.type === 'span')) {
	        if (children && inlineCollapsed && firstLevel && typeof children === 'string') {
	            return (
	                <div className={`${rootPrefixCls}-inline-collapsed-noicon`}>{children.charAt(0)}</div>
	            );
	        }
	        return children;
	    }
	    return <span>{children}</span>;
	}


	render() {
	    const { dir: direction } = this.context as MenuContextProps;
	    let {className, children, fieldid, title, icon, danger} = this.props;
	    if (title) { // 多语span兼容
	    	title = getChildrenText(title).join('')
	    }
	    let adapterNid = getNid(this.props)
	    return (
	        <MenuContext.Consumer>
	            {({inlineCollapsed, firstLevel, rootPrefixCls, selectIcon, multiple, parentFieldid}) => {
	                let tooltipTitle = title;
	                if (typeof title === 'undefined') {
	                    tooltipTitle = firstLevel ? children as MenuItemProps['title'] : '';
	                } else if (title === false) {
	                    tooltipTitle = '';
	                }
	                const tooltipProps: TooltipProps = {
	                    overlay: tooltipTitle,
	                };
	                if (!inlineCollapsed) {
	                    tooltipProps.overlay = null;
	                    // Reset `visible` to fix control mode tooltip display not correct
	                    tooltipProps.visible = false;
	                }
	                const childrenLength = toArray(children).length;
	                return (
	                    <Tooltip
	                        {...tooltipProps}
	                        placement={direction === 'rtl' ? 'left' : 'right'}
	                        overlayClassName={`${rootPrefixCls}-inline-collapsed-tooltip`}
	                    >
	                        <Item
	                            {...omit(this.props, ["title", "icon", "danger", "fieldid"])}
	                            className={classNames(
	                                {
	                                    [`${rootPrefixCls}-item-danger`]: danger,
	                                    [`${rootPrefixCls}-item-only-child`]:
										(icon ? childrenLength + 1 : childrenLength) === 1,
	                                    [`${rootPrefixCls}-item-has-selected-icon`]: multiple && selectIcon,
	                                },
	                                className,
	                            )}
	                            title={title as string}
	                            fieldid={fieldid ? fieldid : (parentFieldid ? `${parentFieldid}_menu-item` : undefined)}
	                            {...adapterNid}
	                        >
	                            {cloneElement(icon, {
	                                className: classNames(
	                                    React.isValidElement(icon) && icon.props && (icon.props as any).className ? (icon.props as any).className : '',
	                                    `${rootPrefixCls}-item-icon`,
	                                ),
	                            })}
	                            {this.renderItemChildren(inlineCollapsed)}
	                            {/* 兼容dropdown多选模式，显示与select一致 对勾图标 */}
	                            {multiple && selectIcon && cloneElement(selectIcon, {
	                                className: `${rootPrefixCls}-item-selected-icon`,
	                            })}
	                        </Item>
	                    </Tooltip>
	                );
	            }}
	        </MenuContext.Consumer>
	    );
	}
}

export default MenuItem;

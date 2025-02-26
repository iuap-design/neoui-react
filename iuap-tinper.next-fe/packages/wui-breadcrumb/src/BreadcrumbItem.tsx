import classNames from 'classnames';
import omit from "omit.js"
// import PropTypes from 'prop-types';
import React from 'react';

import {getChildrenText, WebUI} from "../../wui-core/src/index"
import Dropdown from '../../wui-dropdown/src/index';
import Icon from '../../wui-icon/src/index';
// import {propTypes as breadcrumbPropTypes} from './Breadcrumb';
import { BreadcrumbItemProps } from './iBreadcrumb';

// const propTypes = {
//     ...breadcrumbPropTypes,
//     /**
// 	 * 如果设置成true渲染`span` 而不是 `a`
// 	 */
//     active: PropTypes.bool,
//     /**
// 	 * `href` a标签href
// 	 */
//     href: PropTypes.string,
//     /**
// 	 * `title`  标签title属性
// 	 */
//     title: PropTypes.node,
//     overlay: PropTypes.element,
//     dropdownProps: PropTypes.object,
// };

const defaultProps = {
    active: false,
};

@WebUI({name: "breadcrumb", defaultProps})
class BreadcrumbItem extends React.Component<BreadcrumbItemProps> {

    static defaultProps = defaultProps;

	renderContent = () => {
	    let {href, overlay, dropdownProps, children, clsPrefix, title, menu, ...props} = this.props;
	    title = getChildrenText(title).join('')
	    overlay = menu || overlay
	    // 如果包含href值，则
	    const content = href ? <a {...omit(props, ["separator", "active", "className"])} href={href} title={title}>{children}</a> :
	        <span {...omit(props, ["separator", "active", "className"])} title={title}>{children}</span>
	    return (
	        overlay && React.isValidElement(overlay) ? (
	            <Dropdown {...dropdownProps} overlay={overlay}>
	                <span {...omit(props, ["separator", "active", "className"])}>
	                    {children}
			  			<Icon className={`${clsPrefix}-dropdown-icon`} type="uf-arrow-down"/>
	                </span>
	            </Dropdown>
	        ) : (
	            content
	        )
	    )
	}
	hanleClick = (e: React.MouseEvent) => {
	    let {keyValue, onItemClick} = this.props
	    onItemClick && onItemClick(e, keyValue as string)
	}

	render() {
	    const {active, className, separator, clsPrefix, isActiveKey, activeKey} = this.props;
	    let isLevel = activeKey ? isActiveKey ? isActiveKey : active : active
	    const classNam = classNames(
	        className,
	        {[`${clsPrefix}-active`]: isLevel}
	    )
	    return (
	        <li className={classNam} onClick={this.hanleClick}>
	            {this.renderContent()}
	            {separator && <span className={`${clsPrefix}-separator`}>{separator}</span>}
	        </li>
	    );

	}
}

// BreadcrumbItem.propTypes = propTypes;

export default BreadcrumbItem;

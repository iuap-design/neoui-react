import classNames from 'classnames';
// import omit from 'omit.js';
// import PropTypes from 'prop-types';
import React, { ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import Button from '../../wui-button/src';
import {WebUI, getNid, prefix} from "../../wui-core/src/index";
import Icon from '../../wui-icon/src';
import Dropdown from './index';
import { DropdownDefaultProps } from './Dropdown';
// import placements from './placement';
import { DropdownButtonProps, DropdownButtonState} from './iDropdown';
import { ButtonIcon } from '../../wui-button/src/iButton';

const ButtonGroup = Button.Group;
// const DropDownProps = Dropdown.propTypes;

// export const DropdownButtonProps = {
//     ...DropDownProps,

//     size: PropTypes.oneOf(['sm', 'md', 'xg', 'lg', 'small', 'large', 'middle']),
//     style: PropTypes.object,
//     className: PropTypes.string,
//     clsPrefix: PropTypes.string,
//     type: PropTypes.oneOf(['primary', 'ghost', 'dashed', 'default']),
//     disabled: PropTypes.oneOf([PropTypes.bool, PropTypes.array]),
//     onClick: PropTypes.func,
//     icon: PropTypes.element,
//     href: PropTypes.string,
//     children: PropTypes.node,
//     title: PropTypes.string,
//     // 触发下拉的类型button、icon, 默认button 类型
//     triggerType: PropTypes.string,
//     /**
// 	 * @title 自定义左右两个按钮
// 	 * @des 返回一个处理好的元素数组 (buttons: ReactNode[]) => ReactNode[]
// 	 * @veIgnore
// 	 */
//     buttonsRender: PropTypes.func,
//     fieldid: PropTypes.string,
// };

const defaultProps: DropdownButtonProps = {
    ...DropdownDefaultProps,
    type: 'default',
    // size: null,
    style: {},
    className: '',
    disabled: false,
    title: '', // 左侧按钮title 属性
    // href: '',
    triggerType: 'button',
    buttonsRender: (buttons: React.ReactNode[]) => buttons,
};

@WebUI({name: "dropdown-button", defaultProps})
class DropdownButton extends React.Component<DropdownButtonProps, DropdownButtonState> {

    // static propTypes = DropdownButtonProps;

    constructor(props: DropdownButtonProps) {
	    super(props);
	    this.state = {
	        rootNode: null,
	    }
	    // this.rootNode = null;
    }

    componentDidMount() {
	    // if (!this.props.placement && this.props.triggerType === 'icon') {
	    if (this.props.triggerType === 'icon') {
	        this.setState({rootNode: ReactDOM.findDOMNode(this) })
	        // this.handleSetPlacementByLeftButton();
	    }
    }

    componentDidUpdate(prevProps: DropdownButtonProps) {
	    if (
	        this.props.children !== prevProps.children
			// (this.props.children !== prevProps.children || !this.state.overlayStyle.minWidth) // 兼容初次渲染设置display:none 导致获取不到宽度问题
			// && !this.props.placement
			&& this.props.triggerType === 'icon'
	    ) {
	        this.setState({rootNode: ReactDOM.findDOMNode(this) })
	        // requestAnimationFrame(() => {
	        //     this.handleSetPlacementByLeftButton();
	        // })
	    }
    }

    // // 根据左边按钮宽度设置下拉的移动距离及最小宽度
    // handleSetPlacementByLeftButton = () => {
    //     const rootNode = ReactDOM.findDOMNode(this);
    //     const leftButton = rootNode.firstElementChild;
    //     this.setState({
    //         placement: {...placements.bottomLeft, offset: [-leftButton.offsetWidth, 4]},
    //         overlayStyle: {minWidth: rootNode.offsetWidth}
    //     })
    // }
	getOverlayNodeFromChildren = (children: ReactNode) => {
	    let overlayNode: ReactElement | null = null;
	    if (Array.isArray(children)) {
	        const childs: ReactNode[] = children.reduce((preChilds, child) => {
	            if (!overlayNode && child?.props?.clsPrefix === `${prefix}-menu`) {
	                overlayNode = child;
	                return preChilds
	            }
	            if (child) {
	                return [...preChilds, child];
	            }
	            return preChilds
	        }, [])
	        return {childs, overlayMenu: overlayNode}
	    }
	    return {childs: children}
	}
	render() {
	    const {
	        clsPrefix,
	        type,
	        disabled,
	        onClick,
	        htmlType,
	        children,
	        className,
	        trigger,
	        href,
	        fieldid,
	        icon = <Icon fieldid='arrow_icon' type="uf-gridcaretdown"/>,
	        title,
	        buttonsRender,
	        size,
	        triggerType,
	        style,
	        id,
	        ...restProps
	    } = this.props;
	    // const {placement, overlayStyle} = this.state;
	    const { rootNode } = this.state;
	    const [leftDisabled, rightDisabled] = Array.isArray(disabled) ? [...disabled] : [disabled, disabled];
	    // let leftDisabled = disabled,rightDisabled = disabled;
	    // 当triggerType="icon"时，disabled为[]数组模式时可分开定义禁用状态。
	    // if(Array.isArray(disabled)&&disabled.length>=2){
	    //   leftDisabled = disabled[0];
	    //   rightDisabled = disabled[1];
	    // }
	    const {childs, overlayMenu} = this.getOverlayNodeFromChildren(children)

	    const leftButton = (
	        <Button
	            type={type}
	            size={size}
	            id={id}
	            disabled={leftDisabled}
	            onClick={onClick}
	            htmlType={htmlType}
	            href={href}
	            title={title}
	            fieldid={fieldid && `${fieldid}_btn`}
	            className={`${clsPrefix}-left`}
	            maxWidth={true}
	        >
	            {childs}
	        </Button>
	    );

	    const rightButton = <Button fieldid={fieldid && `${fieldid}_sub_btn`} disabled={rightDisabled} className={`${clsPrefix}-right`} size={size} type={type}
	        icon={icon as ButtonIcon}/>;

	    let [leftButtonToRender, rightButtonToRender] = buttonsRender!([leftButton, rightButton]);

	    // 兼容trigger=button模式使用tooltip场景，将内置样式加在leftButton上, 领域可以设置tagName属性
	    let tooltipDisabed = false;
	    if (
	        React.isValidElement(leftButtonToRender) &&
			((leftButtonToRender as any)?.type?.displayName === 'Tooltip' || leftButtonToRender?.props?.tagName === 'Tooltip') &&
			(((leftButtonToRender?.props as any || {}).children as React.ReactElement) || {}).props?.className &&
			(leftButtonToRender.props as any)?.children.props.className.indexOf('wui-dropdown-button-left') !== -1
	    ) {
	        tooltipDisabed = true;
	        leftButtonToRender = React.cloneElement(
	            leftButtonToRender,
	            {
	                ...(leftButtonToRender.props || {}),
	                // @ts-ignore
	                children: React.cloneElement((leftButtonToRender.props as any).children as React.ReactElement, {
	                    className: classNames(clsPrefix, className, `${clsPrefix}-no-line`, `${clsPrefix}-left`),
	                    icon: icon
	                })
	            },
	        );
	    }
	    restProps.overlay = overlayMenu! || restProps.overlay;
	    if (triggerType === 'button') {
	        let adapterNid = getNid(this.props)
	        return (
	            <Dropdown {...restProps} disabled={leftDisabled} trigger={trigger} {...adapterNid}>
	                {React.cloneElement(leftButtonToRender as JSX.Element, {
	                    icon: !tooltipDisabed ? icon : undefined,
	                    style: style,
	                    className: !tooltipDisabed ? classNames(clsPrefix, className, `${clsPrefix}-no-line`) : undefined,
	                    ...adapterNid
	                })}
	            </Dropdown>
	        )
	    }

	    let adapterNid = getNid(this.props)
	    return (
	        <ButtonGroup style={style} className={classNames(clsPrefix, className)} {...adapterNid}>
	            {leftButtonToRender}
	            <Dropdown
	                {...restProps}
	                // {...omit(restProps, ['overlayStyle', 'placement'])}
	                disabled={rightDisabled}
	                trigger={trigger}
	                matchNode={rootNode as HTMLElement}
	            >
	                {rightButtonToRender as JSX.Element}
	            </Dropdown>
	        </ButtonGroup>
	    );
	}
}

export default DropdownButton;

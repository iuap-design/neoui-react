import classnames from 'classnames';
import omit from 'omit.js';
// import PropTypes from 'prop-types';
import React, {Component, cloneElement, ReactElement} from 'react';
import {WebUI, getNid} from "../../wui-core/src/index"
import {setComponentSize} from "../../wui-core/src/componentStyle"
import Icon from '../../wui-icon/src';
import {WithConfigConsumer} from "../../wui-provider/src/context";
import ButtonGroup from '../../wui-button-group/src';
import {ButtonProps, ButtonColors} from "./iButton"

/* const propTypes = {
    /!**
	 * @title 尺寸
	 *!/
    size: PropTypes.oneOf(['sm', 'md', 'xg', 'lg', 'small', 'large', 'middle']),
    /!**
	 * @title 样式
	 *!/
    style: PropTypes.object,
    /!**
	 * @title 形状
	 *!/
    shape: PropTypes.oneOf(['block', 'round', 'border', 'squared', 'floating', 'pillRight', 'pillLeft', 'icon']),

    bordered: PropTypes.bool,
    /!**
	 * @title 是否有icon图标
	 *!/
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    /!**
	 * @title 是否有loading状态
	 *!/
    loading: PropTypes.bool,
    /!**
	 * @title 是否有loading提示
	 *!/
    loadingText: PropTypes.string,
    /!**
	 * @title 类型
	 *!/
    colors: PropTypes.oneOf(['primary', 'secondary', 'accent', 'success', 'info', 'warning', 'danger', 'dark', 'light', 'default']),
    /!**
	 * @title 是否禁用
	 * @veIgnore
	 *!/
    disabled: PropTypes.bool,
    /!**
	 * @title 类名
	 * @veIgnore
	 *!/
    className: PropTypes.string,

    /!**
	 * @title <button> 的 type
	 * @veIgnore
	 *!/
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
    /!**
	 * @title 类型
	 *!/
    type: PropTypes.oneOf(['default', 'ghost', 'danger', 'primary', 'dashed', 'text', 'link']),
    /!**
	 * @title 是否作为form的提交按钮
	 *!/
    isSubmit: PropTypes.bool,
    /!**
	 * @title 是否危险按钮
	 *!/
    danger: PropTypes.bool,
    /!**
	 * @title 是否幽灵按钮
	 *!/
    ghost: PropTypes.bool,
    /!**
	 * @title 是否为块级按钮
	 *!/
    block: PropTypes.bool,
    /!**
	 * @title 链接按钮的链接
	 *!/
    href: PropTypes.string,
    /!**
     * @title fieldid
     *!/
    fieldid: PropTypes.string
}*/

const defaultProps = {
    disabled: false,
    htmlType: 'button',
    bordered: false,
    isSubmit: false,
    loading: false,
    danger: false,
    ghost: false,
    loadingText: "",
    size: null,
    shape: null,
    icon: null,
    colors: null,
    type: null,
    href: null,
    fieldid: undefined,
    maxWidth: false
}

const colorsMap = {
        primary: 'primary',
        secondary: 'secondary',
        accent: 'accent',
        success: 'success',
        info: 'info',
        warning: 'warning',
        danger: 'danger',
        dark: 'dark',
        light: 'light'
    },
    typeMap = {
        default: 'default',
        ghost: 'ghost',
        danger: 'danger',
        dashed: 'dashed',
        text: 'text',
        link: 'link',
        // tool: 'tool',
        primary: 'primary',
        plainText: 'plainText'
    },
    shapeMap = {
        block: 'block',
        round: 'round',
        border: 'border',
        squared: 'squared',
        floating: 'floating',
        pillRight: 'pill-right',
        pillLeft: 'pill-left',
        icon: 'icon',
        circle: 'icon'
    };

@WithConfigConsumer()
@WebUI({name: "button", defaultProps})
class Button extends Component<ButtonProps, {maxWidth: boolean, ellipsisTitle: null | string}> {
    button: any;
    constructor(props: ButtonProps) {
        super(props);
        this.state = {
            maxWidth: 'maxWidth' in props && typeof props.maxWidth === 'boolean' ? props.maxWidth : false,
            ellipsisTitle: null
        }
        this.button = null;
    }
    static Group: typeof ButtonGroup;
    componentDidMount() {
        requestAnimationFrame(() => {
            if (this.button) {
                const style = this.button.style; // 行内样式style
                const currentStyle = this.button.currentStyle || getComputedStyle(this.button);
                // const buttonWidth = typeof currentStyle?.width === 'number' ? currentStyle.width : parseFloat(currentStyle?.width || '0px');
                const textWidth = this.button.children[0]?.offsetWidth;
                const display = currentStyle?.display;
                let { maxWidth } = this.state;
                if (!style?.width && display !== 'block' && textWidth > 150) { // button 内联样式设置了width后以width 为主，外联样式无法兼容==
                    maxWidth = true;
                    this.setState({
                        maxWidth
                    })
                }
                if (maxWidth && !('title' in this.props)) {
                    const ellipsisTitle = this.button.querySelector(`.${this.props.clsPrefix}-text-wrap`)?.textContent || '';
                    this.setState({
                        ellipsisTitle: ellipsisTitle as string
                    })
                }
            }

        })
    }


    render() {
        let {
            colors,
            shape,
            className,
            size,
            bordered,
            children,
            htmlType,
            clsPrefix,
            loading,
            loadingText,
            icon,
            danger,
            ghost,
            type,
            block,
            href,
            disabled,
            uirunmode,
            title,
            ...others
        } = this.props;
        // let isDisabled = disabled;
        // let isBordered = bordered
        bordered = typeof bordered === 'boolean' ? bordered : false;
        let clsObj = {
            [`${className}`]: !!className,
            [`${clsPrefix}-danger`]: danger || typeMap[type!] === 'danger',
            [`${clsPrefix}-disabled`]: disabled,
            [`${clsPrefix}-ghost`]: ghost || typeMap[type!] === 'ghost',
            [`${clsPrefix}-border`]: bordered || shapeMap[shape!] === 'border',
            [`${clsPrefix}-block`]: block || shapeMap[shape!] === 'block',
            [`${clsPrefix}-text`]: typeMap[type!] === 'link',
            [`${clsPrefix}-loading`]: loading,
            [`${clsPrefix}-${colorsMap[type as ButtonColors]}`]: colorsMap[type as ButtonColors], // mdf升级 => 兼容type属性接收colors
            [`${clsPrefix}-${setComponentSize(size!)}`]: setComponentSize(size!),
            [`${clsPrefix}-${shapeMap[shape!]}`]: shapeMap[shape!],
            [`${clsPrefix}-${colorsMap[colors!]}`]: colorsMap[colors!],
            [`${clsPrefix}-${typeMap[type!]}`]: typeMap[type!],
            [`${clsPrefix}-has-max-width`]: this.state.maxWidth,

        };
        /* if (className) {
			clsObj[className] = true;
		}
		if (sizeMap[size]) {
			clsObj[`${clsPrefix}-${sizeMap[size]}`] = true;
		}

		if (shapeMap[shape]) {
			clsObj[`${clsPrefix}-${shapeMap[shape]}`] = true;
		}
		if (block) {
		  clsObj[`${clsPrefix}-block`] = true;
		}
		if (colorsMap[colors]) {
			clsObj[`${clsPrefix}-${colorsMap[colors]}`] = true;
		}
		if (colorsMap[type]) { // mdf升级 => 兼容type属性接收colors
		  clsObj[`${clsPrefix}-${colorsMap[type]}`] = true;
		}
		if (danger) {
		  clsObj[`${clsPrefix}-danger`] = danger;
		}
		if (ghost) {
		  clsObj[`${clsPrefix}-ghost`] = ghost;
		}
		if(isBordered){
		  clsObj[`${clsPrefix}-border`] = isBordered;
		}
		if (loading) {
		  clsObj[`${clsPrefix}-loading`] = loading;
		}
		if (typeMap[type]) {
		  clsObj[`${clsPrefix}-text`] = typeMap[type] === 'link';
		  clsObj[`${clsPrefix}-${typeMap[type]}`] = true;
		}*/
        if (icon) {
            clsObj[`${clsPrefix}-icon-cls`] = true;
            if (!children && children !== 0) {
                clsObj[`${clsPrefix}-icon-only`] = true;
            }
            if (loading && loadingText) {
                clsObj[`${clsPrefix}-icon-only`] = false;
            }
        }
        const iconProps:Pick<ButtonProps, "id" | "fieldid"> = {}, loadingProps:Pick<ButtonProps, "id" | "fieldid"> = {};
        if (this.props.id) {
            iconProps.id = `${this.props.id}_icon`;
            loadingProps.id = `${this.props.id}_loading_icon`;
        }
        if (this.props.fieldid) {
            iconProps.fieldid = `${this.props.fieldid}_icon`;
            loadingProps.fieldid = `${this.props.fieldid}_loading_icon`;
        }
        const isIconNode = (child?: ReactElement<React.HTMLAttributes<any> | undefined> | string) => {
            if (!child) return;
            if (React.isValidElement(child)) {
                iconProps.fieldid = child.props?.fieldid ?? iconProps.fieldid;
                iconProps.id = child.props?.id ?? iconProps.id;
                const cloneChild = cloneElement(child, iconProps);
                return (<span className={`${clsPrefix}-icon-cls-wrapper`}>{cloneChild}</span>)
            } else {
                return (<span className={`${clsPrefix}-icon-cls-wrapper`}><Icon {...iconProps} type={child as string}/></span>)
            }
        }
        let classes = classnames(clsPrefix, clsObj);
        let loadingIcon = <span className={`${clsPrefix}-loading-wrapper`}><Icon {...loadingProps}
																				 type="uf-loadingstate"/></span>;
        let beeIcon = isIconNode(icon);
        let hasChildOrLoadingText = !!children || children === 0 || (loading && loadingText);
        // let text = loading && loadingText ? loadingText : this.props.children;
        if (type === 'link' && href !== null && this.props.href !== undefined) {
            return (
                <a
                    type={htmlType}
                    ref={(ref: HTMLAnchorElement | undefined | null) => {
                        this.button = ref
                    }}
                    title={this.state.ellipsisTitle ?? title}
                    href={href}
                    disabled={uirunmode === 'design' ? false : disabled}
                    className={classes}
                    // disabled={isDisabled}
                    {...omit(others, ["isText", "isSubmit"])}>
                    {loading ? loadingIcon : beeIcon}
                    {hasChildOrLoadingText && <span
                        className={`${clsPrefix}-text-wrap`}>{loading && loadingText ? loadingText : this.props.children}</span>}
                </a>
            )
        }
        let adapterNid = getNid(this.props)

        return (
            <button
                type={htmlType}
                ref={(ref: HTMLButtonElement) => {
                    this.button = ref
                }}
                className={classes}
                // disabled={isDisabled}
                {...omit(others, ["isText", "isSubmit", 'maxWidth'])}
                disabled={uirunmode === 'design' ? false : disabled}
                {...adapterNid}
                title={this.state.ellipsisTitle ?? title}
            >
                {loading ? loadingIcon : beeIcon}
                {hasChildOrLoadingText && <span
                    className={`${clsPrefix}-text-wrap`}>{loading && loadingText ? loadingText : this.props.children}</span>}
            </button>
        );
    }
}

// Button.propTypes = propTypes;

export default Button;

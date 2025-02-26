import classnames from 'classnames';
import omit from 'omit.js';
import PropTypes from 'prop-types';
import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import { prefix, setComponentSize, WebUI } from "../../wui-core/src/index"
import { RadioGroupProps, RadioGroupState, RadioValue, MockRadio, RadioContext, RadioProps } from './iRadio';
import Radio from './Radio';
import RadioButton from './RadioButton';
import Dropdown from '../../wui-dropdown/src';
import MenuItem from '../../wui-menu/src/MenuItem';
import Menu from '../../wui-menu/src';
import Button from '../../wui-button/src';
import { MenuProps } from '../../wui-menu/src/iMenu';
import { OrNull } from '../../wui-core/src/utils/type';
const { Item } = Menu;

const sizeMap = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    small: 'sm',
    middle: 'md',
    large: 'lg',
}
const noop = () => {
}
// export const propTypes = {
//     name: PropTypes.string,
//     /**
// 	 * 默认选中的值
// 	 */
//     defaultValue: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number,
//         PropTypes.bool,
//     ]),
//     /**
// 	 * 选中的值
// 	 */
//     selectedValue: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number,
//         PropTypes.bool,
//     ]),
//     /**
// 	 * 选中的值,作用与selectedValue一致，添加value属性是为了配合form表单校验初始化等一起使用
// 	 */
//     value: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number,
//         PropTypes.bool,
//     ]),
//     /**
// 	 * 暴露给用户，且与子Radio通信的方法
// 	 */
//     onChange: PropTypes.func,
//     /**
// 	 * radio 大小
// 	 */
//     size: PropTypes.oneOf(['lg', 'sm', 'small', 'large', 'default']),

//     // 是否兼容ant design模式
//     antd: PropTypes.bool,

//     children: PropTypes.node.isRequired,

//     Component: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.func,
//         PropTypes.object
//     ]),
//     disabled: PropTypes.bool,
//     readOnly: PropTypes.bool
// };

const defaultProps = {
    Component: 'div',
    clsPrefix: `${prefix}-radio-group`,
    defaultValue: '',
    antd: false,
    onChange: noop,
    name: '',
    children: <div></div>,
    readOnly: false,
    maxCount: false
};

/**
 * 与子Radio通信
 */
const childContextTypes = {
    radioGroup: PropTypes.object
}

@WebUI({ name: "radio-group", defaultProps })
class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {
	static defaultProps = { ...defaultProps }
	static childContextTypes = childContextTypes;
	parentResizeObserver: OrNull<ResizeObserver> = null;
	dobounceFillSpaceFun: (() => void | undefined) | undefined | null;
	radioGroup: HTMLElement | null = null;
	constructor(props: RadioGroupProps, context: RadioContext<RadioGroupProps>) {
	    super(props, context);
	    const initValue = props.value ?? (props.selectedValue ?? props.defaultValue);
	    this.state = {
	        focusValue: '',
	        selectedValue: initValue,
	        maxCount: -1
	    }
	}

	getValues = (): RadioValue[] => {
	    let array: RadioValue[] = []
	    let children: any = this.props.children;
	    if (!children || (Array.isArray(children) && children.length === 0)) {
	        return array;
	    }
	    if (!Array.isArray(children)) { // 如果只有一个元素，不是数组，则放到数组中
	        children = [children]
	    } else if (children.some((child: any) => Array.isArray(child))) { // 如果数组中还有数组
	        let res: (React.ReactElement | MockRadio)[] = []
	        children.forEach((child: any) => {
	            if (Array.isArray(child)) {
	                res = res.concat(child)
	            } else {
	                res.push(child)
	            }
	        })
	        children = res
	    }
	    children = children.map((child: any) => {
	        if (child) return child
	        return {
	            props: {
	                value: ''
	            }
	        }
	    })
	    if (children.length > 1) {
	        children.map((item: any) => {
	            array.push(item.props.value)
	        })
	    } else if (children.length === 1) {
	        array.push(children[0].props.value)
	    } else {
	        array.push(children.props.value);
	    }
	    return array;
	}

	componentDidMount() {
	    let array = this.getValues();
	    if (array.indexOf(this.props.selectedValue as RadioValue) == -1) {
	        this.setState({
	            focusValue: array[0]
	        })
	    }
	    // if (this.props.maxCount === true) {
	    //     const parentWith = this.radioGroup!.parentElement?.clientWidth;
	    //     const childNodes = this.radioGroup!.childNodes as any;
	    //     let maxCount = this.state.maxCount;
	    //     childNodes.forEach((child: HTMLElement, index: number) => {
	    //         if (!maxCount && index !== 0 && child.offsetLeft < childNodes[0].offsetLeft + 5 && child.offsetLeft > childNodes[0].offsetLeft - 5) {
	    //             const style = childNodes[index - 1].currentStyle || getComputedStyle(childNodes[index - 1]);
	    //             if (childNodes[index - 1].offsetLeft + childNodes[index - 1].clientWidth + (parseInt(style.marginRight) || 0) + 22 > parentWith!) {
	    //                 maxCount = index - 1
	    //                 return this.setState({
	    //                     maxCount: index - 1
	    //                 })
	    //             }
	    //             maxCount = index - 1
	    //             return this.setState({
	    //                 maxCount: index
	    //             })
	    //         }
	    //     });
	    // }
	    if (this.props.maxCount === true) {
	        // this.setInnerMaxCount();
	        this.dobounceFillSpaceFun = this.throttle(() => this.setInnerMaxCount(), 200, true)
	        let parent = this.radioGroup!.parentNode;
	        if (parent && parent.nodeName.toUpperCase() === 'FORM') {
	            parent = parent.parentNode;
	        }
	        if (parent) {
	            this.parentResizeObserver = new ResizeObserver(() => {
	                this.setState({
	                    maxCount: -1
	                }, () => {
	                    this.dobounceFillSpaceFun && this.dobounceFillSpaceFun()
	                });
	                // this.dobounceFillSpaceFun && this.dobounceFillSpaceFun()
	            });
	            this.parentResizeObserver.observe(parent as Element)
	        }
	    }
	}

	UNSAFE_componentWillReceiveProps(nextProps: RadioGroupProps) {
	    let array = this.getValues();
	    if (array.indexOf(this.props.selectedValue as RadioValue) == -1 || this.props.value && array.indexOf(this.props.value) == -1) {
	        this.setState({
	            focusValue: array[0]
	        })
	    } else {
	        this.setState({
	            focusValue: ''
	        })
	    }
	    if ('selectedValue' in nextProps || 'value' in nextProps) {
	        this.setState({
	            selectedValue: nextProps.selectedValue !== undefined ? nextProps.selectedValue : nextProps.value
	        })
	    }
	}

	componentWillUnmount(): void {
	    this.dobounceFillSpaceFun = null;
	    if (this.parentResizeObserver) {
	        this.parentResizeObserver.disconnect();
	    }
	}

	throttle = (fn: any, delay: any, isImmediate = true) => {
	    // isImmediate 为 true 时使用前缘节流，首次触发会立即执行，为 false 时使用延迟节流，首次触发不会立即执行
	    let last = Date.now();
	    let timeoutId: any = null;
	    return function() {
	        let now = Date.now();
	        if (isImmediate) {
	            fn.apply(this, arguments);
	            isImmediate = false;
	            last = now;
	        }
	        if (now - last >= delay) {
	            fn.apply(this, arguments);
	            last = now;
	        } else {
	            if (timeoutId) {
	                clearTimeout(timeoutId);
	            }
	            timeoutId = setTimeout(() => {
	                last = now;
	                fn.apply(this, arguments);
	            }, delay);
	        }
	    }
	}

	setInnerMaxCount = () => {
	    const { maxCount: preMaxCount } = this.props;
	    if (!preMaxCount) {
	        return;
	    }
	    let parent = this.radioGroup!.parentElement;
	    if (parent && parent.nodeName.toUpperCase() === 'FORM') {
	        parent = parent.parentNode as HTMLElement;
	    }
	    const parentWith = parent?.clientWidth;
	    const childNodes = this.radioGroup!.childNodes as any;
	    let maxCount = this.state.maxCount;
	    const dropDownWidth = 22;
	    childNodes.forEach((child: HTMLElement, index: number) => {
	        if (maxCount < 0 && index !== 0 && child.offsetLeft < childNodes[0].offsetLeft + 5 && child.offsetLeft > childNodes[0].offsetLeft - 5) {
	            const style = childNodes[index - 1].currentStyle || getComputedStyle(childNodes[index - 1]);
	            if (childNodes[index - 1].offsetLeft + childNodes[index - 1].clientWidth + (parseInt(style.marginRight) || 0) + dropDownWidth > parentWith!) {
	                maxCount = index - 1
	                return this.setState({
	                    maxCount: index - 1
	                })
	            }
	            maxCount = index - 1
	            return this.setState({
	                maxCount: index
	            })
	        } else if (maxCount < 0 && index === 0) { // 第一个元素超出了父容器宽度
	            const style = childNodes[index].currentStyle || getComputedStyle(childNodes[index]);
	            if (child.clientWidth > parentWith! || child.clientWidth + (parseInt(style.marginRight) || 0) > parentWith!) {
	                maxCount = 0
	                return this.setState({
	                    maxCount: 0
	                })
	            }
	        }
	    });
	}

	handleChange = (value: RadioValue | React.ChangeEvent, event?: React.ChangeEvent, isDropDownChange?: boolean) => {
	    let { onChange, antd, selectedValue: preVal, onClick } = this.props;
	    let val = value
	    let currentVal = antd ? (value as React.ChangeEvent<HTMLInputElement>).target.value : value;
	    onClick && onClick(value, event)

	    if (currentVal === preVal) return;
	    if (!('selectedValue' in this.props)) {
	        this.setState({
	            selectedValue: val
	        })
	    }
	    const args: [value: RadioValue | React.ChangeEvent | React.MouseEvent<HTMLElement>, event?: | React.ChangeEvent | React.MouseEvent<HTMLElement>, options?: {maxCount?: number}] = [value, event];
	    if (isDropDownChange) {
	        args.push({maxCount: this.state.maxCount})
	    }
	    onChange && onChange(...args);
	}

	/**
	 * 一旦外层change方法触发本身props发生改变，则调用getChildContext更新与子Radio的通信信息（radioGroup）
	 */

	getChildContext() {
	    const { name, size } = this.props;
	    let { selectedValue } = this.state;
	    let onChange = this.handleChange;
	    return {
	        radioGroup: {
	            name, selectedValue, onChange, size, focusValue: this.state.focusValue
	        }
	    }
	}
	selectDropItem: MenuProps['onSelect'] = ({domEvent, selectedKeys: [selectedKey]}) => {
	    this.handleChange(selectedKey, domEvent as any, true)
	}
	renderOptionContent = ({ option, mergeStyle }: { option: (RadioProps & { label: ReactNode } | string); mergeStyle: CSSProperties }) => {
	    const { optionType, readOnly, disabled, antd } = this.props;
	    const props = {
	        readOnly: readOnly,
	        disabled: disabled,
	        antd: antd
	    };
	    if (typeof option === 'string') {
	        return optionType === "button" ? <RadioButton {...props} value={option} >{option}</RadioButton> : <Radio value={option}>{option}</Radio>;
	    }
	    const { value, label, style, ...otherProps } = option;
	    return optionType === "button" ? <RadioButton value={value} style={mergeStyle} {...props} {...otherProps} >{label}</RadioButton> : <Radio value={value} {...props} {...otherProps}>{label}</Radio>;
	}
	renderChildContent = ({ option, mergeStyle }: { option: ReactElement<RadioProps>; mergeStyle: CSSProperties }) => {
	    const { readOnly, disabled, antd } = this.props;
	    return React.cloneElement(option,
	        {
	            // disabled: get(child, "props.disabled") || disabled,
	            disabled: option?.props?.disabled || disabled,
	            readOnly, // RadioGroup下的Radio，都只使用父节点的readOnly属性，子节点不能覆盖父节点的readOnly。单独使用的Radio使用自己的readOnly
	            antd,
	            style: mergeStyle
	        }
	    )
	}
	renderContentFromCount = ({ spaceStyle, menuKey, menuContent, style, arrayLength, optionType, option, index, isOption, menuItem }: {
		spaceStyle: CSSProperties; menuKey: string; menuContent: string; style: CSSProperties; arrayLength: number; optionType?: string; option?: ReactElement<RadioProps> | RadioProps | string; index: number; isOption: boolean; menuItem: MenuItem[] & any[];
	}) => {
	    const { maxCount } = this.props;
	    let mergeStyle = spaceStyle;
	    mergeStyle = style || {};
	    if (index !== arrayLength - 1 && spaceStyle) {
	        mergeStyle = { ...spaceStyle, ...mergeStyle }
	    }
	    if (!maxCount || optionType !== "button") {
	        return isOption ? this.renderOptionContent({ option, mergeStyle } as { option: (RadioProps & { label: ReactNode } | string); mergeStyle: CSSProperties }) : this.renderChildContent({ option, mergeStyle } as { option: ReactElement<RadioProps>; mergeStyle: CSSProperties })
	    }
	    if (typeof maxCount === 'number' || (typeof this.state.maxCount === 'number' && this.state.maxCount > -1)) {
	        const mergeMaxCount = this.state.maxCount === 0 ? this.state.maxCount : (this.state.maxCount || maxCount as number)
	        if ((mergeMaxCount > 0 && mergeMaxCount < arrayLength && index >= mergeMaxCount) || mergeMaxCount === 0) {
	            menuItem.push(<Item key={menuKey as string}>{menuContent}</Item>)
	            return null
	        } else {
	            return isOption ? this.renderOptionContent({ option, mergeStyle } as { option: (RadioProps & { label: ReactNode } | string); mergeStyle: CSSProperties }) : this.renderChildContent({ option, mergeStyle } as { option: ReactElement<RadioProps>; mergeStyle: CSSProperties })
	        }
	    } else {
	        return isOption ? this.renderOptionContent({ option, mergeStyle } as { option: (RadioProps & { label: ReactNode } | string); mergeStyle: CSSProperties }) : this.renderChildContent({ option, mergeStyle } as { option: ReactElement<RadioProps>; mergeStyle: CSSProperties })

	    }
	}

	renderOptions = (options: RadioGroupProps['options'], { spaceStyle, menuItem }: { spaceStyle: CSSProperties; menuItem: MenuItem[] & any[]; }) => {

	    const { optionType } = this.props;
	    const radioChilds = options!.map((option, index) => {
	        if (!option) {
	            return null
	        }
	        let style = {};
	        let menuKey = option as string;
	        let menuContent = option as string;
	        if (typeof option !== 'string') {
	            style = option.style || {};
	            menuKey = option.value as string;
	            menuContent = option.label as string;
	        }
	        return this.renderContentFromCount({ spaceStyle, menuKey, menuContent, style, arrayLength: options?.length!, optionType, option, index, isOption: true, menuItem })
	    })
	    return radioChilds
	}

	renderChilds = (children: ReactElement<RadioProps>, { spaceStyle, menuItem }: { spaceStyle: CSSProperties; menuItem: MenuItem[] & any[] }) => {
	    const childsNum = React.Children.count(children);
	    return React.Children.map(children, (child, index) => {
	        if (!child) {
	            return null
	        }
	        const { style, clsPrefix, value, children } = child?.props;
	        let mergeStyle = style || {};
	        const menuKey = value as string;
	        const menuContent = children as string;
	        const optionType = clsPrefix === `${prefix}-radio-button` ? 'button' : '';
	        return this.renderContentFromCount({ spaceStyle, menuKey, menuContent, style: mergeStyle, arrayLength: childsNum, optionType, option: child, index, isOption: false, menuItem })
	    })
	}
	render() {
	    const { Component, children, clsPrefix, className, disabled, readOnly, antd, options, optionType, spaceSize, maxCount, ...others } = this.props;

	    let spaceCls;
	    let spaceStyle: CSSProperties = {};
	    if (spaceSize) {
	        if (typeof spaceSize === 'string' && Object.keys(sizeMap).includes(spaceSize)) {
	            spaceCls = `${clsPrefix}-space-${setComponentSize(spaceSize, {})}`
	        } else {
	            const spaceNum = typeof spaceSize === 'number' ? spaceSize : spaceSize?.endsWith?.('px') ? parseInt(spaceSize) : 0;
	            spaceStyle = !isNaN(spaceNum) && spaceNum ? { marginRight: `${spaceNum}px` } : {}
	        }

	    }
	    let radioChilds: ReactNode = null;
	    let dropDownChild: ReactNode = null;
	    const { dropDrownProps } = this.props;
	    const menuItem: MenuItem[] & any[] = [];
	    if (options?.length) {
	        radioChilds = this.renderOptions(options, { spaceStyle, menuItem })
	    } else {
	        radioChilds = this.renderChilds(children as ReactElement<RadioProps>, { spaceStyle, menuItem })
	    }
	    // dropdown 内容
	    if (menuItem.length) {
	        const menu = <Menu selectedKeys={[]} onSelect={this.selectDropItem}>{menuItem}</Menu>
	        dropDownChild =
				<Dropdown {...dropDrownProps} overlay={menu}>
				    <Button size={!this.props.size || this.props.size === 'default' ? 'sm' : this.props.size} icon='uf-anglearrowdown'></Button>
				</Dropdown>
	    }
	    const classNames = classnames(clsPrefix, className, spaceCls)
	    return (
	        <Component className={classNames} {...omit(others, ['onChange', 'selectedValue', 'onClick'])} focusValue={this.state.focusValue} ref={(ref: HTMLElement) => this.radioGroup = ref}>
	            {
	                radioChilds
	            }
	            {
	                maxCount ? dropDownChild : null
	            }
	        </Component>
	    );
	}
}

// RadioGroup.childContextTypes = childContextTypes;
// RadioGroup.propTypes = propTypes;
export default RadioGroup as React.ComponentClass<Partial<RadioGroupProps>>;

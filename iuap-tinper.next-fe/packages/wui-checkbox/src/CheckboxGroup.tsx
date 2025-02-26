import React, { ReactElement } from 'react';
import {WebUI, getNid, prefix} from "../../wui-core/src/index";
import Checkbox from './Checkbox';
import CheckboxButton from './CheckboxButton';
import { MenuProps } from '../../wui-menu/src/iMenu';
import Dropdown from '../../wui-dropdown/src';
import Menu from '../../wui-menu/src';
import Button from '../../wui-button/src';
import shallowequal from 'shallowequal';
import { CheckboxGroupState, CheckboxGroupProps, CheckboxValueType, CheckboxOtherGroups } from './iCheckbox.js';
import { OrNull } from '../../wui-core/src/utils/type';
const { Item } = Menu;
// const propTypes = {
//     clsPrefix: PropTypes.string,
//     className: PropTypes.string,
//     value: PropTypes.array,
//     onChange: PropTypes.func,
//     disabled: PropTypes.bool,
//     readOnly: PropTypes.bool,
//     options: PropTypes.array,
//     defaultValue: PropTypes.array,
//     name: PropTypes.string
// };

const defaultProps = {
    className: '',
    // value: [],
    defaultValue: [],
    onChange: () => {
    },
    disabled: false,
    options: [],
    name: '',
    readOnly: false,
    Component: 'div'
};
const checkboxPrefix = `${prefix}-checkbox`;
@WebUI({name: "checkbox-group", defaultProps})
class CheckboxGroup extends React.Component<CheckboxGroupProps, CheckboxGroupState> {
	parentResizeObserver: OrNull<ResizeObserver> = null;
	dobounceFillSpaceFun: (() => void | undefined) | undefined | null;
	checkboxGroup: HTMLElement | null = null;
	constructor(props: CheckboxGroupProps) {
	    super(props);
	    this.state = {
	        values: props.value?.length ? props.value
	            : props.defaultValue?.length ? props.defaultValue : [],
	        maxCount: -1
	    }
	}
	getChildrenCheckbox = (children: ReactElement, value: CheckboxValueType[]): string[] => {
	    if (!children) {
	        return []
	    }
	    let values: string[] = []
	    React.Children.forEach((children as ReactElement), child => {
	        if (child?.props?.clsPrefix === checkboxPrefix) {
	            // this.state.values?.forEach(v => {
	            //     if (v === child?.props.value) {
	            //         values.push(v as string)
	            //     }
	            // })
	            (value || []).forEach(v => {
	                if (v === child?.props.value) {
	                    values.push(v as string)
	                }
	            })
	        } else {
	            values = values.concat(this.getChildrenCheckbox(child?.props?.children, value))
	        }
	    })
	    return values

	}

	componentDidMount(): void {
	    if (this.props.maxCount) {
	        this.dobounceFillSpaceFun = this.throttle(() => this.setInnerMaxCount(), 200, true)
	        let parent = this.checkboxGroup!.parentNode;
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
	            });
	            this.parentResizeObserver.observe(parent as Element)
	        }
	    }
	}

	UNSAFE_componentWillReceiveProps(nextProps: CheckboxGroupProps) {
	    // if (nextProps.value && !isEqual(nextProps.value, this.state.values)) {
	    if (nextProps.value && !shallowequal(nextProps.value, this.props.value)) {
	        return this.setState({
	            values: nextProps.value
	        })
	    }
	    if (nextProps.children && !shallowequal(nextProps.children, this.props.children)) {
	        // 处理children 中包含其他 元素（旧用法）
	        const values: CheckboxGroupState['values'] = this.getChildrenCheckbox(nextProps.children as ReactElement, nextProps.value as CheckboxValueType[]);
	        this.setState({
	            values: values
	        })
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
	    let parent = this.checkboxGroup!.parentElement;
	    if (parent && parent.nodeName.toUpperCase() === 'FORM') {
	        parent = parent.parentNode as HTMLElement;
	    }
	    const parentWith = parent?.clientWidth;
	    const childNodes = this.checkboxGroup!.childNodes as any;
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

	getOptions() {
	    const {options} = this.props;
	    return (options).map(option => {
	        if (typeof option === 'string') {
	            return {
	                label: option,
	                value: option,
	            }
	        }
	        return option;
	    });
	}

	modifyChildren(data: React.ReactElement[]) {
	    let {disabled, readOnly, maxCount: propsMaxCount, size, dropDrownProps, clsPrefix: groupClsPrefix, optionType = 'default'} = this.props;
		let { maxCount } = this.state;
	    if (data && !Array.isArray(data)) {
	        data = [data]
	    }
		let checkboxData = propsMaxCount && optionType === 'button' && maxCount > -1 ? data.slice(0, maxCount) : data;
		let dropdownData = propsMaxCount && optionType === 'button' && maxCount > -1 ? data.slice(maxCount) : [];
		let dropDrownContent = null;
		for (let i = 0; i < checkboxData.length; i++) {
	        let children = checkboxData[i].props?.children // 可能是数组，可能是单个对象，可能是字符串
	        if (checkboxData[i].props?.clsPrefix === (Checkbox.defaultProps as any).clsPrefix || checkboxData[i].props?.clsPrefix === (CheckboxButton.defaultProps as any).clsPrefix) { // 如果是checkbox // TODO: ts define type
	            checkboxData[i] = React.cloneElement(checkboxData[i],
	                {
	                    onChange: () => {
	                        this.changeHandle(checkboxData[i].props.value)
	                    },
	                    checked: (this.state.values as CheckboxValueType[]).includes(checkboxData[i].props.value),
	                    disabled: checkboxData[i].props.disabled || disabled,
	                    readOnly: readOnly // 只用CheckboxGroup的readOnly
	                }
	            )
	        } else if (Array.isArray(children) || typeof children === 'object') { // 如果是子组件的集合或者单个的子组件
	            checkboxData[i] = {
	                ...checkboxData[i],
	                props: {
	                    ...checkboxData[i].props,
	                    children: this.modifyChildren(children)
	                }
	            }
	        }
	    }
	    if (dropdownData.length) {
	        let menuItems: React.ReactElement[] = [];
	        React.Children.map(dropdownData, (child, _index) => {
	            if (!child) {
	                return null
	            }
	            const { value, children, disabled, readOnly } = child?.props;
	            const menuKey = value as string;
	            const menuContent = children as string;
	            let _disabled = disabled || readOnly;
	            menuItems.push(<Item key={menuKey as string} disabled={_disabled}>{menuContent}</Item>)
	        })
	        const _size = !size || size === 'default' ? 'md' : size
	        const menu = <Menu selectedKeys={this.state.values as string[] || []} onSelect={this.selectDropItem} onDeselect={this.deSelectDropItem} multiple>{menuItems}</Menu>
	        dropDrownContent =
				<Dropdown {...dropDrownProps} overlay={menu} className={`${groupClsPrefix}-dropdown ${groupClsPrefix}-dropdown-${_size}`}>
				    <Button size={_size as any} icon='uf-anglearrowdown'></Button>
				</Dropdown>
	    }
	    let mergeData = dropDrownContent ? [...checkboxData, dropDrownContent] : checkboxData;
	    return mergeData
	}

	setInnerValue = (values: CheckboxValueType[]) => {
	    if (!('value' in this.props)) {
	        this.setState({
	            values
	        })
	    }
	    const {onChange} = this.props;
	    if (onChange) {
	        const options = this.getOptions();
	        onChange(
	            values
	                .filter(val => values.indexOf(val) !== -1)
	                .sort((a, b) => {
	                    const indexA = options.findIndex(opt => opt.value === a);
	                    const indexB = options.findIndex(opt => opt.value === b);
	                    return indexA - indexB;
	                }),
	        );
	    }
	}

	changeHandle = (v: CheckboxValueType) => {
	    let values = [...this.state.values as CheckboxValueType[]];
	    if (values.indexOf(v) != -1) {
	        values.splice(values.indexOf(v), 1)
	    } else {
	        values.push(v)
	    }
	    this.setInnerValue(values)
	}


	deSelectDropItem: MenuProps['onSelect'] = ({selectedKeys}) => {
	    this.setInnerValue(selectedKeys)
	}

	selectDropItem: MenuProps['onSelect'] = ({selectedKeys}) => {
	    this.setInnerValue(selectedKeys)
	}

	render() {
	    let state = this.state;
	    let props = this.props;
	    let {clsPrefix, className, children, options, name, readOnly, fieldid, optionType = 'default', size, Component} = props;
	    const otherProps: CheckboxOtherGroups = {}
	    if (name) {
	        otherProps.name = name
	    }
	    if (size) {
	        otherProps.size = size
	    }
	    let classes = clsPrefix;
	    if (className) classes += ' ' + className;
	    if (options && options.length > 0) {
			if (optionType === 'button') {
				children = this.getOptions().map((option, index) => (
					<CheckboxButton
						key={(option.value as CheckboxValueType).toString()}
						disabled={'disabled' in option ? option.disabled : props.disabled}
						readOnly={readOnly}
						value={option.value}
						checked={(state.values as CheckboxValueType[]).indexOf((option.value || '')) !== -1}
						onChange={option.onChange}
						optionType={'button'}
						fieldid={fieldid ? `${fieldid}-${option.label}-${index}` : undefined}
						{...otherProps}
					>
						{option.label}
					</CheckboxButton>
				));
			} else {
				children = this.getOptions().map((option, index) => (
					<Checkbox
						key={(option.value as CheckboxValueType).toString()}
						disabled={'disabled' in option ? option.disabled : props.disabled}
						readOnly={readOnly}
						value={option.value}
						optionType={optionType}
						checked={(state.values as CheckboxValueType[]).indexOf((option.value || '')) !== -1}
						onChange={option.onChange}
						fieldid={fieldid ? `${fieldid}-${option.label}-${index}` : undefined}
						{...otherProps}
					>
						{option.label}
					</Checkbox>
				));
			}
	    }
	    const originalChildren: React.ReactElement[] = React.Children.toArray(children) as React.ReactElement[]
	    let adapterNid = getNid(props)
	    return (
	        <Component className={classes} {...otherProps} {...adapterNid} ref={(ref: HTMLElement) => this.checkboxGroup = ref}>
	            {this.modifyChildren(originalChildren)}
	        </Component>
	    );
	}
}

// CheckboxGroup.propTypes = propTypes;

export default CheckboxGroup as React.ComponentClass<Partial<CheckboxGroupProps>>;

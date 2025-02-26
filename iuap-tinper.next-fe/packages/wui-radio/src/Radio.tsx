import classnames from 'classnames';
import omit from 'omit.js';
import PropTypes from 'prop-types';
import React from 'react';
import {getNid, WebUI} from "../../wui-core/src/index"
import {setComponentSize} from "../../wui-core/src/componentStyle"
import { RadioProps, RadioState, RadioContext, OptionalProps, RadioGroupProps, RadioValue } from './iRadio'

const noop = () => {}

// const propTypes = {
//     /**
// 	 * radio 颜色 样式
// 	 */
//     color: PropTypes.oneOf(['', 'dark', 'success', 'info', 'warning', 'danger', 'primary']),
//     /**
// 	 * radio 大小
// 	 */
//     size: PropTypes.oneOf(['lg', 'sm', 'small', 'large', 'default']),
//     /**
// 	 * radio 是否可用
// 	 */
//     disabled: PropTypes.bool,
// 	    /**
// 	 * radio 是否只读
// 	 */
//     readOnly: PropTypes.bool,
//     /**
// 	 * radio 样式 是否使用红色填充
// 	 */
//     inverse: PropTypes.bool,
//     /**
// 	 * radio 指定当前是否选中
// 	 */
//     checked: PropTypes.bool,
//     /**
// 	 * radio 初始是否选中
// 	 */
//     defaultChecked: PropTypes.bool,
//     onChange: PropTypes.func,

//     /**
// 	 * 是否兼容ant design模式
// 	 */
//     antd: PropTypes.bool,
//     style: PropTypes.object,
//     value: PropTypes.any,
//     fieldid: PropTypes.string
// };

// const sizeMap = {
//     lg: 'lg',
//     sm: 'sm',
//     md: 'md',
//     small: 'sm',
//     default: 'sm',
//     large: 'lg'
// }

const defaultProps = {
    inverse: false,
    disabled: false,
    readOnly: false,
    antd: false,
    size: 'default',
    color: '',
    onChange: noop,
    defaultChecked: false,
    style: {},
    value: '',
    fieldid: ''
};

/**
 * 建立与Radio.Group通信
 */
const contextTypes = {
    radioGroup: PropTypes.object
}

@WebUI({name: "radio", defaultProps})
class Radio extends React.Component<RadioProps, RadioState> {
	static defaultProps = {...defaultProps}
	static contextTypes = contextTypes;
    context!: RadioContext<RadioGroupProps>;
    constructor(props: RadioProps, context: RadioContext<RadioGroupProps>) {
	    super(props, context);
	    let initChecked = typeof props.checked !== 'undefined' ? props.checked : props.defaultChecked;
	    this.state = {
	        checked: !!initChecked,
	        focused: false,
	        hovered: false
	    }
    }

    UNSAFE_componentWillReceiveProps(nextProps: RadioProps) {
	    if ('checked' in nextProps) {
	        this.setState({
	            checked: !!nextProps.checked
	        })
	    }
    }

	handleClick = (event: any) => { // TODO: ts define type
	    if (event?.target?.tagName !== "INPUT") { // 不可用的radio或者radio中的链接被点击时，不触发点击事件
	        event.stopPropagation() // 点击 触发了两次 其中点击input  阻止
	        return;
	    }
	    const {antd} = this.props
	    if (this.context.radioGroup && this.context.radioGroup.onChange) {
	        let val = this.props.value as RadioValue;
	        if (antd) { // 如果是antd用法的话，target返回与ant-design类似的属性结构的对象，不返回dom对象，能给取得正确的value值。
	            const targetDom = event.target
	            event.target = {
	                targetDom, // input对象
	                ...this.props
	            }
	            val = event
	        }
	        this.context.radioGroup.onChange(val, event);
	    } else {
	        if (!('checked' in this.props)) {
	            this.setState({
	                checked: !this.state.checked
	            })
	        }
	        event.target.checked = !this.state.checked;
	        this.props.onChange?.(event, !this.state.checked)
	    }
	}

	changeInputHovered = (event: React.MouseEvent<HTMLInputElement>, hovered: boolean) => {
	    if (event.target && (event.target as HTMLInputElement).type === 'radio') {
	        this.setState({
	            hovered
	        })
	    }
	}

	handleFocus = (event: React.FocusEvent<HTMLInputElement>, focused: boolean) => {
	    if (event.target && event.target.type === 'radio') {
	        this.setState({
	            focused
	        });
	    }
	}

	render() {
	    const {state, props, context} = this;
	    let {checked} = state;
	    /**
		 * 自身的属性
		 */
	    const {
	        inverse,
	        disabled,
	        readOnly,
	        color,
	        className,
	        children,
	        clsPrefix,
	        style,
	        fieldid,
	        ...others
	    } = props;
	    const {radioGroup} = context;
	    const radioProps = {...others};
	    const isNoEventHandler = disabled || readOnly // 这两个状态的checkbox没有事件处理
	    // 包裹 radioGroup
	    if (radioGroup) {
	        radioProps.name = radioGroup.name;
	        radioProps.selectedValue = radioGroup.selectedValue;
	        radioProps.size = radioGroup.size;
	        radioProps.focusValue = radioGroup.focusValue;
	    }
	    const {name, selectedValue, size, focusValue} = radioProps;

	    let optional: OptionalProps = {};
	    /**
		 * 若父级selectedValue与本身的value值相同，则改radio被选中
		 */
	    if (selectedValue !== undefined) {
	        optional.checked = (this.props.value === selectedValue);
	    }

	    let classes = {
	        [`${clsPrefix}-read-only`]: readOnly,
	        [`${clsPrefix}-focused`]: this.state.focused,
	        [`${clsPrefix}-hovered`]: this.state.hovered,
	        'is-checked': typeof optional.checked !== 'undefined' ? optional.checked : checked, // 没有父组件的话就用自己的state
	        disabled
	    };

	    if (color) {
	        classes[`${clsPrefix}-${color}`] = true;
	    }
	    if (size && setComponentSize(size)) {
	        classes[`${clsPrefix}-${setComponentSize(size) === 'default' ? 'sm' : setComponentSize(size)}`] = true;
	    }
	    if (inverse) {
	        classes[`${clsPrefix}-inverse`] = true;
	    }
	    if (!children || (typeof children === 'string' && children.trim() === '')) {
	        classes[`${clsPrefix}-no-content`] = true;
	    }
	    // if (children == null) {
	    //   classes[`${clsPrefix}-noContent`] = true;
	    // }
	    let classNames = classnames(clsPrefix, classes);
	    let tabIndex = optional.checked ? 0 : -1;
	    if (focusValue && focusValue == this.props.value) {
	        tabIndex = 0;
	    }
	    const mouseEnterHandler = isNoEventHandler ? noop : (event: React.MouseEvent<HTMLInputElement>) => this.changeInputHovered(event, true);
	    const mouseLeaveHandler = isNoEventHandler ? noop : (event: React.MouseEvent<HTMLInputElement>) => this.changeInputHovered(event, false);
	    const focusHandler = isNoEventHandler ? noop : (event: React.FocusEvent<HTMLInputElement>)=> this.handleFocus(event, true);
	    const blurHandler = isNoEventHandler ? noop : (event: React.FocusEvent<HTMLInputElement>) => this.handleFocus(event, false);
	    const inputFieldidProp = fieldid ? { fieldid: `${fieldid}_radio` } : {}
	    const readOnlyProp = readOnly ? { readonly: "readonly" } : {}
	    const valueProp = typeof radioProps.value === 'boolean' ? String(radioProps.value) : radioProps.value // input的value不接收bool值
	    const input = (
	        <input
	            // @ts-ignore
	            {...omit(radioProps, ["antd", "selectedValue", "checked", "value", "size", "onChange", "date-for-wui-tooltip"])} // size不会传到input上，onChange不在input上直接触发，所以忽略、当使用tooltip包裹radio时data-for-wui-tootip属性不应传到input上
	            type="radio"
	            name={name}
	            disabled={this.props.disabled}
	            tabIndex={tabIndex}
	            onFocus={focusHandler}
	            onBlur={blurHandler}
	            onMouseEnter={mouseEnterHandler}
	            onMouseLeave={mouseLeaveHandler}
	            {...inputFieldidProp}
	            {...readOnlyProp}
	            value={valueProp}
	        />
	    );
	    let adapterNid = getNid(this.props) // 适配nid、uitype
	    const fieldidProp = fieldid ? { fieldid } : {}
	    return (
	    // @ts-ignore
	        <label style={style} onClick={isNoEventHandler ? noop : this.handleClick} {...fieldidProp}
				   className={classnames(className, classNames)} {...adapterNid} {...omit(radioProps, ["antd", "selectedValue", "checked", "value", "size", "onChange", "name", "focusValue"])}>
	            {input}
	            <span className={clsPrefix + '-label'}>{children ||
					<span className={clsPrefix + '-inner-no-content'}/>}</span>
	        </label>
	    );

	}
}

// Radio.contextTypes = contextTypes;
// Radio.propTypes = propTypes;

export default Radio;

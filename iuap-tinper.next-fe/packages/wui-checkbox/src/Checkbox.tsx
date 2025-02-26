import classnames from 'classnames';
import omit from "omit.js";
// import PropTypes from 'prop-types';
import React from 'react';
import {WebUI, getNid} from "../../wui-core/src/index";
import {WithConfigConsumer} from "../../wui-provider/src/context";
import CheckboxGroup from './CheckboxGroup';
import { CheckboxState, CheckboxProps } from './iCheckbox.js';
import Icon from "../../wui-icon/src/Icon";

// const propTypes = {
//     colors: PropTypes.oneOf(['', 'dark', 'success', 'info', 'warning', 'danger', 'primary']),
//     className: PropTypes.string,
//     disabled: PropTypes.bool,
//     readOnly: PropTypes.bool,
//     checked: PropTypes.bool,
//     inverse: PropTypes.bool,
//     onClick: PropTypes.func,
//     onDoubleClick: PropTypes.func,
//     onChange: PropTypes.func,
//     antd: PropTypes.bool,
//     defaultChecked: PropTypes.bool,
//     value: PropTypes.string,
//     style: PropTypes.object,
//     indeterminate: PropTypes.bool,
//     size: PropTypes.string,
//     fieldid: PropTypes.string,
//     title: PropTypes.string // title作为html属性，不用显示在文档里
// };

const noop = () => {}

const defaultProps = {
    className: '',
    disabled: false,
    inverse: false,
    colors: 'primary',
    checked: undefined,
    defaultChecked: false,
    onClick: () => {
    },
    onDoubleClick: null,
    onChange: () => {
    },
    style: {},
    antd: false,
    value: '',
    indeterminate: false,
    fieldid: '',
    title: '',
    readOnly: false
};

@WithConfigConsumer()
@WebUI({name: "checkbox", defaultProps})
class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
	static defaultProps = {...defaultProps};
	static Group = CheckboxGroup
	private doubleClickFlag: ReturnType<typeof setTimeout> | null

	constructor(props: CheckboxProps) {
	    super(props);
	    const checked = props.checked ?? props.defaultChecked
	    this.state = {
	        checked: !!checked,
	        focused: false,
	        hovered: false
	    }
	    this.doubleClickFlag = null;
	}

	UNSAFE_componentWillReceiveProps(nextProps: CheckboxProps) {
	    if ('checked' in nextProps && typeof nextProps.checked === 'boolean') {
	        this.setState({
	            checked: !!nextProps.checked,
	        });
	    }
	}

	changeState = (e: any) => { // TODO: ts: define type
	    if (e?.target?.tagName !== 'INPUT') {
	        e.stopPropagation();
	        return false;
	    }
	    const {props} = this;
	    const {checked} = this.state;
	    this.doubleClickFlag && clearTimeout(this.doubleClickFlag);
	    /* if(props.onClick instanceof Function){
			props.onClick(e);
		}*/
	    if (props.onDoubleClick instanceof Function) {
	        this.doubleClickFlag = setTimeout(() => {
	            // do function在此处写单击事件要执行的代码
	            this.change(props, checked, e)
	        }, 300);
	    } else {
	        this.change(props, checked, e)
	    }
	    if (!props.antd) { // antd的点击事件的事件冒泡是放开的
	        e.stopPropagation();
	    }
	    // e.preventDefault();
	    // 执行延时
	}

	change = (props: CheckboxProps, checked = false, event: any) => { // TODO: ts: define type
	    if (!('checked' in props) || props.checked === undefined) {
	        this.setState({
	            checked: !checked,
	        });
	    }

	    if (props.onChange instanceof Function) {
	        if (props.antd) {
	            event.target.checked = !checked;
	            props.onChange(event, !checked)
	        } else {
	            props.onChange(!checked, event)
	        }
	    }

	    if (props.onClick instanceof Function) {
	        event.target.checked = !checked;
	        props.onClick(event)
	    }
	}

	handledbClick = (e: React.MouseEvent<HTMLElement>) => {
	    const {onDoubleClick} = this.props;
	    this.doubleClickFlag && clearTimeout(this.doubleClickFlag);
	    onDoubleClick && onDoubleClick(this.state.checked, e);
	}

	changeInputHovered = (event: React.MouseEvent<HTMLInputElement>, hovered: boolean) => {
	    if (event.target && (event.target as HTMLInputElement).type === 'checkbox') {
	        this.setState({
	            hovered
	        })
	    }
	}

	handleFocus = (event: React.FocusEvent<HTMLInputElement>, focused: boolean) => {
	    if (event.target && event.target.type === 'checkbox') {
	        this.setState({
	            focused
	        });
	    }
	}

	render() {
	    const {
	        disabled,
	        readOnly,
	        inverse,
	        colors,
	        className,
	        indeterminate,
	        children,
	        checked,
	        clsPrefix,
	        style,
	        fieldid,
	        title,
	        value,
	        optionType,
	        // nid,
	        // uitype,
	        ...others
	    } = this.props;
	    const isNoEventHandler = disabled || readOnly // 这两个状态的checkbox没有事件处理
	    const mouseEnterHandler = isNoEventHandler ? noop : (event: React.MouseEvent<HTMLInputElement>) => this.changeInputHovered(event, true);
	    const mouseLeaveHandler = isNoEventHandler ? noop : (event: React.MouseEvent<HTMLInputElement>) => this.changeInputHovered(event, false);
	    const focusHandler = isNoEventHandler ? noop : (event: React.FocusEvent<HTMLInputElement>) => this.handleFocus(event, true);
	    const blurHandler = isNoEventHandler ? noop : (event: React.FocusEvent<HTMLInputElement>) => this.handleFocus(event, false);
	    const inputFieldidProp = fieldid ? { fieldid: `${fieldid}_checkbox` } : {}
	    let valueProp = typeof value === 'boolean' ? String(value) : value // input的value不接收bool值
	    // const optionType = clsPrefix === `${prefix}-radio-button` ? 'button' : '';
	    const input = (
	        <input
	            {...omit(others, ["antd", "onClick", "onDoubleClick", "onChange", "size"])}
	            type="checkbox"
	            disabled={this.props.disabled}
	            onFocus={focusHandler}
	            onBlur={blurHandler}
	            onMouseEnter={mouseEnterHandler}
	            onMouseLeave={mouseLeaveHandler}
	            readOnly={readOnly}
	            value={valueProp}
	            {...inputFieldidProp}
	        />
	    );

	    const buttonCheck = optionType === 'button' && this.state.checked ? (
	        <span className={`${clsPrefix}-checked`}>
	            <Icon type="uf-xuanzhong" />
	        </span>
	    ) : null;

	    let classes = {
	        [`${clsPrefix}-focused`]: this.state.focused,
	        [`${clsPrefix}-hovered`]: this.state.hovered,
	        'is-checked': this.state.checked,
	        disabled,
	        [`${clsPrefix}-read-only`]: readOnly,
	    };

	    if (inverse) {
	        classes[`${clsPrefix}-inverse`] = true;
	    }

	    if (colors) {
	        classes[`${clsPrefix}-${colors}`] = true;
	    }

	    if (!checked && indeterminate) {
	        classes[`${clsPrefix}-indeterminate`] = true;
	    }

	    if (this.props.size && this.props.size !== 'default') {
	        classes[`${clsPrefix}-${this.props.size}`] = true;
	    }

	    let classNames = classnames(clsPrefix, classes);
	    const fieldidProp = fieldid ? { fieldid } : {}
	    const titleProp = title ? { title } : {} // 如果传了title属性，渲染到文字上
	    let adapterNid = getNid(this.props)
	    return (
	        <label
	            className={classnames(classNames, className)}
	            onDoubleClick={isNoEventHandler ? noop : this.handledbClick}
	            style={style}
	            // uitype={uitype}
	            // nid={nid}
	            onClick={isNoEventHandler ? noop : this.changeState}
	            {...fieldidProp}
	            {...adapterNid}
	        >
	            {input}
	            <span className={clsPrefix + '-label'} {...titleProp}>{children}</span>
	            {buttonCheck}
	        </label>
	    );
	}
}

// Checkbox.propTypes = propTypes;
export default Checkbox;

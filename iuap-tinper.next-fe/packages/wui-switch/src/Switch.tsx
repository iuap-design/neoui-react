/**
 * This source code is quoted from rc-switch.
 * homepage: https://github.com/react-component/switch
 */
import classnames from "classnames";
// import PropTypes from "prop-types";
import React, {Component} from "react";
import omit from 'omit.js';
// import {Icon} from "../../index";
import Icon from '../../wui-icon/src';
import {WebUI, getNid} from "../../wui-core/src/index"
import {setComponentSize} from "../../wui-core/src/componentStyle"
import {SwitchProps, SwitchState, SwitchEvent} from './iSwitch'
import {WithConfigConsumer} from "../../wui-provider/src/context";

function noop() {}

/* const propTypes = {
    clsPrefix: PropTypes.string,
    colors: PropTypes.string,
    disabled: PropTypes.bool,
    checkedChildren: PropTypes.any,
    unCheckedChildren: PropTypes.any,
    onChangeHandler: PropTypes.func,z
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    enterKeyDown: PropTypes.bool, // 是否启用 enter 和 space 键
    loading: PropTypes.bool,
    autoFocus: PropTypes.bool,
    defaultValue: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    checked: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'lg', 'small', 'default']),
    fieldid: PropTypes.string
};*/
const defaultProps = {
    checkedChildren: null,
    unCheckedChildren: null,
    // checked: false,
    defaultChecked: false,
    size: "sm",
    disabled: false,
    onChangeHandler: noop,
    onChange: noop,
    onClick: noop,
    onKeyDown: noop,
    onMouseUp: noop,
    enterKeyDown: true,
    loading: false,
    colors: '',
    autoFocus: false,
    fieldid: undefined
};
// const sizeMap = {
//     sm: 'sm',
//     lg: 'lg',
//     small: '',
//     default: 'sm',
// }
@WithConfigConsumer()
@WebUI({name: "switch", defaultProps})
class Switch extends Component<SwitchProps, SwitchState> {
    constructor(props: SwitchProps) {
        super(props);
        let checked = false;
        if ('checked' in props) {
            checked = !!props.checked;
        } else if ('defaultValue' in props) {
            checked = !!props.defaultValue;
        } else {
            checked = !!props.defaultChecked;
        }
        this.state = {checked};
    }

    node: HTMLButtonElement | undefined;

    static getDerivedStateFromProps(nextProps: SwitchProps) {
        let newState: SwitchState = {}
        if ("checked" in nextProps) {
            // return{ checked: !!nextProps.checked };
            newState.checked = !!nextProps.checked;
        }
        return newState
    }

	setChecked = (checked: boolean, e: SwitchEvent) => {
	    if (this.props.disabled || this.props.loading) {
	        return;
	    }
	    if (!('checked' in this.props)) {
	        this.setState({
	            checked,
	        });
	    }
	    this.props.onChangeHandler?.(checked);
	    this.props.onChange?.(checked, e);
	}
	// 点击switch改变状态
	clickHandler = (e: SwitchEvent) => {
	    if (this.props.disabled || this.props.loading) {
	        return;
	    }
	    // 屏蔽button原生支持的enter/space触发的点击事件 isTrusted不阻止模拟点击事件 #QDJCJS-9229
	    if (e.type === 'click') {
	        const {x, y, isTrusted} = e.nativeEvent as MouseEvent;
	        if (x === 0 && y === 0 && !this.props.enterKeyDown && isTrusted) {
	            return;
	        }
	    }
	    const checked = !this.state.checked;
	    this.setChecked(checked, e);
	    this.props.onClick && this.props.onClick(checked, e) // 支持onClick事件
	};
	handleKeyDown = (e: React.KeyboardEvent, enterKeyDown?: boolean) => {
	    if (e.keyCode === 37) { // Left
	        this.setChecked(false, e);
	    } else if (e.keyCode === 39) { // Right
	        this.setChecked(true, e);
	    } else if (e.keyCode === 32 || e.keyCode === 13) { // Space, Enter
	        if (enterKeyDown) {
	            e.preventDefault(); // 阻止Space, Enter默认触发点击事件
	            this.clickHandler(e);
	        }
	    }
	    this.props.onKeyDown?.(e)
	}
	// Handle auto focus when click switch in Chrome
	handleMouseUp = (e: React.MouseEvent) => {
	    if (this.node) {
	        this.node.blur();
	    }
	    if (this.props.onMouseUp) {
	        this.props.onMouseUp(e);
	    }
	}
	saveNode = (node: HTMLButtonElement) => {
	    this.node = node;
	}
	focus = () => {
	    if (this.node) {
	        this.node.focus();
	    }
	}
	blur = () => {
	    if (this.node) {
	        this.node.blur();
	    }
	}

	render() {
	    const {
	        checkedChildren,
	        unCheckedChildren,
	        // onChangeHandler,
	        size,
	        className,
	        clsPrefix,
	        disabled,
	        loading,
	        colors,
	        enterKeyDown,
	        ...others
	    } = this.props;
	    // 获取checked
	    const checked = this.state.checked;
	    let classes = {
	        "is-checked": checked,
	        [`${clsPrefix}-${setComponentSize(size) === 'default' ? 'sm' : size === 'small' ? '' : setComponentSize(size)}`]: setComponentSize(size),
	        // [`${clsPrefix}-${sizeMap[size!]}`]: sizeMap[size!],
	        [`${clsPrefix}-${colors}`]: colors,
	        [`${clsPrefix}-disabled`]: disabled || loading,
	        [`${clsPrefix}-loading`]: loading,
	        [`${clsPrefix}-span`]: true // 类名没用到，暂时保留
	    };
	    /* if (sizeMap[size]) {
		  classes[`${clsPrefix}-${sizeMap[size]}`] = true;
		}
		if (colors) {
		  classes[`${clsPrefix}-${colors}`] = true;
		}
		classes[[`${clsPrefix}-disabled`]] = disabled;

		if (loading) {
		  classes[[`${clsPrefix}-loading`]] = loading;
		  classes[[`${clsPrefix}-disabled`]] = loading;
		}*/

	    let classNames = classnames(clsPrefix, classes);
	    const loadingProps: Pick<SwitchProps, 'id' | 'fieldid'> = {};
	    if (this.props.id) {
	        loadingProps.id = `${this.props.id}_loading_switch`;
	    }
	    if (this.props.fieldid) {
	        loadingProps.fieldid = `${this.props.fieldid}_loading_switch`;
	    }
	    // 去掉span外标签，-backdrop类名去掉
	    /* return (
		  <span className={disabled && checked ? `${clsPrefix}-backdrop ${clsPrefix}-span` : `${clsPrefix}-span`}>
			<button
			  {...others}
			  ref={this.saveNode}
			  onClick={this.clickHandler}
			  onKeyDown={(e) => this.handleKeyDown(e,enterKeyDown)}
			  onMouseUp={this.handleMouseUp}
			  className={classnames(className, classNames)}
			  tabIndex={disabled ? -1 : 0}
			>
			  {loading ? <Icon type="uf-loadingstate" /> : ''}
			  <span className={`${clsPrefix}-inner`}>
				{checked ? checkedChildren : unCheckedChildren}
			  </span>
			</button>
		  </span>
		);*/
	    let adapterNid = getNid(this.props)
	    return (
	        <button
	            {...omit(others, ["onChangeHandler", "defaultValue", "onChange"])}
	            ref={this.saveNode}
	            onClick={this.clickHandler}
	            onKeyDown={(e) => this.handleKeyDown(e, enterKeyDown)}
	            onMouseUp={this.handleMouseUp}
	            className={classnames(className, classNames)}
	            tabIndex={disabled ? -1 : 0}
	            {...adapterNid}
	        >
	            {loading ? <Icon {...loadingProps} type="uf-loadingstate"/> : ''}
	            <span className={`${clsPrefix}-inner`}>
	                {checked ? checkedChildren : unCheckedChildren}
	            </span>
	        </button>
	    );
	}
}

// Switch.propTypes = propTypes;
export default Switch;

import classnames from 'classnames';
import omit from 'omit.js';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {WebUI, getNid} from "../../wui-core/src/index"
import Icon from '../../wui-icon/src/index';
import {setComponentSize} from "../../wui-core/src/componentStyle"
import { TagProps, TagState } from './iTag';

// export const propTypes = {
//     /**
// 	 * @title 样式
// 	 */
//     style: PropTypes.object,

//     /**
// 	 * @title 形状
// 	 */
//     bordered: PropTypes.bool,

//     /**
// 	 * @title 类型
// 	 */
//     colors: PropTypes.string,

//     /**
// 	 * @title 是否禁用
// 	 * @veIgnore
// 	 */
//     disabled: PropTypes.bool,

//     /**
// 	 * @title 是否删除
// 	 * @veIgnore
// 	 */
//     deleted: PropTypes.bool,

//     /**
// 	 * @title 是否可以选择
// 	 * @veIgnore
// 	 */
//     select: PropTypes.bool,
//     /**
// 	 * @title 是否选中
// 	 * @veIgnore
// 	 */
//     selected: PropTypes.bool,
//     /**
// 	 * @title 标签是否显示关闭图标
// 	 * @veIgnore
// 	 */
//     visible: PropTypes.bool,

//     /**
// 	 * @title 类名
// 	 * @veIgnore
// 	 */
//     className: PropTypes.string,
//     /**
// 	 * @title 标签点击事件 已兼容onClick
// 	 * @veIgnore
// 	 */
//     tagClick: PropTypes.func,
//     /**
// 	 * @title 标签关闭回调函数
// 	 * @veIgnore
// 	 */
//     onClose: PropTypes.func,
//     /**
// 	 * @title 标签关闭自定义按钮
// 	 * @veIgnore
// 	 */
//     closeIcon: PropTypes.node,
//     /**
// 	 * @title 设置图标
// 	 * @veIgnore
// 	 */
//     icon: PropTypes.element,
//     /**
// 	 * @title 标签大小 lg&md&sm
// 	 * @veIgnore
// 	 */
//     size: PropTypes.string,
//     fieldid: PropTypes.string,
// };

const defaultProps = {
    disabled: false,
    deleted: false,
    colors: 'light',
    bordered: false,
    select: false,
    style: {},
    className: '',
    closeIcon: <Icon type='uf-close'/>,
    icon: null,
    size: 'md',
    activeColor: null,
    type: 'default',
};

const colorsMap: Record<string, string> = {
    dark: 'dark',
    light: 'light',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
    info: 'info',
    invalid: 'invalid',
    start: 'start',
    'half-blue': 'half-blue',
    'half-green': 'half-green',
    'half-dark': 'half-dark',
    'half-yellow': 'half-yellow',
    'half-red': 'half-red',
    '#6366F1': 'purple',
    '#84CC16': 'green',
    '#F97316': 'orange',
    '#EC4899': 'pink',
};

@WebUI({name: "tag", defaultProps})
class Tag extends Component<TagProps, TagState> {

	static defaultProps = {...defaultProps}

	constructor(props: TagProps) {
	    super(props);
	    this.state = {
	        selected: props.selected || false,
	        visible: props.visible ?? true
	    }
	}

	static getDerivedStateFromProps(nextProps: TagProps, state: TagState) {
	    if ('selected' in nextProps && nextProps.selected !== state.selected) {
	        return {selected: nextProps.selected}
	    }
	    if ('visible' in nextProps && nextProps.visible !== state.visible) {
	        return {visible: nextProps.visible}
	    }
	    return null;
	}

	click = (e: React.MouseEvent<HTMLSpanElement>) => {
	    this.setState({
	        selected: !this.state.selected,
	    })
	    this.props.tagClick && this.props.tagClick(e)
	}
	onDelete = (e: React.MouseEvent<HTMLSpanElement>) => {
	    if (!this.props.disabled) {
	        this.setState({visible: !this.state.visible})
	        this.props.onClose && this.props.onClose(e)
	    }
	}

	render() {
	    let {
	        colors,
	        disabled,
	        deleted,
	        select,
	        className,
	        bordered,
	        children,
	        clsPrefix,
	        closeIcon,
	        icon,
	        size,
	        fieldid,
	        activeColor,
	        type,
	        // visible,
	        // onClose,//不需要渲染到dom上
	        // tagClick,//不需要渲染到dom上
	        ...others
	    } = this.props;
	    const {selected} = this.state;
	    const isSelected = select && selected; // 是否选中态
	    let classes = classnames(
	        clsPrefix,
	        {
	            [`${clsPrefix}-${colorsMap[colors!]}`]: !!colorsMap[colors!],
	            [`${clsPrefix}-filled`]: type === 'filled',
	            [`${clsPrefix}-border`]: (typeof bordered === 'boolean' ? bordered : false) || type === 'bordered',
	            [`${clsPrefix}-select`]: select,
	            [`${clsPrefix}-selected`]: isSelected, // "选择标签"选中时，改变标签的样式，单独写了一个selected类
	            [`${clsPrefix}-delete`]: deleted,
	            [`${clsPrefix}-icon`]: !!icon,
	            [`${clsPrefix}-${setComponentSize(size)}`]: true,
	            [`${clsPrefix}-active-${colorsMap[activeColor!]}`]: isSelected && !!colorsMap[activeColor!],
	            // [`${clsPrefix}-colors`]: colors && !colorsMap[colors],
	        },
	        className,
	    );
	    let style = colors && !colorsMap[colors] ? {
	        ...others.style,
	        backgroundColor: colors,
	        color: '#fff'
	    } : {...others.style};
	    style = isSelected && activeColor && !colorsMap[activeColor] ? {
	        ...others.style,
	        backgroundColor: activeColor,
	    } : style;
	    let adapterNid = getNid(this.props)
	    return (
	        this.state.visible ? (
	            <span {...omit(others, ['visible', 'onClose', 'tagClick'])} fieldid={fieldid} style={style} className={classes}
					  disabled={disabled} onClick={this.click} {...adapterNid}>
	                {icon && <span className="icon">{icon}</span>}
	                {children}
	                {deleted && <span onClick={this.onDelete} fieldid={fieldid && `${fieldid}_close`}>{closeIcon}</span>}
	            </span>
	        ) : null
	    );
	}
}

// Tag.propTypes = propTypes;

export default Tag;

/*
 * @Author: Mr.mjc
 * @Date: 2022-06-27 19:02:37
 * @LastEditors: MJC
 * @LastEditTime: 2023-09-25 20:10:16
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/DragResizerLine.tsx
 */
// import PropTypes from "prop-types";
import React, {Component} from "react";
import {findDOMNode} from "react-dom";
import {Event} from "./lib/utils";
import { IDragResizerLineProps, IDragResizerLineState } from './iTable';

// 拖拽的尺表线
class DragResizerLine extends Component<IDragResizerLineProps, IDragResizerLineState> {
	// static propTypes = {
	//     clsPrefix: PropTypes.string,
	//     container: PropTypes.any,
	//     dataSource: PropTypes.any,
	//     onResizeEnd: PropTypes.func,
	//     onResizeCancel: PropTypes.func,
	//     onChange: PropTypes.func,
	//     visible: PropTypes.bool,
	//     left: PropTypes.number,
	//     height: PropTypes.number,
	//     defaultWidth: PropTypes.number,
	//     minWidth: PropTypes.number,
	// };
	static defaultProps = {
	    clsPrefix: '', // 样式名前缀
	    container: null, // 所属容器
	    onResizeEnd: null, // 当释放resizer时出发，接收参数当前的宽度
	    onResizeCancel: null, // 当释放resizer时在容器以外区域则触发取消回调
	    onChange: null, // 当移动resizer时出发，接收参数相对位移
	    visible: false, // 是否可见
	    left: null, // 左侧距离
	    height: null, // 高度
	    defaultWidth: null, // 当前矩阵宽度
	    minWidth: null, // 最小宽度
	    maxWidth: null, // 最大宽度
	    dataSource: null// 当前对象信息
	};

	constructor(props: IDragResizerLineProps) {
	    super(props);

	    this.state = {
	        left: props.left,
	        x: 0,
	        moveX: 0
	        // width: props.width||0
	    };
	}

	componentDidMount() {
	    this.initEvent(this.props.container);
	}

	componentWillUnmount() {
	    this.removeEvent(this.props.container);
	}

	// 初始化事件
	initEvent(container: React.ReactInstance) {
	    // console.log("AAA---Line--->initEvent",container);
	    if (container) {
	        let domElem = findDOMNode(container);
	        Event.addHandler(domElem, 'mousedown', this.handleResizerDown);
	        Event.addHandler(domElem, 'mousemove', this.handleResizerMove);
	        Event.addHandler(domElem, 'mouseup', this.handleResizerUp);
	        if (domElem !== document.body) {
	            Event.addHandler(document.body, 'mouseup', this.handleResizerCancel);
	        }
	    }
	}

	// 移除事件
	removeEvent(container: React.ReactInstance) {
	    // console.log("AAA---Line--->removeEvent",container);
	    if (container) {
	        let domElem = findDOMNode(container);
	        Event.removeHandler(domElem, 'mousedown', this.handleResizerDown);
	        Event.removeHandler(domElem, 'mousemove', this.handleResizerMove);
	        Event.removeHandler(domElem, 'mouseup', this.handleResizerUp);
	        if (domElem !== document.body) {
	            Event.removeHandler(document.body, 'mouseup', this.handleResizerCancel);
	        }
	    }
	}

	UNSAFE_componentWillReceiveProps(nextProps: IDragResizerLineProps) {
	    if ('left' in nextProps) {
	        if (nextProps.left !== this.state.left) {
	            this.setState({left: nextProps.left});
	        }
	    }
	}

	handleResizerMove = (event: React.MouseEvent<HTMLElement>) => {
	    const {visible, left, dataSource, onChange, defaultWidth, minWidth, maxWidth, dragborder} = this.props;
	    const {x, moveX} = this.state;
	    if (visible) {
	        let newmoveX = moveX + (event.clientX - x);// 计算出移动的距离，向左移动则值小于0，右右移动则值大于0
	        if (dragborder !== 'fixed') { // 原来的拖拽模式
	            if (defaultWidth && minWidth && defaultWidth + newmoveX < minWidth) {
	                newmoveX = minWidth - defaultWidth;
	            }
	        } else { // 新拖拽模式
	            if (defaultWidth && minWidth && defaultWidth + newmoveX < minWidth) {
	                newmoveX = minWidth - defaultWidth;
	            }
	            if (defaultWidth && maxWidth && defaultWidth + newmoveX > maxWidth) {
	                newmoveX = maxWidth - defaultWidth;
	            }
	        }
	        this.setState({
	            left: (left || 0) + newmoveX,
	            x: event.clientX,
	            moveX: newmoveX
	        });
	        onChange && onChange(event, moveX, dataSource);
	        Event.stopPropagation(event);
	    }
	}
	handleResizerDown = (event: React.MouseEvent<HTMLElement>) => {
	    const {visible} = this.props;
	    if (visible) {
	        this.setState({moveX: 0, x: event.clientX});
	        Event.stopPropagation(event)
	    }
	}
	handleResizerUp = (event: React.MouseEvent<HTMLElement>) => {
	    const {visible, dataSource, onResizeEnd} = this.props;
	    const {moveX} = this.state;
	    if (visible) {
	        onResizeEnd && onResizeEnd(event, moveX, dataSource);
	    }
	}
	handleResizerCancel = () => {
	    const {visible, onResizeCancel} = this.props;
	    if (visible) {
	        onResizeCancel && onResizeCancel();
	    }
	}

	start(event: React.MouseEvent<HTMLElement>) {
	    this.setState({moveX: 0, x: event.clientX});
	    Event.stopPropagation(event)
	}

	render() {
	    const {clsPrefix, height, visible} = this.props;
	    const {left} = this.state;

	    const style = {left: left, height: height, display: visible ? 'block' : 'none'};
	    return (
	        <div style={style as React.CSSProperties} className={`${clsPrefix}-drag-resizer`}>
	            <div className={`${clsPrefix}-drag-resizer-line`}></div>
	        </div>
	    );
	}
}

export default DragResizerLine;

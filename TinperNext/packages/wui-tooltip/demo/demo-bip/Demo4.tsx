/**
 * @title 提示类组件支持出现在可配置的container中
 * @description "container"可以是DOM元素/React组件/或者返回React组件的函数，注意，容器需要设置position
 */

import {Button, Tooltip} from '@tinper/next-ui';
import React, {Component} from 'react';

const style: Record<string, React.CSSProperties> = {
    box: {
        width: '500px',
        height: '200px',
        lineHeight: '100px',
        overflow: 'auto',
        border: '1px solid #ccc',
        borderRadius: '5px'
    },
    wrapper: {
        width: '900px',
        position: 'relative'
    }
}

class Demo4 extends Component {
	private container?: HTMLElement | null
	state = {
	    visible: false
	}

	handleChange = () => {
	    this.setState((prevState: {visible: boolean}) => ({
	        visible: !prevState.visible
	    }));
	}

	render() {
	    let {visible} = this.state;
	    return (
	        <div className="demo-tooltip">
	            <div className="demo-tooltip-box" style={style.box}>
	                <div className="demo-tooltip-wrapper" style={style.wrapper} ref={ref => this.container = ref}>
	                    <Button colors="primary" onClick={this.handleChange} style={{marginRight: 20}}>
	                        {visible ? "隐藏" : "显示"}tooltip
	                    </Button>
	                    <Tooltip
	                        arrowPointAtCenter
	                        trigger="click"
	                        overlay="我会跟着移动"
	                        visible={visible}
	                        container={this.container ? this.container : null}
	                        placement="right"
	                    >
	                        <Button shape="border">
								tooltip会跟随我移动
	                        </Button>
	                    </Tooltip>
	                </div>
	            </div>
	        </div>
	    );
	}
}

export default Demo4;

/**
 * @title 提示类组件支持出现在可配置的container中
 * @description "container"可以是DOM元素/React组件/或者返回React组件的函数，注意，容器需要设置定位
 */

import {Popover} from "@tinper/next-ui";
import React, {Component} from 'react';

const style: Record<string, React.CSSProperties> = {
    box: {
        width: '100%',
        height: '200px',
        lineHeight: '100px',
        overflow: 'auto',
        border: '1px solid #ccc',
        borderRadius: '5px'
    },
    wrapper: {
        width: '120%',
        position: 'relative'
    },
    text: {
        fontSize: '14px',
        cursor: 'pointer'
    }
}

class Demo3 extends Component {
	private container?: HTMLDivElement | null;

	state = {
	    show: false
	}

	content = (
		<div>
		    <p style={{padding: 0, margin: 0}}>我会跟着移动</p>
		</div>
	)

	show = () => {
	    this.setState({
	        show: true
	    })
	}

	handleVisibleChange = (visible: boolean) => {
	    console.log('onVisibleChange：', visible)
	};

	render() {
	    let {show} = this.state;

	    return (
	        <div className="demo-popover">
	            <div className="demo-popover-box" style={style.box}>
	                <div className="demo-popover-wrapper" style={style.wrapper} ref={ref => this.container = ref}>
	                    <Popover
	                        id="demo3"
	                        trigger="click"
	                        content={this.content}
	                        container={this.container ? this.container : null}
	                        show={show}
	                        onOpenChange={this.handleVisibleChange}
	                    >
	                        <span className="demo-popover-text" style={style.text}
								  onClick={this.show}>点击我，popover会跟随我移动</span>
	                    </Popover>
	                </div>
	            </div>
	        </div>
	    );
	}
}

export default Demo3;

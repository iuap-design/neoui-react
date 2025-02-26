/**
 * @title 页面级加载提示
 * @description 页面级加载提示推荐使用进度条组件
 */

import {Button, Progress} from '@tinper/next-ui';
import React, {Component} from 'react';

const ProgressBar = Progress.Bar;

class Demo0 extends Component {
	start = () => {
	    ProgressBar.start();
	}
	set = () => {
	    ProgressBar.set(0.4);
	}
	inc = () => {
	    ProgressBar.inc();
	}
	done = () => {
	    ProgressBar.done();
	}

	render() {
	    const style = {marginRight: "10px"};
	    return (
	        <div>
	            <Button style={style} onClick={this.start}>点我开始</Button>
	            <Button style={style} onClick={this.set}>设置固定位置</Button>
	            <Button style={style} onClick={this.inc}>点我加快</Button>
	            <Button onClick={this.done}>点我结束</Button>
	        </div>
	    )
	}
}

export default Demo0;

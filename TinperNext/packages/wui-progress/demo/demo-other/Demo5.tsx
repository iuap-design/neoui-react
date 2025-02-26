/**
 *
 * @title 进度圈动态展示
 * @description 会动的进度条才是好进度条。
 *
 */
import {Button, ButtonGroup, Icon, Progress} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo5 extends Component {
	state = {
	    percent: 0,
	};

	increase = () => {
	    let percent = this.state.percent + 10;
	    if (percent > 100) {
	        percent = 100;
	    }
	    this.setState({percent});
	};

	decline = () => {
	    let percent = this.state.percent - 10;
	    if (percent < 0) {
	        percent = 0;
	    }
	    this.setState({percent});
	};

	render() {
	    return (
	        <div className="demo5">
	            <Progress type="circle" percent={this.state.percent}/>
	            <ButtonGroup>
	                <Button onClick={this.decline}><Icon type="uf-minus"/></Button>
	                <Button onClick={this.increase}><Icon type="uf-plus"/></Button>
	            </ButtonGroup>
	        </div>
	    )
	}
}

export default Demo5

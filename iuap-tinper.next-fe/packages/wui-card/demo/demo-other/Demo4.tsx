/**
 *
 * @title 预加载
 * @description 数据读入前会有文本块样式
 *
 */

import {Card, Switch} from "@tinper/next-ui";
import React, {Component} from 'react';

interface DemoState{
	loading: boolean;
}

class Demo4 extends Component {
	state: DemoState = {
	    loading: true,
	};

	onChange = (checked: boolean) => {
	    this.setState({loading: !checked});
	};

	render() {
	    const {loading} = this.state;
	    return (
	        <>
	            <Switch checked={!loading} onChange={this.onChange}/>
	            <Card title="标题" style={{width: 300, marginTop: 16}} loading={loading}>
	                <h3>Card content title</h3>
	                <p>This is the description</p>
	                <p>This is the description</p>
	            </Card>
	        </>
	    )
	}
}


export default Demo4;

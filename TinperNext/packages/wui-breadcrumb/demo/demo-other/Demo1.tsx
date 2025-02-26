/**
 * @title 基础用法
 * @description Breadcrumb.Item定义子面包，`active`参数定义当前状态。
 */

import {Breadcrumb} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo1 extends Component {

	handleClick = (e: React.MouseEvent) => {
	    console.log(e.target);
	}

	render() {
	    return (
	        <Breadcrumb onClick={this.handleClick}>
	            <Breadcrumb.Item target="_blank" href="https://yondesign.yonyou.com/homepage/#/">
					Home
	            </Breadcrumb.Item>
	            <Breadcrumb.Item>
					Library
	            </Breadcrumb.Item>
	            <Breadcrumb.Item href="https://yondesign.yonyou.com/homepage/#/" active>
					Data
	            </Breadcrumb.Item>
	        </Breadcrumb>
	    )
	}
}

export default Demo1;

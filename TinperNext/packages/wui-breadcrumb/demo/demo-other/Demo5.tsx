/**
 * @title 自定义分隔符
 * @description 可使用separator定义全部和单个item 的分隔符
 */

import {Breadcrumb} from "@tinper/next-ui";
import React, {Component} from 'react';

const {Item} = Breadcrumb;

class Demo extends Component {

	handleClick = (e: React.MouseEvent) => {
	    console.log(e.target);
	}

	render() {
	    return (
	        <Breadcrumb separator=">" onClick={this.handleClick}>
	            <Item href="https://yondesign.yonyou.com/homepage/#/">
					Home
	            </Item>
	            <Item>
					Library
	            </Item>
	            <Item separator="/">
					Data
	            </Item>
	            <Item>
					Item
	            </Item>
	        </Breadcrumb>
	    )
	}
}

export default Demo;

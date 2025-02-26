/**
 *
 * @title 对齐
 * @description 设置对齐模式。
 * @type bip
 */

import {Button, Space} from "@tinper/next-ui";
import React, {Component} from "react";

class Demo1 extends Component {

    render() {
	    return (
	        <div className="space-align-container">
	            <div className="space-align-block">
	                <Space align="center">
						center
	                    <Button type="primary">Primary</Button>
	                    <span className="mock-block">Block</span>
	                </Space>
	            </div>
	            <div className="space-align-block">
	                <Space align="start">
						start
	                    <Button type="primary">Primary</Button>
	                    <span className="mock-block">Block</span>
	                </Space>
	            </div>
	            <div className="space-align-block">
	                <Space align="end">
						end
	                    <Button type="primary">Primary</Button>
	                    <span className="mock-block">Block</span>
	                </Space>
	            </div>
	            <div className="space-align-block">
	                <Space align="baseline">
						baseline
	                    <Button type="primary">Primary</Button>
	                    <span className="mock-block">Block</span>
	                </Space>
	            </div>
	        </div>
	    );
    }
}

export default Demo1;

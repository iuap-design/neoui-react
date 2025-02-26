/**
 *
 * @title 基本用法
 * @description 相邻组件水平间距。。
 * @type bip
 */

import {Button, Popconfirm, Space, Upload} from '@tinper/next-ui';
import React, {Component} from "react";

class Demo2 extends Component {

    render() {
	    return (
	        <Space>
	            <Button type="primary">Button</Button>
	            <Upload>
	                <Button>
						Click to Upload
	                </Button>
	            </Upload>
	            <Popconfirm content="Are you sure delete this task?" okText="Yes" cancelText="No">
	                <Button>Confirm</Button>
	            </Popconfirm>
	        </Space>
	    );
    }
}

export default Demo2;

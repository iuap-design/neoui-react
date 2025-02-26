/**
 *
 * @title 自定义options字段
 * @description fieldNames属性，自定义 options 中 label name children 的字段。
 * @type other
 */

import {Cascader, Col, Row, CascaderProps} from '@tinper/next-ui';
import React, {Component} from 'react';


const options = [
    {
        code: 'zhejiang',
        name: 'Zhejiang',
        items: [
            {
                code: 'hangzhou',
                name: 'Hangzhou',
                items: [
                    {
                        code: 'xihu',
                        name: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        code: 'jiangsu',
        name: 'Jiangsu',
        items: [
            {
                code: 'nanjing',
                name: 'Nanjing',
                items: [
                    {
                        code: 'zhonghuamen',
                        name: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

class Demo14 extends Component {

	onChange: CascaderProps['onChange'] = (value, selectedOptions) => {
	    console.log(value, selectedOptions);
	}

	render() {
	    return (
	        <Row>
	            <Col md={4}>
	                <div className="height-150">
	                    <Cascader
	                        options={options}
	                        onChange={this.onChange}
	                        placeholder="请选择"
	                        fieldNames={{label: 'name', value: 'code', children: 'items'}}
	                    />
	                </div>
	            </Col>
	        </Row>
	    )
	}
}

export default Demo14;

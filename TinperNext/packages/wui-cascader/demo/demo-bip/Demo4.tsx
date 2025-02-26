/**
 *
 * @title 禁用状态
 * @description 通过`disabled`参数设置是否禁用。
 *
 */

import {Cascader, Col, Row} from '@tinper/next-ui';
import React, {Component} from 'react';


const options = [{
    label: '浙江',
    value: 'zj',
    children: [{
        label: '杭州',
        value: 'hz',
        children: [{
            label: '西湖',
            value: 'xh',
            children: [{
                label: '白娘子',
                value: 'bnz'
            }, {
                label: '许仙',
                value: 'xx'
            }]
        }]
    }]
},
{
    label: '江苏',
    value: 'js',
    children: [{
        label: '南京',
        value: 'nj',
        children: [{
            label: '中华门',
            value: 'zhm'
        }]
    }]
},
{
    label: '山东',
    value: 'sd'
}
];

class Demo4 extends Component {
    render() {
        return (
            <Row>
                <Col md={4}>
                    <div className="height-150">
                        <Cascader requiredStyle disabled options={options} placeholder="请选择地址"/>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default Demo4;

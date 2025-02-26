/**
 *
 * @title 选择即改变
 * @description 设置属性 `changeOnSelect` 点任何一级都可以选择。
 *
 */

import {Cascader, Col, Row} from '@tinper/next-ui';
import React, {Component} from 'react';


const options = [{
    label: '基础组件',
    value: 'jczj',
    children: [{
        label: '导航',
        value: 'dh',
        children: [{
            label: '面包屑',
            value: 'mbx'
        }, {
            label: '分页',
            value: 'fy'
        }, {
            label: '标签',
            value: 'bq'
        }, {
            label: '菜单',
            value: 'cd'
        }]
    }, {
        label: '反馈',
        value: 'fk',
        children: [{
            label: '模态框',
            value: 'mtk'
        }, {
            label: '通知',
            value: 'tz'
        }]
    },
    {
        label: '表单',
        value: 'bd'
    }]
}, {
    label: '应用组件',
    value: 'yyzj',
    children: [{
        label: '参照',
        value: 'ref',
        children: [{
            label: '树参照',
            value: 'reftree'
        }, {
            label: '表参照',
            value: 'reftable'
        }, {
            label: '穿梭参照',
            value: 'reftransfer'
        }]
    }]
}
];

class Demo5 extends Component {
    render() {
        return (
            <Row>
                <Col md={4}>
                    <div className="height-150">
                        <Cascader requiredStyle bordered='bottom' changeOnSelect options={options} placeholder="请选择"/>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default Demo5;

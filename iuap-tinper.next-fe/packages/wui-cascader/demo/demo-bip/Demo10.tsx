/**
 *
 * @title 基础级联菜单
 * @description 切换按钮和结果分开。
 *
 */

import {Cascader, Col, Row, CascaderProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const options = [{
    label: '基础组件',
    value: '基础组件',
    children: [{
        label: '导航',
        value: '导航',
        children: [{
            label: '面包屑',
            value: '面包屑'
        }, {
            label: '分页',
            value: '分页'
        }, {
            label: '标签',
            value: '标签'
        }, {
            label: '菜单',
            value: '菜单'
        }]
    }, {
        label: '反馈',
        value: '反馈',
        children: [{
            label: '模态框',
            value: '模态框'
        }, {
            label: '通知',
            value: '通知'
        }]
    },
    {
        label: '表单',
        value: '表单'
    }]
}, {
    label: '应用组件',
    value: '应用组件',
    children: [{
        label: '参照',
        value: '参照',
        children: [{
            label: '树参照',
            value: '树参照'
        }, {
            label: '表参照',
            value: '表参照'
        }, {
            label: '穿梭参照',
            value: '穿梭参照'
        }]
    }]
}
];

interface Demo10State {
    text: string | undefined;
}

class Demo10 extends Component<{}, Demo10State> {
    constructor(props: {}) {
        super(props)
        this.state = {
            text: '显示区'
        }
    }

    onChange: CascaderProps['onChange'] = (value, selectedOptions) => {
        console.log(value, selectedOptions);

        this.setState({
            text: value?.join('>')
        })
    }

    render() {
        return (
            <Row>
                <Col md={4}>
                    <div className="height-150">
                        {this.state.text}
                        <br />
                        <Cascader
                            options={options}
                            onChange={this.onChange}
                            placeholder="请选择"
                        >
                            <a href="#">触发区</a>
                        </Cascader>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default Demo10;

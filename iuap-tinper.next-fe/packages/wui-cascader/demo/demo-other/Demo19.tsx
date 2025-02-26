/**
 *
 * @title 回调函数onChange、onPopupVisibleChange
 * @description onChange属性，选择完成后的回调。 onPopupVisibleChange属性，显示/隐藏浮层的回调
 * @type other
 */

import {Cascader, Col, Row, CascaderProps} from '@tinper/next-ui';
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

class Demo19 extends Component {
    constructor(props: {}) {
        super(props)
        this.state = {
            open: true
        }
    }

	onChange: CascaderProps['onChange'] = (value, selectedOptions) => {
	    console.log(value, selectedOptions);
	}
	onPopupVisibleChange: CascaderProps['onPopupVisibleChange'] = (v) => {
	    console.log(v ? '显示浮层' : '隐藏浮层')
	}

	render() {
	    return (
	        <div>
	            <Row>
	                <Col md={4}>
	                    <div className="height-150">
	                        <Cascader
	                            //  defaultValue={defaultOptions}
	                            options={options}
	                            onChange={this.onChange}
	                            placeholder="请选择"
	                            onPopupVisibleChange={this.onPopupVisibleChange}
	                        />
	                    </div>
	                </Col>
	            </Row>
	        </div>

	    )
	}
}

export default Demo19;

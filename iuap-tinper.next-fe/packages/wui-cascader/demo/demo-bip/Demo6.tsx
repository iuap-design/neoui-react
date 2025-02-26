/**
 *
 * @title 动态改变options
 * @description 通过动态设置`options`参数，即可灵活改变数据源。
 *
 */

import {Button, Cascader, Col, Row} from '@tinper/next-ui';
import React, {Component} from 'react';


const baseOptions = [{
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

class Demo6 extends Component {
	state = {
	    options: baseOptions
	}

	changeOptions = () => {
	    this.setState({
	        options: [{
	            label: '北京',
	            value: 'bj',
	            children: [{
	                label: '故宫',
	                value: 'gg',
	            }, {
	                label: '天坛',
	                value: 'tt',
	            }, {
	                label: '王府井',
	                value: 'wfj',
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
	        ]
	    })
	}

	render() {
	    return (
	        <Row>
	            <Col md={4}>
	                <div className="height-150">
	                    <Button colors="primary" onClick={this.changeOptions}
	                        style={{marginBottom: 8 + 'px'}}>点击改变选项数组</Button>
	                    <Cascader options={this.state.options} placeholder="请选择"/>
	                </div>
	            </Col>
	        </Row>
	    )
	}
}

export default Demo6;

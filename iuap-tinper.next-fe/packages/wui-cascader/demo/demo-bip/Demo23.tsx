/**
 *
 * @title 平铺模式级联
 * @description dropdownType属性，值为tiled，下拉展示为平铺模式。
 * @type other
 */

import { Cascader, Col, Row, CascaderProps} from '@tinper/next-ui';
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
        }, {
            label: '面包屑1',
            value: 'mbx1'
        }, {
            label: '分页1',
            value: 'fy1'
        }, {
            label: '标签1',
            value: 'bq1'
        }, {
            label: '菜单1',
            value: 'cd1'
        }, {
            label: '面包屑2',
            value: 'mbx2'
        }, {
            label: '分页2',
            value: 'fy2'
        }, {
            label: '标签2',
            value: 'bq2'
        }, {
            label: '菜单2',
            value: 'cd2'
        }, {
            label: '面包屑3',
            value: 'mbx3'
        }, {
            label: '分页3',
            value: 'fy3'
        }, {
            label: '标签3',
            value: 'bq3'
        }, {
            label: '菜单3',
            value: 'cd3'
        }, {
            label: '面包屑4',
            value: 'mbx4'
        }, {
            label: '分页4',
            value: 'fy4'
        }, {
            label: '标签4',
            value: 'bq4'
        }, {
            label: '菜单4',
            value: 'cd4'
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


class Demo10 extends Component<{}, {}> {
    constructor(props: {}) {
        super(props)
    }

	onChange: CascaderProps['onChange'] = (value, selectedOptions) => {
	    console.log(value, selectedOptions);
	}

	render() {
	    return (
	        <div>
	            <Row>
	                <Col md={4}>
	                    <div className="height-150">
	                        <Cascader
	                            showSearch={true}
	                            // defaultValue={defaultOptions}
	                            options={options}
	                            onChange={this.onChange}
	                            // fieldNames={{ label: 'name', value: 'id' }}
	                            placeholder="请选择"
	                            separator=" > "
	                            allowClear={true}
	                            // bordered={this.state.bordered}
	                            dropdownType="tiled"
	                        />
	                    </div>
	                </Col>
	            </Row>
	        </div>

	    )
	}
}

export default Demo10;

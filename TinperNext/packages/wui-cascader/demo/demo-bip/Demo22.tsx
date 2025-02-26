/**
 *
 * @title 多选节点
 * @description multiple属性设置节点可多选。
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
    disabled: true,
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


class Demo11 extends Component {

	onChange: CascaderProps['onChange'] = (value, selectedOptions) => {
	    console.log(value, selectedOptions);
	}

    onInputChange: CascaderProps['onSearch'] = (val, selectVal) => {
        console.log('input输入的值', val, '匹配的值', selectVal)
    }

    render() {
	    return (
	        <Row>
	            <Col md={4}>
	                <div className="height-150">
	                    <Cascader
                            showSearch={true}
	                        //  defaultValue={defaultOptions}
	                        options={options}
	                        onChange={this.onChange}
	                        placeholder="请选择"
	                        //  separator = " > "
                            multiple
                            showCheckedStrategy={Cascader.SHOW_CHILD}
                            maxTagCount={2}
                            maxTagPlaceholder={<div>more</div>}
                            maxTagTextLength={2}
	                    />
	                </div>
	            </Col>

	            <Col md={4}>
	                <div className="height-150">
	                    <Cascader
                            bordered='bottom'
	                        //  defaultValue={defaultOptions}
	                        options={options}
	                        onChange={this.onChange}
	                        placeholder="下划线"
	                        //  separator = " > "
                            multiple
                            showCheckedStrategy={Cascader.SHOW_PARENT}
                            maxTagCount={2}
                            style={{marginLeft: '20px'}}
	                    />
	                </div>
	            </Col>

	            <Col md={4}>
	                <div className="height-150">
	                    <Cascader
                            bordered={false}
	                        //  defaultValue={defaultOptions}
	                        options={options}
	                        onChange={this.onChange}
	                        placeholder="无边框"
	                        //  separator = " > "
                            multiple
                            maxTagCount={3}
                            style={{marginLeft: '20px'}}
	                    />
	                </div>
	            </Col>
	        </Row>
	    )
    }
}

export default Demo11;

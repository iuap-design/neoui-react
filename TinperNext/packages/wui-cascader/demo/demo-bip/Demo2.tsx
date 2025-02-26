/**
 *
 * @title 默认值
 * @description 默认值通过数组的方式指定。注：只需要给数组的每一项指定value值，如：['jczj', 'dh', 'cd']。
 *
 */

import {Button, Cascader, Col, Form, Row, CascaderProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const FormItem = Form.FormItem;

interface CascadeProps {
    form: any
}

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

const defaultOptions = ['jczj', 'dh', 'cd'];
const defaultOptions1 = ["yyzj", "ref", "reftransfer"]


class Demo2 extends Component<CascadeProps> {
	onChange: CascaderProps['onChange'] = (value, selectedOptions) => {
	    console.log(value, selectedOptions);
	}

	onSubmit = () => {
	    this.props.form.validateFields((_err: any, _values: any) => {
	        console.log(_values);
	    });
	}
	onRest = () => {
	    this.props.form.resetFields();
	    this.props.form.validateFields((_err: any, _values: any) => {
	        console.log(_values);
	    });
	}

	render() {
	    let {form: {getFieldProps}} = this.props;
	    return (
	        <div>
	            <p>单独的Cascader</p>
	            <Row>
	                <Col md={4}>
	                    <div className="height-150">
	                        <Cascader
	                            allowClear
	                            bordered='bottom'
	                            requiredStyle
	                            autoFocus
	                            showSearch
	                            defaultValue={defaultOptions}
	                            options={options}
	                            onChange={this.onChange}
	                            placeholder="请选择"
	                        />
	                    </div>
	                </Col>
	            </Row>
	            <br/>
	            <div className="height-150">
	                <p className={'cascader-demo-p'}>form表单包裹的Cascader</p>
	                <FormItem>
	                    <Cascader
	                        bordered='bottom'
	                        options={options}
	                        placeholder="请选择"
	                        {...getFieldProps('area', {initialValue: defaultOptions1, onChange: this.onChange})}
	                    />
	                </FormItem>
	                <div style={{paddingLeft: '8px', marginTop: 16}}>
	                    <Button onClick={this.onRest} style={{marginRight: '8px'}}>重置</Button>
	                    <Button colors="primary" onClick={this.onSubmit}>提交</Button>
	                </div>
	            </div>
	        </div>
	    )
	}
}

export default Form.createForm()(Demo2);

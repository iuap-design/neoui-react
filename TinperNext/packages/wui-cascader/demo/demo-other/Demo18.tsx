/**
 *
 * @title 选择框后缀图标、自定义浮层类名、浮层预设位置
 * @description suffixIcon属性，自定义的选择框后缀图标。 popupClassName属性，自定义浮层类名。 popupPlacement属性，浮层预设位置：bottomLeft bottomRight topLeft topRight
 * @type other
 */

import {Cascader, Col, Icon, Row, CascaderProps} from '@tinper/next-ui';
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

interface CascaderDemo18State {
    open: boolean
}

class Demo18 extends Component<{}, CascaderDemo18State> {
    constructor(props: {}) {
        super(props)
        this.state = {
            open: true
        }
    }

	onChange: CascaderProps['onChange'] = (value, selectedOptions) => {
	    console.log(value, selectedOptions);
	}
	isOpen = () => {
	    let isOp = this.state.open
	    this.setState({
	        open: !isOp
	    })
	}

	render() {
	    return (
	        <div>
	            <div>
	                {/* <Button onClick={this.isOpen}>控制浮层显隐</Button> */}
	            </div>
	            <Row>
	                <Col md={4}>
	                    <div className="height-150">
	                        <Cascader
	                            //  defaultValue={defaultOptions}
	                            options={options}
	                            onChange={this.onChange}
	                            placeholder="请选择"
	                            popupClassName='popup-ceshi'
	                            popupPlacement="bottomRight"
	                            //  separator = " > "
	                            // popupVisible={this.state.open}
	                            suffixIcon={<Icon type="uf-qq"/>}
	                        />
	                    </div>
	                </Col>
	            </Row>
	        </div>

	    )
	}
}

export default Demo18;

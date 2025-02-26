/**
 *
 * @title fieldid 示例
 * @description cascader增加fieldid属性（当前例子只加到input上，弹出层使用rc组件要在确认怎么添加）。
 * @type other
 */

import {Button, Cascader, Col, Row, CascaderProps} from '@tinper/next-ui';
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

const defaultOptions = ['jczj', 'dh', 'cd'];
 interface CascaderDemo20State {
    allowClear?: boolean;
    bordered?: boolean;
}

class Demo20 extends Component<{}, CascaderDemo20State> {
    constructor(props: {}) {
        super(props)
        this.state = {
            allowClear: true,
            bordered: true
        }
    }

     onChange: CascaderProps['onChange'] = (value, selectedOptions) => {
         console.log(value, selectedOptions);
     }
     isClear = () => {
         let isClea = this.state.allowClear
         this.setState({
             allowClear: !isClea
         })
     }
     isBorder = () => {
         let isBor = this.state.bordered
         this.setState({
             bordered: !isBor
         })
     }

     render() {
         return (
             <div>
                 <div style={{paddingBottom: '20px'}}>
                     <Button onClick={this.isClear}>是否支持清除</Button>
                     <Button onClick={this.isBorder}>是否有边框</Button>
                 </div>
                 <Row>
                     <Col md={4}>
                         <div className="height-150">
                             <Cascader
                                 defaultValue={defaultOptions}
                                 options={options}
                                 onChange={this.onChange}
                                 placeholder="请选择"
                                 separator=" > "
                                 allowClear={this.state.allowClear}
                                 bordered={this.state.bordered}
                                 fieldid={'cascader'}
                             />
                         </div>
                     </Col>
                 </Row>
             </div>

         )
     }
}

export default Demo20;

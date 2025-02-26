/**
 *
 * @title 边框、对齐方式
 *
 */

import {Cascader, Button, Radio, Space} from '@tinper/next-ui';
import React, {Component} from 'react';
import type {CascaderProps} from '@tinper/next-ui';

const options = [
    {
        label: '基础组件',
        value: 'jczj',
        children: [
            {
                label: '导航',
                value: 'dh',
                children: [
                    {
                        label: '面包屑',
                        value: 'mbx'
                    },
                    {
                        label: '分页',
                        value: 'fy'
                    },
                    {
                        label: '标签',
                        value: 'bq'
                    },
                    {
                        label: '菜单',
                        value: 'cd'
                    }
                ]
            },
            {
                label: '反馈',
                value: 'fk',
                children: [
                    {
                        label: '模态框',
                        value: 'mtk'
                    },
                    {
                        label: '通知',
                        value: 'tz'
                    }
                ]
            },
            {
                label: '表单',
                value: 'bd'
            }
        ]
    },
    {
        label: '应用组件',
        value: 'yyzj',
        children: [
            {
                label: '参照',
                value: 'ref',
                children: [
                    {
                        label: '树参照',
                        value: 'reftree'
                    },
                    {
                        label: '表参照',
                        value: 'reftable'
                    },
                    {
                        label: '穿梭参照',
                        value: 'reftransfer'
                    }
                ]
            }
        ]
    }
];

interface CascaderState {
    align?: CascaderProps['align'];
    bordered?: CascaderProps['bordered'];
}

const defaultOptions = ['jczj', 'dh', 'cd'];
class Demo21 extends Component<{}, CascaderState> {
    bRef: Button | null = null;

    constructor(props: {}) {
        super(props);
        this.state = {
            align: 'right',
            bordered: 'bottom'
        };
    }

    handleBorderedChange = (value: any) => {
        console.log(value);
        console.log('bRef: bordered--------', this.bRef);
        this.setState({
            bordered: value
        });
    };

    handleAlignChange = (value: any) => {
        console.log(value);
        console.log('bRef: align------', this.bRef);
        this.setState({
            align: value
        });
    };

    render() {
        const {bordered, align} = this.state;
        return (
            <div className='demo21'>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                    <Radio.Group
                        style={{marginRight: 20}}
                        selectedValue={bordered}
                        onChange={this.handleBorderedChange}
                    >
                        <Radio.Button value='bottom'>下划线</Radio.Button>
                        <Radio.Button value={undefined}>默认</Radio.Button>
                        <Radio.Button value={false}>无边框</Radio.Button>
                    </Radio.Group>
                </div>

                <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                    <Radio.Group style={{marginRight: 20}} selectedValue={align} onChange={this.handleAlignChange}>
                        <Radio.Button value='left'>左对齐</Radio.Button>
                        <Radio.Button value='center'>居中</Radio.Button>
                        <Radio.Button value='right'>右对齐</Radio.Button>
                        <Radio.Button value={undefined}>默认</Radio.Button>
                    </Radio.Group>
                </div>

                <Space style={{width: '100%'}} direction='vertical'>
                    <Cascader
                        defaultValue={defaultOptions}
                        options={options}
                        placeholder='请选择'
                        bordered={bordered}
                        align={align}
                    />
                </Space>
            </div>
        );
    }
}

export default Demo21;

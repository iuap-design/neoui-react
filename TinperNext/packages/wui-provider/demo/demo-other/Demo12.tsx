/**
 *
 * @title 全局配置 输入类组件 边框
 * @description 支持修改组件默认配置
 *
 */

import {
    Cascader,
    ConfigProvider,
    Input,
    InputNumber,
    AutoComplete,
    Select,
    TreeSelect,
    TimePicker,
    DatePicker,
    ColorPicker,
    Button,
    Form,
    Radio,
    Space
} from '@tinper/next-ui';
import React, {Component} from 'react';
import type {ConfigProviderProps} from '@tinper/next-ui';

const {TextArea, Password, Search} = Input;
const {Item} = Form;
const {TreeNode} = TreeSelect;

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

const defaultOptions = ['jczj', 'dh', 'cd'];

interface ProviderState {
    disabled?: boolean;
    align?: ConfigProviderProps['AlignType'];
    bordered?: ConfigProviderProps['BorderType'];
}
class Demo12 extends Component<{}, ProviderState> {
    bRef: Button | null = null;

    constructor(props: {}) {
        super(props);
        this.state = {
            disabled: false,
            align: 'right',
            bordered: 'bottom'
        };
    }

    handleDisabledChange = (value: boolean) => {
        console.log(value);
        console.log('bRef: bordered--------', this.bRef);
        this.setState({
            disabled: value
        });
    };

    handleBorderedChange = (value: ConfigProviderProps['BorderType']) => {
        console.log(value);
        console.log('bRef: bordered--------', this.bRef);
        this.setState({
            bordered: value
        });
    };

    handleAlignChange = (value: ConfigProviderProps['AlignType']) => {
        console.log(value);
        console.log('bRef: align------', this.bRef);
        this.setState({
            align: value
        });
    };

    render() {
        const {bordered, align, disabled} = this.state;
        return (
            <div className='demo12'>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                    <Radio.Group
                        style={{marginRight: 20}}
                        selectedValue={disabled}
                        className='custom-disbled'
                        onChange={this.handleDisabledChange}
                    >
                        <Radio.Button value={true}>禁用</Radio.Button>
                        <Radio.Button value={false}>不禁用</Radio.Button>
                    </Radio.Group>
                </div>

                <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                    <Radio.Group
                        style={{marginRight: 20}}
                        selectedValue={bordered}
                        className='custom-border'
                        onChange={this.handleBorderedChange}
                    >
                        <Radio.Button value='bottom'>下划线</Radio.Button>
                        <Radio.Button value={undefined}>默认</Radio.Button>
                        <Radio.Button value={false}>无边框</Radio.Button>
                    </Radio.Group>
                </div>

                <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                    <Radio.Group style={{marginRight: 20}} className='custom-align' selectedValue={align} onChange={this.handleAlignChange}>
                        <Radio.Button value='left'>左对齐</Radio.Button>
                        <Radio.Button value='center'>居中</Radio.Button>
                        <Radio.Button value='right'>右对齐</Radio.Button>
                        <Radio.Button value={undefined}>默认</Radio.Button>
                    </Radio.Group>
                </div>

                <ConfigProvider disabled={disabled} bordered={bordered} align={align} size='xs'>
                    <Space style={{width: '100%'}} direction='vertical'>
                        <ConfigProvider>
                            <Form>
                                <Item label='自动填充'>
                                    <AutoComplete
                                        style={{width: '200px'}}
                                        value='1'
                                        options={['10000', '10001', '10002', '11000', '12010']}
                                    />
                                </Item>
                                <Item label='取色器'>
                                    <ColorPicker value='#f00' />
                                </Item>
                                <Item label='级联菜单' required>
                                    <Cascader placeholder='请选择' defaultValue={defaultOptions} options={options} />
                                </Item>
                                <Item label='下拉框'>
                                    <Select value={123} style={{width: '200px'}}></Select>
                                </Item>
                                <Item label='日期'>
                                    <DatePicker value='2023-03-03' />
                                </Item>
                                <Item label='日期范围'>
                                    <DatePicker picker='range' value={['2023-03-03', '2023-08-08']} />
                                </Item>
                                <Item label='时间输入框'>
                                    <TimePicker value='11:11:11' />
                                </Item>
                                <Item label='输入框'>
                                    <Input value='十里春风' />
                                </Item>
                                <Item label='搜索框'>
                                    <Search value='众里寻她' />
                                </Item>
                                <Item label='搜索框(确认按钮)'>
                                    <Search value='千百度' enterButton='搜索' />
                                </Item>
                                <Item label='密码框'>
                                    <Password value='你猜啊' />
                                </Item>
                                <Item label='数字输入框'>
                                    <InputNumber value={666} />
                                </Item>
                                <Item label='文本输入框'>
                                    <TextArea value={'两次经济大危机的比较研究'} style={{width: '300px'}} />
                                </Item>
                                <Item label='树选择' required>
                                    <TreeSelect
                                        allowClear
                                        treeNodeLabelProp='value'
                                        style={{width: '200px'}}
                                        placeholder='请选择'
                                    >
                                        <TreeNode value='parent 1' title='用友网络股份有限公司' key='0-1'>
                                            <TreeNode value='parent 1-0' title='用友网络股份有限公司1-0' key='0-1-1'>
                                                <TreeNode value='leaf1' title='用友网络股份有限公司leaf' key='random' />
                                                <TreeNode
                                                    value='leaf2'
                                                    title='用友网络股份有限公司leaf'
                                                    key='random1'
                                                />
                                                <TreeNode
                                                    value='leaf3'
                                                    title='用友网络股份有限公司leaf'
                                                    key='random32'
                                                />
                                                <TreeNode
                                                    value='leaf4'
                                                    title='用友网络股份有限公司leaf'
                                                    key='random33'
                                                />
                                                <TreeNode
                                                    value='leaf5'
                                                    title='用友网络股份有限公司leaf'
                                                    key='random4'
                                                />
                                                <TreeNode
                                                    value='leaf6'
                                                    title='用友网络股份有限公司leaf'
                                                    key='random5'
                                                />
                                            </TreeNode>
                                            <TreeNode value='parent 1-1' title='用友网络股份有限公司' key='random2'>
                                                <TreeNode value='sss' title='用友网络股份有限公司' key='random3' />
                                            </TreeNode>
                                        </TreeNode>
                                    </TreeSelect>
                                </Item>
                            </Form>
                        </ConfigProvider>
                    </Space>
                </ConfigProvider>

                <Button type='primary' ref={ref => (this.bRef = ref)}>
                    按钮
                </Button>
            </div>
        );
    }
}

export default Demo12;

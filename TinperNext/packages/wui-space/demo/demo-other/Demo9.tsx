/**
 *
 * @title 紧凑布局组合
 * @description 使用 Space.Compact 让表单组件之间紧凑连接且合并边框。
 */

import {Button, Space, Input, Icon, Select, DatePicker, TimePicker, Cascader, AutoComplete, TreeSelect, InputNumber } from "@tinper/next-ui";
import React, {Component} from "react";

const {Compact} = Space;
const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;

let options = [
    {
        key: "vision",
        label: "幻视"
    },
    {
        key: "shang-chi",
        label: "尚气"
    },
    {
        key: "peter",
        label: "彼得"
    }
];
const CascaderOptions: any = [{
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
class Demo extends Component {
    render() {
        return (
            <div tinper-next-role='container' style={{position: 'relative', zIndex: 1}}>
                <Compact block>
                    <Select defaultValue="vision" style={{ width: 80 }} options={options} />
                    <Input style={{ width: '30%' }} defaultValue="0571" />
                    <Button icon={<Icon type="uf-search-light-2" />} />
                </Compact>
                <br/>
                <br/>
                <Compact block>
                    <Input style={{ width: '10%' }} defaultValue="新疆" />
                    <Input style={{ width: '20%' }} defaultValue="0571" />
                    <Input style={{ width: '30%' }} defaultValue="26888888" />
                </Compact>
                <br/>
                <br/>
                <Compact block>
                    <Input style={{ width: '20%' }} defaultValue="0571" />
                    <Button icon={<Icon type="uf-search-light-2" />} />
                    <Input style={{ width: '30%' }} defaultValue="26888888" />
                    <Button type="primary">Submit</Button>
                </Compact>
                <br/>
                <br/>
                <Compact block>
                    <InputNumber />
                    <InputNumber iconStyle='one' />
                    <Select defaultValue="vision" style={{ width: 80 }} options={options} />
                </Compact>
                <br/>
                <br/>
                <Compact block>
                    <Select defaultValue="vision" style={{ width: 80 }} options={options} />
                    <RangePicker style={{ width: '30%' }} format='YYYY/MM/DD' placeholder={['开始', '结束']} />
                    <Button icon={<Icon type="uf-search-light-2" />} />
                </Compact>
                <br/>
                <br/>
                <Compact block>
                    <Input style={{ width: '20%' }} defaultValue="选择日期" />
                    <DatePicker style={{ width: '20%' }} defaultValue='2036-04-23' format='YYYY-MM-DD' placeholder='选择日期' showToday />
                </Compact>
                <br/>
                <br/>
                <Compact block>
                    <Select defaultValue="vision" style={{ width: 80 }} options={options} />
                    <TimePicker style={{ width: '20%' }} placeholder='选择时间' use12Hours format='h:mm'/>
                    <Button icon={<Icon type="uf-search-light-2" />} />
                </Compact>
                <br/>
                <br/>
                <Compact block>
                    <Cascader options={CascaderOptions} placeholder="请选择" />
                    <Input style={{ width: '30%' }} defaultValue="0571" />
                    <Button icon={<Icon type="uf-search-light-2" />} />
                </Compact>
                <br/>
                <br/>
                <Compact block>
                    <Select defaultValue="vision" style={{ width: 80 }} options={options} />
                    <AutoComplete style={{ width: '20%' }} placeholder='查找关键字,请输入1' options={["10000", "10001", "10002", "11000", "12010"]}/>
                    <Button icon={<Icon type="uf-search-light-2" />} />
                </Compact>
                <br/>
                <br/>
                <Compact block>
                    <DatePicker style={{ width: '20%' }} defaultValue='2036-04-23' format='YYYY-MM-DD' placeholder='选择日期' showToday />
                    <Select defaultValue="vision" style={{ width: 80 }} options={options} />
                    <Input style={{ width: '20%' }} defaultValue="input" />
                    <Button type="primary">查询</Button>
                </Compact>
                <br/>
                <br/>
                <Compact block>
                    <TreeSelect
                        showSearch
                        style={{width: 240}}
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        placeholder="请选择"
                        allowClear
                        treeDefaultExpandAll
                    >
                        <TreeNode value="parent 1" title="用友网络股份有限公司">
                            <TreeNode value="parent 1-0" title="用友网络股份有限公司1-0">
                                <TreeNode value="leaf1" title="用友网络股份有限公司leaf"/>
                                <TreeNode value="leaf2" title="用友网络股份有限公司leaf"/>
                            </TreeNode>
                            <TreeNode value="parent 1-1" title="用友网络股份有限公司">
                                <TreeNode value="sss" title="用友网络股份有限公司"/>
                            </TreeNode>
                        </TreeNode>
                    </TreeSelect>
                    <Input style={{ width: '20%' }} placeholder="Email" />
                </Compact>
            </div>
        );
    }
}

export default Demo;

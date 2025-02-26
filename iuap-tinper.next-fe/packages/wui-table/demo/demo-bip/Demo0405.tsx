/**
 *
 * @title 列合计（总计）
 * @parent 列渲染 Custom Render
 * @description 给需要计算合计的列（columns），设置sumCol值为true即可，支持动态设置数据源。
 * @type bip
 * demo0405
 */

import {Table, TableProps, Select} from "@tinper/next-ui";
import React, {Component} from "react";
type DefaultRecordType = Record<string, any>;
const Option = Select.Option;
const columns: TableProps['columns'] = [
    {
        title: "单据编号",
        dataIndex: "num",
        key: "num",
        width: 120,
        fixed: "left"
    },
    {
        title: "单据日期",
        dataIndex: "date",
        key: "date",
        width: 200,
    },
    {
        title: "业务类型",
        dataIndex: "type",
        key: "type",
        width: 200
    },
    {
        title: "供应商",
        dataIndex: "supplier",
        key: "supplier",
        width: 100
    },
    {
        title: "联系人",
        dataIndex: "contact",
        key: "contact",
    },
    {
        title: "仓库",
        dataIndex: "warehouse",
        key: "warehouse",
        width: 80,
    },
    {
        title: "整单数量",
        dataIndex: "total",
        key: "total",
        width: 100,
        sumCol: true,
        sumThousandth: true,
        sumPrecision: 3,
        totalRender: 1000,
    },
    {
        title: "金额",
        dataIndex: "money",
        key: "money",
        width: 100,
        sumCol: true,
        sumThousandth: true,
        sumPrecision: 4,
        totalRender: (column: any, data: any) => {
            console.log('column', column, 'data', data)
            return <span className="cc">90000</span>
        },
    }
];

function getData() {
    const data: TableProps['data'] = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            key: i,
            num: "NU039100" + i,
            date: "2019-03-01",
            type: "普通采购",
            supplier: "gys" + i,
            contact: "Tom",
            warehouse: "普通仓",
            total: i + Math.floor(Math.random() * 10),
            money: 2000 * Math.floor(Math.random() * 10)
        });
    }
    return data;
}

interface Demo35State {
    data: TableProps['data'];
    showSum: string[];
    selectedRowKeys: React.Key[]
}

const target = {
    '1': ['subtotal'],
    '2': ['total'],
    '3': ['subtotal', 'total'],
    '4': []
}
class Demo35 extends Component<{}, Demo35State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            data: getData(),
            showSum: ['subtotal'],
            selectedRowKeys: []
        };
    }


    change = (value: string) => {
        this.setState({
            showSum: target[value]
        })
    }

    render() {
        const {data} = this.state;
        let rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys: React.Key[], _selectedRows: DefaultRecordType[]) => {
                this.setState({
                    selectedRowKeys
                })
            }
        }
        return (
            <div>
                <div style={{ width: '300px', paddingBottom: '20px' }}>
                    <span>合计/小计</span>
                    <span style={{ display: 'inline-block', width: '130px' }}>
                        <Select onChange={this.change} defaultValue="1">
                            <Option value="1">小计</Option>
                            <Option value="2">合计</Option>
                            <Option value="3">小计/合计</Option>
                            <Option value="4">不显示</Option>
                        </Select>
                    </span>
                </div>
                <Table
                    columns={columns}
                    data={data}
                    bordered
                    sumPrecision={2}
                    rowSelection={rowSelection}
                    bodyStyle={{height: '300px'}}
                    sumClassName="abc"
                    footerClassName="foot_table"
                    showSum={this.state.showSum}
                />
            </div>
        );
    }
}

export default Demo35;

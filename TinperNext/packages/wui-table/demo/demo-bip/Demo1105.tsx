/**
 *
 * @title 适配Antd
 * @description 兼容大部分antd表格的api。
 * @type bip
 * demo1105
 */

import { Table, Tag, TableProps} from "@tinper/next-ui";
import React, {Component} from "react";
type DefaultRecordType = Record<string, any>;
const { AntdTable } = Table;

const columns: TableProps['columns'] = [
    {title: "订单编号", dataIndex: "orderNum", key: "orderNum", width: 100},
    {title: "采购组织", dataIndex: "org", key: "org", width: 200},
    {title: "供应商", dataIndex: "supplier", key: "supplier", width: 100},
    {title: "订单日期", dataIndex: "orderDate", key: "orderDate", width: 150},
    {title: "总数量", dataIndex: "quantity", key: "quantity", width: 100},
    {
        title: "单据状态", dataIndex: "status", key: "status", width: 100,
        render: (text: any, _record: Record<string, any>, _index: number) => {
            return (
                <Tag colors={text.type}>{text.desc}</Tag>
            );
        }
    },
    {title: "提交人", dataIndex: "submitter", key: "submitter", width: 100},
    {title: "单位", dataIndex: "unit", key: "unit", width: 100},
    {title: "总税价合计", dataIndex: "sum", key: "sum", width: 100},
];

const data: TableProps['data'] = [
    {
        orderNum: "NU0391025",
        org: "用友网络科技股份有限公司",
        supplier: "xx供应商",
        orderDate: '2018年03月18日',
        quantity: '100.00',
        status: {type: 'success', desc: '正常'},
        submitter: '小张',
        unit: 'pc',
        sum: '8,487.00',
        key: "1"
    },
    {
        orderNum: "NU0391026",
        org: "用友网络科技股份有限公司",
        supplier: "xx供应商",
        orderDate: '2018年02月05日',
        quantity: '91.00',
        status: {type: 'danger', desc: '异常'},
        submitter: '小红',
        unit: 'pc',
        sum: '675.00',
        key: "2"
    },
    {
        orderNum: "NU0391027",
        org: "用友网络科技股份有限公司",
        supplier: "xx供应商",
        orderDate: '2018年07月01日',
        quantity: '98.00',
        status: {type: 'success', desc: '正常'},
        submitter: '小李',
        unit: 'pc',
        sum: '1,531.00',
        key: "3"
    }
];

interface Demo1State {
    data: TableProps['data'];
    selectedRowKeys: TableProps['selectedRowKeys'];
}

class Demo1 extends Component<{}, Demo1State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: data,
            selectedRowKeys: [],
        };
    }
    render() {
        let rowSelection = {
	        selectedRowKeys: this.state.selectedRowKeys,
	        getCheckboxProps: (record: DefaultRecordType) => ({
	            disabled: record.key == '3', // Column configuration not to be checked
	            name: record.b,
	        }),
	        onChange: (selectedRowKeys: TableProps['selectedRowKeys'], selectedRows: TableProps['data']) => {
	            console.log('selectedRowKeys', selectedRowKeys, 'selectedRows', selectedRows)
	            this.setState({
	                selectedRowKeys
	            })
	        },
	        onSelectAll: (check: boolean, selectedRows: TableProps['data'], changeRows: TableProps['data']) => {
	            console.log('check', check, 'selectedRows', selectedRows, 'changeRows', changeRows)
	        }
	    }
        return (
            <div>
                <AntdTable columns={columns} data={data} pagination rowSelection={rowSelection}/>
            </div>
        );
    }
}

export default Demo1;

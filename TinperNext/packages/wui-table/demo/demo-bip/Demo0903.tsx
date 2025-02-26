/**
 *
 * @title 多列排序
 * @parent 列操作-排序 Sort
 * @description 结合多列排序、全选功能、合计功能的表格示例。新增排序后触发的回调函数sorterClick。
 * @type other
 * demo0903
 */

import {Button, Checkbox, TableProps, Table, ColumnType} from "@tinper/next-ui";
import React, {Component} from "react";

const {multiSelect, sort, sum} = Table;

const columns13: TableProps['columns'] = [
    {
        title: "订单编号",
        dataIndex: "a",
        key: "a",
        className: 'dfasd',
        width: 200,
        sorter: (pre: Record<string, any>, after: Record<string, any>) => {
            return pre.a.localeCompare(after.a)
        },
        sorterClick: (data: ColumnType, _type: string) => {// 排序的回调函数
            // type value is up or down
            console.log("data", data);
        }
    },
    {
        title: "金额",
        dataIndex: "b",
        key: "b",
        width: 200,
        sumCol: true,
        sorter: (pre: Record<string, any>, after: Record<string, any>) => pre.b - after.b,
        sorterClick: (data: ColumnType, _type: string) => {// 排序的回调函数
            // type value is up or down
            console.log("data", data);
        }
    },
    {
        title: "整单数量",
        dataIndex: "c",
        key: "c",
        width: 200,
        sumCol: true,
        sorter: (pre: Record<string, any>, after: Record<string, any>) => pre.c - after.c,
        sorterClick: (data: ColumnType, _type: string) => {// 排序的回调函数
            // type value is up or down
            console.log("data", data);
        }
    },
    {
        title: "日销售量",
        dataIndex: "e",
        key: "e",
        width: 200,
        sumCol: true,
        sorter: (pre: Record<string, any>, after: Record<string, any>) => pre.e - after.e
    },
    {
        title: "供应商",
        dataIndex: "d",
        key: "d",
        width: 200
    }
];

const data13: TableProps['data'] = [
    {a: "NU0391001", b: 675, c: -50, d: "xx供应商", e: 120, key: "2"},
    {a: "NU0391002", b: 43, c: -150, d: "yy供应商", e: 90, key: "1"},
    {a: "NU0391003", b: 43, c: -100, d: "zz供应商", e: 120, key: "4"},
    {a: "NU0391004", b: 43, c: -120, d: "aa供应商", e: 110, key: "5"},
    {a: "NU0391005", b: 153, c: -180, d: "bb供应商", e: 90, key: "3"}
];

// 拼接成复杂功能的table组件不能在render中定义，需要像此例子声明在组件的外侧，不然操作state会导致功能出现异常
let ComplexTable = multiSelect(sort(sum(Table)), Checkbox);
interface Demo13State {
    data: TableProps['data'];
    selectedRowKeys: TableProps['selectedRowKeys'];
}
class Demo13 extends Component <{}, Demo13State> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            data: data13,
            selectedRowKeys: []
        };
    }

	clearSelectFun = () => {
	    this.setState({
	        selectedRowKeys: []
	    })
	}

	render() {
	    let sortObj: TableProps['sort'] = {
	        mode: 'multiple',
	        sortFun: (_sortCol, data, _oldData) => {
	            console.log(data)
	        }
	    }

	    let rowSelection = {
	        columnWidth: 60,
	        selectedRowKeys: this.state.selectedRowKeys,
	        onChange: (selectedRowKeys: TableProps['selectedRowKeys'], _selectedRows: TableProps['data']) => {
	            this.setState({
	                selectedRowKeys
	            })
	        }
	    }

	    return (
	        <div>
	            <Button className="editable-add-btn" onClick={this.clearSelectFun}>
					清空已选
	            </Button>
	            <ComplexTable
	                bordered
	                columns={columns13}
	                data={this.state.data}
	                rowKey="key"
	                rowSelection={rowSelection}
	                sort={sortObj}
	            />
	        </div>
	    );
	}
}

export default Demo13;

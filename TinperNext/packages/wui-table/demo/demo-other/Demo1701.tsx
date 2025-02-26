/**
 *
 * @title 值为对象属性的列排序
 * @parent 列操作-排序 Sort
 * @description 结合多列排序、全选功能。getMultiSorterValue得到单元格中显示的值，用来进行排序中的判断。
 * @type other
 * demo1701
 */

import {Checkbox, Table, TableProps, ColumnType} from "@tinper/next-ui";
import React, {Component} from "react";
type DefaultRecordType = Record<string, any>;

const {multiSelect, sort} = Table;

interface Demo13State {
	data13: TableProps['data']
}

const columns13: TableProps['columns'] = [
    {
        title: "订单编号",
        dataIndex: "a",
        key: "a",
        className: 'dfasd',
        width: 200,
        sorter: (pre: DefaultRecordType, after: DefaultRecordType) => {
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
        sorter: (pre: DefaultRecordType, after: DefaultRecordType) => pre.b - after.b,
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
        sorter: (pre: DefaultRecordType, after: DefaultRecordType) => pre.c - after.c,
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
        sorter: (pre:DefaultRecordType, after: DefaultRecordType) => pre.e.value - after.e.value,
        getMultiSorterValue: (data: DefaultRecordType, _col: DefaultRecordType) => {
            return data.value
        },
        render: (text: any, _data: DefaultRecordType) => {
            return text.value
        }
    },
    {
        title: "供应商",
        dataIndex: "d",
        key: "d",
        width: 200
    }
];

const data13: TableProps['data'] = [
    {a: "NU0391001", b: 675, c: '-100', d: "xx供应商", e: {value: 120}, key: "2"},
    {a: "NU0391002", b: 43, c: '-100', d: "yy供应商", e: {value: 90}, key: "1"},
    {a: "NU0391003", b: 43, c: '-100', d: "zz供应商", e: {value: 120}, key: "4"},
    {a: "NU0391004", b: 43, c: '-100', d: "aa供应商", e: {value: 110}, key: "5"},
    {a: "NU0391005", b: 153, c: '-100', d: "bb供应商", e: {value: 90}, key: "3"}
];

// 拼接成复杂功能的table组件不能在render中定义，需要像此例子声明在组件的外侧，不然操作state会导致功能出现异常
let ComplexTable = multiSelect(sort(Table), Checkbox);

class Demo13 extends Component<{}, Demo13State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data13: data13,
        };
    }

	getSelectedDataFunc: TableProps['getSelectedDataFunc'] = (_selectedList: DefaultRecordType[], _record: DefaultRecordType, _index: number, newData: DefaultRecordType[]) => {
	    console.log('newData', newData)
	    this.setState({data13: newData})
	};

	render() {
	    let sortObj = {
	        mode: 'multiple'
	    }

	    return (
	        <div>
	            <ComplexTable
	                bordered
	                columns={columns13}
	                data={this.state.data13}
	                sort={sortObj}
	                getSelectedDataFunc={this.getSelectedDataFunc}
	            />
	        </div>
	    );
	}
}

export default Demo13;

/**
 * @title 列排序
 * @parent 列操作-排序 Sort
 * @description  column中增加sorter: (a, b) => a.c - b.c 这里的a,b代表前后两个数据，c代表比较当前对象的字段名称
 * @type other
 * demo0901
 */


import {Checkbox, Table, TableProps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {sort, multiSelect} = Table;

// let multiSelectTable = multiSelect(Table, Checkbox);
// let ComplexTable = sort(multiSelectTable, Icon);


let multiSelectTable = sort(Table);
let ComplexTable = multiSelect(multiSelectTable, Checkbox);

const columns11: TableProps['columns'] = [
    {
        title: "单据编号",
        dataIndex: "num",
        key: "num",
        width: 120,

    },
    {
        title: "单据日期",
        dataIndex: "date",
        key: "date",
        width: 200,
        sorter: 'date',
    },
    {
        title: "供应商",
        dataIndex: "supplier",
        key: "supplier",
        width: 100,
        sorter: 'string',
    },
    {
        title: "联系人",
        dataIndex: "contact",
        key: "contact",
    },
    {
        title: "整单数量",
        dataIndex: "total",
        key: "total",
        width: 150,
        sorter: 'number',
    }
];

const data11: TableProps['data'] = [
    {num: "NU0391001", date: "2019-03-01", supplier: 'xx供应商', contact: 'Tom', total: 30, key: "1"},
    {num: "NU0391002", date: "2018-11-02", supplier: 'yy供应商', contact: 'Jack', total: 41, key: "2"},
    {num: "NU0391003", date: "2019-05-03", supplier: 'zz供应商', contact: 'Jane', total: 25, key: "3"}
];

const defaultProps11 = {
    prefixCls: "bee-table"
};
interface Demo11State {
    sortOrder:boolean | string;
    data: Record<string, any>[]
}
class Demo11 extends Component<{}, Demo11State> {
    static defaultProps: { prefixCls: string; };
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            sortOrder: "",
            data: data11
        };
    }

	getSelectedDataFunc = (_selectList: Record<string, any>[], _record: Record<string, any>, _index: number) => {

	}

	render() {
	    let rowSelection = {}
	    return <ComplexTable bordered headerHeight={28} columns={columns11} data={this.state.data}
							 rowSelection={rowSelection} getSelectedDataFunc={this.getSelectedDataFunc} showSorterTooltip={true}/>;
	}
}

Demo11.defaultProps = defaultProps11;


export default Demo11;

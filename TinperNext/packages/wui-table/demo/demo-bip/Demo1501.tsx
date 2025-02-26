/**
 * @title 单列定位
 * @parent 单列定位 singleFind
 * @description  column中增加singleFind
 * @type other
 * demo1501
 */


import {Radio, Table, TableProps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {singleFind, singleSelect} = Table;

let ComplexTable = singleSelect(singleFind(Table), Radio);

const columns11: TableProps['columns'] = [
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
        singleFind: false,
        key: "date",
        width: 200,
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
        title: "整单数量",
        dataIndex: "total",
        key: "total",
        width: 150,
        sorter: (a, b) => a.total - b.total
    }
];

const data11: TableProps['data'] = [
    {num: "NU0391001", date: "2019-03-01", supplier: 'xx供应商', contact: 'Tom', total: 30, key: "1"},
    {num: "NU0391002", date: "2018-11-02", supplier: 'yy供应商', contact: 'Jack', total: 41, key: "2"},
    {num: "NU0391003", date: "2019-05-03", supplier: 'zz供应商', contact: 'Jane', total: 25, key: "3"},
    {num: "NU0391004", date: "2019-05-04", supplier: 'aa供应商', contact: 'Gray', total: 0, key: "4"},
    {num: "NU0391005", date: "2019-05-05", supplier: 'aa供应商', contact: 'Merry', total: '', key: "5"},
];

interface Demo11State {
    sortOrder: string;
    data: TableProps['data']
}

class Demo11 extends Component<{}, Demo11State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            sortOrder: "",
            data: data11
        };
    }

    render() {

        return <ComplexTable columns={columns11} data={this.state.data}/>;
    }
}

export default Demo11;

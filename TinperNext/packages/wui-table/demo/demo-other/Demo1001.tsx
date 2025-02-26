/**
 *
 * @title 拖拽改变列顺序
 * @parent 列操作-拖拽 Drag
 * @description 点击选择表头并左右拖拽，可以改变表格列顺序。 onDragEnd 方法是拖拽交换列后触发的回调函数。注意：固定列不可以交换。
 * @type other
 * demo1001
 */
import {Table, TableProps} from '@tinper/next-ui';
import React, {Component} from 'react';
type DefaultRecordType = Record<string, any>;

const {dragColumn} = Table;

const columns: TableProps['columns'] = [
    {
        title: "订单编号",
        dataIndex: "a",
        key: "a",
        width: 100
    },
    {
        title: "单据日期",
        dataIndex: "b",
        key: "b",
        width: 200
    },
    {
        title: "供应商",
        dataIndex: "c",
        key: "c",
        width: 200,
        sumCol: true,
        sorter: (a: DefaultRecordType, b: DefaultRecordType) => a.c - b.c
    },
    {
        title: "联系人",
        dataIndex: "d",
        key: "d",
        width: 500,
    },
    {
        title: "操作",
        dataIndex: "e",
        key: "e",
        width: 200,
        fixed: 'right',
    }
];

const data: TableProps['data'] = [
    {a: "NU0391001", b: "2019-03-01", c: 'xx供应商', d: 'Tom', e: '...', key: "2"},
    {a: "NU0391002", b: "2018-11-02", c: 'yy供应商', d: 'Jack', e: '...', key: "1"},
    {a: "NU0391003", b: "2019-05-03", c: 'zz供应商', d: 'Jane', e: '...', key: "3"}
];

const DragColumnTable = dragColumn(Table);


class Demo29 extends Component {
    constructor(props: {}) {
        super(props);
    }

    onDrop: TableProps['onDrop'] = (event: React.MouseEvent<HTMLElement>, dropData)=> {
        console.log("--拖拽交换列onDrop触发事件");
        console.log("event.target:", event.target);
        console.log("dropData:", dropData);
    }

    onDragEnd: TableProps['onDragEnd'] = (event: React.MouseEvent<HTMLElement>, dropData) => {
        console.log("--拖拽交换列后触发事件");
        console.log("event.target:", event.target);
        console.log("dropData:", dropData);
    }

    render() {
        return <DragColumnTable
            columns={columns}
            data={data}
            bordered
            draggable={true}
            onDrop={this.onDrop}
            onDragEnd={this.onDragEnd}
        />;
    }
}

export default Demo29;

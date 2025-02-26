/**
 *
 * @title 拖拽改变列宽度
 * @parent 列操作-拖拽 Drag
 * @description onDropBorder方法为调整列宽后触发的回调函数。注：不支持tree结构的表头。
 * @type bip
 * demo1002
 */
import { TableProps, Table, Switch} from '@tinper/next-ui';
import React, {Component} from 'react';

const {dragColumn} = Table;

const columns:TableProps['columns'] = [
    {
        title: "订单编号",
        dataIndex: "a",
        key: "a",
        width: '200',
        fixed: 'left'
    },
    {
        title: "单据日期",
        dataIndex: "b",
        key: "b",
        width: '600',
        dragborder: false// 本列禁止拖拽调整宽度
    },
    {
        title: "供应商",
        dataIndex: "c",
        key: "c",
        width: '200',
    },
    {
        title: "联系人",
        dataIndex: "d",
        key: "d",
        width: 200,
    },
    {
        title: "日期",
        dataIndex: "e",
        key: "e",
        width: 500,
    }
];

const data: TableProps['data'] = [
    {a: "NU0391001", b: "2019-03-01", c: "xx供应商", d: 'Tom', e: '2023-10-01', key: "2"},
    {a: "NU0391002", b: "2018-11-02", c: "yy供应商", d: 'Jack', e: '2023-10-11', key: "1"},
    {a: "NU0391003", b: "2019-05-03", c: "zz供应商", d: 'Jane', e: '2023-10-21', key: "3"}
];

const DragColumnTable = dragColumn(Table);

class Demo30 extends Component<{}, {dragType: boolean | 'fixed' | 'default', columns: any[]}> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            dragType: 'default',
            columns: columns
        }
    }

    changeType = () => {
        const { dragType } = this.state;
        this.setState({
            dragType: dragType === 'default' ? 'fixed' : 'default',
        })
    }

    onDropBorder = (e: React.MouseEvent<HTMLElement>, width: number, column: any) => {
        const key = column.key;
        const newColumns = columns.map(col => {
            if (col.key === key) {
                col.width = width;
            }
            return col;
        })
        this.setState({
            columns: newColumns
        })
    }

    render() {
        return <>
            <div style={{ paddingBottom: '15px' }}>拖拽模式: {this.state.dragType === 'default' ? 'default' : 'fixed'}<Switch checked={this.state.dragType !== 'default'} onChange={this.changeType}/></div>
            <DragColumnTable
                columns={this.state.columns}
                data={data}
                bordered
                scroll={{y: 200}}
                dragborder={this.state.dragType}
                onDropBorder={this.onDropBorder}
            />
        </>
    }
}

export default Demo30;

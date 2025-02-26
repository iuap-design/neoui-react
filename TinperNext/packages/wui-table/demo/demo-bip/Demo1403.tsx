/**
 *
 * @title 多功能表格滚动加载
 * @parent 无限滚动 Infinite-scroll
 * @description
 * @type bip
 * demo1403
 */

import {Checkbox, Table, Tooltip, TableProps} from "@tinper/next-ui";
import React, {Component} from "react";
type DefaultRecordType = Record<string, any>;

const {multiSelect, filterColumn, bigData} = Table;

let ComplexTable = filterColumn(multiSelect(bigData(Table), Checkbox));

const columns: TableProps['columns'] = [
    {
        title: '序号',
        dataIndex: 'index',
        width: '80',
        key: 'index',
        render: (_text:any, _record: Record<string, any>, index: number) => {
            return index
        }
    },
    {
        title: "用户名", dataIndex: "a", key: "a", width: 580, className: "rowClassName",
        render: (text:any, _record: Record<string, any>, _index: number) => {
            return (
                <Tooltip inverse overlay={text}>
                    <span style={{
			  display: "block",
			  width: "40px",
			  textOverflow: "ellipsis",
			  overflow: "hidden",
			  whiteSpace: "nowrap",
			  verticalAlign: "bottom",
		  }}>{text}</span>
                </Tooltip>
            );
        }
    },
    {title: "性别", dataIndex: "b", key: "b", width: 80},
    {title: "年龄", dataIndex: "c", key: "c", width: 200}
];

const data: TableProps['data'] = [...new Array(100000)].map((_e, i) => {
    const rs = {a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i};
    if (i % 3 == 0) {
        rs.b = '女';
    }
    return rs;
})

interface Demo43State {
    data:TableProps['data'];
    selectedRowKeys: any[];
}
class Demo43 extends Component <{}, Demo43State> {

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            data: data,
            selectedRowKeys: ['1']
        }
    }


    render() {
        let rowSelection = {
            columnWidth: 80,
            selectedRowKeys: this.state.selectedRowKeys,
            getCheckboxProps: (record: DefaultRecordType) => ({
                disabled: record.key == '221', // Column configuration not to be checked
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
            },
        }
	    return (
	        <ComplexTable
	            columns={columns}
	            data={this.state.data}
	            scroll={{y: 300}}
	            bordered
                rowKey={'key'}
	            rowSelection={rowSelection}/>

	    );
    }
}

export default Demo43;

/**
 *
 * @title 单选功能
 * @parent 行操作-选择
 * @description 表格支持单选行操作，可自定义选中行背景色。getSelectedDataFunc方法是选中行的回调函数。
 * @type bip
 * Demo1302
 */

import { Radio, Table, TableProps } from "@tinper/next-ui";
import React, {Component} from "react";

const {singleSelect} = Table;

const columns: TableProps['columns'] = [
    {title: "员工编号", dataIndex: "a", key: "a", width: 300},
    {title: "员工姓名", dataIndex: "b", key: "b", width: 500},
    {title: "性别", dataIndex: "c", key: "c", width: 500},
    {title: "部门", dataIndex: "d", key: "d", width: 200}
];

const data: TableProps['data'] = [
    {a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1"},
    {a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2"},
    {a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3"},
    {a: "ASVAL_201903280010", b: "小王", c: "女", d: "财务二科", key: "4"},
    {a: "ASVAL_201903200021", b: "小李", c: "男", d: "财务一科", key: "5"}
];

// 拼接成复杂功能的table组件不能在render中定义，需要像此例子声明在组件的外侧，不然操作state会导致功能出现异常
let SingleSelectTable = singleSelect(Table, Radio);
 interface Demo1302State {
     data: TableProps['data'];
     selectedRowKeys: TableProps['selectedRowKeys'];
 }
class Demo1302 extends Component <{}, Demo1302State> {

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            data: data,
            selectedRowKeys: ['1']
        }
    }

    render() {
        let rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys: TableProps['selectedRowKeys'], _selectedRows: TableProps['data']) => {
                this.setState({
                    selectedRowKeys
                })
            }
        }

        return (
            <SingleSelectTable
                className="demo1302"
                bordered
                columns={columns}
                data={data}
                autoCheckedByClickRows={false}
                rowSelection={rowSelection}
            />
        );
    }
}

export default Demo1302;

/**
 *
 * @title 基本表格
 * @parent 基础 Basic
 * @description 当单元格内容过多时，会自动显示省略号，鼠标hover有提示。showRowNum 设置是否显示序号列。
 * @type bip
 * demo0101
 */

import {Table, TableProps} from "@tinper/next-ui";
import React, {Component} from "react";

const columns: TableProps['columns'] = [
    {title: "员工编号", dataIndex: "a", key: "a", width: 150},
    {title: "员工姓名", dataIndex: "b", key: "b", width: 100},
    {title: "性别", dataIndex: "c", key: "c", width: 100},
    {title: "部门", dataIndex: "d", key: "d", width: 100},
    {title: "职级", dataIndex: "e", key: "e", width: 100}
];

const data: TableProps['data'] = [
    {a: "ASVAL_20190328", b: "小张", c: "男", d: "财务二科", e: "M1", key: "1"},
    {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务一科", e: "T1", key: "2"},
    {a: "ASVAL_20190312", b: "小红", c: "女", d: "财务一科", e: "T2", key: "3"}
];

class Demo0101 extends Component {
    render() {
        return (
            <Table
                columns={columns}
                data={data}
                showRowNum={true}
            />
        );
    }
}

export default Demo0101;
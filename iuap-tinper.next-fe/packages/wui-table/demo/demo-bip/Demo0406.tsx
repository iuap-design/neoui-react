/**
 *
 * @title 自定义整行和整列样式表格
 * @parent 列渲染 Custom Render
 * @description 某行或某列的样式，严格按照react的样式书写规则，即对象内每一个属性的键为小写驼峰式，值为字符串。此demo展示自定义整行或整列的背景色和字体内容颜色。
 * @type bip
 * demo0406
 */

import {Table, TableProps} from "@tinper/next-ui";
import React, {Component} from "react";

const columns: TableProps['columns'] = [
    {title: "员工编号", dataIndex: "a", key: "a", width: 150},
    {title: "员工姓名", dataIndex: "b", key: "b", width: 100},
    {title: "性别", dataIndex: "c", key: "c", width: 100, style: {backgroundColor: '#e3f2fd', color: '#505F79'}},
    {title: "部门", dataIndex: "d", key: "d", width: 100},
    {title: "职级", dataIndex: "e", key: "e", width: 100}
];

const data: TableProps['data'] = [
    {
        a: "ASVAL_20190328",
        b: "小张",
        c: "男",
        d: "财务二科",
        e: "M1",
        key: "1",
        style: {backgroundColor: '#ffebee', color: '#000'}
    },
    {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务一科", e: "T1", key: "2"},
    {a: "ASVAL_20190312", b: "小红", c: "女", d: "财务一科", e: "T2", key: "3"}
];

class Demo0406 extends Component {
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

export default Demo0406

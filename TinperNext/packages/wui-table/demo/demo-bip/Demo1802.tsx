/**
 *
 * @title 填充表格
 * @description 自定义填满表格高度宽度。
 * @type bip
 * demo1802
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

const data1: TableProps['data'] = [
    {a: "ASVAL_20190328", b: "小张", c: "男", d: "财务二科", e: "M1", key: "1"},
    {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务一科", e: "T1", key: "2"},
    {a: "ASVAL_20190312", b: "小红", c: "女", d: "财务一科", e: "T2", key: "3"},
    {a: "ASVAL_20190301", b: "小张", c: "男", d: "财务二科", e: "M1", key: "4"},
    {a: "ASVAL_20190302", b: "小明", c: "男", d: "财务一科", e: "T1", key: "5"},
    {a: "ASVAL_20190303", b: "小红", c: "女", d: "财务一科", e: "T2", key: "6"},
    {a: "ASVAL_20190304", b: "小张", c: "男", d: "财务二科", e: "M1", key: "7"},
    {a: "ASVAL_20190305", b: "小明", c: "男", d: "财务一科", e: "T1", key: "8"},
    {a: "ASVAL_20190306", b: "小红", c: "女", d: "财务一科", e: "T2", key: "9"},
    {a: "ASVAL_20190307", b: "小张", c: "男", d: "财务二科", e: "M1", key: "10"},
    {a: "ASVAL_20190308", b: "小明", c: "男", d: "财务一科", e: "T1", key: "11"},
    {a: "ASVAL_20190309", b: "小红", c: "女", d: "财务一科", e: "T2", key: "12"}
];

class Demo1802 extends Component {
    render() {
        return (
            <div style={{height: '400px'}}>
                <div style={{height: '200px'}}>
                    <Table
                        columns={columns}
                        data={data}
                        fillSpace={true}
                        showRowNum={true}
                    />
                </div>
                <div style={{height: '200px'}}>
                    <Table
                        columns={columns}
                        data={data1}
                        fillSpace={true}
                        showRowNum={true}
                    />
                </div>
            </div>

        );
    }
}

export default Demo1802;
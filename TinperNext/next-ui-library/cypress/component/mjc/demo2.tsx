
import { Table } from "../../../../packages";
import React, { Component } from "react";
const data = [
    { a: "ASVAL_201903280005", b: "小张", c: false, d: "财务二科", e: "M1", key: "1001", children: [
            { a: "ASVAL_201903200004", b: "小明", c: false, d: "财务一科", e: "T1", key: "1002" },
            { a: "ASVAL_201903120001", b: "小红", c: false, d: "财务四科", e: "T3", key: "1003"},
            { a: "ASVAL_201903120002", b: "小姚", c: false, d: "财务一科", e: "T2", key: "1004", children: [] },
        ] },
    { a: "ASVAL_201903120003", b: "小岳", c: false, d: "财务五科", e: "T2", key: "1005", children: [
            { a: "ASVAL_201903120004", b: "小王", c: false, d: "财务一科", e: "T5", key: "1006" },
            { a: "ASVAL_201903120005", b: "小绍", c: false, d: "财务七科", e: "T2", key: "1007" },
            { a: "ASVAL_201903120006", b: "小郭", c: false, d: "财务一科", e: "T3", key: "1008" },
            { a: "ASVAL_201903120007", b: "小杨", c: false, d: "财务四科", e: "T2", key: "1009" }
        ] },
];
const columns = [
    { title: "员工编号", dataIndex: "a", key: "a", width: 150 },
    { title: "员工姓名", dataIndex: "b", key: "b", width: 200 },
    { title: "部门", dataIndex: "d", key: "d", width: 100 },
    { title: "职级", dataIndex: "e", key: "e", width: 100 }
];
class Demo38 extends Component<any, any> {
    render() {
        return (<>
	            <Table bordered={false} columns={columns} data={data} {...this.props} />
	        </>);
    }
}
export default Demo38;
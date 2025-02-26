/**
 *
 * @title 渲染本地数据
 * @parent 数据操作 Data Opetation
 * @description 可自定义页头和页脚。
 * @type bip
 * demo0301
 */

import {Table, Tooltip, TableProps} from "@tinper/next-ui";
import React, {Component} from "react";

const columns: TableProps['columns'] = [
    {
        title: "员工编号", dataIndex: "a", key: "a", width: 300, className: "rowClassName",
        fixed: 'left',
        render: (text: HTMLSpanElement, _record: Record<string, any>, _index: number) => {
            return (
                <Tooltip inverse overlay={text}>
                    <span style={{
                        display: "block",
                        width: "80px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        verticalAlign: "bottom",
                    }}>{text}</span>
                </Tooltip>
            );
        }
    },
    {title: "员工姓名", dataIndex: "b", key: "b", width: 500},
    {title: "性别", dataIndex: "c", key: "c", width: 500},
    {title: "部门", dataIndex: "d", key: "d", width: 200}
];

const data: TableProps['data'] = [
    {a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1"},
    {a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2"},
    {a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3"}
];

class Demo21 extends Component {

    constructor(props: {}) {
        super(props);
        this.state = {
            data: data
        }
    }

    render() {
        return (
            <Table
                columns={columns}
                data={data}
                title={(_currentData: Record<string, any>[]) => <div>员工信息统计表</div>}
                footer={(_currentData: Record<string, any>[]) => <div>合计: 共{data.length}条数据</div>}
            />
        );
    }
}

export default Demo21;

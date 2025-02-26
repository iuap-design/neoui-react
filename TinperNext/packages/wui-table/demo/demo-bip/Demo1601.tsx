/**
 * @title 表格+分页
 * @parent 分页 Pagination
 * @description 点击分页联动表格
 * @type bip
 * demo1601
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
    {a: "ASVAL_20190328", b: "小张", c: "男", d: "财务1科", e: "M1", key: "1"},
    {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务2科", e: "T1", key: "2"},
    {a: "ASVAL_20190312", b: "小红", c: "女", d: "财务2科", e: "T2", key: "3"}
];


[...new Array(100)].forEach((_item, index) => {
    data.push({
        a: `ASVAL_2019033${index}`,
        b: `员工${index + 1}`,
        c: `男`,
        d: `财务${index + 1}科`,
        e: `M${index + 2}`,
        key: `${4 + index}`,
    })
})

class Demo8 extends Component <{}, {data: TableProps['data'], pagination: any}> {
    dataNumSelect: ((activePage: number, pageSize: number) => void) | undefined;
    constructor(props: {}) {
        super(props);
        this.state = {
            data: data,
            pagination: {
                showSizeChanger: true,
                current: 1,
                pageSize: 10
            }
        };
    }

    onChange = (pageInfo: any) => {
        const { pagination } = this.state;
        const { current, pageSize } = pageInfo;
        this.setState({
            pagination: {
                ...pagination,
                current,
                pageSize
            }
        })
    }

    render() {

        return (
            <div className="demo8">
                <Table
                    columns={columns}
                    data={this.state.data}
                    pagination={this.state.pagination}
                    onChange={this.onChange}/>
            </div>
        );
    }
}

export default Demo8;

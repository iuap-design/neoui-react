/**
 *
 * @title 默认无数据展示
 * @parent 基础 Basic
 * @description 无数据时默认展示图标，可在`emptyText`方法中自定义展示内容。
 * @type bip
 * demo0102
 */


import {Table, TableProps, Switch} from "@tinper/next-ui";
import React, {Component} from 'react';

const columns: TableProps['columns'] = [
    {
        title: "员工编号",
        dataIndex: "num",
        key: "num",
        width: "40%"
    },
    {
        title: "员工姓名",
        dataIndex: "name",
        key: "name",
        width: "30%"
    },
    {
        title: "部门",
        dataIndex: "department",
        key: "department"
    }
];

const data: TableProps['data'] = [];

class Demo02 extends Component<{}, { easyAble: boolean}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            easyAble: false
        }
    }

    onChange = () => {
        this.setState({
            easyAble: !this.state.easyAble
        })
    }

    render() {
        const { easyAble } = this.state;
        return (
            <>
                <div style={{ paddingBottom: '15px' }}>简洁模式: <Switch checked={this.state.easyAble} onChange={this.onChange}/></div>
                <Table
                    columns={columns}
                    data={data}
                    bodyStyle={{height: easyAble ? '130px' : '400px'}}
                    fieldid='abc'
                />
            </>
        )
    }
}

export default Demo02;

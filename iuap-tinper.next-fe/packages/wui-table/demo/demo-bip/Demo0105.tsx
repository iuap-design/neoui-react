/**
 *
 * @title 表格 Loading 加载
 * @parent 基础 Basic
 * @description loading可以传boolean或者object对象，object为bee-loading组件的参数类型
 * @type bip
 * demo0105
 */

import {Button, Table, TableProps} from "@tinper/next-ui";
import React, {Component} from "react";

const columns05: TableProps['columns'] = [
    {title: "员工编号", dataIndex: "a", key: "a", width: 300, className: "rowClassName", fixed: 'left'},
    {title: "员工姓名", dataIndex: "b", key: "b", width: 500},
    {title: "性别", dataIndex: "c", key: "c", width: 500},
    {title: "部门", dataIndex: "d", key: "d", width: 200}
];

const data05: TableProps['data'] = [
    {a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1"},
    {a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2"},
    {a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3"}
];

interface StateProps {

}
interface StateInter {
	loading: boolean
}

class Demo05 extends Component<StateProps, StateInter> {
    constructor(props: StateProps) {
        super(props);
        this.state = {
            loading: true
        }
    }

	changeLoading = () => {
	    this.setState({
	        loading: !this.state.loading
	    })
	}

	render() {
	    return (
	        <div>
	            <Button
	                className="editable-add-btn"
	                onClick={this.changeLoading}
	            >
					切换loading
	            </Button>
	            <Table
	                columns={columns05}
	                data={data05}
	                // loading={this.state.loading}或者是boolean
	                loading={{spinning: this.state.loading}}
	            />
	        </div>
	    );
	}
}

export default Demo05;

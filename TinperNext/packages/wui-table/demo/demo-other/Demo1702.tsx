/**
 *
 * @title 树形数据或扩展行展开图标显示
 * @description `showExpandIcon`参数设置是否展示展开行icon(优先级高于haveExpandIcon)。注意：`haveExpandIcon`在 `expandedRowRender` 下语义话相反，推荐后续使用showExpandIcon替代。
 * @type other
 * Demo1701
 */

import { Table, Button, TableProps} from "@tinper/next-ui";
import React, {Component} from "react";
type DefaultRecordType = Record<string, any>;

const data: TableProps['data'] = [
    {a: "ASVAL_201903280005", b: "小张", c: false, d: "财务二科", e: "M1", key: "1001", children: [
        {a: "ASVAL_201903200004", b: "小明", c: false, d: "财务一科", e: "T1", key: "1002"},
        {a: "ASVAL_201903120001", b: "小红", c: false, d: "财务四科", e: "T3", key: "1003", children: [
            {a: "ASVAL_201903120001", b: "小红", c: false, d: "财务四科", e: "T3", key: "10031"}
        ]},
        {a: "ASVAL_201903120002", b: "小姚", c: false, d: "财务一科", e: "T2", key: "1004", children: []},
    ]},

    {a: "ASVAL_201903120003", b: "小岳", c: false, d: "财务五科", e: "T2", key: "1005", children: [
        {a: "ASVAL_201903120004", b: "小王", c: false, d: "财务一科", e: "T5", key: "1006"},
        {a: "ASVAL_201903120005", b: "小绍", c: false, d: "财务七科", e: "T2", key: "1007"},
        {a: "ASVAL_201903120006", b: "小郭", c: false, d: "财务一科", e: "T3", key: "1008"},
        {a: "ASVAL_201903120007", b: "小杨", c: false, d: "财务四科", e: "T2", key: "1009"}
    ]},

];

const columns: TableProps['columns'] = [
    {title: "员工编号", dataIndex: "a", key: "a", width: 150},
    {title: "员工姓名", dataIndex: "b", key: "b", width: 200},
    {title: "部门", dataIndex: "d", key: "d", width: 100},
    {title: "职级", dataIndex: "e", key: "e", width: 100}
]

interface Demo38State {
	flag: number;
	data: TableProps['data'],
	expandedRowKeys: string[]
}

class Demo38 extends Component<{}, Demo38State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            flag: 1,
            data: data,
            expandedRowKeys: ['1001']
        }
    }

	handleChange = (_record: DefaultRecordType, index: number, checked: boolean) => {
	    let data = this.state.data.map((item, _index) => {
	        if (index === _index) {
	            item.c = checked
	        }
	        return item
	    })
	    this.setState({data})
	}

	setShowExpandIcon1 = () => {
	    this.setState({
	        flag: 1
	    })
	}

	setShowExpandIcon2 = () => {
	    this.setState({
	        flag: 2
	    })
	}

	setShowExpandIcon3 = () => {
	    this.setState({
	        flag: 3
	    })
	}

	onExpandAll = (expanded: boolean, expandedRowKeys: string[]) => {
	    console.log("onExpandAll", expanded, expandedRowKeys)
	    this.setState({expandedRowKeys})
	}

	render() {
	    const { flag = 1 } = this.state;
	    let showExpandIcon = (_record: DefaultRecordType, _index: number) => {
	        if (_record.key === '1001') {
	            return true
	        }
	        return false
	    }
	    let _showExpandIcon = flag === 1 ? true : flag === 2 ? false : showExpandIcon;


	    const expandable = {
	        columnTitle: <span style={{color: 'red'}}>test</span>,
	        showExpandIcon: _showExpandIcon,
	        showHeaderExpandIcon: true,
	        onExpandAll: this.onExpandAll,
	        expandedRowKeys: this.state.expandedRowKeys
	    }
	    return (
	        <>
	            <div style={{paddingBottom: '15px'}}>
					showExpandIcon: <Button colors="primary" style={{margin: 'auto 5px'}} onClick={this.setShowExpandIcon1}>true</Button>
	                <Button colors="danger" style={{margin: 'auto 5px'}} onClick={this.setShowExpandIcon2}>false</Button>
	                <Button colors="info" style={{margin: 'auto 5px'}} onClick={this.setShowExpandIcon3}>showExpandIcon函数</Button>
	            </div>
	            <Table
	                bordered={false}
	                columns={columns}
	                data={this.state.data}
	                expandable={expandable}
	            />
	        </>
	    );
	}
}

export default Demo38;

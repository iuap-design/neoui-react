/**
 *
 * @title 拖拽改变行顺序
 * @parent 行操作-拖拽
 * @description `rowDraggAble`参数设置是否使用行交换顺序功能，`useDragHandle`设置拖拽把手，`onDropRow` 是拖拽行后的回调函数。注意：表格行数据必须有唯一标识，可以通过 `data.key` 或 `rowKey` 两种方式传入。
 * @type other
 * Demo1201
 */

import {Switch, Table, TableProps} from "@tinper/next-ui";
import React, {Component} from "react";
type DefaultRecordType = Record<string, any>;

const data1: TableProps['data'] = [
    {a: "ASVAL_201903280005", b: "小张", c: true, d: "财务二科", e: "M1", key: "1001"},
    {a: "ASVAL_201903200004", b: "小明", c: false, d: "财务一科", e: "T1", key: "1002"},
    {a: "ASVAL_201903120001", b: "小红", c: true, d: "财务四科", e: "T3", key: "1003"},
    {a: "ASVAL_201903120002", b: "小姚", c: false, d: "财务一科", e: "T2", key: "1004"},
    {a: "ASVAL_201903120003", b: "小岳", c: false, d: "财务五科", e: "T2", key: "1005"},
    {a: "ASVAL_201903120004", b: "小王", c: false, d: "财务一科", e: "T5", key: "1006"},
    {a: "ASVAL_201903120005", b: "小绍", c: false, d: "财务七科", e: "T2", key: "1007"},
    {a: "ASVAL_201903120006", b: "小郭", c: false, d: "财务一科", e: "T3", key: "1008"},
    {a: "ASVAL_201903120007", b: "小杨", c: false, d: "财务四科", e: "T2", key: "1009"}
];

const data2: TableProps['data'] = [
    {a: "ASVAL_201903280005", b: "条目1", c: true, d: "财务二科", e: "M1", key: "1001", children: [
        {a: "ASVAL_201903200004", b: "条目11", c: false, d: "财务一科", e: "T1", key: "10011"},
        {a: "ASVAL_201903120001", b: "条目12", c: false, d: "财务四科", e: "T3", key: "10012"},
        {a: "ASVAL_201903120002", b: "条目13", c: false, d: "财务一科", e: "T2", key: "10013", children: [
            {a: "ASVAL_201903120001", b: "条目131", c: false, d: "财务四科", e: "T3", key: "100131"},
            {a: "ASVAL_201903120001", b: "条目132", c: false, d: "财务四科", e: "T3", key: "100132"},
        ]},
    ]},
    {a: "ASVAL_201903120003", b: "条目2", c: true, d: "财务五科", e: "T2", key: "1002", children: [
        {a: "ASVAL_201903120004", b: "条目21", c: false, d: "财务一科", e: "T5", key: "10021"},
        {a: "ASVAL_201903120005", b: "条目22", c: false, d: "财务七科", e: "T2", key: "10022"},
        {a: "ASVAL_201903120006", b: "条目23", c: false, d: "财务一科", e: "T3", key: "10023"},
        {a: "ASVAL_201903120007", b: "条目24", c: false, d: "财务四科", e: "T2", key: "10024"}
    ]},

];

interface Demo38State {
	data: TableProps['data'];
	isTree: boolean;
}

class Demo38 extends Component<{}, Demo38State> {
	currentRecord: DefaultRecordType | undefined;
	currentIndex: number | undefined;
	columns: TableProps['columns']
	constructor(props: {}) {
	    super(props);
	    this.state = {
	        data: data1,
	        isTree: false
	    }
	    this.columns = [
	        {title: "员工编号", dataIndex: "a", key: "a", width: 150},
	        {title: "员工姓名", dataIndex: "b", key: "b", width: 200},
	        {
	            title: "系统权限", dataIndex: "c", key: "c", width: 200, render: (text: any, _record: DefaultRecordType, _index: number) => {
	                return text ? '管理员' : '用户'
	            }
	        },
	        {title: "部门", dataIndex: "d", key: "d", width: 100},
	        {title: "职级", dataIndex: "e", key: "e", width: 100}
	    ];
	}

	handleClick = () => {
	    console.log('这是第', this.currentIndex, '行');
	    console.log('内容：', this.currentRecord);
	}

	/**
	 * 行拖拽开始时触发
	 * @param record 拖拽行的数据
	 * @param index 拖拽行的下标序号
	 */
	onDragRowStart = (record: DefaultRecordType, index: number) => {
	    console.log('拖拽的行数据：', record);
	    console.log('拖拽的行序号：', index);
	}

	/**
	 * 行拖拽结束时触发
	 * @param data 拖拽改变顺序后的新data数组
	 * @param record 拖拽行的数据
	 */
	onDropRow = (data: DefaultRecordType[], record: DefaultRecordType, index: number, dropRecord: DefaultRecordType, dropTargetIndex: number) => {
	    console.log('重排序后的data： ', data);
	    console.log('拖拽的行数据： ', record, index, dropRecord, dropTargetIndex);
	    this.setState({data})
	}

	onChange = (isTree: boolean) => {
	    this.setState({
	        isTree: !this.state.isTree,
	        data: isTree ? data2 : data1
	    })
	}

	render() {
	    return (
	        <>
	            <div style={{paddingBottom: '15px'}}>启用树形数据拖拽: <Switch checked={this.state.isTree} onChange={this.onChange}/></div>
	            <Table
	                bordered={false}
	                columns={this.columns}
	                data={this.state.data}
	                rowDraggAble={true}
	                // useDragHandle={true}
	                expandIconColumnIndex={this.state.isTree ? 1 : 0}
	                onDragRowStart={this.onDragRowStart}
	                onDropRow={this.onDropRow}
	            />
	        </>

	    );
	}
}

export default Demo38;

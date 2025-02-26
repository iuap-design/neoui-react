import { Table, Radio } from "../../../../packages";
import React, {Component} from "react";

const {singleSelect} = Table;

const columns: any = [
    {title: "员工编号", dataIndex: "a", key: "a", width: 300},
    {title: "员工姓名", dataIndex: "b", key: "b", width: 500},
    {title: "性别", dataIndex: "c", key: "c", width: 500},
    {title: "部门", dataIndex: "d", key: "d", width: 200}
];

const data: any = [
    {a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1"},
    {a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2"},
    {a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3"},
    {a: "ASVAL_201903280010", b: "小王", c: "女", d: "财务二科", key: "4"},
    {a: "ASVAL_201903200021", b: "小李", c: "男", d: "财务一科", key: "5"}
];

// 拼接成复杂功能的table组件不能在render中定义，需要像此例子声明在组件的外侧，不然操作state会导致功能出现异常
let SingleSelectTable = singleSelect(Table, Radio);
class Demo1302 extends Component <any, any> {

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            data: data,
            selectedRowIndex: 0,
        }
    }

	/**
	 *@param selected 当前选中的行数据(当前操作行数据)
	 *@param index 当前操作行索引
	 * @memberof Demo12
	 */
	getSelectedDataFunc: any = (record: any, index:number) => {
	    console.log("record", record, "index", index);

	    this.setState({
	        selectedRowIndex: index
	    })
	};

	render() {
	    let {selectedRowIndex} = this.state;

	    return (
	        <SingleSelectTable
	            className="demo1302"
	            bordered
	            columns={columns}
	            data={data}
	            selectedRowIndex={selectedRowIndex}
                getSelectedDataFunc={this.getSelectedDataFunc}
                {...this.props}
	        />
	    );
	}
}

export default Demo1302;
/**
 *
 * @title 多选功能
 * @parent 行操作-选择
 * @description 支持多选、全选和禁止选择。getSelectedDataFunc方法是选中行的回调函数，返回当前选中的数据数组。给data数据添加_checked参数可设置当前数据是否选中，添加_disabled参数可禁止选择当前数据。
 * @type bip
 * demo1301
 */


import {Table, TableProps, Switch} from "@tinper/next-ui";
import React, {Component} from 'react';
   type DefaultRecordType = Record<string, any>;
   type Key = React.Key;

const columns: TableProps['columns'] = [
	   {title: "员工编号", dataIndex: "a", key: "a", width: 150},
	   {title: "员工姓名", dataIndex: "b", key: "b", width: 100},
	   {title: "性别", dataIndex: "c", key: "c", width: 100},
	   {title: "部门", dataIndex: "d", key: "d", width: 100},
	   {title: "职级", dataIndex: "e", key: "e", width: 100}
];


const data: TableProps['data'] = [
	   {a: "ASVAL_20190328", b: "小张", c: "男", d: "财务1科", e: "M1", key: "1"},
	   {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务2科", e: "T1", key: "2", children: [
		   {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务2科", e: "T1", key: "221"},
		   {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务2科", e: "T1", key: "222", children: [
			   {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务2科", e: "T1", key: "2221"},
			   {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务2科", e: "T1", key: "2222"}
		   ]},
	   ]},
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
   interface Demo12State {
	   data: TableProps['data'];
	   selectedRowKeys: TableProps['selectedRowKeys'];
	   pagination: any,
	   checkStrictly: boolean
   }
class Demo12 extends Component <{}, Demo12State> {
	   constructor(props: {} | Readonly<{}>) {
		   super(props);
		   this.state = {
			   data: data,
			   selectedRowKeys: [],
			   pagination: {
				   showSizeChanger: true,
				   current: 1,
				   pageSize: 10
			   },
			   checkStrictly: false
		   };
	   }

	   /**
		*@param selectedList:当前选中的行数据
		*@param record 当前操作行数据
		*@param index 当前操作行索引
		*@param newData 进行多选操作之后的新数据 data
		* @memberof Demo12
		*/
	   getSelectedDataFunc: TableProps['getSelectedDataFunc'] = (selectedList, _record, index, newData,) => {
		   console.log("selectedList", selectedList, "index", index, 'newData', newData);
		   // 注意：需要用回调中提供的参数 newData，去更新 state 或 store 中的 data 属性值，否则当表格重新render的时候，已选数据会被冲刷掉。
	   };

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

	   checkStrictlyChange = () => {
		   this.setState({
			   checkStrictly: !this.state.checkStrictly
		   })
	   }

	   render() {
		   let rowSelection = {
			   checkStrictly: this.state.checkStrictly,
			   columnWidth: 80,
			   selectedRowKeys: this.state.selectedRowKeys,
			   getCheckboxProps: (record: DefaultRecordType) => ({
				   disabled: record.key == '221', // Column configuration not to be checked
				   name: record.b,
				   tooltip: () => {
						if (record.key == '221') {
							return '禁止选择'
						}
						if (record.key == '1') {
							return <span>第一项</span>
						}
					   	return null
				   }
			   }),
			   onChange: (selectedRowKeys: TableProps['selectedRowKeys'], selectedRows: TableProps['data']) => {
			       console.log('selectedRowKeys', selectedRowKeys, 'selectedRows', selectedRows)
			       this.setState({
			           selectedRowKeys
			       })
			   },
			   onSelectAll: (check: boolean, selectedRows: TableProps['data'], changeRows: TableProps['data']) => {
			       console.log('check', check, 'selectedRows', selectedRows, 'changeRows', changeRows)
			   },
			   selections: [
				   Table.SELECTION_ALL,
				   Table.SELECTION_INVERT,
				   Table.SELECTION_NONE,
				   {
					   key: "odd",
					   text: "Select Odd Row",
					   onSelect: (changableRowKeys: Key[]) => {
						   console.log('changableRowKeys', changableRowKeys)
					   }
				   },
				   {
					   key: "even",
					   text: "Select Even Row",
					   onSelect: (changableRowKeys: Key[]) => {
						   console.log('changableRowKeys', changableRowKeys)
					   }
				   }
			   ],
			   onSelectInvert: (selectedRowKeys: Key[]) => {
				   console.log('selectedRowKeys', selectedRowKeys)
			   },
			   onSelectNone: () => {
				   console.log('清空选择')
			   }
		   }
		   return (
			   <>
				   <div style={{ paddingBottom: '15px' }}>父子节点受控: <Switch checked={!this.state.checkStrictly} onChange={this.checkStrictlyChange}/></div>
				 <Table
				   bordered
				   columns={columns}
				   data={data}
				   rowSelection={rowSelection}
	                   //    autoCheckedByClickRows={false}
				   pagination={{}}
				   onChange={this.onChange}
				   getSelectedDataFunc={this.getSelectedDataFunc}/>
			   </>

		   );
	   }
}

export default Demo12;

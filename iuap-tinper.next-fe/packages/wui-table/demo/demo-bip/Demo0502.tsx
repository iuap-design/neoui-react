/**
 *
 * @title 单元格编辑
 * @parent 编辑 Editor
 * @description 可以对单元格进行编辑的表格，示例中给出输入框、下拉框、参照的编辑模式，以及两类校验。（通过对 coloums 配置 render 属性实现渲染不同格式的编辑态单元格）
 * @type bip
 * demo0502
 */
import {Icon, Input, Select, Table, Tooltip, TreeSelect, DatePicker, TableProps} from "@tinper/next-ui";
import React, {Component} from "react";
import moment from 'moment';
import type { KeyboardEvent } from 'react';
import type {Moment} from 'moment'

const Option = Select.Option;
const {TreeNode} = TreeSelect;
const datetimeFmt = 'YYYY-MM-DD HH:mm:ss'

class StringEditCell extends Component< {value: string, onChange: Function, colName: string}, {value: string, editable: boolean}> {
	 editWarp: any;
	 constructor(props: { value: string; onChange: Function; colName: string } | Readonly<{ value: string; onChange: Function; colName: string }>) {
		 super(props);
		 this.state = {
			 value: this.props.value,
			 editable: false
		 };
		 this.editWarp = React.createRef();
	 }

	 commitChange = () => {
		 if (this.state.value === "") return;
		 this.setState({editable: false});
		 if (this.props.onChange) {
			 this.props.onChange(this.state.value);
		 }
	 };

	 edit = () => {
		 this.setState({editable: true});
	 };

	 handleKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
		 if (event.keyCode == 13) {
			 this.commitChange();
		 }
	 };

	 handleChange = (val: string) => {
		 if (val === "") this.editWarp.className += " verify-cell";
		 this.setState({value: val});
	 };

	 render() {
		 const {value, editable} = this.state;
		 return (
			 <div className="editable-cell">
				 {editable ? (
					 <div ref={el => this.editWarp = el} className="editable-cell-input-wrapper">
						 <Input
							 className={value ? "u-form-control" : "u-form-control error"}
							 autoFocus
							 defaultValue={this.props.value}
							 value={value}
							 onKeyDown={this.handleKeydown}
							 onChange={this.handleChange}
							 onBlur={this.commitChange}
						 />
						 {value === "" ? (
							 <Tooltip
								 inverse
								 className="u-editable-table-tp"
								 placement="bottom"
								 overlay={
									 <div className="tp-content">
										 {"请输入" + this.props.colName}
									 </div>
								 }
							 >
								 <Icon className="uf-exc-t require"/>
							 </Tooltip>
						 ) : null}
					 </div>
				 ) : (
					 <div className="editable-cell-text-wrapper" onClick={this.edit}>
						 {value || " "}
					 </div>
				 )}
			 </div>
		 );
	 }
}

const SELECT_SOURCE = ["男", "女"];

class SelectEditCell extends Component< {value: string, onChange: Function, colName?: string}, {value: string, editable: boolean}> {
	 constructor(props: { value: string; onChange: Function; colName?: string } | Readonly<{ value: string; onChange: Function; colName: string }>, _context: {}) {
		 super(props);
		 this.state = {
			 value: this.props.value,
			 editable: false
		 };
	 }

	 handleSelect = (value: string) => {
		 this.setState({value});
	 };

	 commitChange = () => {
		 this.setState({editable: false});
		 if (this.props.onChange) {
			 this.props.onChange(this.state.value);
		 }
	 };

	 edit = () => {
		 this.setState({editable: true});
	 };

	 render() {
		 const {value, editable} = this.state;
		 return (
			 <div className="editable-cell">
				 {editable ? (
					 <div className="editable-cell-input-wrapper">
						 <Select
							 defaultValue={this.props.value}
							 value={value}
							 onSelect={this.handleSelect}
							 onBlur={this.commitChange}
							 autoFocus
						 >
							 {SELECT_SOURCE.map((item, index) => (
								 <Option key={index} value={item}>
									 {item}
								 </Option>
							 ))}
						 </Select>
					 </div>
				 ) : (
					 <div className="editable-cell-text-wrapper" onClick={this.edit}>
						 {value || " "}
					 </div>
				 )}
			 </div>
		 );
	 }
}

const treeData = [
	 {
		 code: "org1",
		 children: [
			 {
				 code: "bj",
				 entityType: "mainEntity",
				 name: "北京总部-简",
				 pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
				 refcode: "bj",
				 refpk: "5305416e-e7b4-4051-90bd-12d12942295b",
				 id: "5305416e-e7b4-4051-90bd-12d12942295b",
				 isLeaf: "true",
				 refname: "北京总部-简"
			 },
			 {
				 code: "xd",
				 entityType: "mainEntity",
				 name: "新道-简",
				 pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
				 refcode: "xd",
				 refpk: "b691afff-ea83-4a3f-affa-beb2be9cba52",
				 id: "b691afff-ea83-4a3f-affa-beb2be9cba52",
				 isLeaf: "true",
				 refname: "新道-简"
			 },
			 {
				 code: "yy3",
				 entityType: "mainEntity",
				 name: "test3",
				 pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
				 refcode: "yy3",
				 refpk: "e75694d9-7c00-4e9e-9573-d29465ae79a9",
				 id: "e75694d9-7c00-4e9e-9573-d29465ae79a9",
				 isLeaf: "true",
				 refname: "test3"
			 },
			 {
				 code: "yy1",
				 entityType: "mainEntity",
				 name: "test1",
				 pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
				 refcode: "yy1",
				 refpk: "fd32ceeb-57a8-4f44-816e-fa660f5715ab",
				 id: "fd32ceeb-57a8-4f44-816e-fa660f5715ab",
				 isLeaf: "true",
				 refname: "test1"
			 },
			 {
				 code: "dept2",
				 children: [
					 {
						 code: "cs",
						 entityType: "subEntity",
						 organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
						 name: "测试部-简",
						 pid: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
						 refcode: "cs",
						 refpk: "cc43a66a-438d-4106-937f-bec44406f771",
						 id: "cc43a66a-438d-4106-937f-bec44406f771",
						 isLeaf: "true",
						 refname: "测试部-简"
					 },
					 {
						 code: "qd",
						 entityType: "subEntity",
						 organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
						 name: "前端部-简",
						 pid: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
						 refcode: "qd",
						 refpk: "73a10edd-aae8-4f31-af25-1f48f0a3b344",
						 id: "73a10edd-aae8-4f31-af25-1f48f0a3b344",
						 isLeaf: "true",
						 refname: "前端部-简"
					 }
				 ],
				 entityType: "subEntity",
				 organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
				 name: "生产处",
				 refcode: "dept2",
				 refpk: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
				 id: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
				 refname: "生产处"
			 },
			 {
				 code: "dept1",
				 children: [
					 {
						 code: "dept1_2",
						 entityType: "subEntity",
						 organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
						 name: "财务二科",
						 pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
						 refcode: "dept1_2",
						 refpk: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
						 id: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
						 isLeaf: "true",
						 refname: "财务二科"
					 },
					 {
						 code: "dept1_1",
						 entityType: "subEntity",
						 organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
						 name: "财务一科",
						 pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
						 refcode: "dept1_1",
						 refpk: "9711d912-3184-4063-90c5-1facc727813c",
						 id: "9711d912-3184-4063-90c5-1facc727813c",
						 isLeaf: "true",
						 refname: "财务一科"
					 }
				 ],
				 entityType: "subEntity",
				 organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
				 name: "财务处",
				 refcode: "dept1",
				 refpk: "95b60f35-ed0b-454e-b948-fb45ae30b911",
				 id: "95b60f35-ed0b-454e-b948-fb45ae30b911",
				 refname: "财务处"
			 }
		 ],
		 entityType: "mainEntity",
		 name: "用友集团",
		 refcode: "org1",
		 refpk: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
		 id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
		 refname: "用友集团"
	 }
]

function renderTreeNode(data: Record<string, any>[]) {
	 return data.map(item => {
		 if (item.children) {
			 return <TreeNode value={item.code} data-params={item} title={item.name} key={item.id}>
				 {renderTreeNode(item.children)}
			 </TreeNode>

		 }
		 return <TreeNode value={item.code} data-params={item} title={item.name} key={item.id}></TreeNode>
	 })
}

class TreeSelectEditCell extends Component<{value: {code: string, name: string}, onChange: Function}, {value: {code: string, name: string}, editable: boolean}> {
	 refWarp: any;
	 constructor(props: { value: {code: string, name: string}; onChange: Function; } | Readonly<{ value: {code: string, name: string}; onChange: Function; }>, context: {}) {
		 super(props, context);
		 this.state = {
			 value: this.props.value,
			 editable: false
		 };
		 this.refWarp = React.createRef();
	 }

	 edit = () => {
		 this.setState({editable: true}, () => {
			 this.refWarp?.rcTreeSelect?.focus()
		 });
	 };

	 handleSelect = (_values: Record<string, any>, node: any) => {
		 this.setState({value: node['data-params']});
	 };

	 commitChange = () => {
		 this.setState({editable: false});
		 if (this.props.onChange) {
			 this.props.onChange(this.state.value);
		 }
	 };

	 render() {
		 const {value, editable} = this.state;
		 return editable ? (
			 <div className="editable-cell-input-wrapper">
				 <TreeSelect
					 ref={el => (this.refWarp = el)}
					 showSearch
					 value={this.state.value.code}
					 dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
					 placeholder="请选择"
					 treeDefaultExpandAll
					 onSelect={this.handleSelect}
					 onBlur={this.commitChange}
				 >
					 {renderTreeNode(treeData)}
				 </TreeSelect>
			 </div>
		 ) : (
			 <div className="editable-cell-text-wrapper" onClick={this.edit}>
				 {value.name || " "}
			 </div>
		 );
	 }
}

class DatePickerEditCell extends Component< {value: Moment, onChange: Function, colName?: string}, {value: Moment, open?: boolean, editable: boolean}> {
	 refWarp: any;
	 constructor(props: { value: Moment; onChange: Function; colName?: string } | Readonly<{ value: Moment; onChange: Function; colName: string }>, _context: {}) {
		 super(props)
		 this.state = {
			 value: this.props.value,
			 editable: false
		 }
		 this.refWarp = React.createRef();
	 }

	 handleChange = (value: Moment, dateString: string) => {
		 this.setState({value, editable: false})
		 const {onChange} = this.props
		 onChange && onChange(value, dateString)
	 }

	 onBlur = (_e: React.FocusEvent, _value: string | Moment) => {
		 this.setState({editable: false})
		 // const {onChange} = this.props
		 // onChange && onChange(value, dateString)
	 }

	 handleOpenChange = (open: boolean) => {
		 if (!open) {
			 this.setState({editable: false, open})
		 }
	 }

	 edit = () => {
		 this.setState({editable: true})
	 }

	 render() {
		 const {value, editable, open} = this.state
		 return editable ? (
			 <div className='editable-cell'>
				 <DatePicker
					 ref={el => (this.refWarp = el)}
					 open={open}
					 value={value}
					 showTime
					 autoFocus
					 format={datetimeFmt}
					 onChange={this.handleChange}
					 onBlur={this.onBlur}
					 onOpenChange={this.handleOpenChange}
				 />
			 </div>
		 ) : (
			 <div
				 className='editable-cell-text-wrapper'
				 style={{
					 minHeight: '28px' /* 确保日期被清空后仍可点击 */,
					 lineHeight: '28px'
				 }}
				 onClick={this.edit}
			 >
				 {value?.format?.(datetimeFmt) || ''}
			 </div>
		 )
	 }
}

const dataSource = [
	 {
		 a: "ASVAL_201903280005",
		 b: "小张",
		 c: "男",
		 d: {
			 code: "dept1_2",
			 entityType: "subEntity",
			 organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
			 name: "财务二科",
			 pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
			 refcode: "dept1_2",
			 refpk: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
			 id: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
			 isLeaf: "true",
			 refname: "财务二科"
		 },
		 e: moment().add(22, 'days'),
		 key: "1"
	 },
	 {
		 a: "ASVAL_201903200004",
		 b: "小明",
		 c: "男",
		 d: {
			 code: "dept1_2",
			 entityType: "subEntity",
			 organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
			 name: "财务二科",
			 pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
			 refcode: "dept1_2",
			 refpk: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
			 id: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
			 isLeaf: "true",
			 refname: "财务二科"
		 },
		 e: moment().add(33, 'days'),
		 key: "2"
	 },
	 {
		 a: "ASVAL_201903120002",
		 b: "小红",
		 c: "女",
		 d: {
			 code: "dept1_1",
			 entityType: "subEntity",
			 organizationId: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
			 name: "财务一科",
			 pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
			 refcode: "dept1_1",
			 refpk: "9711d912-3184-4063-90c5-1facc727813c",
			 id: "9711d912-3184-4063-90c5-1facc727813c",
			 isLeaf: "true",
			 refname: "财务一科"
		 },
		 e: moment(),
		 key: "3"
	 }
];

class Demo0502 extends Component<{}, {dataSource: Record<string, any>[]}> {
	 columns: TableProps['columns'] | undefined;
	 constructor(props: {}, _context: {}) {
		 super(props);
		 this.columns = [
			 {
				 title: "员工编号",
				 dataIndex: "a",
				 key: "a"
			 },
			 {
				 title: "名字",
				 dataIndex: "b",
				 key: "b",
				 render: (text: string, _record: Record<string, any>, index: number) => (
					 <StringEditCell
						 colName="名字"
						 value={text}
						 onChange={this.onCellChange(index, "b")}
					 />
				 )
			 },
			 {
				 title: "性别",
				 dataIndex: "c",
				 key: "c",
				 width: 100,
				 render: (text: string, _record: Record<string, any>, index: number) => (
					 <SelectEditCell
						 value={text}
						 onChange={this.onCellChange(index, "c")}
					 />
				 )
			 },
			 {
				 title: "部门",
				 dataIndex: "d",
				 key: "d",
				 width: 215,
				 render: (_text: string, record: Record<string, any>, index: number) => (
					 <TreeSelectEditCell
						 value={record.d}
						 onChange={this.onCellChange(index, "d")}
					 />
				 )
			 },
			 {
				 title: "时间",
				 dataIndex: "e",
				 key: "e",
				 width: 215,
				 render: (text: Moment, _record: Record<string, any>, index: number) => (
					 <DatePickerEditCell
						 value={text}
						 onChange={this.onCellChange(index, 'e')}
					 />
				 )
			 }
		 ];

		 this.state = {
			 dataSource: dataSource
		 };
	 }

	 onCellChange = (index: number, key: string) => {
		 return (value: Moment) => {
			 const {dataSource} = this.state;
			 dataSource[index][key] = value;
			 this.setState({dataSource}, () => console.dir(this.state.dataSource));
		 };
	 };

	 render() {
		 return (
			 <div className="demo0502 u-editable-table">
				 <Table data={this.state.dataSource} columns={this.columns} syncHover={false}/>
			 </div>
		 );
	 }
}

export default Demo0502;

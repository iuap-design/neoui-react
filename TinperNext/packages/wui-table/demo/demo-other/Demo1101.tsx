/**
 *
 * @title 嵌套子表格
 * @parent 扩展行 Expanded Row
 * @description 通过expandedRowRender参数来实现子表格。收起和展开的图标可自定义传入。注意：多选功能和嵌套表格一起使用时，需要设置 expandIconAsCell={true}，把展开按钮放在单元格中展示。
 * @type other
 * demo1101
 */

import {Checkbox, Popconfirm, Table, TableProps, Switch} from '@tinper/next-ui';
import React, {Component} from "react";
type DefaultRecordType = Record<string, any>;

const {multiSelect} = Table;

const columns17: TableProps['columns'] = [
    {title: "订单编号", dataIndex: "a", key: "a", width: 100},
    {title: "单据日期", dataIndex: "b", key: "b", width: 100},
    {title: "供应商", dataIndex: "c", key: "c", width: 200}
];

const data16: TableProps['data'] = [
    {a: "NU0391001", b: "2019-03-01", c: "xx供应商", d: "操作", key: "1"},
    {a: "NU0391002", b: "2018-11-02", c: "yy供应商", d: "操作", key: "2"},
    {a: "NU0391003", b: "2019-05-03", c: "zz供应商", d: "操作", key: "3"}
];
for (let i = 4; i <= 50; i++) {
    data16.push({a: "NU0391_" + i, b: "2019-03-01", c: "xx供应商", d: "操作", key: +i})
}
const MultiSelectTable = multiSelect(Table, Checkbox);

interface Demo16State {
	tableData: TableProps['data'];
	dataObj: DefaultRecordType;
	showExpandColumn: boolean,
	expandableFixed: boolean | 'left',
}

class Demo16 extends Component<{}, Demo16State> {
    constructor(props: {}) {
	    super(props);
	    this.state = {
	        tableData: data16,
	        dataObj: {},
            showExpandColumn: true,
            expandableFixed: 'left',
	    };
    }

	expandedRowRender = (record: DefaultRecordType, _index: number, _indent: number) => {
	    return (
	        <Table
	            columns={columns17}
	            data={this.state.dataObj[record.key]}
	        />
	    );
	};
	onExpandAll = (expanded: boolean) => {
	    let newObj = {
	        '1': [
	            {a: "NU0391056", b: "2019-03-01", c: "gys1", d: "操作", key: "1"},
	            {a: "NU0391057", b: "2018-11-02", c: "gys2", d: "操作", key: "2"},
	        ],
	        '2': [{a: "NU0391079", b: "2019-04-17", c: "gys5", d: "操作", key: "3"}],
	        '3': [{a: "NU0391079", b: "2019-04-17", c: "gys5", d: "操作", key: "3"}],
	        '4': [{a: "NU0391079", b: "2019-04-17", c: "gys5", d: "操作", key: "3"}],
	        '5': [{a: "NU0391079", b: "2019-04-17", c: "gys5", d: "操作", key: "3"}],
	        '6': [{a: "NU0391079", b: "2019-04-17", c: "gys5", d: "操作", key: "3"}],
	    }
	    for (let i = 0; i < 50; i++) {
	        if (i > 1) {
	            newObj[`${i}`] = [{a: "NU0391079", b: "2019-04-17", c: "gys5", d: "操作", key: "3"}]
	        }
	    }
	    this.setState({
	        dataObj: newObj
	    })
	}
	getData = (expanded: boolean, record: DefaultRecordType) => {
	    // 当点击展开的时候才去请求数据
	    let newObj = Object.assign({}, this.state.dataObj);
	    if (expanded) {
	        if (record.key === '1') {
	            newObj[record.key] = [
	                {a: "NU0391056", b: "2019-03-01", c: "gys1", d: "操作", key: "1"},
	                {a: "NU0391057", b: "2018-11-02", c: "gys2", d: "操作", key: "2"},
	            ]
	            this.setState({
	                dataObj: newObj
	            })
	        } else {
	            newObj[record.key] = [
	                {a: "NU0391079", b: "2019-04-17", c: "gys5", d: "操作", key: "3"},
	            ]
	            this.setState({
	                dataObj: newObj
	            })
	        }
	    }
	}

	haveExpandIcon = (_record: DefaultRecordType, index: number) => {
	    // 控制是否显示行展开icon，该参数只有在和expandedRowRender同时使用才生效
	    if (index == 0) {
	        return true;
	    }
	    return false;
	}
	getSelectedDataFunc = (_selectList: TableProps['data'], _record: DefaultRecordType, _index:number, data: TableProps['data']) => {
	    this.setState({tableData: data})
	}

	showChange = () => {
	    this.setState({
	        showExpandColumn: !this.state.showExpandColumn
	    })
	}

	fixedChange = () => {
	    this.setState({
	        expandableFixed: this.state.expandableFixed === 'left' ? false : 'left'
	    })
	}

	render() {
	    const columns16: TableProps['columns'] = [
	        {
	            title: "操作",
	            dataIndex: "d",
	            key: "d",
	            width: 100,
	            render: (_text: any, _record: DefaultRecordType, index: number) =>{
	                return (
	                    <div className="demo-popover-wrapper">
	                        <Popconfirm trigger="click" getPopupContainer={() => document.querySelector('.expanded-table .wui-table-body')} placement="right" content={'这是第' + (index + 1) + '行'}>
	                            <a href="javascript:void(0);">
									一些操作
	                            </a>
	                        </Popconfirm>
	                    </div>
	                );
	            }
	        },
	        {title: "订单编号", dataIndex: "a", key: "a", width: 250},
	        {title: "单据日期", dataIndex: "b", key: "b", width: 100},
	        {title: "供应商", dataIndex: "c", key: "c", width: 200, fixed: 'right'},

	    ];
	    const expandable = {
	        onExpand: this.getData,
	        expandedRowRender: this.expandedRowRender,
	        expandIconAsCell: true,
	        onExpandAll: this.onExpandAll,
	        showExpandColumn: this.state.showExpandColumn,
	        fixed: this.state.expandableFixed
	    }
	    return (
	        <>
	            <div style={{ paddingBottom: '15px' }}>显示扩展icon列: <Switch checked={this.state.showExpandColumn} onChange={this.showChange}/> 扩展icon列左固定: <Switch checked={!!this.state.expandableFixed} onChange={this.fixedChange}/></div>
	            <MultiSelectTable
	                className="expanded-table"
	                columns={columns16}
	                data={this.state.tableData}
	                scroll={{y: 350}}
	                autoCheckedByClickRows={false}
	                getSelectedDataFunc={this.getSelectedDataFunc}
	                expandable={expandable}
	            />
	        </>

	    );
	}
}

export default Demo16;

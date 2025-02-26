/**
 *
 * @title 数据关联
 * @parent 列渲染 Custom Render
 * @description 数据行关联自定义菜单显示
 * @type bip
 * demo0404
 */

import {Checkbox, Dropdown, Icon, Menu, Table, MenuProps, TableProps} from "@tinper/next-ui";
import React, {Component} from 'react';
type DefaultRecordType = Record<string, any>;

const {multiSelect, sort} = Table;

const {Item} = Menu;

const data: TableProps['data'] = [
    {
        num: "NU0391025",
        name: "aa",
        sex: "男",
        dept: '财务二科',
        rank: "T1",
        year: "1",
        seniority: "1",
        key: "1"
    },
    {
        num: "NU0391026",
        name: "bb",
        sex: "女",
        dept: '财务一科',
        rank: "M1",
        year: "1",
        seniority: "1",
        key: "2"
    },
    {
        num: "NU0391027",
        name: "dd",
        sex: "女",
        dept: '财务一科',
        rank: "T2",
        year: "2",
        seniority: "2",
        key: "3"
    }
];

const MultiSelectTable = multiSelect(Table, Checkbox);
const ComplexTable = sort(MultiSelectTable);
class Demo13 extends Component {
    constructor(props: {}) {
        super(props);
    }

	getSelectedDataFunc = (data: TableProps['data']) => {
	    console.log(data);
	}
	onSelect: MenuProps['onSelect'] = (item) => {
	    console.log(item);
	}

	render() {
	    const menu1 = (
	        <Menu
	            onSelect={this.onSelect}>
	            <Item key="1">模态弹出</Item>
	            <Item key="2">链接跳转</Item>
	            <Item key="3">打开新页</Item>
	        </Menu>);
	    let columns: TableProps['columns'] = [
	        {
	            title: "关联", dataIndex: "link", key: "link", width: 80,
	            render: (_text: any, _record: DefaultRecordType, _index: number) => {
	                return (
	                    <Dropdown
	                        trigger={['click']}
	                        overlay={menu1}
	                        animation="slide-up"
	                    >
	                        <Icon type="uf-link" style={{color: 'rgb(0, 72, 152)', fontSize: '12px'}}></Icon>
	                    </Dropdown>
	                )
	            }
	        },
	        {title: "员工编号", dataIndex: "num", key: "num", width: 200},
	        {title: "员工姓名", dataIndex: "name", key: "name", width: 200},
	        {title: "员工性别", dataIndex: "sex", key: "sex", width: 200},
	        {title: "部门", dataIndex: "dept", key: "dept", width: 200},
	        {title: "职级", dataIndex: "rank", key: "rank", width: 200},
	        {title: "工龄", dataIndex: "year", key: "year", width: 200},
	        {title: "司龄", dataIndex: "seniority", key: "seniority", width: 200}
	    ];
	    return <ComplexTable
	        bordered
	        columns={columns}
	        data={data}
	        rowSelection={{type: "checkbox"}}
	        getSelectedDataFunc={this.getSelectedDataFunc}
	        autoCheckedByClickRows={false} // 行点击是否触发勾选动作
	    />
	}
}

export default Demo13;

/**
 *
 * @title 动态设置列锁定、解除锁定
 * @parent 列操作-锁定 Fixed
 * @description 动态设置columns中数据的fixed属性值【fixed: "left"，fixed: "right"】。
 * @type other
 * demo0603
 */
import {Dropdown, Icon, Menu, Table, TableProps, ColumnType} from "@tinper/next-ui";
import React, {Component} from 'react';
type DefaultRecordType = Record<string, any>;
interface MenuInfo {
    key: string;
    keyPath: string[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}
interface SelectInfo extends MenuInfo {
    selectedKeys: string[];
}

const {Item} = Menu;

const columns: TableProps['columns'] = [
    {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 85,
        fixed: 'left',
        render(_text:any, _record: DefaultRecordType, index: number) {
            return index + 1
        }
    },
    {
        title: "订单编号",
        dataIndex: "orderCode",
        key: "orderCode",
        width: 120,
        fixed: 'left',
    },
    {
        title: "供应商名称",
        dataIndex: "supplierName",
        key: "supplierName",
        width: 150
    },
    {
        title: "类型",
        dataIndex: "typeName",
        key: "typeName",
        width: 100
    },
    {
        title: "采购组织",
        dataIndex: "purchasing",
        key: "purchasing",
        width: 100
    },
    {
        title: "采购组",
        dataIndex: "purchasingGroup",
        key: "purchasingGroup",
        width: 100
    },
    {
        title: "凭证日期",
        dataIndex: "voucherDate",
        key: "voucherDate",
        width: 200,

    },
    {
        title: "审批状态",
        dataIndex: "approvalStateName",
        key: "approvalStateName",
        width: 100
    },
    {
        title: "确认状态",
        dataIndex: "confirmStateName",
        key: "confirmStateName",
        width: 100
    },
    {
        title: "关闭状态",
        dataIndex: "closeStateName",
        key: "closeStateName",
        width: 100
    }
];

const data: TableProps['data'] = [
    {
        orderCode: "NU0391025",
        supplierName: "xx供应商",
        typeName: "1",
        purchasing: '组织c',
        purchasingGroup: "aa",
        voucherDate: "2018年03月18日",
        approvalStateName: "已审批",
        confirmStateName: "执行中",
        closeStateName: "未关闭",
        key: "1"
    },
    {
        orderCode: "NU0391026",
        supplierName: "xx供应商",
        typeName: "2",
        purchasing: '组织a',
        purchasingGroup: "bb",
        voucherDate: "2018年02月05日",
        approvalStateName: "已审批",
        confirmStateName: "待确认",
        closeStateName: "未关闭",
        key: "2"
    },
    {
        orderCode: "NU0391027",
        supplierName: "xx供应商",
        typeName: "3",
        purchasing: '组织b',
        purchasingGroup: "aa",
        voucherDate: "2018年07月01日",
        approvalStateName: "已审批",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "3"
    }
];

interface Demo24State {
    columns: TableProps['columns']
}

class Demo24 extends Component<{}, Demo24State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            columns: columns
        }
    }

	onSelect = ({key}: SelectInfo) => {
	    let {columns} = this.state;
	    let fixedCols: TableProps['columns'] = [];
	    let nonColums: TableProps['columns'] = [];
	    columns.find(da => {
	        if (da.key == key) {
	            da.fixed ? delete da.fixed : da.fixed = 'left';
	        }
	        da.fixed ? fixedCols.push(da) : nonColums.push(da);
	    });

	    columns = [...fixedCols, ...nonColums]

	    this.setState({
	        columns
	    });
	}

	// 表头增加下拉菜单
	renderColumnsDropdown(columns: TableProps['columns']) {
	    const icon = 'uf-arrow-down';

	    return columns.map((originColumn: ColumnType, index: number) => {
	        let column = Object.assign({}, originColumn);
	        let menuInfo = [], title = '锁定';
	        if (originColumn.fixed) {
	            title = '解锁'
	        }
	        menuInfo.push({
	            info: title,
	            key: originColumn.key,
	            index: index
	        });
	        const menu = (
	            <Menu onSelect={this.onSelect}>{
	                menuInfo.map(da => {
	                    return <Item key={da.key}>{da.info}</Item>
	                })
	            }
	            </Menu>)
	        column.title = (
	            <span className='title-con drop-menu'>
	                {column.title}
	                <Dropdown
	                    trigger={['click']}
	                    overlay={menu}
	                    animation="slide-up"
	                >
	                    <Icon type={icon}/>
	                </Dropdown>

	            </span>
	        );
	        return column;
	    });

	}

	render() {
	    let {columns} = this.state;
	    columns = this.renderColumnsDropdown(columns);
	    return (
	        <div className="demo24">
	            <Table columns={columns} data={data} scroll={{x: "110%", y: 240}}/>
	        </div>
	    )
	}
}

export default Demo24;

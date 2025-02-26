/**
 *
 * @title 列过滤面板
 * @parent 列操作-隐藏 Hide
 * @description 点击表头右侧按钮，设置显示或隐藏表格列。可以自定义设置显示某列，通过ifshow属性控制，默认值为true（显示表格所有列）。afterFilter方法为列过滤后触发的回调函数。
 * @type bip
 * demo0802
 */


import { TableProps, Table} from "@tinper/next-ui";
import React, {Component} from 'react';

const {filterColumn} = Table;

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

const FilterColumnTable = filterColumn(Table);

const defaultProps21 = {
    prefixCls: "bee-table"
};
interface Demo21State {
    columns?:TableProps['columns'];
    columns21?:TableProps['columns'];
}
class Demo21 extends Component <{}, Demo21State> {
    static defaultProps: { prefixCls: string; };
    constructor(props:{}) {
        super(props);
        this.state = {
            columns: [
                {
                    title: "序号",
                    dataIndex: "index",
                    key: "index",
                    width: 80,
                    fixed: 'left',
                    render(_text:any, _record: Record<string, any>, index: number) {
                        return index + 1
                    }
                },
                {
                    title: "订单编号",
                    dataIndex: "orderCode",
                    key: "orderCode",
                    width: 100,
                    fixed: 'left',
                    required: true
                },
                {
                    title: "供应商名称",
                    dataIndex: "supplierName",
                    key: "supplierName",
                    width: 150,
                    required: true
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
                    width: 300
                },
                {
                    title: "单据日期",
                    dataIndex: "voucherDate",
                    key: "voucherDate",
                    width: 350
                },
                {
                    title: "审批状态",
                    dataIndex: "approvalStateName",
                    key: "approvalStateName",
                    width: 350
                }
            ]
        };
    }

	afterFilter = (_optData:TableProps['columns'], columns:TableProps['columns']) => {
	    this.setState({
	        columns21: columns
	    });
	}

	render() {
	    return <FilterColumnTable
	        columns={this.state.columns}
	        data={data}
	        afterFilter={this.afterFilter}
	    />;
	}
}

Demo21.defaultProps = defaultProps21;
export default Demo21;

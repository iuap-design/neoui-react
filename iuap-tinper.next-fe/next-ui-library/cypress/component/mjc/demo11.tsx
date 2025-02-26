import { Table, Popover } from "../../../../packages";
import React, {Component} from 'react';

const {filterColumn} = Table;

const data: any = [
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
        purchasingGroup1: "aa",
        voucherDate1: "2018年03月18日",
        approvalStateName1: "已审批",
        confirmStateName1: "执行中",
        closeStateName1: "未关闭",
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
        purchasingGroup1: "aa",
        voucherDate1: "2018年03月18日",
        approvalStateName1: "已审批",
        confirmStateName1: "执行中",
        closeStateName1: "未关闭",
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
        purchasingGroup1: "aa",
        voucherDate1: "2018年03月18日",
        approvalStateName1: "已审批",
        confirmStateName1: "执行中",
        closeStateName1: "未关闭",
        key: "3"
    }
];

const FilterColumnTable = filterColumn(Table, Popover);

const defaultProps21 = {
    prefixCls: "bee-table"
};
class Demo21 extends Component <any, any> {
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
                },
                {
                    title: "采购组",
                    dataIndex: "purchasingGroup1",
                    key: "purchasingGroup1",
                    width: 100
                },
                {
                    title: "凭证日期",
                    dataIndex: "voucherDate1",
                    key: "voucherDate1",
                    width: 200,
            
                },
                {
                    title: "审批状态1",
                    dataIndex: "approvalStateName1",
                    key: "approvalStateName1",
                    width: 100
                },
                {
                    title: "确认状态",
                    dataIndex: "confirmStateName1",
                    key: "confirmStateName1",
                    width: 100
                },
                {
                    title: "关闭状态",
                    dataIndex: "closeStateName1",
                    key: "closeStateName1",
                    width: 100
                }
            ]
        };
    }

	afterFilter = (_optData:any, columns:any) => {
	    this.setState({
	        columns21: columns,
	        // showFilterPopover: true
	    });
	}

	render() {
	    return <FilterColumnTable
	        columns={this.state.columns}
	        data={data}
	        afterFilter={this.afterFilter}
            showFilterPopover={this.state.showFilterPopover}
            {...this.props}
	    />;
	}
}

Demo21.defaultProps = defaultProps21;
export default Demo21;
/**
 *
 * @title 单列过滤面板
 * @parent 单列过滤 singleFilter
 * @description 单列过滤 singleFilter，点击表头过滤按钮，可以选择过滤数据
 * @type bip
 * demo0802
 */


import {Table, TableProps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {singleFilter} = Table;

const data: TableProps['data'] = [
    {
        orderCode: "NU0391025",
        supplierName: "xx供应商",
        typeName: "1",
        purchasing: '组织c',
        purchasingGroup: "aa",
        voucherDate: "2018年03月18日",
        approvalStateName: "",
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
        approvalStateName: "未审批",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "3"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx供应商",
        typeName: "4",
        purchasing: '组织d',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        approvalStateName: "",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "4"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx供应商",
        typeName: "5",
        purchasing: '组织e',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        approvalStateName: "",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "5"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx供应商",
        typeName: "6",
        purchasing: '组织f',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        approvalStateName: "",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "6"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx供应商",
        typeName: '7',
        purchasing: '组织g',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        approvalStateName: "",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "7"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx供应商",
        typeName: '8',
        purchasing: '组织h',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "8"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx供应商",
        typeName: '0',
        purchasing: '组织k',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "0"
    }
];

const FilterColumnTable = singleFilter(Table);


interface Demo21State {
    columns: TableProps['columns']
}

class Demo21 extends Component<{}, Demo21State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            columns: [
                {
                    title: "序号",
                    dataIndex: "index",
                    key: "index",
                    width: 80,
                    fixed: 'left',
                    singleFilter: false,
                    render(_text: any, _record: Record<string, any>, index: number) {
                        return index + 1
                    }
                },
                {
                    title: "订单编号",
                    dataIndex: "orderCode",
                    key: "orderCode",
                    width: 100,
                    fixed: 'left',
                    singleFilter: false,
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
                    width: 100,
                    onFilter: (value: string, record: Record<string, any>) => {
                        return record.typeName == value;
                    }
                },
                {
                    title: "采购组织",
                    dataIndex: "purchasing",
                    key: "purchasing",
                    width: 100
                },
                {
                    title: "单据日期",
                    dataIndex: "voucherDate",
                    key: "voucherDate",
                    width: 150
                },
                {
                    title: "审批状态",
                    dataIndex: "approvalStateName",
                    key: "approvalStateName",
                    width: 150
                },
                {
                    title: "备注",
                    dataIndex: "approvalState_mark",
                    key: "approvalState_mark",
                    width: 150
                }
            ]
        };
    }

    render() {
	    return <FilterColumnTable
	        columns={this.state.columns}
	        data={data}
	    />;
    }
}

export default Demo21;

/**
 *
 * @title 横向滚动条
 * @parent 滚动 Scroll View
 * @description `scroll.x`的值代表表体内容的实际宽度，默认情况下是根据各列宽度合计出来的。其值超过父元素的宽度时会自动出现滚动条。如设置 `scroll={{ x:1000 }}`，可以手动添加横向滚动条，也可以设置`scroll={{ x:"110%" }}`。
 * @type bip
 * demo0201
 */

import {Table, TableProps} from "@tinper/next-ui";
import React, {Component} from "react";

const columns: TableProps['columns'] = [
    {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 100,
        render(_text:any, _record: Record<string, any>, index: number) {
            return index + 1;
        }
    },
    {
        title: "订单编号",
        dataIndex: "orderCode",
        key: "orderCode",
        width: 300,
    },
    {
        title: "供应商名称",
        dataIndex: "supplierName",
        key: "supplierName",
        width: 200
    },
    {
        title: "类型",
        dataIndex: "typeName",
        key: "typeName",
        width: 200
    },
    {
        title: "采购组织",
        dataIndex: "purchasing",
        key: "purchasing",
        width: 200
    },
    {
        title: "采购组",
        dataIndex: "purchasingGroup",
        key: "purchasingGroup",
        width: 200
    },
    {
        title: "凭证日期",
        dataIndex: "voucherDate",
        key: "voucherDate",
        width: 300,
    },
    {
        title: "审批状态",
        dataIndex: "approvalStateName",
        key: "approvalStateName",
        width: 200
    },
    {
        title: "确认状态",
        dataIndex: "confirmStateName",
        key: "confirmStateName",
        width: 200
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
    },
    {
        orderCode: "NU0391028",
        supplierName: "xx供应商",
        typeName: "4",
        purchasing: '组织c',
        purchasingGroup: "cc",
        voucherDate: "2019年03月01日",
        approvalStateName: "未审批",
        confirmStateName: "待确认",
        closeStateName: "未关闭",
        key: "4"
    },
    {
        orderCode: "NU0391029",
        supplierName: "xx供应商",
        typeName: "5",
        purchasing: '组织d',
        purchasingGroup: "ss",
        voucherDate: "2019年02月14日",
        approvalStateName: "未审批",
        confirmStateName: "待确认",
        closeStateName: "未关闭",
        key: "5"
    }
];

class Demo11 extends Component {
    render() {
        return (
            <Table columns={columns} data={data} scroll={{x: "110%"}}/>
        );
    }
}

export default Demo11;

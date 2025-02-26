/**
 *
 * @title 左侧固定列
 * @parent 列操作-锁定 Fixed
 * @description 固定列到表格的左侧
 * @type other
 * demo0601
 */


import {Table, TableProps} from '@tinper/next-ui';
import React, {Component} from 'react';
type DefaultRecordType = Record<string, any>;

const columns: TableProps['columns'] = [
    {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 80,
        fixed: 'left',
        render(_text:any, _record:DefaultRecordType, index: number) {
            return index + 1
        }
    },
    {
        title: "订单编号",
        dataIndex: "orderCode",
        key: "orderCode",
        width: 100,
        fixed: 'left',
    },
    {
        title: "供应商名称",
        dataIndex: "supplierName",
        key: "supplierName",
        width: 100
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

class Demo51 extends Component {
    render() {
        return <Table columns={columns} data={data} scroll={{x: "110%", y: 240}}/>;
    }
}

export default Demo51;

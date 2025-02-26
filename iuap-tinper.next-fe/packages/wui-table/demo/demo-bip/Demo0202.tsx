/**
 *
 * @title 纵向滚动条
 * @parent 滚动 Scroll View
 * @description 通过设置 `scroll.y` 可达到固定表头的效果。如设置 `scroll={{ y:200 }}` 表示表体高度超出 200px 后会显示滚动条。
 * @type bip
 * demo0202
 */

import {Table, TableProps} from "@tinper/next-ui";
import React, {Component} from "react";

const columns: TableProps['columns'] = [
    {
        title: "序号", dataIndex: "index", key: "index", width: 80,
        render(_text:any, _record: Record<string, any>, index: number) {
            return index + 1;
        }
    },
    {title: "订单编号", dataIndex: "orderCode", key: "orderCode", width: 200},
    {title: "供应商名称", dataIndex: "supplierName", key: "supplierName", width: 200},
    {title: "类型", dataIndex: "typeName", key: "typeName", width: 200},
    {title: "采购组织", dataIndex: "purchasing", key: "purchasing", width: 200},
    {title: "采购组", dataIndex: "purchasingGroup", key: "purchasingGroup", width: 200},
    {title: "凭证日期", dataIndex: "voucherDate", key: "voucherDate", width: 200}
];

const data: TableProps['data'] = [
    {
        orderCode: "NU0391025",
        supplierName: "xx供应商",
        typeName: "1",
        purchasing: '组织c',
        purchasingGroup: "aa",
        voucherDate: "2018年03月18日",
        key: "1"
    },
    {
        orderCode: "NU0391026",
        supplierName: "xx供应商",
        typeName: "2",
        purchasing: '组织a',
        purchasingGroup: "bb",
        voucherDate: "2018年02月05日",
        key: "2"
    },
    {
        orderCode: "NU0391027",
        supplierName: "xx供应商",
        typeName: "3",
        purchasing: '组织b',
        purchasingGroup: "aa",
        voucherDate: "2018年07月01日",
        key: "3"
    },
    {
        orderCode: "NU0391028",
        supplierName: "xx供应商",
        typeName: "4",
        purchasing: '组织c',
        purchasingGroup: "cc",
        voucherDate: "2019年03月01日",
        key: "4"
    },
    {
        orderCode: "NU0391029",
        supplierName: "xx供应商",
        typeName: "5",
        purchasing: '组织d',
        purchasingGroup: "ss",
        voucherDate: "2019年02月14日",
        key: "5"
    },
    {
        orderCode: "NU0391030",
        supplierName: "xx供应商",
        typeName: "1",
        purchasing: '组织e',
        purchasingGroup: "zz",
        voucherDate: "2019年02月18日",
        key: "6"
    },
    {
        orderCode: "NU0391031",
        supplierName: "xx供应商",
        typeName: "2",
        purchasing: '组织f',
        purchasingGroup: "qq",
        voucherDate: "2019年01月01日",
        key: "7"
    },
    {
        orderCode: "NU0391032",
        supplierName: "xx供应商",
        typeName: "3",
        purchasing: '组织g',
        purchasingGroup: "pp",
        voucherDate: "2019年01月31日",
        key: "8"
    },
];

class Demo12 extends Component {
    render() {
        return (
            <Table columns={columns} data={data} scroll={{y: 150}}/>
        );
    }
}

export default Demo12;

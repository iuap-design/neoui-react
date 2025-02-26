/**
 *
 * @title 缓存列属性
 * @description `cacheId`指定缓存表格列属性的key
 * @type bip
 * demo0802
 */


import { Table, TableProps } from "@tinper/next-ui";
import React, {Component} from 'react';

const {dragColumn, sort, filterColumn} = Table;


const data1: TableProps['data'] = [...new Array(1000)].map((_e, i) => {
    const item = {
        orderCode: "NU" + i,
        supplierName: "xx供应商",
        typeName: i % 4,
        purchasing: i % 4 == 0 ? '组织a' : '组织k',
        voucherDate: i % 5 == 0 ? "2018年07月09日" : "2018年11月16日",
        approvalStateName: i % 3 ? "未审批" : "已审批",
        key: i
    }
    return item;
})
const columns1: TableProps['columns'] = [
    {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 100,
        fixed: 'left',
        singleFilter: false,
        singleFind: false,
        render(_text: any, _record: Record<string, any>, index: number) {
            return index + 1
        }
    },
    {
        title: "订单编号",
        dataIndex: "orderCode",
        key: "orderCode",
        width: 140,
        fixed: 'left',
        required: true
    },
    {
        title: "供应商名称",
        dataIndex: "supplierName",
        key: "supplierName",
        width: 150,
        required: true,
    },
    {
        title: "类型",
        dataIndex: "typeName",
        key: "typeName",
        sorter: (a, b) => a.typeName - b.typeName,
        width: 140
    },
    {
        title: "采购组织",
        dataIndex: "purchasing",
        key: "purchasing",
        width: 120
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

const DragColumnTable = dragColumn(Table);
const ComplexTable = sort(DragColumnTable);
const FilterColumnTable = filterColumn(ComplexTable);

 interface Demo21State {
     columns: TableProps['columns'];
     data: TableProps['data'];
     cacheId: string;
     current: number;
     pageSize: number;
 }
class Demo21 extends Component<{}, Demo21State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            columns: columns1,
            data: data1,
            cacheId: 'singleColumn',
            current: 1,
            pageSize: 10
        };
    }
    componentDidMount() {
        // 获取缓存的pageSize
        console.log(Table.getPaginationCache(this.state.cacheId))
    }

    render() {
        return (
            <>
                <FilterColumnTable
                    columns={this.state.columns}
                    data={this.state.data}
                    dragborder={true}
                    draggable={true}
                    bordered
                    cacheId={this.state.cacheId}
                    scroll={{ y: 350 }}
                    pagination={{
                        showSizeChanger: true,
                        pageSize: this.state.pageSize,
                        current: this.state.current,
                        onChange: (current: number, pageSize: number) => {
                            this.setState({
                                current,
                                pageSize
                            })
                        },
                        onPageSizeChange: (current: number, pageSize: number) => {
                            this.setState({
                                current,
                                pageSize
                            })
                        },
                    }}
                />
            </>
        )
    }
}

export default Demo21;

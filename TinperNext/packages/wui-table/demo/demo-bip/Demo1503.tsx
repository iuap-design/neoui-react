/**
 *
 * @title 单列过滤和定位结合使用
 * @parent singleFilter和singleFind
 * @description 单列过滤 singleFilter和singleFind
 * @type bip
 * demo0802
 */


import { Table, TableProps, Select, ColumnType, Switch } from "@tinper/next-ui";
import React, {Component} from 'react';

const {singleFilter, singleFind, sort, filterColumn} = Table;
const Option = Select.Option;

const data: TableProps['data'] = [
    {
        orderCode: "NU0391025",
        supplierName: "xx1供应商",
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
        supplierName: "xx1供应商",
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
        supplierName: "xx2供应商",
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
        supplierName: "xx2供应商",
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
        supplierName: "xx2供应商",
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
        supplierName: "xx3供应商",
        typeName: "6",
        purchasing: '组织fdsahdioashdoiashdoiashdaoshdoaisdhoasi',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        approvalStateName: "",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "6"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx3供应商",
        typeName: 7,
        purchasing: '组织g',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        approvalStateName: "",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "7"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx4供应商",
        typeName: 8,
        purchasing: '组织h',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "8"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx1供应商",
        typeName: 0,
        purchasing: '组织k',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "0"
    },
    {
        orderCode: "NU0391025",
        supplierName: "xx1供应商",
        typeName: "11",
        purchasing: '组织c1',
        purchasingGroup: "aa",
        voucherDate: "2018年03月18日",
        approvalStateName: "",
        confirmStateName: "执行中",
        closeStateName: "未关闭",
        key: "11"
    },
    {
        orderCode: "NU0391026",
        supplierName: "xx1供应商",
        typeName: "12",
        purchasing: '组织a2',
        purchasingGroup: "bb",
        voucherDate: "2018年02月05日",
        approvalStateName: "已审批",
        confirmStateName: "待确认",
        closeStateName: "未关闭",
        key: "12"
    },
    {
        orderCode: "NU0391027",
        supplierName: "xx2供应商",
        typeName: "13",
        purchasing: '组织b3',
        purchasingGroup: "aa",
        voucherDate: "2018年07月01日",
        approvalStateName: "未审批",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "13"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx2供应商",
        typeName: "14",
        purchasing: '组织d4',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        approvalStateName: "",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "14"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx2供应商",
        typeName: "15",
        purchasing: '组织e5',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        approvalStateName: "",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "15"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx3供应商",
        typeName: "16",
        purchasing: '组织fdsahdioashdoiashdoiashdaoshdoaisdhoasi6dsahodhasoidhaosihdaosihdasodhasiodhoasdhoasdohi',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        approvalStateName: "",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "16"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx3供应商",
        typeName: '17',
        purchasing: '组织g7',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        approvalStateName: "",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "17"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx4供应商",
        typeName: "18",
        purchasing: '组织h8',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "18"
    }, {
        orderCode: "NU0391027",
        supplierName: "xx1供应商",
        typeName: "19",
        purchasing: '组织k9',
        purchasingGroup: "aa",
        voucherDate: "2018年07月09日",
        confirmStateName: "终止",
        closeStateName: "已关闭",
        key: "20"
    }
];

const FindColumnTable = singleFind(Table);
const SingleFilterTable = singleFilter(FindColumnTable);
const SortTable = sort(SingleFilterTable);
const ComplexTable = filterColumn(SortTable);

interface Demo21State {
    columns: TableProps['columns'];
    lockable: 'enable' | 'disable' | 'onlyHeader' | 'onlyPop';
    filterMode: 'single' | 'multiple';
    addEmptyColumn: boolean;
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
                    width: 140,
                    tip: '这是string类型的tip',
                    // filters: [
                    //     {
                    //         key: 1,
                    //         value: '1',
                    //         num: 1
                    //     },
                    //     {
                    //         key: 2,
                    //         value: '2',
                    //         num: 1
                    //     },
                    //     {
                    //         key: 3,
                    //         value: '3'
                    //     },
                    // ]
                },
                {
                    title: "采购组织",
                    dataIndex: "purchasing",
                    key: "purchasing",
                    width: 120,
                    titleAlign: 'center',
                    tip: () => {
                        return <span>这是function类型的tip</span>
                    },
                    // filterMultiple: false
                },
                {
                    title: "单据日期",
                    dataIndex: "voucherDate",
                    key: "voucherDate",
                    width: 150,
                    titleAlign: 'right',
                    tip: '这是string类型的tip'
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
                    width: 150,
                    fixed: 'right'
                }
            ],
            lockable: 'enable',
            filterMode: 'single',
            addEmptyColumn: false
        };
    }
	afterFilter = (_optData: TableProps['columns'], _columns: TableProps['columns']) => {
	    console.log(_optData, _columns);
	}

    onDropBorder = (_e: any, _width: number, _column: ColumnType, columns: ColumnType[]) => {
        this.setState({
            columns
        })
    }

    onChange = (value: 'enable' | 'disable' | 'onlyHeader' | 'onlyPop') => {
        this.setState({
            lockable: value
        })
    }

    onSwitchChange = (value: 'single' | 'multiple') => {
        this.setState({
            filterMode: value
        });
    };

    triggerOnChange = (page, filter, sort, target) => {
        console.log(page, filter, sort, target);
    }


    changeEmptyColumn = (checked: boolean) => {
        this.setState({
            addEmptyColumn: checked
        });
    }

    render() {
        let filterCheckboxProps = (column: ColumnType) => ({
            disabled: column.key == 'purchasing',
            name: column.key
        })

	    return (
            <>
                锁定列：
                <Select defaultValue="enable" style={{ width: 100, marginBottom: 10, marginRight: 20 }} onChange={this.onChange} autoFocus size='default'>
	                <Option value="enable">全部显示</Option>
	                <Option value="onlyHeader">仅在表头显示</Option>
	                <Option value="onlyPop">仅在弹框显示</Option>
	                <Option value="disable">不显示</Option>
	            </Select>
                过滤模式：
                <Select defaultValue="single" style={{ width: 100, marginBottom: 10 }} onChange={this.onSwitchChange} autoFocus size='default'>
	                <Option value="single">单列</Option>
	                <Option value="multiple">多列</Option>
	            </Select>
                增加空白列：<Switch checked={this.state.addEmptyColumn} onChange={this.changeEmptyColumn}/>
                <ComplexTable
                    columns={this.state.columns}
                    data={data}
                    dragborder={true}
                    filterCheckboxProps={filterCheckboxProps}
                    afterFilter={this.afterFilter}
                    lockable={this.state.lockable}
                    fieldid={'abc'}
                    filterMode={this.state.filterMode}
                    onChange={this.triggerOnChange}
                    addEmptyColumn={this.state.addEmptyColumn}
                />
            </>
        )
    }
}

export default Demo21;

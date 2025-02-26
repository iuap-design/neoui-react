/**
 * @title 受控列排序
 * @parent 列操作-排序 Sort
 * @description  column中增加sorter: (a, b) => a.c - b.c 这里的a,b代表前后两个数据，c代表比较当前对象的字段名称
 * @type other
 * demo1703
 */


import {Checkbox, Table, Select} from "@tinper/next-ui";
import React, {Component} from 'react';

const {sort, multiSelect} = Table;
const Option = Select.Option;

// let multiSelectTable = multiSelect(Table, Checkbox);
// let ComplexTable = sort(multiSelectTable, Icon);


let multiSelectTable = sort(Table);
// let MultiSelectTable = sort(Table);
let ComplexTable = multiSelect(multiSelectTable, Checkbox);
const defaultProps11 = {
    prefixCls: "wui-table"
};
interface Demo11State {
    sortOrder:boolean | string;
    data: Record<string, any>[];
    columns11: Record<string, any>[];
}
class Demo1703 extends Component<{}, Demo11State> {
    static defaultProps: { prefixCls: string; };
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            sortOrder: "",
            data: [
                {num: "NU0391001", date: "2019-03-01", supplier: 'xx供应商', contact: 'Tom', total: 30, key: "1"},
                {num: "NU0391002", date: "2018-11-02", supplier: 'yy供应商', contact: 'Jack', total: 41, key: "2"},
                {num: "NU0391003", date: "2019-05-03", supplier: 'zz供应商', contact: 'Jane', total: 25, key: "3"}
            ],
            columns11: [
                {
                    title: "单据编号",
                    dataIndex: "num",
                    key: "num",
                    width: 120,
                },
                {
                    title: "单据日期",
                    dataIndex: "date",
                    key: "date",
                    width: 200,
                },
                {
                    title: "供应商",
                    dataIndex: "supplier",
                    key: "supplier",
                    width: 100
                },
                {
                    title: "联系人",
                    dataIndex: "contact",
                    key: "contact",
                },
                {
                    title: "整单数量",
                    dataIndex: "total",
                    key: "total",
                    width: 150,
                    sorter: (a: Record<string, any>, b: Record<string, any>) => a.total - b.total,
                    // order: 'ascend',
                    sortOrder: 'descend'
                }
            ],
        };
    }

	getSelectedDataFunc = (_selectList: Record<string, any>[], _record: Record<string, any>, _index: number) => {

	}

    changeSortOrder = (val: string) => {
        let columns11 = [...this.state.columns11]
        if (val === 'flatscend') {
            columns11[4].sortOrder = 'flatscend'
        } else if (val === 'ascend') {
            columns11[4].sortOrder = 'ascend'
        } else if (val === 'descend') {
            columns11[4].sortOrder = 'descend'
        }
        this.setState({
            columns11
        })
    }

    render() {
	    let rowSelection = {}
	    return (
	        <div>
	            <div style={{width: '220px', paddingBottom: '20px'}}>
                    <span>控制排序：</span>
                    <span style={{display: 'inline-block', width: '130px'}}>
                        <Select onChange={this.changeSortOrder} defaultValue="descend">
                            <Option value="flatscend">取消排序</Option>
                            <Option value="ascend">升序</Option>
                            <Option value="descend">降序</Option>
                        </Select>
                    </span>
                </div>
	            <ComplexTable bordered headerHeight={28} columns={this.state.columns11} data={this.state.data}
							 rowSelection={rowSelection} getSelectedDataFunc={this.getSelectedDataFunc} showSorterTooltip={true} />
	        </div>
	    )
    }
}

Demo1703.defaultProps = defaultProps11;


export default Demo1703;

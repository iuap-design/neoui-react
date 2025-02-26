/**
 * @title 自定义单元格渲染时机
 * @description shouldCellUpdate属性自定义单元格渲染时机
 * @type other
 * demo1704
 */


import {Checkbox, Table, Select, Button} from "@tinper/next-ui";
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
    data: Record<string, any>[];
    columns11: Record<string, any>[];
}
class Demo1704 extends Component<{}, Demo11State> {
    static defaultProps: { prefixCls: string; };
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
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
                    shouldCellUpdate: (_record: any, _prevRecord: any) => {
                        return true
                    },
                    render: (text: string) => {
                        return text
                    }
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
                }
            ],
        };
    }

	getSelectedDataFunc = (_selectList: Record<string, any>[], _record: Record<string, any>, _index: number) => {

	}

    changeSortOrder = (val: string) => {
        let columns2 = [...this.state.columns11]
        if (val === '1') {
            columns2[0].shouldCellUpdate = () => {
                return true
            }
        } else if (val === '2') {
            columns2[0].shouldCellUpdate = () => {
                return false
            }
        }
        this.setState({
            columns11: columns2
        })
    }

    onClick = () => {
        let columns2 = [...this.state.columns11]
        columns2[0].render = () => {
            return 'yyy'
        }
        this.setState({
            columns11: columns2
        })
    }

    render() {
	    let rowSelection = {}
	    return (
	        <div>
	            <div style={{width: '300px', paddingBottom: '20px'}}>
                    <span>shouldCellUpdate返回值：</span>
                    <span style={{display: 'inline-block', width: '130px'}}>
                        <Select onChange={this.changeSortOrder} defaultValue="1">
                            <Option value="1">true</Option>
                            <Option value="2">false</Option>
                        </Select>
                    </span>
                </div>
                <Button onClick={this.onClick} style={{marginBottom: '10px'}}>是否更新</Button>
	            <ComplexTable bordered headerHeight={28} columns={this.state.columns11} data={this.state.data}
							 rowSelection={rowSelection} getSelectedDataFunc={this.getSelectedDataFunc} showSorterTooltip={true} />
	        </div>
	    )
    }
}

Demo1704.defaultProps = defaultProps11;


export default Demo1704;

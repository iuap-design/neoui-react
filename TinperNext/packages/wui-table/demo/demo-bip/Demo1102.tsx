/**
 *
 * @title 树型表格数据展示
 * @parent 扩展行 Expanded Row
 * @description 通过在data中配置children数据，来自动生成树形表格
 * @type bip
 * demo1102
 */


import { Table, TableProps } from '@tinper/next-ui';
import React, {Component} from 'react';
type DefaultRecordType = Record<string, any>;

const columns4: TableProps['columns'] = [
    {
        title: "主键",
        dataIndex: "key",
        key: "key",
        width: "200px"
    },
    {
        title: "订单编号",
        dataIndex: "name",
        key: "name",
        width: "40%"
    },
    {
        title: "单据日期",
        dataIndex: "age",
        key: "age",
        width: "30%"
    },
    {
        title: "供应商",
        dataIndex: "address",
        key: "address"
    }
];

const data4: TableProps['data'] = [
    {
        key: "p0",
        name: "NU0391001",
        age: "2019-03-01",
        address: "供应商1",
        children: [
            {
                key: "p0-0",
                name: "NU0391002",
                age: "2019-03-02",
                address: "供应商2"
            },
            {
                key: "p0-1",
                name: "NU0391003",
                age: "2019-03-03",
                address: "供应商3",
                children: [
                    {
                        key: "p0-1-0",
                        name: "NU0391004",
                        age: "2019-03-04",
                        address: "供应商4"
                    }
                ]
            },
            {
                key: "p0-2",
                name: "NU0391005",
                age: "2019-03-05",
                address: "供应商5",
                children: [
                    {
                        key: "p0-2-1",
                        name: "NU0391006",
                        age: "2019-03-06",
                        address: "供应商6",
                        children: [
                            {
                                key: "p0-2-1-0",
                                name: "NU0391007",
                                age: "2019-03-07",
                                address: "供应商7"
                            },
                            {
                                key: "p0-2-1-1",
                                name: "NU0391008",
                                age: "2019-03-08",
                                address: "供应商8"
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
for (let i = 1; i < 20; i++) {
    let pKey = "p" + i;
    let pRow: Record<string, any> = {
        key: pKey,
        name: "NU0391009",
        age: "2019-03-09",
        address: "供应商9"
    };
    if (i < 5) {
        pRow.children = function() {
            let arr = [];
            for (let j = 0; j < 50; j++) {
                arr.push({
                    key: pKey + "-" + j,
                    name: "NU0391008",
                    age: "2019-03-08",
                    address: "供应商8"
                })
            }
            return arr;
        }()
    }
    data4.push(pRow);
}
interface Demo4State {
    data: TableProps['data'];
    factoryValue: DefaultRecordType | number;
    selectedRow: Array<boolean>;
}
class Demo4 extends Component <{}, Demo4State> {

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            data: data4,
            factoryValue: 0,
            selectedRow: new Array(data4.length)// 状态同步
        }
    }

    render() {
        return <Table
            rowClassName={(_record: DefaultRecordType, index:number, _indent:number | undefined) => {
                if (this.state.selectedRow[index]) {
                    return 'selected';
                } else {
                    return '';
                }
            }}
            onRowClick={(record: DefaultRecordType, index:number, indent:React.MouseEvent<HTMLElement>) => {
                console.log(record, index, indent)
                let selectedRow = new Array(this.state.data.length);
                selectedRow[index] = true;
                this.setState({
                    factoryValue: record,
                    selectedRow: selectedRow
                });
            }}
            rowKey="key"// 每条数据的唯一标示，默认为key，如果不是key，必须传
            columns={columns4} data={data4}/>;
    }
}


export default Demo4;

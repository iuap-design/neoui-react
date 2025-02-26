/**
 * @title 层级树大数据场景
 * @parent 无限滚动 Infinite-scroll
 * @description
 * @type bip
 * demo1404
 */
import {Button, Table, TableProps} from "@tinper/next-ui";
import React, {Component} from "react";
 type DefaultRecordType = Record<string, any>;

const {bigData} = Table;
const BigDataTable = bigData(Table);
const columns: TableProps['columns'] = [
    {
        title: '序号',
        dataIndex: 'index',
        width: '150',
        key: 'index',
        render: (_text:any, record: Record<string, any>, index: number) => {
            return record.index ? record.index : index
        }
    },
    {title: "用户名", dataIndex: "a", key: "a", width: 580, className: "rowClassName"},
    {title: "性别", dataIndex: "b", key: "b", width: 80},
    {title: "年龄", dataIndex: "c", key: "c", width: 200}
];

const data: TableProps['data'] = [...new Array(10000)].map((_e, i) => {
    const rs: Record<string, any> = {a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i};
    if ([2, 4, 6, 50, 100, 101, 102].includes(i)) {// 模拟可展开的子行集合数据
        rs.children = [];
        for (let subj = 0; subj < 100; subj++) {
            rs.children.push({
                a: 333 + ' ' + subj,
                b: 333 + ' ' + subj,
                c: 333 + ' ' + subj,
                d: 333 + ' ' + subj,
                key: i + `-${subj}`
            });
        }
    }
    return rs;
})
const data2: TableProps['data'] = [...new Array(10000)].map((_e, i) => {
    const rs = {a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i};
    if (i % 3 == 0) {
        rs.b = '女';
    }
    return rs;
})
 interface Demo34State {
     data: TableProps['data'];
     selectedRowIndex: number;
 }
class Demo34 extends Component <{}, Demo34State> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            data: data,
            selectedRowIndex: -1
        }
    }

     /**
      * expanded : 当前的状态
      * record : 当前行的数据
      */
     onExpand = (expanded: boolean, record: DefaultRecordType) => {
         console.log('当前的状态---' + expanded, ' 当前行的数据---', record);
     }
     handleClick = () => {
         this.setState({
             data: data2
         })
     }

     render() {
         return (
             <div>
                 <Button onClick={this.handleClick} style={{margin: 8}}>改变数据源</Button>
                 <Button onClick={() => {
                     this.setState({selectedRowIndex: 25})
                 }} style={{margin: 8}}>定位索引25行</Button>
                 <BigDataTable
                     columns={columns}
                     data={this.state.data}
                     scroll={{y: 350}}
                     currentIndex={this.state.selectedRowIndex}
                     onExpand={this.onExpand}
                     defaultExpandAllRows={true}
                     onRowClick={(_record: DefaultRecordType, index: number, _indent:any) => {
                         console.log('currentIndex--' + index);
                     }}
                     rowKey="key"// 每条数据的唯一标示，默认为key，如果不是key，必须传
                 />
             </div>

         );
     }
}

export default Demo34;
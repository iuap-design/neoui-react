/**
 * @title 层级树子集含有大数据场景
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


const data: TableProps['data'] = [...new Array(10000)].map((_e, i) => {
    const rs: Record<string, any> = {a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i};
    let loadMore = {
        a: 'load_more',
        key: `load_more`
    }
    if ([2, 4, 6, 50, 100, 101, 102].includes(i)) {// 模拟可展开的子行集合数据
        rs.children = [];
        for (let subj = 0; subj < 50; subj++) {
            rs.children.push({
                a: 333 + ' ' + subj,
                b: 333 + ' ' + subj,
                c: 333 + ' ' + subj,
                d: 333 + ' ' + subj,
                key: i + `-${subj}`
            });
        }
        rs.children.push(loadMore)
    }
    return rs;
})

let num = 1;
 interface Demo34State {
       data: TableProps['data'];
       selectedRowIndex: number;
       hasMore: boolean
   }
class Demo34 extends Component <{}, Demo34State> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            data: data,
            selectedRowIndex: -1,
            hasMore: true,
        }
    }

       /**
        * expanded : 当前的状态
        * record : 当前行的数据
        */
       onExpand = (expanded: boolean, record: DefaultRecordType) => {
           console.log('当前的状态---' + expanded, ' 当前行的数据---', record);
       }

       getMore = (record: Record<string, any>, index: number) => {
           const currentParentKey = record.parentKey;
           data.forEach((item, i) => {
               if (item.key === currentParentKey) {
                   let loadMore = {
                       a: 'load_more',
                       key: `load_more`
                   }
                   item.children.splice(item.children.length - 1, 1)
                   for (let subj = 0; subj < 50; subj++) {
                       item.children.push({
                           a: 333 + ' ' + subj,
                           b: 333 + ' ' + subj,
                           c: 333 + ' ' + subj,
                           d: 333 + ' ' + subj,
                           key: i + num * 50 + `-${subj}`
                       });
                   }
                   item.children.push(loadMore)
               }
           })
           num++;
           if (num > 3) {
               this.setState({hasMore: false})
           }
           this.setState({data})
       }

       render() {
           const { data, hasMore } = this.state;
           let columns = [
               {
                   title: '序号',
                   dataIndex: 'index',
                   width: '150',
                   key: 'index',
                   render: (_text:any, record: Record<string, any>, index: number) => {
                       return hasMore && record.key === 'load_more' ? {
                           children: '',
                           props: {
                               colSpan: 0
                           },
                       } : record.index ? record.index : index
                   }
               },
               {title: "用户名", dataIndex: "a", key: "a", width: 580, className: "rowClassName",
                   render: (text:any, record: Record<string, any>, index: number) => {
                       return hasMore && record.key === 'load_more' ? {
                           children: <div style={{width: '100%', height: '100%', textAlign: 'center'}} onClick={() => this.getMore(record, index)}>{'加载更多'}</div>,
                           props: {
                               colSpan: 4
                           },
                       } : text
                   }
               },
               {title: "性别", dataIndex: "b", key: "b", width: 80},
               {title: "年龄", dataIndex: "c", key: "c", width: 200}
           ];

           if (hasMore) {
               data.forEach((item, i) => {
                   let loadMore = {
                       a: 'load_more',
                       key: `load_more`
                   }
                   if ([2, 4, 6, 50, 100, 101, 102].includes(i)) {
                       if (item.children[item.children.length - 1].key !== `load_more`) {
                           item.children.push(loadMore)
                       }
                   }
               })
           } else {
               data.forEach((item, i) => {
                   if ([2, 4, 6, 50, 100, 101, 102].includes(i)) {
                       if (item.children[item.children.length - 1].key === `load_more`) {
                           item.children.splice(item.children.length - 1, 1)
                       }
                   }
               })
           }

           return (
               <div>
                   <Button onClick={() => {
                       this.setState({selectedRowIndex: 25})
                   }} style={{margin: 8}}>定位索引25行</Button>
                   <BigDataTable
                       columns={columns}
                       data={data}
                       scroll={{y: 350}}
                       currentIndex={this.state.selectedRowIndex}
                       onExpand={this.onExpand}
                       onRowClick={(_record: DefaultRecordType, index: number, _indent:any) => {
                           console.log('currentIndex--' + index);
                       }}
                       bordered
                       rowKey="key"// 每条数据的唯一标示，默认为key，如果不是key，必须传
                   />
               </div>

           );
       }
}

export default Demo34;
/**
 *
 * @title fieldid用法
 * @description 传递fieldid属性，生成fieldid dom属性
 * @type bip
 * demo0101
 */

import {Checkbox, Table, TableProps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {multiSelect, sum} = Table;

const columns: TableProps['columns'] = [
    {title: "员工编号", dataIndex: "a", key: "a", width: 300, className: "rowClassName", fieldid: 'aa'},
    {title: "员工姓名", dataIndex: "b", key: "b", width: 500, fieldid: 'bb'},
    {title: "年龄", dataIndex: "e", key: "e", width: 500},
    {title: "性别", dataIndex: "c", key: "c", width: 500},
    {title: "部门", dataIndex: "d", key: "d", width: 200, fixed: 'right'},
];
 type DataTyprInter = typeof data[1]
 type DataType = typeof data
const data: TableProps['data'] = [
    {a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1", e: 30, t: '0'},
    {a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2", e: 23, t: '1'},
    {a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3", e: 40, t: '2'},
    {a: "ASVAL_201903280010", b: "小王", c: "女", d: "财务二科", key: "4", e: 45, t: '3'},
    {a: "ASVAL_201903200021", b: "小李", c: "男", d: "财务一科", key: "5", e: 18, t: '4'}
];
// 拼接成复杂功能的table组件不能在render中定义，需要像此例子声明在组件的外侧，不然操作state会导致功能出现异常
let MultiSelectTable = multiSelect(sum(Table), Checkbox);

class Demo1801 extends Component<{}, {data: DataType, selectedRowKeys: string[]}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: data,
            selectedRowKeys: [],
        };
    }

     /**
      *@param selectedList:当前选中的行数据
      *@param record 当前操作行数据
      *@param index 当前操作行索引
      *@param newData 进行多选操作之后的新数据 data
      * @memberof Demo12
      */
     getSelectedDataFunc: TableProps['getSelectedDataFunc'] = (selectedList: DataType, record: DataTyprInter, index: number, newData: DataType) => {
         console.log("selectedList", selectedList, "index", index, 'newData', newData, 'record', record);
     };

     render() {
         let rowSelection = {
             columnWidth: 60,
             selectedRowKeys: this.state.selectedRowKeys,
             getCheckboxProps: (record: DataTyprInter, index: number) => ({
                 disabled: record.key == '3', // Column configuration not to be checked
                 name: record.b,
                 id: `checkbox_${index}`
             }),
             onChange: (selectedRowKeys: string[], selectedRows: DataType) => {
                 console.log('selectedRowKeys', selectedRowKeys, 'selectedRows', selectedRows)
                 this.setState({
                     selectedRowKeys
                 })
             },
             onSelectAll: (check: boolean, selectedRows: DataType, changeRows: DataType) => {
                 console.log('check', check, 'selectedRows', selectedRows, 'changeRows', changeRows)
             }
         };
         let multiObj = {
             id: 'checkBoxAll'
         }
         let expandedRowRender = (_record: DataTyprInter, index: number, _indent: number) => {
             if (index % 2 === 0) {
                 return <div style={{height: '30px'}}> 偶数测试展开行</div>
             } else {
                 return <div style={{height: '30px'}}> 奇数测试展开行</div>
             }
         }
         return (
             <MultiSelectTable
                 bordered
                 columns={columns}
                 data={data}
                 rowKey={(record, _index) => record.t}
                 rowSelection={rowSelection}
                 autoCheckedByClickRows={false}
                 //  showRowNum={true}
                 showRowNum={{width: '60', name: '序号'}}
                 fieldid='abc'
                 expandedRowRender={expandedRowRender}
                 multiSelectConfig={multiObj} // 可以自定义 Checkbox 属性
                 showHeaderExpandIcon={true}
                 getSelectedDataFunc={this.getSelectedDataFunc}/>
         );
     }
}

export default Demo1801;

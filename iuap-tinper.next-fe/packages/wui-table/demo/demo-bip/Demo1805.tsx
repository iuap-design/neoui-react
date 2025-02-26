/**
 *
 * @title 大数据列
 * @description 支持开启大数据列bigColumns，`columnsLoadBuffer`为缓存列数
 * @type bip
 * demo1804
 */


import {Table, TableProps, Button} from "@tinper/next-ui";
import React, {Component} from 'react';
   type DefaultRecordType = Record<string, any>;
const { dragColumn} = Table;
const DragColumnTable = dragColumn(Table);
const renderContent = (value: any, _row: DefaultRecordType, index: number) => {
    const obj: DefaultRecordType = {
        children: value,
        props: {},
    };
    if (index === 4) {
        obj.props.colSpan = 0;
    }
    return obj;
};
const commonColumns: TableProps['columns'] = [
    {
        title: "序号", dataIndex: "index", key: "index", width: 80,
        render(_text: any, _record: DefaultRecordType, index: number) {
            return index + 1;
        },
        fixed: 'left'
    },
    {title: "订单编号", dataIndex: "orderCode", key: "orderCode", width: '120px', fixed: 'left'},
    {title: "供应商名称", dataIndex: "supplierName", key: "supplierName", width: '120px', fixed: 'left'},
    {title: "类型", dataIndex: "typeName", key: "typeName", width: '120px'},
    {title: "采购组织", dataIndex: "purchasing", key: "purchasing", width: '120px'},
    {title: "采购组", dataIndex: "purchasingGroup", key: "purchasingGroup", width: '120px'},
    {title: "凭证日期", dataIndex: "voucherDate", key: "voucherDate", width: '120px'},
];
const commonData: TableProps['data'] = [
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

const multipleColumns: TableProps['columns'] = [
    {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: 100,
        fixed: "left"
    },
    {
        title: "个人信息",
        width: 600,
        children: [
            {
                title: "年龄",
                dataIndex: "age",
                key: "age",
                width: 200
            },
            {
                title: "地址",
                children: [
                    {
                        title: "街道",
                        dataIndex: "street",
                        key: "street",
                        width: 200
                    },
                    {
                        title: "单元",
                        children: [
                            {
                                title: "楼号",
                                dataIndex: "building",
                                key: "building",
                                width: 100
                            },
                            {
                                title: "门户",
                                dataIndex: "number",
                                key: "number",
                                width: 100
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: "公司信息",
        width: 400,
        children: [
            {
                title: "公司地址",
                dataIndex: "companyAddress",
                key: "companyAddress",
                width: 200,
            },
            {
                title: "公司名称",
                dataIndex: "companyName",
                key: "companyName",
                width: 200,
            }
        ]
    },
    {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
        width: 60
    }
];

const multipleData: DefaultRecordType[] = [];
for (let i = 0; i < 8; i++) {
    multipleData.push({
        key: i,
        name: "John Brown",
        age: i + 1,
        street: "Lake Park",
        building: "C",
        number: 2035,
        companyAddress: "北清路 68 号",
        companyName: "用友",
        gender: "男"
    });
}

const mergeColumns: TableProps['columns'] = [{
    title: '姓名',
    key: "name",
    dataIndex: 'name',
    render: (text, _record, index) => {
        if (index < 4) {
            return <a href="javascript:void(0);">{text}</a>;
        }
        return {
            children: <a href="javascript:void(0);">{text}</a>,
            props: {
                colSpan: 5,
            },
        };
    },
}, {
    title: '年龄',
    key: "age",
    dataIndex: 'age',
    render: renderContent,
},
{
    title: '联系方式',
    colSpan: 2,
    key: "tel",
    dataIndex: 'tel',
    render: renderContent
},
{
    title: '手机号',
    colSpan: 0,
    key: "phone",
    dataIndex: 'phone',
    render: renderContent,
},
{
    title: '家庭住址',
    key: "address",
    dataIndex: 'address',
    render: renderContent,
}];


const mergeData: TableProps['data'] = [{
    key: '1',
    name: '小红',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: '北京海淀',
}, {
    key: '2',
    name: '小明',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: '河北张家口',
}, {
    key: '3',
    name: '张三',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: '浙江杭州',
}, {
    key: '4',
    name: '李四',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: '广州深圳',
}, {
    key: '5',
    name: '王五',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: '北京昌平',
}];

class Demo1804 extends Component<{}, {columns: DefaultRecordType[], data: DefaultRecordType[], scrollMode: 'sticky' | 'table', currentScrollColumn: string}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            columns: commonColumns,
            data: commonData,
            scrollMode: 'sticky',
            currentScrollColumn: ''
        }
    }

      checkOutMultiple = () => {
          this.setState({
              columns: multipleColumns,
              data: multipleData,
          })
      }

      mergeColumn = () => {
          this.setState({
              columns: mergeColumns,
              data: mergeData,
          })
      }

      checkCommon = () => {
          this.setState({
              columns: commonColumns,
              data: commonData,
          })
      }

      scrollMode = () => {
          const _scrollMode = this.state.scrollMode === 'sticky' ? 'table' : 'sticky'
          this.setState({
              scrollMode: _scrollMode
          })
      }

      scrollTo = () => {
          this.setState({
              currentScrollColumn: "virtual_columns_111"
          })
      }
      render() {
          const { columns, data, scrollMode, currentScrollColumn } = this.state;
          let renderColumns = [...columns];
          let renderData = [...data];
          [...new Array(1000)].forEach((_col, index) => {
              renderColumns.push({
                  title: `虚拟列_${index}`,
                  dataIndex: `virtual_columns_${index}`,
                  key: `virtual_columns_${index}`,
                  width: 200,
              })
          })
          renderColumns.push({
              title: `虚拟右固定列`,
              dataIndex: `virtualColumnsFixedRight`,
              key: `virtualColumnsFixedRight`,
              width: 200,
              fixed: 'right'
          })
          renderData.forEach((da: DefaultRecordType, index: number) => {
              [...new Array(1000)].forEach((_col, _index) => {
                  da[`virtual_columns_${_index}`] = `数据${_index}`
              })
              da.virtualColumnsFixedRight = `右固定列数据${index}`
          })
          return (
              <div>
                  <div style={{marginBottom: '20px', marginTop: '5px'}}>
                      <Button bordered colors="info" onClick={this.scrollTo} style={{marginRight: '15px'}}>滚动至virtual_columns_111</Button>
                      <Button bordered colors="info" onClick={this.checkOutMultiple} style={{marginRight: '15px'}}>多表头</Button>
                      <Button bordered colors="info" onClick={this.mergeColumn} style={{marginRight: '15px'}}>合并列</Button>
                      <Button bordered colors="info" onClick={this.checkCommon} style={{marginRight: '15px'}}>还原单表头</Button>
                      <Button bordered colors="info" onClick={this.scrollMode}>切换{scrollMode === 'sticky' ? 'table' : 'sticky'}版表格</Button>
                  </div>
                  <DragColumnTable
                      className="demo04"
                      columns={renderColumns}
                      data={renderData}
                      stripeLine={true}
                      bigColumns={true}
                      draggable={true}
                      dragborder={true}
                      scrollMode={scrollMode}
                      currentScrollColumn={currentScrollColumn}
                      bordered/>
              </div>
          )
      }
}

export default Demo1804;
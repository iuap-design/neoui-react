import { Table } from "../../../../packages";
import React from "react";
const data = [
    {
      orderCode: "NU0391025",
      supplierName: "供应商1",
      type_name: "1",
      purchasing: '组织c',
      purchasingmoney: "4000",
      voucherDate: "2018年03月18日",
      key: "1",
      children: [
        {
          orderCode: "NU0391025",
          supplierName: "供应商11",
          type_name: "11",
          purchasing: '组织c1',
          purchasingmoney: "40001",
          voucherDate: "2018年03月18日",
          key: "11"
        }
      ]
    },
    {
      orderCode: "NU0391026",
      supplierName: "供应商3",
      type_name: "2",
      purchasing: '组织a',
      purchasingmoney: "7000",
      voucherDate: "2018年02月05日",
      key: "2"
    },
    {
      orderCode: "NU0391027",
      supplierName: "供应商1",
      type_name: "3",
      purchasing: '组织b',
      purchasingmoney: "2000",
      voucherDate: "2018年07月01日",
      key: "3"
    },
    {
      orderCode: "NU0391028",
      supplierName: "供应商4",
      type_name: "4",
      purchasing: '组织c',
      purchasingmoney: "4000",
      voucherDate: "2019年03月01日",
      key: "4"
    },
    {
      orderCode: "NU0391029",
      supplierName: "供应商5",
      type_name: "5",
      purchasing: '组织d',
      purchasingmoney: "14000",
      voucherDate: "2019年02月14日",
      key: "5"
    },
    {
      orderCode: "NU0391030",
      supplierName: "供应商2",
      type_name: "1",
      purchasing: '组织e',
      purchasingmoney: "5000",
      voucherDate: "2019年02月18日",
      key: "6"
    },
    {
      orderCode: "NU0391031",
      supplierName: "供应商1",
      type_name: "2",
      purchasing: '组织f',
      purchasingmoney: "16000",
      voucherDate: "2019年01月01日",
      key: "7"
    },
    {
      orderCode: "NU0391032",
      supplierName: "供应商2",
      type_name: "3",
      purchasing: '组织g',
      purchasingmoney: "20000",
      voucherDate: "2019年01月31日",
      key: "8"
    },
];
const columns = [
    {
      title: "序号", dataIndex: "index", key: "index", width: 80,
      // @ts-ignore
      render(text, record, index: number) {
        return index + 1;
      }
    },
    { title: "订单编号", dataIndex: "orderCode", key: "orderCode", width: 200 },
    { title: "供应商名称", dataIndex: "supplierName", key: "supplierName", width: 200 },
    { title: "类型", dataIndex: "type_name", key: "type_name", width: 200 },
    { title: "采购组织", dataIndex: "purchasing", key: "purchasing", width: 200 },
    { title: "采购金额", dataIndex: "purchasingmoney", key: "purchasingmoney", width: 200 },
    { title: "凭证日期", dataIndex: "voucherDate", key: "voucherDate", width: 200 },
]
const filterColumn = JSON.parse(JSON.stringify(columns))
filterColumn[1]["filterType"] = 'dropdown'
filterColumn[1]["filterDropdownOptions"] = {allowClear: true}   
filterColumn[2]["filterType"] = 'text'
filterColumn[2]["filterDropdownOptions"] = {allowClear: true}   
filterColumn[3]["filterType"] = 'text'
filterColumn[3]["filterDropdownOptions"] = {allowClear: true}   
filterColumn[6]["filterType"] = 'date'
filterColumn[6]["filterDropdownOptions"] = {allowClear: true}
class FilterDemo extends React.Component<any, any> {
    filterObj?: any;
    data: any;
    constructor(props: any) {
      super(props);
      this.filterObj = {};
      this.state = {
        data: data,
      }
      this.data = data;
    }
    handleFilter = (arr: any, obj: any) => {
      let tempArr = [];
      let { key, val } = obj;
      if (!val && val !== '0' && val !== 0) {
        tempArr = arr;
        return tempArr
      }
      switch (obj.condition) {
        case 'LIKE':
          tempArr = arr.filter((item: any) => {
            return item[key].toString().toLowerCase().includes(val.toString().toLowerCase());
          })
          break;
        case 'ULIKE':
          tempArr = arr.filter((item: any) => {
            return !item[key].toString().toLowerCase().includes(val.toString().toLowerCase());
          })
          break;
        case 'EQ':
          tempArr = arr.filter((item: any) => {
            return item[key].toString().toLowerCase() === val.toString().toLowerCase();
          })
          break;
        case 'UEQ':
          tempArr = arr.filter((item: any) => {
            return item[key].toString().toLowerCase() !== val.toString().toLowerCase();
          })
          break;
        case 'RLIKE':
          tempArr = arr.filter((item: any) => {
            return item[key].toString().toLowerCase().startsWith(val.toString().toLowerCase());
          })
          break;
        case 'LLIKE':
          tempArr = arr.filter((item: any) => {
            return item[key].toString().toLowerCase().endsWith(val.toString().toLowerCase());
          })
          break;
        case 'GT':  //大于
          tempArr = arr.filter((item: any) => {
            return item[key] > val;
          })
          break;
        case 'GTEQ': //大于等于
          tempArr = arr.filter((item: any) => {
            return item[key] >= val;
          })
          break;
        case 'LT': // 小于
          tempArr = arr.filter((item: any) => {
            return item[key] < val;
          })
          break;
        case 'LTEQ': // 小于等于
          tempArr = arr.filter((item: any) => {
            return item[key] <= val;
          })
          break;
        default:
          tempArr = arr;
      }
      return tempArr;
    }
    filter = () => {
      let tempData = this.data;
      for (let k in this.filterObj) {
        if (this.filterObj[k] !== undefined) {
          tempData = this.handleFilter(tempData, this.filterObj[k])
        }
      }
      this.setState({ data: tempData })
    }
    handlerFilterChange = (key: string, val: any, condition: any) => {
      if (key === 'date') {
        if (val) {
          val = moment(val).format("YYYY-MM-DD");
        }
      }
      this.filterObj[key] = {
        key,
        val,
        condition
      }
      this.filter()
    }
    handlerFilterClear = (key: any) => {
      this.filterObj[key] = undefined;
      this.filter()
    }
    render() {
      return (
        <Table
          columns={filterColumn}
          data={this.state.data}
          filterable={true}
          onFilterChange={this.handlerFilterChange}//下拉条件的回调(key,val)=>()
          onFilterClear={this.handlerFilterClear}//触发输入操作以及其他的回调(key,val)=>()
          {...this.props}
        />
      )
    }
  }
export default FilterDemo

import { Table, TableProps } from "../../../../packages";
import moment from "moment"
import React, {Component} from 'react';
type DefaultRecordType = Record<string, any>;

const columns: TableProps['columns'] = [
    {title: "姓名", width: 180, dataIndex: "name", key: "name", filterType: "text", filterDropdown: "show"},
    {title: "年龄", width: 150, dataIndex: "age", key: "age", filterType: "dropdown", filterDropdown: "show"},
    {
        title: "日期",
        width: 300,
        dataIndex: "date",
        key: "date",
        filterType: "date",
        filterDropdown: "show",
        format: "YYYY-MM-DD"
    },
    {title: "居住地址", width: 150, dataIndex: "address", key: "address", filterType: "dropdown", filterDropdown: "show"},
    {title: "备注", dataIndex: "mark", key: "mark"}
];

class Demo23 extends Component<any, any> {
    filterObj: DefaultRecordType;
    data: TableProps['data'];
    constructor(props: {}) {
        super(props)
        this.filterObj = {};
        this.state = {
            data: [
                {
                    key: "1",
                    name: "John Brown",
                    age: 32,
                    date: "2018-09-19",
                    address: "朝阳区",
                    mark: "无"
                },
                {
                    key: "2",
                    name: "Jim Green",
                    age: 40,
                    date: "2018-09-18",
                    address: "朝阳区",
                    mark: "无"
                },
                {
                    key: "3",
                    name: "Jim Green",
                    age: 40,
                    date: "2018-09-18",
                    address: "东城区",
                    mark: "无"
                },
                {
                    key: "4",
                    name: "Jim Green",
                    age: 40,
                    date: "2018-09-18",
                    address: "东城区",
                    mark: "无"
                }, {
                    key: "5",
                    name: "John Brown",
                    age: 32,
                    date: "2018-09-18",
                    address: "海淀区",
                    mark: "无"
                },
                {
                    key: "6",
                    name: "Jim Green",
                    age: 48,
                    date: "2018-09-18",
                    address: "海淀区",
                    mark: "无"
                },
                {
                    key: "7",
                    name: "Jim Green",
                    age: 40,
                    date: "2018-09-18",
                    address: "海淀区",
                    mark: "无"
                },
                {
                    key: "8",
                    name: "Jim Green",
                    age: 38,
                    date: "2018-09-18",
                    address: "海淀区",
                    mark: "无"
                }
            ],
            data2: [
                {
                    key: "1",
                    name: "John Brown",
                    age: 32,
                    date: "2018-09-19",
                    address: "朝阳区",
                    mark: "无"
                },
                {
                    key: "2",
                    name: "Jim Green",
                    age: 40,
                    date: "2018-09-18",
                    address: "朝阳区",
                    mark: "无"
                },
                {
                    key: "3",
                    name: "Jim Green",
                    age: 40,
                    date: "2018-09-18",
                    address: "东城区",
                    mark: "无"
                },
                {
                    key: "4",
                    name: "Jim Green",
                    age: 40,
                    date: "2018-09-18",
                    address: "东城区",
                    mark: "无"
                }, {
                    key: "5",
                    name: "John Brown",
                    age: 32,
                    date: "2018-09-18",
                    address: "海淀区",
                    mark: "无"
                },
                {
                    key: "6",
                    name: "Jim Green",
                    age: 48,
                    date: "2018-09-18",
                    address: "海淀区",
                    mark: "无"
                },
                {
                    key: "7",
                    name: "Jim Green",
                    age: 40,
                    date: "2018-09-18",
                    address: "海淀区",
                    mark: "无"
                },
                {
                    key: "8",
                    name: "Jim Green",
                    age: 38,
                    date: "2018-09-18",
                    address: "海淀区",
                    mark: "无"
                }
            ]
        }
        this.data = this.state.data
    }

	handleFilter = (arr: DefaultRecordType[], obj: DefaultRecordType) => {
	    let tempArr = [];
	    let {key, val} = obj;
	    if (!val && val !== '0' && val !== 0) {
	        tempArr = arr;
	        return tempArr
	    }
	    switch (obj.condition) {
	    case 'LIKE':
	        tempArr = arr.filter(item => {
	            return item[key].toString().toLowerCase().includes(val.toString().toLowerCase());
	        })
	        break;
	    case 'ULIKE':
	        tempArr = arr.filter(item => {
	            return !item[key].toString().toLowerCase().includes(val.toString().toLowerCase());
	        })
	        break;
	    case 'EQ':
	        tempArr = arr.filter(item => {
	            return item[key].toString().toLowerCase() === val.toString().toLowerCase();
	        })
	        break;
	    case 'UEQ':
	        tempArr = arr.filter(item => {
	            return item[key].toString().toLowerCase() !== val.toString().toLowerCase();
	        })
	        break;
	    case 'RLIKE':
	        tempArr = arr.filter(item => {
	            return item[key].toString().toLowerCase().startsWith(val.toString().toLowerCase());
	        })
	        break;
	    case 'LLIKE':
	        tempArr = arr.filter(item => {
	            return item[key].toString().toLowerCase().endsWith(val.toString().toLowerCase());
	        })
	        break;
	    case 'GT': // 大于
	        tempArr = arr.filter(item => {
	            return item[key] > val;
	        })
	        break;
	    case 'GTEQ': // 大于等于
	        tempArr = arr.filter(item => {
	            return item[key] >= val;
	        })
	        break;
	    case 'LT': // 小于
	        tempArr = arr.filter(item => {
	            return item[key] < val;
	        })
	        break;
	    case 'LTEQ': // 小于等于
	        tempArr = arr.filter(item => {
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

	    this.setState({data: tempData})

	}
	handlerFilterChange = (key: string, val: string, condition: string) => {
	    console.log('参数：key=', key, ' value=', val, 'condition=', condition);
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
	    console.log(this.filterObj)
	}

	handlerFilterClear = (key: string) => {
	    this.filterObj[key] = undefined;
	    this.filter()
	    // console.log(key)
	    // this.setState({
	    //   data: this.state.data2
	    // })
	}

	render() {
	    return <Table
	        onFilterChange={this.handlerFilterChange}// 下拉条件的回调(key,val)=>()
	        onFilterClear={this.handlerFilterClear}// 触发输入操作以及其他的回调(key,val)=>()
	        filterDelay={500}// 输入文本多少ms触发回调函数，默认300ms
	        filterable={true}// 是否开启过滤数据功能
	        bordered
	        columns={columns}
	        data={this.state.data}
            {...this.props} />;
	}
}

export default Demo23;

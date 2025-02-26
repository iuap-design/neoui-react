/*
 * @Author: Mr.mjc
 * @Date: 2022-08-02 11:36:43
 * @LastEditors: Mr.mjc
 * @LastEditTime: 2022-08-23 16:03:22
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/demo/demo-other/Demo0702.tsx
 */
/**
 *
 * @title 复杂表格中行过滤
 * @parent 列操作-过滤 Filter
 * @description 在过滤数据行的基础上增加列拖拽、动态菜单显示、下拉条件动态传入自定义等
 * @type other
 * demo0702
 */

import {Checkbox, Table, TableProps} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
type DefaultRecordType = Record<string, any>

const {multiSelect, sort} = Table

const data: TableProps['data'] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        date: '2018-09-19',
        time: '12:12:00',
        address: '朝阳区',
        mark: '无'
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 40,
        date: '2018-09-18',
        time: '11:11:00',
        address: '朝阳区',
        mark: '无'
    },
    {
        key: '3',
        name: 'Jim Green',
        age: 40,
        date: '2018-09-18',
        time: '12:12:00',
        address: '东城区',
        mark: '无'
    },
    {
        key: '4',
        name: 'Jim Green',
        age: 40,
        date: '2018-09-18',
        time: '10:10:00',
        address: '东城区',
        mark: '无'
    },
    {
        key: '5',
        name: 'John Brown',
        age: 32,
        date: '2018-09-18',
        time: '12:12:00',
        address: '海淀区',
        mark: '无'
    },
    {
        key: '6',
        name: 'Jim Green',
        age: 48,
        date: '2018-09-18',
        time: '12:12:00',
        address: '海淀区',
        mark: '无'
    },
    {
        key: '7',
        name: 'Jim Green',
        age: 40,
        date: '2018-09-18',
        time: '11:11:00',
        address: '海淀区',
        mark: '无'
    },
    {
        key: '8',
        name: 'Jim Green',
        age: 38,
        date: '2018-09-18',
        time: '12:12:00',
        address: '海淀区',
        mark: '无'
    }
]
const columns: TableProps['columns'] = [
    {
        title: '姓名',
        width: 180,
        dataIndex: 'name',
        key: 'name',
        filterType: 'dropdown', // 输入框类型
        filterDropdown: 'show', // 显示条件
        filterDropdownType: 'string' // 字符条件
    },
    {
        title: '年龄',
        width: 180,
        dataIndex: 'age',
        key: 'age',
        filterType: 'dropdown', // 输入框类型
        filterDropdown: 'show', // 显示条件
        filterDropdownType: 'number', // 字符条件
        filterDropdownOptions: {
            showSearch: true
        }
    },
    {
        title: '日期',
        width: 300,
        dataIndex: 'date',
        key: 'date',
        filterType: 'date', // 输入框类型
        filterDropdown: 'show', // 显示条件
        filterDropdownType: 'string' // 字符条件
    },
    {
        title: '时间',
        width: 300,
        dataIndex: 'time',
        key: 'time',
        filterType: 'time', // 输入框类型
        filterDropdown: 'show', // 显示条件
        filterDropdownType: 'string', // 字符条件
        filterDropdownOptions: {
            // showHour: false,
            // allowClear: true
        }
    },
    {
        title: '地址',
        width: 200,
        dataIndex: 'address',
        key: 'address',
        filterType: 'dropdown', // 输入框类型
        filterDropdown: 'show', // 显示条件
        filterDropdownType: 'string' // 字符条件
    },
    {
        title: '备注',
        width: 80,
        dataIndex: 'mark',
        key: 'mark'
    }
]

const MultiSelectTable = multiSelect(Table, Checkbox)
const ComplexTable = sort(MultiSelectTable)

interface Demo24State {
    data: TableProps['data']
    selectedRowKeys: TableProps['selectedRowKeys']
}

class Demo24 extends Component<{}, Demo24State> {
    filterObj: DefaultRecordType
    data: TableProps['data']
    constructor(props: {}) {
        super(props)
        this.filterObj = {}
        this.state = {
            data: data,
            selectedRowKeys: []
        }
        this.data = data
    }

    handleFilter = (arr: DefaultRecordType[], obj: DefaultRecordType) => {
        let tempArr = []
        let {key, val} = obj
        if (!val && val !== '0' && val !== 0) {
            tempArr = arr
            return tempArr
        }
        switch (obj.condition) {
            case 'LIKE':
                tempArr = arr.filter(item => {
                    return item[key].toString().toLowerCase().includes(val.toString().toLowerCase())
                })
                break
            case 'ULIKE':
                tempArr = arr.filter(item => {
                    return !item[key].toString().toLowerCase().includes(val.toString().toLowerCase())
                })
                break
            case 'EQ':
                tempArr = arr.filter(item => {
                    return item[key].toString().toLowerCase() === val.toString().toLowerCase()
                })
                break
            case 'UEQ':
                tempArr = arr.filter(item => {
                    return item[key].toString().toLowerCase() !== val.toString().toLowerCase()
                })
                break
            case 'RLIKE':
                tempArr = arr.filter(item => {
                    return item[key].toString().toLowerCase().startsWith(val.toString().toLowerCase())
                })
                break
            case 'LLIKE':
                tempArr = arr.filter(item => {
                    return item[key].toString().toLowerCase().endsWith(val.toString().toLowerCase())
                })
                break
            case 'GT': // 大于
                tempArr = arr.filter(item => {
                    return item[key] > val
                })
                break
            case 'GTEQ': // 大于等于
                tempArr = arr.filter(item => {
                    return item[key] >= val
                })
                break
            case 'LT': // 小于
                tempArr = arr.filter(item => {
                    return item[key] < val
                })
                break
            case 'LTEQ': // 小于等于
                tempArr = arr.filter(item => {
                    return item[key] <= val
                })
                break
            default:
                tempArr = arr
        }
        return tempArr
    }
    filter = () => {
        let tempData = this.data
        for (let k in this.filterObj) {
            if (this.filterObj[k] !== undefined) {
                tempData = this.handleFilter(tempData, this.filterObj[k])
            }
        }
        // 过滤后隐藏的数据选中状态全清掉
        let showKeys = tempData.map(item => item.key)
        let showSlectedKeys = [...this.state.selectedRowKeys].filter(item => showKeys.includes(item))
        this.setState({data: tempData, selectedRowKeys: showSlectedKeys})
    }
    handlerFilterChange = (key: string, val: string, condition: string) => {
        console.log('参数：key=', key, ' value=', val, 'condition=', condition)
        if (key === 'date') {
            if (val) {
                val = moment(val).format('YYYY-MM-DD')
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
        this.filterObj[key] = undefined
        this.filter()
        console.log(this.filterObj)
    }

    render() {
        let rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys: TableProps['selectedRowKeys'], selectedRows: TableProps['data']) => {
                console.log('selectedRowKeys', selectedRowKeys, 'selectedRows', selectedRows)
                this.setState({
                    selectedRowKeys
                })
            },
            onSelectAll: (check: boolean, selectedRows: TableProps['data'], changeRows: TableProps['data']) => {
                console.log('check', check, 'selectedRows', selectedRows, 'changeRows', changeRows)
            }
        }

        return (
            <ComplexTable
                onFilterChange={this.handlerFilterChange} // 下拉条件的回调(key,val)=>()
                onFilterClear={this.handlerFilterClear} // 触发输入操作以及其他的回调(key,val)=>()
                filterDelay={500} // 输入文本多少ms触发回调函数，默认500ms
                filterable={true} // 是否开启过滤数据功能
                bordered
                rowSelection={rowSelection}
                columns={columns}
                data={this.state.data}
            />
        )
    }
}

export default Demo24

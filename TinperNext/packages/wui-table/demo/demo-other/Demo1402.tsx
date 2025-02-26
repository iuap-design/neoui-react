/**
 *
 * @title 嵌套子表格滚动加载
 * @parent 无限滚动 Infinite-scroll
 * @description 通过expandedRowRender参数来实现子表格。注意：表格行数据必须有唯一标识，可以通过 `data.key` 或 `rowKey` 两种方式传入。
 * @type other
 * demo1402
 */

import {Popconfirm, Table, TableProps} from '@tinper/next-ui';
import React, {Component} from "react";
type DefaultRecordType = Record<string, any>;

const {bigData} = Table;
const BigDataTable = bigData(Table);
const outColumns: TableProps['columns'] = [
    {
        title: "操作",
        dataIndex: "d",
        key: "d",
        width: 200,
        render(text: any, _record: DefaultRecordType, index: number) {
            return (
                <Popconfirm trigger="click" getPopupContainer={() => document.querySelector('.demo31-expanded-table .wui-table-body')} placement="right" content={'这是第' + index + '行，内容为:' + text}>
                    <a href="javascript:;">
						一些操作
                    </a>
                </Popconfirm>
            );
        }
    },
    {title: "用户名", dataIndex: "a", key: "a", width: 250},
    {title: "性别", dataIndex: "b", key: "b", width: 100},
    {title: "年龄", dataIndex: "c", key: "c", width: 200},

];
const innerColumns = (_index: number) => ([
    {
        title: "操作",
        dataIndex: "d",
        key: "d",
        width: 200,
        render(text: any, _record: DefaultRecordType, index: number) {
            return (
                <Popconfirm trigger="click" getPopupContainer={() => document.querySelector(`.expanded-table-${_index} .wui-table-body`)} placement="right" content={'这是第' + index + '行，内容为:' + text}>
                    <a href="javascript:;">
						一些操作
                    </a>
                </Popconfirm>
            );
        }
    },
    {title: "用户名", dataIndex: "a", key: "a", width: 100},
    {title: "性别", dataIndex: "b", key: "b", width: 100},
    {title: "年龄", dataIndex: "c", key: "c", width: 200},

]);

const data16: TableProps['data'] = [...new Array(10000)].map((_e, i) => {
    return {a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i};
})


class Demo31 extends Component<{}, {dataObj: DefaultRecordType}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            dataObj: {
                0: [
                    {a: "令狐冲", b: "男", c: 41, d: "操作", key: "1"},
                    {a: "杨过", b: "男", c: 67, d: "操作", key: "2"}
                ],
                1: [
                    {a: "令狐冲", b: "男", c: 41, d: "操作", key: "1"},
                    {a: "菲菲", b: "nv", c: 67, d: "操作", key: "2"}
                ],
            }
        }
    }

	expandedRowRender = (_record: DefaultRecordType, index: number, _indent: number) => {
	    let height = 200;
	    let innderData = [...new Array(5)].map((_e, i) => {
	        return {a: index + "-" + i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: index + "-" + i};
	    })
	    return (
	        <Table
	            className={`expanded-table-${index}`}
	            columns={innerColumns(index)}
	            scroll={{y: height}}
	            data={innderData}

	        />
	    );
	};
	getData = (expanded: boolean, record: DefaultRecordType) => {
	    // 当点击展开的时候才去请求数据
	    let newObj = Object.assign({}, this.state.dataObj);
	    if (expanded) {
	        if (record.key === '1') {
	            newObj[record.key] = [
	                {a: "令狐冲", b: "男", c: 41, d: "操作", key: "1"},
	                {a: "杨过", b: "男", c: 67, d: "操作", key: "2"}
	            ]
	            this.setState({
	                dataObj: newObj
	            })
	        } else {
	            newObj[record.key] = [
	                {a: "令狐冲", b: "男", c: 41, d: "操作", key: "1"},
	                {a: "菲菲", b: "nv", c: 67, d: "操作", key: "2"}
	            ]
	            this.setState({
	                dataObj: newObj
	            })
	        }
	    }
	}
	haveExpandIcon = (_record: DefaultRecordType, index: number) => {
	    // 控制是否显示行展开icon，该参数只有在和expandedRowRender同时使用才生效
	    if (index == 0) {
	        return true;
	    }
	    return false;
	}

	render() {
	    return (
	        <BigDataTable
	            className="demo31-expanded-table"
	            columns={outColumns}
	            data={data16}
	            onExpand={this.getData}
	            expandedRowRender={this.expandedRowRender}
	            scroll={{y: 350}}
	            // defaultExpandedRowKeys={[0,1]}
	        />
	    );
	}
}

export default Demo31;

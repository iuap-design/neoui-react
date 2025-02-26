/**
 *
 * @title 万行以上数据渲染
 * @parent 无限滚动 Infinite-scroll
 * @description 万行数据渲染
 * @type bip
 * demo1401
 */

import {Button, Table, TableProps} from "@tinper/next-ui";
import React, {Component} from "react";

// const {bigData} = Table;
// const BigDataTable = bigData(Table);
const columns: TableProps['columns'] = [
    {
        title: '序号', dataIndex: 'index', key: 'index', width: 60, render(_text:any, _record: Record<string, any>, index: number) {
            return index + 1;
        }
    },

    {title: "用户名", dataIndex: "a", key: "a", width: 300},
    {title: "性别", dataIndex: "b", key: "b", width: 80},
    {title: "年龄", dataIndex: "c", key: "c", width: 200}

];

const data: TableProps['data'] = [...new Array(10000)].map((_e, i) => {
    const rs = {a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i};
    return rs;
})

interface Demo1401State {
    data: TableProps['data'];
    selectedRowIndex: number;
}
class Demo30 extends Component <{}, Demo1401State> {

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            data: data,
            selectedRowIndex: -1,
        }
    }

	/**
	 * 表体滚动加载时触发的回调函数
	 * @param endIndex 可视区最后一条数据的 index 序号
	 */
	handleBodyScroll = (endIndex: number) => {
	    console.log('endIndex：', endIndex);
	}

	render() {
	    return (
	        <div>
	            <Button onClick={() => {
	                this.setState({selectedRowIndex: 25})
	            }}>定位索引25行</Button>
	            <Table
	                columns={columns}
	                data={this.state.data}
	                // loadBuffer={10}
	                height={null}
	                scroll={{y: 350}}
	                currentIndex={this.state.selectedRowIndex}
	                onRowClick={(_record: Record<string, any>, index: number, _indent:React.MouseEvent<HTMLElement>) => {
	                    console.log('currentIndex--' + index);
	                }}
	                bigData={true}
	                onBodyScroll={this.handleBodyScroll}
	            />
	        </div>
	    );
	}
}

export default Demo30;

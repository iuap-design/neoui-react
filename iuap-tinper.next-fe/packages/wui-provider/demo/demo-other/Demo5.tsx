/**
 *
 * @title 全局配置table
 * @description 全局配置组件table
 *
 */

import {ConfigProvider, Radio, Switch, Table} from "@tinper/next-ui";
import React, {Component} from 'react';

const columns = [
    {title: "员工编号", dataIndex: "a", key: "a", width: 150},
    {title: "员工姓名", dataIndex: "b", key: "b", width: 100},
    {title: "性别", dataIndex: "c", key: "c", width: 100},
    {title: "部门", dataIndex: "d", key: "d", width: 100},
    {title: "职级", dataIndex: "e", key: "e", width: 100}
];

const data = [
    {a: "ASVAL_20190328", b: "小张", c: "男", d: "财务二科", e: "M1", key: "1"},
    {a: "ASVAL_20190320", b: "小明", c: "男", d: "财务一科", e: "T1", key: "2"},
    {a: "ASVAL_20190322", b: "小黄", c: "女", d: "财务二科", e: "G1", key: "4"},
    {a: "ASVAL_20190312", b: "小红", c: "女", d: "财务一科", e: "T2", key: "5"}
];

interface ProviderState {
	height: number;
	stripeLine: boolean;
	bordered: boolean;
}
class Demo4 extends Component<{}, ProviderState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            height: 35,
            stripeLine: false,
            bordered: false
        }
    }

	handleSizeChange = (value: number) => {
	    this.setState({
	        height: value
	    })
	};

	handleStripeLine = (value: boolean) => {
	    this.setState({
	        stripeLine: value
	    })
	}

	handleBordered = (value: boolean) => {
	    this.setState({
	        bordered: value
	    })
	}

	render() {
	    const {height} = this.state;
	    return (
	        <div className="demo1">
	            <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
	                <Radio.Group
	                    style={{marginRight: 20}}
	                    selectedValue={height}
	                    onChange={this.handleSizeChange}>
	                    <Radio.Button value={29}>紧凑</Radio.Button>
	                    <Radio.Button value={35}>标准</Radio.Button>
	                    <Radio.Button value={41}>宽松</Radio.Button>
	                </Radio.Group>
					斑马线：<Switch onChange={this.handleStripeLine}/>
					&nbsp;&nbsp;&nbsp;&nbsp;
					边框线：<Switch onChange={this.handleBordered}/>
	            </div>

	            <ConfigProvider table={{...this.state}}>
	                <Table columns={columns} data={data} showRowNum={true} headerHeight={30}/>
	            </ConfigProvider>
	        </div>
	    )
	}
}

export default Demo4;

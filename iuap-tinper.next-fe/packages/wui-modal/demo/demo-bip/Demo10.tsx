/**
 *
 * @title 嵌套表格的模态框
 * @description 嵌套表格
 *
 */

import {Button, Checkbox, Modal, Table} from '@tinper/next-ui';
import React, {Component} from 'react';

const {multiSelect} = Table;


let MultiSelectTable = multiSelect(Table, Checkbox);

interface DataObj {
	a:string;
	b:string;
	c:number;
	d:string;
	key:string;
	_checked:boolean
}
class Demo10 extends Component <{}, {showModal:boolean;data:DataObj[]}> {
	modal: Modal | null | undefined;
	constructor(props:{}) {
	    super(props);
	    this.state = {
	        showModal: false,
	        data: [
	            {a: "杨过", b: "男", c: 30, d: '内行', key: "2", _checked: true},
	            {a: "令狐冲", b: "男", c: 41, d: '大侠', key: "1", _checked: true},
	            {a: "郭靖", b: "男", c: 25, d: '大侠', key: "3", _checked: true}
	        ]
	    };

	}

	columns = [
	    {
	        title: "名字",
	        dataIndex: "a",
	        key: "a",
	        width: 100
	    },
	    {
	        title: "性别",
	        dataIndex: "b",
	        key: "b",
	        width: 100
	    },
	    {
	        title: "年龄",
	        dataIndex: "c",
	        key: "c",
	        width: 100,
	        sorter: (a:DataObj, b:DataObj) => a.c - b.c
	    },
	    {
	        title: "武功级别",
	        dataIndex: "d",
	        key: 100
	    }
	];

	close = () => {
	    this.setState({
	        showModal: false
	    });
	}
	open = () => {
	    this.setState({
	        showModal: true
	    });
	}

	getSelectedDataFunc = (data:DataObj[]) => {
	    console.log(data);
	};

	clear = () => {
	    let {data} = this.state;
	    data.forEach(item => item._checked = false)
	    this.setState({
	        data: JSON.parse(JSON.stringify(data))
	    })
	}

	render() {
	    // let multiObj = {
	    //     type: "checkbox"
	    // };
	    return (
	        <div>
	            <Button
	                bordered
	                className="demo-margin"
	                onClick={this.open}>
					打开模态框
	            </Button>
	            <Modal
	                visible={this.state.showModal}
	                onCancel={this.close}
	                size="lg"
	                ref={ref => this.modal = ref}
	                className="demo10-modal"
	                bodyStyle={{padding: '16px 0'}}
	            >
	                <MultiSelectTable
	                    columns={this.columns}
	                    data={this.state.data}
	                    // multiSelect={multiObj}
	                    scroll={{y: 80}}
	                    getSelectedDataFunc={this.getSelectedDataFunc}
	                />
	            </Modal>
	        </div>
	    )
	}
}

export default Demo10;

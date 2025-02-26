/**
 *
 * @title 渲染远程数据
 * @parent 数据操作 Data Opetation
 * @description 可通过 ajax 请求方式，从服务端读取并展现数据。也可自行接入其他数据处理方式。
 * @type bip
 * demo0302
 */

import {Button, Table, TableProps} from "@tinper/next-ui";
import React, {Component} from "react";
import reqwest from 'reqwest';

const columns: TableProps['columns'] = [{
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (name: any) => `${name.first} ${name.last}`,
    width: '20%',
}, {
    title: 'Gender',
    dataIndex: 'gender',
    width: '20%',
}, {
    title: 'Email',
    dataIndex: 'email',
}];

interface Demo22State {
	data: TableProps['data'];
	loading: boolean
}

class Demo22 extends Component<{}, Demo22State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: [],
            loading: false,
        }
    }

	fetch = (params = {}) => {
	    this.setState({loading: true});
	    reqwest({
	        url: 'https://randomuser.me/api',
	        method: 'get',
	        data: {
	            results: 10,
	            ...params,
	        },
	        type: 'json',
	    }).then((data: Record<string, any>) => {
	        this.setState({
	            loading: false,
	            data: data.results,
	        });
	    });
	}

	render() {
	    return (
	        <div className="demo22">
	            <div style={{
	                textAlign: 'right',
	                marginBottom: '8px'
	            }}>
	                <Button className="opt-btn" bordered onClick={() => this.fetch()}>点击加载远程数据</Button>
	            </div>
	            <Table
	                columns={columns}
	                data={this.state.data}
	                loading={this.state.loading}
	                scroll={{y: 200}}
	            />
	        </div>
	    );
	}
}

export default Demo22;

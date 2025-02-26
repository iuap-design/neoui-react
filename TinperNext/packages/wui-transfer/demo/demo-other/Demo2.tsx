/**
 *
 * @title 带搜索框的tranfer
 * @description
 *
 */

import {Transfer, TransferProps} from '@tinper/next-ui';
import React from 'react';


class Demo2 extends React.Component {
	state = {
	    mockData: [],
	    targetKeys: [],
	}

	componentDidMount() {
	    this.getMock();
	}

	getMock = () => {
	    const targetKeys = [];
	    const mockData = [];
	    for (let i = 0; i < 20; i++) {
	        const data = {
	            key: i.toString(),
	            title: `content${i + 1}`,
	            description: `description of content${i + 1}`,
	            chosen: Math.random() * 2 > 1,
	        };
	        if (data.chosen) {
	            targetKeys.push(data.key);
	        }
	        mockData.push(data);
	    }
	    this.setState({mockData, targetKeys});
	}
	filterOption: TransferProps['filterOption'] = (inputValue, option) => {
	    return option.title!.indexOf(inputValue) > -1;
	}
	handleChange: TransferProps['onChange'] = (targetKeys) => {
	    this.setState({targetKeys});
	}

	render() {
	    return (
	        <Transfer
	            dataSource={this.state.mockData}
	            showSearch
	            filterOption={this.filterOption}
	            targetKeys={this.state.targetKeys}
	            onChange={this.handleChange}
	            render={item => item.title as string}
	        />
	    );
	}
}


export default Demo2

/**
 *
 * @title 隐藏复选框
 * @description 通过`showCheckbox`参数控制复选框显示和隐藏
 *
 */


import {Transfer, TransferProps} from '@tinper/next-ui';
import React from 'react';

const mockData: TransferProps['dataSource'] = [];
for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1,

    });
}

const targetKeys = mockData
    .filter(item => +item.key % 3 > 1)
    .map(item => item.key);

class Demo4 extends React.Component {
	state = {
	    targetKeys,
	    selectedKeys: [],
	    showModal: false,
	    modalSize: ''
	}

	handleChange: TransferProps['onChange'] = (nextTargetKeys, direction, moveKeys) => {
	    this.setState({targetKeys: nextTargetKeys});

	    console.log('targetKeys: ', targetKeys);
	    console.log('direction: ', direction);
	    console.log('moveKeys: ', moveKeys);
	}

	handleSelectChange: TransferProps['onSelectChange'] = (sourceSelectedKeys, targetSelectedKeys) => {
	    this.setState({selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]});

	    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
	    console.log('targetSelectedKeys: ', targetSelectedKeys);
	}

	handleScroll: TransferProps['onScroll'] = (direction, e) => {
	    console.log('direction:', direction);
	    console.log('target:', e.target);
	}


	render() {
	    const state = this.state;

	    return (
	        <Transfer
	            dataSource={mockData}
	            showCheckbox={false}
	            titles={['Source', 'Target']}
	            targetKeys={state.targetKeys}
	            selectedKeys={state.selectedKeys}
	            onChange={this.handleChange}
	            onSelectChange={this.handleSelectChange}
	            onScroll={this.handleScroll}
	            render={item => item.title as string}
	        />
	    );
	}
}


export default Demo4;

/**
 *
 * @title 自定义渲染行数据
 * @description 自定义渲染每一个 Transfer Item，可用于渲染复杂数据。
 *
 */


import {Transfer, TransferProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const allTargetKeys = [];
const mockData: TransferProps['dataSource'] = [];
for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1,

    });
    allTargetKeys.push(i.toString());
}

const targetKeys = mockData
    .filter(item => +item.key % 3 > 1)
    .map(item => item.key);

class Demo6 extends Component {
	state = {
	    targetKeys,
	    selectedKeys: [],
	    showModal: false,
	    modalSize: ''
	}

	handleChange: TransferProps['onChange'] = (nextTargetKeys, direction, moveKeys) => {
	    this.setState({targetKeys: nextTargetKeys});

	    console.log('targetKeys: ', nextTargetKeys);
	    console.log('direction: ', direction);
	    console.log('moveKeys: ', moveKeys);
	}

	handleSelectChange: TransferProps['onSelectChange'] = (sourceSelectedKeys, targetSelectedKeys) => {
	    this.setState({selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]});

	    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
	    console.log('targetSelectedKeys: ', targetSelectedKeys);
	}

	/**
	 * 自定义渲染行数据
	 */
	renderItem: TransferProps['render'] = (item) => {
	    const customLabel = (
	        <span className="custom-item">
	            {item.title}
	        </span>
	    );

	    return {
	        label: customLabel, // 显示的ReactElement节点
	        value: item.title as string, // 作为title显示
	    };
	}

	render() {
	    const state = this.state;
	    const targetKeys = [...this.state.targetKeys];
	    return (
	        <div>
	            <Transfer
	                dataSource={mockData}
	                titles={['Source', 'Target']}
	                targetKeys={targetKeys}
	                selectedKeys={state.selectedKeys}
	                onChange={this.handleChange}
	                onSelectChange={this.handleSelectChange}
	                render={this.renderItem}
	            />
	        </div>
	    );
	}
}


export default Demo6

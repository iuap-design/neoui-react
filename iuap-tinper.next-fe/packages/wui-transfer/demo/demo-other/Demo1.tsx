/**
 *
 * @title 常用可选transfer
 * @description targetKeys需要通过ES6的扩展运算符进行赋值，实现对象的浅拷贝
 *
 */


import {Transfer, TransferProps, Switch} from '@tinper/next-ui';
import React from 'react';

const allTargetKeys: string[] = [];
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

class Demo1 extends React.Component {
	state = {
	    targetKeys,
	    selectedKeys: [],
	    showModal: false,
	    modalSize: '',
	    disabled: false,
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

	handleScroll: TransferProps['onScroll'] = (direction, e) => {
	    console.log('direction is:', direction);
	    console.log('target is:', e.target);
	}

	onSwitchChange = () => {
	    this.setState({disabled: !this.state.disabled})
	}

	render() {
	    const targetKeys = [...this.state.targetKeys];
	    return (
	        <div>
	            <Transfer
	                showSearch
	                dataSource={mockData}
	                targetKeys={targetKeys}
	                selectedKeys={this.state.selectedKeys}
	                onChange={this.handleChange}
	                onSelectChange={this.handleSelectChange}
	                onScroll={this.handleScroll}
	                disabled={this.state.disabled}
	            />
	            <Switch size="lg" checked={this.state.disabled} style={{width: '80px', marginTop: '20px'}} onChange={this.onSwitchChange} checkedChildren="disabled" unCheckedChildren={"disabled"} />
	        </div>
	    );
	}
}


export default Demo1

/**
 *
 * @title 常用可选transfer
 * @description targetKeys需要通过ES6的扩展运算符进行赋值，实现对象的浅拷贝
 *
 */


import {Transfer, TransferProps} from '@tinper/next-ui';
import React from 'react';

const allTargetKeys: string[] = [];
const mockData: TransferProps['dataSource'] = [];
for (let i = 0; i < 5; i++) {
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
console.log(targetKeys)

class Demo1 extends React.Component {
	state = {
	    targetKeys,
	    selectedKeys: [],
	    showModal: false,
	    modalSize: '',
	    disabled: false,
	}

	render() {
	    return (
	        <div>
	            <Transfer
	                dataSource={mockData}
	                targetKeys={['1', '2']}
	                lazy={{container: "modal"}}
	                draggable
	            />
	        </div>
	    );
	}
}


export default Demo1

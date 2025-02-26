/**
 *
 * @title fieldNames用法
 * @description 可以指定其他属性作为 label、value、children 的字段。
 *
 */
import {TreeSelect, TreeSelectProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const treeData = [{
    title: '0-0',
    value: '0-0',
    key: '0-0',
    title2: 'Mexico',
    value2: '1',
    children2: [{
        title: '0-0-1',
        value: '0-0-1',
        key: '0-0-1',
        title2: 'Cuba',
        value2: '2',
    }, {
        title: '0-0-2',
        value: '0-0-2',
        key: '0-0-2',
        title2: 'Haiti',
        value2: '3'
    }],
}, {
    title: '0-1',
    value: '0-1',
    key: '0-1',
    title2: 'Costa Rica',
    value2: '4'
}];


class Demo7 extends Component {
	state = {
	    value: undefined,
	}
	onChange: TreeSelectProps['onChange'] = (value, _node, _extra) => {
	    console.log('value is', value) // 可以看到value是value2的值
	    this.setState({value});
	}

	render() {
	    return (

	        <TreeSelect
	            autoClearSearchValue={false}
	            style={{width: 300}}
	            value={this.state.value}
	            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
	            treeData={treeData}
	            multiple
	            treeDefaultExpandAll
	            onChange={this.onChange}
	            showSearch
	            fieldNames={{label: 'title2', value: 'value2', children: 'children2'}}
	        />

	    )
	}
}

export default Demo7

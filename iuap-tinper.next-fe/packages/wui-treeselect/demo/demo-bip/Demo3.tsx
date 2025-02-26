/**
 *
 * @title treeSelect 多选
 * @description 添加multiple属性，下拉树选项可以多选。
 *
 */
import {TreeSelect, TreeSelectProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const treeData = [{
    title: '0-0',
    value: '0-0',
    key: '0-0',
    children: [{
        title: '0-0-1',
        value: '0-0-1',
        key: '0-0-1',
    }, {
        title: '0-0-2',
        value: '0-0-2',
        key: '0-0-2',
    }],
}, {
    title: '0-1',
    value: '0-1',
    key: '0-1',
}];


class Demo3 extends Component {
	state = {
	    value: undefined,
	}
	onChange: TreeSelectProps['onChange'] = (value, _node, _extra) => {
	    this.setState({value});
	}

	render() {
	    return (

	        <TreeSelect
	            bordered='bottom'
	            requiredStyle
	            autoClearSearchValue={false}
	            style={{width: 300}}
	            value={this.state.value}
	            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
	            treeData={treeData}
	            multiple
	            treeDefaultExpandAll
	            onChange={this.onChange}
	            showSearch
	        />

	    )
	}
}

export default Demo3

/**
 *
 * @title treeSelect 勾选框树
 * @description 使用勾选框实现多选功能。
 *
 */
import {TreeSelect, TreeSelectProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const SHOW_PARENT = TreeSelect.SHOW_PARENT as TreeSelectProps['showCheckedStrategy'];

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
    disableCheckbox: true
}];


class Demo4 extends Component {
	state = {
	    value: undefined,
	}
	onChange: TreeSelectProps['onChange'] = (value, _node, _extra) => {
	    this.setState({value});
	}

	render() {
	    return (

	        <TreeSelect
	            style={{width: 300}}
	            value={this.state.value}
	            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
	            treeData={treeData}
	            treeCheckable={true}
	            showCheckedStrategy={SHOW_PARENT}
	            treeDefaultExpandAll
	            onChange={this.onChange}
	            showSearch
	            requiredStyle
	        />

	    )
	}
}

export default Demo4

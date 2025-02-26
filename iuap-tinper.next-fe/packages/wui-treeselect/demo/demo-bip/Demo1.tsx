/**
 *
 * @title treeSelect基本使用
 * @description treeSelect基本使用—单选。
 *
 */
import {TreeSelect, TreeSelectProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const {TreeNode} = TreeSelect;

class Demo1 extends Component {
	state = {
	    value: undefined
	}

    onChange: TreeSelectProps['onChange'] = (value, _node, _extra) => {

	    this.setState({value});
    }
	onSelect: TreeSelectProps['onSelect'] = (value: string, _option: Record<string, any>) => {
	    console.log('--value--' + value);
	}

	render() {
	    return (
	        <TreeSelect
	            requiredStyle
	            bordered='bottom'
	            disabled
	            showSearch
	            style={{width: 300}}
	            value={this.state.value}
	            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
	            placeholder="请选择"
	            allowClear
	            treeDefaultExpandAll
	            onChange={this.onChange}
	            onSelect={this.onSelect}
	        >
	            <TreeNode value="parent 1" title="用友网络股份有限公司" key="0-1">
	                <TreeNode value="parent 1-0" title="用友网络股份有限公司1-0" key="0-1-1">
	                    <TreeNode value="leaf1" title="用友网络股份有限公司leaf" key="random"/>
	                    <TreeNode value="leaf2" title="用友网络股份有限公司leaf" key="random1"/>
	                </TreeNode>
	                <TreeNode value="parent 1-1" title="用友网络股份有限公司" key="random2">
	                    <TreeNode value="sss" title="用友网络股份有限公司" key="random3"/>
	                </TreeNode>
	            </TreeNode>
	        </TreeSelect>
	    )
	}
}

export default Demo1

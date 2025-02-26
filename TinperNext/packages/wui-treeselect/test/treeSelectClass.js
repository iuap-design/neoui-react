/**
 *
 * @title treeSelect基本使用
 * @description treeSelect基本使用—单选。
 *
 */
import React, {Component} from 'react';
import TreeSelect from '../src';

const {TreeNode} = TreeSelect;

class TreeSelectDemo extends Component {
	state = {
	    value: undefined,
	}

	onChange = (value) => {
	    this.setState({value});
	}
	onSelect = (value, node, extra) => {
	    console.log('--value--' + value);
	}

	render() {
	    return (
	        <div id="root">
	            <TreeSelect
	                showSearch
	                {...this.props}
	                getPopupContainer={() => document.getElementById('root')}
	                // style={{ width: 300 }}
	                // value={this.state.value}
	                open={true}
	                // dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
	                // placeholder="请选择"
	                // allowClear
	                treeDefaultExpandAll
	                treeDefaultExpandedKeys={["parent 1", "parent 1-0", "parent 1-1", "parent 1-2", "parent 1-3", "parent 1-4", "parent 1-5"]}
	                defaultValue='leaf1'
	                // placeholder ='请选择'
	                // onChange={this.onChange}
	                // onSelect={this.onSelect}
	            >
					{
						this.props.children === false ? null :
						<TreeNode value="parent 1" title="用友网络股份有限公司" key="parent 1">
							<TreeNode value="parent 1-0" title="用友网络股份有限公司1-0" key="parent 1-0">
								<TreeNode value="leaf1" title="用友网络股份有限公司leaf1" key="leaf1"/>
								<TreeNode value="leaf2" title="用友网络股份有限公司leaf22222222222222222222222222222222222222"
										key="leaf2"/>
							</TreeNode>
							<TreeNode value="parent 1-1" title="用友网络股份有限公司" key="parent 1-1">
								<TreeNode value="sss" title="用友网络股份有限公司" key="sss"/>
							</TreeNode>
							<TreeNode value="parent 1-2" title="用友网络股份有限公司2" key="parent 1-2">
								<TreeNode value="random121" title="用友网络股份有限公司2" key="random121"/>
							</TreeNode>
							<TreeNode value="parent 1-3" title="用友网络股份有限公司3" key="parent 1-3">
								<TreeNode value="random131" title="用友网络股份有限公司3" key="random131"/>
							</TreeNode>
							<TreeNode value="parent 1-4" title="用友网络股份有限公司4" key="parent 1-4">
								<TreeNode value="random141" title="用友网络股份有限公司4" key="random141"/>
							</TreeNode>
							<TreeNode value="parent 1-5" title="用友网络股份有限公司5" key="parent 1-5">
								<TreeNode value="random151" title="用友网络股份有限公司5" key="random151"/>
							</TreeNode>
						</TreeNode>
					}
	            </TreeSelect>
	        </div>
	    )
	}
}

export default TreeSelectDemo

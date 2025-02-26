/**
 *
 * @title 自定义input回显示例
 * @description 通过treeNodeLabelProp 自定义 回显 内容
 *
 */
import {TreeSelect, TreeSelectProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const {TreeNode} = TreeSelect;

class Demo11 extends Component {
	state = {
	    value: undefined,
	}

    onChange: TreeSelectProps['onChange'] = (value, _node, _extra) => {

	    this.setState({value});
    }
	onSelect: TreeSelectProps['onSelect'] = (value: string, _option: Record<string, any>) => {
	    console.log('--value--' + value + 1);
	}

	render() {
	    return (
	        <TreeSelect
	            showSearch
	            style={{width: 300}}
	            value={this.state.value}
	            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
	            placeholder="请选择"
	            allowClear
	            treeNodeFilterProp='label'
	            filterTreeNode={(inputValue: string, treeNode: any) => {
	                console.log(treeNode, inputValue)
	                return treeNode.title.includes(inputValue)
	            }}
	            treeNodeLabelProp="label"
	            treeDefaultExpandAll
	            onChange={this.onChange}
	            onSelect={this.onSelect}
	        >
	            <TreeNode value="parent 1" label="用友网络科技有限公司北京分公司" title="用友网络科技有限公司北京分公司" key="0-1">
	                <TreeNode value="parent 1-0" label={<div style={{display: "flex"}}><div style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>用友网络科技有限公司北京分公司</div> <div> &gt; 技术平台大前端技术组织开发部</div></div>} title="技术平台大前端技术组织开发部" key="0-1-1">
	                    <TreeNode value="leaf1" label="技术平台大前端技术组织开发部 > 业务平台" title="业务平台" key="random"/>
	                    <TreeNode value="leaf2" label="技术平台大前端技术组织开发部 > 财务平台" title="财务平台" key="random1"/>
	                </TreeNode>
	                <TreeNode value="parent 1-1" label="用友网络科技有限公司北京分公司 > 大财务" title="大财务" key="random2">
	                    <TreeNode value="sss" label="大财务 > 小财务" title="小财务" key="random3"/>
	                </TreeNode>
	            </TreeNode>
	        </TreeSelect>
	    )
	}
}

export default Demo11

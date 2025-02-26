/**
 *
 * @title fieldid的使用
 * @description fieldid生成在选项，以用户传入key为 基准
 *
 */

import {Icon, Tree, TreeProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const TreeNode = Tree.TreeNode;

const defaultProps = {
    keys: ['$0-0-0', '$0-0-1']
}
interface DemoProps {
    keys: string[]
}
interface DemoState {
    defaultExpandedKeys: string[];
    defaultSelectedKeys: string[];
    defaultCheckedKeys: string[];
    checkedKeys: {checked: string[]};
}
class Demo15 extends Component<DemoProps, DemoState> {

     static defaultProps = defaultProps;

     constructor(props: DemoProps) {
         super(props);
         const keys = this.props.keys;
         this.state = {
             defaultExpandedKeys: keys,
             defaultSelectedKeys: keys,
             defaultCheckedKeys: keys,
             checkedKeys: {checked: keys},
         };
     }

     onSelect: TreeProps['onSelect'] = (_electedKeys, info) => {
	    console.log('selected', info);
     }

    onCheck: TreeProps['onCheck'] = (checkedKeys, _info) => {
        // 用户可以自定义当前选中和半选中的节点。
        console.log('onCheck', checkedKeys);
        const cks = {
            checked: (checkedKeys as {checked: string[]; halfChecked: string[];}).checked || checkedKeys,
            halfChecked: (checkedKeys as {checked: string[]; halfChecked: string[];}).halfChecked
        };
        this.setState({checkedKeys: cks});
    }

     onDoubleClick: TreeProps['onDoubleClick'] = (key, treeNode) => {
	    console.log('---onDblClick---', key, '--treeNode--', treeNode);
     }
	getCheckboxAttrs: TreeProps['getCheckboxAttrs'] = (treeNodeProps) => {
	    // 可以利用treeNodeProps中的数据
	    console.log('the tree node props are', treeNodeProps)
	    return {
	        name: '123'
	    }
	}

	render() {
	    return (
	        <Tree
	            className="myCls"
	            // showLine
	            checkable
	            defaultExpandedKeys={this.state.defaultExpandedKeys}
	            defaultSelectedKeys={this.state.defaultSelectedKeys}
	            defaultCheckedKeys={this.state.defaultCheckedKeys}
	            checkStrictly
	            showIcon
	            fieldid="faye"
	            cancelUnSelect={true}
	            onSelect={this.onSelect}
	            onCheck={this.onCheck}
	            onDoubleClick={this.onDoubleClick}
	            getCheckboxAttrs={this.getCheckboxAttrs}
	        >
	            <TreeNode title="parent 1" key="$0-0" fieldid='abc' icon={<Icon type="uf-treefolder"/>}>
	                <TreeNode title="parent 1-0" key="$0-0-0" fieldid="abcd" disabled icon={<Icon type="uf-treefolder"/>}>
	                    <TreeNode title="leaf" key="$0-0-0-0" fieldid="abcde1" disableCheckbox icon={<Icon type="uf-list-s-o"/>}/>
	                    <TreeNode title="leaf" key="$0-0-0-1" fieldid="abcde2" icon={<Icon type="uf-list-s-o"/>}/>
	                </TreeNode>
	                <TreeNode title="parent 1-1" key="$0-0-1" icon={<Icon type="uf-treefolder"/>}>
	                    <TreeNode title={<span>sss</span>} key="$0-0-1-0" icon={<Icon type="uf-list-s-o"/>}/>
	                </TreeNode>
	            </TreeNode>
	        </Tree>
	    );
	}
}

// Demo15.defaultProps = defaultProps;


export default Demo15;

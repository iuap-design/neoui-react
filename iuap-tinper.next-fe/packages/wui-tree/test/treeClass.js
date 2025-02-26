/**
 *
 * @title Tree基本使用示例
 * @description 示例涵盖 checkbox如何选择，disable状态和部分选择状态。checkStrictly为true时，子节点与父节点的选择情况都不会影响到对方
 *
 */


import React, {Component} from 'react';
import Icon from '../../wui-icon/src/index';
import Tree from '../src';

const TreeNode = Tree.TreeNode;

const defaultProps = {
    keys: ['0-0-0', '0-0-1']
}

class TreeDemo extends Component {
    constructor(props) {
        super(props);
        const keys = this.props.keys;
        this.state = {
            defaultExpandedKeys: keys,
            defaultSelectedKeys: defaultProps.key1,
            defaultCheckedKeys: keys,
            checkedKeys: {checked: keys},
        };
    }

    onSelect(info) {
        console.log('selected', info);
    }

	onCheck = (checkedKeys, newst) => {
	    // 用户可以自定义当前选中和半选中的节点。
	    console.log('onCheck', checkedKeys);
	    const cks = {
	        checked: checkedKeys.checked || checkedKeys,
	        halfChecked: checkedKeys.halfChecked
	    };
	    this.setState({checkedKeys: cks});
	}

	onDoubleClick = (key, treeNode) => {
	    console.log('---onDblClick---', key, '--treeNode--', treeNode);
	}

	render() {
	    return (
	        <Tree
	            className="myCls"
	            showIcon
	            selectable
	            checkable
	            defaultExpandAll
	            syncCheckedAndSelectedStatus={false}
	            {...this.props}
	        >
	            <TreeNode title="parent 1" key="0-0" icon={<Icon type="uf-treefolder"/>}>
	                <TreeNode title="parent 1-0" key="0-0-0" icon={<Icon type="uf-treefolder"/>}>
	                    <TreeNode title="leaf" key="0-0-0-0" icon={<Icon type="uf-list-s-o"/>}/>
	                    <TreeNode title="leaf" key="0-0-0-1" icon={<Icon type="uf-list-s-o"/>}/>
	                </TreeNode>
	                <TreeNode title="parent 1-1" key="0-0-1" icon={<Icon type="uf-treefolder"/>}>
	                    <TreeNode title={<span>sss</span>} key="0-0-1-0" icon={<Icon type="uf-list-s-o"/>}/>
	                </TreeNode>
	                <TreeNode title="parent 1-1" key="0-0-2" icon={<Icon type="uf-treefolder"/>}>
	                    <TreeNode title={<span>sss1</span>} key="0-0-2-0" icon={<Icon type="uf-list-s-o"/>}/>
	                </TreeNode>
	            </TreeNode>
	        </Tree>
	    );
	}
}

TreeDemo.defaultProps = defaultProps;


export default TreeDemo;

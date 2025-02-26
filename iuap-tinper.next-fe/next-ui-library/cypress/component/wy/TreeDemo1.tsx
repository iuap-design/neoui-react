/**
 *
 * @title Tree基本使用示例
 * @description 示例涵盖 checkbox如何选择，disable状态和部分选择状态。checkStrictly为true时，子节点与父节点的选择情况都不会影响到对方。icon渲染。
 *
 */

 import {Tree, TreeProps, Icon} from '../../../../packages';
 import React, {Component} from 'react';
 
 const TreeNode = Tree.TreeNode;
 
 const defaultProps = {
	 keys: ['0-0-0', '0-0-1']
 }
 interface DemoProps {
	 keys: string[];
	 checkStrictly?: boolean;
	 cancelUnSelect?: boolean;
	 showLine?: boolean;
	 disabled?: boolean;
	 focusable?: boolean;
	 autoSelectWhenFocus?: boolean;
	 syncCheckedAndSelectedStatus?: boolean;
	 icon?: TreeProps['icon'];
	 openIcon?: TreeProps['openIcon'];
	 size?: TreeProps['size'];
 }
 interface DemoState {
	 defaultExpandedKeys: string[];
	 defaultSelectedKeys: string[];
	 defaultCheckedKeys: string[];
	 checkedKeys: {checked: string[]};
 }
 class Demo1 extends Component<DemoProps, DemoState> {
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
		 console.log(': ', checkedKeys);
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
 
	 renderIcon = (node: any) => { // 可以利用树节点的信息，来渲染节点的图标，优先级低于树节点的icon
		 if (node.expanded) {
			 return 'e' // expanded
		 } else {
			 return 'c' // closed
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
				 checkStrictly={this.props.checkStrictly ?? true}
				 showIcon
				 focusable={this.props.focusable}
				 openIcon={this.props.openIcon}
				 syncCheckedAndSelectedStatus={this.props.syncCheckedAndSelectedStatus}
				 autoSelectWhenFocus={this.props.autoSelectWhenFocus}
				 cancelUnSelect={this.props.cancelUnSelect ?? true}
				 showLine={this.props.showLine}
				 disabled={this.props.disabled}
				 icon={this.renderIcon}
				 onSelect={this.onSelect}
				 onCheck={this.onCheck}
				 onDoubleClick={this.onDoubleClick}
				 getCheckboxAttrs={this.getCheckboxAttrs}
				 {...this.props}
			 >
				 <TreeNode title="parent 1" key="0-0" icon={<Icon type="uf-treefolder"/>}>
					 <TreeNode title="parent 1-0" key="0-0-0" disabled icon={<Icon type="uf-treefolder"/>}>
						 <TreeNode title="leaf1" key="0-0-0-0" disableCheckbox icon={<Icon type="uf-list-s-o"/>}/>
						 <TreeNode title="leaf2" key="0-0-0-1"/>
						 <TreeNode title="leaf3" visibleCheckbox={false} key="0-0-0-2"/>
					 </TreeNode>
					 <TreeNode title="parent 1-1" key="0-0-1" icon={null}>
						 <TreeNode title={<span>sss</span>} key="0-0-1-0" icon={<Icon type="uf-list-s-o"/>}/>
					 </TreeNode>
				 </TreeNode>
			 </Tree>
		 );
	 }
 }
 
 // Demo1.defaultProps = defaultProps;
 
 
 export default Demo1;
 
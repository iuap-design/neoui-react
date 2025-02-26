/**
 *
 * @title 根据 treeData 数组渲染树节点
 * @description 设置 treeData 属性，则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一）
 */

import {Tree, TreeProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const treeData = [
    {
        title: '0-0',
        key: '0-0',
        ext: '自定义属性',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    {title: '0-0-0-0', key: '0-0-0-0'},
                    {title: '0-0-0-1', key: '0-0-0-1'},
                    {title: '0-0-0-2', key: '0-0-0-2'},
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    {title: '0-0-1-0', key: '0-0-1-0'},
                    {title: '0-0-1-1', key: '0-0-1-1'},
                    {title: '0-0-1-2', key: '0-0-1-2'},
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            {title: '0-1-0', key: '0-1-0'},
            {title: '0-1-1', key: '0-1-1'},
            {title: '0-1-2', key: '0-1-2'},
        ],
    },
    {
        title: '0-2',
        key: '0-2',
        ext: '自定义属性'
    },
];

class Demo12 extends Component {
	state = {
	    expandedKeys: ['0-0-0', '0-0-1'],
	    autoExpandParent: true,
	    checkedKeys: ['0-0-0'],
	    selectedKeys: [],
	};

	onExpand : TreeProps['onExpand'] = (expandedKeys, _info, _e) => {
	    console.log('onExpand', expandedKeys);
	    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
	    // or, you can remove all expanded children keys.
	    this.setState({
	        expandedKeys,
	        autoExpandParent: false,
	    });
	};

	onCheck: TreeProps['onCheck'] = (checkedKeys, _info) => {
	    console.log('onCheck', checkedKeys);
	    this.setState({checkedKeys});
	};

	onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
	    console.log('onSelect', info);
	    this.setState({selectedKeys});
	};

	render() {
	    return (
	        <Tree
	            checkable
	            showLine
	            lazyLoad
	            checkStrictly
	            treeData={treeData}
	            onExpand={this.onExpand}
	            expandedKeys={this.state.expandedKeys}
	            autoExpandParent={this.state.autoExpandParent}
	            onCheck={this.onCheck}
	            checkedKeys={this.state.checkedKeys}
	            onSelect={this.onSelect}
	            selectedKeys={this.state.selectedKeys}
	        />
	    );
	}
}

export default Demo12;

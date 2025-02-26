/**
 *
 * @title fieldNames 的使用
 * @description 设置 fieldNames 属性，在treeData 中的属性名 转换为 key title children
 */

import {Tree, TreeProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const treeData = [
    {
        title1: '0-0',
        key1: '0-0',
        children1: [
            {
                title1: '0-0-0',
                key1: '0-0-0',
                children1: [
                    {title1: '0-0-0-0', key1: '0-0-0-0'},
                    {title1: '0-0-0-1', key1: '0-0-0-1'},
                    {title1: '0-0-0-2', key1: '0-0-0-2'},
                ],
            },
            {
                title1: '0-0-1',
                key1: '0-0-1',
                children1: [
                    {title1: '0-0-1-0', key1: '0-0-1-0'},
                    {title1: '0-0-1-1', key1: '0-0-1-1'},
                    {title1: '0-0-1-2', key1: '0-0-1-2'},
                ],
            },
            {
                title1: '0-0-2',
                key1: '0-0-2',
            },
        ],
    },
    {
        title1: '0-1',
        key1: '0-1',
        children1: [
            {title1: '0-1-0', key1: '0-1-0'},
            {title1: '0-1-1', key1: '0-1-1'},
            {title1: '0-1-2', key1: '0-1-2'},
        ],
    },
    {
        title1: '0-2',
        key1: '0-2',
    },
];

class Demo18 extends Component {
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
	            fieldNames={{title: 'title1', key: "key1", children: "children1"}}
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

export default Demo18;

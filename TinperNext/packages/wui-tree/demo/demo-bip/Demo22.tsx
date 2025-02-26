/**
 *
 * @title 可搜索示例2，根据过滤关键字过滤数据
 * @description 设置 treeData 属性，则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一）
 */

import {Tree, TreeProps, Input} from '@tinper/next-ui';
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

class Demo22 extends Component {
	state = {
	    checkedKeys: ['0-0-0'],
	    selectedKeys: [],
	    filterValue: null
	};

	onCheck: TreeProps['onCheck'] = (checkedKeys, _info) => {
	    console.log('onCheck', checkedKeys);
	    this.setState({checkedKeys});
	};

	onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
	    console.log('onSelect', info);
	    this.setState({selectedKeys});
	};

    onChange = (value: string) => {
        this.setState({
            filterValue: value,
        });
    };

    // filterTreeNode = (treeNode: any) => {
    //     return treeNode.props.title.indexOf(this.state.filterValue) !== -1;
    // }

    render() {
	    return (
	        <div>
	            <Input
	                style={{width: 200}}
	                placeholder="Search"
	                onChange={this.onChange}
	            />
	            <Tree
	                checkable
	                showLine
	                lazyLoad
	                checkStrictly
	                treeData={treeData}
                    defaultExpandAll
	                filterValue={this.state.filterValue}
                    // filterTreeNode={this.filterTreeNode}
                    autoExpandParent={false}
	                onCheck={this.onCheck}
	                checkedKeys={this.state.checkedKeys}
	                onSelect={this.onSelect}
	                selectedKeys={this.state.selectedKeys}
	            />
	        </div>
	    );
    }
}

export default Demo22;

/**
 *
 * @title 数据可控示例
 * @description
 *
 */

import {Tree, TreeProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const x = 6;
const y = 5;
const z = 2;
type GlobalDataType = {
    title: string;
    key: string;
    children?: GlobalDataType;
}[]
const gData: GlobalDataType = [];
const generateData = (_level: number, _preKey?: string, _tns?: GlobalDataType) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({title: key, key});
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(z);

const TreeNode = Tree.TreeNode;

interface DemoState {
    expandedKeys: string[];
    autoExpandParent: boolean;
    selectedKeys: string[];
    checkedKeys: string[];
}
class Demo2 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
        };
        this.onExpand = this.onExpand.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    onExpand(expandedKeys: string[]) {
        console.log('onExpand', arguments);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onCheck(checkedKeys: string[]) {
        this.setState({
            checkedKeys,
            selectedKeys: ['0-3', '0-4'],
        });
    }

    onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({selectedKeys});
    }

	// keydown的钩子事件
	onKeyDown = (e: React.KeyboardEvent, _treeNode: React.ReactNode) => {
	    console.log('***', e);
	    return false;
	}

	render() {
	    const loop = (data: GlobalDataType) => data.map((item) => {
	        if (item.children) {
	            return (
	                <TreeNode key={item.key} title={item.key}>
	                    {loop(item.children)}
	                </TreeNode>
	            );
	        }
	        return <TreeNode key={item.key} title={item.key} isLeaf={true}/>;
	    });
	    return (
	        <Tree
	            checkable
	            focusable
	            showLine
	            blockNode={false}
	            multiple
	            className="demo2 myCls"
	            onExpand={this.onExpand} expandedKeys={this.state.expandedKeys}
	            autoExpandParent={this.state.autoExpandParent}
	            onCheck={this.onCheck}
	            onSelect={this.onSelect}
	            keyFun={this.onKeyDown}
	        >
	            {loop(gData)}
	        </Tree>
	    );
	}
}


export default Demo2;

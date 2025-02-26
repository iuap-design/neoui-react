/**
 *
 * @title 用户自定义节点属性ext
 * @description 业务中扩展的数据可以定义在ext属性中，用户可以在TreeNode节点中获取ext属性。此例中将treeNode的数据存放在了ext中，方便用户获取。
 *
 */

import {Tree, TreeProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const x = 6;
const y = 5;
const z = 2;
const gData: any = [];

const generateData = (_level: number, _preKey?: string, _tns?: any) => {
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
class Demo11 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
        };
        this.onCheck = this.onCheck.bind(this);
    }

    onExpand: TreeProps['onExpand'] = (expandedKeys, nodeInfo, _e?) => {
        console.log('onExpand---显示ext数据', nodeInfo.node.props.ext.data);

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
	    const loop = (data: any) => data.map((item: any) => {
	        if (item.children) {
	            return (
	                <TreeNode key={item.key} title={item.key} disableCheckbox={item.key === '0-0-0'}
							  ext={{'data': item}}>
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
	            className="demo2 myCls"
	            onExpand={this.onExpand}
	            expandedKeys={this.state.expandedKeys}
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


export default Demo11;

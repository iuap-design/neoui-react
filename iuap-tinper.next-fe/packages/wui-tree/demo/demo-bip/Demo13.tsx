/**
 *
 * @title 大数据场景下滚动加载树节点
 * @description 适用于大数据场景。注意：使用懒加载，需要通过 treeData 属性传入完整的数据结构，并设置 lazyLoad = {true}。可视区域的高度可以自定义，在 Tree 组件外层包裹一层div即可。
 */

import {Button, Tree, TreeProps} from '@tinper/next-ui';

import React, {Component} from 'react';
// import { TreeData } from '../../src/iTree';

const {TreeNode} = Tree;

const x = 1000;
const y = 10;
const z = 0;
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

const data = [...new Array(100000)].map((_e, i) => {
    const rs: any = {key: i + 'a', title: i + 'a'};
    return rs;
})
interface DemoState {
    expandedKeys: string[];
    autoExpandParent: boolean;
    selectedKeys: string[];
    checkedKeys: string[];
    showChangeBtn: boolean;
    treeData: TreeProps['treeData']
}
class Demo13 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            expandedKeys: ['0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '0-0-0', '0-0-1'],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            treeData: data,
            showChangeBtn: false
        };
    }

    onExpand: TreeProps['onExpand'] = (expandedKeys, _info, _e) => {
        // console.log('onExpand---显示ext数据', nodeInfo.node.props.ext.data);

        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onCheck: TreeProps['onCheck'] = (checkedKeys, _info) => {
        this.setState({
            checkedKeys: checkedKeys as string[],
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

	// 使用 treeData 渲染树节点时，可使用该函数自定义节点显示内容（非必须）
	// 注意：isLeaf 属性是必传的，否则节点层级和展示会有问题
	renderTreeNodes = (data: any) => {
	    const loop = (data: any) => data.map((item: any) => {
	        if (item.children) {
	            return (
	                <TreeNode key={item.key} title={item.key} isLeaf={item.isLeaf}>
	                    {loop(item.children)}
	                </TreeNode>
	            );
	        }
	        return <TreeNode key={item.key} title={item.key} isLeaf={true}/>;
	    });
	    return loop(data);
	}

	changeTreeData = () => {
	    this.setState({
	        treeData: gData,
	        showChangeBtn: true
	    })
	}
    checkAll = () => {
        const checkedKeys: string[] = [];
        if (this.state.checkedKeys.length) {
            return this.setState({
                checkedKeys: []
            })
        }
        const loop = (treeData: TreeProps['treeData']) => {
            treeData!.forEach(data => {
                if (data.key !== '0-0' && data.key !== '0-0-0' && data.key !== '0-0-0-0') {
                    checkedKeys.push(data.key!)
                }
                if (data.children?.length) {
                    loop(data.children)
                }
            })
        }
        loop(gData)
        this.setState({
            checkedKeys
        })
    }
    render() {
	    return (
	        <div>
	            <Button onClick={this.changeTreeData}>改变数据源</Button>
	            {this.state.showChangeBtn ? <Button onClick={this.checkAll}>大面积选择</Button> : null}
	            <div style={{height: '300px', overflow: 'auto'}}>
	                <Tree
	                    checkable
	                    focusable
                        checkedKeys={this.state.checkedKeys}
                        showLine
	                    treeData={this.state.treeData}
	                    lazyLoad={true}
	                    debounceDuration={600}
	                    renderTreeNodes={this.renderTreeNodes}
	                    onExpand={this.onExpand}
	                    defaultExpandAll={true}
	                    expandedKeys={this.state.expandedKeys}
	                    autoExpandParent={this.state.autoExpandParent}
	                    onCheck={this.onCheck}
	                    onSelect={this.onSelect}
	                    keyFun={this.onKeyDown}
	                >
	                </Tree>
	            </div>
	        </div>
	    );
    }
}


export default Demo13;

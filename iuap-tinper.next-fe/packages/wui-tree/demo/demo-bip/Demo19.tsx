/**
 *
 * @title 大数据场景下设置 height
 * @description 与默认场景不同，使用tree自身范围滚动， 无需依赖外层组件提供容器滚动。
 */

import { Tree, TreeProps} from '@tinper/next-ui';

import React, {Component} from 'react';

const {TreeNode} = Tree;

const data = [...new Array(10000)].map((_e, i) => {
    const rs: any = {key: i + 'a', title: i + 'a'};
    return rs;
})
interface DemoState {
    expandedKeys: string[];
    autoExpandParent: boolean;
    selectedKeys: string[];
    checkedKeys: string[];
    treeData: any
}
class Demo19 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            expandedKeys: ['0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '0-0-0', '0-0-1'],
            autoExpandParent: true,
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
            treeData: data
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


	render() {
	    return (
	        <div>
	            <div>
	                <Tree
	                    checkable
	                    focusable
	                    height={220}
	                    treeData={this.state.treeData}
	                    lazyLoad={true}
	                    debounceDuration={100}
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


export default Demo19;

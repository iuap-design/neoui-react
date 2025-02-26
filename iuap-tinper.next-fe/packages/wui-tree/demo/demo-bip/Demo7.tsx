/**
 *
 * @title 增加节点
 * @description 增加节点和拖拽组合使用示例
 *
 */

import {Button, Tree, TreeProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const TreeNode = Tree.TreeNode;

interface DemoState {
    defaultExpandedKeys: string[];
    treeData: any;
    parentNode: any;
}

class Demo7 extends Component<{}, DemoState> {
    parentNode: any = null;
    constructor(props: {}) {
        super(props);
        this.state = {
            treeData: [],
            defaultExpandedKeys: ['0-0', '0-1', '0-2'],
            parentNode: {}
        };
        this.addNode = this.addNode.bind(this);
        this.clickFun = this.clickFun.bind(this);
        this.getNodeByKey = this.getNodeByKey.bind(this);
        this.parentNode = null
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                treeData: [{
                    name: 'pNode 01',
                    key: '0-0',
                    children: [{
                        name: 'leaf 0-0-0',
                        key: '0-0-0'
                    }, {
                        name: 'leaf 0-0-1',
                        key: '0-0-1'
                    }]
                }, {
                    name: 'pNode 02',
                    key: '0-1',
                    children: [{
                        name: 'leaf 0-1-0',
                        key: '0-1-0'
                    }, {
                        name: 'leaf 0-1-1',
                        key: '0-1-1'
                    }]
                }, {
                    name: 'pNode 03',
                    key: '0-2',
                    isLeaf: true
                }],
            });
        }, 100);
    }

    /**
	 * 增加节点
	 * @param string prKey    [父节点key]
	 * @param object nodeItem [子节点信息]
	 */
    addNode(prKey: string, nodeItem: any) {
        const data = this.state.treeData;
        let parNode;
        if (prKey) {
            // 如果prKey存在则搜索父节点进行添加
            parNode = this.getNodeByKey(data, prKey);
            // 如果父节点存在的话，添加到父节点上
            if (parNode) {
                if (!parNode.children) {
                    parNode.children = [];
                }
                // 如果key不存在就动态生成一个
                if (!nodeItem.key) {
                    nodeItem.key = prKey + parNode.children.length + 1;
                }
                parNode.children.push(nodeItem);
            }
        } else {
            // 没有穿prKey添加到根下成为一级节点
            if (!nodeItem.key) {
                nodeItem.key = "0-" + data.length + 1;
            }
            data.push(nodeItem);
        }

        this.setState({
            treeData: data
        });
    }

    getNodeByKey(data: any, key: string) {
        if (!this.parentNode) {
            data.find((item: any) => {
                if (item.key === key) {
                    console.log('item.name---' + item.name)
                    this.parentNode = item;
                    return (true);
                } else if (item.children) {
                    return this.getNodeByKey(item.children, key);

                }
            })
        }
        return this.parentNode;
    }


    onSelect: TreeProps['onSelect'] = (_selectedKeys, info) => {
        console.log('selected', info);
    }

    /**
	 * 点击button事件
	 */
    clickFun() {
        let prKey, nodeItem;
        prKey = '0-1';
        nodeItem = {
            name: 'leaf 0-0-4',
            key: 'leaf 0-0-4' + new Date().getTime()
        }
        this.addNode(prKey, nodeItem);
    }

	onDragEnter: TreeProps['onDragEnter'] = (info) => {
	    console.log(info);
	    // expandedKeys 需要受控时设置
	    // this.setState({
	    //   expandedKeys: info.expandedKeys,
	    // });
	}
	onDrop: TreeProps['onDrop'] = (info) => {
	    console.log('the info is', info);
	    const dropKey = info.node.props.eventKey;
	    const dragKey = info.dragNode.props.eventKey;
	    const dropPos = info.node.props.pos.split('-');
	    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
	    const loop = (data: any, key: string, callback: (item: any, index: number, arr: any)=>void) => {
	        for (let i = 0; i < data.length; i++) {
	            if (data[i].key === key) {
	                return callback(data[i], i, data);
	            }
	            if (data[i].children) {
	                loop(data[i].children!, key, callback);
	            }
	        }
	    };
	    const data = [...this.state.treeData];
	    let dragObj!: any;
	    loop(data, dragKey, (item, index, arr) => {
	        arr.splice(index, 1);
	        dragObj = item;
	    });
	    if (!info.dropToGap) {
	        loop(data, dropKey, item => {
	            item.children = item.children || [];
	            item.children.unshift(dragObj);
	        });
	    } else if (
	        (info.node.props.children || []).length > 0 &&
			info.node.props.expanded &&
			dropPosition === 1
	    ) {
	        loop(data, dropKey, item => {
	            item.children = item.children || [];
	            item.children.unshift(dragObj);
	        });
	    } else {
	        let ar!: any;
	        let i!: number;
	        loop(data, dropKey, (_item, index, arr) => {
	            ar = arr;
	            i = index;
	        });
	        if (dropPosition === -1) {
	            ar.splice(i, 0, dragObj);
	        } else {
	            ar.splice(i + 1, 0, dragObj);
	        }
	    }
	    this.setState({
	        treeData: data,
	    });
	}

	render() {
	    const loop = (data: any) => data.map((item:any) => {
	        if (item.children) {
	            return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
	        }
	        return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'}/>;
	    });
	    const treeNodes = loop(this.state.treeData);
	    console.log('defaultKeys--' + this.state.defaultExpandedKeys);
	    return (
	        <div>
	            <Button colors="primary" onClick={this.clickFun}>增加节点</Button>
	            <Tree
	                className="myCls"
	                onSelect={this.onSelect}
	                defaultExpandedKeys={this.state.defaultExpandedKeys}
	                draggable
	                onDragEnter={this.onDragEnter}
	                onDrop={this.onDrop}>
	                {treeNodes}
	            </Tree>
	        </div>
	    );
	}
}

export default Demo7

/**
 *
 * @title 异步数据加载
 * @description 当点击展开，异步获取子节点数据
 *
 */

import {Tree, TreeProps} from '../../../../packages';
import React, {Component, ReactElement} from 'react';

const x = 3;
const y = 2;
const z = 1;
type GlobalDataType = {
    title?: string;
    name?: string;
    key: string;
    isLeaf?: boolean;
    children?: GlobalDataType;
}[]
const gData: GlobalDataType = [];
const generateData = (_level: number, _preKey?: string, _tns?: GlobalDataType) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({
            title: key,
            key
        });
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

function generateTreeNodes(treeNode: ReactElement) {
    const arr = [];
    const key = treeNode.props.eventKey;
    for (let i = 0; i < 3; i++) {
        arr.push({
            name: `leaf ${key}-${i}`,
            key: `${key}-${i}`
        });
    }
    return arr;
}

function setLeaf(treeData: GlobalDataType, curKey: string, level: number) {
    const loopLeaf = (data: GlobalDataType, lev: number) => {
        const l = lev - 1;
        data.forEach((item) => {
            if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
                curKey.indexOf(item.key) !== 0) {
                return;
            }
            if (item.children) {
                loopLeaf(item.children, l);
            } else if (l < 1) {
                item.isLeaf = true;
            }
        });
    };
    loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData: GlobalDataType, curKey: string, child: GlobalDataType, level: number) {
    const loop = (data: GlobalDataType) => {
        if (level < 1 || curKey.length - 3 > level * 2) return;
        data.forEach((item) => {
            if (curKey.indexOf(item.key) === 0) {
                if (item.children) {
                    loop(item.children);
                } else {
                    item.children = child;
                }
            }
        });
    };
    loop(treeData);
    setLeaf(treeData, curKey, level);
}

class Demo5 extends Component<{}, {treeData:GlobalDataType}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            treeData: [],
        };
        this.onLoadData = this.onLoadData.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                treeData: [{
                    name: 'pNode 01',
                    key: '0-0'
                }, {
                    name: 'pNode 02',
                    key: '0-1'
                }, {
                    name: 'pNode 03',
                    key: '0-2',
                    isLeaf: true
                }],
            });
        }, 100);
    }

    onSelect: TreeProps['onSelect'] = (_selectedKeys, info) => {
        console.log('selected', info);
    }

    onLoadData(treeNode: React.ReactElement) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const treeData = [...this.state.treeData];
                getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);
                this.setState({
                    treeData
                });
                resolve(true);
            }, 1000);
        });
    }

    render() {
        const loop = (data: GlobalDataType) => data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'}/>;
        });
        const treeNodes = loop(this.state.treeData);
        return (
            <Tree className="myCls" defaultExpandedKeys={['0-1']} onSelect={this.onSelect} loadData={this.onLoadData}>
                {treeNodes}
            </Tree>
        );
    }
}

export default Demo5

/**
 *
 * @title treeSelect 动态加载树
 * @description 点击父节点动态加载树。
 *
 */
import {TreeSelect, TreeSelectProps} from '@tinper/next-ui';
import React, {Component} from 'react';
type GlobalDataType = GlobalDataType1[]
type GlobalDataType1 = {
    title?: string;
    name?: string;
    key: string;
    isLeaf?: boolean;
    children?: GlobalDataType;
}
// const gData: GlobalDataType = [];
// 工具方法
function generateTreeNodes(treeNode: Record<string, any>) {
    const arr = [];
    const key = treeNode.props.eventKey;
    for (let i = 0; i < 3; i++) {
        arr.push({title: `${key}-${i}`, value: `${key}-${i}`, key: `${key}-${i}`});
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
    const loop = (data: Record<string, any>) => {
        if (level < 1 || curKey.length - 3 > level * 2) return;
        data.forEach((item: GlobalDataType1) => {
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

class Demo5 extends Component<{}, {treeData: GlobalDataType, value: {value: string, title: string}}> {

	state = {
	    treeData: [
	        {title: 'pNode 01', value: '0-0', key: '0-0', disabled: true},
	        {title: 'pNode 02', value: '0-1', key: '0-1'},
	        {title: 'pNode 03', value: '0-2', key: '0-2', isLeaf: true},
	    ],
	    // value: '0-0',
	    value: {value: '0-0', title: '0-0'},
	};

	onChange: TreeSelectProps['onChange'] = (value, _node, _extra) => {
	    console.log(value);
	    this.setState({
	        value,
	    });
	};

	onLoadData = (treeNode: React.ReactElement) => {
	    console.log(treeNode);
	    return new Promise((resolve) => {
	        setTimeout(() => {
	            const treeData = [...this.state.treeData];
	            getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);
	            this.setState({treeData});
	            resolve(null);
	        }, 500);
	    });
	};

	render() {
	    return (

	        <TreeSelect
	            style={{width: 300}}
	            treeData={this.state.treeData}
	            labelInValue
	            value={this.state.value}
	            onChange={this.onChange}
	            loadData={this.onLoadData}
	        />

	    )
	}
}

export default Demo5

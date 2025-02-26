/**
 *
 * @title 可搜索示例
 * @description
 *
 */


import {Input, Tree} from '@tinper/next-ui';
import React, {Component} from 'react';

const x = 3;
const y = 2;
const z = 1;
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

const dataList: GlobalDataType = [];
const generateList = (data: GlobalDataType) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        dataList.push({
            key,
            title: key
        });
        if (node.children) {
            generateList(node.children);
        }
    }
};
generateList(gData);

const getParentKey = (key: string, tree: GlobalDataType): string | void => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

interface DemoState {
    expandedKeys: string[];
    autoExpandParent: boolean;
    searchValue: string;
}
class Demo4 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
        }
    }

	onExpand = (expandedKeys: string[]) => {
	    this.setState({
	        expandedKeys,
	        autoExpandParent: false,
	    });
	}
	onChange = (value: string) => {

	    const expandedKeys: string[] = [];
	    dataList.forEach((item) => {
	        if (item.key.indexOf(value) > -1) {
	            expandedKeys.push(getParentKey(item.key, gData)!);
	        }
	    });
	    const uniqueExpandedKeys: string[] = [];
	    expandedKeys.forEach((item) => {
	        if (item && uniqueExpandedKeys.indexOf(item) === -1) {
	            uniqueExpandedKeys.push(item);
	        }
	    });
	    this.setState({
	        expandedKeys: uniqueExpandedKeys,
	        searchValue: value,
	        autoExpandParent: true,
	    });
	}

	render() {
	    const {
	        searchValue,
	        expandedKeys,
	        autoExpandParent
	    } = this.state;
	    const loop = (data: GlobalDataType) => data.map((item) => {
	        const index = item.key.search(searchValue);
	        const beforeStr = item.key.substr(0, index);
	        const afterStr = item.key.substr(index + searchValue.length);
	        const title = index > -1 ? (
	            <span>
	                {beforeStr}
	                <span style={{color: "#f50", transition: 'all .3s ease;'}}>{searchValue}</span>
	                {afterStr}
	            </span>
	        ) : <span>{item.key}</span>;
	        if (item.children) {
	            return (
	                <TreeNode key={item.key} title={title}>
	                    {loop(item.children)}
	                </TreeNode>
	            );
	        }
	        return <TreeNode key={item.key} title={title}/>;
	    });
	    return (
	        <div>
	            <Input
	                style={{width: 200}}
	                placeholder="Search"
	                onChange={this.onChange}
	            />
	            <Tree
	                className="myCls"
	                onExpand={this.onExpand}
	                expandedKeys={expandedKeys}
	                autoExpandParent={autoExpandParent}
	            >
	                {loop(gData)}
	            </Tree>
	        </div>
	    );
	}
}

export default Demo4;

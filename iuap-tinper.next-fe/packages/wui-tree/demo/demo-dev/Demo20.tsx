/**
 *
 * @title 拖拽限制使用示例
 * @description onDragOver 回调的返回值限制 节点的拖拽行为，此实例表示为仅能在目标节点的同级拖拽
 *
 */

import {Tree, TreeProps, Message} from '@tinper/next-ui';
import React, {Component} from 'react';

const x = 3;
const y = 2;
const z = 1;
type GlobalDataType = {
    title: string;
    key: string;
    children?: GlobalDataType;
}[]
type GlobalDataType1 = {
    title: string;
    key: string;
    children?: GlobalDataType;
}
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
    gData: GlobalDataType;
    notAllowDropKeys: string[];
}
class Demo20 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            gData,
            expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
            notAllowDropKeys: ["0-0-0-2"]
        };
    }

    onDragEnter: TreeProps['onDragEnter'] =(info) => {
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
        if (this.state.notAllowDropKeys.includes(info.node.props.eventKey) && (dropPosition === 0)) {
            Message.destroy();
            Message.create({content: '此节点不可被放置。', color: 'info'});
            return
        }
        const loop = (data: GlobalDataType, key: string, callback: (item: GlobalDataType1, index: number, arr: GlobalDataType)=>void) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children!, key, callback);
                }
            }
        };
        const data = [...this.state.gData];
        let dragObj!: GlobalDataType1;
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
            let ar!: GlobalDataType;
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
            gData: data,
        });
    }
    onDragOver: TreeProps['onDragOver']= (info) => {
        // 判断
        if (info.extension?.dropPositionX?.includes('center')) {
            return true
        }
        return false
    }
    render() {
        const loop = (data: GlobalDataType) => data.map((item) => {
            if (item.children && item.children.length) {
                return <TreeNode key={item.key} title={this.state.notAllowDropKeys.includes(item.key) ? item.key + " (此节点不可被放置)" : item.key}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode key={item.key} title={this.state.notAllowDropKeys.includes(item.key) ? item.key + " (此节点不可被放置)" : item.key}/>;
        });
        return (
            <Tree
                className="myCls"
                defaultExpandedKeys={this.state.expandedKeys}
                draggable
                onDragOver={this.onDragOver}
                onDragEnter={this.onDragEnter}
                onDrop={this.onDrop}
                dragDelayExpandTime={1000}
            >
                {loop(this.state.gData)}
            </Tree>
        );
    }
}

export default Demo20;

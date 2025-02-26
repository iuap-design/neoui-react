/**
 *
 * @title 大数据场景下滚动加载树节点
 * @description 适用于大数据场景。注意：使用懒加载，需要通过 treeData 属性传入完整的数据结构，并设置 lazyLoad = {true}。可视区域的高度可以自定义，在 Tree 组件外层包裹一层div即可。
 */

import {Button, Space, Tree, Menu, Dropdown, Icon, Switch} from '@tinper/next-ui';

import React, {Component} from 'react';

// const x = 1000;
// const y = 1;
// const z = 1;
// const gData: any = [];
//
// const generateData = (_level: number, _preKey?: string, _tns?: any) => {
//     const preKey = _preKey || '0';
//     const tns = _tns || gData;
//
//     const children = [];
//     for (let i = 0; i < x; i++) {
//         const key = `${preKey}-${i}`;
//         tns.push({title: key, key});
//         if (i < y) {
//             children.push(key);
//         }
//     }
//     if (_level < 0) {
//         return tns;
//     }
//     const level = _level - 1;
//     children.forEach((key, index) => {
//         tns[index].children = [];
//         return generateData(level, key, tns[index].children);
//     });
// };
// generateData(z);
//
// function loopAll(childs:any[], callback:Function, parent?:any) {
//     const loop = (children:any[], level:string, _parent:any) => {
//         // const len = getChildrenlength(children);
//         // forEach(children, (item: any, index: number) => {
//         children.forEach((item: any, index: number) => {
//             const pos = `${level}-${index}`;
//             if (item) {
//                 if (Array.isArray(item.children)) {
//                     loop(item.children, pos, {node: item, pos});
//                 }
//                 callback(item, index, pos, item.key || pos, _parent);
//             }
//         });
//     };
//     loop(childs, '0', parent);
// }


interface DemoState {
    treeData: any[],
    loading:boolean,
    isLevel5:boolean
}
class Demo13 extends Component<{}, DemoState> {
    data:any[];
    time:number;
    constructor(props: {}) {
        super(props);
        this.state = {
            isLevel5: false,
            treeData: [],
            loading: false,
        };
        this.data = [];
        this.time = -1;
    }

    onInitData(maxCount:number) {
        this.setState({loading: true});
        setTimeout(()=>{
            this.data = [];
            if (this.state.isLevel5) {
                for (let i = 0;i < maxCount;i = i + 5) {
                    this.data.push(
                        {key: i + 'a', title: i + '节点—层级1',
                            children: [
                                {key: (i + 1) + 'a', title: (i + 1) + '节点—层级2',
                                    children: [
                                        {key: (i + 2) + 'a', title: (i + 2) + '节点—层级3',
                                            children: [
                                                {key: (i + 3) + 'a', title: (i + 3) + '节点—层级4',
                                                    children: [
                                                        {key: (i + 4) + 'a', title: (i + 4) + '节点—层级5'}
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    );
                }
            } else {
                for (let i = 0;i < maxCount;i++) {
                    this.data.push(
                        {key: i + 'a', title: i + '节点'}
                    );
                }
            }
            this.setState({loading: false, treeData: []})
        }, 1)
    }

    onRenderData = ()=>{
        this.setState({treeData: this.data})
    }
    // onExpand: TreeProps['onExpand'] = (expandedKeys, _info, _e) => {
    //     // console.log('onExpand---显示ext数据', nodeInfo.node.props.ext.data);
    //
    //     this.setState({
    //         expandedKeys,
    //         autoExpandParent: false,
    //     });
    // }
    //
    // onCheck: TreeProps['onCheck'] = (isLevel5Keys, _info) => {
    //     this.setState({
    //         isLevel5Keys: isLevel5Keys as string[],
    //         selectedKeys: ['0-3', '0-4'],
    //     });
    // }
    //
    // onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    //     console.log('onSelect', info);
    //     this.setState({selectedKeys});
    // }

    renderTitleHandle = (item:any)=>{
        // console.log('renderTitleHandle-->' + item.count, item);
        const menu = (<Menu >
            <Menu.Item key="1">增加节点</Menu.Item>
            <Menu.Item key="2">删除节点</Menu.Item>
            <Menu.Item key="3">上移一级</Menu.Item>
            <Menu.Item key="4">下移一级</Menu.Item>
        </Menu>);

        const showTitle = (
            <div>
                <Icon type="uf-treefolder"/>
                    ${item.title}
                <Dropdown overlay={menu} >
                    <Icon type="uf-navmenu" />
                </Dropdown>
            </div>
        )

        // const showTitle = item.title;
        // console.log('renderTitleHandle', item)
        return showTitle;
    }
    onChangeLevel = (check:boolean)=>{
        this.data = [];
        this.setState({isLevel5: check, treeData: []})
    }

    render() {
	    return (
	        <div>
                <h4>1.先准备数据源</h4>
                <div>是否开启5层级数据 <Switch checked={this.state.isLevel5} onChange={this.onChangeLevel}/></div>
                <Space>
                    <Button colors="primary" onClick={this.onInitData.bind(this, 10000)} loading={this.state.loading}>准备1w树数据源</Button>
                    <Button colors="primary" onClick={this.onInitData.bind(this, 20000)} loading={this.state.loading}>准备2w树数据源</Button>
                    <Button colors="primary" onClick={this.onInitData.bind(this, 30000)} loading={this.state.loading}>准备3w树数据源</Button>
                    <Button colors="primary" onClick={this.onInitData.bind(this, 50000)} loading={this.state.loading}>准备5w树数据源</Button>
                    <Button colors="primary" onClick={this.onInitData.bind(this, 100000)} loading={this.state.loading}>准备10w树数据源</Button>
                    <Button colors="primary" onClick={this.onInitData.bind(this, 150000)} loading={this.state.loading}>准备15w树数据源</Button>
                    <Button colors="primary" onClick={this.onInitData.bind(this, 200000)} loading={this.state.loading}>准备20w树数据源</Button>
                    <Button colors="primary" onClick={this.onInitData.bind(this, 300000)} loading={this.state.loading}>准备30w树数据源</Button>
                    <Button colors="primary" onClick={this.onInitData.bind(this, 500000)} loading={this.state.loading}>准备50w树数据源</Button>
                    <Button colors="primary" onClick={this.onInitData.bind(this, 100000)} loading={this.state.loading}>准备100w树数据源</Button>
	            </Space>
                <h4>2.再对应数据源下进行渲染</h4>
                <Space>
                    当前数据量:{this.data.length * (this.state.isLevel5 ? 5 : 1)} <Button colors="dark" onClick={this.onRenderData} disabled={this.data.length == 0} >开始渲染</Button>
                </Space>
	            <div style={{height: 450, width: 350, overflow: 'auto'}}>
	                <Tree
	                    checkable
	                    treeData={this.state.treeData}
	                    // treeData={nodeData}
	                    lazyLoad={true}
	                    debounceDuration={100}
	                    // renderTreeNodes={this.renderTreeNodes}
	                    // onExpand={this.onExpand}
                        showLine={true}
	                    defaultExpandAll={true}
	                    // expandedKeys={this.state.expandedKeys}
	                    // autoExpandParent={this.state.autoExpandParent}
	                    // onCheck={this.onCheck}
	                    // onSelect={this.onSelect}
                        renderTitle={this.renderTitleHandle}
	                >
	                </Tree>
	            </div>
	        </div>
	    );
    }
}


export default Demo13;

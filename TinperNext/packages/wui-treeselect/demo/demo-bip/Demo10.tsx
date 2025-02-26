/**
 *
 * @title resizable属性用法
 * @description resizable属性为true的时候，可以通过拖拽边角调整下拉框大小。默认范围是window，也可以通过getPopupContainer指定父级容器，作为拖拽范围
 *
 */
import { TreeSelect, Button } from '@tinper/next-ui';
import React, { Component } from 'react';
type GlobalDataType = GlobalDataType1[]
type GlobalDataType1 = {
    title?: string;
    name?: string;
    value?: string;
    key: string;
    isLeaf?: boolean;
    children?: GlobalDataType;
}
const x = 10;
const y = 1;
const z = 1;
const treeData: GlobalDataType = [];
const longTitle = 'this is a very long treenode---this is a very long treenode----this is a very long treenode---'

const generateData = (_level: number, _preKey?: string, _tns?: GlobalDataType) => {

    const preKey = _preKey || '0';
    const tns = _tns || treeData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: longTitle + key, key, value: key });
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

class Demo10 extends Component {
    getPopupContainer = () =>{
        return document.getElementById('myContainer')!
    }

    render() {
        return (
            <div id='myContainer' style={{ height: 400, background: '#ccc', width: 900}}>
                <TreeSelect
                    resizable
                    showSearch
                    treeData={treeData}
                    style={{ width: 300 }}
                    placeholder="下拉框位置对齐bottomLeft时,请拖动右下角"
                    allowClear
                    virtual={true}
                    placement={'bottomLeft'}
                    dropdownRender={(TreeNode, Footer) => {
                        return (
                            <>
                                {TreeNode}
                                {/* Footer 只在resizable为true的时候生效 */}
                                {Footer && <Footer>
                                    <Button type="text">新增+</Button>
                                    <Button style={{float: 'right'}}>取消</Button>
                                </Footer>}
                            </>
                        )
                    }}
                />
                <TreeSelect
                    resizable="horizontal"
                    showSearch
                    treeData={treeData}
                    style={{ width: 300, marginLeft: 200}}
                    placeholder="仅横向拖拽"
                    allowClear
                    virtual={true}
                    placement={'bottomRight'}
                />
                <div style={{ height: 300 }}></div>
                <TreeSelect
                    resizable="vertical"
                    showSearch
                    treeData={treeData}
                    style={{ width: 300 }}
                    placeholder="仅纵向拖拽"
                    allowClear
                    virtual={true}
                    placement={'topLeft'}
                />
                <TreeSelect
                    resizable
                    showSearch
                    treeData={treeData}
                    style={{ width: 300, marginLeft: 200}}
                    placeholder="下拉框位置对齐topRight时,请拖动左上角"
                    allowClear
                    virtual={true}
                    placement={'topRight'}
                    getPopupContainer={this.getPopupContainer}
                />
            </div>)
    }
}

export default Demo10

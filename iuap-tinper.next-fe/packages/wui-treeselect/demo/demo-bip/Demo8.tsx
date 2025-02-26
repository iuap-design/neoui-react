/**
 *
 * @title fieldid的使用
 * @description fieldid生成在treeSelect最外层dom，下拉箭头（showArrow设置为true），选项，展开/折叠按钮上。
 *
 */
import { TreeSelect, TreeSelectProps } from '@tinper/next-ui';
import React, { Component } from 'react';

const treeData = [{
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [{
        title: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
    }, {
        title: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
    }],
}, {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
}];

class Demo8 extends Component {
    state = {
        value: undefined,
    }
    onChange: TreeSelectProps['onChange'] = (value, _node, _extra) => {

        this.setState({ value });
    }

    render() {
        return (
            <div className="demo2">
                <TreeSelect
                    style={{ width: 300 }}
                    value={this.state.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={treeData}
                    placeholder="Please select"
                    treeDefaultExpandAll
                    fieldid="harrow"
                    onChange={this.onChange}
                    getPopupContainer={() => document.querySelector('.demo2')!}
                />
            </div>
        )
    }
}

export default Demo8

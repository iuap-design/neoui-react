/**
 *
 * @title 自定义图标
 * @description 添加openIcon、closeIcon属性
 *
 */

import {Icon, Tree, TreeProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const TreeNode = Tree.TreeNode;

const defaultProps = {
    keys: ['0-0-0', '0-0-1']
}
interface DemoProps {
    keys: string[]
}
interface DemoState {
    defaultExpandedKeys: string[];
    defaultSelectedKeys: string[];
    defaultCheckedKeys: string[];
}
class Demo1 extends Component<DemoProps, DemoState> {
    static defaultProps = defaultProps

    constructor(props: DemoProps) {
        super(props);
        const keys = this.props.keys;
        this.state = {
            defaultExpandedKeys: keys,
            defaultSelectedKeys: keys,
            defaultCheckedKeys: keys,
        };
    }

    onSelect: TreeProps['onSelect'] = (_selectedKeys, info) => {
        console.log('selected', info);
    }

    onCheck(info: string[]) {
        console.log('onCheck', info);
    }

    render() {
        const switcherStyle = {
            border: 'none',
            lineHeight: '1.2'
        }
        return (

            <Tree className="myCls"
				  checkable
				  openIcon={<Icon type="uf-arrow-c-o-down"/>}
				  closeIcon={<Icon type="uf-arrow-c-o-right"/>}
				  defaultExpandedKeys={this.state.defaultExpandedKeys}
				  defaultSelectedKeys={this.state.defaultSelectedKeys}
				  defaultCheckedKeys={this.state.defaultCheckedKeys}
				  onSelect={this.onSelect} onCheck={this.onCheck}
            >
                <TreeNode switcherStyle={switcherStyle} title="parent 1" key="0-0">
                    <TreeNode switcherStyle={switcherStyle} title="parent 1-0" key="0-0-0" disabled>
                        <TreeNode title="leaf" key="0-0-0-0" disableCheckbox/>
                        <TreeNode title="leaf" key="0-0-0-1"/>
                    </TreeNode>
                    <TreeNode switcherStyle={switcherStyle} title="parent 1-1" key="0-0-1">
                        <TreeNode title={<span>sss</span>} key="0-0-1-0"/>
                    </TreeNode>
                </TreeNode>
            </Tree>
        );
    }
}

// Demo1.defaultProps = defaultProps;


export default Demo1;

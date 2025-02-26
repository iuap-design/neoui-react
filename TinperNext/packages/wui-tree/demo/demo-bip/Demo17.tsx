/**
 *
 * @title 树节点带有多个标签或者标签+图标
 * @description 在TreeNode的title中可以传入Tag标签
 *
 */

import { Icon, Tag, Tree } from '@tinper/next-ui';
import React, { Component } from 'react';
const TreeNode = Tree.TreeNode

class Demo17 extends Component {
    constructor(props: {}) {
        super(props);
    }
    render() {
        return (
            <Tree
                focusable
                defaultExpandAll
                showIcon
            >
                <TreeNode icon={<Icon type="uf-treefolder" style={{color: '#EFB524'}}/>} title="树节点+图标" key="0-0" >
                    <TreeNode title={<div><Tag color="half-blue">待审核</Tag>树节点+标签</div>} key="0-0-0" >
                        <TreeNode title={<div><Tag color="half-blue">待审核</Tag>leaf1</div>} key="0-0-0-0" />
                        <TreeNode title={<div><Tag color="half-green">已审核</Tag>leaf2</div>} key="0-0-0-1" />
                        <TreeNode icon={<Icon type="uf-dongjie" />} title={<div><Tag color="half-red">已标错</Tag>aaa</div>} key="0-0-0-2" />
                    </TreeNode>
                    <TreeNode icon={<Icon type="uf-treefolder" style={{color: '#EFB524'}}/>} title={<div><Tag color="half-yellow">已暂存</Tag>树节点+图标+标签</div>} key="0-0-1">
                        <TreeNode title={<div><Tag color="half-yellow">已暂存</Tag><Tag color="half-blue">待审核</Tag>树节点+多个标签</div>} key="0-0-1-0" />
                        <TreeNode icon={<Icon type="uf-dongjie" />} title="bbb" key="0-0-2-1" />
                    </TreeNode>
                </TreeNode>
            </Tree>
        );
    }
}

export default Demo17;

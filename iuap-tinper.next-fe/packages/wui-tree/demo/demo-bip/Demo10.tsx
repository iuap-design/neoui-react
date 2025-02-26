/**
 *
 * @title 同步checkbox和文字的选中状态
 * @description 传递syncCheckedAndSelectedStatus属性为true，checkbox和文字可以同时选中或者同时取消选中
 * @type other
 *
 */

import {Tree} from '@tinper/next-ui';
import React, {Component} from 'react';

const TreeNode = Tree.TreeNode;

const defaultProps = {}

class Demo10 extends Component<{keys: string[]}, {}> {
    static defaultProps = defaultProps;
    constructor(props: {keys: string[]}) {
	    super(props);
    }

    render() {

	    return (
	        <Tree className="myCls"
	            checkable
	            syncCheckedAndSelectedStatus
	            defaultExpandAll
	        >
	            <TreeNode title="A" key="0-0">
	                <TreeNode title="A-1" key="0-0-0">
	                    <TreeNode title="A-1-1" key="0-0-0-0" />
	                    <TreeNode title="A-1-2" key="0-0-0-1"/>
	                </TreeNode>
	                <TreeNode title="A-2" key="0-0-1">
	                    <TreeNode title="A-2-1" key="0-0-1-0"/>
	                </TreeNode>
	                <TreeNode title="A-3" key="0-0-2">
	                    <TreeNode title="A-3-1" key="0-0-2-0"/>
	                    <TreeNode title="A-3-2" key="0-0-2-1"/>
	                </TreeNode>
	            </TreeNode>
	        </Tree>
	    );
    }
}

// Demo10.defaultProps = defaultProps;

export default Demo10;

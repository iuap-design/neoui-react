/**
 *
 * @title 连接线Tree
 * @description
 * @type other
 *
 */

import {Tree} from '@tinper/next-ui';
import React, {Component} from 'react';

const TreeNode = Tree.TreeNode;
class Demo9 extends Component<{keys: string[]}, {}> {

    constructor(props: {keys: string[]}) {
        super(props);
        const keys = this.props.keys;
        this.state = {
            defaultExpandedKeys: keys
        };
    }

    render() {
        return (
            <Tree className="myCls" checkable showLine defaultExpandAll={true}>
	            <TreeNode title="1" key="1">
	                <TreeNode title="1-1" key="1-1">
	                    <TreeNode title="1-1-1" key="1-1-1" />
	                    <TreeNode title="1-1-2" key="1-1-2">
					        <TreeNode title="1-1-2-1" key="1-1-2-1" />
				        </TreeNode>
				        <TreeNode title="1-1-3" key="1-1-3" />
				        <TreeNode title="1-1-4" key="1-1-4" />
	                </TreeNode>
			        <TreeNode title="2" key="2">
	                    <TreeNode title="2-1" key="2-1">
                            <TreeNode title="2-1-1" key="2-1-1" />
				        </TreeNode>
	                    <TreeNode title="2-2" key="2-2">
                            <TreeNode title="2-2-1" key="2-2-1" />
                            <TreeNode title="2-2-2" key="2-2-2" />
				        </TreeNode>
				        <TreeNode title="2-3" key="2-3" />
				        <TreeNode title="2-4" key="2-4">
                            <TreeNode title="2-4-1" key="2-4-1" />
				        </TreeNode>
	                </TreeNode>
	            </TreeNode>
	        </Tree>
        );
    }
}

export default Demo9;

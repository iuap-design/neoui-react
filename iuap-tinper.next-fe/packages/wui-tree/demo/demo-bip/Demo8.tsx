/**
 *
 * @title 节点可编辑
 * @description 鼠标移动到节点上点击编辑图标进行编辑。e.node.props.eventKey代表当前节点key值。editKey指当前操作的节点key
 */

import {Icon, Tree, TreeProps} from '@tinper/next-ui';
import React, {Component, CSSProperties} from 'react';

const TreeNode = Tree.TreeNode;

class Demo8 extends Component<{}, {treeData: any, isHover: string, editKey: string}> {
    constructor(props: {}) {
        super(props);

        this.state = {
            treeData: [],
            isHover: "",
            editKey: ""
        };
        this.inputRef = null;
    }
	inputRef: HTMLInputElement | null;
	onMouseEnter: TreeProps['onMouseEnter'] = (e) => {
	    if (this.state.editKey) return;
	    this.setState({
	        isHover: e.node.props.eventKey
	    })
	}
	onMouseLeave: TreeProps['onMouseLeave'] = () => {
	    if (this.state.editKey) return;
	    this.setState({
	        isHover: "",
	        editKey: ""
	    })
	}
	onBlur = () => {
	    this.setState({
	        isHover: "",
	        editKey: ""
	    })
	}

	editRender = (item: any) => {
	    this.setState({
	        editKey: item.key

	    }, () => {
	        this.inputRef?.focus()
	    });
	}
	nodechange = (item: any, value: string) => {
	    item.name = value;
	}
	renderTreeTitle = (item: any) => {
	    let titleIcon, titleInfo, correctIcon;
	    const titleMiddleStyle = {
	        display: 'inline-block',
	        'verticalAlign': 'middle'
	    }
	    // 编辑时input框
	    const spanStyle: CSSProperties = {
	        maxWidth: '86%',
	        display: 'inline-block',
	        overflow: 'hidden',
	        textOverflow: 'ellipsis',
	        whiteSpace: 'nowrap',
	    }
	    if (this.state.editKey == item.key) {
	        titleInfo = <input type="text" id="itemKey" ref={(ref)=>this.inputRef = ref} onBlur={this.onBlur} defaultValue={item.name} style={{maxWidth: 130, height: 20}}
							   onChange={(e) => this.nodechange(item, e.target.value)}/>
	    } else {
	        titleInfo = <span title={item.name} style={spanStyle} className="title-middle">{item.name}</span>
	    }
	    const iconStyle: CSSProperties = {
	        padding: '0px 2px',
	        float: 'right',
	        fontSize: '16px',
	        lineHeight: '22px',
	        ...titleMiddleStyle
	    }
	    // 编辑图标
	    if (this.state.isHover === item.key && !this.state.editKey) {
	        titleIcon = <Icon style={iconStyle} className="title-middle edit-icon" type="uf-pencil"
							  onClick={() => this.editRender(item)}></Icon>;
	    }
	    if (this.state.editKey === item.key) {
	        correctIcon = <Icon onClick={this.onBlur} style={iconStyle} type="uf-correct-2"/>
	    }
	    return (<div className="title-con"
					 style={{minWidth: '150px', height: '22px', 'lineHeight': '22px'}}>
	        {titleInfo}
	        {correctIcon}
	        {titleIcon}
	    </div>);
	}

	componentDidMount = () => {
	    setTimeout(() => {
	        this.setState({
	            treeData: [{
	                name: 'pNode 01',
	                key: '0-0',
	                children: [{
	                    name: 'leaf 0-0-0',
	                    key: '0-0-0'
	                }, {
	                    name: 'leaf 0-0-1',
	                    key: '0-0-1'
	                }]
	            }, {
	                name: 'pNode 02',
	                key: '0-1',
	                children: [{
	                    name: 'leaf 0-1-0',
	                    key: '0-1-0'
	                }, {
	                    name: 'leaf 0-1-1',
	                    key: '0-1-1'
	                }]
	            }, {
	                name: 'pNode 03',
	                key: '0-2',
	                isLeaf: true
	            }],
	        });

	    }, 100);
	}

	render() {
	    const loop = (data: any) => data.map((item: any) => {
	        if (item.children) {
	            return <TreeNode title={this.renderTreeTitle(item)} key={item.key}>{loop(item.children)}</TreeNode>;
	        }
	        return <TreeNode title={this.renderTreeTitle(item)} key={item.key} isLeaf={item.isLeaf}
							 disabled={item.key === '0-0-0'}/>;
	    });
	    const treeNodes = loop(this.state.treeData);
	    return (
	        <Tree onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className="myCls">
	            {treeNodes}
	        </Tree>

	    );
	}
}


export default Demo8;

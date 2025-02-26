/**
 *
 * @title treeSelect基本使用
 * @description treeSelect基本使用—单选。
 *
 */
import {TreeSelect, TreeSelectProps} from '../../../../packages';
import React, {Component} from 'react';

const {TreeNode} = TreeSelect;
interface DemoProps {
	bordered?: TreeSelectProps["bordered"];
	style?: any;
	value?: string;
	disabled?: TreeSelectProps["disabled"];
	listHeight?: TreeSelectProps["listHeight"];
	suffixIcon?: TreeSelectProps["suffixIcon"];
	showArrow?: TreeSelectProps["showArrow"];
	placement?: TreeSelectProps["placement"];
	dropdownMatchSelectWidth?: TreeSelectProps["dropdownMatchSelectWidth"];
}

class Demo1 extends Component<DemoProps> {
	state = {
	    value: undefined,
	}

    onChange: TreeSelectProps['onChange'] = (value, _node, _extra) => {

	    this.setState({value});
    }
	onSelect: TreeSelectProps['onSelect'] = (value: string, _option: Record<string, any>) => {
	    console.log('--value--' + value);
	}

	render() {
		const { bordered, disabled, listHeight, dropdownMatchSelectWidth, placement, suffixIcon, showArrow, style } = this.props;
	    return (<div style={style}>
		{
			placement ? <div style={{height: '200px'}}></div> : null
		}
	        <TreeSelect
	            showSearch
	            style={{width: 300}}
	            value={this.state.value}
				defaultValue={this.props.value}
	            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
	            placeholder="请选择"
	            allowClear
				bordered={bordered}
				disabled={disabled}
				placement={placement}
				listHeight={listHeight}
				suffixIcon={suffixIcon}
				showArrow={showArrow}
				dropdownMatchSelectWidth={dropdownMatchSelectWidth}
	            treeDefaultExpandAll
	            onChange={this.onChange}
	            onSelect={this.onSelect}
	        >
	            <TreeNode value="parent 1" title="用友网络股份有限公司" key="0-1">
	                <TreeNode value="parent 1-0" title="用友网络股份有限公司1-0" key="0-1-1">
	                    <TreeNode value="leaf1" title="用友网络股份有限公司leaf" key="random"/>
	                    <TreeNode value="leaf2" title="用友网络股份有限公司leaf" key="random1"/>
	                </TreeNode>
	                <TreeNode value="parent 1-1" title="用友网络股份有限公司" key="random2">
	                    <TreeNode value="sss" title="用友网络股份有限公司" key="random3"/>
	                </TreeNode>
	            </TreeNode>
	        </TreeSelect>
			</div>
	    )
	}
}

export default Demo1

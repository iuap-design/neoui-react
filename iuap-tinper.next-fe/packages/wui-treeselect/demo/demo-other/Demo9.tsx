/**
 *
 * @title treeSelect其他API示例
 * @description treeSelect其他API
 *
 */
import {Button, TreeSelect, TreeSelectProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const {TreeNode} = TreeSelect;

class Demo9 extends Component {
	state = {
	    value: undefined,
	    bordered: true,
	    disabled: false,
	    dropdownRender: false,
	    constValue: false,
	    showSearch: true
	}

	onChange: TreeSelectProps['onChange'] = (value, _node, _extra) => {
	    console.log('on change test')
	    this.setState({value});
	}


	onSelect: TreeSelectProps['onSelect'] = (_value: string, _option: Record<string, any>) => {
	    console.log('on select test')
	}

	handleSetBordered = () => {
	    let {bordered} = this.state
	    this.setState({
	        bordered: bordered === true ? false : bordered === false ? 'bottom' : true
	    })
	}

	handleSetDisabled = () => {
	    this.setState({
	        disabled: !this.state.disabled
	    })
	}

	handleDropdownRender = () => {
	    this.setState({
	        dropdownRender: true
	    })
	}

	handleSetConstValue = () => {
	    this.setState({
	        constValue: true
	    })
	}

	handleSetShowSearch = () => {
	    this.setState({
	        showSearch: false
	    })
	}

	render() {
	    const {disabled, bordered, dropdownRender, constValue, showSearch} = this.state
	    const dropdownRenderObj = dropdownRender ? {dropdownRender: () => <div>1</div>} : {}
	    const valueObj = constValue ? {value: "leaf2"} : {}
	    return (
	        <div>
	            <div>
	                <Button onClick={this.handleSetDisabled}>设置disabled</Button>
	                <Button onClick={this.handleSetBordered}>设置bordered</Button>
	                <Button onClick={this.handleDropdownRender}>自定义渲染下拉框内容</Button>
	                <Button onClick={this.handleSetConstValue}>设置固定的value</Button>
	                <Button onClick={this.handleSetShowSearch}>设置不能搜索</Button>
	            </div>
	            <TreeSelect
	                showSearch={showSearch}
	                className="test-classname"
	                popupClassName="dropdown-classname"
	                defaultValue="leaf2"
	                disabled={disabled}
	                bordered={bordered}
	                style={{width: 300}}
	                dropdownMatchSelectWidth={567}
	                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
	                placeholder="请选择"
	                allowClear
	                treeNodeLabelProp="value"
	                treeDefaultExpandAll
	                virtual={false}
	                onChange={this.onChange}
	                notFoundContent="没有匹配结果"
	                onSelect={this.onSelect}
	                onSearch={() => console.log('on search test')}
	                onTreeExpand={() => console.log('on tree expand test')}
	                onDropdownVisibleChange={() => console.log('on dropdown visible change test')}
	                {...dropdownRenderObj}
	                {...valueObj}
	            >
	                <TreeNode value="parent 1" title="用友网络股份有限公司" key="0-1">
	                    <TreeNode value="parent 1-0" title="用友网络股份有限公司1-0" key="0-1-1">
	                        <TreeNode value="leaf1" title="用友网络股份有限公司leaf" key="random"/>
	                        <TreeNode value="leaf2" title="用友网络股份有限公司leaf" key="random1"/>
	                        <TreeNode value="leaf3" title="用友网络股份有限公司leaf" key="random32"/>
	                        <TreeNode value="leaf4" title="用友网络股份有限公司leaf" key="random33"/>
	                        <TreeNode value="leaf5" title="用友网络股份有限公司leaf" key="random4"/>
	                        <TreeNode value="leaf6" title="用友网络股份有限公司leaf" key="random5"/>
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

export default Demo9

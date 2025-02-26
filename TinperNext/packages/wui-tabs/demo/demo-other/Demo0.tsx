/**
 *
 * @title 类型
 * @description tab页签各种类型。
 * demo0
 */

import {Select, Tabs, Button, DatePicker, Dropdown, Menu, TimePicker, Tooltip, TreeSelect, TabsProps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {TabPane} = Tabs;
const {Option} = Select;
const {Item} = Menu;
const {TreeNode} = TreeSelect;

interface TabsState0 {
	activeKey: string;
	start: number;
	tabType: string;
	allType: string[];
	showModal: boolean;
	visible1: boolean;
	visible: boolean;
	open: boolean;
	timeOpen: boolean;
	dateOpen: boolean;
	value: undefined | string;
}

class Demo0 extends Component<{}, TabsState0> {
	dRef: HTMLElement | null
	constructor(props: {}) {
	    super(props);
	    this.state = ({
	        activeKey: "1",
	        start: 0,
	        tabType: "line",
	        allType: ['line', 'card', 'editable-card', 'fill', 'primary', 'trangle', 'fade', 'trapezoid', 'fill-line'],
	        showModal: false,
	        visible1: false,
	        visible: false,
	        open: false,
	        timeOpen: false,
	        dateOpen: false,
	        value: undefined
	    })
	    this.dRef = null;
	}

	onChange: TabsProps['onChange'] = (activeKey) => {
	    console.log(`onChange ${activeKey}o-^-o`);
	    this.setState({
	        activeKey,
	    });
	}

	changeTabPosition = (tabType: string) => {
	    this.setState({tabType});
	}

	close = () => {
	    this.setState({
	        showModal: false
	    });
	}

	open = () => {
	    this.setState({
	        showModal: true
	    });
	}

	show = () => {
	    console.log('this.dRef', this.dRef)
	    this.setState({
	        visible: !this.state.visible,
	        visible1: false,
	        open: false,
	        timeOpen: false,
	        dateOpen: false
	    })
	}

	handleSelect = () => {
	    this.setState({
	        visible1: false
	    })
	}

	handleShow = () => {
	    this.setState({
	        visible1: true,
	        visible: false,
	        open: false,
	        timeOpen: false,
	        dateOpen: false
	    })
	}

	componentDidMount() {
	    // console.log('this.dd', this.dd)
	}

	changeOpen = () => {
	    this.setState({
	        open: !this.state.open,
	        visible1: false,
	        visible: false,
	        timeOpen: false,
	        dateOpen: false
	    });
	}

	onTreeChange = (value: any) => {
	    this.setState({value});
	}
	onSelect = (value: any) => {
	    console.log('--value--' + value);
	}

	handleTimeShow = () => {
	    this.setState({
	        timeOpen: !this.state.timeOpen,
	        visible1: false,
	        visible: false,
	        open: false,
	        dateOpen: false
	    })
	}
	handleDateShow = () => {
	    this.setState({
	        dateOpen: !this.state.dateOpen,
	        visible1: false,
	        visible: false,
	        open: false,
	        timeOpen: false
	    })
	}

	render() {

	    let tip = (
	        <div>
				这是一个很强的提醒
	        </div>
	    )

	    const menu1 = (
	        <Menu
	            onSelect={this.handleSelect}>
	            <Item key="1">借款合同</Item>
	            <Item key="2">抵/质押合同</Item>
	            <Item key="3">担保合同</Item>
	            <Item key="4">联保合同</Item>
	            <Item key="5">合同审批</Item>
	            <Item key="6">抵/质押合同跟踪</Item>
	        </Menu>
	    );

	    return (
	        <div className="demo0">
	            <div style={{marginBottom: 16}}>
					Tab Type：
	                <Select
	                    value={this.state.tabType}
	                    onChange={this.changeTabPosition}
	                    style={{width: '100px'}}
	                >
	                    {
	                        this.state.allType.map(item => {
	                            return (
	                                <Option value={item} key={item}>{item}</Option>
	                            )
	                        })
	                    }
	                </Select>
	            </div>
	            <Tabs
	                activeKey={this.state.activeKey}
	                type={this.state.tabType}
	                onChange={this.onChange}
	                defaultActiveKey="1"
	                className="demo0-tabs"
	            >
	                <TabPane tab='Tab 1' key="1" style={{height: 600}}>
	                    <div id='yy' style={{position: 'relative', }} tinper-next-role='container'>
	                        <Tooltip arrowPointAtCenter trigger="click" placement="bottom" rootClose overlay={tip}
									 visible={this.state.visible}
									 ref={ref => this.dRef = ref}>
	                            <Button colors="primary" onClick={this.show}>
									点击显示
	                            </Button>
	                        </Tooltip>
	                        <br/>
	                        <br/>
	                        <Dropdown
	                            trigger={['click']}
	                            overlay={menu1}
	                            transitionName="slide-up"
	                            visible={this.state.visible1}
	                        >
	                            <Button
	                                onClick={this.handleShow}
	                                colors='primary'>
									受控制的下拉
	                            </Button>
	                        </Dropdown>

	                        <br/>
	                        <br/>

	                        <Button onClick={this.changeOpen.bind(this)} style={{marginRight: 20}}>change select</Button>
	                        <Select
	                            defaultValue="all"
	                            style={{width: 200, marginRight: 6}}
	                            onChange={this.changeOpen}
	                            open={this.state.open}
	                        >
	                            <Option value="all">全部</Option>
	                            <Option value="confirming">待确认</Option>
	                            <Option value="executing">执行中</Option>
	                            <Option value="completed" disabled>
									已办结
	                            </Option>
	                            <Option value="termination">终止</Option>
	                        </Select>

	                        <br/>
	                        <br/>

	                        <TreeSelect
	                            showSearch
	                            style={{width: 300}}
	                            value={this.state.value}
	                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
	                            placeholder="请选择"
	                            allowClear
	                            treeDefaultExpandAll
	                            onChange={this.onTreeChange}
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

	                        <br/>
	                        <br/>
	                        <div>
	                            <Button onClick={this.handleTimeShow} colors='primary'
	                                style={{marginRight: 20, verticalAlign: 'top'}}>受控显示的时间</Button>
	                            <TimePicker open={this.state.timeOpen} format="HH:mm:ss" use12Hours placeholder="选择时间"
	                                style={{width: 164, height: 28}}/>
	                        </div>

	                        <br/>
	                        <br/>
	                        <Button onClick={this.handleDateShow} colors='primary'
	                            style={{marginRight: 20}}>受控显示的日期</Button>
	                        <DatePicker open={this.state.dateOpen} style={{width: 206, height: 28}} showTime/>
	                        {/* <div style={{height: 300}}></div> */}
	                    </div>
	                </TabPane>
	                <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
	                <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
	                <TabPane tab='Tab 4' key="4">Content of Tab Pane 4</TabPane>
	                <TabPane tab='Tab 5' key="5">Content of Tab Pane 5</TabPane>
	                <TabPane tab='Tab 6' key="6">Content of Tab Pane 6</TabPane>
	                <TabPane tab='Tab 7' key="7">Content of Tab Pane 7</TabPane>
	                <TabPane tab='Tab 8' key="8">Content of Tab Pane 8</TabPane>
	            </Tabs>
	        </div>
	    )
	}
}

export default Demo0;

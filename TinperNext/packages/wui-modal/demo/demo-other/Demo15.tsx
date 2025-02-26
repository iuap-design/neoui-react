/**
 *
 * @title modal组件有弹框的组件表现行为
 * @description popover、下拉、日期等组件弹框默认渲染在modal上
 *
 */

import {Button, DatePicker, Dropdown, Menu, Modal, Row, Select, TimePicker, Tooltip, TreeSelect} from '@tinper/next-ui';
import React, {Component} from 'react';

const {Item} = Menu;
const Option = Select.Option;
const {TreeNode} = TreeSelect;
interface ModalType {
	showModal: boolean,
	visible1: boolean,
	visible: boolean,
	open: boolean,
	timeOpen: boolean,
	dateOpen: boolean,
	value?: string | string[]
}
class Demo15 extends Component<{}, ModalType> {
	dd: Button | null = null;
	dRef: HTMLDivElement | null;
	constructor(props: {}) {
	    super(props);
	    this.state = {
	        showModal: false,
	        visible1: false,
	        visible: false,
	        open: false,
	        timeOpen: false,
	        dateOpen: false,
	        value: undefined
	    };
	    this.dRef = null;
	    this.close = this.close.bind(this);
	    this.open = this.open.bind(this);
	}

	close() {
	    this.setState({
	        showModal: false
	    });
	}

	open() {
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
	    console.log('this.dd', this.dd)
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

	onChange = (value: string) => {
	    this.setState({value});
	    this.setState({
	        dateOpen: false,
	        visible1: false,
	        visible: false,
	        open: false,
	        timeOpen: false
	    })
	}
	onSelect = (value: string) => {
	    console.log('--value--' + value);
	    this.setState({
	        dateOpen: false,
	        visible1: false,
	        visible: false,
	        open: false,
	        timeOpen: false
	    })
	}

	handleTimeShow: React.MouseEventHandler<HTMLDivElement> = (_value) => {
	    this.setState({
	        timeOpen: !this.state.timeOpen,
	        visible1: false,
	        visible: false,
	        open: false,
	        dateOpen: false
	    })
	}
	handleDateShow: React.MouseEventHandler<HTMLDivElement> = (_value) => {
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
	        <div>
	            <Button
	                ref={ref => this.dd = ref}
	                bordered
	                className="demo-margin"
	                onClick={this.open}>
					打开模态框
	            </Button>
	            <Modal
	                draggable
	                visible={this.state.showModal}
	                destroyOnClose
	                maskClosable={false}
	                //  bodyStyle={{ height: '700px' }}
	                onCancel={this.close}
	            >
	                <Modal.Body>
	                    <div tinper-next-role="container">
	                        <p>Some contents...</p>
	                        <p>Some contents...</p>
	                        <p>Some contents...</p>
	                        <Row style={{ marginTop: 16 }}>
	                            <Tooltip arrowPointAtCenter trigger="click" placement="bottom" rootClose overlay={tip}
	                                visible={this.state.visible} ref={ref => this.dRef = ref}>
	                                <Button colors="primary" onClick={this.show}>
										点击显示
	                                </Button>
	                            </Tooltip>
	                        </Row>
	                        <Row style={{ marginTop: 16 }}>
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
	                        </Row>
	                        <Row style={{ marginTop: 16 }}>
	                            <Button onClick={this.changeOpen.bind(this)} style={{ marginRight: 20 }}>change select</Button>
	                            <Select
	                                defaultValue="all"
	                                style={{ width: 200, marginRight: 6 }}
	                                onChange={this.changeOpen}
	                                open={this.state.open}
	                            >
	                                <Option value="all">全部</Option>
	                                <Option value="confirming">待确定</Option>
	                                <Option value="executing">执行中</Option>
	                                <Option value="completed" disabled>
										已办结
	                                </Option>
	                                <Option value="termination">终止</Option>
	                            </Select>
	                        </Row>
	                        <Row style={{ marginTop: 16 }}>
	                            <TreeSelect
	                                showSearch
	                                style={{ width: 300 }}
	                                value={this.state.value}
	                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
	                                placeholder="请选择"
	                                allowClear
	                                treeDefaultExpandAll
	                                onChange={this.onChange}
	                                onSelect={this.onSelect}
	                            >
	                                <TreeNode value="parent 1" title="用友网络股份有限公司" key="0-1">
	                                    <TreeNode value="parent 1-0" title="用友网络股份有限公司1-0" key="0-1-1">
	                                        <TreeNode value="leaf1" title="用友网络股份有限公司leaf" key="random" />
	                                        <TreeNode value="leaf2" title="用友网络股份有限公司leaf" key="random1" />
	                                    </TreeNode>
	                                    <TreeNode value="parent 1-1" title="用友网络股份有限公司" key="random2">
	                                        <TreeNode value="sss" title="用友网络股份有限公司" key="random3" />
	                                    </TreeNode>
	                                </TreeNode>
	                            </TreeSelect>
	                        </Row>
	                        <Row style={{ marginTop: 16 }}>
	                            <Button onClick={this.handleTimeShow} colors='primary'
	                                style={{ marginRight: 20 }}>受控显示的时间</Button>
	                            <TimePicker open={this.state.timeOpen} format="HH:mm:ss" use12Hours placeholder="选择时间"
	                                style={{ width: 164, height: 28 }} />
	                        </Row>
	                        <Row style={{ marginTop: 16 }}>
	                            <Button onClick={this.handleDateShow} colors='primary'
	                                style={{ marginRight: 20 }}>受控显示的日期</Button>
	                            <DatePicker open={this.state.dateOpen} style={{ width: 206, height: 28 }} />
	                        </Row>
	                    </div>
	                </Modal.Body>
	            </Modal>
	        </div>
	    )
	}
}

export default Demo15;

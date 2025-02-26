/**
 *
 * @title 全局配置direction支持rtl方向改变，用于阿拉伯语等多语展示
 * @description 默认是ltr，可以设置rtl
 *
 */

import {
    Checkbox,
    ConfigProvider,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Pagination,
    Radio,
    Select,
    TimePicker,
    Button,
    Modal,
    Space,
    ButtonGroup,
    Icon,
    AutoComplete,
    Cascader,
    InputGroup,
    Rate,
    Message,
    Popconfirm,
    Switch,
    Slider,
    TreeSelect,
    Badge,
    Dropdown,
    Menu,
    BackTop,
    Spin

} from "@tinper/next-ui";
import LayoutWrapper from './TreeTableList';
import React, { Component } from 'react';
import DemoTransfer from '../../../wui-transfer/demo/demo-other/Demo1';
import DemoCollapseCard from '../../../wui-collapse/demo/demo-other/Demo12';
import DemoIconBip from '../../../wui-icon/demo/demo-bip/Demo3';
import DemoIconDev from '../../../wui-icon/demo/demo-other/Demo1';

import './Demo13.less';

import DemoDrawer from './Drawer';
import textMultiLangMap from './langMap';

const Item = Form.Item;

const Option = Select.Option;
const { TreeNode } = TreeSelect;

const layoutHorizontal = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
}

interface ProviderState {
	direction: 'rtl' | 'ltr';
    tableData: any[];
    selectedRowKeys: any[];
	rangeValue: any;
	showModal: boolean;
	activePage: number;
	arrowCrt: number;
	number: number;
}

const marks = {
    '-10': '-10°C',
    0: <strong>0°C</strong>,
    26: '26°C',
    47: '47°C',
    100: {
        style: {
            color: 'red',
        },
        label: <strong>100°C</strong>
    }
};


class Demo1 extends Component<{}, ProviderState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            direction: "rtl",
            // tableData: this.getData('rtl'),
            selectedRowKeys: [],
            rangeValue: [],
            showModal: false,
            activePage: 1,
            arrowCrt: 10,
            number: 0,


        }
        this.formref = React.createRef();
        // ConfigProvider.config({ direction: 'rtl' })
        // ConfigProvider.registerLang('ar', arLang);

    }
	 options = [{
	     label: '基础组件',
	     value: 'jczj',
	     children: [{
	         label: '导航',
	         value: 'dh',
	         children: [{
	             label: '面包屑',
	             value: 'mbx'
	         }, {
	             label: '分页',
	             value: 'fy'
	         }, {
	             label: '标签',
	             value: 'bq'
	         }, {
	             label: '菜单',
	             value: 'cd'
	         }]
	     }, {
	         label: '反馈',
	         value: 'fk',
	         children: [{
	             label: '模态框',
	             value: 'mtk'
	         }, {
	             label: '通知',
	             value: 'tz'
	         }]
	     },
	     {
	         label: '表单',
	         value: 'bd'
	     }]
	 }, {
	     label: '应用组件',
	     value: 'yyzj',
	     children: [{
	         label: '参照',
	         value: 'ref',
	         children: [{
	             label: '树参照',
	             value: 'reftree'
	         }, {
	             label: '表参照',
	             value: 'reftable'
	         }, {
	             label: '穿梭参照',
	             value: 'reftransfer'
	         }]
	     }]
	 }
	 ];


	handleDirectionChange = (value: 'ltr' | 'rtl') => {
	    ConfigProvider.config({ direction: value });
	    this.setState({
	        direction: value,
	        // tableData: this.getData(value)
	    })
	    // document.documentElement.setAttribute("dir", value)
	};
	confirm = () => {
	    Modal.confirm({
	        getPopupContainer: ()=>document.querySelector("[tinper-next-role='container']") as HTMLElement,
	        title: "Confirm",
	        dir: "rtl",
	        content: "Are you sure to delete this task?",
	    })
	}


	editModal = ()=>{
	    this.setState({
	        showModal: true
	    })
	}
	showMessage=(type)=>{
	    Message.destroy();
	    Message.create({ content: textMultiLangMap[this.state.direction]?.message, color: type });

	}

	validateForm = async()=>{
	    const values = await this.formref.current.validateFields()
	    console.log(values, "values")
	}

	handleSelect = (activePage:number)=>{
	    this.setState({
	        activePage
	    })
	}
	render() {
	    const { direction } = this.state;

	    const menu1 = (<Menu >
	        <Menu.Item key="1">借款合同</Menu.Item>
	        <Menu.Item key="2">抵/质押合同</Menu.Item>
	        <Menu.Item key="3">担保合同</Menu.Item>
	        <Menu.Item key="4">联保合同</Menu.Item>
	        <Menu.Item key="5">合同审批</Menu.Item>
	        <Menu.Item key="6">抵/质押合同跟踪0000</Menu.Item>
	    </Menu>);
	    return (
	        <div className={"provider-demo-13"} tinper-next-role={'container'} style={{ position: 'relative', padding: 16 }} dir={direction}>
	            <Radio.Group
	                selectedValue={direction}
	                onChange={this.handleDirectionChange}>
	                <Radio.Button value="ltr">LTR</Radio.Button>
	                <Radio.Button value="rtl">RTL</Radio.Button>
	            </Radio.Group>

	            <ConfigProvider locale={"ar_SA"} dir={direction}>
	                <Form
	                    ref={this.formref}
	                    // {...(direction === "rtl" ? layoutVertical : layoutHorizontal)}
	                    {...layoutHorizontal}
	                    initialValues={{
	                        date: '2022-02-02',
	                        range: ['2023-03-03', '2024-04-04'],
	                        time: '11:12:34',
	                        input: '我是input',
	                        search: '我是search',
	                        password: '我是password',
	                        num: 12345,
	                        textarea: '我是textarea',
	                        select: 'confirming',
	                        radio: '1',
	                        checkbox: ['A', 'B'],
	                        slideRange: [10, 20]
	                    }}>
	                    <Item label={textMultiLangMap[direction]?.date} name='date'>
	                        <DatePicker dir={direction} showTime format={direction == "rtl" ? "DD/MM/YYYY" : "YYYY-MM-DD"}/>
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.range} name='range'>
	                        <DatePicker picker='range' format={direction == "rtl" ? "DD/MM/YYYY" : "YYYY-MM-DD"}/>
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.time} name='time'>
	                        <TimePicker />
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.input} name='input'>
	                        <Input allowClear />
	                    </Item>
	                    <Item required rules={[
	                        {
	                            required: true,
	                            validator: (_rule, value, callback) => {
	                                const { min, max } = _rule;
	                                if (value < min) {
	                                    callback('最小值不小于50');
	                                } else if (value && value > max) {
	                                    callback('最大值不大于100');
	                                } else if (!value && value !== 0) {
	                                    callback('请输入最小值');
	                                } else {
	                                    callback();
	                                }
	                            }
	                        }
	                    ]} label={textMultiLangMap[direction]?.input} name='inputPrefix'>
	                        <Input prefix={"$"} allowClear />
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.inputGroup} name='inputGroup'>
	                        <InputGroup dir="ltr">
	                            <InputGroup.Button>
	                                <Button dir="ltr">https://</Button>
	                            </InputGroup.Button>
	                            <Input type='text' dir={direction}/>
	                            <InputGroup.Addon>.com</InputGroup.Addon>
	                        </InputGroup>
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.search} name='search'>
	                        <Input.Search allowClear />
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.password} name='password'>
	                        <Input.Password allowClear />
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.num} name='num'>
	                        <InputNumber toThousands iconStyle="one" />
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.number} name='number'>
	                        <InputNumber addonBefore={"$"}/>
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.textarea} name='textarea'>
	                        <Input.TextArea allowClear />
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.select} name='select'>
	                        <Select>
	                            <Option value="all">{textMultiLangMap[direction]?.selectall}</Option>
	                            <Option value="confirming">{textMultiLangMap[direction]?.selectconfirming}</Option>
	                            <Option value="executing">{textMultiLangMap[direction]?.selectexecuting}</Option>
	                            <Option value="completed" disabled>{textMultiLangMap[direction]?.selectcompleted}</Option>
	                            <Option value="termination">{textMultiLangMap[direction]?.selecttermination}</Option>
	                        </Select>
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.radio} name='radio'>
	                        <Radio.Group>
	                            <Radio value="1">{textMultiLangMap[direction]?.china}</Radio>
	                            <Radio value="2">{textMultiLangMap[direction]?.usa}</Radio>
	                        </Radio.Group>
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.radioButton} name='radioButton'>
	                        <Radio.Group>
	                            <Radio.Button value="1">{textMultiLangMap[direction]?.china}</Radio.Button>
	                            <Radio.Button value="2">{textMultiLangMap[direction]?.usa}</Radio.Button>
	                        </Radio.Group>
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.checkbox} name='checkbox'>
	                        <Checkbox.Group>
	                            <Checkbox value='A' style={{ lineHeight: '32px' }}>
                                    A
	                            </Checkbox>
	                            <Checkbox value='B' style={{ lineHeight: '32px' }} disabled>
                                    B
	                            </Checkbox>
	                            <Checkbox value='C' style={{ lineHeight: '32px' }}>
                                    C
	                            </Checkbox>
	                            <Checkbox value='D' style={{ lineHeight: '32px' }}>
                                    D
	                            </Checkbox>
	                            <Checkbox value='E' style={{ lineHeight: '32px' }}>
                                    E
	                            </Checkbox>
	                            <Checkbox value='F' style={{ lineHeight: '32px' }}>
                                    F
	                            </Checkbox>
	                        </Checkbox.Group>
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.cascader} name='cascader'>
	                        <Cascader defaultValue={ ['jczj', 'dh', 'cd']} options={this.options} placeholder="请选择" allowClear bordered/>
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.rate} name='rate'>
	                        <Rate allowHalf/>
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.switch} name='switch'>
	                        <Switch />
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.treeSelect} name='treeSelect'>
	                        <TreeSelect showSearch treeDefaultExpandAll>
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
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.slide} name='slide'>
	                        <Slider min={-10} marks={marks} />
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.slideReverse} name='slideReverse'>
	                        <Slider reverse min={-10} marks={marks} />
	                    </Item>
	                    <Item label={textMultiLangMap[direction]?.slideRange} name='slideRange'>
	                        <Slider.Range min={-10} marks={marks} />
	                    </Item>
	                    <Item label=" " >
	                        <Space>
	                            <Button onClick={this.validateForm}>{textMultiLangMap[direction]?.cancel}</Button>
	                            <Button colors="primary" onClick={this.validateForm}>{textMultiLangMap[direction]?.save}</Button>
	                        </Space>
	                    </Item>
	                </Form>


	                <p>Pagination</p>
	               <Pagination style={{ marginTop: '10px' }} showSizeChanger pageSizeOptions={["10", "20", "30", "50", "80"]} total={300} defaultPageSize={20} defaultActivePage={1} />
	               <Pagination style={{ marginTop: '10px' }} simple total={300} current={this.state.activePage} onChange={this.handleSelect} defaultPageSize={20} defaultActivePage={1} />


	                <p>Space</p>
	                <Space>
	                    <Button type="primary">Primary</Button>
	                    <Button>Default</Button>
	                    <Button type="dashed">Dashed</Button>
	                    <Button type="link">Link</Button>
	                </Space>

	                <p>Space Compact</p>
	                <Space.Compact>
	                    <Button type='primary'>{textMultiLangMap.ltr?.add}</Button>
	                    <Button>{textMultiLangMap.ltr?.else}</Button>
	                    <Dropdown.Button overlay={menu1} transitionName="slide-up" triggerType="icon" >
	                        {textMultiLangMap.ltr?.print}
	                    </Dropdown.Button>
	                    <Dropdown.Button overlay={menu1} transitionName="slide-up" triggerType="icon">
	                        {textMultiLangMap.ltr?.import}
	                    </Dropdown.Button>
	                    <Dropdown.Button overlay={menu1} transitionName="slide-up" >
	                        {textMultiLangMap.ltr?.export}
	                    </Dropdown.Button>
	                </Space.Compact>

	                <p>ButtonGroup</p>
	                <ButtonGroup >
	                    <Button colors="primary" icon={<Icon type="uf-plus"/>}>{textMultiLangMap[direction]?.add}</Button>
	                    <Button>{textMultiLangMap[direction]?.edit}</Button>
	                    <Button>{textMultiLangMap[direction]?.del}</Button>
	                </ButtonGroup>

	                <p>ButtonGroup vertical</p>
	                <ButtonGroup vertical>
	                    <Button colors="primary"><Icon type='uf-navmenu'/></Button>
	                    <Button colors="info"><Icon type='uf-file'/></Button>
	                    <Button colors="warning"><Icon type='uf-del'/></Button>
	                </ButtonGroup>

	                <p>AutoComplete</p>
	                <AutoComplete style={{ width: "200px" }} bordered='bottom' options={["10000", "10001", "10002", "11000", "12010"]} placeholder={""} notFoundContent={<span>暂无数据</span>}/>
	                <EditModal direction={direction} visible={this.state.showModal} onCancel={()=>{
	                    this.setState({showModal: false})
	                }}></EditModal>

	                <p>Message</p>
	                <ButtonGroup >
	                    <Button colors="primary" onClick={this.showMessage.bind(this, "success")}>success</Button>
	                    <Button colors="info" onClick={this.showMessage.bind(this, "info")}>info</Button>
	                    <Button onClick={this.showMessage.bind(this, "danger")}>danger</Button>
	                    <Button onClick={this.showMessage.bind(this, "warning")}>warnning</Button>
	                </ButtonGroup>

	                <div className='demoPadding demoPadding6'>
	                    <Popconfirm trigger='click' placement='right' content={textMultiLangMap[direction].confirmTxt }showCancel={false}
	                        icon={<Icon type='uf-star'/>}>
	                        <Button colors='primary'>Popconfirm</Button>
	                    </Popconfirm>
	                </div>

	                <p>Transfer</p>
	                <DemoTransfer/>

	                <p>Badge</p>
	                <Badge offset={[5, 0]} count={18} overflowCount={9} style={{ marginRight: 20 }} title="这是一段文字">
	                    <a href="javascript:void(0)" style={{
	                        width: "42px",
	                        height: 42,
	                        "borderRadius": 2,
	                        background: "#eee",
	                        display: "inline-block",
	                        "verticalAlign": "middle"}}
	                    />
	                </Badge>
	                <Badge count={0} showZero style={{ marginRight: 20 }}>
	                    <a href="javascript:void(0)" style={{
	                        width: "42px",
	                        height: 42,
	                        "borderRadius": 2,
	                        background: "#eee",
	                        display: "inline-block",
	                        "verticalAlign": "middle"}}/>
	                </Badge>
	                <Badge count={0} style={{ marginRight: 20 }}>
	                    <a href="javascript:void(0)" style={{
	                        width: "42px",
	                        height: 42,
	                        "borderRadius": 2,
	                        background: "#eee",
	                        display: "inline-block",
	                        "verticalAlign": "middle"}}/>
	                </Badge>
	                <Badge count={8} style={{ marginRight: 20 }} dataBadgePlacement="bottom">
	                    <a href="javascript:void(0)" style={{
	                        width: "42px",
	                        height: 42,
	                        "borderRadius": 2,
	                        background: "#eee",
	                        display: "inline-block",
	                        "verticalAlign": "middle"}}/>
	                </Badge>

	                <p>Icons</p>
	                <DemoIconBip></DemoIconBip>
	                <DemoIconDev></DemoIconDev>

	                <p>Drawer</p>
	                <DemoDrawer/>

	                <p>Tree Table</p>
	                <LayoutWrapper editModal={this.editModal} confirm={this.confirm} direction={direction}/>

	                <p>Collapse</p>

	                <DemoCollapseCard/>

	                <p>BackTop</p>
	                <BackTop />
	                <p>Spin</p>

	                <div className="demo4" id="demo4" style={{width: 200, height: 100, background: '#ddd'}}>
	                    <Spin getPopupContainer={() => {
	                        return document.querySelector('#demo4');
	                    }} spinning={true}/>
	                </div>
	            </ConfigProvider>
	        </div>
	    )
	}
}


function EditModal(props) {
    const {visible, onCancel, onOk, direction} = props;

    return <Modal resizable draggable closable title="edit" visible={visible} onOk={onOk} onCancel={onCancel}>
        <Modal.Header maximize closeButton>
            <Modal.Title>
				edit
            </Modal.Title>
        </Modal.Header>
        <Form
             	{...layoutHorizontal}
				 initialValues={{
                date: '2022-02-02',
                range: ['2023-03-03', '2024-04-04'],
                time: '11:12:34',
                input: '我是input',
                search: '我是search',
                password: '我是password',
                num: 12345,
                textarea: '我是textarea',
                select: 'confirming',
                radio: '1',
                checkbox: ['A', 'B'],
            }}>
            <Item required trigger="onBlur" label={textMultiLangMap[direction]?.date} name='date'>
                <DatePicker direction={direction} showTime format={direction == "rtl" ? "DD-MM-YYYY" : "YYYY-MM-DD"}/>
            </Item>
            <Item label={textMultiLangMap[direction]?.range} name='range'>
                <DatePicker picker='range' format={direction == "rtl" ? "DD-MM-YYYY" : "YYYY-MM-DD"}/>
            </Item>
            <Item label={textMultiLangMap[direction]?.time} name='time'>
                <TimePicker />
            </Item>
            <Item required trigger="onBlur" label={textMultiLangMap[direction]?.input} name='input'>
                <Input allowClear />
            </Item>
            <Item label={textMultiLangMap[direction]?.input} name='inputPrefix'>
                <Input prefix={"$"} allowClear />
            </Item>
        </Form>
    </Modal>

}


export default Demo1;
/**
 *
 * @title 暗黑主题
 * @description 通过全局配置提供了除默认样式外的四种内置主题，开箱即用
 *
 */

import React, {Component} from 'react';
import {ConfigProvider, Radio, Switch, Row, Col, Button, Steps, Checkbox, Input, Pagination, DatePicker, InputNumber, AutoComplete, Cascader, InputGroup, Rate, Select,
    Slider, TimePicker, TreeSelect, List, Progress, Table, Space, Tag, Timeline, Tree, Breadcrumb, Dropdown, Menu, Tabs, Drawer, Empty, Message, Modal, Popconfirm, Popover,
    Avatar, Icon, Badge, Calendar, Card, Collapse, Skeleton, Spin, Divider, Transfer
} from "@tinper/next-ui";

const {Step} = Steps;
const {Option} = Select;
const {Panel} = Collapse;
const {TreeNode} = Tree;
const { Item } = Menu;
const {TabPane} = Tabs;

const cascaderOptions = [{
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
const treeData = [{
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [{
        title: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
    }, {
        title: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
    }],
}, {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
}];
const columns = [
    { title: "员工编号", dataIndex: "a", key: "a", width: 150 },
    { title: "员工姓名", dataIndex: "b", key: "b", width: 100 },
    { title: "性别", dataIndex: "c", key: "c", width: 100 },
    { title: "部门", dataIndex: "d", key: "d", width: 100 },
    { title: "职级", dataIndex: "e", key: "e", width: 100 }
];
const tableData = [
    { a: "ASVAL_20190328", b: "小张", c: "男", d: "财务二科", e: "M1", key: "1" },
    { a: "ASVAL_20190320", b: "小明", c: "男", d: "财务一科", e: "T1", key: "2" },
    { a: "ASVAL_20190312", b: "小红", c: "女", d: "财务一科", e: "T2", key: "3" }
];
const menu1 = (<Menu>
    <Item key="1">借款合同</Item>
    <Item key="2">抵/质押合同</Item>
    <Item key="3">担保合同</Item>
    <Item key="4">联保合同</Item>
    <Item key="5">合同审批</Item>
    <Item key="6">抵/质押合同跟踪</Item>
</Menu>);
const allTargetKeys = [];
const mockData: any = [];
for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1,
    });
    allTargetKeys.push(i.toString());
}
 interface ProviderState {
     theme: string;
     current: number;
     dark: boolean;
     showDrawer: boolean;
     showModal: boolean;
 }

class Demo4 extends Component<{}, ProviderState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            theme: 'default',
            current: 2,
            dark: true,
            showDrawer: false,
            showModal: false
        }
    }

     handleThemeChange = (theme: string) => {
         this.setState({
             theme
         })
     };

     change = (dark: boolean) => {
         this.setState({
             dark
         })
     }

     stepsChange = (current: number) => {
         this.setState({
             current
         })
     }

     fPopDrawer = () => {
         this.setState({
             showDrawer: true
         })
     }
     modalShow = () => {
         this.setState({
             showModal: true
         })
     }
     modalClose = () => {
         this.setState({
             showModal: false
         })
     }
     message = () => {
         Message.destroy();
         Message.create({ content: '单据提交成功。', color: "light" });
     }

     render() {
         const {theme, dark, showDrawer, showModal} = this.state;
         let componentTheme: string | string[] = theme;
         if (dark) {
             componentTheme = ['dark', theme]
         }
         return (
             <div className='provider-demo10'>
                 <div style={{marginBottom: 20}}>
                     <div style={{display: 'flex', alignItems: 'center', marginBottom: 10}}>
                        暗色：<Switch defaultValue={dark} onChange={this.change} />
                     </div>
                     <Radio.Group
                         style={{marginRight: 20}}
                         selectedValue={theme}
                         onChange={this.handleThemeChange}>
                         <Radio.Button value={'default'}>默认</Radio.Button>
                         <Radio.Button value={'red'}>红色</Radio.Button>
                         <Radio.Button value={'blue'}>蓝色</Radio.Button>
                         <Radio.Button value={'green'}>绿色</Radio.Button>
                         <Radio.Button value={'yellow'}>黄色</Radio.Button>
                     </Radio.Group>
                 </div>
                 <div className="demo1" id="built-in-config-demo10" tinper-next-role={'container'} style={{position: 'relative', padding: 20}}>
                     <ConfigProvider theme={componentTheme} getThemeContainer={() => document.querySelector('#built-in-config-demo10')}>
                         <Row>
                             <Button type={'primary'}>按钮</Button>
                             <Button style={{marginLeft: 10}} bordered>默认按钮</Button>
                             <Switch style={{marginLeft: 10}} defaultChecked />
                             <Checkbox style={{marginLeft: 10}} defaultChecked>primary</Checkbox>
                             <Checkbox defaultChecked inverse>primary</Checkbox>
                             <Radio style={{marginLeft: 10}} checked>primary</Radio>
                             <Radio style={{marginLeft: 10}} checked inverse>primary</Radio>
                         </Row>
                         <Row>
                             <Space>
                                 <Button onClick={this.fPopDrawer} colors="primary">打开Drawer</Button>
                                 <Button onClick={this.message} colors="primary">打开Message</Button>
                                 <Button onClick={this.modalShow} colors="primary">打开Modal</Button>
                                 <Popconfirm trigger='click' placement='right' title={<div>标题</div>} description={'您喜欢使用tinper-next组件库吗？'}>
                                     <Button colors='primary' style={{ margin: 'auto 10px' }}>
                                        Popconfirm
                                     </Button>
                                 </Popconfirm>
                                 <Popover placement="right" content={'您喜欢使用tinper-next组件库吗？'}>
                                     <Button colors="primary">Popover</Button>
                                 </Popover>
                             </Space>
                         </Row>
                         <Row>
                             <Input style={{width: 300}} placeholder={' Please enter content...'} />
                         </Row>

                         <Row>
                             <InputGroup style={{ marginBottom: '5px', width: '50%' }}>
                                 <InputGroup.Addon>http://</InputGroup.Addon>
                                 <Input type='text'/>
                                 <InputGroup.Addon>.com</InputGroup.Addon>
                             </InputGroup>
                         </Row>

                         <Row>
                             <Pagination
                                 prev
                                 next
                                 maxButtons={5}
                                 boundaryLinks
                                 defaultActivePage={2}
                                 defaultPageSize={15}
                                 showJump={true}
                                 total={50}
                             />
                         </Row>

                         <Row>
                             <DatePicker defaultValue='2036-04-23' format='YYYY-MM-DD' placeholder='选择日期' showToday />
                         </Row>
                         <Row>
                             <TimePicker placeholder='选择时间' use12Hours format='h:mm'/>
                         </Row>
                         <Row>
                             <Col>
                                 <InputNumber />
                             </Col>
                             <Col push={1}>
                                 <InputNumber iconStyle="one" />
                             </Col>
                         </Row>

                         <Row>
                             <AutoComplete style={{ width: "300px" }} options={['10000', '10001', '10002']} notFoundContent={<span>暂无数据</span>}/>
                         </Row>

                         <Row>
                             <Select defaultValue="all" style={{ width: 200, marginRight: 6 }} size='default'>
                                 <Option value="all">全部</Option>
                                 <Option value="confirming">待确认</Option>
                                 <Option value="executing">执行中</Option>
                                 <Option value="completed" disabled>
                                    已办结
                                 </Option>
                                 <Option value="termination">终止</Option>
                             </Select>
                         </Row>

                         <Row>
                             <TreeSelect style={{ width: 300 }} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} treeData={treeData} placeholder="Please select" treeDefaultExpandAll/>
                         </Row>

                         <Row>
                             <Cascader options={cascaderOptions} placeholder="请选择"/>
                         </Row>

                         {
                             (['dot', 'arrow', 'default', 'number']).map(item => {
                                 return (<Row key={item}><Steps onChange={this.stepsChange} current={this.state.current} type={item as any}>
                                     <Step title="已完成已完成已完" description="这是一段描述啊啊"/>
                                     <Step title="进行中已完成已完成" description="这是一段描述啊啊啊啊"/>
                                     <Step title="未开始已完成已完成已完成" description="这是一段描述啊"/>
                                     <Step title="未开始" description="这是一段描述"/>
                                 </Steps></Row>)
                             })
                         }

                         {
                             (['card', 'line', 'trangle']).map(item => {
                                 return (<Row key={item}><Tabs tabBarStyle={item} defaultActiveKey="1">
                                     <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
                                     <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
                                     <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
                                 </Tabs></Row>)
                             })
                         }

                         <Row>
                             <Rate value={3}/>
                         </Row>

                         <Row>
                             <Slider style={{width: 500}} defaultValue={20}/>
                         </Row>

                         <Row>
                             <Avatar icon={<Icon type="uf-caven"/>}/>
                         </Row>

                         <Row>
                             <Badge count={8}>
                                 <a href="javascript:void(0)" style={{display: 'inline-block', width: 50, height: 50, backgroundColor: '#999'}}/>
                             </Badge>
                         </Row>

                         <Row>
                             <Calendar fullscreen />
                         </Row>
                         <Row>
                             <Calendar fullscreen={false} />
                         </Row>

                         <Row>
                             <Card fieldid="card" title="Default size card" extra={<a>More</a>} style={{ width: 300 }}>
                                 <p>Card content</p>
                                 <p>Card content</p>
                                 <p>Card content</p>
                             </Card>
                         </Row>
                         <Row>
                             <Collapse accordion bordered={true} style={{width: 500, height: 135}}>
                                 <Panel header="Panel 1" key="1" showArrow={true}>Panel 1 content</Panel>
                                 <Panel header="Panel 2" key="2" showArrow={true}>Panel 2 content</Panel>
                             </Collapse>
                         </Row>
                         <Row>
                             <List fieldid="list" header={<div>Header</div>} footer={<div>Footer</div>} bordered dataSource={['please change your env', 'luma onchange feima']} renderItem={item => (<List.Item>
                                 {item}
                             </List.Item>)}/>
                         </Row>
                         <Row>
                             <Progress percent={50} status="active"/>
                         </Row>
                         <Row>
                             <Table columns={columns} data={tableData} showRowNum={true}/>
                         </Row>
                         <Row>
                             <Space>
                                 <Tag>默认</Tag>
                                 <Tag color="light" bordered>边框标签</Tag>
                                 <Tag icon={<Icon type="uf-piechart"/>} bordered>自定义icon</Tag>
                             </Space>
                         </Row>
                         <Row>
                             <Timeline>
                                 <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                                 <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                                 <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                                 <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                             </Timeline>
                         </Row>
                         <Row>
                             <Tree checkable defaultExpandedKeys={['0-0-0', '0-0-1']} defaultSelectedKeys={['0-0-0', '0-0-1']} defaultCheckedKeys={['0-0-0', '0-0-1']} checkStrictly showIcon cancelUnSelect={true}>
                                 <TreeNode title="parent 1" key="0-0" icon={<Icon type="uf-treefolder"/>}>
                                     <TreeNode title="parent 1-0" key="0-0-0" disabled icon={<Icon type="uf-treefolder"/>}>
                                         <TreeNode title="leaf1" key="0-0-0-0" disableCheckbox icon={<Icon type="uf-list-s-o"/>}/>
                                         <TreeNode title="leaf2" key="0-0-0-1"/>
                                         <TreeNode title="leaf3" visibleCheckbox={false} key="0-0-0-2"/>
                                     </TreeNode>
                                     <TreeNode title="parent 1-1" key="0-0-1" icon={null}>
                                         <TreeNode title={<span>sss</span>} key="0-0-1-0" icon={<Icon type="uf-list-s-o"/>}/>
                                     </TreeNode>
                                 </TreeNode>
                             </Tree>
                         </Row>
                         <Row>
                             <Breadcrumb>
                                 <Breadcrumb.Item target="_blank" href="https://yondesign.yonyou.com/homepage/#/">
                                Home
                                 </Breadcrumb.Item>
                                 <Breadcrumb.Item>
                                Library
                                 </Breadcrumb.Item>
                                 <Breadcrumb.Item href="https://yondesign.yonyou.com/homepage/#/" active>
                                Data
                                 </Breadcrumb.Item>
                             </Breadcrumb>
                         </Row>
                         <Row>
                             <Dropdown trigger={[]} showAction={["mouseEnter"]} hideAction={["click"]} overlay={menu1}>
                                 <Button colors='primary'>自定义下拉</Button>
                             </Dropdown>
                         </Row>
                         <Row>
                             <Menu mode="horizontal" arrowdown={true} theme={dark ? 'dark' : 'light'}>
                                 <Menu.Item key="mail">
                                组织 1
                                 </Menu.Item>
                                 <Menu.Item key="app" disabled>
                                组织 2
                                 </Menu.Item>
                                 <Menu.SubMenu key="sub1" title={<span className="sub-title">组织 1 - 子</span>}>
                                     <Menu.ItemGroup title="组 1">
                                         <Menu.Item key="setting:1">选项 1</Menu.Item>
                                         <Menu.Item key="setting:2">选项 2</Menu.Item>
                                     </Menu.ItemGroup>
                                     <Menu.ItemGroup title="组 2">
                                         <Menu.Item key="setting:3">选项 3</Menu.Item>
                                         <Menu.SubMenu key="sub2" title="Submenu">
                                             <Menu.Item key="4">选项 4</Menu.Item>
                                             <Menu.Item key="5">选项 5</Menu.Item>
                                         </Menu.SubMenu>
                                     </Menu.ItemGroup>
                                 </Menu.SubMenu>
                             </Menu>
                         </Row>
                         <Row>
                             <Empty fieldid='demo_1'/>
                             <Empty image="not-found" fieldid='demo_1'/>
                             <Empty image="no-visualize-data" fieldid='demo_1'/>
                             <Empty image="no-collect" fieldid='demo_1'/>
                             <Empty image="no-data" fieldid='demo_1'/>
                             <Empty image="no-search" fieldid='demo_1'/>
                             <Empty image="no-network" fieldid='demo_1'/>
                         </Row>
                         <Row>
                             <Skeleton fieldid="test"/>
                         </Row>
                         <Row>
                             <div id="spin-wrapper" style={{position: 'relative', width: 500, height: 100, zIndex: 1200}}>
                                 <Spin getPopupContainer={() => document.querySelector('#spin-wrapper')} spinning={true}/>
                             </div>
                         </Row>
                         <Row>
                             <div style={{color: '#fff'}}>
                                 <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                                probare, quae sunt a te dicta? Refert tamen, quo modo.
                                 </p>
                                 <Divider />
                                 <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                                probare, quae sunt a te dicta? Refert tamen, quo modo.
                                 </p>
                             </div>
                         </Row>

                         <Row>
                             <Transfer showSearch dataSource={mockData} targetKeys={['2', '3', '4']} selectedKeys={['1', '5']}/>
                         </Row>


                         <Drawer showClose title={'Drawer'} show={showDrawer} placement="right" getPopupContainer={() => document.querySelector('#built-in-config') as any} onClose={() => {
                             this.setState({showDrawer: false})
                         }}>
                             <div className="con">
                                 <p>这是第一行文字</p>
                                 <p>这是第二行文字</p>
                                 <p>这是第三行文字，啦啦啦~</p>
                             </div>
                         </Drawer>
                         <Modal show={showModal} destroyOnClose={true} maskClosable={false} onCancel={this.modalClose}>
                             <Modal.Header closeButton closeButtonProps={{ fieldid: 'closeBtn' }}>
                                 <Modal.Title>标题</Modal.Title>
                             </Modal.Header>
                             <Modal.Body>
                                 <p>Some contents...</p>
                                 <p>Some contents...</p>
                                 <p>Some contents...</p>
                             </Modal.Body>
                             <Modal.Footer>
                                 <Button onClick={this.modalClose} colors="secondary" style={{ marginRight: 8 }}>取消</Button>
                                 <Button onClick={this.modalClose} colors='primary'>确定</Button>
                             </Modal.Footer>
                         </Modal>
                     </ConfigProvider>
                 </div>
             </div>
         )
     }
}

export default Demo4;

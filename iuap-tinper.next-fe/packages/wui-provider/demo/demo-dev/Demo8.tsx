/**
 *
 * @title 使用自定义主题
 * @description registerTheme方法注册主题之后，通过theme属性使主题生效
 *
 */

import React, {Component} from 'react';
import moment from "moment";
import {ConfigProvider, Radio, Switch, DatePicker, Row, Button, Steps, Spin, Checkbox, Tabs, Select, Dropdown, Menu, Icon, Progress} from "@tinper/next-ui";

const {RangePicker} = DatePicker;
const {Step} = Steps;
const {Option} = Select
const {TabPane} = Tabs;
const ProgressBar = Progress.Bar;

const {Item, SubMenu} = Menu;
const SearchTabs = Tabs.SearchTabs;

const brown = '{"global":[{"property":"--wui-primary-color","value":"rgb(109,76,65)"},{"property":"--wui-primary-color-hover","value":"rgb(93, 64, 55)"},{"property":"--wui-primary-color-active","value":"rgb(78, 52, 46)"},{"property":"--wui-primary-color-light","value":"rgba(109,76,65, .1)"}]}'
const green = ":root{--wui-primary-color: rgb(91,140,0);--wui-primary-color-hover: rgb(63,102,0);--wui-primary-color-active: rgb(37,64,0);--wui-primary-color-light: rgba(91,140,0, .1);}"
// const blue = ":root{--wui-primary-color: rgb(22,93,255);--wui-primary-color-hover: rgb(0,80,179);--wui-primary-color-active: rgba(0,58,140);--wui-primary-color-light: rgba(22,93,255, .1);}"
// const red = ":root{}"

 interface TabList {
     name: string;
     value: string;
 }
 interface ProviderState {
     theme: string;
     current: number;
     tabType: string;
     allType: string[];
     tabList: TabList[];
     part: any;
 }

class Demo7 extends Component<{}, ProviderState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            theme: 'default',
            current: 2,
            tabType: 'line',
            allType: ['line', 'trangle'],
            tabList: [
                {
                    name: "已删除(0)", value: '1'
                },
                {
                    name: "全部(70)", value: '2'
                },
                {
                    name: "待提交(3)", value: '3'
                },
                {
                    name: "审批中(67)", value: '4'
                },
            ],
            part: this.getPart,
        }
        ConfigProvider.registerTheme('green', green)
        ConfigProvider.registerTheme('blue')
        // ConfigProvider.registerTheme('red', red)
        ConfigProvider.registerTheme('brown', brown)
    }

     handleThemeChange = (value: string) => {
         this.setState({
             theme: value
         })
     };

     stepsChange = (value: number) => {
         this.setState({
             current: value
         })
     }

     changeTabPosition = (tabType: string) => {
         this.setState({tabType});
     }

     part = (b: boolean) => {
         const value = b ? null : this.getPart;
         this.setState({
             part: value
         })
     }

     getPart = () => {
         return document.querySelector('#part-demo')
     }

     render() {
         const {theme, part} = this.state;
         const menu3 = (
             <Menu multiple>
                 <SubMenu key="sub1" title="合同类别">
                     <Item key="1">借款合同</Item>
                     <Item key="2">抵/质押合同</Item>
                     <Item key="3">担保合同</Item>
                     <Item key="4">联保合同</Item>
                 </SubMenu>
                 <SubMenu key="sub2" title="合同操作">
                     <Item key="5">抵/质押合同跟踪</Item>
                     <Item key="51">抵/质押合同跟踪</Item>
                     <Item key="52">抵/质押合同跟踪</Item>
                     <Item key="53">抵/质押合同跟踪</Item>
                     <SubMenu key="sub3" title="合同审批">
                         <Item key="6">待审批合同</Item>
                         <Item key="7">已审批合同</Item>
                     </SubMenu>
                 </SubMenu>
             </Menu>
         );
         const menu2 = (
             <Menu multiple>
                 <Item key="1"><Icon type="uf-todolist"/>借款合同</Item>
                 <Item key="2"><Icon type="uf-personin"/>抵/质押合同</Item>
                 <Item key="3"><Icon type="uf-ticket"/>担保合同</Item>
                 <Item key="4"><Icon type='uf-listsearch'/>联保合同</Item>
                 <Item key="5"><Icon type='uf-seal'/>合同审批</Item>
                 <Item key="6"><Icon type='uf-bullseye'/>抵/质押合同跟踪</Item>
             </Menu>
         );
         return (
             <div className="demo1" tinper-next-role={'container'} style={{position: 'relative'}} id='part-demo'>
                 <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                     <Radio.Group
                         style={{marginRight: 20}}
                         selectedValue={theme}
                         onChange={this.handleThemeChange}>
                         <Radio.Button value={'default'}>默认</Radio.Button>
                         <Radio.Button value={'red'}>红色</Radio.Button>
                         <Radio.Button value={'blue'}>蓝色</Radio.Button>
                         <Radio.Button value={'green'}>绿色</Radio.Button>
                         <Radio.Button value={'brown'}>棕色</Radio.Button>
                     </Radio.Group>
                     <div>
                        全局：<Switch onChange={this.part} />
                     </div>
                 </div>

                 <ConfigProvider theme={theme} getThemeContainer={part}>
                     <Row>
                         <Button type={'primary'}>按钮</Button>
                         <Button style={{marginLeft: 10}} type={'primary'} bordered>按钮</Button>
                         <Switch style={{marginLeft: 10}} defaultChecked />
                         <Checkbox style={{marginLeft: 10}} defaultChecked>primary</Checkbox>
                         <Checkbox defaultChecked inverse>primary</Checkbox>
                         <Radio style={{marginLeft: 10}} checked>primary</Radio>
                         <Radio style={{marginLeft: 10}} checked inverse>primary</Radio>
                     </Row>
                     <Row>

                     </Row>
                     <Row>
                         日期：<DatePicker
                             format="YYYY-MM-DD HH:mm:ss"
                             showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                         />
                     </Row>
                     <Row>
                         范围：<RangePicker
                             showToday
                             format="YYYY-MM"
                         />
                     </Row>
                     <Row>
                         <div className={'spin'} style={{width: 100, height: 70}}>
                             <Spin spinning={true} getPopupContainer={() => document.querySelector('.spin')} />
                         </div>
                     </Row>
                     <Row>
                         <Steps onChange={this.stepsChange} current={this.state.current} type='number'>
                             <Step title="已完成已完成已完" description="这是一段描述啊啊"/>
                             <Step title="进行中已完成已完成" description="这是一段描述啊啊啊啊"/>
                             <Step title="未开始已完成已完成已完成" description="这是一段描述啊"/>
                             <Step title="未开始" description="这是一段描述"/>
                         </Steps>
                     </Row>
                     <Row>
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
                     </Row>
                     <Row>
                         <Tabs style={{marginBottom: '10px'}} type={this.state.tabType} defaultActiveKey="1">
                             <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
                             <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
                             <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
                         </Tabs>
                     </Row>
                     <Row>
                         <SearchTabs value={'1'} onChange={(v) => {
                             console.log('onchange', v)
                         }}>
                             {
                                 this.state.tabList.map(item =>
                                     <SearchTabs.Item value={item.value} key={item.name}>{item.name}</SearchTabs.Item>)
                             }
                         </SearchTabs>
                     </Row>
                     <Row>
                         <Dropdown.Button
                             overlay={menu2}
                             // onVisibleChange={onVisibleChange}
                             type="primary"
                             style={{marginRight: "10px"}}
                         >
                             单级多选
                         </Dropdown.Button>
                         <Dropdown.Button
                             overlay={menu3}
                             // onVisibleChange={onVisibleChange}
                             type="primary"
                         >
                             多级多选
                         </Dropdown.Button>
                     </Row>
                     <div>
                         <ProgressBar now={10} colors='primary' />
                     </div>
                 </ConfigProvider>
             </div>
         )
     }
}

export default Demo7;

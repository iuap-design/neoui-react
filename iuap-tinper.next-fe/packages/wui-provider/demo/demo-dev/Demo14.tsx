/**
 *
 * @title 全局配置direction支持rtl方向改变，用于阿拉伯语等多语展示
 * @description 默认是ltr，可以设置rtl
 *
 */

import {
    ConfigProvider,
    Radio,
    Message,
    Menu,
    Carousel,
    Progress,
    Breadcrumb,
    Steps,
    Modal,
    Button,

} from "@tinper/next-ui";
import MenuDemo1 from '../../../wui-menu/demo/demo-other/Demo1';
import MenuDemo2 from '../../../wui-menu/demo/demo-other/Demo2';
import TreeDemo1 from '../../../wui-tree/demo/demo-bip/Demo1';
import TabsDemo2 from '../../../wui-tabs/demo/demo-other/Demo0';
import AffixDemo1 from "../../../wui-affix/demo/demo-other/Demo1";
import TimelineDemo2 from '../../../wui-timeline/demo/demo-other/Demo2';
import TimelineDemo3 from '../../../wui-timeline/demo/demo-bip/Demo8';
import NotificationDemo from "../../../wui-notification/demo/demo-other/Demo2";
import TypographyDemo from './TypographyDemo';
import SkeletonDemo from "../../../wui-skeleton/demo/demo-other/Demo3";
import ImgeViewrDemo from '../../../wui-image/demo/demo-bip/Demo2';
import TooltipDemo from "../../../wui-tooltip/demo/demo-bip/Demo6";
import ListDemo from "../../../wui-list/demo/demo-other/Demo1";
import ListDemo1 from "../../../wui-list/demo/demo-other/Demo3";
import TagDemo1 from '../../../wui-tag/demo/demo-bip/Demo2';
import TagDemo2 from '../../../wui-tag/demo/demo-bip/Demo4';
import DatePickerDemo1 from '../../../wui-datepicker/demo/demo-other/Demo8';
import DatePickerDemo2 from '../../../wui-datepicker/demo/demo-other/Demo10';
import DatePickerDemo3 from '../../../wui-datepicker/demo/demo-other/Demo11';
import PopoverDemo1 from '../../../wui-popover/demo/demo-bip/Demo1';
import PopconfirmDemo1 from '../../../wui-popconfirm/demo/demo-bip/Demo1';
import AvatarDemo1 from '../../../wui-avatar/demo/demo-other/Demo4'
import UploadDemo1 from '../../../wui-upload/demo/demo-other/Demo1';
import UploadDemo2 from '../../../wui-upload/demo/demo-other/Demo2';
import ErrorMessageDemo1 from "../../../wui-error-message/demo/demo-bip/Demo1";
import ColorPickerDemo1 from "../../../wui-colorpicker/demo/demo-other/Demo1";
import CalendarDemo1 from "../../../wui-calendar/demo/demo-other/Demo1";
import CalendarDemo2 from "../../../wui-calendar/demo/demo-other/Demo2";
import CalendarDemo3 from "../../../wui-calendar/demo/demo-other/Demo5";


import AnchorDemo from './AnchorDemo';

import React, { Component, useState} from 'react';

import './Demo14.less';


import textMultiLangMap from './langMap';
const { Step } = Steps;

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


	showMessage=(type)=>{
	    Message.destroy();
	    Message.create({ content: textMultiLangMap[this.state.direction]?.message, color: type });

	}

	render() {
	    const { direction } = this.state;
	    const menu = (<Menu >
	        <Menu.Item key="1">借款合同</Menu.Item>
	        <Menu.Item key="2">抵/质押合同</Menu.Item>
	        <Menu.Item key="3">担保合同</Menu.Item>
	        <Menu.Item key="4">联保合同</Menu.Item>
	        <Menu.Item key="5">合同审批</Menu.Item>
	        <Menu.Item key="6">抵/质押合同跟踪0000</Menu.Item>
	    </Menu>);
	    const description = "这是一段描述";
	    const items = [
	        {
	            title: '已完成',
	            description
	        },
	        {
	            title: '已完成',
	            subTitle: 'Time 00:00:08',
	            description
	        },
	        {
	            title: '进行中',
	            description
	        },
	        {
	            title: '未开始'
	        }
	    ];
	    return (
	        <div className={"provider-demo-13"} tinper-next-role={'container'} style={{ position: 'relative', padding: 16 }} dir={direction}>
	            <Radio.Group
	                selectedValue={direction}
	                onChange={this.handleDirectionChange}>
	                <Radio.Button value="ltr">LTR</Radio.Button>
	                <Radio.Button value="rtl">RTL</Radio.Button>
	            </Radio.Group>

	            <ConfigProvider locale={"ar_SA"} dir={direction}>
	                <p>Carousel</p>
	                <Carousel className={'caroulal-demo'} arrows fieldid="carousel" easing="linear" speed={1000}>
	                    <div>
	                        <h3>1</h3>
	                    </div>
	                    <div>
	                        <h3>2</h3>
	                    </div>
	                    <div>
	                        <h3>3</h3>
	                    </div>
	                    <div>
	                        <h3>4</h3>
	                    </div>
	                </Carousel>
	                <Carousel autoplay>
	                    <div>
	                        <h3>1</h3>
	                    </div>
	                    <div>
	                        <h3>2</h3>
	                    </div>
	                    <div>
	                        <h3>3</h3>
	                    </div>
	                    <div>
	                        <h3>4</h3>
	                    </div>
	                </Carousel>

	                <Carousel draggable>
	                    <div>
	                        <h3>1</h3>
	                    </div>
	                    <div>
	                        <h3>2</h3>
	                    </div>
	                    <div>
	                        <h3>3</h3>
	                    </div>
	                    <div>
	                        <h3>4</h3>
	                    </div>
	                </Carousel>

	                <p>progress</p>
	                <Progress fieldid="demo" percent={30} showInfo={false}/>
	                <Progress percent={50} status="active"/>
	                {/* <Progress percent={50} status="active" strokeWidth={40}	 /> */}
	                <Progress percent={30} steps={5}/>
	                <Progress percent={80} steps={5} strokeColor={['grey', 'yellow', 'red']}/>
	                <Progress percent={70} status="exception"/>
	                <Progress percent={100}/>
	                <Progress percent={100} strokeWidth={20}/>

	                <p>breadcrumb</p>
	                <Breadcrumb style={{ height: 100 }}>
	                    <Breadcrumb.Item target="_blank" href="https://yondesign.yonyou.com/homepage/#/">
							Home
	                    </Breadcrumb.Item>
	                    <Breadcrumb.Item overlay={menu}>
							Library
	                    </Breadcrumb.Item>
	                    <Breadcrumb.Item active>
							Data
	                    </Breadcrumb.Item>
	                </Breadcrumb>
	                <p>menu</p>
	                <MenuDemo1></MenuDemo1>
	                <MenuDemo2></MenuDemo2>

	                <p>Steps</p>
	                <Steps percent={75} current={2} items={items}/><br /><br />
	                <Steps percent={75} current={2} items={items} size="small"/>
	                <Steps current={10} more type="arrow">
	                <Step title={<div>1已完成</div>} description="这是一段描述"/>
	                <Step title="2已完成" description="这是一段描述"/>
	                <Step title="3已完成" description="这是一段描述"/>
	                <Step title="4已完成"/>
	                <Step title="5已完成" disabled description="这是一段描述"/>
	                <Step title="6已完成" description="这是一段描述"/>
	                <Step title="7已完成" description="这是一段描述"/>
	                <Step title="8已完成" description="这是一段描述"/>
	                <Step title="9已完成" description="这是一段描述"/>
	                <Step title="10已完成" description="这是一段描述"/>
	                <Step title="11进行中" description="这是一段描述"/>
	                <Step title="12未开始"/>
	                <Step title="13未开始"/>
	                <Step title="14未开始" description="这是一段描述"/>
	                <Step title="15未开始" description="这是一段描述"/>
	                <Step title="16未开始" description="这是一段描述"/>
	                <Step title="17未开始" description="这是一段描述"/>
	                <Step title="18未开始" disabled description="这是一段描述"/>
	                <Step title="19未开始" description="这是一段描述"/>
	                <Step title="20未开始" description="这是一段描述"/>
	            </Steps>

	                <p>Tree</p>
	                <TreeDemo1/>
	                <p>Tabs</p>
	                <TabsDemo2></TabsDemo2>

	                <p>Affix</p>
	                <AffixDemo1/>

	                <p>TimeLine</p>
	                <TimelineDemo2/>
	                <TimelineDemo3/>

	                <p>Anchor</p>
	                <AnchorDemo dir={direction}/>

	                <p>Notification</p>
	                <NotificationDemo/>

	                <p>Skeleton</p>
	                <SkeletonDemo/>

	                <p>Typography</p>
	                <TypographyDemo dir={direction}/>

	                <p>Image</p>
	                <ImgeViewrDemo/>

	                <p>Tooltip</p>
	                <TooltipDemo dir={direction}/>

	                <p>List</p>
	                <ListDemo/>
	                <ListDemo1/>

	                <p>Tag</p>
	                <TagDemo1/>
	                <TagDemo2/>

	                <p>DatePicker</p>
	                <DatePickerDemo1/>
	                <DatePickerDemo2/>
	                <DatePickerDemo3/>

	                <p>Popover</p>
	                <PopoverDemo1/>

	                <p>PopConfirm</p>
	                <PopconfirmDemo1/>

	                <p>Avatar</p>
	                <AvatarDemo1/>

	                <p>Upload</p>
	                <UploadDemo1/>
	                <UploadDemo2/>

	                <p>ErrorMessage</p>
	                <ErrorMessageDemo1 locale={"ar_SA"}/>

	                <p>ColorPicker</p>
	                <ColorPickerDemo1/>

	                <p>Calender</p>
	                <CalendarDemo1/>
	                <CalendarDemo2/>
	                <CalendarDemo3 locale={"ar_SA"}/>

	                <p>Modal</p>
	                <ModalDemos/>

	            </ConfigProvider>
	        </div>
	    )
	}
}

function ModalDemos() {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = ()=>{
        setShowModal(false);

    }

    return <div>
        <Button onClick={openModal}>openModal</Button>
        <Modal title="modalTitle" onCancel={closeModal} onOk={closeModal} draggable resizable visible={showModal}>
			test
        </Modal>
    </div>
}

export default Demo1;
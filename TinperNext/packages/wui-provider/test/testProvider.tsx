/**
 *
 * @title 全局配置locale
 * @description 全局配置组件locale
 *
 */

import Button from "../../wui-button/src";
import ConfigProvider from "../../wui-provider/src";
import DatePicker from "../../wui-datepicker/src";
import InputNumber from "../../wui-input-number/src";
import Modal from "../../wui-modal/src";
import Calendar from "../../wui-calendar/src";
import Pagination from "../../wui-pagination/src";
import Popconfirm from "../../wui-popconfirm/src";
import Radio from "../../wui-radio/src";
import {Row} from "../../wui-layout/src";
import TimePicker from "../../wui-timepicker/src";
import Empty from "../../wui-empty/src";
import Steps from "../../wui-steps/src";
import moment, {Moment} from "moment";
import React, {Component} from 'react';

const {MonthPicker, RangePicker, YearPicker, WeekPicker} = DatePicker;
const {Step} = Steps;

interface ProviderState {
	locale: string;
	rangeValue: any;
	showModal: boolean;
	activePage: number;
	arrowCrt: number;
}

class Demo1 extends Component<{prefixCls: string; theme: string;componentSize: string}, ProviderState> {
    constructor(props: {prefixCls: string; theme: string; componentSize: string}) {
        super(props);
        this.state = {
            locale: "en-us",
            rangeValue: [],
            showModal: false,
            activePage: 1,
            arrowCrt: 10
        }
        ConfigProvider.config({locale: 'zh-cn', prefixCls: this.props.prefixCls || undefined})
    }

	handleLocaleChange = (value: string) => {
	    ConfigProvider.config({locale: value, prefixCls: this.props.prefixCls || undefined})

	    this.setState({
	        locale: value
	    })
	};
	handleSelect = (eventKey: number) => {
	    this.setState({
	        activePage: eventKey
	    });
	}
	change = (a1: number) => {
	    console.log('argument1', a1);
	}
    onRangeChange = (d: [Moment, Moment], dateString: [string, string], dateStringArr: [string, string]) => {
        console.warn('onRangeChange--->', d, dateString, dateStringArr)
        this.setState({rangeValue: d})
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

	arrowChange = (val: number) => {
	    this.setState({
	        arrowCrt: val
	    })
	}

	render() {
	    const {locale} = this.state;
	    const content = 'Do you like tinper-bee UI Components Library？';
	    return (
	        <div className="demo1" tinper-next-role={'container'} style={{position: 'relative'}}>
	            <Radio.Group
	                selectedValue={locale}
	                onChange={this.handleLocaleChange}>
	                <Radio.Button value="zh-cn">中文</Radio.Button>
	                <Radio.Button value="en-us">英文</Radio.Button>
	                <Radio.Button value="zh-tw">繁体</Radio.Button>
	                <Radio.Button value="vi-vn">越语</Radio.Button>
	            </Radio.Group>

	            <ConfigProvider locale={locale}  componentSize={this.props.componentSize} >
	                <Row>
	                    <Pagination
	                        // locale={'en-us'}
	                        prev
	                        next
	                        maxButtons={5}
	                        boundaryLinks
	                        defaultActivePage={2}
	                        defaultPageSize={15}
	                        showJump={true}
	                        total={50}
	                        activePage={this.state.activePage}
	                        onSelect={this.handleSelect}
	                    />
	                </Row>
	                <Row>
	                    <InputNumber
	                        // locale={'en-us'}
	                        iconStyle="one"
	                        min={-1}
	                        max={1}
	                        value={0}
	                        onChange={this.change}
	                        displayCheckPrompt={true}
	                    />
	                </Row>

	                <Row>
	                    <Button
	                        bordered
	                        onClick={this.open}>
							打开模态框
	                    </Button>
	                    <Modal
	                        show={this.state.showModal}
	                        destroyOnClose={true}
	                        maskClosable={false}
	                        onOk={this.close}
	                        onCancel={this.close}>
	                        <Modal.Body>
	                            <p>Some contents...</p>
	                            <p>Some contents...</p>
	                            <p>Some contents...</p>
	                        </Modal.Body>
	                    </Modal>
	                </Row>

	                <Row>
	                    <Popconfirm trigger="click" placement="right" content={content}>
	                        <Button colors="primary">Click me</Button>
	                    </Popconfirm>
	                </Row>

	                <Row>
						日期：<DatePicker
	                        format="YYYY-MM-DD HH:mm:ss"
	                        showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
	                    />
	                </Row>
	                <Row>
						年历：<YearPicker
	                        format="YYYY"
	                        defaultValue={moment().format('YYYY')}
	                    />
	                </Row>
	                <Row>
						月历：<MonthPicker/>
	                </Row>
	                <Row>
						周历：<WeekPicker/>
	                </Row>
	                <Row>
						范围：<RangePicker
	                        showToday
	                        format="YYYY-MM"
	                        value={this.state.rangeValue}
	                        onChange={this.onRangeChange}
	                    />
	                </Row>
	                <Row>
						时间：<TimePicker
	                        showSecond={false}
	                        use12Hours
	                    />
	                </Row>
	                <Row>
	                    <Empty />
	                </Row>
	                <Row>
	                    <Steps onChange={this.arrowChange} current={this.state.arrowCrt} more type="arrow">
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
	                </Row>

	                <Calendar
	                    style={{margin: 10}}
	                    fullscreen={false}
	                    fieldid="demo"
	                ></Calendar>
	            </ConfigProvider>
	        </div>
	    )
	}
}

export default Demo1;

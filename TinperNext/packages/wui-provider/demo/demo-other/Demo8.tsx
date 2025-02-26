/**
 *
 * @title 全局配置disabled
 * @description 支持disabled属性的 组件可全局配置该属性
 *
 */

import {
    Button,
    ConfigProvider,
    DatePicker,
    InputNumber,
    Pagination,
    Popconfirm,
    Radio,
    Row,
    Select,
    TimePicker,
    SelectValue,
} from "@tinper/next-ui";
import moment, {Moment} from "moment";
import React, {Component} from 'react';
const Option = Select.Option;
const {MonthPicker, RangePicker, YearPicker, WeekPicker} = DatePicker;

interface ProviderState {
	locale: string;
	disabled: boolean;
	rangeValue: any;
	showModal: boolean;
	activePage: number;
	arrowCrt: number;
}

class Demo1 extends Component<{}, ProviderState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            locale: "en-us",
            disabled: false,
            rangeValue: [],
            showModal: false,
            activePage: 1,
            arrowCrt: 10
        }
        ConfigProvider.config({locale: 'zh-cn'})
    }

	handleDisabledChange = (value: boolean) => {
	    // ConfigProvider.config({locale: value})

	    this.setState({
	        disabled: value
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
	handleChange = (value: SelectValue) => {
	    console.log(value);
	};

	render() {
	    const {disabled} = this.state;
	    const content = 'Do you like tinper-bee UI Components Library？';
	    return (
	        <div className="demo1" tinper-next-role={'container'} style={{position: 'relative'}}>
	            <Radio.Group
	                selectedValue={disabled}
	                onChange={this.handleDisabledChange}>
	                <Radio.Button value={true}>禁用</Radio.Button>
	                <Radio.Button value={false}>非禁用</Radio.Button>
	            </Radio.Group>

	            <ConfigProvider componentDisabled={disabled} >
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
	                    <Select onChange={this.handleChange} defaultValue="svetlana" allowClear>
	                <Option value="svetlana">Svetlana</Option>
	                <Option value={[1, 2]}>Array</Option>
	            </Select>
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
	            </ConfigProvider>
	        </div>
	    )
	}
}

export default Demo1;

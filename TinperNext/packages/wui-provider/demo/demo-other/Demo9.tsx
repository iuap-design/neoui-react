/**
 *
 * @title 全局配置 Datepicker / TimePicker
 * @description 支持 修改 组件默认 配置
 *
 */

import {
    ConfigProvider,
    DatePicker,
    Radio,
    Row,
    TimePicker,
} from "@tinper/next-ui";
import moment, {Moment} from "moment";
import React, {Component} from 'react';

const {MonthPicker, RangePicker, YearPicker, WeekPicker} = DatePicker;

interface ProviderState {
	timeFormat: string;
	dateFormat: string;
	rangeValue: any;

}

class Demo9 extends Component<{}, ProviderState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            timeFormat: 'HH:mm:ss',
            dateFormat: 'YYYY-MM',
            rangeValue: [],
        }
    }

	handleDateChange = (value: string) => {

	    this.setState({
	        dateFormat: value
	    })
	};
	handleTimeChange = (value: string) => {

	    this.setState({
	        timeFormat: value
	    })
	};
    onRangeChange = (d: [Moment, Moment], dateString: [string, string], dateStringArr: [string, string]) => {
        console.warn('onRangeChange--->', d, dateString, dateStringArr)
        this.setState({rangeValue: d})
    }
    render() {
	    const {dateFormat, timeFormat} = this.state;
	    return (
	        <div className="demo1" tinper-next-role={'container'} style={{position: 'relative'}}>
	                <Row>
                    <div style={{display: "flex", alignItems: 'center'}}>
				切换format
	            <Radio.Group
	                selectedValue={dateFormat}
	                onChange={this.handleDateChange}>
	                <Radio.Button value={"YYYY"}>YYYY</Radio.Button>
	                <Radio.Button value={"YYYY-MM"}>YYYY-MM</Radio.Button>
	                <Radio.Button value={"YYYY-MM-DD"}>YYYY-MM-DD</Radio.Button>
	            </Radio.Group>
                    </div>
	                </Row>
	            <ConfigProvider timepicker={{format: timeFormat}} datepicker={{format: dateFormat}} >
	                <Row>
						日期：<DatePicker
	                        // format="YYYY-MM-DD HH:mm:ss"
	                        showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
	                    />
	                </Row>
	                <Row>
						年历：<YearPicker
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
	                        value={this.state.rangeValue}
	                        onChange={this.onRangeChange}
	                    />
	                </Row>
                </ConfigProvider>
                <Row>
                    <div style={{display: "flex", alignItems: 'center'}}>
					切换format
                        <Radio.Group
                            selectedValue={timeFormat}
                            onChange={this.handleTimeChange}>
                            <Radio.Button value={"HH:mm:ss"}>HH:mm:ss</Radio.Button>
                            <Radio.Button value={"HH:mm"}>HH:mm</Radio.Button>
                            <Radio.Button value={"mm:ss"}>mm:ss</Radio.Button>
                        </Radio.Group>
                    </div>
	                </Row>
                <ConfigProvider timepicker={{format: timeFormat}} >
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

export default Demo9;

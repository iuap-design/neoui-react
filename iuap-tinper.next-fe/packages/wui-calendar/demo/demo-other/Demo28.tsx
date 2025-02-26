/**
 *
 * @title 日维度模式拖拽模式
 * @description  支持拖拽创建时间段内的事件
 *
 */

import { Calendar, Button, Input, Row, Col, DatePicker } from "@tinper/next-ui";
import moment, {Moment} from "moment";
import React, {Component} from 'react';
import {EventObjectInput} from '../../src/iCalendar'

function onSelect(value: Moment) {
    console.log('onSelect', value);
}
const today = moment().format('YYYY-MM-DD');
const nextday = moment().add(1, 'day').format('YYYY-MM-DD');
interface DemoState {
    type: string,
    selectValues: string[],
    timeEvents: any[],
    operations?: string[],
    startValue: string,
    endValue?: string,
    inputVal?: string,
}
class Demo28 extends Component <{}, DemoState> {

    constructor(props: {}, context: {}) {
        super(props, context);
        this.state = {
            type: 'hour',
            selectValues: [],
            operations: ['lastDay', 'lastMonth', 'nextDay', 'nextMonth', 'today'],
            timeEvents: [
                {
                    start: '2022-10-09 04:00',
                    end: 1666778784363,
                    content: '重型机械维修a',
                },
                {
                    start: '2023-03-05 05:00',
                    end: '3022-10-13 15:00',
                    content: '重型机械维修b',
                },
                {
                    start: '2022-10-09 06:00',
                    end: '3022-10-13 15:00',
                    content: '重型机械维修c',
                },
                {
                    start: '2022-10-09 07:00',
                    end: '3022-10-10 08:00',
                    content: '重型机械维修d',
                },
                {
                    start: today + ' 12:52',
                    end: today + ' 15:00',
                    content: '1重型机械维修',
                },
                {
                    start: nextday + ' 14:00',
                    end: nextday + ' 17:45',
                    content: '2轻型机械维修',
                },
                {
                    start: today + ' 14:00',
                    end: today + ' 15:00',
                    content: '3轻型机械维修',
                },
                {
                    start: nextday + ' 15:30',
                    end: nextday + ' 17:30',
                    content: '4轻型机械维修',
                },
                {
                    start: today + ' 19:00',
                    end: today + ' 20:00',
                    content: '5轻型机械维修',
                },
                {
                    start: today + ' 21:00',
                    end: today + ' 22:00',
                    content: '6轻型机械维修',
                },
                {
                    start: today + ' 17:00',
                    end: today + ' 18:00',
                    content: '7轻型机械维修',
                },
                {
                    start: today + ' 21:00',
                    end: today + ' 21:45',
                    content: '8轻型机械维修',
                },
                {
                    start: today + ' 17:30',
                    end: today + ' 18: 30',
                    content: '9轻型机械维修',
                },
                {
                    start: today + ' 21:00',
                    end: today + ' 21:30',
                    content: '10轻型机械维修',
                },
                {
                    start: today + ' 22:30',
                    end: today + ' 23:00',
                    content: '11轻型机械维修',
                },
                {
                    start: today + ' 22:30',
                    end: today + ' 23:00',
                    content: '12轻型机械维修',
                },
                {
                    start: today + ' 22:30',
                    end: today + ' 23:00',
                    content: '13轻型机械维修',
                },
                {
                    start: today + ' 22:30',
                    end: today + ' 23:00',
                    content: '14轻型机械维修',
                },
                {
                    start: today + ' 22:30',
                    end: today + ' 23:00',
                    content: '15轻型机械维修',
                },
                {
                    start: today + ' 22:30',
                    end: today + ' 23:00',
                    content: '16轻型机械维修',
                }
            ],
            startValue: '',
            endValue: '',
            inputVal: ''
        }
    }

    // 拖拽鼠标松开时的回调，此时参数为拖拽的起止时间，用于回填到自定义modal的body体中的时间组件内
    onCreateEvent = (val: {start: string, end: string}) => {
        let newVal = {...val}
        let startValue = newVal.start
        let endValue = newVal.end
        this.setState({
            // timeEvents:  newtimeEvents
            startValue,
            endValue,
            inputVal: ''
        })
    }
    onTypeChange = (type: string) => {
        this.setState({ type });
    }

    dateCellHeaderReader = (current: Moment, _values: Moment[], headerChilds: (React.ReactElement)[]) => {
        let text = '';
        if (current.weekday() === 5 || current.weekday() === 6) {
            text = '休'
        }
        headerChilds.shift();
        text && headerChilds.push(<span key={current.format('YYYY-MM-DD') + "_" + text} style={{marginLeft: '5px'}}>{text}</span>)
        return headerChilds
    }

    onClick = (current: Moment) => {
        console.log('onClick', current)
    }

    getDateCellAttr = (current: Moment, _value: Moment) => {
        const {selectValues} = this.state
        for (let i = 0; i < selectValues.length; i++) {
            if (current.format('YYYY-MM-DD') == this.state.selectValues[i]) {
                return {
                    className: 'remarks',
                    onClick: this.onClick.bind(null, current)
                }
            }
        }
        return {
            onClick: this.onClick.bind(null, current)
        }
    }
    // 渲染自定义组件
    renderHeader = () => {
        return (
            <div className="demo15-headerComponents">
                <Button disabled>自定义组件</Button>
            </div>
        )
    }
    onTimeEventsClick = (e: React.MouseEvent<HTMLElement>, value: EventObjectInput, time: Moment) => {
        e.stopPropagation();
        console.log(e, value, time)
    }

    // 可改变时间的开始时间
    startTimeHandle = (_val: any, v2: string) => {
        this.setState({
            startValue: v2
        })
    }
    endTimeHandle = (_val: any, v2: string) => {
        this.setState({
            endValue: v2
        })
    }

    // 点击modal 确认按钮的回调，会返回一个callBack，在校验成功后要执行下，以关闭拖拽区（这逻辑没法写到组件内部，只能和业务交互）
    onModalOk = (callback: () => void) => {
        let newObj: any = {
            start: this.state.startValue,
            end: this.state.endValue,
            content: this.state.inputVal
        }
        let newtimeEvents = [...this.state.timeEvents]
        newtimeEvents.push({...newObj})
        this.setState({
            timeEvents: newtimeEvents
        })
        callback() // 校验成功后执行callback，组件内部关闭弹窗及关闭创建的事件
    }
    inputChange = (val: string) => {
        this.setState({
            inputVal: val
        })
    }

    // 自定义modal的body内容
    modalBody = () => {
        return (
            <div>
                <Row>
                    <Col span={4}>
                        <div style={{textAlign: 'right', paddingRight: '10px', lineHeight: '28px'}}><span style={{color: '#e23'}}>*</span>添加主题</div>
                    </Col>
                    <Col span={18}>
                        <Input allowClear onChange={this.inputChange} style={{background: '#fffcea'}} />
                    </Col>
                </Row>
                <Row style={{marginTop: '10px'}}>
                    <Col span={4}>
                        <div style={{textAlign: 'right', paddingRight: '10px', lineHeight: '28px'}}><span style={{color: '#e23'}}>*</span>选择时间</div>
                    </Col>
                    <Col span={18}>
                        <div style={{display: 'inline-block', width: '48%'}}>
                            <DatePicker
                                picker='date'
                                format={'YYYY-MM-DD HH:mm'}
                                onChange={this.startTimeHandle}
                                value={this.state.startValue}
                                // showToday
                                showTime={{showSecond: false, minuteStep: 15, format: 'HH:mm'}}
                            />
                        </div>
                        {/* <TimePicker onChange={this.startTimeHandle} showSecond={false} value={this.state.startTimeValue} /> */}
                        <span> - </span>
                        {/* <TimePicker onChange={this.endTimeHandle} showSecond={false} value={this.state.endTimeValue} /> */}
                        <div style={{display: 'inline-block', width: '48%'}}>
                            <DatePicker
                                picker='date'
                                format={'YYYY-MM-DD HH:mm'}
                                onChange={this.endTimeHandle}
                                value={this.state.endValue}
                                // showToday
                                showTime={{showSecond: false, minuteStep: 15, format: 'HH:mm'}}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

    // 自定义modal头部
    modalHeader = () => {
        return '创建任务'
    }

    render() {
	    return (
	        <div className="demo15">
	            <Calendar
	                operations={this.state.operations}
	                // style={{margin: 10}}
	                fullscreen
	                mutiple
	                fieldid="demo15"
	                onSelect={onSelect}
	                type={this.state.type}
	                value={[...this.state.selectValues.keys()].map(key => moment(key))}
	                locale='zh-cn'
	                layout='left'
                    timeEvents={this.state.timeEvents}
	                onPanelChange={this.onTypeChange}
	                dateCellHeaderReader={this.dateCellHeaderReader}
                    getDateCellAttr={this.getDateCellAttr}
                    onTimeEventsClick={this.onTimeEventsClick}
                    headerRender={() => this.renderHeader()}
                    showTimeLine
                    onCreateEvent={this.onCreateEvent}
                    silderModalBody={this.modalBody()}
                    // silderModalHeader={this.modalHeader()}
                    onModalOk={this.onModalOk}
                    isDragEvent={true}
	            />
	        </div>
	    )
    }
}

export default Demo28
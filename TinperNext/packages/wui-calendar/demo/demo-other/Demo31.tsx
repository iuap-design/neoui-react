/**
 *
 * @title 周模式
 * @description  周模式
 *
 */

import { Calendar, Button, Row, Col, Input, DatePicker, Icon } from "@tinper/next-ui";
import moment, {Moment} from "moment";
import React, {Component} from 'react';

function onSelect(value: Moment) {
    console.log('onSelect', value);
}
interface DemoState {
    type: string,
    selectType: string,
    selectValues: string[],
    operations: string[],
    timeEvents: any,
    timeEvent1: any,
    startValue: string,
    endValue: string,
    inputVal: string,
    currentDate: any,
    strideValue: any[],
    demoFlag: string,
    moreRender: any,
    moreDate: any
}

const listDataArr = [
    {
        '2022-09-20': [
            {code: 'xx01', content: '重型机械维修组织'},
            {code: 'xx02', content: '轻型机械维修组织'},
            {code: 'xx03', content: '高危机械维修组织'},
            {code: 'xx04', content: '机械维修组织'}
        ]
    },
    {
        '2022-09-25': [
            {code: 'xx01', content: '重型机械维修组织'},
            {code: 'xx02', content: '轻型机械维修组织'}
        ]
    },
    {
        '2022-09-26': [
            {code: 'xx01', content: '重型机械维修组织'}
        ]
    }
]
const today = moment().format('YYYY-MM-DD');

class Demo31 extends Component <{}, DemoState> {

    constructor(props: {}, context: {}) {
        super(props, context);

        console.log('today--------', today)
        this.state = {
            type: 'week',
            selectType: '休',
            selectValues: [],
            operations: ['lastDay', 'lastMonth', 'nextDay', 'nextMonth', 'today', 'headerSwitcher'],
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
                    start: today + ' 13:00',
                    end: today + ' 17:45',
                    content: '2轻型机械维修',
                },
                {
                    start: today + ' 14:00',
                    end: today + ' 15:00',
                    content: '3轻型机械维修',
                },
                {
                    start: today + ' 15:30',
                    end: today + ' 17:30',
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
            timeEvent1: {
                '2024-06-21': [
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
                '2024-06-17': [
                    {
                        start: '2024-06-17' + ' 22:30',
                        end: '2024-06-17' + ' 23:00',
                        content: '11轻型机械维修',
                    },
                    {
                        start: '2024-06-17' + ' 22:30',
                        end: '2024-06-17' + ' 23:00',
                        content: '12轻型机械维修',
                    },
                    {
                        start: '2024-06-17' + ' 22:30',
                        end: '2024-06-17' + ' 23:00',
                        content: '13轻型机械维修',
                    }
                ],
                '2024-06-18': [
                    {
                        start: '2024-06-17 05:00',
                        end: '3022-10-13 15:00',
                        content: '重型机械维修b',
                    },
                    {
                        start: '2024-06-18 06:00',
                        end: '3022-10-13 15:00',
                        content: '重型机械维修c',
                    },
                    {
                        start: '2022-10-09 07:00',
                        end: '3022-10-10 08:00',
                        content: '重型机械维修d',
                    },
                    {
                        start: '2022-10-08 07:00',
                        end: '3022-10-11 08:00',
                        content: '重型机械维修e',
                    },
                    {
                        start: '2022-10-07 07:00',
                        end: '3022-10-12 08:00',
                        content: '重型机械维修f',
                    }
                ],
                '2024-06-20': [
                    {
                        start: '2024-06-20' + ' 22:30',
                        end: '2024-06-20' + ' 23:00',
                        content: '11轻型机械维修',
                    },
                    {
                        start: '2024-06-20' + ' 22:30',
                        end: '2024-06-20' + ' 23:00',
                        content: '12轻型机械维修',
                    },
                    {
                        start: '2024-06-20' + ' 22:30',
                        end: '2024-06-20' + ' 23:00',
                        content: '13轻型机械维修',
                    }
                ],
                '2024-06-24': [
                    {
                        start: '2024-06-24' + ' 21:00',
                        end: '2024-06-24' + ' 22:00',
                        content: '6轻型机械维修',
                    },
                    {
                        start: '2024-06-24' + ' 17:00',
                        end: '2024-06-24' + ' 18:00',
                        content: '7轻型机械维修',
                    }
                ]
            },
            startValue: '',
            endValue: '',
            inputVal: '',
            currentDate: new Date(),
            strideValue: [],
            demoFlag: '',
            moreRender: null,
            moreDate: ''
        }
    }

    componentDidMount = () => {
        this.getNewValue();
    }

    onTypeChange = (type: string) => {
        this.setState({
            type,
        });
    }

    getNewValue = () => {
        let listDataObj;
        let selectVal = [];
        for (let j = 0; j < listDataArr.length; j++) {
            listDataObj = listDataArr[j];
            selectVal.push(Object.keys(listDataObj)[0])
        }
        this.setState({ selectValues: selectVal})
    }

    handleNewValue = () => {
        this.getNewValue()

        listDataArr[0]["2022-09-20"]?.push({code: 'xx', content: '新增机械维修组织'})
        listDataArr[1]["2022-09-25"]?.push({code: 'xx', content: '新增机械维修组织'})
        listDataArr[2]["2022-09-26"]?.push({code: 'xx', content: '新增机械维修组织'})
    }

    dateCellContentRender = (current: Moment, _values: Moment[]) => {
	    const {selectValues} = this.state;
        if (selectValues.length !== 0) {
            return (
                <ul className="show-remarks">
                    {listDataArr.map((item, index) => {
                        let contentArr = item[selectValues[index]]
                        if (current.format('YYYY-MM-DD') == selectValues[index]) {
                            return (
                                <div key={index}>
                                    {contentArr.length >= 1 && <li>{contentArr[0].content}</li>}
                                    {contentArr.length >= 2 && <li>{contentArr[1].content}</li>}
                                    {contentArr.length > 2 && <li onClick={this.getMore}>还有{contentArr.length - 2}项</li>}
                                </div>
                            )
                        }
                    })}
                </ul>
            )
        }
        return null
    }
    dateCellHeaderReader = (current: Moment, _values: Moment[], headerChilds: (React.ReactElement)[]) => {
        let text = '';
        if (current.weekday() === 5 || current.weekday() === 6) {
            text = '休'
        }
        headerChilds.shift();
        text && headerChilds.push(<span key={current.format('YYYY-MM-DD') + '_' + text} style={{marginLeft: '5px'}}>{text}</span>)
        return headerChilds
    }

    onClick = (current: Moment) => {
        console.log('onClick', current)
    }

    getMore = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        console.log('getMore')
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

    // 拖拽鼠标松开时的回调，此时参数为拖拽的起止时间，用于回填到自定义modal的body体中的时间组件内
    onCreateEvent = (val: any) => {
        let newVal = {...val}
        let startValue = newVal.start
        let endValue = newVal.end
        this.setState({
            // timeEvents:  newtimeEvents
            startValue,
            endValue,
            inputVal: '',
            currentDate: val.currentDate, // 周维度需要从字段确定事件添加到哪一天
            demoFlag: val.dataFlag // 月维度需要此字段定义唯一事件key指
        })
    }

    // 自定义modal的body内容
    modalBody = () => {
        let { type } = this.state
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
                            {
                                type === 'date' ? (
                                    <DatePicker
                                        picker='date'
                                        format={'YYYY-MM-DD'}
                                        onChange={this.startTimeHandle}
                                        value={this.state.startValue}
                                        // showToday
                                        showTime={{showSecond: false, minuteStep: 15, format: 'HH:mm'}}
                                    />
                                ) : (
                                    <DatePicker
                                        picker='date'
                                        format={'YYYY-MM-DD HH:mm'}
                                        onChange={this.startTimeHandle}
                                        value={this.state.startValue}
                                        // showToday
                                        showTime={{showSecond: false, minuteStep: 15, format: 'HH:mm'}}
                                    />
                                )
                            }
                        </div>
                        {/* <TimePicker onChange={this.startTimeHandle} showSecond={false} value={this.state.startTimeValue} /> */}
                        <span> - </span>
                        {/* <TimePicker onChange={this.endTimeHandle} showSecond={false} value={this.state.endTimeValue} /> */}
                        <div style={{display: 'inline-block', width: '48%'}}>
                            {
                                type === 'date' ? (
                                    <DatePicker
                                        picker='date'
                                        format={'YYYY-MM-DD'}
                                        onChange={this.endTimeHandle}
                                        value={this.state.endValue}
                                        // showToday
                                        showTime={{showSecond: false, minuteStep: 15, format: 'HH:mm'}}
                                    />
                                ) : (
                                    <DatePicker
                                        picker='date'
                                        format={'YYYY-MM-DD HH:mm'}
                                        onChange={this.endTimeHandle}
                                        value={this.state.endValue}
                                        // showToday
                                        showTime={{showSecond: false, minuteStep: 15, format: 'HH:mm'}}
                                    />
                                )
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        )
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
        let { type, timeEvent1, currentDate, startValue, endValue, inputVal, timeEvents, strideValue, demoFlag } = this.state
        if (type === 'hour') {
            let newObj: any = {
                start: startValue,
                end: endValue,
                content: inputVal
            }
            let newtimeEvents = [...timeEvents]
            newtimeEvents.push({...newObj})
            this.setState({
                timeEvents: newtimeEvents
            })
        } else if (type === 'week') {
            let newObj: any = {
                start: new Date(startValue).getTime() < new Date(endValue).getTime() ? startValue : endValue,
                end: new Date(startValue).getTime() < new Date(endValue).getTime() ? endValue : startValue,
                content: inputVal
            }
            let dateArr = Object.keys(timeEvent1)
            if (dateArr.includes(currentDate.format('YYYY-MM-DD'))) {
                timeEvent1[currentDate.format('YYYY-MM-DD')].push(newObj)
            } else {
                timeEvent1[currentDate.format('YYYY-MM-DD')] = [newObj]
            }
            this.setState({
                timeEvent1
            })
        } else if (type === 'date') {
            let newStrideValue = [...strideValue]
            let obj = {startTitleValue: startValue, titleValue: endValue, dataFlag: demoFlag}
            Object.assign(obj, {tex: inputVal})
            newStrideValue.push(obj)
            console.log('每次叠加吗', newStrideValue)
            this.setState({
                strideValue: newStrideValue
            })
        }
        callback() // 校验成功后执行callback，组件内部关闭弹窗及关闭创建的事件
    }
    inputChange = (val: string) => {
        this.setState({
            inputVal: val
        })
    }

    onMoreEvent = (_e: any, val: {startTitleValue: string, titleValue: string, tex: string}[], date: string) => {
        // console.log('点击更多回调', e, val, date)
        let domNode = (<div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>全部事件</span>
                <span onClick={this.onClose}><Icon type="uf-close" /></span>
            </div>
            <div>
                {
                    val && val.map((item, index) => {
                        return <div key={index}>{index + 1}、{item.tex}</div>
                    })
                }
            </div>
        </div>)
        this.setState({
            moreRender: domNode,
            moreDate: date
        })
    }
    // 点击更多或者每条事件时弹窗的回调
    moreRender = (current: any) => {
        let {moreRender, moreDate, type} = this.state
        // console.log('点击回调弹窗', current.format('YYYY-MM'), moreDate)
        if (type === 'date') {
            if (current.format('YYYY-MM-DD') === moreDate) {
                return moreRender
            } else {
                return false
            }
        } else if (type === 'month') {
            if (current.format('YYYY-MM') === moreDate) {
                return moreRender
            } else {
                return false
            }
        }
    }

    // 点击每条任务的回调
    onCellClick = (_e: any, val: {startTitleValue: string, titleValue: string, tex: string}, date: string) => {
        // console.log('点击每条事件的回调', e, val, date)
        let domNode = (<div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                {/* <span><Icon type="uf-shanchu" /></span> */}
                <span onClick={this.onClose}><Icon type="uf-close" /></span>
            </div>
            <div>
                <span style={{fontWeight: 'bold', paddingLeft: '5px', paddingBottom: '10px'}}>{val.tex}</span>
            </div>
            <div>
                <Row>
                    <Col span={4}><Icon type="uf-time-c-o" /></Col>
                    <Col span={18}><span>{val.startTitleValue}</span> <span>{val.titleValue}</span></Col>
                </Row>
                <Row>
                    <Col span={4}><Icon type="uf-qq" /></Col>
                    <Col span={18}><span>用户名</span></Col>
                </Row>
            </div>
        </div>)
        this.setState({
            moreRender: domNode,
            moreDate: date
        })
    }

    onClose = () => {
        // 关闭的时候将moreDate设置为空就可以，意思是没有任何一天匹配的事件
        this.setState({
            moreDate: ''
        })
    }

    render() {
	    return (
	        <div className="demo14">
                <Button style={{marginLeft: '10px'}} onClick={this.handleNewValue}>数据刷新</Button>
	            <Calendar
	                operations={this.state.operations}
	                // style={{margin: 10}}
	                fullscreen
	                mutiple
	                fieldid="demo14"
	                onSelect={onSelect}
	                type={this.state.type}
	                onPanelChange={this.onTypeChange}
	                value={[...this.state.selectValues.keys()].map(key => moment(key))}
	                locale='zh-cn'
	                dateFullCellRender={this.dateCellContentRender}
	                dateCellHeaderReader={this.dateCellHeaderReader}
	                layout='left'
                    showTimeLine={true}
                    getDateCellAttr={this.getDateCellAttr}
                    weekStartsOn={0}
                    timeEvents={this.state.timeEvents}
                    weekTimeEvents={this.state.timeEvent1}
                    // scrollIntoValue={moment('2024-06-25')}
                    isDragEvent
                    onCreateEvent={this.onCreateEvent}
                    silderModalBody={this.modalBody()}
                    // silderModalHeader={this.modalHeader()}
                    onModalOk={this.onModalOk}
                    strideValue={this.state.strideValue}
                    onCellClick = {this.onCellClick}
                    onMoreEvent={this.onMoreEvent}
                    moreRender={this.moreRender}
	            />
	        </div>
	    )
    }
}

export default Demo31
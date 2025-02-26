/**
 *
 * @title 多选模式 日维度组件
 * @description  支持日维度组件（以小时为单位的展示），支持事件渲染
 *
 */

import { Calendar, Button } from "@tinper/next-ui";
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
    operations?: string[]

}
class Demo15 extends Component <{}, DemoState> {

    constructor(props: {}, context: {}) {
        super(props, context);
        this.state = {
            type: 'hour',
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
            ]
        }
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
	            />
	        </div>
	    )
    }
}

export default Demo15
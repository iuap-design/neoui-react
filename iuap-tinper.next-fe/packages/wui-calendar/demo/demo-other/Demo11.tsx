/**
 *
 * @title 另一种形式的头部渲染（卡片模式）
 * @description 钉耙内预制了另外一种头部
 *
 */

import {Calendar} from "@tinper/next-ui";
import moment, {Moment} from "moment";
import React, {Component} from 'react';

function onSelect(value: Moment) {
    console.log('onSelect', value);
}


class Demo11 extends Component {
    getAllWeekDate = (currentTime: Moment) => {
        let time = moment(currentTime).startOf('week') // 获取本周的起始日期
        let weekArr = []
        for (let i = 0; i < 7; i++) {
            let tempTime = moment(time).weekday(i)
            let tr = moment(tempTime).format("YYYY-MM-DD") // "2021-11-08 (星期一)"
            weekArr.push(tr)
        }
        return weekArr
    }
    getDateCellAttr = (current: Moment, value: Moment) => {
        // 当前选择的周 加特殊类名
        if (this.getAllWeekDate(value).some(v => v === current.format('YYYY-MM-DD'))) {
            return {
                className: 'same-week',
            }
        }
        return {
        }
    }
    render() {
        return (
            <div style={{height: '250px'}}>
                <Calendar
                    style={{margin: 10}}
                    fullscreen={false}
                    onSelect={onSelect}
                    fieldid="demo"
                    headerComponent={Calendar.SwitchYearHeader}
                    // getDateCellAttr={this.getDateCellAttr}

                />
            </div>
        )
    }
}

export default Demo11

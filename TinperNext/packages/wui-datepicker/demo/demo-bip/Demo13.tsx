/**
 *
 * @title 多语（组件库内置）
 * @description 设置locale属性，并设置moment语言
 */

import {Col, DatePicker, Row, Input} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'

interface DemoState {
    value: Moment
    locale: string
    placeholders: Record<string, string>
}

const placeholders: Record<string, Record<string, string>> = {
    en: {
        DatePicker: 'DatePicker',
        MonthPicker: 'MonthPicker',
        QuarterPicker: 'QuarterPicker',
        WeekPicker: 'WeekPicker',
        HalfYearPicker: 'HalfYearPicker',
        YearPicker: 'YearPicker'
    },
    zh: {
        DatePicker: '日期',
        MonthPicker: '月',
        WeekPicker: '周',
        QuarterPicker: '季度',
        HalfYearPicker: '半年',
        YearPicker: '年'
    }
}

class Demo13 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: moment('2022-01-10'),
            locale: 'en',
            placeholders: placeholders.en
        }
    }

    changeLocale = (locale: string) => {
        console.log('change-->', locale)
        this.setState({
            locale,
            placeholders: placeholders[locale]
        })
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={4}>
                        <Input
                            type='search'
                            value={this.state.locale}
                            onChange={(locale: string) => this.setState({locale})}
                            enterButton='切换语言'
                            onSearch={this.changeLocale}
                        />
                    </Col>
                </Row>
                <Row gutter={[10, 10]}>
                    <Col>
                        <DatePicker
                            value={this.state.value}
                            locale={this.state.locale} // 4、将需要的语言包传入到日期组件locale属性
                            placeholder={this.state.placeholders?.DatePicker}
                        />
                    </Col>
                    <Col>
                        <DatePicker.MonthPicker
                            locale={this.state.locale} // 4、将需要的语言包传入到日期组件locale属性
                            placeholder={this.state.placeholders?.MonthPicker}
                        />
                    </Col>
                    <Col>
                        <DatePicker
                            picker='quarter'
                            locale={this.state.locale}
                            placeholder={this.state.placeholders?.QuarterPicker}
                            popupClassName="quarter-class"
                        />
                    </Col>
                    <Col>
                        <DatePicker
                            picker='halfYear'
                            locale={this.state.locale}
                            placeholder={this.state.placeholders?.HalfYearPicker}
                        />
                    </Col>
                    <Col>
                        <DatePicker
                            picker='year'
                            locale={this.state.locale} // 4、将需要的语言包传入到日期组件locale属性
                            placeholder={this.state.placeholders?.YearPicker}
                        />
                    </Col>
                    <Col>
                        <DatePicker.WeekPicker
                            locale={this.state.locale} // 4、将需要的语言包传入到日期组件locale属性
                            placeholder={this.state.placeholders?.WeekPicker}
                        />
                    </Col>
                    <Col>
                        <DatePicker.RangePicker
                            locale={this.state.locale} // 4、将需要的语言包传入到日期组件locale属性
                        />
                    </Col>
                    <Col>
                        <DatePicker
                            picker='range'
                            locale={this.state.locale} // 4、将需要的语言包传入到日期组件locale属性
                        />
                    </Col>
                    <Col>
                        <DatePicker.RangePicker
                            picker='month'
                            locale={this.state.locale} // 4、将需要的语言包传入到日期组件locale属性
                        />
                    </Col>
                    <Col>
                        <DatePicker.RangePicker
                            picker='halfYear'
                            locale={this.state.locale} // 4、将需要的语言包传入到日期组件locale属性
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Demo13

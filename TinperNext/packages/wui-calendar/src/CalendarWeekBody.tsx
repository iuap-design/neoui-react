import React, { Component } from 'react'
import cx from 'classnames';
import moment, {Moment} from 'moment';
import CalendarHourBody from './CalendarHourBody';
import CalendarSider from './CalendarSider';
import { globalConfig } from '../../wui-provider/src';
import i18n from './i18n/lang';
import {getLangInfo} from '../../wui-locale/src/tool';
import {splitFirst} from './util/utils'
import {getChildrenText} from "../../wui-core/src/index"
import Icon from '../../wui-icon/src';
import generate from './Generate';
import type {EventObject, EventObjectInput, CalendarWeekBodyProps} from './iCalendar';
const {generateM} = generate;
const getWeekStartsOn = (weekStartsOn?: any) => weekStartsOn ?? globalConfig().getGlobalDataFormat()?.dayOfWeek

class CalendarWeekBody extends Component<CalendarWeekBodyProps, {isFlag: boolean}> {
    constructor(props: CalendarWeekBodyProps) {
        super(props)
        this.state = {
            isFlag: false
        }
    }

    componentDidMount(): void {
        this.getWeekDay()
    }

    getWeekDay = () => {
        let { value, locale } = this.props
        let weekStartsOn = getWeekStartsOn(this.props.weekStartsOn) || 0
        let weekStartOnCopy = weekStartsOn === 0 || weekStartsOn === 1 ? weekStartsOn : 0
        let days = []
        let weekStart = moment(value?.format('YYYY-MM-DD')).startOf('isoWeek')
        let weekEnd = moment(value?.format('YYYY-MM-DD')).endOf('isoWeek')
        for (let m = moment(weekStart); m.diff(weekEnd) <= 0; m.add(1, 'days')) {
            let dayNum = m.format('YYYY-MM-DD')
            days.push({weekNum: moment(dayNum).day(), dateNum: dayNum})
        }
        let sliceNum = 0
        days.forEach((item, index) => {
            if (item.weekNum === weekStartOnCopy) {
                sliceNum = index
            }
        })
        let arr1 = days.splice(sliceNum, days.length - sliceNum)
        let newArr = [...arr1, ...days]
        if (weekStartOnCopy != 1) { // 以周日为第一天
            let prevDate = moment(newArr[1].dateNum).subtract(1, 'days').format('YYYY-MM-DD')
            newArr[0].dateNum = prevDate
            newArr.forEach((item: any, index: number) => {
                item.weekNum = locale?.weekdaysShort[index]
            })
        } else {
            newArr.forEach((item: any, index: number) => {
                if (index != 6) {
                    item.weekNum = locale?.weekdaysShort[index + 1]
                } else {
                    item.weekNum = locale?.weekdaysShort[0]
                }
            })
        }
        return newArr
    }

     // 渲染全天事件
     renderAllDayEvents = (value: any) => {
         const {clsPrefix, fieldid, locale, weekTimeEvents} = this.props;
         let { isFlag } = this.state
         let timeEvents: any[] = []
         let valueCopy = moment(value.dateNum)
         let allDayArr: EventObject[] = [];
         let allDayArray: EventObject[] = [];
         // 获取所有事件
         if (weekTimeEvents) {
             Object.keys(weekTimeEvents).forEach(item => {
                 timeEvents = [...timeEvents, ...weekTimeEvents[item]]
             })
         }
         // 获取所有全天事件存入数组allDayArr
         timeEvents?.forEach(item => {
             splitFirst(generateM()(item.start).format('YYYY-MM-DD HH:mm'))[0] !== splitFirst(generateM()(item.end).format('YYYY-MM-DD HH:mm'))[0] ? allDayArr.push(item) : null
         })
         // 控制只在相关时间内显示对应全天事件
         allDayArr.forEach(item => {
             let now = generateM()(valueCopy.format('YYYY-MM-DD') + ' 00:00').valueOf();
             let startDate = (new Date(generateM()(item.start).format('YYYY-MM-DD') + ' 00:00')).valueOf();
             let endDate = (new Date(generateM()(item.end).format('YYYY-MM-DD') + ' 00:00')).valueOf();
             !(Number(startDate) > Number(now)) && !(Number(endDate) < Number(now)) && allDayArray.push(item)
         })
         if (allDayArray.length !== 0) {
             let contentCx = cx({
                 [`${clsPrefix}-allDay-container-right`]: true,
	            [`${clsPrefix}-allDay-container-unfold`]: isFlag
             })
             return (
                 <div className={`${clsPrefix}-allDay-container`} fieldid={fieldid ? `${fieldid}_allDay_container` : undefined}>
                     <ul className={contentCx}>
                         {allDayArray.map((allItem: EventObject, allIndex: number) => {
                             allItem.content = getChildrenText(allItem.content).join('')
                             // 全天事件渲染时显示的文本信息，包括时间和事件
                             let content = generateM()(allItem.start).format('YYYY-MM-DD HH:mm') + ' - ' + generateM()(allItem.end).format('YYYY-MM-DD HH:mm') + ' ' + allItem.content;
                             let titleContent: any = allItem.content
                             // 点击全天事件时打印出的参数，包括起始时间和事件名称
                             let valueTemp = {start: generateM()(allItem.start).format('YYYY-MM-DD HH:mm'), end: generateM()(allItem.end).format('YYYY-MM-DD HH:mm'), content: allItem.content}
                             return (
                                 <li key={allIndex} fieldid={fieldid ? `${fieldid}_allDayEvents_${allIndex}` : undefined} onClick={(e) => this.onTimeEventsClick(e, valueTemp, generateM()(valueCopy.format('YYYY-MM-DD') + ' 00:00:00'))} title={titleContent}>{content}</li>
                             )
                         })}
                         {
                             allDayArray?.length > 2 && !isFlag ? <li className={`${clsPrefix}-allDay-container-unfold-btn`}>{locale.moreBefore}{allDayArray?.length - 2}{locale.moreAfter}</li> : null
                         }
                     </ul>
                 </div>
             );
         }
     }

    onTimeEventsClick = (e: React.MouseEvent<HTMLElement>, value: EventObjectInput, time: Moment) => {
        if (this.props.onTimeEventsClick) {
            this.props.onTimeEventsClick(e, value, time)
        }
    }

    onClickUnfold = () => {
        this.setState({
            isFlag: !this.state.isFlag
        })
        let alldom = document.querySelectorAll('.wui-calendar-allDay-container-right')
        alldom?.forEach(item => {
            item.scrollTop = 0
        })
    }

    // 渲染当前时间线
    renderCurrentTime = () => {
        const {current, clsPrefix, customInterval} = this.props;
        const currTime = current?.format('HH:mm')
        let intervalNum = (24 / customInterval) % 1 == 0 ? customInterval : 1;
        // 当前时间线对应的位置
        // 当customInterval不为1时，之前的计算结果除以4（因为之前一个格子分成四份一份15像素对应15分钟，设置间隔之后一个格子分成customInterval份，一份15像素对应60分钟）
        const top = intervalNum === 1 ? Number(current?.format('HH')) * 60 + Number(current?.format('mm')) : (Number(current?.format('HH')) * 60 + Number(current?.format('mm'))) / 4
        // 分别渲染当前时间线，当前时间线边缘点，当前时间
        const line = (<div className={`${clsPrefix}-curr-line`} style={{top: top}}/>)
        const circle = (<div className={`${clsPrefix}-curr-circle`} style={{top: top}}/>)
        const time = (<div className={`${clsPrefix}-curr-time`} style={{top: top - 8}}>{currTime}</div>)
        return (
            <React.Fragment key={currTime}>
                {line}
                {circle}
                {time}
            </React.Fragment>
        )
    }

    // 周模式应该有onChange事件吗
    onChange = () => {}

    renderBody = () => {
        let {
            locale,
            value: stateValue,
            fieldid,
            showTimeLine,
            clsPrefix,
            weekTimeEvents,
            isDragEvent,
            onModalOk,
            silderModalHeader,
            silderModalBody,
            onCreateEvent,
            customInterval,
            // layout,
            onTimeEventsClick,
            isEditEvent,
            current
        } = this.props
        let { isFlag } = this.state
        let dateNums = this.getWeekDay()
        const _locale = getLangInfo(locale, i18n, 'calendar')
        stateValue.locale(_locale.lang)
        let currentDate = stateValue.format('YYYY-MM-DD')
        return (
            <div className={`${clsPrefix}-week-content`}>
                <div className={`${clsPrefix}-week-content-header`}>
                    {
                        dateNums.map(item => {
                            return (
                                <div key={item.dateNum} className={`${clsPrefix}-week-content-header-item`}>
                                    <div className={`${clsPrefix}-week-content-header-item-top`}>
                                        {item.weekNum}
                                    </div>
                                    <div
                                        className={
                                            cx({
                                                [`${clsPrefix}-week-content-header-item-bottom`]: true,
                                                [`${clsPrefix}-week-content-header-item-active`]: currentDate === item.dateNum
                                            })
                                        }
                                    >
                                        {item.dateNum.slice(-2)}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={`${clsPrefix}-week-content-all-day`}>
                    <div className={`${clsPrefix}-week-content-all-day-left`}>
                        <div>{locale?.allDay}</div>
                        <div><Icon type="uf-treearrow-down" rotate={isFlag ? 180 : 0} onClick={this.onClickUnfold} /></div>
                    </div>
                    <div className={`${clsPrefix}-week-content-all-day-right`}>
                        <div className={`${clsPrefix}-week-content-all-day-right-box`}>
                            {
                                dateNums.map(item => {
                                    return (
                                        <div key={item.dateNum} className={`${clsPrefix}-week-content-all-day-event-item`}>
                                            {this.renderAllDayEvents(item)}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={`${clsPrefix}-week-content-body`}>
                    <div>
                        <CalendarSider
                            key="calendar-sider"
                            prefixCls={clsPrefix}
                            lang={_locale.lang}
                            localeData={_locale.langMap}
                            value={stateValue}
                            fieldid={fieldid}
                            onMonthChange={this.onChange}
                            type={'hour'}
                            onTimeEventsClick={onTimeEventsClick}
                            showTimeLine={showTimeLine}
                            // hourCellRender={hourCellRender}
                            // hourCellContentRender={hourCellContentRender}
                            customInterval={customInterval}
                        />
                    </div>
                    <div className={`${clsPrefix}-week-content-body-current-line`}>
                        {showTimeLine && this.renderCurrentTime()}
                    </div>
                    {
                        dateNums.map((_item) => {
                            return (
                                <div className={`${clsPrefix}-week-content-body-day-item`} key={_item.dateNum}>
                                    <div>
                                        <CalendarHourBody
                                            key={_item.dateNum}
                                            clsPrefix={clsPrefix}
                                            fieldid={fieldid}
                                            value={moment(_item.dateNum)}
                                            showTimeLine={showTimeLine}
                                            current={current}
                                            onTimeEventsClick={onTimeEventsClick}
                                            layout={'left'}
                                            customInterval={customInterval}
                                            onCreateEvent={onCreateEvent}
                                            silderModalBody={silderModalBody}
                                            silderModalHeader={silderModalHeader}
                                            onModalOk={onModalOk}
                                            isDragEvent={isDragEvent}
                                            // weekStartsOn={this.props.weekStartsOn}
                                            type='week'
                                            timeEvents={weekTimeEvents?.[_item.dateNum] || []}
                                            locale={locale}
                                            isEditEvent={isEditEvent}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    render() {
        return this.renderBody()
    }
}

export default CalendarWeekBody
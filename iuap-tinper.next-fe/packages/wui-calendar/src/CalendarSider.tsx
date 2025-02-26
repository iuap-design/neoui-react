import cx from 'classnames';
import React, {Component} from 'react';
import List from '../../wui-list/src/index';
import { CalendarSliderProps, EventObjectInput } from './iCalendar';
import moment, {Moment} from 'moment';
import i18n from './i18n/lang';

// function noop() {
// }
// 显示整点的偏移高度
const offsetHeight = 8;
const defaultProps = {
    localeData: i18n['en-us']
};

class CalendarSider extends Component<CalendarSliderProps> {
	static defaultProps = defaultProps;
	getMonthName = (index: number, localeData: any) => {
	    // const localeData = month.locale(this.props.lang).localeData()
	    return localeData.monthsShort[index];
	}
	onMonthChange = (month: number) => {
	    let newValue = this.props.value.clone();
	    newValue = newValue.month(parseInt(month + "", 10));
	    this.props.onMonthChange(newValue);
	}

	monthSiderElement = (month: number) => {
	    const props = this.props;
	    let t = props.value.clone();
	    const {prefixCls, fieldid, localeData} = props;
	    const dataSource = [];
	    // 渲染12个月份
	    for (let index = 0; index < 12; index++) {
	        const className = cx({
	            [`${prefixCls}-active-sider-month`]: index === month,
	        })
	        t = t.month(index);
	        dataSource.push(
	            <List.Item fieldid={fieldid ? `${fieldid}_${this.getMonthName(index, localeData)}` : undefined} key={`${index}`} className={className} onClick={() => this.onMonthChange(index)}>
	                {this.getMonthName(index, localeData)}
	            </List.Item>
	        );
	    }

	    return (
	        <List
	            size="small"
	            dataSource={dataSource}
	            renderItem={item => item}
	        />
	    );
	}
	// type='hour'时点击sider对应时间触发的事件
	onTimeEventsClick = (e: React.MouseEvent<HTMLElement>, value: EventObjectInput, time: Moment) => {
	    if (this.props.onTimeEventsClick) {
	        this.props.onTimeEventsClick(e, value, time)
	    }
	}
	// type='hour'时sider渲染内容
	hourSiderElement = () => {
	    const {prefixCls, fieldid, showTimeLine, hourCellRender, hourCellContentRender, customInterval} = this.props;
	    const value = moment(this.props.value)
	    const dataSource: JSX.Element[] = [];
	    // customInterval为被24整除的整数，否则走原逻辑
	    let interVal = (24 / customInterval) % 1 == 0 ? 24 / customInterval : 24;
	    let intervalNum = (24 / customInterval) % 1 == 0 ? customInterval : 1;
	    // 渲染24小时
	    [...Array(interVal).keys()].forEach(item => {
	        let [time, hour] = Array(2).fill('');
	        if (item * intervalNum < 10 && item * intervalNum > 0) {
	            time = "0" + item * intervalNum + ":00";
	            hour = "0" + item;
	        } else if (item * intervalNum > 9) {
	            time = item * intervalNum + ":00"
	            hour = String(item)
	        }
	        const currentTop = Number(moment().format('HH')) * 60 + Number(moment().format('mm')) - offsetHeight;
	        const top = item * 60 - offsetHeight;
	        // 当前时间线在整点时间上下15分钟范围内，sider不显示当前时间
	        // if (value.format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
	        //     time = currentTop + 15 > top && currentTop - 15 < top && showTimeLine !== false ? '' : time;
	        // }
	        if (intervalNum === 1) {
	            if (value.format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
	                time = currentTop + 15 > top && currentTop - 15 < top && showTimeLine !== false ? '' : time;
	            }
	        } else {
	            let customCurrentTop = Number(moment().format('HH')) / customInterval * 60 - offsetHeight;
	        	let customTop = item * 60 - offsetHeight;
	            if (value.format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
	                time = customCurrentTop + 15 >= customTop && customCurrentTop - 15 < customTop && showTimeLine !== false ? '' : time;
	            }
	        }
	        // const outPutValue = {start: value.format('YYYY-MM-DD') + ' ' + hour + ':' + '00'};
	        const hourRender = () => {
	            if (hourCellRender) {
	                return hourCellRender(item, !!time);
	            } else if (hourCellContentRender) {
	                return <span className={`${prefixCls}-time-item-span`}>{hourCellContentRender(item, !!time)}</span>;
	            } else {
	                return <span className={`${prefixCls}-time-item-span`}>{time}</span>;
	            }
	        }
	        // 每小时分成4份，一份15分钟
	        for (let i = 1; i < (intervalNum === 1 ? 4 : intervalNum) + 1; i++) {
	            // 只显示整点时间
	            if (i == 1) {
	                let currentHour = item * intervalNum + i - 1 < 10 ? '0' + (item * intervalNum + i - 1) : item * intervalNum + i - 1;
	                const outPutValue = {start: value.format('YYYY-MM-DD') + ' ' + currentHour + ':' + '00'};
	                dataSource.push(
	                    <List.Item fieldid={fieldid ? `${fieldid}_siderTime_${item}_${i}` : undefined} className={`${prefixCls}-time-item`} onClick={(e) => this.onTimeEventsClick(e, outPutValue, moment(value.format('YYYY-MM-DD') + ' ' + outPutValue.start))}>
	                        {hourRender()}
	                    </List.Item>
	                )
	            } else {
	                let currentHour = item * intervalNum + i - 1 < 10 ? '0' + (item * intervalNum + i - 1) : item * intervalNum + i - 1;
	                const outPutValueT = intervalNum === 1 ? {start: value.format('YYYY-MM-DD') + ' ' + hour + ':' + String((i - 1) * 15)} : {start: value.format('YYYY-MM-DD') + ' ' + currentHour + ':' + '00'};
	                dataSource.push(
	                    <List.Item fieldid={fieldid ? `${fieldid}_siderTime_${item}_${i}` : undefined} className={`${prefixCls}-time-item`} onClick={(e) => this.onTimeEventsClick(e, outPutValueT, moment(value.format('YYYY-MM-DD') + ' ' + outPutValueT.start))}>
	                		<span></span>
	            		</List.Item>
	                )
	            }
	        }
	    })

	    return (
	        <List
	            size="small"
	            dataSource={dataSource}
	            renderItem={item => item}
	        />
	    );
	}

	render() {
	    const {value, prefixCls, fieldid, type} = this.props;
	    const month = value.month();
	    const monthSider = type !== 'hour' ? this.monthSiderElement(month) : this.hourSiderElement();

	    return (
	        <div className={`${prefixCls}-sider`} fieldid={fieldid ? `${fieldid}_slider` : undefined}>
	            {monthSider}
	        </div>
	    );
	}
}

// CalendarSider.propTypes = {
//     value: PropTypes.object,
//     lang: PropTypes.string,
//     onMonthChange: PropTypes.func,
//     prefixCls: PropTypes.string,
// };

export default CalendarSider;

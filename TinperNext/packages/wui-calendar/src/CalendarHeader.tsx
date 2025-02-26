// import PropTypes from 'prop-types';
import cx from 'classnames';
import React, {Component} from 'react';
import Button from '../../wui-button/src';
import Moment from 'moment';
import CalendarHeaderSelect from './CalendarHeaderSelect';
import { CalendarHeaderDefaultProps, CalendarHeaderProps } from './iCalendar';
import i18n from './i18n/lang';
import generate from './Generate';
const { getDisplayYear } = generate;
function noop() {
}

class CalendarHeader extends Component<CalendarHeaderProps & CalendarHeaderDefaultProps> {
    static defaultProps: CalendarHeaderDefaultProps = {
        yearSelectOffset: 10,
        yearSelectTotal: 20,
        onValueChange: noop,
        onTypeChange: noop,
        locale: i18n['en-us']
    };
    onYearChange = (year: string) => {
        let newValue = this.props.value.clone();
        newValue = newValue.year(parseInt(year, 10));
        this.props.onValueChange(newValue);
    }

    yearSelectElement(year: number, disPlayYear: number) {
        const {yearSelectOffset, yearSelectTotal, prefixCls, Select, fieldid} = this.props;
        const start = disPlayYear - yearSelectOffset;
        const end = start + yearSelectTotal;
        const minNum = year - disPlayYear;
        const options = [];
        for (let index = start; index < end; index++) {
            options.push(<Select.Option key={`${index}`} value = {minNum + index} >{index}</Select.Option>);
        }
        return (
            <Select
                key="select"
                className={`${prefixCls}-header-year-select`}
                fieldid={fieldid ? `${fieldid}_year_select` : undefined}
                onChange={this.onYearChange}
                dropdownStyle={{zIndex: 2000}}
                dropdownMenuStyle={{maxHeight: 250, overflow: 'auto', fontSize: 12}}
                optionLabelProp="children"
                value={String(disPlayYear)}
                showSearch={false}
            >
                {options}
            </Select>
        );
    }
	changeTypeToHour = () => {
	    this.props.onTypeChange('hour');
	}

	changeTypeToDate = () => {
	    this.props.onTypeChange('date');
	}

	changeTypeToWeek = () => {
	    this.props.onTypeChange('week');
	}

	changeTypeToMonth = () => {
	    this.props.onTypeChange('month');
	}
	// 头部区域按钮点击事件，跳转到上个月
	toLastMonth = (month: number) => {
	    const newValue = this.props.value.clone();
	    newValue.month(parseInt(String(month), 10));
	    this.props.onValueChange(newValue);
	}
	// 头部区域按钮点击事件，跳转到下个月
	toNextMonth = (month: number) => {
	    const newValue = this.props.value.clone();
	    newValue.month(parseInt(String(month), 10));
	    this.props.onValueChange(newValue);
	}
	// 头部区域按钮点击事件，跳转到上一天
	toLastDay = (date: number) => {
	    const newValue = this.props.value.clone();
	    newValue.date(parseInt(String(date), 10) - 1);
	    this.props.onValueChange(newValue);
	}
	// 头部区域按钮点击事件，跳转到下一天
	toNextDay = (date: number) => {
	    const newValue = this.props.value.clone();
	    newValue.date(parseInt(String(date), 10) + 1);
	    this.props.onValueChange(newValue);
	}
	// 头部区域按钮点击事件，回到今天
	toToday = () => {
	    this.props.onValueChange(Moment());
	}
	// 对operations快捷键固定先后顺序
	initOperations = (operations: string[]) => {
	    let defaultOperations: string[] = [];
	    let [todayIndex, switchIndex, lastDayIndex, nextDayIndex, lastMonthIndex, nextMonthIndex] = Array(6).fill(-1);
	    // 确定这六个参数是否存在
	    operations.forEach((item: string, index: number) => {
	        lastDayIndex = item == 'lastDay' ? index : lastDayIndex;
	        lastMonthIndex = item == 'lastMonth' ? index : lastMonthIndex;
	        nextDayIndex = item == 'nextDay' ? index : nextDayIndex;
	        nextMonthIndex = item == 'nextMonth' ? index : nextMonthIndex;
	        todayIndex = item == 'today' ? index : todayIndex;
	        switchIndex = item == 'headerSwitcher' ? index : switchIndex;
	    })
	    lastDayIndex !== -1 ? defaultOperations.push('lastDay') : null;
	    lastMonthIndex !== -1 ? defaultOperations.push('lastMonth') : null;
	    nextDayIndex !== -1 ? defaultOperations.push('nextDay') : null;
	    nextMonthIndex !== -1 ? defaultOperations.push('nextMonth') : null;
	    switchIndex !== -1 ? defaultOperations.push('headerSwitcher') : null;
	    todayIndex !== -1 ? defaultOperations.push('today') : null;

	    return defaultOperations
	}

	renderTypeSwitcher = () => {
	    const {prefixCls, fieldid, type, locale} = this.props;
	    const switchCls = `${prefixCls}-header-switcher`;
	    return (
	        <span className={switchCls}>
	            {type === 'date' ?
	                <span
	                    onClick={this.changeTypeToMonth}
	                    className={`${switchCls}-normal`}
	                    fieldid={fieldid ? `${fieldid}_switch_year` : undefined}
	                >
	                    {locale.year}
	                </span> :
	                <span className={`${switchCls}-focus`} fieldid={fieldid ? `${fieldid}_switch_year` : undefined}>{locale.year}</span>
	            }
	            {/* {type === 'week' ?
	                <span
	                    onClick={this.changeTypeToWeek}
	                    fieldid={fieldid ? `${fieldid}_switch_week` : undefined}
	                    className={`${switchCls}-normal`}
	                >
	                    {locale.month}
	                </span> :
	                <span className={`${switchCls}-focus`} fieldid={fieldid ? `${fieldid}_switch_month` : undefined}>{locale.month}</span>
	            } */}
	            {type === 'month' ?
	                <span
	                    onClick={this.changeTypeToDate}
	                    fieldid={fieldid ? `${fieldid}_switch_month` : undefined}
	                    className={`${switchCls}-normal`}
	                >
	                    {locale.month}
	                </span> :
	                <span className={`${switchCls}-focus`} fieldid={fieldid ? `${fieldid}_switch_month` : undefined}>{locale.month}</span>
	            }
	        </span>
	    )
	}
	setSelectValue = (val: any) => {
	    let {setSelectValue} = this.props
	    setSelectValue && setSelectValue(val)
	}
	// 渲染头部快捷选项
	renderOperations = () => {
	    const {prefixCls, fieldid, locale, type, value, operations, headerComponents, lang, isShowWeek} = this.props;
	    const switchCls = `${prefixCls}-header-switcher`;
	    const year = value.year();
	    const disPlayYear = getDisplayYear(value);
	    const month = value.month();
	    const date = value.date();
	    const operationsNew = operations ? this.initOperations(operations) : null;
	    const yearSelect = this.yearSelectElement(year, disPlayYear);
	    let hasSwitcher = false;
	    return (
	        <>
	            {operationsNew?.map((item: string) => {
	                let marginClass = `${prefixCls}-margin-right`;
	                if (type == 'date' && item == 'lastMonth') {
	                    return (
	                        <React.Fragment key={item}>
	                            <Button
	                                title={locale.toLastMonth}
	                                className={`${prefixCls}-${item} ${marginClass}`}
	                                fieldid={fieldid ? `${fieldid}_toLastMonth` : undefined}
	                                icon='uf-xiangshang'
	                                onClick={() => this.toLastMonth(month - 1)}
	                            />
	                            <span className={`${prefixCls}-show-date ${marginClass}`}>{disPlayYear} {locale.year} {month + 1} {locale.month}
	                                <CalendarHeaderSelect setSelectValue={this.setSelectValue} value={value} lang={lang} localeData={locale} prefixCls={prefixCls} type={type}></CalendarHeaderSelect>
	                            </span>
	                        </React.Fragment>
	                    )
	                }
	                if ((type == 'hour' && item == 'lastDay') || (type == 'week' && item == 'lastDay')) {
	                    return (
	                        <React.Fragment key={item}>
	                            <Button
	                                title={locale.toLastDay}
	                                className={`${prefixCls}-${item} ${marginClass}`}
	                                fieldid={fieldid ? `${fieldid}_toLastDay` : undefined}
	                                icon='uf-xiangshang'
	                                onClick={() => this.toLastDay(date)}
	                            />
	                            <span className={`${prefixCls}-show-date ${marginClass}`}>{disPlayYear} {locale.year} {month + 1} {locale.month} {type == 'hour' || type == 'week' ? date : null} {type == 'hour' || type == 'week' ? locale.date : null}
	                                <CalendarHeaderSelect localeData={locale} setSelectValue={this.setSelectValue} value={value} lang={lang} prefixCls={prefixCls} type={type}></CalendarHeaderSelect>
	                            </span>
	                        </React.Fragment>
	                    )
	                }
	                if (type == 'date' && item == 'nextMonth') {
	                    return (
	                        <Button
	                            title={locale.toNextMonth}
	                            className={`${prefixCls}-${item} ${marginClass}`}
	                            fieldid={fieldid ? `${fieldid}_toNextMonth` : undefined}
	                            key={item}
	                            icon='uf-xiangshang'
	                            onClick={() => this.toNextMonth(month + 1)}
	                        />)
	                }
	                if ((type == 'hour' && item == 'nextDay') || (type == 'week' && item == 'nextDay')) {
	                    return (
	                        <Button
	                            title={locale.toNextDay}
	                            className={`${prefixCls}-${item} ${marginClass}`}
	                            fieldid={fieldid ? `${fieldid}_toNextDay` : undefined}
	                            key={item}
	                            icon='uf-xiangshang'
	                            onClick={() => this.toNextDay(date)}
	                        />)
	                }
	                if (item == 'yearSelect') {
	                    return yearSelect
	                }
	                if (item == 'headerSwitcher') {
	                    hasSwitcher = true;
	                    return (
	                        <span key={item} className={switchCls}>
	                            {type === 'hour' || type === 'week' ?
	                                <span
	                                    fieldid={fieldid ? `${fieldid}_switch_month` : undefined}
	                                    className={`${switchCls}-normal`}
	                                    onClick={() => this.changeTypeToDate()}
	                                >
	                                    {locale.month}
	                                </span> :
	                                <span className={`${switchCls}-focus`} fieldid={fieldid ? `${fieldid}_switch_month` : undefined}>{locale.month}</span>
	                            }
	                            {isShowWeek ? type === 'hour' || type === 'date' ?
	                                <span
	                                    fieldid={fieldid ? `${fieldid}_switch_month` : undefined}
	                                    className={`${switchCls}-normal`}
	                                    onClick={() => this.changeTypeToWeek()}
	                                >
	                                    {locale.week}
	                                </span> :
	                                <span className={`${switchCls}-focus`} fieldid={fieldid ? `${fieldid}_switch_month` : undefined}>{locale.week}</span> : null
	                            }
	                            {type === 'date' || type === 'week' ?
	                                <span
	                                    fieldid={fieldid ? `${fieldid}_switch_date` : undefined}
	                                    className={`${switchCls}-normal`}
	                                    onClick={() => this.changeTypeToHour()}
	                                >
	                                    {locale.date}
	                                </span> :
	                                <span className={`${switchCls}-focus`} fieldid={fieldid ? `${fieldid}_switch_date` : undefined}>{locale.date}</span>
	                            }
	                        </span>
	                    )
	                }
	                if (item == 'today') {
	                    let style = hasSwitcher == false ? {marginRight: '0px'} : undefined;
	                    return (
	                        <Button
	                            title={locale.today}
	                            className={`${prefixCls}-${item} ${marginClass}`}
	                            fieldid={fieldid ? `${fieldid}_toToday` : undefined}
	                            key={item} onClick={this.toToday}
	                            disabled={Moment(value).format("YYYY-MM-DD") == Moment().format("YYYY-MM-DD")}
	                            style={style}
	                        >{locale.today}</Button>)
	                }
	            })}
	            {headerComponents ?
	                <div className={`${prefixCls}-headerComponents`} fieldid={fieldid ? `${fieldid}_headerComponents` : undefined}>
	                    {typeof headerComponents == 'function' ? headerComponents() : headerComponents}
	                </div> : null}
	        </>
	    )
	}
	render() {
	    const {value, locale, prefixCls, showTypeSwitch, headerComponents, fieldid, operations} = this.props;
	    const year = value.year();
	    const disPlayYear = getDisplayYear(value);
	    const month = value.month();
	    const yearSelect = this.yearSelectElement(year, disPlayYear);
	    const typeSwitcher = showTypeSwitch ? this.renderTypeSwitcher() : null;
	    const showDate = <span key="show-date" className={`${prefixCls}-show-date`}>{disPlayYear} {locale.year} {month + 1} {locale.month}</span>;
	    const headerComponent = headerComponents ?
	        <div className={`${prefixCls}-headerComponents`} fieldid={fieldid ? `${fieldid}_headerComponents` : undefined}>
	            {typeof headerComponents == 'function' ? headerComponents() : headerComponents}
	        </div> : null;
	    const showOperations = this.renderOperations();
	    return (
	        <div className={cx({[`${prefixCls}-header`]: true, [`${prefixCls}-operations`]: operations})} fieldid={fieldid ? `${fieldid}_calendar_header` : undefined}>
	            {typeSwitcher}
	            {operations ? showOperations : [yearSelect, showDate, headerComponent]}
	        </div>
	    );
	}
}

// CalendarHeader.propTypes = {
//     value: PropTypes.object,
//     locale: PropTypes.object,
//     yearSelectOffset: PropTypes.number,
//     yearSelectTotal: PropTypes.number,
//     onValueChange: PropTypes.func,
//     onTypeChange: PropTypes.func,
//     Select: PropTypes.object,
//     prefixCls: PropTypes.string,
//     type: PropTypes.string,
//     showTypeSwitch: PropTypes.bool,
//     headerComponents: PropTypes.array,
// };
CalendarHeader.defaultProps = {
    yearSelectOffset: 10,
    yearSelectTotal: 20,
    onValueChange: noop,
    onTypeChange: noop,
    locale: i18n['en-us']
};

export default CalendarHeader

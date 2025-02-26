/* eslint-disable react/prop-types */
import React, {Component, useContext} from 'react'
import {ConfigContext, WithConfigConsumer} from '../../wui-provider/src/context'
import DatePicker from './DatePicker'
import RangePicker from './RangePicker'
import {DatePickerProps, PickerLocale, RangePickerProps, DateRangePickerProps} from './iPicker'
import { setComponentSize } from '../../wui-core/src';
import { globalConfig } from '../../wui-provider/src';
const getWeekStartsOn = (weekStartsOn?: DatePickerProps['weekStartsOn']) => weekStartsOn ?? globalConfig().getGlobalDataFormat()?.dayOfWeek

// 适配 antd的 picker属性
@WithConfigConsumer({name: 'datepicker'})
class DatePickerAdapter extends Component<DatePickerProps | RangePickerProps | DateRangePickerProps> {
	static WeekPicker: typeof DatePicker;
	static MonthPicker: typeof DatePicker;
	static QuarterPicker: typeof DatePicker;
	static HalfYearPicker: typeof DatePicker;
	static YearPicker: typeof DatePicker;
	static RangePicker: typeof RangePicker;
    static contextType = ConfigContext;

    // <DatePicker picker='quarter' size='default' /> 用法
    render() {
	    let {picker, monthCellRender, monthCellContentRender, size, dir: direction, bordered, placement = direction == "rtl" ? "bottomRight" : "bottomLeft", weekStartsOn, ...other}: any = this.props
	    size = setComponentSize(size, {defaultIsMd: true})
        bordered = bordered ?? (this.context as React.ContextType<typeof ConfigContext>)?.bordered ?? true
	    const _weekStartsOn = getWeekStartsOn(weekStartsOn)

	    switch (picker) {
	        case 'range':
	            return <RangePicker size={size} weekStartsOn={_weekStartsOn} dir={direction} bordered={bordered} placement={placement} {...other} />
	        default:
	            return <DatePicker picker={picker} dir={direction} size={size} bordered={bordered} placement={placement} weekStartsOn={_weekStartsOn} monthCellRender={monthCellRender || monthCellContentRender} {...other} />
	    }
    }
}

const DatePickerProvider = (props: DatePickerProps, ref: React.Ref<any>) => {
    let {locale, weekStartsOn, size, disabled, dir, ...other} = props
    const context = useContext(ConfigContext) // 接受provider控制
    const actualLocale = 'locale' in props ? locale : context.locale
    const actualDisabled = 'disabled' in props ? disabled : context.disabled
    const contextProps = context.provider?.datepicker || {}
    size = setComponentSize(size || context.size, {defaultIsMd: true})
    dir = dir || context.dir;

    const _weekStartsOn = getWeekStartsOn(weekStartsOn)

    return <DatePickerAdapter {...contextProps} {...other} dir={dir} locale={actualLocale as PickerLocale | undefined} disabled={actualDisabled} size={size} weekStartsOn={_weekStartsOn} ref={ref} />
}

const dateMap: Record<string, string> = {
    week: 'WeekPicker',
    month: 'MonthPicker',
    quarter: 'QuarterPicker',
    halfYear: 'HalfYearPicker', // 半年
    year: 'YearPicker'
}
for (let k in dateMap) {
    const Comp = (others: DatePickerProps, ref: React.Ref<any>) =>
        DatePickerProvider({...others, picker: k} as DatePickerProps, ref)
    ;(DatePickerAdapter as Record<string, any>)[dateMap[k]] = React.forwardRef(Comp)
}

(DatePickerAdapter as Record<string, any>).RangePicker = React.forwardRef((props: RangePickerProps, ref: React.Ref<any>) => {
    let {locale, weekStartsOn, disabled, ranges, presets, size, dir, ...other} = props
    const context = useContext(ConfigContext) // 接受provider控制
    const actualLocale = 'locale' in props ? locale : context.locale
    const actualDisabled = 'disabled' in props ? disabled : context.disabled
    const contextProps = context.provider?.datepicker || {}
    size = setComponentSize(size || context.size, {defaultIsMd: true})
    dir = dir || context.dir;

    const _weekStartsOn = getWeekStartsOn(weekStartsOn)

    return <RangePicker {...contextProps} {...other} dir={dir} size={size} weekStartsOn={_weekStartsOn} ranges={ranges || presets} locale={actualLocale as PickerLocale | undefined} disabled={actualDisabled} ref={ref} />
})

export default DatePickerAdapter

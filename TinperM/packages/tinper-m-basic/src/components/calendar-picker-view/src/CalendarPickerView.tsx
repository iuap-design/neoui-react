import React, { useImperativeHandle, useState, } from 'react'
import { mergeProps } from '@utils/WithDefaultProps'
import { withNativeProps } from '@utils/NativeProps'
import WebUI from '@utils/UpdatePrefixs';
import { useConfig } from '@components/config-provider/src'
import { usePropsValue } from '@hooks/UsePropsValue';
import { convertPageToDate, convertValueToRange, DateRange, Page, } from './Convert'
import {
  addMonths,
  eachMonthOfInterval,
  endOfDay,
  getYear,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfDay,
  startOfMonth
} from 'date-fns';
import { isNull, isUndefined } from 'lodash';
import { getHumanMonth, isSameDayInRange } from '@components/calendar/src/DateUtils';
import CalendarDay from './CalendarDay';
import type { CalendarPickerViewProps } from './iCalendarPickerView';
import { getWeekDays } from './utils/GetWeekDays';
import { getLocaleDate } from '@hooks/UseLocaleDate';


export type CalendarRef = {
  jumpTo: (page: Page | ((page: Page) => Page)) => void
  jumpToToday: () => void
  getDateRange: () => DateRange
}


const defaultProps = {
  weekStartsOn: 'Sunday',
  defaultValue: null as DateRange,
  allowClear: true,
  selectionMode: 'single',

}

const CalendarPickerView = React.forwardRef<CalendarRef, CalendarPickerViewProps>((p, ref) => {
  const today = new Date()
  const props = mergeProps(defaultProps, p)
  const { fieldid, clsPrefix } = props
  const classPrefix = `${clsPrefix}-calendar-picker-view`

  const { locale } = useConfig()
  const markItems = [...locale.Calendar.markItems]


  if (props.weekStartsOn === 'Sunday') {
    const item = markItems.pop()
    if (item) markItems.unshift(item)
  }

  const [dateRange, setDateRange] = usePropsValue<DateRange>({
    value: isUndefined(props.value) ? undefined : convertValueToRange(props.selectionMode, props.value),
    defaultValue: convertValueToRange(props.selectionMode, props.defaultValue),
    onChange: v => {
      if (props.selectionMode === 'single') {
        props.onChange?.(v ? v[0] : null)
      } else if (props.selectionMode === 'range') {
        props.onChange?.(v)
      }
    },
  })


  const [current, setCurrent] = useState(() =>
    startOfDay(dateRange ? dateRange[0] : today)
  )

  useImperativeHandle(ref, () => ({
    jumpTo: pageOrPageGenerator => {
      let page: Page
      if (typeof pageOrPageGenerator === 'function') {
        page = pageOrPageGenerator({
          year: getYear(current),
          month: getHumanMonth(current),
        })
      } else {
        page = pageOrPageGenerator
      }
      setCurrent(convertPageToDate(page))
    },
    jumpToToday: () => {
      setCurrent(startOfDay(today))
    },

    getDateRange: () => dateRange
  }), [])



  const maxDay = props.max ? endOfDay(props.max) : addMonths(current, 6)
  const minDay = props.min ? startOfDay(props.min) : startOfMonth(current)


  function renderCells(value: Date) {


    const days = getWeekDays(value, props.weekStartsOn)



    return days.map((day, i) => {
      const disabled = props.shouldDisableDate
        ? props.shouldDisableDate(day)
        : (!isNull(maxDay) && isAfter(day, maxDay)) || (!isNull(minDay) && isBefore(day, minDay))

      const inThisMonth = isSameMonth(day, value)
      const isSameToday = isSameDay(today, day)
      let isSelect = false
      let isBegin = false
      let isEnd = false
      let isSelectRowBegin = false
      let isSelectRowEnd = false
      if (dateRange) {
        const [begin, end] = dateRange
        isSelect = isWithinInterval(day, {
          start: startOfDay(begin),
          end: endOfDay(end)
        })
        isBegin = isSameDay(begin, day)
        isEnd = isSameDay(end, day)
        isSelectRowBegin = isSelect && i % 7 === 0 && !isBegin
        isSelectRowEnd = isSelect &&  i % 7 === 6 && !isEnd
      }
      const onCalendarDayClick = () => {

        if (props.selectionMode === undefined || disabled) return
        const inThisMonth = isSameMonth(day, current)

        // !inThisMonth && setCurrent(startOfMonth(day))


        const shouldClear = () =>
          props.allowClear
          && isSameDayInRange(day, dateRange)


        if (shouldClear()) {
          setDateRange(null)
          return
        }

        if (props.selectionMode === 'single') {
          setDateRange([day, day])
        } else if (props.selectionMode === 'range') {
          if (!dateRange) {
            setDateRange([day, day])
            return
          }
          const [begin, end] = dateRange
          if (isSameDay(begin, end)) {
            const anotherDay = begin
            setDateRange(isBefore(day, anotherDay) ? [day, anotherDay] : [anotherDay, day])
          } else {
            setDateRange([day, day])
          }
        }

      }

      const renderTop = () => {
        if (props.renderTop) {

          return props.renderTop(day)
        }

        if (props.selectionMode === 'range') {
          if (isBegin)
            return locale.Calendar.start
          if (isEnd)
            return locale.Calendar.end

        }

        if (isSameToday)
          return locale.Calendar.today


      }
      return (
        <CalendarDay isSelectRowBegin={isSelectRowBegin} isSelectRowEnd={isSelectRowEnd} inThisMonth={inThisMonth} isEnd={isEnd} isBegin={isBegin} isSelect={isSelect} isSameToday={isSameToday} onClick={onCalendarDayClick} key={day.valueOf()}
          classPrefix={classPrefix} disabled={disabled}>
          <div className={`${classPrefix}-cell-top`}>
            {renderTop()}
          </div>
          <div className={`${classPrefix}-cell-date`}>
            {props.renderDate ? props.renderDate(day) : day.getDate()}
          </div>
          <div className={`${classPrefix}-cell-bottom`}>
            {props.renderBottom?.(day)}
          </div>
        </CalendarDay>
      )
    })
  }




  const header = (
    <div className={`${classPrefix}-header`}>
      {props.title ?? locale.Calendar.title}
    </div>
  )

  const body =  (
    <div className={`${classPrefix}-body`}>
      {eachMonthOfInterval({ start: minDay, end: maxDay }).map(date => {
        const renderMap = {
          year: getYear(date),
          month: getHumanMonth(date),
        }
        return (
          <div key={`${renderMap.year}-${renderMap.month}`}>
            <div className={`${classPrefix}-title`}>
              {getLocaleDate(date, locale)}
            </div>
            <div className={`${classPrefix}-cells`}>
              {renderCells(date)}
            </div>
          </div>
        )

      })}
    </div>

  )


  const mark = (
    <div className={`${classPrefix}-mark`}>
      {markItems.map((item, index) => (
        <div key={index} className={`${classPrefix}-mark-cell`}>
          {item}
        </div>
      ))}
    </div>
  )


  return withNativeProps(
    props,
    <div className={classPrefix} fieldid={fieldid}>
      {header}
      {mark}
      {body}
    </div>
  )
})









export default WebUI({ defaultProps })(CalendarPickerView)

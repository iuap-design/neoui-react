import React from 'react'

import { useConfig } from '@components/config-provider/src'
import { withNativeProps } from '@utils/NativeProps'
import WebUI from '@utils/UpdatePrefixs'
import {
  addWeeks,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  getWeeksInMonth,
  startOfDay,
  startOfMonth,
  startOfWeek
} from 'date-fns'
import { ArrowLeft } from './ArrowLeft'
import { ArrowLeftDouble } from './ArrowLeftDouble'
import CalendarBody from './CalendarBody'
import { useCalendarContext } from './CalendarContext'
import CalendarHeader from './CalendarHeader'
import { DateRange, Page } from './Convert'
import classNames from 'classnames';

export type DateType = 'month' | 'year';
export type DateAction = 'subtract' | 'add';

const lineOfCells = 6


export type CalendarRef = {
  jumpTo: (page: Page | ((page: Page) => Page)) => void
  jumpToToday: () => void
}




const defaultProps = {
  weekStartsOn: 'Sunday',
  defaultValue: null as DateRange,
  allowClear: true,
  prevMonthButton: <ArrowLeft />,
  prevYearButton: <ArrowLeftDouble />,
  nextMonthButton: <ArrowLeft />,
  nextYearButton: <ArrowLeftDouble />,
  mode: 'day'
}

const CalendarDay = () => {


  const props = useCalendarContext()
  const { classPrefix, current  } = props

  const maxDay = props.max ? endOfDay(props.max) : null
  const minDay = props.min ? startOfDay(props.min) : null


  const weekStartsOn = props.weekStartsOn === 'Monday' ? 1 : 0
  const start = startOfWeek(startOfMonth(current), { weekStartsOn })
  const interval = eachDayOfInterval({
    start,
    end: addWeeks(
      endOfWeek(endOfMonth(current), { weekStartsOn }),
      getWeeksInMonth(current, { weekStartsOn }) < lineOfCells ? 1 : 0)
  })






  return withNativeProps(
    props,
    <div className={classPrefix}>
      <CalendarHeader  />
      <CalendarMark />
      <CalendarBody isRowBeginFn={i => i % 7 == 0} isRowEndFn={i => i % 7 == 6}   minDay={minDay as Date} maxDay={maxDay as Date}  interval={interval}   />

    </div>
  )
}


function CalendarMark() {
  const { classPrefix, weekStartsOn, showWeekNumber } = useCalendarContext()
  const { locale } = useConfig()
  const markItems = [...locale.Calendar.markItems]


  if (weekStartsOn === 'Sunday') {
    const item = markItems.pop()
    if (item) markItems.unshift(item)
  }

  return (
    <div className={classNames(`${classPrefix}-mark`, { [`${classPrefix}-mark-show-week-number`]: showWeekNumber })} >
      {showWeekNumber &&  <div aria-hidden={true} className={`${classPrefix}-mark-cell`}/> }

      {markItems.map((item, index) => (
        <div key={index} className={`${classPrefix}-mark-cell`}>
          {item}
        </div>
      ))}

    </div>
  )

}


export default WebUI({ defaultProps })(CalendarDay)

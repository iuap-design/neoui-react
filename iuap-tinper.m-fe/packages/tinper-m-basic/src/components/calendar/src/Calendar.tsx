import React, { useImperativeHandle, useState } from 'react'

import CalendarMonth from '@components/calendar/src/CalendarMonth'
import { usePropsValue } from '@hooks/UsePropsValue'
import { mergeProps } from '@utils/WithDefaultProps'
import { useUpdateEffect } from 'tne-fw-fe/hooks'
import { getYear, startOfDay, startOfMonth } from 'date-fns'
import { isUndefined } from 'lodash'
import { ArrowLeft } from './ArrowLeft'
import { ArrowLeftDouble } from './ArrowLeftDouble'
import { CalendarProvider } from './CalendarContext'
import CalendarDay from './CalendarDay'
import CalendarQuarter from './CalendarQuarter'
import { convertPageToDate, convertValueToRange, DateRange, Page } from './Convert'
import { getHumanMonth } from './DateUtils'
import type { CalendarProps } from './iCalendar'
import { formatWeekNumber } from '@components/calendar/src/formatWeekNumber';

export type DateType = 'month' | 'year';
export type DateAction = 'subtract' | 'add';



export type CalendarRef = {
  jumpTo: (page: Page | ((page: Page) => Page)) => void
  jumpToToday: () => void
}




const defaultProps = {
  weekStartsOn: 'Sunday',
  defaultValue: null,
  allowClear: true,
  prevMonthButton: <ArrowLeft />,
  prevYearButton: <ArrowLeftDouble />,
  nextMonthButton: <ArrowLeft />,
  nextYearButton: <ArrowLeftDouble />,
  mode: 'day',
  showWeekNumber: false,
  formatWeekNumber: formatWeekNumber
}

export type MergedCalendarProps = CalendarProps & Required<Pick<CalendarProps, keyof typeof defaultProps>>

const modeComponentMap = {
  month: CalendarMonth,
  day: CalendarDay,
  quarter: CalendarQuarter
}

const Calendar = React.forwardRef<CalendarRef, CalendarProps>((p, ref) => {
  const props = mergeProps(defaultProps, p) as MergedCalendarProps


  const { clsPrefix } = props
  const classPrefix = `${clsPrefix}-calendar`

  const CalendarMode = modeComponentMap[props.mode]

  const today = new Date()
  const [dateRange, setDateRange] = usePropsValue<DateRange>({
    value: isUndefined(props.value) ? undefined : convertValueToRange(props.selectionMode, props.value, props.mode),
    defaultValue: convertValueToRange(props.selectionMode, props.defaultValue, props.mode),
    onChange: v => {
      if (props.selectionMode === 'single') {
        props.onChange?.(v ? v[0] : null)
      } else if (props.selectionMode === 'range') {
        props.onChange?.((v?.slice(0, 2) ?? null) as [Date, Date] | null, v?.[2])
      }
    },
  })



  const [current, setCurrent] = useState(() =>
    startOfMonth(dateRange ? dateRange[0] : today)
  )


  useUpdateEffect(() => {
    props.onPageChange?.(getYear(current), getHumanMonth(current))
  }, [current])

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
  }), [])


  return (<CalendarProvider {...props} current={current} setCurrent={setCurrent} dateRange={dateRange} setDateRange={setDateRange}  classPrefix={classPrefix} >
    <CalendarMode ref={ref}  />
  </CalendarProvider>)


})





export default Calendar

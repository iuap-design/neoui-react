import classNames from 'classnames';
import {
  endOfDay,
  getWeek,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isSameYear,
  isWithinInterval,
  startOfDay,
  startOfMonth
} from 'date-fns';
import { isNull } from 'lodash';
import { PropsWithChildren, Fragment } from 'react';
import { useCalendarContext } from './CalendarContext';
import { DateRange } from './Convert';
import { isSameDayInRange, shouldChangePage } from './DateUtils';
import { CalendarProps } from './iCalendar';
import { getLocaleDate2 } from '@hooks/UseLocaleDate';
import { useConfig } from '@components/config-provider/src';
import WeekNumber from '@components/calendar/src/WeekNumber';
import { isWeekInRange } from '@components/calendar/src/WeekUtils';

type Props = {
  interval: Date[]
  minDay: Date
  maxDay: Date
  isRowBeginFn: (i: number) => boolean
  isRowEndFn: (i: number) => boolean
}

const CalendarBody = (props: Props) => {
  const {
    interval,
    minDay,
    maxDay,
    isRowBeginFn,
    isRowEndFn
  } = props
  const {
    current,
    showWeekNumber,
    formatWeekNumber,
    setCurrent,
    dateRange,
    setDateRange,
    mode,
    fieldid,
    classPrefix,
    shouldDisableDate,
    minPage,
    maxPage,
    renderDate,
    renderLabel,
    selectionMode,
    allowClear,
    weekStartsOn
  } = useCalendarContext()

  const { locale } = useConfig()

  const aWeekStartsOn = weekStartsOn === 'Monday' ? 1 : 0


  function renderCells() {


    return interval.map((day, i) => {
      const disabled = shouldDisableDate
        ? shouldDisableDate(day)
        : (!isNull(maxDay) && isAfter(day, maxDay)) || (!isNull(minDay) && isBefore(day, minDay))

      const weekNumber = getWeek(day)
      const isWholeWeekSelected =  showWeekNumber && i % 7 === 0  && dateRange && isWeekInRange(day, { start: dateRange[0], end: dateRange[1] }, aWeekStartsOn)

      const onCalendarDayClick = () => {

        if (mode === 'day') {
          const shouldNextPageChange = isAfter(day, current) ? shouldChangePage({
            current,
            minPage,
            maxPage,
            type: 'month',
            action: 'add',
            num: 1
          }) : true


          const shouldPrevPageChange = isBefore(day, current) ? shouldChangePage({
            current,
            minPage: minPage,
            maxPage: maxPage,
            type: 'month',
            action: 'subtract',
            num: 1
          }) : true


          if (!shouldNextPageChange) return
          if (!shouldPrevPageChange) return

        }

        if (selectionMode === undefined || disabled) return


        if (mode === 'day' && !isSameMonth(day, current))
          setCurrent(startOfMonth(day))


        const shouldClear = () =>
          allowClear
          && isSameDayInRange(day, dateRange)


        if (shouldClear()) {
          setDateRange(null)
          return
        }

        if (selectionMode === 'single') {
          setDateRange([day, day])
        } else if (selectionMode === 'range') {
          if (!dateRange) {
            setDateRange([day, day, day])
            return
          }
          const [begin, end] = dateRange
          if (isSameDay(begin, end)) {
            const anotherDay = begin
            setDateRange(isBefore(day, anotherDay) ? [day, anotherDay, day] : [anotherDay, day, day])
          } else {
            setDateRange([day, day, day])
          }
        }

      }
      return (
        <Fragment key={i}>
          {showWeekNumber && i % 7 === 0 && <WeekNumber active={isWholeWeekSelected ?? false}>{formatWeekNumber(weekNumber)}</WeekNumber>}
          <CalendarCell
            mode={mode} fieldid={fieldid} current={current} dateRange={dateRange} onClick={onCalendarDayClick}
            key={day.valueOf()} day={day} isRowStart={isRowBeginFn(i)} isRowEnd={isRowEndFn(i)}
            classPrefix={classPrefix} disabled={disabled}>

            <div className={`${classPrefix}-cell-top`}>
              {renderDate ? renderDate(day) : mode === 'day' ? day.getDate() : mode === 'month' ? getLocaleDate2(day, 'L', locale) : getLocaleDate2(day, 'qqqq', locale)}
            </div>
            <div className={`${classPrefix}-cell-bottom`}>
              {renderLabel?.(day)}
            </div>
          </CalendarCell>
        </Fragment>

      )
    })
  }

  return (<div className={`${classPrefix}-cells`}
    style={{ padding: mode === 'quarter' ? ' 0.16rem 1.24rem ' : '0.16rem 0.24rem' }}>{renderCells()}</div>)
};


function CalendarCell({
  day,
  classPrefix,
  current,
  children,
  disabled,
  dateRange,
  onClick = () => undefined,
  fieldid,
  mode,
  isRowStart,
  isRowEnd
}: PropsWithChildren<{
  day: Date,
  current: Date,
  classPrefix: string,
  disabled: boolean,
  dateRange?: DateRange,
  onClick?: () => void,
  fieldid?: string,
  isRowStart: boolean,
  isRowEnd: boolean,
}> & Pick<CalendarProps, 'mode'>) {

  const today = new Date()


  const inThisMode = mode === 'day' ? isSameMonth(day, current) : isSameYear(day, current)

  const isSameToday = isSameDay(today, day)
  let isSelect = false
  let isBegin = false
  let isEnd = false
  let isSelectRowBegin = false
  let isSelectRowEnd = false

  const { showWeekNumber } = useCalendarContext()
  const flex = showWeekNumber ? '1 calc(100% / 8)' : '1 calc(100% / 7)'
  if (dateRange) {
    const [begin, end] = dateRange
    isSelect = isWithinInterval(day, {
      start: startOfDay(begin),
      end: endOfDay(end)
    })
    isBegin = isSameDay(begin, day)
    isEnd = isSameDay(end, day)
    isSelectRowBegin = isSelect && isRowStart && !isBegin
    isSelectRowEnd = isSelect && isRowEnd && !isEnd
  }
  const dayProps = { 'aria-selected': isSelect ? true : undefined }
  let fieldidSuffix;
  if (isBegin && isEnd) fieldidSuffix = 'selected-single'
  if (isBegin) fieldidSuffix = 'selected-begin';
  if (isEnd) fieldidSuffix = 'selected-end';
  const month = day.getMonth()
  return (
    <>

      {mode === 'month' && (
        <>
          <div className={classNames(
            `${classPrefix}-cell`,
            { [`${classPrefix}-cell-selected`]: isSelect && !isBegin && month % 3 !== 0 }
          )}/>
          {month % 3 === 0 && month !== 0 &&
            <div className={classNames(
              `${classPrefix}-cell`,
            )}/>
          }
        </>
      )}
      <div
        onClick={onClick}
        role="gridcell"
        {...dayProps}
        style={mode == 'quarter' ? {
          flex: '1 50%',
          position: 'relative',
          height: '1rem'
        } : {
          flex: flex,
          position: 'relative'
        }}
        className={classNames(
          `${classPrefix}-cell`,
          (disabled || !inThisMode) && `${classPrefix}-cell-disabled`,
          inThisMode && {
            [`${classPrefix}-cell-today`]: isSameToday,
            [`${classPrefix}-cell-selected`]: isSelect,
            [`${classPrefix}-cell-selected-begin`]: isBegin,
            [`${classPrefix}-cell-selected-end`]: isEnd,
            [`${classPrefix}-cell-selected-single`]: isEnd && isBegin,
            [`${classPrefix}-cell-selected-row-begin`]: isSelectRowBegin,
            [`${classPrefix}-cell-selected-row-end`]: isSelectRowEnd,
          }
        )}
        fieldid={fieldidSuffix ? `${fieldid}-${fieldidSuffix}` : undefined}

      >
        <div className={`${classPrefix}-cell-wrapper`}>
          <div className={`${classPrefix}-cell-content`} >
            {children}
          </div>
        </div>
      </div>

      {mode === 'month' && month === 11 && (
        <>
          <div className={classNames(
            `${classPrefix}-cell`,
          )}/>
        </>
      )}
    </>

  )
}


export default CalendarBody;

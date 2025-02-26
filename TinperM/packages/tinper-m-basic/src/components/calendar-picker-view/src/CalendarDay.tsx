import type { PropsWithChildren } from 'react';
import React from 'react';
import classNames from 'classnames';

function CalendarDay({
  classPrefix,
  children,
  disabled,
  isBegin,
  isEnd,
  isSelect,
  isSelectRowBegin,
  isSelectRowEnd,
  inThisMonth,
  isSameToday,
  onClick = () => undefined,
  fieldid
}: PropsWithChildren<{
  classPrefix: string,
  disabled: boolean,
  inThisMonth?: boolean,
  isSelect?: boolean,
  isBegin?: boolean,
  isEnd?: boolean,
  isSelectRowBegin?: boolean,
  isSelectRowEnd?: boolean,
  isSameToday?: boolean,
  onClick?: () => void,
  fieldid?: string
}>) {


  const dayProps = { 'aria-selected': isSelect ? true : undefined }
  let fieldidSuffix;
  if (isBegin && isEnd) fieldidSuffix = 'selected-single'
  if (isBegin) fieldidSuffix = 'selected-begin';
  if (isEnd) fieldidSuffix = 'selected-end';

  return (
    <div
      onClick={onClick}
      role="gridcell"
      {...dayProps}
      className={classNames(
        `${classPrefix}-cell`,
        disabled && `${classPrefix}-cell-disabled`,
        inThisMonth && {
          [`${classPrefix}-cell-today`]: isSameToday,
          [`${classPrefix}-cell-selected`]: isSelect,
          [`${classPrefix}-cell-selected-begin`]: isBegin,
          [`${classPrefix}-cell-selected-end`]: isEnd,
          [`${classPrefix}-cell-selected-single`]: isEnd && isBegin,
          [`${classPrefix}-cell-selected-row-begin`]: isSelectRowBegin,
          [`${classPrefix}-cell-selected-row-end`]: isSelectRowEnd,
        }
      )}
      fieldid={fieldidSuffix ?`${fieldid}-${fieldidSuffix}` : undefined}


    >
      <div className={`${classPrefix}-cell-wrapper`}>
          <div className={`${classPrefix}-cell-content`} >
          {inThisMonth && children}
        </div>
      </div>
    </div>
  )
}

export default CalendarDay;

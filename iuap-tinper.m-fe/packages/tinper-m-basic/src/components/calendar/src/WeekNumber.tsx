import React from 'react';
import classNames from 'classnames';

type WeekNumberProps = {
  active?: boolean;
} & React.JSX.IntrinsicElements['div']
const WeekNumber = (props: WeekNumberProps) => (
  <div className={classNames(
    'mui-calendar-cell week-number',
    { 'week-number-active': props.active }
  )} style={{ flex: '1 calc(100% / 8)', position: 'relative' }}
  {...props} />
)
;

export default WeekNumber;

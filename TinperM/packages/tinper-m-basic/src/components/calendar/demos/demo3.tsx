/**
 * @title 显示周
 * @description 显示周
 */
import { Calendar } from '@tinper/m';
import React, { CSSProperties, useState } from 'react';
import { endOfWeek, startOfWeek } from 'date-fns';


function ShowWeek() {

  return (
    <Calendar  showWeekNumber   />

  )
}

function FormatWeek() {

  const style:CSSProperties = {display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}

  return (
      <Calendar formatWeekNumber={weekNumber => {
        return <span style={style}>{weekNumber}<span>周</span></span>
      } } showWeekNumber selectionMode='range'  />

  )
}

function WeekSelection() {

    const [value, setValue] = useState<[Date, Date]>()
  const style:CSSProperties = {display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}

  return (
      <Calendar showWeekNumber formatWeekNumber={weekNumber => {
        return <span style={style}>{weekNumber}<span>周</span></span>
      } } value={value} onChange={(_,triggerDate) => {
        triggerDate  && setValue([
          startOfWeek(triggerDate),
          endOfWeek(triggerDate)
        ] )
      }}  selectionMode='range'  />

    )

}





const Demo = () => (
  <div >
    <>
      <h3>显示周</h3>
      <ShowWeek/>
    </>
    <>
      <h3>格式化周</h3>
      <FormatWeek/>
    </>
    <>
      <h3>选择整个周</h3>
      <WeekSelection/>
    </>
  </div>
)

export default Demo


/**
 * @title 周一作为第一天
 * @description 周一作为第一天
 */

import React, {useState} from 'react'
import { CalendarPickerView } from '@tinper/m'




export default () => {
  const [date, setDate] = useState(null)
  return (
    <CalendarPickerView weekStartsOn="Monday" value={date} onChange={setDate} />
  )
}

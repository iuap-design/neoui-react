/**
 * @title 12小时制
 * @description 12小时制
 */
import React from 'react'
import {DatePickerView, PickerColumn, PickerView} from '@tinper/m'

const now = new Date()



export default () => {
  return (
    <div>
      <h3>12小时制</h3>
      <div >
        <DatePickerView defaultValue={now} use12hours precision='minute'/>
      </div>
    </div>
  )
}

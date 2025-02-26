import './DatePicker.less'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import DatePicker from './DatePicker'
import { prompt } from './Prompt'

export type { DatePickerProps } from './iDatePicker'
export type { DatePickerFilter } from './DatePickerUtils'


export default attachPropertiesToComponent(DatePicker, { prompt, })

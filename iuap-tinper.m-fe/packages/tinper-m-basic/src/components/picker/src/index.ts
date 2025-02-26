import './Picker.less'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import  Picker  from './Picker'
import { prompt } from './prompt'

export type { PickerProps } from './iPicker'

export type {
  PickerValue,
  PickerColumnItem,
  PickerColumn,
  PickerValueExtend,
} from '@common/picker-view/src'

export default attachPropertiesToComponent(Picker, { prompt, })

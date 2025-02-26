import { prompt } from './prompt'
import { CascadePicker } from './CascadePicker'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent';

export type {
  CascadePickerProps,
  CascadePickerRef,
  CascadePickerOption,
} from './iCascadePicker'

export default attachPropertiesToComponent(CascadePicker, { prompt, })

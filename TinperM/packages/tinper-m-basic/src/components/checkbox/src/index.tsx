import './Checkbox.less'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import { Group } from './Group'
import Checkbox from './Checkbox'

export type { CheckboxValue, CheckboxProps, CheckboxRef, CheckboxGroupProps } from './iCheckbox'

export default attachPropertiesToComponent(Checkbox, { Group })

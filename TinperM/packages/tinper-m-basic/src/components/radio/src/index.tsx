import './Radio.less'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import Group from './Group'
import Radio from './Radio'
import Control from './RadioControl'

export type { RadioProps, RadioValue, RadioGroupProps } from './iRadio'

// export default RadioControl
export default attachPropertiesToComponent(Radio, { Group, Control })

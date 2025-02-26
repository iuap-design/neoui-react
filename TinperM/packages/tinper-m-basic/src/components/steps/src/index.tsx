import './Steps.less'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import { Step } from './Step'
import Steps from './Steps'

export type { StepsProps, StepProps } from './iSteps'

export default attachPropertiesToComponent(Steps, { Step })

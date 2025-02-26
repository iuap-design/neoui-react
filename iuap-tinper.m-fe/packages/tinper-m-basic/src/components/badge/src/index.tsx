import './Badge.less'
import Badge, { dot } from './Badge'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
export type { BadgeProps } from './iBadge'

export default attachPropertiesToComponent(Badge, { dot })

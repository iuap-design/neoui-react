import './Avatar.less'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import Avatar from './Avatar'
import AvatarGroup from './AvatarGroup'

export type { AvatarProps } from './iAvatar'

export default attachPropertiesToComponent(Avatar, { Group: AvatarGroup, })

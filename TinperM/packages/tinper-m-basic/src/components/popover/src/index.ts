import './Popover.less'
import './popover-menu/PopoverMenu.less'
import PopoverMenu from './popover-menu/PopoverMenu'
import { Popover } from './Popover'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent';

export type { PopoverProps, PopoverRef } from './iPopover'
export type { PopoverMenuProps, Action } from './popover-menu/iPopoverMenu'
export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'

export type DeprecatedPlacement =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom'


export default attachPropertiesToComponent(Popover, { Menu: PopoverMenu, })

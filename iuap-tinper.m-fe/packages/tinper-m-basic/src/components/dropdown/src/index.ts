import './Dropdown.less'
import Dropdown from './Dropdown'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import Item from './item'

export type { DropdownItemProps } from './item'

export default attachPropertiesToComponent(Dropdown, { Item, })
export * from './iDropdown';

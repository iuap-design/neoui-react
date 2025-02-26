import './SideBar.less'
import SideBar from './SideBar'
import SideBarItem from './SideBarItem'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'

export type { SideBarProps, SideBarItemProps } from './iSideBar'

export default attachPropertiesToComponent(SideBar, {
  Item: SideBarItem,
})

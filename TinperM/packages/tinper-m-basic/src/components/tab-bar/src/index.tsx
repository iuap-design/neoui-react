import './TabBar.less'
import TabBar, { TabBarItem } from './TabBar'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'

export type { TabBarProps, TabBarItemProps } from './iTabBar'

export default attachPropertiesToComponent(TabBar, {
  Item: TabBarItem,
})

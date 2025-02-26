import './Tabs.less'
import { Tab } from './Tabs'
import Tabs from './Tabs'
export type { TabsProps, TabProps } from './iTabs'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
export default attachPropertiesToComponent(Tabs, { Tab, })

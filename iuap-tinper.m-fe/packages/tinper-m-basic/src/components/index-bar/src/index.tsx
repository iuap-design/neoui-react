import './IndexBar.less'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import { Panel } from './Panel'
import IndexBar from './IndexBar'

export type { IndexBarProps, IndexBarRef } from './iIndexBar'
export type { IndexBarPanelProps } from './iIndexBar'

export default attachPropertiesToComponent(IndexBar, { Panel, })

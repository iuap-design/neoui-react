import './ActionSheet.less'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import { showActionSheet } from './ActionSheet'
import ActionSheet from './ActionSheet'
export type { ActionSheetShowHandler, } from './ActionSheet'

export type {
  Action,
  ActionSheetProps,
} from './iActionSheet'

export default attachPropertiesToComponent(ActionSheet, { show: showActionSheet, })

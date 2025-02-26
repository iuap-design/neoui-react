import './CascaderView.less'
import CascaderView  from './CascaderView'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import { optionSkeleton } from './OptionSkeleton'

export type {
  CascaderViewProps,
  CascaderValue,
  CascaderValueExtend,
  CascaderOption,
} from './iCascaderView'

export default attachPropertiesToComponent(CascaderView, { optionSkeleton, })

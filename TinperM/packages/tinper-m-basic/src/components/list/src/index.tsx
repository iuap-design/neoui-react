import './List.less'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import List from './List'
import ListItem from './ListItem'

export type { ListProps, ListItemProps } from './iList'

export default attachPropertiesToComponent(List, { Item: ListItem, })

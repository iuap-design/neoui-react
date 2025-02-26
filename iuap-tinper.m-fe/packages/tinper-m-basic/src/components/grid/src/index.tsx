import './Grid.less'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import Grid from './Grid'
import GridItem from './GridItem'

export type { GridProps, GridItemProps } from './iGrid'

export default attachPropertiesToComponent(Grid, { Item: GridItem })

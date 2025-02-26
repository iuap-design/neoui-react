import './CheckList.less';
import { CheckList } from './CheckList';
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent';
import { CheckListItem } from './CheckListItem';

export * from './Types'
export default attachPropertiesToComponent(CheckList, { Item: CheckListItem, });

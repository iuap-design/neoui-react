import { NativeProps } from '@utils/NativeProps';
import { ListItemProps } from '../../list/src/iList';

export * from './iCheckList'

export type CheckListValue = string | number;

export type CheckListItemProps = Pick<
  ListItemProps,
  | 'title'
  | 'children'
  | 'description'
  | 'prefix'
  | 'disabled'
  | 'onClick'
  | 'style'
> & {
  value: CheckListValue;
  readOnly?: boolean;
  clsPrefix?: string;
} & NativeProps;

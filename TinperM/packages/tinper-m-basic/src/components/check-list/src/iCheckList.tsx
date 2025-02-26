import { NativeProps } from '@utils/NativeProps';
import type { ReactNode } from 'react';
import { ListProps } from '../../list/src/iList';
import { CheckListValue } from './Types';

export type CheckListProps = Pick<
  ListProps,
  'mode' | 'style' | 'fieldid' | 'clsPrefix' | 'children'
> & {
  defaultValue?: CheckListValue[];
  value?: CheckListValue[];
  onChange?: (val: CheckListValue[]) => void;
  multiple?: boolean;
  activeIcon?: ReactNode;
  extra?: (active: boolean) => ReactNode;
  extraAlign?: 'left' | 'right';
  disabled?: boolean;
  readOnly?: boolean;
  children?: ReactNode;
  deselectable?: boolean;
} & NativeProps<'--checkicon-color'>;


type CheckListPropsCoverage = {
  defaultValue?: CheckListValue[];
  value?: CheckListValue[];
  onChange?: (val: CheckListValue[]) => void;
  multiple?: boolean;
  activeIcon?: ReactNode;
  extra?: (active: boolean) => ReactNode;
  extraAlign?: 'left' | 'right';
  disabled?: boolean;
  readOnly?: boolean;
  children?: ReactNode;
}

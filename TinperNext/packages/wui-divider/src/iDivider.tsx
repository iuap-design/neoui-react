import { BaseProps } from '../../wui-core/src/iCore';

export type DividerType = 'horizontal' | 'vertical';
export type DividerOrientation = 'left' | 'right' | 'center';

export interface DividerProps extends BaseProps {
  type?: DividerType;
  orientation?: DividerOrientation;
  dashed?: boolean;
  lineType?: 'solid' | 'dashed' | 'dotted' | 'double';
}
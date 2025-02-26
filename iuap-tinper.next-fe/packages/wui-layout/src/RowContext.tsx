import {createContext, Context} from 'react';
import { ScreenMap } from '../../wui-core/src/LayoutUtils';

export interface RowContextState {
    gutter?: [number, number];
    wrap?: boolean;
    supportFlexGap?: boolean;
    screens?: ScreenMap;
  }


const RowContext: Context<RowContextState> = createContext({});

export default RowContext;

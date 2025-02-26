import { CheckListValue } from '.';
import type { ReactNode } from 'react';
import { createContext } from 'react';

export const CheckListContext = createContext<{
  value: CheckListValue[];
  check: (val: CheckListValue) => void;
  uncheck: (val: CheckListValue) => void;
  activeIcon?: ReactNode;
  extra?: (active: boolean) => ReactNode;
  extraAlign?: 'left' | 'right';
  clsPrefix?: string;
  disabled?: boolean;
  readOnly?: boolean;
  deselectable?: boolean;
  multiple?: boolean;
    } | null>(null);

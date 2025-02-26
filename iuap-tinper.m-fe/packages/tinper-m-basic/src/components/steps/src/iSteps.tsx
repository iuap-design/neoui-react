import type { BaseProps } from '@utils/iCore';
import { NativeProps } from '@utils//NativeProps'
import React, { ReactNode } from 'react';

type Direction = 'horizontal' | 'vertical'

export interface StepsProps extends BaseProps, NativeProps<
  | '--title-font-size'
  | '--description-font-size'
  | '--indicator-margin-right'
  | '--icon-size'
  > {
  className?: string
  clsPrefix?: string
  fieldid?: string
  style?: React.CSSProperties
  current?: number
  direction?: Direction
  children?: ReactNode
}

export interface StepProps extends BaseProps, NativeProps {
  title?: ReactNode
  description?: ReactNode
  icon?: ReactNode
  status?: 'wait' | 'process' | 'finish' | 'error'
  clsPrefix?: string,
  fieldid?: string,
  id?: string,
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  style?: React.CSSProperties
}


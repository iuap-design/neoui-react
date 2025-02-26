/** Accordion.tsx */
import React, { ReactNode } from 'react'
import { NativeProps } from '@utils/NativeProps'

export interface AccordionPanelProps extends NativeProps {
  key: string
  title: ReactNode
  disabled?: boolean
  forceRender?: boolean
  destroyOnClose?: boolean
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void
  arrow?: ReactNode | ((active: boolean) => ReactNode)
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
  clsPrefix?: string
  fieldid?: string
  contentStyle?: React.CSSProperties
}

export interface AccordionProps extends NativeProps {
  accordion?: false
  activeKey?: string[]
  defaultActiveKey?: string[]
  onChange?: (activeKey: string[]) => void
  arrow?: ReactNode | ((active: boolean) => ReactNode)
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
  clsPrefix?: string
  fieldid?: string
}



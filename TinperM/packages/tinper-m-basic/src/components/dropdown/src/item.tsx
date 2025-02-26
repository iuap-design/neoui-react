import classNames from 'classnames'
import type { FC, ReactNode } from 'react'
import React from 'react'
import { NativeProps, withNativeProps } from '@utils/NativeProps'
import { useShouldRender } from '@utils/ShouldRender'
import ChevronDown from '@tinper/m-icons/lib/cjs/ChevronDown'

const classPrefix = 'mui-dropdown-item'
export type DropdownItemProps = {
  key: string
  title: ReactNode
  active?: boolean
  highlight?: boolean
  forceRender?: boolean
  destroyOnClose?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  arrow?: ReactNode
  children?: ReactNode
  label?: boolean
} & NativeProps

const Item: FC<DropdownItemProps> = props => {
  const cls = classNames(classPrefix, {
    [`${classPrefix}-active`]: props.active,
    [`${classPrefix}-highlight`]: props.highlight ?? props.active,
  })


  return withNativeProps(
    props,
    <div className={cls} onClick={props.onClick}>
      <div className={classNames(`${classPrefix}-title`, { [`${classPrefix}-title-label`]: props.label })}>
        <span className={`${classPrefix}-title-text`}>{props.title}</span>
        <span
          className={classNames(`${classPrefix}-title-arrow`, { [`${classPrefix}-title-arrow-active`]: props.active, })}
        >
          {props.arrow === undefined ? <ChevronDown /> : props.arrow}
        </span>
      </div>
    </div>
  )
}

export default Item

type DropdownItemChildrenWrapProps = {
  onClick?: () => void
} & Pick<
  DropdownItemProps,
  'active' | 'forceRender' | 'destroyOnClose' | 'children'
>
export const ItemChildrenWrap: FC<DropdownItemChildrenWrapProps> = props => {
  const { active = false } = props
  const shouldRender = useShouldRender(
    active,
    props.forceRender,
    props.destroyOnClose
  )
  const cls = classNames(`${classPrefix}-content`, { [`${classPrefix}-content-hidden`]: !active })

  return shouldRender ? (
    <div className={cls} onClick={props.onClick}>
      {props.children}
    </div>
  ) : null
}

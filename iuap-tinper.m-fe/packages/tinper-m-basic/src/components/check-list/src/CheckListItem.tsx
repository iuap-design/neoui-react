import { List } from '@tinper/m';
import { devWarning } from '@utils/DevLog';
import { withNativeProps } from '@utils/NativeProps';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { CheckListContext } from './context';
import { CheckListItemProps } from './Types';


export const CheckListItem = (props: CheckListItemProps) => {
  const context = useContext(CheckListContext)
  if (context === null) {
    devWarning(
      'CheckList.Item',
      'CheckList.Item can only be used inside CheckList.'
    )
    return null
  }

  const classPrefix = `${context.clsPrefix}-check-list-item`;
  const active = context.value.includes(props.value)
  const readOnly = props.readOnly || context.readOnly
  const defaultExtra = active ? context.activeIcon : null
  const renderExtra = context.extra ? context.extra(active) : defaultExtra
  const extra = <div className={classNames(
    `${classPrefix}-extra`,
    {
      [`${classPrefix}-extra-multiple`]: context.multiple,
      [`${classPrefix}-extra-active`]: context.multiple && active,
    }
  )}>{renderExtra}</div>
  return withNativeProps(
    props,
    <List.Item
      title={props.title}
      className={classNames(
        classPrefix,
        readOnly && `${classPrefix}-readonly`,
        active && `${classPrefix}-active`
      )}
      description={props.description}
      onClick={(e: React.MouseEvent<Element, MouseEvent>) => {
        if (readOnly) return;
        if (active) {
          context.deselectable && context.uncheck(props.value);
        } else {
          context.check(props.value);
        }
        props.onClick?.(e);
      }}
      arrow={false}
      clickable={!readOnly}
      extra={context.extraAlign === 'right' && extra}
      prefix={context.extraAlign === 'left' && extra}
      disabled={props.disabled || context.disabled}
    >
      {props.children}
    </List.Item>
  );
}

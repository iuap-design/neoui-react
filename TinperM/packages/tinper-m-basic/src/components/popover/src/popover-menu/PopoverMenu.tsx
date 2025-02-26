import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, } from 'react'
import classNames from 'classnames'
import { Popover } from '../Popover'
import type { PopoverRef } from '../index'
import type { Action, PopoverMenuProps } from './iPopoverMenu'
import WebUI from '@utils/UpdatePrefixs';


const PopoverMenu = forwardRef<PopoverRef, PopoverMenuProps>(
  (props, ref) => {

    const { clsPrefix } = props;

    const classPrefix = `${clsPrefix}-popover-menu`;
    const popoverRef = useRef<PopoverRef>(null)
    useImperativeHandle(ref, () => popoverRef.current!, [])

    const onClick = useCallback(
      (action: Action) => {
        const { onAction } = props
        onAction?.(action)
        popoverRef.current?.hide()
      },
      [props.onAction]
    )

    const overlay = useMemo(() => {
      const whetherScroll =
        props?.maxCount && props.actions.length > props?.maxCount
      const innerHeight = props?.maxCount && props?.maxCount * 48

      return (
        <div className={`${classPrefix}-list`}>
          <div
            className={classNames(`${classPrefix}-list-inner`, { [`${classPrefix}-list-scroll`]: whetherScroll, })}
            style={{ height: innerHeight, }}
          >
            {props.actions.map((action, index) => (
              <a
                key={action.key ?? index}
                style={action.style}
                className={classNames(
                  `${classPrefix}-item ${action.className}`,
                  'mui-plain-anchor',
                  { [`${classPrefix}-item-disabled`]: action.disabled }
                )}
                onClick={() => {
                  if (action.disabled) return
                  onClick(action)
                  action.onClick?.()
                }}
              >
                {action.icon && (
                  <div className={`${classPrefix}-item-icon`}>
                    {action.icon}
                  </div>
                )}
                <div className={`${classPrefix}-item-text`}>{action.text}</div>
              </a>
            ))}
          </div>
        </div>
      )
    }, [props.actions, onClick])

    return (
      <Popover
        ref={popoverRef}
        {...props}
        className={classNames(classPrefix, props.className)}
        content={overlay}
      >
        {props.children}
      </Popover>
    )
  }
)

export default WebUI()(PopoverMenu)

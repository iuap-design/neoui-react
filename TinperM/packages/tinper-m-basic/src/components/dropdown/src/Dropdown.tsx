import { useClickAway } from 'tne-fw-fe/hooks'
import classNames from 'classnames'
import type { ComponentProps, PropsWithChildren, ReactElement, } from 'react'
import React, { cloneElement, forwardRef, isValidElement, useEffect, useImperativeHandle, useRef, useState, } from 'react'
import Item, { ItemChildrenWrap } from './item'
import { withNativeProps } from '@utils/NativeProps'
import { mergeProps } from '@utils/WithDefaultProps'
import { usePropsValue } from '@hooks/UsePropsValue'
import { Popup } from '@tinper/m'
import { DropdownProps, DropdownRef } from './iDropdown';

const defaultProps = {
  defaultActiveKey: null,
  closeOnMaskClick: true,
  closeOnClickAway: false,
  getContainer: () => document.body,
  clsPrefix: 'mui',
  position: 'top',
  label: false,
}

const Dropdown = forwardRef<DropdownRef, PropsWithChildren<DropdownProps>>(
  (p, ref) => {
    const props = mergeProps(defaultProps, p)
    const classPrefix = `${props.clsPrefix}-dropdown`
    const [value, setValue] = usePropsValue({
      value: props.activeKey,
      defaultValue: props.defaultActiveKey,
      onChange: props.onChange,
    })

    const navRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    // 点击外部区域，关闭
    useClickAway(() => {
      if (!props.closeOnClickAway) return
      setValue(null)
    }, [navRef, contentRef])

    // 计算 navs 的 top 值
    const [top, setTop] = useState<number>()
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
      const container = containerRef.current
      if (!container) return
      if (value) {
        const rect = container.getBoundingClientRect()
        setTop(rect.bottom)
      }

    }, [value])

    const changeActive = (key: string | null) => {
      if (value === key) {
        setValue(null)
      } else {
        setValue(key)
      }
    }

    let popupForceRender = false
    const items: ReactElement<ComponentProps<typeof Item>>[] = []
    const navs = React.Children.map(props.children, child => {
      if (isValidElement<ComponentProps<typeof Item>>(child)) {
        const childProps = {
          ...child.props,
          onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            changeActive(child.key as string)
            child.props.onClick?.(event)
          },
          active: child.key === value,
          label: child.props.label ?? props.label,
          arrow:
            child.props.arrow === undefined ? props.arrow : child.props.arrow,
        }
        items.push(child)
        if (child.props.forceRender) popupForceRender = true
        return cloneElement(child, childProps)
      } else {
        return child
      }
    })

    useImperativeHandle(
      ref,
      () => ({
        close: () => {
          setValue(null)
        },
      }),
      [setValue]
    )

    return withNativeProps(
      props,
      <div
        className={classNames(classPrefix, { [`${classPrefix}-open`]: !!value })}
        ref={containerRef}
        fieldid={props.fieldid}
      >
        <div className={`${classPrefix}-nav`} ref={navRef}>
          {navs}
        </div>
        <Popup
          visible={!!value}
          position={props.position}
          getContainer={props.getContainer}
          className={`${classPrefix}-popup`}
          maskClassName={classNames({ [`${classPrefix}-popup-mask`]: props.position === 'top' })}
          bodyClassName={classNames({ [`${classPrefix}-popup-body`]: props.position === 'top' })}
          style={{ top }}
          forceRender={popupForceRender}
          fieldid={props.fieldid}
          onMaskClick={
            props.closeOnMaskClick
              ? () => {
                changeActive(null)
              }
              : undefined
          }
        >
          <div ref={contentRef}>
            {items.map(item => {
              const isActive = item.key === value
              return (
                <ItemChildrenWrap
                  key={item.key}
                  active={isActive}
                  forceRender={item.props.forceRender}
                  destroyOnClose={item.props.destroyOnClose}
                >
                  {item.props.children}
                </ItemChildrenWrap>
              )
            })}
          </div>
        </Popup>
      </div>
    )
  }
)

export default Dropdown

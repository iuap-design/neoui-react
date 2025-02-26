import React, { isValidElement, useRef } from 'react'
import type { ReactNode, ReactElement } from 'react'
import { withNativeProps } from '@utils/NativeProps'
import List from '@components/list/src/index'
import classNames from 'classnames'
import { useSpring, animated } from '@react-spring/web'
import { usePropsValue } from '@hooks/UsePropsValue'
import { useShouldRender } from '@utils/ShouldRender'
import { useIsomorphicUpdateLayoutEffect, useMount } from 'tne-fw-fe/hooks'
import { traverseReactNode } from '@utils/TraverseReactNode'
import { AccordionPanelProps, AccordionProps } from './iAccordion'
import WebUI from '@utils/UpdatePrefixs'
import ArrowIosDown from '@tinper/m-icons/lib/cjs/ArrowIosDown'


export const AccordionPanel: React.FC<AccordionPanelProps> = () => null

const AccordionPanelContent: React.FC<{
  visible: boolean
  forceRender: boolean
  destroyOnClose: boolean
  children?: ReactNode
  clsPrefix?: string
  fieldid?: string
  contentKey?: string
  contentStyle?: React.CSSProperties
}> = props => {
  const { visible } = props
  const innerRef = useRef<HTMLDivElement>(null)
  const shouldRender = useShouldRender(
    visible,
    props.forceRender,
    props.destroyOnClose
  )
  const [{ height }, api] = useSpring(() => ({
    from: { height: 0 },
    config: {
      precision: 0.01,
      mass: 1,
      tension: 200,
      friction: 25,
      clamp: true,
    },
  }))

  useMount(() => {
    if (!visible) return
    const inner = innerRef.current
    if (!inner) return
    api.start({
      height: inner.offsetHeight,
      immediate: true,
    })
  })

  useIsomorphicUpdateLayoutEffect(() => {
    const inner = innerRef.current
    if (!inner) return
    if (visible) {
      api.start({ height: inner.offsetHeight, })
    } else {
      api.start({
        height: inner.offsetHeight,
        immediate: true,
      })
      api.start({ height: 0, })
    }
  }, [visible])

  return (
    <animated.div
      className={classNames(`${props.clsPrefix}-panel-content`, { [`${props.clsPrefix}-panel-content-active`]: visible, })}
      style={{
        ...props.contentStyle,
        height: height.to(v => {
          if (height.idle && visible) {
            return 'auto'
          } else {
            return v
          }
        }),
      }}
      fieldid={`${props.fieldid}-panel-content_${props.contentKey}`}
    >
      <div className={`${props.clsPrefix}-panel-content-inner`} ref={innerRef} fieldid={`${props.fieldid}-panel-content-inner_${props.contentKey}`}>
        <List.Item fieldid={`${props.fieldid}-panel-content-inner-listitem_${props.contentKey}`}>{shouldRender && props.children}</List.Item>
      </div>
    </animated.div>
  )
}

const Accordion: React.FC<AccordionProps> = props => {
  const panels: ReactElement<AccordionPanelProps>[] = []
  traverseReactNode(props.children, child => {
    if (!isValidElement<AccordionPanelProps>(child)) return
    const key = child.key
    if (typeof key !== 'string') return

    panels.push(child)
  })

  const handlePropsValue = () => {
    if (!props.accordion) {
      return {
        value: props.activeKey,
        defaultValue: props.defaultActiveKey ?? [],
        onChange: props.onChange,
      }
    }

    const initValue: {
      value?: any
      defaultValue: any
      onChange: (v: any) => void
    } = {
      value: [],
      defaultValue: [],
      onChange: v => {
        props.onChange?.(v[0] ?? null)
      },
    }

    if (props.activeKey === undefined) {
      initValue.value = undefined
    } else if (props.activeKey !== null) {
      initValue.value = [props.activeKey]
    }

    if (
      ![null, undefined].includes(props.defaultActiveKey as null | undefined)
    ) {
      initValue.defaultValue = [props.defaultActiveKey]
    }

    return initValue
  }

  const [activeKey, setActiveKey] = usePropsValue<string[]>(handlePropsValue())

  const activeKeyList =
    activeKey === null ? [] : Array.isArray(activeKey) ? activeKey : [activeKey]

  const _clsPrefix = `${props.clsPrefix}-accordion`

  return withNativeProps(
    props,
    <div className={_clsPrefix} fieldid={props.fieldid}>
      <List fieldid={`${props.fieldid}-list`}>
        {panels.map((panel, index) => {
          const key = panel.key as string
          const active = activeKeyList.includes(key)

          function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
            if (props.accordion) {
              if (active) {
                setActiveKey([])
              } else {
                setActiveKey([key])
              }
            } else {
              if (active) {
                setActiveKey(activeKeyList.filter(v => v !== key))
              } else {
                setActiveKey([...activeKeyList, key])
              }
            }

            panel.props.onClick?.(event)
          }

          const renderArrow = (key: any) => {
            let arrow: AccordionProps['arrow'] = <ArrowIosDown fieldid={`${props.fieldid}-arrow-icon_${key}`}/>
            if (props.arrow !== undefined) {
              arrow = props.arrow
            }
            if (panel.props.arrow !== undefined) {
              arrow = panel.props.arrow
            }
            return typeof arrow === 'function' ? (
              arrow(active)
            ) : (
              <div
                className={classNames(`${_clsPrefix}-arrow`, { [`${_clsPrefix}-arrow-active`]: active, })}
                fieldid={`${props.fieldid}-panel-arrow_${key}`}
              >
                {arrow}
              </div>
            )
          }
          const renderLine = () => index == panels?.length - 1 ? null : (
            <div className={`${_clsPrefix}-line`} fieldid={`${props.fieldid}-line_${key}`} />
          )
          const listItemCls = (key: any) => {
            if (activeKey?.length > 0 && activeKey.includes(key)) {
              return `${_clsPrefix}-panel-header-active`
            } else {
              return `${_clsPrefix}-panel-header`
            }
          }
          return (
            <React.Fragment key={key}>
              {withNativeProps(
                panel.props,
                <List.Item
                  className={listItemCls(key)}
                  onClick={handleClick}
                  disabled={panel.props.disabled}
                  arrow={renderArrow(key)}
                  fieldid={`${props.fieldid}-panel_${key}`}
                >
                  {panel.props.title}
                </List.Item>
              )}
              <AccordionPanelContent
                visible={active}
                contentKey={key}
                forceRender={!!panel.props.forceRender}
                destroyOnClose={!!panel.props.destroyOnClose}
                fieldid={props.fieldid}
                clsPrefix={_clsPrefix}
                contentStyle={panel.props.contentStyle}
              >
                {panel.props.children}
              </AccordionPanelContent>
              {renderLine()}
            </React.Fragment>
          )
        })}
      </List>
    </div>
  )
}

export default WebUI({ })(Accordion)

import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { useUpdateEffect } from 'tne-fw-fe/hooks'
import { withNativeProps } from '@utils/NativeProps'
import { mergeProps } from '@utils/WithDefaultProps'
import WebUI from '@utils/UpdatePrefixs';
import { getFieldId } from '@utils/GetFieldId';
import { usePropsValue } from '@hooks/UsePropsValue'
import { useFieldNames } from '@hooks/UseFieldNames';
import { useConfig } from '@components/config-provider/src'
import { CheckList } from '@tinper/m';
import Skeleton from '@components/skeleton/src'
import { Tabs } from '@tinper/m';
import { CascaderOption, CascaderValue, CascaderViewProps } from './iCascaderView'
import { useCascaderValueExtend } from './UseCascaderValueExtend'
import { isFunction } from 'lodash';
import { optionSkeleton } from '@components/cascader-view/src/OptionSkeleton';


const defaultProps = { defaultValue: [] as CascaderValue[], }

function OptionSkeletons(props: { classPrefix: string }) {
  return <div  className={`${props.classPrefix}-skeleton`}>
    {[1, 2, 3, 4].map(i => (
      <Skeleton
        key={i}
        className={`${props.classPrefix}-skeleton-line-${i}`}
        animated
      />
    ))}
  </div>;
}

const CascaderView: React.FC<CascaderViewProps> = (p) => {
  const props = mergeProps(defaultProps, p)

  const { clsPrefix, fieldid } = props
  const classPrefix = `${clsPrefix}-cascader-view`

  const { locale }  = useConfig()
  const generateValueExtend = useCascaderValueExtend(props.options)
  const [labelName, valueName, childrenName, disabledName] = useFieldNames(
    props.fieldNames
  )

  const [value, setValue] = usePropsValue({
    ...props,
    onChange: val => {
      // value, node of value, isLeaf
      props.onChange?.(val, generateValueExtend(val))
    },
  })

  const levels = useMemo(() => {
    const ret: {
      selected: CascaderOption | undefined
      options: CascaderOption[]
    }[] = []

    let currentOptions = props.options
    let reachedEnd = false

    for (const v of value) {
      const target = currentOptions.find(option => option[valueName] === v)
      ret.push({
        selected: target,
        options: currentOptions,
      })
      if (!target || !target[childrenName]) {
        reachedEnd = true
        break
      }
      currentOptions = target[childrenName]
    }

    if (!reachedEnd) {
      ret.push({
        selected: undefined,
        options: currentOptions,
      })
    }

    return ret
  }, [value, props.options])

  const [tabActiveIndex, setTabActiveIndex] = useState(0)


  useUpdateEffect(() => {
    props.onTabsChange?.(tabActiveIndex)
  }, [tabActiveIndex])

  useEffect(() => {
    setTabActiveIndex(levels.length - 1)
  }, [value])

  useEffect(() => {
    const max = levels.length - 1
    if (tabActiveIndex > max) {
      setTabActiveIndex(max)
    }
  }, [tabActiveIndex, levels])

  const onItemSelect = (selectValue: CascaderValue, depth: number) => {
    const next = value.slice(0, depth)
    if (selectValue !== undefined) {
      next[depth] = selectValue
    }
    setValue(next)
  }

  const whetherLoading = <T extends unknown[]>(options: T) => props.loading || options === optionSkeleton

  const placeholder = props.placeholder || locale.Cascader.placeholder

  return withNativeProps(
    props,
    <div className={classPrefix} fieldid={fieldid}>
      <Tabs
        activeLineMode='auto'
        activeKey={tabActiveIndex.toString()}
        onChange={key => {
          const activeIndex = parseInt(key)
          setTabActiveIndex(activeIndex)
        }}
        stretch={false}
        className={`${classPrefix}-tabs`}
      >
        {levels.map((level, index) => {

          const selectedOption = level.selected
          const unSelectedTitle = isFunction(placeholder) ? placeholder(index) : placeholder
          const tabTitle = selectedOption ? selectedOption[labelName] : unSelectedTitle

          return (
            <Tabs.Tab
              key={index.toString()}
              title={
                <div className={`${classPrefix}-header-title`}>
                  {tabTitle}
                </div>
              }
              forceRender
            >
              <div className={`${classPrefix}-content`}>
                {whetherLoading(level.options) ? (
                  <OptionSkeletons classPrefix={classPrefix}/>
                ) : (
                  <CheckList
                    value={[value[index]]}
                    onChange={selectValue => onItemSelect(selectValue[0]?.toString(), index)}
                    activeIcon={props.activeIcon}
                  >
                    {level.options.map(option => {
                      const active = value[index] === option[valueName]
                      return (
                        <CheckList.Item
                          value={option[valueName]}
                          key={option[valueName]}
                          disabled={option[disabledName]}
                          className={classNames(`${classPrefix}-item`, { [`${classPrefix}-item-active`]: active, })}
                        >
                          {option[labelName]}
                        </CheckList.Item>
                      )
                    })}
                  </CheckList>
                )}
              </div>
            </Tabs.Tab>
          )
        })}
      </Tabs>
    </div>
  )
}



export default WebUI({ defaultProps })(CascaderView)


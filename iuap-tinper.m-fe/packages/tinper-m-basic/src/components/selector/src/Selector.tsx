import classNames from 'classnames'
import React from 'react'
import { withNativeProps } from '@utils/NativeProps'
import { Grid, Space } from '@tinper/m'
import { usePropsValue } from '@utils/UsePropsValue'
import { CheckMark } from './CheckMark'
import { useFieldNames } from '@hooks/index';
import { mergeProps } from '@utils/WithDefaultProps';
import type { SelectorProps, SelectorValue } from './iSelector';


const defaultProps = {
  multiple: false,
  defaultValue: [],
  showCheckMark: true,
  clsPrefix: 'mui',
  widthAdjustment: 'equal',
}

export const Selector = <V extends SelectorValue>(p: SelectorProps<V>) => {
  const props = mergeProps(defaultProps, p)
  const classPrefix = `${props.clsPrefix}-selector`
  const [labelName, valueName, , disabledName] = useFieldNames(props.fieldNames)
  const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: val => {
      const extend = {
        get items() {
          return props.options.filter(option => val.includes(option[valueName]))
        },
      }
      props.onChange?.(val, extend)
    },
  })

  // const { locale } = useConfig()

  const items = props.options.map(option => {
    const active = (value || []).includes(option[valueName])
    const disabled = option[disabledName] || props.disabled
    const itemCls = classNames(`${classPrefix}-item`, {
      [`${classPrefix}-item-active`]: active && !props.multiple,
      [`${classPrefix}-item-multiple-active`]: active && props.multiple,
      [`${classPrefix}-item-disabled`]: disabled,
    })

    return (
      <div
        key={option[valueName]}
        fieldid={`${props.fieldid}-${option[valueName]}`}
        className={classNames(
          itemCls,
          { [`${classPrefix}-with-no-badge`]: !props.showCheckMark }
        )}
        onClick={() => {
          if (disabled) {
            return
          }
          if (props.multiple) {
            const val = active
              ? value.filter(v => v !== option[valueName])
              : [...value, option[valueName]]
            setValue(val)
          } else {
            const val = active ? [] : [option[valueName]]
            setValue(val)
          }
        }}
        role='option'
        aria-selected={
          (active && !props.multiple) || (active && props.multiple)
        }
      >
        <div className={`${classPrefix}-item-label`}> {option[labelName]}</div>
        {option.description && (
          <div className={`${classPrefix}-item-description`}>
            {option.description}
          </div>
        )}
        {active && props.showCheckMark && (
          <div className={`${classPrefix}-check-mark-wrapper`}>
            <CheckMark />
          </div>
        )}
      </div>
    )
  })



  const width = props.style?.['--item-width'] ?? '1.44rem'

  return withNativeProps(
    props,
    <div
      className={classPrefix}
      role='listbox'
      fieldid={props.fieldid}
      style={{
        '--flex': props.widthAdjustment === 'equal' ? 'auto' : 'none',
        '--item-width': props.widthAdjustment === 'auto' ? 'auto' : width,
      }}
    // aria-label={locale.Selector.name}
    >
      {props.columns ? (
        <Grid columns={props.columns}>{items}</Grid>
      ) : (
        <Space block style={{ '--gap': props.widthAdjustment === 'equal' ? '0.24rem' : '0.08rem' }}>{items}</Space>
      )}
    </div>
  )
}

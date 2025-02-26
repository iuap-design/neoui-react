import React, { ComponentProps, useCallback, useEffect, useMemo, useState } from 'react'
import { useMemoizedFn } from 'tne-fw-fe/hooks'
import { withNativeProps } from '@utils/NativeProps'
import { usePropsValue } from '@hooks/UsePropsValue'
import {
  convertDateToStringArray,
  convertStringArrayToDate,
  defaultRenderLabel,
  formatDate,
  generateDatePickerColumns,
} from './DatePickerUtils'
import { bound } from '@utils/Bounds'
import type { PickerColumn, PickerValue } from '@components/picker/src';
import type { DatePickerProps } from './iDatePicker';
import { ConfigProvider, Input, PickerView } from '@tinper/m';
import { mergeProps } from '@utils/WithDefaultProps';
import { compact, isNil } from 'lodash';
import classNames from 'classnames';
import PickerFactory from '@components/picker/src/PickerFactory';
import { useConfig } from '@components/config-provider/src';
import { isValid, toDate } from 'date-fns'
import { DatePickerProvider, useDatePicker } from './DatePickerProvider';

const thisYear = new Date().getFullYear()


const defaultProps = {
  min: new Date(new Date().setFullYear(thisYear - 10)),
  max: new Date(new Date().setFullYear(thisYear + 10)),
  precision: 'day',
  renderLabel: defaultRenderLabel,
  defaultValue: null as Date | null,
  use12hours: false,
  minuteStep: 1,
  disabled: false,
  type: 'date',
  range: false,
  active: 'lower' as 'lower' | 'upper',
  onActiveChange: (val: 'lower' | 'upper') => val,
}



function DatePicker(props: DatePickerProps) {
  defaultProps.precision = props.type === 'time' ? 'second' : 'day'
  const p = mergeProps(defaultProps, props)
  const {
    fieldid,
    clsPrefix,
    range,
  } = p

  const { locale } = useConfig()

  ConfigProvider.setTinpermLocaleConfig(locale.locale)


  const [value, setValue] = usePropsValue({
    value: isNil(p.value) ? p.value : (range ? [p.value[0], p.value[1]] : [p.value]),
    defaultValue: isNil(p.defaultValue) ? p.defaultValue : (range ? [p.defaultValue[0], p.defaultValue[1]] : [p.defaultValue]),
    onChange: v => {
      if (v === null) return
      if (p.range)
        p.onConfirm?.(v)
      else
        p.onConfirm?.(v[0])

    },
  })


  const [rangeInputValue, setRangeValue] = useState(value)
  // const [active, onActiveChange] = useState<'lower' | 'upper'>(p.range ? p.active : 'lower')

  const minDate = toDate(p.min)
  const maxDate = toDate(p.max)
  const min = typeof p.min === 'string' ? (isValid(minDate) ? minDate : defaultProps.min) : (typeof p.min === 'number' ? new Date(p.min) : p.min)
  const max = typeof p.max === 'string' ? (isValid(maxDate) ? maxDate : defaultProps.max)  : (typeof p.max === 'number' ? new Date(p.max) : p.max)

  const now = useMemo(() => new Date(), [p.visible])

  const classPrefix = `${clsPrefix}-datepicker`




  const pickerValue = useMemo(() => {
    let date = (p.range ? (p.active === 'lower' ? rangeInputValue?.[0] : rangeInputValue?.[1]) : value?.[0]) ?? now
    if (typeof date === 'number') date = new Date(date)
    date = new Date(
      bound(date.getTime(), min.getTime(), max.getTime())
    )
    return convertDateToStringArray(date, p.precision, p.type, p.use12hours)
  }, [p.range, p.precision, p.type, p.use12hours, p.active, rangeInputValue, value, now, min, max])


  const onConfirm = useCallback(
    (val: PickerValue[]) => {

      if (val.length === 0) {
        setValue([])
      } else if (p.range) {
        setValue(rangeInputValue)
      } else {
        const dateVal = convertStringArrayToDate(val, p.precision, p.type, p.use12hours)

        setValue([dateVal, dateVal])
      }
    },
    [p.precision, p.range, p.type, p.use12hours, rangeInputValue, setValue]
  )


  const onSelect = useMemoizedFn((val: PickerValue[]) => {
    const date = convertStringArrayToDate(val, p.precision, p.type, p.use12hours)

    if (props.range) {
      if (p.active == 'lower') {
        if (date.getTime() === rangeInputValue?.[0]?.getTime()) return
        setRangeValue([date, rangeInputValue?.[1] ?? null])
      } else {
        if (date.getTime() === rangeInputValue?.[1]?.getTime()) return

        setRangeValue([rangeInputValue?.[0] ?? null, date])
      }
    }

    !p.range && p.onSelect?.(date)
  })

  const onDismiss = useCallback(() => {
    setValue([])
    p.range && p.onActiveChange('lower')
    props.range && setRangeValue([])
    p.onDismiss?.()
  }, [p, props.range, setValue])


  const columns = useCallback<(value: PickerValue[]) => PickerColumn[]>(
    (selected: string[]) => generateDatePickerColumns(
      selected,
      min,
      max,
      p.precision,
      p.renderLabel,
      p.filter,
      p.use12hours,
      p.minuteStep,
      p.type,
    ),
  [min, max, p.precision, p.renderLabel, p.filter, p.use12hours, p.minuteStep, p.type]
  )


  const onCancel = () => {
    props.range && setRangeValue(value)
    p.onCancel?.()
  }

  const afterShow = () => {
    props.range && setRangeValue(value)
    p.afterShow?.()
  }

  if (p.disabled)
    return null
  return withNativeProps(
    p,
    <DatePickerProvider {...p} active={p.active} onActiveChange={p.onActiveChange} rangeInputValue={rangeInputValue ?? []}
      setRangeValue={setRangeValue} classPrefix={classPrefix}>
      <Picker

        columns={columns}
        value={pickerValue}
        onClose={p.onClose}
        visible={p.visible}
        confirmText={p.confirmText}
        cancelText={p.cancelText}
        clearAndReturnText={p.clearAndReturnText}
        onConfirm={onConfirm}
        onSelect={onSelect}
        getContainer={p.getContainer}
        loading={p.loading}
        afterShow={afterShow}
        afterClose={p.afterClose}
        onClick={p.onClick}
        onCancel={onCancel}
        onDismiss={onDismiss}
        title={p.title}
        stopPropagation={p.stopPropagation}
        fieldid={fieldid}
        clsPrefix={clsPrefix}
        showClear={p.showClear}
        popupClassName={p.popupClassName}
        popupStyle={p.popupStyle}
        disableSubmit={p.range && compact(rangeInputValue).length !== 2}
      >
        {(_, actions) => {
          if (p.range)
            return p.children?.(value ?? [], actions)
          else
            return p.children?.(value?.[0] ?? null, actions)

        }}

      </Picker>
    </DatePickerProvider>
  )


}

const View = (props: ComponentProps<typeof PickerView>) => {
  const {
    range,
    classPrefix
  } = useDatePicker()

  return (
    <div className={classPrefix}>
      {range &&
        <RangeSeletion />}

      <PickerView {...props} style={{ '--height': '5rem' }}/>
    </div>
  )
}

const Picker = PickerFactory(View)

const RangeSeletion = () => {
  const {
    rangeInputValue,
    active,
    setRangeValue,
    onActiveChange,
    classPrefix,
    precision,
    type,

  } = useDatePicker()
  const lowerInput = rangeInputValue?.[0]
  const upperInput = rangeInputValue?.[1]
  const { locale } = useConfig()
  const [startPlaceholder, endPlaceholder] = locale.TimeRangePicker.placeholder.split('-')


  useEffect(() => {
    if (lowerInput && upperInput) {
      if (lowerInput > upperInput) {

        setRangeValue([upperInput, lowerInput])



      }
    }
  }, [lowerInput, setRangeValue, upperInput])


  const lowerClsName = classNames({
    [`${classPrefix}-range-btn`]: true,
    [`${classPrefix}-range-btn-active`]: active === 'lower'
  })
  const upperClsName = classNames({
    [`${classPrefix}-range-btn`]: true,
    [`${classPrefix}-range-btn-active`]: active === 'upper'
  })
  return (
    <div className={`${classPrefix}-range`}>
      <div onClick={() => {
        onActiveChange('lower')
        setRangeValue([lowerInput, upperInput])
      }}>
        <Input readOnly
          value={lowerInput && formatDate(lowerInput, precision, type)}
          placeholder={startPlaceholder} className={lowerClsName}/>
      </div>
      <div>-</div>
      <div onClick={() => {
        onActiveChange('upper')
        setRangeValue([lowerInput, upperInput])
      }}>
        <Input readOnly
          value={upperInput && formatDate(upperInput, precision, type)}
          placeholder={endPlaceholder} className={upperClsName}/>

      </div>
    </div>
  )
}


export default DatePicker

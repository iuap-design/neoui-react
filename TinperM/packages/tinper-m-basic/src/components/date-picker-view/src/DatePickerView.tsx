import type { FC } from 'react'
import React, { useMemo } from 'react'
import type { DatePickerViewProps } from './iDatePickerView';
import useRenderLabel from './useRenderLabel'
import {
  convertDateToStringArray,
  convertStringArrayToDate,
  generateDatePickerColumns
} from '@components/date-picker/src/DatePickerUtils';
import { withNativeProps } from '@utils/NativeProps';
import { mergeProps } from '@utils/WithDefaultProps';
import { usePropsValue } from '@hooks/UsePropsValue';
import { PickerDate } from '@components/picker/src/util';
import { useMemoizedFn } from 'tne-fw-fe/hooks'
import { PickerView } from '@tinper/m';
import { PickerValue } from '@components/picker-view/src';


const thisYear = new Date().getFullYear()

const defaultProps = {
  min: new Date(new Date().setFullYear(thisYear - 10)),
  max: new Date(new Date().setFullYear(thisYear + 10)),
  precision: 'day',
  use12hours: false,
  type: 'date'
}

export const DatePickerView: FC<DatePickerViewProps> = p => {
  const props = mergeProps(defaultProps, p)
  const { renderLabel, fieldid } = props
  const classPrefix = `${props.clsPrefix}-date-picker-view`

  const [value, setValue] = usePropsValue<PickerDate | null>({
    value: typeof props.value === "number" ? new Date(props.value) : props.value,
    defaultValue: (typeof props.defaultValue === "number" ? new Date(props.defaultValue) : props.defaultValue) ?? null,
  })

  const mergedRenderLabel = useRenderLabel(renderLabel)

  const pickerValue = useMemo(() => convertDateToStringArray(value, props.precision, props.type, props.use12hours), [value, props.precision, props.type, props.use12hours])

  const onChange = useMemoizedFn(
    (val: PickerValue[]) => {
      const date = convertStringArrayToDate(val, props.precision, props.type, props.use12hours)
      if (date) {
        setValue(date)
        props.onChange?.(date)
      }
    }
  )


  return withNativeProps(
    props,
    <PickerView
      className={classPrefix}
      columns={selected =>
        generateDatePickerColumns(
          selected as string[],
          typeof props.min === 'number' ? new Date(props.min) : props.min,
          typeof props.max === 'number' ? new Date(props.max) : props.max,
          props.precision,
          mergedRenderLabel,
          props.filter,
          props.use12hours,
          props.minuteStep,
          props.type,
        )
      }
      loading={props.loading}
      loadingContent={props.loadingContent}
      value={pickerValue}
      mouseWheel={props.mouseWheel}
      onChange={onChange}
      fieldid={fieldid}
      clsPrefix={props.clsPrefix}
    />
  )
}

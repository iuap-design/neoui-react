import SpinLoading from '@common/spin-loading/src'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { defaultRenderLabel } from '@components/picker/src/PickerUtils'
import { withNativeProps } from '@utils/NativeProps'
import { mergeProps } from '@utils/WithDefaultProps'
import { Wheel } from './Wheel'
import { PickerValue, PickerViewProps } from './iPickerView'
import { useColumnsExtend } from '@components/picker-view/src/ColumnsExtend';
import { useDebounceEffect } from 'tne-fw-fe/hooks';


const defaultProps = {
  defaultValue: [],
  renderLabel: defaultRenderLabel,
  mouseWheel: false,
  loadingContent: (
    <div className={'mui-picker-view-loading-content'}>
      <SpinLoading style={{ '--mui-loading-color-fill-loading': 'var(--mui-picker-view-color-loading-pickerview)' }} />
    </div>
  ),
}


const PickerView = memo<PickerViewProps>(p => {


  const props = mergeProps(defaultProps, p)
  const { fieldid, clsPrefix: _clsPrefix } = props
  const clsPrefix = `${_clsPrefix}-picker-view`
  const [innerValue, setInnerValue] = useState<PickerValue[]>(
    props.value === undefined ? props.defaultValue : props.value
  )

  // Sync `value` to `innerValue`
  useEffect(() => {
    if (props.value === undefined) return // Uncontrolled mode
    if (props.value === innerValue) return
    setInnerValue(props.value)
  }, [props.value])

  useEffect(() => {
    if (props.value === innerValue) return
    const timeout = window.setTimeout(() => {
      if (props.value !== undefined && props.value !== innerValue) {
        setInnerValue(props.value)
      }
    }, 1000)
    return () => {
      window.clearTimeout(timeout)
    }
  }, [props.value, innerValue])

  const extend = useColumnsExtend(props.columns, innerValue)
  const columns = extend.columns

  useDebounceEffect(
    () => {
      if (props.value === innerValue) return
      props.onChange?.(innerValue, extend)
    },
    [innerValue],
    {
      wait: 0,
      leading: false,
      trailing: true,
    }
  )
  const [visible, setVisible] = useState(false)

  const fontSize = document.documentElement.style.fontSize

  useEffect(() => {
    setVisible(true)
  }, [fontSize])





  const handleSelect = useCallback((val: PickerValue, index: number) => {
    setInnerValue(prev => {
      const next = [...prev]
      next[index] = val
      return next
    })
  }, [])

  if (!visible) return null


  return withNativeProps(
    props,
    <div className={`${clsPrefix}`} fieldid={fieldid}>
      {props.loading ? (
        props.loadingContent
      ) : (
        <>
          {columns.map((column, index) =>
            (
              <Wheel
                key={index}
                index={index}
                column={column}
                value={innerValue[index]}
                onSelect={handleSelect}
                clsPrefix={clsPrefix}
                renderLabel={props.renderLabel}
                mouseWheel={props.mouseWheel}
              />
            )
          )}
          <div className={`${clsPrefix}-mask`}>
            <div className={`${clsPrefix}-mask-top`} />
            <div className={`${clsPrefix}-mask-middle`} />
            <div className={`${clsPrefix}-mask-bottom`} />
          </div>
        </>)}
    </div>
  )
})

PickerView.displayName = 'PickerView'
export default PickerView

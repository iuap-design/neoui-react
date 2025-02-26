import classNames from 'classnames'
import React, { forwardRef, useEffect, useImperativeHandle, useState, } from 'react'
import { useMergedState } from 'rc-util'
import getMiniDecimal, { type DecimalClass, toFixed, } from '@rc-component/mini-decimal'
import { withNativeProps } from '@utils/NativeProps'
import { mergeProps } from '@utils/WithDefaultProps'
import { Button, Input } from '@tinper/m'
import { InputRef } from '../../input/src/iInput'
import { useConfig } from '../../config-provider/src'

import Plus from '@tinper/m-icons/lib/cjs/Plus'
import Minus from '@tinper/m-icons/lib/cjs/Minus'
import type { StepperProps, StepperRef, MergedStepperProps } from './iStepper'
import { useMemoizedFn } from 'tne-fw-fe/hooks'


const defaultProps = {
  step: 1,
  disabled: false,
  allowEmpty: false,
  clsPrefix: 'mui'
}

export function InnerStepper<ValueType extends number | string>(
  p: StepperProps,
  ref: React.ForwardedRef<StepperRef>
) {
  const props = mergeProps(defaultProps, p)
  const classPrefix = `${props.clsPrefix}-stepper`
  const {
    defaultValue = 0 as ValueType,
    value,
    onChange,
    disabled,
    step,
    max,
    min,
    inputReadOnly,
    digits,
    stringMode,
    formatter,
    parser,
    handleBtnClick
  } = props as MergedStepperProps<ValueType>

  const { locale } = useConfig()

  // ========================== Ref ==========================
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus()
    },
    blur: () => {
      inputRef.current?.blur()
    },
    get nativeElement() {
      return inputRef.current?.nativeElement ?? null
    },
  }))

  // ========================== Parse / Format ==========================
  const fixedValue = (value: ValueType): string => {
    const fixedValue =
      digits !== undefined ? toFixed(value.toString(), '.', digits) : value

    return fixedValue.toString()
  }

  const getValueAsType = (value: DecimalClass) =>
    (stringMode ? value.toString() : value.toNumber()) as ValueType

  const parseValue = (text: string): string | null => {
    if (text === '') return null

    if (parser) {
      return String(parser(text))
    }

    const decimal = getMiniDecimal(text)
    return decimal.isInvalidate() ? null : decimal.toString()
  }

  const formatValue = useMemoizedFn((value: ValueType | null): string => {
    if (value === null) return ''

    return formatter ? formatter(value) : fixedValue(value)
  })

  // ======================== Value & InputValue ========================
  const [mergedValue, setMergedValue] = useMergedState<ValueType | null>(
    defaultValue,
    {
      value,
      onChange: nextValue => {
        onChange?.(nextValue as ValueType)
      },
    }
  )

  const [inputValue, setInputValue] = useState(() => formatValue(mergedValue))

  // >>>>> Value
  function setValueWithCheck(nextValue: DecimalClass) {
    if (nextValue.isNaN()) return

    let target = nextValue

    // Put into range
    if (min !== undefined) {
      const minDecimal = getMiniDecimal(min)
      if (target.lessEquals(minDecimal)) {
        target = minDecimal
      }
    }

    if (max !== undefined) {
      const maxDecimal = getMiniDecimal(max)
      if (maxDecimal.lessEquals(target)) {
        target = maxDecimal
      }
    }

    // Fix digits
    if (digits !== undefined) {
      target = getMiniDecimal(fixedValue(getValueAsType(target)))
    }

    setMergedValue(getValueAsType(target))
  }

  // >>>>> Input
  const handleInputChange = (v: string) => {
    setInputValue(v)
    const valueStr = parseValue(v)

    if (valueStr === null) {
      if (props.allowEmpty) {
        setMergedValue(null)
      } else {
        setMergedValue(defaultValue)
      }
    } else {
      setValueWithCheck(getMiniDecimal(valueStr))
    }
  }

  // ============================== Focus ===============================
  const [focused, setFocused] = useState(false)
  const inputRef = React.useRef<InputRef>(null)

  function triggerFocus(nextFocus: boolean) {
    setFocused(nextFocus)

    // We will convert value to original text when focus
    if (nextFocus) {
      setInputValue(
        mergedValue !== null && mergedValue !== undefined
          ? String(mergedValue)
          : ''
      )
    }
  }

  useEffect(() => {
    if (focused) {
      inputRef.current?.nativeElement?.select?.()
    }
  }, [focused])

  // Focus change to format value
  useEffect(() => {
    if (!focused) {
      setInputValue(formatValue(mergedValue))
    }
  }, [focused, mergedValue, digits, formatValue])

  // ============================ Operations ============================
  const handleOffset = (positive: boolean) => {
    let stepValue = getMiniDecimal(step)
    if (!positive) {
      stepValue = stepValue.negate()
    }

    let value = getMiniDecimal(mergedValue ?? 0).add(stepValue.toString());
    setValueWithCheck(value)
    handleBtnClick?.(positive ? 'up' : 'down', value?.origin && Number(value.origin))
  }

  const handleMinus = () => {
    handleOffset(false)
  }

  const handlePlus = () => {
    handleOffset(true)
  }

  const minusDisabled = () => {
    if (disabled) return true
    if (mergedValue === null) return false
    if (min !== undefined) {
      return mergedValue <= min
    }
    return false
  }

  const plusDisabled = () => {
    if (disabled) return true
    if (mergedValue === null) return false
    if (max !== undefined) {
      return mergedValue >= max
    }
    return false
  }

  // ============================== Render ==============================
  return withNativeProps(
    props,
    <div
      fieldid={props.fieldid}
      className={classNames(classPrefix, { [`${classPrefix}-active`]: focused })}
    >
      <Button
        className={`${classPrefix}-minus`}
        onClick={handleMinus}
        disabled={minusDisabled()}
        fill='none'
        shape='rectangular'
        color='primary'
        fieldid={`${props.fieldid}-minus`}
        // aria-label={locale.Stepper.decrease}
      >
        <Minus />
      </Button>
      <div className={`${classPrefix}-middle`}>
        <Input
          ref={inputRef}
          className={`${classPrefix}-input`}
          onFocus={e => {
            triggerFocus(true)
            props.onFocus?.(e)
          }}
          value={inputValue}
          onChange={val => {
            disabled || handleInputChange(val)
          }}
          disabled={disabled}
          onBlur={e => {
            triggerFocus(false)
            props.onBlur?.(e)
          }}
          readOnly={inputReadOnly}
          role='spinbutton'
          aria-valuenow={Number(inputValue)}
          aria-valuemax={Number(max)}
          aria-valuemin={Number(min)}
          inputMode='decimal'
          fieldid={props.fieldid}
        />
      </div>
      <Button
        className={`${classPrefix}-plus`}
        onClick={handlePlus}
        disabled={plusDisabled()}
        fill='none'
        shape='rectangular'
        color='primary'
        fieldid={`${props.fieldid}-plus`}

      >
        <Plus />
      </Button>
    </div>
  )
}

export const Stepper = forwardRef(InnerStepper)

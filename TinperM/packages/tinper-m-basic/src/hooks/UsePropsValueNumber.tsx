import React, { useRef, useCallback } from 'react'


interface UsePropsValue<T> {
  value?: T
  defaultValue?: T
  finalValue?: T
  onChange?: (value: T) => void
}

function useForceUpdate() {
  const [, updateState] = React.useState()
  return React.useCallback(() => updateState({} as any), [])
}

export function usePropsValue<T>({
  value,
  defaultValue,
  finalValue,
  onChange = (value: T) => {},
}: UsePropsValue<T>) {
  const forceUpdate = useForceUpdate()
  const dfValue = (defaultValue !== undefined ? defaultValue : finalValue) as T
  const stateRef = useRef<T>(value !== undefined ? value : dfValue)
  if (value !== undefined) {
    stateRef.current = value
  }
  const setState = useCallback(
    (v: T, forceTrigger = false) => {
      const prevState = stateRef.current
      stateRef.current = v
      if (prevState !== stateRef.current || forceTrigger) {
        forceUpdate()
        onChange?.(v)
      }
    },
    [value, onChange]
  )
  return [stateRef.current, setState] as const
}
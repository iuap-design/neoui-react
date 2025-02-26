import { useRef } from 'react'
import { useMemoizedFn, useUpdate } from 'tne-fw-fe/hooks'

type Options<T> = {
  value?: T
  defaultValue: T
  onChange?: (v: T) => void
}

export function usePropsPickerValue<T>(options: Options<T>) {
  const { value, defaultValue, onChange } = options

  const update = useUpdate()

  const stateRef = useRef<T>(value !== undefined ? value : defaultValue)
  if (value !== undefined) {
    stateRef.current = value
  }

  const setState = useMemoizedFn((v: T) => {
    if (value === undefined) {
      stateRef.current = v
      update()
    }
    onChange?.(v)
  })
  return [stateRef.current, setState] as const
}

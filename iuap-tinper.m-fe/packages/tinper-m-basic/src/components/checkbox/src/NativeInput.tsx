import React, { useEffect, useRef } from 'react'
import type { FC } from 'react'
import { useMemoizedFn } from 'tne-fw-fe/hooks'

interface Props {
  type: 'checkbox' | 'radio'
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  id?: string
  fieldid?: string
  clsPrefix?: string
}

export const NativeInput: FC<Props> = props => {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleClick = useMemoizedFn((e: MouseEvent) => {
    e.stopPropagation()
    e.stopImmediatePropagation()
    const latestChecked = (e.target as HTMLInputElement).checked
    if (latestChecked === props.checked) return
    props.onChange(latestChecked)
  })
  useEffect(() => {
    if (props.disabled) return
    if (!inputRef.current) return
    const input = inputRef.current
    input.addEventListener('click', handleClick)
    return () => {
      input.removeEventListener('click', handleClick)
    }
  }, [props.disabled, props.onChange])

  return (
    <input
      fieldid={props.fieldid}
      ref={inputRef}
      className={`${props.clsPrefix}-input`}
      type={props.type}
      checked={props.checked}
      disabled={props.disabled}
      id={props.id}
    />
  )
}

import { renderHook } from '@testing-library/react'
import { useId } from 'react'


export function getTestId() {
  const { result: { current: fieldid } } = renderHook(useId)
  return fieldid
}

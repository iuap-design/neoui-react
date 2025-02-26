import { useState } from 'react'
import { useIsomorphicLayoutEffect } from 'tne-fw-fe/hooks'

export function useInnerVisible(outerVisible: boolean) {
  const [innerVisible, setInnerVisible] = useState(outerVisible)
  useIsomorphicLayoutEffect(() => {
    setInnerVisible(outerVisible)
  }, [outerVisible])
  return innerVisible
}

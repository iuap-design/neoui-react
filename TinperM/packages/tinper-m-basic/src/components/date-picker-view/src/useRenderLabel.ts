import { useCallback } from 'react'
import type { RenderLabel } from './iDatePickerView'
import { useConfig } from '@components/config-provider/src';
import { useMemoizedFn } from 'tne-fw-fe/hooks'

export default function useRenderLabel(renderLabel?: RenderLabel): RenderLabel {
  const { locale } = useConfig()

  return useMemoizedFn(
    (type, data) => {
      if (renderLabel) {
        return renderLabel(type, data)
      }

      // Default render
      switch (type) {
      case 'minute':
      case 'second':
      case 'hour':
        return ('0' + data.toString()).slice(-2)
      default:
        return data.toString()
      }
    }
  )
}

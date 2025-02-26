import React from 'react'
import Dialog from './Dialog'
import { DialogShowProps } from './iDialog'
import { renderImperatively } from '@utils/RenderImperatively'

export const closeFnSet = new Set<() => void>()

export type DialogShowHandler = {
  close: () => void
}
export function show(props: DialogShowProps) {
  const handler: DialogShowHandler = renderImperatively(
    <Dialog
      {...props}
      afterClose={() => {
        closeFnSet.delete(handler.close)
        props.afterClose?.()
      }}
    />
  )
  closeFnSet.add(handler.close)
  return handler
}

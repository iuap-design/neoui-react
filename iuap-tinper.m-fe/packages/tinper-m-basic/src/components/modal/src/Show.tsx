import React from 'react'
import { Modal } from '@tinper/m'
import { ModalShowProps } from './iModal'
import { renderImperatively } from '@utils/RenderImperatively'

export const closeFnSet = new Set<() => void>()

export type ModalShowHandler = {
  close: () => void
}

export function show(props: ModalShowProps) {
  const handler: ModalShowHandler = renderImperatively(
    <Modal
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

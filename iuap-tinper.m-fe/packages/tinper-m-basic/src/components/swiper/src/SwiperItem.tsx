import React from 'react'
import type { FC, ReactNode } from 'react'
import { NativeProps, withNativeProps } from '@utils/NativeProps'

type Props = {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  children?: ReactNode
  fieldid?: string
} & NativeProps

export default function SwiperItem (props: Props) {
  return withNativeProps(
    props,
    <div className='mui-swiper-item' onClick={props.onClick} fieldid={props.fieldid}>
      {props.children}
    </div>
  )
}

import React from 'react'
import { withNativeProps } from '@utils/NativeProps'
import { mergeProps } from '@utils/WithDefaultProps'
import FallBack from './FallBacks'
import Image from '@components/image/src'
import { AvatarProps } from './iAvatar'
import WebUI from '@utils/UpdatePrefixs'

const defaultProps = {
  fallback: <FallBack />,
  fit: 'cover',
}

const Avatar: React.FC<AvatarProps> = p => {
  const props = mergeProps(defaultProps, p)
  let content = <Image
    fieldid={props.fieldid}
    className={`${props.clsPrefix}-avatar`}
    style={props.style}
    src={props.src}
    fallback={props.fallback}
    placeholder={props.fallback}
    alt={props.alt}
    lazy={props.lazy}
    fit={props.fit}
    onClick={props.onClick}
    onError={props.onError}
    onLoad={props.onLoad}
  />
  if (props.children) {
    content = <span onClick={props.onClick} className={`${props.clsPrefix}-avatar ${props.clsPrefix}-avatar-text`}>{props.children}</span>
  }
  return withNativeProps(
    props,
    content
  )
}
export default WebUI({ defaultProps })(Avatar)

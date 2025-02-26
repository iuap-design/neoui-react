import { NativeProps } from '@utils/NativeProps';
import { MouseEvent } from 'react';

export type  Protocol  = 'http:' | 'https:'
export interface LinkProps {
  linkText?: string
  linkAddress?: string
  protocol?: Protocol

}

type JsonSerialized<T> = string & {
  __json_seralized: T;
}

export type LinkChangeValue = JsonSerialized<LinkProps>
export interface HyperlinksProps extends NativeProps<string>{
  linkTextPlaceholder?: string
  linkAddressPlaceholder?: string
  disabled?: boolean
  readOnly?: boolean
  visible?: boolean
  value?: LinkProps
  defaultValue?: LinkProps
  onChange?: (value: LinkChangeValue) => void
  fieldid?: string
  clsPrefix?: string
  onClick?: (e: MouseEvent, linkAddress: string) => void
  onBlur?: (value: LinkChangeValue) => void
  onFocus?: (value: LinkChangeValue) => void
}

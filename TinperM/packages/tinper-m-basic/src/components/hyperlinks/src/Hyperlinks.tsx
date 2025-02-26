import React from 'react'
import classNames from 'classnames'
import type { Action } from '@tinper/m'
import { Input, Popover, PopoverMenuProps, Tag } from '@tinper/m';
import type { HyperlinksProps, LinkChangeValue, LinkProps, Protocol } from './iHyperlinks'
import { usePropsValue } from '@hooks/UsePropsValue';
import { mergeProps } from '@utils/WithDefaultProps';
import ChevronDown from '@tinper/m-icons/lib/cjs/ChevronDown'
import { withNativeProps } from '@utils/NativeProps';


const defaultProps = {
  disabled: false,
  readOnly: false,
  visible: true,
  clsPrefix: 'mui'
}

type LinkType = LinkProps & {protocol?: Protocol}

function Hyperlinks(p: HyperlinksProps) {

  const props = mergeProps(defaultProps, p)
  const { clsPrefix } = props
  const classPrefix = `${clsPrefix}-hyperlinks`

  const getLinkValue = ({ linkText, linkAddress, protocol = 'https:'  }: LinkType) => {
    const linkUrl = linkAddress ? `${protocol}//${linkAddress}` : `${protocol}//`
    return  JSON.stringify({ linkText, linkAddress: linkUrl }) as LinkChangeValue
  }
  const onChange = (val: LinkType) => {
    props.onChange?.(getLinkValue(val))
  }

  const [value, setValue] = usePropsValue<LinkType>({
    value: parselink(props.value),
    defaultValue: parselink(props.defaultValue) ?? {},
    onChange
  })

  const { linkText, linkAddress, protocol = 'https:' } = value ?? {}

  const onProtocolChange = (action: Action) => {
    setValue({ ...value, protocol: action.key as Protocol })
  }

  const onLinkTextChange = (linkText: string) => {
    setValue({ ...value, linkText })
  }

  const onLinkAddressChange = (linkAddress: string) => {
    setValue({ ...value, linkAddress })
  }

  const onBlur = () => {
    props.onBlur?.(getLinkValue(value))
  }

  const onFocus = () => {
    props.onFocus?.(getLinkValue(value))
  }



  if (!props.visible) return null

  const linkClassName =classNames(
    {
      [`${classPrefix}`]: true,
      [`${classPrefix}-disabled`]: props.disabled
    }
  )
  const onClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    const url = `${protocol}//${linkAddress}`
    if (props.onClick) {
      props.onClick(event, url)
    } else {
      linkAddress && (window.location.href = url)
    }

  }
  if (props.readOnly) {
    return  withNativeProps(props, (
      <div className={`${classPrefix}-link-label`} fieldid={props.fieldid}>
        <span onClick={onClick}>
          <Tag style={{ fontSize: '0.28rem' }} color="message" fill="none" label={linkText || linkAddress} lineNum={5}/>
        </span>
      </div>
    ))
  }

  return  withNativeProps(props, (
    <div className={linkClassName} fieldid={props.fieldid}>

      <div className={`${classPrefix}-link`}>
        <SelectProtocol fieldid={ `${props.fieldid}-protocol` } classPrefix={classPrefix} disabled={props.disabled} readOnly={props.readOnly}
          protocol={protocol}
          onSelect={onProtocolChange}/>
        <Input fieldid={`${props.fieldid}-linkAddress`} showClose disabled={props.disabled} readOnly={props.readOnly}
          value={linkAddress} placeholder={props.linkAddressPlaceholder} onChange={onLinkAddressChange} onBlur={onBlur} onFocus={onFocus} />
      </div>
      <Input fieldid={`${props.fieldid}-linkText`} showClose disabled={props.disabled} readOnly={props.readOnly} value={linkText}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={props.linkTextPlaceholder}
        onChange={onLinkTextChange}/>
    </div>
  ))
}





type SelectProtocolProps =
  Pick<HyperlinksProps, 'disabled' | 'readOnly'>
  & { protocol: Protocol,
  onSelect: PopoverMenuProps['onAction'],
  classPrefix: string
  fieldid: string
}


function SelectProtocol(
  { onSelect, disabled, protocol, readOnly, classPrefix, fieldid }:
    SelectProtocolProps) {

  const showText = `${protocol}//`

  return (disabled || readOnly)
    ? (<span className={`${classPrefix}-link-protocol`}>{showText}</span>)
    : (
      <Popover.Menu
        actions={[
          { key: 'https:', text: 'https://' },
          { key: 'http:', text: 'http://' }
        ]}
        onAction={onSelect}
        fieldid={fieldid}
      >
        <div className={`${classPrefix}-link-protocol` } fieldid={`${fieldid}-trigger`} >
          <span> {showText}</span>
          <ChevronDown/>
        </div>
      </Popover.Menu>
    )
}


function parselink(value?: LinkProps):LinkType | undefined {

  if (!value)
    return
  let { linkAddress } = value
  const linkText = value.linkText

  if (!linkAddress)
    return { linkAddress: '', protocol: 'https:', linkText }

  if (linkAddress === 'http://' || linkAddress === 'https://')
    return { linkAddress: '', protocol: linkAddress.replace('//', '') as Protocol, linkText }

  if (!linkAddress.trim().startsWith('http:') && !linkAddress.trim().startsWith('https:'))
    linkAddress = `https://${linkAddress}`




  try {
    const url = new URL(linkAddress)

    return { linkAddress: linkAddress.replace(`${url.protocol}//`, ''), protocol: url.protocol as Protocol, linkText }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message)
    } else {
      console.log('invalid url')
    }
    const protocol = linkAddress.startsWith('http:') ? 'http:' : 'https:'
    return { linkAddress: linkAddress.replace(`${protocol}//`, ''), protocol: protocol, linkText }
  }

}

export default Hyperlinks

import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import Icon from '@components/icon/src'
import WebUI from '@utils/UpdatePrefixs'
import { TagProps } from './iTag'
import Signature from '@tinper/m-icons/lib/cjs/Signature'
import { useConfig } from '@components/config-provider/src/index';

const defaultProps = {
  readOnly: true,
  textAlign: 'left',
  visible: true,
  disabled: false,
  selected: false,
  small: false,
  round: false,
  color: 'default',
  fill: 'solid',
}

const colorValues = ['default', 'primary', 'success', 'warning', 'danger', 'message', 'invalid', 'start', 'info']

function SignatureTag({ color = 'start', clsPrefix, className, style, fieldid, onClick, signatureText }: {
  color?: string
  clsPrefix?: string
  className?: string
  fieldid?: string
  style?: React.CSSProperties
  onClick?: (e: any) => void
  signatureText?: string
}) {

  const { locale } = useConfig()

  // 印章模式根据语义色显示不同的文字内容
  const signatureTextDefault: { [key: string]: string } = {
    'start': signatureText ? signatureText : locale.Tag.start,
    'message': signatureText ? signatureText : locale.Tag.info,
    'info': signatureText ? signatureText : locale.Tag.info,
    'success': signatureText ? signatureText : locale.Tag.success,
    'warning': signatureText ? signatureText : locale.Tag.warning,
    'danger': signatureText ? signatureText : locale.Tag.danger,
    'invalid': signatureText ? signatureText : locale.Tag.invalid
  }
  const _clsPrefix = `${clsPrefix}-tag`
  const signatureClsPrefix = `${clsPrefix}-tag-signature`
  const cls = classnames(_clsPrefix, signatureClsPrefix, `${signatureClsPrefix}-color-${color}`, className)
  return <span className={cls} fieldid={fieldid} style={style} onClick={onClick}>
    <span className={`${signatureClsPrefix}-text`}>{signatureTextDefault[color]}</span>
    <Signature className={`${signatureClsPrefix}-icon`} />
  </span>
}

function Tag(props: TagProps) {
  const _onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, selectedStatus: boolean) => {
    const { onClick, readOnly, disabled } = props
    onClick?.(e)
    if (readOnly || disabled) {
      return;
    }
    setTagSelected(!selectedStatus)
    _onChange(!selectedStatus)
  }

  const _onClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (disabled) {
      return;
    }
    setTagVisible(false)
    const { onClose } = props;
    onClose?.(e);
  }

  const _onChange = (selected: boolean) => {
    const { onChange } = props;
    onChange?.(selected);
  }

  const _afterClose = () => {
    const { afterClose } = props;
    afterClose?.();
  }

  const _colorRgb = (str: string, opacity: number) => {

    const sColor = str.toLowerCase();

    if (sColor) {
      //处理六位的颜色值
      const sColorChange = [];

      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
      }
      return 'rgba(' + sColorChange.join(',') + ',' + opacity + ')';
    }
  }

  const getLabelLineNumStyle = () => {
    const { lineNum, innerStyle } = props;
    if (lineNum && +lineNum) {
      return { ...innerStyle, WebkitLineClamp: lineNum, textAlign: textAlign }
    } else {
      return { ...innerStyle, whiteSpace: 'nowrap' }
    }
  }

  const getFixLineNumStyle = () => {
    const { lineNum } = props;
    if (lineNum && +lineNum) {
      return { WebkitLineClamp: lineNum, textAlign: textAlign }
    } else {
      return { whiteSpace: 'nowrap' }
    }
  }

  const getLabel = () => {
    const { textLength, label } = props;
    if (textLength === undefined || +textLength === 0 ||(label && label.length && label.length <= textLength)) {
      return label
    } else {
      return `${label?.slice(0, textLength)}...`;
    }
  }

  const {
    clsPrefix,
    prefix,
    suffix,
    label,
    style,
    className,
    textAlign,
    lineNum,
    textLength,
    leftIcon,
    rightIcon,
    fieldid='',
    closable,
    closeIcon='arcclose',
    innerStyle={},
    visible= true,
    selected=false,
    small,
    color,
    round,
    fill,
    disabled=false,
    readOnly,
    signatureText
  } = props
  const [tagVisible, setTagVisible] = useState(visible)
  const [tagSelected, setTagSelected] = useState(selected)

  // selected 变化时更新选中状态
  useEffect(() => {
    setTagSelected(selected)
  }, [selected])

  const _clsPrefix = `${clsPrefix}-tag`

  const tagsCls = classnames(`${_clsPrefix}-text`, `${_clsPrefix}-clamp`)

  // 标签色
  const isCustomColor = colorValues.indexOf(color) == -1
  const tagsColorCls = !isCustomColor ? classnames(`${_clsPrefix}-color-${color}`) : classnames(`${_clsPrefix}-color-string`)

  // 默认静态标签  只读 / 有交互--selected  disabled onclick
  const tagsSelectedCls = classnames( { [`${_clsPrefix}-selected`]: tagSelected && !disabled })
  const tagsSmallCls = classnames(small ? `${_clsPrefix}-small` : '')
  const tagsDisabledCls = classnames({ [`${_clsPrefix}-disabled`]: disabled })
  const tagsReadonlyCls = classnames(readOnly ? tagsColorCls : classnames(`${_clsPrefix}-operational`, tagsDisabledCls, tagsSelectedCls))

  const tagsFillCls = classnames(`${_clsPrefix}-fill-${fill}`)
  const tagsRoundCls = classnames(round ? `${_clsPrefix}-round` : '')

  const customColorStyle = {
    ...(
      fill === 'solid' ? { backgroundColor: _colorRgb(color, 0.1), color } : {}
    ),
    ...(
      fill === 'outline' ? { border: `1px solid ${color}`, color } : {}
    ),
    ...(
      fill === 'none' ? { color } : {}
    )
  }
  const sty: React.CSSProperties = {
    ...style, textAlign, ...(
      readOnly && isCustomColor ? customColorStyle : {}
    )
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const leftIconEle = typeof leftIcon === 'string' ? <Icon type={leftIcon} className={`${_clsPrefix}-left-icon`} /> : leftIcon && React.cloneElement(leftIcon, { className: `${_clsPrefix}-left-icon` })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const rightIconEle = typeof rightIcon === 'string' ? <Icon type={rightIcon} className={`${_clsPrefix}-right-icon`} /> : rightIcon && React.cloneElement(rightIcon, { className: `${_clsPrefix}-right-icon` })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const closeIconEle = typeof closeIcon === 'string' ? <Icon type={closeIcon} className={`${_clsPrefix}-close-icon`} size='sm' /> : closeIcon && React.cloneElement(closeIcon, { className: `${_clsPrefix}-close-icon` });
  if (!tagVisible) {
    _afterClose()
    return null
  }
  const cls = classnames(
    _clsPrefix,
    className,
    tagsSmallCls,
    tagsFillCls,
    tagsRoundCls,
    tagsReadonlyCls
  )

  return (
    fill === 'signature'
      ? <SignatureTag
        color={color}
        clsPrefix={clsPrefix}
        className={className}
        style={style}
        fieldid={fieldid}
        signatureText={signatureText}
      />
      : <span className={`${_clsPrefix}-out`} fieldid={fieldid ? fieldid : undefined}>
        <span fieldid={fieldid ? `${fieldid}_tag` : undefined}
          className={cls}
          style={sty}
          onClick={(e) => _onClick(e, tagSelected)}>

          {leftIcon && leftIconEle}

          {prefix && <span className={`${_clsPrefix}-clamp ${_clsPrefix}-clamp-prefix`}
            style={getFixLineNumStyle()}>{prefix}</span>}

          <span className={tagsCls} style={getLabelLineNumStyle()}>
            {getLabel()}
          </span>

          {suffix && <span className={`${_clsPrefix}-clamp ${_clsPrefix}-clamp-suffix`}
            style={getFixLineNumStyle()}>{suffix}</span>}

          {rightIcon && rightIconEle}

          {closable && <span className={`${_clsPrefix}-close`}
            fieldid={fieldid ? `${fieldid}_delete` : undefined}
            onClick={_onClose}>
            {closeIconEle}
          </span>}
        </span>
      </span>
  )
}

export default WebUI({ name: 'tag', defaultProps })(Tag)
